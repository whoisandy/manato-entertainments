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

export interface MetaChip {
  label: string;
}

export interface FeaturedEvent {
  kicker: string;
  title: string;
  subtitle: string;
  description: string;
  meta: MetaChip[];
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

export interface FaqItem {
  question: string;
  answer: string;
}

export const site = {
  brandStatement: "Dream Big. Create Experiences. Build a Legacy.",
  email: "hello@manato.in",
  name: "MANATO Entertainments",
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
    body: "We begin with what the experience needs to achieve and how we want people to feel.",
    index: "01",
    title: "A Clear Vision",
  },
  {
    body: "We shape ideas around the occasion, audience and purpose, giving every event its own character.",
    index: "02",
    title: "Creative Thinking",
  },
  {
    body: "We bring ideas to life through planning, coordination and attention to the details that matter.",
    index: "03",
    title: "Strong Execution",
  },
  {
    body: "We put people at the heart of the experience, creating moments they want to be part of.",
    index: "04",
    title: "Audience Connection",
  },
];

export const featuredEvent: FeaturedEvent = {
  description:
    "Live music and entertainment experiences built around the connection between the stage and the crowd. We bring creative direction, planning and production together to shape moments audiences can feel, share and remember.",
  kicker: "Live Entertainment",
  meta: [{ label: "Music" }, { label: "Artists" }, { label: "Audiences" }],
  note: "Tell us about the experience you want to create, and let’s explore what it could become.",
  subtitle: "Where artists and audiences come together.",
  title: "Concerts & Live Events",
};

export const audiences: AudienceEntry[] = [
  {
    body: "Moments to feel, share and remember long after the event ends.",
    title: "Audiences",
  },
  {
    body: "Experiences shaped around performance and a connection with the audience.",
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

/** Brand event photos (user-supplied, 2026-04-10), deterministically named. */
export const photos: Photo[] = [
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
    "Two women taking a selfie among rows of cream and gold chairs.",
    1152,
    864
  ),
  photo(
    "/photos/11.jpg",
    "Three people smiling for a selfie in a hall with cream and gold chairs.",
    960,
    1280
  ),
  photo(
    "/photos/12.jpg",
    "A person in sunglasses and a white jacket playing a classical guitar.",
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
      "We create and manage concerts and live events, corporate events, celebrity meet & greets, parties and celebrations, brand activations and special events. Each experience is shaped around its audience, purpose and scale.",
    question: "What kinds of events does Manato manage?",
  },
  {
    answer:
      "Tell us about the occasion, your preferred date and city, the audience size and what you want the experience to achieve. If you have a budget in mind, include that too. These details help us understand the brief and discuss a suitable direction.",
    question: "How do we start planning an event with Manato?",
  },
  {
    answer:
      "Yes. We welcome conversations with brands and sponsors interested in event partnerships and entertainment activations. Share your objectives and the audiences you want to reach so we can explore a relevant opportunity together.",
    question: "Can brands and sponsors partner with Manato?",
  },
  {
    answer:
      "Contact us to ask about upcoming public events. Dates, venues, participating artists and booking details are confirmed for each event individually.",
    question: "How can I find out about upcoming events?",
  },
  {
    answer:
      "Yes. We plan experiences for private occasions, teams, brands and businesses. Share the occasion and what matters to your guests, and we can discuss the format, scale and support your event needs.",
    question: "Do you organise private celebrations and corporate events?",
  },
  {
    answer:
      "Send us a short introduction, your area of expertise, your location and links to relevant work. Let us know the kinds of events or collaborations you are interested in so we can understand how you might fit future opportunities.",
    question: "How can artists, talent and event professionals get involved?",
  },
];
