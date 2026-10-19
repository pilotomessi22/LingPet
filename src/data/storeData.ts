export interface SupplierAgent {
  id: string;
  name: string;
  role: string;
  platform: 'WhatsApp' | 'Skype' | 'LiveChat';
  contact: string;
  whatsappLink: string;
  skype: string;
  email: string;
  warehouse: string;
  avatar: string;
  status: string;
  perks: string[];
}

export interface ProductVolumePricing {
  qty: number;
  discountPercent: number;
  pricePerUnit: number;
  total: number;
  savings: number;
  netProfit: number;
  badge?: string;
}

export interface ProductSpecifications {
  material: string;
  dimensions: string;
  weight: string;
  inTheBox: string;
  care: string;
  warranty: string;
  cjWarehouse: string;
  shippingEstimate: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  brand?: string;
  tagline: string;
  petType: 'Dog' | 'Cat' | 'All Pets';
  category: 'Beds' | 'Feeding' | 'Walk & Travel' | 'Toys' | 'Grooming' | 'Wellness' | 'Treats';
  department: 'Dogs' | 'Cats' | 'Wellness' | 'Grooming' | 'Toys' | 'Deals';
  price: number;
  compareAt: number;
  supplierCost: number; // Cost from CJ Dropshipping / Zendrop
  cjCost: number; // Wholesale unit cost in CJ Dropshipping
  cjShippingEstimate: number; // Estimated CJ Packet / USPS line-haul shipping fee
  totalCjCost: number; // Wholesale unit cost + CJ shipping
  netProfit: number; // Unit store profit (price - totalCjCost)
  profitMarginPercent: number; // Profit margin percentage
  supplier: 'CJ Dropshipping' | 'Zendrop';
  supplierSku: string;
  supplierUrl: string;
  supplierWarehouse: string;
  supplierShippingTime: string;
  rating: number;
  reviewsCount: number;
  badge?: string;
  isBestseller?: boolean;
  isLingPick?: boolean;
  repeatDeliveryEligible: boolean;
  inStockAustin: boolean;
  heroImage: string;
  secondaryImage?: string;
  galleryImages: string[];
  description: string;
  keyFeatures: string[];
  specifications: ProductSpecifications;
  volumeTiers: ProductVolumePricing[];
  sizes?: { name: string; weightLabel: string }[];
  colors?: { name: string; hex: string; class: string }[];
  addOns?: { name: string; price: number; description: string }[];
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  petName: string;
  petBreed: string;
  rating: number;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  productName: string;
  date: string;
}

export const SUPPLIER_AGENTS: SupplierAgent[] = [
  {
    id: 'cj-agent-lisa',
    name: 'Lisa Wang',
    role: 'CJ Dropshipping Pet Category Senior Key Account Manager',
    platform: 'WhatsApp',
    contact: '+1 (415) 890-4821',
    whatsappLink: 'https://wa.me/14158904821?text=Hello%20Lisa,%20I%20am%20the%20owner%20of%20Ling%20Petshop.%20I%20need%20to%20dispatch%20an%20order%20and%20request%20USPS%20tracking.',
    skype: 'live:.cid.lisa_cjdropship_pet',
    email: 'lisa.petcategory@cjdropshipping.com',
    warehouse: 'US East (New Jersey) & US West (California)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    status: 'Online Now (Avg. response < 5 min)',
    perks: [
      'Descontos negociáveis por volume acima de 10 pedidos/dia',
      'Inspeção por fotos reais do produto no armazém antes do despacho',
      'Embalagem 100% neutra sem inscrições asiáticas (Blind Dropshipping)',
      'Código de rastreio USPS prioritário em até 24 horas',
    ],
  },
  {
    id: 'zendrop-agent-michael',
    name: 'Michael Miller',
    role: 'Zendrop US Warehouse Express Lead',
    platform: 'WhatsApp',
    contact: '+1 (305) 714-2908',
    whatsappLink: 'https://wa.me/13057142908?text=Hi%20Michael,%20Ling%20Petshop%20store%20manager%20here.%20Checking%20USPS%20express%20dispatch.',
    skype: 'live:.cid.zendrop_michael_support',
    email: 'michael.vip@zendrop.com',
    warehouse: 'US Central (Texas) & Florida Express Hub',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
    status: 'Online (24/7 VIP Priority Desk)',
    perks: [
      'Garantia de reposição imediata se houver atraso superior a 5 dias úteis',
      'Envio expresso a partir do armazém central dos EUA via USPS Ground Advantage',
      'Atendimento em inglês comercial e chat em tempo real com o suporte',
      'Possibilidade de encarte com cupom de desconto personalizado para a Ling Petshop',
    ],
  },
];

