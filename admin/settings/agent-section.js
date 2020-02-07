// JavaScript Document

function AgentSection_js () {
	"use strict";
	var startTime;
	var time;
	var scroll_y;
	var mouse_pos;
	var load = true;
	
	var div_00_div_00 = document.getElementById('div-00-div-00');

	var div_00_div_00_div_00_div_00 = [3];
	var btn_00_div_00_div_00_div_00_div_00 = [3];
	var div_01_div_00_div_00_div_00 = [3];
	var btn_00_div_01_div_00_div_00_div_00 = [3];
	var btn_01_div_01_div_00_div_00_div_00 = [3];
	
	var div_00_div_00_div_00_div_01_div_00 = [5];
	var btn_00_div_00_div_00_div_00_div_01_div_00 = [5];
	var div_01_div_00_div_00_div_01_div_00 = [5];
	var btn_00_div_01_div_00_div_00_div_01_div_00 = [5];
	var btn_01_div_01_div_00_div_00_div_01_div_00 = [5];
	
	div_00_div_00_div_00_div_00[0] = document.querySelectorAll('.div-00-div-00-div-00-div-00')[0];
	div_00_div_00_div_00_div_00[1] = document.querySelectorAll('.div-00-div-00-div-00-div-00')[1];
	div_00_div_00_div_00_div_00[2] = document.querySelectorAll('.div-00-div-00-div-00-div-00')[2];
	btn_00_div_00_div_00_div_00_div_00[0] = document.querySelectorAll('.div-00-div-00-div-00-div-00 button')[0];
	btn_00_div_00_div_00_div_00_div_00[1] = document.querySelectorAll('.div-00-div-00-div-00-div-00 button')[1];
	btn_00_div_00_div_00_div_00_div_00[2] = document.querySelectorAll('.div-00-div-00-div-00-div-00 button')[2];
	div_01_div_00_div_00_div_00[0] = document.querySelectorAll('.div-01-div-00-div-00-div-00')[0];
	div_01_div_00_div_00_div_00[1] = document.querySelectorAll('.div-01-div-00-div-00-div-00')[1];
	div_01_div_00_div_00_div_00[2] = document.querySelectorAll('.div-01-div-00-div-00-div-00')[2];
	btn_00_div_01_div_00_div_00_div_00[0] = document.querySelectorAll('.div-01-div-00-div-00-div-00 button')[0];
	btn_00_div_01_div_00_div_00_div_00[1] = document.querySelectorAll('.div-01-div-00-div-00-div-00 button')[2];
	btn_00_div_01_div_00_div_00_div_00[2] = document.querySelectorAll('.div-01-div-00-div-00-div-00 button')[4];
	btn_01_div_01_div_00_div_00_div_00[0] = document.querySelectorAll('.div-01-div-00-div-00-div-00 button')[1];
	btn_01_div_01_div_00_div_00_div_00[1] = document.querySelectorAll('.div-01-div-00-div-00-div-00 button')[3];
	btn_01_div_01_div_00_div_00_div_00[2] = document.querySelectorAll('.div-01-div-00-div-00-div-00 button')[5];
	
	div_00_div_00_div_00_div_01_div_00[0] = document.querySelectorAll('.div-00-div-00-div-00-div-01-div-00')[0];
	div_00_div_00_div_00_div_01_div_00[1] = document.querySelectorAll('.div-00-div-00-div-00-div-01-div-00')[1];
	div_00_div_00_div_00_div_01_div_00[2] = document.querySelectorAll('.div-00-div-00-div-00-div-01-div-00')[2];
	div_00_div_00_div_00_div_01_div_00[3] = document.querySelectorAll('.div-00-div-00-div-00-div-01-div-00')[3];
	div_00_div_00_div_00_div_01_div_00[4] = document.querySelectorAll('.div-00-div-00-div-00-div-01-div-00')[4];
	btn_00_div_00_div_00_div_00_div_01_div_00[0] = document.querySelectorAll('.div-00-div-00-div-00-div-01-div-00 button')[0];
	btn_00_div_00_div_00_div_00_div_01_div_00[1] = document.querySelectorAll('.div-00-div-00-div-00-div-01-div-00 button')[1];
	btn_00_div_00_div_00_div_00_div_01_div_00[2] = document.querySelectorAll('.div-00-div-00-div-00-div-01-div-00 button')[2];
	btn_00_div_00_div_00_div_00_div_01_div_00[3] = document.querySelectorAll('.div-00-div-00-div-00-div-01-div-00 button')[3];
	btn_00_div_00_div_00_div_00_div_01_div_00[4] = document.querySelectorAll('.div-00-div-00-div-00-div-01-div-00 button')[4];
	div_01_div_00_div_00_div_01_div_00[0] = document.querySelectorAll('.div-01-div-00-div-00-div-01-div-00')[0];
	div_01_div_00_div_00_div_01_div_00[1] = document.querySelectorAll('.div-01-div-00-div-00-div-01-div-00')[1];
	div_01_div_00_div_00_div_01_div_00[2] = document.querySelectorAll('.div-01-div-00-div-00-div-01-div-00')[2];
	div_01_div_00_div_00_div_01_div_00[3] = document.querySelectorAll('.div-01-div-00-div-00-div-01-div-00')[3];
	div_01_div_00_div_00_div_01_div_00[4] = document.querySelectorAll('.div-01-div-00-div-00-div-01-div-00')[4];
	btn_00_div_01_div_00_div_00_div_01_div_00[0] = document.querySelectorAll('.div-01-div-00-div-00-div-01-div-00 button')[0];
	btn_00_div_01_div_00_div_00_div_01_div_00[1] = document.querySelectorAll('.div-01-div-00-div-00-div-01-div-00 button')[2];
	btn_00_div_01_div_00_div_00_div_01_div_00[2] = document.querySelectorAll('.div-01-div-00-div-00-div-01-div-00 button')[4];
	btn_00_div_01_div_00_div_00_div_01_div_00[3] = document.querySelectorAll('.div-01-div-00-div-00-div-01-div-00 button')[6];
	btn_00_div_01_div_00_div_00_div_01_div_00[4] = document.querySelectorAll('.div-01-div-00-div-00-div-01-div-00 button')[8];
	btn_01_div_01_div_00_div_00_div_01_div_00[0] = document.querySelectorAll('.div-01-div-00-div-00-div-01-div-00 button')[1];
	btn_01_div_01_div_00_div_00_div_01_div_00[1] = document.querySelectorAll('.div-01-div-00-div-00-div-01-div-00 button')[3];
	btn_01_div_01_div_00_div_00_div_01_div_00[2] = document.querySelectorAll('.div-01-div-00-div-00-div-01-div-00 button')[5];
	btn_01_div_01_div_00_div_00_div_01_div_00[3] = document.querySelectorAll('.div-01-div-00-div-00-div-01-div-00 button')[7];
	btn_01_div_01_div_00_div_00_div_01_div_00[4] = document.querySelectorAll('.div-01-div-00-div-00-div-01-div-00 button')[9];
	
	var div_00_div_00_div_01_div_00_div_01_div_00 = document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00');
	
	var spn_00_div_00 = document.querySelector('#spn-00-div-00');
	var div_00_spn_00_div_00 = document.querySelector('#div-00-spn-00-div-00');
	
	function Main(){
		window.requestAnimationFrame(function(timestamp){
			if(load === true && document.body.id === "agent-section-settings"){
				Initialisation();
				load = false;
			}
			
			if(startTime !== undefined && document.body.id === "agent-section-settings"){
				time.deltaTime = time.start + timestamp - time.now;
				time.now = time.start + timestamp;
				scroll_y = window.pageYOffset || document.documentElement.scrollTop || window.scrollY;
			}
			
			Main();
		});
	}
	
	function Initialisation(){
		
		//vars
		startTime = new Date().getTime();
		time = {start : startTime, now : startTime, deltaTime : 0};
		scroll_y = 0;
		mouse_pos = {x: 0, y: 0};
		
				
		btn_00_div_00_div_00_div_00_div_00[0].addEventListener('click', function(){
			div_00_div_00_div_00_div_00[0].style.display = 'none';
			div_01_div_00_div_00_div_00[0].style.display = '';
			div_01_div_00_div_00_div_00[0].querySelector('div').innerText = div_00_div_00_div_00_div_00[0].querySelector('h6').innerText;
		});
		
		btn_00_div_00_div_00_div_00_div_00[1].addEventListener('click', function(){
			div_00_div_00_div_00_div_00[1].style.display = 'none';
			div_01_div_00_div_00_div_00[1].style.display = '';
			div_01_div_00_div_00_div_00[1].querySelector('div').innerText = div_00_div_00_div_00_div_00[1].querySelector('h6').innerText;
		});
		
		btn_00_div_00_div_00_div_00_div_00[2].addEventListener('click', function(){
			div_00_div_00_div_00_div_00[2].style.display = 'none';
			div_01_div_00_div_00_div_00[2].style.display = '';
			div_01_div_00_div_00_div_00[2].querySelector('div').innerHTML = div_00_div_00_div_00_div_00[2].querySelector('h6').innerHTML;
		});
		
		
		btn_00_div_01_div_00_div_00_div_00[0].addEventListener('click', function(){
			div_00_div_00_div_00_div_00[0].style.display = '';
			div_01_div_00_div_00_div_00[0].style.display = 'none';
		});
		
		btn_00_div_01_div_00_div_00_div_00[1].addEventListener('click', function(){
			div_00_div_00_div_00_div_00[1].style.display = '';
			div_01_div_00_div_00_div_00[1].style.display = 'none';
		});
		
		btn_00_div_01_div_00_div_00_div_00[2].addEventListener('click', function(){
			div_00_div_00_div_00_div_00[2].style.display = '';
			div_01_div_00_div_00_div_00[2].style.display = 'none';
		});
		
		
		btn_01_div_01_div_00_div_00_div_00[0].addEventListener('click', function(){
			div_00_div_00_div_00_div_00[0].querySelector('h6').innerText = div_01_div_00_div_00_div_00[0].querySelector('div').innerText;
			div_00_div_00_div_00_div_00[0].style.display = '';
			div_01_div_00_div_00_div_00[0].style.display = 'none';
			UpdateSettingsDetailsXHR('display_name', div_01_div_00_div_00_div_00[0].querySelector('div').innerText);
		});
		
		btn_01_div_01_div_00_div_00_div_00[1].addEventListener('click', function(){
			div_00_div_00_div_00_div_00[1].querySelector('h6').innerText = div_01_div_00_div_00_div_00[1].querySelector('div').innerText;
			div_00_div_00_div_00_div_00[1].style.display = '';
			div_01_div_00_div_00_div_00[1].style.display = 'none';
			UpdateSettingsDetailsXHR('occupation', div_01_div_00_div_00_div_00[1].querySelector('div').innerText);
		});
		
		btn_01_div_01_div_00_div_00_div_00[2].addEventListener('click', function(){
			div_00_div_00_div_00_div_00[2].querySelector('h6').innerHTML = div_01_div_00_div_00_div_00[2].querySelector('div').innerHTML;
			div_00_div_00_div_00_div_00[2].style.display = '';
			div_01_div_00_div_00_div_00[2].style.display = 'none';
			UpdateSettingsDetailsXHR('description', div_01_div_00_div_00_div_00[2].querySelector('div').innerHTML);
		});
		
		
		
		btn_00_div_00_div_00_div_00_div_01_div_00[0].addEventListener('click', function(){
			div_00_div_00_div_00_div_01_div_00[0].style.display = 'none';
			div_01_div_00_div_00_div_01_div_00[0].style.display = '';
			div_01_div_00_div_00_div_01_div_00[0].querySelector('div').innerText = div_00_div_00_div_00_div_01_div_00[0].querySelector('h6').innerText;
		});
		
		btn_00_div_00_div_00_div_00_div_01_div_00[1].addEventListener('click', function(){
			div_00_div_00_div_00_div_01_div_00[1].style.display = 'none';
			div_01_div_00_div_00_div_01_div_00[1].style.display = '';
			div_01_div_00_div_00_div_01_div_00[1].querySelector('div').innerText = div_00_div_00_div_00_div_01_div_00[1].querySelector('h6').innerText;
		});
		
		btn_00_div_00_div_00_div_00_div_01_div_00[2].addEventListener('click', function(){
			div_00_div_00_div_00_div_01_div_00[2].style.display = 'none';
			div_01_div_00_div_00_div_01_div_00[2].style.display = '';
			div_01_div_00_div_00_div_01_div_00[2].querySelector('div').innerText = div_00_div_00_div_00_div_01_div_00[2].querySelector('h6').innerText;
		});
		
		btn_00_div_00_div_00_div_00_div_01_div_00[3].addEventListener('click', function(){
			div_00_div_00_div_00_div_01_div_00[3].style.display = 'none';
			div_01_div_00_div_00_div_01_div_00[3].style.display = '';
			div_01_div_00_div_00_div_01_div_00[3].querySelector('div').innerText = div_00_div_00_div_00_div_01_div_00[3].querySelector('h6').innerText;
		});
		
		btn_00_div_00_div_00_div_00_div_01_div_00[4].addEventListener('click', function(){
			div_00_div_00_div_00_div_01_div_00[4].style.display = 'none';
			div_01_div_00_div_00_div_01_div_00[4].style.display = '';
			div_01_div_00_div_00_div_01_div_00[4].querySelector('div').innerText = div_00_div_00_div_00_div_01_div_00[4].querySelector('h6').innerText;
		});
		
		
		btn_00_div_01_div_00_div_00_div_01_div_00[0].addEventListener('click', function(){
			div_00_div_00_div_00_div_01_div_00[0].style.display = '';
			div_01_div_00_div_00_div_01_div_00[0].style.display = 'none';
		});
		
		btn_00_div_01_div_00_div_00_div_01_div_00[1].addEventListener('click', function(){
			div_00_div_00_div_00_div_01_div_00[1].style.display = '';
			div_01_div_00_div_00_div_01_div_00[1].style.display = 'none';
		});
		
		btn_00_div_01_div_00_div_00_div_01_div_00[2].addEventListener('click', function(){
			div_00_div_00_div_00_div_01_div_00[2].style.display = '';
			div_01_div_00_div_00_div_01_div_00[2].style.display = 'none';
		});
		
		btn_00_div_01_div_00_div_00_div_01_div_00[3].addEventListener('click', function(){
			div_00_div_00_div_00_div_01_div_00[3].style.display = '';
			div_01_div_00_div_00_div_01_div_00[3].style.display = 'none';
		});
		
		btn_00_div_01_div_00_div_00_div_01_div_00[4].addEventListener('click', function(){
			div_00_div_00_div_00_div_01_div_00[4].style.display = '';
			div_01_div_00_div_00_div_01_div_00[4].style.display = 'none';
		});
		
		
		btn_01_div_01_div_00_div_00_div_01_div_00[0].addEventListener('click', function(){
			div_00_div_00_div_00_div_01_div_00[0].querySelector('h6').innerText = div_01_div_00_div_00_div_01_div_00[0].querySelector('div').innerText;
			div_00_div_00_div_00_div_01_div_00[0].style.display = '';
			div_01_div_00_div_00_div_01_div_00[0].style.display = 'none';
			UpdateSettingsDetailsXHR('mobile_number', div_01_div_00_div_00_div_01_div_00[0].querySelector('div').innerText);
		});
		
		btn_01_div_01_div_00_div_00_div_01_div_00[1].addEventListener('click', function(){
			div_00_div_00_div_00_div_01_div_00[1].querySelector('h6').innerText = div_01_div_00_div_00_div_01_div_00[1].querySelector('div').innerText;
			div_00_div_00_div_00_div_01_div_00[1].style.display = '';
			div_01_div_00_div_00_div_01_div_00[1].style.display = 'none';
			UpdateSettingsDetailsXHR('office_number', div_01_div_00_div_00_div_01_div_00[1].querySelector('div').innerText);
		});
		
		btn_01_div_01_div_00_div_00_div_01_div_00[2].addEventListener('click', function(){
			div_00_div_00_div_00_div_01_div_00[2].querySelector('h6').innerText = div_01_div_00_div_00_div_01_div_00[2].querySelector('div').innerText;
			div_00_div_00_div_00_div_01_div_00[2].style.display = '';
			div_01_div_00_div_00_div_01_div_00[2].style.display = 'none';
			UpdateSettingsDetailsXHR('facebook_profile', div_01_div_00_div_00_div_01_div_00[2].querySelector('div').innerText);
		});
		
		btn_01_div_01_div_00_div_00_div_01_div_00[3].addEventListener('click', function(){
			div_00_div_00_div_00_div_01_div_00[3].querySelector('h6').innerText = div_01_div_00_div_00_div_01_div_00[3].querySelector('div').innerText;
			div_00_div_00_div_00_div_01_div_00[3].style.display = '';
			div_01_div_00_div_00_div_01_div_00[3].style.display = 'none';
			UpdateSettingsDetailsXHR('display_email', div_01_div_00_div_00_div_01_div_00[3].querySelector('div').innerText);
		});
		
		btn_01_div_01_div_00_div_00_div_01_div_00[4].addEventListener('click', function(){
			div_00_div_00_div_00_div_01_div_00[4].querySelector('h6').innerText = div_01_div_00_div_00_div_01_div_00[4].querySelector('div').innerText;
			div_00_div_00_div_00_div_01_div_00[4].style.display = '';
			div_01_div_00_div_00_div_01_div_00[4].style.display = 'none';
			UpdateSettingsDetailsXHR('website_src', div_01_div_00_div_00_div_01_div_00[4].querySelector('div').innerText);
		});
		
		
		div_00_spn_00_div_00.t = 0;
		var btn_00_spn_00_div_00_spn_00_div_00 = document.querySelector('#div-00-spn-00-div-00 span button');
		var img_00_div_00_div_00_spn_00_div_00 = document.querySelector('#div-00-spn-00-div-00 div img');
		div_00_spn_00_div_00.center_x = 0.5;
		div_00_spn_00_div_00.center_y = 0.5;
		div_00_spn_00_div_00.last_center_x = 0.5;
		div_00_spn_00_div_00.last_center_y = 0.5;
		div_00_spn_00_div_00.start_mouse_pos = {x:0, y:0};
		img_00_div_00_div_00_spn_00_div_00.clicked = false;
		btn_00_spn_00_div_00_spn_00_div_00.clicked = false;

		btn_00_spn_00_div_00_spn_00_div_00.addEventListener('mousedown', function(){
			btn_00_spn_00_div_00_spn_00_div_00.clicked = true;
		});
		
		img_00_div_00_div_00_spn_00_div_00.addEventListener('mousedown', function(){
			img_00_div_00_div_00_spn_00_div_00.clicked = true;
			div_00_spn_00_div_00.start_mouse_pos.x = mouse_pos.x;
			div_00_spn_00_div_00.start_mouse_pos.y = mouse_pos.y;
			div_00_spn_00_div_00.last_center_x = div_00_spn_00_div_00.center_x;
			div_00_spn_00_div_00.last_center_y = div_00_spn_00_div_00.center_y;
		});
		
		document.addEventListener('mousemove', function(e){
			mouse_pos.x = e.clientX;
			mouse_pos.y = e.clientY;
			
			if(btn_00_spn_00_div_00_spn_00_div_00.clicked === true){
				var bcr = document.querySelector('#div-00-spn-00-div-00 span span').getBoundingClientRect();
				var slider_width = document.querySelector('#div-00-spn-00-div-00 span span').clientWidth;
				div_00_spn_00_div_00.t = Math.min(Math.max((mouse_pos.x - bcr.left)/slider_width, 0), 1);
				btn_00_spn_00_div_00_spn_00_div_00.style.left = div_00_spn_00_div_00.t * slider_width + (bcr.left - div_00_spn_00_div_00.querySelector('span').getBoundingClientRect().left) + 'px';
				
				if(img_00_div_00_div_00_spn_00_div_00.naturalHeight/img_00_div_00_div_00_spn_00_div_00.naturalWidth < 1.2){
					img_00_div_00_div_00_spn_00_div_00.style.height = (12000/150 * (div_00_spn_00_div_00.t * 2 + 1)) + '%';
				} else {
					img_00_div_00_div_00_spn_00_div_00.style.width = (10000/300 * (div_00_spn_00_div_00.t * 2 + 1)) + '%';
				}
				
				var width_offset = (document.querySelector('#div-00-spn-00-div-00 div svg').clientWidth * 50/300) / img_00_div_00_div_00_spn_00_div_00.clientWidth;
				var height_offset = (document.querySelector('#div-00-spn-00-div-00 div svg').clientHeight * 60/150) / img_00_div_00_div_00_spn_00_div_00.clientHeight;
				div_00_spn_00_div_00.center_x = Math.min(Math.max(div_00_spn_00_div_00.center_x,width_offset),1 - width_offset);
				div_00_spn_00_div_00.center_y = Math.min(Math.max(div_00_spn_00_div_00.center_y,height_offset),1 - height_offset);
				img_00_div_00_div_00_spn_00_div_00.style.left = 'calc(50% - ' + div_00_spn_00_div_00.center_x * img_00_div_00_div_00_spn_00_div_00.clientWidth + 'px)';
				img_00_div_00_div_00_spn_00_div_00.style.top = 'calc(50% - ' + div_00_spn_00_div_00.center_y * img_00_div_00_div_00_spn_00_div_00.clientHeight + 'px)';
			}
			
			if(img_00_div_00_div_00_spn_00_div_00.clicked === true){
				e.preventDefault();
				var shift_x = mouse_pos.x - div_00_spn_00_div_00.start_mouse_pos.x;
				var shift_y = mouse_pos.y - div_00_spn_00_div_00.start_mouse_pos.y;
				var width_offset = (document.querySelector('#div-00-spn-00-div-00 div svg').clientWidth * 50/300) / img_00_div_00_div_00_spn_00_div_00.clientWidth;
				var height_offset = (document.querySelector('#div-00-spn-00-div-00 div svg').clientHeight * 60/150) / img_00_div_00_div_00_spn_00_div_00.clientHeight;
				div_00_spn_00_div_00.center_x = Math.min(Math.max(div_00_spn_00_div_00.last_center_x - (shift_x/img_00_div_00_div_00_spn_00_div_00.clientWidth),width_offset),1 - width_offset);
				div_00_spn_00_div_00.center_y = Math.min(Math.max(div_00_spn_00_div_00.last_center_y - (shift_y/img_00_div_00_div_00_spn_00_div_00.clientHeight),height_offset),1 - height_offset);
				img_00_div_00_div_00_spn_00_div_00.style.left = 'calc(50% - ' + div_00_spn_00_div_00.center_x * img_00_div_00_div_00_spn_00_div_00.clientWidth + 'px)';
				img_00_div_00_div_00_spn_00_div_00.style.top = 'calc(50% - ' + div_00_spn_00_div_00.center_y * img_00_div_00_div_00_spn_00_div_00.clientHeight + 'px)';
			}
		});
		
		document.addEventListener('mouseup', function(){
			btn_00_spn_00_div_00_spn_00_div_00.clicked = false;
			img_00_div_00_div_00_spn_00_div_00.clicked = false;
			div_00_spn_00_div_00.last_center_x = div_00_spn_00_div_00.center_x;
			div_00_spn_00_div_00.last_center_y = div_00_spn_00_div_00.center_y;
		});
	
		
		div_00_spn_00_div_00.querySelector('#div-00-spn-00-div-00 input').addEventListener('change', function(){
			var files = this.files;
			if (FileReader && files && files.length > 0) {
				//iterate through files and add to queue, create new array without first file
				const validImageTypes = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png'];
				if(validImageTypes.includes(files[0].type)){
					div_00_spn_00_div_00.t = 0;
					div_00_spn_00_div_00.center_x = 0.5;
					div_00_spn_00_div_00.center_y = 0.5;
					div_00_spn_00_div_00.last_center_x = 0.5;
					div_00_spn_00_div_00.last_center_y = 0.5;
					SetAgentImage(files[0], div_00_spn_00_div_00.querySelector('img'));
				} else {
					//invalid image type
				}
			}
		});
		
		
		img_00_div_00_div_00_spn_00_div_00.initialSrc = img_00_div_00_div_00_spn_00_div_00.src;
		
		InitialiseSettingsInfo();
	}
	
	function InitialiseSettingsInfo(){
		
		//set profile image, cover image
		
		div_00_div_00_div_01_div_00_div_01_div_00.addEventListener('click', function(){
			spn_00_div_00.style.display = '';
			div_00_spn_00_div_00.style.display = '';
			div_00_spn_00_div_00.style.filter = '';
			div_00_spn_00_div_00.style.pointerEvents = '';
			div_00_spn_00_div_00.querySelector('hr').style.width = '0';
						
			if(document.querySelector('#div-00-spn-00-div-00 img').naturalHeight/document.querySelector('#div-00-spn-00-div-00 img').naturalWidth < 1.2){
				document.querySelector('#div-00-spn-00-div-00 img').style.height = document.querySelector('#div-00-spn-00-div-00 svg').clientHeight*120/150*(div_00_spn_00_div_00.t*2+1) + 'px';
			} else {
				document.querySelector('#div-00-spn-00-div-00 img').style.width = document.querySelector('#div-00-spn-00-div-00 svg').clientWidth*100/300*(div_00_spn_00_div_00.t*2+1) + 'px';
			}

			document.querySelector('#div-00-spn-00-div-00 img').style.left = 'calc(50% - ' + div_00_spn_00_div_00.center_x * document.querySelector('#div-00-spn-00-div-00 img').clientWidth + 'px)';
			document.querySelector('#div-00-spn-00-div-00 img').style.top = 'calc(50% - ' + div_00_spn_00_div_00.center_y * document.querySelector('#div-00-spn-00-div-00 img').clientHeight + 'px)';
			document.querySelector('#div-00-spn-00-div-00 span button').style.left = div_00_spn_00_div_00.t * document.querySelector('#div-00-spn-00-div-00 span span').clientWidth + (document.querySelector('#div-00-spn-00-div-00 span span').getBoundingClientRect().left - div_00_spn_00_div_00.querySelector('span').getBoundingClientRect().left) + 'px';

		});
		
		//set other info
		div_00_spn_00_div_00.querySelector('#btn-01-div-00-spn-00-div-00').addEventListener('click', function(){
			spn_00_div_00.style.display = 'none';
			div_00_spn_00_div_00.style.display = 'none';
		});
	
		div_00_spn_00_div_00.querySelector('#btn-02-div-00-spn-00-div-00').addEventListener('click', function(){
			UploadAgentXHR();
		});
		
		
		//set profile image
		
		GetDataXHR();
		
	}
	
	function GetDataXHR(){
		
		var url = DOCUMENT_ROOT + 'processes/get-agent-details.php';

		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){

				var response = JSON.parse(xhr.responseText);
				
				div_00_div_00_div_00_div_00[0].querySelector('h6').innerHTML = response[0].display_name;
				div_00_div_00_div_00_div_00[1].querySelector('h6').innerHTML = response[0].occupation;
				div_00_div_00_div_00_div_00[2].querySelector('h6').innerHTML = response[0].description;
				div_01_div_00_div_00_div_00[0].querySelector('div').innerHTML = response[0].display_name;
				div_01_div_00_div_00_div_00[1].querySelector('div').innerHTML = response[0].occupation;
				div_01_div_00_div_00_div_00[2].querySelector('div').innerHTML = response[0].description;
				
				div_00_div_00_div_00_div_01_div_00[0].querySelector('h6').innerHTML = response[0].mobile_number;
				div_00_div_00_div_00_div_01_div_00[1].querySelector('h6').innerHTML = response[0].office_number;
				div_00_div_00_div_00_div_01_div_00[2].querySelector('h6').innerHTML = response[0].facebook_src;
				div_00_div_00_div_00_div_01_div_00[3].querySelector('h6').innerHTML = response[0].display_email;
				div_00_div_00_div_00_div_01_div_00[4].querySelector('h6').innerHTML = response[0].website_src;
				div_01_div_00_div_00_div_01_div_00[0].querySelector('div').innerHTML = response[0].mobile_number;
				div_01_div_00_div_00_div_01_div_00[1].querySelector('div').innerHTML = response[0].office_number;
				div_01_div_00_div_00_div_01_div_00[2].querySelector('div').innerHTML = response[0].facebook_src;
				div_01_div_00_div_00_div_01_div_00[3].querySelector('div').innerHTML = response[0].display_email;
				div_01_div_00_div_00_div_01_div_00[4].querySelector('div').innerHTML = response[0].website_src;
				
				document.querySelector('#div-00-spn-00-div-00 img').src = response[1].src;
				div_00_spn_00_div_00.t = (response[1].scale - 1)/2;
				div_00_spn_00_div_00.center_x = response[1].center_x;
				div_00_spn_00_div_00.center_y = response[1].center_y;
				div_00_spn_00_div_00.last_center_x = response[1].center_x;
				div_00_spn_00_div_00.last_center_y = response[1].center_y;
				
				document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').src = response[1].src;
				document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').style.opacity = '0';
				document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').onload = function(){
					
					document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').style.opacity = '';
										
					if(document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').naturalHeight/document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').naturalWidth < 1.2){
						document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').style.height = response[1].scale * 100 + '%';
					} else {
						document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').style.width = response[1].scale * 100 + '%';
					}
					document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').style.left = 'calc(50% - ' + Math.min(Math.max(response[1].center_x * document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').clientWidth,document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 span').clientWidth/2),document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').clientWidth - document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 span').clientWidth/2) + 'px)';
					document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').style.top = 'calc(50% - ' + Math.min(Math.max(response[1].center_y * document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').clientHeight,document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 span').clientHeight/2),document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').clientHeight - document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 span').clientHeight/2) + 'px)';
					document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').onload = '';
				};
			}
		};

		xhr.open('POST', url, true);

		xhr.send();
		
	}
	
	
	
	function UpdateSettingsDetailsXHR(input_type, input_value){
		
		var url = DOCUMENT_ROOT + 'processes/update-settings-agent.php';

		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){

			}
		};
		
		xhr.open('POST', url, true);
		
		xhr.setRequestHeader('input-type', input_type);
		xhr.setRequestHeader('input-value', input_value);

		xhr.send();
		
	}
	
	
	
	function SetAgentImage(file, img){
		var fr = new FileReader();
		//when finished, create upload object and begin xhr process
		fr.addEventListener("load", function () {
			img.src = fr.result;
		}, false);
		//when completed read request, file is represented using url
		fr.readAsDataURL(file);
		
		img.addEventListener("load", function(){
			var img_00_div_00_div_00_spn_00_div_00 = document.querySelector('#div-00-spn-00-div-00 div img');
			var btn_00_spn_00_div_00_spn_00_div_00 = document.querySelector('#div-00-spn-00-div-00 span button');
			

			var bcr = document.querySelector('#div-00-spn-00-div-00 span span').getBoundingClientRect();
			var slider_width = document.querySelector('#div-00-spn-00-div-00 span span').clientWidth;
			btn_00_spn_00_div_00_spn_00_div_00.style.left = div_00_spn_00_div_00.t * slider_width + (bcr.left - div_00_spn_00_div_00.querySelector('span').getBoundingClientRect().left) + 'px';
			
			img_00_div_00_div_00_spn_00_div_00.style.width = '';
			img_00_div_00_div_00_spn_00_div_00.style.height = '';
			
			if(img_00_div_00_div_00_spn_00_div_00.naturalHeight/img_00_div_00_div_00_spn_00_div_00.naturalWidth < 1.2){
				img_00_div_00_div_00_spn_00_div_00.style.height = (12000/150 * (div_00_spn_00_div_00.t * 2 + 1)) + '%';
			} else {
				img_00_div_00_div_00_spn_00_div_00.style.width = (10000/300 * (div_00_spn_00_div_00.t * 2 + 1)) + '%';
			}
			
			img_00_div_00_div_00_spn_00_div_00.style.left = 'calc(50% - ' + div_00_spn_00_div_00.center_x * img_00_div_00_div_00_spn_00_div_00.clientWidth + 'px)';
			img_00_div_00_div_00_spn_00_div_00.style.top = 'calc(50% - ' + div_00_spn_00_div_00.center_y * img_00_div_00_div_00_spn_00_div_00.clientHeight + 'px)';
		});
	}
	
	
	function UploadAgentXHR(){
				
		var files = div_00_spn_00_div_00.querySelector('input').files;
		
		if (FileReader && files && files.length > 0) {
			var form_data = new FormData();
			form_data.append('file', div_00_spn_00_div_00.querySelector('input').files[0]);
		}
			
		div_00_spn_00_div_00.style.filter = 'contrast(0.6) brightness(1.3)';
		div_00_spn_00_div_00.style.pointerEvents = 'none';

		var url = DOCUMENT_ROOT + 'processes/upload-agent-image.php';

		var xhr = new XMLHttpRequest();

		var scale = div_00_spn_00_div_00.t * 2 + 1;
		var center_x = div_00_spn_00_div_00.center_x;
		var center_y = div_00_spn_00_div_00.center_y;
		
		document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').style.opacity = '0';

		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				
				var child = div_00_spn_00_div_00.querySelector('input');
				var parent = child.parentNode;
				parent.removeChild(child);
				
				var insert = document.createElement('input');
				insert.type = 'file';
				parent.appendChild(insert);
				
				div_00_spn_00_div_00.querySelector('#div-00-spn-00-div-00 input').addEventListener('change', function(){
					var files = this.files;
					if (FileReader && files && files.length > 0) {
						//iterate through files and add to queue, create new array without first file
						const validImageTypes = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png'];
						if(validImageTypes.includes(files[0].type)){
							div_00_spn_00_div_00.t = 0;
							div_00_spn_00_div_00.center_x = 0.5;
							div_00_spn_00_div_00.center_y = 0.5;
							div_00_spn_00_div_00.last_center_x = 0.5;
							div_00_spn_00_div_00.last_center_y = 0.5;
							SetAgentImage(files[0], div_00_spn_00_div_00.querySelector('img'));
						} else {
							//invalid image type
						}
					}
				});
				
				div_00_spn_00_div_00.style.display = 'none';
				spn_00_div_00.style.display = 'none';
				document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').src = xhr.responseText;
				
				document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').onload = function(){
					
					document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').style.opacity = '';
										
					document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').style.height = '';
					document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').style.width = '';
					
					if(document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').naturalHeight/document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').naturalWidth < 1.2){
						document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').style.height = scale * 100 + '%';
					} else {
						document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').style.width = scale * 100 + '%';
					}

					document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').style.left = 'calc(50% - ' + Math.min(Math.max(center_x * document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').clientWidth,document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 span').clientWidth/2),document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').clientWidth - document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 span').clientWidth/2) + 'px)';
					document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').style.top = 'calc(50% - ' + Math.min(Math.max(center_y * document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').clientHeight,document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 span').clientHeight/2),document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').clientHeight - document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 span').clientHeight/2) + 'px)';
					document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').onload = '';
				};
			}
		};

		xhr.upload.onprogress = function(e){
			UploadProgress(div_00_spn_00_div_00, e);
		};

		xhr.open('POST', url, true);

		xhr.setRequestHeader('center_x', center_x);
		xhr.setRequestHeader('center_y', center_y);
		xhr.setRequestHeader('scale', scale);

		if (FileReader && files && files.length > 0) {
			xhr.send(form_data);
		} else {
			xhr.send();
		}
	}
	
	
	
	
	function UploadProgress(container, e){
		if(e.lengthComputable){
			var uploaded = e.loaded;
			var total = e.total;
			var progress = Math.min(Math.max(uploaded/total, 0), 2);
			
			container.querySelector('hr').style.width = progress * 100 + '%';
			
		}
	}


	Main();
}

AgentSection_js();