var ST = {
	Callback:{},
	AddLoadEvent:function(func){
		var oldOnLoad = window.onload;
		if (typeof window.onload != 'function'){
	    	window.onload = func;
		} else {
			window.onload = function(){
				oldOnLoad();
				func();
			}
		}
	},
	PopUp:{
		types:{
			'popup':"width=860,height=560,left="+ ((screen.availWidth - 860) /2) + ",top=" + (((screen.availHeight - 560) /2) - 16) + ",scrollbars=no,menubar=no,resizable=yes,location=no",
			'popup_enlarge':"width=960,height=640,left="+ ((screen.availWidth - 960) /2) + ",top=" + (((screen.availHeight - 640) /2) - 16) + ",scrollbars=yes,menubar=no,resizable=yes,location=no",
			'popup_mediacenter':"width=940,height=640,left="+ ((screen.availWidth - 940) /2) + ",top=" + (((screen.availHeight - 640) /2) - 16) + ",scrollbars=no,menubar=no,resizable=yes,location=no",
			'popupscroll':"width=877,height=577,left="+ ((screen.availWidth - 877) /2) + ",top=" + (((screen.availHeight - 577) /2) - 16) + ",scrollbars=yes,menubar=no,resizable=yes,location=no",
			'slideshowpopup':"width=750,height=675,left="+ ((screen.availWidth - 750) /2) + ",top=" + (((screen.availHeight - 675) /2) - 16) + ",scrollbars=no,menubar=no,resizable=yes,location=no",
			'footerpopup':"width=620,height=500,left="+ ((screen.availWidth - 620) /2) + ",top=" + (((screen.availHeight - 500) /2) - 16) + ",scrollbars=yes,menubar=no,resizable=yes,location=no",
			'external':"width=960,height=640,left="+ ((screen.availWidth - 960) /2) + ",top=" + (((screen.availHeight - 640) /2) - 16) + ",scrollbars=yes,toolbar=yes,menubar=yes,resizable=yes,location=yes"
		},
		Add:function(element){
			if( !element ) return false;
			
			//get the type we need
			if( !ST.PopUp.types[ element.className ] ) return false;

			//assign the link everything it needs
			if( !element.target ) element.target = element.className;
			element.onclick = ST.PopUp.Open;
		},
		Open:function(){
			if( !ST.PopUp.types[this.target] ) return false;
			
			newWin = window.open(this.href, this.target, ST.PopUp.types[this.target]);
			newWin.focus();
			return false;
		}
	},
	AddScript:function(params){
		//Add script to the head.  Typically used for adding cross [sub]domain JS where AJAX
		//like functions will not work.
	
		if( !params.URI ) return false;
		
		if( params.overwriteId ){
			var scriptObj = document.getElementById(params.overwriteId);
			if( scriptObj != null ){
				scriptObj.parentNode.removeChild(scriptObj);
				delete scriptObj;
			}
		}
	
		var scriptObj = document.createElement('script');
		scriptObj.setAttribute('type', 'text/javascript');
		scriptObj.setAttribute('src', params.URI);
		if( params.overwriteId ) scriptObj.id = params.overwriteId;
		document.getElementsByTagName('head')[0].appendChild(scriptObj);
		return;
	},
	ImageCarousel:function(container){
		if( !container ) return false;
		
		var thisImageCarousel = this;
		
		thisImageCarousel.imageIds =new Array();
		thisImageCarousel.currentImage = 0;
		thisImageCarousel.totalImages = 0;
		var imageHeight = 0;
		try {
			var allDivs = container.getElementsByTagName('div');
			for (var elementNumber = 0; elementNumber < allDivs.length; elementNumber++) {
				switch( allDivs[elementNumber].className ){
					case "ImageDiv":
						thisImageCarousel.imageIds[thisImageCarousel.totalImages] = allDivs[elementNumber].id;
						thisImageCarousel.totalImages++;
						//get the max height across all images
						if (allDivs[elementNumber].offsetHeight > imageHeight) {
							imageHeight = allDivs[elementNumber].offsetHeight;
						}
						//hide it
						allDivs[elementNumber].style.display = 'none';
						break;
					case 'ImageBox':
						thisImageCarousel.ImageBox = allDivs[elementNumber];
				}
			}
			thisImageCarousel.totalImages--;
			
			var allAnchors = container.getElementsByTagName('a');
			for (var elementNumber = 0; elementNumber < allAnchors.length; elementNumber++) {
				switch( allAnchors[elementNumber].className ){
					case 'next_button':
						allAnchors[elementNumber].onclick = function(){ thisImageCarousel.Rotate('+'); };
						break;
					case 'previous_button':
						allAnchors[elementNumber].onclick = function(){ thisImageCarousel.Rotate('-'); };
						break;
				}
			}

			if (thisImageCarousel.imageIds[0]) {
				document.getElementById(thisImageCarousel.imageIds[0]).style.display = 'block';
				thisImageCarousel.ImageBox.style.height = imageHeight + "px";
				if (thisImageCarousel.totalImages >= 1) {
					document.getElementById("ImageControl").style.display = 'block';
					ST.ReplaceContent("ImageNumber","1");
					ST.ReplaceContent("TotalImages",thisImageCarousel.totalImages + 1);
				}
				thisImageCarousel.ImageBox.style.visibility = 'visible';
			}
		} catch(error) {
			return false;
		}
		
		thisImageCarousel.Rotate = function(direction) {
			if ((direction == "+") || (direction == "1")) {
				thisImageCarousel.currentImage++;
				if (thisImageCarousel.currentImage > thisImageCarousel.totalImages) {
					thisImageCarousel.currentImage = 0;
				}
			} else if (direction == "-") {
				thisImageCarousel.currentImage--;
				if (thisImageCarousel.currentImage < 0) {
					thisImageCarousel.currentImage = thisImageCarousel.totalImages;
				}
			}
			for (var imageNumber = 0; imageNumber <= thisImageCarousel.totalImages; imageNumber++) {
				document.getElementById(thisImageCarousel.imageIds[imageNumber]).style.display = 'none';
			}
			document.getElementById(thisImageCarousel.imageIds[thisImageCarousel.currentImage]).style.display = 'block';
			ST.ReplaceContent("ImageNumber",thisImageCarousel.currentImage + 1);
		}
	},
	Map:function(elementId,latitude,longitude,description,icon,mapCallback) {
		try {
			var element = document.getElementById(elementId);
		} catch(error) {
			return false;
		}

		if (! latitude) { return false; }
		if (! longitude) { return false; }
		
		thisMap = this;

		thisMap.AddMarker = function(latitude,longitude,description,icon,zIndex) {
			var point = new GLatLng(latitude,longitude);
			var marker = new Marker(point,description,icon,zIndex);
			map.addOverlay(marker);
		}

		function Icon(image) {
			var icon = new GIcon();
			icon.image = "/art/maps/icons/" + image; 
			icon.iconAnchor = new GPoint(16,16);
			icon.infoWindowAnchor = new GPoint(16,0);
			icon.iconSize = new GSize(22,32);
			return icon;
		}

		function Marker(point,description,image,zIndex) {
			var markerOptions = { zIndexProcess:GetZIndex };
			if (image) {
				var icon = new Icon(image);
				markerOptions = { icon:icon,zIndexProcess:GetZIndex };
			}

			var marker = new GMarker(point,markerOptions);
			marker.zIndex = zIndex;
			if (description) {
				var html = "<div>" + decodeURIComponent(description) + "</div>";
				GEvent.addListener(marker,"click",function() {
					marker.openInfoWindowHtml(decodeURIComponent(description));
				});
			}

			return marker;
		}

		function GetDistance(sourceLatitude,sourceLongitude,destinationLatitude,destinationLongitude) {
			var radiusEarth = 6371; // kilometers

			function DegreesToRadians(degrees) {
				return degrees * Math.PI / 180;
			}

			sourceLatitude = DegreesToRadians(sourceLatitude);
			sourceLongitude = DegreesToRadians(sourceLongitude);
			destinationLatitude = DegreesToRadians(destinationLatitude);
			destinationLongitude = DegreesToRadians(destinationLongitude);

			var distance = Math.acos(Math.sin(sourceLatitude) * Math.sin(destinationLatitude) + Math.cos(sourceLatitude) * Math.cos(destinationLatitude) * Math.cos((destinationLongitude - sourceLongitude))) * radiusEarth;
			return distance; // kilometers
		}

		function GetZoomForDistance(distance) {
			var distanceMaximum = 18000; // kilometers
			var zoomMinimum = 1;
			var zoomMaximum = 14;

			var zoom = zoomMaximum - ((zoomMaximum - zoomMinimum) * (distance / distanceMaximum));
			zoom = (zoom > 0 ? Math.floor(zoom) : Math.ceil (zoom));
			return zoom;
		}

		function GetZIndex(marker,unused) {
			return GOverlay.getZIndex(marker.getPoint().lat()) + marker.zIndex * 1000000;
		}

		if( !ST.Callback.Map ) ST.Callback.Map = new Array;
		ST.Callback.Map[elementId] = function() {
			// delay map load for slow browsers
			setTimeout(function() {
				var homeLatitude = 47.620716; // degrees
				var homeLongitude = -122.347533; // degrees
				var zoom = GetZoomForDistance(GetDistance(homeLatitude,homeLongitude,latitude,longitude));

				this.map = new GMap2(element);

				var center = new GLatLng(latitude,longitude);
				map.addControl(new GSmallMapControl());
				map.setCenter(center,zoom);

				var marker = new Marker(center,description,icon,100);
				map.addOverlay(marker);

				if (mapCallback) {
					mapCallback();
				}
			},300);
		}

		//Safari can't handle multiple callbacks at once, so we need to space them out.
		if( !ST.MapCallBackCounter ) ST.MapCallBackCounter = 0;
		ST.MapCallBackCounter++;
		setTimeout(function(){
			ST.AddScript({'URI':"http://maps.google.com/maps?file=api&v=2&key=ABQIAAAAiwQtnpn7b2hCLsfhsf9inxT4-dzEtyrooIDu8E6uHITdmt7QKxT95xaBl3RAWIx3hTPW_cYH2nmGlg&async=2&callback=ST.Callback.Map."+elementId});
		}, 600*ST.MapCallBackCounter);
	},
	ReplaceContent:function(elementId,content) {
		try {
			var element = document.getElementById(elementId);
		} catch(error) {
			return false;
		}
		if( !element ){
			return false;
		}

		if (document.all) {
			element.innerHTML = content;
		} else {
			while (element.hasChildNodes()) { element.removeChild(element.lastChild); }
			var range = document.createRange();
			range.setStartAfter(element);
			var fragment = range.createContextualFragment(content);
			element.appendChild(fragment);
		}
	},
	Slider:function(container){
		if( !container ) return false;

		//variable to maintain scope
		var thisSlider = this;
	
		thisSlider.loop = function(params){
			thisSlider.timeoutId = setTimeout( function(){ thisSlider.slide(params); }, thisSlider.delay);
		}

		//find our key pieces
		var containerDivs = container.getElementsByTagName('div');
		for( var currDiv = 0; currDiv < containerDivs.length; currDiv++ ){
			if( containerDivs[currDiv].className.match(/\bleft_button\b/) ){
				thisSlider.leftButton = containerDivs[currDiv];
			}
			else if( containerDivs[currDiv].className.match(/\bright_button\b/) ){
				thisSlider.rightButton = containerDivs[currDiv];
			}
			else if( containerDivs[currDiv].className.match(/\bslider\b/) ){
				thisSlider.sliderBox = containerDivs[currDiv];
			}
			else if( containerDivs[currDiv].className.match(/\bslider_container\b/) ){
				thisSlider.sliderContainer = containerDivs[currDiv];
			}
		}
	
		//the slider width is initially set to a rediculous width because CSS is 
		//dumb, and IE is dumber.  Calculate and set the correct width.
		var numTiles = 0;
		var tileWidth = 0;
		var currChild = thisSlider.sliderBox.firstChild;
		while( currChild ){
			if( currChild.className == 'tile' ) {
				numTiles++;
				//while where are here, let's get the width of the tiles
				if( !tileWidth ) {
				
					//ghetto cross browser margin detection
					if( currChild.currentStyle ){
						var marginLeft = currChild.currentStyle['marginLeft'];
					}else if( window.getComputedStyle ){
						var marginLeft = document.defaultView.getComputedStyle(currChild,null).getPropertyValue('margin-left');
					}
					if( currChild.currentStyle ){
						var marginRight = currChild.currentStyle['marginRight'];
					}else if( window.getComputedStyle ){
						var marginRight = document.defaultView.getComputedStyle(currChild,null).getPropertyValue('margin-right');
					}
					marginLeft = parseInt(marginLeft.replace(/px/, ''));
					marginRight = parseInt(marginRight.replace('px', ''));
					tileWidth = currChild.offsetWidth + marginLeft + marginRight;
				}
			}
			currChild = currChild.nextSibling;
		}
		thisSlider.sliderBox.style.width = (numTiles*tileWidth +10) + 'px';/*I hate IE++*/
	
		//calculate the max left-ward scroll (don't want to scroll all the way.  abcde[fghi] vs abcdefghi[    ])
		thisSlider.leftScrollLimit = numTiles*tileWidth +20 -thisSlider.sliderContainer.offsetWidth;
	
		//assign controls
		thisSlider.rightButton.onmouseover = function(){
			this.className = this.className.replace(/\bright_button_off\b/, 'right_button_on');
			thisSlider.slide({'direction':'right', 'speed':'fast'});
		}
		thisSlider.rightButton.onmouseout = function(){
			this.className = this.className.replace(/\bright_button_on\b/, 'right_button_off');
			thisSlider.slide({'direction':'left', 'speed':'slow'});
		}
		thisSlider.leftButton.onmouseover = function(){
			this.className = this.className.replace(/\bleft_button_off\b/, 'left_button_on');
			thisSlider.slide({'direction':'left', 'speed':'fast'});
		}
		thisSlider.leftButton.onmouseout = function(){
			this.className = this.className.replace(/\bleft_button_on\b/, 'left_button_off');
			thisSlider.slide({'direction':'left', 'speed':'slow'});
		}
		thisSlider.sliderContainer.onmouseover = function(){
			thisSlider.slide({ 'direction':'stop' });
		}
		thisSlider.sliderContainer.onmouseout = function(){
			thisSlider.timeoutId = setTimeout(function(){
				thisSlider.slide({'direction':'left', 'speed':'slow'}),
				1000
			});
		}
	
		//this is the function that does the actual moving, and is the only thing that that should recur
		thisSlider.slide = function(params){
			if( params.direction != 'left' && params.direction != 'right' && params.direction != 'stop' && params.direction != 'restart' ){
				return false;
			}
		
			//blast out any previous timer
			if( thisSlider.timeoutId ) clearTimeout(thisSlider.timeoutId);
		
			//if we are stopping (pausing) the scroll, stop now
			if( params.direction == 'stop' ) return true;
		
			//get the current position of the sliding box
			var oldPos = this.sliderBox.style.left;
			if( !oldPos ) oldPos = '0px';
			oldPos = parseInt(oldPos.replace('px', ''));

			//calculate the new position
			if( params.direction == 'left' ){
				var newPos = oldPos - 1;
				//This next part is kludgey.  This creates a slight pause before resetting the 
				//slider.  The timeout controls the next occurence; we can't just sleep.  Instead
				//we have to load the timer to restart on the next run, and then abort.
				if( newPos*-1 >= thisSlider.leftScrollLimit ) {
					thisSlider.timeoutId = setTimeout( function(){ 
						thisSlider.slide({'direction':'restart', 'speed':params.speed }); 
					}, 3000);
					return true;
				}
			}else if( params.direction == 'right'){
				var newPos = oldPos+1;
				//if we have scrolled all the way to the beginning, stop
				if( newPos >= 0 ) return true;
			}else if( params.direction == 'restart' ){
				newPos = 0;
				params.direction = 'left';
			}
		
			//determine the timeout delay
			switch( params.speed ){
				case 'fast':
					thisSlider.delay = 1;
					break;
				case 'slow':
				default:
					thisSlider.delay = 30;
					break;
			}
		
			//move, and set it to recur
			thisSlider.sliderBox.style.left = newPos + 'px';
			thisSlider.loop(params);
		}
	
		//start it off
		thisSlider.slide({'direction':'left', 'speed':'slow'});
	},
	Tabs:function(){},//deprecated
	TabSet:function(container) {
		if( !container ) return false;
		
		//variable to maintain scope
		var thisTabSet = this;
		
		thisTabSet.contentElements = new Array();
		thisTabSet.labelElements = new Array();
		
		// collect content and label elements.
		var labelCounter = 0;
		var contentCounter = 0;
		var tabElements = container.getElementsByTagName("DIV");
		for (var tabKey in tabElements) {
			switch( tabElements[tabKey].className ){
				case 'st_tabs_label_on':
				case 'st_tabs_label_off':
					tabElements[tabKey].labelCounter = labelCounter;
					tabElements[tabKey].onclick = function(){ thisTabSet.SelectTab(this.labelCounter) };
					thisTabSet.labelElements.push(tabElements[tabKey]);
					labelCounter++;
					break;
				case 'st_tabs_content':
					thisTabSet.contentElements[ contentCounter ] = tabElements[tabKey];
					contentCounter++;
					break;
			}
		}
		
		//the function assigned to the labels
		thisTabSet.SelectTab = function(tab) {
			try {
				for (var tabNumber in thisTabSet.labelElements) {
					thisTabSet.labelElements[tabNumber].className = 'st_tabs_label_off';
					thisTabSet.contentElements[tabNumber].style.display = 'none';
					if (tabNumber == tab) {
						thisTabSet.labelElements[tabNumber].className = 'st_tabs_label_on';
						thisTabSet.contentElements[tabNumber].style.display = 'block';
					}
				}
			} catch(error) {
				return false;
			}
		}

		//activate the first tab
		thisTabSet.SelectTab(0);
	},
	TriggerPageLoadFunctions:function(){
		//divs
		var allItems = document.getElementsByTagName('div');
		for (var currItem = 0; currItem < allItems.length; currItem++) {
			switch(allItems[currItem].className) {
				case 'st_slider':
					new ST.Slider(allItems[currItem]);
					break;
				case 'st_tabs':
					new ST.TabSet(allItems[currItem]);
					break;
				case 'st_image_carousel':
					new ST.ImageCarousel(allItems[currItem]);
					break;
				case 'map_container':
					new ST.Map(allItems[currItem]);
					break;
				// rex's awesome new js thing for the stupid thing to work
				case 'seattletimes_awesome_toggler_target_for_teasers':
				case 'gc_teasers_body':
					if( ST.GetCookie({ name:'suppress_gc_teasers' }) == 'true' ){
						ST.ToggleDisplay({ element:allItems[currItem] });
					}
					break;
			}
		}
		//anchors
		var allItems = document.getElementsByTagName('a');
		for (var currItem = 0; currItem < allItems.length; currItem++) {
			switch(allItems[currItem].className) {
				case 'popup':
				case 'popup_enlarge':
				case 'popup_mediacenter':
				case 'popupscroll':
				case 'slideshowpopup':
				case 'footerpopup':
				case 'external':
					ST.PopUp.Add(allItems[currItem]);
					break;
			}
		}
		//uls
		var allItems = document.getElementsByTagName('ul');
		for (var currItem = 0; currItem < allItems.length; currItem++) {
			switch(allItems[currItem].className) {
				case 'navigation_container':
					ST.InitNavigation(allItems[currItem]);
					break;
			}
		}
		//one offs
		ST.DisplayAccountCenterLinks();
	},
	SetCookie:function(params){
		if( !params.name || !params.value ) return false;
		
		var cookie = params.name + "=" + escape(params.value);
		if( params.days ){
			var date = new Date();
			date.setTime(date.getTime()+(params.days*24*60*60*1000));
			cookie += "; expires="+date.toGMTString();
		}
		if( params.path ) cookie += "; path=" + params.path;
		if( params.domain ) cookie += "; domain=" + params.domain;
		if( params.secure ) cookie += "; secure";
		document.cookie = cookie;
	},
	GetCookie:function(params){
		if( !params.name ) return false;

		var cookie = document.cookie;
		var prefix = params.name + "=";
		var begin = cookie.indexOf("; " + prefix);
		if (begin == -1) {
			begin = cookie.indexOf(prefix);
			if (begin != 0) return null;
		} else {
			begin += 2;
		}
		var end = document.cookie.indexOf(";",begin);
		if (end == -1) {
			end = cookie.length;
		}
		return unescape(cookie.substring(begin + prefix.length, end));
	},
	DisplayAccountCenterLinks:function(){
		//this could be more abstracted, but its purpose is so specialized there's not much point
		var firstName = ST.GetCookie({ 'name':'NMNAME' });
		var html = "";
		if (firstName) {	
			firstName = firstName.replace(/\+/g," ");
			firstName = firstName.substr(0,20);
			html = '<a href="https://secure.nwsource.com/reg/seattletimes/">Hi ' + firstName + '</a> <span class="hspacing">|</span> <a href="https://secure.nwsource.com/reg/seattletimes/logout.php">Log out</a><span class="hspacing">|</span>';
		} else {
			html = '<a href="https://secure.nwsource.com/reg/seattletimes/">Your account</a> <span class="hspacing">|</span> <a href="https://secure.nwsource.com/reg/seattletimes/">Log in</a><span class="hspacing">|</span>';
		}
		ST.ReplaceContent('account_center_links', html);
	},
	InitNavigation:function(container){
		if( !container ) return false;
		
		//loop through all the li's (top menu items)
		for( var i=0; i < container.childNodes.length; i++ ){
			currMenu = container.childNodes[i];
			if( currMenu.nodeName.toUpperCase() != 'LI' ) continue;

			//I am just blasticating any exiting class name with out attempt to preserve it.
			//We can change this easily later if we need to.
			//I am deliberately keeping the display style out of the CSS class
			currMenu.onmouseover = function(){
				this.className = 'selected';
				var dropDown = this.getElementsByTagName('ul')[0];
				if( dropDown ){
					dropDown.className = 'selected';
					dropDown.style.display = 'block';
				}
			}
			
			currMenu.onmouseout = function(){
				this.className = '';
				var dropDown = this.getElementsByTagName('ul')[0];
				if( dropDown ){
					dropDown.className = '';
					dropDown.style.display = 'none';
				}
			}
		}
	},
	ToggleDisplay:function(params){
		//allow them to pass an ID, set of IDs, element or set of elements
		if( params.id ) params.ids = new Array(params.id);
		if( params.ids ){
			params.elements = new Array();
			for( var key in params.ids ){
				params.elements.push(document.getElementById(params.ids[key]));
			}
		}
		if( params.element ) params.elements = new Array(params.element);
		if( !params.elements ) return false;
		
		//allow for any kind of toggling, but default to block
		if( !params.displayType ) params.displayType = 'block';
		
		for( var i = 0; i < params.elements.length; i++  ){
			if( !params.elements[i] ) continue;
			if( params.elements[i].style.display != 'none' ){
				params.elements[i].style.display = 'none';
			}else{
				params.elements[i].style.display = params.displayType;
			}
		}
	},
	ToggleGlobalCommentingTeasers:function(){
		//update the cookie
		var cookieParams = { 
			name:'suppress_gc_teasers',
			path:'/',
			days:365,
			domain:'.nwsource.com'
		};
		if( ST.GetCookie({ name:'suppress_gc_teasers' }) == 'true' ){
			cookieParams.value = 'false';
		}else{
			cookieParams.value = 'true';
		}
		ST.SetCookie(cookieParams);
		//toggle the teasers
		var allItems = document.getElementsByTagName('div');
		for (var currItem = 0; currItem < allItems.length; currItem++) {
			// i (rex) had to add the or in here so we can start seperating design and functionality
			if( allItems[currItem].className == 'gc_teasers_body' || allItems[currItem].className == 'seattletimes_awesome_toggler_target_for_teasers'){
				ST.ToggleDisplay({ element:allItems[currItem] });
			}
		}
	},
	DaysInMonth:function(params){
		//bump over to the next month, so we can go back one day (makes it leap year safe)
		var params = params;
		if( params.month == 11 ){
			params.month = 0;
			params.year++;
		}else{
			params.month++;
		}
		var date = new Date(params.year, params.month, 0);
		return date.getDate();
	},
	Calendar:function(params){
		/*
		params:{
			containerId:'abc',				//required.  element to add calendar to.
			callback:funcName,				//required.  function to call when a date is clicked
			className:'abc',				//optional.  class name added to main div
			startDate:'YYYY/MM/DD',			//optional.  defaults to today.  If specified, must be one of the formats supported by Date(): "mm-dd-yyyy", "yyyy/mm/dd", "mm/dd/yyyy", "mmm dd, yyyy", "mm dd, yyyy"
			weekdayNames:['Mon',...],		//optional.  defaults to single letter abbreviations.
			monthNames:['Jan',...],			//optional.  defaults to init capped full month names.
			extra:[{						//optional.  array of extra data to pass to the callback function for the specified day.  Must be supported by Date().
				date:'YYYY/MM/DD', value:'abc' 
			},{ 
				date:'YYYY/MM/DD', value:'abc' 
			}]
		}
		*/

		if( !params.containerId ) return false;
		var container = document.getElementById( params.containerId );
		if( !container ) return false;
		if( params.startDate ) var startDate = new Date(params.startDate);
		if( !startDate ) var startDate = new Date();

		var monthNames;
		if( params.monthNames ) monthNames = params.monthNames;
		else monthNames = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
		var weekdayNames;
		if( params.weekdayNames ) weekdayNames = params.weekdayNames;
		else weekdayNames = new Array('S', 'M', 'T', 'W', 'T', 'F', 'S');
		//for comparison, we need today at midnight
		var tempDate = new Date();
		var today = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate());
		var todayTimestamp = today.toDateString();
		
		//local variable to maintain scope
		var thisCalendar = this;
		thisCalendar.callback = params.callback;
		thisCalendar.className = params.className;
		if( !params.extra ) params.extra = {};
		thisCalendar.extra = params.extra;
		
		//mash extra data into a usable format
		thisCalendar.extra = {};
		for( var key in params.extra ){
			thisCalendar.extra[ new Date(params.extra[key].date).toDateString() ] = params.extra[key].value;
		}

		//main workhorse method
		thisCalendar.selectMonth = function(params){
			if( !params.month.strlen == 0 || !params.year ) return false;
			
			var lastDayOfMonth = ST.DaysInMonth({
				year:params.year,
				month:params.month
			});
			var firstDayOfMonth = new Date(params.year, params.month, 1);
			var monthStartOffset = firstDayOfMonth.getDay();
			
			//month nav
			var monthText = document.createTextNode(monthNames[params.month] + ' ' + params.year);
			//previous
			var previous = {};
			if( params.month == 0 ){
				previous.month = 11;
				previous.year = params.year-1;
			}else{
				previous.month = params.month-1;
				previous.year = params.year;
			}
			var previousLink = document.createElement('a');
			previousLink.href = 'javascript:void(0);';
			previousLink.onclick = function(){ thisCalendar.selectMonth(previous); };
			previousLink.className = 'previous';
			//next
			var next = {};
			if( params.month == 11 ){
				next.month = 0;
				next.year = params.year+1;
			}else{
				next.month = params.month+1;
				next.year = params.year;
			}
			var nextLink = document.createElement('a');
			nextLink.href = 'javascript:void(0);';
			nextLink.onclick = function(){ thisCalendar.selectMonth(next); };
			nextLink.className = 'next';
			//put them together
			var navDiv = document.createElement('div');
			navDiv.className = 'nav';
			navDiv.appendChild(previousLink);
			navDiv.appendChild(nextLink);
			navDiv.appendChild(monthText);

			//build the calendar grid
			var td;
			var tdText;
			var tr;
			var table;
			var tbody;
			
			table = document.createElement('table');
			tbody = document.createElement('tbody');
			table.appendChild(tbody);

			//weekday labels
			tr = document.createElement('tr');
			tbody.appendChild(tr);
			for( var key in weekdayNames ){
				td = document.createElement('td');
				tr.appendChild(td);
				tdText = document.createTextNode(weekdayNames[key]);
				td.appendChild(tdText);
				td.className = 'weekday_name';
			}
			
			//begin the grid generation
			var slot = 0;	//yur mom has a slot
			for(;;){
				//beginning of row shizzle
				if( slot == 0 || !(slot % 7) ){
					tr = document.createElement('tr');
					tbody.appendChild(tr);
				}
				
				//add the slot
				var td = document.createElement('td');
				tr.appendChild(td);
			
				//if it's an actual date, add text and link
				var dayNumber = slot+1 - monthStartOffset;//+1 because slot is an index and monthStartOffset is a count.
				if( dayNumber >= 1 && dayNumber <= lastDayOfMonth )
				{
					var currDay = new Date(params.year.toString(), params.month, dayNumber);
					var currTimestamp = currDay.toDateString();
					if( currDay < today ) td.className = 'past_date';
					if( currTimestamp == todayTimestamp ) td.className = 'current_date';
					if( currDay > today ) td.className = 'future_date';
					if( thisCalendar.extra[ currTimestamp ] ) td.className += ' extra';
					
					var a = document.createElement('a');
					td.appendChild(a);
					a.href = 'javascript:void(0);';
					tdText = document.createTextNode(dayNumber);
					a.appendChild(tdText);
					a.callbackParams = {
						date:currDay,
						extra:thisCalendar.extra[currTimestamp]
					};
					a.onclick = function(){ 
						thisCalendar.callback(this.callbackParams);	
					}
				}else{
					//add nbsp so cell will render
					tdText = document.createTextNode(String.fromCharCode(160));
					td.appendChild(tdText);
				}
				
				//end of row shizzle
				if( !((slot+1) % 7) ){
					//break out if we are done. +1 because slot is an index and monthStartOffset is a count.
					if( (slot -monthStartOffset +1) >= lastDayOfMonth ) break;
				}
				slot++;
			}
			
			//assemble container (putting table inside a div to make css targetting easier	
			var mainDiv = document.createElement('div');
			mainDiv.className = 'calendar_widget';
			if( thisCalendar.className ) mainDiv.className += ' ' + thisCalendar.className;
			mainDiv.appendChild(navDiv);
			mainDiv.appendChild(table);

			//clean out current contents of container, then add it to the page
			while( container.hasChildNodes() ){
				container.removeChild(container.firstChild);
			}
			container.appendChild(mainDiv);
		}
		
		//init
		thisCalendar.selectMonth({
			year:startDate.getFullYear(),
			month:startDate.getMonth()
		});
	},
	ToggleInputDefaultText:function(params){
		if( !params.element || !params.defaultText || !params.event ) return false;
		
		switch( params.event.type ){
			case 'focus':
				if( params.element.value == params.defaultText ) params.element.value = '';
				break;
			case 'blur':
				if( params.element.value.replace(/\s+/g,'') == '' ) params.element.value = params.defaultText;
				break;
		}
	},
	HierarchicalSelects:function(params){
		/*
		This should probably be rewritten to handle any number of heirarchies.  No time right now.
		Example usage:
		<select id='foo' onchange=""></select>
		<select id='bar'></select>
		<script>
		new ST.HierarchicalSelects({
			primaryId:'str',
			secondaryId:'str',
			primaryAnyOption:{
				'key':'str',
				'value':'str'
			},
			secondaryAnyOption:{
				'key':'str',
				'value':'str'
			},
			primaryDefault:'str',
			data:{
				"City of Seattle":{
					"value":"City of Seattle",
					"children":{
						"BallardCrown Hill":"Ballard\/Crown Hill",
						"Beacon Hill":"Beacon Hill"
					}
				},
				"Eastside":{
					"value":"Eastside",
					"children":{
						"Bellevue":"Bellevue",
						"Carnation":"Carnation"
					}
				}
			}
		});
		*/
	
		try{
			var thisHS = this;
			//init
			thisHS.primarySelect = document.getElementById(params.primaryId);
			thisHS.secondarySelect = document.getElementById(params.secondaryId);
			thisHS.primaryAnyOption = params.primaryAnyOption;
			thisHS.secondaryAnyOption = params.secondaryAnyOption;
			thisHS.primaryDefault = params.primaryDefault;
			if( !params.data ) throw false;
			thisHS.data = params.data;


			//methods
			thisHS.Select = function(){
				//remove old options
				while(thisHS.secondarySelect.options.length > 0){
					thisHS.secondarySelect.remove(0);
				}
			
				//populate 'any' for secondary
				if( thisHS.secondaryAnyOption ){
					thisHS.AddOption({ 
						key:thisHS.secondaryAnyOption.key, 
						value:thisHS.secondaryAnyOption.value, 
						select:thisHS.secondarySelect 
					});
				}
			
				//populate secondary options
				var primaryKey = thisHS.primarySelect.options[thisHS.primarySelect.selectedIndex].value;
				if( primaryKey ){
					for( var key in thisHS.data[primaryKey]['children'] ){
						thisHS.AddOption({ 
							key:key, 
							value:thisHS.data[primaryKey]['children'][key], 
							select:thisHS.secondarySelect 
						});
					}
				}
			}
			thisHS.AddOption = function(params){
				if (! params.selected) { params.selected = false; }
				var option = document.createElement('option');
				option.text = params.value;
				option.value = params.key;
				try{
					params.select.add(option, null);
				}catch(err){
					params.select.add(option);
				}
			}
		
			//populate primary
			if( thisHS.primaryAnyOption ){
				thisHS.AddOption({ 
					key:thisHS.primaryAnyOption.key, 
					value:thisHS.primaryAnyOption.value, 
					select:thisHS.primarySelect 
				});
			}
			for( var key in thisHS.data ){				
				thisHS.AddOption({ 
					key:key, 
					value:thisHS.data[key].value, 
					select:thisHS.primarySelect
				});
			}
		
			//populate 'any' for secondary
			if( thisHS.secondaryAnyOption ){
				thisHS.AddOption({ 
					key:thisHS.secondaryAnyOption.key, 
					value:thisHS.secondaryAnyOption.value, 
					select:thisHS.secondarySelect 
				});
			}
		
			//add update behavior
			if( typeof(thisHS.primarySelect.onchange) != 'function'){
				thisHS.primarySelect.onchange = function(){
					thisHS.Select();
				}
			}else{
				var oldOnchange = thisHS.primarySelect.onchange;
				thisHS.primarySelect.onchange = function(){
					oldOnchange();
					thisHS.Select();
				}
			}
			
			//select default
			if (thisHS.primaryDefault) {
				for (var optionNumber = 0; optionNumber < thisHS.primarySelect.options.length; optionNumber++) {
					if (thisHS.primarySelect.options[optionNumber].value == thisHS.primaryDefault) {
						thisHS.primarySelect.options.selectedIndex = optionNumber;
						thisHS.Select();
					}
				}
			}

		}catch(err){ return false; }
	},
	AsynchRequest:function(params){
		/*
		params:{
			uri:'str',
			callback:function(){},	//optional
			method:'GET'|'POST',	//optional
			requestParams:{},		//optional
			JSON:true|false			//optional
		}
		*/
	
		if( !params.uri ) return false;
		if( !params.callback ) params.callback = function(){};
		if( !params.method ) params.method = 'GET';
		params.method = params.method.toUpperCase();
	
		var xmlhttp = false;
		try{ xmlhttp = new ActiveXObject('Msxml2.XMLHTTP'); }
		catch(error){
			try{ xmlhttp = new ActiveXObject('Microsoft.XMLHTTP'); }
			catch(error){
				try{ xmlhttp = new XMLHttpRequest(); }
				catch(error){ xmlhttp = false; }
			}
		}
		if( !xmlhttp ) return false;
	
		document.body.style.cursor = 'wait';
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4) {
				document.body.style.cursor = 'default';
				if( params.JSON ){
					params.callback( eval('(' + xmlhttp.responseText + ')') );
				}else{
					params.callback(xmlhttp);
				}
			}
		};

		if (params.method == 'GET') {
			var paramStr = '';
			for( var key in params.requestParams ){
				paramStr += encodeURIComponent(key) + '=' + encodeURIComponent(params.requestParams[key]) + '&';
			}
			xmlhttp.open(params.method, params.uri + '?' + paramStr, true);
			xmlhttp.send('');
		} else {
			xmlhttp.open(params.method, url,true);
			xmlhttp.setRequestHeader('Method','POST ' + params.uri + ' HTTP/1.1');
			xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			xmlhttp.send(params.requestParams);
		}

		return true;
	}
};

//set up our page load functions
ST.AddLoadEvent(ST.TriggerPageLoadFunctions);

//third party page variables

//addthis
var addthis_pub = "seattletimes";
var addthis_header_color = "#ffffff";
var addthis_header_background = "#506a8f";
var addthis_options = "facebook, digg, google, twitter, linkedin, delicious, myspace, friendfeed, newsvine, live, more";

//DEPRECATED
function PopoffWindow(windowName,windowWidth,windowHeight,URL,shouldResize,shouldScroll) {
	var availableWidth = screen.availWidth;
   	var availableHeight = screen.availHeight;

   	var windowLeft = (availableWidth - windowWidth) / 2;
   	var windowTop = ((availableHeight - windowHeight) / 2) - 16;
   		
	newWindow = window.open(URL,windowName,"width=" + windowWidth + ",height=" + windowHeight + ",left=" + windowLeft + ",top=" + windowTop + ",location=no,resizable=" + shouldResize + ",scrollbars=" + shouldScroll + ",toolbar=no");
	newWindow.focus();
}
