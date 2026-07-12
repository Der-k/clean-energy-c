// app/blogs/[slug]/page.tsx
import { notFound } from "next/navigation";
import { rolesContent, editions } from "@/data/rolesData";
import RoleClientPage from "./RoleClientPage";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * 1. Performance Optimization: Pre-renders pages at build time.
 * Next.js reads your roles dictionary and compiles static HTML pages for each slug instantly.
 */
export async function generateStaticParams() {
  return Object.keys(rolesContent).map((slug) => ({
    slug: slug,
  }));
}

/**
 * 2. Route Controller
 * Pulls URL params dynamically and safe-checks them against your dataset.
 */
export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  
  // Look up the requested dataset matching the slug path
  const pageData = rolesContent[slug];

  // If a visitor requests a path that doesn't exist, instantly trigger a 404 page
  if (!pageData) {
    notFound();
  }

  return (
    <RoleClientPage data={pageData} editions={editions} />
  );
}