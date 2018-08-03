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
		goods: ''
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
		const that = this;

    countDownT(this);
		utils.getData(utils.baseUrl + 'goods.php', 'post', postData,function(res){
			that.setData({
				goods: res.data[0]
			})
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
		const goodsUrl = this.data.goods.click_url;

		utils.copy(goodsUrl, function(res){
			wx.showToast({
				title: '链接复制成功，打开浏览器粘贴访问！',
				icon: 'none',
				duration: 2000
			})
		})
	}
})