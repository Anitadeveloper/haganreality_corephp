// JavaScript Document

function Header_js () {
	"use strict";
		
	function Main(){
		window.requestAnimationFrame(function(timestamp){
			
			Main();
			
		});
	}

	
	function FacebookShare() {
		
		FB.ui({
			method: 'share',
			href: URL,
		});
	}

	window.fbAsyncInit = function() {
		FB.init({
			appId      : '2211303965801769',
			xfbml      : true,
			version    : 'v2.3'
		});
	};
	
	(function(d, s, id){
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

	
	
	function TwitterShare(){
		
		window.open("https://twitter.com/intent/tweet?url=" + URL);
		
	}
	
	function LinkedinShare(){

		window.open('https://www.linkedin.com/shareArticle?mini=true&url=' + URL);
		
	}
	
	function GoogleShare(){

		window.open('https://plus.google.com/share?url=' + URL);
		
	}
	
	function PinterestShare(){
		
	}

	function Initialisation(){
		
		document.querySelectorAll('.a-00-div-00-foo-00')[0].addEventListener('click', function(){
			GoogleShare();
		});
		
		document.querySelectorAll('.a-00-div-00-foo-00')[1].addEventListener('click', function(){
			TwitterShare();
		});
		
		document.querySelectorAll('.a-00-div-00-foo-00')[2].addEventListener('click', function(){
			LinkedinShare();
		});
		
		document.querySelectorAll('.a-00-div-00-foo-00')[3].addEventListener('click', function(){
			PinterestShare();
		});
		
		document.querySelectorAll('.a-00-div-00-foo-00')[4].addEventListener('click', function(){
			FacebookShare();
		});
		
	}

	Initialisation();

	Main();
}


Header_js();