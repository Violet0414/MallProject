const express = require('express')
const router = express.Router()
//导入数据库 sqlFn('sql',[],res=>{})
const sqlFn = require('./mysql')

//图片需要的模块
const multer = require('multer')
const fs = require('fs')

// //导入模块 jsonwebtoken   密钥
const jwt = require('jsonwebtoken');
// config.jwtSecert
const config = require('./secert')
const { table } = require('console')
// //导入mockjs 
// const Mock = require('mockjs');



//登录接口
/**
 * 语法：
 * 如60，"2 days"，"10h"，"7d"，Expiration time，过期时间
 *  jwt.sign({},'秘钥','过期时间,{expiresIn:20*1,'1day''1h'}')
 */

// 登录接口
router.post('/login', (req, res) => {
    // console.log(req)
    let { username, password } = req.body
    console.log(req.body)
    console.log(username, password)
    //请求数据库
    let sql = "select * from user where uid=? and pwd=?";
    let arr = [username, password]
    sqlFn(sql, arr, result => {
        if (result.length > 0) {
            let token = jwt.sign({
                username: result[0].username,
                id: result[0].id,
            }, config.jwtSecert, {
                expiresIn: 20 * 1
            })
            res.send({
                status: 200,
                data: token
            })
        } else {
            res.send({
                status: 404,
                msg: '信息错误'
            })
        }
    })
})


// 注册接口
router.post("/register", (req, res) => {
    const {
        username,
        password
    } = req.body;
    const sql = "insert into user values(uid,pwd,name)";
    const arr = [username, password];
    sqlFn(sql, arr, (result) => {
        if (result.affectedRows > 0) {
            res.send({
                msg: "注册成功",
                status: 200
            })
        } else {
            res.status(401).json({
                errors: "用户名密码错误"
            })
        }
    })
})


//  获取商品列表
router.get('/showGoods', (req, res) => {
    const page = req.query.page || 1;
    const sqlLen = "select * from goods where gid";
    sqlFn(sqlLen, null, data => {
        let len = data.length;
        const sql = "select * from goods order by gid asc limit 15 offset " + (page - 1) * 15;
        sqlFn(sql, null, result => {
            if (result.length > 0) {
                res.send({
                    status: 200,
                    data: result,
                    pageSize: 15,
                    total: len
                })
            } else {
                res.send({
                    status: 500,
                    msg: "暂无数据"
                })
            }
        })
    })
}),


//  获取特殊商品
router.get('/specialGoods', (req, res) => {
    const page = req.query.page || 1;
    var type = req.query.type
    const sqlLen = "select * from goods where gid";
    sqlFn(sqlLen, null, data => {
        let len = data.length;
        const sql = "select * from goods where type = " + type +  " order by gid asc limit 5 offset " + (page - 1) * 5;
        sqlFn(sql, null, result => {
            if (result.length > 0) {
                res.send({
                    status: 200,
                    data: result,
                    pageSize: 5,
                    total: len
                })
            } else {
                res.send({
                    status: 500,
                    msg: "暂无数据"
                })
            }
        })
    })
}),


// 获取搜索结果
router.get('/getSearch', (req, res) => {
    const page = req.query.page || 1;
    var type = req.query.type;
    var search = req.query.search;
    const sqlLen = "select * from goods where concat(`" + type + "`) like '%" + search + "%'";
    sqlFn(sqlLen, null, data => {
        let len = data.length;
        const sql = 
        "select * from goods where concat(`" + type + "`) like '%" 
        + search + "%' order by gid asc limit 15 offset " + (page - 1) * 15;
        console.log(sql)
        sqlFn(sql, null, result => {
            if (result.length > 0) {
                res.send({
                    status: 200,
                    data: result,
                    pageSize: 15,
                    total: len
                })
            } else {
                res.send({
                    status: 500,
                    msg: "暂无数据"
                })
            }
        })
    })
}),


//  获取商品详情
router.get('/goodsDetail', (req, res) => {
    var gid = req.query.gid;
    console.log("++++++++++++++", req.query)
    console.log("===================", gid)
    const sql = "select * from goods where gid =" + gid;
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result
                
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})


