import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    allowedDevOrigins: ["remodeler-echo-smashing.ngrok-free.dev"],
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "placehold.co",
            },
            {
                protocol: "https",
                hostname: "lcl9hrkqlikhnwol.public.blob.vercel-storage.com",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
