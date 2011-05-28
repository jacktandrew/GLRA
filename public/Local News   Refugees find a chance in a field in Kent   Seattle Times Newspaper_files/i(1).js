

var zzDate = new Date(); 
 var zzWindow; 
 var zzURL; 
if (typeof zzCustom =='undefined'){var zzIdxCustom ='';}
else{var zzIdxCustom = zzCustom;}
if (typeof zzTrd =='undefined'){var zzIdxTrd ='';}
else{var zzIdxTrd = zzTrd;}
if (typeof zzIdxNw == 'undefined' || zzIdxNw.length == 0) { var zzIdxNw = ''; }
else { zzIdxNw = ';sn=' + zzIdxNw + ';';}
if (typeof zzIdxCh == 'undefined' || zzIdxCh.length == 0) { var zzIdxCh = ''; }
else { zzIdxCh = 'sc=' + zzIdxCh + ';';}
if (typeof zzIdxPub == 'undefined' || zzIdxPub.length == 0) { var zzIdxPub = ''; }
else { zzIdxPub = 'ss=' + zzIdxPub + ';';}
if (typeof zzIdxPos == 'undefined' || zzIdxPos.length == 0) { var zzIdxPos =''; }
else { zzIdxPos = 'si=' + zzIdxPos + ';';}
if (typeof zzIdxClk == 'undefined' || zzIdxClk.length == 0) { var zzIdxClk =''; }
else { zzIdxClk = 'se=' + zzIdxClk;}
if (typeof ainfo == 'undefined' || ainfo.length == 0) { var ainfo =''; }

var zzLPixie = 'a=' + zxa + ';x=' + zxx +';g=' + zzCountry + ';c=' + zxch1 + ',' + zxch2 + ';i=' + zxpos +';n=' + zxnw + ';';
var zzChId = -1;
var zzPbId = -1;

if (typeof zzChanId != 'undefined' && zzChanId.length != 0) {zzChId = zzChanId;}
if (typeof sChanId != 'undefined' && sChanId.length != 0 && (typeof zxz != 'undefined') && zxz.length != 0 && zxz > 0) {zzChId = sChanId;}

if (typeof zzSection != 'undefined' && zzSection.length != 0) {zzPbId = zzSection;}
if (typeof sPubId != 'undefined' && sPubId.length != 0 && (typeof zxz != 'undefined') && zxz.length != 0 && zxz > 0) {zzPbId = sPubId;}
var zzAdTagId = '881984_'+zzChId+'_'+zzPbId+'_1_1';
document.write("<span id='Zedo-Ad="+zzAdTagId+";Domain=.zedo.com'>");
document.write("</span>")
document.write('<script type="text/javascript">'); 
document.write('var casaleD=new Date();var casaleR=(casaleD.getTime()%8673806982)+Math.random();'); 
document.write('var casaleU=escape(window.location.href);'); 
document.write('var casaleHost=\' type="text/javascript" src="http://as.casalemedia.com/s?s=\';'); 
document.write('document.write(\'<scr\'+\'ipt\'+casaleHost+\'105899&amp;u=\');'); 
document.write('document.write(casaleU+\'&amp;f=1&amp;id=\'+casaleR+\'"><\/scr\'+\'ipt>\');'); 
document.write(';<\/script>'); 







