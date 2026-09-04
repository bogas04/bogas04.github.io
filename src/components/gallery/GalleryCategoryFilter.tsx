import Link from "next/link";
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

function dateGroupFor(rawDate: string): Omit<GalleryDateGroup, "images"> {
  const match = rawDate.trim().match(/^(\d{4})(?:-(\d{1,2})(?:-\d{1,2})?)?/);
  if (!match) return { key: "undated", label: "undated", sortValue: "0000" };

  const [, year, month] = match;
  if (!month) return { key: year, label: year, sortValue: `${year}-00` };

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
    const group = dateGroupFor(image.takenAt || albumDates.get(image.album) || "");
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
          <Link href="/image-gallery/" aria-current={!selectedAlbumId ? "page" : undefined} className={itemClass(!selectedAlbumId)}>
            all
          </Link>
        )}
        {onAlbumsSelect ? (
          <button type="button" aria-current={desktopView === "albums" ? "page" : undefined} onClick={onAlbumsSelect} className={itemClass(desktopView === "albums")}>
            albums
          </button>
        ) : (
          <Link href="/image-gallery/?view=albums" className={itemClass(false)}>
            albums
          </Link>
        )}
        {albums.map((album) => (
          <Link
            key={album.id}
            href={`/image-gallery/${album.id}/`}
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
  const groupRefs = useRef<Record<string, HTMLElement | null>>({});

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

  const selectDate = (key: string) => {
    setActiveDateKey(key);
    setDateMenuOpen(false);
    groupRefs.current[key]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section aria-label="All photos">
      <DateNavigator
        groups={groups}
        activeKey={activeDateKey}
        onSelect={selectDate}
        open={dateMenuOpen}
        onOpen={() => setDateMenuOpen(true)}
        onClose={() => setDateMenuOpen(false)}
        showTrigger={false}
      />
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
            <h2 id={`date-${group.key}`} className="mb-5 text-3xl font-light lowercase tracking-[-0.04em] text-white sm:text-4xl">
              <button
                type="button"
                onClick={() => setDateMenuOpen(true)}
                className="text-left transition hover:text-[#1ba1e2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1ba1e2]"
              >
                {group.label}
              </button>
            </h2>
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
              href={`/image-gallery/${album.id}/`}
              onClick={onAlbumSelect ? (event) => {
                event.preventDefault();
                onAlbumSelect(album);
              } : undefined}
              className="group block min-w-0 text-white no-underline"
            >
              <img
                src={cover.thumbUrl}
                srcSet={`${cover.thumbUrl} 480w, ${cover.displayUrl} 1440w`}
                sizes="(min-width: 640px) 46vw, 48vw"
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
          href={`/image-gallery/${album.id}/`}
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
  const [activePaneIndex, setActivePaneIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const paneCount = manifest.albums.length + 2;

  const pathForPane = (paneIndex: number) => {
    const album = manifest.albums[paneIndex - 2];
    return album ? `/image-gallery/${album.id}/` : "/image-gallery/";
  };

  const updatePath = (paneIndex: number) => {
    const nextPath = pathForPane(paneIndex);
    if (window.location.pathname !== nextPath) {
      window.history.pushState({ galleryPane: paneIndex }, "", nextPath);
    }
  };

  const selectPane = (paneIndex: number) => {
    const nextPaneIndex = Math.max(0, Math.min(paneIndex, paneCount - 1));
    setActivePaneIndex(nextPaneIndex);
    updatePath(nextPaneIndex);
    trackRef.current?.scrollTo({
      left: nextPaneIndex * (trackRef.current.clientWidth || 0),
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handlePopState = () => {
      const albumIndex = manifest.albums.findIndex((album) => window.location.pathname === `/image-gallery/${album.id}/`);
      const nextPaneIndex = albumIndex === -1 ? 0 : albumIndex + 2;
      setActivePaneIndex(nextPaneIndex);
      trackRef.current?.scrollTo({ left: nextPaneIndex * (trackRef.current.clientWidth || 0), behavior: "smooth" });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [manifest.albums]);

  const handleTrackScroll = () => {
    const track = trackRef.current;
    if (!track || !track.clientWidth) return;
    const nextPaneIndex = Math.max(0, Math.min(paneCount - 1, Math.round(track.scrollLeft / track.clientWidth)));
    if (nextPaneIndex !== activePaneIndex) {
      setActivePaneIndex(nextPaneIndex);
      updatePath(nextPaneIndex);
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
    const nextPath = nextView === "albums" ? "/image-gallery/?view=albums" : "/image-gallery/";
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
