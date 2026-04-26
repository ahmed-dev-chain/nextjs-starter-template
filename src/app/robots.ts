import { MetadataRoute } from "next";
import { CONFIG } from "@/config";

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/auth/callback", "/private/"],
    },
    sitemap: `${CONFIG.APP_URL}/sitemap.xml`,
  };
};

export default robots;
