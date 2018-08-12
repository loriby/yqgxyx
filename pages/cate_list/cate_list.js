const utils = require('../../utils/util.js');

Page({
	data:{
		c: '',
		idx: 0,
		goodsData: ''
	},
	onLoad: function(e){
		
		this.setData({
			cid: e.id
		})

		this.getGoods(this.data.idx);
	},
	getGoods: function (idx) {
		const that = this;
		const cid = that.data.cid

		idx ? idx = idx*10 : idx = 10;

		utils.getData('https://awgou.cn/awg/Api-Lists.json?cid=' + cid+'&page=1&tab=0&pagenum=10', 'get', '', function (res) {
			if(res.code == 0){
				let goods = that.data.goodsData;

				if (goods != '') {
					for (let i = 0; i < res.data.length; i++) {
						goods.push(res.data[i]);
					}
				} else {
					goods = res.data;
				}
				that.setData({
					goodsData: goods
				})
			}else{
				wx.showToast({
					title: res.msg,
					icon: 'none'
				})
			}
		})
	},
	onReachBottom: function () {
		let idx = parseInt(this.data.idx);

		idx++;
		this.setData({
			idx: idx
		})
		this.getGoods(idx);
	}
})