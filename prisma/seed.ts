import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
    { id: "seed-category-lighting", slug: "lighting", name: "Lighting" },
    { id: "seed-category-wall-art", slug: "wall-art", name: "Wall Art" },
    { id: "seed-category-vases", slug: "vases", name: "Vases" },
    { id: "seed-category-textiles", slug: "textiles", name: "Textiles" },
    { id: "seed-category-candles", slug: "candles", name: "Candles" },
    { id: "seed-category-storage", slug: "storage", name: "Storage" },
    { id: "seed-category-small-furniture", slug: "small-furniture", name: "Small Furniture" },
    { id: "seed-category-accessories", slug: "desk-accessories", name: "Desk Accessories" },
];

const collections = [
    { id: "seed-collection-calm-corners", slug: "calm-corners", name: "Calm Corners" },
    { id: "seed-collection-soft-geometry", slug: "soft-geometry", name: "Soft Geometry" },
    { id: "seed-collection-warm-neutrals", slug: "warm-neutrals", name: "Warm Neutrals" },
    { id: "seed-collection-studio-desk", slug: "studio-desk", name: "Studio Desk" },
    { id: "seed-collection-evening-rituals", slug: "evening-rituals", name: "Evening Rituals" },
    { id: "seed-collection-small-space-living", slug: "small-space-living", name: "Small Space Living" },
];

const rooms = [
    { id: "seed-room-living-room", slug: "living-room", name: "Living Room" },
    { id: "seed-room-bedroom", slug: "bedroom", name: "Bedroom" },
    { id: "seed-room-office", slug: "office", name: "Office" },
    { id: "seed-room-dining-room", slug: "dining-room", name: "Dining Room" },
    { id: "seed-room-entryway", slug: "entryway", name: "Entryway" },
    { id: "seed-room-bathroom", slug: "bathroom", name: "Bathroom" },
    { id: "seed-room-kitchen", slug: "kitchen", name: "Kitchen" },
];

const styles = [
    { id: "seed-style-minimal", slug: "minimal", name: "Minimal" },
    { id: "seed-style-scandinavian", slug: "scandinavian", name: "Scandinavian" },
    { id: "seed-style-japandi", slug: "japandi", name: "Japandi" },
    { id: "seed-style-industrial", slug: "industrial", name: "Industrial" },
    { id: "seed-style-modern", slug: "modern", name: "Modern" },
    { id: "seed-style-vintage", slug: "vintage", name: "Vintage" },
    { id: "seed-style-boho", slug: "boho", name: "Boho" },
];

const colors = [
    { id: "seed-color-white", slug: "white", name: "White", hex: "#FFFFFF" },
    { id: "seed-color-black", slug: "black", name: "Black", hex: "#111111" },
    { id: "seed-color-cream", slug: "cream", name: "Cream", hex: "#F6F0E6" },
    { id: "seed-color-charcoal", slug: "charcoal", name: "Charcoal", hex: "#343A40" },
    { id: "seed-color-olive", slug: "olive", name: "Olive", hex: "#6F7652" },
    { id: "seed-color-sand", slug: "sand", name: "Sand", hex: "#D9C7A7" },
    { id: "seed-color-clay", slug: "clay", name: "Clay", hex: "#B66A50" },
    { id: "seed-color-sage", slug: "sage", name: "Sage", hex: "#A9B7A0" },
    { id: "seed-color-brass", slug: "brass", name: "Brass", hex: "#B08D57" },
    { id: "seed-color-oak", slug: "oak", name: "Oak", hex: "#C9A36A" },
    { id: "seed-color-walnut", slug: "walnut", name: "Walnut", hex: "#6B4A2F" },
    { id: "seed-color-clear", slug: "clear", name: "Clear", hex: "#E8F3F5" },
    { id: "seed-color-amber", slug: "amber", name: "Amber", hex: "#C47A2C" },
];

