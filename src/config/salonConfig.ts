export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: 'Hair' | 'Skin' | 'Grooming';
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  faqs: { question: string; answer: string }[];
  approxTime: string;
  image: string;
  keywords: string[];
}

export interface SalonPackage {
  id: string;
  name: string;
  target: 'men' | 'women';
  items: string[];
  description: string;
  isDraft: boolean; // unapproved/draft packages are hidden unless published by owner
  tag?: string;
  estimatedDuration: string;
  price?: number; // optional price field, hidden by default per requirements
}

export interface BusinessConfig {
  name: string;
  descriptor: string;
  category: string;
  primaryPhone: string; // international digits formatted: +91 95822 53329
  primaryPhoneRaw: string; // 919582253329
  secondaryPhone: string; // +91 70429 41836
  secondaryPhoneRaw: string; // 917042941836
  email: string;
  address: {
    line1: string;
    line2: string;
    landmark: string;
    block: string;
    locality: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    fullFormatted: string;
  };
  primaryArea: string[];
  announcement: string;
  announcementSub: string;
  showPricesPublicly: boolean; // default false per instruction
  adminPin: string; // default PIN for Owner Portal
}

export const INITIAL_BUSINESS_CONFIG: BusinessConfig = {
  name: "ART OF SCISSOR",
  descriptor: "UNISEX SALON",
  category: "Unisex Salon, Hair Salon, Beauty Salon, Barber Shop, Facial and Skin Care Services",
  primaryPhone: "+91 95822 53329",
  primaryPhoneRaw: "919582253329",
  secondaryPhone: "+91 70429 41836",
  secondaryPhoneRaw: "917042941836",
  email: "artofscissorunisexsalon@gmail.com",
  address: {
    line1: "Ground Floor, Plot No. 7, Street No. 7",
    line2: "A-2 Block, Virendar Nagar, Block B",
    landmark: "near Rani Public School",
    block: "West Sant Nagar",
    locality: "Burari",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110084",
    country: "India",
    fullFormatted: "Ground Floor, Plot No. 7, Street No. 7, near Rani Public School, A-2 Block, Virendar Nagar, Block B, West Sant Nagar, Burari, New Delhi, Delhi 110084, India"
  },
  primaryArea: [
    "Burari",
    "West Sant Nagar",
    "Virendar Nagar",
    "A-2 Block",
    "North Delhi"
  ],
  announcement: "Your Style. Your Confidence. Your Salon.",
  announcementSub: "Personalized hair styling, nourishing hair spa & skin care in Burari · Walk-ins & bookings welcome",
  showPricesPublicly: false, // Default false until owner activates
  adminPin: "110084" // Salon Burari Pincode default PIN
};

