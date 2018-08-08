const utils = require('../../utils/util.js');

Page({
	data:{
		c: '',
		idx: 0,
		goodsData: ''
	},
	onLoad: function(e){
		let cont = this.trim(e.k);
		console.log(cont)
		this.setData({
			c: e.k
		})

		this.getGoods(this.data.idx);
	},
	getGoods: function (idx) {
		const that = this;
		const cont = that.data.c;
		idx ? idx : idx = 0;

		utils.getData(utils.baseUrl + 'search.php?cont=' + cont+'&idx='+idx, 'get', '', function (res) {
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