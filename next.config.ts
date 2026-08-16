import type { NextConfig } from "next";

// GitHub Actions sets GITHUB_ACTIONS=true automatically during CI builds.
// Locally (npm run dev / npm run build) this stays unset, so the app keeps
// serving from "/" for normal development.
const isGithubPagesBuild = process.env.GITHUB_ACTIONS === "true";
const repoName = "hotdayummhtml";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGithubPagesBuild ? `/${repoName}` : "",
  assetPrefix: isGithubPagesBuild ? `/${repoName}/` : "",
};

export default nextConfig;
