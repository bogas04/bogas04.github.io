import Link from "next/link";
import { useEffect, useState } from "react";

import friendUpdates from "../data/friend-updates.json";
import social from "../data/now-social.json";
import { WEBSITE_URL } from "../constants";
import type { IBlogPost } from "../utils/blog";
import SeoTags from "./SeoTags";

const SOCIAL_EDITOR_URL =
  "https://github.com/bogas04/bogas04.github.io/edit/main/src/data/now-social.json";

type Friend = {
  name: string;
  url: string;
};

type Community = {
  name: string;
  url: string;
  initials?: string;
  color?: string;
};

type FriendUpdate = {
  author: string;
  title: string;
  url: string;
  publishedAt: string | null;
};

const friends = social.friends as Friend[];
const communities = social.communities as Community[];
const updates = friendUpdates.items as FriendUpdate[];
const avatarPastels = ["#f6c4d7", "#d8edc8", "#cce5f7", "#f9e5ad", "#e1d3f2", "#f6d6b8"];
const MY_UPDATES_HASH = "#my-updates";
const FRIEND_UPDATES_HASH = "#updates-from-my-friends";
const FRIENDS_HASH = "#friends";
const COMMUNITIES_HASH = "#communities";

interface NowPostProps {
  post?: IBlogPost;
  previousPost?: IBlogPost;
  nowPostCount?: number;
  photoCount?: number;
  blogPostCount?: number;
}

function formatNowPageUpdate(date?: string) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date(date));
}

function formatFriendUpdate(date: string | null) {
  if (!date) return "recently";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(date));
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

function avatarColor(name: string) {
  const value = [...name].reduce((total, character) => total + character.charCodeAt(0), 0);
  return avatarPastels[value % avatarPastels.length];
}

function FriendAvatar({ friend, compact = false }: { friend: Friend; compact?: boolean }) {
  const avatarSize = compact ? "h-7 w-7" : "h-16 w-16";
  const spacing = compact ? "" : "mb-1";
  return (
    <span className={`${spacing} grid ${avatarSize} place-items-center px-0.5 text-center ${compact ? "text-[9px]" : "text-[12px]"} font-bold leading-[13px] text-[#39516b] shadow-[inset_0_0_0_1px_rgb(0_0_0/8%)]`} style={{ backgroundColor: avatarColor(friend.name) }}>
      {initials(friend.name)}
    </span>
  );
}

function CommunityAvatar({ community }: { community: Community }) {
  return (
    <span className="mb-1 grid h-16 w-16 place-items-center px-1 text-center font-[Arial,Helvetica,sans-serif] text-[13px] font-bold leading-[14px] text-[#39516b] shadow-[inset_0_0_0_1px_rgb(0_0_0/8%)]" style={{ backgroundColor: community.color || "#d8e7f6" }}>
      {community.initials || community.name.slice(0, 2).toUpperCase()}
    </span>
  );
}

const iconTone = {
  blue: "border-[#81a6cf] bg-[#edf6ff] text-[#1672c7]",
  pink: "border-[#d88aa6] bg-[#fff0f5] text-[#d82669]",
  yellow: "border-[#d2aa47] bg-[#fff8d7] text-[#d29400]",
  green: "border-[#91b879] bg-[#eff9e9] text-[#4e9a2e]",
  teal: "border-[#76aaa8] bg-[#e9fafa] text-[#168b89]",
  gray: "border-[#9caabd] bg-[#f4f7fa] text-[#65758a]",
};

