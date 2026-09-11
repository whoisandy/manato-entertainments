export interface NavLink {
  href: string;
  label: string;
}

export interface Stat {
  index: string;
  label: string;
  value: string;
}

export interface BuildStep {
  body: string;
  index: string;
  title: string;
}

export interface SetlistEntry {
  coSinger?: string;
  singer: string;
  song: string;
}

export interface MetaChip {
  label: string;
}

export interface FeaturedEvent {
  date: string;
  description: string;
  kicker: string;
  meta: MetaChip[];
  note: string;
  setlist: SetlistEntry[];
  subtitle: string;
  title: string;
}

export interface PastEvent {
  singers: string;
  songs: string;
  subtitle: string;
  title: string;
  year: string;
}

export interface GalleryImage {
  alt: string;
  src: string;
}

export interface FaqItem {
  answer: string;
  question: string;
}

export const site = {
  address: "12, Eldams Road, T. Nagar, Chennai 600017, India",
  email: "hello@manato.in",
  name: "Manato Entertainments",
  phone: "+91 98400 00000",
  phoneHref: "+919840000000",
  socials: [
    { href: "#", label: "Instagram" },
    { href: "#", label: "YouTube" },
  ] satisfies NavLink[],
  tagline: "Grand Stages | Golden Memories",
};

export const navLinks: NavLink[] = [
  { href: "#about", label: "About" },
  { href: "#events", label: "Events" },
  { href: "#gallery", label: "Gallery" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export const stats: Stat[] = [
  { index: "01", label: "Nights staged", value: "12+" },
  { index: "02", label: "Songs sung live", value: "300+" },
  { index: "03", label: "Singers on stage", value: "40+" },
  { index: "04", label: "Guests welcomed", value: "5,000+" },
];

export const buildSteps: BuildStep[] = [
  {
    body: "Every evening is built around one artist or one pairing — Koti's greatest era, or Ilaiyaraaja and A. R. Rahman sharing a single stage.",
    index: "#01",
    title: "The theme",
  },
  {
    body: "Hand-picked vocalists carry the set, with co-singers stepping in for the duets these songs were born as.",
    index: "#02",
    title: "The singers",
  },
  {
    body: "Twenty to thirty songs, sequenced for the night — openings that lift, duets that hold, finales that stay with you.",
    index: "#03",
    title: "The setlist",
  },
  {
    body: "One evening, start to encore. No opening acts, no filler — just the songs and the people who love them.",
    index: "#04",
    title: "The night",
  },
];

export const featuredEvent: FeaturedEvent = {
  date: "Coming soon · Chennai",
  description:
    "One evening, two composers who wrote the soundtrack of a generation. Our singers trace the golden thread from Ilaiyaraaja's ragas to Rahman's Madras choruses — twenty-eight songs, sequenced as one story.",
  kicker: "The next edition",
  meta: [{ label: "28 songs" }, { label: "6 singers" }, { label: "2 duets" }],
  note: "Announcements for our next edition drop first on Instagram.",
  setlist: [
    { singer: "Aarthi Krishnan", song: "Kaadhalin Deepam Ondru" },
    {
      coSinger: "Meera Sundar",
      singer: "Vignesh Ravi",
      song: "Chinna Chinna Asai",
    },
    { singer: "Deepak Menon", song: "Nila Kaigiradhu" },
    { coSinger: "Aarthi Krishnan", singer: "Meera Sundar", song: "Munbe Vaa" },
  ],
  subtitle: "Two Maestros, One Stage",
  title: "Ilaiyaraaja × A. R. Rahman",
};

export const pastEvents: PastEvent[] = [
  {
    singers: "4 singers",
    songs: "24 songs",
    subtitle: "The Golden Hour",
    title: "An Evening with Koti",
    year: "2025",
  },
  {
    singers: "5 singers",
    songs: "26 songs",
    subtitle: "The Golden Era",
    title: "MSV × KVM",
    year: "2024",
  },
  {
    singers: "3 singers",
    songs: "22 songs",
    subtitle: "A Retrospective",
    title: "K. J. Yesudas",
    year: "2024",
  },
];

export const galleryImages: GalleryImage[] = [
  {
    alt: "Edition IV — Ilaiyaraaja × A. R. Rahman, house lights at gold",
    src: "/gallery/gallery-01.svg",
  },
  {
    alt: "The crowd mid-chorus at An Evening with Koti",
    src: "/gallery/gallery-02.svg",
  },
  {
    alt: "Aarthi Krishnan on stage, second verse",
    src: "/gallery/gallery-03.svg",
  },
  {
    alt: "Edition III — The Golden Era, first bows",
    src: "/gallery/gallery-04.svg",
  },
  { alt: "Spotlight before the opening song", src: "/gallery/gallery-05.svg" },
  {
    alt: "Duet night — two voices, one microphone",
    src: "/gallery/gallery-06.svg",
  },
  { alt: "The audience at The Golden Hour", src: "/gallery/gallery-07.svg" },
  { alt: "Sound check, dawn shift", src: "/gallery/gallery-08.svg" },
  {
    alt: "Edition II — A Retrospective, curtain call",
    src: "/gallery/gallery-09.svg",
  },
  { alt: "The stage, empty and waiting", src: "/gallery/gallery-10.svg" },
];

export const faqs: FaqItem[] = [
  {
    answer:
      "A single-theme live concert. We pick one composer or one pairing — Koti, or Ilaiyaraaja and A. R. Rahman — and build one evening of twenty to thirty of their songs, performed live.",
    question: "What exactly is a Manato evening?",
  },
  {
    answer:
      "By popular demand, literally. Each edition's theme comes from what our audience asks for and what our singers can do justice to — golden eras, beloved pairings, composers with stories worth an evening.",
    question: "How do you choose the themes?",
  },
  {
    answer:
      "Hand-picked vocalists from the Chennai indie and playback circuits. Songs that were born as duets are sung as duets — with a co-singer on stage, never a backing track doing the work.",
    question: "Who sings at Manato events?",
  },
  {
    answer:
      "We don't sell tickets online yet. Every edition is announced first on our Instagram — dates, venue, and how to reserve your seat.",
    question: "How can I attend the next edition?",
  },
  {
    answer:
      "Yes. We build the same themed format for private celebrations and corporate nights — you pick the composer, we build the evening. Write to us below.",
    question: "Do you organise private or corporate evenings?",
  },
  {
    answer:
      "We'd love to hear you. Send a short recording and your repertoire to hello@manato.in — auditions for the next edition follow every announcement.",
    question: "I'm a singer — how do I get involved?",
  },
];
