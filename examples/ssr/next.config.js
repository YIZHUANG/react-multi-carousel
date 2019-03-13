const withPlugins = require("next-compose-plugins");
const withCSS = require("@zeit/next-css");
const withFonts = require('next-fonts');

const config = {
    webpack: (config) => {
      config.module.rules.push({
        test: /\.(woff|woff2|eot|ttf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              limit: 1000,
              name() {
                return `[name].[ext]`
              }
            }
          }
        ]
      });
      return config;
    },
  };

module.exports = withPlugins([withCSS, withFonts], { target: "serverless" });
