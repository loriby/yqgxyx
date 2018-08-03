Page({
	data:{
		videoStatus:false
	},
	onReady:function(e){
		this.videoContext = wx.createVideoContext('videoWrap');
	},
	videoPlay:function(e){
		if(this.data.videoStatus == true){
			this.videoContext.pause();
		}else{
			this.videoContext.play();
		}
	},
	play:function(e){
		this.setData({
			videoStatus: true
		})
	},
	pause: function (e) {
		this.setData({
			videoStatus: false
		})
	}
})