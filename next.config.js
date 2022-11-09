/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;

module.exports = {
  compiler: {
    styledComponents: true,
  },

  images: {
    domains: ["zsmobqgplqouebjzyqmy.supabase.co"],
  },

  async redirects() {
    return [
      {
        source: "/about",
        destination: "/",
        permanent: true,
      },
    ];
  },
};
