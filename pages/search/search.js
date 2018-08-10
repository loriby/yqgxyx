const utils = require('../../utils/util.js');

Page({
	data:{
		c: '',
		idx: 0,
		goodsData: ''
	},
	onLoad: function(e){
		let cont = this.trim(e.k);
		
		this.setData({
			c: e.k
		})

		this.getGoods(this.data.idx);
	},
	getGoods: function (idx) {
		const that = this;
		const cont = that.data.c;
		const uid = wx.getStorageSync('id');

		idx ? idx : idx = 1;

		utils.getData(utils.baseUrl + 'search.php?act=search&uid='+uid+'&cont=' + cont+'&idx='+idx, 'get', '', function (res) {
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
		})
	},
	onReachBottom: function () {
		let idx = parseInt(this.data.idx);

		idx++;
		this.setData({
			idx: idx
		})
		this.getGoods(idx);
	},
	trim: function(msg){
		const reg = /\s/g;
		
		return msg.replace(reg, '');
	}
})