var ie = navigator.appName.indexOf('Microsoft') != -1;
var ie6 = /msie|MSIE 6/.test(navigator.userAgent);
var ieie = ie6 || /msie|MSIE 7/.test(navigator.userAgent);

var t_banner;
var curent_banner_id = -1;
var t_item;
function hi(banner_id, id) {
	//	clearTimeout(t_item);
	var all_obj = document.getElementById('banner_active_' + banner_id).getElementsByTagName('div');
	for (i=0; i<all_obj.length; i++) {
		if (all_obj[i].className == 'banner-image')
			all_obj[i].style.display = 'none';
	}
	document.getElementById('banner_image_' + id).style.display = 'block';
}

function show(banner_id) {
	clearTimeout(t_banner);
	if (banner_id != curent_banner_id) {
		var all_obj = document.getElementById('banner_' + banner_id).parentNode.getElementsByTagName('div');
		for (i=0; i<all_obj.length; i++) {
			if (all_obj[i].className == 'banner banner-active')
				all_obj[i].style.display = 'none';
		}
	}
	//	clearTimeout(t_item);
	document.getElementById('banner_' + banner_id).getElementsByTagName('div')[0].style.display = 'block';
	curent_banner_id = banner_id;
}

function hide(banner_id, default_id) {
	t_banner = setTimeout("document.getElementById('banner_" + banner_id + "').getElementsByTagName('div')[0].style.display = 'none'; hi(" + banner_id + "," + default_id + ")", 300);
}

function u_related(obj, out) {
	related_objs = obj.parentNode.getElementsByTagName('div');
	related_objs[0].style.backgroundColor = related_objs[1].style.backgroundColor = out?'':'#f3f2f2'
}

var rotation_table = new Array();
var rotation_timeout = null;
var rotation_disabled = false;
var color_scheme_id_global = "";
var current_frame_number = 0;
function showFrame(frame_number, call_on_click, color_scheme_id) {
	if (!rotation_table[frame_number])
		return;
	if (call_on_click) {
		clearTimeout(rotation_timeout);
		rotation_disabled = true
	}
	
	/* ie6 */
	color_scheme_id_global = color_scheme_id;
	color_scheme_image_id = color_scheme_id?("_" + color_scheme_id):"";

	frame_id = rotation_table[frame_number][0];
	frame_timeout = rotation_table[frame_number][1];
	if(typeof(pageTracker)!="undefined")
		pageTracker._trackEvent('banners', 'show-'+rotation_table[frame_number][3]);
	if(typeof(pt)!="undefined")
		pt._trackEvent('banners', 'show-'+rotation_table[frame_number][3]);

	if (ie) {
		var clip_object = document.getElementById('promo_clip_' + frame_id);
		if (clip_object) {
			clip_object.Rewind();
			clip_object.Play()
		}
	}

	$('#promo_left>div.main-content-promo-left-frame:visible').fadeOut("slow");
	$('#promo_frame_' + frame_id).fadeIn("slow");

	nav_objs = document.getElementById('promo_left_nav').getElementsByTagName('a');
	for (i=0; i<nav_objs.length; i++) {
		if (nav_objs[i].id.indexOf('promo_nav_') != -1) {
			$(nav_objs[i]).removeClass('frame-nav-link-active');
			if (ie6)
				fixPng(nav_objs[i], "images/banner_main_pin.png")
		}
	}
	$('#promo_nav_' + frame_id).addClass('frame-nav-link-active');

	if (!rotation_disabled)
		if (frame_number != (rotation_table.length - 1))
			rotation_timeout = setTimeout("showFrame(" + (frame_number + 1) + ", false, '" + color_scheme_id_global + "')", frame_timeout)
		else
			rotation_timeout = setTimeout("showFrame(0, false, '" + color_scheme_id_global + "')", frame_timeout)

	current_frame_number = frame_number;
}

function ya_share_init(share_link, share_title, share_image) {
	var share_cont = $("#ya_share1").parent();
	$("#ya_share1").remove();
	share_cont.append('<span id="ya_share1" />');
	new Ya.share({
		element: 'ya_share1',
		elementStyle: {
			'quickServices': ['yaru','vkontakte','facebook','twitter','odnoklassniki','moimir']
		},
		link: share_link,
		title: share_title,
		image: share_image
	});
}

