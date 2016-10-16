# 第九课前端实现
### 基础框架
> react 
react-router 
redux 
jquery

### 开启本地开发服务
```shell
# 这种方式开启的服务，在文件上传的时候，转发到mock-server会有问题
#找到问题原因了，是因为我本地开了green vpn的问题
npm start
node mockserver/mock-server.js
```

###也可以用下面的方式启动本地服务
```shell
# 也可以用下面，不推荐(只有需要在服务端模拟一些特殊请求采用)
node dev-server.js
node mockserver/mock-server.js
```

### 本地mock服务模拟
每次添加一个服务，都需要去mockserver/proxyConfig.js 和 mockserver/reponse中添加对应的配置和mock数据

### 编译测试环境代码
```shell
npm run build-dev
```

### 编译生产环境代码
```shell
npm run build-pro
```

样式和ui库请参考[react-ui](http://lobos.github.io/react-ui/0.6/#/home, "react-ui")

react ui 组件库参考[react-component](https://github.com/react-component, "react-component") 和 [ant-design](https://ant.design/docs/react/introduce, "ant-design")
