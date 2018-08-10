const baseUrl = "https://www.xriml.com/applet/";

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getData = (url,type,data,cb) =>{
	wx.request({
		url: url,
		type:type,
		data: data,
		header: {
			'content-type': 'application/json'
		},
		success: function(res){
			return typeof cb == "function" && cb(res.data);
		},
		fail: function(err){
			return typeof cb == "function" && cb(false);
		}
	})
}

const goTop = () =>{
	wx.pageScrollTo({
		scrollTop: 0,
		duration: 300
	})
}

const copy = (data,cb) => {
	wx.setClipboardData({
		data: data,
		success: function (res) {
			wx.getClipboardData({
				success: function (res) {
					return typeof cb === 'function' && cb(res.data);
				}
			})
		}
	})
}

module.exports = {
  formatTime: formatTime,
	getData: getData,
	baseUrl: baseUrl,
	copy: copy,
	goTop: goTop
}
