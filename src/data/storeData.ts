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

const RAW_PRODUCTS: any[] = [];

export const PRODUCT_SUPPLIER_CATALOG: Record<string, any> = {};

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
  if (typeof window === 'undefined') return [];
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
        return customProducts;
      }
    }
  } catch (e) {
    console.error('Error loading saved products:', e);
  }
  return [];
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
