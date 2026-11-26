import Link from "next/link";
import { useRouter } from "next/router";
import React, {
  startTransition,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  ViewTransition,
} from "react";

import SeoTags from "../components/SeoTags";
import RichText from "../components/home/RichText";
import homeContent from "../data/home.json";
import type { HomeContent } from "../utils/homeContent";

const { workExperience, travelDestinations, talks, socialLinks, heroLinks, education, settings: [settings] } = homeContent as HomeContent;

import GithubIcon from "../components/icons/github";
import Section from "../layout/section";

function HomePage() {
  useEffect(() => {
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "smooth";

    return () => {
      root.style.scrollBehavior = previousScrollBehavior;
    };
  }, []);

  return (
    <>
      <SeoTags
        title={settings.name}
        description={settings.seoDescription}
        imageUrl={settings.profileImage}
        pageUrl="https://bogas04.fyi/"
      />
      <main>
        <Hero />
        <Work />
        <Travel />
        <Education />
        <Talks />
        <Social />
      </main>
    </>
  );
}

export default HomePage;

function Hero() {
  const links = heroLinks;

  return (
    <Section className="min-h-[91vh]" style={{ zIndex: 10 }}>
      <h1 className="flex flex-col items-center text-center max-md:text-7xl md:max-lg:text-8xl">
        <img
          src={settings.profileImage}
          alt={`Portrait of ${settings.name}`}
          className="bg-white rounded-full border-4 border-white min-w-24 min-h-24 w-6 h-6 relative"
        />
        {settings.name}
      </h1>

      <p className="mx-auto mt-2 max-w-2xl text-center text-base leading-relaxed text-white/90 md:text-lg">
        {settings.intro}
      </p>

      <nav aria-label="Find me online" className="mx-auto mt-10 mb-6 grid w-full max-w-4xl grid-cols-2 gap-3 sm:gap-4">
        {(() => {
          const renderLink = ({ label, subtitle, href, icon }: (typeof links)[number]) => {
          const external = /^(?:https?:)?\/\//.test(href);
          const glyph = (
            <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center sm:h-20 sm:w-20">
              {icon === "images" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-full w-full"><rect x="3" y="3" width="18" height="18" rx="1" /><circle cx="16.5" cy="8" r="1.5" fill="currentColor" stroke="none" /><path d="m4 18 5-5 4 4 2-2 5 5" /></svg>}
              {icon === "plays" && <svg viewBox="0 0 48 40" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full"><path d="M13 9h22c4.5 0 7.2 2.7 8.4 7.3l2.5 9.5c1.1 4.3-3.1 6.8-6.2 4.3l-5.8-4.6H14.1l-5.8 4.6c-3.1 2.5-7.3 0-6.2-4.3l2.5-9.5C5.8 11.7 8.5 9 13 9Z" /><path d="M13 14v7M9.5 17.5h7" /><g fill="currentColor" stroke="none"><circle cx="34" cy="13.5" r="1.35" /><circle cx="30" cy="17.5" r="1.35" /><circle cx="38" cy="17.5" r="1.35" /><circle cx="34" cy="21.5" r="1.35" /></g></svg>}
              {icon === "now" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-full w-full"><circle cx="12" cy="12" r="9" /><path d="M12 6v6l4 3" strokeLinecap="square" /></svg>}
              {icon === "blog" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-full w-full"><path d="m4 20 4.5-1 11-11-3.5-3.5-11 11L4 20ZM14.5 6 18 9.5" strokeLinejoin="round" /></svg>}
              {icon === "linkedin" && <span className="font-sans text-4xl font-black leading-none tracking-tight sm:text-7xl">in</span>}
              {icon === "github" && <GithubIcon className="h-full w-full fill-current" />}
            </span>
          );
          const words = <span className="flex min-w-0 flex-col"><span className="text-xl font-bold lowercase leading-none sm:text-3xl">{label}</span><span className="mt-2 text-sm leading-snug opacity-80">{subtitle}</span></span>;
          const common = "group min-w-0 no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none";
          const className = `${common} flex min-h-36 justify-between gap-3 overflow-hidden bg-[#30145e] p-4 text-white transition-colors sm:min-h-44 sm:flex-row sm:items-end sm:p-5 sm:hover:bg-[#49217d] flex-col-reverse items-start`;
          const content = <>{words}<span className="opacity-80 transition-transform group-hover:rotate-[-8deg] motion-reduce:transform-none">{glyph}</span></>;
          return external ? (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer" className={className}>{content}</a>
          ) : (
            <Link key={href} href={href} className={className}>{content}</Link>
          );
          };
          const socialLinks = links.filter((link) => link.icon === "linkedin" || link.icon === "github");
          return <>
            {links.filter((link) => link.icon !== "linkedin" && link.icon !== "github").map((link) => renderLink(link))}
            <span className="contents">
              {socialLinks.map((link) => renderLink(link))}
            </span>
          </>;
        })()}
      </nav>
    </Section>
  );
}
// Each boundary keeps its own angle, without skewing the section or its contents.
const sectionEdge = "!pt-[clamp(12px,2.5vw,36px)] before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-[clamp(12px,2.5vw,36px)] before:content-['']";

function Work() {
  const router = useRouter();
  const chronologicalJobs = chronologicalWorkExperience;
  const readingIdRef = useRef<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const rulerRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const nextSectionTopRef = useRef<number | null>(null);
  const [readingId, setReadingId] = useState<string | null>(null);
  const reading = readingId !== null;
  const [activeIndex, setActiveIndex] = useState(chronologicalJobs.length - 1);
  const [chosenYear, setChosenYear] = useState<number | null>(null);
  const updateActive = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const center = carousel.scrollLeft + carousel.clientWidth / 2;
    const cards = Array.from(carousel.querySelectorAll<HTMLElement>("[data-work-card]"));
    const closest = cards.reduce((best, card, index) =>
      Math.abs(card.offsetLeft + card.offsetWidth / 2 - center) <
      Math.abs(cards[best].offsetLeft + cards[best].offsetWidth / 2 - center) ? index : best, 0);
    setActiveIndex(closest);
  };
  const moveTo = (index: number) => {
    const carousel = carouselRef.current;
    const card = carousel?.querySelectorAll<HTMLElement>("[data-work-card]")[index];
    if (!carousel || !card) return;
    carousel.scrollTo({ left: card.offsetLeft + card.offsetWidth / 2 - carousel.clientWidth / 2,
      behavior: "instant" });
  };
  const updateWorkUrl = (id: string | null, replace = false) => {
    const url = new URL(window.location.href);
    if (id) {
      url.searchParams.set("work", id);
      url.hash = "work";
    } else {
      url.searchParams.delete("work");
    }
    const href = `${url.pathname}${url.search}${url.hash}`;
    void (replace ? router.replace(href, undefined, { shallow: true, scroll: false }) : router.push(href, undefined, { shallow: true, scroll: false }));
  };
  const changeReading = (next: boolean) => {
    if (!next) {
      document.getElementById("work")?.scrollIntoView({ block: "start", behavior: "instant" });
    }
    const id = next ? workId(chronologicalJobs[activeIndex]) : null;
    readingIdRef.current = id;
    setReadingId(id);
    updateWorkUrl(id);
  };
  useEffect(() => {
    if (!router.isReady) return;
    const syncWorkFromUrl = () => {
      const id = new URL(window.location.href).searchParams.get("work");
      const index = chronologicalJobs.findIndex((jobs) => workId(jobs) === id);
      const nextId = index < 0 ? null : id;
      if (nextId === readingIdRef.current) return;
      readingIdRef.current = nextId;
      if (index >= 0) {
        document.getElementById("work")?.scrollIntoView({ block: "start", behavior: "instant" });
        setActiveIndex(index);
        setReadingId(nextId);
      } else {
        setReadingId(null);
      }
    };
    syncWorkFromUrl();
    window.addEventListener("popstate", syncWorkFromUrl);
    router.events.on("routeChangeComplete", syncWorkFromUrl);
    router.events.on("hashChangeComplete", syncWorkFromUrl);
    return () => {
      window.removeEventListener("popstate", syncWorkFromUrl);
      router.events.off("routeChangeComplete", syncWorkFromUrl);
      router.events.off("hashChangeComplete", syncWorkFromUrl);
    };
  }, [router.isReady, router.events]);
  useLayoutEffect(() => {
    if (!reading) {
      moveTo(activeIndex);
      if (nextSectionTopRef.current !== null) {
        const nextSection = document.getElementById("travel");
        if (nextSection) {
          window.scrollBy({ top: nextSection.getBoundingClientRect().top - nextSectionTopRef.current, behavior: "instant" });
        }
        nextSectionTopRef.current = null;
      }
    }
  }, [reading]);
  useEffect(() => {
    if (!reading) return;
    const startY = window.scrollY;
    const onScroll = () => {
      const end = endRef.current;
      if (end && window.scrollY > startY + 40 && end.getBoundingClientRect().bottom <= 0) {
        nextSectionTopRef.current = document.getElementById("travel")?.getBoundingClientRect().top ?? null;
        readingIdRef.current = null;
        setReadingId(null);
        updateWorkUrl(null, true);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reading]);
  const bounds = workYearBounds;
  const firstYear = workFirstYear;
  const lastYear = workLastYear;
  const isWildcard = activeIndex === chronologicalJobs.length;
  const selectedYear = isWildcard ? null : chosenYear !== null && chosenYear >= bounds[activeIndex].start && chosenYear <= bounds[activeIndex].end
    ? chosenYear : bounds[activeIndex].end;
  useEffect(() => {
    const ruler = rulerRef.current;
    const selected = ruler?.querySelector<HTMLElement>("[aria-pressed=true]");
    if (ruler && selected) ruler.scrollTo({ left: selected.offsetLeft + selected.offsetWidth / 2 - ruler.clientWidth / 2, behavior: "instant" });
  }, [selectedYear, reading]);
  const selectYear = (year: number) => {
    setChosenYear(year);
    const matching = bounds.findLastIndex((period) => year >= period.start && year <= period.end);
    const closest = matching >= 0 ? matching : bounds.reduce((best, period, index) =>
      Math.abs(period.end - year) < Math.abs(bounds[best].end - year) ? index : best, 0);
    moveTo(closest);
  };
  return (
    <Section
      className={`${sectionEdge} before:bg-[#673ab7] before:[clip-path:polygon(0_0,100%_0,100%_65%,0_0)] [&_h2]:!mx-[-5vw] [&_h2]:!px-[calc(5vw+10px)]`}
      color="grey"
      style={{ zIndex: 12 }}
      id="work"
    >
      <h2>{settings.workHeading}</h2>

      <div className="relative -mx-[5vw] pt-3">
        {reading ? (
          <>
            <div className="sticky top-[calc(clamp(2.7rem,6vw,4.2rem)+4vw+1rem)] z-20 flex h-0 justify-end pr-[calc(5vw+10px)]">
              <button type="button" onClick={() => {
                const close = () => changeReading(false);
                if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) close();
                else startTransition(close);
              }} aria-label="Close highlights" className="flex h-11 w-11 items-center justify-center border-2 border-current bg-white text-3xl font-bold leading-none text-[#261a38] transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current motion-reduce:transition-none">×</button>
            </div>
            <WorkExperience jobs={chronologicalJobs[activeIndex]} offset={0} onSelect={() => {}} reading onReadingChange={changeReading} />
            <div ref={endRef} className="h-1" aria-hidden="true" />
          </>
        ) : <>
        <div ref={carouselRef} onScroll={updateActive} role="region" aria-roledescription="carousel" aria-label="Work experience" tabIndex={0}
          className="relative flex items-stretch overflow-x-auto overscroll-x-contain snap-x snap-mandatory px-[max(1rem,calc((100%-min(34vw,14rem))/2))] py-8 [perspective:1000px] [scrollbar-width:thin] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white">
          {chronologicalJobs.map((jobs, index) => (
            <div key={jobs[0].id} data-work-card style={{ zIndex: 100 - Math.abs(index - activeIndex) }} className="relative flex w-[min(34vw,14rem)] shrink-0 snap-center">
              <WorkExperience jobs={jobs} offset={index - activeIndex} onSelect={() => moveTo(index)} reading={false} onReadingChange={changeReading} />
            </div>
          ))}
          <div data-work-card style={{ zIndex: 100 - Math.abs(chronologicalJobs.length - activeIndex) }} className="relative flex w-[min(34vw,14rem)] shrink-0 snap-center">
            <a href={settings.wildcardUrl} target="_blank" rel="noopener noreferrer"
              onClick={(event) => { if (!isWildcard) { event.preventDefault(); moveTo(chronologicalJobs.length); } }}
              style={{ transform: isWildcard ? "none" : "perspective(1000px) rotateY(-55deg) scale(0.88)" }}
              className={`relative ml-[calc((min(34vw,14rem)-min(70vw,30rem))/2)] flex w-[min(70vw,30rem)] shrink-0 flex-col justify-between bg-[#ffdf5d] p-5 text-[#261a38] no-underline shadow-[0_12px_35px_rgba(0,0,0,0.6)] transition-[transform,filter] duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:p-8 motion-reduce:transition-none ${isWildcard ? "md:hover:grayscale" : "grayscale brightness-75"}`}>
              <span aria-hidden="true" className="font-body text-[clamp(7rem,20vw,12rem)] font-extrabold leading-none">?</span>
              <span><span className="block font-body text-2xl font-extrabold">{settings.wildcardTitle}</span><span className="mt-2 block font-display text-lg sm:text-xl">{settings.wildcardText}</span></span>
            </a>
          </div>
        </div>
        <div className="mx-auto mt-4 max-w-5xl px-[5vw]">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-2 border-b border-white/20 pb-3">
            <p className="m-0 font-display text-xl leading-tight sm:text-2xl">{isWildcard ? settings.wildcardTitle : chronologicalJobs[activeIndex][0].company} {selectedYear !== null && <span className="font-utility text-sm text-white/70">/ {selectedYear}</span>}</p>
            <p className="m-0 font-utility text-xs uppercase tracking-wide text-white/70">{settings.carouselHint}</p>
          </div>
          <div ref={rulerRef} className="overflow-x-auto pb-3 [scrollbar-width:thin]" aria-label="Work timeline">
            <div className="relative flex min-w-[42rem] border-t-2 border-white/70 pt-0">
              {Array.from({ length: lastYear - firstYear + 1 }, (_, index) => firstYear + index).map((year) => (
                <button key={year} type="button" onClick={() => selectYear(year)} aria-label={`Show work from ${year}`} aria-pressed={year === selectedYear}
                  className={`group relative flex min-h-14 flex-1 flex-col items-center pt-4 text-xs tabular-nums focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white ${year === selectedYear ? "font-bold text-white" : "text-white/65 hover:text-white"}`}>
                  <span aria-hidden="true" className={`absolute top-0 left-1/2 h-3 w-px -translate-x-1/2 ${year === selectedYear ? "h-4 w-1 bg-white" : "bg-white/70"}`} />
                  <span aria-hidden="true" className="absolute top-0 left-1/4 h-1.5 w-px bg-white/40" />
                  <span aria-hidden="true" className="absolute top-0 left-3/4 h-1.5 w-px bg-white/40" />
                  {year}
                </button>
              ))}
            </div>
          </div>
        </div>
        </>}
        <div className="mt-12 px-[5vw] pb-4 text-2xl font-bold uppercase">
          And much more, meet up for a &#9749; coffee if my work interests you
        </div>
      </div>
    </Section>
  );
}

const workCardThemes: Record<string, string> = {
  udaan: "bg-[#df1e3a]",
  "swiggy-sde3": "bg-[#fc8019] text-slate-950",
  "swiggy-sde2": "bg-[#fc8019] text-slate-950",
  housing: "bg-[#6d28d9]",
  samsung: "bg-[#1428a0]",
  "samsung-trainee": "bg-[#1428a0]",
  refiral: "bg-teal-600",
};
const defaultWorkCardTheme = "bg-[#673ab7]";
const formatEmploymentLength = (duration: string) => {
  const [start, end] = duration.split(/\s[-–]\s/);
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const parseMonth = (value: string) => {
    const [month, year] = value.split(" ");
    const monthIndex = monthNames.indexOf(month);
    return monthIndex < 0 || !/^\d{4}$/.test(year ?? "") ? null : Number(year) * 12 + monthIndex;
  };
  const startMonth = parseMonth(start);
  const now = new Date();
  const endMonth = end === "Present" ? now.getFullYear() * 12 + now.getMonth() : parseMonth(end ?? "");
  if (startMonth === null || endMonth === null) return null;
  const totalMonths = Math.max(0, endMonth - startMonth);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  return (
    [years && `${years}y`, months && `${months}m`].filter(Boolean).join(" ") ||
    "0m"
  );
};

const workHighlightClasses = "[&_mark]:[box-decoration-break:clone] [&_mark]:bg-transparent [&_mark]:[background-image:linear-gradient(177deg,transparent_0%,transparent_7%,#ffdf5d_8%,#ffdf5d_92%,transparent_93%)] [&_mark]:px-1 [&_mark]:font-bold [&_mark]:text-[#261a38]";

function WorkExperience({ jobs, offset, onSelect, reading, onReadingChange }: { jobs: (typeof workExperience)[number][]; offset: number; onSelect: () => void; reading: boolean; onReadingChange: (reading: boolean) => void }) {
  const job = jobs[0];
  const isGrouped = jobs.length > 1;
  const rolesInChronologicalOrder = isGrouped ? [...jobs].reverse() : jobs;
  const roleProgression = isGrouped
    ? rolesInChronologicalOrder.map((role) => role.position)
    : (job.roleProgression?.length ? job.roleProgression : [job.position]);
  const toggleDetails = () => {
    const update = () => onReadingChange(!reading);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) update();
    else startTransition(update);
  };
  const handleCardClick = (event: React.MouseEvent<HTMLElement>) => {
    const hasTextSelection = window.getSelection()?.type === "Range";
    if (
      event.defaultPrevented ||
      hasTextSelection ||
      (event.target as Element).closest("a, button")
    )
      return;
    toggleDetails();
  };
  const isExpanded = reading;
  const achievements = jobs.flatMap((role) => role.achievements ?? []);
  const management = job.id === "udaan" ? job.descriptions.filter((description) => description.title === "Management") : [];
  const hasLongAchievements = achievements.some((achievement) => achievement.length > 180);
  const contentId = `work-experience-${job.id}`;
  const theme = workCardThemes[job.id] ?? defaultWorkCardTheme;
  const combinedDuration = isGrouped
    ? `${jobs[jobs.length - 1].duration.split(" - ")[0]} - ${job.duration.split(" - ")[1]}`
    : job.duration;
  const employmentLength = formatEmploymentLength(combinedDuration);

  return (
    <ViewTransition name={`work-tile-${job.id}`}>
    <article
      onClickCapture={(event) => {
        if (offset !== 0) {
          event.preventDefault();
          event.stopPropagation();
          onSelect();
        }
      }}
      onClick={reading ? undefined : handleCardClick}
      style={{
        transform: offset === 0 ? "none" : `perspective(1000px) rotateY(${offset < 0 ? 55 : -55}deg) scale(0.88)`,
      }}
      className={`relative p-5 ${reading ? "w-full cursor-auto" : "flex flex-col cursor-pointer"} ${reading ? "" : "ml-[calc((min(34vw,14rem)-min(70vw,30rem))/2)] w-[min(70vw,30rem)] shrink-0"} shadow-[0_12px_35px_rgba(0,0,0,0.6)] transition-[transform,opacity,filter] duration-300 sm:p-8 motion-reduce:transition-none ${reading ? "!px-[calc(5vw+10px)] py-8 sm:py-12 lg:grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-12" : ""} ${offset === 0 ? "" : "grayscale brightness-75"} ${theme} ${reading ? "" : "md:hover:grayscale"}`}
    >
      <div className={reading ? `mx-auto w-full max-w-5xl ${hasLongAchievements ? "" : management.length ? "lg:[@media(min-height:1100px)]:sticky lg:[@media(min-height:1100px)]:top-[calc(clamp(2.7rem,6vw,4.2rem)+4vw+1rem)]" : "lg:sticky lg:top-[calc(clamp(2.7rem,6vw,4.2rem)+4vw+1rem)]"}` : "flex flex-1 flex-col"}>
        <h3 className={reading ? "m-0 pr-14" : "m-0"}>
          <button
            type="button"
            aria-expanded={isExpanded}
            aria-controls={contentId}
            onClick={toggleDetails}
            className={`cursor-pointer font-body text-left font-extrabold leading-tight tracking-[-0.03em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current ${reading ? "text-[clamp(2.25rem,5vw,4rem)]" : "text-[clamp(1.2rem,3vw,2.1rem)]"}`}
          >
            <ViewTransition name={`work-company-${job.id}`}>
              <span className="block">{job.company}</span>
            </ViewTransition>
            <ViewTransition name={`work-role-${job.id}`}>
              <span className={`mt-3 block font-body font-medium normal-case ${reading ? "text-lg sm:text-2xl" : "text-base sm:text-lg"}`}>
                {roleProgression.join(" → ")}
              </span>
            </ViewTransition>
          </button>
        </h3>
        <ViewTransition name={`work-meta-${job.id}`}>
        <div className="mt-6 flex flex-wrap items-start gap-3 font-body text-sm font-semibold">
          <span className="bg-black/15 px-3 py-1.5">
            {combinedDuration}{" "}
            {employmentLength && <span className="block sm:inline">({employmentLength})</span>}
          </span>
          <a
            href={job.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${job.company}'s website`}
            className="bg-white/20 px-3 py-1.5 no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
          >
            Website ↗
          </a>
        </div>
        </ViewTransition>
        <div className={reading ? "mt-8 flex flex-col items-start gap-5 border-t border-current/30 pt-6" : "mt-6 flex flex-1 flex-col items-start gap-3"}>
          <button
            type="button"
            aria-expanded={isExpanded}
            aria-controls={contentId}
            onClick={toggleDetails}
            className={`flex min-h-11 shrink-0 items-center gap-3 border-2 border-[#261a38] bg-[#ffdf5d] px-4 py-2 font-body text-base font-extrabold text-[#261a38] shadow-[4px_4px_0_#261a38] transition-[transform,box-shadow] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#261a38] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current motion-reduce:transition-none ${reading ? "" : "order-2 mt-auto"}`}
          >
            {isExpanded ? "Hide highlights ↑" : "Read highlights ↓"}
          </button>
          <ViewTransition name={`work-summary-${job.id}`}>
          <p className={`m-0 flex-1 font-display leading-relaxed normal-case ${reading ? "max-w-3xl text-lg font-medium sm:text-2xl" : "order-1 text-base sm:text-xl"}`}>
            {isGrouped
              ? (job.groupSummary || rolesInChronologicalOrder.map((role) => role.summary).join(" "))
              : job.summary}
          </p>
          </ViewTransition>
        </div>
        {reading && management.map((section) => (
          <section key={section.title} className={`mt-8 border-t border-current/30 pt-6 ${workHighlightClasses}`}>
            <h4 className="mb-4 font-display text-2xl font-semibold leading-tight sm:text-3xl">{section.title}</h4>
            <ul className="list-disc space-y-3 pl-6 text-base leading-relaxed sm:text-lg marker:opacity-70">
              {section.items.map((item, index) => (
                <li key={index}><RichText>{item}</RichText></li>
              ))}
            </ul>
          </section>
        ))}
        {reading && achievements.length > 0 && (
          <section className={`mt-8 border-t border-current/30 pt-6 ${workHighlightClasses}`}>
            <h4 className="mb-4 font-display text-2xl font-semibold leading-tight sm:text-3xl">Major Achievements</h4>
            <ul className="list-disc space-y-3 pl-6 text-base leading-relaxed sm:text-lg marker:opacity-70">
              {achievements.map((achievement, index) => (
                <li key={index}><RichText>{achievement}</RichText></li>
              ))}
            </ul>
          </section>
        )}
      </div>
      {isExpanded && (
        <div id={contentId} className="mx-auto mt-12 w-full max-w-5xl border-t-2 border-current/30 pt-8 lg:mt-0 lg:border-t-0 lg:border-l-2 lg:pl-10 lg:pt-14">
          {jobs.map((role, index) => (
            <section key={role.id} className={index ? "mt-12 border-t-2 border-current/30 pt-10" : ""}>
              {isGrouped && (
                <h4 className="mb-6 font-body text-2xl font-bold sm:text-3xl">
                  {role.position}
                </h4>
              )}
              <WorkDetails job={role} />
            </section>
          ))}
        </div>
      )}
    </article>
    </ViewTransition>
  );
}

function WorkDetails({ job }: { job: (typeof workExperience)[number] }) {
  return (
    <dl className={`grid gap-x-8 gap-y-3 font-body text-base leading-relaxed sm:text-lg ${workHighlightClasses} [&>dt]:self-start [&>dt]:py-1 [&>dd]:mb-6 [&>dd]:min-w-0 [&>dd]:py-1`}>
      {job.team && (
        <>
          <dt className="text-xs font-bold uppercase tracking-wider opacity-75">Team</dt>
          <dd><RichText>{job.team}</RichText></dd>
        </>
      )}
      {job.descriptions.filter((desc) => job.id !== "udaan" || desc.title !== "Management").map((desc, index) => (
        <React.Fragment key={index}>
          <dt className="border-t border-current/30 pt-6 font-display text-2xl font-semibold leading-tight first:border-t-0 first:pt-0 sm:text-3xl">{desc.title}</dt>
          <dd>
            {desc.title === "Description" &&
            desc.items.length === 1 ? (
              <div><RichText>{desc.items[0]}</RichText></div>
            ) : (
              <>
                <ul className="list-disc space-y-3 pl-6 marker:opacity-70">
                  {desc.items.map((item, itemIndex) => (
                    <li key={itemIndex}><RichText>{item}</RichText></li>
                  ))}
                </ul>
              </>
            )}
          </dd>
        </React.Fragment>
      ))}
    </dl>
  );
}

function Travel() {
  const [shownCard, setShownCard] = useState(null);

  useEffect(() => {
    const onEscapePress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShownCard(null);
      }
    };
    window.addEventListener("keydown", onEscapePress);
    return () => {
      window.removeEventListener("keydown", onEscapePress);
    };
  }, []);

  // Travel destinations with coordinates and info
  const markers = travelDestinations.map((destination, index) => {
    const position = coordsToPosition(destination.lat, destination.lng);

    return (
      <div
        key={destination.name}
        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-[0]"
        style={{
          left: `${position.x}%`,
          top: `calc(${position.y}% + ${destination.markerOffsetY ?? 0}px)`,
        }}
      >
        <button
          className="appearance-none bg-transparent relative bg-white h-2.5 w-2.5 flex border border-black rounded-full text-4xl cursor-pointer transition-transform duration-200 ease-in-out hover:scale-150 active:scale-[1.4]"
          aria-label={`Show photos from ${destination.name}`}
          onClick={(e) => {
            e.stopPropagation();
            setShownCard(destination);
          }}
        >
          <span className="absolute -top-10">📌</span>
        </button>
      </div>
    );
  });

  return (
    <Section
      className={`${sectionEdge} before:bg-[#343a40] before:[clip-path:polygon(0_0,100%_0,0_100%)] select-none`}
      color="yellow"
      style={{ zIndex: 11 }}
      id="travel"
    >
      <h2>{settings.travelHeading}</h2>

      <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed sm:hidden"><RichText>{settings.travelIntro}</RichText></p>

      <div
        className="flex justify-center p-8 relative max-sm:hidden "
        onClick={(e) => {
          e.stopPropagation();
          setShownCard(null);
        }}
      >
        <div className="relative inline-block">
          <img
            src="/assets/map.png"
            alt="Grayscale world map used as the background for interactive pins marking Divjot Singh's travel destinations"
            className="grayscale brightness-150 w-[80vw]"
          />
          {markers}

          {shownCard ? (
            <div
              className="absolute z-[1000] w-[min(34rem,78vw)] -translate-x-1/2 overflow-visible"
              style={{
                top: coordsToPosition(shownCard.lat, shownCard.lng).y + "%",
                left: coordsToPosition(shownCard.lat, shownCard.lng).x + "%",
              }}
            >
              <PopOver destination={shownCard} />
            </div>
          ) : null}
        </div>
      </div>

      <div className="hidden max-sm:flex flex-col gap-5 mx-auto mr-2 mb-2">
        {travelDestinations.map((destination, index) => (
          <div
            className="relative isolate text-left text-black p-3 before:absolute before:inset-0 before:-z-10 before:rotate-[-1deg] before:bg-[#fff2bd] before:content-['']"
            key={destination.name}
          >
            <ImageGallery
              destination={destination.name}
              albumId={destination.albumId}
              images={destination.images}
              priority={index === 0}
            />
            <h3 style={{ marginBottom: "0.5rem", fontSize: "1.6rem" }}>
              {destination.name}
            </h3>
            <p style={{ margin: "0", fontSize: "1.2rem", opacity: 0.8 }}>
              {destination.description}
            </p>
          </div>
        ))}
      </div>

      <div className="grid max-sm:hidden travel-map grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 p-8 max-w-[1200px] mx-auto">
        {travelDestinations.map((destination) => (
          <button
            className="relative isolate cursor-pointer text-left text-black p-4 before:absolute before:inset-0 before:-z-10 before:rotate-[-2deg] before:bg-[#fff2bd] before:transition-transform before:content-[''] hover:before:rotate-0 motion-reduce:before:transition-none flex flex-col align-top"
            onClick={() => {
              setShownCard(destination);
            }}
            key={destination.name}
          >
            <h3 className="text-3xl text-black">{destination.name}</h3>
            <p style={{ margin: "0", fontSize: "1.2rem", opacity: 0.8 }}>
              {destination.description}
            </p>
          </button>
        ))}
      </div>
    </Section>
  );
}

function Education() {
  const linkStyle = "underline decoration-2 underline-offset-4 hover:text-yellow-200 focus-visible:outline-2 focus-visible:outline-offset-4";
  const highlightedLinkStyle = "[box-decoration-break:clone] bg-[linear-gradient(177deg,transparent_0%,transparent_7%,#ffdf5d_8%,#ffdf5d_92%,transparent_93%)] px-1 font-bold text-[#261a38] underline decoration-2 underline-offset-2 hover:text-[#261a38] focus-visible:outline-2 focus-visible:outline-offset-4";
  return (
    <Section className={`${sectionEdge} before:bg-[#ffc107] before:[clip-path:polygon(0_0,100%_0,100%_100%,0_25%)]`} color="pink" style={{ zIndex: 11 }} id="education">
      <h2>{settings.educationHeading}</h2>
      <div className="pb-14 pt-8 md:pb-20 md:pt-12 [&_a]:transition-colors">
        {education.map((school, index) => (
          <article key={school.name} className={`${index ? "mt-14 lg:mt-24" : ""} grid gap-10 border-t-2 border-white pt-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:pt-12`}>
            <div>
              <h3 className={`m-0 whitespace-pre-line font-display font-medium tracking-[-0.05em] ${index === 0 ? "text-[clamp(3.5rem,8vw,7rem)] leading-none" : "text-[clamp(2.8rem,6vw,5rem)] leading-[1.05]"}`}>{school.name}<span aria-hidden="true">.</span></h3>
              <p className="mt-4 max-w-md whitespace-pre-line text-lg font-bold leading-snug">{school.subtitle}</p>
              <div className="mt-8 max-w-xl space-y-4 text-base leading-relaxed [&_a]:[box-decoration-break:clone] [&_a]:bg-[linear-gradient(177deg,transparent_0%,transparent_7%,#ffdf5d_8%,#ffdf5d_92%,transparent_93%)] [&_a]:px-1 [&_a]:font-bold [&_a]:text-[#261a38] [&_a]:underline [&_a]:decoration-2 [&_a]:underline-offset-2 [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4">
                {school.facts.map((fact, i) => <p key={i}><RichText>{fact}</RichText></p>)}
              </div>
              <a className={`${highlightedLinkStyle} mt-7 inline-block text-base`} href={school.website} target="_blank" rel="noopener noreferrer">{school.websiteLabel}</a>
            </div>
            <blockquote className="relative isolate m-0 border-l-4 border-[#ffdf5d] px-6 pb-6 pt-12 font-display text-[clamp(1.25rem,2vw,1.65rem)] leading-[1.5] before:absolute before:inset-0 before:-z-10 before:translate-x-2 before:translate-y-2 before:rotate-[1deg] before:bg-[#901044] before:content-[''] sm:px-10 sm:pb-10">
              <span aria-hidden="true" className="absolute -top-8 left-4 select-none text-[8rem] leading-none text-[#ffdf5d] sm:left-8">“</span>
              <div className="space-y-5 [&_a]:underline [&_a]:decoration-2 [&_a]:underline-offset-4 [&_a:hover]:text-yellow-200 [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4">{school.story.map((paragraph, i) => <p key={i}><RichText>{paragraph}</RichText></p>)}</div>
            </blockquote>
          </article>
        ))}
        <p className="mt-12 border-t border-white/50 pt-6 text-base"><a className={`${linkStyle} font-bold`} href={settings.resumeUrl} target="_blank" rel="noopener noreferrer">{settings.resumeLabel}</a></p>
      </div>
    </Section>
  );
}
function Talks() {
  const posterColors = ["bg-[#f3e3c4]", "bg-[#d4e2cf]", "bg-[#efd3c9]", "bg-[#ded8e8]"];
  return (
    <Section className={`${sectionEdge} before:bg-[#c2185b] before:[clip-path:polygon(0_0,100%_0,0_75%)]`} color="green" style={{ zIndex: 13 }} id="talks">
      <h2>{settings.talksHeading}</h2>
      <div className="grid gap-7 pb-14 pt-6 md:grid-cols-2 md:pb-20 md:pt-10">
        {talks.map((talk, index) => (
          <article key={talk.title} className={`relative isolate flex min-w-0 flex-col before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:translate-x-2 before:translate-y-2 before:bg-[#163f26] before:content-[''] ${index % 2 === 0 ? "before:rotate-[1deg]" : "before:rotate-[-1deg]"} ${index === 0 ? "md:col-span-2 sm:flex-row" : "sm:flex-row md:flex-col xl:flex-row"}`}>
            <div className={`relative min-w-0 overflow-hidden ${index === 0 ? "sm:w-1/2" : "sm:w-2/5 md:w-full xl:w-2/5"}`}>
              {talk.video ? (
                <a href={talk.video} target="_blank" rel="noopener noreferrer" aria-label={`Watch ${talk.title}`} className="group block h-full focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white">
                  <img loading="lazy" className="aspect-[16/10] h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none" alt="" src={talk.image} />
                  <span aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"><span className="flex h-16 w-16 items-center justify-center bg-[#f3e3c4] pl-1 text-3xl text-[#193527]">▶</span></span>
                </a>
              ) : (
                <img loading="lazy" className="aspect-[16/10] h-full w-full object-cover" alt={`Thumbnail for ${talk.title}`} src={talk.image} />
              )}
            </div>
            <div className={`flex min-w-0 flex-1 flex-col items-start justify-between gap-5 p-5 text-[#193527] sm:p-7 ${posterColors[index % posterColors.length]}`}>
              <h3 className={`m-0 font-body font-extrabold leading-[1.1] tracking-[-0.03em] ${index === 0 ? "text-[clamp(2rem,4vw,3.5rem)]" : "text-[clamp(1.5rem,2.5vw,2.5rem)]"}`}>
                {talk.title}
              </h3>
              <div className="w-full">
                <p className="mb-4 text-base font-medium leading-snug">{talk.event}</p>
                <div className="flex flex-wrap gap-2">
                  <a className="bg-[#193527] px-3 py-2 text-sm font-bold text-white no-underline hover:bg-[#315b41] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current" href={talk.link} target="_blank" rel="noopener noreferrer" aria-label={`${talk.title}: ${talk.linkLabel.toLowerCase()}`}>{talk.linkLabel} ↗</a>
                  {talk.video && <a className="bg-[#193527] px-3 py-2 text-sm font-bold text-white no-underline hover:bg-[#315b41] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current" href={talk.video} target="_blank" rel="noopener noreferrer" aria-label={`Watch ${talk.title}`}>Video ↗</a>}
                  {talk.eventLink !== talk.video && <a className="bg-[#193527] px-3 py-2 text-sm font-bold text-white no-underline hover:bg-[#315b41] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current" href={talk.eventLink} target="_blank" rel="noopener noreferrer" aria-label={`${talk.title}: event details`}>Event ↗</a>}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Social() {
  return (
    <Section className={`${sectionEdge} before:bg-[#2e7d32] before:[clip-path:polygon(0_0,100%_0,100%_80%,0_10%)]`} color="blue" style={{ zIndex: 13 }} id="social">
      <h2>{settings.socialHeading}</h2>
      <div className="w-full px-4">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {socialLinks.map((link) => (
            <div className="px-4 text-center" key={link.url}>
              <p className="h-96 flex justify-center items-center text-2xl font-bold pb-4 uppercase">
                {link.url.startsWith("/") && !link.url.startsWith("//") ? (
                  <Link className="text-blue-50" href={link.url}>{link.title}</Link>
                ) : (
                  <a target="_blank" rel="noopener noreferrer" className="text-blue-50" href={link.url}>{link.title}</a>
                )}
              </p>
            </div>
          ))}
          <div className="col-span-full px-4 text-center">
            <p className="text-8xl text-center text-[120px]">🤷‍♂️</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

// Utility function to convert lat/lng to percentage position on Equirectangular projection
const coordsToPosition = (lat: number, lng: number) => ({
  x: ((lng + 180) / 360) * 100,
  y: ((90 - lat) / 180) * 100 + 10,
});


const companyGroupKey = (id: string) => {
  if (id.startsWith("swiggy-")) return "swiggy";
  if (id === "samsung" || id.startsWith("samsung-")) return "samsung";
  return null;
};

const workId = (jobs: (typeof workExperience)[number][]) =>
  companyGroupKey(jobs[0].id) ?? jobs[0].id;

const groupedWorkExperience = workExperience.reduce<
  Array<(typeof workExperience)[number][]>
>((groups, job) => {
  const groupKey = companyGroupKey(job.id);
  if (groupKey) {
    const companyRoles = groups.find(
      (group) => companyGroupKey(group[0].id) === groupKey,
    );
    if (companyRoles) {
      companyRoles.push(job);
      return groups;
    }
  }

  groups.push([job]);
  return groups;
}, []);

const chronologicalWorkExperience = [...groupedWorkExperience].reverse();
const workYearBounds = chronologicalWorkExperience.map((jobs) => {
  const start = jobs[jobs.length - 1].duration.split(" - ")[0];
  const end = jobs[0].duration.split(" - ")[1];
  return {
    start: Number(start.slice(-4)),
    end: end === "Present" ? new Date().getFullYear() : Number(end.slice(-4)),
  };
});
const workFirstYear = Math.min(...workYearBounds.map((period) => period.start));
const workLastYear = Math.max(...workYearBounds.map((period) => period.end));






function ImageGallery({
  destination,
  albumId,
  images,
  priority = false,
}: {
  destination: string;
  albumId: string;
  images: string[];
  priority?: boolean;
}) {
  // image carousel using css, overflow, scroll snap, mobile friendly
  return (
    <div className="image-gallery flex overflow-x-auto gap-2 pb-2 mb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {images.map((image, index) => (
        <Link
          href={`/images/${encodeURIComponent(albumId)}/${encodeURIComponent(
            image.split("/").pop()!.replace(/\.[^.]+$/, ""),
          )}`}
          key={image}
          className="h-[min(45vw,20rem)] shrink-0 cursor-pointer [scroll-snap-align:start] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          aria-label={`View photo ${index + 1} from ${destination}`}
        >
          <img
            src={image}
            alt={`${destination}, photo ${index + 1}`}
            className="block h-full w-auto border border-white/20"
            loading={priority && index === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        </Link>
      ))}
    </div>
  );
}
function PopOver({
  destination,
}: {
  destination: (typeof travelDestinations)[0];
}) {
  const [rotateBy, setRotateBy] = useState(0);
  const [pendingDirection, setPendingDirection] = useState<
    "previous" | "next" | null
  >(null);
  const [preparingDirection, setPreparingDirection] = useState<
    "previous" | "next" | null
  >(null);
  const imageReadyPromises = useRef(new Map<string, Promise<void>>());
  const activeImageIndex = rotateBy % destination.images.length;
  const activeImage = destination.images[activeImageIndex];
  const polaroidCount = Math.min(destination.images.length, 3);
  const getImageIndex = useCallback(
    (direction: "previous" | "next") =>
      (activeImageIndex +
        (direction === "next" ? 1 : -1) +
        destination.images.length) %
      destination.images.length,
    [activeImageIndex, destination.images.length],
  );
  const preloadImage = useCallback((source: string) => {
    const existingPromise = imageReadyPromises.current.get(source);
    if (existingPromise) return existingPromise;

    const readyPromise = new Promise<void>((resolve) => {
      const image = new Image();
      const finishLoading = () => {
        if (typeof image.decode === "function") {
          image
            .decode()
            .catch(() => {})
            .then(resolve);
          return;
        }
        resolve();
      };

      image.onload = finishLoading;
      image.onerror = () => resolve();
      image.src = source;
      if (image.complete) finishLoading();
    });

    imageReadyPromises.current.set(source, readyPromise);
    return readyPromise;
  }, []);

  useEffect(() => {
    void preloadImage(destination.images[getImageIndex("previous")]);
    void preloadImage(destination.images[getImageIndex("next")]);
  }, [destination.images, getImageIndex, preloadImage]);

  const polaroidImages = Array.from(
    { length: polaroidCount - 1 },
    (_, index) => {
      const offset = polaroidCount - 1 - index;
      return destination.images[
        (activeImageIndex - offset + destination.images.length) %
          destination.images.length
      ];
    },
  );
  const incomingImage = pendingDirection
    ? destination.images[getImageIndex(pendingDirection)]
    : null;
  const backgroundTransforms = [
    "translateX(-50%) translate(-10%, 4%) rotate(-6deg)",
    "translateX(-50%) translate(10%, 2%) rotate(5deg)",
  ];
  const showPhoto = async (direction: "previous" | "next") => {
    if (pendingDirection || preparingDirection) return;

    setPreparingDirection(direction);
    const nextImageIndex = getImageIndex(direction);
    await preloadImage(destination.images[nextImageIndex]);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRotateBy(nextImageIndex);
      setPreparingDirection(null);
      return;
    }

    document.documentElement.dataset.travelPhotoDirection = direction;
    startTransition(() => setRotateBy(nextImageIndex));
  };
  const finishCardTransition = () => {
    if (!pendingDirection) {
      return;
    }

    setRotateBy((current) => {
      const step = pendingDirection === "next" ? 1 : -1;
      return (
        (current + step + destination.images.length) % destination.images.length
      );
    });
    setPendingDirection(null);
  };
  return (
    <div
      className="relative mt-8 h-[clamp(24rem,45vw,38rem)] w-full text-black"
      onClick={(e) => e.stopPropagation()}
    >
      {polaroidImages.map((image, index) => (
        <div
          key={`${image}-${index}`}
          aria-hidden="true"
          className="absolute left-1/2 top-0 h-[90%] w-[84%] bg-white p-3 shadow-lg"
          style={{
            transform: backgroundTransforms[index],
            zIndex: index,
          }}
        >
          <img src={image} alt="" className="h-full w-full object-contain" />
        </div>
      ))}

      {incomingImage ? (
        <div
          aria-hidden="true"
          className={`polaroid-card--incoming polaroid-card--incoming-${pendingDirection} absolute left-1/2 top-0 z-[9] h-[94%] w-[88%] bg-white p-4 shadow-xl`}
        >
          <img
            src={incomingImage}
            alt=""
            className="h-[70%] w-full object-contain"
          />
        </div>
      ) : null}

      <ViewTransition
        name="travel-photo"
        update="travel-photo"
        onUpdate={() => () => {
          delete document.documentElement.dataset.travelPhotoDirection;
          setPreparingDirection(null);
        }}
      >
        <div
          className={`polaroid-card absolute left-1/2 top-0 z-10 flex h-[94%] w-[88%] flex-col bg-white p-4 shadow-xl ${
            pendingDirection ? `polaroid-card--${pendingDirection}` : ""
          }`}
          onAnimationEnd={finishCardTransition}
        >
          <div className="relative h-[70%] w-full bg-slate-100">
            <img
              key={activeImage}
              src={activeImage}
              alt={`${destination.name}, photo ${activeImageIndex + 1}`}
              className="h-full w-full object-contain"
            />
            <button
              type="button"
              className="absolute inset-y-0 left-0 w-1/2 cursor-w-resize appearance-none border-0 bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-black"
              onClick={(e) => {
                e.stopPropagation();
                void showPhoto("previous");
              }}
              disabled={Boolean(pendingDirection || preparingDirection)}
              aria-label={`Show previous photo of ${destination.name}`}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 w-1/2 cursor-e-resize appearance-none border-0 bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-black"
              onClick={(e) => {
                e.stopPropagation();
                void showPhoto("next");
              }}
              disabled={Boolean(pendingDirection || preparingDirection)}
              aria-label={`Show next photo of ${destination.name}`}
            />
          </div>

          <div className="flex min-h-0 flex-1 flex-col pt-5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="m-0 text-xl font-semibold leading-tight">
                  {destination.name} ({activeImageIndex + 1}/
                  {destination.images.length})
                </h3>
                <p className="m-0 mt-2 break-words text-lg leading-snug text-gray-700">
                  {destination.description}
                </p>
              </div>
              <Link
                href={`/images/${destination.albumId}/`}
                className="shrink-0 rounded-md border border-gray-300 bg-gray-100 px-3 py-1 text-base font-medium no-underline hover:bg-gray-200"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                View all
              </Link>
            </div>
            <div className="mt-auto flex items-center gap-2 pt-3">
              <button
                type="button"
                aria-label="Show previous photo"
                title="Previous photo"
                className="rounded-md border border-gray-300 bg-gray-100 px-3 py-1 text-2xl leading-none hover:bg-gray-200"
                onClick={(e) => {
                  e.stopPropagation();
                  void showPhoto("previous");
                }}
              >
                <span aria-hidden="true">👈</span>
              </button>
              <button
                type="button"
                aria-label="Show next photo"
                title="Next photo"
                className="rounded-md border border-gray-300 bg-gray-100 px-3 py-1 text-2xl leading-none hover:bg-gray-200"
                onClick={(e) => {
                  e.stopPropagation();
                  void showPhoto("next");
                }}
              >
                <span aria-hidden="true">👉</span>
              </button>
            </div>
          </div>
        </div>
      </ViewTransition>
    </div>
  );
}
