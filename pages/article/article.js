
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
 
  goToEssay1: function(){
    wx.navigateTo({
      url: '../essay-1/essay-1',
    })
  },

  goToEssay2: function(){
    wx.navigateTo({
      url: '../essay-2/essay-2',
    })
  },

  goToEssay3: function(){
    wx.navigateTo({
      url: '../essay-3/essay-3',
    })
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