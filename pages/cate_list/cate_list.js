const utils = require('../../utils/util.js');

Page({
	data:{
		c: '',
		idx: 1,
		goodsData: '',
		checkedArr: ['checked','','',''],
		cate_id: 0,
		topImg: true,
		jiaob: true
	},
	onLoad: function(e){
		
		this.setData({
			cid: e.id,
			jiaob: wx.getStorageSync('ishave')
		})

		this.getGoods(this.data.idx);
	},
	getGoods: function (idx,cate) {
		const that = this;
		const cid = that.data.cid

		idx ? idx : idx = 1;
		cate ? cate : cate = 0;
		
		utils.getData('https://awgou.cn/awg/Api-Lists.json?cid=' + cid + '&page='+idx+'&tab=' + cate+'&pagenum=10', 'get', '', function (res) {
			
			if(res.code == 0){
				let goods = that.data.goodsData;

				if (goods != '' && idx != 1) {
					if (res.data.length != 0){
						for (let i = 0; i < res.data.length; i++) {
							goods.push(res.data[i]);
						}
					}else{
						wx.showToast({
							title: '已经到底了哦！',
							icon: 'none',
							duration: 2000
						})
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
		const cate_id = this.data.cate_id;

		idx++;
		this.setData({
			idx: idx
		})
		this.getGoods(idx, cate_id);
	},
	accodingsort: function(e){
		const nav_idx = e.currentTarget.dataset.navidx;
		let navArr = ['', '', '', ''];
		let cate_id = this.data.cate_id;
		
		navArr[nav_idx] = 'checked';

		if (nav_idx == 0){
			cate_id = 0;
		} else if (nav_idx == 1) {
			cate_id = 3;
		} else if (nav_idx == 2) {
			if (cate_id == 2){
				cate_id = 1;
			}else{
				cate_id = 2;
			}
		} else if (nav_idx == 3) {
			cate_id = 4;
		}

		this.setData({
			checkedArr: navArr,
			idx: 1,
			cate_id: cate_id
		})

		this.getGoods(1, cate_id);
		utils.goTop();
	},
	goTop: function () {
		utils.goTop();
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
	}
})