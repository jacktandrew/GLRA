function zCF6(){
if(document.cookie){
return true;
}
return false;
}
function zCU7(){
var zcw9=new Date();var zca3=new Date();
zca3.setUTCHours(5);
zca3.setUTCMinutes(0);
zca3.setUTCSeconds(0);
var zca4=zca3.getTime()-zcw9.getTime();
if(zca4<0){
zca3.setUTCDate(zca3.getUTCDate()+1);
zca4=zca3.getTime()-zcw9.getTime();
}
return zca4;
}
function zCF4(zcc11,zcd12,zcw8){
var zca6=new Date();
if(!zcw8){zcw8=31536000000;}
zca6.setTime(zca6.getTime()+zcw8);
document.cookie=zcc11+'='+zcd12+';expires='+zca6.toGMTString()+';domain=.zedo.com;path=/;';
}
function zCU4(zcw1,zcv7){
var zcw6=new Array();
if(!zcw6[zcw1]||zcv7){
var zcx0=document.cookie;var zco1=new Array();var zcv3=new Array();
zco1=zcx0.split(';');
var zcw7=(zco1!=null)?zco1.length:0;
for(var i=0;i<zcw7;i++){
zco1[i]=zco1[i].replace(/^\s/,'');
zcv3=zco1[i].split('=');
zcw6[zcv3[0]]=zcv3[1];
}}
if(zcw6[zcw1]){return zcw6[zcw1];}
else{return '';}
}
function zzGetNextAdId(zcr4){
var zcn2=0;var zca6=new Date();var zcr8=zCU4('FFcat',false);var zcd10=zCU4('FFad',false);
if(!zcr8){
zcr8=zcr4;
zcd10="-1";
}
zcn2=zCF7(zcr8,zcd10,zcr4);
return zcn2;
}
function zCF7(zcy4,zcn5,zcr4){
var zcw5=false;var zcz2=zcy4.split(":");var zcr2=zcn5.split(":");var zcn2=0;var zct11=0;var i;
for(i=0;i<zcz2.length;i++){
if(zcz2[i]==zcr4){
zct11=zcz2[i];
zcr2[i]++;
if(zcr2[i]>101){zcr2[i]=0;}
zcn2=zcr2[i];
if(isNaN(zcn2)){
zcn2=0;
zcr2[i]=0;
}
zcw5=true;
break;
}}
if(!zcw5&&zcz2.length<60){
zcy4=zcr4+":"+zcy4;
zcn5=0+":"+zcn5;
}
else{
if(i==zcz2.length){
i--;
}
for(var j=i;j>0;j--){
zcz2[j]=zcz2[j-1];
zcr2[j]=zcr2[j-1];
}
zcz2[0]=zcr4;
zcr2[0]=zcn2;
zcy4=zcz2.join(":");
zcn5=zcr2.join(":");
}
if(zCF6()){
var zca4=zCU7();
zCF4('FFcat',zcy4,zca4);
zCF4('FFad',zcn5,zca4);
}
else{
zcn2=Math.floor((Math.random()* 1000000)% 20);
}
return zcn2;
}

