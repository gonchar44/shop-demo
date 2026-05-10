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
        colors: { connect: [{ id: "seed-color-cream" }, { id: "seed-color-clay" }] },
        materials: { connect: [{ id: "seed-material-ceramic" }, { id: "seed-material-linen" }] },
        dimensions: "12 x 12 x 18 in",
        weight: "4.2 lb",
        images: ["https://placehold.co/800x800?text=Ceramic+Table+Lamp"],
        thumbnail: "https://placehold.co/400x400?text=Ceramic+Lamp",
        stock: 32,
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
        colors: { connect: [{ id: "seed-color-sand" }, { id: "seed-color-black" }, { id: "seed-color-oak" }] },
        materials: { connect: [{ id: "seed-material-paper" }, { id: "seed-material-oak" }] },
        dimensions: "18 x 24 in",
        weight: "3 lb",
        images: ["https://placehold.co/800x800?text=Framed+Abstract+Poster"],
        thumbnail: "https://placehold.co/400x400?text=Abstract+Poster",
        stock: 45,
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
        colors: { connect: [{ id: "seed-color-cream" }, { id: "seed-color-sage" }, { id: "seed-color-charcoal" }] },
        materials: { connect: [{ id: "seed-material-stoneware" }] },
        dimensions: "4 x 4 x 9 in",
        weight: "1.4 lb",
        images: ["https://placehold.co/800x800?text=Stoneware+Bud+Vase"],
        thumbnail: "https://placehold.co/400x400?text=Bud+Vase",
        stock: 58,
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
        colors: { connect: [{ id: "seed-color-cream" }, { id: "seed-color-sand" }, { id: "seed-color-olive" }] },
        materials: { connect: [{ id: "seed-material-linen" }, { id: "seed-material-cotton" }] },
        dimensions: "50 x 70 in",
        weight: "2.1 lb",
        images: ["https://placehold.co/800x800?text=Linen+Throw+Blanket"],
        thumbnail: "https://placehold.co/400x400?text=Linen+Throw",
        stock: 40,
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
        colors: { connect: [{ id: "seed-color-brass" }, { id: "seed-color-black" }] },
        materials: { connect: [{ id: "seed-material-brass" }, { id: "seed-material-steel" }] },
        dimensions: "3 x 3 x 5 in",
        weight: "0.8 lb",
        images: ["https://placehold.co/800x800?text=Brass+Candle+Holder"],
        thumbnail: "https://placehold.co/400x400?text=Candle+Holder",
        stock: 80,
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
        colors: { connect: [{ id: "seed-color-oak" }, { id: "seed-color-walnut" }] },
        materials: { connect: [{ id: "seed-material-oak" }, { id: "seed-material-walnut" }] },
        dimensions: "11 x 5 x 3 in",
        weight: "1.7 lb",
        images: ["https://placehold.co/800x800?text=Oak+Desk+Organizer"],
        thumbnail: "https://placehold.co/400x400?text=Desk+Organizer",
        stock: 36,
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
        colors: { connect: [{ id: "seed-color-sand" }, { id: "seed-color-oak" }] },
        materials: { connect: [{ id: "seed-material-rattan" }] },
        dimensions: "16 x 16 x 18 in",
        weight: "3.5 lb",
        images: ["https://placehold.co/800x800?text=Rattan+Storage+Basket"],
        thumbnail: "https://placehold.co/400x400?text=Storage+Basket",
        stock: 27,
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
        colors: { connect: [{ id: "seed-color-walnut" }, { id: "seed-color-black" }] },
        materials: { connect: [{ id: "seed-material-walnut" }, { id: "seed-material-steel" }] },
        dimensions: "18 x 18 x 20 in",
        weight: "12 lb",
        images: ["https://placehold.co/800x800?text=Walnut+Side+Table"],
        thumbnail: "https://placehold.co/400x400?text=Side+Table",
        stock: 18,
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
        colors: { connect: [{ id: "seed-color-clear" }, { id: "seed-color-amber" }] },
        materials: { connect: [{ id: "seed-material-glass" }] },
        dimensions: "8 x 8 x 10 in",
        weight: "2.6 lb",
        images: ["https://placehold.co/800x800?text=Glass+Carafe+Set"],
        thumbnail: "https://placehold.co/400x400?text=Carafe+Set",
        stock: 34,
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
        colors: { connect: [{ id: "seed-color-cream" }, { id: "seed-color-charcoal" }, { id: "seed-color-sage" }] },
        materials: { connect: [{ id: "seed-material-soy-wax" }, { id: "seed-material-stoneware" }] },
        dimensions: "3 x 3 x 4 in",
        weight: "1 lb",
        images: ["https://placehold.co/800x800?text=Soy+Wax+Candle"],
        thumbnail: "https://placehold.co/400x400?text=Scented+Candle",
        stock: 96,
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
        colors: { connect: [{ id: "seed-color-sand" }, { id: "seed-color-oak" }] },
        materials: { connect: [{ id: "seed-material-cork" }, { id: "seed-material-oak" }] },
        dimensions: "24 x 18 x 1 in",
        weight: "2.8 lb",
        images: ["https://placehold.co/800x800?text=Cork+Pinboard"],
        thumbnail: "https://placehold.co/400x400?text=Cork+Pinboard",
        stock: 22,
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
        colors: { connect: [{ id: "seed-color-black" }, { id: "seed-color-white" }, { id: "seed-color-brass" }] },
        materials: { connect: [{ id: "seed-material-steel" }, { id: "seed-material-brass" }] },
        dimensions: "5 x 4 x 7 in",
        weight: "2.4 lb",
        images: ["https://placehold.co/800x800?text=Steel+Bookends"],
        thumbnail: "https://placehold.co/400x400?text=Bookends",
        stock: 64,
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

async function main() {
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
        const { colors: productColors, materials: productMaterials, ...productData } = product;

        await prisma.product.upsert({
            where: { id: product.id },
            update: {
                ...productData,
                colors: { set: productColors.connect },
                materials: { set: productMaterials.connect },
            },
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
            products: { none: {} },
            variants: { none: {} },
        },
    });
    await prisma.material.deleteMany({
        where: {
            id: { in: staleSeedIds(legacySeedIds.materials, activeSeedIds.materials) },
            products: { none: {} },
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
