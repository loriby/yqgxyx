const utils = require('../../utils/util.js');

Page({
  data:{
		msg: '',
		canIUse: true,
	},
	onLoad:function(){
		
		if (wx.getStorageSync('user_id') == '') {
			this.setData({
				canIUse: false
			})
		}else{
			this.getMsg();
		}
	},
	getMsg: function(){  //获取个人信息
		const openid = wx.getStorageSync('id');
		const that = this;

		utils.getData(utils.baseUrl + 'user.php?act=user&openid=' + openid,'GET','',function(res){

			that.setData({
				msg : res.data[0]
			})
		})
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

									if (is_have === 0) {
										if (r.authSetting['scope.userInfo']) {
											wx.getUserInfo({
												success: function (res) {
													let data = res.userInfo;
													data.openid = openid;

													utils.getData(utils.baseUrl + 'login.php?act=msg', 'POST', data, function (res) {
														wx.setStorageSync('id', res['id']);
														that.getMsg();
													})
												}
											})
										}
									} else {
										wx.setStorageSync('id', res[1][0]['id']);
										that.getMsg();
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
	}
})