const materials = [
    { id: "seed-material-ceramic", slug: "ceramic", name: "Ceramic" },
    { id: "seed-material-linen", slug: "linen", name: "Linen" },
    { id: "seed-material-cotton", slug: "cotton", name: "Cotton" },
    { id: "seed-material-wool", slug: "wool", name: "Wool" },
    { id: "seed-material-oak", slug: "oak", name: "Oak" },
    { id: "seed-material-walnut", slug: "walnut", name: "Walnut" },
    { id: "seed-material-glass", slug: "glass", name: "Glass" },
    { id: "seed-material-brass", slug: "brass", name: "Brass" },
    { id: "seed-material-steel", slug: "steel", name: "Steel" },
    { id: "seed-material-rattan", slug: "rattan", name: "Rattan" },
    { id: "seed-material-stoneware", slug: "stoneware", name: "Stoneware" },
    { id: "seed-material-paper", slug: "paper", name: "Paper" },
    { id: "seed-material-cork", slug: "cork", name: "Cork" },
    { id: "seed-material-soy-wax", slug: "soy-wax", name: "Soy Wax" },
];

const products = [
    {
        id: "seed-product-1",
        slug: "ceramic-table-lamp",
        name: "Ceramic Table Lamp",
        description: "A softly rounded ceramic lamp with a linen shade for calm bedside light.",
        priceCents: 12900,
        compareAtCents: 15900,
        currency: "USD",
        categoryId: "seed-category-lighting",
        collectionId: "seed-collection-calm-corners",
        roomId: "seed-room-bedroom",
        styleId: "seed-style-japandi",
        dimensions: "12 x 12 x 18 in",
        weight: "4.2 lb",
        materialDetail: "Glazed ceramic, linen shade",
        bulbBase: "E26, bulb not included",
        origin: "Hand-finished in Portugal",
        images: [
            "https://lcl9hrkqlikhnwol.public.blob.vercel-storage.com/seed-product-1/lamp-cream-ceramic-studio.png",
            "https://lcl9hrkqlikhnwol.public.blob.vercel-storage.com/seed-product-1/lamp-cream-ceramic-bedside.png",
            "https://lcl9hrkqlikhnwol.public.blob.vercel-storage.com/seed-product-1/lamp-clay-linen-bedside.png",
            "https://lcl9hrkqlikhnwol.public.blob.vercel-storage.com/seed-product-1/lamp-clay-linen-studio.png",
        ],
        thumbnail:
            "https://lcl9hrkqlikhnwol.public.blob.vercel-storage.com/seed-product-1/lamp-clay-linen-transparent.png",
        isFeatured: true,
        rating: 4.8,
        reviewCount: 46,
    },
    {
        id: "seed-product-2",
        slug: "framed-abstract-poster",
        name: "Framed Abstract Poster",
        description: "Gallery-style wall art with soft geometric forms in a slim oak frame.",
        priceCents: 6800,
        currency: "USD",
        categoryId: "seed-category-wall-art",
        collectionId: "seed-collection-soft-geometry",
        roomId: "seed-room-living-room",
        styleId: "seed-style-modern",
        dimensions: "18 x 24 in",
        weight: "3 lb",
        materialDetail: "Giclée print, oak frame",
        origin: "Made in Italy",
        images: [
            "https://lcl9hrkqlikhnwol.public.blob.vercel-storage.com/seed-product-2/black-paper-wall.png",
            "https://lcl9hrkqlikhnwol.public.blob.vercel-storage.com/seed-product-2/oak-wall.png",
            "https://lcl9hrkqlikhnwol.public.blob.vercel-storage.com/seed-product-2/sand-paper-wall.png",
        ],
        thumbnail: "https://lcl9hrkqlikhnwol.public.blob.vercel-storage.com/seed-product-2/sand-paper-transparent.png",
        isNew: true,
        rating: 4.6,
        reviewCount: 21,
    },
    {
        id: "seed-product-3",
        slug: "stoneware-bud-vase",
        name: "Stoneware Bud Vase",
        description: "A narrow stoneware vase with a hand-glazed finish for single stems.",
        priceCents: 3600,
        currency: "USD",
        categoryId: "seed-category-vases",
        collectionId: "seed-collection-warm-neutrals",
        roomId: "seed-room-dining-room",
        styleId: "seed-style-scandinavian",
        dimensions: "4 x 4 x 9 in",
        weight: "1.4 lb",
        materialDetail: "Hand-glazed stoneware",
        origin: "Handmade in Portugal",
        images: [
            "https://lcl9hrkqlikhnwol.public.blob.vercel-storage.com/seed-product-3/charcoal-stoneware-dresser.png",
            "https://lcl9hrkqlikhnwol.public.blob.vercel-storage.com/seed-product-3/charcoal-stoneware-studio.png",
            "https://lcl9hrkqlikhnwol.public.blob.vercel-storage.com/seed-product-3/cream-paper-dresser.png",
            "https://lcl9hrkqlikhnwol.public.blob.vercel-storage.com/seed-product-3/cream-paper-studio.png",
            "https://lcl9hrkqlikhnwol.public.blob.vercel-storage.com/seed-product-3/sage-stoneware-dresser.png",
            "https://lcl9hrkqlikhnwol.public.blob.vercel-storage.com/seed-product-3/sage-stoneware-studio.png",
        ],
        thumbnail: "https://lcl9hrkqlikhnwol.public.blob.vercel-storage.com/seed-product-3/cream-paper-transparent.png",
        isNew: true,
        isFeatured: true,
        rating: 4.9,
        reviewCount: 33,
    },
    {
        id: "seed-product-4",
        slug: "linen-throw-blanket",
        name: "Linen Throw Blanket",
        description: "A textured linen-cotton throw with a relaxed drape for sofa or bed layering.",
        priceCents: 9400,
        currency: "USD",
        categoryId: "seed-category-textiles",
        collectionId: "seed-collection-warm-neutrals",
        roomId: "seed-room-living-room",
        styleId: "seed-style-minimal",
        dimensions: "50 x 70 in",
        weight: "2.1 lb",
        materialDetail: "Linen-cotton blend",
        origin: "Woven in Lithuania",
        images: [
            "https://placehold.co/800x800/f2ede3/31343c.png?text=Linen+Throw+Blanket+-+Front",
            "https://placehold.co/800x800/e5ddcd/31343c.png?text=Linen+Throw+Blanket+-+Draped",
            "https://placehold.co/800x800/d9cfb8/31343c.png?text=Linen+Throw+Blanket+-+Detail",
            "https://placehold.co/800x800/ece2cc/31343c.png?text=Linen+Throw+Blanket+-+In+Room",
        ],
        thumbnail:
            "https://lcl9hrkqlikhnwol.public.blob.vercel-storage.com/seed-product-4/linen-throw-blanket-cream-linen-transparent.png",
        isNew: true,
        rating: 4.7,
        reviewCount: 29,
    },
    {
        id: "seed-product-5",
        slug: "brass-candle-holder",
        name: "Brass Candle Holder",
        description: "A weighted brass taper holder with a simple silhouette and warm patina.",
        priceCents: 2800,
        currency: "USD",
        categoryId: "seed-category-candles",
        collectionId: "seed-collection-evening-rituals",
        roomId: "seed-room-dining-room",
        styleId: "seed-style-vintage",
        dimensions: "3 x 3 x 5 in",
        weight: "0.8 lb",
        materialDetail: "Solid brass",
        origin: "Made in India",
        images: [
            "https://placehold.co/800x800/eee6d8/31343c.png?text=Brass+Candle+Holder+-+Front",
            "https://placehold.co/800x800/e0d5bd/31343c.png?text=Brass+Candle+Holder+-+Side",
            "https://placehold.co/800x800/d4c6a4/31343c.png?text=Brass+Candle+Holder+-+Detail",
        ],
        thumbnail:
            "https://lcl9hrkqlikhnwol.public.blob.vercel-storage.com/seed-product-5/brass-candle-holder-black-steel-transparent.png",
        isFeatured: true,
        rating: 4.5,
        reviewCount: 17,
    },
    {
        id: "seed-product-6",
        slug: "oak-desk-organizer",
        name: "Oak Desk Organizer",
        description: "A compact organizer with divided trays for pens, notes, clips, and small tools.",
        priceCents: 5200,
        currency: "USD",
        categoryId: "seed-category-accessories",
        collectionId: "seed-collection-studio-desk",
        roomId: "seed-room-office",
        styleId: "seed-style-scandinavian",
        dimensions: "11 x 5 x 3 in",
        weight: "1.7 lb",
        materialDetail: "Solid oak",
        origin: "Made in Vietnam",
        images: [
            "https://placehold.co/800x800/f0e9dc/31343c.png?text=Oak+Desk+Organizer+-+Front",
            "https://placehold.co/800x800/e3d9c3/31343c.png?text=Oak+Desk+Organizer+-+Angle",
            "https://placehold.co/800x800/d7cab0/31343c.png?text=Oak+Desk+Organizer+-+Detail",
            "https://placehold.co/800x800/ecdfc2/31343c.png?text=Oak+Desk+Organizer+-+On+Desk",
        ],
        thumbnail:
            "https://lcl9hrkqlikhnwol.public.blob.vercel-storage.com/seed-product-6/oak-desk-organizer-oak-transparent.png",
        rating: 4.8,
        reviewCount: 24,
    },
    {
        id: "seed-product-7",
        slug: "rattan-storage-basket",
        name: "Rattan Storage Basket",
        description: "A handwoven basket for blankets, toys, magazines, or entryway essentials.",
        priceCents: 7400,
        currency: "USD",
        categoryId: "seed-category-storage",
        collectionId: "seed-collection-small-space-living",
        roomId: "seed-room-entryway",
        styleId: "seed-style-boho",
        dimensions: "16 x 16 x 18 in",
        weight: "3.5 lb",
        materialDetail: "Handwoven rattan",
        origin: "Handwoven in Indonesia",
        images: [
            "https://placehold.co/800x800/eee4d4/31343c.png?text=Rattan+Storage+Basket+-+Front",
            "https://placehold.co/800x800/e1d3b8/31343c.png?text=Rattan+Storage+Basket+-+Detail",
        ],
        thumbnail: "",
        isNew: true,
        rating: 4.4,
        reviewCount: 12,
    },
    {
        id: "seed-product-8",
        slug: "walnut-side-table",
        name: "Walnut Side Table",
        description: "A small round side table with a solid walnut top and black steel base.",
        priceCents: 16800,
        compareAtCents: 19800,
        currency: "USD",
        categoryId: "seed-category-small-furniture",
        collectionId: "seed-collection-small-space-living",
        roomId: "seed-room-living-room",
        styleId: "seed-style-industrial",
        dimensions: "18 x 18 x 20 in",
        weight: "12 lb",
        materialDetail: "Solid walnut, powder-coated steel base",
        origin: "Made in Poland",
        images: [
            "https://placehold.co/800x800/ede4d8/31343c.png?text=Walnut+Side+Table+-+Front",
            "https://placehold.co/800x800/dfd0b9/31343c.png?text=Walnut+Side+Table+-+Angle",
            "https://placehold.co/800x800/d3c2a2/31343c.png?text=Walnut+Side+Table+-+Base",
        ],
        thumbnail: "",
        isFeatured: true,
        rating: 4.7,
        reviewCount: 18,
    },
    {
        id: "seed-product-9",
        slug: "glass-carafe-set",
        name: "Glass Carafe Set",
        description: "A clear glass carafe with two low tumblers for bedside or dining table use.",
        priceCents: 5800,
        currency: "USD",
        categoryId: "seed-category-accessories",
        collectionId: "seed-collection-calm-corners",
        roomId: "seed-room-bedroom",
        styleId: "seed-style-minimal",
        dimensions: "8 x 8 x 10 in",
        weight: "2.6 lb",
        materialDetail: "Borosilicate glass",
        origin: "Made in Czech Republic",
        images: [
            "https://placehold.co/800x800/f1f5f6/31343c.png?text=Glass+Carafe+Set+-+Full+Set",
            "https://placehold.co/800x800/e3ebed/31343c.png?text=Glass+Carafe+Set+-+Carafe",
        ],
        thumbnail: "",
        rating: 4.6,
        reviewCount: 15,
    },
    {
        id: "seed-product-10",
        slug: "soy-wax-scented-candle",
        name: "Soy Wax Scented Candle",
        description: "A clean-burning soy candle poured into a reusable stoneware vessel.",
        priceCents: 3200,
        currency: "USD",
        categoryId: "seed-category-candles",
        collectionId: "seed-collection-evening-rituals",
        roomId: "seed-room-bathroom",
        styleId: "seed-style-japandi",
        dimensions: "3 x 3 x 4 in",
        weight: "1 lb",
        materialDetail: "Soy wax, stoneware vessel",
        origin: "Hand-poured in USA",
        images: [
            "https://placehold.co/800x800/f3ece2/31343c.png?text=Soy+Wax+Candle+-+Front",
            "https://placehold.co/800x800/e6d9c5/31343c.png?text=Soy+Wax+Candle+-+Lit",
        ],
        thumbnail: "",
        isNew: true,
        rating: 4.9,
        reviewCount: 52,
    },
    {
        id: "seed-product-11",
        slug: "cork-pinboard",
        name: "Cork Pinboard",
        description: "A slim cork board with an oak rail for notes, postcards, and workspace plans.",
        priceCents: 6400,
        currency: "USD",
        categoryId: "seed-category-accessories",
        collectionId: "seed-collection-studio-desk",
        roomId: "seed-room-office",
        styleId: "seed-style-modern",
        dimensions: "24 x 18 x 1 in",
        weight: "2.8 lb",
        materialDetail: "Natural cork, oak rail",
        origin: "Made in Portugal",
        images: ["https://placehold.co/800x800/ece2d0/31343c.png?text=Cork+Pinboard"],
        thumbnail: "",
        rating: 4.3,
        reviewCount: 9,
    },
    {
        id: "seed-product-12",
        slug: "steel-bookends",
        name: "Steel Bookends",
        description: "Minimal steel bookends with a powder-coated finish for shelves and desks.",
        priceCents: 4200,
        currency: "USD",
        categoryId: "seed-category-accessories",
        collectionId: "seed-collection-studio-desk",
        roomId: "seed-room-office",
        styleId: "seed-style-industrial",
        dimensions: "5 x 4 x 7 in",
        weight: "2.4 lb",
        materialDetail: "Powder-coated steel",
        origin: "Made in Germany",
        images: [
            "https://placehold.co/800x800/e9e9e9/31343c.png?text=Steel+Bookends+-+Pair",
            "https://placehold.co/800x800/dcdcdc/31343c.png?text=Steel+Bookends+-+Detail",
        ],
        thumbnail: "",
        isFeatured: true,
        rating: 4.5,
        reviewCount: 31,
    },
];

