import { notFound } from "next/navigation";
import { rolesContent } from "@/data/rolesData";
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
 * Only the slug (a plain string) crosses the server/client boundary —
 * the actual data lookup (including icon components) happens inside
 * the client component to avoid passing functions as props.
 */
export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  // If a visitor requests a path that doesn't exist, instantly trigger a 404 page
  if (!rolesContent[slug]) {
    notFound();
  }

  return <RoleClientPage slug={slug} />;
}