//搭建express服务
const express = require('express')

var bodyParser = require('body-parser')
const app = express()
//post 请求表单数据
// app.use(express.urlencoded({ extended: true }))

// var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.use(bodyParser.json())
// app.use(bodyParser.text())

// 全局 中间件  解决所有路由的 跨域问题
// app.all('*',function (req,res,next) {
//     res.header('Access-Control-Allow-Origin','*')
//     res.header('Access-Control-Allow-Headers','X-Requested-With,Content-Type')
//     res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS')
//     next()
// })


// //资源共享
// const cors = require('cors')
// app.use(cors())

// //静态文件托管 ----  访问：http:localhost:8989/图片.jpg
app.use(express.static('upload'))

//路由
const router = require('./router')
// const { turn } = require('core-js/core/array')

app.use('/api',router)


app.listen(8888,()=>{
    console.log(8888);
})
