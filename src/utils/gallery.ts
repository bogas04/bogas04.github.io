export interface GalleryImage {
  id: string;
  album: string;
  albumTitle: string;
  category: "travel" | "blog" | "random";
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
  category: "travel" | "blog" | "random";
  cover: string;
  startDate: string;
  endDate: string;
  images: string[];
}

export interface GalleryManifest {
  albums: GalleryAlbum[];
  images: GalleryImage[];
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
