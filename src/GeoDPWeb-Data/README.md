# 基础数据填报系统

## npm 命令

- **安装项目依赖包** `npm install --registry=https://registry.npm.taobao.org`

- **运行开发环境** `npm start`

- **为生产环境编译项目** `npm run build`

- **进行代码检查** `npm run lint`

## 基础目录结构

```
|-- vue-dhz
    |-- .env.development                //开发环境下的环境变量配置
    |-- .env.production                 //生产环境下的环境变量配置
    |-- .eslintrc.js                    //代码检查配置
    |-- .prettierrc.js                  //代码样式配置
    |-- package-lock.json
    |-- package.json                    // npm包配置
    |-- vue.config.js                   //vue开发配置
    |-- .vscode
    |   |-- settings.json               //vscode设置
    |-- public                          //HTML和静态资源
    |   |-- favicon.ico
    |   |-- index.html
    |-- src                             //项目源代码目录
        |-- App.vue                     //根组件
        |-- main.js                     //入口js文件
        |-- api                         //api目录
        |   |-- app.js                  //系统级api
        |   |-- mock                    //mock数据目录
        |       |-- index.js
        |       |-- login.js
        |       |-- session.js
        |-- assets                      //资源目录
        |   |-- images                  //图片资源目录
        |   |-- |-- logo.png
        |   |   |-- 401.gif
        |   |   |-- 404.png
        |   |   |-- 404_cloud.png
        |-- components                  //公用组件目录
        |   |-- HelloWorld.vue
        |-- router                      //路由配置
        |   |-- asyncRoutes.js          //需要进行权限控制的路由
        |   |-- constantRoutes.js       //静态路由
        |   |-- index.js
        |-- store                       //vuex 状态管理
        |   |-- index.js
        |   |-- modules                 //vuex 模块
        |       |-- app.js
        |       |-- session.js
        |-- theme                       //主题样式
        |   |-- default                 //默认主题
        |   |   |-- index.less
        |   |-- styles                   //公用样式
        |       |-- index.less
        |-- utils                       //工具类脚本目录
        |   |-- appconst.js             //常数配置
        |   |-- index.js                //工具类
        |   |-- request.js              //api请求
        |   |-- validate.js             //输入验证
        |-- views                       //页面
            |-- dashboard               //仪表盘页
            |   |-- index.vue
            |-- errorPage               //错误页
            |   |-- 401.vue
            |   |-- 404.vue
            |-- home                    //主页
            |   |-- index.vue
            |-- layout                  //布局页面
            |   |-- components          //布局页组件目录
            |   |-- index.vue
            |-- login                   //登录页
                |-- index.vue
```
