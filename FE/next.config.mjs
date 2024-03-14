/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites:() => {
        return [
          {
            source: "/:api*",
            destination: "http://localhost:3333/:api*",
          },
        ]}
};

export default nextConfig;
