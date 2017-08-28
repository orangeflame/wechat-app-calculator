//index.js
//获取应用实例
Page({
  data: {
   
  },
  inputChange: function(event) {
    const number = event.detail.value;
    const personName = event.currentTarget.dataset.personName;
    let sheet = this.data.sheet;
    let personSheet = sheet.get(personName);
    personSheet.number = number;
    sheet.set(personName, personSheet);
    const balance = this.getBalance(sheet);
    this.setData({
      sheet,
      balance,
    });
  },
  sliderChange: function (event) {
    const positive = event.detail.value;
    const personName = event.currentTarget.dataset.personName;
    let sheet = this.data.sheet; 
    let personSheet = sheet.get(personName);
    personSheet.positive = positive;
    sheet.set(personName, personSheet);
    const balance = this.getBalance(sheet);
    this.setData({
      sheet,
      balance,
    });
  },
  getBalance: function (sheet) {
    let balance = 0;
    [...sheet.values()].forEach((detail) => {
      balance += detail.number * (detail.positive ? 1 : -1);
    });
    return balance;
  },
  onLoad: function () {
    var that = this;
    wx.getStorage({
      key: 'persons',
      success: function (res) {
        const persons = res.data;
        const sheets = [];
        const sheet = new Map();
        persons.forEach((person) => 
          sheet.set(person, {
            positive: true,
            number: 0,
          })
        );
        that.setData({
          persons: res.data,
          sheet,
          sheets,
          balance: 0,
        });
      }
    });
  }
})