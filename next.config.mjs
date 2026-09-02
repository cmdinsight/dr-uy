/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  // `npm run build` y `tsc --noEmit` pasan limpios (verificado localmente con
  // Node 24). Si algún cambio futuro rompe tipos, el build de Vercel lo frena.
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
