import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";

import GalleryGrid from "./GalleryGrid";
import type { GalleryAlbum, GalleryImage, GalleryManifest } from "../../utils/gallery";

interface AlbumSidebarProps {
  albums: GalleryAlbum[];
}

type DesktopView = "all" | "albums";

interface GalleryDateGroup {
  key: string;
  label: string;
  sortValue: string;
  images: GalleryImage[];
}

const MONTH_NAMES = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

function dateGroupFor(rawDate: string, groupByYear = false): Omit<GalleryDateGroup, "images"> {
  const match = rawDate.trim().match(/^(\d{4})(?:-(\d{1,2})(?:-\d{1,2})?)?/);
  if (!match) return { key: "undated", label: "undated", sortValue: "0000" };

  const [, year, month] = match;
  if (!month || groupByYear) return { key: year, label: year, sortValue: `${year}-00` };

  const monthNumber = Number(month);
  const monthLabel = MONTH_NAMES[monthNumber - 1] || month;
  return {
    key: `${year}-${month.padStart(2, "0")}`,
    label: `${monthLabel}, ${year}`,
    sortValue: `${year}-${month.padStart(2, "0")}`,
  };
}

function groupImagesByDate(images: GalleryImage[], albums: GalleryAlbum[]): GalleryDateGroup[] {
  const albumDates = new Map(albums.map((album) => [album.id, album.startDate]));
  const groups = new Map<string, GalleryDateGroup>();

  for (const image of images) {
    const group = dateGroupFor(
      image.takenAt || albumDates.get(image.album) || "",
      image.category === "blog",
    );
    const existing = groups.get(group.key);
    if (existing) {
      existing.images.push(image);
    } else {
      groups.set(group.key, { ...group, images: [image] });
    }
  }

  return [...groups.values()].sort((a, b) => b.sortValue.localeCompare(a.sortValue));
}

