$(function(){
	// 1) 초기 설정 관련
	var dimHtml="";

	function dimFadeInOut(){
		dimHtml+='<div class="prev_page_dim"></div>';
		dimHtml+='<div class="next_page_dim"></div>';
		$("body").append(dimHtml);
		$(".prev_page_dim").delay(400).animate({height:0}, 400);
	}
	function GetCookie(name){
		var value=null, search=name+"=";
		if(document.cookie.length > 0){
			var offset=document.cookie.indexOf(search);
			if(offset != -1){
				offset+=search.length;
				var end=document.cookie.indexOf(";", offset);
				if(end == -1) end=document.cookie.length;
				value=unescape(document.cookie.substring(offset, end));
			}
		} return value;
	}
	function setCookie(name, value, expiredays){
		var days=expiredays;
		if(days){
			var date=new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires="; expires="+date.toGMTString();
		}else{
			var expires="";
		}
		document.cookie=name+"="+value+expires+"; path=/";
	}
	$(window).on("beforeunload", function(){
		// setCookie("main", "", 1);
	});

	// dimFadeInOut();

	setTimeout(function(){
		$(".prev_page_dim").delay(400).animate({height:0}, 400);
	}, 150);

	// 2) LNB 관련
	var lnbClicked=false;
	var linkPath="";
	var currentPath=window.location.href;
	var currentArray=currentPath.split("/");
	currentPath=currentArray[currentArray.length-1];
	// console.log("currentArray : "+currentArray);
	// console.log("currentPath : "+currentPath);

	$(".burger_menu button").click(function(){
		lnbClicked=true;
		$(".west .nav").animate({left:38, opacity:1}, 300);
		$(".burger_menu button span").animate({left:70, opacity:0}, 400);
		$(".btn").animate({left:150, opacity:0}, 400);
	});
	$(".side_header").mouseleave(function(){
		if(lnbClicked){
			lnbClicked=false;
			$(".west .nav").animate({left:-138, opacity:0}, 300);
			$(".burger_menu button span").animate({left:0, opacity:1}, 400);
			$(".btn").animate({left:30, opacity:1}, 400);
		}
		else{
			return false;
		}
	});
	$(".nav > li > a, h1 > a").click(function(e){
		e.preventDefault();
		linkPath=$(this).attr("href");
		// console.log("linkpath : "+linkpath);

		if(linkPath == currentPath) return;

		$(".next_page_dim").delay(400).animate({height:"100%"}, 400, function(){
			// setCookie("main", "back", 1);
			location.href=linkPath;
		});
	});

	// 3) top 버튼 관련
	var timer;
	var t;

	$(window).scroll(function(){
		clearTimeout(timer);

		timer=setTimeout(function(){
			t=$(window).scrollTop();

			if(t > 160){
				if($(".go_top").css("display") == "none"){
					$(".go_top").fadeIn(300);
				}
			}
			else{
				if($(".go_top").css("display") == "block"){
					$(".go_top").fadeOut(300);
				}
			}
		}, 150);
	});
	$(window).trigger("scroll");

	$(".go_top").click(function(e){
		e.preventDefault();
		$("html").animate({scrollTop:0}, 400, function(){
			$(".go_top").fadeOut(300);
		});
	});

	// 4) 링크 관련
	$(".link").hover(
		function(){
			$(this).find("span").stop().animate({left:"30px", marginLeft:0}, 300);
			$(this).find("img").stop().fadeIn(300);
		},
		function(){
			$(this).find("span").stop().animate({left:"50%", marginLeft:-45}, 300);
			$(this).find("img").stop().fadeOut(300);
		}
	);
	$(".bottom_area a").hover(
		function(){
			if($(this).is(".nolink")) return;
			$(this).stop().animate({backgroundColor:"#c7d5ef", color:"#fff"}, 300);
		},
		function(){
			if($(this).is(".nolink")) return;
			$(this).stop().animate({backgroundColor:"#fff", color:"#000"}, 300);
		}
	);
	$(".bottom_area a").click(function(e){
		e.preventDefault();
		linkPath=$(this).attr("href");
		// console.log("linkpath : "+linkpath);

		$(".next_page_dim").delay(400).animate({height:"100%"}, 400, function(){
			setCookie("main", "back", 1);
			location.href=linkPath;
		});
	});

	// 5) 비디오 관련
	var video=document.getElementById("project_pt");
	video.muted=true;

	var agent=navigator.userAgent.toLowerCase();

	if(agent.indexOf("msie 8.0") == -1){
		video.play();
	}
	else{
		$("#project_pt").hide();
	}
});
