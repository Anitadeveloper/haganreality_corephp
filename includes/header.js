// JavaScript Document

function Header_js () {
	"use strict";
	var startTime;
	var time;
	var scrollY;
	
	var load = true;
	
	var header_state = 0;
	
	var div_00_hea_00 = document.querySelector('#div-00-hea-00');
	var img_00_div_00_hea_00 = document.querySelector('#img-00-div-00-hea-00');
	var h1_00_div_00_hea_00 = document.querySelector('#h1-00-div-00-hea-00');
	
	var div_00_div_00_hea_00 = document.querySelector('#div-00-div-00-hea-00');
	var div_01_div_00_hea_00 = document.querySelector('#div-01-div-00-hea-00');
	var div_02_div_00_hea_00 = document.querySelector('#div-02-div-00-hea-00');
	var div_03_div_00_hea_00 = document.querySelector('#div-03-div-00-hea-00');
	var div_04_div_00_hea_00 = document.querySelector('#div-04-div-00-hea-00');
	var div_05_div_00_hea_00 = document.querySelector('#div-05-div-00-hea-00');
	var svg_00_div_00_hea_00 = document.querySelector('#svg-00-div-00-hea-00');
	var svg_01_div_00_hea_00 = document.querySelector('#svg-01-div-00-hea-00');
	
	function Main(){
		window.requestAnimationFrame(function(timestamp){
			
			Main();
			
			MenuBar();
			
		});
	}

		
	function MenuBar(){
				
		if(window.innerWidth > 850){
			header_state = 3;
			
			img_00_div_00_hea_00.style.opacity = '1';
			img_00_div_00_hea_00.style.pointerEvents = '';
			h1_00_div_00_hea_00.style.opacity = '1';
			h1_00_div_00_hea_00.style.pointerEvents = '';
			
			div_00_div_00_hea_00.style.opacity = '1';
			div_00_div_00_hea_00.style.pointerEvents = '';
			div_00_div_00_hea_00.style.transform = 'translate(0)';
			div_01_div_00_hea_00.style.opacity = '1';
			div_01_div_00_hea_00.style.pointerEvents = '';
			div_01_div_00_hea_00.style.transform = 'translate(0)';
			div_02_div_00_hea_00.style.opacity = '1';
			div_02_div_00_hea_00.style.pointerEvents = '';
			div_02_div_00_hea_00.style.transform = 'translate(0)';
			div_03_div_00_hea_00.style.opacity = '1';
			div_03_div_00_hea_00.style.pointerEvents = '';
			div_03_div_00_hea_00.style.transform = 'translate(0)';
			div_04_div_00_hea_00.style.opacity = '1';
			div_04_div_00_hea_00.style.pointerEvents = '';
			div_04_div_00_hea_00.style.transform = 'translate(0)';
			div_05_div_00_hea_00.style.opacity = '1';
			div_05_div_00_hea_00.style.pointerEvents = '';
			div_05_div_00_hea_00.style.transform = 'translate(0)';
			svg_00_div_00_hea_00.style.display = 'none';
			svg_00_div_00_hea_00.style.opacity = '0';
			svg_01_div_00_hea_00.style.display = 'none';
			svg_01_div_00_hea_00.style.opacity = '0';
			
		} else if(header_state === 3) {
			header_state = 2;
		}
		
		if(header_state === 2){
			div_00_div_00_hea_00.style.transition = '0s';
			div_01_div_00_hea_00.style.transition = '0s';
			div_02_div_00_hea_00.style.transition = '0s';
			div_03_div_00_hea_00.style.transition = '0s';
			div_04_div_00_hea_00.style.transition = '0s';
			div_05_div_00_hea_00.style.transition = '0s';
			div_00_div_00_hea_00.style.opacity = '0';
			div_01_div_00_hea_00.style.opacity = '0';
			div_02_div_00_hea_00.style.opacity = '0';
			div_03_div_00_hea_00.style.opacity = '0';
			div_04_div_00_hea_00.style.opacity = '0';
			div_05_div_00_hea_00.style.opacity = '0';
			
			header_state = 0;
			
			window.setTimeout(function(){
				div_00_div_00_hea_00.style.transition = '0.5s';
				div_01_div_00_hea_00.style.transition = '0.5s';
				div_02_div_00_hea_00.style.transition = '0.5s';
				div_03_div_00_hea_00.style.transition = '0.5s';
				div_04_div_00_hea_00.style.transition = '0.5s';
				div_05_div_00_hea_00.style.transition = '0.5s';
			}, 1);
			
		} else if(header_state === 1){
			//set icons to reveal
			div_00_div_00_hea_00.style.transition = '0.5s';
			div_01_div_00_hea_00.style.transition = '0.5s';
			div_02_div_00_hea_00.style.transition = '0.5s';
			div_03_div_00_hea_00.style.transition = '0.5s';
			div_04_div_00_hea_00.style.transition = '0.5s';
			div_05_div_00_hea_00.style.transition = '0.5s';
			
			img_00_div_00_hea_00.style.opacity = '0';
			img_00_div_00_hea_00.style.pointerEvents = 'none';
			h1_00_div_00_hea_00.style.opacity = '0';
			h1_00_div_00_hea_00.style.pointerEvents = 'none';
			img_00_div_00_hea_00.style.transitionDelay = '0s';
			h1_00_div_00_hea_00.style.transitionDelay = '0s';
			div_00_hea_00.style.maxHeight = '140px';
			div_00_hea_00.style.transitionDelay = '1s';
			
			div_00_div_00_hea_00.style.opacity = '1';
			div_00_div_00_hea_00.style.pointerEvents = '';
			div_00_div_00_hea_00.style.transform = 'translate(0)';
			div_00_div_00_hea_00.style.transitionDelay = '0.25s';
			div_01_div_00_hea_00.style.opacity = '1';
			div_01_div_00_hea_00.style.pointerEvents = '';
			div_01_div_00_hea_00.style.transform = 'translate(0)';
			div_01_div_00_hea_00.style.transitionDelay = '0.5s';
			div_02_div_00_hea_00.style.opacity = '1';
			div_02_div_00_hea_00.style.pointerEvents = '';
			div_02_div_00_hea_00.style.transform = 'translate(0)';
			div_02_div_00_hea_00.style.transitionDelay = '0.75s';
			div_03_div_00_hea_00.style.opacity = '1';
			div_03_div_00_hea_00.style.pointerEvents = '';
			div_03_div_00_hea_00.style.transform = 'translate(0)';
			div_03_div_00_hea_00.style.transitionDelay = '1s';
			div_04_div_00_hea_00.style.opacity = '1';
			div_04_div_00_hea_00.style.pointerEvents = '';
			div_04_div_00_hea_00.style.transform = 'translate(0)';
			div_04_div_00_hea_00.style.transitionDelay = '1.25s';
			div_05_div_00_hea_00.style.opacity = '1';
			div_05_div_00_hea_00.style.pointerEvents = '';
			div_05_div_00_hea_00.style.transform = 'translate(0)';
			div_05_div_00_hea_00.style.transitionDelay = '1.5s';
			
			svg_00_div_00_hea_00.style.display = '';
			svg_00_div_00_hea_00.style.opacity = '0';
			svg_00_div_00_hea_00.style.pointerEvents = 'none';
			svg_01_div_00_hea_00.style.display = '';
			svg_01_div_00_hea_00.style.opacity = '1';
			svg_01_div_00_hea_00.style.pointerEvents = '';
			
		} else if(header_state === 0){
			
			//set icons to hidden
			img_00_div_00_hea_00.style.opacity = '1';
			img_00_div_00_hea_00.style.pointerEvents = '';
			h1_00_div_00_hea_00.style.opacity = '1';
			h1_00_div_00_hea_00.style.pointerEvents = '';
			img_00_div_00_hea_00.style.transitionDelay = '1s';
			h1_00_div_00_hea_00.style.transitionDelay = '1s';
			div_00_hea_00.style.maxHeight = '70px';
			div_00_hea_00.style.transitionDelay = '1s';
			
			div_00_div_00_hea_00.style.opacity = '0';
			div_00_div_00_hea_00.style.pointerEvents = 'none';
			div_00_div_00_hea_00.style.transform = 'translate(20px)';
			div_00_div_00_hea_00.style.transitionDelay = '1.5s';
			div_01_div_00_hea_00.style.opacity = '0';
			div_01_div_00_hea_00.style.pointerEvents = 'none';
			div_01_div_00_hea_00.style.transform = 'translate(20px)';
			div_01_div_00_hea_00.style.transitionDelay = '1.25s';
			div_02_div_00_hea_00.style.opacity = '0';
			div_02_div_00_hea_00.style.pointerEvents = 'none';
			div_02_div_00_hea_00.style.transform = 'translate(20px)';
			div_02_div_00_hea_00.style.transitionDelay = '1s';
			div_03_div_00_hea_00.style.opacity = '0';
			div_03_div_00_hea_00.style.pointerEvents = 'none';
			div_03_div_00_hea_00.style.transform = 'translate(20px)';
			div_03_div_00_hea_00.style.transitionDelay = '0.75s';
			div_04_div_00_hea_00.style.opacity = '0';
			div_04_div_00_hea_00.style.pointerEvents = 'none';
			div_04_div_00_hea_00.style.transform = 'translate(20px)';
			div_04_div_00_hea_00.style.transitionDelay = '0.5s';
			div_05_div_00_hea_00.style.opacity = '0';
			div_05_div_00_hea_00.style.pointerEvents = 'none';
			div_05_div_00_hea_00.style.transform = 'translate(20px)';
			div_05_div_00_hea_00.style.transitionDelay = '0.25s';
			
			svg_00_div_00_hea_00.style.display = '';
			svg_00_div_00_hea_00.style.opacity = '1';
			svg_00_div_00_hea_00.style.pointerEvents = '';
			svg_01_div_00_hea_00.style.display = '';
			svg_01_div_00_hea_00.style.opacity = '0';
			svg_01_div_00_hea_00.style.pointerEvents = 'none';

		}
	}


	function Initialisation(){
		
		//vars
		startTime = new Date().getTime();
		time = {start : startTime, now : startTime, deltaTime : 0};
		scrollY = 0;
		
		svg_00_div_00_hea_00.addEventListener('click', function(){
			header_state = 1;
		});
		
		svg_01_div_00_hea_00.addEventListener('click', function(){
			header_state = 0;
		});
		
	}

	Initialisation();

	Main();
}


Header_js();