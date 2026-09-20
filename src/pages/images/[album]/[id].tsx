import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";

import SeoTags from "../../../components/SeoTags";
import { AlbumSidebar } from "../../../components/gallery/GalleryCategoryFilter";
import GalleryFrame from "../../../components/gallery/GalleryFrame";
import type { GalleryAlbum, GalleryImage } from "../../../utils/gallery";
import {
  getGalleryAlbum,
  getGalleryAlbumViewTransitionName,
  getGalleryImageViewTransitionName,
  getGalleryImages,
} from "../../../utils/gallery";
import { getGalleryManifest } from "../../../utils/gallery-server";

interface PhotoPageProps {
  albums: GalleryAlbum[];
  album: GalleryAlbum;
  image: GalleryImage;
  previousImage?: GalleryImage;
  nextImage?: GalleryImage;
}

function GalleryNavigationArrow({ direction }: { direction: "previous" | "next" }) {
  return (
    <span aria-hidden="true" className="font-sans text-2xl leading-none">
      {direction === "previous" ? "←" : "→"}
    </span>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  const manifest = getGalleryManifest();
  return {
    paths: manifest.images.map((image) => ({ params: { album: image.album, id: image.id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PhotoPageProps> = ({ params }) => {
  const manifest = getGalleryManifest();
  const album = getGalleryAlbum(manifest, String(params?.album));
  const images = getGalleryImages(manifest, String(params?.album));
  const index = images.findIndex((image) => image.id === String(params?.id));
  if (!album || index === -1) return { notFound: true };
  const hasMultipleImages = images.length > 1;
  return {
      props: {
        albums: manifest.albums,
        album,
        image: images[index],
        previousImage: hasMultipleImages
          ? images[(index - 1 + images.length) % images.length]
          : undefined,
        nextImage: hasMultipleImages
          ? images[(index + 1) % images.length]
          : undefined,
    },
  };
};

export default function PhotoPage({
  albums,
  album,
  image,
  previousImage,
  nextImage,
}: PhotoPageProps) {
  return (
    <GalleryFrame trail={album.title}>
      <SeoTags
        title={`${image.title} — ${album.title}`}
        description={image.caption || image.alt}
        imageUrl={`https://bogas04.fyi${image.displayUrl}`}
        pageUrl={`https://bogas04.fyi${image.photoUrl}`}
      />
      <main>
        <div className="grid lg:h-[calc(100svh-136px)] lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10">
          <div className="hidden lg:block lg:sticky lg:top-8 lg:self-start">
            <AlbumSidebar albums={albums} selectedAlbumId={album.id} />
          </div>
          <section className="min-w-0 lg:flex lg:min-h-0 lg:flex-col">
            <div className="sticky top-0 z-20 -mx-4 mb-8 shrink-0 bg-[#1a1a1a] px-4 py-4 sm:-mx-8 sm:px-8 lg:static lg:mx-0 lg:px-0 lg:pt-0">
              <h1 className="m-0 text-4xl font-light lowercase tracking-[-0.06em] text-white sm:text-6xl">
                <Link
                  href={`/images/${album.id}/`}
                  aria-label={`Back to ${album.title}`}
                  data-gallery-transition
                  className="inline-flex pr-2 align-middle text-white/55 no-underline transition hover:text-[#1ba1e2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1ba1e2]"
                >
                  <GalleryNavigationArrow direction="previous" />
                </Link>
                <Link
                  href={`/images/${album.id}/`}
                  data-gallery-transition
                  className="lg:text-white/55 no-underline transition hover:text-[#1ba1e2]"
                >
                  <span style={{ viewTransitionName: getGalleryAlbumViewTransitionName(album) }}>
                    {album.title}
                  </span>
                </Link>
                <span> /</span>
                <span className="ml-2" style={{ viewTransitionName: "gallery-photo-title" }}>
                  this image
                </span>
              </h1>
              <p className="mt-8 mb-0 text-lg font-light text-white/65 sm:text-xl">{image.alt}</p>
            </div>
            <section className="relative bg-transparent lg:min-h-0 lg:flex-1">
              <a href={image.fallbackUrl} target="_blank" rel="noopener noreferrer" className="block h-full lg:flex lg:items-center lg:justify-center">
                <img
                  src={image.fallbackUrl}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="mx-auto block h-auto max-h-[calc(100svh-10rem)] w-auto max-w-full bg-gray-800 object-contain lg:max-h-full"
                  style={{ viewTransitionName: getGalleryImageViewTransitionName(image) }}
                  decoding="async"
                />
              </a>
              {previousImage && nextImage ? (
                <nav
                  aria-label="Image navigation"
                  className="pointer-events-none absolute inset-0 flex"
                >
                  <Link
                    href={previousImage.photoUrl}
                    className="group pointer-events-auto flex h-full w-1/2 items-center justify-start p-3 no-underline outline-none sm:p-5"
                    aria-label={`Show previous image: ${previousImage.title}`}
                  >
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/60 text-white shadow-lg transition group-hover:scale-105 group-hover:bg-black/80 group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-[#1ba1e2]">
                      <GalleryNavigationArrow direction="previous" />
                    </span>
                  </Link>
                  <Link
                    href={nextImage.photoUrl}
                    className="group pointer-events-auto flex h-full w-1/2 items-center justify-end p-3 no-underline outline-none sm:p-5"
                    aria-label={`Show next image: ${nextImage.title}`}
                  >
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/60 text-white shadow-lg transition group-hover:scale-105 group-hover:bg-black/80 group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-[#1ba1e2]">
                      <GalleryNavigationArrow direction="next" />
                    </span>
                  </Link>
                </nav>
              ) : null}
            </section>
          </section>
        </div>
      </main>
    </GalleryFrame>
  );
}
