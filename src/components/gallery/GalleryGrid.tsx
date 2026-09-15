import Link from "next/link";

import {
  getGalleryImageViewTransitionName,
  type GalleryImage,
} from "../../utils/gallery";

function GalleryImageMedia({ image }: { image: GalleryImage }) {
  return (
    <img
      src={image.thumbUrl}
      alt={image.alt}
      width={image.width}
      height={image.height}
      className="block h-auto w-full bg-gray-800 object-cover transition duration-300 group-hover:scale-[1.015]"
      style={{ viewTransitionName: getGalleryImageViewTransitionName(image) }}
      loading="lazy"
      decoding="async"
    />
  );
}

export default function GalleryGrid({
  images,
}: {
  images: GalleryImage[];
}) {
  return (
    <>
      {images.length ? (
        <div className="columns-2 [column-gap:0.25rem] lg:columns-3 xl:columns-4">
          {images.map((image) => (
            <figure key={`${image.album}-${image.id}`} className="mb-1 break-inside-avoid">
              <Link
                href={image.photoUrl}
                aria-label={image.title}
                data-gallery-transition
                className="group relative block overflow-hidden no-underline outline-none focus-visible:ring-2 focus-visible:ring-[#1ba1e2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]"
              >
                <GalleryImageMedia image={image} />
              </Link>
              <figcaption className="sr-only">
                {image.title}. {image.caption || image.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <p className="p-8 text-center text-sm lowercase text-white/45">this folder is empty.</p>
      )}
    </>
  );
}
