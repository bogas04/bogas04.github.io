import { SVGAttributes } from "react";

const NowIcon = (props: SVGAttributes<SVGElement>) => (
  <svg viewBox="0 0 100 100" width={97.75} height={97.75} {...props}>
    <mask id="now-icon-mask">
      <rect width="100" height="100" fill="white" />
      <circle
        cx="50"
        cy="50"
        r="28"
        fill="none"
        stroke="black"
        strokeWidth="7"
      />
      <path
        d="M50 34v17l12 8"
        fill="none"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="7"
      />
    </mask>
    <circle cx="50" cy="50" r="50" fill="white" mask="url(#now-icon-mask)" />
  </svg>
);

export default NowIcon;
