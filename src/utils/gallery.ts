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

export type GalleryBrowseImage = Pick<GalleryImage,
  "id" | "album" | "title" | "alt" | "caption" | "takenAt" | "width" | "height" | "photoUrl" | "thumbUrl"
>;

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

export type GalleryBrowseManifest = Omit<GalleryManifest, "images"> & { images: GalleryBrowseImage[] };

// Compact page data avoids repeating field names and album paths for every photo.
export type PackedGalleryImage = [number, string, string, string, string, string, number, number, string];
export type PackedGallery = Omit<GalleryManifest, "images"> & { images: PackedGalleryImage[] };

export function packGallery(manifest: GalleryManifest): PackedGallery {
  const indices = new Map(manifest.albums.map((album, index) => [album.id, index]));
  return { albums: manifest.albums, folders: manifest.folders, images: manifest.images.map((image) => {
    const index = indices.get(image.album);
    if (index === undefined) throw new Error(`Unknown gallery album: ${image.album}`);
    return [index, image.id, image.title, image.alt, image.caption, image.takenAt, image.width, image.height, image.thumbUrl];
  }) };
}

export function unpackGallery(packed: PackedGallery): GalleryBrowseManifest {
  return { albums: packed.albums, folders: packed.folders, images: packed.images.map(([index, id, title, alt, caption, takenAt, width, height, thumbUrl]) => {
    const album = packed.albums[index].id;
    return { id, album, title, alt, caption, takenAt, width, height, thumbUrl, photoUrl: `${getGalleryAlbumUrl(album)}${encodeURIComponent(id)}/` };
  }) };
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

export function getGalleryImageViewTransitionName(image: Pick<GalleryImage, "album" | "id">) {
  return `gallery-image-${image.album}-${image.id}`.replace(
    /[^a-zA-Z0-9_-]/g,
    "-",
  );
}
