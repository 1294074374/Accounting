//index.js
import * as echarts from '../../ec-canvas/echarts';
const requestUrl = require('../../config').requestUrl
var app = getApp();

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);
  var option = {
    tooltip: { //提示信息
      trigger: 'item',
      formatter: function (params) { //设置提示信息的内容
        return '占比：' + params.percent + '</br>面积：' + params.data.value + '</p><p>项目数量：' + params.data.count;
      },
      textStyle: { //设置提示信息的样式
        color: '#fff',
        fontsize: 12
      }
    },
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#FF9F7F", "#67E0E3", "#91F2DE", "#FFDB5C", "#"],
    series: [{
      label: {
        normal: {
          fontSize: 14
        }
      },
      type: 'pie',
      center: ['50%', '50%'],
      radius: [0, '75%'],
      data: []
    }]
  };
  setInterval(function () {
    var serviceData = [];
    var objBudget = new Object();
    objBudget.name = '预算';
    objBudget.value = app.globalData.my_budget;
    var objSpending = new Object();
    objSpending.name = '支出';
    objSpending.value = app.globalData.my_spending;
    serviceData[0] = objBudget;
    serviceData[1] = objSpending;
    option.series[0].data = serviceData;
    chart.setOption(option, true);
  }, 50)
  chart.setOption(option, true);
  return chart;
}

function opendMontshSelect() {
  let that = this;
}

Page({
  data: {
    userInfo: {},
    totalDay: 0,
    totalAmount: 0,
    income: '',
    spending: '',
    budget: '',
    month: '01',
    remain: '',
    remainBudget: '',
    startMonth: '2020-11-1',
    endMonth: '2021-02-28',
    ec: {
      onInit: initChart
    }
  },

  onLoad: function () {
    var that = this;
    //调用应用实例的方法获取全局数据
    // TODO 从后台获取参数
    wx.request({
      url: requestUrl + "/loadMyPagesDate",
      method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            data: {
              openId: app.openId
            },
            success: res => {
              var requestData = res.data;
              if (requestData.rtCode == "0000") {
                var totalDay = requestData.data.totalDay;
                var totalAmount = requestData.data.totalAmount;
                var income= requestData.data.income;
                var spending= requestData.data.spending;
                var budget= requestData.data.budget;
                var remain =requestData.data.remain;
                var startMonth = requestData.data.startMonth;
                var endMonth = requestData.data.endMonth;
                var month = requestData.data.month;
                var remainBudget = requestData.data.remainBudget;
                that.setData({
                  totalDay:totalDay,
                  totalAmount: totalAmount,
                  remain:remain,
                  spending: spending,
                  income: income,
                  budget: budget,
                  month: month,
                  startMonth: startMonth,
                  endMonth: endMonth,
                  remainBudget : remainBudget,
                  userInfo : app.userInfo
                })
                // 给app复制
                app.globalData.my_income= income;
                app.globalData.my_spending=  spending;
                app.globalData.my_budget= budget;
              }
            }
    })





    // var income= '100.00';
    // var spending= '81.11';
    // var budget= '3800.00';
    // var dataMonth="1";

    // app.getUserInfo(function (userInfo) {
    //   //更新数据
    //   that.setData({
    //     userInfo: userInfo,
    //     spending: spending,
    //     income: income,
    //     budget: budget,
    //     dataMonth: dataMonth
    //   })
    //   // 给app复制
    //   app.globalData.my_income= income;
    //   app.globalData.my_spending=  spending;
    //   app.globalData.my_budget= budget;
    // })

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.screenHeight
        })
      }
    })
  },

  bindDateChange: function (e) {
    let that = this;
    var date = e.detail.value;
    wx.request({
      url: requestUrl + "/loadMyPagesDate",
      method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            data: {
              openId: app.openId,
              selectDate: date
            },
            success: res => {
              var requestData = res.data;
              if (requestData.rtCode == "0000") {
                var totalDay = requestData.data.totalDay;
                var totalAmount = requestData.data.totalAmount;
                var income= requestData.data.income;
                var spending= requestData.data.spending;
                var budget= requestData.data.budget;
                var remain =requestData.data.remain;
                var startMonth = requestData.data.startMonth;
                var endMonth = requestData.data.endMonth;
                var month = requestData.data.month;
                var remainBudget = requestData.data.remainBudget;
                that.setData({
                  totalDay:totalDay,
                  totalAmount: totalAmount,
                  remain:remain,
                  spending: spending,
                  income: income,
                  budget: budget,
                  month: month,
                  startMonth: startMonth,
                  endMonth: endMonth,
                  remainBudget : remainBudget
                })
                // 给app复制
                app.globalData.my_income= income;
                app.globalData.my_spending=  spending;
                app.globalData.my_budget= budget;
              }
            }
    })

  }
})