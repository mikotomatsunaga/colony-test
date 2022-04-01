$(document).ready( function() {
   document.getElementById('view_list1').style.display = 'none';
   document.getElementById('view_list2').style.display = 'none';
   document.getElementById('view_list3').style.display = 'none';
   document.getElementById('view_list4').style.display = 'none';
   document.getElementById('view_list5').style.display = 'none';
   document.getElementById('view_list6').style.display = 'none';
});

function changeBg(n) {
if(n==1) {
var flg = document.getElementById('view_list1').style.display;
if(flg=="none") {
$(".list-option1").css({"background": "#f6f6f6"});
$(".list-option2").css({"background": "#ffffff"});
$(".list-option3").css({"background": "#ffffff"});
$(".list-option4").css({"background": "#ffffff"});
$(".list-option5").css({"background": "#ffffff"});
$(".list-option6").css({"background": "#ffffff"});
document.getElementById('view_list1').style.display = 'block';
document.getElementById('view_list2').style.display = 'none';
document.getElementById('view_list3').style.display = 'none';
document.getElementById('view_list4').style.display = 'none';
document.getElementById('view_list5').style.display = 'none';
document.getElementById('view_list6').style.display = 'none';
} else {
$(".list-option1").css({"background": "#f6f6f6"});
$(".list-option2").css({"background": "#ffffff"});
$(".list-option3").css({"background": "#ffffff"});
$(".list-option4").css({"background": "#ffffff"});
$(".list-option5").css({"background": "#ffffff"});
$(".list-option6").css({"background": "#ffffff"});
document.getElementById('view_list1').style.display = 'none';
document.getElementById('view_list2').style.display = 'none';
document.getElementById('view_list3').style.display = 'none';
document.getElementById('view_list4').style.display = 'none';
document.getElementById('view_list5').style.display = 'none';
document.getElementById('view_list6').style.display = 'none';
}
}else if(n==2) {
var flg = document.getElementById('view_list2').style.display;
if(flg=="none") {
$(".list-option2").css({"background": "#f6f6f6"});
$(".list-option1").css({"background": "#ffffff"});
$(".list-option3").css({"background": "#ffffff"});
$(".list-option4").css({"background": "#ffffff"});
$(".list-option5").css({"background": "#ffffff"});
$(".list-option6").css({"background": "#ffffff"});
document.getElementById('view_list2').style.display = 'block';
document.getElementById('view_list1').style.display = 'none';
document.getElementById('view_list3').style.display = 'none';
document.getElementById('view_list4').style.display = 'none';
document.getElementById('view_list5').style.display = 'none';
document.getElementById('view_list6').style.display = 'none';
} else {
$(".list-option2").css({"background": "#f6f6f6"});
$(".list-option1").css({"background": "#ffffff"});
$(".list-option3").css({"background": "#ffffff"});
$(".list-option4").css({"background": "#ffffff"});
$(".list-option5").css({"background": "#ffffff"});
$(".list-option6").css({"background": "#ffffff"});
document.getElementById('view_list1').style.display = 'none';
document.getElementById('view_list2').style.display = 'none';
document.getElementById('view_list3').style.display = 'none';
document.getElementById('view_list4').style.display = 'none';
document.getElementById('view_list5').style.display = 'none';
document.getElementById('view_list6').style.display = 'none';
}
}else if(n==3) {
var flg = document.getElementById('view_list3').style.display;
if(flg=="none") {
$(".list-option3").css({"background": "#f6f6f6"});
$(".list-option1").css({"background": "#ffffff"});
$(".list-option2").css({"background": "#ffffff"});
$(".list-option4").css({"background": "#ffffff"});
$(".list-option5").css({"background": "#ffffff"});
$(".list-option6").css({"background": "#ffffff"});
document.getElementById('view_list3').style.display = 'block';
document.getElementById('view_list1').style.display = 'none';
document.getElementById('view_list2').style.display = 'none';
document.getElementById('view_list4').style.display = 'none';
document.getElementById('view_list5').style.display = 'none';
document.getElementById('view_list6').style.display = 'none';
} else {
$(".list-option3").css({"background": "#f6f6f6"});
$(".list-option1").css({"background": "#ffffff"});
$(".list-option2").css({"background": "#ffffff"});
$(".list-option4").css({"background": "#ffffff"});
$(".list-option5").css({"background": "#ffffff"});
$(".list-option6").css({"background": "#ffffff"});
document.getElementById('view_list1').style.display = 'none';
document.getElementById('view_list2').style.display = 'none';
document.getElementById('view_list3').style.display = 'none';
document.getElementById('view_list4').style.display = 'none';
document.getElementById('view_list5').style.display = 'none';
document.getElementById('view_list6').style.display = 'none';
}
}else if(n==4) {
var flg = document.getElementById('view_list4').style.display;
if(flg=="none") {
$(".list-option4").css({"background": "#f6f6f6"});
$(".list-option1").css({"background": "#ffffff"});
$(".list-option2").css({"background": "#ffffff"});
$(".list-option3").css({"background": "#ffffff"});
$(".list-option5").css({"background": "#ffffff"});
$(".list-option6").css({"background": "#ffffff"});
document.getElementById('view_list4').style.display = 'block';
document.getElementById('view_list1').style.display = 'none';
document.getElementById('view_list2').style.display = 'none';
document.getElementById('view_list3').style.display = 'none';
document.getElementById('view_list5').style.display = 'none';
document.getElementById('view_list6').style.display = 'none';
} else {
$(".list-option4").css({"background": "#f6f6f6"});
$(".list-option1").css({"background": "#ffffff"});
$(".list-option2").css({"background": "#ffffff"});
$(".list-option3").css({"background": "#ffffff"});
$(".list-option5").css({"background": "#ffffff"});
$(".list-option6").css({"background": "#ffffff"});
document.getElementById('view_list1').style.display = 'none';
document.getElementById('view_list2').style.display = 'none';
document.getElementById('view_list3').style.display = 'none';
document.getElementById('view_list4').style.display = 'none';
document.getElementById('view_list5').style.display = 'none';
document.getElementById('view_list6').style.display = 'none';
}
}else if(n==5) {
var flg = document.getElementById('view_list5').style.display;
if(flg=="none") {
$(".list-option5").css({"background": "#f6f6f6"});
$(".list-option1").css({"background": "#ffffff"});
$(".list-option2").css({"background": "#ffffff"});
$(".list-option3").css({"background": "#ffffff"});
$(".list-option4").css({"background": "#ffffff"});
$(".list-option6").css({"background": "#ffffff"});
document.getElementById('view_list5').style.display = 'block';
document.getElementById('view_list1').style.display = 'none';
document.getElementById('view_list2').style.display = 'none';
document.getElementById('view_list3').style.display = 'none';
document.getElementById('view_list4').style.display = 'none';
document.getElementById('view_list6').style.display = 'none';
} else {
$(".list-option5").css({"background": "#f6f6f6"});
$(".list-option1").css({"background": "#ffffff"});
$(".list-option2").css({"background": "#ffffff"});
$(".list-option3").css({"background": "#ffffff"});
$(".list-option4").css({"background": "#ffffff"});
$(".list-option6").css({"background": "#ffffff"});
document.getElementById('view_list1').style.display = 'none';
document.getElementById('view_list2').style.display = 'none';
document.getElementById('view_list3').style.display = 'none';
document.getElementById('view_list4').style.display = 'none';
document.getElementById('view_list5').style.display = 'none';
document.getElementById('view_list6').style.display = 'none';
}
}else if(n==6) {
var flg = document.getElementById('view_list6').style.display;
if(flg=="none") {
$(".list-option6").css({"background": "#f6f6f6"});
$(".list-option1").css({"background": "#ffffff"});
$(".list-option2").css({"background": "#ffffff"});
$(".list-option3").css({"background": "#ffffff"});
$(".list-option4").css({"background": "#ffffff"});
$(".list-option5").css({"background": "#ffffff"});
document.getElementById('view_list6').style.display = 'block';
document.getElementById('view_list1').style.display = 'none';
document.getElementById('view_list2').style.display = 'none';
document.getElementById('view_list3').style.display = 'none';
document.getElementById('view_list4').style.display = 'none';
document.getElementById('view_list5').style.display = 'none';
} else {
$(".list-option6").css({"background": "#f6f6f6"});
$(".list-option1").css({"background": "#ffffff"});
$(".list-option2").css({"background": "#ffffff"});
$(".list-option3").css({"background": "#ffffff"});
$(".list-option4").css({"background": "#ffffff"});
$(".list-option5").css({"background": "#ffffff"});
document.getElementById('view_list1').style.display = 'none';
document.getElementById('view_list2').style.display = 'none';
document.getElementById('view_list3').style.display = 'none';
document.getElementById('view_list4').style.display = 'none';
document.getElementById('view_list5').style.display = 'none';
document.getElementById('view_list6').style.display = 'none';
}
}
}
