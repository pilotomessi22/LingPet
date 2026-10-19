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

export const DEFAULT_REAL_PRODUCTS: Product[] = [
  {
    id: 'cj-gate-2034090401252950017',
    sku: 'LP-GATE-WHITE-01',
    name: '29.5-45.3" Wide Baby & Dog Safety Gate for Stairs & Doorways (No Drilling Pressure Mounted)',
    brand: 'Ling Safety™',
    tagline: 'Pressure-mounted pet & baby safety gate with auto-close walk-through door. Fits 29.5" to 45.3" openings without drilling.',
    petType: 'Dog',
    category: 'Walk & Travel',
    department: 'Dogs',
    price: 89.95,
    compareAt: 129.99,
    supplierCost: 42.32,
    cjCost: 42.32,
    cjShippingEstimate: 12.50,
    totalCjCost: 54.82,
    netProfit: 35.13,
    profitMarginPercent: 39,
    supplier: 'CJ Dropshipping',
    supplierSku: 'CJFU27913390001',
    supplierUrl: 'https://www.cjdropshipping.com/product/-p-2034090401252950017.html',
    supplierWarehouse: 'US Warehouse / CJ Express (Dispatches in 24h)',
    supplierShippingTime: '3-5 business days via USPS Ground Advantage',
    rating: 4.9,
    reviewsCount: 142,
    badge: '✓ Produto Oficial CJ Dropshipping',
    isBestseller: true,
    isLingPick: true,
    repeatDeliveryEligible: false,
    inStockAustin: true,
    heroImage: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=1200&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85',
    ],
    description: 'Keep your pets and toddlers safe with this heavy-duty, no-drill pressure-mounted safety gate. Engineered with a one-handed dual-lock walk-through door and auto-close mechanism. Includes modular expansion panels to easily fit openings between 29.5" and 45.3" (75 to 115 cm). Sourced directly from CJ Dropshipping US warehouse for rapid 3-5 day delivery.',
    keyFeatures: [
      'No-Drilling Pressure Mount: Installs securely in doorways and stairwells in minutes without wall damage',
      'Dual-Lock One-Handed Walk-Through Door: Easy for adults to open with one hand, secure against pets and children',
      'Auto-Close & Stay-Open Dual Mode: Swings shut automatically under 90°; stays wide open when pushed past 90°',
      'Adjustable 29.5" to 45.3" Width: Includes modular extension kits to fit doors, hallways, and stairs',
      'Heavy-Duty Reinforced Carbon Steel: High-impact resistance with non-toxic white powder finish',
      'Dispatched via CJ Dropshipping US Warehouse with tracking in 24 hours',
    ],
    specifications: {
      material: 'Heavy-Duty Carbon Steel with Non-Toxic Anti-Rust White Powder Coat & BPA-Free ABS Fittings',
      dimensions: 'Fits openings 29.5" – 45.3" (75cm – 115cm) · Height: 30" (76.2cm) · Bar Spacing: 2.16"',
      weight: '12.8 lbs (5.8 kg)',
      inTheBox: '1x Main Safety Gate Frame, 2x Extension Panels (7cm & 14cm), 4x Pressure Tension Spindles, 4x Wall Saver Cups, 1x Wrench, 1x Instruction Manual',
      care: 'Wipe clean with a damp microfiber cloth and mild soap',
      warranty: '30-Day Risk-Free In-Home Pet Trial Guarantee (100% Refundable)',
      cjWarehouse: 'US Warehouse / CJ Express (New Jersey & California)',
      shippingEstimate: 'Dispatches within 24h via USPS Ground Advantage · 3-5 Business Days',
    },
    volumeTiers: [
      {
        qty: 1,
        discountPercent: 0,
        pricePerUnit: 89.95,
        total: 89.95,
        savings: 0,
        netProfit: 35.13,
        badge: '1 Portão (Padrão)',
      },
      {
        qty: 2,
        discountPercent: 15,
        pricePerUnit: 76.45,
        total: 152.90,
        savings: 27.00,
        netProfit: 68.26,
        badge: '🔥 Leve 2 para Escadas (15% OFF)',
      },
      {
        qty: 3,
        discountPercent: 25,
        pricePerUnit: 67.46,
        total: 202.38,
        savings: 67.47,
        netProfit: 95.87,
        badge: '⚡ Casa Completa Protegida (25% OFF)',
      },
    ],
    sizes: [
      { name: 'Standard (29.5" – 37.8")', weightLabel: 'Includes 7cm Extension' },
      { name: 'Wide (29.5" – 45.3")', weightLabel: 'Includes 7cm & 14cm Extensions' },
    ],
    colors: [
      { name: 'Pure White (Branco)', hex: '#FFFFFF', class: 'bg-white border-2 border-gray-300' },
      { name: 'Matte Black (Preto Fosco)', hex: '#222222', class: 'bg-zinc-800' },
    ],
    addOns: [
      {
        name: 'Extra Wall-Protection Rubber Cups (Set of 4)',
        price: 9.95,
        description: 'Zero-skid silicone pads to protect painted drywall and baseboards',
      },
      {
        name: 'Bottom Ramp Threshold Protector',
        price: 14.95,
        description: 'Smooth slope ramp to prevent tripping over the bottom bar',
      },
    ],
  },
];

