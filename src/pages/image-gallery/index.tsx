import { GetStaticProps } from "next";

import SeoTags from "../../components/SeoTags";
import GalleryCategoryFilter from "../../components/gallery/GalleryCategoryFilter";
import GalleryFrame from "../../components/gallery/GalleryFrame";
import type { GalleryManifest } from "../../utils/gallery";
import { getGalleryManifest } from "../../utils/gallery-server";

export const getStaticProps: GetStaticProps<{ manifest: GalleryManifest }> = () => ({
  props: { manifest: getGalleryManifest() },
});

export default function GalleryIndex({ manifest }: { manifest: GalleryManifest }) {
  return (
    <GalleryFrame>
      <SeoTags
        title="Pictures — divjot"
        description="Divjot's photo library."
        pageUrl="https://bogas04.fyi/image-gallery/"
      />
      <main>
        <GalleryCategoryFilter manifest={manifest} />
      </main>
    </GalleryFrame>
  );
}