const variants = [
    {
        productId: "seed-product-1",
        name: "Cream / Linen Shade",
        sku: "LAMP-CERAMIC-CR-LINEN",
        colorId: "seed-color-cream",
        materialId: "seed-material-ceramic",
        stock: 18,
    },
    {
        productId: "seed-product-1",
        name: "Clay / Linen Shade",
        sku: "LAMP-CERAMIC-CL-LINEN",
        colorId: "seed-color-clay",
        materialId: "seed-material-ceramic",
        stock: 14,
    },
    {
        productId: "seed-product-2",
        name: "Oak Frame / 18 x 24",
        sku: "POSTER-ABSTRACT-OAK-18X24",
        colorId: "seed-color-oak",
        materialId: "seed-material-paper",
        stock: 25,
    },
    {
        productId: "seed-product-2",
        name: "Black Frame / 18 x 24",
        sku: "POSTER-ABSTRACT-BK-18X24",
        colorId: "seed-color-black",
        materialId: "seed-material-paper",
        stock: 20,
    },
    {
        productId: "seed-product-3",
        name: "Cream / Tall",
        sku: "VASE-BUD-CR-TALL",
        colorId: "seed-color-cream",
        materialId: "seed-material-stoneware",
        stock: 22,
    },
    {
        productId: "seed-product-3",
        name: "Sage / Tall",
        sku: "VASE-BUD-SG-TALL",
        colorId: "seed-color-sage",
        materialId: "seed-material-stoneware",
        stock: 18,
    },
    {
        productId: "seed-product-3",
        name: "Charcoal / Tall",
        sku: "VASE-BUD-CH-TALL",
        colorId: "seed-color-charcoal",
        materialId: "seed-material-stoneware",
        stock: 18,
    },
    {
        productId: "seed-product-4",
        name: "Cream / 50 x 70",
        sku: "THROW-LINEN-CR-50X70",
        colorId: "seed-color-cream",
        materialId: "seed-material-linen",
        stock: 15,
    },
    {
        productId: "seed-product-4",
        name: "Sand / 50 x 70",
        sku: "THROW-LINEN-SA-50X70",
        colorId: "seed-color-sand",
        materialId: "seed-material-linen",
        stock: 13,
    },
    {
        productId: "seed-product-4",
        name: "Olive / 50 x 70",
        sku: "THROW-LINEN-OL-50X70",
        colorId: "seed-color-olive",
        materialId: "seed-material-linen",
        stock: 12,
    },
    {
        productId: "seed-product-5",
        name: "Brass / Single",
        sku: "HOLDER-BRASS-SINGLE",
        colorId: "seed-color-brass",
        materialId: "seed-material-brass",
        stock: 42,
    },
    {
        productId: "seed-product-5",
        name: "Black / Single",
        sku: "HOLDER-BLACK-SINGLE",
        colorId: "seed-color-black",
        materialId: "seed-material-steel",
        stock: 38,
    },
    {
        productId: "seed-product-6",
        name: "Oak / One Size",
        sku: "ORGANIZER-OAK-OS",
        colorId: "seed-color-oak",
        materialId: "seed-material-oak",
        stock: 21,
    },
    {
        productId: "seed-product-6",
        name: "Walnut / One Size",
        sku: "ORGANIZER-WALNUT-OS",
        colorId: "seed-color-walnut",
        materialId: "seed-material-walnut",
        stock: 15,
    },
    {
        productId: "seed-product-7",
        name: "Natural / Medium",
        sku: "BASKET-RATTAN-NAT-M",
        colorId: "seed-color-sand",
        materialId: "seed-material-rattan",
        stock: 16,
    },
    {
        productId: "seed-product-7",
        name: "Natural / Large",
        sku: "BASKET-RATTAN-NAT-L",
        colorId: "seed-color-oak",
        materialId: "seed-material-rattan",
        stock: 11,
    },
    {
        productId: "seed-product-8",
        name: "Walnut / Black Base",
        sku: "TABLE-WALNUT-BLACK-BASE",
        colorId: "seed-color-walnut",
        materialId: "seed-material-walnut",
        stock: 18,
    },
    {
        productId: "seed-product-9",
        name: "Clear / Set of 3",
        sku: "CARAFE-CLEAR-SET3",
        colorId: "seed-color-clear",
        materialId: "seed-material-glass",
        stock: 20,
    },
    {
        productId: "seed-product-9",
        name: "Amber / Set of 3",
        sku: "CARAFE-AMBER-SET3",
        colorId: "seed-color-amber",
        materialId: "seed-material-glass",
        stock: 14,
    },
    {
        productId: "seed-product-10",
        name: "Cream / Cedar Fig",
        sku: "CANDLE-CREAM-CEDAR-FIG",
        colorId: "seed-color-cream",
        materialId: "seed-material-soy-wax",
        stock: 34,
    },
    {
        productId: "seed-product-10",
        name: "Charcoal / Hinoki Smoke",
        sku: "CANDLE-CHARCOAL-HINOKI",
        colorId: "seed-color-charcoal",
        materialId: "seed-material-soy-wax",
        stock: 28,
    },
    {
        productId: "seed-product-10",
        name: "Sage / Green Tea",
        sku: "CANDLE-SAGE-GREEN-TEA",
        colorId: "seed-color-sage",
        materialId: "seed-material-soy-wax",
        stock: 34,
    },
    {
        productId: "seed-product-11",
        name: "Cork / Oak Rail",
        sku: "PINBOARD-CORK-OAK-24X18",
        colorId: "seed-color-oak",
        materialId: "seed-material-cork",
        stock: 22,
    },
    {
        productId: "seed-product-12",
        name: "Black / Pair",
        sku: "BOOKENDS-STEEL-BK-PAIR",
        colorId: "seed-color-black",
        materialId: "seed-material-steel",
        stock: 28,
    },
    {
        productId: "seed-product-12",
        name: "White / Pair",
        sku: "BOOKENDS-STEEL-WH-PAIR",
        colorId: "seed-color-white",
        materialId: "seed-material-steel",
        stock: 20,
    },
    {
        productId: "seed-product-12",
        name: "Brass / Pair",
        sku: "BOOKENDS-BRASS-PAIR",
        colorId: "seed-color-brass",
        materialId: "seed-material-brass",
        stock: 16,
    },
];

