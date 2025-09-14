const path = require('path');
const webpack = require('webpack');
const { execSync } = require('child_process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const commitHash = execSync('git rev-parse --short HEAD').toString().trim();
const devApi = process.env.DEV_API || 'http://localhost:8080';

module.exports = (env, argv) => {
  const mode = argv.mode || process.env.NODE_ENV || 'production';
  const isProd = argv.mode === 'production';

  return {
    cache: { type: 'filesystem' },
    devServer: {
      client: { overlay: true },
      historyApiFallback: {
        verbose: true,
      },
      hot: true,
      port: 8082,
      proxy: [
        {
          changeOrigin: true,
          context: ['/api'],
          cookieDomainRewrite: devApi,
          logLevel: 'debug',
          pathRewrite: { '^/api': '' },
          target: devApi,
        },
      ],
      static: {
        directory: path.resolve(__dirname, 'src'),
      },
    },
    devtool: isProd ? 'source-map' : 'inline-source-map',
    entry: {
      app: path.join(__dirname, 'src', 'index.tsx'),
    },
    mode,
    module: {
      rules: [
        {
          exclude: /node_modules/,
          test: /\.tsx?$/,
          use: 'ts-loader',
        },
        {
          test: /\.css$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            { loader: 'css-loader', options: { importLoaders: 1 } },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset',
          parser: { dataUrlCondition: { maxSize: 8 * 1024 } },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    },
    optimization: {
      splitChunks: { chunks: 'all' },
      runtimeChunk: 'single',
    },
    output: {
      assetModuleFilename: 'assets/[contenthash][ext][query]',
      clean: true,
      filename: isProd ? 'js/[name].[contenthash].js' : 'js/[name].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    plugins: [
      new webpack.DefinePlugin({
        __DEV__: !isProd,
        BASE_PATH: JSON.stringify(process.env.YLITSE_BASE_PATH || ''),
        COMMIT_HASH: JSON.stringify(commitHash),
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'index.html'),
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: '**/*',
            context: path.resolve(__dirname, 'src', 'static'),
          },
          {
            from: 'login/**/*',
            context: path.resolve(__dirname, 'src'),
          },
          {
            from: 'register/**/*',
            context: path.resolve(__dirname, 'src'),
          },
          {
            from: 'landing/**/*',
            context: path.resolve(__dirname, 'src'),
          },
          {
            from: 'static/**/*',
            context: path.resolve(__dirname, 'src'),
          },
          {
            from: path.resolve(__dirname, 'licenses.json'),
            to: path.resolve(__dirname, 'dist'),
          },
        ],
      }),
      new MiniCssExtractPlugin({
        filename: isProd ? 'css/[name].[contenthash].css' : 'css/[name].css',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.tsx', '.ts', '.js'],
    },
    target: 'web',
  };
};