$(function() {
	var tpl = null;
	$(".main-content-promo-left-prev").click(function() {
		showFrame(current_frame_number?current_frame_number-1:rotation_table.length - 1, true, color_scheme_id_global)
	});
	$(".main-content-promo-left-next").click(function() {
		showFrame((current_frame_number != (rotation_table.length - 1))?current_frame_number+1:0, true, color_scheme_id_global)
	});
	$(".main-content-promo-left-prev, .main-content-promo-left-next").css({
		visibility: "visible"
	}).hide();
	$(".main-content-promo-left-frame, .main-content-promo-left-prev, .main-content-promo-left-next")
	.mouseover(function() {
		if (!ie)
			$(".main-content-promo-left-prev, .main-content-promo-left-next").fadeIn(200);
		else
			$(".main-content-promo-left-prev, .main-content-promo-left-next").show();
		if (tpl) clearTimeout(tpl);
	})
	.mouseout(function() {
		tpl = setTimeout('$(".main-content-promo-left-prev, .main-content-promo-left-next").' + (!ie?'fadeOut(200)':'hide()'), 100);
	});
});

/*
// menu
var t = null;
var cur_menu = null;
$(document).ready(function() {

// preload backgrounds
try {
	element = document.createElement('<div style="display: none" />');
	element2 = document.createElement('<div style="display: none" />');
}
catch (e) {
	element = document.createElement("div");
	element.setAttribute("style", "display: none");
	element2 = document.createElement("div");
	element2.setAttribute("style", "display: none");
}

element.innerHTML = '<div class="menu-item-submenu-over"><a class="menu-item-link">preload</a><div class="submenu"><table><tr><td class="submenu-box">preload</td><td class="submenu-bottom"><div>preload</div></td></tr></table></div></div>';
element.innerHTML += '<div class="menu-slash-first-over">preload</div>';
element.innerHTML += '<div class="menu-slash-left-over"><div>preload</div></div>';
element.innerHTML += '<div class="menu-slash-right-over"><div>preload</div></div>';
element.innerHTML += '<div class="submenu-item"><a><span><span>preload</span></span></a></div>';
document.getElementsByTagName('body')[0].appendChild(element);
element2.innerHTML += '<div class="submenu-item-over"><a><span><span>preload</span></span></a></div>';
document.getElementsByTagName('body')[0].appendChild(element2);

set_submenu_position();

$(window).resize(function() {
	set_submenu_position();
});

	function set_submenu_position() {
		var edge_offset = $(".menu-slash-last").offset().left + 14;
		$(".menu-item-submenu").each(function() {
			var menu_left_offset = $(this).offset().left;
			var submenu = $(".submenu", this);
			submenu.css("left", menu_left_offset);
			var submenu_right_offset = menu_left_offset + submenu.width();
			if (submenu_right_offset > edge_offset) {
				$(".submenu", this).css("left", menu_left_offset - (submenu_right_offset - edge_offset));
			} else {
				$(".submenu", this).css("left", menu_left_offset - 22);
			}
		});
	}

	function menu_item_over(j_obj) {
		var menu_item = j_obj.parent();
		if (menu_item.hasClass("menu-item-active")) return;
		menu_item.addClass("menu-item-submenu-over");
		menu_item.prev(".menu-slash").addClass("menu-slash-left-over")[0];
		menu_item.prev(".menu-slash-first").addClass("menu-slash-first-over")[0];
		menu_item.nextAll(".menu-slash:first").addClass("menu-slash-right-over")[0];
		$(".submenu", menu_item).show();
	}
	function menu_item_out(j_obj) {
		var menu_item = j_obj.parent();
		menu_item.removeClass("menu-item-submenu-over");
		menu_item.prev(".menu-slash").removeClass("menu-slash-left-over");
		menu_item.prev(".menu-slash-first").removeClass("menu-slash-first-over");
		menu_item.nextAll(".menu-slash:first").removeClass("menu-slash-right-over");
		$(".submenu", menu_item).hide();
	}

	$(".menu-item .menu-item-link")
		.mouseover(function() {
			clearTimeout(t);
			if (cur_menu != null)
				menu_item_out(cur_menu);
			cur_menu = $(this);
			menu_item_over($(this))
		})
		.mouseout(function() {
			t = setTimeout(function() {
				menu_item_out(cur_menu)
			}, 300);
		});
	$(".submenu")
		.mouseover(function() {
			clearTimeout(t);
			menu_item_over($(this).parent().children("a:first"))
		})
		.mouseout(function() {
			cur_menu = $(this).parent().children("a:first");
			t = setTimeout(function() {
				menu_item_out(cur_menu)
			}, 300);
		});
});
*/
function absPosition(obj) {
	var x = y = 0;
	while(obj) {
		x += obj.offsetLeft;
		y += obj.offsetTop;
		obj = obj.offsetParent;
	}
	return {
		x:x,
		y:y
	};
}