function PixelGlyph({ name }: { name: string }) {
  if (name === "scrapbook") return <svg viewBox="0 0 12 12" className="h-3 w-3" shapeRendering="crispEdges" aria-hidden="true"><path fill="#fff4bd" d="M1 1h7v9H1z" /><path fill="#d4a900" d="M1 1h7v1H1zm0 8h7v1H1z" /><path fill="#e37825" d="M4 7h2v2H4zm2-2h2v2H6zm2-2h2v2H8zm1-1h2v2H9z" /></svg>;
  if (name === "profile") return <svg viewBox="0 0 12 12" className="h-3 w-3" shapeRendering="crispEdges" aria-hidden="true"><path fill="#f1bd16" d="M4 1h4v4H4z" /><path fill="#e09312" d="M3 2h1v2H3zm5 0h1v2H8z" /><path fill="#4f92d1" d="M3 6h6v1h1v4H2V7h1z" /><path fill="#cbe7ff" d="M5 7h2v3H5z" /></svg>;
  if (name === "albums") return <svg viewBox="0 0 12 12" className="h-3 w-3" shapeRendering="crispEdges" aria-hidden="true"><path fill="#4d86bf" d="M1 1h10v10H1z" /><path fill="#eaf7ff" d="M2 2h8v7H2z" /><path fill="#73af4c" d="M3 8h6V6L7 4z" /><path fill="#f1c331" d="M3 3h2v2H3z" /></svg>;
  if (name === "words") return <svg viewBox="0 0 12 12" className="h-3 w-3" shapeRendering="crispEdges" aria-hidden="true"><path fill="#5a91c8" d="M2 1h7l1 1v9H2z" /><path fill="white" d="M3 2h5v1H3zm0 2h6v1H3zm0 2h6v1H3zm0 2h4v1H3z" /></svg>;
  if (name === "videos") return <svg viewBox="0 0 12 12" className="h-3 w-3" shapeRendering="crispEdges" aria-hidden="true"><path fill="#d9281d" d="M1 3h10v6H1z" /><path fill="#f7b5ae" d="M2 2h8v1H2zm0 7h8v1H2z" /><path fill="white" d="M5 4h1v1h1v2H6v1H5z" /></svg>;
  if (name === "friends") return <svg viewBox="0 0 12 12" className="h-3 w-3" shapeRendering="crispEdges" aria-hidden="true"><path fill="#f1bd16" d="M2 1h3v3H2zm5 1h3v3H7z" /><path fill="#4f92d1" d="M1 5h5v5H1zm5 1h5v4H6z" /><path fill="#cbe7ff" d="M2 6h3v3H2zm5 2h3v2H7z" /></svg>;
  if (name === "communities") return <svg viewBox="0 0 12 12" className="h-3 w-3" shapeRendering="crispEdges" aria-hidden="true"><path fill="#b378bc" d="M5 1h2v2H5zm-3 3h3v3H2zm5 0h3v3H7zm-3 4h4v3H4z" /><path fill="#e9caef" d="M5 2h2v1H5zM3 5h1v1H3zm5 0h1v1H8zm-2 4h1v2H6z" /></svg>;
  return <span>{name}</span>;
}

function TinyIcon({ children, tone = "blue" }: { children: string; tone?: keyof typeof iconTone }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-grid h-4 w-4 shrink-0 place-items-center border leading-none shadow-[inset_0_1px_white] ${iconTone[tone]}`}
    >
      <PixelGlyph name={children} />
    </span>
  );
}

function Panel({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id}
      className={`overflow-hidden rounded-[7px] border border-[#b6c9df] bg-white shadow-[0_1px_2px_rgb(43_70_109/15%)] ${className}`}
    >
      {children}
    </section>
  );
}

