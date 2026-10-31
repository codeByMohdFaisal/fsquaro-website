/**
 * Review-stage FSquaro catalogue data.
 *
 * Folder names are retained here only for asset traceability. They are not
 * approved public names. Numeric fragments in source folders are internal
 * reference values and must never be rendered in customer-facing UI.
 */

export type CategoryId =
  | "earrings-jhumkas"
  | "necklaces-pendants"
  | "bangles-bracelets"
  | "hair-accessories";

export type VariantAttributeKey = "color" | "design" | "packaging";

export interface Category {
  id: CategoryId;
  name: string;
}

export interface ProductVariant {
  id: string;
  label: string;
  sourceFolder: string;
  attributes: Partial<Record<VariantAttributeKey, string>>;
  mainImage: string;
  /** Additional product images are intentionally not assigned roles yet. */
  secondaryImageCount: number;
  verificationStatus: "needs-review" | "confirmed";
}

export interface Product {
  id: string;
  slug: string;
  /** Confirmed public name, populated only after an owner approves it. */
  publicName: string | null;
  /** Safe review-only label; not approval for production use. */
  reviewLabel: string;
  sourceFolder: string;
  categoryId: CategoryId;
  visibility: "review" | "published";
  verificationStatus: "needs-review" | "confirmed";
  featured: boolean;
  searchTerms: readonly string[];
  variants: readonly ProductVariant[];
  /** Empty until a verified external marketplace destination is provided. */
  marketplaceLinks: readonly [];
}

const mainImage = (...folders: string[]) =>
  `/products/${folders.map(encodeURIComponent).join("/")}/main-image.png`;

const mainVariant = (
  id: string,
  sourceFolder: string,
  imageFolders: string[],
  secondaryImageCount: number,
): ProductVariant => ({
  id,
  label: "Main selection",
  sourceFolder,
  attributes: {},
  mainImage: mainImage(...imageFolders),
  secondaryImageCount,
  verificationStatus: "needs-review",
});

export const categories: readonly Category[] = [
  { id: "earrings-jhumkas", name: "Earrings & Jhumkas" },
  { id: "necklaces-pendants", name: "Necklaces & Pendants" },
  { id: "bangles-bracelets", name: "Bangles & Bracelets" },
  { id: "hair-accessories", name: "Hair Accessories" },
];

