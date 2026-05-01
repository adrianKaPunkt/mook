import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              svgo: true,
              svgoConfig: {
                plugins: [
                  {
                    name: "prefixIds",
                    active: false,
                  },
                ],
              },
            },
          },
        ],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
