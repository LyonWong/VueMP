# VueMP
Vue Muti-Page


## 安装

```
// 初始化
npm install

// 开发环境整体运行
npm start

// 开发环境运行单页面
npm run dev -- --define page=${page}

// 编译输出
npm run build
```

## 配置

### 多页面

- `/page/${entry}.html`为页面入口，对应`/src/${entry}/`
- `/src/${entry/_.js`为引导js，`/src/${entry}/idnex.vue`为引导模板

webpack配置
- 开发环境`/build/webpack.dev.conf.js`

```
// 遍历/page/中的入口文件
utils.globNames(`./page/${APP_PAGE}.html`).forEach((page)=>{
  //page entry
  entry[page] = `./src/${page}/_.js`
  //url rewrites
  historyRewrites.push({
    from: new RegExp(`^/${page}/`),
    to: path.posix.join(config.dev.assetsPublicPath, `${page}.html`)
  })
  //html injection
  htmlWebpackPlugins.push(new HtmlWebpackPlugin({
      template: `./page/${page}.html`,
      filename: `${page}.html`,
      chunks: [page],
      inject: true
    })
  )
})
```

- 生产环境`/build/webpack.prod.conf.js`
```
utils.globNames(`./page/${APP_PAGE}.html`).forEach((page) => {
  //page entry
  entry[page] = `./src/${page}/_.js`
  htmlWebpackPlugins.push(new HtmlWebpackPlugin({
    template: `./page/${page}.html`,
    filename: `./entry/${page}.html`, //输出的入口文件
    chunks: ['manifest', 'vendor', page],
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    },
    chunksSortMode: 'dependency'
    })
  )
})
```

### 静态资源

> 不常变更的资源应放在`/static/`目录下，不参与编译打包，但需要对其进行版本控制

- 开发环境`/build/webpack.dev.conf.js`
```
let htmlWebpackPlugins = [
  new HtmlIncludeAssetsPlugin({
    assets: [
      'static/css/global.css'
    ],
    append: false,
    hash: true
  })
]
```

- 生产环境`/build/webpack.prod.conf.js`
```
let htmlWebpackPlugins = [
  new HtmlIncludeAssetsPlugin({
    assets: [ // 需要引入的资源列表
      config.build.assetsSubDirectory+'/css/global.css'
    ],
    append: false,
    hash: true
  })
]
```

### 应用配置

`/src/config.js`中配配置应用相关信息，如APPID等。通过`this.app.config`引用


### 静态文件复制

开发环境`/build/webpack.dev.conf.js`
```
 new CopyWebpackPlugin([
      { // 复制资源
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      },
      { // 复制模拟接口
        from: path.resolve(__dirname, '../mock'),
        to: 'api',
        ignore: ['.*']
      }
    ])
```

### 本地化

`/config/local.js`中，可配置当前编译环境的一些参数

```
{
  host: 'localhost', // 运行时host
  port: '8080', // 运行时端口
  subDir: 'static', // webpack编译生成的静态资源目录
  assets: 'https://cdn.assets', // 外部静态资源地址
  apiBase: 'https://api' // API接口地址，通过_.js配置到api.options
}
```

### 接口转发

默认将`/api/`路径的URL请求转发到apiBase下，和`_.js`中的`api.options`可二选一

`/config/index.js`
```
    proxyTable: {
      '/api': {
        target: local.apiBase || 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {
          '\\?': '.json?',
          '$': '.json'
        },
        onProxyRes: function onProxyRes(proxyRes, req, res) {
          proxyRes.headers['Access-Control-Request-Origin'] = '*';
          proxyRes.headers['Access-Control-Request-Headers'] = '*';
        }
      }
    },
```

此文件不应加入版本库，可参照`/config/local-default.js`创建

## 其他

### 屏幕适配

在html头部增加viewport
```
<meta name="viewport" content="width=device-width,initial-scale=1.0,
```
再通过`_.js`入口JS调用`/src/js/screen-adaptor.js`可进行屏幕适配
```
adaptor(750, (screen) => {
  return screen.width < screen.height ? screen.width : '750'
})
```
- 设计宽度750px, 且限制最大宽度为750(可通过fix调整函数来自定义)
- 对于需要按比例缩放的元素，使用rem来定义， 1rem=750px
- 对于大段阅读文本，仍使用px来定义

### 开发调试

- `/mock/`中可配置接口模拟数据，默认rewrite到`/api/`路径下
- 使用IP或解析到开发机的域名，可连接移动设备实时调试
