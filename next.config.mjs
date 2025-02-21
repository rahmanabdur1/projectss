/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "blogger.googleusercontent.com",
        pathname: "/**", // Allow all paths
      },
      {
        protocol: "https",
        hostname: "admin.avexim.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.avexim.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "as.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "puramas.avexim.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.images.puramas.co",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
