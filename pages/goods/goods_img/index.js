var util = require('../../../utils/util.js')
var app = getApp()
Page({
  data: {

    page: 1,
    size: 10,
    page_all_num: 0,
    comment_list: [],
    


  },

  onLoad: function (options) {
    var that = this
    this.setData({
      id: options.id,
      rank_pc: options.rank_pc
    })
    
    this.requestData(1)


  }, 
  requestData: function (status = 0) {
      var that=this
      var goods_id=that.data.id
      if (status == 1) {
        var cur_page = 1
      } else {
        var cur_page = that.data.page;
      }
      util.request(util.apiUrl + 'goods.php?act=comment_list&goods_id=' + goods_id + '&page=' + cur_page, {}, 'GET', '', function (res) {

        for (var i = 0; i < res.data.comment_lists.length; i++) {

          that.data.comment_list.push(res.data.comment_lists[i])
        }


        that.setData({
          comment_list: that.data.comment_list,
          comment_count: res.data.page.count,
          page: parseInt(res.data.page.page) + 1,
          page_all_num: res.data.page.page_all_num,
        })


      })


  },
  onReachBottom:function(){
    var that = this

    if (that.data.page <= that.data.page_all_num) {
      this.requestData()
    }

  },
  showImg: function (e) {
    var big_img = e.currentTarget.dataset.big_img
    var c_index = e.currentTarget.dataset.c_index
    var comment_list_img = this.data.comment_list[c_index].image_url
    var imgs = []

    for (var i in comment_list_img) {
      imgs[i] = comment_list_img[i].big_image_url
    }

    wx.previewImage({
      current: big_img, // 当前显示图片的http链接
      urls: imgs // 需要预览的图片http链接列表
    })
  },
  
})