export const SALON_SERVICES: ServiceItem[] = [
  {
    id: "haircut-and-styling",
    slug: "haircut-and-styling",
    title: "Haircuts and Styling",
    category: "Hair",
    shortDescription: "Precision cuts, fade profiles, textured layers, and blow-dry styling tailored to individual face shapes and hair textures.",
    fullDescription: "At ART OF SCISSOR, haircuts are approached with careful attention to individual hair texture, face shape, and personal styling preferences. From clean scissor tapers and textured crops for men to customized layers, bobs, and volume styling for women, our stylists use professional-grade shears and combs to deliver clean, manageable silhouettes.",
    benefits: [
      "Consultation on hair density, growth direction, and styling habits",
      "Clean sectioning with sterilized professional shears and texturizing tools",
      "Even graduation and perimeter shaping that grows out gracefully",
      "Blow-dry and lightweight finish styling advice for daily care"
    ],
    faqs: [
      {
        question: "Can I bring a reference hairstyle photograph?",
        answer: "Yes, visual references are welcome. Our stylists will assess how the reference works with your natural hair texture and density."
      },
      {
        question: "Do you offer both men's and women's haircuts?",
        answer: "Yes, ART OF SCISSOR is a full unisex salon catering to both men and women with tailored styling services."
      }
    ],
    approxTime: "30 - 45 mins",
    image: "/src/assets/images/hair_styling_craft_1792936765485.jpg",
    keywords: ["haircut near Rani Public School Burari", "haircut in Burari", "unisex hair styling New Delhi", "barber in West Sant Nagar"]
  },
  {
    id: "hair-wash",
    slug: "hair-wash",
    title: "Hair Wash & Conditioning",
    category: "Hair",
    shortDescription: "Thorough clarifying scalp wash and gentle conditioning to eliminate daily grime and refresh hair natural lustre.",
    fullDescription: "Our refreshing hair wash service provides gentle cleansing of the scalp and strands using salon-grade clarifying and moisture-balancing cleansers. Experience a comfortable reclining wash basin session that relaxes tension and prepares your hair for precision cutting, styling, or treatments.",
    benefits: [
      "Deep cleansing to dislodge surface sebum, dust, and product buildup",
      "Comfortable ceramic wash basin with warm water regulation",
      "Light scalp stimulation to encourage local surface circulation",
      "Even moisture distribution with lightweight detangling conditioner"
    ],
    faqs: [
      {
        question: "Is hair wash included in haircut services?",
        answer: "A wash can be paired with any cut or opted for as an independent refreshing service or part of our packages."
      }
    ],
    approxTime: "15 - 20 mins",
    image: "/src/assets/images/hair_spa_treatment_1792936766012.jpg",
    keywords: ["hair wash Burari", "head wash New Delhi", "salon scalp wash"]
  },
  {
    id: "shaving-and-grooming",
    slug: "shaving-and-grooming",
    title: "Shaving & Beard Grooming",
    category: "Grooming",
    shortDescription: "Traditional clean shaves, precise razor edging, mustache trims, and beard line definition using sanitized tools.",
    fullDescription: "A sharp, refreshed appearance begins with meticulous facial grooming. Our shaving and grooming service features hygienic blade changes, skin-softening lather, hot towel application where needed, and steady straight-razor detailing for jawline crispness and comfort.",
    benefits: [
      "Fresh, single-use disposable blades for every client with strict hygiene",
      "Pre-shave lubrication to minimize friction and razor burn",
      "Crisp boundary definition across cheeklines, necklines, and sideburns",
      "Soothing post-shave balm application to calm sensitive skin"
    ],
    faqs: [
      {
        question: "Do you use single-use blades?",
        answer: "Yes, fresh disposable blades are opened in front of each customer for complete hygiene."
      }
    ],
    approxTime: "20 - 30 mins",
    image: "/src/assets/images/hair_styling_craft_1792936765485.jpg",
    keywords: ["beard trimming Burari", "clean shave New Delhi", "men grooming Virendar Nagar"]
  },
  {
    id: "hair-spa",
    slug: "hair-spa",
    title: "Hair Spa & Conditioning Treatments",
    category: "Hair",
    shortDescription: "Intensive moisture bath and scalp soothing therapy using trusted Matrix and L'Oréal professional spa creams.",
    fullDescription: "Constant exposure to Delhi weather, pollution, and hard water can leave hair brittle and unruly. Our hair spa therapy deeply conditions hair follicles through cream emulsion massage, gentle steam absorption, and a replenishing wash to restore manageable softness and tactile strength.",
    benefits: [
      "Targeted hydration for dry, heat-stressed, or chemically treated strands",
      "Gentle steam infusion to facilitate cuticle penetration without harsh heat",
      "Relaxing scalp massage to ease everyday tension",
      "Noticeable reduction in frizz with restored natural shine"
    ],
    faqs: [
      {
        question: "Which brands do you use for hair spa?",
        answer: "We offer professional hair spa packages using established products including Matrix and L'Oréal Professional."
      },
      {
        question: "How often is a hair spa recommended?",
        answer: "For regular upkeep, a monthly hair spa session supports hair hydration and manageable texture."
      }
    ],
    approxTime: "45 - 60 mins",
    image: "/src/assets/images/hair_spa_treatment_1792936766012.jpg",
    keywords: ["hair spa in Burari", "matrix hair spa Delhi", "loreal hair spa West Sant Nagar"]
  },
  {
    id: "hair-colour",
    slug: "hair-colour",
    title: "Hair Colour Services",
    category: "Hair",
    shortDescription: "Even grey coverage, global shades, root touch-ups, and natural tone enrichment with professional formulations.",
    fullDescription: "Whether refreshing your natural shade or providing reliable coverage for emerging greys, our hair colour service ensures uniform distribution, consistent pigment hold, and shiny hair integrity through careful strand assessment and precise processing time.",
    benefits: [
      "Consistent root-to-end tone blending and dependable grey coverage",
      "Protective hairline barrier application to avoid scalp skin staining",
      "Gentle post-colour wash with color-safe stabilizing shampoo",
      "Personalized shade matching guidance for natural-looking tones"
    ],
    faqs: [
      {
        question: "Do you offer root touch-ups or only global colour?",
        answer: "Both root touch-ups and full global coloring are available depending on your hair goals."
      }
    ],
    approxTime: "60 - 90 mins",
    image: "/src/assets/images/salon_interior_luxury_1792936763722.jpg",
    keywords: ["hair colour in Burari", "hair dye Delhi", "hair color salon near me"]
  },
  {
    id: "inoa-hair-colour",
    slug: "inoa-hair-colour",
    title: "INOA Ammonia-Free Hair Colour",
    category: "Hair",
    shortDescription: "L'Oréal INOA oil-delivery system for vibrant colour and optimal scalp comfort without ammonia odor.",
    fullDescription: "L'Oréal Professional INOA (Innovation No Ammonia) utilizes an oil-delivery system (ODS) that maximizes coloring efficiency while respecting the essential lipid balance of hair. Ideal for sensitive scalps and clients who prefer an odor-free, non-aggressive coloring experience.",
    benefits: [
      "100% ammonia-free formulation for zero harsh chemical odor",
      "Enhanced scalp comfort during application",
      "Preserves the natural protective lipid film of the hair fibre",
      "Rich, luminous color reflection with long-lasting dimensional depth"
    ],
    faqs: [
      {
        question: "What makes INOA different from traditional colour?",
        answer: "INOA uses an advanced oil-based system instead of ammonia, which eliminates chemical odors and is gentler on sensitive scalps."
      }
    ],
    approxTime: "60 - 90 mins",
    image: "/src/assets/images/salon_interior_luxury_1792936763722.jpg",
    keywords: ["inoa hair colour Burari", "ammonia free hair colour Delhi", "loreal inoa salon"]
  },
  {
    id: "facial-and-skincare",
    slug: "facial-and-skincare",
    title: "Facial & Skin Care Treatments",
    category: "Skin",
    shortDescription: "Customized multi-step facials featuring Gold, VLCC, Lotus, Cheryl's, and O3+ formulations for refreshed skin clarity.",
    fullDescription: "Our facial skin care range delivers deep cleansing, exfoliation, gentle extraction, targeted facial massage, and nutrient-rich pack application. We feature reputable professional brands including VLCC, Lotus Herbal, Cheryl's Cosmeceuticals, and O3+ to address dullness, sun exposure, and dry patches.",
    benefits: [
      "Comprehensive multi-step treatment: cleanse, tone, scrub, massage, and mask",
      "Skin preparation with mild steam to loosen stubborn debris",
      "Formulations selected to complement normal, combination, or oily skin types",
      "Refreshed, glowing complexion without aggressive abrasive techniques"
    ],
    faqs: [
      {
        question: "Which facial should I choose?",
        answer: "Our technicians can review your current skin feel (tan, dryness, or dullness) and help you select from our VLCC, Lotus, Cheryl's, or O3+ menus."
      }
    ],
    approxTime: "50 - 75 mins",
    image: "/src/assets/images/facial_skincare_treatment_1792936765139.jpg",
    keywords: ["facial in Burari", "VLCC facial Delhi", "Cheryls facial Burari", "O3+ facial West Sant Nagar"]
  },
  {
    id: "fruit-clean-up",
    slug: "fruit-clean-up",
    title: "Fruit Clean-Up",
    category: "Skin",
    shortDescription: "Quick, refreshing natural fruit extract clean-up to remove surface pollutants and restore natural radiance.",
    fullDescription: "A gentle yet effective session combining fruit-infused gentle scrubs, clarifying cleanse, and cooling pack application. Perfect as a quick grooming refresher before an event or as part of a regular bi-weekly skin upkeep routine.",
    benefits: [
      "Natural fruit enzyme extracts that soften dead superficial cells",
      "Gentle manual exfoliation suitable for all skin types",
      "Lightweight cooling finish to calm and refresh tired facial skin",
      "Convenient shorter duration suited for busy schedules"
    ],
    faqs: [
      {
        question: "How is a clean-up different from a full facial?",
        answer: "A clean-up focuses primarily on deep cleansing and mild exfoliation in a shorter timeframe, whereas a facial includes prolonged massage, multiple specialized layers, and targeted masks."
      }
    ],
    approxTime: "30 - 40 mins",
    image: "/src/assets/images/facial_skincare_treatment_1792936765139.jpg",
    keywords: ["fruit clean up Burari", "face clean up Delhi", "skin clean up salon"]
  },
  {
    id: "d-tan-treatments",
    slug: "d-tan-treatments",
    title: "D-Tan Pack & Treatments",
    category: "Skin",
    shortDescription: "Specially formulated de-tanning pack to lighten superficial sun discoloration and restore even facial tone.",
    fullDescription: "Exposure to direct sunlight and outdoor dust often leads to patchy tan and dull facial skin. Our professional D-Tan treatment applies specialized active botanical and soothing agents to help lift surface tan lines and restore clear, balanced skin tone.",
    benefits: [
      "Helps lift superficial sun tan accumulated from outdoor travel",
      "Enriched with cooling agents that calm sun-exposed facial skin",
      "Non-bleaching gentle formula designed to even out complexion tone",
      "Frequently paired with haircuts, facials, and grooming packages"
    ],
    faqs: [
      {
        question: "Can D-Tan be done along with a haircut?",
        answer: "Yes, D-Tan packs are commonly paired with haircuts and shaving in our popular grooming packages."
      }
    ],
    approxTime: "20 - 25 mins",
    image: "/src/assets/images/facial_skincare_treatment_1792936765139.jpg",
    keywords: ["d tan pack Burari", "detan treatment Delhi", "sun tan removal salon"]
  },
  {
    id: "charcoal-face-scrub",
    slug: "charcoal-face-scrub",
    title: "Charcoal Face Scrub",
    category: "Skin",
    shortDescription: "Activated charcoal micro-exfoliation to draw out stubborn impurities, blackheads, and excessive skin oil.",
    fullDescription: "Activated bamboo charcoal is celebrated for its natural porous absorption properties. This invigorating scrub deeply exfoliates clogged pores, binds to surface pollutants, and sweeps away excess sebum for clean, matte, and touchable skin.",
    benefits: [
      "Natural activated charcoal attracts and absorbs micro-pollutants",
      "Gentle circular exfoliation unclogs congested T-zone pores",
      "Balances oily sheen without stripping the skin essential moisture",
      "Leaves skin with a smooth, breathable matte finish"
    ],
    faqs: [
      {
        question: "Is charcoal scrub suitable for sensitive skin?",
        answer: "Our technicians apply light pressure and check your comfort to ensure gentle, non-irritating exfoliation."
      }
    ],
    approxTime: "15 - 20 mins",
    image: "/src/assets/images/facial_skincare_treatment_1792936765139.jpg",
    keywords: ["charcoal scrub Burari", "face scrub Delhi", "pore cleansing salon"]
  },
  {
    id: "threading",
    slug: "threading",
    title: "Threading & Eyebrow Shaping",
    category: "Grooming",
    shortDescription: "Precise antibacterial cotton thread hair removal for clean eyebrow arches and refined facial contours.",
    fullDescription: "A time-tested hair removal technique using twisted high-tensile cotton thread to gently capture and lift stray hairs from the root. Delivers clean, defined eyebrow arches, upper lip grooming, and clean forehead boundaries with precision control.",
    benefits: [
      "Accurate single-hair precision for tailored eyebrow symmetry",
      "Pure cotton thread with no chemical adhesives or waxes",
      "Lifts hair straight from the follicle for clean skin borders",
      "Gentle post-threading astringent or cooling gel application"
    ],
    faqs: [
      {
        question: "Which areas can be threaded?",
        answer: "Eyebrows, forehead, upper lip, chin, and side locks can be cleanly threaded."
      }
    ],
    approxTime: "10 - 20 mins",
    image: "/src/assets/images/hair_styling_craft_1792936765485.jpg",
    keywords: ["threading Burari", "eyebrow shaping Delhi", "unisex salon threading"]
  },
  {
    id: "facial-masks",
    slug: "facial-masks",
    title: "Facial Masks & Power Masks",
    category: "Skin",
    shortDescription: "Specialized peel-off, alginate, and power masks designed to lock in active serum nutrients and calm skin.",
    fullDescription: "Applied following clean-ups, facials, or exfoliation, our specialized mask treatments (including O3+ Power Masks and nourishing botanical clay packs) seal in hydration, tighten pore appearance, and impart a luminous, revitalized complexion.",
    benefits: [
      "Deep occlusion allows active hydrating ingredients to absorb efficiently",
      "Cooling sensation tightens the visual appearance of facial pores",
      "Soothes redness and restores post-treatment equilibrium",
      "Formulations available for hydrating, brightening, and purifying needs"
    ],
    faqs: [
      {
        question: "What is an O3+ Power Mask?",
        answer: "An O3+ Power Mask is an intensive rubberized alginate mask that conforms to facial contours to optimize nutrient absorption and glow."
      }
    ],
    approxTime: "20 - 30 mins",
    image: "/src/assets/images/facial_skincare_treatment_1792936765139.jpg",
    keywords: ["facial masks Burari", "power mask salon", "o3 plus power mask Delhi"]
  }
];

