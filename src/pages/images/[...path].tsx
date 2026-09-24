import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";

import SeoTags from "../../components/SeoTags";
import { AlbumSidebar } from "../../components/gallery/GalleryCategoryFilter";
import GalleryFrame from "../../components/gallery/GalleryFrame";
import GalleryGrid from "../../components/gallery/GalleryGrid";
import type { GalleryAlbum, GalleryFolder, GalleryImage, GalleryManifest } from "../../utils/gallery";
import {
  getGalleryAlbum,
  getGalleryAlbumUrl,
  getGalleryAlbumViewTransitionName,
  getGalleryFolder,
  getGalleryImageViewTransitionName,
  getGalleryImages,
} from "../../utils/gallery";
import { getGalleryManifest } from "../../utils/gallery-server";

type GalleryPageProps = {
  kind: "album" | "folder" | "photo";
  manifest: GalleryManifest;
  album?: GalleryAlbum;
  folder?: GalleryFolder;
  image?: GalleryImage;
  previousImage?: GalleryImage;
  nextImage?: GalleryImage;
};

const routeSegments = (id: string) => id.split("/");

export const getStaticPaths: GetStaticPaths = () => {
  const manifest = getGalleryManifest();
  return {
    paths: [
      ...manifest.folders.map((folder) => ({ params: { path: routeSegments(folder.id) } })),
      ...manifest.albums.map((album) => ({ params: { path: routeSegments(album.id) } })),
      ...manifest.images.map((image) => ({ params: { path: [...routeSegments(image.album), image.id] } })),
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<GalleryPageProps> = ({ params }) => {
  const manifest = getGalleryManifest();
  const path = Array.isArray(params?.path) ? params.path.map(String) : [];
  const routeId = path.join("/");
  const imageId = path.at(-1);
  const imageAlbum = getGalleryAlbum(manifest, path.slice(0, -1).join("/"));
  const image = imageAlbum && imageId
    ? getGalleryImages(manifest, imageAlbum.id).find((candidate) => candidate.id === imageId)
    : undefined;

  if (imageAlbum && image) {
    const images = getGalleryImages(manifest, imageAlbum.id);
    const index = images.findIndex((candidate) => candidate.id === image.id);
    const hasMultipleImages = images.length > 1;
    return {
      props: {
        kind: "photo",
        manifest,
        album: imageAlbum,
        image,
        previousImage: hasMultipleImages ? images[(index - 1 + images.length) % images.length] : undefined,
        nextImage: hasMultipleImages ? images[(index + 1) % images.length] : undefined,
      },
    };
  }

  const album = getGalleryAlbum(manifest, routeId);
  if (album) return { props: { kind: "album", manifest, album } };
  const folder = getGalleryFolder(manifest, routeId);
  if (folder) return { props: { kind: "folder", manifest, folder } };
  return { notFound: true };
};

function Arrow({ direction }: { direction: "previous" | "next" }) {
  return <span aria-hidden="true" className="font-sans text-2xl leading-none">{direction === "previous" ? "←" : "→"}</span>;
}

function GalleryLayout({ manifest, selectedAlbumId, children }: { manifest: GalleryManifest; selectedAlbumId?: string; children: React.ReactNode }) {
  return <div className="grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10"><div className="hidden lg:block lg:sticky lg:top-8 lg:self-start"><AlbumSidebar albums={manifest.albums} folders={manifest.folders} selectedAlbumId={selectedAlbumId} /></div>{children}</div>;
}

function AlbumPage({ manifest, album }: { manifest: GalleryManifest; album: GalleryAlbum }) {
  return <GalleryFrame trail={album.title}><SeoTags title={`${album.title} — Pictures`} description={album.summary} pageUrl={`https://bogas04.fyi${getGalleryAlbumUrl(album.id)}`} /><main><GalleryLayout manifest={manifest} selectedAlbumId={album.id}><section className="min-w-0"><div className="sticky top-0 z-20 -mx-4 mb-8 bg-[#1a1a1a] px-4 py-4 sm:-mx-8 sm:px-8 lg:static lg:mx-0 lg:px-0 lg:pt-0"><h1 className="m-0 text-4xl font-light lowercase tracking-[-0.06em] text-white sm:text-6xl"><Link href="/images/" data-gallery-transition aria-label="Back to pictures" className="inline-flex pr-2 align-middle text-white/55 no-underline transition hover:text-[#1ba1e2]"><Arrow direction="previous" /></Link><Link href="/images/" className="no-underline transition hover:text-[#1ba1e2] lg:pointer-events-none lg:text-white"><span style={{ viewTransitionName: getGalleryAlbumViewTransitionName(album) }}>{album.title}</span></Link></h1>{album.summary ? <p className="mt-6 mb-0 max-w-2xl text-lg font-light text-white/65">{album.summary}</p> : null}</div><GalleryGrid images={getGalleryImages(manifest, album.id)} /></section></GalleryLayout></main></GalleryFrame>;
}

function FolderPage({ manifest, folder }: { manifest: GalleryManifest; folder: GalleryFolder }) {
  const childFolders = folder.folders.map((id) => getGalleryFolder(manifest, id)).filter((item): item is GalleryFolder => Boolean(item));
  const childAlbums = folder.albums.map((id) => getGalleryAlbum(manifest, id)).filter((item): item is GalleryAlbum => Boolean(item));
  const itemCard = (id: string, title: string, isFolder: boolean) => {
    const cover = manifest.images.find((image) => image.album === id || image.album.startsWith(`${id}/`));
    const href = isFolder ? `/images/${id}/` : getGalleryAlbumUrl(id);
    return <Link key={id} href={href} className="group block min-w-0 text-white no-underline">{cover ? <img src={cover.thumbUrl} alt="" width={cover.width} height={cover.height} className="block aspect-[4/3] h-auto w-full object-cover transition duration-300 group-hover:opacity-75" loading="lazy" decoding="async" /> : <div className="aspect-[4/3] bg-white/10" />}<h2 className="mt-3 text-lg font-light lowercase leading-tight tracking-[-0.03em]">{title}</h2></Link>;
  };
  return <GalleryFrame trail={folder.title}><SeoTags title={`${folder.title} — Pictures`} description={`Browse ${folder.title}.`} pageUrl={`https://bogas04.fyi/images/${folder.id}/`} /><main><GalleryLayout manifest={manifest}><section className="min-w-0"><div className="sticky top-0 z-20 -mx-4 mb-8 bg-[#1a1a1a] px-4 py-4 sm:-mx-8 sm:px-8 lg:static lg:mx-0 lg:px-0 lg:pt-0"><h1 className="m-0 text-4xl font-light lowercase tracking-[-0.06em] text-white sm:text-6xl"><Link href="/images/" aria-label="Back to pictures" className="inline-flex pr-2 align-middle text-white/55 no-underline transition hover:text-[#1ba1e2]"><Arrow direction="previous" /></Link>{folder.title}</h1></div><section aria-label={`${folder.title} folders and albums`} className="grid grid-cols-2 gap-x-3 gap-y-8">{childFolders.map((child) => itemCard(child.id, child.title, true))}{childAlbums.map((child) => itemCard(child.id, child.title, false))}</section></section></GalleryLayout></main></GalleryFrame>;
}

function PhotoPage({ manifest, album, image, previousImage, nextImage }: Required<Pick<GalleryPageProps, "manifest" | "album" | "image">> & Pick<GalleryPageProps, "previousImage" | "nextImage">) {
  return <GalleryFrame trail={album.title}><SeoTags title={`${image.title} — ${album.title}`} description={image.caption || image.alt} imageUrl={`https://bogas04.fyi${image.displayUrl}`} pageUrl={`https://bogas04.fyi${image.photoUrl}`} /><main><GalleryLayout manifest={manifest} selectedAlbumId={album.id}><section className="min-w-0 lg:flex lg:min-h-0 lg:flex-col"><div className="sticky top-0 z-20 -mx-4 mb-8 shrink-0 bg-[#1a1a1a] px-4 py-4 sm:-mx-8 sm:px-8 lg:static lg:mx-0 lg:px-0 lg:pt-0"><h1 className="m-0 text-4xl font-light lowercase tracking-[-0.06em] text-white sm:text-6xl"><Link href={getGalleryAlbumUrl(album.id)} aria-label={`Back to ${album.title}`} data-gallery-transition className="inline-flex pr-2 align-middle text-white/55 no-underline transition hover:text-[#1ba1e2]"><Arrow direction="previous" /></Link><Link href={getGalleryAlbumUrl(album.id)} data-gallery-transition className="lg:text-white/55 no-underline transition hover:text-[#1ba1e2]"><span style={{ viewTransitionName: getGalleryAlbumViewTransitionName(album) }}>{album.title}</span></Link><span> /</span><span className="ml-2" style={{ viewTransitionName: "gallery-photo-title" }}>this image</span></h1><p className="mt-8 mb-0 text-lg font-light text-white/65 sm:text-xl">{image.alt}</p></div><section className="relative bg-transparent lg:min-h-0 lg:flex-1"><a href={image.fallbackUrl} target="_blank" rel="noopener noreferrer" className="block h-full lg:flex lg:items-center lg:justify-center"><img src={image.fallbackUrl} alt={image.alt} width={image.width} height={image.height} className="mx-auto block h-auto max-h-[calc(100svh-10rem)] w-auto max-w-full bg-gray-800 object-contain lg:max-h-full" style={{ viewTransitionName: getGalleryImageViewTransitionName(image) }} decoding="async" /></a>{previousImage && nextImage ? <nav aria-label="Image navigation" className="pointer-events-none absolute inset-0 flex"><Link href={previousImage.photoUrl} className="group pointer-events-auto flex h-full w-1/2 items-center justify-start p-3 no-underline sm:p-5" aria-label={`Show previous image: ${previousImage.title}`}><span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/60 text-white shadow-lg transition group-hover:scale-105"><Arrow direction="previous" /></span></Link><Link href={nextImage.photoUrl} className="group pointer-events-auto flex h-full w-1/2 items-center justify-end p-3 no-underline sm:p-5" aria-label={`Show next image: ${nextImage.title}`}><span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/60 text-white shadow-lg transition group-hover:scale-105"><Arrow direction="next" /></span></Link></nav> : null}</section></section></GalleryLayout></main></GalleryFrame>;
}

export default function GalleryPathPage(props: GalleryPageProps) {
  if (props.kind === "album" && props.album) return <AlbumPage manifest={props.manifest} album={props.album} />;
  if (props.kind === "folder" && props.folder) return <FolderPage manifest={props.manifest} folder={props.folder} />;
  if (props.kind === "photo" && props.album && props.image) return <PhotoPage manifest={props.manifest} album={props.album} image={props.image} previousImage={props.previousImage} nextImage={props.nextImage} />;
  return null;
}
