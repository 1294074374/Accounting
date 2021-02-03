
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    title: '知识区', // 状态
    list: [], // 数据列表
    type: 'us_box', // 数据类型
    loading: false // 显示等待框
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { // options 为 board页传来的参数
    const _this = this;
    _this.setData({
      
      loading: false // 关闭等待框
    })
  }
})