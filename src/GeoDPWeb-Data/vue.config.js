const path = require("path");

module.exports = {
  // publicPath: process.env.VUE_APP_BASE_URL,
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  //生成的生产环境构建文件的目录
  outputDir: "data",
  //静态资源 (js、css、img、fonts) 目录 (相对于 outputDir 的)
  assetsDir: "assets",
  //指定生成的 index.html 的输出路径 (相对于 outputDir)
  indexPath: "index.html",
  //默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变)
  filenameHashing: true,
  //是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
  lintOnSave: true,
  //是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右
  runtimeCompiler: false,

  //如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  // pages: {
  //   index: {
  //     // page 的入口
  //     entry: "src/main.js",
  //     // 模板来源
  //     template: "public/index.html",
  //     // 在 dist/index.html 的输出
  //     filename: "index.html",
  //     // 当使用 title 选项时，
  //     // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
  //     title: "Index Page",
  //     // 在这个页面中包含的块，默认情况下会包含
  //     // 提取出来的通用 chunk 和 vendor chunk。
  //     chunks: ["chunk-vendors", "chunk-common", "index"]
  //   }
  // },
  //它支持webPack-dev-server的所有选项
  devServer: {
    host: "localhost",
    port: 3000, //端口号
    https: false,
    open: false, //配置自动启动浏览器
    overlay: {
      //是否让浏览器 overlay 显示警告和错误
      warnings: false,
      errors: true
    }
  },
  css: {
    loaderOptions: {}
  },
  chainWebpack: config => {
    config.module
      .rule("svg")
      .exclude.add(path.resolve(__dirname, "./src/theme/style/icon"))
      .end();
    config.module
      .rule("svgicon")
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, "./src/theme/style/icon"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();
  },
  configureWebpack: config => {
    // 生成环境
    let pluginsPro = [];
    // 开发环境
    let pluginsDev = [];
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
      config.plugins = [...config.plugins, ...pluginsPro];
      return {
        performance: {
          // 解决入口文件大小被限制警告，并增加JS性能超标提示
          hints: "warning",
          maxEntrypointSize: 50000000,
          maxAssetSize: 30000000,
          assetFilter: function(assetFilename) {
            return assetFilename.endsWith(".js");
          }
        }
      };
    } else {
      // 为开发环境修改配置...
      config.plugins = [...config.plugins, ...pluginsDev];
    }
  }
};