const RAW_PRODUCTS = [
  {
    id: 'cloud9-calming-bed',
    sku: 'LP-BED-C9',
    brand: 'Ling Comfort Lab',
    name: 'The Cloud9™ Orthopedic Calming Pet Bed',
    tagline: 'Vet-approved anxiety relief with 7" raised bolster and memory-foam joint contouring.',
    petType: 'Dog',
    category: 'Beds',
    department: 'Dogs',
    price: 44.95,
    compareAt: 69.0,
    supplierCost: 15.5,
    rating: 4.9,
    reviewsCount: 3840,
    badge: '★ #1 US Bestseller',
    isBestseller: true,
    isLingPick: true,
    repeatDeliveryEligible: true,
    inStockAustin: true,
    heroImage: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
    description:
      'Engineered with a raised orthopedic donut rim that mimics the protective embrace of a mother dog. High-density virgin polyfiber filling provides instant joint decompression, soothing nervous systems and melting away storm, fireworks, and separation anxiety.',
    keyFeatures: [
      'Raised 7" bolster creates an instant sense of security and neck support',
      'High-resilience orthopedic filling cushions hips and aching joints',
      'Waterproof internal membrane protects against accidental spills',
      '100% Removable & machine-washable zip cover (cold cycle safe)',
      'Non-slip grip bottom keeps the bed anchored on hardwood and tile',
    ],
    sizes: [
      { name: 'Small (23")', weightLabel: 'Up to 15 lbs (Pugs, Cats, Yorkies)' },
      { name: 'Medium (30")', weightLabel: '15 – 35 lbs (Frenchies, Corgis)' },
      { name: 'Large (36")', weightLabel: '35 – 70 lbs (Aussies, Labradors)' },
      { name: 'X-Large (42")', weightLabel: '70+ lbs (Golden Retrievers, Danes)' },
    ],
    colors: [
      { name: 'Sage Green', hex: '#3A5A40', class: 'bg-[#3A5A40]' },
      { name: 'Oatmeal Cream', hex: '#EBE5D8', class: 'bg-[#EBE5D8]' },
      { name: 'Smoky Charcoal', hex: '#2B2D2F', class: 'bg-[#2B2D2F]' },
    ],
    addOns: [
      {
        name: 'Spare Waterproof Quick-Zip Cover',
        price: 14.95,
        description: 'Keep a clean cover ready while the other is in the wash.',
      },
    ],
  },
  {
    id: 'aquapure-wireless-fountain',
    sku: 'LP-FOUNT-AQ',
    brand: 'PureFlow Hydration',
    name: 'AquaPure™ Ultra-Quiet Wireless Pet Fountain',
    tagline: 'Encourages 3x more daily hydration to protect kidney & urinary health in cats and small dogs.',
    petType: 'Cat',
    category: 'Feeding',
    department: 'Cats',
    price: 38.9,
    compareAt: 58.0,
    supplierCost: 11.5,
    rating: 4.9,
    reviewsCount: 1920,
    badge: 'Vet Recommended',
    isBestseller: true,
    isLingPick: true,
    repeatDeliveryEligible: true,
    inStockAustin: true,
    heroImage: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',
    description:
      'Stagnant water bowls breed bacteria and discourage natural thirst instincts. AquaPure delivers continuous, oxygen-enriched bubbling spring water through a 4-stage active coconut carbon filter with zero exposed wires inside the water tank.',
    keyFeatures: [
      'Wireless electromagnetic induction pump eliminates water hazard risks',
      'Medical-grade 304 food stainless steel basin prevents feline chin acne',
      'Whisper-quiet operation (<20dB) quieter than a gentle breeze',
      '4-Stage filtration traps hair, heavy metals, chlorine, and odors',
      'Smart LED sensor alerts you automatically when water level runs low',
    ],
    sizes: [{ name: 'Standard 2.5L / 84 oz', weightLabel: '7-10 Days Fresh Water' }],
    colors: [
      { name: 'Matte Sage & White', hex: '#588157', class: 'bg-[#588157]' },
      { name: 'Alabaster White', hex: '#F8F9FA', class: 'bg-[#F8F9FA]' },
    ],
    addOns: [
      {
        name: '3-Pack Replacement Carbon Filters',
        price: 9.95,
        description: 'Recommended replacement every 4 weeks for crystalline freshness.',
      },
    ],
  },
  {
    id: 'airglide-harness',
    sku: 'LP-HARN-AG',
    brand: 'Ling Outdoor Co.',
    name: 'AirGlide™ Zero-Pull Ergonomic Dog Harness',
    tagline: 'Front-clip steering stops leash pulling instantly while protecting dog trachea and shoulders.',
    petType: 'Dog',
    category: 'Walk & Travel',
    department: 'Dogs',
    price: 28.5,
    compareAt: 44.0,
    supplierCost: 7.2,
    rating: 4.8,
    reviewsCount: 2450,
    badge: 'Trail Tested',
    isBestseller: true,
    repeatDeliveryEligible: false,
    inStockAustin: true,
    heroImage: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=800&q=80',
    description:
      'Constructed with military-grade ripstop nylon and 3M Scotchlite reflective stitching for maximum safety on evening walks in your neighborhood. Dual D-ring design redirects pulling power without choking.',
    keyFeatures: [
      'Patented dual-clip: front chest clip stops pullers, back ring for relaxed jogs',
      'Breathable honeycomb mesh lining prevents chafing on long adventures',
      '4 fully adjustable slide buckles ensure a custom escape-proof fit',
      'Ultra-durable padded top grab handle for quick control near busy traffic',
    ],
    sizes: [
      { name: 'Small', weightLabel: 'Chest 15-22" (Pugs, Boston Terriers)' },
      { name: 'Medium', weightLabel: 'Chest 22-28" (Corgis, Beagles)' },
      { name: 'Large', weightLabel: 'Chest 28-35" (Labs, Golden Retrievers)' },
      { name: 'X-Large', weightLabel: 'Chest 35-43" (German Shepherds, Rottweilers)' },
    ],
    colors: [
      { name: 'Sunset Amber', hex: '#E76F51', class: 'bg-[#E76F51]' },
      { name: 'Trail Sage', hex: '#3A5A40', class: 'bg-[#3A5A40]' },
      { name: 'Stealth Onyx', hex: '#1C1C1C', class: 'bg-[#1C1C1C]' },
    ],
  },
  {
    id: 'smartroll-interactive-ball',
    sku: 'LP-BALL-SM',
    brand: 'PawPlay Tech',
    name: 'SmartRoll™ Interactive LED Bouncing Ball',
    tagline: 'Self-rolling smart toy with intelligent obstacle avoidance that keeps cats and pups active for hours.',
    petType: 'All Pets',
    category: 'Toys',
    department: 'Toys',
    price: 19.95,
    compareAt: 32.0,
    supplierCost: 4.8,
    rating: 4.8,
    reviewsCount: 1640,
    badge: 'Popular Gift',
    isBestseller: false,
    repeatDeliveryEligible: false,
    inStockAustin: true,
    heroImage: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=85',
    description:
      '360-degree automatic gyroscope motion stimulates your pet hunting instincts. Automatically navigates out of tight corners and stops after 10 minutes to prevent over-exhaustion, waking up with a single tap.',
    keyFeatures: [
      'Two motion modes: gentle bounce for timid cats and crazy spin for energetic dogs',
      'Food-grade BPA-free silicone shell rolls quietly across hardwood and tile',
      'USB-C rapid rechargeable battery with 4+ hours of active continuous playtime',
      'Built-in soft ambient LED light glows without hurting delicate pet retinas',
    ],
    colors: [
      { name: 'Mint Green', hex: '#2A9D8F', class: 'bg-[#2A9D8F]' },
      { name: 'Coral Pink', hex: '#E76F51', class: 'bg-[#E76F51]' },
    ],
  },
  {
    id: 'groompro-5in1-vacuum',
    sku: 'LP-VAC-GP',
    brand: 'Ling Professional',
    name: 'GroomPro™ 5-in-1 Low-Noise Pet Vacuum & Groomer',
    tagline: 'Captures 99.8% of loose shedding hair directly into the canister before it hits your furniture.',
    petType: 'All Pets',
    category: 'Grooming',
    department: 'Grooming',
    price: 69.95,
    compareAt: 119.0,
    supplierCost: 18.5,
    rating: 4.9,
    reviewsCount: 1120,
    badge: 'Salon Grade',
    isBestseller: true,
    isLingPick: true,
    repeatDeliveryEligible: false,
    inStockAustin: true,
    heroImage: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1200&q=85',
    description:
      'Turn expensive $120 salon visits into a painless 15-minute home bonding ritual. Features a sub-52dB whisper motor so pets stay completely calm during de-shedding, trimming, and paw cleaning.',
    keyFeatures: [
      'Includes 5 quick-lock attachments: slicker brush, de-shedding rake, precision trimmer & crevice tool',
      'Ultra-silent motor engineered specifically to prevent sound anxiety in skittish pets',
      'Large 1.8L one-touch push release dust cup holds up to 3 full dog coats of hair',
      'Medical HEPA filtration traps micro-dander, dust mites, and pet allergens',
    ],
  },
  {
    id: 'dentalchew-defense-rings',
    sku: 'LP-DENT-CH',
    brand: 'VetDent Pro',
    name: 'DentalChew™ Enzymatic Plaque Defense Rings (2-Pack)',
    tagline: 'Cleans teeth down to the gumline while freshening breath naturally without brushing battles.',
    petType: 'Dog',
    category: 'Wellness',
    department: 'Wellness',
    price: 14.95,
    compareAt: 24.0,
    supplierCost: 3.5,
    rating: 4.9,
    reviewsCount: 890,
    badge: 'Dental Health',
    repeatDeliveryEligible: true,
    inStockAustin: true,
    heroImage: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1587764379873-97837921fd44?auto=format&fit=crop&w=1200&q=85',
    description:
      'Patented multi-ridge dental ring with natural spirulina and kelp enzymes that dissolve plaque buildup while your dog happily chews. 100% digestible and gentle on sensitive stomachs.',
    keyFeatures: [
      'Unique micro-grooves clean hard-to-reach molars and scrape away tartar',
      'Natural chlorophyll and mint eliminate bad dog breath from the gut up',
      'Grain-free, rawhide-free, zero artificial colors or preservatives',
      'Recommended by board-certified veterinary dentists',
    ],
    sizes: [
      { name: 'Small / Medium', weightLabel: 'For dogs under 40 lbs' },
      { name: 'Large / Giant', weightLabel: 'For dogs 40+ lbs' },
    ],
  },
  {
    id: 'carseat-waterproof-cover',
    sku: 'LP-SEAT-SH',
    brand: 'Ling Outdoor Co.',
    name: 'PawShield™ Heavy-Duty Waterproof Rear Car Bench Cover',
    tagline: 'Guaranteed 100% mud, scratch, and fur protection for backseat car upholstery on road trips across the US.',
    petType: 'Dog',
    category: 'Walk & Travel',
    department: 'Dogs',
    price: 36.95,
    compareAt: 59.0,
    supplierCost: 10.5,
    rating: 4.9,
    reviewsCount: 1540,
    badge: 'Travel Must-Have',
    isBestseller: true,
    repeatDeliveryEligible: false,
    inStockAustin: true,
    heroImage: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?auto=format&fit=crop&w=1200&q=85',
    description:
      'Crafted from 600D heavy-duty Oxford cloth with TPU waterproof lamination and anti-slip rubber mesh backing. Includes a breathable mesh viewing window so your pup can see you while staying securely in the back.',
    keyFeatures: [
      '100% Waterproof & scratch-proof multi-layer quilted construction',
      'Side flaps protect car door panels during window viewing',
      'Visual mesh window promotes air conditioning airflow and reduces pet anxiety',
      'Includes 2 adjustable dog seatbelt leashes that plug into standard buckles',
    ],
  },
  {
    id: 'floppyfish-cat-toy',
    sku: 'LP-FISH-CAT',
    brand: 'FelineFrenzy',
    name: 'FloppyFish™ Motion-Activated Organic Catnip Kicker',
    tagline: 'Realistic wriggling motion stimulates predatory kicking instincts for bored indoor cats.',
    petType: 'Cat',
    category: 'Toys',
    department: 'Cats',
    price: 16.95,
    compareAt: 28.0,
    supplierCost: 3.9,
    rating: 4.8,
    reviewsCount: 2210,
    badge: 'TikTok Viral',
    isBestseller: true,
    repeatDeliveryEligible: false,
    inStockAustin: true,
    heroImage: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=1200&q=85',
    description:
      'Equipped with a smart built-in touch sensor: whenever your cat touches the fish, it automatically flips and wriggles like a fresh salmon. Filled with organic US-grown catnip pouch.',
    keyFeatures: [
      'USB rechargeable mechanism with zipper pouch for safe recharging',
      'Durable non-toxic plush cotton safe for biting, chewing, and bunny-kicking',
      'Includes 2 fresh refillable organic catnip tea-bags',
      'Motion sensor conserves power when your cat naps',
    ],
  },
  {
    id: 'elevated-bamboo-bowls',
    sku: 'LP-BOWL-BAM',
    brand: 'Ling Comfort Lab',
    name: 'ZenDine™ Elevated Ergonomic Bamboo Bowls (Stainless Steel)',
    tagline: '15° tilted orthopedic feeder promotes smooth digestion and reduces neck strain in senior dogs & cats.',
    petType: 'All Pets',
    category: 'Feeding',
    department: 'Wellness',
    price: 29.95,
    compareAt: 48.0,
    supplierCost: 8.5,
    rating: 4.9,
    reviewsCount: 970,
    badge: 'Vet Recommended',
    repeatDeliveryEligible: false,
    inStockAustin: true,
    heroImage: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=85',
    description:
      'Water-resistant natural bamboo stand with 2 food-grade rustproof 304 stainless steel bowls. Elevates food off the floor, drastically reducing bloating and esophageal vomiting.',
    keyFeatures: [
      '3 height adjustments to grow from puppy/kittenhood to adult stage',
      'Anti-slip silicone pads prevent rattling noises while eating',
      'Dishwasher safe bowls for effortless daily sanitizing',
      'Sleek modern Scandinavian aesthetic fits modern American home and kitchen decors',
    ],
  },
  {
    id: 'calming-hemp-chews',
    sku: 'LP-HEMP-CHW',
    brand: 'Botanical Pet Lab',
    name: 'ZenPup™ Organic Calming Soft Chews (90 Count)',
    tagline: 'Natural valerian root, L-theanine & chamomile treats for thunderstorms, fireworks & vet visits.',
    petType: 'Dog',
    category: 'Treats',
    department: 'Wellness',
    price: 24.95,
    compareAt: 39.0,
    supplierCost: 5.5,
    rating: 4.9,
    reviewsCount: 1830,
    badge: 'Made in USA',
    isBestseller: true,
    repeatDeliveryEligible: true,
    inStockAustin: true,
    heroImage: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85',
    description:
      'Formulated in an FDA-registered facility using organic cold-pressed botanicals. Real duck liver flavor that dogs go crazy for, calming hyperactivity within 30 minutes without sedation.',
    keyFeatures: [
      'Non-drowsy herbal formula: Melatonin, Passion Flower, Organic Hemp Seed Oil & Chamomile',
      'Works in 30-45 minutes ahead of sudden thunderstorms or busy dog parks',
      '100% Grain-free, wheat-free, soy-free soft chew texture',
      '90 delicious soft chews per tub (lasts 1-3 months based on dog weight)',
    ],
  },
  {
    id: 'cardboard-scratch-lounge',
    sku: 'LP-SCRAT-LNG',
    brand: 'FelineFrenzy',
    name: 'MeowLounge™ Ergonomic L-Shaped Scratching Lounge',
    tagline: 'Protects sofa corners and carpets while providing cats a cozy reclining perch.',
    petType: 'Cat',
    category: 'Beds',
    department: 'Cats',
    price: 32.95,
    compareAt: 52.0,
    supplierCost: 8.9,
    rating: 4.8,
    reviewsCount: 760,
    badge: 'Furniture Saver',
    repeatDeliveryEligible: false,
    inStockAustin: true,
    heroImage: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=1200&q=85',
    description:
      'High-density corrugated honeycomb cardboard bonded with non-toxic cornstarch glue. Dual orientation allows vertical sofa defense or horizontal floor cat napping.',
    keyFeatures: [
      'Heavy-duty compressed cardboard lasts 3x longer than grocery store scratchers',
      'Curved contour naturally cradles feline spine for afternoon snoozes',
      'Reversible design for double the scratching surface lifetime',
      'Includes 1 pack of natural premium organic catnip shaker',
    ],
  },
  {
    id: 'handsfree-bungee-leash',
    sku: 'LP-LEASH-BUN',
    brand: 'Ling Outdoor Co.',
    name: 'TrailPaws™ Hands-Free Shock-Absorbing Running Leash',
    tagline: 'Dual bungee core absorbs sudden lunges for comfortable jogging, hiking, and stroller walking.',
    petType: 'Dog',
    category: 'Walk & Travel',
    department: 'Dogs',
    price: 22.95,
    compareAt: 36.0,
    supplierCost: 5.8,
    rating: 4.9,
    reviewsCount: 1410,
    badge: 'Runner Tested',
    repeatDeliveryEligible: false,
    inStockAustin: true,
    heroImage: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1200&q=85',
    description:
      'Adjustable waist belt (28"-48") with dual quick-control handles. Reflective neon stitching ensures maximum visibility on neighborhood runs and outdoor trail adventures.',
    keyFeatures: [
      'Heavy-duty bungee extends from 51" to 70" absorbing 150 lbs of pulling torque',
      '2 Neoprene padded control handles for tight sidewalk navigation',
      'D-rings for poop bag dispenser and water bottle clip attachment',
      '360° Heavy-duty zinc-alloy tangle-free swivel clasp',
    ],
    colors: [
      { name: 'Neon Green & Black', hex: '#2A9D8F', class: 'bg-[#2A9D8F]' },
      { name: 'Sunset Clay', hex: '#E76F51', class: 'bg-[#E76F51]' },
      { name: 'Deep Navy', hex: '#002855', class: 'bg-[#002855]' },
    ],
  },
  {
    id: 'paw-cleaner-mud-cup',
    sku: 'LP-PAW-CLEAN',
    brand: 'Ling Outdoor Co.',
    name: 'CleanPaw™ Silicone Mud Buster Washer Cup',
    tagline: 'Gently cleans muddy paws in 10 seconds before your pup enters the house or car.',
    petType: 'Dog',
    category: 'Grooming',
    department: 'Grooming',
    price: 14.95,
    compareAt: 24.0,
    supplierCost: 3.2,
    rating: 4.8,
    reviewsCount: 1890,
    badge: 'Rainy Day Essential',
    repeatDeliveryEligible: false,
    inStockAustin: true,
    heroImage: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=85',
    description:
      'Soft silicone bristles remove dirt, sand, and lawn fertilizers from paws without hurting claws. Simply add water, twist, and dab dry with a towel.',
    keyFeatures: [
      'BPA-free food-grade flexible silicone bristles',
      'Easy to dismantle and rinse clean under kitchen faucet',
      'Portable size with travel lanyard for dog park and hike cleanup',
    ],
    sizes: [
      { name: 'Medium (Up to 2.5" Paw)', weightLabel: 'Frenchies, Corgis, Terriers' },
      { name: 'Large (Up to 3.5" Paw)', weightLabel: 'Labs, Shepherds, Goldens' },
    ],
  },
  {
    id: 'cat-climbing-tree-tower',
    sku: 'LP-TREE-TWR',
    brand: 'FelineFrenzy',
    name: 'CloudTower™ Modern Minimalist Multi-Level Cat Tree',
    tagline: 'Modern 54" cat condo with natural sisal posts and cloud-plush hammock perch.',
    petType: 'Cat',
    category: 'Beds',
    department: 'Cats',
    price: 58.95,
    compareAt: 95.0,
    supplierCost: 17.5,
    rating: 4.9,
    reviewsCount: 840,
    badge: 'Top Rated Furniture',
    isLingPick: true,
    repeatDeliveryEligible: false,
    inStockAustin: true,
    heroImage: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85',
    description:
      'Engineered for multi-cat households with widened reinforced anti-tipping base. Neutral oatmeal cream fabric coordinates beautifully with modern interior design.',
    keyFeatures: [
      '54-inch multi-tiered vertical playground with cozy private cave box',
      'Thick natural sisal wrapped pillars satisfy claw trimming urges',
      'Includes safety anti-topple wall anchor strap for maximum stability',
      'Ultra-soft faux rabbit fur resting platforms for deep sleep',
    ],
  },
  {
    id: 'enzymatic-toothpaste-kit',
    sku: 'LP-TOOTH-KIT',
    brand: 'VetDent Pro',
    name: 'FreshBreathe™ Enzymatic Vanilla Mint Toothpaste & Brush Kit',
    tagline: 'Dissolves tartar and freshens dog & cat breath with delicious pet-safe vanilla mint enzymes.',
    petType: 'All Pets',
    category: 'Wellness',
    department: 'Wellness',
    price: 12.95,
    compareAt: 22.0,
    supplierCost: 2.8,
    rating: 4.8,
    reviewsCount: 650,
    badge: 'Dental Pro',
    repeatDeliveryEligible: true,
    inStockAustin: true,
    heroImage: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1587764379873-97837921fd44?auto=format&fit=crop&w=1200&q=85',
    description:
      'No rinsing required! Formulated with active enzymes that continue working long after application to break down food tartar and prevent gum gingivitis.',
    keyFeatures: [
      'Safe to swallow: zero foaming agents, xylitol, or fluoride',
      'Includes 360-degree soft silicone finger brush for gentle massaging',
      'Dual-headed angled brush reaches rear molars easily',
    ],
  },
  {
    id: 'indestructible-rubber-bone',
    sku: 'LP-TOY-BONE',
    brand: 'PawPlay Tech',
    name: 'ToughTusk™ Indestructible Natural Rubber Chew Bone',
    tagline: 'Built for aggressive power chewers with treat-dispensing hollow core and beef aroma.',
    petType: 'Dog',
    category: 'Toys',
    department: 'Toys',
    price: 18.95,
    compareAt: 29.0,
    supplierCost: 4.5,
    rating: 4.9,
    reviewsCount: 2950,
    badge: 'Chewer Tested',
    isBestseller: true,
    repeatDeliveryEligible: false,
    inStockAustin: true,
    heroImage: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?auto=format&fit=crop&w=1200&q=85',
    description:
      'Made from 100% natural puncture-resistant tree rubber tested with Pitbulls, German Shepherds, and Mastiffs. Can be stuffed with peanut butter or treats to cure dog boredom.',
    keyFeatures: [
      'Lifetime replacement guarantee for aggressive chewers',
      'Textured ridges massage gums and promote dental cleaning',
      'Freezer-safe: freeze with bone broth for long-lasting summer cooling',
    ],
    sizes: [
      { name: 'Medium (5.5")', weightLabel: 'Dogs 20 - 45 lbs' },
      { name: 'Large (7.2")', weightLabel: 'Dogs 45 - 90+ lbs' },
    ],
  },
  {
    id: 'odor-lock-pee-pads',
    sku: 'LP-PADS-50',
    brand: 'Ling Home Care',
    name: 'CleanHome™ 6-Layer Charcoal Odor-Lock Puppy Pads (50 Count)',
    tagline: 'Activated bamboo charcoal turns liquid into gel in 3 seconds, neutralizing ammonia odors.',
    petType: 'Dog',
    category: 'Wellness',
    department: 'Wellness',
    price: 27.95,
    compareAt: 42.0,
    supplierCost: 7.9,
    rating: 4.9,
    reviewsCount: 1680,
    badge: 'Household Staple',
    repeatDeliveryEligible: true,
    inStockAustin: true,
    heroImage: 'https://images.unsplash.com/photo-1591946614720-90a587da4a36?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85',
    description:
      'Features built-in pheromone attractant that instinctively guides puppies to the target zone. 100% leak-proof poly backing protects expensive hardwood floors.',
    keyFeatures: [
      'Holds up to 6 cups of liquid without overflow or edge leakage',
      'Charcoal core eliminates yellow stains and masks dog urine odor',
      'Anti-tracking quick-dry surface prevents wet paw prints across the house',
    ],
  },
  {
    id: 'smart-wifi-pet-feeder',
    sku: 'LP-FEED-WIFI',
    brand: 'PawPlay Tech',
    name: 'AutoFeast™ Smart WiFi Feeder with 1080p HD Camera & Audio',
    tagline: 'Program customized portion meals from your iPhone/Android and call your pet with 2-way audio.',
    petType: 'All Pets',
    category: 'Feeding',
    department: 'Dogs',
    price: 64.95,
    compareAt: 109.0,
    supplierCost: 18.2,
    rating: 4.8,
    reviewsCount: 1040,
    badge: 'Smart Home Pick',
    isLingPick: true,
    repeatDeliveryEligible: false,
    inStockAustin: true,
    heroImage: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=1200&q=85',
    description:
      'Never worry about running late from work again. Dispenses 1-20 portions per meal, records your personalized voice summons, and alerts your phone when the kibble reservoir runs low.',
    keyFeatures: [
      'Dual power backup: AC wall adapter + D-cell batteries during sudden power outages',
      'Triple-seal desiccant lid keeps dry kibble crisp and ant-free',
      'Wide-angle night-vision camera streams real-time video directly to app',
    ],
  },
  {
    id: 'cozy-cave-hooded-bed',
    sku: 'LP-BED-CAVE',
    brand: 'Ling Comfort Lab',
    name: 'BurrowCozy™ Velvet Hooded Donut Cave Bed',
    tagline: 'Enclosed hooded sanctuary designed for cats and burrowing dogs who love sleeping under blankets.',
    petType: 'Cat',
    category: 'Beds',
    department: 'Cats',
    price: 34.95,
    compareAt: 55.0,
    supplierCost: 9.8,
    rating: 4.9,
    reviewsCount: 1320,
    badge: 'Winter Cozy',
    repeatDeliveryEligible: false,
    inStockAustin: true,
    heroImage: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1200&q=85',
    description:
      'Lined with plush fleece sherpa fabric with a semi-rigid padded dome hood. Perfect for skittish rescue cats, Dachshunds, Chihuahuas, and nervous small pets.',
    keyFeatures: [
      'Hood stays propped open automatically for effortless pet entry',
      'Whole bed is machine-washable and dryer-friendly on gentle cycle',
      'Non-skid silicone bead bottom stays securely on tile',
    ],
    colors: [
      { name: 'Oatmeal Taupe', hex: '#D7CCC8', class: 'bg-[#D7CCC8]' },
      { name: 'Sage Blossom', hex: '#588157', class: 'bg-[#588157]' },
    ],
  },
  {
    id: 'deshedding-slicker-brush',
    sku: 'LP-BRUSH-DESH',
    brand: 'Ling Professional',
    name: 'FurGlide™ One-Click Self-Cleaning Slicker Deshedding Brush',
    tagline: 'Painless stainless steel bent pins with massage tips that drop collected fur in one press.',
    petType: 'All Pets',
    category: 'Grooming',
    department: 'Grooming',
    price: 16.95,
    compareAt: 26.0,
    supplierCost: 3.6,
    rating: 4.9,
    reviewsCount: 3200,
    badge: 'Customer Choice',
    repeatDeliveryEligible: false,
    inStockAustin: true,
    heroImage: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1200&q=85',
    description:
      'Removes deep undercoat knots without irritating tender pet skin. Click the rear eject button and all captured fur peels off in one neat patty straight into the trash.',
    keyFeatures: [
      '140° bent fine wire bristles with rounded resin massage protective tips',
      'Ergonomic slip-resistant silicone thumb grip handle reduces hand fatigue',
      'Works wonders on both short, medium, and long double-coated breeds',
    ],
  },
  {
    id: 'freeze-dried-salmon-treats',
    sku: 'LP-TRT-SALM',
    brand: 'Botanical Pet Lab',
    name: 'WildBites™ 100% Alaskan Wild Salmon Freeze-Dried Treats',
    tagline: 'Single-ingredient wild catch packed with natural Omega-3 fatty acids for lustrous coats.',
    petType: 'All Pets',
    category: 'Treats',
    department: 'Wellness',
    price: 15.95,
    compareAt: 25.0,
    supplierCost: 4.2,
    rating: 4.9,
    reviewsCount: 1470,
    badge: 'Single Ingredient',
    isBestseller: true,
    repeatDeliveryEligible: true,
    inStockAustin: true,
    heroImage: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85',
    description:
      'Gently freeze-dried at sub-zero temperatures to preserve all raw vitamins, aroma, and essential Omega oils. Perfect training reward for dogs and cats with food allergies.',
    keyFeatures: [
      '100% Wild-caught Alaskan Salmon — absolutely zero additives, fillers, or grains',
      'Promotes silky coat, reduces seasonal itching, and supports heart health',
      'Can be served as a crispy high-value treat or crumbled as a food topper',
    ],
  },
  {
    id: 'reflective-winter-puffer',
    sku: 'LP-APPAR-PUFF',
    brand: 'Ling Outdoor Co.',
    name: 'StormPuffer™ Thermal Waterproof Reflective Dog Jacket',
    tagline: 'Fleece-lined winter coat with built-in harness opening and all-around high-vis piping.',
    petType: 'Dog',
    category: 'Walk & Travel',
    department: 'Dogs',
    price: 26.95,
    compareAt: 45.0,
    supplierCost: 6.9,
    rating: 4.8,
    reviewsCount: 920,
    badge: 'Winter Ready',
    repeatDeliveryEligible: false,
    inStockAustin: true,
    heroImage: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85',
    description:
      'Keep your dog warm, dry, and visible during cold winter morning walks. Features an easy step-in belly velcro closure and double zipper harness hole on the back.',
    keyFeatures: [
      'Windproof splash-resistant outer shell with thermal insulating polar fleece',
      'Full 360-degree reflective piping flashes brightly under car headlights',
      'Elastic tail loop keeps coat snug in high winds',
    ],
    sizes: [
      { name: 'Small', weightLabel: '8-15 lbs (Pugs, Pomeranians)' },
      { name: 'Medium', weightLabel: '15-30 lbs (Frenchies, Corgis)' },
      { name: 'Large', weightLabel: '30-60 lbs (Australian Shepherds, Boxers)' },
      { name: 'X-Large', weightLabel: '60-95 lbs (Labradors, Goldens)' },
    ],
    colors: [
      { name: 'Deep Navy', hex: '#002855', class: 'bg-[#002855]' },
      { name: 'Crimson Red', hex: '#D32F2F', class: 'bg-[#D32F2F]' },
    ],
  },
  {
    id: 'catnip-feather-wand-pack',
    sku: 'LP-TOY-WAND',
    brand: 'FelineFrenzy',
    name: 'BirdFly™ Telescopic Cat Feather Wand with 5 Natural Lures',
    tagline: 'Extendable 38" carbon fiber wand with realistic spinning bird feathers and tinkling bells.',
    petType: 'Cat',
    category: 'Toys',
    department: 'Cats',
    price: 13.95,
    compareAt: 22.0,
    supplierCost: 2.7,
    rating: 4.9,
    reviewsCount: 1780,
    badge: 'Cat Favorite',
    repeatDeliveryEligible: false,
    inStockAustin: true,
    heroImage: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85',
    description:
      'Gives indoor cats an athletic aerobic workout as they jump, twist, and pounce. Includes 5 easily swappable natural guinea fowl and pheasant feather attachments.',
    keyFeatures: [
      'Extends from 15" to 38" for sitting comfortably on couch while exercising your cat',
      'Flexible carbon fiber rod withstands aggressive grabs and claw tugs',
      'Includes comfortable soft EVA foam handle grip',
    ],
  },
  {
    id: 'snuffle-mat-brain-game',
    sku: 'LP-SNUFF-MAT',
    brand: 'PawPlay Tech',
    name: 'SniffQuest™ Multi-Pebble Mental Foraging Snuffle Mat',
    tagline: '10 minutes of sniffing equals a 1-hour walk: relieves canine boredom and slows speed eaters.',
    petType: 'Dog',
    category: 'Toys',
    department: 'Toys',
    price: 21.95,
    compareAt: 35.0,
    supplierCost: 5.2,
    rating: 4.8,
    reviewsCount: 1260,
    badge: 'Mental Exercise',
    repeatDeliveryEligible: false,
    inStockAustin: true,
    heroImage: 'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=1200&q=85',
    description:
      'Multi-layered dense polar fleece simulates natural outdoor foraging grass. Hide treats in the cups, petals, and flaps to engage your dog’s powerful olfactory brain centers.',
    keyFeatures: [
      'Anti-slip granular bottom with 2 suction cups to keep mat fixed on hardwood',
      'Drawstring design folds mat into compact portable travel bowl shape',
      '100% Machine washable on delicate cycle',
    ],
  },
  {
    id: 'pet-hair-remover-roller',
    sku: 'LP-CHOM-ROLL',
    brand: 'Ling Home Care',
    name: 'ChomRoller™ Reusable Electrostatic Pet Hair Removal Tool',
    tagline: 'No sticky tape or batteries required: instantly lifts embedded dog & cat hair off couches and rugs.',
    petType: 'All Pets',
    category: 'Grooming',
    department: 'Grooming',
    price: 17.95,
    compareAt: 29.0,
    supplierCost: 3.4,
    rating: 4.9,
    reviewsCount: 4210,
    badge: '★ #1 Home Cleaner',
    isBestseller: true,
    repeatDeliveryEligible: false,
    inStockAustin: true,
    heroImage: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1200&q=85',
    description:
      'Simply roll back and forth over pet beds, couches, car seats, and blankets. The electrostatic friction sweeps 100% of embedded hair into the sealed chamber with a one-touch empty door.',
    keyFeatures: [
      'Zero replacement sticky sheets: buy once, use for years',
      'Built-in rubber scraper dislodges deeply interwoven fibers',
      'Essential for German Shepherd, Golden Retriever, and Husky owners',
    ],
  },
];

