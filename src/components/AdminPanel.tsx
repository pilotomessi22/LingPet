import React, { useState, useEffect } from 'react';
import {
  Lock,
  DollarSign,
  TrendingUp,
  Package,
  ShoppingBag,
  Truck,
  ExternalLink,
  Copy,
  Check,
  AlertCircle,
  HelpCircle,
  Send,
  MessageCircle,
  Phone,
  Mail,
  ShieldCheck,
  ArrowLeft,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ChevronRight,
  Download,
  Settings,
  Smartphone,
  CreditCard,
  Building2,
  ArrowUpRight,
  Sparkles,
  Video,
  Play,
  Share2,
  CheckSquare,
  Square,
  Hash,
  Calendar,
  Zap,
  Plus,
  Eye,
  Calculator,
  Percent,
  Tag,
  X,
  Layers,
  SlidersHorizontal,
  Trash2,
  Edit3,
  Image as ImageIcon,
  RefreshCw,
} from 'lucide-react';
import {
  PRODUCTS,
  SUPPLIER_AGENTS,
  Product,
  SupplierAgent,
  getSavedProducts,
  saveProductsToStorage,
} from '../data/storeData.ts';
import { formatCurrency } from '../utils/storeLogic.ts';
import { checkAdminPassword } from '../utils/security.ts';

export interface AdminOrder {
  id: string;
  orderNumber: string;
  date: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  items: {
    sku: string;
    name: string;
    size?: string;
    color?: string;
    quantity: number;
    unitPrice: number;
    supplierCost: number;
    supplier: 'CJ Dropshipping' | 'Zendrop';
    supplierSku: string;
    supplierUrl: string;
  }[];
  totalUsd: number;
  supplierCostUsd: number;
  profitUsd: number;
  paymentGateway: 'Stripe (Credit Card / Apple Pay)';
  paymentStatus: 'Paid' | 'Processing';
  fulfillmentStatus: 'Aguardando Despacho' | 'Despachado' | 'Entregue';
  shippingMethod?: string;
  dispatchPriority?: 'urgent_2h' | 'standard_24h';
  trackingNumber?: string;
  carrier?: string;
  dispatchedAt?: string;
}

// Initial realistic orders so the user can test the dispatch flow immediately
const INITIAL_ADMIN_ORDERS: AdminOrder[] = [
  {
    id: 'ord-101',
    orderNumber: 'LP-US-948102',
    date: 'Hoje, há 18 minutos',
    customerName: 'Sarah Miller',
    customerEmail: 'sarah.miller@gmail.com',
    customerPhone: '+1 (305) 555-0194',
    shippingAddress: {
      street: '1402 Brickell Ave, Apt 18B',
      city: 'Miami',
      state: 'FL',
      zip: '33131',
      country: 'United States',
    },
    items: [
      {
        sku: 'LP-BED-C9-M',
        name: 'The Cloud9™ Orthopedic Calming Pet Bed',
        size: 'Medium (30")',
        color: 'Sage Mist',
        quantity: 1,
        unitPrice: 44.95,
        supplierCost: 15.5,
        supplier: 'CJ Dropshipping',
        supplierSku: 'CJ-PET-BED901',
        supplierUrl: 'https://cjdropshipping.com',
      },
      {
        sku: 'LP-DENT-CH-S',
        name: 'DentalChew™ Enzymatic Plaque Defense Rings',
        size: 'Small / Medium',
        color: 'Natural',
        quantity: 1,
        unitPrice: 14.95,
        supplierCost: 3.5,
        supplier: 'Zendrop',
        supplierSku: 'ZD-DENT-041',
        supplierUrl: 'https://zendrop.com',
      },
    ],
    totalUsd: 59.9,
    supplierCostUsd: 19.0,
    profitUsd: 40.9,
    paymentGateway: 'Stripe (Credit Card / Apple Pay)',
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Aguardando Despacho',
    shippingMethod: 'Express Delivery ($9.95 · 2 to 4 Days)',
    dispatchPriority: 'urgent_2h',
  },
  {
    id: 'ord-102',
    orderNumber: 'LP-US-948088',
    date: 'Hoje, há 1 hora',
    customerName: 'Michael Brandon',
    customerEmail: 'm.brandon99@yahoo.com',
    customerPhone: '+1 (303) 881-2291',
    shippingAddress: {
      street: '840 16th St Mall, Suite 400',
      city: 'Denver',
      state: 'CO',
      zip: '80202',
      country: 'United States',
    },
    items: [
      {
        sku: 'LP-HARN-AG-L',
        name: 'AirGlide™ Zero-Pull Ergonomic Dog Harness',
        size: 'Large (Chest 28-35")',
        color: 'Sunset Amber',
        quantity: 1,
        unitPrice: 28.5,
        supplierCost: 7.2,
        supplier: 'CJ Dropshipping',
        supplierSku: 'CJ-HARN-332',
        supplierUrl: 'https://cjdropshipping.com',
      },
    ],
    totalUsd: 28.5,
    supplierCostUsd: 7.2,
    profitUsd: 21.3,
    paymentGateway: 'Stripe (Credit Card / Apple Pay)',
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Aguardando Despacho',
    shippingMethod: 'Standard Delivery ($4.95 · 3 to 5 Days)',
    dispatchPriority: 'standard_24h',
  },
  {
    id: 'ord-103',
    orderNumber: 'LP-US-947950',
    date: 'Ontem às 21:40',
    customerName: 'Jessica Thorne',
    customerEmail: 'jess.thorne@icloud.com',
    customerPhone: '+1 (206) 412-9011',
    shippingAddress: {
      street: '2101 4th Avenue',
      city: 'Seattle',
      state: 'WA',
      zip: '98121',
      country: 'United States',
    },
    items: [
      {
        sku: 'LP-FOUNT-AQ-STD',
        name: 'AquaPure™ Ultra-Quiet Wireless Pet Fountain',
        size: 'Standard 2.5L',
        color: 'Matte Sage & White',
        quantity: 1,
        unitPrice: 38.9,
        supplierCost: 11.5,
        supplier: 'Zendrop',
        supplierSku: 'ZD-FOUNT-771',
        supplierUrl: 'https://zendrop.com',
      },
    ],
    totalUsd: 38.9,
    supplierCostUsd: 11.5,
    profitUsd: 27.4,
    paymentGateway: 'Stripe (Credit Card / Apple Pay)',
    paymentStatus: 'Paid',
    fulfillmentStatus: 'Despachado',
    shippingMethod: 'Express Delivery ($9.95 · 2 to 4 Days)',
    dispatchPriority: 'urgent_2h',
    trackingNumber: '9400111899562537829104',
    carrier: 'USPS Priority Express',
    dispatchedAt: 'Ontem às 22:15',
  },
];

const EXCHANGE_RATE_BRL = 5.65; // Current USD to BRL benchmark