export const catalogue: readonly Product[] = [
  {
    id: "earrings-tikka-set",
    slug: "earrings-tikka-set",
    publicName: null,
    reviewLabel: "Earrings & Tikka Set",
    sourceFolder: "255 Earrings and tikka set",
    categoryId: "earrings-jhumkas",
    visibility: "review",
    verificationStatus: "needs-review",
    featured: true,
    searchTerms: ["earrings", "tikka", "set"],
    variants: [mainVariant("main", "255 Earrings and tikka set", ["255 Earrings and tikka set"], 8)],
    marketplaceLinks: [],
  },
  {
    id: "butterfly-chain-source-a",
    slug: "butterfly-chain-source-a",
    publicName: null,
    reviewLabel: "Butterfly Chain — Source Group A",
    sourceFolder: "3 butterfly chain 55",
    categoryId: "necklaces-pendants",
    visibility: "review",
    verificationStatus: "needs-review",
    featured: false,
    searchTerms: ["butterfly", "chain", "necklace"],
    variants: [mainVariant("main", "3 butterfly chain 55", ["3 butterfly chain 55"], 6)],
    marketplaceLinks: [],
  },
  {
    id: "butterfly-stone-bangles",
    slug: "butterfly-stone-bangles",
    publicName: "Butterfly Stone Bangles",
    reviewLabel: "Butterfly Stone Bangles",
    sourceFolder: "Bracelet",
    categoryId: "bangles-bracelets",
    visibility: "review",
    verificationStatus: "needs-review",
    featured: true,
    searchTerms: ["butterfly", "stone", "bangles", "bracelet", "black", "red", "sky blue", "white", "pink", "gold"],
    variants: [
      { id: "black", label: "Black", sourceFolder: "Bracelet/Black", attributes: { color: "Black" }, mainImage: mainImage("Bracelet", "Black"), secondaryImageCount: 4, verificationStatus: "needs-review" },
      { id: "red", label: "Red", sourceFolder: "Bracelet/Red", attributes: { color: "Red" }, mainImage: mainImage("Bracelet", "Red"), secondaryImageCount: 5, verificationStatus: "needs-review" },
      { id: "sky-blue", label: "Sky Blue", sourceFolder: "Bracelet/Sky Blue", attributes: { color: "Sky Blue" }, mainImage: mainImage("Bracelet", "Sky Blue"), secondaryImageCount: 5, verificationStatus: "needs-review" },
      { id: "white", label: "White", sourceFolder: "Bracelet/white", attributes: { color: "White" }, mainImage: mainImage("Bracelet", "white"), secondaryImageCount: 4, verificationStatus: "needs-review" },
      { id: "pink", label: "Pink", sourceFolder: "Bracelet/Pink", attributes: { color: "Pink" }, mainImage: mainImage("Bracelet", "Pink"), secondaryImageCount: 4, verificationStatus: "needs-review" },
      { id: "gold", label: "Gold", sourceFolder: "Bracelet/Gold", attributes: { color: "Gold" }, mainImage: mainImage("Bracelet", "Gold"), secondaryImageCount: 5, verificationStatus: "needs-review" },
    ],
    marketplaceLinks: [],
  },
  {
    id: "butterfly-chain-source-b",
    slug: "butterfly-chain-source-b",
    publicName: null,
    reviewLabel: "Butterfly Chain — Source Group B",
    sourceFolder: "Butterfly chain 55",
    categoryId: "necklaces-pendants",
    visibility: "review",
    verificationStatus: "needs-review",
    featured: true,
    searchTerms: ["butterfly", "chain", "necklace"],
    variants: [mainVariant("main", "Butterfly chain 55", ["Butterfly chain 55"], 5)],
    marketplaceLinks: [],
  },
  {
    id: "earrings-multicolor-source-group",
    slug: "earrings-multicolor-source-group",
    publicName: null,
    reviewLabel: "Earrings — Multicolor Source Group",
    sourceFolder: "Earrings with box multicolor",
    categoryId: "earrings-jhumkas",
    visibility: "review",
    verificationStatus: "needs-review",
    featured: false,
    searchTerms: ["earrings", "multicolor"],
    variants: [mainVariant("main", "Earrings with box multicolor", ["Earrings with box multicolor"], 8)],
    marketplaceLinks: [],
  },
  {
    id: "earrings-silver-color-source-group",
    slug: "earrings-silver-color-source-group",
    publicName: null,
    reviewLabel: "Earrings — Silver-color Source Group",
    sourceFolder: "Earrings with box silver color",
    categoryId: "earrings-jhumkas",
    visibility: "review",
    verificationStatus: "needs-review",
    featured: false,
    searchTerms: ["earrings", "silver color"],
    variants: [mainVariant("main", "Earrings with box silver color", ["Earrings with box silver color"], 6)],
    marketplaceLinks: [],
  },
  {
    id: "hair-accessories-box-source-group",
    slug: "hair-accessories-box-source-group",
    publicName: null,
    reviewLabel: "Hair Accessories — Box Source Group",
    sourceFolder: "Hair accessories box",
    categoryId: "hair-accessories",
    visibility: "review",
    verificationStatus: "needs-review",
    featured: true,
    searchTerms: ["hair", "accessories", "box", "plastic", "polythene"],
    variants: [
      { id: "plastic-box", label: "Plastic box", sourceFolder: "Hair accessories box/Plastic box 72", attributes: { packaging: "Plastic box" }, mainImage: mainImage("Hair accessories box", "Plastic box 72"), secondaryImageCount: 5, verificationStatus: "needs-review" },
      { id: "polythene-box", label: "Polythene box", sourceFolder: "Hair accessories box/Polythene box 42", attributes: { packaging: "Polythene box" }, mainImage: mainImage("Hair accessories box", "Polythene box 42"), secondaryImageCount: 5, verificationStatus: "needs-review" },
    ],
    marketplaceLinks: [],
  },
  {
    id: "hair-clip-source-a",
    slug: "hair-clip-source-a",
    publicName: null,
    reviewLabel: "Hair Clip — Source Group A",
    sourceFolder: "Hair clip far 220",
    categoryId: "hair-accessories",
    visibility: "review",
    verificationStatus: "needs-review",
    featured: false,
    searchTerms: ["hair", "clip"],
    variants: [mainVariant("main", "Hair clip far 220", ["Hair clip far 220"], 5)],
    marketplaceLinks: [],
  },
  {
    id: "hair-clip-source-b",
    slug: "hair-clip-source-b",
    publicName: null,
    reviewLabel: "Hair Clip — Source Group B",
    sourceFolder: "Hair clip plastic 96",
    categoryId: "hair-accessories",
    visibility: "review",
    verificationStatus: "needs-review",
    featured: false,
    searchTerms: ["hair", "clip", "plastic"],
    variants: [mainVariant("main", "Hair clip plastic 96", ["Hair clip plastic 96"], 5)],
    marketplaceLinks: [],
  },
  {
    id: "heart-chain",
    slug: "heart-chain",
    publicName: null,
    reviewLabel: "Heart Chain",
    sourceFolder: "Heart chain 35",
    categoryId: "necklaces-pendants",
    visibility: "review",
    verificationStatus: "needs-review",
    featured: true,
    searchTerms: ["heart", "chain", "necklace"],
    variants: [mainVariant("main", "Heart chain 35", ["Heart chain 35"], 3)],
    marketplaceLinks: [],
  },
  {
    id: "oxidised-necklace-jhumki-source-group",
    slug: "oxidised-necklace-jhumki-source-group",
    publicName: null,
    reviewLabel: "Necklace & Jhumki — Oxidised Silver Source Group",
    sourceFolder: "Necklace & Jhumki oxidies silver",
    categoryId: "necklaces-pendants",
    visibility: "review",
    verificationStatus: "needs-review",
    featured: false,
    searchTerms: ["necklace", "jhumki", "oxidised", "silver", "black stone", "multicolor stone"],
    variants: [
      { id: "black-stone", label: "Black stone", sourceFolder: "Necklace & Jhumki oxidies silver/Black stone", attributes: { design: "Black stone" }, mainImage: mainImage("Necklace & Jhumki oxidies silver", "Black stone"), secondaryImageCount: 5, verificationStatus: "needs-review" },
      { id: "multicolor-stone", label: "Multicolor stone", sourceFolder: "Necklace & Jhumki oxidies silver/Multicolor stone", attributes: { design: "Multicolor stone" }, mainImage: mainImage("Necklace & Jhumki oxidies silver", "Multicolor stone"), secondaryImageCount: 5, verificationStatus: "needs-review" },
    ],
    marketplaceLinks: [],
  },
  {
    id: "oxidised-earrings",
    slug: "oxidised-earrings",
    publicName: null,
    reviewLabel: "Oxidised Earrings",
    sourceFolder: "oxidised earrings",
    categoryId: "earrings-jhumkas",
    visibility: "review",
    verificationStatus: "needs-review",
    featured: true,
    searchTerms: ["oxidised", "earrings", "golden", "silver"],
    variants: [
      { id: "golden", label: "Golden", sourceFolder: "oxidised earrings/Golden", attributes: { color: "Golden" }, mainImage: mainImage("oxidised earrings", "Golden"), secondaryImageCount: 6, verificationStatus: "needs-review" },
      { id: "silver", label: "Silver", sourceFolder: "oxidised earrings/Silver", attributes: { color: "Silver" }, mainImage: mainImage("oxidised earrings", "Silver"), secondaryImageCount: 6, verificationStatus: "needs-review" },
    ],
    marketplaceLinks: [],
  },
  {
    id: "oxidised-silver-earrings-jhumka-source-group",
    slug: "oxidised-silver-earrings-jhumka-source-group",
    publicName: null,
    reviewLabel: "Oxidised Silver-color Earrings & Jhumka Source Group",
    sourceFolder: "Oxidised silver color Earrings and Jhumka",
    categoryId: "earrings-jhumkas",
    visibility: "review",
    verificationStatus: "needs-review",
    featured: false,
    searchTerms: ["oxidised", "silver color", "earrings", "jhumka", "circle stone", "floral stone"],
    variants: [
      { id: "circle-stone", label: "Circle stone", sourceFolder: "Oxidised silver color Earrings and Jhumka/Circle stone", attributes: { design: "Circle stone" }, mainImage: mainImage("Oxidised silver color Earrings and Jhumka", "Circle stone"), secondaryImageCount: 5, verificationStatus: "needs-review" },
      { id: "floral-stone", label: "Floral stone", sourceFolder: "Oxidised silver color Earrings and Jhumka/Floral stone", attributes: { design: "Floral stone" }, mainImage: mainImage("Oxidised silver color Earrings and Jhumka", "Floral stone"), secondaryImageCount: 5, verificationStatus: "needs-review" },
    ],
    marketplaceLinks: [],
  },
  {
    id: "square-chain",
    slug: "square-chain",
    publicName: null,
    reviewLabel: "Square Chain",
    sourceFolder: "Square chain 55",
    categoryId: "necklaces-pendants",
    visibility: "review",
    verificationStatus: "needs-review",
    featured: true,
    searchTerms: ["square", "chain", "necklace"],
    variants: [mainVariant("main", "Square chain 55", ["Square chain 55"], 7)],
    marketplaceLinks: [],
  },
];

export const categoryById = Object.fromEntries(
  categories.map((category) => [category.id, category]),
) as Record<CategoryId, Category>;
