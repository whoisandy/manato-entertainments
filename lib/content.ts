export interface NavLink {
  label: string;
  href: string;
}

export interface Stat {
  index: string;
  value: string;
  label: string;
}

export interface BuildStep {
  index: string;
  title: string;
  body: string;
}

export interface SetlistEntry {
  song: string;
  singer: string;
  coSinger?: string;
}

export interface MetaChip {
  label: string;
}

export interface FeaturedEvent {
  kicker: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  meta: MetaChip[];
  setlist: SetlistEntry[];
  note: string;
}

export interface PastEvent {
  year: string;
  title: string;
  subtitle: string;
  songs: string;
  singers: string;
}

export interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
  orientation: "landscape" | "portrait";
}

export interface FaqItem {
  question: string;
  answer: string;
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

const photo = (
  src: string,
  alt: string,
  width: number,
  height: number
): Photo => ({
  alt,
  height,
  orientation: width >= height ? "landscape" : "portrait",
  src,
  width,
});

/** Brand event photos (user-supplied, 2026-04-10), deterministically named. */
export const photos: Photo[] = [
  photo(
    "/photos/01.jpg",
    "A traditional welcome at the marigold-draped doorway — aarti tray, silk shawls, and the team around our honoured composer",
    1040,
    750
  ),
  photo(
    "/photos/02.jpg",
    "Our honoured guest with a classical guitar, seated between two Manato singers in silk saris",
    844,
    1040
  ),
  photo(
    "/photos/03.jpg",
    "Thumbs up against the yellow wall — the team with our honoured guest",
    1040,
    694
  ),
  photo(
    "/photos/04.jpg",
    "Around the armchair — singers gathered with the guitar after the evening",
    1040,
    758
  ),
  photo(
    "/photos/05.jpg",
    "At the marigold doorway before the evening begins",
    1040,
    751
  ),
  photo(
    "/photos/06.jpg",
    "The wider team lined up against the yellow wall",
    1040,
    501
  ),
  photo(
    "/photos/07.jpg",
    "Two singers and our guest composer against the yellow wall",
    853,
    1280
  ),
  photo(
    "/photos/08.jpg",
    "Six of us after a studio visit — white jacket, sunglasses, and laughter",
    1280,
    625
  ),
  photo(
    "/photos/09.jpg",
    "The full group after a day of planning the next edition",
    1280,
    845
  ),
  photo(
    "/photos/10.jpg",
    "Two of our singers in the audience seats before the show",
    1152,
    864
  ),
  photo(
    "/photos/11.jpg",
    "With our senior guest in the gold-chaired auditorium",
    960,
    1280
  ),
  photo(
    "/photos/12.jpg",
    "The maestro at work — classical guitar, white jacket, golden light",
    1600,
    1068
  ),
];

/** Landscape subset used by the hero backdrop cycle (wide crops read best). */
export const heroPhotos: Photo[] = [
  photos[11],
  photos[0],
  photos[8],
  photos[9],
  photos[4],
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