export const MENS_PACKAGES: SalonPackage[] = [
  {
    id: "men-pkg-1",
    name: "Basic Grooming Package",
    target: "men",
    items: ["Hair Cut", "Shave", "Head Wash", "D-Tan Pack"],
    description: "Essential monthly grooming combination covering haircut, clean shave, relaxing head wash, and sun-tan lift.",
    isDraft: false,
    tag: "Essential",
    estimatedDuration: "60 mins"
  },
  {
    id: "men-pkg-2",
    name: "Fruit Clean-Up Package",
    target: "men",
    items: ["Fruit Clean-up", "D-Tan Pack", "Head Wash", "Hair Cut"],
    description: "Complete facial refreshment with natural fruit extracts, D-Tan pack, scalp wash, and precision haircut.",
    isDraft: false,
    tag: "Popular",
    estimatedDuration: "75 mins"
  },
  {
    id: "men-pkg-3",
    name: "Gold Facial Package",
    target: "men",
    items: ["Gold Facial", "Head Wash", "Shave", "D-Tan Pack"],
    description: "Illuminating Gold Facial paired with revitalizing head wash, razor shave, and clarifying D-Tan pack.",
    isDraft: false,
    tag: "Radiance",
    estimatedDuration: "90 mins"
  },
  {
    id: "men-pkg-4",
    name: "Matrix Hair Spa Package",
    target: "men",
    items: ["Matrix Hair Spa", "Hair Cut", "Head Wash", "Shave"],
    description: "Deep conditioning Matrix Hair Spa with precision haircut, scalp wash, and clean razor shave.",
    isDraft: false,
    tag: "Hair Nourish",
    estimatedDuration: "80 mins"
  },
  {
    id: "men-pkg-5",
    name: "L'Oréal Hair Spa Package",
    target: "men",
    items: ["L'Oréal Hair Spa", "Hair Cut", "Head Wash", "Shave"],
    description: "Signature L'Oréal Professional hair treatment paired with a fresh cut, wash, and beard grooming.",
    isDraft: false,
    tag: "Signature Spa",
    estimatedDuration: "85 mins"
  },
  {
    id: "men-pkg-6",
    name: "Hair Colour Package",
    target: "men",
    items: ["Hair Colour", "Hair Cut", "Head Wash", "Shave", "D-Tan Pack"],
    description: "Full natural hair coloring service combined with haircut, wash, shave, and sun-tan lightening pack.",
    isDraft: false,
    tag: "Complete Color",
    estimatedDuration: "105 mins"
  },
  {
    id: "men-pkg-7",
    name: "INOA Hair Colour Package",
    target: "men",
    items: ["INOA Hair Colour", "Hair Cut", "Shave", "Head Wash", "Charcoal Face Scrub"],
    description: "Ammonia-free INOA hair coloring experience, haircut, razor shave, head wash, and deep charcoal scrub.",
    isDraft: false,
    tag: "Ammonia Free",
    estimatedDuration: "110 mins"
  },
  {
    id: "men-pkg-8",
    name: "VLCC Facial Package",
    target: "men",
    items: ["VLCC Facial", "D-Tan Pack", "Hair Wash", "Hair Cut", "Shave"],
    description: "Comprehensive VLCC professional skincare facial complemented by D-Tan, wash, cut, and shave.",
    isDraft: false,
    tag: "VLCC Care",
    estimatedDuration: "100 mins"
  },
  {
    id: "men-pkg-9",
    name: "Lotus Facial Package",
    target: "men",
    items: ["Lotus Facial", "D-Tan Pack", "Hair Cut", "Hair Wash", "Shave"],
    description: "Botanical Lotus Herbals facial therapy combined with D-Tan pack, styling haircut, scalp wash, and shave.",
    isDraft: false,
    tag: "Lotus Herbals",
    estimatedDuration: "100 mins"
  },
  {
    id: "men-pkg-10",
    name: "Cheryl's Facial Package",
    target: "men",
    items: ["Cheryl's Facial", "D-Tan Pack", "Hair Cut", "Hair Wash", "Shave"],
    description: "Cosmeceutical Cheryl's facial regimen targeting blemishes and uneven texture with complete grooming.",
    isDraft: false,
    tag: "Cheryl's Glow",
    estimatedDuration: "100 mins"
  },
  {
    id: "men-pkg-11",
    name: "Cheryl's Facial With Mask Package",
    target: "men",
    items: ["Cheryl's Facial With Mask", "D-Tan Pack", "Hair Cut", "Hair Wash", "Shave"],
    description: "Advanced Cheryl's facial upgraded with a moisture-lock mask, D-Tan pack, haircut, wash, and shave.",
    isDraft: false,
    tag: "Mask Upgrade",
    estimatedDuration: "110 mins"
  },
  {
    id: "men-pkg-12",
    name: "VLCC Facial and Hair Colour Package",
    target: "men",
    items: ["VLCC Facial", "D-Tan Pack", "Hair Colour", "Hair Cut", "Hair Wash", "Shave"],
    description: "All-in-one head-to-toe makeover: VLCC facial, hair colour, D-Tan pack, haircut, wash, and shave.",
    isDraft: false,
    tag: "Festive Makeover",
    estimatedDuration: "135 mins"
  },
  {
    id: "men-pkg-13",
    name: "Lotus Facial and Hair Colour Package",
    target: "men",
    items: ["Lotus Facial", "Hair Colour", "Hair Cut", "Hair Wash", "Shave", "Threading", "D-Tan Pack"],
    description: "Complete grooming suite with Lotus facial, hair colour, styling cut, wash, shave, brow threading, and D-Tan.",
    isDraft: false,
    tag: "Full Deluxe",
    estimatedDuration: "145 mins"
  },
  {
    id: "men-pkg-14",
    name: "O3+ Facial Package",
    target: "men",
    items: ["O3+ Facial", "D-Tan Pack", "Hair Cut", "Head Wash", "Shave"],
    description: "Premium O3+ dermatological glow facial paired with D-Tan pack, precision cut, head wash, and shave.",
    isDraft: false,
    tag: "Premium O3+",
    estimatedDuration: "115 mins"
  },
  {
    id: "men-pkg-15",
    name: "O3+ Power Mask Package",
    target: "men",
    items: ["O3+ Facial With Power Mask", "INOA Hair Colour", "Hair Cut", "Hair Wash", "Shave", "Threading (if required)"],
    description: "The pinnacle of salon luxury: O3+ Power Mask facial, INOA ammonia-free colour, cut, wash, shave, and brow detail.",
    isDraft: false,
    tag: "Ultimate Luxury",
    estimatedDuration: "160 mins"
  }
];

