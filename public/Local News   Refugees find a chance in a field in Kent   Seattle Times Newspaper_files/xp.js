function xp_tab (new_active)
{
  // get tab elements
  prevtab = document.getElementById(xp_active+'_tab');
  prevbox = document.getElementById(xp_active);
  newtab = document.getElementById(new_active+'_tab');
  newbox = document.getElementById(new_active);
  
  // swap tab classes
  prevtab.className = '';
  prevbox.className = '';
  newtab.className = 'xp_active';
  newbox.className = 'xp_active';
  
  // set tab active
  xp_active = new_active;
}

function xp_image_scale (elementobj, maxdim, aspect)
{
  if (elementobj != null) {
    var imgwidth = elementobj.width;
    var imgheight = elementobj.height;
    
    var imgval = new Array();
    imgval['width'] = imgwidth;
    imgval['height'] = imgheight;
    
    // fit biggest dimension into maxdim
    if (aspect == 'both' || aspect == '') {
      if (imgwidth == imgheight || imgwidth > imgheight) {
        if (imgwidth > maxdim) {
          percentage = maxdim / imgwidth;
          imgval['width'] = Math.round (imgwidth * percentage);
          imgval['height'] = Math.round (imgheight * percentage);
        }
      } else if (imgwidth < imgheight) {
        if (imgheight > maxdim) {
          percentage = maxdim / imgheight;
          imgval['width'] = Math.round (imgwidth * percentage);
          imgval['height'] = Math.round (imgheight * percentage);
        }
      }
    // fit specified aspect into maxdim
    } else {
      if (imgval[aspect] > maxdim) {
        percentage = maxdim / imgval[aspect];
        imgval['width'] = Math.round (imgwidth * percentage);
        imgval['height'] = Math.round (imgheight * percentage);
      }	
    }
    if (imgval['width'] > 0 || imgval['height'] > 0) {
      elementobj.width = imgval['width'];
      elementobj.height = imgval['height'];
    } else {
      elementobj.width = maxdim;
      elementobj.height = maxdim;
    }
	}
}

function xp_init_scale() {	
  xp_image_scale (document.getElementById('clsrndimage'), 75, 'both');
}

function xp_load_event(func) {	
	var oldonload = window.onload;

	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() { oldonload(); func(); }
	}
}