export function AlbumSidebar({
  albums,
  selectedAlbumId,
  desktopView,
  onAllSelect,
  onAlbumsSelect,
}: AlbumSidebarProps & {
  selectedAlbumId?: string;
  desktopView?: DesktopView;
  onAllSelect?: () => void;
  onAlbumsSelect?: () => void;
}) {
  const itemClass = (isActive: boolean) => `block w-full text-left text-2xl font-light lowercase leading-tight tracking-[-0.04em] no-underline transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1ba1e2] ${isActive ? "text-white" : "text-white/45"}`;

  return (
    <aside className="min-w-0" aria-label="Albums">
      <nav aria-label="Gallery navigation" className="space-y-0">
        {onAllSelect ? (
          <button type="button" aria-current={desktopView === "all" ? "page" : undefined} onClick={onAllSelect} className={itemClass(desktopView === "all")}>
            all
          </button>
        ) : (
          <Link href="/images/" aria-current={!selectedAlbumId ? "page" : undefined} className={itemClass(!selectedAlbumId)}>
            all
          </Link>
        )}
        {onAlbumsSelect ? (
          <button type="button" aria-current={desktopView === "albums" ? "page" : undefined} onClick={onAlbumsSelect} className={itemClass(desktopView === "albums")}>
            albums
          </button>
        ) : (
          <Link href="/images/?view=albums" className={itemClass(false)}>
            albums
          </Link>
        )}
        {albums.map((album) => (
          <Link
            key={album.id}
            href={`/images/${album.id}/`}
            aria-current={album.id === selectedAlbumId ? "page" : undefined}
            className={itemClass(album.id === selectedAlbumId)}
          >
            {album.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

function DateNavigator({
  groups,
  activeKey,
  onSelect,
  open,
  onOpen,
  onClose,
  showTrigger = true,
}: {
  groups: GalleryDateGroup[];
  activeKey: string;
  onSelect: (key: string) => void;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  showTrigger?: boolean;
}) {
  const activeGroup = groups.find((group) => group.key === activeKey) || groups[0];

  if (!activeGroup) return null;

  return (
    <div className={showTrigger ? "relative mb-8" : "relative"}>
      {showTrigger ? (
        <button
          type="button"
          aria-expanded={open}
          onClick={onOpen}
          className="text-2xl font-light lowercase tracking-[-0.04em] text-white transition hover:text-[#1ba1e2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1ba1e2]"
        >
          {activeGroup.label} <span className="ml-1 text-sm">↓</span>
        </button>
      ) : null}
      {open ? (
        <div className="fixed inset-0 z-50 bg-[#1a1a1a] text-white lg:absolute lg:[inset:auto] lg:top-0 lg:left-0 lg:h-auto lg:max-h-[70vh] lg:w-full lg:max-w-[28rem] lg:overflow-y-auto lg:shadow-2xl" role="dialog" aria-modal="true" aria-label="Choose a month or year">
          <div className="flex h-full flex-col px-6 py-6 sm:px-10 sm:py-8 lg:h-auto">
            <div className="flex items-center justify-between gap-6">
              <p className="m-0 text-sm lowercase text-white/45">dates</p>
              <button
                type="button"
                onClick={onClose}
                className="text-sm lowercase text-white/55 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1ba1e2]"
              >
                close
              </button>
            </div>
            <div className="grid content-start gap-4 overflow-y-auto py-12 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-6">
              {groups.map((group) => (
                <button
                  key={group.key}
                  type="button"
                  onClick={() => onSelect(group.key)}
                  className={`text-left text-4xl font-light lowercase tracking-[-0.06em] transition hover:text-[#1ba1e2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1ba1e2] sm:text-6xl ${group.key === activeKey ? "text-white" : "text-white/45"}`}
                >
                  {group.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function AllPhotosView({ manifest }: { manifest: GalleryManifest }) {
  const groups = useMemo(() => groupImagesByDate(manifest.images, manifest.albums), [manifest.albums, manifest.images]);
  const [activeDateKey, setActiveDateKey] = useState(groups[0]?.key || "");
  const [dateMenuOpen, setDateMenuOpen] = useState(false);
  const [dateMenuAnchorKey, setDateMenuAnchorKey] = useState<string | null>(null);
  const groupRefs = useRef<Record<string, HTMLElement | null>>({});
  const pendingDateScroll = useRef<string | null>(null);

  useEffect(() => {
    if (groups.length && !groups.some((group) => group.key === activeDateKey)) {
      setActiveDateKey(groups[0].key);
    }
  }, [activeDateKey, groups]);

  useEffect(() => {
    if (!dateMenuOpen) return undefined;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDateMenuOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dateMenuOpen]);

  useEffect(() => {
    if (dateMenuOpen || !pendingDateScroll.current) return undefined;

    const selectedDate = pendingDateScroll.current;
    let scrollFrame: number | undefined;
    const menuCloseFrame = requestAnimationFrame(() => {
      scrollFrame = requestAnimationFrame(() => {
        const selectedSection = groupRefs.current[selectedDate];
        if (selectedSection) {
          window.scrollTo({
            top: Math.max(0, window.scrollY + selectedSection.getBoundingClientRect().top - 96),
            behavior: "smooth",
          });
        }
        pendingDateScroll.current = null;
      });
    });

    return () => {
      cancelAnimationFrame(menuCloseFrame);
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
    };
  }, [activeDateKey, dateMenuOpen]);

  const selectDate = (key: string) => {
    pendingDateScroll.current = key;
    setActiveDateKey(key);
    setDateMenuOpen(false);
    setDateMenuAnchorKey(null);
  };

  const closeDateMenu = () => {
    setDateMenuOpen(false);
    setDateMenuAnchorKey(null);
  };

  return (
    <section aria-label="All photos">
      <div>
        {groups.map((group) => (
          <section
            key={group.key}
            ref={(element) => {
              groupRefs.current[group.key] = element;
            }}
            className="mb-12 scroll-mt-24"
            aria-labelledby={`date-${group.key}`}
          >
            <div className="relative">
              <h2 id={`date-${group.key}`} className="mb-5 text-3xl font-light lowercase tracking-[-0.04em] text-white sm:text-4xl">
                <button
                  type="button"
                  onClick={() => {
                    setDateMenuAnchorKey(group.key);
                    setDateMenuOpen(true);
                  }}
                  className="text-left transition hover:text-[#1ba1e2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1ba1e2]"
                >
                  {group.label}
                </button>
              </h2>
              {dateMenuAnchorKey === group.key ? (
                <DateNavigator
                  groups={groups}
                  activeKey={activeDateKey}
                  onSelect={selectDate}
                  open={dateMenuOpen}
                  onOpen={() => setDateMenuOpen(true)}
                  onClose={closeDateMenu}
                  showTrigger={false}
                />
              ) : null}
            </div>
            <GalleryGrid images={group.images} />
          </section>
        ))}
      </div>
    </section>
  );
}

function AlbumGrid({
  manifest,
  onAlbumSelect,
}: {
  manifest: GalleryManifest;
  onAlbumSelect?: (album: GalleryAlbum) => void;
}) {
  return (
    <section aria-label="Albums">
      <div className="grid grid-cols-2 gap-x-3 gap-y-8">
        {manifest.albums.map((album) => {
          const cover = manifest.images.find((image) => image.album === album.id && image.id === album.cover)
            || manifest.images.find((image) => image.album === album.id);
          if (!cover) return null;

          return (
            <Link
              key={album.id}
              href={`/images/${album.id}/`}
              onClick={onAlbumSelect ? (event) => {
                event.preventDefault();
                onAlbumSelect(album);
              } : undefined}
              className="group block min-w-0 text-white no-underline"
            >
              <img
                src={cover.thumbUrl}
                alt={cover.alt}
                width={cover.width}
                height={cover.height}
                className="block aspect-[4/3] h-auto w-full object-cover transition duration-300 group-hover:opacity-75"
                loading="lazy"
                decoding="async"
              />
              <h2 className="mt-3 text-lg font-light lowercase leading-tight tracking-[-0.03em]">{album.title}</h2>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function MobileAlbumsView({ manifest, onAlbumSelect }: { manifest: GalleryManifest; onAlbumSelect: (album: GalleryAlbum) => void }) {
  return <AlbumGrid manifest={manifest} onAlbumSelect={onAlbumSelect} />;
}

function DesktopAlbumsView({ manifest }: { manifest: GalleryManifest }) {
  return <AlbumGrid manifest={manifest} />;
}

function MobileGallerySidebar({
  albums,
  activePaneIndex,
  onPaneChange,
}: {
  albums: GalleryAlbum[];
  activePaneIndex: number;
  onPaneChange: (paneIndex: number) => void;
}) {
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Record<string, HTMLElement | null>>({});
  const itemClass = (isActive: boolean) => `shrink-0 scroll-ml-8 text-5xl font-light lowercase leading-none tracking-[-0.06em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1ba1e2] ${isActive ? "text-white" : "text-white/45 hover:text-white"}`;

  useEffect(() => {
    const nav = navRef.current;
    const item = itemRefs.current[String(activePaneIndex)];
    if (!nav || !item) return;

    const navBounds = nav.getBoundingClientRect();
    const itemBounds = item.getBoundingClientRect();
    const leftScroll = nav.scrollLeft + itemBounds.left - navBounds.left - 32;
    nav.scrollTo({ left: Math.max(0, leftScroll), behavior: "smooth" });
  }, [activePaneIndex]);

  return (
    <nav
      ref={navRef}
      aria-label="Gallery views and albums"
      className="sticky top-0 z-30 -mx-4 mb-8 flex gap-7 overflow-x-auto bg-[#1a1a1a] px-4 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <button
        type="button"
        ref={(element) => {
          itemRefs.current["0"] = element;
        }}
        aria-current={activePaneIndex === 0 ? "page" : undefined}
        onClick={() => onPaneChange(0)}
        className={itemClass(activePaneIndex === 0)}
      >
        all
      </button>
      <button
        type="button"
        ref={(element) => {
          itemRefs.current["1"] = element;
        }}
        aria-current={activePaneIndex === 1 ? "page" : undefined}
        onClick={() => onPaneChange(1)}
        className={itemClass(activePaneIndex === 1)}
      >
        albums
      </button>
      {albums.map((album, albumIndex) => (
        <Link
          key={album.id}
          ref={(element) => {
            itemRefs.current[String(albumIndex + 2)] = element;
          }}
          href={`/images/${album.id}/`}
          onClick={(event) => {
            event.preventDefault();
            onPaneChange(albumIndex + 2);
          }}
          aria-current={activePaneIndex === albumIndex + 2 ? "page" : undefined}
          className={`${itemClass(activePaneIndex === albumIndex + 2)} no-underline`}
        >
          {album.title}
        </Link>
      ))}
      <span aria-hidden="true" className="block w-[100vw] shrink-0" />
    </nav>
  );
}

function MobileGallery({ manifest }: { manifest: GalleryManifest }) {
  const router = useRouter();
  const [activePaneIndex, setActivePaneIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const paneCount = manifest.albums.length + 2;

  const pathForPane = (paneIndex: number) => {
    const album = manifest.albums[paneIndex - 2];
    if (album) return `/images/?album=${encodeURIComponent(album.id)}`;
    return paneIndex === 1 ? "/images/?view=albums" : "/images/";
  };

  const paneIndexForPath = () => {
    const parameters = new URLSearchParams(router.asPath.split("?")[1] || "");
    const albumIndex = manifest.albums.findIndex((album) => album.id === parameters.get("album"));
    if (albumIndex !== -1) return albumIndex + 2;
    return parameters.get("view") === "albums" ? 1 : 0;
  };

  const scrollToPane = (paneIndex: number, behavior: ScrollBehavior) => {
    trackRef.current?.scrollTo({
      left: paneIndex * (trackRef.current.clientWidth || 0),
      behavior,
    });
  };

  const selectPane = (paneIndex: number, behavior: ScrollBehavior = "smooth") => {
    const nextPaneIndex = Math.max(0, Math.min(paneIndex, paneCount - 1));
    setActivePaneIndex(nextPaneIndex);
    const nextPath = pathForPane(nextPaneIndex);
    if (router.asPath !== nextPath) void router.push(nextPath, undefined, { scroll: false });
    scrollToPane(nextPaneIndex, behavior);
  };

  useEffect(() => {
    const nextPaneIndex = paneIndexForPath();
    setActivePaneIndex(nextPaneIndex);
    const frame = requestAnimationFrame(() => scrollToPane(nextPaneIndex, "auto"));
    return () => cancelAnimationFrame(frame);
  }, [router.asPath]);

  const handleTrackScroll = () => {
    const track = trackRef.current;
    if (!track || !track.clientWidth) return;
    const nextPaneIndex = Math.max(0, Math.min(paneCount - 1, Math.round(track.scrollLeft / track.clientWidth)));
    if (nextPaneIndex !== activePaneIndex) {
      selectPane(nextPaneIndex);
    }
  };

  return (
    <div>
      <MobileGallerySidebar albums={manifest.albums} activePaneIndex={activePaneIndex} onPaneChange={selectPane} />
      <div
        ref={trackRef}
        onScroll={handleTrackScroll}
        className="-mx-4 flex w-[calc(100%+2rem)] snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="min-w-0 flex-none basis-full snap-start [scroll-snap-stop:always] px-4">
          <AllPhotosView manifest={manifest} />
        </div>
        <div className="min-w-0 flex-none basis-full snap-start [scroll-snap-stop:always] px-4">
          <MobileAlbumsView manifest={manifest} onAlbumSelect={(album) => selectPane(manifest.albums.indexOf(album) + 2)} />
        </div>
        {manifest.albums.map((album) => (
          <div key={album.id} className="min-w-0 flex-none basis-full snap-start [scroll-snap-stop:always] px-4">
            <section aria-label={`${album.title} photos`}>
              {album.summary ? <p className="mb-8 max-w-2xl text-lg font-light text-white/65">{album.summary}</p> : null}
              <GalleryGrid images={manifest.images.filter((image) => image.album === album.id)} />
            </section>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GalleryCategoryFilter({ manifest }: { manifest: GalleryManifest }) {
  const [desktopView, setDesktopView] = useState<DesktopView>("all");

  useEffect(() => {
    const updateDesktopView = () => {
      setDesktopView(new URLSearchParams(window.location.search).get("view") === "albums" ? "albums" : "all");
    };

    updateDesktopView();
    window.addEventListener("popstate", updateDesktopView);
    return () => window.removeEventListener("popstate", updateDesktopView);
  }, []);

  const selectDesktopView = (nextView: DesktopView) => {
    setDesktopView(nextView);
    const nextPath = nextView === "albums" ? "/images/?view=albums" : "/images/";
    if (`${window.location.pathname}${window.location.search}` !== nextPath) {
      window.history.pushState({ galleryView: nextView }, "", nextPath);
    }
  };

  return (
    <section aria-label="Photo library">
      <div className="hidden lg:block">
        <div className="grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10">
          <AlbumSidebar
            albums={manifest.albums}
            desktopView={desktopView}
            onAllSelect={() => selectDesktopView("all")}
            onAlbumsSelect={() => selectDesktopView("albums")}
          />
          {desktopView === "albums" ? <DesktopAlbumsView manifest={manifest} /> : <AllPhotosView manifest={manifest} />}
        </div>
      </div>
      <div className="lg:hidden">
        <MobileGallery manifest={manifest} />
      </div>
    </section>
  );
}
