function getThisWeekFirstDay() {
  var now = new Date()
  var day = now.getDay()
  var week = '1234567'
  // @ts-ignore
  var first = 0 - week.indexOf(day)
  var thisWeekfirstDay = new Date()
  thisWeekfirstDay.setDate(thisWeekfirstDay.getDate() + first)
  return thisWeekfirstDay
}
function getThisMonthFirstDay() {
  var date = new Date()
  date.setDate(1)
  return date
}
function getThisYearFirstDay() {
  var currentDate = new Date()
  var currentYear = currentDate.getFullYear()
  var currentYearFirstDate = new Date(currentYear, 0, 1)
  return currentYearFirstDate
}
//data类型转string
// @ts-ignore
Date.prototype.format = function (format) {
  var o = {
    'M+': this.getMonth() + 1, //month
    'd+': this.getDate(), //day
    'h+': this.getHours(), //hour
    'm+': this.getMinutes(), //minute
    's+': this.getSeconds(), //second
    'q+': Math.floor((this.getMonth() + 3) / 3), //quarter
    S: this.getMilliseconds() //millisecond
  }
  if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o)
    if (new RegExp('(' + k + ')').test(format))
      // @ts-ignore
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
  return format
}

export { getThisWeekFirstDay, getThisMonthFirstDay, getThisYearFirstDay }
