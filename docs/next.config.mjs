/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // GitHub Pages subdirectory path
  // Change this to '' if deploying to a user/organization page (username.github.io)
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '/private-decentralized-lottery',
  trailingSlash: true,
};

export default nextConfig;