//  显示评论列表
router.get('/showComments', (req, res) => {
    var gid = req.query.gid;
    console.log("===================", gid)
    const sql = "select * from comment where gid =" + gid;
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result
                // result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})


// 发布评论
router.get("/addComments", (req, res) => {
    // 获取参数
    var uid = req.query.uid
    var gid = req.query.gid;
    var content = req.query.content || "";
    var time = new Date();
    const sql = "insert into comment values (null,?,?,?,?)"
    var arr = [gid, uid, content, time.toLocaleDateString()];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})



// ============================================== 个人信息操作接口 ==============================================


// 获取个人信息模块数据
router.get('/getCenter', (req, res) => {
    var uid = req.query.uid;
    const sql = "select * from users where uid =" + uid;
    sqlFn(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result,
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})


// 修改个人信息
router.get('/changeMessage', (req, res) => {
    var tableName = req.query.tableName;
    var uid = req.query.uid;
    var column = req.query.column;
    var message = req.query.message
    console.log('column:',column)
    console.log('message:',message)
    const sql = "UPDATE " + tableName + " SET " + column + " = '" + message + "' WHERE uid =" + uid 
    console.log(sql)
    sqlFn(sql, null, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                data: result,
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})



// ============================================== ======= ==============================================


// 商品更新
router.get("/updateGoods", (req, res) => {
    var gid = req.query.gid;
    var name = req.query.name;
    var price = req.query.price
    var type = req.query.type;
    var parameter = req.query.parameter;
    var introduction = req.query.introduction;
    var img = req.query.img;
    var sql = "update goods set name=?,type=?,price=?,parameter=?,introduction=?,img=? where gid=?";
    var arr = [name, type, price, parameter, introduction, img, gid];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "修改成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "修改失败"
            })
        }
    })
})


// 添加商品
router.get("/addGoods", (req, res) => {
    var name = req.query.name;
    var price = req.query.price;
    var type = req.query.type;
    var parameter = req.query.parameter;
    var introduction = req.query.introduction;
    var img = req.query.imgUrl;
    const sql = "insert into goods values (null,?,?,?,?,null,null,?,?)"
    var arr = [type, img, name, price, parameter, introduction];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})


// 商品删除
router.get("/delGoods", (req, res) => {
    var gid = req.query.gid;
    const sql = "delete from goods where gid=?"
    const arr = [gid];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})


// ============================================= 购物车 ================================================

// 获取购物车数据
router.get("/getCart", (req, res) => {
    const page = req.query.page || 1;
    var uid = req.query.uid;
    const sql = "select uid, cart.number, goods.gid, goods.name, goods.img, goods.price, goods.introduction " +
    "from cart,goods where cart.uid =" + uid + " and cart.gid = goods.gid order by goods.gid asc limit 5 offset " + (page - 1) * 5
    sqlFn(sql, null, (result) => {
        const len = result.length;
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result,
                pageSize: 5,
                total: len
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})


// 添加到购物车
router.get("/addCart", (req, res) => {
    var uid = req.query.uid;
    var gid = req.query.gid;
    const sql = "insert into cart values (?,?,1)"
    var arr = [uid, gid];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})


// 从购物车移除
router.get("/delCart", (req, res) => {
    var uid = req.query.uid;
    var gid = req.query.gid;
    const sql = "delete from cart where uid=" + uid + " and gid in(" + gid + ")"
    var arr = [uid, gid];
    sqlFn(sql, arr, result => {
        console.log(sql)
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})

// ============================================= 订单 ================================================

// 添加订单
router.get("/addOrder", (req, res) => {        
    var uid = req.query.uid;
    var detail = req.query.detail;
    var prcie = req.query.prcie;
    var address = req.query.address;
    var time = new Date();
    const sql = "insert into orders values (null,?,?,?,?,?)"
    var arr = [uid, detail, prcie, address, time.toLocaleDateString()];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "结算成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "结算失败"
            })
        }
    })
})




// ============================================== ======= ==============================================

// 上传图片
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./upload/")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

var createFolder = function (folder) {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
}

var uploadFolder = './upload/';
createFolder(uploadFolder);
var upload = multer({
    storage: storage
});

router.post('/upload', upload.single('file'), function (req, res, next) {
    var file = req.file;
    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);
    res.json({
        res_code: '0',
        name: file.originalname,
        url: file.path
    });
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./upload/")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

module.exports = router