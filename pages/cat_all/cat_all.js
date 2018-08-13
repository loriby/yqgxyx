const utils = require('../../utils/util.js');
Page({
  data: {
		selArr: ['list_checked','','','',''],
		wH: wx.getSystemInfoSync().windowHeight-51,
		cate_list: '',
		selectIdx: 0,
		loadingStatus: false
  },
	search:function(){
		wx.navigateTo({
			url: '/pages/search/index/index'
		})
	},
	sel_list:function(e){
		var idx = e.currentTarget.dataset.idx;
		var arr = ['', '', '', '', '', '', '', '', '', '','', '', '', '', '','', '', '', '', ''];

		arr[idx] = 'list_checked';
		this.setData({
			selArr: arr,
			selectIdx: idx
		})
	},
	onLoad:function(){
		const that = this;

		utils.getData('https://awgou.cn/awg/Api-Cat.json','get','',function(res){
				that.setData({
					cate_list: res,
					loadingStatus: true
				})
		})
	},
	goList: function(e){
		var cid = e.currentTarget.dataset.cid;

		wx.navigateTo({
			url: '../cate_list/cate_list?id='+cid
		})
	}
})