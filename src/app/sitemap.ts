import { MetadataRoute } from "next";
import { CONFIG } from "@/config";

const sitemap = (): MetadataRoute.Sitemap => {
  return [
    {
      url: CONFIG.APP_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    // Example for more routes:
    // {
    //   url: `${CONFIG.APP_URL}/about`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
  ];
};

export default sitemap;
