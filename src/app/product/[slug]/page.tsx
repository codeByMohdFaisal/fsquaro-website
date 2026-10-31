import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProductDetailExperience from "./product-detail-experience";
import {
  catalogue,
  getProductBySlug,
  getProductDisplayName,
} from "../../../data/catalogue";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return catalogue.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product not found | FSquaro" };
  }

  return {
    title: getProductDisplayName(product) + " | FSquaro",
    description:
      "View available FSquaro product variations and original catalogue imagery.",
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailExperience product={product} />;
}
