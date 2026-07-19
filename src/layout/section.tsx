import type { ComponentPropsWithoutRef } from "react";

type SectionColor = "default" | "green" | "grey" | "blue" | "yellow" | "pink";

interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  color?: SectionColor;
}

const colorClasses: Record<SectionColor, string> = {
  default: "bg-[#673ab7] text-white",
  green: "bg-[#4caf50] text-white [&_a]:text-[#123886]",
  grey: "bg-[#343a40] text-white",
  blue: "bg-[#3f51b5] text-white",
  yellow: "bg-[#ffc107] text-black",
  pink: "bg-[#e91e63] text-white",
};

export default function Section({
  color = "default",
  className = "",
  ...props
}: SectionProps) {
  return (
    <section
      className={`relative min-h-[85vh] px-[5%] py-[2%] text-xl leading-[1.6] shadow-[0px_10px_50px_20px_black] [&_h1]:py-[5%] [&_h1]:text-[clamp(4.5rem,10vw,8rem)] [&_h2]:py-[3%] [&_h2]:text-[3em] [&_h3]:sticky [&_h3]:top-0 [&_h3]:z-[1] [&_h3]:m-[0_-20px] [&_h3]:bg-inherit [&_h3]:px-[10px] [&_h3]:py-[2%] [&_h3]:text-[clamp(2.25rem,5vw,3.5rem)] [&_h6]:py-[2%] [&_h6]:text-xl max-[750px]:[&_h1]:text-[4.5rem] max-[750px]:[&_h3]:text-[2.25rem] ${colorClasses[color]} ${className}`}
      {...props}
    />
  );
}
