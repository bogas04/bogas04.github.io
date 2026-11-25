import Link from "next/link";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import SeoTags from "../../components/SeoTags";

const boardUrl = "https://trello.com/b/Ctw7Er15/games";
const splashStorageKey = "plays-splash-date";

function useGamepadNavigation() {
  useEffect(() => {
    let frame = 0;
    let previous = new Set<string>();
    const poll = () => {
      const pads = navigator.getGamepads?.() ?? [];
      const pad = Array.from(pads).find((item) => item?.connected && item.mapping === "standard");
      const pressed = new Set<string>();
      if (pad) {
        if (pad.buttons[0]?.pressed) pressed.add("activate");
        if (pad.buttons[12]?.pressed || pad.axes[1] < -0.6) pressed.add("up");
        if (pad.buttons[13]?.pressed || pad.axes[1] > 0.6) pressed.add("down");
        if (pad.buttons[14]?.pressed || pad.axes[0] < -0.6) pressed.add("left");
        if (pad.buttons[15]?.pressed || pad.axes[0] > 0.6) pressed.add("right");
      }
      if (pressed.has("activate") && !previous.has("activate") && document.activeElement instanceof HTMLElement) {
        if (document.activeElement.matches("[data-gamepad]")) document.activeElement.click();
      }
      for (const direction of ["up", "down", "left", "right"]) {
        if (!pressed.has(direction) || previous.has(direction)) continue;
        const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-gamepad]"));
        const current = document.activeElement;
        if (!(current instanceof HTMLElement) || !elements.includes(current)) {
          elements[0]?.focus();
          break;
        }
        const from = current.getBoundingClientRect();
        const x = from.left + from.width / 2;
        const y = from.top + from.height / 2;
        const candidates = elements.filter((element) => element !== current).map((element) => {
          const rect = element.getBoundingClientRect();
          const dx = rect.left + rect.width / 2 - x;
          const dy = rect.top + rect.height / 2 - y;
          const primary = direction === "left" ? -dx : direction === "right" ? dx : direction === "up" ? -dy : dy;
          const secondary = direction === "left" || direction === "right" ? Math.abs(dy) : Math.abs(dx);
          return { element, primary, score: primary + secondary * 2 };
        }).filter((candidate) => candidate.primary > 1).sort((a, b) => a.score - b.score);
        candidates[0]?.element.focus();
        break;
      }
      previous = pressed;
      frame = requestAnimationFrame(poll);
    };
    frame = requestAnimationFrame(poll);
    return () => cancelAnimationFrame(frame);
  }, []);
}

