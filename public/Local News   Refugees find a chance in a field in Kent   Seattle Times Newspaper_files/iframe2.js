//  Copyright (c) 2000-2011 ZEDO Inc. All Rights Reserved.
var p9=new Image();
function U8(t13){
var i9=t13.toString().match(/function\s+(\w*)/)[1];
if((i9==null)||(i9.length==0)){
return "anonymous();";
}
else{
return i9+"();";
}}
function B8(){
var o12="";
for(var a=arguments.caller;a!=null;a=a.caller){
o12+=U8(a.callee);
if(a.caller==a)break;
}
return o12;
}
function F9(){
var e3="";var i9="anonymous();";var q11=0;
window.onerror=null;
for(var i=0;i<arguments.length;i++){
e3+='a'+i+'='+arguments[i]+';';
if(i==2){
q11=escape(arguments[i]);
}}
e3=B8()+e3;
if(navigator.cookieEnabled){
e3=e3+'c='+navigator.cookieEnabled+';';
}
e3=e3+"C="+document.cookie+";";
if(document.cookie.indexOf('FFERROR')==-1){
var c13='ads5';
p9.src='http://r1.zedo.com/log/ERR.gif?v=bar/v16-406/d3;'+e3+'b='+navigator.userAgent;
document.cookie="FFERROR="+q11;
}
return true;
}
window.onerror=F9; 
var a9=new Array();var y10=0;
function F0(t2){
if(y10<1){
var a6=''+window.location.search;var y9=new Array();var z10=a6.indexOf(';l=')+1;
if(z10>1){
a9['l']=a6.substring(z10+2);
a6=a6.substring(0,z10);
}
a6=a6.replace(/^\?/,'');
y9=a6.split(';');
y10=y9.length;
for(var i=0;i<y10;i++){
if(y9[i].length>2){
var c12=y9[i].split('=');
a9[c12[0]]=c12[1];
}}}
if(a9[t2]){return a9[t2];}
else{return '';}
}
function F5(){
var i0=U0('ZEDOIDX',false);var z1=navigator.userAgent.toLowerCase();var d14=((z1.indexOf('mac')!=-1)&&(z1.indexOf('msie 4.')!=-1));var v3=navigator.javaEnabled();var c8=0;
i0=1;
if(d14){
return i0;
}
else if(navigator.mimeTypes&&
navigator.mimeTypes["application/x-shockwave-flash"]&&
navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin){
if(navigator.plugins&&navigator.plugins["Shockwave Flash"]){
var a2=navigator.plugins["Shockwave Flash"].description;
if(parseInt(a2.substring(a2.indexOf(".")-2))>=4){
c8=1;
}}}
if(v3){i0 |=4;}
if(c8){i0 |=8;}
if(!F2()){
i0 |=16;
}
else{
n2=new Date();
z2.src="http://simg.zedo.com/speed-test/10k.gif?"+zzRand;
z2.onload=F1;
if(i0<16){
B0('ZEDOIDX',i0,432000000);
}
else{
B0('ZEDOIDX',i0,2592000000);
}}
return i0;
}
var r1=0;var r0=0;var o3=0;var c14=new Image();
var z3=new Array();
function B0(e7,c6,q6){
var i1=new Date();
if(!q6){q6=31536000000;}
i1.setTime(i1.getTime()+q6);
document.cookie=e7+'='+c6+';expires='+i1.toGMTString()+';domain=.zedo.com;path=/;';
}
function U0(t2,w7){
if(!z3[t2]||w7){
var w8=document.cookie;var p1=new Array();var t6=new Array();
p1=w8.split(';');
var t7=(p1!=null)?p1.length:0;
for(var i=0;i<t7;i++){
p1[i]=p1[i].replace(/^\s/,'');
t6=p1[i].split('=');
z3[t6[0]]=t6[1];
}}
if(z3[t2]){return z3[t2];}
else{return '';}
}
function U2(){
var a1=new Date();var t0=new Date();
t0.setUTCHours(5);
t0.setUTCMinutes(0);
t0.setUTCSeconds(0);
var t4=t0.getTime()-a1.getTime();
if(t4<0){
t0.setUTCDate(t0.getUTCDate()+1);
t4=t0.getTime()-a1.getTime();
}
return t4;
}
var n2;var z2=new Image();
function F1(){
var i5=new Date();var d5=i5.getTime()-n2.getTime();var z5=10239/d5;
if(z5>6){
var i0=U0('ZEDOIDX',false);
i0 |=16;
if(F2()){
if(i0<16){
B0('ZEDOIDX',i0,432000000);
}
else{
B0('ZEDOIDX',i0,2592000000);
}}}}
function B7(src){
var r6;
try{
r6=new XMLHttpRequest();
}catch(e){
try{
r6=new ActiveXObject('Msxml2.XMLHTTP');
}catch(e){
try{
r6=new ActiveXObject('Microsoft.XMLHTTP');
}catch(e){
if(document.cookie.indexOf('FFERROR')==-1){
var o10=new Image();var e3='Your browser does not support AJAX!';
o10.src='http://r1.zedo.com/log/ERR.gif?v=bar/v16-406/d3;'+e3+'b='+navigator.userAgent;
document.cookie="FFERROR=0";
}
return false;
}}}
r6.open('GET',src,false);
r6.send(null);
if(r6.status==200){
eval(r6.responseText);
}}
function F2(){
if(document.cookie.indexOf('ZEDOIDX')!=-1){
return true;
}else{
return false;
}}
function U1(){
var i0=U0('ZEDOIDX',false);var z1=navigator.userAgent.toLowerCase();var o6=(z1.indexOf('mac')!=-1);var o4=(!o6&&(z1.indexOf('msie 5')!=-1)||(z1.indexOf('msie 6')!=-1));
document.writeln('<scri'+'pt language=VBS'+'cript>');
document.writeln('on error resume next');
document.writeln('r0=IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.5"))');
document.writeln('if(r0<=0)then r0=IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.4"))');
document.writeln('</scr'+'ipt>');
var v3=navigator.javaEnabled();
i0=1;
if(v3){i0 |=4;}
if(r0){i0 |=8;}
if(o4){
document.body.style.behavior='url(#default#clientCaps)';
if(document.body.connectionType=='lan'){
i0 |=16;
}}
else{ 
if(F2()){
n2=new Date();
z2.src="http://simg.zedo.com/speed-test/10k.gif?"+zzRand;
z2.onload=F1;
}
else{
i0 |=16;
} 
}
if(F2()){
if(i0<16){
B0('ZEDOIDX',i0,432000000);
}
else{
B0('ZEDOIDX',i0,2592000000);
}}
return i0;
}
function F7(i7){
var n4=0;var i1=new Date();var p10=U0('FFcat',false);var e12=U0('FFad',false);
if(!p10){
p10=i7;
e12="-1";
c2=U0('FFSkp',false);
if(c2.length>0){
i1.setUTCDate(i1.getUTCDate()-1);
document.cookie='FFSkp=1;expires='+i1.toGMTString()+';domain='+document.domain+';path=/;';
}}
n4=F8(p10,e12,i7);
zzPos=n4;
return n4;
}
function F8(r7,i8,i7){
var r12=false;var o5=r7.split(":");var a5=i8.split(":");var n4=0;var q13=0;var i;
for(i=0;i<o5.length;i++){
if(o5[i]==i7){
q13=o5[i];
a5[i]++;
if(a5[i]>101){a5[i]=0;}
n4=a5[i];
if(isNaN(n4)){
c14.src='http://r1.zedo.com/ads3/p/'+zzRand+'/NaN.gif?v=bar/v16-406/d3;C='+document.cookie+';b='+navigator.userAgent;
n4=0;
a5[i]=0;
}
r12=true;
break;
}}
if(!r12&&o5.length<60){
r7=i7+":"+r7;
i8=0+":"+i8;
}
else{
if(i==o5.length){
i--;
}
for(var j=i;j>0;j--){
o5[j]=o5[j-1];
a5[j]=a5[j-1];
}
o5[0]=i7;
a5[0]=n4;
r7=o5.join(":");
i8=a5.join(":");
}
if(F2()){
var t4=U2();
B0('FFcat',r7,t4);
B0('FFad',i8,t4);
}
else{
n4=Math.floor((Math.random()* 1000000)% 20);
}
return n4;
}
function B4(t10,w12){
if(t10.length<1){
return 0;
}
if((t10==0)&&(w12>0)){
return 1;
}
if(t10>w12){
return 1;
}else{
return 0;
}}
function F4(q4){
if(q4>255){
q4=(q4 & 255);
}
return q4;
}
function B5(q4){
var e13=0;
if(q4>255){
e13=((q4>>16)& 4095);
}
return e13;
}
function U4(q4){
var y12=0;
if(q4>255){
y12=((q4>>8)& 255);
}
return y12;
}
function F3(){
var p12=10;var q12=new Date();var z7=q12.getUTCMinutes();var p11=q12.getUTCHours();
z7=z7+(p12-(z7 % p12));
if(z7==60){
p11++;
z7="00";
}
return U5(p11)+""+U5(z7);
}
function U5(p13){
var d9=""+p13
if(d9.length<2){
d9="0"+d9;
}
return d9;
}
function B0(e7,c6,q6){
if(c6.length>=3000){
U7(e7,c6);
}
var i1=new Date();
if(!q6){q6=31536000000;}
i1.setTime(i1.getTime()+q6);
document.cookie=e7+'='+c6+';expires='+i1.toGMTString()+';domain=.zedo.com;path=/;';
}
function U0(t2,w7){
if(!z3[t2]||w7){
var w8=document.cookie;var p1=new Array();var t6=new Array();
p1=w8.split(';');
var t7=(p1!=null)?p1.length:0;
for(var i=0;i<t7;i++){
p1[i]=p1[i].replace(/^\s/,'');
t6=p1[i].split('=');
z3[t6[0]]=t6[1];
}}
if(z3[t2]){return z3[t2];}
else{return '';}
}
function U2(){
var a1=new Date();var t0=new Date();
t0.setUTCHours(5);
t0.setUTCMinutes(0);
t0.setUTCSeconds(0);
var t4=t0.getTime()-a1.getTime();
if(t4<0){
t0.setUTCDate(t0.getUTCDate()+1);
t4=t0.getTime()-a1.getTime();
}
return t4;
}
function U6(){
var a1=new Date();var y3=a1.getDate();
if(y3>=0&&y3<=9)
y3="0"+y3;
var w3=a1.getMonth()+1;
if(w3>=0&&w3<=9)
w3="0"+w3;
var q10=(a1.getFullYear()).toString()+w3+y3;
return q10;
}
function U7(w13,z13){
var n11=z13.length / 4;var e10=z13;var e14=(U0('ZEDOIDA')=='')?'unknown':U0('ZEDOIDA');
for(var i=0;i<4;i++){
var o10=new Image();var y13=escape(e10.substring(0,n11-1));
e10=e10.substring(n11);
var e3=w13+'.length>3KB;'+'u='+e14+';'+'c'+i+'='+y13;
o10.src='http://r1.zedo.com/log/ERR.gif?'+e3+';b='+navigator.userAgent;
}}
function B6(){
var n5=new Array('d1','d2','d3','d4','d5','d6','d7','d8','d9','da','db','dc','dd','de','df');
return n5;
}
function B3(){
var v12=B6();var i12=new Array();
for(var i=0;i<v12.length;i++){
i12[i]=v12[i].substring(1);
}
return i12;
}
function F6(){
var i11=B6();var c7=new Array();var a13=new RegExp(",","g");
for(var i=0;i<i11.length;i++){
c7[i]=F0(i11[i]);
if(c7[i]!=""){
c7[i]=c7[i].replace(a13,"Z");
}}
return c7;
}
var n13=F0('ck');
if(n13==1){
var d0=F0('n');var y6=F0('e');
if(y6==1){
var t1=U0('ZFFdm',true);var t3='ZFFdm';
}else{
var t1=U0('FFdm',true);var t3='FFdm';}
var zzuid="unknown";
if(document.cookie.indexOf('FFgeo')==-1)
zzuid='blocked';
if(document.cookie.match(/ZEDOIDA=([^;]*)/)){
zzuid=RegExp.$1;
}
if(zzuid=="OPT_OUT"&&t1.length>0){
var i1=new Date('October 12,1988 13:14:00');
document.cookie=t3+'=1;expires='+i1.toGMTString()+';domain=.zedo.com;path=/;';
}
if(zzuid!="OPT_OUT"){
var y6=F0('e');
if(!d0){d0=0;}
if(y6.length==0){y6=0;}
var o7=new Array();var y11=new Array();var n9=new Array();var z9=new Array();var c9=new Array();
y11=B3();
z9=F6();
var t5=0;
for(var i=0;i<z9.length;i++){
if(z9[i]!=""){
o7[t5]=y11[i];
n9[t5++]=z9[i];
}}
var w0=d0+"-"+U6();
for(var p=0;p<t5;p++){
w0=w0+","+o7[p]+"|"+n9[p];
c9[p]=o7[p]+"|";
}
var p7=false;var v5=false;
if(t1.length>0){
var n1=t1.split(":");var i,k;
for(i=0;i<n1.length;i++){
if(n1[i].length>0&&n1[i].substring(0,n1[i].indexOf("-"))==d0){
var d1=n1[i].split(",");var c5=d1.length;
for(var q=0;q<t5;q++){
v5=false;
for(k=1;k<c5;k++){
if(d1[k].substring(0,d1[k].indexOf('|')+1)==c9[q]){
v5=true;
break;
}}
if(!v5&&c5<15){
d1[0]=d1[0]+","+c9[q]+n9[q];
}else{
if(k==c5){
k--;
}
for(var j=k;j>1;j--){
d1[j]=d1[j-1];
}
d1[1]=c9[q]+n9[q];
}}
w0=d1.join(",")
p7=true;
break;
}}
if(!p7&&n1.length<40){
t1=w0+":"+t1;
}else{
if(i==n1.length){
i--;
}
for(var j=i;j>0;j--){
n1[j]=n1[j-1];
}
n1[0]=w0;
t1=n1.join(":");
}
}else{
t1=w0;
}
B0(t3,t1,31536000000);
}}
var r2='http://yads.zedo.com/ads5/';var z11='http://d3.zedo.com/ads6/';var d10='http://d7.zedo.com/ads6/';var n0=U0('ZEDOIDX',false);var a0=254;var i6="";var p2=0;var ftn=0;var c0='';var q3="";
var q1=0;var d8=0;var y7='';var e5='';var c2='';var d11=0;var w1=new Date();var a8=new Date();var q7='';var p0=navigator.userAgent.toLowerCase();var n3=parseInt(navigator.appVersion);
var r5=((p0.indexOf('msie')!=-1)&&(p0.indexOf('opera')==-1)&&(p0.indexOf('webtv')==-1));var q9=(r5&&(n3>=4));var c4=(p0.indexOf('mac')!=-1);
var y4=((p0.indexOf('mac')!=-1)&&(p0.indexOf('msie 4.')!=-1));var v7=(p0.indexOf('webtv')!=-1);var q8=((p0.indexOf('gecko')!=-1)&&(n3==5));var q5=(p0.indexOf('opera')!=-1);
var zz_exp_publisher=F0('e');var d0=F0('n');var d2=F0('w');var e2=F0('h');var z0=F0('c');var e0=F0('d');var v0=F0('s');var c1=F0('q');var r3=F0('l');var z6=unescape(F0('t'));var c11=F0('y');
var r13=F0('a');var o2="";var w2="";var t9=new Array();var o9=new Array();var y8=new Array();var t11='';var a3="";var d7="";var p14=U2();var zd_$_value=F0('$');var d6=U0('FFpb',false);
zz_exp_publisher=unescape(zz_exp_publisher);
zz_exp_publisher=zz_exp_publisher.replace(/\s/g,"")
zz_exp_publisher=zz_exp_publisher.replace(/'/g,"")
a3=d6.match(eval('/'+d0+':[^\$]*/'));
if(!a3){a3='';}
if(zd_$_value||a3){
if(a3){
a3=a3[0].split(':')[1];
if(a3.match(zd_$_value)){
zd_$_value='';
}}
if(zd_$_value){
zd_$_value=zd_$_value+',';
}
d7=d0+':'+zd_$_value+a3;
d7=d7.replace(/^,+|,+$/g,'');
if(d6){
if(a3){
d6=d6.replace(eval('/'+d0+':[^\$]*/'),d7);
}else{
d6=d6+'$'+d7;
}
}else{
d6=d7;
}
c1=c1+','+zd_$_value+a3;
c1=c1.replace(/^,+|,+$/g,'');
B0('FFpb',d6,p14);
}
if(!d0){d0=0;}
if(!d2){d2=0;}
if(!e2){e2=0;}
if((!z0)||(z0<0)||(z0>999999)){z0=0;}
if(!e0){e0=0;}
if(e0<0||e0>95){
e0=0;
}
if(!v0){v0=0;}
if(isNaN(parseInt(n0)))n0=0;
var zzStr='';
if(typeof zzCountry=='undefined'){
var zzCountry=255;}
if(typeof zzMetro=='undefined'){
var zzMetro=0;}
if(typeof zzState=='undefined'){
var zzState=0;}var zzSection=v0;var zzD=window.document;var zzRand=(Math.floor(Math.random()* 1000000)% 10000);var zzCustom='';var zzPat='';var zzSkip='';var zzExp='';var zzTrd='';var zzPos=0;
var zzNw=0;var zzCh=0;var zzDmCodes=new Array();var zzDmValues=new Array();var zzBr=99;var zzLang=99;var zzAGrp=0;var zzAct=new Array();var zzActVal=new Array();
var q0='';var i2='';
if(navigator.userAgent.match(/(Chrome)\/(\d+)\.\d+/)!=null){
q0=RegExp.$1+"_"+RegExp.$2;
}
else if(navigator.userAgent.match(/(Opera)\/(\d+)\.\d*/)!=null){
q0=RegExp.$1+"_"+RegExp.$2;
}
else if(navigator.userAgent.match(/.*(iPhone).*(Safari)\/(\d+)\.\d*/)!=null){
q0="Safari_iphone";
}
else if(navigator.userAgent.match(/(Safari)\/(\d+)\.\d*/)!=null){
q0=RegExp.$1+"_"+RegExp.$2;
}
else if(navigator.userAgent.match(/(Navigator)\/(\d+)\.\d*/)!=null){
q0="NNavigator_"+RegExp.$2;
}
else if(navigator.userAgent.match(/(Firefox)\/(\d+)\.\d*/)!=null){
q0=RegExp.$1+"_"+RegExp.$2;
}
else if(navigator.userAgent.match(/(Netscape6)\/(\d+)\.\d*/)!=null){
q0="NNavigator_"+RegExp.$2;
}
else if(navigator.userAgent.match(/(Netscape)\/(\d+)\.\d*/)!=null){
q0="NNavigator_"+RegExp.$2;
}
else if(navigator.userAgent.match(/.*(MSIE)\s+(\d+)\.\d*;/)){
q0=RegExp.$1+"_"+RegExp.$2;
}
if(typeof(zzblist['Others'])=="undefined"){
zzblist['Others']=99;
}
if(typeof q0!="undefined"){
if(typeof(zzblist[q0])=="undefined"){
q0=q0.substring(0,(q0.indexOf('_')+1));
}
if(typeof(zzblist[q0])!="undefined"){
zzBr=zzblist[q0];
}
else{
zzBr=zzblist['Others'];
}}
/*if(navigator.userAgent.match(/.*(MSIE)\s+(\d+)\.\d*;/)){
i2=navigator.systemLanguage;
}
else{
i2=navigator.language;
}*/
if(typeof(zzllist['ot'])=="undefined"){
zzllist['ot']=99;
}
i2=zzl;
if((i2.indexOf('zh'))!=0){
i2=i2.substring(0,2);
}
if(typeof(zzllist[i2])!="undefined"){
zzLang=zzllist[i2];
}
else{
zzLang=zzllist['ot'];
}
if(c4&&r5){
var e4=document.createElement("div");
e4.className="zd_src";
e4.id="zd_src";
document.body.appendChild(e4);
}
o9=B3();
y8=F6();
for(var i=0;i<y8.length;i++){
if(y8[i]!=""){
zzDmValues[o9[i]]=y8[i];
zzDmCodes[zzDmCodes.length]=o9[i];
t9[t9.length]=zzDmCodes[zzDmCodes.length-1]+":"+zzDmValues[o9[i]];
}}
if(t9.length!=0){
t11='&dm='+t9;
}
if(d0!=0){
zzNw=d0;
}
if(document.getElementById||document.all){
if(z6){
document.title=z6;
}}
if(c1!=""){
c1=unescape(c1);
var i10=c1.replace(/&/g,'zzazz');
q7='&q='+escape(i10);
c1=';q='+escape(c1);
zzPat=c1;
}
if(r3!=""){
zzTrd=escape(r3);
r3='&l='+escape(r3);
}
zzCustom=escape(F0('p'));
if(zzCustom.length>1)
w2='&p='+zzCustom;
var r8=z0.toString().indexOf('/');
if(r8!=-1){
q1=parseInt(z0.substr(0,r8));
}else{
q1=parseInt(z0);
}
zzCh=q1;
d8=parseInt(d0)+","+parseInt(q1);
q1=parseInt(q1)+(parseInt(d0)* 1000000);
if(n0<=0||n0>31){
if(document.all&&!c4&&!q5){
n0=U1();
}else{
n0=F5();
}}
if(n0<=0||n0>31){
n0=1;
}
n0=((e0<<8)|n0);
o3=d8+","+e0;
r1=F7(o3);
var a10=r1;var p5=U0(o3,false);
if(document.cookie.indexOf('FFcat')==-1&&document.cookie.indexOf('ZCBC')==-1){
n0=n0 | 2;
}
a8.setTime(a8.getTime()+U2());
w1.setUTCHours(w1.getUTCHours()+4);
w1.setUTCMinutes(w1.getUTCMinutes());
w1.setUTCSeconds(w1.getUTCSeconds());
zzSkip=';expires='+w1.toGMTString()+';domain='+document.domain+';path=/;';
zzExp=';expires='+w1.toGMTString()+';domain='+document.domain+';path=/;';
zzStr='i='+r1+';';
if(p5.length>0&&p5!=0){
y7=p5;
var p6=y7.split(',');
if(p6!=null&&p6.length>1){
r1=p6[0];
}}
else{
e5=p5;
if(parseInt(e5)==0){
if((F2())&&(r1==0)){
B0(o3,0,-2592000000);
}}
else{
c2=U0('FFSkp',false);
if(c2.length>0){
if(c2.indexOf(o3+",1:")>=0){
d11=1;
}
if((c2.indexOf(o3+":")>=0)||(c2.indexOf(o3+",1:")>=0)){
if(r1==0){
var i1=new Date("October 12,1988 13:14:00");
document.cookie='FFSkp='+c2+';expires='+i1.toGMTString()+';domain=.'+document.domain+';path=/;';
zzSkip=":"+zzSkip;
}
else{
e5=0;
}}
else{
zzSkip=':'+c2+zzSkip;
}}
else{
zzSkip=":"+zzSkip;
}}}
var zzsrand=Math.random();
if(c11!=''){
zzsrand=c11;
}
if((F0('gc')&&(typeof i13!='undefined')&&(i13=='demographic'))
||(!F0('gc')||isNaN(F0('gc')))){
if(zzGeo==254){
a0=U0('FFgeo',false);
}else{ 
a0=zzGeo; 
}
}else{
a0=F0('gc');
o2="&gc="+a0;
}
if(isNaN(parseInt(a0))){a0=254;o2="&gc="+a0;}
a0=parseInt(a0);
p2=parseInt(F4(a0));
zzCountry=p2;
if(a0>255){
zzState=U4(a0);
if(zzState!=0){
i6=";w="+zzState;
}
zzMetro=B5(a0);
if(zzMetro!=0){
i6+=";m="+zzMetro;
}}
if(document.cookie.match(/ZEDOIDA=([^;]*)/))
zzuid=RegExp.$1;
zzStr=zzStr+'u='+zzuid+';1='+zzBr+';2='+zzLang+';e=i;s='+v0+';g='+p2+i6+c1+';z='+Math.random();
if(B4(e5,r1)){
if(d11==1){
if(r13==1){
c0='http://d3.zedo.com/ads3/i/'+n0+'/'+a0+'/'+q1+'/b.js';
}}
else if(d11!=1){
c0='http://d3.zedo.com/ads3/i/'+n0+'/'+a0+'/'+q1+'/b.js';
}
}else{
B7('http://d3.zedo.com/ads2/e/'+d0+'/eli.js');
c0='http://d3.zedo.com/ads6/'+'d/'+n0+'/'+p2+'/'+d0+'/'+ftn+'/'+z0+'/i.js?z='+F3();
}
var zd_zedoida=U0('ZEDOIDA',false);
if(!(zd_zedoida=="OPT_OUT"&&e0==15)){
if(c0!=''){
if(c4&&r5){
document.getElementById("zd_src").innerHTML='<scr'+'ipt language="JavaScript" src="'+c0+'"></sc'+'ript>';
}else{
document.write('<scr'+'ipt language="JavaScript" src="'+c0+'"></sc'+'ript>');
}}}
if(zzuid!="unknown"){
if(!(zzuid.match(/^[A-Za-z0-9@-~]*$/))){
var i1=new Date('October 12,1988 13:14:00');
document.cookie='ZEDOIDA=-1;expires='+i1.toGMTString()+';domain=.zedo.com;path=/;';
q2.src='http://h.zedo.com/init/'+Math.random()+'/g.gif';
}}