function fixPng(obj, img_src) {
	obj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + img_src + "', sizingMethod='" + (obj.currentStyle.backgroundRepeat=="no-repeat"?"crop":"scale") + "')";
}

ie_flash = false;
if (ie)
	document.write('<scr' + 'ipt language="vbscript">\n' +
		'on error resume next\n' +
		'set tmp = CreateObject("ShockwaveFlash.ShockwaveFlash.10")\n' +
		'if IsObject(tmp) then\n' +
		'ie_flash = true\n' +
		'end if\n' +
		'</scr' + 'ipt>');
var goFlash = (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"] && !navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)/i)) || ie_flash;
function showFlash(o, return_str){
	var bg,q,s,v;
	if(o.bgcolor){
		bg=o.bgcolor;
	}else{
		bg="#FFFFFF";
	}
	if(o.quality){
		q=o.quality;
	}else{
		q="high";
	}
	if(o.scale){
		s=o.scale;
	}else{
		s="noscale";
	}
	if(o.ver){
		v=o.ver;
	}else{
		v=8;
	}
	var str='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version='+v+',0,0,0" ';
	str+='id="'+o.id+'" ';
	if(o.base){
		str+='base="'+o.base+'" ';
	}
	if(o.align){
		str+='align="'+o.align+'" ';
	}
	str+='width="'+o.width+'" height="'+o.height+'"><param name="movie" value="'+o.name+'"/><param name="quality" value="'+q+'"/>'; //<param name="bgcolor" value="'+bg+'"/>
	if(o.flashvars){
		str+='<param name="flashvars" value="'+o.flashvars+'"/>';
	}
	if(o.allowScriptAccess){
		str+='<param name="allowScriptAccess" value="'+o.allowScriptAccess+'"/>';
	}
	if(o.allowFullScreen){
		str+='<param name="allowFullScreen" value="'+o.allowFullScreen+'"/>';
	}
	if(o.salign){
		str+='<param name="salign" value="'+o.salign+'"/>';
	}
	if(o.wmode){
		str+='<param name="wmode" value="'+o.wmode+'"/>';
	}
	str+='<param name="scale" value="'+s+'"/><embed type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" id="'+o.id+'-embed" src="'+o.name+'" '; //bgcolor="'+bg+'" ';
	if(o.flashvars){
		str+='flashvars="'+o.flashvars+'" ';
	}
	if(o.swLiveConnect){
		str+='swLiveConnect="'+o.swLiveConnect+'" ';
	}
	if(o.allowScriptAccess){
		str+='allowScriptAccess="'+o.allowScriptAccess+'" ';
	}
	if(o.allowFullScreen){
		str+='allowFullScreen="'+o.allowFullScreen+'" ';
	}
	str+='quality="'+q+'" ';
	if(o.base){
		str+='base="'+o.base+'" ';
	}
	if(o.wmode){
		str+='wmode="'+o.wmode+'" ';
	}
	if(o.salign){
		str+='salign="'+o.salign+'" ';
	}
	str+='scale="'+s+'" width="'+o.width+'" height="'+o.height+'"></embed></object>';
	if (return_str) {
		return str;
	} else {
		document.writeln(str);
	}
}

jQuery.fn.center = function () {
	this.css("position","absolute");
	this.css("top", (($(window).height() - this.outerHeight()) / 2) + $(window).scrollTop() + "px");
	this.css("left", (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px");
	return this;
}
