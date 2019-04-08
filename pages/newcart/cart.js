Page({
    data:{
      count:1
    },
    subCount: function () {
      if (this.data.count>1){
        this.setData({
          count:this.data.count-1
        })
      }else{
        count:1
      }
    },
    addCount:function(){
      this.setData({
        count: this.data.count + 1
      })
    },
    changeCount:function(e){
      this.setData({
        count: Number(e.detail.value)
      })
    }
})