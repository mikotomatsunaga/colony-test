// ***********************************************************************************
//     Don't delete this comment.
//
//     gaEventTracking.js
//
//     version : 003-6
// ***********************************************************************************

function trEvent(u,c,a,l){

if(a==''){
a="Click";
}

try{
var cxaEvent = new Object();
cxaEvent.href = u.href;
cxaEvent.name='event://'+c+'|||'+a+'|||'+l;
cxaEvent.id = 'cxaclick';
cxaEvent.value = u.value;
cxaEvent.tagName = u.tagName;
stcsaclick(cxaEvent);
stcsaflushEvents(function(){},0);
}catch(e){
 
}

ga('kba.send', 'event', c, a, l);

}

function trEventBe(u,c,a,l,evt){

if(u.href){
var ga_tail =u.href.substring(u.href.length-1,u.href.length)
if(ga_tail=="#"){
trEvent(u,c,a,l);
}else if(u.target){
trEvent(u,c,a,l);
}else if(u.href.indexOf("javascript")>-1){
trEvent(u,c,a,l+'-!1-');
}else if(u.href==document.URL || document.URL.substr(u.href.length, 1)=="#"){
trEvent(u,c,a,l+'-!2-');
}else if(u.href.indexOf("/")>-1 || u.href.indexOf(".")>-1){
trEventBeTimeControl(u,c,a,l,evt,300);
}else{
trEvent(u,c,a,l+'-!3-');
}
}else{
trEvent(u,c,a,l+'-!4-');
}

}

function trEventBeTimeControl(u,c,a,l,evt,msec){

if(a==''){
a="Click";
}

try{
var cxaEvent = new Object();
cxaEvent.href = u.href;
cxaEvent.name='event://'+c+'|||'+a+'|||'+l;
cxaEvent.id = 'cxaclick';
cxaEvent.value = u.value;
cxaEvent.tagName = u.tagName;
stcsaclick(cxaEvent);
stcsaflushEvents(function(){},0);
}catch(e){
 
}
var callbackFlg = 0;
var timeoutFlg = 0;

ga('kba.send', 'event', c, a, l, {hitCallback: function() {
if (timeoutFlg == 0){
callbackFlg = 1;
document.location.href = u.href;
}
}});

evt.preventDefault();
evt.stopPropagation();
if (evt.returnValue) { evt.returnValue = false }; // IE

setTimeout( function() {
if (callbackFlg == 0){
timeoutFlg = 1;
document.location.href = u.href;
}
}, msec);

}

function sessionSucceed(n){
}