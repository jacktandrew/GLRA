// omniHelper.js (10/1/2007)
// $Id: omniHelper.js 1182 2008-06-16 15:15:25Z ehatfield $

var omniHelper_version = '1.2 - Apr 15 2008';
var t_omni_sagepath;
var t_omni_matchtype;
var regX = new RegExp("[\/]","g");
var t_omni_finished = false;
		
runPrimary();

function runPrimary() {
	checkMeta();
	if(checkRequired()){
		t_omni_matchtype = "metadata";
		runSecondary();
	} else {
		callWS();
	}
}

function runSecondary() {
	findqueryparams();
	findevents();
	findproducts();
	assignSvars();
	findsprops();
	findevars();
	if (!t_omni_finished) {
		if (typeof window.omni_pageCode == 'function') { omni_pageCode(); }

//		s.tX();
		t_omni_finished = true;
	}
}

function checkRequired() {
	if((window.t_omni_path&&window.t_omni_site&&window.t_omni_pagename)||window.t_omni_404error) {
		return true;
	}
	else {
		return false;
	}
}

function checkMeta() {
  var metas = document.getElementsByTagName('META');
  var i;
  for (i = 0; i < metas.length; i++) {
	var strX = metas[i].getAttribute('NAME');
	if(strX) {
		if(strX.indexOf("t_omni_") >= 0) {
			window[strX.toLowerCase()]=metas[i].getAttribute('CONTENT');
		} else if (strX == 'Byline') {
			t_omni_author=metas[i].getAttribute('CONTENT');
		} else if (strX == 'Pubdate') {
			t_omni_pubdate=metas[i].getAttribute('CONTENT');
		} else if (strX == 'Webtowns') {
			t_omni_neighborhood=metas[i].getAttribute('CONTENT');
		}
	}
  }
}

function callWS() {
	//start timer
	t_omni_sT=new Date();
	t_omni_sMs=t_omni_sT.getTime();

	timeoutId = window.setTimeout(
		function() {
			t_omni_matchtype = "web service timeout";
			fallThrough();
		},5000);
	try {
		var WSurl = "https://secure.nwsource.com/shared/ws/omni_lookup/omni_lookup.php?url=";
		var request = WSurl+escape(window.location.hostname + window.location.pathname);
		var head = document.getElementsByTagName("head").item(0);
		var script = document.createElement("script");
		script.setAttribute("type", "text/javascript");
		script.setAttribute("src", request);
		head.appendChild(script);
	} catch(err) {
		t_omni_matchtype = "web service error";
		fallThrough();
	}
}

function responseWS (t_omni_WSresponse) {
	window.clearTimeout(timeoutId);
	ws_returned = true;
	//end timer
	var eT=new Date();
	s.prop50=roundNumber((eT.getTime() - t_omni_sMs) / 1000, 1);
	if (t_omni_WSresponse != null) {
		t_omni_WSresponseArr = t_omni_WSresponse.split("~");
		if (t_omni_WSresponseArr[0]&&t_omni_WSresponseArr[1]&&t_omni_WSresponseArr[2]&&t_omni_WSresponseArr[3]) {
			t_omni_path = t_omni_WSresponseArr[0];
			t_omni_site = t_omni_WSresponseArr[1];
			t_omni_pagename = t_omni_WSresponseArr[2];
			t_omni_sagepath = t_omni_WSresponseArr[3];
			t_omni_contest = t_omni_WSresponseArr[4];
			t_omni_matchtype = "rules";
			runSecondary();
		} else {
			t_omni_matchtype = "web service : not found";
			fallThrough();
		}
	} else {
		fallThrough();
	}
}

function fallThrough() {
	var temp_path = window.location.pathname.toLowerCase().replace(regX,"|");
	if (temp_path[0] == '|') temp_path = temp_path.substring(1); // dump leading '|'
	if (!window.t_omni_site) t_omni_site = t_omni_s;
	t_omni_path = t_omni_site+"|"+temp_path;
	t_omni_pagename = t_omni_site+"|"+temp_path;
	if (!window.t_omni_matchtype) {
		t_omni_matchtype = "not found";
	}
	s.prop44 = window.location;
	runSecondary();
}

