const webpack = require('webpack');
const { override, addLessLoader, addWebpackPlugin } = require('customize-cra');

module.exports = override(
  addWebpackPlugin(
    new webpack.DefinePlugin({
      process: { env: {} },
    })
  ),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        '@font-family': 'Poppins, sans-serif'
      }
    }
  })
);
