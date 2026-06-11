const path = require("node:path");
const rspack = require("@rspack/core");

const port = Number(process.env.PORT) || 4000;
const prod = process.env.NODE_ENV === "production";

// Workspace packages (@sprout/ui, @sprout/icons) are source-only TSX; force a
// single React instance so hooks work across package boundaries.
const reactDir = path.dirname(require.resolve("react/package.json"));
const reactDomDir = path.dirname(require.resolve("react-dom/package.json"));

module.exports = {
  entry: "./src/index.tsx",
  mode: prod ? "production" : "development",
  devServer: {
    port,
    host: "localhost",
    hot: true,
    open: false,
    historyApiFallback: true,
    // Serve bundled pictures from apps/web/static/ (e.g. static/img/foo.jpg is
    // reachable in a lesson as "img/foo.jpg"). Inline SVG is still preferred.
    static: { directory: path.resolve(__dirname, "static") },
    onListening(server) {
      const url = `http://localhost:${server.server.address().port}/`;
      console.log(`\n\x1b[32m🌱 Sprout pronto em\x1b[0m \x1b[1m${url}\x1b[0m\n`);
    },
  },
  output: {
    // "/" locally; on GitHub Pages the project is served from /<repo>/, so the
    // deploy workflow sets PUBLIC_PATH=/Sprout/ to prefix every asset URL.
    publicPath: process.env.PUBLIC_PATH || "/",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    // Content-hashed names in production so the service worker (public/sw.js)
    // can cache them forever (cache-first): a new build changes the filename
    // and the refreshed index.html points at it. Dev keeps plain names.
    ...(prod && {
      filename: "[name].[contenthash:8].js",
      chunkFilename: "[id].[contenthash:8].js",
      cssFilename: "[name].[contenthash:8].css",
      cssChunkFilename: "[id].[contenthash:8].css",
    }),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      react: reactDir,
      "react-dom": reactDomDir,
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "builtin:swc-loader",
          options: {
            jsc: {
              parser: { syntax: "typescript", tsx: true },
              transform: { react: { runtime: "automatic" } },
              target: "es2022",
            },
          },
        },
      },
      { test: /\.css$/, type: "css/auto" },
      { test: /\.md$/, type: "asset/source" },
      // Raster pictures imported from JS get a hashed URL. (Lessons usually use
      // inline SVG or static/img/ paths instead — see Figure widget.)
      { test: /\.(png|jpe?g|gif|webp|avif)$/, type: "asset/resource" },
      // Page settings live in YAML; parse them at build time into a JS object.
      { test: /\.ya?ml$/, type: "javascript/auto", use: [path.resolve(__dirname, "yaml-loader.cjs")] },
    ],
  },
  experiments: { css: true },
  plugins: [
    new rspack.HtmlRspackPlugin({ template: "./public/index.html" }),
    // Copy bundled pictures (apps/web/static/**) into the build output so
    // "img/foo.jpg" paths in lessons resolve in production too.
    new rspack.CopyRspackPlugin({ patterns: [{ from: "static", to: ".", noErrorOnMissing: true }] }),
    // Copy the PWA files (sw.js, manifest, icon) to the dist ROOT — index.html
    // is skipped because HtmlRspackPlugin already emits it from the template.
    new rspack.CopyRspackPlugin({
      patterns: [{ from: "public", to: ".", globOptions: { ignore: ["**/index.html"] } }],
    }),
  ],
};
