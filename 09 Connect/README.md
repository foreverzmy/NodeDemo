# Connect模块

Connect模块是一个框架，它使用被称为中间件的模块化组件，以可重用的方式实现Web程序中的逻辑。

在Connect中，中间件组件是一个函数，它拦截HTTP服务器提供的请求和响应对象，执行逻辑，然后或者结束响应，或者把它传递给下一个中间件组件。Connect用分派器把中间件“连接”在一起。

## 01.js：搭建一个Connect程序

在Connect中，中间件是一个JS函数，按惯例会接收三个参数：一个请求对象，一个响应对象，还有一个通常被命名为next的参数，它是一个回调函数，表明这个组件已经完成了它的工作，可以执行下一个中间件了。

## 02.js：挂载中间件和服务器

connect有一个挂载的概念，可以给中间件或整个程序定义一个路径前缀。挂载还将只对路径前缀内的请求调用中间件或程序。

当`use()`的第一个参数是个字符串时，只有URL的前缀与之匹配时，connect才会调用后面的中间件。

`restrict`实现了一个简单的Basic认证逻辑，Basic认证是一种简单的认证机制，借助带着Base64编码认证信息的HTTP请求头中的authization字段进行认证。

#03：构建路由中间件

在Web程序中，路由是个至关重要的概念。简而言之，它会把请求URL映射到实现业务逻辑的函数上。

## 04：错误处理

错误处理中间件函数必须接受四个参数：err、req、res和next。

## 05：中间件

### cookie-parser

connect的中间件全部分离出来成为单独的包，所以要先安装对应得包才能使用中间件。

`cookie-paeser`中间件模块支持常规的cookie、签名cookie和特殊的JSON cookie。`req.cookies`默认是用常规未签名cookie组装而成的。

`cookie-paeser`不会为设定出站cookie提供任何帮助，所以要使用`res.setHeader()`函数来设定名为`Set-Cookie`的响应头来设置cookie。

### body-parser

所有的web程序都需要接受用户的输入。`body-parser`组件提供了`req.body`属性，可以用来解析JSON、x-www-form-urlencoded和multipart/form-data请求。如果是multipart/form-data请求，比如文件上传，则还有`req.files`对象。

### limit

`limit`组件的作用是帮助过滤巨型的请求，比如一个用户上传图片时发送了一张未经压缩的RAW图片，有几百兆的数据，这时候就会造成线程堵塞，使程序不能继续运行。

## method-override

浏览器的`<form>`只能POST和GET，所以当需要使用PUT和DELETE时就会出现问题。常见的解决方法是添加一个`<input type='hidden'>`，将其值设置为要用的方法名，然后让服务器检查那个值并“假装”它是这个请求的请求方法。`method-override`就是服务器这边的解决方法。