export const PRODUCT_SUPPLIER_CATALOG: Record<
  string,
  {
    supplier: 'CJ Dropshipping' | 'Zendrop';
    supplierSku: string;
    supplierUrl: string;
    supplierWarehouse: string;
    supplierShippingTime: string;
  }
> = {
  'cloud9-calming-bed': {
    supplier: 'CJ Dropshipping',
    supplierSku: 'CJ-PET-BED901',
    supplierUrl: 'https://cjdropshipping.com',
    supplierWarehouse: 'US East (New Jersey Warehouse)',
    supplierShippingTime: '3-5 business days via USPS Ground Advantage',
  },
  'aquapure-wireless-fountain': {
    supplier: 'Zendrop',
    supplierSku: 'ZD-FOUNT-771',
    supplierUrl: 'https://zendrop.com',
    supplierWarehouse: 'US West (California Express Hub)',
    supplierShippingTime: '3-4 business days via USPS Priority',
  },
  'airglide-harness': {
    supplier: 'CJ Dropshipping',
    supplierSku: 'CJ-HARN-332',
    supplierUrl: 'https://cjdropshipping.com',
    supplierWarehouse: 'US Central (Texas Warehouse)',
    supplierShippingTime: '3-5 business days via USPS Ground Advantage',
  },
  'smartroll-interactive-ball': {
    supplier: 'Zendrop',
    supplierSku: 'ZD-TOY-221',
    supplierUrl: 'https://zendrop.com',
    supplierWarehouse: 'US West (California Express Hub)',
    supplierShippingTime: '3-4 business days via USPS Priority',
  },
  'groompro-5in1-vacuum': {
    supplier: 'CJ Dropshipping',
    supplierSku: 'CJ-VAC-881',
    supplierUrl: 'https://cjdropshipping.com',
    supplierWarehouse: 'US East (New Jersey Warehouse)',
    supplierShippingTime: '3-5 business days via USPS Ground Advantage',
  },
  'dentalchew-defense-rings': {
    supplier: 'Zendrop',
    supplierSku: 'ZD-DENT-041',
    supplierUrl: 'https://zendrop.com',
    supplierWarehouse: 'US Central (Texas Warehouse)',
    supplierShippingTime: '3-5 business days via USPS Ground Advantage',
  },
  'carseat-waterproof-cover': {
    supplier: 'CJ Dropshipping',
    supplierSku: 'CJ-AUTO-912',
    supplierUrl: 'https://cjdropshipping.com',
    supplierWarehouse: 'US West (California Warehouse)',
    supplierShippingTime: '3-5 business days via USPS Ground Advantage',
  },
  'floppyfish-cat-toy': {
    supplier: 'Zendrop',
    supplierSku: 'ZD-CAT-118',
    supplierUrl: 'https://zendrop.com',
    supplierWarehouse: 'US East (New Jersey Warehouse)',
    supplierShippingTime: '3-4 business days via USPS Priority',
  },
  'elevated-bamboo-bowls': {
    supplier: 'CJ Dropshipping',
    supplierSku: 'CJ-BOWL-409',
    supplierUrl: 'https://cjdropshipping.com',
    supplierWarehouse: 'US Central (Texas Warehouse)',
    supplierShippingTime: '3-5 business days via USPS Ground Advantage',
  },
  'calming-hemp-chews': {
    supplier: 'Zendrop',
    supplierSku: 'ZD-WELL-554',
    supplierUrl: 'https://zendrop.com',
    supplierWarehouse: 'US West (California Express Hub)',
    supplierShippingTime: '3-4 business days via USPS Priority',
  },
  'cardboard-scratch-lounge': {
    supplier: 'CJ Dropshipping',
    supplierSku: 'CJ-CAT-662',
    supplierUrl: 'https://cjdropshipping.com',
    supplierWarehouse: 'US East (New Jersey Warehouse)',
    supplierShippingTime: '3-5 business days via USPS Ground Advantage',
  },
  'handsfree-bungee-leash': {
    supplier: 'Zendrop',
    supplierSku: 'ZD-LEASH-301',
    supplierUrl: 'https://zendrop.com',
    supplierWarehouse: 'US Central (Texas Warehouse)',
    supplierShippingTime: '3-5 business days via USPS Ground Advantage',
  },
  'paw-cleaner-mud-cup': {
    supplier: 'CJ Dropshipping',
    supplierSku: 'CJ-GROOM-214',
    supplierUrl: 'https://cjdropshipping.com',
    supplierWarehouse: 'US West (California Warehouse)',
    supplierShippingTime: '3-5 business days via USPS Ground Advantage',
  },
  'cat-climbing-tree-tower': {
    supplier: 'CJ Dropshipping',
    supplierSku: 'CJ-TREE-909',
    supplierUrl: 'https://cjdropshipping.com',
    supplierWarehouse: 'US East (New Jersey Warehouse)',
    supplierShippingTime: '3-5 business days via USPS Ground Advantage',
  },
  'enzymatic-toothpaste-kit': {
    supplier: 'Zendrop',
    supplierSku: 'ZD-DENT-802',
    supplierUrl: 'https://zendrop.com',
    supplierWarehouse: 'US West (California Express Hub)',
    supplierShippingTime: '3-4 business days via USPS Priority',
  },
  'indestructible-rubber-bone': {
    supplier: 'CJ Dropshipping',
    supplierSku: 'CJ-TOY-447',
    supplierUrl: 'https://cjdropshipping.com',
    supplierWarehouse: 'US Central (Texas Warehouse)',
    supplierShippingTime: '3-5 business days via USPS Ground Advantage',
  },
  'odor-lock-pee-pads': {
    supplier: 'Zendrop',
    supplierSku: 'ZD-HOME-120',
    supplierUrl: 'https://zendrop.com',
    supplierWarehouse: 'US East (New Jersey Warehouse)',
    supplierShippingTime: '3-5 business days via USPS Ground Advantage',
  },
  'smart-wifi-pet-feeder': {
    supplier: 'CJ Dropshipping',
    supplierSku: 'CJ-FEED-772',
    supplierUrl: 'https://cjdropshipping.com',
    supplierWarehouse: 'US West (California Warehouse)',
    supplierShippingTime: '3-5 business days via USPS Ground Advantage',
  },
  'cozy-cave-hooded-bed': {
    supplier: 'Zendrop',
    supplierSku: 'ZD-BED-330',
    supplierUrl: 'https://zendrop.com',
    supplierWarehouse: 'US Central (Texas Warehouse)',
    supplierShippingTime: '3-5 business days via USPS Ground Advantage',
  },
  'deshedding-slicker-brush': {
    supplier: 'CJ Dropshipping',
    supplierSku: 'CJ-BRUSH-511',
    supplierUrl: 'https://cjdropshipping.com',
    supplierWarehouse: 'US West (California Warehouse)',
    supplierShippingTime: '3-5 business days via USPS Ground Advantage',
  },
  'freeze-dried-salmon-treats': {
    supplier: 'Zendrop',
    supplierSku: 'ZD-TRT-909',
    supplierUrl: 'https://zendrop.com',
    supplierWarehouse: 'US West (California Express Hub)',
    supplierShippingTime: '3-4 business days via USPS Priority',
  },
  'reflective-winter-puffer': {
    supplier: 'CJ Dropshipping',
    supplierSku: 'CJ-COAT-661',
    supplierUrl: 'https://cjdropshipping.com',
    supplierWarehouse: 'US East (New Jersey Warehouse)',
    supplierShippingTime: '3-5 business days via USPS Ground Advantage',
  },
  'catnip-feather-wand-pack': {
    supplier: 'Zendrop',
    supplierSku: 'ZD-WAND-212',
    supplierUrl: 'https://zendrop.com',
    supplierWarehouse: 'US Central (Texas Warehouse)',
    supplierShippingTime: '3-5 business days via USPS Ground Advantage',
  },
  'snuffle-mat-brain-game': {
    supplier: 'CJ Dropshipping',
    supplierSku: 'CJ-MAT-884',
    supplierUrl: 'https://cjdropshipping.com',
    supplierWarehouse: 'US West (California Warehouse)',
    supplierShippingTime: '3-5 business days via USPS Ground Advantage',
  },
  'pet-hair-remover-roller': {
    supplier: 'Zendrop',
    supplierSku: 'ZD-CHOM-101',
    supplierUrl: 'https://zendrop.com',
    supplierWarehouse: 'US East (New Jersey Warehouse)',
    supplierShippingTime: '3-4 business days via USPS Priority',
  },
};

