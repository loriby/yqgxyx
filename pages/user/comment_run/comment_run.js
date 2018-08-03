// pages/user/comment_run/comment_run.js
Page({

  data: {
	
  },
  onLoad:function(e){
	  var arr = ['star_r', 'star_r', 'star_r', 'star_r', 'star_r', 'star_r', 'star_r', 'star_r', 'star_r', 'star_r'];
	  this.setData({
		  cla:arr
	  })

  },
  changeScore:function(e){
	  var claIdx = e.currentTarget.dataset.cla;
	  var arr = this.data.cla;
	  var maxCount;

	  maxCount = Math.ceil(claIdx / 5)*5;

		

	  for (var i = 0; i < 5; i++) {
		  (function(i){
			arr[i] = 'star_g';
			for(var n=0; n<claIdx; n++){
				arr[n] = 'star_r';
			}
		  })(i)
	  }
	  
	  this.setData({
		  cla:arr
	  })
  }
})