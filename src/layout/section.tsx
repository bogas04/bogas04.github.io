import type { ComponentPropsWithoutRef } from "react";

type SectionColor = "default" | "green" | "grey" | "blue" | "yellow" | "pink";

interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  color?: SectionColor;
}

const colorClasses: Record<SectionColor, string> = {
  default: "bg-[#673ab7] text-white",
  green: "bg-[#2e7d32] text-white",
  grey: "bg-[#343a40] text-white",
  blue: "bg-[#3f51b5] text-white",
  yellow: "bg-[#ffc107] text-black",
  pink: "bg-[#c2185b] text-white",
};

export default function Section({
  color = "default",
  className = "",
  ...props
}: SectionProps) {
  return (
    <section
      className={`relative min-h-[85vh] px-[5%] py-[2%] text-xl leading-[1.6] shadow-[0px_10px_50px_20px_black] [&_h1]:py-[5%] [&_h1]:text-[clamp(4.5rem,10vw,8rem)] [&_h2]:sticky [&_h2]:top-0 [&_h2]:z-[1] [&_h2]:m-[0_-20px] [&_h2]:bg-inherit [&_h2]:px-[10px] [&_h2]:py-[2%] [&_h2]:text-[clamp(2.25rem,5vw,3.5rem)] [&_h6]:py-[2%] [&_h6]:text-xl max-[750px]:[&_h1]:text-[4.5rem] max-[750px]:[&_h2]:text-[2.25rem] ${colorClasses[color]} ${className}`}
      {...props}
    />
  );
}