function getProductGallery(raw: (typeof RAW_PRODUCTS)[0]): string[] {
  const list = [raw.heroImage];
  if (raw.secondaryImage && raw.secondaryImage !== raw.heroImage) {
    list.push(raw.secondaryImage);
  }
  const fallbackByCat: Record<string, string[]> = {
    Beds: [
      'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=85',
    ],
    Feeding: [
      'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=85',
    ],
    'Walk & Travel': [
      'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85',
    ],
    Toys: [
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?auto=format&fit=crop&w=1200&q=85',
    ],
    Grooming: [
      'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=1200&q=85',
    ],
    Wellness: [
      'https://images.unsplash.com/photo-1587764379873-97837921fd44?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=1200&q=85',
    ],
    Treats: [
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=85',
    ],
  };

  const extra = fallbackByCat[raw.category] || [
    'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85',
  ];
  extra.forEach((img) => {
    if (!list.includes(img) && list.length < 4) {
      list.push(img);
    }
  });

  return list;
}

function getProductSpecifications(
  raw: (typeof RAW_PRODUCTS)[0],
  warehouse: string,
  shippingTime: string
): ProductSpecifications {
  const specsMap: Record<string, Partial<ProductSpecifications>> = {
    Beds: {
      material: 'CertiPUR-US Orthopedic Memory Foam, High-Density Polyfiber & Waterproof Micro-Sherpa',
      dimensions: 'Small: 23" x 23" x 7" · Med: 30" x 30" x 8" · Lrg: 36" x 36" x 9"',
      weight: '3.2 lbs – 5.8 lbs',
      inTheBox: '1x Orthopedic Bed with Inner Vacuum Seal, 1x Removable Zip Cover, 1x Care Guide',
      care: '100% Machine Washable cover on cold gentle cycle; tumble dry low or air dry',
    },
    Feeding: {
      material: 'Food-Grade 304 Stainless Steel Basin, Natural Bamboo & BPA-Free ABS Resin',
      dimensions: 'Fountain: 7.9" x 7.9" x 6.1" (2.5L / 84 oz Capacity) · Bowls: 15.6" x 7.2" x 4.8"',
      weight: '1.8 lbs – 2.4 lbs',
      inTheBox: '1x Feeder/Fountain Unit, 2x Stainless Bowls or Active Filter, 1x USB-C Cable, Manual',
      care: 'Stainless steel bowls are dishwasher safe; rinse filters under cool tap water monthly',
    },
    'Walk & Travel': {
      material: 'Military-Grade 1050D Ripstop Nylon, 3M Scotchlite Reflective Webbing & Zinc Alloy Clasps',
      dimensions: 'Custom 4-Point Slide Fit (Small to X-Large, Chest 15" to 43")',
      weight: '0.6 lbs – 1.4 lbs',
      inTheBox: '1x Ergonomic Harness or Leash, 1x Pet Safety & Sizing Card',
      care: 'Hand wash with mild detergent; air dry away from direct sunlight',
    },
    Toys: {
      material: '100% Non-Toxic Natural Tree Rubber & Food-Grade Soft Silicone (BPA & Phthalate-Free)',
      dimensions: 'Ball: 2.8" Dia · Kicker: 11" x 3.5" · Snuffle Mat: 28" x 28"',
      weight: '0.4 lbs – 1.1 lbs',
      inTheBox: '1x Interactive Toy, 1x USB-C Rapid Charging Cord (if electronic), 1x User Guide',
      care: 'Wipe silicone with warm damp cloth; rubber chew toys are dishwasher safe (top rack)',
    },
    Grooming: {
      material: 'Sub-52dB Silent Copper Motor, Surgical Stainless Pins with Resin Massage Tips & ABS',
      dimensions: 'Vacuum: 11.2" x 8.4" x 13.8" · Slicker Brush: 7.8" x 4.1" x 2.4"',
      weight: '0.5 lbs (brush) – 4.2 lbs (vacuum kit)',
      inTheBox: '5x Precision Attachments or 1x Self-Cleaning Tool, 1x Quick-Start Guide',
      care: 'One-click hair eject button; rinse dust cup and filter under running water monthly',
    },
    Wellness: {
      material: '100% Organic Cold-Pressed Botanicals (Hemp Seed, Chamomile, Valerian) / Dental Enzymes',
      dimensions: 'Tub: 90 Chews (Net Wt 10.6 oz / 300g) · Toothpaste: 3.5 oz Tube',
      weight: '0.8 lbs – 1.2 lbs',
      inTheBox: '1x Sealed Bottle or Kit with Tamper-Evident Safety Foil Seal',
      care: 'Store in a cool dry place out of direct sunlight; seal lid tightly after each treat',
    },
    Treats: {
      material: '100% Single-Ingredient Wild Alaskan Salmon (Gently Sub-Zero Freeze-Dried)',
      dimensions: 'Resealable 5.0 oz (142g) Stand-Up Pouch (Equivalent to 25 oz Fresh Fish)',
      weight: '0.4 lbs',
      inTheBox: '1x Nitrogen-Flushed Resealable Pouch with Freshness Absorber',
      care: 'Keep pouch sealed in pantry; feed directly or crumble as food topper',
    },
  };

  const base = specsMap[raw.category] || {};

  return {
    material: base.material || 'Veterinarian-Vetted Eco-Friendly Non-Toxic Pet Materials',
    dimensions: base.dimensions || 'Universal Size Engineered for Pets',
    weight: base.weight || '1.1 lbs',
    inTheBox: base.inTheBox || '1x Authentic Retail Packaged Product, 1x Care Guide',
    care: base.care || 'Spot clean with pet-safe cleaner or machine wash gentle',
    warranty: '30-Day Risk-Free In-Home Pet Trial Guarantee (100% Refundable)',
    cjWarehouse: warehouse || 'US East (New Jersey Warehouse)',
    shippingEstimate: shippingTime || 'Ships within 24h via USPS Ground Advantage · 3-5 Business Days',
  };
}