export default function Plays() {
  const [showSplash, setShowSplash] = useState(false);
  const [activeTile, setActiveTile] = useState(0);
  const tileSize = (index: number) => `${activeTile === index
    ? "h-[calc(2*var(--tile-size)+0.75rem)] w-[calc(2*var(--tile-size)+0.75rem)]"
    : "h-[var(--tile-size)] w-[var(--tile-size)]"} max-sm:!h-auto max-sm:!w-full max-sm:aspect-square max-sm:transition-none`;
  const tileInteraction = (index: number) => ({
    onFocus: () => setActiveTile(index),
    onMouseEnter: () => setActiveTile(index),
  });
  useGamepadNavigation();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;
    const now = new Date();
    const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    try {
      if (window.localStorage.getItem(splashStorageKey) === today) return;
    } catch {
      // Storage can be unavailable in private or restricted browsing contexts.
    }
    setShowSplash(true);
    const timeout = window.setTimeout(() => {
      try {
        window.localStorage.setItem(splashStorageKey, today);
      } catch {
        // The dashboard still works when the visit cannot be remembered.
      }
      if (!document.startViewTransition) {
        setShowSplash(false);
        return;
      }
      document.documentElement.dataset.playsIntro = "true";
      const transition = document.startViewTransition(() => {
        flushSync(() => setShowSplash(false));
      });
      void transition.finished.then(
        () => { delete document.documentElement.dataset.playsIntro; },
        () => { delete document.documentElement.dataset.playsIntro; },
      );
    }, 700);
    return () => {
      window.clearTimeout(timeout);
      delete document.documentElement.dataset.playsIntro;
    };
  }, []);

  return (
    <>
      <SeoTags title="plays | divjot" description="Games, adventures, and what divjot is playing." pageUrl="https://bogas04.fyi/plays/" />
      {showSplash && <div aria-hidden="true" className="plays-splash pointer-events-none fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#107c10] text-white">
        <img src="/profile.png" alt="" style={{ viewTransitionName: "plays-profile" }} className="h-24 w-24 rounded-full border-4 border-white object-cover" />
        <span style={{ viewTransitionName: "plays-profile-label" }} className="mt-5 font-[Arial,Helvetica,sans-serif] text-xl font-bold">divjot</span>
        <span style={{ viewTransitionName: "plays-route-label" }} className="mt-2 font-[Arial,Helvetica,sans-serif] text-sm font-bold uppercase tracking-[0.3em]">plays</span>
      </div>}
      <main className="relative min-h-screen overflow-hidden bg-[#111b1e] font-[Arial,Helvetica,sans-serif] text-white">
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 bg-cover bg-center" style={{ backgroundImage: 'linear-gradient(180deg, rgba(8,20,29,.65) 0%, rgba(9,17,20,.36) 42%, rgba(7,15,15,.94) 100%), url("/img/screenshots/a-plague-tale-innocence/A%20Plague%20Tale_%20Innocence-2021_06_04-08_48_42.jpg")' }} />
        <div className="relative mx-auto flex min-h-screen max-w-[1600px] flex-col px-5 pb-10 pt-6 sm:px-10 lg:px-16">
          <header className="flex items-center justify-between gap-4 text-sm sm:text-base">
            <Link data-gamepad href="/" aria-label="divjot, home" className="flex items-center gap-3 text-white no-underline outline-offset-4 focus:outline-2 focus:outline-[#85d8ff]">
              <img src="/profile.png" alt="" style={{ viewTransitionName: showSplash ? "none" : "plays-profile" }} className="h-10 w-10 rounded-full object-cover" />
              <span><span style={{ viewTransitionName: showSplash ? "none" : "plays-profile-label" }} className="block font-bold">divjot</span><span style={{ viewTransitionName: showSplash ? "none" : "plays-route-label" }} className="block text-xs font-normal text-white/80">/plays</span></span>
            </Link>
          </header>

          <div className="mt-10 sm:mt-auto sm:pt-24 lg:pt-32">
            <h1 className="mb-2 font-[Arial,Helvetica,sans-serif] text-3xl font-bold tracking-tight sm:text-4xl">My games</h1>
            <p className="mb-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">I love getting lost in single-player games. Here’s a little corner for the games I play and the worlds I’ve visited.</p>
            <div className="pb-5 pt-2 sm:-mx-2 sm:overflow-x-auto sm:px-2 sm:[scrollbar-width:thin]">
              <section aria-label="Games and screenshots" className="grid grid-cols-2 gap-3 sm:flex sm:h-[calc(2*var(--tile-size)+0.75rem)] sm:w-max sm:items-end [--tile-size:clamp(100px,15vw,160px)]">
                <a data-gamepad {...tileInteraction(0)} href={boardUrl} target="_blank" rel="noopener noreferrer" className={`relative flex shrink-0 items-end overflow-hidden bg-[#176c38] text-white no-underline outline-offset-2 transition-[width,height] duration-300 focus:z-10 focus:outline-4 focus:outline-[#8cdcff] focus:shadow-[0_0_22px_4px_#35a9ff] motion-reduce:transition-none ${tileSize(0)}`}>
                  <span aria-hidden="true" className="absolute inset-0 grid grid-cols-3 gap-0.5">
                    {["2021_06_04-09_05_02", "2021_07_07-18_57_09", "2021_07_07-19_01_48"].map((image) => (
                      <img key={image} src={`/img/screenshots/a-plague-tale-innocence/A%20Plague%20Tale_%20Innocence-${image}.jpg`} alt="" className="h-full w-full object-cover" />
                    ))}
                  </span>
                  <span className="relative w-full bg-gradient-to-t from-black/95 via-black/70 to-transparent px-4 pb-4 pt-12"><strong className="text-xl font-bold sm:text-2xl">My games</strong></span>
                </a>
                <Link data-gamepad {...tileInteraction(1)} href="/images/screenshots/" className={`relative flex shrink-0 items-end overflow-hidden bg-[#34483b] text-white no-underline outline-offset-2 transition-[width,height] duration-300 focus:z-10 focus:outline-4 focus:outline-[#8cdcff] focus:shadow-[0_0_22px_4px_#35a9ff] motion-reduce:transition-none ${tileSize(1)}`}>
                  <img src="/img/screenshots/a-plague-tale-innocence/A%20Plague%20Tale_%20Innocence-2021_07_07-18_53_51.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
                  <span className="relative w-full bg-gradient-to-t from-black/95 via-black/70 to-transparent px-4 pb-4 pt-12"><strong className="block text-lg">My captures</strong><span className="text-sm">Screenshots</span></span>
                </Link>
                <Link data-gamepad {...tileInteraction(2)} href="/blog/tags/video-game-industry/" className={`flex shrink-0 flex-col justify-end overflow-hidden bg-[#48536d] p-3 text-white no-underline outline-offset-2 transition-[width,height] duration-300 focus:z-10 focus:outline-4 focus:outline-[#8cdcff] focus:shadow-[0_0_22px_4px_#35a9ff] motion-reduce:transition-none ${tileSize(2)}`}>
                  <span aria-hidden="true" className="mb-auto text-3xl">✎</span><strong className="text-lg">My reviews</strong>
                </Link>
                <a data-gamepad {...tileInteraction(3)} href="https://www.trueachievements.com/gamer/bogas04" target="_blank" rel="noopener noreferrer" className={`flex shrink-0 flex-col justify-end overflow-hidden bg-[#365c43] p-3 text-white no-underline outline-offset-2 transition-[width,height] duration-300 focus:z-10 focus:outline-4 focus:outline-[#8cdcff] focus:shadow-[0_0_22px_4px_#35a9ff] motion-reduce:transition-none ${tileSize(3)}`}>
                  <span aria-hidden="true" className="mb-auto text-3xl font-bold">G</span><strong className="text-sm leading-tight sm:text-base">My achievements</strong>
                </a>
              </section>
            </div>
            <section aria-labelledby="gamer-ids" className="mt-5 border-t border-white/25 pt-5">
              <h2 id="gamer-ids" className="mb-3 font-[Arial,Helvetica,sans-serif] text-sm font-bold uppercase tracking-wide text-white/75">Find me in games</h2>
              <dl className="flex flex-wrap gap-x-10 gap-y-4 text-sm sm:text-base">
                <div><dt className="text-white/75">Xbox</dt><dd className="font-bold">bogas04</dd></div>
                <div><dt className="text-white/75">PlayStation</dt><dd className="font-bold">bogas04</dd></div>
                <div><dt className="text-white/75">Steam</dt><dd className="font-bold">bogas_04</dd></div>
              </dl>
            </section>
            <p className="mt-7 text-sm text-white/75"><span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#a9df88] text-xs font-bold text-[#a9df88]">A</span> Select <span className="mx-3 text-white/40">·</span> D-pad / left stick to navigate</p>
          </div>
        </div>
      </main>
      <style jsx>{`
        .plays-splash { animation: plays-startup 3s ease-out forwards; }
        :global(html[data-plays-intro]::view-transition-group(plays-profile)),
        :global(html[data-plays-intro]::view-transition-group(plays-profile-label)),
        :global(html[data-plays-intro]::view-transition-group(plays-route-label)) {
          animation-duration: 650ms;
          animation-timing-function: cubic-bezier(.2, .8, .2, 1);
        }
        :global(html[data-plays-intro]::view-transition-group(root)) {
          animation-duration: 650ms;
        }
        @keyframes plays-startup {
          0%, 65% { opacity: 1; visibility: visible; }
          100% { opacity: 0; visibility: hidden; }
        }
        @media (prefers-reduced-motion: reduce) {
          .plays-splash { animation: none; visibility: hidden; }
        }
      `}</style>
    </>
  );
}
