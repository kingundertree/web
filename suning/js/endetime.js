// JavaScript Document
// JavaScript Document

var tms = []; 
var hour = []; 
var minute = []; 
var second = []; 
function takeCount() { 
setTimeout("takeCount()", 1000); 
for (var i = 0, j = tms.length; i < j; i++) { 
//计数减一 
tms[i] -= 1000; 
//计算时分秒 
var hours = Math.floor(tms[i] / (1000 * 60 * 60)) ; 
var minutes = Math.floor(tms[i] / (1000 * 60)) % 60; 
var seconds = Math.floor(tms[i] / 1000) % 60; 
if (hours < 0) 
hours = 0; 
if (minutes < 0) 
minutes = 0; 
if (seconds < 0) 
seconds = 0; 
//将时分秒插入到html中 
document.getElementById(hour[i]).innerHTML = hours; 
document.getElementById(minute[i]).innerHTML = minutes; 
document.getElementById(second[i]).innerHTML = seconds; 
} 
} 
setTimeout("takeCount()", 1000); 
