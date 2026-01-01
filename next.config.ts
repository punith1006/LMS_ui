import type { NextConfig } from "next";
import { basepath } from "@/app/common/constants";
const nextConfig: NextConfig = {
  basePath:basepath,
  devIndicators :{
    appIsrStatus:false
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
    reactStrictMode: true,
};

export default nextConfig;