const legacySeedIds = {
    categories: ["seed-category-apparel", "seed-category-footwear", "seed-category-accessories"],
    collections: [
        "seed-collection-basics",
        "seed-collection-denim",
        "seed-collection-minimalist",
        "seed-collection-everyday",
        "seed-collection-winter",
    ],
    rooms: ["seed-room-living-room", "seed-room-bedroom", "seed-room-office", "seed-room-outdoor"],
    styles: ["seed-style-casual", "seed-style-modern"],
    colors: [
        "seed-color-white",
        "seed-color-dark-blue",
        "seed-color-black",
        "seed-color-olive",
        "seed-color-navy",
        "seed-color-charcoal",
        "seed-color-cream",
        "seed-color-burgundy",
    ],
    materials: [
        "seed-material-cotton",
        "seed-material-denim",
        "seed-material-elastane",
        "seed-material-leather",
        "seed-material-rubber",
        "seed-material-canvas",
        "seed-material-wool",
    ],
};

const activeSeedIds = {
    categories: categories.map((category) => category.id),
    collections: collections.map((collection) => collection.id),
    rooms: rooms.map((room) => room.id),
    styles: styles.map((style) => style.id),
    colors: colors.map((color) => color.id),
    materials: materials.map((material) => material.id),
};

const staleSeedIds = (legacyIds: string[], activeIds: string[]) => legacyIds.filter((id) => !activeIds.includes(id));

