const utils = require('../../utils/util.js');

Page({
	data:{
		goods: '',
		shop: '',
		loadingStatus: false,
		idx: 1,
		shopid: ''
	},
	onLoad: function(e){
		this.setData({
			shopid: e.shopid
		})

		this.getShopData(1);
	},
	getShopData: function(num){
		const that = this;
		const id = that.data.shopid;
		
		utils.getData('https://awgou.cn/awg/Api-Seller.json?PageNum=10&SellerId='+id+'&Page='+num, 'get', '', function(res){
			if(res.code == 0){
				if(num == 1){
					that.setData({
						loadingStatus: true,
						goods: res.data,
						shop: res.shop
					})
				}else{
					that.setData({
						goods: res.data
					})
				}
			}else{
				wx.showToast({
					title: res.msg,
					icon: 'error'
				})
			}
		})
	},
	onReachBottom: function(){
		let num = this.data.idx;
		
		num++;
		that.setData({
			idx: num
		})
		this.getShopData(num)
	}
})