export const PRODUCTS: Product[] = RAW_PRODUCTS.map((raw) => {
  const meta = PRODUCT_SUPPLIER_CATALOG[raw.id] || {
    supplier: 'CJ Dropshipping' as const,
    supplierSku: `CJ-PET-${raw.id.slice(0, 6).toUpperCase()}`,
    supplierUrl: 'https://cjdropshipping.com',
    supplierWarehouse: 'US East (New Jersey Warehouse)',
    supplierShippingTime: '3-5 business days via USPS Ground Advantage',
  };

  // Realistic CJ Packet Line-Haul Shipping Estimate to US based on product weight
  let cjShipping = 3.5;
  if (raw.category === 'Beds' || raw.category === 'Feeding') {
    cjShipping = 5.95;
  } else if (raw.category === 'Walk & Travel' || raw.category === 'Grooming') {
    cjShipping = 4.5;
  }

  const cjCost = raw.supplierCost;
  const cjShippingEstimate = cjShipping;
  const totalCjCost = Number((cjCost + cjShippingEstimate).toFixed(2));
  const netProfit = Number((raw.price - totalCjCost).toFixed(2));
  const profitMarginPercent = Math.max(1, Math.round((netProfit / raw.price) * 100));

  // Multi-Unit Volume Pricing Tiers:
  // Secret of CJ Dropshipping: shipping 2 or 3 items in the same box costs only slightly more (+35% / +65%),
  // while order revenue surges, generating huge net profit per order!
  const priceTier1 = raw.price;
  const totalTier1 = priceTier1;
  const profitTier1 = netProfit;

  // Tier 2: 15% OFF per unit
  const priceTier2 = Number((raw.price * 0.85).toFixed(2));
  const totalTier2 = Number((priceTier2 * 2).toFixed(2));
  const savingsTier2 = Number(((raw.price * 2) - totalTier2).toFixed(2));
  const combinedShipping2 = Number((cjShippingEstimate * 1.35).toFixed(2));
  const totalCost2 = Number(((cjCost * 2) + combinedShipping2).toFixed(2));
  const profitTier2 = Number((totalTier2 - totalCost2).toFixed(2));

  // Tier 3: 25% OFF per unit
  const priceTier3 = Number((raw.price * 0.75).toFixed(2));
  const totalTier3 = Number((priceTier3 * 3).toFixed(2));
  const savingsTier3 = Number(((raw.price * 3) - totalTier3).toFixed(2));
  const combinedShipping3 = Number((cjShippingEstimate * 1.65).toFixed(2));
  const totalCost3 = Number(((cjCost * 3) + combinedShipping3).toFixed(2));
  const profitTier3 = Number((totalTier3 - totalCost3).toFixed(2));

  const volumeTiers: ProductVolumePricing[] = [
    {
      qty: 1,
      discountPercent: 0,
      pricePerUnit: priceTier1,
      total: totalTier1,
      savings: 0,
      netProfit: profitTier1,
      badge: '1 Unidade (Padrão)',
    },
    {
      qty: 2,
      discountPercent: 15,
      pricePerUnit: priceTier2,
      total: totalTier2,
      savings: savingsTier2,
      netProfit: profitTier2,
      badge: '🔥 Leve 2 com 15% OFF (Mais Vendido)',
    },
    {
      qty: 3,
      discountPercent: 25,
      pricePerUnit: priceTier3,
      total: totalTier3,
      savings: savingsTier3,
      netProfit: profitTier3,
      badge: '⚡ Leve 3 com 25% OFF (Melhor Valor)',
    },
  ];

  return {
    ...raw,
    ...meta,
    cjCost,
    cjShippingEstimate,
    totalCjCost,
    netProfit,
    profitMarginPercent,
    galleryImages: getProductGallery(raw),
    specifications: getProductSpecifications(raw, meta.supplierWarehouse, meta.supplierShippingTime),
    volumeTiers,
  } as Product;
});

