import type { BlogData } from "./types";

import energyInvestmentAfrica2026 from "./energy-investment-africa-2026";
import renewableEnergyConferencesAfrica from "./renewable-energy-conferences-africa";
import energyPolicyAfrica2026 from "./energy-policy-africa-2026";
import renewableEnergyPolicyAfrica from "./renewable-energy-policy-africa";
import greenHydrogenAfrica2026 from "./green-hydrogen-africa-2026";
import geothermalEnergyAfrica2026 from "./geothermal-energy-africa-2026";
import globalCleanEnergyDestination from "./global-clean-energy-destination";
import topAfricaEnergyEvents2026 from "./top-africa-energy-events-2026";

// The keys here are the URL slugs — e.g. /media/blogs/energy-investment-africa-2026
export const blogsData: Record<string, BlogData> = {
  "energy-investment-africa-2026": energyInvestmentAfrica2026,
  "renewable-energy-conferences-africa": renewableEnergyConferencesAfrica,
  "energy-policy-africa-2026": energyPolicyAfrica2026,
  "renewable-energy-policy-africa": renewableEnergyPolicyAfrica,
  "green-hydrogen-africa-2026": greenHydrogenAfrica2026,
  "geothermal-energy-africa-2026": geothermalEnergyAfrica2026,
  "global-clean-energy-destination": globalCleanEnergyDestination,
  "top-africa-energy-events-2026": topAfricaEnergyEvents2026,

  // ────────────────────────────────────────────────────────────
  // TO ADD A NEW BLOG:
  // 1. Create a new file in this folder, e.g. "my-new-blog-slug.ts"
  //    (copy the structure of any existing file as a template)
  // 2. Import it above:  import myNewBlogSlug from "./my-new-blog-slug";
  // 3. Add one line here: "my-new-blog-slug": myNewBlogSlug,
  // That's it — it will automatically appear on the blog listing
  // page and be reachable at /media/blogs/my-new-blog-slug
  // ────────────────────────────────────────────────────────────
};

export type { BlogData };

// Groups every blog by its primaryCategory, in the order each
// category first appears. The listing page uses this to render
// one section per category automatically — add a new category
// string to any blog file and a new section appears with no
// other code changes needed.
export function getBlogsGroupedByCategory() {
  const groups = new Map<string, { slug: string; blog: BlogData }[]>();

  for (const [slug, blog] of Object.entries(blogsData)) {
    const key = blog.primaryCategory;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push({ slug, blog });
  }

  return Array.from(groups.entries()).map(([category, posts]) => ({
    category,
    posts,
  }));
}