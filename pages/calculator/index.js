//index.js
//获取应用实例
Page({
  data: {
   
  },
  saveSheets: function() {
    const sheets = [...this.data.sheets, this.data.sheet];
    this.setData({ sheets });
  },
  inputChange: function(event) {
    const number = event.detail.value;
    const personName = event.currentTarget.dataset.personName;
    let sheet = this.data.sheet;
    const personSheetIndex = sheet.findIndex((detail) => detail.personName == personName);
    let personSheet = sheet[personSheetIndex];
    sheet[personSheetIndex] = Object.assign(sheet[personSheetIndex], {number});
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
    const personSheetIndex = sheet.findIndex((detail) => detail.personName == personName);
    let personSheet = sheet[personSheetIndex];
    sheet[personSheetIndex] = Object.assign(sheet[personSheetIndex], {positive});
    const balance = this.getBalance(sheet);
    this.setData({
      sheet,
      balance,
    });
  },
  clearSheet: function() {
    const sheet = [];
    this.data.persons.forEach((person) => {
      sheet.push({
        positive: true,
        number: 0,
        personName: person,
      });
    });
    this.setData({
      sheet,    
    });
  },
  deleteSheets: function(event) {
    const idx = event.currentTarget.dataset.sheetIdx;
    const length = this.data.sheets.length;
    const sheets = [...this.data.sheets.slice(0, idx), ...this.data.sheets.slice(idx + 1, length)];
    this.setData({
      sheets,
      currentPage: 0,
    });
  },
  getBalance: function (sheet) {
    let balance = 0;
    sheet.forEach((detail) => {
      balance += detail.number * (detail.positive ? 1 : -1);
    });
    return balance;
  },
  overview: function() {
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
      key: 'persons',
      success: function (res) {
        const persons = res.data;
        const sheets = [];
        const sheet = [];
        persons.forEach((person) => 
          sheet.push({
            positive: true,
            number: 0,
            personName: person,
          })
        );
        that.setData({
          persons: res.data,
          sheet,
          sheets,
          balance: 0,
          currentPage: 0,
        });
      }
    });
  }
})