const express = require('express')
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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
// const { table } = require('console')
// //导入mockjs 
// const Mock = require('mockjs');




// 登录接口
router.post('/login', (req, res) => {
    let {uid, pwd, type} = req.body
    let sql = ''
    if(type == 1){
        sql = "select * from admin where uid=? and pwd=?"
    }else{
        sql = "select * from users where uid=? and pwd=?";
    }
    let arr = [uid, pwd]
    sqlFn(sql, arr, result => {
        if (result.length > 0) {
            let token = jwt.sign({
                uid: result[0].uid,
                name: result[0].name,
                address: result[0].address,
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
router.get("/register", (req, res) => {
    const {uid, pwd, name, sex, address, phone} = req.query;
    let sql = "select uid from users where uid = " + uid;
    sqlFn(sql, null, result => {
        if (result.length > 0) {
            res.send({
                msg: "失败",
                status: 500
            })
        }else{
            sql = "insert into users values (?, ?, ?, ?, ?, ?)";
            const arr = [uid, pwd, name, sex, address, phone];
            sqlFn(sql, arr, (result) => {
                if (result.affectedRows > 0) {
                    res.send({
                        msg: "注册成功",
                        status: 200
                    })
                } else {
                    res.send({
                        msg: "失败",
                        status: 500
                    })
                }
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
        "select * from goods where concat(`" + type + "`) like '%" + search 
        + "%' order by gid asc limit 15 offset " + (page - 1) * 15;
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
    var tableName = req.query.tableName
    const sql = "select * from " + tableName + " where uid = " + uid;
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
    console.log('uid:',uid)
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
    var score = req.query.score;
    var parameter = req.query.parameter;
    var introduction = req.query.introduction;
    var img = req.query.img;
    var stock = req.query.stock
    var sql = "update goods set name=?, type=?, price=?, stock=?, score=?, parameter=?,introduction=?,img=? where gid=?";
    var arr = [name, type, price, stock, score, parameter, introduction, img, gid];
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
    var score = req.query.score;
    var parameter = req.query.parameter;
    var introduction = req.query.introduction;
    var img = req.query.imgUrl;
    var stock = req.query.stock;
    const sql = "insert into goods values (null,?,?,?,?,0,?,?,?,?)"
    var arr = [type, img, name, price, score, parameter, introduction, stock];
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


// 商品销量更新
router.get("/updateSales", (req, res) => {
    var gid = req.query.gid;
    var num = req.query.num;
    var sql = "update goods set sales = sales + " + num + " where gid = " + gid;
    sqlFn(sql, null, result => {
        console.log("销量更新：", sql);
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


// 商品库存查询
router.get("/selectStock", (req, res) => {
    var gid = req.query.gid;
    var sql = "select stock from goods where gid = " + gid;
    sqlFn(sql, null, result => {
        console.log("库存查询：", sql);
        console.log("result:", result[0].stock);
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result[0].stock,
                msg: "查询成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "查询失败"
            })
        }
    })
})

// 商品库存更新
router.get("/updateStock", (req, res) => {
    var gid = req.query.gid;
    var num = req.query.num;
    var sql = "update goods set stock = stock - " + num + " where gid = " + gid;
    sqlFn(sql, null, result => {
        console.log("库存更新：", sql);
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


// ============================================= 购物车 ================================================

// 获取购物车数据
router.get('/getCart', (req, res) => {
    const page = req.query.page || 1;
    var uid = req.query.uid
    const sqlLen = "select * from cart where uid = "+ uid;
    sqlFn(sqlLen, null, data => {
        let len = data.length;
        const sql = "select uid, cart.number, goods.gid, goods.name, goods.img, goods.price, goods.introduction " +
        "from cart,goods where cart.uid =" + uid + 
        " and cart.gid = goods.gid order by goods.gid asc limit 5 offset " + (page - 1) * 7
        sqlFn(sql, null, result => {
            if (result.length > 0) {
                res.send({
                    status: 200,
                    data: result,
                    pageSize: 7,
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

// 判断商品是否在购物车内
router.get("/selectCart", (req, res) => {
    var uid = req.query.uid;
    var gid = req.query.gid;
    const sql = "SELECT * FROM cart where uid = " + uid + " and gid = " + gid;
    sqlFn(sql, null, (result) => {
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
    sqlFn(sql, null, result => {

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
    var prcie = req.query.prcie  + '￥';
    var address = req.query.address;
    var time = new Date();
    const sql = "insert into orders values (null,?,?,?,?,?,'0')"
    var arr = [uid, detail, prcie, address, time.toLocaleDateString()]
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

// 搜索个人订单
router.get('/searchMyorders', (req, res) => {
    const page = req.query.page || 1;
    var type = req.query.type;
    var search = req.query.search;
    var uid = req.query.uid;
    const sqlLen = "select * from orders where concat(`detail`) like '%" + search 
    + "%' and type = " + type + " and uid = " + uid;
    sqlFn(sqlLen, null, data => {
        let len = data.length;
        const sql = 
        "select * from orders where concat(`detail`) like '%" + search 
        + "%' and type = " + type + " and uid = " + uid + " order by oid asc limit 10 offset " + (page - 1) * 10;
        sqlFn(sql, null, result => {
            if (result.length > 0) {
                res.send({
                    status: 200,
                    data: result,
                    pageSize: 10,
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
})

// 管理员获取订单列表
router.get("/showOrders", (req, res) => {
    const page = req.query.page || 1;
    const type = req.query.type;
    const sql = "select * from orders where type = " + type + " order by oid asc limit 12 offset " + (page - 1) * 12
    sqlFn(sql, null, (result) => {
        const len = result.length;
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result,
                pageSize: 12,
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

// 获取个人订单列表
router.get("/myOrders", (req, res) => {
    const page = req.query.page || 1;
    const uid = req.query.uid;
    const type = req.query.type;
    const sql = "select * from orders where uid =" + uid + " and type = " + type + " order by oid asc limit 12 offset " + (page - 1) * 12
    sqlFn(sql, null, (result) => {
        const len = result.length;
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result,
                pageSize: 12,
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

// 删除订单
router.get("/delOrder", (req, res) => {
    var oid = req.query.oid;
    const sql = "delete from orders where oid =" + oid
    sqlFn(sql, null, result => {
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

// 搜索订单
router.get('/searchOrder', (req, res) => {
    const page = req.query.page || 1;
    var type = req.query.type;
    var search = req.query.search;
    const sqlLen = "select * from orders where concat(`oid`, `uid`) like '%" + search + "%' and type = " + type;
    sqlFn(sqlLen, null, data => {
        let len = data.length;
        const sql = 
        "select * from orders where concat(`oid`, `uid`, `detail`) like '%" + search 
        + "%' and type = " + type + " order by oid asc limit 10 offset " + (page - 1) * 10;
        sqlFn(sql, null, result => {
            if (result.length > 0) {
                res.send({
                    status: 200,
                    data: result,
                    pageSize: 10,
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
})

// 变更订单状态
router.get("/changeOrder", (req, res) => {
    var oid = req.query.oid;
    var sql = "update orders set type = type + 1 where oid = " + oid;
    sqlFn(sql, null, result => {
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


// ============================================= 管理用户 ===============================================

// 管理员获取评论列表
router.get("/editComments", (req, res) => {
    const page = req.query.page || 1;
    const sqlLen = "select * from comment where cid";
    sqlFn(sqlLen, null, data => {
        let len = data.length;
        const sql = "select * from comment order by cid asc limit 10 offset " + (page - 1) * 10;
        sqlFn(sql, null, result => {
            if (result.length > 0) {
                res.send({
                    status: 200,
                    data: result,
                    pageSize: 10,
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

// 查看用户
router.get("/editUsers", (req, res) => {
    const page = req.query.page || 1;
    const sqlLen = "select * from users where uid";
    sqlFn(sqlLen, null, data => {
        let len = data.length;
        const sql = "select * from users order by uid asc limit 10 offset " + (page - 1) * 10;
        sqlFn(sql, null, result => {
            if (result.length > 0) {
                res.send({
                    status: 200,
                    data: result,
                    pageSize: 10,
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


// 删除评论
router.get("/delComment", (req, res) => {
    var cid = req.query.cid;
    const sql = "delete from comment where cid =" + cid
    sqlFn(sql, null, result => {
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

// 删除用户
router.get("/delUser", (req, res) => {
    var uid = req.query.uid;
    const sql = "delete from users where uid =" + uid
    sqlFn(sql, null, result => {
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

// 搜索用户
router.get('/searchUser', (req, res) => {
    const page = req.query.page || 1;
    var search = req.query.search;
    const sqlLen = "select * from users where concat(`name`, `uid`) like '%" + search + "%'";
    sqlFn(sqlLen, null, data => {
        let len = data.length;
        const sql = 
        "select * from users where concat(`name`, `uid`) like '%" + search 
        + "%' order by uid asc limit 10 offset " + (page - 1) * 10;
        sqlFn(sql, null, result => {
            if (result.length > 0) {
                res.send({
                    status: 200,
                    data: result,
                    pageSize: 10,
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
})

// 搜索评论
router.get('/searchComment', (req, res) => {
    const page = req.query.page || 1;
    var search = req.query.search;
    const sqlLen = "select * from comment where concat(`cid`, `uid`, `content`) like '%" + search + "%'";
    sqlFn(sqlLen, null, data => {
        let len = data.length;
        const sql = 
        "select * from comment where concat(`cid`, `uid`, `content`) like '%" + search 
        + "%' order by cid asc limit 10 offset " + (page - 1) * 10;
        sqlFn(sql, null, result => {
            if (result.length > 0) {
                res.send({
                    status: 200,
                    data: result,
                    pageSize: 10,
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
})

// 提交反馈
router.get("/addFeedback", (req, res) => {        
    var content = req.query.content;
    var time = new Date();
    const sql = "insert into feedback values (null,?,?)"
    var arr = [content, time.toLocaleDateString()]
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "提交成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "提交失败"
            })
        }
    })
})

// 获取反馈
router.get("/editProposal", (req, res) => {
    const page = req.query.page || 1;
    const sqlLen = "select * from feedback where fid";
    sqlFn(sqlLen, null, data => {
        let len = data.length;
        const sql = "select * from feedback order by fid asc limit 10 offset " + (page - 1) * 10;
        sqlFn(sql, null, result => {
            if (result.length > 0) {
                res.send({
                    status: 200,
                    data: result,
                    pageSize: 10,
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

// 删除反馈
router.get("/delProposal", (req, res) => {
    var fid = req.query.fid;
    const sql = "delete from feedback where fid =" + fid
    sqlFn(sql, null, result => {
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


// ===================================== 统计数据 ========================================

//  获取各种总数
router.get('/getNum', (req, res) => {
    let tableName = req.query.tableName;
    let column = req.query.column;
    const sql = "select * from " + tableName + " where " + column;
    sqlFn(sql, null, result => {
        let len = result.length;
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result,
                num: len
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
}),

// 获取利润
router.get("/getProfit", (req, res) => {
    const sql = "SELECT SUM(price) as price FROM orders;"
    sqlFn(sql, null, (result) => {
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


// 获取销量
router.get("/getSales", (req, res) => {
    const sql = "SELECT type,SUM(sales) as sales FROM goods WHERE type BETWEEN 0 AND 5 group by type;"
    sqlFn(sql, null, (result) => {
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