//index.js
//获取应用实例
Page({
  data: {

  },
  getBalance: function (sheet) {
    let balance = 0;
    sheet.forEach((detail) => {
      balance += detail.number * (detail.positive ? 1 : -1);
    });
    return balance;
  },
  overview: function () {
    wx.setStorage({
      key: "sheets",
      data: this.data.sheets,
    });
    wx.navigateTo({
      url: '../overview/index'
    });

  },
  onLoad: function () {
    var that = this;
    wx.getStorage({
      key: 'sheets',
      success: function (res) {
        const sheets = res.data;
        const overviews = [];
        for (let i = 0; i < sheets.length; i++) {
          sheets[i].forEach((detail) =>{
            const { personName, positive, number } = detail;
            const personOverview = {
              personName,
              balance: (positive ? 1 : - 1) * number,
            };
            if (i === 0) {
              overviews.push(personOverview);  
            } else {
              const personOverviewIndex = overviews.findIndex((overview) =>
                overview.personName === personName);
              const balance = personOverview.balance + overviews[personOverviewIndex].balance;
              overviews[personOverviewIndex] = {
                personName,
                balance,  
              };               
            }
          });
        }
        that.setData({ overviews });
      }
    });
  }
})