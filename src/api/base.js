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
    updateSales: '/api/updateSales',                // 更新销量
    selectStock: '/api/selectStock',                // 查询库存
    updateStock: '/api/updateStock',                // 更新库存

// ============================================================================================    
    getCart: '/api/getCart',                        // 获取购物车数据
    addCart: '/api/addCart',                        // 添加到购物车
    delCart: '/api/delCart',                        // 移出购物车
    selectCart: '/api/selectCart',                  // 判断商品是否已在购物车内



// ============================================================================================
    addOrder: '/api/addOrder',                      // 结算生成订单
    showOrders: '/api/showOrders',                  // 管理员展示订单列表
    delOrder: '/api/delOrder',                      // 管理员删除订单
    searchOrder: '/api/searchOrder',                // 查询订单
    changeOrder: '/api/changeOrder',                // 更改订单状态
    myOrders: '/api/myOrders',                      // 获取个人订单
    searchMyorders: '/api/searchMyorders',          // 搜索个人订单

    


// ============================================================================================

    getCenter: '/api/getCenter',                     // 获取个人信息
    changeMessage: '/api/changeMessage',             // 修改个人信息
    editComments: 'api/editComments',                // 展示评论表单
    editUsers: '/api/editUsers',                     // 展示用户列表
    delComment: '/api/delComment',                   // 删除评论
    delUser: '/api/delUser',                         // 删除用户
    searchUser: '/api/searchUser',                   // 搜索用户
    searchComment: '/api/searchComment',             // 搜索评论
    addFeedback: '/api/addFeedback',                 // 提交反馈
    editProposal: '/api/editProposal',               // 获取反馈
    delProposal: '/api/delProposal',                 // 删除反馈

    getNum: '/api/getNum',                           // 获取总数
    getProfit: '/api/getProfit',                     // 获取总利润
    getSales:'/api/getSales',                        // 获取销量

    login:'/api/login',                              // 登录接口
    register: '/api/register',                       // 注册接口
}

export default base;
