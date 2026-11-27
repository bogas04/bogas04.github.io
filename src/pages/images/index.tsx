import { GetStaticProps } from "next";
import { useMemo } from "react";

import SeoTags from "../../components/SeoTags";
import GalleryCategoryFilter from "../../components/gallery/GalleryCategoryFilter";
import GalleryFrame from "../../components/gallery/GalleryFrame";
import { packGallery, unpackGallery, type PackedGallery } from "../../utils/gallery";
import { getGalleryManifest } from "../../utils/gallery-server";

export const getStaticProps: GetStaticProps<{ manifest: PackedGallery }> = () => ({
  props: { manifest: packGallery(getGalleryManifest()) },
});

export default function GalleryIndex({ manifest }: { manifest: PackedGallery }) {
  const gallery = useMemo(() => unpackGallery(manifest), [manifest]);
  return (
    <GalleryFrame>
      <SeoTags
        title="Pictures — divjot"
        description="Divjot's photo library."
        pageUrl="https://bogas04.fyi/images/"
      />
      <main>
        <GalleryCategoryFilter manifest={gallery} />
      </main>
    </GalleryFrame>
  );
}