export const PRODUCT_SUPPLIER_CATALOG: Record<string, any> = {};

export const PRODUCTS: Product[] = DEFAULT_REAL_PRODUCTS;

export function getSavedProducts(): Product[] {
  if (typeof window === 'undefined') return DEFAULT_REAL_PRODUCTS;
  try {
    const saved = localStorage.getItem('ling_admin_products');
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        // Return only user-added products (excluding the old 25 mock items)
        const customProducts = parsed.filter(
          (p: any) =>
            p &&
            p.id &&
            !p.id.startsWith('cloud9') &&
            !p.id.startsWith('airglide') &&
            !p.id.startsWith('aquapure') &&
            !p.id.startsWith('groompro') &&
            !p.id.startsWith('zenpup') &&
            !p.id.startsWith('chomroller') &&
            !p.id.startsWith('wildbites') &&
            !p.id.startsWith('slowfeast') &&
            !p.id.startsWith('snuffle') &&
            !p.id.startsWith('ortho') &&
            !p.id.startsWith('cozy') &&
            !p.id.startsWith('ultrasonic') &&
            !p.id.startsWith('stainless') &&
            !p.id.startsWith('waterproof') &&
            !p.id.startsWith('anti-anxiety') &&
            !p.id.startsWith('self-cleaning') &&
            !p.id.startsWith('natural-dental') &&
            !p.id.startsWith('retractable') &&
            !p.id.startsWith('cat-laser') &&
            !p.id.startsWith('organic-paw') &&
            !p.id.startsWith('cat-tree') &&
            !p.id.startsWith('enzymatic') &&
            !p.id.startsWith('indestructible') &&
            !p.id.startsWith('odor-lock') &&
            !p.id.startsWith('calming-ferret') &&
            !p.id.match(/^p-\d+$/)
        );

        if (customProducts.length > 0) {
          // Check if default CJ products exist; if missing, add them
          const hasGate = customProducts.some(
            (p) => p.id === 'cj-gate-2034090401252950017' || p.supplierSku === 'CJFU27913390001'
          );
          if (!hasGate) {
            const combined = [...DEFAULT_REAL_PRODUCTS, ...customProducts];
            localStorage.setItem('ling_admin_products', JSON.stringify(combined));
            return combined;
          }
          return customProducts;
        }
      }
    }
  } catch (e) {
    console.error('Error loading saved products:', e);
  }
  localStorage.setItem('ling_admin_products', JSON.stringify(DEFAULT_REAL_PRODUCTS));
  return DEFAULT_REAL_PRODUCTS;
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
