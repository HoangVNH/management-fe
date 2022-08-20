const webpack = require("webpack");
const { override, addLessLoader, addWebpackPlugin } = require("customize-cra");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = override(
  addWebpackPlugin(
    new webpack.DefinePlugin({
      process: { env: {} },
    }),
    new NodePolyfillPlugin()
  ),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        "@font-family": "Poppins, sans-serif",
      },
    },
  })
);