export function getSavedProducts(): Product[] {
  if (typeof window === 'undefined') return PRODUCTS;
  try {
    const saved = localStorage.getItem('ling_admin_products');
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading saved products:', e);
  }
  return PRODUCTS;
}

export function saveProductsToStorage(products: Product[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('ling_admin_products', JSON.stringify(products));
    window.dispatchEvent(new Event('ling_products_updated'));
  } catch (e) {
    console.error('Error saving products:', e);
  }
}

export const REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'Sarah M.',
    location: 'Miami, FL',
    petName: 'Cooper',
    petBreed: 'Golden Retriever (3 yrs)',
    rating: 5,
    title: 'The only bed that cured his thunderstorm tremors!',
    comment:
      'We live in South Florida where severe afternoon thunderstorms always sent Cooper panting into the closet. The first night in his Cloud9 bed, he curled right into the bolster and slept straight through a heavy thunderstorm. The Sage Green color is gorgeous in our living room too!',
    verifiedPurchase: true,
    productName: 'The Cloud9™ Orthopedic Calming Pet Bed',
    date: '3 days ago',
  },
  {
    id: 'rev-2',
    author: 'Michael B.',
    location: 'Denver, CO',
    petName: 'Beau',
    petBreed: 'Chocolate Lab (6 yrs)',
    rating: 5,
    title: 'Walks are finally enjoyable again. Zero pulling!',
    comment:
      'Beau weighs 72 lbs and used to pull so hard my shoulder would ache for days. The AirGlide front clip turned him into a completely different walker on our very first lap around the park. Total game changer.',
    verifiedPurchase: true,
    productName: 'AirGlide™ Zero-Pull Ergonomic Dog Harness',
    date: '1 week ago',
  },
  {
    id: 'rev-3',
    author: 'Emily & Liam R.',
    location: 'Seattle, WA',
    petName: 'Mochi',
    petBreed: 'Scottish Fold Cat',
    rating: 5,
    title: 'My cat drank almost no water until AquaPure arrived',
    comment:
      'Our vet warned us that Mochi was borderline dehydrated. Traditional bowls were a no-go. With AquaPure’s silent trickle, she now drinks 3-4 times every single day. Extremely easy to clean and whisper quiet in our apartment.',
    verifiedPurchase: true,
    productName: 'AquaPure™ Ultra-Quiet Wireless Pet Fountain',
    date: '2 weeks ago',
  },
  {
    id: 'rev-4',
    author: 'David K.',
    location: 'Chicago, IL',
    petName: 'Winston',
    petBreed: 'French Bulldog (2 yrs)',
    rating: 5,
    title: 'Saved me hundreds in grooming salon fees already',
    comment:
      'Frenchies shed short stiff hairs that get stuck in every rug. The GroomPro vacuum suction is incredible—it sucks the hair straight out of the brush before it can float into the air. Winston actually enjoys the massage feeling!',
    verifiedPurchase: true,
    productName: 'GroomPro™ 5-in-1 Low-Noise Pet Vacuum & Groomer',
    date: '3 weeks ago',
  },
  {
    id: 'rev-5',
    author: 'Amanda P.',
    location: 'Los Angeles, CA',
    petName: 'Luna & Milo',
    petBreed: 'Ragdoll Kittens',
    rating: 5,
    title: 'Repeat delivery is so convenient and saves me 35%',
    comment:
      'I have the AquaPure carbon filters and freeze-dried salmon treats on Repeat Delivery every 4 weeks. They arrive right on schedule, 100% fresh, and I never have to panic about running out. Great customer service from the US support team!',
    verifiedPurchase: true,
    productName: 'WildBites™ 100% Alaskan Wild Salmon Freeze-Dried Treats',
    date: '4 days ago',
  },
];

