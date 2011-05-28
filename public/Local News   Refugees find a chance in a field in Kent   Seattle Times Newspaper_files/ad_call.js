
(function() {

		function reset(w, doc) {
		var n=null;
		w.turn_ad_publisher=n;
		w.turn_ad_publisher_ad_code=n;
		w.turn_ad_publisher_channel=n;
		w.turn_ad_publisher_use_frames=n;
		w.turn_ad_encoding=n;
		w.turn_ad_target_page_url=n;
		w.turn_ad_location_url=n;
		w.turn_ad_referrer_url=n;
		w.turn_last_modified_date=n;
		w.turn_ad_url=n;
		w.turn_ad_layout=n;
		w.turn_ad_layout_width=n;
		w.turn_ad_layout_height=n;
		w.turn_ad_layout_border=n;
		w.turn_ad_layout_scrolling=n;
		w.turn_ad_types=n;
		w.turn_ad_color_schema=n;
		w.turn_ad_border_color=n;
		w.turn_ad_background_color=n;
		w.turn_ad_title_color=n;
		w.turn_ad_body_color=n;		
		w.turn_ad_display_url_color=n;
		w.turn_ad_sale_price_color=n;
		w.turn_ad_disable_text=n;
		w.turn_ad_disable_thumb=n;
		w.turn_ad_disable_graphic=n;
		w.turn_ad_disable_flash=n;
		w.turn_ad_default_url=n;
		w.turn_ad_default_image_url=n;
		w.turn_ad_default_html=n;
		w.turn_ad_hints=n;
		w.turn_ad_manual_id=n;
		w.turn_ad_ps_version=n;
		w.turn_3rd_party_click=n;
		w.turn_ad_call_price=n;
		w.ex_buyer_line_item=n;
		w.ex_seller_line_item=n;
		w.ex_publisher=n;		
		w.ex_city=n;
		w.turn_ad_use_iframe=n;
	}

	function nullOrEmptyString(x) {
		return ( x == null || x == "" );
	}

	function quote(x) {
		return x != null ? '"' + x + '"' : '""' ;
	}

	function encode(x) {
		if(typeof encodeURIComponent == "function") {
			return encodeURIComponent(x);
		} else { 
			return escape(x);
		}
	}
	
	function isInFrame(w, doc) {
		if(w.turn_ad_publisher_use_frames > 0) {
			return false;
		}
		if(w.top.location == doc.location) {
			return false;
		}
		if(w.turn_ad_layout_width && w.turn_ad_layout_height) {
			var fW = 1;
			var fH = 1;
			var dE = doc.documentElement;
			if(w.innerHeight) {
				fW = w.innerWidth;
				fH = w.innerHeight;
			} else if(dE && dE.clientHeight) {
				fW = dE.clientWidth;
				fH = dE.clientHeight;
			} else if(doc.body) {
				fW = doc.body.clientWidth;
				fH = doc.body.clientHeight;
			}
			if(fW > 2*w.turn_ad_layout_width || fH > 2*w.turn_ad_layout_height) {
				return false;
			}
		}
		return true;
	}

	function generateAdCallError(doc, adUrl, errorMsg) { 
		var errorUrl = "http://ad.turn.com/r/error?errMsg=";
		errorUrl += errorMsg;
		errorUrl += "&adUrl=" + encode(adUrl);
		var imageCall='<img height="1" width="1" border="0" src='+ quote(errorUrl) + "/>";
		return imageCall;
	}
	
	function setLayoutDefaults(w, doc) {
		// global defaults
		w.turn_ad_layout_scrolling = "no";
		w.turn_ad_layout_border = 0;
		
		// layout specific defaults
		if (w.turn_ad_layout != "0x0") {
							if(w.turn_ad_layout == "468x60") {
				w.turn_ad_layout_width = 468;
				w.turn_ad_layout_height = 60;
			}
					if(w.turn_ad_layout == "728x90") {
				w.turn_ad_layout_width = 728;
				w.turn_ad_layout_height = 90;
			}
					if(w.turn_ad_layout == "300x250") {
				w.turn_ad_layout_width = 300;
				w.turn_ad_layout_height = 250;
			}
					if(w.turn_ad_layout == "120x600") {
				w.turn_ad_layout_width = 120;
				w.turn_ad_layout_height = 600;
			}
					if(w.turn_ad_layout == "160x600") {
				w.turn_ad_layout_width = 160;
				w.turn_ad_layout_height = 600;
			}
					if(w.turn_ad_layout == "120x240") {
				w.turn_ad_layout_width = 120;
				w.turn_ad_layout_height = 240;
			}
					if(w.turn_ad_layout == "350x60") {
				w.turn_ad_layout_width = 350;
				w.turn_ad_layout_height = 60;
			}
					if(w.turn_ad_layout == "234x60") {
				w.turn_ad_layout_width = 234;
				w.turn_ad_layout_height = 60;
			}
					if(w.turn_ad_layout == "180x150") {
				w.turn_ad_layout_width = 180;
				w.turn_ad_layout_height = 150;
			}
					if(w.turn_ad_layout == "425x600") {
				w.turn_ad_layout_width = 425;
				w.turn_ad_layout_height = 600;
			}
					if(w.turn_ad_layout == "120x90") {
				w.turn_ad_layout_width = 120;
				w.turn_ad_layout_height = 90;
			}
					if(w.turn_ad_layout == "0x0") {
				w.turn_ad_layout_width = 0;
				w.turn_ad_layout_height = 0;
			}
					if(w.turn_ad_layout == "1x1") {
				w.turn_ad_layout_width = 1;
				w.turn_ad_layout_height = 1;
			}
					if(w.turn_ad_layout == "125x125") {
				w.turn_ad_layout_width = 125;
				w.turn_ad_layout_height = 125;
			}
					if(w.turn_ad_layout == "300x600") {
				w.turn_ad_layout_width = 300;
				w.turn_ad_layout_height = 600;
			}
					if(w.turn_ad_layout == "336x280") {
				w.turn_ad_layout_width = 336;
				w.turn_ad_layout_height = 280;
			}
					if(w.turn_ad_layout == "120x120") {
				w.turn_ad_layout_width = 120;
				w.turn_ad_layout_height = 120;
			}
				}
		if (w.turn_ad_layout == "1x1" || w.turn_ad_layout == "0x0") {	
			w.turn_ad_use_iframe = true;
		}
	}
	
	function setDefaults(w, doc) {
		if(w.turn_ad_layout == null) {
			if (w.turn_ad_layout_width != null && w.turn_ad_layout_height != null) {
				w.turn_ad_layout = "0x0";
			} else {
				w.turn_ad_layout = "160x600";
			}
		}
		
		setLayoutDefaults(w, doc);	
		
		if(w.turn_ad_publisher_use_frames == null) {
			w.turn_ad_publisher_use_frames = 0;
		}
		
		setTargetPageUrl(w, doc);
	}
	
	function isTopAccessDenied(w, doc) {
		try {
			var temp = w.top.location.host;
		} catch (ex) {
			return true;
		}
		return false;
	}

	function findPos(obj) {
		var curleft = 0;
		var curtop = 0;
		if (obj.offsetParent) {
			while (obj.offsetParent) {
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
				obj = obj.offsetParent;
			}
		} else if (obj.clientX) {
			curleft += obj.pageX;
			curtop += obj.pageY;
		}
		return new Array(curleft, curtop);
	}
	
	function getVisibleArea(w, doc) {
		try {
			if (isTopAccessDenied(w, doc)) return -1;
			var topW = w.top;
			var topDoc = topW.document;

						var viewportRight = 0, viewportBottom = 0;
			if( typeof( topW.innerWidth ) == 'number' ) {
								viewportRight = topW.innerWidth;
				viewportBottom = topW.innerHeight;
			} else if( topDoc.documentElement && ( topDoc.documentElement.clientWidth || topDoc.documentElement.clientHeight ) ) {
								viewportRight = topDoc.documentElement.clientWidth;
				viewportBottom = topDoc.documentElement.clientHeight;
			} else if( topDoc.body && ( topDoc.body.clientWidth || topDoc.body.clientHeight ) ) {
								viewportRight = topDoc.body.clientWidth;
				viewportBottom = topDoc.body.clientHeight;
			}
			if (viewportRight ==  0 || viewportBottom == 0) return -1;
			
			var frameLeft = 0;
			var frameTop = 0;
			doc.write('<div id="turnAdLocation" width="' + w.turn_ad_layout_width + '" height="' + w.turn_ad_layout_height + '"></div>');
			var elem = doc.getElementById('turnAdLocation');
			if (elem) {
				var position = findPos(elem);
				frameLeft = position[0];
				frameTop = position[1];
				if (elem.offsetParent.removeChild) {
					try {
						elem.offsetParent.removeChild(elem);
					} catch (e) {
						elem.style.width = 0;
						elem.style.height = 0;
					}
				} else {
					elem.style.width = 0;
					elem.style.height = 0;
				}
			}
			
			var parentWindow = w;
			var maxLoopCount = 20;
			var counter = 0;
			while (parentWindow != topW) {
								if (counter > maxLoopCount) break;
				elem = parentWindow.frameElement;
				if (elem) {
					var position = findPos(elem);
					frameLeft += position[0];
					frameTop += position[1];
				}
				parentWindow = parentWindow.parent;
				counter++;
			}
			var frameRight = frameLeft + w.turn_ad_layout_width;
			var frameBottom = frameTop + w.turn_ad_layout_height;
			
			if (frameLeft > viewportRight || frameTop > viewportBottom) {
				return 0;
			}
			if (frameRight <= viewportRight && frameBottom <= viewportBottom) {
				return 1;
			}

			var desiredArea = w.turn_ad_layout_width * w.turn_ad_layout_height;
			var showingHeight = w.turn_ad_layout_height;
			var showingWidth = w.turn_ad_layout_width;
			if (frameRight > viewportRight)
				showingWidth -= frameRight - viewportRight;
			if (frameBottom > viewportBottom)
				showingHeight -= frameBottom - viewportBottom;
			var showingArea = showingHeight * showingWidth;
			var result = showingArea / desiredArea;
			return result.toFixed(2);
		} catch (ex) {
			return -1;
		}
	}
	
	function getScreenRes(w) {
		try {
			var screenWidth = w.screen.width;
			var screenHeight = w.screen.height;
			if (screenWidth && screenHeight) {
				return Math.max(screenWidth, screenHeight);
			}
			return -1;
		} catch (ex) {
			return -1;
		}	
	}
	
	function setTargetPageUrl(w, doc) {
		if(nullOrEmptyString(w.turn_ad_target_page_url)) {
			w.turn_ad_target_page_url = doc.referrer;
			if(isInFrame(w, doc)) {
				w.turn_ad_target_page_url = doc.referrer;
				w.turn_ad_location_url = doc.location;
			} else {
				w.turn_ad_target_page_url = doc.location;
				w.turn_last_modified_date = Date.parse(doc.lastModified)/1000;
				w.turn_ad_referrer_url = doc.referrer;
			}
		} else {
			if(isInFrame(w, doc)) {
				w.turn_ad_location_url = doc.referrer;
			} else { 
				w.turn_ad_location_url = doc.location;
			}
		}
		
		if(nullOrEmptyString(w.turn_ad_target_page_url)) {
			w.turn_ad_target_page_url = doc.location;
		} 
	}
	
	function addAdUrlParam(w, paramName, paramValue) {
		addAdUrlParamImpl(w, paramName, paramValue, true);
	}
	
	function addAdUrlParamImpl(w, paramName, paramValue, doEncode) {
		if(paramValue != null) {
			if(!doEncode) {
				w.turn_ad_url += "&" + paramName + "=" + paramValue;
			} else {
				w.turn_ad_url += "&" + paramName + "=" + encode(paramValue);
			}
		}
	}
	
	function setAdUrl(w, doc) {
		if (w.turn_ad_use_iframe) {
			w.turn_ad_url = "http://ad.turn.com/server/ads.htm?";
		} else {
			w.turn_ad_url = "http://ad.turn.com/server/ads.js?";
		}
		addAdUrlParam(w, "pub", w.turn_ad_publisher);
		addAdUrlParam(w, "code", w.turn_ad_publisher_ad_code);
		addAdUrlParam(w, "cch", w.turn_ad_publisher_channel);
		if (w.turn_ad_layout == "0x0") {
			addAdUrlParam(w, "lw", w.turn_ad_layout_width);
			addAdUrlParam(w, "lh", w.turn_ad_layout_height);
		}
		addAdUrlParam(w, "l", w.turn_ad_layout);
		if(w.turn_ad_disable_text == 1) {
			addAdUrlParam(w, "notext", "1");
		}
		if(w.turn_ad_disable_thumb == 1) {
			addAdUrlParam(w, "nothumb", "1");
		}
		if(w.turn_ad_disable_graphic == 1) {
			addAdUrlParam(w, "nographic", "1");
		}
		if(w.turn_ad_disable_flash == 1 || !isFlashInstalled()) {
			addAdUrlParam(w, "noflash", "1");
		}
		if (!isFlashInstalled()) {
			addAdUrlParam(w, "noflashplugin", "1");
		}
		addAdUrlParam(w, "durl", w.turn_ad_default_url);
		addAdUrlParam(w, "diurl", w.turn_ad_default_image_url);
		addAdUrlParam(w, "dhtml", w.turn_ad_default_html);
									addAdUrlParam(w, "psVersion", w.turn_ad_ps_version);
				addAdUrlParam(w, "clr", w.turn_ad_color_schema);
		addAdUrlParam(w, "c1", w.turn_ad_border_color);
		addAdUrlParam(w, "c2", w.turn_ad_background_color);
		addAdUrlParam(w, "c3", w.turn_ad_title_color);
		addAdUrlParam(w, "c4", w.turn_ad_body_color);
		addAdUrlParam(w, "c5", w.turn_ad_display_url_color);
		addAdUrlParam(w, "c6", w.turn_ad_sale_price_color);
		addAdUrlParam(w, "tmz", getTimezoneOffset());
		addAdUrlParam(w, "notop", isTopAccessDenied(w, doc) ? "1" : null);
		addAdUrlParam(w, "acp", w.turn_ad_call_price);	
		addAdUrlParam(w, "bli", w.ex_buyer_line_item);
		addAdUrlParam(w, "sli", w.ex_seller_line_item);
		addAdUrlParam(w, "exPub", w.ex_publisher);				
		addAdUrlParam(w, "city", w.ex_city);
		addAdUrlParam(w, "area", getVisibleArea(w, doc));
		addAdUrlParam(w, "res", getScreenRes(w));
		addAdUrlParam(w, "rnd", Math.random());
		addAdUrlParam(w, "lmd", w.turn_last_modified_date);
		addAdUrlParam(w, "aid", w.turn_ad_manual_id);
				addAdUrlParam(w, "url", w.turn_ad_target_page_url);
		addAdUrlParam(w, "3c", w.turn_3rd_party_click);
		addAdUrlParam(w, "ref", w.turn_ad_referrer_url);
		addAdUrlParam(w, "loc", w.turn_ad_location_url);
	}
	
	function generateAdCallFrame(w, doc, adUrl) {
		var result = '<iframe name="turn_ad_call_frame" width=' + quote(w.turn_ad_layout_width) + " height=" + quote(w.turn_ad_layout_height) + " frameborder=" + quote(w.turn_ad_layout_border);
		result += ' src=' + quote(adUrl);
		result += ' marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling=' + quote(w.turn_ad_layout_scrolling)+ '>';
		result += generateAdCallError(doc, adUrl, "noiframe");
		result += '</iframe>';
		return result;
	}
	
	function generateAdCallJS(w, doc, adUrl) {
		var result = '';
		result += '<scr' + 'ipt src="' + adUrl + '" type="text/javascript"></scr' + 'ipt>';
		return result;
	}

	function getTimezoneOffset() {
		var d = new Date();
		// return time in hours
		return -1 * (d.getTimezoneOffset() / 60);
	}
	
	function adCallFrame(w, doc) {
		var adUrl = w.turn_ad_url;
		adUrl = adUrl.substring(0, 1000);
		
		if(w.name == "turn_ad_call_frame") {
			doc.write(generateAdCallError(doc, adUrl, "recursive_ad_call"));
		} else if (w.turn_ad_use_iframe) {
			doc.write(generateAdCallFrame(w, doc, adUrl));
		} else {
			if (!w.turn_ad_request_count) w.turn_ad_request_count = 1;
			if (w.turn_ad_request_count >= 10) {
				doc.write(generateAdCallError(doc, adUrl, "js_recursive_ad_call"));
			} else {
				w.turn_ad_request_count = w.turn_ad_request_count + 1;
				doc.write(generateAdCallJS(w, doc, adUrl));
			}
		}
	}
	
	function isFlashInstalled() {
		installedVer=getPlayerVersion();
		if (installedVer) {
			requiredVer = 7;
			if (installedVer.major >= requiredVer) {
				return true;
			}
		}
		
		return false;
	}
	
	function getPlayerVersion(){
		var _23=new PlayerVersion([0,0,0]);
		if(navigator.plugins&&navigator.mimeTypes.length){
		var x=navigator.plugins["Shockwave Flash"];
		if(x&&x.description){_23=new PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));}
		}else{try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");}
		catch(e){try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
		_23=new PlayerVersion([6,0,21]);axo.AllowScriptAccess="always";}
		catch(e){if(_23.major==6){return _23;}}try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");}
		catch(e){}}if(axo!=null){_23=new PlayerVersion(axo.GetVariable('$version').split(" ")[1].split(","));}}
		return _23;
	}
	
	PlayerVersion=function(_27){
		this.major=_27[0]!=null?parseInt(_27[0]):0;
		this.minor=_27[1]!=null?parseInt(_27[1]):0;
		this.rev=_27[2]!=null?parseInt(_27[2]):0;
	}		
	var error_handler_old = window.onerror;
	
	function errorHandler() {
		finallyHandler();
		return true;
	}
	
	function finallyHandler() {
		adCallFrame(window, document);
		reset(window, document);
		window.onerror = error_handler_old;
	}

	window.onerror = errorHandler;
	
	setDefaults(window, document);
	setAdUrl(window, document);
	
	finallyHandler();
		
}
)()

