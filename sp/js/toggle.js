// JavaScript Document
var childsLenArray=new Array(1,4,3);

function toggleInit(){
var navi1=$("#navi1").click(function(event){naviClickToggle(1)});
var navi2=$("#navi2").click(function(event){naviClickToggle(2)});
var navi3=$("#navi3").click(function(event){naviClickToggle(3)});
var navi3=$("#navi4").click(function(event){naviClickToggle(4)});

var btn1=$("#btn1").click(function(event){toggle(1)});
var btn1_1=$("#btn1_1").click(function(event){childToggle(1,1)});

var btn2=$("#btn2").click(function(event){toggle(2)});
var btn2_1=$("#btn2_1").click(function(event){childToggle(2,1)});
var btn2_2=$("#btn2_2").click(function(event){childToggle(2,2)});
var btn2_3=$("#btn2_3").click(function(event){childToggle(2,3)});
var btn2_4=$("#btn2_4").click(function(event){childToggle(2,4)});

var btn3=$("#btn3").click(function(event){toggle(3)});
var btn3_1=$("#btn3_1").click(function(event){childToggle(3,1)});
var btn3_2=$("#btn3_2").click(function(event){childToggle(3,2)});
var btn3_3=$("#btn3_3").click(function(event){childToggle(3,3)});


}


function naviClickToggle(n){
$("#bx2").slideDown();
$("#bx2"+"_"+(n)).show();
}


function toggle(n){
if($("#bx"+(n)).css("display")=="none"){
$("#bx"+(n)).slideDown();
allChildClose(n);
}else{
$("#bx"+(n)).slideUp();
}
}

function childToggle(n,m){
if($("#bx"+(n)+"_"+(m)).css("display")=="none"){
$("#bx"+(n)+"_"+(m)).show();
}else{
$("#bx"+(n)+"_"+(m)).hide();
}
}
function allChildClose(n){
for(var i=0;i<childsLenArray[n-1];i++){
$("#bx"+(n)+"_"+(i+1)).hide();
}

}






$(document).ready(toggleInit);