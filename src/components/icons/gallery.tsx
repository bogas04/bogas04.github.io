import { SVGAttributes } from "react";

const GalleryIcon = (props: SVGAttributes<SVGElement>) => (
  <svg viewBox="0 0 100 100" width={97.75} height={97.75} {...props}>
    <mask id="gallery-icon-mask" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
      <rect width="100" height="100" fill="black" />
      <circle cx="50" cy="50" r="50" fill="white" />
      <circle cx="63" cy="40" r="6" fill="black" />
      <path d="m27 69 16-19 12 12 8-9 10 16H27z" fill="black" />
    </mask>
    <rect width="100" height="100" fill="white" mask="url(#gallery-icon-mask)" />
  </svg>
);

export default GalleryIcon;
