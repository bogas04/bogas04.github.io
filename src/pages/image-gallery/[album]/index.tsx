import { GetStaticPaths, GetStaticProps } from "next";

import SeoTags from "../../../components/SeoTags";
import { AlbumSidebar } from "../../../components/gallery/GalleryCategoryFilter";
import GalleryFrame from "../../../components/gallery/GalleryFrame";
import GalleryGrid from "../../../components/gallery/GalleryGrid";
import type { GalleryAlbum, GalleryImage } from "../../../utils/gallery";
import { getGalleryAlbum, getGalleryImages } from "../../../utils/gallery";
import { getGalleryManifest } from "../../../utils/gallery-server";

interface AlbumPageProps {
  albums: GalleryAlbum[];
  album: GalleryAlbum;
  images: GalleryImage[];
}

export const getStaticPaths: GetStaticPaths = () => ({
  paths: getGalleryManifest().albums.map((album) => ({ params: { album: album.id } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<AlbumPageProps> = ({ params }) => {
  const manifest = getGalleryManifest();
  const album = getGalleryAlbum(manifest, String(params?.album));
  if (!album) return { notFound: true };
  return { props: { albums: manifest.albums, album, images: getGalleryImages(manifest, album.id) } };
};

export default function AlbumPage({ albums, album, images }: AlbumPageProps) {
  return (
    <GalleryFrame trail={album.title}>
      <SeoTags
        title={`${album.title} — Pictures`}
        description={album.summary}
        pageUrl={`https://bogas04.fyi/image-gallery/${album.id}/`}
      />
      <main>
        <div className="grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10">
          <div className="hidden lg:block lg:sticky lg:top-8 lg:self-start">
            <AlbumSidebar albums={albums} selectedAlbumId={album.id} />
          </div>
          <section className="min-w-0">
            <div className="sticky top-0 z-20 -mx-4 mb-8 bg-[#1a1a1a] px-4 py-4 sm:-mx-8 sm:px-8 lg:static lg:mx-0 lg:px-0 lg:pt-0">
              <h1 className="m-0 text-4xl font-light lowercase tracking-[-0.06em] text-white sm:text-6xl">{album.title}</h1>
              {album.summary ? <p className="mt-6 mb-0 max-w-2xl text-lg font-light text-white/65">{album.summary}</p> : null}
            </div>
            <GalleryGrid images={images} />
          </section>
        </div>
      </main>
    </GalleryFrame>
  );
}
