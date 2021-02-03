var app = getApp();
const requestUrl = require('../../config').requestUrl
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    isHide: false,
    userInfo: ''
  },

  onLoad: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
              // 根据自己的需求有其他操作再补充
              // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
              wx.login({
                success: res => {
                  // 获取到用户的 code 之后：res.code
                  // 可以传给后台，再经过解析获取用户的 openid
                  // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
                  // wx.request({
                  //   // 自行补上自己的 APPID 和 SECRET
                  //   url: `https://api.weixin.qq.com/sns/jscode2session?appid=wxa2f1132892efd2fb&secret=e1d4f36cca29700415575972391ea07b&js_code=${res.code}&grant_type=authorization_code`,
                  //   success: res => {
                  //     console.log(res)
                  //     // 获取到用户的 openid
                  //     console.log("用户的openid:" + res.data.openid);
                  //   }
                  // });
                }
              });
            }
          });
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          });
        }
      }
    });
  },

  bindGetPhoneNumber: function (e) {
    var that = this;
    //that.hideModal();
    wx.checkSession({
      success: function () {
        wx.login({
          success: res => {
            wx.request({
              url: '自己的登录接口', //仅为示例，并非真实的接口地址
              data: {
                account: '1514382701',
                jscode: res.code
              },
              method: "POST",
              header: {
                'content-type': 'application/json' // 默认值
              },
              success(res) {
                if (res.data.r == "T") {
                  wx.setStorage({
                    key: "openid",
                    data: res.data.openid
                  })
                  wx.setStorage({
                    key: "sessionkey",
                    data: res.data.sessionkey
                  })
                  wx.setStorageSync("sessionkey", res.data.sessionkey);
                  wx.request({
                    url: '自己的解密接口', //自己的解密地址
                    data: {
                      encryptedData: e.detail.encryptedData,
                      iv: e.detail.iv,
                      code: wx.getStorageSync("sessionkey")
                    },
                    method: "post",
                    header: {
                      'content-type': 'application/json'
                    },
                    success: function (res) {
                      if (res.data.r == "T") {
                        that.onshow(that.data.openid, that.data.userInfo, res.data.d.phoneNumber); //调用onshow方法，并传递三个参数
                        console.log("登录成功")
                        console.log(res.data.d.phoneNumber) //成功后打印微信手机号
                      } else {
                        console.log(res);
                      }
                    }
                  })
                }
              }
            })
          }
        })
      },
      fail: function () {
        wx.login({
          success: res => {
            wx.request({
              url: '自己的登录接口', //仅为示例，并非真实的接口地址
              data: {
                account: '1514382701',
                jscode: res.code
              },
              method: "POST",
              header: {
                'content-type': 'application/json' // 默认值
              },
              success(res) {
                if (res.data.r == "T") {
                  wx.setStorage({
                    key: "openid",
                    data: res.data.openid
                  })
                  wx.setStorage({
                    key: "sessionkey",
                    data: res.data.sessionkey
                  })
                  wx.request({
                    url: '自己的解密接口', //自己的解密地址
                    data: {
                      encryptedData: e.detail.encryptedData,
                      iv: e.detail.iv,
                      code: res.data.sessionkey
                    },
                    method: "post",
                    header: {
                      'content-type': 'application/json'
                    },
                    success: function (res) {
                      that.onshow(that.data.openid, that.data.userInfo, res.data.d.phoneNumber); //调用onshow方法，并传递三个参数
                    }
                  })
                }
              }
            })
          }
        })
      }
    })
  },

  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      let userInfo = e.detail.userInfo;
      app.userInfo = e.detail.userInfo;
      wx.login({
        success: function (lg) {
          wx.request({
            url: requestUrl + "/getOpenId",
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            data: {
              code: lg.code,
              avatarUrl: userInfo.avatarUrl,
              nickName: userInfo.nickName,
              country: userInfo.country,
              province: userInfo.province,
              city: userInfo.city,
              language: userInfo.language
            },
            success: res => {
              var requestData = res.data;
              console.log(res)
              console.log(res.rtCode)
              if (requestData.rtCode == "0000") {
                console.log("用户的openid:" + requestData.data.openid);
                app.openId = requestData.data.openid;
                wx.switchTab({
                  url: '../index/index'
                })
              }
            }
          });
        },
      })
    } else {
      wx.navigateTo({
        url: '../login/login'
      })
    }
  }
})