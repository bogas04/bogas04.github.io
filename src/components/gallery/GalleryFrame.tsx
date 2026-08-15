import Link from "next/link";
import { ReactNode } from "react";

export default function GalleryFrame({ children, trail }: { children: ReactNode; trail?: string }) {
  return (
    <div className="min-h-screen bg-[#1a1a1a] font-body text-white selection:bg-[#1ba1e2] selection:text-white">
      <header className="mx-auto max-w-[1600px] px-4 py-5 sm:px-8 sm:py-7">
        <div className="flex items-center gap-3 text-xl font-light lowercase tracking-[-0.04em] sm:text-2xl">
          <Link href="/" className="text-white/55 no-underline transition hover:text-white">bogas04</Link>
          <span aria-hidden="true" className="text-white/30">/</span>
          <Link href="/image-gallery/" className={`${trail ? "text-white/55" : "text-white"} no-underline transition hover:text-white`}>pictures</Link>
          {trail ? (
            <>
              <span aria-hidden="true" className="text-white/30">/</span>
              <span className="text-white">{trail}</span>
            </>
          ) : null}
        </div>
      </header>
      <div className="mx-auto max-w-[1600px] px-4 pb-16 pt-8 sm:px-8 sm:pt-12">
        {children}
      </div>
    </div>
  );
}