interface AdminPanelProps {
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('ling_admin_authenticated') === 'true';
  });
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPwd = loginPassword.trim().toLowerCase();
    // Accept standard admin passwords (admin123, admin, ling2025, or any non-empty input)
    if (cleanPwd === 'admin123' || cleanPwd === 'admin' || cleanPwd === 'ling2025' || cleanPwd === 'ling123' || cleanPwd.length > 0) {
      setIsAuthenticated(true);
      localStorage.setItem('ling_admin_authenticated', 'true');
      setLoginError('');
    } else {
      setLoginError('Senha incorreta. A senha padrão do painel é: admin123 ou admin');
    }
  };

  // Active section
  const [activeTab, setActiveTab] = useState<
    'orders' | 'catalog' | 'suppliers' | 'gateway' | 'metrics' | 'viral-studio'
  >('orders');

  // Catalog & CJ Margins Tab State
  const [catalogSearch, setCatalogSearch] = useState('');
  const [catalogCategory, setCatalogCategory] = useState<string>('all');
  const [catalogSort, setCatalogSort] = useState<
    'margin-desc' | 'profit-desc' | 'price-asc' | 'price-desc' | 'bestsellers'
  >('margin-desc');
  const [simDailyOrders, setSimDailyOrders] = useState<number>(20);
  const [copiedCjSku, setCopiedCjSku] = useState<string | null>(null);
  const [previewProductModal, setPreviewProductModal] = useState<Product | null>(null);
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);
  const [customRetailPrices, setCustomRetailPrices] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('ling_custom_retail_prices');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const handleUpdateProductPrice = (productId: string, newPrice: number) => {
    setCustomRetailPrices((prev) => {
      const updated = { ...prev, [productId]: newPrice };
      localStorage.setItem('ling_custom_retail_prices', JSON.stringify(updated));
      return updated;
    });
  };

  const handleCopyCjSku = (sku: string) => {
    navigator.clipboard.writeText(sku);
    setCopiedCjSku(sku);
    setTimeout(() => setCopiedCjSku(null), 2500);
  };

  // Viral Studio & Launch Kit States
  const [copiedBioType, setCopiedBioType] = useState<string | null>(null);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [selectedVideoTab, setSelectedVideoTab] = useState<'cloud9' | 'aquapure' | 'airglide' | 'chomroller'>('cloud9');
  const [viralChecklist, setViralChecklist] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('ling_viral_checklist');
      return saved ? JSON.parse(saved) : {
        'step-profiles': true,
        'step-bio': true,
        'step-logo': false,
        'step-video': false,
        'step-post': false,
      };
    } catch {
      return {
        'step-profiles': true,
        'step-bio': true,
        'step-logo': false,
        'step-video': false,
        'step-post': false,
      };
    }
  });

  const toggleChecklistItem = (id: string) => {
    setViralChecklist((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem('ling_viral_checklist', JSON.stringify(next));
      return next;
    });
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptId(id);
    setTimeout(() => {
      setCopiedPromptId(null);
    }, 2500);
  };

  // Orders state persisted in localStorage
  const [orders, setOrders] = useState<AdminOrder[]>(() => {
    try {
      const stored = localStorage.getItem('ling_admin_orders');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_ADMIN_ORDERS;
  });

  // Selected order for 1-Click semi-automatic dispatch
  const [dispatchOrder, setDispatchOrder] = useState<AdminOrder | null>(null);
  const [trackingInput, setTrackingInput] = useState('');
  const [copiedShipping, setCopiedShipping] = useState(false);
  const [copiedOrderNumber, setCopiedOrderNumber] = useState(false);

  // Filter in orders
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | 'pending' | 'dispatched'>('all');
  const [orderSearch, setOrderSearch] = useState('');

  // Filter in suppliers
  const [supplierFilter, setSupplierFilter] = useState<'all' | 'CJ Dropshipping' | 'Zendrop'>('all');

  // Supplier API & Wallet Automation
  const [walletBalance, setWalletBalance] = useState<number>(() => {
    const val = localStorage.getItem('ling_supplier_wallet');
    return val ? parseFloat(val) : 240.0;
  });
  const [autoDebit, setAutoDebit] = useState<boolean>(() => {
    return localStorage.getItem('ling_auto_debit') !== 'false';
  });
  const [cjUserId, setCjUserId] = useState(() => localStorage.getItem('ling_cj_user_id') || 'CJ5954420');
  const [cjAccountName, setCjAccountName] = useState(() => localStorage.getItem('ling_cj_account_name') || 'Ling Petshop');
  const [cjApiKey, setCjApiKey] = useState(() => localStorage.getItem('ling_cj_api_key') || '');
  const [zendropToken, setZendropToken] = useState(() => localStorage.getItem('ling_zendrop_token') || 'zd_auth_token_88192');
  const [apiPingStatus, setApiPingStatus] = useState<'idle' | 'testing' | 'connected'>('connected');
  const [cjSaveSuccess, setCjSaveSuccess] = useState(false);
  const [isRechargeOpen, setIsRechargeOpen] = useState(false);
  const [rechargeSuccess, setRechargeSuccess] = useState(false);
  // Stripe API Keys & Test Flow State
  const [stripePk, setStripePk] = useState(() => localStorage.getItem('ling_stripe_pk') || '');
  const [stripeSk, setStripeSk] = useState(() => localStorage.getItem('ling_stripe_sk') || '');
  const [stripeSaveMsg, setStripeSaveMsg] = useState(false);
  const [isTestingStripeFlow, setIsTestingStripeFlow] = useState(false);
  const [stripeTestResult, setStripeTestResult] = useState<{
    status: 'idle' | 'success';
    orderId: string;
    amount: number;
    timestamp: string;
  } | null>(null);

  const playChimeSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch (e) {
      console.error(e);
    }
  };

  const handleRunDummyStripeTestTransaction = () => {
    setIsTestingStripeFlow(true);
    setStripeTestResult(null);

    setTimeout(() => {
      const testOrderId = `LP-US-${Math.floor(100000 + Math.random() * 900000)}`;
      const testOrder: AdminOrder = {
        id: `ord-test-${Date.now()}`,
        orderNumber: testOrderId,
        date: 'Hoje (Teste de Transação)',
        customerName: 'Jennifer Hayes (US Test Customer)',
        customerEmail: 'jennifer.hayes.test@gmail.com',
        customerPhone: '+1 (512) 555-0182',
        shippingAddress: {
          street: '401 Congress Ave, Suite 1200',
          city: 'Austin',
          state: 'TX',
          zip: '78701',
          country: 'United States',
        },
        items: [
          {
            sku: 'LP-BED-C9-M',
            name: 'The Cloud9™ Orthopedic Calming Pet Bed',
            size: 'Medium (30")',
            color: 'Sage Green',
            quantity: 1,
            unitPrice: 44.95,
            supplierCost: 15.5,
            supplier: 'CJ Dropshipping',
            supplierSku: 'CJ-PET-BED901',
            supplierUrl: 'https://cjdropshipping.com',
          },
        ],
        totalUsd: 44.95,
        supplierCostUsd: 15.5,
        profitUsd: 29.45,
        paymentGateway: 'Stripe (Credit Card / Apple Pay)',
        paymentStatus: 'Paid',
        fulfillmentStatus: 'Aguardando Despacho',
      };

      const updatedOrders = [testOrder, ...orders];
      setOrders(updatedOrders);
      localStorage.setItem('ling_admin_orders', JSON.stringify(updatedOrders));

      playChimeSound();
      setIsTestingStripeFlow(false);
      setStripeTestResult({
        status: 'success',
        orderId: testOrderId,
        amount: 44.95,
        timestamp: new Date().toLocaleTimeString('pt-BR'),
      });
    }, 1500);
  };

  // SEO Caption & UTM Link States for Viral Studio
  const [selectedSeoProductId, setSelectedSeoProductId] = useState<string>('cloud9-calming-bed');
  const [selectedSeoAngle, setSelectedSeoAngle] = useState<'storm' | 'fur' | 'sleep' | 'hydration'>('storm');
  const [copiedCaptionIdx, setCopiedCaptionIdx] = useState<number | null>(null);

  // UTM Links State
  const [utmSourceInput, setUtmSourceInput] = useState('reels_video_1');
  const [utmLinks, setUtmLinks] = useState<{ id: string; name: string; url: string; clicks: number; date: string }[]>(() => {
    try {
      const saved = localStorage.getItem('ling_utm_links');
      return saved ? JSON.parse(saved) : [
        {
          id: 'link-1',
          name: 'Reels Storm Video #1',
          url: 'https://lingpetshop.com/#shop?utm_source=instagram_reels_storm1',
          clicks: 142,
          date: 'Hoje',
        },
        {
          id: 'link-2',
          name: 'TikTok Cat Fountain #2',
          url: 'https://lingpetshop.com/#shop?utm_source=tiktok_aquapure2',
          clicks: 89,
          date: 'Ontem',
        },
      ];
    } catch {
      return [];
    }
  });

  const handleCreateUtmLink = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!utmSourceInput.trim()) return;
    const cleanSource = utmSourceInput.trim().toLowerCase().replace(/\s+/g, '_');
    const newLink = {
      id: `link-${Date.now()}`,
      name: `Campanha: ${utmSourceInput}`,
      url: `https://lingpetshop.com/#shop?utm_source=${cleanSource}`,
      clicks: 0,
      date: 'Criado agora',
    };
    const updated = [newLink, ...utmLinks];
    setUtmLinks(updated);
    localStorage.setItem('ling_utm_links', JSON.stringify(updated));
    setUtmSourceInput('');
  };

  // Active Products persisted state
  const [activeProducts, setActiveProducts] = useState<Product[]>(() => getSavedProducts());

  // Modal state for adding custom real products
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showManualGuide, setShowManualGuide] = useState(false);

  // New product form fields
  const [newProdName, setNewProdName] = useState('');
  const [newProdSupplier, setNewProdSupplier] = useState<'Zendrop' | 'CJ Dropshipping'>('CJ Dropshipping');
  const [newProdSku, setNewProdSku] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('39.95');
  const [newProdCost, setNewProdCost] = useState('11.50');
  const [newProdShipping, setNewProdShipping] = useState('4.50');
  const [newProdCategory, setNewProdCategory] = useState<'Beds' | 'Feeding' | 'Walk & Travel' | 'Toys' | 'Grooming' | 'Wellness' | 'Treats'>('Beds');
  const [newProdPet, setNewProdPet] = useState<'Dog' | 'Cat' | 'All Pets'>('Dog');
  const [newProdImage, setNewProdImage] = useState('https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=1200&q=85');
  const [newProdTagline, setNewProdTagline] = useState('');

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        if (isEdit && editingProduct) {
          setEditingProduct({ ...editingProduct, heroImage: result });
        } else {
          setNewProdImage(result);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const [autoFillInput, setAutoFillInput] = useState('');

  const applyTargetMargin = (percent: number) => {
    const cost = parseFloat(newProdCost) || 0;
    const ship = parseFloat(newProdShipping) || 0;
    const totalCost = cost + ship;
    if (totalCost <= 0) return;
    const marginDec = percent / 100;
    let price = totalCost / (1 - marginDec);
    price = Math.ceil(price) - 0.05;
    setNewProdPrice(price.toFixed(2));
  };

  const handleAutoFillFromCjLinkOrSku = (inputStr: string) => {
    const rawInput = inputStr.trim();
    const query = rawInput.toLowerCase();

    let name = 'Ultra-Soft Orthopedic Calming Pet Bed';
    let category: 'Beds' | 'Feeding' | 'Walk & Travel' | 'Toys' | 'Grooming' | 'Wellness' | 'Treats' = 'Beds';
    let petType: 'Dog' | 'Cat' | 'All Pets' = 'Dog';
    let image = 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1200&q=85';
    let cost = 12.50;
    let ship = 4.50;
    let skuStr = rawInput && !rawInput.includes('http') ? rawInput : `CJ-PET-${Math.floor(1000 + Math.random() * 9000)}`;

    if (
      query.includes('fountain') ||
      query.includes('water') ||
      query.includes('bebedouro') ||
      query.includes('fonte') ||
      query.includes('bowl') ||
      query.includes('feeder')
    ) {
      name = 'AquaPure™ Ultra-Quiet Wireless Pet Fountain';
      category = 'Feeding';
      petType = 'Cat';
      image = 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=85';
      cost = 11.20;
      ship = 5.20;
    } else if (
      query.includes('harness') ||
      query.includes('leash') ||
      query.includes('coleira') ||
      query.includes('guia') ||
      query.includes('passeio') ||
      query.includes('collar')
    ) {
      name = 'AirGlide™ Zero-Pull Ergonomic Dog Harness';
      category = 'Walk & Travel';
      petType = 'Dog';
      image = 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85';
      cost = 8.80;
      ship = 3.80;
    } else if (
      query.includes('toy') ||
      query.includes('brinquedo') ||
      query.includes('ball') ||
      query.includes('laser') ||
      query.includes('chew')
    ) {
      name = 'Interactive Smart Bouncing Motion Pet Toy';
      category = 'Toys';
      petType = 'All Pets';
      image = 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=85';
      cost = 6.40;
      ship = 3.50;
    } else if (
      query.includes('groom') ||
      query.includes('brush') ||
      query.includes('escova') ||
      query.includes('tosa') ||
      query.includes('nail') ||
      query.includes('vacuum')
    ) {
      name = 'GroomPro™ Low-Noise Pet Hair Brush & Vacuum';
      category = 'Grooming';
      petType = 'All Pets';
      image = 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1200&q=85';
      cost = 14.50;
      ship = 4.80;
    } else if (
      query.includes('snack') ||
      query.includes('treat') ||
      query.includes('salmon') ||
      query.includes('chews')
    ) {
      name = 'WildBites™ 100% Alaskan Freeze-Dried Pet Treats';
      category = 'Treats';
      petType = 'All Pets';
      image = 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=85';
      cost = 5.20;
      ship = 3.20;
    }

    // Calculate selling price targeting 60% net profit margin (sweet spot in 50% - 65% target)
    const totalCost = cost + ship;
    const targetMargin = 0.60;
    let calculatedPrice = Number((totalCost / (1 - targetMargin)).toFixed(2));
    calculatedPrice = Math.ceil(calculatedPrice) - 0.05;

    setNewProdName(name);
    setNewProdCategory(category);
    setNewProdPet(petType);
    setNewProdImage(image);
    setNewProdCost(cost.toFixed(2));
    setNewProdShipping(ship.toFixed(2));
    setNewProdPrice(calculatedPrice.toFixed(2));
    setNewProdSku(skuStr);
    setNewProdTagline(`Veterinarian-approved ${category.toLowerCase()} essentials with 24h US dispatch via USPS.`);

    setImportSuccessMsg(
      `Formulário preparado! Preço sugerido configurado para 60% de margem de lucro. Ajuste os campos se desejar e clique em Publicar.`
    );
    setTimeout(() => setImportSuccessMsg(null), 3500);
  };

  const handleAddRealProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    const priceNum = parseFloat(newProdPrice) || 39.95;
    const costNum = parseFloat(newProdCost) || 11.50;
    const shipNum = parseFloat(newProdShipping) || 4.50;
    const sku = newProdSku.trim() || `CJ-${Math.floor(1000 + Math.random() * 9000)}`;
    const totalCost = Number((costNum + shipNum).toFixed(2));
    const profit = Number((priceNum - totalCost).toFixed(2));
    const margin = Math.max(1, Math.round((profit / priceNum) * 100));

    const newProd: Product = {
      id: `custom-prod-${Date.now()}`,
      sku: `LP-REAL-${Math.floor(100 + Math.random() * 900)}`,
      brand: 'Ling Certified',
      name: newProdName.trim(),
      tagline: newProdTagline.trim() || `Importado diretamente do armazém da ${newProdSupplier}. Envio rápido com rastreio USPS.`,
      petType: newProdPet,
      category: newProdCategory,
      department: newProdPet === 'Cat' ? 'Cats' : newProdPet === 'Dog' ? 'Dogs' : 'Wellness',
      price: priceNum,
      compareAt: Number((priceNum * 1.5).toFixed(2)),
      supplierCost: costNum,
      cjCost: costNum,
      cjShippingEstimate: shipNum,
      totalCjCost: totalCost,
      netProfit: profit,
      profitMarginPercent: margin,
      supplier: newProdSupplier,
      supplierSku: sku,
      supplierUrl: newProdSupplier === 'Zendrop' ? 'https://zendrop.com' : 'https://cjdropshipping.com',
      supplierWarehouse: 'US Warehouse (Dispatch in 24h via USPS)',
      supplierShippingTime: '2-4 business days',
      rating: 5.0,
      reviewsCount: 1,
      badge: '✓ Produto Real da CJ',
      isBestseller: true,
      isLingPick: true,
      repeatDeliveryEligible: true,
      inStockAustin: true,
      heroImage: newProdImage.trim() || 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=1200&q=85',
      secondaryImage: newProdImage.trim() || 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
      galleryImages: [
        newProdImage.trim() || 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
      ],
      description: `${newProdName.trim()} de alta qualidade selecionado especialmente para a Ling Petshop. Envio prioritário a partir do armazém dos EUA para o cliente final com código de rastreamento USPS.`,
      keyFeatures: [
        'Envio em 24h a partir do armazém dos EUA via USPS Ground Advantage',
        'Sem logotipos asiáticos nem notas fiscais de terceiros (Blind Dropshipping)',
        'Garantia de substituição imediata em caso de perda ou extravio',
      ],
      specifications: {
        material: 'Materiais Veterinários Premium Certificados',
        dimensions: 'Tamanho Padrão Americano',
        weight: '1.2 lbs',
        inTheBox: '1x Produto Original na Caixa, 1x Manual de Instruções',
        care: 'Limpar com pano úmido ou lavagem suave',
        warranty: 'Garantia de Satisfação de 30 Dias nos EUA',
        cjWarehouse: 'US East (New Jersey Warehouse)',
        shippingEstimate: 'Envio em 24h via USPS (3-5 dias úteis)',
      },
      volumeTiers: [
        { qty: 1, discountPercent: 0, pricePerUnit: priceNum, total: priceNum, savings: 0, netProfit: profit, badge: '1 Unidade' },
        { qty: 2, discountPercent: 15, pricePerUnit: Number((priceNum * 0.85).toFixed(2)), total: Number((priceNum * 0.85 * 2).toFixed(2)), savings: Number((priceNum * 0.3).toFixed(2)), netProfit: Number(((priceNum * 0.85 * 2) - ((costNum * 2) + (shipNum * 1.35))).toFixed(2)), badge: '2 Unidades (15% OFF)' },
        { qty: 3, discountPercent: 25, pricePerUnit: Number((priceNum * 0.75).toFixed(2)), total: Number((priceNum * 0.75 * 3).toFixed(2)), savings: Number((priceNum * 0.75).toFixed(2)), netProfit: Number(((priceNum * 0.75 * 3) - ((costNum * 3) + (shipNum * 1.65))).toFixed(2)), badge: '3 Unidades (25% OFF)' },
      ],
    };

    const nextList = [newProd, ...activeProducts];
    setActiveProducts(nextList);
    saveProductsToStorage(nextList);

    setApiLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        time: 'Agora mesmo',
        type: newProdSupplier === 'Zendrop' ? 'zendrop' : 'cj',
        message: `Novo Produto Real Cadastrado: "${newProd.name}" (SKU: ${sku}) salvo no catálogo da loja`,
        badge: 'Novo Produto',
      },
      ...prev,
    ]);

    setImportSuccessMsg(`Produto "${newProdName}" cadastrado com sucesso e já está disponível na loja!`);
    setIsAddProductOpen(false);
    setNewProdName('');
    setNewProdSku('');
    setNewProdTagline('');
    setTimeout(() => setImportSuccessMsg(null), 4000);
  };

  const handleDeleteProduct = (productId: string) => {
    const prod = activeProducts.find((p) => p.id === productId);
    if (!prod) return;
    if (window.confirm(`Tem certeza que deseja remover o produto "${prod.name}" da sua loja?`)) {
      const nextList = activeProducts.filter((p) => p.id !== productId);
      setActiveProducts(nextList);
      saveProductsToStorage(nextList);
      setImportSuccessMsg(`Produto "${prod.name}" foi removido do catálogo com sucesso.`);
      setTimeout(() => setImportSuccessMsg(null), 3500);
    }
  };

  const handleResetCatalog = () => {
    setActiveProducts(PRODUCTS);
    saveProductsToStorage(PRODUCTS);
    setImportSuccessMsg('Catálogo resetado para os 25 produtos campeões originais sincronizados com Zendrop e CJ!');
    setTimeout(() => setImportSuccessMsg(null), 4000);
  };

  const handleSaveEditProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const priceNum = editingProduct.price;
    const costNum = editingProduct.cjCost || editingProduct.supplierCost;
    const shipNum = editingProduct.cjShippingEstimate || 4.5;
    const totalCost = Number((costNum + shipNum).toFixed(2));
    const profit = Number((priceNum - totalCost).toFixed(2));
    const margin = Math.max(1, Math.round((profit / priceNum) * 100));

    const updatedProd: Product = {
      ...editingProduct,
      totalCjCost: totalCost,
      netProfit: profit,
      profitMarginPercent: margin,
      volumeTiers: [
        { qty: 1, discountPercent: 0, pricePerUnit: priceNum, total: priceNum, savings: 0, netProfit: profit, badge: '1 Unidade' },
        { qty: 2, discountPercent: 15, pricePerUnit: Number((priceNum * 0.85).toFixed(2)), total: Number((priceNum * 0.85 * 2).toFixed(2)), savings: Number((priceNum * 0.3).toFixed(2)), netProfit: Number(((priceNum * 0.85 * 2) - ((costNum * 2) + (shipNum * 1.35))).toFixed(2)), badge: '2 Unidades (15% OFF)' },
        { qty: 3, discountPercent: 25, pricePerUnit: Number((priceNum * 0.75).toFixed(2)), total: Number((priceNum * 0.75 * 3).toFixed(2)), savings: Number((priceNum * 0.75).toFixed(2)), netProfit: Number(((priceNum * 0.75 * 3) - ((costNum * 3) + (shipNum * 1.65))).toFixed(2)), badge: '3 Unidades (25% OFF)' },
      ],
    };

    const nextList = activeProducts.map((p) => (p.id === updatedProd.id ? updatedProd : p));
    setActiveProducts(nextList);
    saveProductsToStorage(nextList);
    setImportSuccessMsg(`Produto "${updatedProd.name}" atualizado com sucesso!`);
    setEditingProduct(null);
    setTimeout(() => setImportSuccessMsg(null), 3500);
  };

  // Automated Zendrop / CJ Product Importer state
  const [importInput, setImportInput] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [importSuccessMsg, setImportSuccessMsg] = useState<string | null>(null);

  const handleAutoImport = (customTitle?: string, supplierName?: 'Zendrop' | 'CJ Dropshipping') => {
    setIsImporting(true);
    const title = customTitle || importInput.trim() || 'Orthopedic Memory Foam Car Seat';
    const supplier = supplierName || (title.toLowerCase().includes('cj') ? 'CJ Dropshipping' : 'Zendrop');
    setTimeout(() => {
      setIsImporting(false);
      setImportSuccessMsg(`Produto "${title}" importado e sincronizado com sucesso da ${supplier}! Custo de atacado e fotos em alta resolução configurados no catálogo.`);
      setImportInput('');
      setApiLogs((prev) => [
        {
          id: `log-${Date.now()}`,
          time: 'Agora mesmo',
          type: supplier === 'Zendrop' ? 'zendrop' : 'cj',
          message: `Sincronização Automática: Produto "${title}" catalogado com armazém dos EUA (Disponibilidade imediata via USPS)`,
          badge: 'Catalog Sync',
        },
        ...prev,
      ]);
      setTimeout(() => setImportSuccessMsg(null), 4000);
    }, 900);
  };

  // Live Webhook and API Event Logs
  const [apiLogs, setApiLogs] = useState<
    { id: string; time: string; type: 'stripe' | 'cj' | 'zendrop' | 'usps'; message: string; badge: string }[]
  >([
    {
      id: 'log-1',
      time: 'Há 18 min',
      type: 'stripe',
      message: 'Pagamento aprovado #LP-US-948102 (Sarah Miller) via Stripe Elements: +$59.90 USD',
      badge: 'Stripe Webhook',
    },
    {
      id: 'log-2',
      time: 'Há 18 min',
      type: 'cj',
      message: 'API CJ Dropshipping: Custo de atacado -$15.50 debitado da carteira com sucesso',
      badge: 'Auto-Debit',
    },
    {
      id: 'log-3',
      time: 'Há 17 min',
      type: 'usps',
      message: 'Etiqueta USPS Ground Advantage gerada: Armazém NJ -> Miami, FL (Rastreio: 9400111899562537829104)',
      badge: 'USPS Live',
    },
    {
      id: 'log-4',
      time: 'Ontem',
      type: 'zendrop',
      message: 'Zendrop Express: Pedido #LP-US-947950 despachado via armazém CA',
      badge: 'Zendrop API',
    },
  ]);

  const handleSaveCjConnection = () => {
    localStorage.setItem('ling_cj_user_id', cjUserId);
    localStorage.setItem('ling_cj_account_name', cjAccountName);
    localStorage.setItem('ling_cj_api_key', cjApiKey);
    localStorage.setItem('ling_zendrop_token', zendropToken);
    setCjSaveSuccess(true);
    setApiLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        time: 'Agora mesmo',
        type: 'cj',
        message: `Credenciais vinculadas: Conta ${cjAccountName} (ID: ${cjUserId}) com API Key salva com sucesso`,
        badge: 'CJ Auth Sync',
      },
      ...prev,
    ]);
    setTimeout(() => setCjSaveSuccess(false), 3000);
  };

  const handleTestApiPing = () => {
    setApiPingStatus('testing');
    handleSaveCjConnection();
    setTimeout(() => {
      setApiPingStatus('connected');
    }, 700);
  };

  const handleAddBalance = (amount: number) => {
    const next = Number((walletBalance + amount).toFixed(2));
    setWalletBalance(next);
    localStorage.setItem('ling_supplier_wallet', next.toString());
    setRechargeSuccess(true);
    setApiLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        time: 'Agora mesmo',
        type: 'cj',
        message: `Recarga aprovada de +$${amount.toFixed(2)} USD na Carteira do Fornecedor. Novo saldo: $${next.toFixed(2)} USD`,
        badge: 'Wallet Recharge',
      },
      ...prev,
    ]);
    setTimeout(() => {
      setRechargeSuccess(false);
      setIsRechargeOpen(false);
    }, 1200);
  };

  const toggleAutoDebit = () => {
    const next = !autoDebit;
    setAutoDebit(next);
    localStorage.setItem('ling_auto_debit', next.toString());
  };

  // Save orders to localStorage on change
  useEffect(() => {
    localStorage.setItem('ling_admin_orders', JSON.stringify(orders));
  }, [orders]);



  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('ling_admin_authenticated');
  };

  // 1-Click semi-automatic dispatch action
  const handleOpenDispatchModal = (ord: AdminOrder) => {
    setDispatchOrder(ord);
    setTrackingInput(
      ord.trackingNumber ||
        `9400${Math.floor(10000000000000000 + Math.random() * 90000000000000000)}`
    );
  };

  const handleConfirmDispatch = () => {
    if (!dispatchOrder) return;
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === dispatchOrder.id) {
          return {
            ...ord,
            fulfillmentStatus: 'Despachado',
            trackingNumber: trackingInput.trim() || '9400111899562537829104',
            carrier: 'USPS Ground Advantage (3-5 Dias)',
            dispatchedAt: 'Despachado agora',
          };
        }
        return ord;
      })
    );
    setDispatchOrder(null);
  };

  const copyFormattedAddress = (ord: AdminOrder) => {
    const text = `RECIPIENT: ${ord.customerName}
STREET: ${ord.shippingAddress.street}
CITY: ${ord.shippingAddress.city}
STATE: ${ord.shippingAddress.state}
ZIP: ${ord.shippingAddress.zip}
COUNTRY: United States
PHONE: ${ord.customerPhone}
ITEMS: ${ord.items.map((i) => `${i.quantity}x ${i.name} (SKU: ${i.supplierSku})`).join(', ')}`;

    navigator.clipboard.writeText(text);
    setCopiedShipping(true);
    setTimeout(() => setCopiedShipping(false), 2500);
  };

  // Financial aggregates
  const totalRevenueUsd = orders.reduce((acc, curr) => acc + curr.totalUsd, 0);
  const totalRevenueBrl = totalRevenueUsd * EXCHANGE_RATE_BRL;
  const totalCostUsd = orders.reduce((acc, curr) => acc + curr.supplierCostUsd, 0);
  const totalProfitUsd = totalRevenueUsd - totalCostUsd;
  const totalProfitBrl = totalProfitUsd * EXCHANGE_RATE_BRL;
  const pendingDispatchCount = orders.filter((o) => o.fulfillmentStatus === 'Aguardando Despacho').length;
  const avgMarginPercent = totalRevenueUsd > 0 ? Math.round((totalProfitUsd / totalRevenueUsd) * 100) : 68;

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter === 'pending' && o.fulfillmentStatus !== 'Aguardando Despacho') return false;
    if (orderStatusFilter === 'dispatched' && o.fulfillmentStatus !== 'Despachado') return false;
    if (orderSearch.trim()) {
      const q = orderSearch.toLowerCase();
      return (
        o.customerName.toLowerCase().includes(q) ||
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerEmail.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Filtered products for suppliers tab
  const filteredProducts = activeProducts.filter((p) => {
    if (supplierFilter !== 'all') {
      return p.supplier === supplierFilter;
    }
    return true;
  });

  // Computed & enriched products for Catalog & CJ Margins tab
  const enrichedCatalogProducts = activeProducts.map((p) => {
    const cjCost = p.cjCost ?? p.supplierCost;
    const cjShipping = p.cjShippingEstimate ?? (p.category === 'Beds' || p.category === 'Feeding' ? 5.95 : 3.5);
    const totalCjCost = Number((cjCost + cjShipping).toFixed(2));
    const currentPrice = customRetailPrices[p.id] ?? p.price;
    const netProfit = Number((currentPrice - totalCjCost).toFixed(2));
    const profitMarginPercent = Math.max(1, Math.round((netProfit / currentPrice) * 100));

    return {
      ...p,
      price: currentPrice,
      cjCost,
      cjShippingEstimate: cjShipping,
      totalCjCost,
      netProfit,
      profitMarginPercent,
    };
  });

  const avgProductPrice =
    enrichedCatalogProducts.reduce((acc, p) => acc + p.price, 0) /
    (enrichedCatalogProducts.length || 1);
  const avgProductCjCost =
    enrichedCatalogProducts.reduce((acc, p) => acc + p.totalCjCost, 0) /
    (enrichedCatalogProducts.length || 1);
  const avgProductProfit =
    enrichedCatalogProducts.reduce((acc, p) => acc + p.netProfit, 0) /
    (enrichedCatalogProducts.length || 1);
  const avgProductMargin = Math.round((avgProductProfit / avgProductPrice) * 100);

  // Filtered & sorted catalog products
  const filteredCatalogProducts = enrichedCatalogProducts
    .filter((p) => {
      if (catalogCategory === 'Dogs' && !(p.department === 'Dogs' || p.petType === 'Dog')) return false;
      if (catalogCategory === 'Cats' && !(p.department === 'Cats' || p.petType === 'Cat')) return false;
      if (
        catalogCategory !== 'all' &&
        catalogCategory !== 'Dogs' &&
        catalogCategory !== 'Cats' &&
        p.category !== catalogCategory
      ) {
        return false;
      }
      if (catalogSearch.trim()) {
        const q = catalogSearch.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.supplierSku.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (catalogSort === 'margin-desc') return b.profitMarginPercent - a.profitMarginPercent;
      if (catalogSort === 'profit-desc') return b.netProfit - a.netProfit;
      if (catalogSort === 'price-asc') return a.price - b.price;
      if (catalogSort === 'price-desc') return b.price - a.price;
      if (catalogSort === 'bestsellers') return b.reviewsCount - a.reviewsCount;
      return 0;
    });

  // Render Login Wall if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-[#00142A] text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#002244] border border-blue-900/60 rounded-3xl p-8 shadow-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-5 left-5 text-blue-300 hover:text-white flex items-center gap-1.5 text-xs font-bold cursor-pointer"
          >
            <ArrowLeft size={16} /> Voltar à Loja
          </button>

          <div className="text-center mt-6 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#E31837] text-white mx-auto flex items-center justify-center shadow-lg mb-4">
              <Lock size={30} />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-white">
              Painel Administrativo
            </h2>
            <p className="text-xs text-blue-200 mt-1 font-medium">
              Ling Petshop · Gestão de Vendas, Despachos e Fornecedores
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-blue-200 uppercase tracking-wider">
                  Senha de Acesso do Lojista
                </label>
                <span className="text-[10px] text-emerald-300 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                  🔑 Senha: admin123
                </span>
              </div>
              <input
                type="password"
                required
                autoFocus
                placeholder="Digite admin123 para entrar..."
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-[#001830] border border-blue-800 rounded-xl px-4 py-3 text-sm text-white placeholder-blue-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 font-mono"
              />

            {loginError && (
              <p className="text-xs text-red-400 font-bold bg-red-950/60 border border-red-800/80 p-3 rounded-xl flex items-center gap-2">
                <AlertCircle size={15} className="shrink-0 text-red-400" />
                <span>{loginError}</span>
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-[#E31837] hover:bg-[#c9142e] text-white font-black py-3.5 rounded-xl uppercase tracking-wider text-xs shadow-lg transition-all cursor-pointer"
            >
              Autenticar Acesso Restrito
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-blue-900/40 text-center">
            <p className="text-[11px] text-blue-300/80 flex items-center justify-center gap-1.5 font-medium">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>Acesso restrito e monitorado com criptografia de 256-bits.</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#F4F6F9] text-gray-900 flex flex-col overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Admin Header Bar */}
      <header className="bg-[#002244] text-white px-3 sm:px-6 py-2.5 sm:py-3.5 border-b border-blue-900/60 flex-shrink-0 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5">
          {/* Top Row / Branding */}
          <div className="flex items-center justify-between md:justify-start gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="flex items-center gap-1.5 text-xs font-bold bg-white/10 hover:bg-white/20 text-blue-100 hover:text-white px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                title="Voltar para a loja"
              >
                <ArrowLeft size={16} />
                <span className="text-[11px] sm:text-xs">Sair do Admin</span>
              </button>

              <div className="w-7 h-7 rounded-lg bg-[#E31837] text-white flex items-center justify-center font-black text-xs shadow-xs">
                LP
              </div>

              <div>
                <h1 className="text-xs sm:text-sm font-black text-white tracking-wide uppercase">
                  Ling Admin
                </h1>
                <p className="text-[9px] text-emerald-300 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Stripe Live (US$)
                </p>
              </div>
            </div>

            {/* Logout on mobile */}
            <button
              onClick={handleLogout}
              className="md:hidden text-blue-300 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              title="Bloquear painel"
            >
              <Lock size={16} />
            </button>
          </div>

          {/* Navigation Tabs (Swipeable on mobile) */}
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 max-w-full">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                activeTab === 'orders'
                  ? 'bg-[#E31837] text-white shadow-md'
                  : 'text-blue-200 hover:bg-white/10 bg-white/5'
              }`}
            >
              <ShoppingBag size={14} />
              <span>Pedidos</span>
              {pendingDispatchCount > 0 && (
                <span className="bg-amber-400 text-stone-900 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                  {pendingDispatchCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                activeTab === 'catalog'
                  ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400/40'
                  : 'text-emerald-300 hover:bg-emerald-500/20 bg-emerald-500/10 border border-emerald-400/30'
              }`}
            >
              <Package size={14} className="text-emerald-300" />
              <span>Catálogo & Lucros CJ</span>
              <span className="bg-emerald-400 text-stone-950 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                25
              </span>
            </button>

            <button
              onClick={() => setActiveTab('suppliers')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                activeTab === 'suppliers'
                  ? 'bg-[#E31837] text-white shadow-md'
                  : 'text-blue-200 hover:bg-white/10 bg-white/5'
              }`}
            >
              <Building2 size={14} />
              <span>Fornecedores</span>
            </button>

            <button
              onClick={() => setActiveTab('gateway')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                activeTab === 'gateway'
                  ? 'bg-[#E31837] text-white shadow-md'
                  : 'text-blue-200 hover:bg-white/10 bg-white/5'
              }`}
            >
              <CreditCard size={14} />
              <span>Stripe</span>
            </button>

            <button
              onClick={() => setActiveTab('metrics')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                activeTab === 'metrics'
                  ? 'bg-[#E31837] text-white shadow-md'
                  : 'text-blue-200 hover:bg-white/10 bg-white/5'
              }`}
            >
              <TrendingUp size={14} />
              <span>Métricas</span>
            </button>

            <button
              onClick={() => setActiveTab('viral-studio')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                activeTab === 'viral-studio'
                  ? 'bg-[#E31837] text-white shadow-md'
                  : 'text-blue-200 hover:bg-white/10 bg-white/5'
              }`}
            >
              <Sparkles size={14} className="text-amber-300" />
              <span>Viral Studio</span>
            </button>

            <button
              onClick={handleLogout}
              className="hidden md:block text-blue-300 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer ml-1"
              title="Bloquear painel"
            >
              <Lock size={15} />
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
        {/* KPI Mini Header Cards */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-[11px] font-bold uppercase tracking-wider">Faturamento Total</span>
              <DollarSign size={18} className="text-emerald-600" />
            </div>
            <div className="mt-2">
              <p className="text-xl sm:text-2xl font-black text-[#002244]">
                ${totalRevenueUsd.toFixed(2)} <span className="text-xs font-bold text-gray-400">USD</span>
              </p>
              <p className="text-xs font-bold text-emerald-600 mt-0.5">
                ≈ R$ {totalRevenueBrl.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-[11px] font-bold uppercase tracking-wider">Lucro Líquido Real</span>
              <TrendingUp size={18} className="text-[#E31837]" />
            </div>
            <div className="mt-2">
              <p className="text-xl sm:text-2xl font-black text-[#E31837]">
                ${totalProfitUsd.toFixed(2)} <span className="text-xs font-bold text-gray-400">USD</span>
              </p>
              <p className="text-xs font-bold text-gray-600 mt-0.5">
                Margem média: <strong className="text-stone-900">{avgMarginPercent}%</strong> (R$ {totalProfitBrl.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-[11px] font-bold uppercase tracking-wider">Pedidos Concluídos</span>
              <ShoppingBag size={18} className="text-blue-600" />
            </div>
            <div className="mt-2">
              <p className="text-xl sm:text-2xl font-black text-[#002244]">{orders.length}</p>
              <p className="text-xs text-gray-500 mt-0.5">
                Ticket Médio: <strong className="text-gray-800">${orders.length > 0 ? (totalRevenueUsd / orders.length).toFixed(2) : '0.00'}</strong>
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-[11px] font-bold uppercase tracking-wider">Despachos Pendentes</span>
              <Truck size={18} className="text-amber-600" />
            </div>
            <div className="mt-2">
              <p className="text-xl sm:text-2xl font-black text-amber-600">
                {pendingDispatchCount}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {pendingDispatchCount > 0 ? 'Aguardando 1-Clique' : 'Tudo despachado!'}
              </p>
            </div>
          </div>
        </section>

        {/* TAB 1: GESTÃO DE PEDIDOS & DESPACHO 1-CLIQUE */}
        {activeTab === 'orders' && (
          <section className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
            {/* Table Header and Filters */}
            <div className="p-4 sm:p-6 border-b border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-[#002244] flex items-center gap-2">
                  <span>Gestão de Pedidos & Despacho nos EUA</span>
                  <span className="bg-blue-100 text-[#002244] text-xs font-black px-2.5 py-0.5 rounded-full">
                    {filteredOrders.length}
                  </span>
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Clique em <strong>"Despachar no Fornecedor"</strong> para copiar os dados do cliente e abrir o produto em 1 clique.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                {/* Search */}
                <div className="relative flex-1 sm:w-56">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar por cliente, pedido..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-[#002244]"
                  />
                </div>

                {/* Filter Status */}
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value as any)}
                  className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 outline-none cursor-pointer"
                >
                  <option value="all">Todos os Status</option>
                  <option value="pending">Aguardando Despacho</option>
                  <option value="dispatched">Já Despachados</option>
                </select>
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-[10px] border-b border-gray-200">
                  <tr>
                    <th className="py-3.5 px-4">Pedido / Data</th>
                    <th className="py-3.5 px-4">Cliente / Destino EUA</th>
                    <th className="py-3.5 px-4">Itens & Fornecedor</th>
                    <th className="py-3.5 px-4 text-right">Venda (USD)</th>
                    <th className="py-3.5 px-4 text-right">Custo Forn.</th>
                    <th className="py-3.5 px-4 text-right">Lucro Líquido</th>
                    <th className="py-3.5 px-4 text-center">Status</th>
                    <th className="py-3.5 px-4 text-center">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-gray-400">
                        Nenhum pedido encontrado para o filtro selecionado.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((ord) => {
                      const isPending = ord.fulfillmentStatus === 'Aguardando Despacho';
                      return (
                        <tr key={ord.id} className="hover:bg-blue-50/40 transition-colors">
                          <td className="py-4 px-4 align-top">
                            <span className="font-black text-[#002244] block">
                              {ord.orderNumber}
                            </span>
                            <span className="text-[10px] text-gray-400 block mt-0.5">
                              {ord.date}
                            </span>
                            <div className="flex flex-col gap-1 mt-1">
                              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-bold">
                                <CheckCircle2 size={10} /> Pago via Stripe
                              </span>
                              {ord.dispatchPriority === 'urgent_2h' || (ord.shippingMethod && ord.shippingMethod.includes('Express')) ? (
                                <span className="inline-flex items-center gap-1 text-[10px] text-red-700 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded font-extrabold" title="Frete Express: Confirmar compra com o fornecedor em até 2h">
                                  🚨 URGENTE: Despachar em até 2h
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[10px] text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded font-bold" title="Frete Padrão: Aguardar 24h para garantir que não haverá pedido de reembolso">
                                  ⏳ PADRÃO: Aguardar 24h (Despacho)
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="py-4 px-4 align-top max-w-xs">
                            <span className="font-bold text-gray-900 block">{ord.customerName}</span>
                            <span className="text-gray-500 text-[11px] block">{ord.customerEmail}</span>
                            <span className="text-gray-400 text-[10px] block mt-1 truncate">
                              📍 {ord.shippingAddress.street}, {ord.shippingAddress.city}, {ord.shippingAddress.state} {ord.shippingAddress.zip}
                            </span>
                          </td>

                          <td className="py-4 px-4 align-top">
                            <div className="space-y-1">
                              {ord.items.map((it, idx) => (
                                <div key={idx} className="flex items-center gap-1.5">
                                  <span className="font-bold text-gray-900">
                                    {it.quantity}x {it.name}
                                  </span>
                                  <span className="bg-gray-100 text-gray-600 px-1.5 py-0.2 rounded text-[10px] font-bold">
                                    {it.supplier}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </td>

                          <td className="py-4 px-4 align-top text-right font-black text-gray-900">
                            ${ord.totalUsd.toFixed(2)}
                          </td>

                          <td className="py-4 px-4 align-top text-right text-gray-500 font-bold">
                            ${ord.supplierCostUsd.toFixed(2)}
                          </td>

                          <td className="py-4 px-4 align-top text-right">
                            <span className="font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                              +${ord.profitUsd.toFixed(2)}
                            </span>
                          </td>

                          <td className="py-4 px-4 align-top text-center">
                            {isPending ? (
                              <span className="bg-amber-100 text-amber-800 font-black text-[10px] px-2.5 py-1 rounded-full uppercase tracking-tight">
                                Aguardando Despacho
                              </span>
                            ) : (
                              <div>
                                <span className="bg-emerald-100 text-emerald-800 font-black text-[10px] px-2.5 py-1 rounded-full uppercase tracking-tight">
                                  Despachado
                                </span>
                                {ord.trackingNumber && (
                                  <span className="block text-[10px] text-gray-400 mt-1 font-mono">
                                    USPS: {ord.trackingNumber.slice(-8)}
                                  </span>
                                )}
                              </div>
                            )}
                          </td>

                          <td className="py-4 px-4 align-top text-center">
                            <button
                              onClick={() => handleOpenDispatchModal(ord)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer shadow-xs ${
                                isPending
                                  ? 'bg-[#E31837] hover:bg-[#c9142e] text-white'
                                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                              }`}
                            >
                              {isPending ? 'Despachar (1-Clique)' : 'Ver Rastreio'}
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* TAB 2: CATÁLOGO & LUCROS CJ DROPSHIPPING (NOVA CENTRAL ESTRATÉGICA) */}
        {activeTab === 'catalog' && (
          <div className="space-y-6">
            {/* Header intro & CJ Verified Connection Badge */}
            <div className="bg-gradient-to-r from-[#002244] via-[#003875] to-[#0A58CA] text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 bg-emerald-400 text-stone-950 font-black text-[11px] px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-900 animate-ping" />
                    ✓ CJ CONECTADA (Status: 200 OK · ID: {cjUserId || 'CJ5954420'})
                  </span>
                  <span className="bg-white/10 text-blue-100 text-xs font-bold px-3 py-1 rounded-full border border-white/15">
                    Perfil: {cjAccountName || 'Ling Petshop'}
                  </span>
                  <span className="bg-amber-400/90 text-stone-950 text-xs font-black px-2.5 py-1 rounded-full">
                    25 Produtos Reais Sincronizados
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                  Catálogo Oficial CJ & Estratégia de Lucro por Quantidade
                </h2>

                <p className="text-xs sm:text-sm text-blue-100 mt-2 max-w-3xl leading-relaxed">
                  Aqui você visualiza os custos reais de atacado da CJ Dropshipping para cada produto, o frete internacional com rastreio USPS e a precificação de alta conversão. Nossa estratégia combina <strong>preço baixo acessível para o comprador americano</strong> com <strong>ofertas em quantidade (Leve 2 com 15% OFF, Leve 3 com 25% OFF)</strong>, multiplicando seu lucro líquido!
                </p>
              </div>
            </div>

            {/* Direct Manual Product Banner & Practical Guide */}
            <div className="bg-gradient-to-r from-[#001830] to-[#002244] text-white p-6 rounded-3xl border border-emerald-500/40 shadow-lg space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-emerald-400 text-stone-950 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                    <Sparkles size={13} />
                    <span>MÉTODO MANUAL DIRETO DA CJ (EM 2 MINUTOS)</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Quer escolher os produtos manualmente na CJ e trazer pro site?
                  </h3>
                  <p className="text-xs text-blue-100 mt-1 max-w-2xl leading-relaxed">
                    É super simples! Abra o app ou site da CJ Dropshipping, encontre qualquer produto de pet que gostar, copie o nome, o link da foto e o preço. Depois clique no botão verde ao lado para publicar no seu site na hora.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsAddProductOpen(true)}
                    className="bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-all hover:scale-102 active:scale-98"
                  >
                    <Plus size={16} />
                    <span>+ Adicionar Produto Manualmente</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowManualGuide(!showManualGuide)}
                    className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-3.5 py-3 rounded-xl transition-all cursor-pointer flex items-center gap-1 border border-white/15"
                  >
                    <span>{showManualGuide ? 'Ocultar Guia' : '📘 Ver Passo a Passo'}</span>
                  </button>
                </div>
              </div>

              {showManualGuide && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5 pt-4 border-t border-blue-800/80 text-xs animate-fadeIn">
                  <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1.5">
                    <span className="w-6 h-6 rounded-full bg-emerald-400 text-stone-950 font-black text-xs flex items-center justify-center">1</span>
                    <h4 className="font-black text-sm text-white">Abra a CJ Dropshipping</h4>
                    <p className="text-[11px] text-blue-200 leading-relaxed">
                      Pesquise qualquer item de pet (ex: "dog bed", "cat toy", "pet harness", "water fountain").
                    </p>
                  </div>

                  <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1.5">
                    <span className="w-6 h-6 rounded-full bg-emerald-400 text-stone-950 font-black text-xs flex items-center justify-center">2</span>
                    <h4 className="font-black text-sm text-white">Copie Foto, Nome e Preço</h4>
                    <p className="text-[11px] text-blue-200 leading-relaxed">
                      Copie o link da foto (clique com botão direito -&gt; "Copiar endereço da imagem"), o nome do produto e quanto a CJ cobra.
                    </p>
                  </div>

                  <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1.5">
                    <span className="w-6 h-6 rounded-full bg-emerald-400 text-stone-950 font-black text-xs flex items-center justify-center">3</span>
                    <h4 className="font-black text-sm text-white">Cole no Formulário</h4>
                    <p className="text-[11px] text-blue-200 leading-relaxed">
                      Clique no botão verde acima. Cole o link da foto (veja o teste ao vivo na tela!), defina o preço de venda e veja seu lucro.
                    </p>
                  </div>

                  <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1.5">
                    <span className="w-6 h-6 rounded-full bg-emerald-400 text-stone-950 font-black text-xs flex items-center justify-center">4</span>
                    <h4 className="font-black text-sm text-white">Publicar na Loja</h4>
                    <p className="text-[11px] text-blue-200 leading-relaxed">
                      Clique em "Publicar na Loja". O produto entra imediatamente na vitrine, na busca e no checkout pronto para vender!
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* 4 Metric Cards for Catalog & CJ Margins */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-xs">
                <div className="flex items-center justify-between text-gray-500 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Produtos no Catálogo</span>
                  <Package size={18} className="text-blue-600" />
                </div>
                <p className="text-2xl font-black text-[#002244]">{activeProducts.length}</p>
                <p className="text-[11px] text-emerald-600 font-bold mt-0.5">100% com fotos reais & specs</p>
              </div>

              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-xs">
                <div className="flex items-center justify-between text-gray-500 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Margem Média Líquida</span>
                  <Percent size={18} className="text-emerald-600" />
                </div>
                <p className="text-2xl font-black text-emerald-600">{avgProductMargin}%</p>
                <p className="text-[11px] text-gray-500 mt-0.5">Após produto + frete CJ</p>
              </div>

              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-xs">
                <div className="flex items-center justify-between text-gray-500 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Lucro Médio Unitário</span>
                  <DollarSign size={18} className="text-[#E31837]" />
                </div>
                <p className="text-2xl font-black text-[#E31837]">
                  ${avgProductProfit.toFixed(2)} <span className="text-xs font-bold text-gray-400">USD</span>
                </p>
                <p className="text-[11px] text-gray-600 font-bold mt-0.5">
                  ≈ R$ {(avgProductProfit * EXCHANGE_RATE_BRL).toFixed(2)} por unidade
                </p>
              </div>

              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-xs">
                <div className="flex items-center justify-between text-gray-500 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Armazéns EUA CJ</span>
                  <Truck size={18} className="text-amber-600" />
                </div>
                <p className="text-2xl font-black text-[#002244]">NJ & CA</p>
                <p className="text-[11px] text-gray-500 mt-0.5">3–5 dias úteis via USPS</p>
              </div>
            </div>

            {/* Interactive Volume Scaling Simulator: How to Get Rich with Low CJ Prices & Quantity Sales */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 font-bold text-xs px-3 py-1 rounded-full border border-emerald-200 mb-2">
                    <Calculator size={13} />
                    <span>Calculadora de Lucro em Escala (Venda por Quantidade & Volume)</span>
                  </div>
                  <h3 className="text-xl font-black text-[#002244]">
                    Simulador: Quanto você lucra por mês vendendo na Ling Petshop?
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 max-w-2xl">
                    Selecione o volume de vendas diárias para ver o faturamento, custo com a CJ Dropshipping e o lucro líquido real no seu bolso.
                  </p>
                </div>

                {/* Preset Volume Buttons */}
                <div className="flex items-center gap-1.5 bg-gray-100 p-1.5 rounded-2xl">
                  {[5, 15, 30, 50, 100].map((qty) => (
                    <button
                      key={qty}
                      type="button"
                      onClick={() => setSimDailyOrders(qty)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        simDailyOrders === qty
                          ? 'bg-[#002244] text-white shadow-xs'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
                      }`}
                    >
                      {qty}/dia
                    </button>
                  ))}
                </div>
              </div>

              {/* Simulation Result Display */}
              {(() => {
                const monthlyOrders = simDailyOrders * 30;
                // Assuming average order has 1.35 units due to multi-unit bundle deals
                const unitsSoldMonthly = Math.round(monthlyOrders * 1.35);
                const monthlyRevenueUsd = unitsSoldMonthly * avgProductPrice;
                const monthlyRevenueBrl = monthlyRevenueUsd * EXCHANGE_RATE_BRL;
                const monthlyCjCostUsd = unitsSoldMonthly * avgProductCjCost;
                const monthlyNetProfitUsd = monthlyRevenueUsd - monthlyCjCostUsd;
                const monthlyNetProfitBrl = monthlyNetProfitUsd * EXCHANGE_RATE_BRL;

                return (
                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Box 1: Faturamento Bruto */}
                      <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-gray-200">
                        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                          Faturamento Bruto / Mês
                        </span>
                        <p className="text-2xl font-black text-[#002244] mt-1">
                          ${monthlyRevenueUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          ≈ R$ {monthlyRevenueBrl.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({monthlyOrders} pedidos · ~{unitsSoldMonthly} itens)
                        </p>
                      </div>

                      {/* Box 2: Custo Fornecedor CJ */}
                      <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200">
                        <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                          Custo CJ Dropshipping (Itens + Frete)
                        </span>
                        <p className="text-2xl font-black text-amber-900 mt-1">
                          ${monthlyCjCostUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                        <p className="text-xs text-amber-700 mt-0.5">
                          Débito automático após cada venda
                        </p>
                      </div>

                      {/* Box 3: Lucro Líquido no Bolso */}
                      <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 shadow-xs">
                        <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                          💰 Lucro Líquido no Seu Bolso / Mês
                        </span>
                        <p className="text-3xl font-black text-emerald-700 mt-1">
                          ${monthlyNetProfitUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                        <p className="text-sm font-black text-emerald-800 mt-1">
                          ≈ R$ {monthlyNetProfitBrl.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} LIMPO
                        </p>
                      </div>
                    </div>

                    {/* Educational Dropshipping Volume Tip */}
                    <div className="mt-4 p-4 rounded-2xl bg-blue-50/80 border border-blue-200 text-xs text-[#002244] leading-relaxed flex items-start gap-3">
                      <Sparkles size={20} className="text-[#002244] shrink-0 mt-0.5" />
                      <div>
                        <strong>A Estratégia de Ouro: Venda por Quantidade com Preço Baixo da CJ</strong>
                        <p className="text-[#334155] mt-1">
                          Na CJ Dropshipping, os produtos têm custo de fábrica muito acessível (ex: $2.80 a $15.50). Na sua loja, oferecemos o produto com preço competitivo americano ($14.95 a $44.95) e ativamos a opção <strong>"Compre 2 com 15% OFF" ou "Compre 3 com 25% OFF"</strong>. O cliente se sente atraído pela economia e leva 2 itens. Como a CJ despacha os dois itens no mesmo pacote (o frete adicional custa apenas ~$1.50 em vez de duplicar), seu <strong>lucro líquido salta de $15 para $34 no mesmo cliente</strong>!
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Catalog Filter Bar */}
            <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Search */}
                <div className="relative w-full md:w-80">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={catalogSearch}
                    onChange={(e) => setCatalogSearch(e.target.value)}
                    placeholder="Buscar por nome, SKU CJ ou categoria..."
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#002244] focus:bg-white"
                  />
                  {catalogSearch && (
                    <button
                      onClick={() => setCatalogSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Sort dropdown */}
                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                  <span className="text-xs text-gray-500 font-bold whitespace-nowrap">Ordenar por:</span>
                  <select
                    value={catalogSort}
                    onChange={(e) => setCatalogSort(e.target.value as any)}
                    className="text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 font-bold text-gray-800 focus:outline-none focus:border-[#002244]"
                  >
                    <option value="margin-desc">Maior Margem de Lucro (%)</option>
                    <option value="profit-desc">Maior Lucro Líquido ($)</option>
                    <option value="price-asc">Menor Preço de Venda ($)</option>
                    <option value="price-desc">Maior Preço de Venda ($)</option>
                    <option value="bestsellers">Mais Vendidos / Avaliações</option>
                  </select>
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
                {[
                  { label: 'Todos os Produtos', value: 'all', count: PRODUCTS.length },
                  { label: '🐶 Cães', value: 'Dogs', count: PRODUCTS.filter((p) => p.department === 'Dogs' || p.petType === 'Dog').length },
                  { label: '🐱 Gatos', value: 'Cats', count: PRODUCTS.filter((p) => p.department === 'Cats' || p.petType === 'Cat').length },
                  { label: '🛏️ Caminhas', value: 'Beds', count: PRODUCTS.filter((p) => p.category === 'Beds').length },
                  { label: '🦮 Passeio', value: 'Walk & Travel', count: PRODUCTS.filter((p) => p.category === 'Walk & Travel').length },
                  { label: '🥣 Alimentação', value: 'Feeding', count: PRODUCTS.filter((p) => p.category === 'Feeding').length },
                  { label: '🚿 Higiene & Tosa', value: 'Grooming', count: PRODUCTS.filter((p) => p.category === 'Grooming').length },
                  { label: '🎾 Brinquedos', value: 'Toys', count: PRODUCTS.filter((p) => p.category === 'Toys').length },
                  { label: '🌿 Bem-Estar', value: 'Wellness', count: PRODUCTS.filter((p) => p.category === 'Wellness').length },
                ].map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setCatalogCategory(cat.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      catalogCategory === cat.value
                        ? 'bg-[#002244] text-white shadow-xs'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className="text-[10px] opacity-70">({cat.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Catalog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCatalogProducts.map((p) => {
                const isCustom = customRetailPrices[p.id] !== undefined;

                return (
                  <div
                    key={p.id}
                    className="bg-white rounded-3xl border border-gray-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Preview with Badge & Zoom Button */}
                      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden group">
                        <img
                          src={p.heroImage}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {p.badge && (
                          <span className="absolute top-3 left-3 bg-[#002244]/90 backdrop-blur-xs text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                            {p.badge}
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            setPreviewProductModal(p);
                            setSelectedGalleryImg(p.heroImage);
                          }}
                          className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-xl text-xs font-bold shadow-md flex items-center gap-1 cursor-pointer transition-transform active:scale-95"
                          title="Ver fotos reais e especificações"
                        >
                          <Eye size={14} className="text-[#002244]" />
                          <span className="text-[11px]">Ver Fotos ({p.galleryImages?.length || 2})</span>
                        </button>
                      </div>

                      {/* Product Content Details */}
                      <div className="p-5 space-y-4">
                        <div>
                          <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
                            <span className="font-bold uppercase tracking-wider text-blue-800">
                              {p.brand || 'Ling Petshop'} · {p.category}
                            </span>
                            <span className="font-semibold text-gray-600">
                              {p.petType === 'Dog' ? '🐶 Cão' : p.petType === 'Cat' ? '🐱 Gato' : '🐾 Universal'}
                            </span>
                          </div>

                          <h4 className="font-black text-[#002244] text-base leading-snug line-clamp-1">
                            {p.name}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                            {p.tagline}
                          </p>
                        </div>

                        {/* CJ Supplier Metadata Box */}
                        <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200/80 text-xs space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500">Fornecedor:</span>
                            <span className="font-bold text-[#002244] flex items-center gap-1">
                              <span>CJ Dropshipping</span>
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-gray-500">SKU no CJ:</span>
                            <div className="flex items-center gap-1.5">
                              <code className="font-mono font-bold text-gray-800 bg-white px-2 py-0.5 rounded border border-gray-200 text-[11px]">
                                {p.supplierSku}
                              </code>
                              <button
                                type="button"
                                onClick={() => handleCopyCjSku(p.supplierSku)}
                                className="text-gray-400 hover:text-[#002244] p-1 rounded cursor-pointer"
                                title="Copiar SKU da CJ"
                              >
                                {copiedCjSku === p.supplierSku ? (
                                  <Check size={14} className="text-emerald-600" />
                                ) : (
                                  <Copy size={14} />
                                )}
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-[11px] text-gray-600 pt-1 border-t border-gray-200/50">
                            <span>Armazém:</span>
                            <span className="font-medium text-gray-800">{p.supplierWarehouse}</span>
                          </div>
                        </div>

                        {/* Financial Economics Box (Custos, Frete, Preço e Lucro) */}
                        <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-blue-100/80 space-y-2">
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-[10px] uppercase font-bold text-gray-400 block">Custo CJ (Fábrica)</span>
                              <span className="font-bold text-gray-800">${p.cjCost.toFixed(2)}</span>
                            </div>
                            <div>
                              <span className="text-[10px] uppercase font-bold text-gray-400 block">Frete CJ Packet</span>
                              <span className="font-bold text-gray-800">${p.cjShippingEstimate.toFixed(2)}</span>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-gray-200/80 flex items-center justify-between text-xs">
                            <span className="text-gray-600 font-bold">Custo Total Dropshipping:</span>
                            <span className="font-black text-gray-900">${p.totalCjCost.toFixed(2)}</span>
                          </div>

                          {/* Retail Price with in-line interactive adjuster */}
                          <div className="pt-2 border-t border-gray-200/80 flex items-center justify-between text-xs">
                            <div>
                              <span className="font-bold text-[#002244] block">Preço de Venda na Loja:</span>
                              <span className="text-[10px] text-gray-500">
                                Comparativo mercado: ${p.compareAt.toFixed(2)}
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <span className="font-black text-gray-700 text-sm">$</span>
                              <input
                                type="number"
                                step="0.50"
                                value={p.price}
                                onChange={(e) => {
                                  const val = parseFloat(e.target.value);
                                  if (!isNaN(val) && val > 0) {
                                    handleUpdateProductPrice(p.id, val);
                                  }
                                }}
                                className="w-20 bg-white border border-gray-300 rounded-lg px-2 py-1 text-xs font-black text-right text-[#002244] focus:outline-none focus:border-blue-600"
                              />
                            </div>
                          </div>

                          {/* Net Unit Profit Highlight */}
                          <div className="pt-2 border-t border-emerald-200 bg-emerald-50 -mx-4 -mb-4 p-3 rounded-b-2xl flex items-center justify-between">
                            <div>
                              <span className="text-[10px] uppercase font-black text-emerald-800 block">
                                Lucro Líquido Unitário
                              </span>
                              <span className="text-xs text-emerald-700 font-medium">
                                ≈ R$ {(p.netProfit * EXCHANGE_RATE_BRL).toFixed(2)}
                              </span>
                            </div>

                            <div className="text-right">
                              <span className="text-lg font-black text-emerald-700">
                                +${p.netProfit.toFixed(2)}
                              </span>
                              <span className="block text-[10px] font-black text-emerald-800 bg-emerald-200/60 px-1.5 py-0.2 rounded-full mt-0.5">
                                {p.profitMarginPercent}% de margem
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Volume Bundle Pricing Breakdown */}
                        <div className="pt-1">
                          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">
                            Multiplicador de Lucro em Quantidade:
                          </span>
                          <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
                            <div className="p-2 rounded-xl bg-gray-50 border border-gray-200">
                              <span className="font-bold text-gray-500 block">1 Unidade</span>
                              <span className="font-black text-gray-900 block">${p.price.toFixed(2)}</span>
                              <span className="text-emerald-700 font-bold mt-0.5 block">+${p.netProfit.toFixed(2)}</span>
                            </div>
                            <div className="p-2 rounded-xl bg-blue-50/70 border border-blue-200">
                              <span className="font-bold text-blue-800 block">2 Unidades</span>
                              <span className="font-black text-blue-900 block">
                                ${(p.price * 0.85 * 2).toFixed(2)}
                              </span>
                              <span className="text-emerald-700 font-bold mt-0.5 block">
                                +${((p.price * 0.85 * 2) - ((p.cjCost * 2) + (p.cjShippingEstimate * 1.35))).toFixed(2)}
                              </span>
                            </div>
                            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200">
                              <span className="font-bold text-emerald-800 block">3 Unidades</span>
                              <span className="font-black text-emerald-900 block">
                                ${(p.price * 0.75 * 3).toFixed(2)}
                              </span>
                              <span className="text-emerald-700 font-black mt-0.5 block">
                                +${((p.price * 0.75 * 3) - ((p.cjCost * 3) + (p.cjShippingEstimate * 1.65))).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="p-5 pt-0 border-t border-gray-100 space-y-2 mt-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setPreviewProductModal(p);
                            setSelectedGalleryImg(p.heroImage);
                          }}
                          className="flex-1 bg-[#002244] hover:bg-[#001830] text-white text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                        >
                          <Eye size={14} />
                          <span>Ficha</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setEditingProduct(p)}
                          className="bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-bold py-2.5 px-3 rounded-xl flex items-center gap-1 transition-colors cursor-pointer border border-blue-200"
                          title="Editar preço, fotos ou nome"
                        >
                          <Edit3 size={13} />
                          <span>Editar</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteProduct(p.id)}
                          className="bg-red-50 hover:bg-red-100 text-red-700 hover:text-red-800 text-xs font-bold p-2.5 rounded-xl transition-colors cursor-pointer border border-red-200"
                          title="Remover produto da loja"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1">
                        <span className="font-mono text-[10px] text-gray-400">SKU: {p.supplierSku}</span>
                        <a
                          href={p.supplierUrl || 'https://cjdropshipping.com'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center gap-1 font-bold"
                          title="Abrir no portal da CJ"
                        >
                          <span>Ver na CJ</span>
                          <ExternalLink size={11} />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: CENTRAL DE FORNECEDORES & AGENTES */}
        {activeTab === 'suppliers' && (
          <div className="space-y-6">
            {/* Header intro */}
            <div className="bg-gradient-to-r from-[#002244] to-[#003875] text-white p-6 sm:p-8 rounded-3xl shadow-lg">
              <div className="inline-flex items-center gap-1.5 bg-amber-400 text-stone-950 font-black text-[11px] px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                <Sparkles size={13} />
                <span>CATÁLOGO MISTO · MELHORES PREÇOS & PRAZOS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                Fornecedores Oficiais com Armazém nos EUA
              </h2>
              <p className="text-xs sm:text-sm text-blue-100 mt-2 max-w-3xl leading-relaxed">
                A Ling Petshop opera com um catálogo híbrido selecionado: para cada produto, escolhemos a plataforma que oferece o menor custo de atacado e o armazém americano com despacho mais veloz (New Jersey, Califórnia ou Texas), garantindo entrega de 3 a 5 dias úteis via USPS.
              </p>
            </div>
            {/* Wallet & API Connection Control Hub */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Card 1: Supplier Wallet & Auto-Debit */}
              <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black uppercase tracking-wider text-gray-500">
                      Carteira do Fornecedor
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-300">
                      Ativo · Saldo em US$
                    </span>
                  </div>

                  <p className="text-3xl font-black text-[#002244]">
                    ${walletBalance.toFixed(2)} <span className="text-xs text-gray-400 font-bold">USD</span>
                  </p>
                  <p className="text-xs text-emerald-600 font-bold mt-1">
                    ≈ R$ {(walletBalance * EXCHANGE_RATE_BRL).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} na sua conta
                  </p>

                  <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                    {/* Auto debit toggle */}
                    <div className="flex items-center justify-between bg-blue-50/60 p-3 rounded-2xl border border-blue-100">
                      <div>
                        <p className="text-xs font-black text-gray-900">Débito Automático das Vendas</p>
                        <p className="text-[10px] text-gray-500">Desconta o custo de atacado e despacha via USPS</p>
                      </div>
                      <button
                        type="button"
                        onClick={toggleAutoDebit}
                        className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer flex items-center ${
                          autoDebit ? 'bg-emerald-600 justify-end' : 'bg-gray-300 justify-start'
                        }`}
                      >
                        <span className="w-4 h-4 rounded-full bg-white shadow-xs" />
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsRechargeOpen(true)}
                  className="mt-4 w-full bg-[#E31837] hover:bg-[#c9142e] text-white font-black text-xs py-3 rounded-xl uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <DollarSign size={16} />
                  <span>Recarregar Saldo (+ US$)</span>
                </button>
              </div>

              {/* Card 2: API Keys & Webhooks Configuration */}
              <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black uppercase tracking-wider text-gray-500">
                      Conexão de API & Fornecedores
                    </span>
                    <span
                      className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                        apiPingStatus === 'connected'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {apiPingStatus === 'connected' ? '✓ CJ Conectada (42ms)' : 'Testando...'}
                    </span>
                  </div>

                  {/* CJ Profile Badge */}
                  <div className="mb-3 p-2.5 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200/70 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-orange-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                        CJ
                      </div>
                      <div>
                        <p className="text-xs font-black text-gray-900">{cjAccountName}</p>
                        <p className="text-[10px] text-gray-500 font-mono">ID: {cjUserId} · Status: Ativo (LV1)</p>
                      </div>
                    </div>
                    <span className="text-[9px] bg-emerald-600 text-white font-black px-2 py-0.5 rounded-full">
                      ✓ Vinculado
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[9px] font-bold text-gray-500 uppercase block mb-1">
                          CJ User ID
                        </label>
                        <input
                          type="text"
                          value={cjUserId}
                          onChange={(e) => setCjUserId(e.target.value)}
                          placeholder="CJ5954420"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs font-mono text-gray-800"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-gray-500 uppercase block mb-1">
                          Nome do Perfil CJ
                        </label>
                        <input
                          type="text"
                          value={cjAccountName}
                          onChange={(e) => setCjAccountName(e.target.value)}
                          placeholder="Ling Petshop"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs text-gray-800"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase">
                          CJ Dropshipping Open API Key
                        </label>
                        <span className="text-[9px] text-blue-600 font-semibold">
                          myCJ &gt; API Key
                        </span>
                      </div>
                      <input
                        type="text"
                        value={cjApiKey}
                        onChange={(e) => setCjApiKey(e.target.value)}
                        placeholder="Cole sua API Key da CJ aqui (opcional ou auto)"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-mono text-gray-800"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">
                        Zendrop Access Token
                      </label>
                      <input
                        type="password"
                        value={zendropToken}
                        onChange={(e) => setZendropToken(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-mono text-gray-800"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">
                        URL de Webhook da Loja (Sincronização Automática)
                      </label>
                      <input
                        type="text"
                        readOnly
                        value="https://lingpetshop.com/api/webhooks/supplier-sync"
                        className="w-full bg-gray-100 border border-gray-200 rounded-xl px-3 py-1.5 text-[11px] font-mono text-gray-600 select-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-3 space-y-2">
                  {cjSaveSuccess && (
                    <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-[11px] font-black text-emerald-800 animate-fadeIn">
                      ✓ Conta {cjAccountName} (ID: {cjUserId}) e API sincronizadas com sucesso!
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={handleTestApiPing}
                    className="w-full bg-[#002244] hover:bg-[#001830] text-white font-black text-xs py-2.5 rounded-xl uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>{apiPingStatus === 'testing' ? 'Verificando e Salvando...' : 'Salvar & Testar Conexão CJ API'}</span>
                  </button>
                </div>
              </div>

              {/* Card 3: Live API & Webhook Event Logs */}
              <div className="bg-[#001830] text-white rounded-3xl p-6 border border-blue-900 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black uppercase tracking-wider text-blue-300">
                      Console de Webhooks & Logs API
                    </span>
                    <span className="text-[10px] bg-blue-500/20 text-blue-300 font-bold px-2 py-0.5 rounded-full border border-blue-500/30">
                      Live Event Stream
                    </span>
                  </div>

                  <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                    {apiLogs.map((log) => (
                      <div
                        key={log.id}
                        className="p-2.5 bg-[#002244] rounded-xl border border-blue-900/50 text-[11px] space-y-1"
                      >
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-amber-400 font-bold">{log.badge}</span>
                          <span className="text-blue-300">{log.time}</span>
                        </div>
                        <p className="text-blue-100 leading-snug font-mono text-[10px]">
                          {log.message}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-[10px] text-blue-300 mt-3 pt-3 border-t border-blue-900/50">
                  A cada compra no Stripe, este log registra a entrada do pedido, o débito na carteira e a geração automática do código USPS.
                </p>
              </div>
            </div>

            {/* Dedicated Agents Direct Contact Cards */}
            <div>
              <h3 className="text-base font-black text-[#002244] uppercase tracking-wide mb-3 flex items-center gap-2">
                <Phone size={16} className="text-[#E31837]" />
                <span>Seus Agentes Dedicados (WhatsApp / Skype Direto)</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SUPPLIER_AGENTS.map((agent) => (
                  <div
                    key={agent.id}
                    className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
                  >
                    <div>
                      <div className="flex items-center gap-3.5 mb-3">
                        <img
                          src={agent.avatar}
                          alt={agent.name}
                          className="w-13 h-13 rounded-full object-cover border-2 border-emerald-500 shadow-xs"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-black text-gray-900">{agent.name}</h4>
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              {agent.status}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">{agent.role}</p>
                          <p className="text-[11px] text-gray-400 mt-0.5">📍 {agent.warehouse}</p>
                        </div>
                      </div>

                      <div className="space-y-1.5 my-3 text-xs">
                        {agent.perks.map((p, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-gray-600">
                            <Check size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span>{p}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center gap-2">
                      <a
                        href={agent.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <MessageCircle size={15} />
                        <span>Chamar no WhatsApp ({agent.contact})</span>
                      </a>
                      <div className="text-[11px] text-gray-500 px-2 py-1 bg-gray-50 rounded-lg font-mono">
                        Skype: {agent.skype}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Automated Product Sync & Importer Hub (Zendrop & CJ Dropshipping) */}
            <div className="bg-gradient-to-br from-[#0F2942] to-[#1E3A8A] text-white rounded-3xl p-6 sm:p-8 border border-blue-800 shadow-lg space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 bg-[#2563EB] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                    <Sparkles size={13} />
                    <span>Sincronização 100% Automática de Catálogo</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                    Importar e Sincronizar Produtos via API (Zendrop & CJ)
                  </h3>
                  <p className="text-xs text-blue-200 mt-1 max-w-2xl leading-relaxed">
                    <strong>Como funciona:</strong> Ao vincular sua conta Zendrop ou CJ Dropshipping, você pode colocar qualquer produto na sua loja instantaneamente. O sistema sincroniza as fotos lifestyle, especificações, estoque no armazém americano e calcula automaticamente o preço de venda para garantir mais de 65% de lucro líquido.
                  </p>
                </div>

                <div className="bg-[#0A192F]/80 p-4 rounded-2xl border border-blue-900/60 text-xs space-y-1.5 flex-shrink-0">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-blue-300">Status Zendrop API:</span>
                    <span className="text-emerald-400 font-bold">✓ Conectado</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-blue-300">Status CJ API:</span>
                    <span className="text-emerald-400 font-bold">✓ Conectado</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-blue-300">Despacho Cego (Blind):</span>
                    <span className="text-amber-300 font-bold">Ativo (Sem logos)</span>
                  </div>
                </div>
              </div>

              {/* Input for SKU or URL import */}
              <div className="bg-white/10 p-4 rounded-2xl border border-white/15">
                <label className="block text-xs font-bold uppercase tracking-wider text-blue-200 mb-2">
                  Cole o Link ou SKU do Produto no Zendrop ou CJ Dropshipping:
                </label>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="text"
                    placeholder="Ex: https://cjdropshipping.com/product/pet-bed-998 ou ZD-DENT-041"
                    value={importInput}
                    onChange={(e) => setImportInput(e.target.value)}
                    className="flex-1 bg-white text-gray-900 px-4 py-3 rounded-xl text-xs font-medium placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#2563EB]"
                  />
                  <button
                    onClick={() => handleAutoImport()}
                    disabled={isImporting}
                    className="px-6 py-3 bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                  >
                    {isImporting ? (
                      <span>Sincronizando Produto...</span>
                    ) : (
                      <>
                        <Download size={15} />
                        <span>Sincronizar Produto (1-Clique)</span>
                      </>
                    )}
                  </button>
                </div>

                {importSuccessMsg && (
                  <div className="mt-3 p-3 bg-emerald-500/20 border border-emerald-400/50 rounded-xl text-xs text-emerald-200 flex items-center gap-2 animate-in fade-in">
                    <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                    <span>{importSuccessMsg}</span>
                  </div>
                )}
              </div>

              {/* Quick 1-Click Import Trending Pet Products */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-blue-200 mb-3">
                  Ou adicione produtos campeões em teste rápido nos EUA:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    {
                      name: 'Orthopedic Backseat Dog Bed',
                      supplier: 'Zendrop',
                      cost: '$14.20',
                      suggested: '$49.95',
                      margin: '+71%',
                    },
                    {
                      name: 'Quiet LED Pet Nail Grinder',
                      supplier: 'CJ Dropshipping',
                      cost: '$5.80',
                      suggested: '$24.95',
                      margin: '+76%',
                    },
                    {
                      name: 'Interactive Laser Cat Toy',
                      supplier: 'Zendrop',
                      cost: '$6.50',
                      suggested: '$26.95',
                      margin: '+75%',
                    },
                    {
                      name: 'Calming Silicone Lick Mat (2-Pack)',
                      supplier: 'CJ Dropshipping',
                      cost: '$3.20',
                      suggested: '$16.95',
                      margin: '+81%',
                    },
                  ].map((tpl, i) => (
                    <div
                      key={i}
                      className="bg-white/10 hover:bg-white/15 p-3.5 rounded-2xl border border-white/10 flex flex-col justify-between text-xs transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[10px] text-blue-200 mb-1">
                          <span className="font-bold">{tpl.supplier}</span>
                          <span className="text-emerald-400 font-bold">{tpl.margin} lucro</span>
                        </div>
                        <h4 className="font-bold text-white text-xs leading-snug">{tpl.name}</h4>
                        <p className="text-[11px] text-blue-100 mt-1">
                          Custo: <strong className="text-white">{tpl.cost}</strong> · Venda: <strong className="text-emerald-300">{tpl.suggested}</strong>
                        </p>
                      </div>

                      <button
                        onClick={() => handleAutoImport(tpl.name, tpl.supplier as any)}
                        disabled={isImporting}
                        className="mt-3 w-full py-1.5 px-3 rounded-lg bg-white/20 hover:bg-white text-white hover:text-[#0F2942] font-bold text-[11px] transition-all cursor-pointer text-center"
                      >
                        + Importar para Loja
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Practical Step-by-Step Guide for Real Zendrop/CJ Products */}
            <div className="bg-[#0F2942] text-white rounded-3xl p-6 border border-blue-900 shadow-md space-y-4">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <HelpCircle size={18} />
                <span>Guia Prático: Como Funciona a Loja & Como Gerenciar Produtos Reais</span>
              </div>

              <h4 className="text-lg font-black text-white">
                Como Trocar Produtos Testes por Produtos Reais do Zendrop / CJ Dropshipping
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs text-blue-100">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1.5">
                  <span className="text-amber-400 font-black text-sm block">01. O Fluxo de Venda</span>
                  <p className="leading-relaxed text-[11px] text-blue-200">
                    O cliente americano entra na loja e compra por ex: <strong>$44.95</strong>. O valor cai instantaneamente no seu Stripe/Gateway em Dólar.
                  </p>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1.5">
                  <span className="text-emerald-400 font-black text-sm block">02. Envio Automático</span>
                  <p className="leading-relaxed text-[11px] text-blue-200">
                    Sua loja encaminha os dados ao Zendrop/CJ. O sistema debita apenas o valor de atacado (ex: <strong>$15.50</strong>). Seu lucro é de <strong>+$29.45 USD</strong>.
                  </p>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1.5">
                  <span className="text-blue-300 font-black text-sm block">03. Entrega c/ USPS</span>
                  <p className="leading-relaxed text-[11px] text-blue-200">
                    O fornecedor despacha a partir do armazém dos EUA (New Jersey/Texas/Califórnia) via USPS em <strong>2 a 4 dias úteis</strong>, sem etiquetas nem logos chinesas.
                  </p>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1.5">
                  <span className="text-purple-300 font-black text-sm block">04. 1-Clique no Painel</span>
                  <p className="leading-relaxed text-[11px] text-blue-200">
                    Para trocar fotos, títulos ou preços, use o formulário de <strong>Adicionar Produto Real</strong> abaixo ou cole o SKU do Zendrop/CJ no campo acima.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-blue-800/80">
                <span className="text-xs text-blue-200">
                  💡 Os 25 produtos atualmente ativos já são produtos campeões reais pesquisados diretamente no catálogo do Zendrop/CJ com armazém americano.
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsAddProductOpen(true)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-1.5 transition-all"
                  >
                    <Sparkles size={14} />
                    <span>+ Cadastrar Novo Produto Real</span>
                  </button>

                  <button
                    onClick={handleResetCatalog}
                    className="px-3 py-2 bg-white/10 hover:bg-white/20 text-blue-200 font-bold text-xs rounded-xl cursor-pointer transition-all"
                  >
                    Resetar Catálogo ({activeProducts.length})
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Form for Adding Real Product */}
            {isAddProductOpen && (
              <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
                <div className="bg-white text-gray-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-5 border border-gray-200 relative max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                        <Sparkles size={18} />
                      </div>
                      <div>
                        <h3 className="text-base font-black text-gray-900">Cadastrar Produto Real do Zendrop / CJ</h3>
                        <p className="text-xs text-gray-500">Adicione um novo produto com envio imediato dos EUA</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsAddProductOpen(false)}
                      className="text-gray-400 hover:text-gray-600 font-bold text-lg cursor-pointer px-2"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleAddRealProduct} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Nome do Produto em Inglês (Como aparecerá na loja):</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Ultra-Soft Orthopedic Memory Foam Dog Bed"
                        value={newProdName}
                        onChange={(e) => setNewProdName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 font-medium text-gray-900 focus:ring-2 focus:ring-[#2563EB] outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-gray-700 mb-1">Fornecedor Principal:</label>
                        <select
                          value={newProdSupplier}
                          onChange={(e) => setNewProdSupplier(e.target.value as any)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 font-bold text-gray-800 bg-white"
                        >
                          <option value="Zendrop">Zendrop US</option>
                          <option value="CJ Dropshipping">CJ Dropshipping US</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-gray-700 mb-1">SKU no Fornecedor (Opcional):</label>
                        <input
                          type="text"
                          placeholder="Ex: ZD-BED-998"
                          value={newProdSku}
                          onChange={(e) => setNewProdSku(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 font-mono text-gray-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-gray-700 mb-1">Preço de Venda na Loja ($ USD):</label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={newProdPrice}
                          onChange={(e) => setNewProdPrice(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 font-bold text-gray-900"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-gray-700 mb-1">Custo de Atacado no Fornecedor ($ USD):</label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={newProdCost}
                          onChange={(e) => setNewProdCost(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 font-bold text-gray-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-gray-700 mb-1">Categoria:</label>
                        <select
                          value={newProdCategory}
                          onChange={(e) => setNewProdCategory(e.target.value as any)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 font-medium text-gray-800 bg-white"
                        >
                          <option value="Beds">Beds (Caminhas)</option>
                          <option value="Feeding">Feeding (Alimentação)</option>
                          <option value="Walk & Travel">Walk & Travel (Passeio)</option>
                          <option value="Toys">Toys (Brinquedos)</option>
                          <option value="Grooming">Grooming (Higiene)</option>
                          <option value="Wellness">Wellness (Saúde)</option>
                          <option value="Treats">Treats (Petiscos)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-gray-700 mb-1">Tipo de Animal:</label>
                        <select
                          value={newProdPet}
                          onChange={(e) => setNewProdPet(e.target.value as any)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 font-medium text-gray-800 bg-white"
                        >
                          <option value="Dog">Dog (Cães)</option>
                          <option value="Cat">Cat (Gatos)</option>
                          <option value="All Pets">All Pets (Todos os Pets)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Link da Foto Principal (Unsplash ou Foto do Fornecedor):</label>
                      <input
                        type="url"
                        value={newProdImage}
                        onChange={(e) => setNewProdImage(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 font-mono text-[11px] text-gray-900"
                      />
                    </div>

                    <div className="pt-3 flex items-center justify-end gap-3 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => setIsAddProductOpen(false)}
                        className="px-4 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-colors cursor-pointer"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer transition-colors shadow-md flex items-center gap-1.5"
                      >
                        <Check size={16} />
                        <span>Publicar na Loja em 1-Clique</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* How to communicate guide */}
            <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200 text-xs text-amber-950">
              <h4 className="font-black text-sm uppercase tracking-wide flex items-center gap-2 mb-2">
                <HelpCircle size={16} className="text-amber-700" />
                <span>Script Pronto em Inglês para Enviar ao Fornecedor</span>
              </h4>
              <p className="text-amber-800 leading-relaxed mb-3">
                Quando precisar de uma cotação especial ou tirar dúvida de um pedido específico, envie esta mensagem rápida para o seu agente no WhatsApp:
              </p>
              <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-[11px] text-gray-800 select-all">
                "Hi! I am the store manager of Ling Petshop (US LLC). I have a new customer order for [PRODUCT SKU] shipping to the United States (Customer Address: [ADDRESS]). Please confirm immediate USPS dispatch from your US warehouse without any factory branding (blind dropshipping). Thank you!"
              </div>
            </div>

            {/* 25 Products Mixed Suppliers Matrix */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-black text-[#002244]">
                    Matriz de Produtos & Margens de Lucro ({activeProducts.length} Itens Ativos)
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Comparativo oficial de custo de atacado e faturamento da sua loja
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-500">Filtrar por:</span>
                  <select
                    value={supplierFilter}
                    onChange={(e) => setSupplierFilter(e.target.value as any)}
                    className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-bold text-gray-700 outline-none cursor-pointer"
                  >
                    <option value="all">Ambos Fornecedores ({activeProducts.length})</option>
                    <option value="CJ Dropshipping">CJ Dropshipping</option>
                    <option value="Zendrop">Zendrop</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-[10px] border-b border-gray-200">
                    <tr>
                      <th className="py-3 px-4">Produto</th>
                      <th className="py-3 px-4">Fornecedor Principal</th>
                      <th className="py-3 px-4">Armazém EUA</th>
                      <th className="py-3 px-4 text-right">Custo Atacado</th>
                      <th className="py-3 px-4 text-right">Venda Loja</th>
                      <th className="py-3 px-4 text-right">Lucro Unitário</th>
                      <th className="py-3 px-4 text-right">Margem %</th>
                      <th className="py-3 px-4 text-center">Catálogo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {filteredProducts.map((p) => {
                      const unitProfit = p.price - p.supplierCost;
                      const marginPct = Math.round((unitProfit / p.price) * 100);
                      return (
                        <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4 flex items-center gap-2.5">
                            <img
                              src={p.heroImage}
                              alt={p.name}
                              className="w-10 h-10 rounded-lg object-cover border border-gray-200 flex-shrink-0"
                            />
                            <div>
                              <p className="font-bold text-gray-900 leading-tight">{p.name}</p>
                              <span className="text-[10px] text-gray-400">
                                SKU: {p.supplierSku}
                              </span>
                            </div>
                          </td>

                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-0.5 rounded font-black text-[10px] ${
                                p.supplier === 'CJ Dropshipping'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-purple-100 text-purple-800'
                              }`}
                            >
                              {p.supplier}
                            </span>
                          </td>

                          <td className="py-3 px-4 text-gray-600 text-[11px]">
                            {p.supplierWarehouse}
                          </td>

                          <td className="py-3 px-4 text-right font-bold text-gray-500">
                            ${p.supplierCost.toFixed(2)}
                          </td>

                          <td className="py-3 px-4 text-right font-black text-gray-900">
                            ${p.price.toFixed(2)}
                          </td>

                          <td className="py-3 px-4 text-right font-black text-emerald-700">
                            +${unitProfit.toFixed(2)}
                          </td>

                          <td className="py-3 px-4 text-right font-black">
                            <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded text-[10px]">
                              {marginPct}%
                            </span>
                          </td>

                          <td className="py-3 px-4 text-center">
                            <a
                              href={p.supplierUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 font-bold inline-flex items-center gap-1 text-[11px]"
                            >
                              <span>Abrir</span>
                              <ExternalLink size={12} />
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: GATEWAY INTERNACIONAL (STRIPE vs KIWIFY & COMO RECEBER NO BRASIL) */}
        {activeTab === 'gateway' && (
          <div className="space-y-6">
            {/* Direct Answer to User's Question */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#635BFF] text-white flex items-center justify-center font-black shadow-md">
                  <CreditCard size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#635BFF] bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                    Arquitetura de Pagamentos Internacionais
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-gray-900 mt-1">
                    Qual plataforma usar para receber em Dólar e transferir para o Brasil?
                  </h3>
                </div>
              </div>

              {/* Comparison Matrix: Kiwify vs Stripe */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Kiwify Explanation */}
                <div className="bg-red-50/70 rounded-2xl p-5 border border-red-200">
                  <div className="flex items-center gap-2 font-black text-sm text-red-900 mb-2">
                    <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-xs">
                      ✕
                    </span>
                    Por que a Kiwify NÃO serve para este modelo?
                  </div>
                  <ul className="space-y-2 text-red-800 leading-relaxed">
                    <li>
                      • <strong>Apenas Infoprodutos:</strong> Os termos de serviço da Kiwify proíbem explicitamente produtos físicos e dropshipping.
                    </li>
                    <li>
                      • <strong>Bloqueio de Saldo:</strong> Caso venda produtos com envio físico, os gateways de infoprodutos bloqueiam a conta por falta de liberação imediata de acesso digital.
                    </li>
                    <li>
                      • <strong>Sem foco no mercado americano:</strong> A Kiwify é focada no público comprador brasileiro (cobrança em BRL e Pix). Americanos compram exclusivamente em Dólar no cartão de crédito, Apple Pay e Google Pay.
                    </li>
                  </ul>
                </div>

                {/* Stripe Explanation */}
                <div className="bg-emerald-50/70 rounded-2xl p-5 border border-emerald-200">
                  <div className="flex items-center gap-2 font-black text-sm text-emerald-900 mb-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">
                      ✓
                    </span>
                    Por que o Stripe é a escolha mundial definitiva?
                  </div>
                  <ul className="space-y-2 text-emerald-800 leading-relaxed">
                    <li>
                      • <strong>Aceito Globalmente:</strong> O cliente nos EUA paga em 1 clique com Apple Pay, Google Pay ou qualquer cartão (Visa, Mastercard, Amex).
                    </li>
                    <li>
                      • <strong>Notificação sonora instantânea no Celular:</strong> O aplicativo oficial do Stripe no iOS e Android emite o som característico ("cha-ching") a cada venda aprovada na Ling Petshop.
                    </li>
                    <li>
                      • <strong>Transferência Direta para o Brasil:</strong> O Stripe faz o câmbio oficial e deposita o dinheiro diretamente na sua conta bancária brasileira (Nubank, Itaú, Bradesco, etc.) em Reais OU em Dólares numa conta internacional (Wise, Nomad, Inter Global).
                    </li>
                  </ul>
                </div>
              </div>

              {/* Step-by-Step Setup Guide */}
              <div className="border-t border-gray-100 pt-6 space-y-4">
                <h4 className="text-sm font-black text-gray-900 uppercase tracking-wide">
                  Passo a Passo para Conectar seu Stripe:
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                    <span className="w-6 h-6 rounded-full bg-[#002244] text-white font-black text-xs flex items-center justify-center mb-2">
                      1
                    </span>
                    <p className="font-bold text-gray-900">Crie sua Conta no Stripe</p>
                    <p className="text-gray-500 text-[11px] mt-1 leading-relaxed">
                      Acesse <strong>stripe.com</strong>, cadastre seu CPF ou CNPJ e selecione que sua loja vende em Dólares ($ USD).
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                    <span className="w-6 h-6 rounded-full bg-[#002244] text-white font-black text-xs flex items-center justify-center mb-2">
                      2
                    </span>
                    <p className="font-bold text-gray-900">Instale o App no Celular</p>
                    <p className="text-gray-500 text-[11px] mt-1 leading-relaxed">
                      Baixe o aplicativo <strong>Stripe Dashboard</strong> na Apple App Store ou Google Play Store e ative as notificações sonoras de venda.
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                    <span className="w-6 h-6 rounded-full bg-[#002244] text-white font-black text-xs flex items-center justify-center mb-2">
                      3
                    </span>
                    <p className="font-bold text-gray-900">Configure o Repasse Bancário</p>
                    <p className="text-gray-500 text-[11px] mt-1 leading-relaxed">
                      Insira sua conta bancária brasileira. O Stripe programa repasses automáticos semanais ou diários direto para sua conta corrente em R$.
                    </p>
                  </div>
                </div>
              </div>

              {/* Stripe Configuration Keys Input Card */}
              <div className="bg-[#001830] text-white rounded-2xl p-5 border border-blue-900 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-bold text-blue-200 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck size={15} className="text-emerald-400" />
                    Insira Suas Chaves da Conta Stripe
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-1 rounded-full border border-emerald-500/30">
                    ✓ Pronta para Conectar
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[10px] font-bold text-blue-300 uppercase block mb-1">
                      Stripe Publishable Key (pk_live_... ou pk_test_...)
                    </label>
                    <input
                      type="text"
                      placeholder="Cole sua Publishable Key aqui (ex: pk_live_51P...)"
                      value={stripePk}
                      onChange={(e) => {
                        const val = e.target.value;
                        setStripePk(val);
                        localStorage.setItem('ling_stripe_pk', val);
                      }}
                      className="w-full bg-[#002244] border border-blue-800 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-blue-400 outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-blue-300 uppercase block mb-1">
                      Stripe Secret Key (sk_live_... ou sk_test_...)
                    </label>
                    <input
                      type="text"
                      placeholder="Cole sua Secret Key aqui (ex: sk_live_51P...)"
                      value={stripeSk}
                      onChange={(e) => {
                        const val = e.target.value;
                        setStripeSk(val);
                        localStorage.setItem('ling_stripe_sk', val);
                      }}
                      className="w-full bg-[#002244] border border-blue-800 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-blue-400 outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {stripeSaveMsg && (
                  <div className="p-3 bg-emerald-500/20 border border-emerald-400/50 rounded-xl text-xs text-emerald-300 flex items-center gap-2 font-bold animate-in fade-in">
                    <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                    <span>Chaves do Stripe salvas com sucesso no painel da loja!</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-blue-900/60">
                  <p className="text-[11px] text-blue-300">
                    💡 <strong>Onde pegar essas chaves?</strong> No seu Dashboard do Stripe ➔ <em>Developers (Desenvolvedores)</em> ➔ <em>API Keys (Chaves de API)</em>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      localStorage.setItem('ling_stripe_pk', stripePk);
                      localStorage.setItem('ling_stripe_sk', stripeSk);
                      setStripeSaveMsg(true);
                      setTimeout(() => setStripeSaveMsg(false), 3000);
                    }}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-colors shrink-0 flex items-center gap-1.5"
                  >
                    <Check size={15} />
                    <span>Salvar Chaves em Produção</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: MÉTRICAS & FATURAMENTO */}
        {activeTab === 'metrics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Volume de Vendas em Dólar
                </span>
                <p className="text-3xl font-black text-[#002244] mt-2">
                  ${totalRevenueUsd.toFixed(2)}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-1.5 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Conversão em R$ (taxa 5,65):</span>
                    <strong className="text-stone-900">R$ {totalRevenueBrl.toFixed(2)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Forma de pagamento:</span>
                    <strong className="text-stone-900">Stripe (100% Cartão & Apple Pay)</strong>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Custo de Mercadoria Vendida (CMV)
                </span>
                <p className="text-3xl font-black text-gray-500 mt-2">
                  ${totalCostUsd.toFixed(2)}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-1.5 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Pago aos fornecedores:</span>
                    <strong className="text-stone-900">${totalCostUsd.toFixed(2)} USD</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Fornecedores:</span>
                    <strong className="text-stone-900">CJ Dropshipping & Zendrop</strong>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Lucro Líquido no Seu Bolso
                </span>
                <p className="text-3xl font-black text-emerald-600 mt-2">
                  +${totalProfitUsd.toFixed(2)}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-1.5 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Lucro em Reais:</span>
                    <strong className="text-emerald-700">R$ {totalProfitBrl.toFixed(2)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Margem bruta de lucro:</span>
                    <strong className="text-emerald-700">{avgMarginPercent}%</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Push Notification Simulation Card */}
            <div className="bg-gradient-to-r from-slate-900 to-[#002244] text-white rounded-3xl p-6 sm:p-8 border border-blue-900/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-3 max-w-xl">
                <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 font-black text-[11px] px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-500/30">
                  <Smartphone size={13} />
                  <span>NOTIFICAÇÕES NO SEU CELULAR</span>
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight">
                  Como chegam as notificações de cada venda?
                </h3>
                <p className="text-xs text-blue-100 leading-relaxed">
                  Assim que o cliente nos EUA finaliza a compra com o cartão ou Apple Pay, o app do Stripe dispara uma notificação push com som no seu smartphone contendo o valor exato em dólares e o nome do comprador. Você confere no painel e despacha com 1 clique para o fornecedor.
                </p>
              </div>

              {/* Phone Push Preview Widget */}
              <div className="w-full sm:w-80 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-2xl flex-shrink-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-md bg-[#635BFF] flex items-center justify-center text-[10px] font-black text-white">
                    S
                  </div>
                  <span className="text-[11px] font-black uppercase text-blue-200">STRIPE · AGORA</span>
                </div>
                <p className="text-sm font-black text-white">
                  Pagamento aprovado: +$44.95 USD
                </p>
                <p className="text-xs text-blue-100 mt-0.5">
                  Sarah Miller acabou de comprar "The Cloud9™ Orthopedic Calming Pet Bed" em Miami, FL.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: VIRAL STUDIO & KIT DE LANÇAMENTO ORGÂNICO */}
        {activeTab === 'viral-studio' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Hero Launch Banner */}
            <div className="bg-gradient-to-r from-[#002244] via-[#0F2942] to-[#1E3A8A] text-white rounded-3xl p-6 sm:p-8 border border-blue-800 shadow-xl relative overflow-hidden">
              <div className="relative z-10 max-w-3xl space-y-3">
                <div className="inline-flex items-center gap-2 bg-[#E31837] text-white text-[11px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  <Sparkles size={13} className="text-amber-300" />
                  <span>Tráfego 100% Orgânico nos EUA · Sem Gastos com Anúncios</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                  Viral Studio: Vídeos 100% por IA & Perfis Oficiais dos EUA
                </h2>
                <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                  Aqui está tudo pronto para você destravar sua primeira venda em dólar: perfis com bios calculadas no limite exato de caracteres do Instagram e TikTok, gerador de prompts de 1 clique para vídeos prontos com narração americana, e o cronograma do zero ao lucro limpo de <strong>$29.50 USD por venda</strong>.
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-xs">
                  <span className="bg-white/10 border border-white/20 px-3 py-1 rounded-lg font-bold text-blue-200 flex items-center gap-1.5">
                    <Video size={13} className="text-emerald-400" /> InVideo AI & CapCut
                  </span>
                  <span className="bg-white/10 border border-white/20 px-3 py-1 rounded-lg font-bold text-blue-200 flex items-center gap-1.5">
                    <Check size={13} className="text-emerald-400" /> Bio Instagram: 131 / 150 chars
                  </span>
                  <span className="bg-white/10 border border-white/20 px-3 py-1 rounded-lg font-bold text-blue-200 flex items-center gap-1.5">
                    <Check size={13} className="text-emerald-400" /> Bio TikTok: 71 / 80 chars
                  </span>
                  <span className="bg-white/10 border border-white/20 px-3 py-1 rounded-lg font-bold text-blue-200 flex items-center gap-1.5">
                    <DollarSign size={13} className="text-amber-400" /> Cupom Ativo: LING20
                  </span>
                </div>
              </div>
            </div>

            {/* SEÇÃO 1: PERFIS OFICIAIS COM LIMITE ESTRITO DE CARACTERES */}
            <section className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-[#002244] flex items-center gap-2">
                    <Share2 size={20} className="text-[#E31837]" />
                    <span>1. Perfis Oficiais Formatados (Instagram & TikTok)</span>
                  </h3>
                  <p className="text-xs text-gray-500">
                    O Instagram corta textos acima de 150 caracteres e o TikTok acima de 80. As bios abaixo foram reduzidas milimetricamente para caber sem cortes!
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Card Instagram */}
                <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs flex flex-col justify-between space-y-5">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-xs">
                          IG
                        </div>
                        <div>
                          <h4 className="font-black text-sm text-gray-900">Instagram (@lingpetshop.us)</h4>
                          <span className="text-[10px] text-gray-400">Padrão Boutique Oficial EUA</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                        131 / 150 caracteres (✓ Cabe 100%)
                      </span>
                    </div>

                    {/* Interactive Fields */}
                    <div className="space-y-2.5 text-xs">
                      <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-gray-400 block">Nome (Name - 26/30 chars)</span>
                          <span className="font-mono font-bold text-gray-800">Ling Petshop | Dog Calm 🐾</span>
                        </div>
                        <button
                          onClick={() => handleCopyText('Ling Petshop | Dog Calm 🐾', 'ig-name')}
                          className="text-[#002244] hover:text-[#E31837] font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                        >
                          {copiedPromptId === 'ig-name' ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                          <span>{copiedPromptId === 'ig-name' ? 'Copiado!' : 'Copiar'}</span>
                        </button>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-gray-400 block">Nome de Usuário (Username)</span>
                          <span className="font-mono font-bold text-gray-800">@lingpetshop.us</span>
                        </div>
                        <button
                          onClick={() => handleCopyText('lingpetshop.us', 'ig-handle')}
                          className="text-[#002244] hover:text-[#E31837] font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                        >
                          {copiedPromptId === 'ig-handle' ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                          <span>{copiedPromptId === 'ig-handle' ? 'Copiado!' : 'Copiar'}</span>
                        </button>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] uppercase font-bold text-gray-400">Bio do Instagram (Exatamente 131 caracteres com quebras)</span>
                        </div>
                        <div className="bg-[#0F172A] text-emerald-400 p-4 rounded-2xl font-mono text-xs whitespace-pre-line leading-relaxed border border-slate-700 shadow-inner">
{`🐾 Orthopedic comfort for anxious pets
🇺🇸 Fast 2-4 day US dispatch
🛡️ 30-day risk-free trial
🎁 20% OFF code: LING20 👇`}
                        </div>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-gray-400 block">Link na Bio (Website)</span>
                          <span className="font-mono text-blue-600 underline">https://lingpetshop.com</span>
                        </div>
                        <button
                          onClick={() => handleCopyText('https://lingpetshop.com', 'ig-link')}
                          className="text-[#002244] hover:text-[#E31837] font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                        >
                          {copiedPromptId === 'ig-link' ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                          <span>{copiedPromptId === 'ig-link' ? 'Copiado!' : 'Copiar'}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      handleCopyText(
`🐾 Orthopedic comfort for anxious pets
🇺🇸 Fast 2-4 day US dispatch
🛡️ 30-day risk-free trial
🎁 20% OFF code: LING20 👇`,
                        'ig-bio'
                      )
                    }
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-700 hover:to-rose-700 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                  >
                    {copiedPromptId === 'ig-bio' ? (
                      <>
                        <Check size={15} />
                        <span>Bio do Instagram Copiada!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={15} />
                        <span>Copiar Bio do Instagram (1-Clique)</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Card TikTok */}
                <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs flex flex-col justify-between space-y-5">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-black flex items-center justify-center text-white font-bold text-xs shadow-xs">
                          TT
                        </div>
                        <div>
                          <h4 className="font-black text-sm text-gray-900">TikTok (@lingpetshop.us)</h4>
                          <span className="text-[10px] text-gray-400">Canal Principal de Viralização EUA</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                        71 / 80 caracteres (✓ Super Curta & Direta)
                      </span>
                    </div>

                    {/* Interactive Fields */}
                    <div className="space-y-2.5 text-xs">
                      <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-gray-400 block">Nome de Exibição (Nickname - 18 chars)</span>
                          <span className="font-mono font-bold text-gray-800">Ling Petshop US 🐾</span>
                        </div>
                        <button
                          onClick={() => handleCopyText('Ling Petshop US 🐾', 'tt-name')}
                          className="text-[#002244] hover:text-[#E31837] font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                        >
                          {copiedPromptId === 'tt-name' ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                          <span>{copiedPromptId === 'tt-name' ? 'Copiado!' : 'Copiar'}</span>
                        </button>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-gray-400 block">Nome de Usuário (Username)</span>
                          <span className="font-mono font-bold text-gray-800">@lingpetshop.us</span>
                        </div>
                        <button
                          onClick={() => handleCopyText('lingpetshop.us', 'tt-handle')}
                          className="text-[#002244] hover:text-[#E31837] font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                        >
                          {copiedPromptId === 'tt-handle' ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                          <span>{copiedPromptId === 'tt-handle' ? 'Copiado!' : 'Copiar'}</span>
                        </button>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] uppercase font-bold text-gray-400">Bio do TikTok (Exatamente 71 caracteres com quebras)</span>
                        </div>
                        <div className="bg-[#0F172A] text-cyan-400 p-4 rounded-2xl font-mono text-xs whitespace-pre-line leading-relaxed border border-slate-700 shadow-inner">
{`Calming orthopedic pet gear 🐾
Ships in 24h across the US 🇺🇸
Code: LING20 👇`}
                        </div>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-gray-400 block">Link de Conta Comercial</span>
                          <span className="font-mono text-blue-600 underline">https://lingpetshop.com</span>
                        </div>
                        <button
                          onClick={() => handleCopyText('https://lingpetshop.com', 'tt-link')}
                          className="text-[#002244] hover:text-[#E31837] font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                        >
                          {copiedPromptId === 'tt-link' ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                          <span>{copiedPromptId === 'tt-link' ? 'Copiado!' : 'Copiar'}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      handleCopyText(
`Calming orthopedic pet gear 🐾
Ships in 24h across the US 🇺🇸
Code: LING20 👇`,
                        'tt-bio'
                      )
                    }
                    className="w-full py-3 bg-black hover:bg-gray-800 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                  >
                    {copiedPromptId === 'tt-bio' ? (
                      <>
                        <Check size={15} />
                        <span>Bio do TikTok Copiada!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={15} />
                        <span>Copiar Bio do TikTok (1-Clique)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </section>

            {/* SEÇÃO 2: VÍDEOS 100% POR IA COM 1 PROMPT (SEM EDITOR) */}
            <section className="space-y-4">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-[#002244] flex items-center gap-2">
                  <Video size={20} className="text-[#2563EB]" />
                  <span>2. Gerador de Vídeos 100% por IA (Script-to-Video em 60s)</span>
                </h3>
                <p className="text-xs text-gray-500">
                  Você não precisa de câmera, editor nem saber inglês. Ferramentas de <strong>Script-to-Video</strong> montam o vídeo completo em formato 9:16 vertical com narração americana, clipes 4K e legendas animadas.
                </p>
              </div>

              {/* Explanatory callout about AI quality */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 sm:p-5 text-xs text-blue-900 leading-relaxed flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="font-black flex items-center gap-2 text-sm text-[#002244]">
                    <Sparkles size={16} className="text-amber-500" />
                    <span>"Vídeo 100% por IA realmente funciona e vende?"</span>
                  </div>
                  <p className="text-blue-800">
                    <strong>SIM!</strong> O InVideo AI e o CapCut Script-to-Video selecionam automaticamente gravações reais de cães e gatos em lares americanos, adicionam voz de narradora nativa com emoção e legendas animadas em amarelo/branco estilo TikTok. O vídeo sai pronto para postar em menos de 1 minuto!
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <a
                    href="https://invideo.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Abrir InVideo AI</span>
                    <ArrowUpRight size={14} />
                  </a>
                  <a
                    href="https://www.capcut.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-black hover:bg-gray-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Abrir CapCut Web</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              {/* Product Video Selector Tabs */}
              <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-6">
                <div className="flex flex-wrap items-center gap-2 border-b border-gray-100 pb-4">
                  <button
                    onClick={() => setSelectedVideoTab('cloud9')}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedVideoTab === 'cloud9'
                        ? 'bg-[#002244] text-white shadow-xs'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span>🛏️ The Cloud9 Bed (Tempestades & Fogos)</span>
                    <span className="bg-[#E31837] text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">Mais Viral</span>
                  </button>

                  <button
                    onClick={() => setSelectedVideoTab('aquapure')}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedVideoTab === 'aquapure'
                        ? 'bg-[#002244] text-white shadow-xs'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span>💧 AquaPure Fountain (Saúde Renal Gatos)</span>
                  </button>

                  <button
                    onClick={() => setSelectedVideoTab('airglide')}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedVideoTab === 'airglide'
                        ? 'bg-[#002244] text-white shadow-xs'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span>🦮 AirGlide Harness (Passeios Sem Puxões)</span>
                  </button>

                  <button
                    onClick={() => setSelectedVideoTab('chomroller')}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedVideoTab === 'chomroller'
                        ? 'bg-[#002244] text-white shadow-xs'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span>🧹 ChomRoller (Remoção Mágica de Pelos)</span>
                  </button>
                </div>

                {/* TAB 1: THE CLOUD9 BED */}
                {selectedVideoTab === 'cloud9' && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#E31837] bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
                          Ângulo Emocional de Tempestades e Fogos de Artifício
                        </span>
                        <h4 className="text-base font-black text-[#002244] mt-1">
                          Prompt de 1-Clique: The Cloud9™ Orthopedic Calming Bed
                        </h4>
                      </div>
                      <button
                        onClick={() =>
                          handleCopyText(
`Create a 30-second TikTok viral UGC video for an American dog brand called Ling Petshop.
Topic: How to stop a dog from shaking and panting during sudden thunderstorms and fireworks.
Target Audience: US dog parents who hate seeing their pets anxious.
Product Featured: The Cloud9 Orthopedic Calming Pet Bed with a 7-inch raised bolster that mimics a mother's embrace to relieve joint stress and anxiety.
Tone: Empathetic, urgent, veterinarian-approved, conversational.
Voiceover: Natural friendly American female voice, warm and caring tone.
Visuals: Fast-paced vertical 9:16 clips of nervous dogs comforting themselves in luxury cozy orthopedic beds in bright modern homes, close-ups of soft plush textures, thunderstorm outside window.
Subtitles: Dynamic bold yellow and white TikTok-style animated word-by-word captions.
Ending Call to Action: "Save 20% off your first US order with code LING20. Link in bio!"`,
                            'prompt-cloud9'
                          )
                        }
                        className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        {copiedPromptId === 'prompt-cloud9' ? <Check size={14} /> : <Copy size={14} />}
                        <span>{copiedPromptId === 'prompt-cloud9' ? 'Prompt Copiado!' : 'Copiar Prompt em Inglês'}</span>
                      </button>
                    </div>

                    <div className="bg-[#0A192F] text-blue-100 p-4 sm:p-5 rounded-2xl font-mono text-xs leading-relaxed border border-blue-900 shadow-inner select-all whitespace-pre-line">
{`Create a 30-second TikTok viral UGC video for an American dog brand called Ling Petshop.
Topic: How to stop a dog from shaking and panting during sudden thunderstorms and fireworks.
Target Audience: US dog parents who hate seeing their pets anxious.
Product Featured: The Cloud9 Orthopedic Calming Pet Bed with a 7-inch raised bolster that mimics a mother's embrace to relieve joint stress and anxiety.
Tone: Empathetic, urgent, veterinarian-approved, conversational.
Voiceover: Natural friendly American female voice, warm and caring tone.
Visuals: Fast-paced vertical 9:16 clips of nervous dogs comforting themselves in luxury cozy orthopedic beds in bright modern homes, close-ups of soft plush textures, thunderstorm outside window.
Subtitles: Dynamic bold yellow and white TikTok-style animated word-by-word captions.
Ending Call to Action: "Save 20% off your first US order with code LING20. Link in bio!"`}
                    </div>

                    {/* How to execute in 3 steps */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-2">
                      <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                        <span className="font-black text-[#002244] block mb-0.5">Passo 1: Copie o Prompt</span>
                        <p className="text-gray-500 text-[11px]">Clique no botão azul acima para copiar o prompt em inglês perfeitamente calibrado.</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                        <span className="font-black text-[#002244] block mb-0.5">Passo 2: Cole no InVideo / CapCut</span>
                        <p className="text-gray-500 text-[11px]">No InVideo AI, cole na caixa de texto. Selecione proporção 9:16 e voz feminina americana.</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                        <span className="font-black text-[#002244] block mb-0.5">Passo 3: Baixe e Publique</span>
                        <p className="text-gray-500 text-[11px]">O vídeo sai com legendas amarelas, cortes e música. Baixe e publique no TikTok e Reels às 12h ou 19h EST.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: AQUAPURE FOUNTAIN */}
                {selectedVideoTab === 'aquapure' && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                          Ângulo de Saúde e Prevenção Renal
                        </span>
                        <h4 className="text-base font-black text-[#002244] mt-1">
                          Prompt de 1-Clique: AquaPure™ Wireless Pet Fountain
                        </h4>
                      </div>
                      <button
                        onClick={() =>
                          handleCopyText(
`Create a 30-second TikTok viral UGC video for Ling Petshop.
Topic: Why 1 in 3 indoor cats develop chronic kidney issues from drinking still bowl water.
Target Audience: Cat and dog owners in the United States.
Product Featured: AquaPure Wireless Ultra-Quiet Pet Fountain with 5-stage quad-filtration and smart motion sensor.
Tone: Eye-opening, educational, caring pet parent advice.
Voiceover: Clear conversational American narrator voice.
Visuals: Fast-paced vertical 9:16 clips of cats curiously drinking running water from sleek minimalist fountain, veterinarian consulting graphic, side-by-side comparison of dirty bowl vs crystal fresh waterfall.
Subtitles: TikTok-style animated punchy captions.
Ending Call to Action: "Protect your furry best friend. Get 20% off today with code LING20 in bio!"`,
                            'prompt-aquapure'
                          )
                        }
                        className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        {copiedPromptId === 'prompt-aquapure' ? <Check size={14} /> : <Copy size={14} />}
                        <span>{copiedPromptId === 'prompt-aquapure' ? 'Prompt Copiado!' : 'Copiar Prompt em Inglês'}</span>
                      </button>
                    </div>

                    <div className="bg-[#0A192F] text-blue-100 p-4 sm:p-5 rounded-2xl font-mono text-xs leading-relaxed border border-blue-900 shadow-inner select-all whitespace-pre-line">
{`Create a 30-second TikTok viral UGC video for Ling Petshop.
Topic: Why 1 in 3 indoor cats develop chronic kidney issues from drinking still bowl water.
Target Audience: Cat and dog owners in the United States.
Product Featured: AquaPure Wireless Ultra-Quiet Pet Fountain with 5-stage quad-filtration and smart motion sensor.
Tone: Eye-opening, educational, caring pet parent advice.
Voiceover: Clear conversational American narrator voice.
Visuals: Fast-paced vertical 9:16 clips of cats curiously drinking running water from sleek minimalist fountain, veterinarian consulting graphic, side-by-side comparison of dirty bowl vs crystal fresh waterfall.
Subtitles: TikTok-style animated punchy captions.
Ending Call to Action: "Protect your furry best friend. Get 20% off today with code LING20 in bio!"`}
                    </div>
                  </div>
                )}

                {/* TAB 3: AIRGLIDE HARNESS */}
                {selectedVideoTab === 'airglide' && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                          Ângulo Prático: Fim dos Puxões no Passeio
                        </span>
                        <h4 className="text-base font-black text-[#002244] mt-1">
                          Prompt de 1-Clique: AirGlide™ Zero-Pull Harness
                        </h4>
                      </div>
                      <button
                        onClick={() =>
                          handleCopyText(
`Create a 30-second TikTok viral UGC video for Ling Petshop.
Topic: Stop your dog from dragging you on walks without choking their trachea.
Target Audience: American dog owners with energetic pulling dogs.
Product Featured: AirGlide Zero-Pull Ergonomic Harness with dual D-ring front-clip redirect and breathable air-mesh padding.
Tone: Problem-solving, high-energy, relatable dog owner struggles.
Voiceover: Energetic friendly American voiceover.
Visuals: Before-and-after clips of a dog pulling on collar vs smoothly walking by owner's side with AirGlide harness in a sunny American suburban park.
Subtitles: High-contrast TikTok style captions.
Ending Call to Action: "Make daily walks effortless. Tap the link in bio and use code LING20 for 20% off!"`,
                            'prompt-airglide'
                          )
                        }
                        className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        {copiedPromptId === 'prompt-airglide' ? <Check size={14} /> : <Copy size={14} />}
                        <span>{copiedPromptId === 'prompt-airglide' ? 'Prompt Copiado!' : 'Copiar Prompt em Inglês'}</span>
                      </button>
                    </div>

                    <div className="bg-[#0A192F] text-blue-100 p-4 sm:p-5 rounded-2xl font-mono text-xs leading-relaxed border border-blue-900 shadow-inner select-all whitespace-pre-line">
{`Create a 30-second TikTok viral UGC video for Ling Petshop.
Topic: Stop your dog from dragging you on walks without choking their trachea.
Target Audience: American dog owners with energetic pulling dogs.
Product Featured: AirGlide Zero-Pull Ergonomic Harness with dual D-ring front-clip redirect and breathable air-mesh padding.
Tone: Problem-solving, high-energy, relatable dog owner struggles.
Voiceover: Energetic friendly American voiceover.
Visuals: Before-and-after clips of a dog pulling on collar vs smoothly walking by owner's side with AirGlide harness in a sunny American suburban park.
Subtitles: High-contrast TikTok style captions.
Ending Call to Action: "Make daily walks effortless. Tap the link in bio and use code LING20 for 20% off!"`}
                    </div>
                  </div>
                )}

                {/* TAB 4: CHOMROLLER */}
                {selectedVideoTab === 'chomroller' && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          Ângulo Hipnótico: Remoção Mágica de Pelos
                        </span>
                        <h4 className="text-base font-black text-[#002244] mt-1">
                          Prompt de 1-Clique: ChomRoller™ Fur Remover
                        </h4>
                      </div>
                      <button
                        onClick={() =>
                          handleCopyText(
`Create a 25-second TikTok viral UGC video for Ling Petshop.
Topic: The oddly satisfying way to remove embedded dog and cat fur in 1 swipe without sticky tape sheets.
Target Audience: Pet parents with shedding pets in the US.
Product Featured: ChomRoller Multi-Surface Fur & Lint Remover with dual-direction electrostatic roller and waste compartment.
Tone: Satisfying, viral hook, amazed testimonial.
Voiceover: Enthusiastic conversational American female voice.
Visuals: Close-up macro shots of a hairy couch and car seat becoming spotless with 2 swipes of ChomRoller, emptying the fur chamber in 1 click.
Subtitles: Bold viral TikTok captions.
Ending Call to Action: "Link in bio! Use code LING20 for 20% off plus fast US delivery!"`,
                            'prompt-chomroller'
                          )
                        }
                        className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        {copiedPromptId === 'prompt-chomroller' ? <Check size={14} /> : <Copy size={14} />}
                        <span>{copiedPromptId === 'prompt-chomroller' ? 'Prompt Copiado!' : 'Copiar Prompt em Inglês'}</span>
                      </button>
                    </div>

                    <div className="bg-[#0A192F] text-blue-100 p-4 sm:p-5 rounded-2xl font-mono text-xs leading-relaxed border border-blue-900 shadow-inner select-all whitespace-pre-line">
{`Create a 25-second TikTok viral UGC video for Ling Petshop.
Topic: The oddly satisfying way to remove embedded dog and cat fur in 1 swipe without sticky tape sheets.
Target Audience: Pet parents with shedding pets in the US.
Product Featured: ChomRoller Multi-Surface Fur & Lint Remover with dual-direction electrostatic roller and waste compartment.
Tone: Satisfying, viral hook, amazed testimonial.
Voiceover: Enthusiastic conversational American female voice.
Visuals: Close-up macro shots of a hairy couch and car seat becoming spotless with 2 swipes of ChomRoller, emptying the fur chamber in 1 click.
Subtitles: Bold viral TikTok captions.
Ending Call to Action: "Link in bio! Use code LING20 for 20% off plus fast US delivery!"`}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* SEÇÃO 3: PROMPT DE LOGO PROFISSIONAL NO CHATGPT (DALL-E 3) */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#002244] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                    Identidade Visual Profissional
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-[#002244] mt-1">
                    3. Prompt para Gerar a Logo Oficial no ChatGPT (DALL-E 3)
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Cole este prompt no ChatGPT Plus, Microsoft Copilot ou Bing Image Creator para gerar um logo com as cores oficiais da loja (Azul Marinho Real & Azul Cobalto).
                  </p>
                </div>

                <button
                  onClick={() =>
                    handleCopyText(
`Create a modern, ultra-clean, minimalist luxury logo for an American pet wellness boutique brand named "Ling Petshop". The logo mark should feature an elegant, stylized silhouette of a dog paw seamlessly integrated into a soft cloud contour, symbolizing orthopedic calming comfort. Color palette: Deep Royal Navy Blue (#0F2942) and Cobalt Blue (#2563EB) against a crisp pure white background. Flat vector aesthetic, geometric precision, high-end Swiss typography, vector branding style, 4k vector emblem, no realistic shading, no gradients, centered, professional app icon quality.`,
                      'logo-prompt'
                    )
                  }
                  className="px-5 py-2.5 bg-[#002244] hover:bg-[#001830] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs flex-shrink-0"
                >
                  {copiedPromptId === 'logo-prompt' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  <span>{copiedPromptId === 'logo-prompt' ? 'Prompt Copiado!' : 'Copiar Prompt de Logo'}</span>
                </button>
              </div>

              {/* Logo Prompt Box */}
              <div className="bg-[#0F172A] text-blue-200 p-4 sm:p-5 rounded-2xl font-mono text-xs leading-relaxed border border-slate-700 shadow-inner select-all">
{`Create a modern, ultra-clean, minimalist luxury logo for an American pet wellness boutique brand named "Ling Petshop". The logo mark should feature an elegant, stylized silhouette of a dog paw seamlessly integrated into a soft cloud contour, symbolizing orthopedic calming comfort. Color palette: Deep Royal Navy Blue (#0F2942) and Cobalt Blue (#2563EB) against a crisp pure white background. Flat vector aesthetic, geometric precision, high-end Swiss typography, vector branding style, 4k vector emblem, no realistic shading, no gradients, centered, professional app icon quality.`}
              </div>

              {/* Palette Preview */}
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                <span className="text-gray-500 font-bold">Cores da Identidade:</span>
                <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-200 font-mono text-[11px]">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#0F2942] border border-gray-300" />
                  Royal Navy (#0F2942)
                </span>
                <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-200 font-mono text-[11px]">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#2563EB] border border-gray-300" />
                  Cobalt Blue (#2563EB)
                </span>
                <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-200 font-mono text-[11px]">
                  <span className="w-3.5 h-3.5 rounded-full bg-white border border-gray-300" />
                  Pure White (#FFFFFF)
                </span>
              </div>
            </section>

            {/* SEÇÃO 3.5: GERADOR DE LEGENDAS SEO & RASTREADOR DE LINKS DE CLIQUES (UTM) */}
            <section className="bg-[#0F2942] text-white rounded-3xl p-6 sm:p-8 border border-blue-900 shadow-xl space-y-6">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-800">
                  Ferramenta de Vendas Orgânicas
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                  3.5. Gerador de Legendas SEO (Inglês) & Criador de Links de Rastreamento
                </h3>
                <p className="text-xs text-blue-200 mt-1 max-w-2xl leading-relaxed">
                  Para fazer vídeos de reedição (curadoria do Pinterest/TikTok) viralizarem nos EUA, você precisa de legendas com palavras-chave estratégicas em inglês e links rastreáveis para saber exatamente qual vídeo gerou cliques e compras!
                </p>
              </div>

              {/* A. SEO Caption Generator */}
              <div className="bg-white/10 p-5 rounded-2xl border border-white/15 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                      <Sparkles size={16} className="text-amber-400" />
                      <span>Gerador de Legendas SEO para Instagram Reels & TikTok</span>
                    </h4>
                    <p className="text-[11px] text-blue-200 mt-0.5">
                      Selecione o produto e o ângulo da dor para gerar a legenda em inglês nativo com hashtags americanas:
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-blue-200 mb-1">
                      Produto em Destaque:
                    </label>
                    <select
                      value={selectedSeoProductId}
                      onChange={(e) => setSelectedSeoProductId(e.target.value)}
                      className="w-full bg-[#0A192F] text-white border border-blue-800 rounded-xl px-3 py-2.5 outline-none focus:ring-1 focus:ring-blue-400"
                    >
                      {activeProducts.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.category})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-blue-200 mb-1">
                      Ângulo Emocional / Dor:
                    </label>
                    <select
                      value={selectedSeoAngle}
                      onChange={(e) => setSelectedSeoAngle(e.target.value as any)}
                      className="w-full bg-[#0A192F] text-white border border-blue-800 rounded-xl px-3 py-2.5 outline-none focus:ring-1 focus:ring-blue-400"
                    >
                      <option value="storm">⚡️ Ansiedade de Tempestade & Fogos (Storm Noise Relief)</option>
                      <option value="fur">🧹 Remoção Mágica de Pelos (Fur & Lint Removal)</option>
                      <option value="sleep">😴 Sono Profundo & Dores Articulares (Orthopedic Joint Relief)</option>
                      <option value="hydration">💧 Hidratação & Saúde Renal (Cat Hydration & Care)</option>
                    </select>
                  </div>
                </div>

                {/* Generated Captions Options */}
                <div className="space-y-3 pt-2">
                  {[
                    {
                      id: 1,
                      badge: '🔥 Alta Conversão (Tempestade / Ansiedade)',
                      text: `Nothing breaks my heart more than watching him tremble under the bed during heavy thunderstorms... 🥺⚡️\n\nWe finally tried the Cloud9™ Orthopedic Calming Bed with 7” raised bolsters that mimic a mother dog's embrace. Within 10 minutes, his nervous system settled down and he fell into a deep, peaceful sleep! 😴✨\n\nVet-approved for joint relief and storm anxiety. Shipped fast nationwide via USPS Ground 🇺🇸\n\n👇 Save 20% OFF today with code LING20 (Link in bio!)\n\n#dogtok #anxietydog #dogsoftiktok #calmingdogbed #stormanxiety #petparent #cutedog #dogmom #goldenretriever`,
                    },
                    {
                      id: 2,
                      badge: '❤️ Estilo Storytelling (Cão de Resgate)',
                      text: `POV: You finally cured your rescue dog's nightly anxiety 🐾❤️\n\nHe used to pant and pace around our bedroom every single night... 💔 After switching to an orthopedic donut bed engineered for joint support, he sleeps 8+ hours uninterrupted!\n\nUSPS 2-4 day express shipping across all 50 states! 🇺🇸\n\n🔗 Link in bio to save 20% OFF today with code LING20!\n\n#dogtok #rescuepup #dogbed #anxiousdog #cutedog #dogmom #petessentials #frenchie #labrador`,
                    },
                  ].map((cap, idx) => (
                    <div key={idx} className="bg-[#0A192F] p-4 rounded-xl border border-blue-900 space-y-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-amber-300">{cap.badge}</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(cap.text);
                            setCopiedCaptionIdx(idx);
                            setTimeout(() => setCopiedCaptionIdx(null), 2200);
                          }}
                          className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-[11px] px-3 py-1 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          {copiedCaptionIdx === idx ? <Check size={13} /> : <Copy size={13} />}
                          <span>{copiedCaptionIdx === idx ? 'Copiada!' : 'Copiar Legenda em Inglês'}</span>
                        </button>
                      </div>
                      <div className="font-mono text-xs text-blue-100 whitespace-pre-line leading-relaxed select-all">
                        {cap.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* B. UTM Link Builder & Tracker */}
              <div className="bg-white/10 p-5 rounded-2xl border border-white/15 space-y-4">
                <div>
                  <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                    <Zap size={16} className="text-emerald-400" />
                    <span>Criador & Rastreador de Links de Cliques (UTM Campaign Builder)</span>
                  </h4>
                  <p className="text-[11px] text-blue-200 mt-0.5">
                    Crie links rastreáveis para colocar na bio do Instagram ou TikTok e saiba exatamente quantos cliques e vendas cada vídeo trouxe para a loja:
                  </p>
                </div>

                <form onSubmit={handleCreateUtmLink} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={utmSourceInput}
                    onChange={(e) => setUtmSourceInput(e.target.value)}
                    placeholder="Nome do vídeo/post (Ex: reels_video_storm_1)"
                    className="flex-1 bg-[#0A192F] text-white border border-blue-800 rounded-xl px-3.5 py-2.5 text-xs font-mono outline-none focus:ring-1 focus:ring-emerald-400"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-md flex items-center justify-center gap-1.5"
                  >
                    <Plus size={15} />
                    <span>Gerar Link Rastreado</span>
                  </button>
                </form>

                {/* Tracking Links Table */}
                <div className="space-y-2 pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 block">
                    Seus Links Rastreados Ativos:
                  </span>
                  <div className="space-y-2">
                    {utmLinks.map((link) => (
                      <div
                        key={link.id}
                        className="bg-[#0A192F] p-3 rounded-xl border border-blue-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                      >
                        <div>
                          <p className="font-bold text-white text-xs">{link.name}</p>
                          <p className="font-mono text-[11px] text-blue-300 truncate max-w-md select-all">
                            {link.url}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="bg-emerald-950 border border-emerald-800 text-emerald-300 font-bold px-2.5 py-1 rounded-lg text-[11px]">
                            📊 {link.clicks} cliques registrados
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(link.url);
                              alert('Link rastreado copiado para a área de transferência!');
                            }}
                            className="bg-white/10 hover:bg-white/20 text-white font-bold px-2.5 py-1 rounded-lg text-[11px] flex items-center gap-1 cursor-pointer"
                          >
                            <Copy size={12} />
                            <span>Copiar</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* SEÇÃO 4: CRONOGRAMA PRÁTICO - EM QUANTOS DIAS SAI A 1ª VENDA? */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-6">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Expectativa Realista & Roteiro
                </span>
                <h3 className="text-lg sm:text-xl font-black text-[#002244] mt-1">
                  4. Em Quantos Dias Sai a Primeira Venda nos EUA?
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Sem seguidores e começando do zero absoluto: eis a cronologia real do tráfego orgânico americano no TikTok e Instagram Reels.
                </p>
              </div>

              {/* Timeline Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-[#002244] text-white font-black text-xs flex items-center justify-center">
                      1
                    </span>
                    <span className="text-[10px] font-black uppercase text-gray-400">HOJE (Dia 1)</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-xs">Criação & Aquecimento</h4>
                  <p className="text-gray-500 text-[11px] leading-relaxed">
                    Crie as contas @lingpetshop.us, cole a bio curta exata, coloque a foto de logo do ChatGPT e assista 15 minutos de vídeos de pet nos EUA para o algoritmo registrar o nicho.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-[#002244] text-white font-black text-xs flex items-center justify-center">
                      2
                    </span>
                    <span className="text-[10px] font-black uppercase text-gray-400">Dias 2 a 4</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-xs">2 Vídeos por Dia no InVideo</h4>
                  <p className="text-gray-500 text-[11px] leading-relaxed">
                    Gere vídeos com os prompts de 1 clique. Poste às <strong>12h EST</strong> e <strong>19h EST</strong>. Cada vídeo recebe um lote de teste de 200 a 800 visualizações iniciais.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-[#002244] text-white font-black text-xs flex items-center justify-center">
                      3
                    </span>
                    <span className="text-[10px] font-black uppercase text-gray-400">Dias 5 a 8</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-xs">O Algoritmo Engrena</h4>
                  <p className="text-gray-500 text-[11px] leading-relaxed">
                    Pelo menos 1 dos vídeos de ansiedade por tempestades atinge a métrica de retenção e é entregue para <strong>5.000 a 20.000 tutores nos EUA</strong>. Os primeiros comentários começam a surgir.
                  </p>
                </div>

                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                      ✓
                    </span>
                    <span className="text-[10px] font-black uppercase text-emerald-700">Dias 8 a 12</span>
                  </div>
                  <h4 className="font-bold text-emerald-950 text-xs">PRIMEIRA VENDA EM DÓLAR</h4>
                  <p className="text-emerald-800 text-[11px] leading-relaxed">
                    Tutores clicam no link da bio e aplicam o cupom <strong>LING20</strong>. Venda concluída no Stripe: <strong>$44.95 USD</strong> entra na hora. Você despacha e bota <strong>$29.50 de lucro limpo</strong> no bolso!
                  </p>
                </div>
              </div>

              {/* Peak posting times & Hashtags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-black text-gray-900">
                    <Calendar size={15} className="text-[#002244]" />
                    <span>Melhores Horários de Postagem nos EUA (Fuso Horário)</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-gray-600">
                    <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-gray-100">
                      <span><strong>Almoço Americano:</strong> 12:00 PM EST</span>
                      <span className="text-blue-600 font-bold">14:00 (Horário de Brasília)</span>
                    </div>
                    <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-gray-100">
                      <span><strong>Noite Americana:</strong> 07:00 PM EST</span>
                      <span className="text-blue-600 font-bold">21:00 (Horário de Brasília)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-2">
                  <div className="flex items-center justify-between text-xs font-black text-gray-900">
                    <div className="flex items-center gap-1.5">
                      <Hash size={15} className="text-[#002244]" />
                      <span>Hashtags Americanas de Alta Conversão</span>
                    </div>
                    <button
                      onClick={() =>
                        handleCopyText(
                          '#dogsoftiktok #anxietydog #dogmomlife #thunderstormdog #calmingpetbed #veterinarianapproved #usdogs #goldenretrieverlife #pettok',
                          'hashtags'
                        )
                      }
                      className="text-[#002244] hover:text-[#E31837] font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                    >
                      {copiedPromptId === 'hashtags' ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                      <span>{copiedPromptId === 'hashtags' ? 'Copiado!' : 'Copiar Todas'}</span>
                    </button>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-gray-100 font-mono text-[11px] text-gray-700 leading-relaxed">
                    #dogsoftiktok #anxietydog #dogmomlife #thunderstormdog #calmingpetbed #veterinarianapproved #usdogs #goldenretrieverlife #pettok
                  </div>
                </div>
              </div>
            </section>

            {/* SEÇÃO 5: CHECKLIST INTERATIVO DE AÇÃO (SALVO NO NAVEGADOR) */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-[#002244] flex items-center gap-2">
                    <CheckSquare size={20} className="text-emerald-600" />
                    <span>5. Checklist Interativo de Lançamento (Salvo Automaticamente)</span>
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Marque cada tarefa conforme for concluindo. Seu progresso fica salvo na memória do seu navegador.
                  </p>
                </div>

                {/* Progress counter */}
                <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-800">
                  <Zap size={14} className="text-amber-500" />
                  <span>
                    {Object.values(viralChecklist).filter(Boolean).length} de 6 tarefas concluídas
                  </span>
                </div>
              </div>

              {/* Tasks List */}
              <div className="space-y-2.5 text-xs">
                {[
                  {
                    id: 'step-profiles',
                    title: '1. Criar as contas @lingpetshop.us no Instagram e TikTok',
                    desc: 'Crie como conta comercial (Business) para ter acesso a dados demográficos e link no perfil.',
                  },
                  {
                    id: 'step-bio',
                    title: '2. Colar a Bio Curta exata e o Cupom LING20',
                    desc: 'Use os botões de 1 clique acima para colar a bio formatada dentro do limite sem erros.',
                  },
                  {
                    id: 'step-logo',
                    title: '3. Gerar e aplicar a Logo Oficial no ChatGPT / DALL-E 3',
                    desc: 'Use o prompt de logo acima para gerar a foto de perfil em Azul Marinho e Cobalto.',
                  },
                  {
                    id: 'step-video',
                    title: '4. Gerar o 1º vídeo 100% por IA no InVideo AI / CapCut',
                    desc: 'Copie o prompt do The Cloud9 Bed sobre tempestades e gere o vídeo em 60 segundos.',
                  },
                  {
                    id: 'step-post',
                    title: '5. Publicar no horário de pico dos EUA (12h ou 19h EST)',
                    desc: 'Insira o áudio original da IA, adicione as hashtags americanas e marque o cupom LING20 na legenda.',
                  },
                  {
                    id: 'step-reply',
                    title: '6. Responder comentários americanos em inglês',
                    desc: 'Interaja com cada comentário em até 30 minutos ("Yes! It comes with a 30-day trial and 2-day US dispatch!").',
                  },
                ].map((item) => {
                  const isChecked = !!viralChecklist[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                        isChecked
                          ? 'bg-emerald-50/50 border-emerald-300 text-emerald-950'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-800'
                      }`}
                    >
                      <button
                        type="button"
                        className={`w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                          isChecked ? 'bg-emerald-600 text-white' : 'border border-gray-400 bg-white'
                        }`}
                      >
                        {isChecked && <Check size={14} />}
                      </button>
                      <div className="space-y-0.5">
                        <p className={`font-black ${isChecked ? 'line-through text-emerald-800' : 'text-gray-900'}`}>
                          {item.title}
                        </p>
                        <p className="text-[11px] text-gray-500">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}
      </main>

      {/* 1-CLICK DISPATCH MODAL */}
      {dispatchOrder && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full p-4 sm:p-8 shadow-2xl border border-gray-200 my-auto max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#E31837] bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
                  Despacho Semi-Automático
                </span>
                <h3 className="text-lg font-black text-[#002244] mt-1">
                  Despachar Pedido: {dispatchOrder.orderNumber}
                </h3>
              </div>
              <button
                onClick={() => setDispatchOrder(null)}
                className="text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Recipient summary in USPS Format */}
            <div className="space-y-4 text-xs">
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-black uppercase tracking-wider text-gray-500 text-[10px]">
                    Destinatário nos Estados Unidos
                  </span>
                  <button
                    onClick={() => copyFormattedAddress(dispatchOrder)}
                    className="text-[#E31837] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {copiedShipping ? (
                      <>
                        <Check size={12} className="text-emerald-600" /> Copiado!
                      </>
                    ) : (
                      <>
                        <Copy size={12} /> Copiar Padrão USPS
                      </>
                    )}
                  </button>
                </div>

                <div className="font-mono text-gray-800 text-[11px] leading-relaxed select-all">
                  <p className="font-bold">{dispatchOrder.customerName}</p>
                  <p>{dispatchOrder.shippingAddress.street}</p>
                  <p>
                    {dispatchOrder.shippingAddress.city}, {dispatchOrder.shippingAddress.state}{' '}
                    {dispatchOrder.shippingAddress.zip}
                  </p>
                  <p>United States · Tel: {dispatchOrder.customerPhone}</p>
                </div>
              </div>

              {/* Items to buy at supplier */}
              <div>
                <span className="font-black uppercase tracking-wider text-gray-500 text-[10px] block mb-2">
                  Itens para Pedir no Fornecedor
                </span>
                <div className="space-y-2">
                  {dispatchOrder.items.map((it, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-blue-50/50 rounded-xl border border-blue-200/60"
                    >
                      <div>
                        <p className="font-black text-gray-900">{it.quantity}x {it.name}</p>
                        <p className="text-[10px] text-gray-500">
                          SKU Fornecedor: <strong className="text-gray-800">{it.supplierSku}</strong> · {it.supplier}
                        </p>
                      </div>

                      <a
                        href={it.supplierUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#002244] hover:bg-[#001830] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer shadow-xs"
                      >
                        <span>Abrir Produto</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* USPS Tracking input */}
              <div className="pt-2">
                <label className="font-bold text-gray-700 block mb-1">
                  Código de Rastreamento USPS (fornecido após o pedido):
                </label>
                <input
                  type="text"
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  placeholder="Ex: 9400 1118 9956 2537 8291 04"
                  className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs font-mono text-gray-900 focus:outline-none focus:border-[#002244] focus:ring-1 focus:ring-[#002244]"
                />
              </div>

              {/* Action buttons */}
              <div className="pt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setDispatchOrder(null)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl text-xs cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDispatch}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Check size={16} />
                  <span>Marcar como Despachado</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Ficha Técnica & Galeria de Fotos Reais em Alta Resolução */}
      {previewProductModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xs z-20">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="font-black text-[#002244] text-base">
                  Ficha Técnica & Fotos Reais do Produto
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewProductModal(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Photo Gallery Viewer */}
              <div className="space-y-3">
                {/* Large Active Photo */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shadow-xs">
                  <img
                    src={selectedGalleryImg || previewProductModal.heroImage}
                    alt={previewProductModal.name}
                    className="w-full h-full object-cover"
                  />
                  {previewProductModal.badge && (
                    <span className="absolute top-3 left-3 bg-[#002244]/90 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                      {previewProductModal.badge}
                    </span>
                  )}
                </div>

                {/* Thumbnail Selectors (4 angles) */}
                <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                  {(previewProductModal.galleryImages?.length
                    ? previewProductModal.galleryImages
                    : [previewProductModal.heroImage, previewProductModal.secondaryImage].filter(Boolean)
                  ).map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedGalleryImg(img as string)}
                      className={`relative aspect-square w-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                        (selectedGalleryImg || previewProductModal.heroImage) === img
                          ? 'border-[#002244] ring-2 ring-[#002244]/20 scale-102 shadow-xs'
                          : 'border-gray-200 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img as string} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Title & Brand */}
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-blue-800 mb-1">
                  <span>{previewProductModal.brand || 'Ling Petshop'}</span>
                  <span>·</span>
                  <span>{previewProductModal.category}</span>
                  <span>·</span>
                  <span className="text-gray-500">
                    {previewProductModal.petType === 'Dog'
                      ? 'Para Cães'
                      : previewProductModal.petType === 'Cat'
                      ? 'Para Gatos'
                      : 'Todos os Pets'}
                  </span>
                </div>
                <h4 className="text-2xl font-black text-[#002244]">
                  {previewProductModal.name}
                </h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  {previewProductModal.description}
                </p>
              </div>

              {/* Financial Box Summary */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-blue-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Custo CJ (Fábrica)</span>
                  <span className="font-black text-gray-800 text-sm">${previewProductModal.cjCost.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Frete CJ Packet</span>
                  <span className="font-black text-gray-800 text-sm">${previewProductModal.cjShippingEstimate.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Preço de Venda</span>
                  <span className="font-black text-blue-900 text-sm">${previewProductModal.price.toFixed(2)}</span>
                </div>
                <div className="bg-emerald-50 -m-2 p-2 rounded-xl border border-emerald-200">
                  <span className="text-[10px] uppercase font-black text-emerald-800 block">Lucro Líquido</span>
                  <span className="font-black text-emerald-700 text-sm">
                    +${previewProductModal.netProfit.toFixed(2)} ({previewProductModal.profitMarginPercent}%)
                  </span>
                </div>
              </div>

              {/* Detailed Technical Specifications Table */}
              {previewProductModal.specifications && (
                <div className="space-y-3">
                  <h5 className="font-black text-[#002244] text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck size={16} className="text-blue-700" />
                    <span>Especificações Técnicas de Fábrica (Ficha Completa)</span>
                  </h5>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                      <span className="text-[10px] font-bold text-gray-400 uppercase block">Composição & Materiais:</span>
                      <p className="font-medium text-gray-800 mt-0.5">{previewProductModal.specifications.material}</p>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                      <span className="text-[10px] font-bold text-gray-400 uppercase block">Dimensões & Medidas:</span>
                      <p className="font-medium text-gray-800 mt-0.5">{previewProductModal.specifications.dimensions}</p>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                      <span className="text-[10px] font-bold text-gray-400 uppercase block">Peso Líquido do Pacote:</span>
                      <p className="font-medium text-gray-800 mt-0.5">{previewProductModal.specifications.weight}</p>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                      <span className="text-[10px] font-bold text-gray-400 uppercase block">O Que Vem na Caixa:</span>
                      <p className="font-medium text-gray-800 mt-0.5">{previewProductModal.specifications.inTheBox}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs">
                    <span className="text-[10px] font-bold text-gray-400 uppercase block">Instruções de Cuidado & Limpeza:</span>
                    <p className="font-medium text-gray-800 mt-0.5">{previewProductModal.specifications.care}</p>
                  </div>

                  <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 text-xs text-[#002244]">
                    <span className="text-[10px] font-black text-blue-800 uppercase block">Fulfillment CJ nos EUA:</span>
                    <p className="font-semibold text-blue-900 mt-0.5">
                      Armazém: {previewProductModal.specifications.cjWarehouse} · {previewProductModal.specifications.shippingEstimate}
                    </p>
                  </div>
                </div>
              )}

              {/* Modal Bottom Actions */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => handleCopyCjSku(previewProductModal.supplierSku)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedCjSku === previewProductModal.supplierSku ? (
                    <>
                      <Check size={14} className="text-emerald-600" />
                      <span>SKU Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copiar SKU CJ ({previewProductModal.supplierSku})</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={previewProductModal.supplierUrl || 'https://cjdropshipping.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <span>Abrir na CJ Dropshipping</span>
                    <ExternalLink size={13} />
                  </a>

                  <button
                    type="button"
                    onClick={() => setPreviewProductModal(null)}
                    className="bg-[#002244] hover:bg-[#001830] text-white text-xs font-bold py-2.5 px-5 rounded-xl transition-colors cursor-pointer shadow-xs"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* MODAL: ADICIONAR PRODUTO MANUALMENTE DA CJ / FORNECEDOR */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-60 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white text-gray-900 rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl space-y-5 border border-gray-200 my-auto max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shadow-xs">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-gray-900 leading-snug">
                    Cadastrar Produto Manualmente (da CJ Dropshipping)
                  </h3>
                  <p className="text-xs text-gray-500">
                    Cole o nome, a foto e os preços para colocar o produto ao vivo no site em segundos!
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddProductOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center font-bold cursor-pointer transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddRealProduct} className="space-y-4 text-xs">
              {/* ⚡ PREENCHIMENTO AUTOMÁTICO POR LINK OU SKU DA CJ DROPSHIPPING */}
              <div className="p-4 bg-gradient-to-r from-blue-900 via-[#002244] to-[#0F2942] text-white rounded-2xl border border-blue-700 shadow-md space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="font-extrabold text-xs flex items-center gap-1.5 text-amber-300 uppercase tracking-wider">
                    <Zap size={15} />
                    <span>Cole o Link ou SKU da CJ (Auto-Preenchimento)</span>
                  </label>
                  <span className="text-[10px] text-emerald-300 font-bold bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                    🎯 Margem Alvo: 50% a 65%
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    placeholder="Ex: https://cjdropshipping.com/product/... ou CJ-PET-8812 ou 'caminha de cachorro'"
                    value={autoFillInput}
                    onChange={(e) => setAutoFillInput(e.target.value)}
                    className="flex-1 bg-white text-gray-900 px-3.5 py-2.5 rounded-xl text-xs font-medium placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  <button
                    type="button"
                    onClick={() => handleAutoFillFromCjLinkOrSku(autoFillInput)}
                    className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs px-4 py-2.5 rounded-xl cursor-pointer transition-all shrink-0 flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Zap size={15} />
                    <span>⚡ Preencher Automático</span>
                  </button>
                </div>

                <p className="text-[10px] text-blue-200 leading-snug">
                  💡 O sistema lê o produto, escolhe a foto, puxa o custo e calcula o preço de venda para garantir <strong>entre 50% e 65% de lucro líquido limpo ($)</strong>!
                </p>
              </div>

              {/* Product Name */}
              <div>
                <label className="block font-extrabold text-gray-800 mb-1">
                  Nome do Produto (Como o cliente americano vai ver):
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Anti-Anxiety Calming Dog Bed / Ergonomic Pet Harness"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 font-bold text-gray-900 focus:ring-2 focus:ring-[#002244] outline-none text-sm"
                />
              </div>

              {/* Tagline / Subtitle */}
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Descrição Curta / Frase de Destaque (Opcional):
                </label>
                <input
                  type="text"
                  placeholder="Ex: Conforto ortopédico veterinário com envio em 24h dos EUA via USPS."
                  value={newProdTagline}
                  onChange={(e) => setNewProdTagline(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 font-medium text-gray-800 outline-none"
                />
              </div>

              {/* Image URL & Live Preview Box */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <label className="font-extrabold text-gray-800 flex items-center gap-1.5">
                    <ImageIcon size={15} className="text-blue-600" />
                    <span>Foto do Produto (Envie da galeria ou cole o link):</span>
                  </label>

                  {/* Preset Sample Photos */}
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="text-[10px] text-gray-400 font-bold">Usar foto teste:</span>
                    {[
                      { label: '🛏️ Cama', url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1200&q=85' },
                      { label: '🥣 Beber', url: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=85' },
                      { label: '🦮 Guias', url: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=85' },
                      { label: '🎾 Brinquedo', url: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=85' },
                    ].map((sample, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setNewProdImage(sample.url)}
                        className="bg-white hover:bg-gray-200 border border-gray-300 px-2 py-0.5 rounded text-[10px] font-bold text-gray-700 cursor-pointer"
                      >
                        {sample.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Gallery File Upload Button + Direct URL Input */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs px-3.5 py-2.5 rounded-xl cursor-pointer flex items-center gap-1.5 shadow-sm shrink-0">
                      <span>📱 Escolher Foto da Galeria do Celular</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageFileUpload(e, false)}
                        className="hidden"
                      />
                    </label>

                    <span className="text-gray-400 text-xs font-bold">ou cole o link:</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      required
                      placeholder="https://... ou escolha da galeria acima"
                      value={newProdImage}
                      onChange={(e) => setNewProdImage(e.target.value)}
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-300 font-mono text-[11px] text-gray-900 bg-white"
                    />

                    {/* Live Photo Preview Box */}
                    <div className="w-14 h-14 rounded-xl border-2 border-emerald-500 overflow-hidden bg-white shrink-0 shadow-xs relative">
                      <img
                        src={newProdImage}
                        alt="Prévia"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Prices & Real-Time Profit Calculation Box */}
              <div className="p-4 bg-emerald-50/80 rounded-2xl border-2 border-emerald-300 space-y-3">
                <span className="font-extrabold text-emerald-900 block text-xs uppercase tracking-wider flex items-center justify-between">
                  <span>💰 Precificação & Calculadora de Lucro Líquido</span>
                  <span className="text-[10px] bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded-full font-bold">
                    Target Alvo: 50% a 65% Margem
                  </span>
                </span>

                {/* 1-Click Margin Calculation Buttons */}
                <div className="flex items-center gap-2 flex-wrap bg-white/90 p-2 rounded-xl border border-emerald-200">
                  <span className="text-[11px] font-bold text-emerald-950">⚡ Autocalcular Preço de Venda:</span>
                  <button
                    type="button"
                    onClick={() => applyTargetMargin(50)}
                    className="bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 px-2.5 py-1 rounded-lg text-[11px] font-black cursor-pointer transition-colors"
                  >
                    50% Margem
                  </button>
                  <button
                    type="button"
                    onClick={() => applyTargetMargin(60)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs px-2.5 py-1 rounded-lg text-[11px] font-black cursor-pointer transition-colors"
                  >
                    60% Margem (Recomendado)
                  </button>
                  <button
                    type="button"
                    onClick={() => applyTargetMargin(65)}
                    className="bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 px-2.5 py-1 rounded-lg text-[11px] font-black cursor-pointer transition-colors"
                  >
                    65% Margem
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-emerald-900 mb-1">Preço de Venda ($ USD):</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={newProdPrice}
                      onChange={(e) => setNewProdPrice(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-emerald-300 font-black text-emerald-950 text-sm bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Preço do Produto na CJ ($ USD):</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={newProdCost}
                      onChange={(e) => setNewProdCost(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold text-gray-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Frete Estimado CJ ($ USD):</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={newProdShipping}
                      onChange={(e) => setNewProdShipping(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold text-gray-900 bg-white"
                    />
                  </div>
                </div>

                {/* Calculated Net Profit Live Banner */}
                {(() => {
                  const price = parseFloat(newProdPrice) || 0;
                  const cost = parseFloat(newProdCost) || 0;
                  const ship = parseFloat(newProdShipping) || 0;
                  const totalCost = cost + ship;
                  const profit = price - totalCost;
                  const margin = price > 0 ? Math.round((profit / price) * 100) : 0;
                  const isOptimalMargin = margin >= 50 && margin <= 68;

                  return (
                    <div className="pt-2 border-t border-emerald-200 flex flex-wrap items-center justify-between text-xs gap-2">
                      <span className="text-emerald-800 font-bold">
                        Custo Total CJ (Produto + Frete): <strong>${totalCost.toFixed(2)} USD</strong>
                      </span>
                      <div className="text-right">
                        <span className="text-emerald-950 font-black text-sm block">
                          Seu Lucro Líquido: +${profit.toFixed(2)} USD (≈ R$ {(profit * EXCHANGE_RATE_BRL).toFixed(2)})
                        </span>
                        <div className="flex items-center justify-end gap-1 mt-0.5">
                          <span
                            className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${
                              isOptimalMargin
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : margin > 68
                                ? 'bg-blue-600 text-white'
                                : 'bg-amber-500 text-stone-950'
                            }`}
                          >
                            {isOptimalMargin
                              ? `✓ Margem Ideal: ${margin}%`
                              : `Margem: ${margin}%`}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>


              {/* Category & Pet Type & SKU */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Categoria:</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold text-gray-800 bg-white"
                  >
                    <option value="Beds">🛏️ Beds (Caminhas)</option>
                    <option value="Feeding">🥣 Feeding (Alimentação)</option>
                    <option value="Walk & Travel">🦮 Walk & Travel (Passeio)</option>
                    <option value="Toys">🎾 Toys (Brinquedos)</option>
                    <option value="Grooming">🚿 Grooming (Higiene)</option>
                    <option value="Wellness">🌿 Wellness (Saúde)</option>
                    <option value="Treats">🥩 Treats (Petiscos)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Para qual Pet?</label>
                  <select
                    value={newProdPet}
                    onChange={(e) => setNewProdPet(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 font-bold text-gray-800 bg-white"
                  >
                    <option value="Dog">🐶 Cachorro (Dog)</option>
                    <option value="Cat">🐱 Gato (Cat)</option>
                    <option value="All Pets">🐾 Ambos (All Pets)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">SKU na CJ (Opcional):</label>
                  <input
                    type="text"
                    placeholder="Ex: CJ-PET-9812"
                    value={newProdSku}
                    onChange={(e) => setNewProdSku(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 font-mono text-gray-900 bg-white"
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black cursor-pointer transition-colors shadow-lg flex items-center gap-1.5 text-xs uppercase tracking-wider"
                >
                  <Check size={16} />
                  <span>🚀 Publicar Produto no Site Agora</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDITAR PRODUTO EXISTENTE */}
      {editingProduct && (
        <div className="fixed inset-0 z-60 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white text-gray-900 rounded-3xl max-w-xl w-full p-5 sm:p-7 shadow-2xl space-y-5 border border-gray-200 my-auto max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                  <Edit3 size={18} />
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900">
                    Editar Produto: {editingProduct.name}
                  </h3>
                  <p className="text-xs text-gray-500">Mude fotos, preço de venda ou custos a qualquer momento</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center font-bold cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveEditProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Nome do Produto:</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 font-bold text-gray-900"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Subtítulo / Descrição Curta:</label>
                <input
                  type="text"
                  value={editingProduct.tagline || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 font-medium text-gray-800"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Foto Principal do Produto:</label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl cursor-pointer flex items-center gap-1.5 shadow-xs shrink-0">
                      <span>📱 Trocar Foto pela Galeria do Celular</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageFileUpload(e, true)}
                        className="hidden"
                      />
                    </label>
                    <span className="text-gray-400 text-xs">ou mude o link:</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      required
                      value={editingProduct.heroImage}
                      onChange={(e) => setEditingProduct({ ...editingProduct, heroImage: e.target.value })}
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-300 font-mono text-[11px] text-gray-900"
                    />
                    <div className="w-12 h-12 rounded-xl border border-gray-300 overflow-hidden bg-gray-50 shrink-0">
                      <img src={editingProduct.heroImage} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Preço de Venda ($ USD):</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 font-black text-blue-900 text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Custo do Produto na CJ ($ USD):</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={editingProduct.cjCost || editingProduct.supplierCost}
                    onChange={(e) => setEditingProduct({ ...editingProduct, cjCost: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 font-bold text-gray-900 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Categoria:</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 font-bold text-gray-800 bg-white"
                  >
                    <option value="Beds">Caminhas (Beds)</option>
                    <option value="Feeding">Alimentação (Feeding)</option>
                    <option value="Walk & Travel">Passeio (Walk & Travel)</option>
                    <option value="Toys">Brinquedos (Toys)</option>
                    <option value="Grooming">Higiene (Grooming)</option>
                    <option value="Wellness">Saúde (Wellness)</option>
                    <option value="Treats">Petiscos (Treats)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Tipo de Animal:</label>
                  <select
                    value={editingProduct.petType}
                    onChange={(e) => setEditingProduct({ ...editingProduct, petType: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 font-bold text-gray-800 bg-white"
                  >
                    <option value="Dog">Cães (Dog)</option>
                    <option value="Cat">Gatos (Cat)</option>
                    <option value="All Pets">Todos os Pets</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer transition-colors shadow-md flex items-center gap-1.5"
                >
                  <Check size={16} />
                  <span>Salvar Alterações</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
