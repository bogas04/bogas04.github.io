import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";

import SeoTags from "../../../components/SeoTags";
import { AlbumSidebar } from "../../../components/gallery/GalleryCategoryFilter";
import GalleryFrame from "../../../components/gallery/GalleryFrame";
import type { GalleryAlbum, GalleryImage } from "../../../utils/gallery";
import { getGalleryAlbum, getGalleryImages } from "../../../utils/gallery";
import { getGalleryManifest } from "../../../utils/gallery-server";

interface PhotoPageProps {
  albums: GalleryAlbum[];
  album: GalleryAlbum;
  image: GalleryImage;
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
  return {
      props: {
        albums: manifest.albums,
        album,
        image: images[index],
    },
  };
};

export default function PhotoPage({ albums, album, image }: PhotoPageProps) {
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
            <div className="mb-10 shrink-0">
              <h1 className="m-0 text-4xl font-light lowercase tracking-[-0.06em] text-white sm:text-6xl">
                <Link
                  href={`/image-gallery/${album.id}/`}
                  className="no-underline transition hover:text-[#1ba1e2]"
                >
                  <span className="lg:hidden">← {album.title} /</span>
                  <span className="hidden lg:inline text-white/55">{album.title} /</span>
                </Link>
                <span className="ml-2">this image</span>
              </h1>
              <p className="mt-8 mb-0 text-lg font-light text-white/65 sm:text-xl">{image.alt}</p>
            </div>
            <section className="bg-transparent lg:min-h-0 lg:flex-1">
              <a href={image.fallbackUrl} target="_blank" rel="noopener noreferrer" className="block h-full lg:flex lg:items-center lg:justify-center">
                <img
                  src={image.fallbackUrl}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="mx-auto block h-auto max-h-[calc(100svh-10rem)] w-auto max-w-full object-contain lg:max-h-full"
                  decoding="async"
                />
              </a>
            </section>
          </section>
        </div>
      </main>
    </GalleryFrame>
  );
}
