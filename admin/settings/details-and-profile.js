// JavaScript Document

function DetailsAndProfile_js () {
	"use strict";
	var startTime;
	var time;
	var scroll_y;
	var mouse_pos;
	var load = true;
	
	var div_00_div_00 = document.getElementById('div-00-div-00');

	var div_00_div_00_div_00_div_00 = [5];
	var btn_00_div_00_div_00_div_00_div_00 = [5];
	var div_01_div_00_div_00_div_00 = [5];
	var btn_00_div_01_div_00_div_00_div_00 = [5];
	var btn_01_div_01_div_00_div_00_div_00 = [5];
	
	div_00_div_00_div_00_div_00[0] = document.querySelectorAll('.div-00-div-00-div-00-div-00')[0];
	div_00_div_00_div_00_div_00[1] = document.querySelectorAll('.div-00-div-00-div-00-div-00')[1];
	div_00_div_00_div_00_div_00[2] = document.querySelectorAll('.div-00-div-00-div-00-div-00')[2];
	div_00_div_00_div_00_div_00[3] = document.querySelectorAll('.div-00-div-00-div-00-div-00')[3];
	div_00_div_00_div_00_div_00[4] = document.querySelectorAll('.div-00-div-00-div-00-div-00')[4];
	btn_00_div_00_div_00_div_00_div_00[0] = document.querySelectorAll('.div-00-div-00-div-00-div-00 button')[0];
	btn_00_div_00_div_00_div_00_div_00[1] = document.querySelectorAll('.div-00-div-00-div-00-div-00 button')[1];
	btn_00_div_00_div_00_div_00_div_00[2] = document.querySelectorAll('.div-00-div-00-div-00-div-00 button')[2];
	btn_00_div_00_div_00_div_00_div_00[3] = document.querySelectorAll('.div-00-div-00-div-00-div-00 button')[3];
	btn_00_div_00_div_00_div_00_div_00[4] = document.querySelectorAll('.div-00-div-00-div-00-div-00 button')[4];
	div_01_div_00_div_00_div_00[0] = document.querySelectorAll('.div-01-div-00-div-00-div-00')[0];
	div_01_div_00_div_00_div_00[1] = document.querySelectorAll('.div-01-div-00-div-00-div-00')[1];
	div_01_div_00_div_00_div_00[2] = document.querySelectorAll('.div-01-div-00-div-00-div-00')[2];
	div_01_div_00_div_00_div_00[3] = document.querySelectorAll('.div-01-div-00-div-00-div-00')[3];
	btn_00_div_01_div_00_div_00_div_00[0] = document.querySelectorAll('.div-01-div-00-div-00-div-00 button')[0];
	btn_00_div_01_div_00_div_00_div_00[1] = document.querySelectorAll('.div-01-div-00-div-00-div-00 button')[2];
	btn_00_div_01_div_00_div_00_div_00[2] = document.querySelectorAll('.div-01-div-00-div-00-div-00 button')[4];
	btn_00_div_01_div_00_div_00_div_00[3] = document.querySelectorAll('.div-01-div-00-div-00-div-00 button')[6];
	btn_01_div_01_div_00_div_00_div_00[0] = document.querySelectorAll('.div-01-div-00-div-00-div-00 button')[1];
	btn_01_div_01_div_00_div_00_div_00[1] = document.querySelectorAll('.div-01-div-00-div-00-div-00 button')[3];
	btn_01_div_01_div_00_div_00_div_00[2] = document.querySelectorAll('.div-01-div-00-div-00-div-00 button')[5];
	btn_01_div_01_div_00_div_00_div_00[3] = document.querySelectorAll('.div-01-div-00-div-00-div-00 button')[7];
	
	var div_00_div_00_div_01_div_00_div_01_div_00 = document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00');
	var div_01_div_00_div_01_div_00_div_01_div_00 = document.querySelector('.div-01-div-00-div-01-div-00-div-01-div-00');
	
	var spn_00_div_00 = document.querySelector('#spn-00-div-00');
	var div_00_spn_00_div_00 = document.querySelector('#div-00-spn-00-div-00');
	var div_01_spn_00_div_00 = document.querySelector('#div-01-spn-00-div-00');
	var div_02_spn_00_div_00 = document.querySelector('#div-02-spn-00-div-00');
	var div_03_spn_00_div_00 = document.querySelector('#div-03-spn-00-div-00');
	
	function Main(){
		window.requestAnimationFrame(function(timestamp){
			if(load === true && document.body.id === "details-and-profile-settings"){
				Initialisation();
				load = false;
			}
			
			if(startTime !== undefined && document.body.id === "details-and-profile-settings"){
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
		
		
		if(CHANGE_PASSWORD_STATE === true){
			spn_00_div_00.style.display = '';
			div_00_spn_00_div_00.style.display = '';
		}
		
				
		btn_00_div_00_div_00_div_00_div_00[0].addEventListener('click', function(){
			div_00_div_00_div_00_div_00[0].style.display = 'none';
			div_01_div_00_div_00_div_00[0].style.display = '';
		});
		
		btn_00_div_00_div_00_div_00_div_00[1].addEventListener('click', function(){
			div_00_div_00_div_00_div_00[1].style.display = 'none';
			div_01_div_00_div_00_div_00[1].style.display = '';
		});
		
		btn_00_div_00_div_00_div_00_div_00[2].addEventListener('click', function(){
			div_00_div_00_div_00_div_00[2].style.display = 'none';
			div_01_div_00_div_00_div_00[2].style.display = '';
		});
		
		btn_00_div_00_div_00_div_00_div_00[3].addEventListener('click', function(){
			div_00_div_00_div_00_div_00[3].style.display = 'none';
			div_01_div_00_div_00_div_00[3].style.display = '';
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
		
		btn_00_div_01_div_00_div_00_div_00[3].addEventListener('click', function(){
			div_00_div_00_div_00_div_00[3].style.display = '';
			div_01_div_00_div_00_div_00[3].style.display = 'none';
		});
		
		
		
		btn_01_div_01_div_00_div_00_div_00[0].addEventListener('click', function(){
			div_00_div_00_div_00_div_00[0].querySelector('h6').innerText = div_01_div_00_div_00_div_00[0].querySelector('div').innerText;
			div_00_div_00_div_00_div_00[0].style.display = '';
			div_01_div_00_div_00_div_00[0].style.display = 'none';
			UpdateSettingsDetailsXHR('first_name', div_01_div_00_div_00_div_00[0].querySelector('div').innerText);
		});
		
		btn_01_div_01_div_00_div_00_div_00[1].addEventListener('click', function(){
			div_00_div_00_div_00_div_00[1].querySelector('h6').innerText = div_01_div_00_div_00_div_00[1].querySelector('div').innerText;
			div_00_div_00_div_00_div_00[1].style.display = '';
			div_01_div_00_div_00_div_00[1].style.display = 'none';
			UpdateSettingsDetailsXHR('last_name', div_01_div_00_div_00_div_00[1].querySelector('div').innerText);
		});
		
		btn_01_div_01_div_00_div_00_div_00[2].addEventListener('click', function(){
			div_00_div_00_div_00_div_00[2].querySelector('h6').innerText = div_01_div_00_div_00_div_00[2].querySelector('div').innerText;
			div_00_div_00_div_00_div_00[2].style.display = '';
			div_01_div_00_div_00_div_00[2].style.display = 'none';
			UpdateSettingsDetailsXHR('username', div_01_div_00_div_00_div_00[2].querySelector('div').innerText);
		});
		
		btn_01_div_01_div_00_div_00_div_00[3].addEventListener('click', function(){
			div_00_div_00_div_00_div_00[3].querySelector('h6').innerText = div_01_div_00_div_00_div_00[3].querySelector('div').innerText;
			div_00_div_00_div_00_div_00[3].style.display = '';
			div_01_div_00_div_00_div_00[3].style.display = 'none';
			UpdateSettingsDetailsXHR('email', div_01_div_00_div_00_div_00[3].querySelector('div').innerText);
		});
		
		
		div_01_spn_00_div_00.t = 0;
		var btn_00_spn_00_div_01_spn_00_div_00 = document.querySelector('#div-01-spn-00-div-00 span button');
		var img_00_div_00_div_01_spn_00_div_00 = document.querySelector('#div-01-spn-00-div-00 div img');
		div_01_spn_00_div_00.center_x = 0.5;
		div_01_spn_00_div_00.center_y = 0.5;
		div_01_spn_00_div_00.last_center_x = 0.5;
		div_01_spn_00_div_00.last_center_y = 0.5;
		div_01_spn_00_div_00.start_mouse_pos = {x:0, y:0};
		img_00_div_00_div_01_spn_00_div_00.clicked = false;
		btn_00_spn_00_div_01_spn_00_div_00.clicked = false;

		btn_00_spn_00_div_01_spn_00_div_00.addEventListener('mousedown', function(){
			btn_00_spn_00_div_01_spn_00_div_00.clicked = true;
		});
		
		img_00_div_00_div_01_spn_00_div_00.addEventListener('mousedown', function(){
			img_00_div_00_div_01_spn_00_div_00.clicked = true;
			div_01_spn_00_div_00.start_mouse_pos.x = mouse_pos.x;
			div_01_spn_00_div_00.start_mouse_pos.y = mouse_pos.y;
			div_01_spn_00_div_00.last_center_x = div_01_spn_00_div_00.center_x;
			div_01_spn_00_div_00.last_center_y = div_01_spn_00_div_00.center_y;
		});
		
		div_02_spn_00_div_00.t = 0;
		var btn_00_spn_00_div_02_spn_00_div_00 = document.querySelector('#div-02-spn-00-div-00 span button');
		var img_00_div_00_div_02_spn_00_div_00 = document.querySelector('#div-02-spn-00-div-00 div img');
		div_02_spn_00_div_00.center_x = 0;
		div_02_spn_00_div_00.center_y = 0;
		div_02_spn_00_div_00.last_center_x = 0;
		div_02_spn_00_div_00.last_center_y = 0;
		div_02_spn_00_div_00.start_mouse_pos = {x:0, y:0};
		img_00_div_00_div_02_spn_00_div_00.clicked = false;
		btn_00_spn_00_div_02_spn_00_div_00.clicked = false;

		btn_00_spn_00_div_02_spn_00_div_00.addEventListener('mousedown', function(){
			btn_00_spn_00_div_02_spn_00_div_00.clicked = true;
		});
		
		img_00_div_00_div_02_spn_00_div_00.addEventListener('mousedown', function(){
			img_00_div_00_div_02_spn_00_div_00.clicked = true;
			div_02_spn_00_div_00.start_mouse_pos.x = mouse_pos.x;
			div_02_spn_00_div_00.start_mouse_pos.y = mouse_pos.y;
			div_02_spn_00_div_00.last_center_x = div_02_spn_00_div_00.center_x;
			div_02_spn_00_div_00.last_center_y = div_02_spn_00_div_00.center_y;
		});
		
		document.addEventListener('mousemove', function(e){
			mouse_pos.x = e.clientX;
			mouse_pos.y = e.clientY;
			
			if(btn_00_spn_00_div_01_spn_00_div_00.clicked === true){
				var bcr = document.querySelector('#div-01-spn-00-div-00 span span').getBoundingClientRect();
				var slider_width = document.querySelector('#div-01-spn-00-div-00 span span').clientWidth;
				div_01_spn_00_div_00.t = Math.min(Math.max((mouse_pos.x - bcr.left)/slider_width, 0), 1);
				btn_00_spn_00_div_01_spn_00_div_00.style.left = div_01_spn_00_div_00.t * slider_width + (bcr.left - div_01_spn_00_div_00.querySelector('span').getBoundingClientRect().left) + 'px';
				
				if(img_00_div_00_div_01_spn_00_div_00.naturalHeight/img_00_div_00_div_01_spn_00_div_00.naturalWidth < 1){
					img_00_div_00_div_01_spn_00_div_00.style.height = (13000/150 * (div_01_spn_00_div_00.t * 2 + 1)) + '%';
				} else {
					img_00_div_00_div_01_spn_00_div_00.style.width = (13000/300 * (div_01_spn_00_div_00.t * 2 + 1)) + '%';
				}
				
				var width_offset = (document.querySelector('#div-01-spn-00-div-00 div svg').clientWidth * 65/300) / img_00_div_00_div_01_spn_00_div_00.clientWidth;
				var height_offset = (document.querySelector('#div-01-spn-00-div-00 div svg').clientHeight * 65/150) / img_00_div_00_div_01_spn_00_div_00.clientHeight;
				div_01_spn_00_div_00.center_x = Math.min(Math.max(div_01_spn_00_div_00.center_x,width_offset),1 - width_offset);
				div_01_spn_00_div_00.center_y = Math.min(Math.max(div_01_spn_00_div_00.center_y,height_offset),1 - height_offset);
				img_00_div_00_div_01_spn_00_div_00.style.left = 'calc(50% - ' + div_01_spn_00_div_00.center_x * img_00_div_00_div_01_spn_00_div_00.clientWidth + 'px)';
				img_00_div_00_div_01_spn_00_div_00.style.top = 'calc(50% - ' + div_01_spn_00_div_00.center_y * img_00_div_00_div_01_spn_00_div_00.clientHeight + 'px)';
			}
			
			if(img_00_div_00_div_01_spn_00_div_00.clicked === true){
				e.preventDefault();
				var shift_x = mouse_pos.x - div_01_spn_00_div_00.start_mouse_pos.x;
				var shift_y = mouse_pos.y - div_01_spn_00_div_00.start_mouse_pos.y;
				var zoom_x = (img_00_div_00_div_01_spn_00_div_00.clientWidth - (document.querySelector('#div-01-spn-00-div-00 div svg').clientWidth * 130/300))/img_00_div_00_div_01_spn_00_div_00.clientWidth;
				var zoom_y = (img_00_div_00_div_01_spn_00_div_00.clientHeight - (document.querySelector('#div-01-spn-00-div-00 div svg').clientHeight * 130/150))/img_00_div_00_div_01_spn_00_div_00.clientHeight;
				var width_offset = (document.querySelector('#div-01-spn-00-div-00 div svg').clientWidth * 65/300) / img_00_div_00_div_01_spn_00_div_00.clientWidth;
				var height_offset = (document.querySelector('#div-01-spn-00-div-00 div svg').clientHeight * 65/150) / img_00_div_00_div_01_spn_00_div_00.clientHeight;
				div_01_spn_00_div_00.center_x = Math.min(Math.max(div_01_spn_00_div_00.last_center_x - (shift_x/img_00_div_00_div_01_spn_00_div_00.clientWidth),width_offset),1 - width_offset);
				div_01_spn_00_div_00.center_y = Math.min(Math.max(div_01_spn_00_div_00.last_center_y - (shift_y/img_00_div_00_div_01_spn_00_div_00.clientHeight),height_offset),1 - height_offset);
				img_00_div_00_div_01_spn_00_div_00.style.left = 'calc(50% - ' + div_01_spn_00_div_00.center_x * img_00_div_00_div_01_spn_00_div_00.clientWidth + 'px)';
				img_00_div_00_div_01_spn_00_div_00.style.top = 'calc(50% - ' + div_01_spn_00_div_00.center_y * img_00_div_00_div_01_spn_00_div_00.clientHeight + 'px)';
			}
			
			
			
			if(btn_00_spn_00_div_02_spn_00_div_00.clicked === true){
				var bcr = document.querySelector('#div-02-spn-00-div-00 span span').getBoundingClientRect();
				var slider_width = document.querySelector('#div-02-spn-00-div-00 span span').clientWidth;
				div_02_spn_00_div_00.t = Math.min(Math.max((mouse_pos.x - bcr.left)/slider_width, 0), 1);
				btn_00_spn_00_div_02_spn_00_div_00.style.left = div_02_spn_00_div_00.t * slider_width + (bcr.left - div_02_spn_00_div_00.querySelector('span').getBoundingClientRect().left) + 'px';
				
				if(img_00_div_00_div_02_spn_00_div_00.naturalHeight/img_00_div_00_div_02_spn_00_div_00.naturalWidth < (document.querySelector('#div-02-spn-00-div-00 svg').clientHeight * 100/150)/(document.querySelector('#div-02-spn-00-div-00 svg').clientWidth * 200/300)){
					img_00_div_00_div_02_spn_00_div_00.style.height = (10000/150 * (div_02_spn_00_div_00.t * 2 + 1)) + '%';
				} else {
					img_00_div_00_div_02_spn_00_div_00.style.width = (20000/300 * (div_02_spn_00_div_00.t * 2 + 1)) + '%';
				}
				
				var width_offset = (document.querySelector('#div-02-spn-00-div-00 div svg').clientWidth * 100/300) / img_00_div_00_div_02_spn_00_div_00.clientWidth;
				var height_offset = (document.querySelector('#div-02-spn-00-div-00 div svg').clientHeight * 50/150) / img_00_div_00_div_02_spn_00_div_00.clientHeight;
				div_02_spn_00_div_00.center_x = Math.min(Math.max(div_02_spn_00_div_00.center_x,width_offset),1 - width_offset);
				div_02_spn_00_div_00.center_y = Math.min(Math.max(div_02_spn_00_div_00.center_y,height_offset),1 - height_offset);
				img_00_div_00_div_02_spn_00_div_00.style.left = 'calc(50% - ' + div_02_spn_00_div_00.center_x * img_00_div_00_div_02_spn_00_div_00.clientWidth + 'px)';
				img_00_div_00_div_02_spn_00_div_00.style.top = 'calc(50% - ' + div_02_spn_00_div_00.center_y * img_00_div_00_div_02_spn_00_div_00.clientHeight + 'px)';
			}
			
			if(img_00_div_00_div_02_spn_00_div_00.clicked === true){
				e.preventDefault();
				var shift_x = mouse_pos.x - div_02_spn_00_div_00.start_mouse_pos.x;
				var shift_y = mouse_pos.y - div_02_spn_00_div_00.start_mouse_pos.y;
				var zoom_x = (img_00_div_00_div_02_spn_00_div_00.clientWidth - (document.querySelector('#div-02-spn-00-div-00 div svg').clientWidth * 130/300))/img_00_div_00_div_02_spn_00_div_00.clientWidth;
				var zoom_y = (img_00_div_00_div_02_spn_00_div_00.clientHeight - (document.querySelector('#div-02-spn-00-div-00 div svg').clientHeight * 130/150))/img_00_div_00_div_02_spn_00_div_00.clientHeight;
				var width_offset = (document.querySelector('#div-02-spn-00-div-00 div svg').clientWidth * 100/300) / img_00_div_00_div_02_spn_00_div_00.clientWidth;
				var height_offset = (document.querySelector('#div-02-spn-00-div-00 div svg').clientHeight * 50/150) / img_00_div_00_div_02_spn_00_div_00.clientHeight;
				div_02_spn_00_div_00.center_x = Math.min(Math.max(div_02_spn_00_div_00.last_center_x - (shift_x/img_00_div_00_div_02_spn_00_div_00.clientWidth),width_offset),1 - width_offset);
				div_02_spn_00_div_00.center_y = Math.min(Math.max(div_02_spn_00_div_00.last_center_y - (shift_y/img_00_div_00_div_02_spn_00_div_00.clientHeight),height_offset),1 - height_offset);
				img_00_div_00_div_02_spn_00_div_00.style.left = 'calc(50% - ' + div_02_spn_00_div_00.center_x * img_00_div_00_div_02_spn_00_div_00.clientWidth + 'px)';
				img_00_div_00_div_02_spn_00_div_00.style.top = 'calc(50% - ' + div_02_spn_00_div_00.center_y * img_00_div_00_div_02_spn_00_div_00.clientHeight + 'px)';
			}
			
		});
		
		document.addEventListener('mouseup', function(){
			btn_00_spn_00_div_01_spn_00_div_00.clicked = false;
			img_00_div_00_div_01_spn_00_div_00.clicked = false;
			btn_00_spn_00_div_02_spn_00_div_00.clicked = false;
			img_00_div_00_div_02_spn_00_div_00.clicked = false;
			div_01_spn_00_div_00.last_center_x = div_01_spn_00_div_00.center_x;
			div_01_spn_00_div_00.last_center_y = div_01_spn_00_div_00.center_y;
			div_02_spn_00_div_00.last_center_x = div_02_spn_00_div_00.center_x;
			div_02_spn_00_div_00.last_center_y = div_02_spn_00_div_00.center_y;
		});
		
		div_01_spn_00_div_00.querySelector('#div-01-spn-00-div-00 input').addEventListener('change', function(){
			var files = this.files;
			if (FileReader && files && files.length > 0) {
				//iterate through files and add to queue, create new array without first file
				const validImageTypes = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png'];
				if(validImageTypes.includes(files[0].type)){
					div_01_spn_00_div_00.t = 0;
					div_01_spn_00_div_00.center_x = 0.5;
					div_01_spn_00_div_00.center_y = 0.5;
					div_01_spn_00_div_00.last_center_x = 0.5;
					div_01_spn_00_div_00.last_center_y = 0.5;
					SetProfileImage(files[0], div_01_spn_00_div_00.querySelector('img'));
				} else {
					//invalid image type
				}
			}
		});
		
		
		
		div_02_spn_00_div_00.querySelector('#div-02-spn-00-div-00 input').addEventListener('change', function(){
			var files = this.files;
			if (FileReader && files && files.length > 0) {
				//iterate through files and add to queue, create new array without first file
				const validImageTypes = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png'];
				if(validImageTypes.includes(files[0].type)){
					SetCoverImage(files[0], div_02_spn_00_div_00.querySelector('img'));
				} else {
					//invalid image type
				}
			}
		});
		
		
		img_00_div_00_div_01_spn_00_div_00.initialSrc = img_00_div_00_div_01_spn_00_div_00.src;
		img_00_div_00_div_02_spn_00_div_00.initialSrc = img_00_div_00_div_02_spn_00_div_00.src;
		
		InitialiseSettingsInfo();
	}
	
	function InitialiseSettingsInfo(){
		
		//set profile image, cover image
		
		div_00_div_00_div_01_div_00_div_01_div_00.addEventListener('click', function(){
			spn_00_div_00.style.display = '';
			div_02_spn_00_div_00.style.display = '';
			div_02_spn_00_div_00.style.filter = '';
			div_02_spn_00_div_00.style.pointerEvents = '';
			div_02_spn_00_div_00.querySelector('hr').style.width = '0';
			
			if(document.querySelector('#div-02-spn-00-div-00 img').naturalHeight/document.querySelector('#div-02-spn-00-div-00 img').naturalWidth < (document.querySelector('#div-02-spn-00-div-00 svg').clientHeight * 100/150)/(document.querySelector('#div-02-spn-00-div-00 svg').clientWidth * 200/300)){
				document.querySelector('#div-02-spn-00-div-00 img').style.height = document.querySelector('#div-02-spn-00-div-00 svg').clientHeight*100/150*(div_02_spn_00_div_00.t*2+1) + 'px';
			} else {
				document.querySelector('#div-02-spn-00-div-00 img').style.width = document.querySelector('#div-02-spn-00-div-00 svg').clientWidth*200/300*(div_02_spn_00_div_00.t*2+1) + 'px';
			}

			document.querySelector('#div-02-spn-00-div-00 img').style.left = 'calc(50% - ' + div_02_spn_00_div_00.center_x * document.querySelector('#div-02-spn-00-div-00 img').clientWidth + 'px)';
			document.querySelector('#div-02-spn-00-div-00 img').style.top = 'calc(50% - ' + div_02_spn_00_div_00.center_y * document.querySelector('#div-02-spn-00-div-00 img').clientHeight + 'px)';
			document.querySelector('#div-02-spn-00-div-00 span button').style.left = div_02_spn_00_div_00.t * document.querySelector('#div-02-spn-00-div-00 span span').clientWidth + (document.querySelector('#div-02-spn-00-div-00 span span').getBoundingClientRect().left - div_02_spn_00_div_00.querySelector('span').getBoundingClientRect().left) + 'px';

		});
		
		div_01_div_00_div_01_div_00_div_01_div_00.addEventListener('click', function(){
			spn_00_div_00.style.display = '';
			div_01_spn_00_div_00.style.display = '';
			div_01_spn_00_div_00.style.filter = '';
			div_01_spn_00_div_00.style.pointerEvents = '';
			div_01_spn_00_div_00.querySelector('hr').style.width = '0';
						
			if(document.querySelector('#div-01-spn-00-div-00 img').naturalHeight/document.querySelector('#div-01-spn-00-div-00 img').naturalWidth < 1){
				document.querySelector('#div-01-spn-00-div-00 img').style.height = document.querySelector('#div-01-spn-00-div-00 svg').clientHeight*130/150*(div_01_spn_00_div_00.t*2+1) + 'px';
			} else {
				document.querySelector('#div-01-spn-00-div-00 img').style.width = document.querySelector('#div-01-spn-00-div-00 svg').clientWidth*130/300*(div_01_spn_00_div_00.t*2+1) + 'px';
			}

			document.querySelector('#div-01-spn-00-div-00 img').style.left = 'calc(50% - ' + div_01_spn_00_div_00.center_x * document.querySelector('#div-01-spn-00-div-00 img').clientWidth + 'px)';
			document.querySelector('#div-01-spn-00-div-00 img').style.top = 'calc(50% - ' + div_01_spn_00_div_00.center_y * document.querySelector('#div-01-spn-00-div-00 img').clientHeight + 'px)';
			document.querySelector('#div-01-spn-00-div-00 span button').style.left = div_01_spn_00_div_00.t * document.querySelector('#div-01-spn-00-div-00 span span').clientWidth + (document.querySelector('#div-01-spn-00-div-00 span span').getBoundingClientRect().left - div_01_spn_00_div_00.querySelector('span').getBoundingClientRect().left) + 'px';

		});
		
		document.querySelector('#div-02-div-00 button').addEventListener('click', function(){
			spn_00_div_00.style.display = '';
			div_03_spn_00_div_00.style.display = '';
		});
		
		
		
		//set other info
		
		btn_00_div_00_div_00_div_00_div_00[4].addEventListener('click', function(){
			spn_00_div_00.style.display = '';
			div_00_spn_00_div_00.style.display = '';
			div_00_spn_00_div_00.querySelectorAll('input')[0].value = '';
			div_00_spn_00_div_00.querySelectorAll('input')[1].value = '';
			div_00_spn_00_div_00.querySelectorAll('input')[2].value = '';
			div_00_spn_00_div_00.querySelectorAll('.errors')[0].innerHTML = '';
			div_00_spn_00_div_00.querySelectorAll('.errors')[1].innerHTML = '';
			div_00_spn_00_div_00.querySelectorAll('.errors')[2].innerHTML = '';
		});
		
		
		
		div_00_spn_00_div_00.querySelector('svg').addEventListener('click', function(){
			spn_00_div_00.style.display = 'none';
			div_00_spn_00_div_00.style.display = 'none';
		});
		
		div_00_spn_00_div_00.querySelector('#btn-00-div-00-spn-00-div-00').addEventListener('click', function(){
			var ipt_00_div_00_spn_00_div_00 = div_00_spn_00_div_00.querySelectorAll('input');
			var lbl_00_div_00_spn_00_div_00 = div_00_spn_00_div_00.querySelectorAll('.errors');
			lbl_00_div_00_spn_00_div_00[0].innerHTML = '';
			lbl_00_div_00_spn_00_div_00[1].innerHTML = '';
			lbl_00_div_00_spn_00_div_00[2].innerHTML = '';
			if(ipt_00_div_00_spn_00_div_00[1].value !== ipt_00_div_00_spn_00_div_00[2].value){
				//not equal passwords
				lbl_00_div_00_spn_00_div_00[1].innerHTML = 'Passwords do not match';
				lbl_00_div_00_spn_00_div_00[2].innerHTML = 'Passwords do not match';
			} else if(ipt_00_div_00_spn_00_div_00[0].value === '') {
				lbl_00_div_00_spn_00_div_00[0].innerHTML = 'Old Password cannot be empty';
			} else if(ipt_00_div_00_spn_00_div_00[1].value === '') {
				lbl_00_div_00_spn_00_div_00[1].innerHTML = 'New Password cannot be empty';
			} else if(ipt_00_div_00_spn_00_div_00[2].value === '') {
				lbl_00_div_00_spn_00_div_00[2].innerHTML = 'New Password cannot be empty';
			} else {
				UpdateSettingsDetailsXHR('password', ipt_00_div_00_spn_00_div_00[1].value, ipt_00_div_00_spn_00_div_00[0].value);
			}
		});
		
		div_01_spn_00_div_00.querySelector('#btn-01-div-01-spn-00-div-00').addEventListener('click', function(){
			spn_00_div_00.style.display = 'none';
			div_01_spn_00_div_00.style.display = 'none';
		});
		
		div_02_spn_00_div_00.querySelector('#btn-01-div-02-spn-00-div-00').addEventListener('click', function(){
			spn_00_div_00.style.display = 'none';
			div_02_spn_00_div_00.style.display = 'none';
		});
	
		div_03_spn_00_div_00.querySelector('#btn-00-div-03-spn-00-div-00').addEventListener('click', function(){
			spn_00_div_00.style.display = 'none';
			div_03_spn_00_div_00.style.display = 'none';
		});
		
		div_01_spn_00_div_00.querySelector('#btn-02-div-01-spn-00-div-00').addEventListener('click', function(){
			UploadProfileXHR();
		});
		
		div_02_spn_00_div_00.querySelector('#btn-02-div-02-spn-00-div-00').addEventListener('click', function(){
			UploadCoverXHR();
		});
		
		
		//set profile image
		
		GetDataXHR();
		
	}
	
	function GetDataXHR(){
		
		var url = DOCUMENT_ROOT + 'processes/get-settings-details.php';

		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){

				var response = JSON.parse(xhr.responseText);
				
				div_00_div_00_div_00_div_00[0].querySelector('h6').innerHTML = response[0].first_name;
				div_00_div_00_div_00_div_00[1].querySelector('h6').innerHTML = response[0].last_name;
				div_00_div_00_div_00_div_00[2].querySelector('h6').innerHTML = response[0].username;
				div_00_div_00_div_00_div_00[3].querySelector('h6').innerHTML = response[0].email;
				div_01_div_00_div_00_div_00[0].querySelector('div').innerHTML = response[0].first_name;
				div_01_div_00_div_00_div_00[1].querySelector('div').innerHTML = response[0].last_name;
				div_01_div_00_div_00_div_00[2].querySelector('div').innerHTML = response[0].username;
				div_01_div_00_div_00_div_00[3].querySelector('div').innerHTML = response[0].email;
				
				document.querySelector('#div-01-spn-00-div-00 img').src = response[1].src;
				div_01_spn_00_div_00.t = (response[1].scale - 1)/2;
				div_01_spn_00_div_00.center_x = response[1].center_x;
				div_01_spn_00_div_00.center_y = response[1].center_y;
				div_01_spn_00_div_00.last_center_x = response[1].center_x;
				div_01_spn_00_div_00.last_center_y = response[1].center_y;
				
				document.querySelector('#div-02-spn-00-div-00 img').src = response[2].src;
				div_02_spn_00_div_00.t = (response[2].scale - 1)/2;
				div_02_spn_00_div_00.center_x = response[2].center_x;
				div_02_spn_00_div_00.center_y = response[2].center_y;
				div_02_spn_00_div_00.last_center_x = response[2].center_x;
				div_02_spn_00_div_00.last_center_y = response[2].center_y;

				document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').src = response[2].src;
				document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').style.opacity = '0';
				document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').onload = function(){
					
					document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').style.opacity = '';
					
					if(document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').naturalHeight/document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').naturalWidth < document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00').clientHeight/document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00').clientWidth){
						document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').style.height = response[2].scale * 100 + '%';
					} else {
						document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').style.width = response[2].scale * 100 + '%';
					}
					document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').style.left = 'calc(50% - ' + Math.min(Math.max(response[2].center_x * document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').clientWidth,document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 span').clientWidth/2),document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').clientWidth - document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 span').clientWidth/2) + 'px)';
					document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').style.top = 'calc(50% - ' + Math.min(Math.max(response[2].center_y * document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').clientHeight,document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 span').clientHeight/2),document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').clientHeight - document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 span').clientHeight/2) + 'px)';
					document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').onload = '';
				}

				document.querySelector('.div-01-div-00-div-01-div-00-div-01-div-00 img').src = response[1].src;
				document.querySelector('.div-01-div-00-div-01-div-00-div-01-div-00 img').style.opacity = '0';
				document.querySelector('.div-01-div-00-div-01-div-00-div-01-div-00 img').onload = function(){
					
					document.querySelector('.div-01-div-00-div-01-div-00-div-01-div-00 img').style.opacity = '';
					
					if(document.querySelector('.div-01-div-00-div-01-div-00-div-01-div-00 img').naturalHeight/document.querySelector('.div-01-div-00-div-01-div-00-div-01-div-00 img').naturalWidth < 1){
						document.querySelector('.div-01-div-00-div-01-div-00-div-01-div-00 img').style.height = response[1].scale * 100 + '%';
					} else {
						document.querySelector('.div-01-div-00-div-01-div-00-div-01-div-00 img').style.width = response[1].scale * 100 + '%';
					}
					document.querySelector('.div-01-div-00-div-01-div-00-div-01-div-00 img').style.left = 'calc(50% - ' + Math.min(Math.max(response[1].center_x * document.querySelector('.div-01-div-00-div-01-div-00-div-01-div-00 img').clientWidth,document.querySelector('.div-01-div-00-div-01-div-00-div-01-div-00 span').clientWidth/2),document.querySelector('.div-01-div-00-div-01-div-00-div-01-div-00 img').clientWidth - document.querySelector('.div-01-div-00-div-01-div-00-div-01-div-00 span').clientWidth/2) + 'px)';
					document.querySelector('.div-01-div-00-div-01-div-00-div-01-div-00 img').style.top = 'calc(50% - ' + Math.min(Math.max(response[1].center_y * document.querySelector('.div-01-div-00-div-01-div-00-div-01-div-00 img').clientHeight,document.querySelector('.div-01-div-00-div-01-div-00-div-01-div-00 span').clientHeight/2),document.querySelector('.div-01-div-00-div-01-div-00-div-01-div-00 img').clientHeight - document.querySelector('.div-01-div-00-div-01-div-00-div-01-div-00 span').clientHeight/2) + 'px)';
					document.querySelector('.div-01-div-00-div-01-div-00-div-01-div-00 img').onload = '';
				}

			}
		};

		xhr.open('POST', url, true);

		xhr.send();
		
	}
	
	
	
	function UpdateSettingsDetailsXHR(input_type, input_value, old_password=''){
		
		var url = DOCUMENT_ROOT + 'processes/update-settings-details.php';

		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){

				if(input_type === 'password'){
					var response = xhr.responseText;
					
					var ipt_00_div_00_spn_00_div_00 = div_00_spn_00_div_00.querySelectorAll('input');
					var lbl_00_div_00_spn_00_div_00 = div_00_spn_00_div_00.querySelectorAll('.errors');

					if(response === 'Password cannot be empty'){
						lbl_00_div_00_spn_00_div_00[1].innerHTML = 'Old Password cannot be empty';
						lbl_00_div_00_spn_00_div_00[2].innerHTML = 'Old Password cannot be empty';
					} else if(response === 'error'){
						lbl_00_div_00_spn_00_div_00[2].innerHTML = 'There was an error updating your password. Please try again.';
					} else if(response === 'Incorrect Password'){
						lbl_00_div_00_spn_00_div_00[0].innerHTML = 'Your old password is incorrect.';
					} else if(response === 'success') {
						div_00_spn_00_div_00.style.display = 'none';
						spn_00_div_00.style.display = 'none';
					}
				}
				
			}
		};
		
		xhr.open('POST', url, true);
		
		xhr.setRequestHeader('input-type', input_type);
		
		if(input_type !== 'password'){
			xhr.setRequestHeader('input-value', input_value);
		} else {
			xhr.setRequestHeader('old-password', old_password);
			xhr.setRequestHeader('new-password', input_value);
		}

		xhr.send();
		
	}
	
	
	
	function SetProfileImage(file, img){
		var fr = new FileReader();
		//when finished, create upload object and begin xhr process
		fr.addEventListener("load", function () {
			img.src = fr.result;
		}, false);
		//when completed read request, file is represented using url
		fr.readAsDataURL(file);
		
		img.addEventListener("load", function(){
			var img_00_div_00_div_01_spn_00_div_00 = document.querySelector('#div-01-spn-00-div-00 div img');
			var btn_00_spn_00_div_01_spn_00_div_00 = document.querySelector('#div-01-spn-00-div-00 span button');
			

			var bcr = document.querySelector('#div-01-spn-00-div-00 span span').getBoundingClientRect();
			var slider_width = document.querySelector('#div-01-spn-00-div-00 span span').clientWidth;
			btn_00_spn_00_div_01_spn_00_div_00.style.left = div_01_spn_00_div_00.t * slider_width + (bcr.left - div_01_spn_00_div_00.querySelector('span').getBoundingClientRect().left) + 'px';
			
			img_00_div_00_div_01_spn_00_div_00.style.height = '';
			img_00_div_00_div_01_spn_00_div_00.style.width = '';
			
			if(img_00_div_00_div_01_spn_00_div_00.naturalHeight/img_00_div_00_div_01_spn_00_div_00.naturalWidth < 1){
				img_00_div_00_div_01_spn_00_div_00.style.height = (13000/150 * (div_01_spn_00_div_00.t * 2 + 1)) + '%';
			} else {
				img_00_div_00_div_01_spn_00_div_00.style.width = (13000/300 * (div_01_spn_00_div_00.t * 2 + 1)) + '%';
			}
			
			img_00_div_00_div_01_spn_00_div_00.style.left = 'calc(50% - ' + div_01_spn_00_div_00.center_x * img_00_div_00_div_01_spn_00_div_00.clientWidth + 'px)';
			img_00_div_00_div_01_spn_00_div_00.style.top = 'calc(50% - ' + div_01_spn_00_div_00.center_y * img_00_div_00_div_01_spn_00_div_00.clientHeight + 'px)';
		});
	}
	
	
	function SetCoverImage(file, img){
		var fr = new FileReader();
		//when finished, create upload object and begin xhr process
		fr.addEventListener("load", function () {
			img.src = fr.result;
		}, false);
		//when completed read request, file is represented using url
		fr.readAsDataURL(file);
		
		img.addEventListener("load", function(){
			var img_00_div_00_div_02_spn_00_div_00 = document.querySelector('#div-02-spn-00-div-00 div img');
			var btn_00_spn_00_div_02_spn_00_div_00 = document.querySelector('#div-02-spn-00-div-00 span button');
			

			var bcr = document.querySelector('#div-02-spn-00-div-00 span span').getBoundingClientRect();
			var slider_width = document.querySelector('#div-02-spn-00-div-00 span span').clientWidth;
			btn_00_spn_00_div_02_spn_00_div_00.style.left = div_02_spn_00_div_00.t * slider_width + (bcr.left - div_02_spn_00_div_00.querySelector('span').getBoundingClientRect().left) + 'px';
			
			img_00_div_00_div_02_spn_00_div_00.style.height = '';
			img_00_div_00_div_02_spn_00_div_00.style.width = '';
			
			if(img_00_div_00_div_02_spn_00_div_00.naturalHeight/img_00_div_00_div_02_spn_00_div_00.naturalWidth < (document.querySelector('#div-02-spn-00-div-00 svg').clientHeight * 100/150)/(document.querySelector('#div-02-spn-00-div-00 svg').clientWidth * 200/300)){
				img_00_div_00_div_02_spn_00_div_00.style.height = (10000/150 * (div_02_spn_00_div_00.t * 2 + 1)) + '%';
			} else {
				img_00_div_00_div_02_spn_00_div_00.style.width = (20000/300 * (div_02_spn_00_div_00.t * 2 + 1)) + '%';
			}
			
			img_00_div_00_div_02_spn_00_div_00.style.left = 'calc(50% - ' + div_02_spn_00_div_00.center_x * img_00_div_00_div_02_spn_00_div_00.clientWidth + 'px)';
			img_00_div_00_div_02_spn_00_div_00.style.top = 'calc(50% - ' + div_02_spn_00_div_00.center_y * img_00_div_00_div_02_spn_00_div_00.clientHeight + 'px)';
		});
	}
	
	function UploadProfileXHR(){
				
		var files = div_01_spn_00_div_00.querySelector('input').files;
		
		if (FileReader && files && files.length > 0) {
			var form_data = new FormData();
			form_data.append('file', div_01_spn_00_div_00.querySelector('input').files[0]);
		}
			
		div_01_spn_00_div_00.style.filter = 'contrast(0.6) brightness(1.3)';
		div_01_spn_00_div_00.style.pointerEvents = 'none';

		var url = DOCUMENT_ROOT + 'processes/upload-profile-image.php';

		var xhr = new XMLHttpRequest();

		var scale = div_01_spn_00_div_00.t * 2 + 1;
		var center_x = div_01_spn_00_div_00.center_x;
		var center_y = div_01_spn_00_div_00.center_y;
		
		document.querySelector('.div-01-div-00-div-01-div-00-div-01-div-00 img').style.opacity = '0';
		document.querySelector('#spn-00-div-00-h-div-00 img').style.opacity = '0';
		document.querySelector('#img-00-spn-00-div-01-div-00-a-hea-00').style.opacity = '0';

		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				
				var child = div_01_spn_00_div_00.querySelector('input');
				var parent = child.parentNode;
				parent.removeChild(child);
				
				var insert = document.createElement('input');
				insert.type = 'file';
				parent.appendChild(insert);
				
				div_01_spn_00_div_00.querySelector('#div-01-spn-00-div-00 input').addEventListener('change', function(){
					var files = this.files;
					if (FileReader && files && files.length > 0) {
						//iterate through files and add to queue, create new array without first file
						const validImageTypes = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png'];
						if(validImageTypes.includes(files[0].type)){
							div_01_spn_00_div_00.t = 0;
							div_01_spn_00_div_00.center_x = 0.5;
							div_01_spn_00_div_00.center_y = 0.5;
							div_01_spn_00_div_00.last_center_x = 0.5;
							div_01_spn_00_div_00.last_center_y = 0.5;
							SetProfileImage(files[0], div_01_spn_00_div_00.querySelector('img'));
						} else {
							//invalid image type
						}
					}
				});
				
				div_01_spn_00_div_00.style.display = 'none';
				spn_00_div_00.style.display = 'none';
				document.querySelector('.div-01-div-00-div-01-div-00-div-01-div-00 img').src = xhr.responseText;
				
				document.querySelector('.div-01-div-00-div-01-div-00-div-01-div-00 img').onload = function(){
					
					document.querySelector('.div-01-div-00-div-01-div-00-div-01-div-00 img').style.opacity = '';
					
					document.querySelector('.div-01-div-00-div-01-div-00-div-01-div-00 img').style.height = '';
					document.querySelector('.div-01-div-00-div-01-div-00-div-01-div-00 img').style.width = '';
					
					if(document.querySelector('.div-01-div-00-div-01-div-00-div-01-div-00 img').naturalHeight/document.querySelector('.div-01-div-00-div-01-div-00-div-01-div-00 img').naturalWidth < 1){
						document.querySelector('.div-01-div-00-div-01-div-00-div-01-div-00 img').style.height = scale * 100 + '%';
					} else {
						document.querySelector('.div-01-div-00-div-01-div-00-div-01-div-00 img').style.width = scale * 100 + '%';
					}
					document.querySelector('.div-01-div-00-div-01-div-00-div-01-div-00 img').style.left = 'calc(50% - ' + Math.min(Math.max(center_x * document.querySelector('.div-01-div-00-div-01-div-00-div-01-div-00 img').clientWidth,document.querySelector('.div-01-div-00-div-01-div-00-div-01-div-00 span').clientWidth/2),document.querySelector('.div-01-div-00-div-01-div-00-div-01-div-00 img').clientWidth - document.querySelector('.div-01-div-00-div-01-div-00-div-01-div-00 span').clientWidth/2) + 'px)';
					document.querySelector('.div-01-div-00-div-01-div-00-div-01-div-00 img').style.top = 'calc(50% - ' + Math.min(Math.max(center_y * document.querySelector('.div-01-div-00-div-01-div-00-div-01-div-00 img').clientHeight,document.querySelector('.div-01-div-00-div-01-div-00-div-01-div-00 span').clientHeight/2),document.querySelector('.div-01-div-00-div-01-div-00-div-01-div-00 img').clientHeight - document.querySelector('.div-01-div-00-div-01-div-00-div-01-div-00 span').clientHeight/2) + 'px)';
					document.querySelector('.div-01-div-00-div-01-div-00-div-01-div-00 img').onload = '';
				}

				document.querySelector('#img-00-spn-00-div-01-div-00-a-hea-00').src = xhr.responseText;
				document.querySelector('#img-00-spn-00-div-01-div-00-a-hea-00').onload = function(){
					
					document.querySelector('#img-00-spn-00-div-01-div-00-a-hea-00').style.opacity = '';
					
					if(document.querySelector('#img-00-spn-00-div-01-div-00-a-hea-00').naturalHeight/document.querySelector('#img-00-spn-00-div-01-div-00-a-hea-00').naturalWidth < 1){
						document.querySelector('#img-00-spn-00-div-01-div-00-a-hea-00').style.height = scale * 100 + '%';
					} else {
						document.querySelector('#img-00-spn-00-div-01-div-00-a-hea-00').style.width = scale * 100 + '%';
					}
					document.querySelector('#img-00-spn-00-div-01-div-00-a-hea-00').style.left = 'calc(50% - ' + Math.min(Math.max(center_x * document.querySelector('#img-00-spn-00-div-01-div-00-a-hea-00').clientWidth,document.querySelector('#div-01-div-00-a-hea-00 span').clientWidth/2),document.querySelector('#img-00-spn-00-div-01-div-00-a-hea-00').clientWidth - document.querySelector('#div-01-div-00-a-hea-00 span').clientWidth/2) + 'px)';
					document.querySelector('#img-00-spn-00-div-01-div-00-a-hea-00').style.top = 'calc(50% - ' + Math.min(Math.max(center_y * document.querySelector('#img-00-spn-00-div-01-div-00-a-hea-00').clientHeight,document.querySelector('#div-01-div-00-a-hea-00 span').clientWidth/2),document.querySelector('#img-00-spn-00-div-01-div-00-a-hea-00').clientHeight - document.querySelector('#div-01-div-00-a-hea-00 span').clientWidth/2) + 'px)';
					document.querySelector('#img-00-spn-00-div-01-div-00-a-hea-00').onload = '';
				}

				document.querySelector('#spn-00-div-00-h-div-00 img').src = xhr.responseText;
				document.querySelector('#spn-00-div-00-h-div-00 img').onload = function(){
					
					document.querySelector('#spn-00-div-00-h-div-00 img').style.opacity = '';
					   
					if(document.querySelector('#div-01-div-00-a-hea-00').state === 0){
						document.querySelector('#h-div-00').style.transition = '0s';
						document.querySelector('#h-div-00').style.transform = 'scale(1)';
						document.querySelector('#h-div-00').style.display = '';
						document.querySelector('#h-div-00').style.opacity = 1;
					}
					if(document.querySelector('#spn-00-div-00-h-div-00 img').naturalHeight/document.querySelector('#spn-00-div-00-h-div-00 img').naturalWidth < 1){
						document.querySelector('#spn-00-div-00-h-div-00 img').style.height = scale * 100 + '%';
					} else {
						document.querySelector('#spn-00-div-00-h-div-00 img').style.width = scale * 100 + '%';
					}
					document.querySelector('#spn-00-div-00-h-div-00 img').style.left = 'calc(50% - ' + Math.min(Math.max(center_x * document.querySelector('#spn-00-div-00-h-div-00 img').clientWidth,document.querySelector('#spn-00-div-00-h-div-00').clientWidth/2),document.querySelector('#spn-00-div-00-h-div-00 img').clientWidth - document.querySelector('#spn-00-div-00-h-div-00').clientWidth/2) + 'px)';
					document.querySelector('#spn-00-div-00-h-div-00 img').style.top = 'calc(50% - ' + Math.min(Math.max(center_y * document.querySelector('#spn-00-div-00-h-div-00 img').clientHeight,document.querySelector('#spn-00-div-00-h-div-00').clientHeight/2),document.querySelector('#spn-00-div-00-h-div-00 img').clientHeight - document.querySelector('#spn-00-div-00-h-div-00').clientHeight/2) + 'px)';
					document.querySelector('#spn-00-div-00-h-div-00 img').onload = '';
					if(document.querySelector('#div-01-div-00-a-hea-00').state === 0){
						document.querySelector('#h-div-00').style.transform = '';
						document.querySelector('#h-div-00').style.display = 'none';
						document.querySelector('#h-div-00').style.opacity = 0;
						document.querySelector('#h-div-00').style.transition = '';
					}
				};
			}
		};

		xhr.upload.onprogress = function(e){
			UploadProgress(div_01_spn_00_div_00, e);
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
	
	
	
	
	function UploadCoverXHR(){
				
		var files = div_02_spn_00_div_00.querySelector('input').files;
		
		if (FileReader && files && files.length > 0) {
			var form_data = new FormData();
			form_data.append('file', div_02_spn_00_div_00.querySelector('input').files[0]);
		}
			
		div_02_spn_00_div_00.style.filter = 'contrast(0.6) brightness(1.3)';
		div_02_spn_00_div_00.style.pointerEvents = 'none';

		var url = DOCUMENT_ROOT + 'processes/upload-cover-image.php';


		var xhr = new XMLHttpRequest();

		var img_00_div_00_div_02_spn_00_div_00 = document.querySelector('#div-02-spn-00-div-00 div img');

		var scale = div_02_spn_00_div_00.t * 2 + 1;
		var center_x = div_02_spn_00_div_00.center_x;
		var center_y = div_02_spn_00_div_00.center_y;
		
		document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').style.opacity = '0';

		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				
				var child = div_02_spn_00_div_00.querySelector('input');
				var parent = child.parentNode;
				parent.removeChild(child);
				
				var insert = document.createElement('input');
				insert.type = 'file';
				parent.appendChild(insert);
				
				div_02_spn_00_div_00.querySelector('#div-02-spn-00-div-00 input').addEventListener('change', function(){
					var files = this.files;
					if (FileReader && files && files.length > 0) {
						//iterate through files and add to queue, create new array without first file
						const validImageTypes = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png'];
						if(validImageTypes.includes(files[0].type)){
							div_02_spn_00_div_00.t = 0;
							div_02_spn_00_div_00.center_x = 0.5;
							div_02_spn_00_div_00.center_y = 0.5;
							div_02_spn_00_div_00.last_center_x = 0.5;
							div_02_spn_00_div_00.last_center_y = 0.5;
							SetCoverImage(files[0], div_02_spn_00_div_00.querySelector('img'));
						} else {
							//invalid image type
						}
					}
				});
				
				div_02_spn_00_div_00.style.display = 'none';
				spn_00_div_00.style.display = 'none';
				document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').src = xhr.responseText;
				
				document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').onload = function(){
					
					document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').style.opacity = '';
					
					document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').style.height = '';
					document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').style.width = '';
					
					if(document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').naturalHeight/document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').naturalWidth < document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00').clientHeight/document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00').clientWidth){
						document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').style.height = scale * 100 + '%';
					} else {
						document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').style.width = scale * 100 + '%';
					}
					document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').style.left = 'calc(50% - ' + Math.min(Math.max(center_x * document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').clientWidth,0),document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').clientWidth/2) + 'px)';
					document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').style.top = 'calc(50% - ' + Math.min(Math.max(center_y * document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').clientHeight,0),document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').clientHeight/2) + 'px)';
					document.querySelector('.div-00-div-00-div-01-div-00-div-01-div-00 img').onload = '';
				};
			}
		};

		xhr.upload.onprogress = function(e){
			UploadProgress(div_02_spn_00_div_00, e);
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

DetailsAndProfile_js();