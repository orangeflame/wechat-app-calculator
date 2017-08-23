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
  onLoad: function () {
    console.log('onLoad')
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
