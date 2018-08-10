const utils = require('../../utils/util.js');

var arr = new Array()
arr['selected'] = ['selected','checked'];
arr['selected1'] = ['selected1',''];
arr['selected2'] = ['selected2',''];

Page({
  data:{
    arr:arr,
    first: arr['selected'][0],
    second: arr['selected'][1],
    firstClass:arr['selected'][1],
		goodsData: '',
		getIdx: 1,
		girlData: '',
		boyData: '',
		canIUse: true,
		banImg: '',
		searchStatus: true,
		navClass: '',
		topImg: true
  },
  tab: function (e) {
    var thisName=e.currentTarget.dataset.name;
		let cate;
		let posi;

    for(var i in arr){
      if (arr[i][0] == thisName){
        arr[i][1]='checked';
				if (i === 'selected'){
					cate = 'hot';
				} else if (i === 'selected1'){
					cate = 'girl';
					if(this.data.girlData == '' && this.data.wT < 0){
						posi = '';
					}
				}else{
					cate = 'boy';
					if (this.data.boyData == '' && this.data.wT < 0) {
						posi = '';
					}
				}
      }else{
        arr[i][1] = '';
      }
    }

		this.setData({
			navClass: posi,
      firstClass: arr['selected'][1],
      secondClass: arr['selected1'][1],
      thirdClass: arr['selected2'][1],
			getIdx: 1,
    })
		this.getGoodsData(cate,1);
  },
	onLoad: function(e){
		this.getGoodsData();
		this.getBanner();
		
		if(wx.getStorageSync('user_id') == ''){
			this.setData({
				canIUse: false
			})
		}
	},
	onPageScroll: function (e) {
		var that = this;
		var query = wx.createSelectorQuery()//创建节点查询器 query
		query.select('#ib_top').boundingClientRect()//这段代码的意思是选择Id=the-id的节点，获取节点位置信息的查询请求
		query.exec(function (res) {
			that.setData({
				wT: res[0].top
			})
		})

		var wt = this.data.wT;

		if (wt < 0) {
			this.setData({
				navClass: 'pfix'
			})
		} else {
			this.setData({
				navClass: ''
			})
		}

		if (e.scrollTop > 500) {
			this.setData({
				topImg: false
			})
		}else{
			this.setData({
				topImg: true
			})
		}
	},
	onReachBottom:function(e){
		let getIdx = parseInt(this.data.getIdx);
		let idx;

		if (this.data.firstClass === 'checked'){
			idx = 'hot';
		} else if (this.data.secondClass === 'checked'){
			idx = 'girl';
		}else{
			idx = 'boy';
		}
		
		getIdx++;
		this.setData({
			getIdx: getIdx
		})
		this.getGoodsData(idx, getIdx);
	},
	getGoodsData: function(cate,getIdx){
		const that = this;

		cate ? cate : cate = 'hot';
		getIdx ? getIdx : getIdx = 1;

		utils.getData(utils.baseUrl + 'index.php?act='+cate+'&getIdx='+getIdx, 'GET', '', function (res) {

			if (cate === 'hot'){
				let goods = that.data.goodsData;
				if(goods != ''){
					for (let i = 0; i < res.data.length; i++) {
						goods.push(res.data[i]);
					}
				}else{
					goods = res.data;
				}
				that.setData({
					goodsData: goods
				})
			} else if (cate === 'girl'){
				let girl = that.data.girlData;
				if (girl != '') {
					for (let i = 0; i < res.data.length; i++) {
						girl.push(res.data[i]);
					}
				} else {
					girl = res.data;
				}
				that.setData({
					girlData: girl
				})
			} else {
				let boy = that.data.boyData;
				if (boy != '') {
					for (let i = 0; i < res.data.length; i++) {
						boy.push(res.data[i]);
					}
				} else {
					boy = res.data;
				}
				that.setData({
					boyData: boy
				})
			}

		})
	},
	wx_login: function(){
		try{
			let val = wx.getStorageSync('user_id');
			if(val){
				let session_id = val;
			}
		} catch(e){
			var session_id = ''
		}

		const that = this;

		if(!session_id){
			//登录
			wx.login({
				success: function (res) {
					if (res.code) {
						const postData = {
							code: res.code
						}
						//获取登录信息
						utils.getData(utils.baseUrl + 'login.php?act=login', 'GET', postData, function (res) {
							console.log(res)
							const openid = res.data.openid;
							const is_have = res[0];
							const session_key = res.data.session_key;
							
							wx.getSetting({
								success(r) {
									wx.setStorageSync('user_id', session_key);
									wx.setStorageSync('openid', openid);
									
									if(is_have === 0){
										if (r.authSetting['scope.userInfo']) {
											wx.getUserInfo({
												success: function (res) {
													let data = res.userInfo;
													data.openid = openid;

													utils.getData(utils.baseUrl + 'login.php?act=msg', 'POST', data, function (res) {
														console.log(res)
													})
												}
											})
										}
									}
								}
							})
						})
					}
				},
				fail: function(){
					console.log('服务器请求失败！');
				}
			})
		}
	},
	getBanner: function(e){
		const that = this;

		utils.getData(utils.baseUrl+'index.php?act=banner','GET','',function(res){
			that.setData({
				banImg: res.data
			})
		})
	},
	getPermissios: function(e){
		if (e.detail.rawData){
			this.wx_login();
			this.setData({
				canIUse: true
			})
		}
	},
	search: function(e){
		this.setData({
			searchStatus: false
		})
	},
	hiddenSearch:function(){
		// this.setData({
		// 	searchStatus: true
		// })
	},
	subData: function(e){
		const cont = e.detail.value.sear_cont;
		wx.navigateTo({
			url: '../search/search?k='+cont,
		})
	},
	goTop: function(){
		utils.goTop();
	}
})