const shippingOptions = [
    {
        id: "seed-shipping-standard",
        methodId: "standard",
        label: "Standard",
        description: "5–7 business days",
        priceCents: 499,
        freeAboveSubtotalCents: 7500,
        sortOrder: 0,
    },
    {
        id: "seed-shipping-express",
        methodId: "express",
        label: "Express",
        description: "1–2 business days",
        priceCents: 1499,
        freeAboveSubtotalCents: null,
        sortOrder: 1,
    },
];

async function main() {
    for (const option of shippingOptions) {
        await prisma.shippingOption.upsert({
            where: { id: option.id },
            update: option,
            create: option,
        });
    }
    const activeShippingIds = shippingOptions.map((option) => option.id);
    await prisma.shippingOption.deleteMany({
        where: { id: { notIn: activeShippingIds } },
    });
    console.log(`Seeded ${shippingOptions.length} shipping options.`);

    for (const category of categories) {
        await prisma.category.upsert({
            where: { id: category.id },
            update: category,
            create: category,
        });
    }
    console.log(`Seeded ${categories.length} categories.`);

    for (const collection of collections) {
        await prisma.collection.upsert({
            where: { id: collection.id },
            update: collection,
            create: collection,
        });
    }
    console.log(`Seeded ${collections.length} collections.`);

    for (const room of rooms) {
        await prisma.room.upsert({
            where: { id: room.id },
            update: room,
            create: room,
        });
    }
    console.log(`Seeded ${rooms.length} rooms.`);

    for (const style of styles) {
        await prisma.style.upsert({
            where: { id: style.id },
            update: style,
            create: style,
        });
    }
    console.log(`Seeded ${styles.length} styles.`);

    for (const color of colors) {
        await prisma.color.upsert({
            where: { id: color.id },
            update: color,
            create: color,
        });
    }
    console.log(`Seeded ${colors.length} colors.`);

    for (const material of materials) {
        await prisma.material.upsert({
            where: { id: material.id },
            update: material,
            create: material,
        });
    }
    console.log(`Seeded ${materials.length} materials.`);

    for (const product of products) {
        await prisma.product.upsert({
            where: { id: product.id },
            update: product,
            create: product,
        });
    }
    console.log(`Seeded ${products.length} products.`);

    await prisma.productVariant.deleteMany({
        where: { productId: { in: products.map((product) => product.id) } },
    });

    await prisma.productVariant.createMany({
        data: variants,
    });
    console.log(`Seeded ${variants.length} product variants.`);

    await prisma.color.deleteMany({
        where: {
            id: { in: staleSeedIds(legacySeedIds.colors, activeSeedIds.colors) },
            variants: { none: {} },
        },
    });
    await prisma.material.deleteMany({
        where: {
            id: { in: staleSeedIds(legacySeedIds.materials, activeSeedIds.materials) },
            variants: { none: {} },
        },
    });
    await prisma.style.deleteMany({
        where: {
            id: { in: staleSeedIds(legacySeedIds.styles, activeSeedIds.styles) },
            products: { none: {} },
        },
    });
    await prisma.room.deleteMany({
        where: {
            id: { in: staleSeedIds(legacySeedIds.rooms, activeSeedIds.rooms) },
            products: { none: {} },
        },
    });
    await prisma.collection.deleteMany({
        where: {
            id: { in: staleSeedIds(legacySeedIds.collections, activeSeedIds.collections) },
            products: { none: {} },
        },
    });
    await prisma.category.deleteMany({
        where: {
            id: { in: staleSeedIds(legacySeedIds.categories, activeSeedIds.categories) },
            products: { none: {} },
        },
    });
    console.log("Removed obsolete apparel seed records when they were no longer referenced.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