export const RECENT_US_PURCHASES = [
  {
    name: 'Jessica M.',
    city: 'Miami, FL',
    item: 'The Cloud9™ Calming Bed (Large)',
    timeAgo: '2 minutes ago',
  },
  {
    name: 'Brandon K.',
    city: 'Los Angeles, CA',
    item: 'AirGlide™ Zero-Pull Harness (Medium)',
    timeAgo: '5 minutes ago',
  },
  {
    name: 'Chloe W.',
    city: 'New York, NY',
    item: 'AquaPure™ Wireless Pet Fountain',
    timeAgo: '9 minutes ago',
  },
  {
    name: 'David S.',
    city: 'Chicago, IL',
    item: 'GroomPro™ 5-in-1 Pet Vacuum Kit',
    timeAgo: '14 minutes ago',
  },
  {
    name: 'Rachel H.',
    city: 'Seattle, WA',
    item: 'ZenPup™ Calming Soft Chews (90ct)',
    timeAgo: '18 minutes ago',
  },
  {
    name: 'Travis L.',
    city: 'Dallas, TX',
    item: 'ChomRoller™ Reusable Pet Hair Roller',
    timeAgo: '22 minutes ago',
  },
];

export const US_STATES = [
  { code: 'AL', name: 'Alabama' },
  { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' },
  { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' },
];
