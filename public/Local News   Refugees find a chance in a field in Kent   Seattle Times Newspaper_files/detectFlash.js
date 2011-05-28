if (TFSMFlash_VERSION){
	var MM_contentVersion = TFSMFlash_VERSION;
	var plugin = (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"]) ? navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin : 0;
	if ( plugin ) {
		var words = navigator.plugins["Shockwave Flash"].description.split(" ");
			for (var i = 0; i < words.length; ++i) {
				if (isNaN(parseInt(words[i]))) continue;
				var MM_PluginVersion = words[i];
		    }
		var MM_FlashCanPlay = false;
		try{
			MM_FlashCanPlay = parseFloat(MM_PluginVersion) >= parseFloat(MM_contentVersion);
		}catch(e){
			MM_FlashCanPlay = false;
		}
	}
	else if (navigator.userAgent && navigator.userAgent.indexOf("MSIE")>=0 && (navigator.appVersion.indexOf("Win") != -1)) {
		try{
			var flashActiveX = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + MM_contentVersion);
		}catch(e){
			//axo.AllowScriptAccess = "always"; // throws if player version < 6.0.47
		}
		var MM_FlashCanPlay = (flashActiveX != null)? true : false;
	}
}

if (MM_FlashCanPlay)
{
	flashEnabled = true;
	getResults(flashEnabled);
} 
else 
{
	flashEnabled = false;
	getResults(flashEnabled);
}