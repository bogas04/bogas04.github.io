import Head from "next/head";
import type { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import type { HomeContent } from "../utils/homeContent";

export const getStaticProps: GetStaticProps = async () =>
  process.env.NODE_ENV === "development" ? { props: {} } : { notFound: true };

type Section = keyof HomeContent;
type Value = string | number | boolean | Value[] | { [key: string]: Value };
const sections: { key: Section; label: string }[] = [
  { key: "settings", label: "Intro & headings" },
  { key: "heroLinks", label: "Home links" },
  { key: "workExperience", label: "Work" },
  { key: "travelDestinations", label: "Travel" },
  { key: "education", label: "Education" },
  { key: "talks", label: "Talks" },
  { key: "socialLinks", label: "Social links" },
];
const defaults: Record<Section, Value> = {
  settings: {},
  heroLinks: { label: "", subtitle: "", href: "", icon: "now" },
  education: { name: "", subtitle: "", facts: [""], website: "", websiteLabel: "Website ↗", story: [""] },
  workExperience: { id: "", company: "", companyUrl: "", position: "", duration: "", summary: "", team: "", isCurrent: false, descriptions: [{ title: "Description", items: [""] }], achievements: [], roleProgression: [], groupSummary: "" },
  travelDestinations: { name: "", albumId: "", description: "", images: [""], lat: 0, lng: 0, markerOffsetY: 0 },
  talks: { title: "", image: "", link: "", event: "", eventLink: "", linkLabel: "Slides", video: "" },
  socialLinks: { title: "", url: "" },
};
const labelFor = (key: string) => key.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
const inputClass = "w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-white/25 dark:bg-slate-900 dark:text-white";
const buttonClass = "rounded border border-slate-300 px-3 py-1.5 text-sm font-semibold hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-white/25 dark:hover:bg-white/10";

function Fields({ value, onChange, path = "" }: { value: Value; onChange: (value: Value) => void; path?: string }) {
  if (Array.isArray(value)) {
    const addValue: Value = path.endsWith("descriptions") ? { title: "Description", items: [""] } : "";
    return <div className="space-y-3"><div className="space-y-3">{value.map((item, index) => <div className="flex items-start gap-2" key={index}><div className="min-w-0 flex-1"><Fields value={item} path={`${path}.${index}`} onChange={(next) => onChange(value.map((old, i) => i === index ? next : old))} /></div><button type="button" className={buttonClass} aria-label={`Remove ${labelFor(path.split(".").pop() || "item")} ${index + 1}`} onClick={() => onChange(value.filter((_, i) => i !== index))}>Remove</button></div>)}</div><button type="button" className={buttonClass} onClick={() => onChange([...value, addValue])}>Add {labelFor(path.split(".").pop() || "item")}</button></div>;
  }
  if (value !== null && typeof value === "object") {
    return <div className="space-y-4">{Object.entries(value).map(([key, field]) => <div key={key} className="block space-y-1.5"><span className="block text-sm font-semibold">{labelFor(key)}</span><Fields value={field} path={path ? `${path}.${key}` : key} onChange={(next) => onChange({ ...value, [key]: next })} /></div>)}</div>;
  }
  const pathParts = path.split(".");
  const lastPart = pathParts.at(-1) || "Value";
  const label = /^\d+$/.test(lastPart)
    ? `${labelFor(pathParts.at(-2) || "Item")} ${Number(lastPart) + 1}`
    : labelFor(lastPart);
  if (path === "icon" && typeof value === "string") return <select aria-label={label} className={inputClass} value={value} onChange={(event) => onChange(event.target.value)}>{["now", "blog", "images", "plays", "linkedin", "github"].map((icon) => <option key={icon} value={icon}>{icon}</option>)}</select>;
  if (typeof value === "boolean") return <input aria-label={label} type="checkbox" checked={value} onChange={(event) => onChange(event.target.checked)} />;
  if (typeof value === "number") return <input aria-label={label} className={inputClass} type="number" step="any" value={value} onChange={(event) => onChange(event.target.valueAsNumber)} />;
  if (typeof value !== "string") return null;
  return value.length > 90 || /description|summary|team|items|facts|story|intro/i.test(path)
    ? <textarea aria-label={label} className={`${inputClass} min-h-24`} value={value} onChange={(event) => onChange(event.target.value)} />
    : <input aria-label={label} className={inputClass} value={value} onChange={(event) => onChange(event.target.value)} />;
}

function validate(content: HomeContent): string | null {
  if (content.settings.length !== 1 || !content.settings[0].name || !content.settings[0].intro) return "The home page needs a name and introduction.";
  if (content.heroLinks.some((link) => !link.label || !link.href || !["now", "blog", "images", "plays", "linkedin", "github"].includes(link.icon))) return "Home links need a label, destination and available icon.";
  if (content.education.some((school) => !school.name || !school.website || !school.websiteLabel)) return "Education entries need a name, website and website label.";
  if (!content.workExperience.length) return "Keep at least one work entry for the timeline.";
  const ids = new Set<string>();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const monthNumber = (date: string) => {
    const match = /^([A-Za-z]+) (\d{4})$/.exec(date);
    const month = match ? months.indexOf(match[1]) : -1;
    return match && month >= 0 ? Number(match[2]) * 12 + month : null;
  };
  for (const job of content.workExperience) {
    const [start, end, extra] = job.duration.split(" - ");
    const first = monthNumber(start);
    const last = end === "Present" ? new Date().getFullYear() * 12 + new Date().getMonth() : monthNumber(end ?? "");
    if (!job.id || !job.company || !job.position || !job.companyUrl || first === null || last === null || first > last || extra !== undefined) return "Work entries need an ID, company, position, website and valid duration like April 2020 - November 2026.";
    if (ids.has(job.id)) return `Work ID ${job.id} is duplicated.`;
    ids.add(job.id);
  }
  for (const place of content.travelDestinations) {
    if (!place.name || !place.albumId || !place.images.length || place.images.some((image) => !image.trim()) || !Number.isFinite(place.lat) || !Number.isFinite(place.lng) || Math.abs(place.lat) > 90 || Math.abs(place.lng) > 180) return "Travel entries need a name, album ID, images and valid coordinates.";
  }
  if (content.talks.some((talk) => !talk.title || !talk.link || !talk.image || !talk.event || !talk.eventLink || !talk.linkLabel)) return "Talks need a title, image, link, event and event link.";
  if (content.socialLinks.some((link) => !link.title || !link.url)) return "Social links need a title and URL.";
  return null;
}

export default function Admin() {
  const [file, setFile] = useState<FileSystemFileHandle | null>(null);
  const [content, setContent] = useState<HomeContent | null>(null);
  const [saved, setSaved] = useState("");
  const [section, setSection] = useState<Section>("workExperience");
  const [selected, setSelected] = useState(0);
  const [message, setMessage] = useState("Connect this repository to edit the home page.");
  const [busy, setBusy] = useState(false);
  const current = content ? JSON.stringify(content) : "";
  const dirty = Boolean(content && current !== saved);
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  const connect = async () => {
    if (dirty && !window.confirm("Discard unsaved home page changes?")) return;
    try {
      if (!window.showDirectoryPicker) throw new Error("Use Chrome or Edge to connect a repository.");
      const repository = await window.showDirectoryPicker({ mode: "readwrite", id: "bogas04-repository" });
      const src = await repository.getDirectoryHandle("src");
      const data = await src.getDirectoryHandle("data");
      const nextFile = await data.getFileHandle("home.json");
      const parsed = JSON.parse(await (await nextFile.getFile()).text()) as HomeContent;
      if (!sections.every(({ key }) => Array.isArray(parsed[key]))) throw new Error("This folder does not contain valid home page data.");
      setFile(nextFile); setContent(parsed); setSaved(JSON.stringify(parsed)); setSelected(0);
      setMessage("Repository connected. Changes are written only when you save.");
    } catch (error) { if ((error as DOMException).name !== "AbortError") setMessage(error instanceof Error ? error.message : "Could not connect."); }
  };
  const save = async () => {
    if (!content || !file || busy) return;
    const error = validate(content); if (error) return setMessage(error);
    setBusy(true);
    try {
      const disk = JSON.parse(await (await file.getFile()).text());
      if (JSON.stringify(disk) !== saved) throw new Error("The file changed on disk. Reconnect to load the latest version before saving.");
      const writer = await file.createWritable();
      await writer.write(JSON.stringify(content, null, 2) + "\n"); await writer.close();
      setSaved(current); setMessage("Saved src/data/home.json. Review the changes and publish when ready.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Could not save."); }
    finally { setBusy(false); }
  };
  const items = content?.[section] ?? [];
  const changeItems = (next: Value[]) => { if (content) setContent({ ...content, [section]: next } as HomeContent); };
  return <><Head><title>Admin | divjot</title><meta name="robots" content="noindex,nofollow" /></Head><main className="min-h-screen bg-slate-50 px-4 py-8 font-sans text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-8"><div className="mx-auto max-w-7xl"><header className="mb-8 flex flex-wrap items-start justify-between gap-4"><div><p className="m-0 text-xs font-bold uppercase tracking-widest text-slate-500">Local authoring</p><h1 className="mb-1 mt-2 text-3xl font-bold">Admin</h1><p className="m-0 text-sm text-slate-600 dark:text-slate-300">Manage your site from this computer.</p></div><button type="button" className="rounded bg-slate-800 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-slate-900" onClick={() => void connect()}>{file ? "Reconnect repository" : "Connect repository"}</button></header>
    <nav aria-label="Authoring tools" className="mb-8 grid gap-3 sm:grid-cols-3"><a className={`${buttonClass} block no-underline`} href="/write/">Write blog posts →</a><a className={`${buttonClass} block no-underline`} href="/upload/">Manage images →</a><a className={`${buttonClass} block no-underline`} href="/now/">Write /now entry →</a></nav>
    <section aria-labelledby="home-editor"><div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><h2 id="home-editor" className="m-0 text-xl font-bold">Home page</h2><p className="mb-0 mt-1 text-sm text-slate-600 dark:text-slate-300">Edit the home page content. Work IDs and album IDs are part of existing links; keep them stable. Use Markdown for links and emphasis; wrap highlights in ==double equals==.</p></div><button type="button" disabled={!dirty || busy} onClick={() => void save()} className="rounded bg-slate-800 px-4 py-2 text-sm font-semibold text-white disabled:opacity-40 dark:bg-white dark:text-slate-900">{busy ? "Saving…" : "Save home page"}</button></div><p role="status" className="text-sm text-slate-600 dark:text-slate-300">{message} {dirty ? "You have unsaved changes." : ""}</p>
    {content && <div className="grid gap-6 lg:grid-cols-[16rem_minmax(0,1fr)]"><aside className="rounded border border-slate-200 bg-white p-4 dark:border-white/15 dark:bg-slate-900"><div className="flex flex-wrap gap-2">{sections.map((option) => <button key={option.key} type="button" aria-pressed={section === option.key} className={`${buttonClass} ${section === option.key ? "bg-slate-200 dark:bg-white/20" : ""}`} onClick={() => { setSection(option.key); setSelected(0); }}>{option.label}</button>)}</div><ul className="mt-4 space-y-1 p-0">{items.map((item, index) => { const entry = item as unknown as Record<string, Value>; return <li key={index} className="list-none"><button type="button" onClick={() => setSelected(index)} className={`w-full rounded px-2 py-2 text-left text-sm ${selected === index ? "bg-slate-200 dark:bg-white/15" : "hover:bg-slate-100 dark:hover:bg-white/10"}`}>{String(entry.company || entry.name || entry.title || `Entry ${index + 1}`)}</button></li>; })}</ul>{section !== "settings" && <button type="button" className={`${buttonClass} mt-3`} onClick={() => { changeItems([...items as unknown as Value[], structuredClone(defaults[section])]); setSelected(items.length); }}>Add entry</button>}</aside><div className="rounded border border-slate-200 bg-white p-5 dark:border-white/15 dark:bg-slate-900">{items[selected] ? <>{section !== "settings" && <div className="mb-5 flex flex-wrap gap-2"><button type="button" className={buttonClass} disabled={selected === 0} onClick={() => { const next = [...items] as unknown as Value[]; [next[selected - 1], next[selected]] = [next[selected], next[selected - 1]]; changeItems(next); setSelected(selected - 1); }}>Move up</button><button type="button" className={buttonClass} disabled={selected === items.length - 1} onClick={() => { const next = [...items] as unknown as Value[]; [next[selected + 1], next[selected]] = [next[selected], next[selected + 1]]; changeItems(next); setSelected(selected + 1); }}>Move down</button><button type="button" className={buttonClass} onClick={() => { if (window.confirm("Remove this entry from the home page?")) { changeItems((items as unknown as Value[]).filter((_, index) => index !== selected)); setSelected(Math.max(0, selected - 1)); } }}>Remove entry</button></div>}<Fields value={{ ...(defaults[section] as Record<string, Value>), ...(items[selected] as unknown as Record<string, Value>) }} onChange={(next) => changeItems((items as unknown as Value[]).map((old, index) => index === selected ? next : old))} /></> : <p className="text-sm text-slate-500">Add an entry to get started.</p>}</div></div>}</section></div></main></>;
}
