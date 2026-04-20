const deployTarget = process.env.DEPLOY_TARGET;
const isGitHubPages = deployTarget === "github-pages";
const basePath = isGitHubPages ? "/bitcoin-dev-journal" : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...(basePath
    ? {
        basePath,
        assetPrefix: `${basePath}/`,
      }
    : {}),
};

export default nextConfig;