export const WOMENS_PACKAGES: SalonPackage[] = [
  {
    id: "women-pkg-1",
    name: "Hair Care Package",
    target: "women",
    items: ["Hair Cut", "Hair Wash", "Hair Spa"],
    description: "Complete hair rejuvenation including customized haircut, clarifying wash, and nourishing hair spa.",
    isDraft: true, // Note: per prompt, newly composed packages are marked draft until owner confirms availability
    tag: "Suggested Care",
    estimatedDuration: "75 mins"
  },
  {
    id: "women-pkg-2",
    name: "Fruit Clean-Up Package",
    target: "women",
    items: ["Fruit Clean-up", "D-Tan Pack", "Head Wash", "Hair Cut"],
    description: "Natural fruit extract clean-up paired with gentle D-Tan pack, scalp wash, and customized haircut.",
    isDraft: false,
    tag: "Popular",
    estimatedDuration: "75 mins"
  },
  {
    id: "women-pkg-3",
    name: "Gold Facial Package",
    target: "women",
    items: ["Gold Facial", "Head Wash", "D-Tan Pack"],
    description: "Radiant Gold Facial treatment combined with relaxing head wash and clarifying D-Tan pack.",
    isDraft: false,
    tag: "Radiance",
    estimatedDuration: "80 mins"
  },
  {
    id: "women-pkg-4",
    name: "Matrix Hair Spa Package",
    target: "women",
    items: ["Matrix Hair Spa", "Hair Cut", "Head Wash", "Threading"],
    description: "Matrix deep conditioning hair spa, precision haircut, relaxing wash, and clean eyebrow threading.",
    isDraft: false,
    tag: "Nourish & Shape",
    estimatedDuration: "85 mins"
  },
  {
    id: "women-pkg-5",
    name: "L'Oréal Hair Spa Package",
    target: "women",
    items: ["L'Oréal Hair Spa", "Hair Cut", "Head Wash", "Threading"],
    description: "L'Oréal Professional conditioning therapy paired with styling haircut, head wash, and eyebrow shaping.",
    isDraft: false,
    tag: "Signature Spa",
    estimatedDuration: "90 mins"
  },
  {
    id: "women-pkg-6",
    name: "Hair Colour Package",
    target: "women",
    items: ["Hair Colour", "Hair Cut", "Head Wash", "D-Tan Pack"],
    description: "Vibrant hair colour service with haircut, hair wash, and complexion-balancing D-Tan pack.",
    isDraft: false,
    tag: "Color Refresh",
    estimatedDuration: "110 mins"
  },
  {
    id: "women-pkg-7",
    name: "VLCC Facial Package",
    target: "women",
    items: ["VLCC Facial", "D-Tan Pack", "Hair Wash", "Hair Cut", "Threading"],
    description: "VLCC professional facial with D-Tan pack, hair wash, haircut, and precise eyebrow threading.",
    isDraft: false,
    tag: "VLCC Care",
    estimatedDuration: "105 mins"
  },
  {
    id: "women-pkg-8",
    name: "Lotus Facial Package",
    target: "women",
    items: ["Lotus Facial", "D-Tan Pack", "Hair Cut", "Hair Wash"],
    description: "Botanical Lotus Herbals facial therapy combined with D-Tan pack, haircut, and refreshing wash.",
    isDraft: false,
    tag: "Lotus Herbals",
    estimatedDuration: "95 mins"
  },
  {
    id: "women-pkg-9",
    name: "Cheryl's Facial Package",
    target: "women",
    items: ["Cheryl's Facial", "D-Tan Pack", "Hair Cut", "Hair Wash"],
    description: "Targeted Cheryl's cosmeceutical facial, sun-tan lightening pack, haircut, and scalp cleansing.",
    isDraft: false,
    tag: "Cheryl's Care",
    estimatedDuration: "95 mins"
  },
  {
    id: "women-pkg-10",
    name: "Cheryl's Facial With Mask Package",
    target: "women",
    items: ["Cheryl's Facial With Mask", "D-Tan Pack", "Hair Cut", "Hair Wash"],
    description: "Cheryl's facial with sealing hydration mask, D-Tan treatment, styling haircut, and hair wash.",
    isDraft: false,
    tag: "Hydra Mask",
    estimatedDuration: "105 mins"
  },
  {
    id: "women-pkg-11",
    name: "VLCC Facial and Hair Colour Package",
    target: "women",
    items: ["VLCC Facial", "D-Tan Pack", "Hair Colour", "Hair Cut", "Hair Wash"],
    description: "Total beauty transformation: VLCC facial, hair colouring, D-Tan pack, haircut, and hair wash.",
    isDraft: false,
    tag: "Makeover",
    estimatedDuration: "135 mins"
  },
  {
    id: "women-pkg-12",
    name: "Lotus Facial and Hair Colour Package",
    target: "women",
    items: ["Lotus Facial", "Hair Colour", "Hair Cut", "Hair Wash", "Threading", "D-Tan Pack"],
    description: "Lotus Herbals facial, hair colour, haircut, hair wash, eyebrow threading, and D-Tan pack.",
    isDraft: false,
    tag: "Deluxe Suite",
    estimatedDuration: "140 mins"
  },
  {
    id: "women-pkg-13",
    name: "O3+ Facial Package",
    target: "women",
    items: ["O3+ Facial", "D-Tan Pack", "Hair Cut", "Head Wash"],
    description: "High-performance O3+ facial treatment with D-Tan pack, styling haircut, and refreshing head wash.",
    isDraft: false,
    tag: "Premium O3+",
    estimatedDuration: "110 mins"
  },
  {
    id: "women-pkg-14",
    name: "O3+ Power Mask Package",
    target: "women",
    items: ["O3+ Facial With Power Mask", "INOA Hair Colour", "Hair Cut", "Hair Wash", "Threading"],
    description: "Elite salon experience: O3+ Power Mask facial, INOA ammonia-free colour, haircut, wash, and threading.",
    isDraft: false,
    tag: "Ultimate Luxury",
    estimatedDuration: "155 mins"
  }
];

// Helper to construct WhatsApp Click to Chat links
export function getWhatsAppBookingUrl(phoneDigits: string, message: string): string {
  const cleanDigits = phoneDigits.replace(/\D/g, "");
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${cleanDigits}?text=${encodedText}`;
}

export function getGeneralWhatsAppUrl(): string {
  return getWhatsAppBookingUrl(
    INITIAL_BUSINESS_CONFIG.primaryPhoneRaw,
    "Hello ART OF SCISSOR, I would like to book a salon appointment. Please share the available timings and details."
  );
}

export function getPackageWhatsAppUrl(packageName: string): string {
  return getWhatsAppBookingUrl(
    INITIAL_BUSINESS_CONFIG.primaryPhoneRaw,
    `Hello ART OF SCISSOR, I am interested in the ${packageName}. Please share the details and availability.`
  );
}

export function getServiceWhatsAppUrl(serviceName: string): string {
  return getWhatsAppBookingUrl(
    INITIAL_BUSINESS_CONFIG.primaryPhoneRaw,
    `Hello ART OF SCISSOR, I would like to inquire about ${serviceName}. Please share the details.`
  );
}
