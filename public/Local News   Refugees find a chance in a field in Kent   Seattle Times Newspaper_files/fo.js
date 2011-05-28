//  Copyright (c) 2000-2011 ZEDO Inc. All Rights Reserved.
function U1(){
var z1=navigator.userAgent.toLowerCase();var o6=(z1.indexOf('mac')!=-1);var a7=parseInt(navigator.appVersion);
var o4=(!o6&&(z1.indexOf('opera')==-1)&&(z1.indexOf('msie')!=-1)&&(a7>=4)&&(z1.indexOf('webtv')==-1)&&(z1.indexOf('msie 4')==-1));
if(o4){
document.writeln('<scr'+'ipt language=VBS'+'cript>');
document.writeln('on error resume next');
document.writeln('r0=IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.5"))');
document.writeln('if(r0<=0)then r0=IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.4"))');
document.writeln('</scr'+'ipt>');
}
else if(navigator.mimeTypes&&
navigator.mimeTypes["application/x-shockwave-flash"]&&
navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin){
if(navigator.plugins&&navigator.plugins["Shockwave Flash"]){
var a2=navigator.plugins["Shockwave Flash"].description;
if(parseInt(a2.substring(a2.indexOf(".")-2))>=4){
r0=1;
}}}
var v3=navigator.javaEnabled();var i0=1;
if(v3){i0 |=4;}
if(r0){i0 |=8;}
if(o4){
if(document.documentElement){
document.documentElement.style.behavior='url(#default#clientCaps)';
if(document.documentElement.connectionType=='lan'){
i0 |=16;
}}
else if(document.body){
document.body.style.behavior='url(#default#clientCaps)';
if(document.body.connectionType=='lan'){
i0 |=16;
}}}
return i0;
}
function B1(){
var n5=new Array('d1','d2','d3','d4','d5','d6','d7','d8','d9','da','db','dc','dd','de','df');
return n5;
}
var d0=0;var v11='';var v0=0;var z0='0';var e0=0;var c3='';var zd_$='';var r0=0;var v1='';var o2='';var d3='';var w2="";var w5='';var y5='';var y0=new Array();var w0='';var o8=0;var z6='';
if(typeof zflag_nid!='undefined'){
d0=zflag_nid;
zflag_nid=0;
}
if(typeof zflag_charset!='undefined'){
v11="charset="+zflag_charset;
zflag_charset="";
}
if(typeof zflag_sid!='undefined'){
v0=zflag_sid;
zflag_sid=0;
}
if(typeof zflag_cid!='undefined'){
z0=zflag_cid;
if(z0<0||z0>999999){
z0=0;
}
zflag_cid=0;
}
if(typeof zflag_chanlimits!='undefined'){
o8=zflag_chanlimits;
zflag_chanlimits=0;
}
if(typeof zflag_sz!='undefined'){
e0=zflag_sz;
if(e0<0||e0>95){
e0=0;
}
zflag_sz=0;
}
if(typeof zflag_kw!='undefined'){
zflag_kw=zflag_kw.replace(/&/g,'zzazz');
c3=escape(zflag_kw);
zflag_kw="";
}
if(typeof zflag_$!='undefined'){
zd_$=zflag_$;
zflag_$='';
}
if(typeof zflag_geo!='undefined'){
if(!isNaN(zflag_geo)){
o2="&gc="+zflag_geo;
zflag_geo=0;
}}
if(typeof zflag_param!='undefined'){
w2="&p="+zflag_param;
zflag_param="";
}
if(typeof zflag_click!='undefined'){
zzTrd=escape(zflag_click);
d3='&l='+zzTrd;
zflag_click="";
}
if(typeof zflag_ad_title!='undefined'){
zzTitle=escape(zflag_ad_title);
z6='&t='+zzTitle;
zflag_ad_title="";
}
if(typeof zflag_hasAd!='undefined'){
w5='&y='+zflag_hasAd;
}
if(typeof zflag_num!='undefined'){
y5=zflag_num;
zflag_num=0;
}
if(typeof zflag_ck!='undefined'){
w0='&ck='+zflag_ck;
zflag_ck=0;
}
y0=B1();
for(var i=0;i<y0.length;i++){
if(eval('typeof(zflag_'+y0[i]+')!="undefined"')){
w0=w0+'&'+y0[i]+'='+eval('zflag_'+y0[i]);
eval('zflag_'+y0[i]+'="";');
}}
var zzStr='';
if(typeof zzCountry=='undefined'){
var zzCountry=255;}
if(typeof zzMetro=='undefined'){
var zzMetro=0;}
if(typeof zzState=='undefined'){
var zzState=0;}var zzSection=v0;var zzD=window.document;var zzRand=(Math.floor(Math.random()* 1000000)% 10000);var zzCustom='';var zzPat='';var zzSkip='';var zzExp='';var zzTrd='';var zzPos=0;
var zzNw=0;var zzCh=0;var zzDmCodes=new Array();var zzDmValues=new Array();var zzBr=99;var zzLang=99;var zzAGrp=0;var zzAct=new Array();var zzActVal=new Array();
v1=U1();
if(v1<0||v1>31){
v1=1;
}
c0='<scr'+'ipt language="javascript" src="http://d7.zedo.com/bar/v16-406/d3/jsc/fm.js?c='+z0+'&a='+o8+'&f='+y5+'&n='+d0+'&r='+v1+'&d='+e0+'&q='+c3+'&$='+zd_$+'&s='+v0+o2+w2+d3+w5+z6+w0+'&z='+Math.random()+'" '+v11+'></scr'+'ipt>';
document.write(c0);
