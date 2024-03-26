/** @type {import('next').NextConfig} */

const nextConfig = {
  rewrites: () => {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3333/api/:path*",
      },
    ]
  },
  transpilePackages: ['three'],
};

export default nextConfig;
