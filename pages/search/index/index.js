var utils = require('../../../utils/util.js')

Page({
	data:{
		historyList: '',
		jump: true
	},
	onLoad:function(){
		
		this.getHis();
	},
	subData:function(e){
		const cont = e.detail.value.sear_cont;
		
		if(cont && cont != ''){
			wx.navigateTo({
				url: '/pages/search/search?k=' + cont,
			})
		}
	},
	do_search: function(e){
		const key = e.currentTarget.dataset.keyword;
		
		if(this.data.jump){
			wx.navigateTo({
				url: '../search?k=' + key,
			})
		}
	},
	delHis: function(e){
		const uid = wx.getStorageSync('id');
		const key = e.currentTarget.dataset.keyword;
		const that = this;

		that.setData({
			jump: false
		})

		utils.getData(utils.baseUrl +'search.php?act=edit&uid='+uid+'&cont='+key,'get','',function(res){
			if(res.code == 1){
				wx.showToast({
					title: res.msg,
					icon: 'success'
				})
				that.getHis();
			}else{
				wx.showToast({
					title: res.msg,
					icon: 'error'
				})
			}
		})
	},
	getHis: function(e){
		const uid = wx.getStorageSync('id');
		const that = this;

		utils.getData(utils.baseUrl + 'search.php?act=history&uid=' + uid, 'get', '', function (res) {
			that.setData({
				historyList: res.data
			})
		})
	}
})