const utils = require('../../utils/util.js');
Page({
	data:{
		goodsData: '',
		idx: 1,
    topImg: true,
    jiaobiaoStatus: wx.getStorageSync('isHave')
	},
	onLoad: function(){
		const that = this;
		this.getGoods();
	},
	getGoods: function(idx){
		const that = this;
		idx ? idx : idx = 1;

		utils.getData(utils.baseUrl + 'grab.php?idx=' + idx, 'get', '', function (res) {
			let goods = that.data.goodsData;
			if (goods != '') {
				if (res.length != 0) {
					for (let i = 0; i < res.length; i++) {
						goods.push(res[i]);
					}
				} else {
					wx.showToast({
						title: '已经到底了哦！',
						icon: 'none',
						duration: 2000
					})
				}
			} else {
				goods = res;
			}
			that.setData({
				goodsData: goods,
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
	onPageScroll: function(e){
		if (e.scrollTop > 500) {
			this.setData({
				topImg: false
			})
		} else {
			this.setData({
				topImg: true
			})
		}
	},
	goTop: function () {
		utils.goTop();
	}
})