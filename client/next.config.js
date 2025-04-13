import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    domains: ["digitalgb.in","res.cloudinary.com","localhost" , "www.digitalgb.co.uk"],
  },
};

export default config;
