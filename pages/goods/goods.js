const utils = require('../../utils/util.js');
var arr = new Array();

    function countDownT(that){
      that.setData({
        countdown: dateFormat()
      })

      var l=setInterval(function(){
        dateFormat(that);
        countDownT(that)
      },1000)
      setTimeout(function(){
        clearInterval(l)
      },1000)
    }

    function dateFormat(){
      var endDate = new Date('2017/11/11'),
        endTime = endDate.getTime(),
        nowTime = new Date().getTime(),
        djs = endTime - nowTime,
        day = Math.floor(djs / 1000 / 60 / 60 / 24),
        hours = Math.floor(djs / 1000 / 60 / 60 % 24),
        minutes = Math.floor(djs / 1000 / 60 % 60),
        seconds = Math.floor(djs / 1000 % 60);
      var time = day + '天' + hours + '时' + minutes + '分' + seconds + '秒';

        return time;
    }

arr['first'] = ['first', 'checked'];
arr['second'] = ['second', ''];
arr['third'] = ['third', ''];

var app=getApp();
Page({
  data:{
    arr:arr,
    firstClass:arr['first'][1],
    countdown:'',
    showCoup:'changeH',
    coupArrow:'images/right-j.png',
    coupArrCla:'',
		goods: '',
		canIUse: true,
		banners:'',
    detailImgs: ''
  },
  tab:function(e){
    var name=e.currentTarget.dataset.name;
    
    for(var i in arr){
      if(arr[i][0]==name){
        arr[i][1]='checked';
      }else{
        arr[i][1] = '';
      }
    }
    this.setData({
      firstClass: arr['first'][1],
      secondClass: arr['second'][1],
      thirdClass: arr['third'][1]
    })
  },
	onLoad: function (e) {
		const postData = {
			id: e.id
		};

    this.setData({
      goodsId: e.id
    })

		const that = this;
    wx.showShareMenu({
      withShareTicket: true
    })
    countDownT(this);
		utils.getData(utils.baseUrl + 'goods.php', 'post', postData,function(res){
			that.setData({
				goods: res,
				banners: res.img[0]
			})
      that.getDetail(res.goodsId);
		})
  },
  showCoupon:function(e){
    var coupCla=this.data.showCoup;
    
    if (coupCla != ''){
      this.setData({
        showCoup: '',
        coupArrow: 'images/bottom-j.png',
        coupArrCla: 'cac_w'
      })
    } else {
      this.setData({
        showCoup: 'changeH',
        coupArrow: 'images/right-j.png',
        coupArrCla: ''
      })
    }
  },
  showImg:function(e){
    wx.previewImage({
      current: 'http://www.zhue.cn/images/201608/goods_img/1410_G_1470768154746.jpg', // 当前显示图片的http链接
      urls: ['http://www.zhue.cn/images/201608/goods_img/1410_G_1470768154746.jpg','http://www.zhue.cn/images/201608/goods_img/1410_G_1470768154746.jpg'] // 需要预览的图片http链接列表
    })
  },
	copy:function(e){
		const goodsUrl = this.data.goods.tkl[0];

		if (wx.getStorageSync('user_id') == '') {
			this.setData({
				canIUse: false
			})
		} else {
			utils.copy(goodsUrl, function (res) {
				wx.showToast({
					title: '复制成功，打开手机淘宝即可查看并下单！',
					icon: 'none',
					duration: 2000
				})
			})
		}
	},
	getPermissios: function (e) {
		if (e.detail.rawData) {
			this.wx_login();
			this.setData({
				canIUse: true
			})
		}
	},
	wx_login: function () {
		try {
			let val = wx.getStorageSync('user_id');
			if (val) {
				let session_id = val;
			}
		} catch (e) {
			var session_id = ''
		}

		const that = this;

		if (!session_id) {
			//登录
			wx.login({
				success: function (res) {
					if (res.code) {
						const postData = {
							code: res.code
						}
						//获取登录信息
						utils.getData(utils.baseUrl + 'login.php?act=login', 'GET', postData, function (res) {
							const openid = res.data.openid;
							const is_have = res[0];
							const session_key = res.data.session_key;

							wx.getSetting({
								success(r) {
									wx.setStorageSync('user_id', session_key);

									utils.copy(that.data.goods.tkl[0], function (res) {
										wx.showToast({
											title: '复制成功，打开手机淘宝即可查看并下单！',
											icon: 'none',
											duration: 2000
										})
									})


									if (is_have === 0) {
										if (r.authSetting['scope.userInfo']) {
											wx.getUserInfo({
												success: function (res) {
													let data = res.userInfo;
													data.openid = openid;

													utils.getData(utils.baseUrl + 'login.php?act=msg', 'POST', data, function (res) {
														wx.setStorageSync('id', res['id']);
													})
												}
											})
										}
									} else {
										wx.setStorageSync('id', res[1][0]['id']);
									}
								}
							})
						})
					}
				},
				fail: function () {
					console.log('服务器请求失败！');
				}
			})
		}
	},
  getDetail: function(id){
    const that = this;

    utils.getData('https://hws.m.taobao.com/cache/mtop.wdetail.getItemDescx/4.1/?data={item_num_id:' + id +'}&type=json','get','',function(res){
      that.setData({
        detailImgs: res.data.images
      })
    })
  },
  onShareAppMessage: function(res){
    if(res.from === 'button'){
      return {
        title: '宜券购',
        desc: '一个专注于做领券优惠的网站',
        path: '/page/goods/goods?id=' + this.goodsId
      }
    }
  }
})