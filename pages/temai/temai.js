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
      if (res.code == 0) {
        let goods = that.data.goods;
        let shop;

        if (goods != '') {
          if (res.data.length != 0) {
            for (let i = 0; i < res.data.length; i++) {
              goods.push(res.data[i]);
            }
          } else {
            wx.showToast({
              title: '已经到底了哦！',
              icon: 'none',
              duration: 2000
            })
          }
        } else {
          goods = res.data;
        }

        res.shop ? shop = res.shop : shop = that.data.shop;

        that.setData({
          loadingStatus: true,
          goods: goods,
          shop: shop
        })
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
		const that = this;
		
		num++;
		that.setData({
			idx: num
		})
		this.getShopData(num)
	}
})