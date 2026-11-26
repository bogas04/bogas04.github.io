export type HomeContent = {
  settings: { name: string; profileImage: string; intro: string; seoDescription: string; workHeading: string; travelHeading: string; educationHeading: string; talksHeading: string; socialHeading: string; travelIntro: string; resumeUrl: string; resumeLabel: string; wildcardTitle: string; wildcardText: string; wildcardUrl: string; carouselHint: string }[];
  heroLinks: { label: string; subtitle: string; href: string; icon: string }[];
  education: { name: string; subtitle: string; facts: string[]; website: string; websiteLabel: string; story: string[] }[];
  workExperience: {
    id: string; company: string; companyUrl: string; position: string;
    duration: string; summary: string; team?: string; isCurrent: boolean;
    descriptions: { title: string; items: string[] }[]; achievements?: string[]; roleProgression?: string[]; groupSummary?: string;
  }[];
  travelDestinations: {
    name: string; albumId: string; description: string; images: string[];
    lat: number; lng: number; markerOffsetY?: number;
  }[];
  talks: { image: string; title: string; link: string; event: string; eventLink: string; linkLabel: string; video?: string }[];
  socialLinks: { title: string; url: string }[];
};
