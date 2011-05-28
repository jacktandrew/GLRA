

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
var zzAdTagId = '900965_'+zzChId+'_'+zzPbId+'_300_250';
document.write("<span id='Zedo-Ad="+zzAdTagId+";Domain=.zedo.com'>");
document.write("</span>")
document.write('<script type="text/javascript">'); 
document.write('ord=Math.random()*10000000000000000;'); 
document.write('document.write(\'<script type="text/javascript" src="http://ad.doubleclick.net/adj/tnews.seattletimes.com/;r=1;sz=300x250ord='+Math.random()+'?;click=http://yads.zedo.com/ads2/c?' + escape(zzLPixie) + escape(zzStr) + escape(zzIdxNw) + escape(zzIdxCh)+ escape(zzIdxPub)+ escape(zzIdxPos)+ escape(zzIdxClk) + escape(ainfo)  + '%3Bk%3D' + zzIdxTrd + ';ord=\' + ord + \'?"><\\\/script>\');;'); 
document.write('<\/script>'); 
document.write('<noscript><a href="http://ad.doubleclick.net/jump/tnews.seattletimes.com/;r=1;sz=300x250;ord=123456789ord='+Math.random()+'??" target="_blank" ><img src="http://ad.doubleclick.net/ad/tnews.seattletimes.com/;r=1;sz=300x250;ord=123456789ord='+Math.random()+'??" border="0" alt="" /></a></noscript>'); 







