const getWimsData = require('./cron/getWimsData')

var cron = require('node-cron');
Date.prototype.addDays = function(days) {
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
}
Date.prototype.subDays = function(days) {
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() - days);
  return dat;
}
var dat = new Date();
var monthAr = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

var curHr = new Date().getUTCHours()

// if(curHr>0 && curHr<6){
//   var h0 = dat.subDays(1)
//   var h24 = dat.subDays(2)
//   var h48 = dat.subDays(3)
// }
// else{
//   var h0 = dat.subDays(2)
//   var h24 = dat.subDays(3)
//   var h48 = dat.subDays(4)
// }

  var h0 = dat.subDays(1)
  // var h0 = new Date()
  var h24 = dat.subDays(2)
  var h48 = dat.subDays(3)

var datAr = [h0,h24,h48];
var reqDateAr = []
datAr.map((curr)=>{
	var day = curr.getDate();
	var mon = monthAr[curr.getMonth()];
	var yr = curr.getFullYear() - 2000; 
	reqDateAr.push(day,mon,yr)
})

// cron.schedule('47 10 * * *', function(){
//   Date.prototype.addDays = function(days) {
//   var dat = new Date(this.valueOf());
//   dat.setDate(dat.getDate() + days);
//   return dat;
//   }
//   Date.prototype.subDays = function(days) {
//     var dat = new Date(this.valueOf());
//     dat.setDate(dat.getDate() - days);
//     return dat;
//   }
//   var dat = new Date();
//   var monthAr = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

// var curHr = new Date().getHours()

// if(curHr<18){
//   var h0 = dat.subDays(1)
//   var h24 = dat.subDays(2)
//   var h48 = dat.subDays(3)
// }
// else{
//   var h0 = new Date();
//   var h24 = dat.subDays(1)
//   var h48 = dat.subDays(2)
// }

//   var datAr = [h0,h24,h48];
//   var reqDateAr = []
//   datAr.map((curr)=>{
//     var day = curr.getDate();
//     var mon = monthAr[curr.getMonth()];
//     var yr = curr.getFullYear() - 2000; 
//     reqDateAr.push(day,mon,yr)
//   })
//   getWimsData(reqDateAr[0],reqDateAr[1],reqDateAr[2],reqDateAr[3],reqDateAr[4],reqDateAr[5],reqDateAr[6],reqDateAr[7],reqDateAr[8])
// });


// getWimsData(16,'JUN',18,15,'JUN',18,14,'JUN',18)

getWimsData(reqDateAr[0],reqDateAr[1],reqDateAr[2],reqDateAr[3],reqDateAr[4],reqDateAr[5],reqDateAr[6],reqDateAr[7],reqDateAr[8])