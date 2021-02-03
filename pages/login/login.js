// pages/login/login.js
const app = getApp()
const requestUrl = require('../../config').requestUrl
Page({
  data: {
    userInfo: '',
    avatarUrl: '',
    nickName: '',
    isLogin: false
  },

  getUserInfo: function (e) {
    wx.navigateTo({
      url: '../check/check',
    })
  },

  formLogin: function (e) {
    //login(this)
    const that = this;
    that.setData({
      pwd: e.detail.value.inputPwd,
      name: e.detail.value.inputName
    })
    
  },

  onLoad: function (e) {
    wx.getStorage({
      key: 'IsLogin',
      success: function (res) {
        if (res.data) {
          wx.switchTab({
            url: '../index/index'
          })
        }
      }
    })
  }
})