function findsprops() {
	if(window.t_omni_sprops) {
		t_omni_spropsArr = t_omni_sprops.split(",");
		for(i = 0; i < t_omni_spropsArr.length; i++){
			var splitArr = t_omni_spropsArr[i].split("|");
			var spropname = splitArr[0].toLowerCase().replace(/sprop/,"prop");
			s[spropname]=splitArr[1].toLowerCase();
		}
	}
}

function findevars() {
	if(window.t_omni_evars) {
		t_omni_evarsArr = t_omni_evars.split(",");
		for(i = 0; i < t_omni_evarsArr.length; i++){
			var splitArr = t_omni_evarsArr[i].split("|");
			s[splitArr[0]]=splitArr[1].toLowerCase();
		}
	}
}

function findqueryparams() {
	if(window.t_omni_queryparams) {
		var temp_qparamsArr = t_omni_queryparams.split(",");
		for(i = 0; i < temp_qparamsArr.length; i++){
		 try {
			var temp_qArr = temp_qparamsArr[i].split("|");
			var qsparam = temp_qArr[0];
			var prefix	= temp_qArr[1];
			var qsvar	= temp_qArr[2]; 
			if(qsvar) {
				if(queryString(qsparam)!='false') {
					s[qsvar] = prefix+queryString(qsparam);
				}
			}
		 } catch(err) {}
		}
	}
}

function findevents() {
	if(window.t_omni_events) {
		t_omni_eventsArr = t_omni_events.split(",");
		var tX;
		for(i = 0; i < t_omni_eventsArr.length; i++){
			switch(t_omni_eventsArr[i].toLowerCase()) {
				case "search":tX=tX?tX+",event1":"event1"; break;
				case "sitereg":tX=tX?tX+",event3":"event3"; break;
				case "adimp":tX=tX?tX+",event4":"event4"; break;
				case "adclick":tX=tX?tX+",event5":"event5"; break;
				case "emailfriend":tX=tX?tX+",event6":"event6"; break;
				case "printthis":tX=tX?tX+",event7":"event7"; break;
				case "rsssub":tX=tX?tX+",event8":"event8"; break;
				case "adpostcomplete":tX=tX?tX+",event9":"event9"; break;
				case "adpoststart":tX=tX?tX+",event10":"event10"; break;
				case "zeroresults":tX=tX?tX+",event11":"event11"; break;
				case "emailalert":tX=tX?tX+",event12":"event12"; break;
				case "savesearch":tX=tX?tX+",event13":"event13"; break;
			}
		}
	return(tX);
	}
}

