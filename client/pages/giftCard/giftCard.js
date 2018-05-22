//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectImg:'',
    id:'',
    requestResult:'',
    totalnum: 0,
    totalprice: '0.00'
  },
  testCgi: function () {
    util.showBusy('请求中...')
    var that = this
    qcloud.request({
      url: `${config.service.host}/weapp/giftCard`,
      login: false,
      success(result) {
        util.showSuccess('请求成功完成')
        that.setData({
          requestResult: result.data.data.data,
          selectImg: result.data.data.data.cover_list[0].image,
          id: result.data.data.data.cover_list[0].id
        })
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })
  },
  selectTap(e){
    this.setData({
      selectImg: e.currentTarget.dataset.imgurl,
      id: e.currentTarget.dataset.id
        })
    console.log(e.currentTarget.dataset.id)
  },
  jiaTap(e){
    var index = e.currentTarget.dataset.index
    var requestResult = this.data.requestResult
    var num = requestResult.goods_list[index].num ? requestResult.goods_list[index].num:0
    requestResult.goods_list[index].num = num +1
    this.setData({
      requestResult: requestResult
    })  
    this.totalData()
  },
  jianTap(e){
    var index = e.currentTarget.dataset.index
    var requestResult = this.data.requestResult
    var num = requestResult.goods_list[index].num ? requestResult.goods_list[index].num : 0
    requestResult.goods_list[index].num = num - 1
    this.setData({
      requestResult: requestResult
    })
    this.totalData()
  },
  totalData(){
    var totalnum=0
    var totalprice=0
    var data = this.data.requestResult.goods_list
    for (var i = 0; i < data.length;i++){
      totalprice =totalprice+data[i].price * (data[i].num ? data[i].num : 0)
      totalnum = totalnum + (data[i].num ? data[i].num : 0)
    }
    this.setData({
      totalnum: totalnum,
      totalprice: (totalprice/100).toFixed(2)
    })
    console.log(totalnum)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.testCgi()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})