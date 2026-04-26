import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/tmp/", "/.gemini/"],
    },
    sitemap: "https://harshikagawade.netlify.app/sitemap.xml",
  };
}
