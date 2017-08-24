//index.js
//获取应用实例
Page({
  data: {
   
  },
  sliderChange: function () {

  },
  onLoad: function () {
    console.log('onLoad')
    var that = this;
    wx.getStorage({
      key: 'persons',
      success: function (res) {
        that.setData({
          persons: res.data
        });
      }
    });
  }
})