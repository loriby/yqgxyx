
Page({
  data: {
		selArr: ['list_checked','','','',''],
		wH: wx.getSystemInfoSync().windowHeight-40
  },
	search:function(){
		wx.navigateTo({
			url: '/pages/search/index/index'
		})
	},
	sel_list:function(e){
		var idx = e.currentTarget.dataset.idx;
		var arr = ['', '', '', '', ''];

		arr[idx] = 'list_checked';
		this.setData({
			selArr: arr
		})
	},
	onLoad:function(){
		
	}
})