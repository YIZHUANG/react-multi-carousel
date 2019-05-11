
const withTypescript = require("@zeit/next-typescript");
const withPlugins = require("next-compose-plugins");
const withFonts = require("next-fonts");
const withCSS = require("@zeit/next-css");
const withTM = require("next-transpile-modules");
const plugins = [
  withTM({
    transpileModules: ["src"]
  }),
  withFonts,
  withCSS,
  withTypescript
];

const commonConfig = {
  poweredByHeader: false,
  useFileSystemPublicRoutes: false,
  distDir: ".next",
  webpack: (config, options) => {
    if (options.isServer && options.dev) {
      const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
      config.plugins.push(
        new ForkTsCheckerWebpackPlugin({
          tsconfig: "./tsconfig.json"
        })
      );
    }
    return config;
  }
};

module.exports = withPlugins(plugins, commonConfig);
