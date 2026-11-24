// GitHub Pages serves the host under /<repository name>.
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: repositoryName ? `/${repositoryName}` : "",
};

export default nextConfig;
