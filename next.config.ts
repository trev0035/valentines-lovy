import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/valentines-lovy',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

