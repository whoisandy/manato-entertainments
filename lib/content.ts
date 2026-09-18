export interface NavLink {
  label: string;
  href: string;
}

export interface Highlight {
  value: string;
  label: string;
}

export interface DifferenceStep {
  index: string;
  title: string;
  body: string;
}

export interface AudienceEntry {
  title: string;
  body: string;
}

export interface FeaturedEvent {
  kicker: string;
  title: string;
  subtitle: string;
  description: string;
  note: string;
}

export interface EventFormat {
  title: string;
  body: string;
}

export interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
  orientation: "landscape" | "portrait";
}

export interface VideoItem {
  id: string;
  title: string;
  /** Video source URL — real self-hosted clips (deterministically named). */
  src: string;
  /** Poster image URL — real frame extracted from the clip (ffmpeg). */
  poster: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const site = {
  address:
    "Villa No.9, Lion’s Park Colony, Hi tension Road, Alwal, Hyderabad, Telangana - 500010",
  brandStatement: "Dream Big. Create Experiences. Build a Legacy.",
  email: "manatoentertainments@gmail.com",
  name: "MANATO Entertainments",
  phone: "+91 91001 38089",
  tagline: "Grand Stages | Golden Memories",
};

export const navLinks: NavLink[] = [
  { href: "#about", label: "About" },
  { href: "#events", label: "Experiences" },
  { href: "#gallery", label: "Gallery" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export const highlights: Highlight[] = [
  { label: "Founders", value: "4" },
  { label: "Shared vision", value: "1" },
  { label: "Team", value: "Growing" },
  { label: "Experiences", value: "Lasting" },
];

export const differenceSteps: DifferenceStep[] = [
  {
    body: "Every remarkable experience begins with a clear intention. We start by understanding what you want people to feel, remember and take away from the experience then shape every decision around that vision.",
    index: "01",
    title: "A Clear Vision",
  },
  {
    body: "Ideas should feel as unique as the people they are created for. We bring fresh thinking to every brief, creating experiences that feel distinctive, relevant and impossible to forget.",
    index: "02",
    title: "Creative Thinking",
  },
  {
    body: "Great ideas mean nothing without exceptional execution. From planning and production to coordination and the smallest details, we bring precision, care and consistency to every moment.",
    index: "03",
    title: "Strong Execution",
  },
  {
    body: "The best events don’t just attract people. They make people feel something. We create experiences that connect with audiences, spark emotion and leave them with moments they want to remember and talk about.",
    index: "04",
    title: "Audience Connection",
  },
];

export const featuredEvent: FeaturedEvent = {
  description:
    "Live music and entertainment experiences built around the connection between the stage and the crowd. We bring creative direction, planning and production together to shape moments audiences can feel, share and remember.",
  kicker: "Live Entertainment",
  note: "Tell us about the experience you want to create, and let’s bring It to life.",
  subtitle: "Where artists and audiences come together.",
  title: "Concerts & Live Events",
};

export const audiences: AudienceEntry[] = [
  {
    body: "Moments to feel, share and remember long after the event ends.",
    title: "Audiences",
  },
  {
    body: "Experiences shaped around performance, creativity and a genuine connection with the audience.",
    title: "Artists",
  },
  {
    body: "Opportunities to become part of the moment through relevant, creative experiences.",
    title: "Brands",
  },
  {
    body: "Collaborations built around shared purpose, audience relevance and meaningful engagement.",
    title: "Partners & Sponsors",
  },
];

export const eventFormats: EventFormat[] = [
  {
    body: "Professional, engaging experiences shaped around your brand, teams and business objectives. We bring purpose, creativity and thoughtful coordination to every gathering.",
    title: "Corporate Events",
  },
  {
    body: "Curated experiences that bring celebrities and their audiences together, with attention to the interactions and details that make the occasion meaningful.",
    title: "Celebrity Meet & Greets",
  },
  {
    body: "From intimate gatherings to high-energy celebrations, we shape the occasion around the people at its heart and the memories they want to create.",
    title: "Parties & Celebrations",
  },
  {
    body: "Creative experiences that help brands connect with audiences through entertainment, participation and shared moments, making the brand part of the experience.",
    title: "Brand & Entertainment Activations",
  },
  {
    body: "Distinctive concepts built around your occasion, audience and purpose. We bring fresh thinking to experiences that call for an individual approach.",
    title: "Special Events",
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

/** Brand event photos and creatives, deterministically named 01–13
 *  (2026-09-18: the two selfie-like audience shots were removed per
 *  stakeholder; the sequence stays contiguous). 11–13 are the newest set —
 *  campaign posters for the 21 September Hyderabad press meet — so they
 *  lead the gallery grid. */
export const photos: Photo[] = [
  photo(
    "/photos/11.jpg",
    "MANATO Entertainments poster announcing The King of Beat & Melody concert in Hyderabad, with a 21 September 2026 press meet.",
    1254,
    1254
  ),
  photo(
    "/photos/12.jpg",
    "Poster for KOTI — The Biggest Concert of the Legend in Hyderabad, marking 50 years of music with a 21 September 2026 press meet.",
    941,
    1672
  ),
  photo(
    "/photos/13.jpg",
    "MANATO Entertainments poster for The King of Beat & Melody, reading 'Legends perform on stage. Legacies are built behind it.'",
    1254,
    1254
  ),
  photo(
    "/photos/01.jpg",
    "A group holding a ceremonial tray at a flower-decorated doorway.",
    1040,
    750
  ),
  photo(
    "/photos/02.jpg",
    "A man holding a classical guitar, seated behind two women in colourful saris.",
    844,
    1040
  ),
  photo(
    "/photos/03.jpg",
    "Four people posing against a yellow wall in formal and traditional clothing.",
    1040,
    694
  ),
  photo(
    "/photos/04.jpg",
    "Six people gathered around a seated guitarist and a white armchair.",
    1040,
    758
  ),
  photo(
    "/photos/05.jpg",
    "Four people standing at a doorway decorated with orange flowers and green leaves.",
    1040,
    751
  ),
  photo(
    "/photos/06.jpg",
    "Five people standing together in front of a white wall and wooden doorway.",
    1040,
    501
  ),
  photo(
    "/photos/07.jpg",
    "Three people posing against a yellow wall, with the person in the centre giving a thumbs-up.",
    853,
    1280
  ),
  photo(
    "/photos/08.jpg",
    "Six people posing indoors, with a person in a white jacket and green shirt near the centre.",
    1280,
    625
  ),
  photo(
    "/photos/09.jpg",
    "Six people standing together in front of a dark wall panel.",
    1280,
    845
  ),
  photo(
    "/photos/10.jpg",
    "A person in sunglasses and a white jacket playing a classical guitar.",
    1600,
    1068
  ),
];

/** Stakeholder request (2026-09-18): no auto-cycling imagery on the home
 *  page. Flip to true to restore the hero's cross-fade photo cycle — the
 *  backdrop keeps the full heroPhotos set and resumes where it left off. */
export const heroCycleEnabled = false;

/** Landscape subset used by the hero backdrop (wide crops read best).
 *  Selected by file name, not array position, so gallery order can change
 *  freely without silently swapping the hero set. With the cycle disabled
 *  the first entry is the static hero photo. */
export const heroPhotos: Photo[] = ["10.jpg", "01.jpg", "09.jpg", "05.jpg"].map(
  (file) => {
    const match = photos.find((item) => item.src === `/photos/${file}`);
    if (!match) {
      throw new Error(`heroPhotos: /photos/${file} is not in the photos list`);
    }
    return match;
  }
);

/** Brand event videos (user-supplied, 2026-09-12), deterministically named
 *  01–09 in public/videos. Posters are real frames extracted from the files
 *  at 25% duration (ffmpeg, scale 960, q3) into public/videos/posters. */
export const videos: VideoItem[] = [
  {
    id: "v01",
    poster: "/videos/posters/01.jpg",
    src: "/videos/01.mp4",
    title: "Concert film",
  },
  {
    id: "v02",
    poster: "/videos/posters/02.jpg",
    src: "/videos/02.mp4",
    title: "Event highlights",
  },
  {
    id: "v03",
    poster: "/videos/posters/03.jpg",
    src: "/videos/03.mp4",
    title: "Behind the scenes",
  },
  {
    id: "v04",
    poster: "/videos/posters/04.jpg",
    src: "/videos/04.mp4",
    title: "Artist stories",
  },
  {
    id: "v05",
    poster: "/videos/posters/05.jpg",
    src: "/videos/05.mp4",
    title: "Festival aftermovie",
  },
  {
    id: "v06",
    poster: "/videos/posters/06.jpg",
    src: "/videos/06.mp4",
    title: "Brand experience",
  },
  {
    id: "v07",
    poster: "/videos/posters/07.jpg",
    src: "/videos/07.mp4",
    title: "Celebration reel",
  },
  {
    id: "v08",
    poster: "/videos/posters/08.jpg",
    src: "/videos/08.mp4",
    title: "Corporate showcase",
  },
  {
    id: "v09",
    poster: "/videos/posters/09.jpg",
    src: "/videos/09.mp4",
    title: "Family moments",
  },
];

export const faqs: FaqItem[] = [
  {
    answer:
      "We create and manage concerts and live events, corporate events, celebrity meet & greets, parties and celebrations, brand activations and special events. Each experience is shaped around its audience, purpose and scale.",
    question: "What kinds of events does MANATO manage?",
  },
  {
    answer:
      "Tell us about your occasion, preferred date and city, audience size, and the experience you want to create. If you have a budget in mind, please include that too. These details help us understand your brief and recommend the right direction for your event.",
    question: "How do we start planning an event with MANATO?",
  },
  {
    answer:
      "Yes. We welcome partnerships with brands and sponsors looking to create meaningful event experiences and entertainment activations. Share your objectives, target audience, and partnership goals with us, and we’ll explore opportunities that align with your brand and our events.",
    question: "Can brands and sponsors partner with MANATO?",
  },
  {
    answer:
      "Get in touch with us to learn about our upcoming public events. Event dates, venues, participating artists, and booking details are confirmed individually, so our team can provide you with the latest information and availability. You can also follow us for announcements — Instagram (@manato_entertainments), YouTube (@MANATOEntertainments) and Facebook (Manato Entertainments) — or write to us at manatoentertainments@gmail.com.",
    question: "How can I find out about upcoming events?",
  },
  {
    answer:
      "Yes. We create curated experiences for private celebrations, corporate gatherings, teams, brands, and businesses. Tell us about your occasion, your expectations, and what matters most to your guests, and we’ll work with you to shape the right format, scale, and experience.",
    question: "Do you organise private celebrations and corporate events?",
  },
  {
    answer:
      "We’re always open to connecting with artists, talent, and event professionals. Send us a brief introduction, your area of expertise, location, and relevant work or portfolio links. Let us know what kind of events or collaborations interest you, and we’ll consider you for relevant future opportunities.",
    question: "How can artists, talent and event professionals get involved?",
  },
];
