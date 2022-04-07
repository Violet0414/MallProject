const base ={

    host:'http://localhost:8888',                   // 基础域名
    uploadUrl:'/api/upload',                        // 图片上传 post请求


    showGoods: '/api/showGoods',                    // 商品列表展示
    specialGoods: '/api/specialGoods',              // 特殊商品展示
    goodsDetail: '/api/goodsDetail',                // 商品详情
    showComments: '/api/showComments',              // 评论列表
    addComments: '/api/addComments',                // 添加评论
    getSearch: '/api/getSearch',                    // 获取搜索结果



    updateGoods: '/api/updateGoods',                // 更新商品
    delGoods: '/api/delGoods',                      // 删除商品
    addGoods: '/api/addGoods',                      // 添加商品

// ============================================================================================    
    getCart: '/api/getCart',                        // 获取购物车数据
    addCart: '/api/addCart',                        // 添加到购物车
    delCart: '/api/delCart',                        // 移出购物车



// ============================================================================================
    addOrder: '/api/addOrder',                      // 结算生成订单
    showOrders: '/api/showOrders',                  // 管理员展示订单列表
    delOrder: '/api/delOrder',                      // 管理员删除订单
    searchOrder: '/api/searchOrder',                // 查询订单
    changeOrder: '/api/changeOrder',                // 更改订单状态

    


// ============================================================================================

    getCenter: '/api/getCenter',                     // 获取个人信息
    changeMessage: '/api/changeMessage',             // 修改个人信息

    login:'/api/login',                              // 登录接口
    register: '/api/register',                       // 注册接口
}

export default base;
