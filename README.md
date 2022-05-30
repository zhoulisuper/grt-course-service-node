### 项目结构

- module 文件夹
  - auth 授权功能-调用授权函数得到 token，包括 redis 换存处理及过期逻辑
  - getConfig 获取配置-通过 apigID 获取用户在 openAPI 平台进行的复杂映射配置
  - http http 服务-封装统一的与第三方交互的 http 服务。统一错误处理及参数封装
  - switch 参数转换-根据数据和映射关系得到想要的数据，包括自定义函数的处理逻辑
- config.js 本地 debug 配置文件
- config.json 本地 debug 配置文件
- event.json 本地 debug 配置文件
- index.js 项目入口
- node.main.js 本地 debug 入口

### 本地测试

#### 本程序提供服务内容

根据配置 执行不同的处理函数 经过出入参数的转换 从而无痕对接第三方平台

### 本地安装

npm install

### 本地启动

npm start

或者

开启 vscode debug
