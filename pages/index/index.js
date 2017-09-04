//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    persons: [],
    personName: '',
    isPersonNameInputDisable: true,
  },
  //事件处理函数
  addPerson: function() {
    const persons = [...this.data.persons, this.data.personName]
    this.setData({
      persons,
      personName: '',
      isPersonNameInputDisable: true,
    });
  },
  removePerson: function (event) {
    const index = event.currentTarget.dataset.personIndex;
    const persons = [...this.data.persons];
    persons.splice(index, 1);
    this.setData({
      persons,
    });
  },
  personNameChange: function (event) {
    const personName = event.detail.value;
    this.setData({
      personName, 
      isPersonNameInputDisable: personName.length === 0,  
    });
  },
  isPersonNameEmpty: function () {
    return this.data.person.length !== 0;
  },
  goToCalculator: function() {
    wx.setStorage({
      key: "persons",
      data: this.data.persons,
    });
    wx.navigateTo({
      url: '../calculator/index'
    }); 
  },
  reset: function() {
    wx.clearStorage();
    this.setData({
      persons: [],
    })
  },
})