function SmallButton({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-[4px] border border-[#9bb3cb] bg-gradient-to-b from-white to-[#d9e6f3] px-2 py-[1px] font-bold text-[#17578d] shadow-[inset_0_1px_white]">
      {children}
    </span>
  );
}

function CommunityTile({ community }: { community: Community }) {
  return (
    <a href={community.url} className="flex min-w-0 flex-col items-center text-center text-[11px] leading-[12px] text-[#075a9f] no-underline hover:underline">
      <CommunityAvatar community={community} />
      {community.name}
    </a>
  );
}

function StreamAvatar({ author }: { author: string }) {
  const friend = friends.find((entry) => entry.name === author);
  if (friend) return <FriendAvatar friend={friend} compact />;
  return <span className="grid h-7 w-7 place-items-center bg-[#d8e7f6] text-[9px] font-bold text-[#39516b]">{initials(author)}</span>;
}

export default function NowPost({ post, previousPost, nowPostCount = 0, photoCount = 0, blogPostCount = 0 }: NowPostProps) {
  const [activeUpdates, setActiveUpdates] = useState<"mine" | "friends">("mine");
  const [centerView, setCenterView] = useState<"updates" | "friends" | "communities">("updates");
  const [showAllFriends, setShowAllFriends] = useState(false);
  const [showAllCommunities, setShowAllCommunities] = useState(false);
  const postUrl = post ? `${WEBSITE_URL}/now/${post.slug}` : `${WEBSITE_URL}/now`;
  const updatedAt = formatNowPageUpdate(post?.date);

  useEffect(() => {
    const syncUpdatesTab = () => {
      if (window.location.hash === FRIENDS_HASH) {
        setCenterView("friends");
        return;
      }
      if (window.location.hash === COMMUNITIES_HASH) {
        setCenterView("communities");
        return;
      }
      setCenterView("updates");
      setActiveUpdates(
        window.location.hash === FRIEND_UPDATES_HASH || window.location.hash === "#friend-updates"
          ? "friends"
          : "mine",
      );
    };

    syncUpdatesTab();
    window.addEventListener("hashchange", syncUpdatesTab);
    window.addEventListener("popstate", syncUpdatesTab);
    return () => {
      window.removeEventListener("hashchange", syncUpdatesTab);
      window.removeEventListener("popstate", syncUpdatesTab);
    };
  }, []);

  const selectUpdatesTab = (tab: "mine" | "friends") => {
    const hash = tab === "mine" ? MY_UPDATES_HASH : FRIEND_UPDATES_HASH;
    setActiveUpdates(tab);
    if (window.location.hash !== hash) window.history.pushState(null, "", hash);
  };

  const selectCenterView = (view: "friends" | "communities") => {
    const hash = view === "friends" ? FRIENDS_HASH : COMMUNITIES_HASH;
    setCenterView(view);
    if (window.location.hash !== hash) window.history.pushState(null, "", hash);
  };

  const openNowHome = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname !== "/now") return;
    event.preventDefault();
    setCenterView("updates");
    setActiveUpdates("mine");
    window.history.pushState(null, "", "/now");
  };

  return (
    <main className="min-h-screen bg-[#d9e7f7] font-[Arial,Helvetica,sans-serif] text-[13px] leading-[1.25] text-black xl:[zoom:1.4]">
      <SeoTags
        title={post ? "Right here, right now | divjot" : "now | divjot"}
        description={post?.description || "What I am up to right now."}
        imageUrl={post?.image ? `${WEBSITE_URL}${post.image}` : undefined}
        pageUrl={postUrl}
        keywords="now"
        noIndex={post?.isDraft}
      />

      <header className="border-b border-[#6d91bb] bg-gradient-to-b from-[#a9c5e5] via-[#81a8d2] to-[#6d94c0] text-white shadow-[inset_0_1px_rgb(255_255_255/70%)]">
        <div className="mx-auto flex min-h-8 max-w-252 items-stretch px-2">
          <Link href="/" className="flex items-center border-r border-[#6b91bb] bg-white px-2 font-[Arial,Helvetica,sans-serif] text-[21px] font-normal tracking-[-1.5px] text-[#e51d84] no-underline">orkut<span className="ml-1 text-[7px] tracking-normal text-[#a5a5a5]">INSPIRED</span></Link>
          <nav className="flex min-w-0 overflow-x-auto" aria-label="Site navigation">
            <Link href="/now" onClick={openNowHome} className="border-r border-[#6b91bb] px-2.5 py-2 text-[11px] font-bold text-white no-underline hover:bg-[#628bbc]">Scrapbook</Link>
            <a href={FRIENDS_HASH} onClick={(event) => { event.preventDefault(); selectCenterView("friends"); }} className="border-r border-[#6b91bb] px-2.5 py-2 text-[11px] font-bold text-white no-underline hover:bg-[#628bbc]">Friends</a>
            <a href={COMMUNITIES_HASH} onClick={(event) => { event.preventDefault(); selectCenterView("communities"); }} className="border-r border-[#6b91bb] px-2.5 py-2 text-[11px] font-bold text-white no-underline hover:bg-[#628bbc]">Communities</a>
          </nav>
          <Link href="/" className="ml-auto flex items-center px-3 text-[11px] font-bold text-white no-underline hover:bg-[#628bbc]">bogas04.fyi</Link>
        </div>
      </header>

      <div className="mx-auto grid max-w-252 gap-2 px-2 py-2 lg:grid-cols-[140px_minmax(0,1fr)_282px] lg:items-start">
        <aside className="order-2 space-y-2 lg:order-1" aria-label="Profile">
          <Panel className="p-2">
            <Link href="/" className="block"><img className="aspect-[1/1.08] w-full object-cover" src="/profile.png" alt="Divjot in a tea garden" /></Link>
            <Link href="/" className="mt-1 block border-t border-[#c9d9ea] pt-1 text-[11px] text-[#075a9f] no-underline hover:underline">Divjot Singh</Link>
            <p className="mb-3 mt-2 text-[11px] leading-[13px] text-[#666]">This is a now page. Read more about the idea <a href="https://nownownow.com/" className="text-[#075a9f]">here</a>. I designed mine like the Orkut I remember from childhood; I wanted to keep a piece of that internet around, even though it shut down.</p>
            <nav className="text-[12px]" aria-label="Profile navigation">
              <Link href="/" className="flex items-center gap-1 border border-[#c5d7e9] bg-[#edf5fc] px-1 py-1 text-[#075a9f] no-underline"><TinyIcon tone="blue">profile</TinyIcon>profile</Link>
              <Link href="/now" onClick={openNowHome} className="flex items-center gap-1 border-x border-b border-[#c5d7e9] bg-[#edf5fc] px-1 py-1 text-[#075a9f] no-underline"><TinyIcon tone="pink">scrapbook</TinyIcon>scrapbook</Link>
              <Link href="/images" className="flex items-center gap-1 border-x border-b border-[#c5d7e9] bg-[#edf5fc] px-1 py-1 text-[#075a9f] no-underline"><TinyIcon tone="green">albums</TinyIcon>albums</Link>
              <a href="https://www.youtube.com/@DivjotSingh" className="flex items-center gap-1 border-x border-b border-[#c5d7e9] bg-[#edf5fc] px-1 py-1 text-[#075a9f] no-underline"><TinyIcon tone="pink">videos</TinyIcon>videos</a>
              <Link href="/blog" className="flex items-center gap-1 border-x border-b border-[#c5d7e9] bg-[#edf5fc] px-1 py-1 text-[#075a9f] no-underline"><TinyIcon tone="teal">words</TinyIcon>posts</Link>
            </nav>
          </Panel>
        </aside>

        <div id="scrapbook" className="order-1 space-y-2 lg:order-2">
          <Panel className="p-3">
            <h1 className="mb-3 font-[Arial,Helvetica,sans-serif] text-[26px] font-normal tracking-[-1px] text-black">Hello, world!</h1>
            <div className="mb-1 border border-[#d3dce6] bg-[#f8fbff] px-2 py-2 text-[12px]"><b>status:</b> {post?.description || "Nothing here yet. Check back soon."}</div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px]"><Link href="/now" className="flex flex-col text-[#555] no-underline hover:text-[#075a9f] hover:underline"><b className="text-black">scraps</b><span className="flex items-center gap-1 leading-none"><TinyIcon tone="pink">scrapbook</TinyIcon><span>{nowPostCount}</span></span></Link><Link href="/images" className="flex flex-col text-[#555] no-underline hover:text-[#075a9f] hover:underline"><b className="text-black">photos</b><span className="flex items-center gap-1 leading-none"><TinyIcon tone="blue">albums</TinyIcon><span>{photoCount}</span></span></Link><Link href="/blog" className="flex flex-col text-[#555] no-underline hover:text-[#075a9f] hover:underline"><b className="text-black">posts</b><span className="flex items-center gap-1 leading-none"><TinyIcon tone="teal">words</TinyIcon><span>{blogPostCount}</span></span></Link><a href={FRIENDS_HASH} onClick={(event) => { event.preventDefault(); selectCenterView("friends"); }} className="flex flex-col text-[#555] no-underline hover:text-[#075a9f] hover:underline"><b className="text-black">friends</b><span className="flex items-center gap-1 leading-none"><TinyIcon tone="yellow">friends</TinyIcon><span>{friends.length}</span></span></a><a href={COMMUNITIES_HASH} onClick={(event) => { event.preventDefault(); selectCenterView("communities"); }} className="flex flex-col text-[#555] no-underline hover:text-[#075a9f] hover:underline"><b className="text-black">communities</b><span className="flex items-center gap-1 leading-none"><TinyIcon tone="pink">communities</TinyIcon><span>{communities.length}</span></span></a></div>
            <p className="mb-0 mt-3 text-[12px]">I feel, therefore I am.</p>
          </Panel>

          {centerView === "updates" ? <>
          <div className="flex items-end gap-1 border-b border-[#b6c9df] px-1" role="tablist" aria-label="Updates">
            <button type="button" role="tab" aria-selected={activeUpdates === "mine"} onClick={() => selectUpdatesTab("mine")} className={`rounded-t-[4px] border border-b-0 px-2 py-1 text-[11px] font-bold ${activeUpdates === "mine" ? "border-[#b6c9df] bg-white text-black" : "border-[#b6c9df] bg-[#e7f0fa] text-[#075a9f]"}`}>my updates</button>
            <button type="button" role="tab" aria-selected={activeUpdates === "friends"} onClick={() => selectUpdatesTab("friends")} className={`rounded-t-[4px] border border-b-0 px-2 py-1 text-[11px] font-bold ${activeUpdates === "friends" ? "border-[#b6c9df] bg-white text-black" : "border-[#b6c9df] bg-[#e7f0fa] text-[#075a9f]"}`}>updates from my friends</button>
          </div>

          {activeUpdates === "mine" ? <>
            <Panel className="overflow-hidden p-0"><div className="border-b border-[#d8e2ec] bg-[#f8fbff] px-3 py-1.5 text-[11px]"><b>Updates from:</b> me</div>{post ? <article className="flex gap-2 px-3 py-2"><img src="/profile.png" alt="" className="h-6 w-6 object-cover" /><div className="min-w-0"><div className="mb-0.5 text-[11px] font-bold text-[#075a9f]">divjot</div><h2 className="mb-1 font-[Arial,Helvetica,sans-serif] text-[14px] font-normal leading-[1.2] text-black">{post.title}</h2><div className="blog-content text-[12px] leading-[1.45] text-[#333] [&_a]:text-[#075a9f] [&_img]:border [&_img]:border-[#c8d8e8]" dangerouslySetInnerHTML={{ __html: post.html }} /><time className="mt-1.5 block text-[9px] text-[#777]" dateTime={post.date}>{updatedAt}</time></div></article> : <p className="m-0 p-3 text-[12px] text-[#555]">No scrapbook entry yet.</p>}</Panel>
            {previousPost && <nav aria-label="Now post navigation" className="px-1 text-[12px]"><Link href={`/now/${previousPost.slug}`} className="text-[#075a9f]">← older scrapbook entry</Link></nav>}
          </> : <Panel className="overflow-hidden p-0">
            <div className="border-b border-[#d8e2ec] bg-[#f8fbff] px-3 py-1.5 text-[11px]"><b>Updates from:</b> <span className="ml-1 inline-block border border-[#c7d3df] bg-white px-1 py-px text-[10px]">my friends</span></div>
            {updates.length > 0 ? <ol className="m-0 list-none p-0">{updates.map((update) => <li key={update.url} className="flex gap-2 border-b border-[#e5ebf1] px-3 py-1.5 last:border-0"><StreamAvatar author={update.author} /><div className="min-w-0"><div className="text-[11px] font-bold text-[#075a9f]">{update.author}</div><a href={update.url} className="block text-[11px] leading-[1.3] text-[#075a9f] underline decoration-[#7ca8cd] underline-offset-1 hover:text-[#003f75]">{update.title}</a><time className="mt-0.5 block text-[9px] text-[#777]" dateTime={update.publishedAt || undefined}>{formatFriendUpdate(update.publishedAt)}</time></div></li>)}</ol> : <p className="m-0 p-3 text-[12px] text-[#555]">No recent friend updates yet. The next GitHub Actions refresh will look for their feeds.</p>}
          </Panel>}
          </> : centerView === "friends" ? <Panel className="p-3">
            <h2 className="mb-3 font-[Arial,Helvetica,sans-serif] text-[18px] font-bold text-black">my friends ({friends.length})</h2>
            <div className="grid grid-cols-3 gap-2">{(showAllFriends ? friends : friends.slice(0, 9)).map((friend) => <a key={friend.url} href={friend.url} className="flex min-w-0 flex-col items-center text-center text-[11px] leading-[12px] text-[#075a9f] no-underline hover:underline"><FriendAvatar friend={friend} />{friend.name}</a>)}</div>
            {friends.length > 9 && <button type="button" onClick={() => setShowAllFriends((visible) => !visible)} className="mt-4 text-[11px] no-underline"><SmallButton>{showAllFriends ? "show less" : "view all"}</SmallButton></button>}
          </Panel> : <Panel className="p-3">
            <h2 className="mb-3 font-[Arial,Helvetica,sans-serif] text-[18px] font-bold text-black">my communities ({communities.length})</h2>
            <div className="grid grid-cols-3 gap-2">{(showAllCommunities ? communities : communities.slice(0, 9)).map((community) => <CommunityTile key={community.url} community={community} />)}</div>
            {communities.length > 9 && <button type="button" onClick={() => setShowAllCommunities((visible) => !visible)} className="mt-4 text-[11px] no-underline"><SmallButton>{showAllCommunities ? "show less" : "view all"}</SmallButton></button>}
          </Panel>}
        </div>

        <aside className="order-3 space-y-2" aria-label="Friends and communities">
          <Panel id="friends-rail" className="p-2">
            <h2 className="mb-2 font-[Arial,Helvetica,sans-serif] text-[18px] font-bold text-black">my friends ({friends.length})</h2>
            {friends.length > 0 ? <div className="grid grid-cols-3 gap-1">{friends.slice(0, 9).map((friend) => <a key={friend.url} href={friend.url} className="flex min-w-0 flex-col items-center text-center text-[11px] leading-[12px] text-[#075a9f] no-underline hover:underline"><FriendAvatar friend={friend} />{friend.name}</a>)}</div> : <p className="mb-2 border-y border-[#d6e3f0] bg-[#f1f7fd] px-1 py-2 text-[12px] text-[#555]">Data currently not available.</p>}
            <div className="mt-4"><button type="button" onClick={() => selectCenterView("friends")} className="mr-2 text-[11px] no-underline"><SmallButton>view all</SmallButton></button><a href={SOCIAL_EDITOR_URL} className="mr-2 text-[11px] no-underline"><SmallButton>add me as a friend</SmallButton></a><a href={SOCIAL_EDITOR_URL} className="text-[11px] no-underline"><SmallButton>manage</SmallButton></a></div>
          </Panel>

          <Panel id="communities-rail" className="p-2">
            <h2 className="mb-2 font-[Arial,Helvetica,sans-serif] text-[18px] font-bold text-black">my communities ({communities.length})</h2>
            {communities.length > 0 ? <div className="grid grid-cols-3 gap-1">{communities.slice(0, 9).map((community) => <CommunityTile key={community.url} community={community} />)}</div> : <p className="mb-2 border-y border-[#d6e3f0] bg-[#f1f7fd] px-1 py-2 text-[12px] text-[#555]">No communities yet. Invite one to join this corner of the web.</p>}
            <div className="mt-4"><button type="button" onClick={() => selectCenterView("communities")} className="mr-2 text-[11px] no-underline"><SmallButton>view all</SmallButton></button><a href={SOCIAL_EDITOR_URL} className="mr-2 text-[11px] no-underline"><SmallButton>invite to community</SmallButton></a><a href={SOCIAL_EDITOR_URL} className="text-[11px] no-underline"><SmallButton>manage</SmallButton></a></div>
          </Panel>
        </aside>
      </div>
    </main>
  );
}