function findproducts() {
	if(window.OAS_listpos) {
		var OAS_listposArr = OAS_listpos.split(",");
		t_omni_products = "";
		for(i = 0; i < OAS_listposArr.length; i++){
			t_omni_products = t_omni_products+";"+OAS_listposArr[i]+":";
		}
		t_omni_products=t_omni_products.substring(0,t_omni_products.length-1);
	}
}

	
function assignSvars() {
	var t_omni_temppath = window.location.hostname + window.location.pathname;
	t_omni_temppath = t_omni_temppath.replace(regX,"|");
	t_omni_temppath = t_omni_temppath.toLowerCase();
	var t_omni_temppathArr = t_omni_temppath.split("|");
	
	s.hier4=t_omni_temppath;
	if(window.t_omni_pagename) {
		s.pageName=t_omni_pagename.toLowerCase().replace(/[^a-zA-Z 0-9 \- \|]+/g,'');
		t_omni_pagenameArr = t_omni_pagename.toLowerCase().split("|");
	} else {
		s.pageName=t_omni_temppath;
	}
	if(window.t_omni_site&&window.t_omni_pagenameArr) {
		s.channel=t_omni_pagenameArr[0]+"|"+t_omni_pagenameArr[1];
	} else {
		s.channel=t_omni_temppathArr[0]+"|"+t_omni_temppathArr[1];
	}
	if(window.t_omni_server) {
		s.server=t_omni_server.toLowerCase();
	} else {
		s.server=window.location.hostname.toLowerCase();
	}
	if(window.t_omni_events) {
		s.events=findevents();
	}
	if(window.t_omni_products) {
		s.products=t_omni_products.toLowerCase();
	} else {
		s.products="no oas";
	}
	if(window.t_omni_404error) {
		s.pageType="errorPage";
		s.pageName="";
	}
	if(window.t_omni_sprop1) {	// s.prop1 : Internal Search Terms
		s.prop1=t_omni_sprop1.toLowerCase();	// Used by ST and PI according to Harish
	} else if (! s.prop1) {
		var appendStr = "";
		var myUrl = s.pageURL ? s.pageURL.href.toLowerCase() : document.URL.toLowerCase();
		if (myUrl.indexOf('search.nwsource.com') >= 0) {
			s.prop1 = s.getQueryParam('query');
			var fromSite = s.getQueryParam('from') || 'unknown';
			if (s.prop1) appendStr = ":netsearch:" + fromSite;
		} else if (myUrl.indexOf('.nwsource.com/classifieds/scr/search/') >= 0) {   // NWSource Classifieds
			s.prop1 = s.getQueryParam('k');
			if (s.prop1) appendStr = ":classifieds";
		} else if (myUrl.indexOf('.nwsource.com/search/scr/search.cfm') >= 0) {     // NWSource Search
			s.prop1 = s.getQueryParam('as_q');
		} else if (myUrl.indexOf('.nwsource.com/js.php') >= 0) {                    // NWSource Jobs
			s.prop1 = s.getQueryParam('q');
		} else if (myUrl.indexOf('.nwsource.com/cgi-bin/mt/mt-search.cgi') >= 0) {  // NW Jobs or NW Homes
			s.prop1 = s.getQueryParam('search');
		} else if (myUrl.indexOf('.nwsource.com/careers/jobsearch/results') >= 0) { // NWSource Jobs
			s.prop1 = s.getQueryParam('kAndEntire');
			if (! s.prop1) {
				var keyw = location.href.indexOf('kAndEntire=');
				if (keyw > 0) {
					var ekeyw = location.href.indexOf(';', keyw);
					keyw += 11;
					s.prop1 = location.href.substr(keyw, ekeyw - keyw);
				}
			}
			if (s.prop1) appendStr = ":classifieds";
		}
		// If appending a code, don't let it get trimmed by the default s.prop length (100)
		if (s.prop1) {
			if (appendStr) {
				if (s.prop1.length >= 100 - appendStr.length)
					s.prop1 = s.prop1.substr(0, 100 - appendStr.length);
				s.prop1 += appendStr;
			}
		}
	}
	if(window.t_omni_sprop2) {
		s.prop2=t_omni_sprop2.toLowerCase();
	}
	if(window.t_omni_contenttitle) {
		s.prop3=t_omni_contenttitle.toLowerCase().substr(0,70);
	} else {
		if(document.title){
			s.prop3=document.title.toLowerCase().substr(0,70);
		} else {
			s.prop3="no title";
		}
	}
	if(window.t_omni_articleid) {
		s.prop4=t_omni_articleid.toLowerCase();
	}
	if(window.t_omni_pagetype) {
		s.prop5=t_omni_pagetype.toLowerCase();
	}
	if(window.t_omni_site) {
		s.prop6=t_omni_site.toLowerCase();
	}
	if(window.t_omni_pagenameArr) {
		s.prop7=t_omni_pagenameArr[1];
		s.prop8=t_omni_pagenameArr[2];
		s.prop9=t_omni_pagenameArr[3];
		s.prop10=t_omni_pagenameArr[4];
	}
	if(window.OAS_sitepage) {
		s.prop14=OAS_sitepage.toLowerCase();
	}
	if(window.OAS_listpos) {
		s.prop15=smartTrim(OAS_listpos.toLowerCase(),96);
	}
	if(window.OAS_query) {
		s.prop16=smartTrim(OAS_query.toLowerCase(),96);
		s.prop16 = s.prop16.replace(/^\?/, "");
		s.prop16 = s.prop16.replace(/\&/g, "|");
	}
	if(window.t_omni_author) {
		s.prop17=t_omni_author.toLowerCase();
	}
	if(window.t_omni_pubdate) {
		s.prop18=t_omni_pubdate.toLowerCase();
	}
	if(window.t_omni_neighborhood) {
		s.prop19=t_omni_neighborhood.toLowerCase();
	}
	if(window.t_omni_version) {
		s.eVar24=t_omni_version.toLowerCase();
	}
	if(window.t_omni_path) {
		s.hier1=t_omni_path.toLowerCase();
	} else {
		s.hier1=t_omni_temppath;
	}
	if(window.t_omni_sagepath) {
		s.hier2=t_omni_sagepath.toLowerCase();
	} else {
		s.hier2="";
	}
	if(window.t_omni_matchtype) {
		s.prop43=t_omni_matchtype.toLowerCase();
	}
	if(window.t_omni_contest) {
		s.prop5="contests";
	}
	if (! s.prop5 || s.prop5 == '') s.prop5 = "unknown";

	var sprop41 = String(window.location.hostname + window.location.pathname).substring(0,100).toLowerCase();
	sprop41  = sprop41.replace(/^seattletimes\.nwsource\.com/, "ST");
	sprop41  = sprop41.replace(/^seattlepi\.nwsource\.com/,    "PI");
	sprop41  = sprop41.replace(/^www\.nwsource\.com/,          "NWS");
	sprop41  = sprop41.replace(/^nwsource\.com/,               "NWS");
	sprop41  = sprop41.replace(/;.*$/, "");  // Specifically seen in comics.com
	s.prop41 = sprop41;

	s.prop42 = String(window.location).replace(/^.*:\/\//, "").substring(0,100).toLowerCase();

	t_omni_hier3=window.location.hostname + window.location.pathname;
	t_omni_hier3=t_omni_hier3.replace(regX,"|");
	s.hier3=t_omni_hier3.toLowerCase();
}

function PageQuery(q) {
	if(q.length > 1) this.q = q.substring(1, q.length);
	else this.q = null;
	this.keyValuePairs = new Array();
	if(q) {
		for(var i=0; i < this.q.split("&").length; i++) {
			this.keyValuePairs[i] = this.q.split("&")[i];
		}
	}
	this.getKeyValuePairs = function() { return this.keyValuePairs; }
	this.getValue = function(s) {
		for(var j=0; j < this.keyValuePairs.length; j++) {
			if(this.keyValuePairs[j].split("=")[0] == s)
				return this.keyValuePairs[j].split("=")[1];
		}
		return false;
	}
	this.getParameters = function() {
		var a = new Array(this.getLength());
		for(var j=0; j < this.keyValuePairs.length; j++) {
			a[j] = this.keyValuePairs[j].split("=")[0];
		}
		return a;
	}
	this.getLength = function() { return this.keyValuePairs.length; }	
}

function queryString(key){
	var page = new PageQuery(window.location.search); 
	return unescape(page.getValue(key)); 
}

function smartTrim(strX, lenX, charX) {
	if (charX==null) {charX=","}
	if (strX.length > lenX) {
		lastPos = strX.lastIndexOf(charX,lenX);
		if (lastPos>0) {
			retStr = strX.substr(0,lastPos)+",err";
			return retStr;
		} else {
			return strX.substr(0,lenX);
		}
	} else {
		return strX;
	}
}

function roundNumber(nX, rlength) {
	return Math.round(nX*Math.pow(10,rlength))/Math.pow(10,rlength);
}

function sendGenericEvent(etype) {
	try {
		var holdOld = s.events;
		s.events = 'event14';
		s.eVar27 = etype || 'Unknown';
		s.tX();
		s.events = holdOld;
		s.eVar27 = '';
	} catch(err) {}
}

