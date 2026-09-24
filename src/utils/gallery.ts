export interface GalleryImage {
  id: string;
  album: string;
  albumTitle: string;
  category: "travel" | "blog" | "random" | "screenshots";
  title: string;
  alt: string;
  caption: string;
  takenAt: string;
  location: string;
  featured: boolean;
  width: number;
  height: number;
  aspectRatio: number;
  photoUrl: string;
  thumbUrl: string;
  displayUrl: string;
  fallbackUrl: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  summary: string;
  category: "travel" | "blog" | "random" | "screenshots";
  cover: string;
  startDate: string;
  endDate: string;
  images: string[];
}

export interface GalleryFolder {
  id: string;
  title: string;
  folders: string[];
  albums: string[];
}

export interface GalleryManifest {
  albums: GalleryAlbum[];
  folders: GalleryFolder[];
  images: GalleryImage[];
}

export function getGalleryAlbumUrl(albumId: string) {
  return `/images/${albumId.split("/").map(encodeURIComponent).join("/")}/`;
}

export function getGalleryFolder(
  manifest: GalleryManifest,
  folderId: string,
): GalleryFolder | undefined {
  return manifest.folders.find((folder) => folder.id === folderId);
}

export function getGalleryAlbum(
  manifest: GalleryManifest,
  albumId: string,
): GalleryAlbum | undefined {
  return manifest.albums.find((album) => album.id === albumId);
}

export function getGalleryImages(
  manifest: GalleryManifest,
  albumId?: string,
): GalleryImage[] {
  return albumId
    ? manifest.images.filter((image) => image.album === albumId)
    : manifest.images;
}

export function getGalleryAlbumViewTransitionName(album: GalleryAlbum) {
  return `gallery-album-${album.id}`;
}

export function getGalleryImageViewTransitionName(image: GalleryImage) {
  return `gallery-image-${image.album}-${image.id}`.replace(
    /[^a-zA-Z0-9_-]/g,
    "-",
  );
}
