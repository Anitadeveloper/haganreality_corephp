// JavaScript Document
/* jshint esversion: 6 */

function Property_js () {
	"use strict";
	var startTime;
	var time;
	var scroll_y;
	var mouse_pos = {x:0,y:0};
	
	var load = true;
	
	var html = document.body.parentNode;

	var data_arr = [];
			
	const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const weekNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
	
	var div_00_div_00_div_00;
	
	var Sections = [];

	function Main(){
		window.requestAnimationFrame(function(timestamp){
			if(load === true && document.body.id === "property"){
				Initialisation();
				load = false;
			}
			
			if(startTime !== undefined && document.body.id === "property"){
				time.deltaTime = time.start + timestamp - time.now;
				time.now = time.start + timestamp;
				scroll_y = window.pageYOffset || document.documentElement.scrollTop || window.scrollY;
				
				if(SITE_ID > 0){
					Sections_Runtime();
					ScrollToSection();
				}
			}
			
			Main();
		});
	}
	
	function F1(x){
		return (-((x-1) * (x-1)) + 1);
	}
	
	
	function ScrollToSection(){
		//scroll to t value
		if(div_00_div_00_div_00.scroll === true){
			if(div_00_div_00_div_00.scroll_t === 0){
				div_00_div_00_div_00.scroll_last = scroll_y;
			}
						
			//prevent scrolling temporarily
			html.style.overflow = 'hidden';
			div_00_div_00_div_00.scroll_t = Math.min(div_00_div_00_div_00.scroll_t + time.deltaTime/1000/div_00_div_00_div_00.scroll_duration, 1);
			window.scroll(0, (div_00_div_00_div_00.scroll_target - div_00_div_00_div_00.scroll_last) * F1(div_00_div_00_div_00.scroll_t) + div_00_div_00_div_00.scroll_last);
		}
		
		//if not moving layer, and scroll t = 1
		if(div_00_div_00_div_00.scroll_t === 1 && div_00_div_00_div_00.scroll === true){
			div_00_div_00_div_00.scroll = false;
			html.style.overflow = '';
		}
	}
	
	function Sections_Runtime(){
		for(var i = Sections.length - 1; i >=0; i--){
			if(Sections[i].data.type === 0){
				Sec_00(Sections[i], i);
			} else if(Sections[i].data.type === 2){
				Sec_02(Sections[i]);
			} else if(Sections[i].data.type === 3){
				Sec_03(Sections[i]);
			} else if(Sections[i].data.type === 4){
				Sec_04(Sections[i]);
			} else if(Sections[i].data.type === 5){
				Sec_05(Sections[i]);
			} else if(Sections[i].data.type === 6){
				Sec_06(Sections[i]);
			} else if(Sections[i].data.type === 7){
				Sec_07(Sections[i]);
			} else if(Sections[i].data.type === 8){
				Sec_08(Sections[i]);
			} else if(Sections[i].data.type === 9){
				Sec_09(Sections[i]);
			} else if(Sections[i].data.type === 11){
				Sec_11(Sections[i]);
			} else if(Sections[i].data.type === 12){
				Sec_12(Sections[i]);
			}
		}
	}
	
	function Sec_00(section, position){
		//parallax effect
		var top_val;
		if(position !== 0){
			top_val = Math.min(Math.max((section.obj.getBoundingClientRect().top + section.obj.clientHeight)/(window.innerHeight + section.obj.clientHeight), 0), 1);
			section.obj.querySelector('.div-00-sec-00-div-00-div-00-div-00').style.transform = 'translate(0, ' + (-top_val * 40) + 'vh)';
		} else {
			top_val = Math.max(Math.min((section.obj.getBoundingClientRect().top)/(window.innerHeight), 0), -1);
			section.obj.querySelector('.div-00-sec-00-div-00-div-00-div-00').style.transform = 'translate(0, ' + (-top_val * 20) + 'vh)';
		}
	}
	
	
	function Sec_02(section){
		//header icon
		document.querySelector('#div-05-div-00-hea-00').t_val = scroll_y + section.obj.getBoundingClientRect().top;
	}

	function Sec_03(section){
		//parallax effect
		var top_val = Math.min(Math.max((section.obj.getBoundingClientRect().top + section.obj.clientHeight)/(window.innerHeight + section.obj.clientHeight), 0), 1);
		section.obj.querySelector('.div-00-sec-03-div-00-div-00-div-00').style.transform = 'translate(0, ' + (-top_val * 200) + 'px)';
	}
	
	function Sec_04(section){
		//fade galleries in and out
		var gallery = section.obj.querySelectorAll('.div-00-div-01-sec-04-div-00-div-00-div-00');
		for(var i = 0; i < gallery.length; i++){
			if(gallery[i].t < gallery[i].target_t){
				gallery[i].t = Math.min(gallery[i].t + time.deltaTime/250, gallery[i].target_t);
			}
			if(gallery[i].t > gallery[i].target_t){
				gallery[i].t = Math.max(gallery[i].t - time.deltaTime/250, gallery[i].target_t);
			}
			
			gallery[i].style.opacity = Math.max(gallery[i].t - 1, 0);
						
			if(gallery[i].t <= 1){
				gallery[i].style.display = 'none';
			} else {
				gallery[i].style.display = '';
			}
			
			
			//move images in galleries
			for(var j = 0; j < gallery[i].images.length; j++){
				if(window.innerWidth > 800){
					gallery[i].images[j].style.left = (-gallery[i].active_image + j) * 660 + 'px';
				} else {
					gallery[i].images[j].style.left = (-gallery[i].active_image + j) * 100 + '%';
				}

				//scale images
				if(j === gallery[i].active_image){
					gallery[i].images[j].style.transform = 'scale(1.05)';
					//set description
					gallery[i].descriptions[j].style.opacity = '1';
					gallery[i].descriptions[j].style.transitionDelay = '0.5s';
					gallery[i].descriptions[j].style.pointerEvents = '';

					//set image counter
					gallery[i].querySelector('.lbl-00-div-01-sec-04-div-00-div-00-div-00').innerHTML = 'Image ' + (gallery[i].active_image + 1) + ' of ' + (gallery[i].images.length);
					gallery[i].querySelector('.lbl-00-div-01-sec-04-div-00-div-00-div-00').style.opacity = 1;
				} else {
					gallery[i].images[j].style.transform = '';
					
					gallery[i].descriptions[j].style.opacity = '0';
					gallery[i].descriptions[j].style.transition = '';
					gallery[i].descriptions[j].style.pointerEvents = 'none';
				}
			}
			
			//make back arrow visible if not at the start
			if(gallery[i].querySelector('.svg-02-div-02-div-01-sec-04-div-00-div-00-div-00') && gallery[i].active_image !== 0){
				gallery[i].querySelector('.svg-02-div-02-div-01-sec-04-div-00-div-00-div-00').setAttribute('class', 'svg-00-div-02-div-01-sec-04-div-00-div-00-div-00');
			}
			//otherwise hide
			if(gallery[i].querySelector('.svg-00-div-02-div-01-sec-04-div-00-div-00-div-00') && gallery[i].active_image === 0){
				gallery[i].querySelector('.svg-00-div-02-div-01-sec-04-div-00-div-00-div-00').setAttribute('class', 'svg-02-div-02-div-01-sec-04-div-00-div-00-div-00');
			}
			//make forward arrow visible if not at the end
			if(gallery[i].querySelector('.svg-03-div-02-div-01-sec-04-div-00-div-00-div-00') && gallery[i].active_image !== gallery[i].images.length - 1){
				gallery[i].querySelector('.svg-03-div-02-div-01-sec-04-div-00-div-00-div-00').setAttribute('class', 'svg-01-div-02-div-01-sec-04-div-00-div-00-div-00');
			}
			//otherwise hide
			if(gallery[i].querySelector('.svg-01-div-02-div-01-sec-04-div-00-div-00-div-00') && gallery[i].active_image === gallery[i].images.length - 1){
				gallery[i].querySelector('.svg-01-div-02-div-01-sec-04-div-00-div-00-div-00').setAttribute('class', 'svg-03-div-02-div-01-sec-04-div-00-div-00-div-00');
			}
		}
		
		
		//header icon
		document.querySelector('#div-04-div-00-hea-00').t_val = scroll_y + section.obj.getBoundingClientRect().top;
	}
	
	function Sec_05(section){
		//header icon
		document.querySelector('#div-03-div-00-hea-00').t_val = scroll_y + section.obj.getBoundingClientRect().top;
	}
	
	function Sec_06(section){
		//fade galleries in and out
		var viewports = section.obj.querySelectorAll('.div-00-div-01-sec-06-div-00-div-00-div-00');
		for(var i = 0; i < viewports.length; i++){
			if(viewports[i].t < viewports[i].target_t){
				viewports[i].t = Math.min(viewports[i].t + time.deltaTime/250, viewports[i].target_t);
			}
			if(viewports[i].t > viewports[i].target_t){
				viewports[i].t = Math.max(viewports[i].t - time.deltaTime/250, viewports[i].target_t);
			}
			
			viewports[i].style.opacity = Math.max(viewports[i].t - 1, 0);
			
			if(viewports[i].t <= 1){
				viewports[i].style.display = 'none';
			} else {
				viewports[i].style.display = '';
			}
		}
		
		
		//header icon
		document.querySelector('#div-02-div-00-hea-00').t_val = scroll_y + section.obj.getBoundingClientRect().top;
	}
	
	function Sec_07(section){
		//fade galleries in and out
		var container = section.obj;
			
		//move images in galleries
		for(var j = 0; j < container.floorplans.length; j++){
			if(window.innerWidth > 800){
				container.floorplans[j].style.left = (-container.active_floorplan + j) * 660 + 300 + 'px';
			} else {
				container.floorplans[j].style.left = (-container.active_floorplan + j) * 100 + 50 + 'vw';
			}
			//scale images
			if(j === container.active_floorplan){
				container.floorplans[j].style.transform = 'translate(-50%, -50%) scale(1.05)';
				//set description
				container.titles[j].style.opacity = '1';
				container.titles[j].style.transitionDelay = '0.5s';
				container.titles[j].style.pointerEvents = '';

				//set image counter
				container.querySelector('.lbl-00-div-00-sec-07-div-00-div-00-div-00').innerHTML = 'Floorplan ' + (container.active_floorplan + 1) + ' of ' + (container.floorplans.length);
				container.querySelector('.lbl-00-div-00-sec-07-div-00-div-00-div-00').style.opacity = 1;
			} else {
				container.floorplans[j].style.transform = '';

				container.titles[j].style.opacity = '0';
				container.titles[j].style.transition = '';
				container.titles[j].style.pointerEvents = 'none';
			}
		}

		//make back arrow visible if not at the start
		if(container.querySelector('.svg-02-div-01-div-00-sec-07-div-00-div-00-div-00') && container.active_floorplan !== 0){
			container.querySelector('.svg-02-div-01-div-00-sec-07-div-00-div-00-div-00').setAttribute('class', 'svg-00-div-01-div-00-sec-07-div-00-div-00-div-00');
		}
		//otherwise hide
		if(container.querySelector('.svg-00-div-01-div-00-sec-07-div-00-div-00-div-00') && container.active_floorplan === 0){
			container.querySelector('.svg-00-div-01-div-00-sec-07-div-00-div-00-div-00').setAttribute('class', 'svg-02-div-01-div-00-sec-07-div-00-div-00-div-00');
		}
		//make forward arrow visible if not at the end
		if(container.querySelector('.svg-03-div-01-div-00-sec-07-div-00-div-00-div-00') && container.active_floorplan !== container.floorplans.length - 1){
			container.querySelector('.svg-03-div-01-div-00-sec-07-div-00-div-00-div-00').setAttribute('class', 'svg-01-div-01-div-00-sec-07-div-00-div-00-div-00');
		}
		//otherwise hide
		if(container.querySelector('.svg-01-div-01-div-00-sec-07-div-00-div-00-div-00') && container.active_floorplan === container.floorplans.length - 1){
			container.querySelector('.svg-01-div-01-div-00-sec-07-div-00-div-00-div-00').setAttribute('class', 'svg-03-div-01-div-00-sec-07-div-00-div-00-div-00');
		}
		
		//header icon
		document.querySelector('#div-01-div-00-hea-00').t_val = scroll_y + section.obj.getBoundingClientRect().top;
	}
	
	function Sec_08(section){
		//fade galleries in and out
		var location = section.obj.querySelectorAll('.div-00-div-01-sec-08-div-00-div-00-div-00');
		for(var i = 0; i < location.length; i++){
			if(location[i].t < location[i].target_t){
				location[i].t = Math.min(location[i].t + time.deltaTime/250, location[i].target_t);
			}
			if(location[i].t > location[i].target_t){
				location[i].t = Math.max(location[i].t - time.deltaTime/250, location[i].target_t);
			}
			
			location[i].style.opacity = Math.max(location[i].t - 1, 0);
			
			if(location[i].t <= 1){
				location[i].style.display = 'none';
			} else {
				location[i].style.display = '';
			}
		}
	}
	
	function Sec_09(section){
		
		if(section.obj.querySelector('.lbl-00-div-02-sec-09-div-00-div-00-div-00').active === true){
			if(window.innerWidth < 1250){
				//make opacity of popup delayed behind slide down
				section.obj.querySelector('.div-06-sec-09-div-00-div-00-div-00').style.marginTop = '280px';
				section.obj.querySelector('.div-06-sec-09-div-00-div-00-div-00').style.transitionDelay = '';
				section.obj.querySelector('.div-04-sec-09-div-00-div-00-div-00').style.transitionDelay = '0.5s';
			} else {
				//large screen, dont do it
				section.obj.querySelector('.div-06-sec-09-div-00-div-00-div-00').style.marginTop = '';
			}
			section.obj.querySelector('.div-04-sec-09-div-00-div-00-div-00').style.opacity = 1;
			section.obj.querySelector('.div-05-sec-09-div-00-div-00-div-00').style.opacity = 0;
			section.obj.querySelector('.div-04-sec-09-div-00-div-00-div-00').style.pointerEvents = '';
			section.obj.querySelector('.div-05-sec-09-div-00-div-00-div-00').style.pointerEvents = 'none';
			if(window.innerWidth > 800){
				section.obj.querySelector('.div-04-sec-09-div-00-div-00-div-00').style.transform = 'translate(0, 0)';
				section.obj.querySelector('.div-05-sec-09-div-00-div-00-div-00').style.transform = 'translate(0, -20px)';
			} else {
				section.obj.querySelector('.div-04-sec-09-div-00-div-00-div-00').style.transform = 'translate(-50%, 0)';
				section.obj.querySelector('.div-05-sec-09-div-00-div-00-div-00').style.transform = 'translate(-50%, -20px)';
			}
			section.obj.querySelector('.lbl-00-div-03-sec-09-div-00-div-00-div-00').active = false;
			section.obj.querySelectorAll('.lbl-00-div-02-sec-09-div-00-div-00-div-00 path')[0].setAttribute('d', 'M 0 2 L 10 2 L 5 8 Z');
			section.obj.querySelectorAll('.lbl-00-div-02-sec-09-div-00-div-00-div-00 path')[1].setAttribute('d', 'M 0 2 L 10 2 L 5 8 Z');
			section.obj.querySelectorAll('.lbl-00-div-03-sec-09-div-00-div-00-div-00 path')[0].setAttribute('d', 'M 0 7 L 10 7 L 5 1 Z');
			section.obj.querySelectorAll('.lbl-00-div-03-sec-09-div-00-div-00-div-00 path')[1].setAttribute('d', 'M 0 7 L 10 7 L 5 1 Z');
			
		} else if(section.obj.querySelector('.lbl-00-div-03-sec-09-div-00-div-00-div-00').active === true){
			if(window.innerWidth < 1250){
				//make opacity of popup delayed behind slide down
				section.obj.querySelector('.div-06-sec-09-div-00-div-00-div-00').style.marginTop = '280px';
				section.obj.querySelector('.div-06-sec-09-div-00-div-00-div-00').style.transitionDelay = '';
				section.obj.querySelector('.div-05-sec-09-div-00-div-00-div-00').style.transitionDelay = '0.5s';
			} else {
				//large screen, dont do it
				section.obj.querySelector('.div-06-sec-09-div-00-div-00-div-00').style.marginTop = '';
			}
			section.obj.querySelector('.div-04-sec-09-div-00-div-00-div-00').style.opacity = 0;
			section.obj.querySelector('.div-05-sec-09-div-00-div-00-div-00').style.opacity = 1;
			section.obj.querySelector('.div-04-sec-09-div-00-div-00-div-00').style.pointerEvents = 'none';
			section.obj.querySelector('.div-05-sec-09-div-00-div-00-div-00').style.pointerEvents = '';
			if(window.innerWidth > 800){
				section.obj.querySelector('.div-04-sec-09-div-00-div-00-div-00').style.transform = 'translate(0, -20px)';
				section.obj.querySelector('.div-05-sec-09-div-00-div-00-div-00').style.transform = 'translate(0, 0)';
			} else {
				section.obj.querySelector('.div-04-sec-09-div-00-div-00-div-00').style.transform = 'translate(-50%, -20px)';
				section.obj.querySelector('.div-05-sec-09-div-00-div-00-div-00').style.transform = 'translate(-50%, 0)';
			}
			section.obj.querySelector('.lbl-00-div-02-sec-09-div-00-div-00-div-00').active = false;
			section.obj.querySelectorAll('.lbl-00-div-02-sec-09-div-00-div-00-div-00 path')[0].setAttribute('d', 'M 0 7 L 10 7 L 5 1 Z');
			section.obj.querySelectorAll('.lbl-00-div-02-sec-09-div-00-div-00-div-00 path')[1].setAttribute('d', 'M 0 7 L 10 7 L 5 1 Z');
			section.obj.querySelectorAll('.lbl-00-div-03-sec-09-div-00-div-00-div-00 path')[0].setAttribute('d', 'M 0 2 L 10 2 L 5 8 Z');
			section.obj.querySelectorAll('.lbl-00-div-03-sec-09-div-00-div-00-div-00 path')[1].setAttribute('d', 'M 0 2 L 10 2 L 5 8 Z');
		} else {
			//make slide down delayed behind opacity
			section.obj.querySelector('.div-06-sec-09-div-00-div-00-div-00').style.marginTop = '';
			section.obj.querySelector('.div-04-sec-09-div-00-div-00-div-00').style.transitionDelay = '';
			section.obj.querySelector('.div-05-sec-09-div-00-div-00-div-00').style.transitionDelay = '';
			section.obj.querySelector('.div-06-sec-09-div-00-div-00-div-00').style.transitionDelay = '0.2s';
			section.obj.querySelector('.div-04-sec-09-div-00-div-00-div-00').style.opacity = 0;
			section.obj.querySelector('.div-05-sec-09-div-00-div-00-div-00').style.opacity = 0;
			section.obj.querySelector('.div-04-sec-09-div-00-div-00-div-00').style.pointerEvents = 'none';
			section.obj.querySelector('.div-05-sec-09-div-00-div-00-div-00').style.pointerEvents = 'none';
			if(window.innerWidth > 800){
				section.obj.querySelector('.div-04-sec-09-div-00-div-00-div-00').style.transform = 'translate(0, -20px)';
				section.obj.querySelector('.div-05-sec-09-div-00-div-00-div-00').style.transform = 'translate(0, -20px)';
			} else {
				section.obj.querySelector('.div-04-sec-09-div-00-div-00-div-00').style.transform = 'translate(-50%, -20px)';
				section.obj.querySelector('.div-05-sec-09-div-00-div-00-div-00').style.transform = 'translate(-50%, -20px)';
			}
			section.obj.querySelector('.lbl-00-div-02-sec-09-div-00-div-00-div-00').active = false;
			section.obj.querySelector('.lbl-00-div-03-sec-09-div-00-div-00-div-00').active = false;
			section.obj.querySelectorAll('.lbl-00-div-02-sec-09-div-00-div-00-div-00 path')[0].setAttribute('d', 'M 0 7 L 10 7 L 5 1 Z');
			section.obj.querySelectorAll('.lbl-00-div-02-sec-09-div-00-div-00-div-00 path')[1].setAttribute('d', 'M 0 7 L 10 7 L 5 1 Z');
			section.obj.querySelectorAll('.lbl-00-div-03-sec-09-div-00-div-00-div-00 path')[0].setAttribute('d', 'M 0 7 L 10 7 L 5 1 Z');
			section.obj.querySelectorAll('.lbl-00-div-03-sec-09-div-00-div-00-div-00 path')[1].setAttribute('d', 'M 0 7 L 10 7 L 5 1 Z');
		}
		
		//header icon
		document.querySelector('#div-00-div-00-hea-00').t_val = scroll_y + section.obj.getBoundingClientRect().top;
		
	}
	
	function Sec_11(section){
		//fade galleries in and out
		var resources = section.obj;
			
		//move images in galleries
		for(var j = 0; j < resources.resources.length; j++){
			resources.resources[j].style.left = (-resources.active_resource + j) * 510 + 'px';
			//scale images
			if(j === resources.active_resource){
				resources.resources[j].style.transform = 'scale(1.05)';
				//set description
				resources.descriptions[j].style.opacity = '1';
				resources.descriptions[j].style.transitionDelay = '0.5s';
				resources.descriptions[j].style.pointerEvents = '';

				//set image counter
				resources.querySelector('.lbl-00-div-00-sec-11-div-00-div-00-div-00').innerHTML = 'File ' + (resources.active_resource + 1) + ' of ' + (resources.resources.length);
				resources.querySelector('.lbl-00-div-00-sec-11-div-00-div-00-div-00').style.opacity = 1;
			} else {
				resources.resources[j].style.transform = '';

				resources.descriptions[j].style.opacity = '0';
				resources.descriptions[j].style.transition = '';
				resources.descriptions[j].style.pointerEvents = 'none';
			}
		}

		//make back arrow visible if not at the start
		if(resources.querySelector('.svg-02-div-01-div-00-sec-11-div-00-div-00-div-00') && resources.active_resource !== 0){
			resources.querySelector('.svg-02-div-01-div-00-sec-11-div-00-div-00-div-00').setAttribute('class', 'svg-00-div-01-div-00-sec-11-div-00-div-00-div-00');
		}
		//otherwise hide
		if(resources.querySelector('.svg-00-div-01-div-00-sec-11-div-00-div-00-div-00') && resources.active_resource === 0){
			resources.querySelector('.svg-00-div-01-div-00-sec-11-div-00-div-00-div-00').setAttribute('class', 'svg-02-div-01-div-00-sec-11-div-00-div-00-div-00');
		}
		//make forward arrow visible if not at the end
		if(resources.querySelector('.svg-03-div-01-div-00-sec-11-div-00-div-00-div-00') && resources.active_resource !== resources.resources.length - 1){
			resources.querySelector('.svg-03-div-01-div-00-sec-11-div-00-div-00-div-00').setAttribute('class', 'svg-01-div-01-div-00-sec-11-div-00-div-00-div-00');
		}
		//otherwise hide
		if(resources.querySelector('.svg-01-div-01-div-00-sec-11-div-00-div-00-div-00') && resources.active_resource === resources.resources.length - 1){
			resources.querySelector('.svg-01-div-01-div-00-sec-11-div-00-div-00-div-00').setAttribute('class', 'svg-03-div-01-div-00-sec-11-div-00-div-00-div-00');
		}
	}
	
	function Sec_12(section){
		
		if(document.querySelector('.t-spn-00-div-00-div-00-div-00')){
			document.querySelector('.t-spn-00-div-00-div-00-div-00').t_val = scroll_y + section.obj.getBoundingClientRect().top;
		} else {
			document.querySelector('.spn-00-div-00-div-00-div-00').t_val = scroll_y + section.obj.getBoundingClientRect().top;
		}
	}
	
	function Initialise_Sec_00(section, data){
		section.querySelector('.img-00-div-00-sec-00-div-00-div-00-div-00').src = data.image_src;
		
		if(data.image_src === DOCUMENT_ROOT + 'images/null.png'){
			section.style.display = 'none';
		}
	}
	
	function Initialise_Sec_01(section, data){
		section.querySelector('.h1-00-div-00-sec-01-div-00-div-00-div-00').innerHTML = data.address;
		section.querySelector('.h2-00-div-00-sec-01-div-00-div-00-div-00').innerHTML = data.city;
		section.querySelector('.h2-01-div-00-sec-01-div-00-div-00-div-00').innerHTML = data.price;
		section.querySelector('.h3-00-div-00-sec-01-div-00-div-00-div-00').innerHTML = data.description;
		
		if(data.address === '' && data.city === '' && data.price === '' && data.description === ''){
			section.style.display = 'none';
		}
	}
	
	function Initialise_Sec_02(section, data){
		
		section.querySelector('.div-01-sec-02-div-00-div-00-div-00').visible_icons = 0;
		
		if(data.bedrooms !== '-1'){
			section.querySelectorAll('.lbl-00-div-00-div-00-div-01-sec-02-div-00-div-00-div-00')[0].innerHTML = data.bedrooms;
			section.querySelector('.div-01-sec-02-div-00-div-00-div-00').visible_icons++;
		} else {
			section.querySelectorAll('.div-00-div-01-sec-02-div-00-div-00-div-00')[0].style.display = 'none';
		}
		
		if(data.fireplaces !== '-1'){
			section.querySelectorAll('.lbl-00-div-00-div-00-div-01-sec-02-div-00-div-00-div-00')[1].innerHTML = data.fireplaces;
			section.querySelector('.div-01-sec-02-div-00-div-00-div-00').visible_icons++;
		} else {
			section.querySelectorAll('.div-00-div-01-sec-02-div-00-div-00-div-00')[1].style.display = 'none';
		}
		
		if(data.bathrooms !== '-1'){
			section.querySelectorAll('.lbl-00-div-00-div-00-div-01-sec-02-div-00-div-00-div-00')[2].innerHTML = data.bathrooms;
			section.querySelector('.div-01-sec-02-div-00-div-00-div-00').visible_icons++;
		} else {
			section.querySelectorAll('.div-00-div-01-sec-02-div-00-div-00-div-00')[2].style.display = 'none';
		}
		
		if(data.year_built !== '-1'){
			section.querySelectorAll('.lbl-00-div-00-div-00-div-01-sec-02-div-00-div-00-div-00')[3].innerHTML = data.year_built;
			section.querySelector('.div-01-sec-02-div-00-div-00-div-00').visible_icons++;
		} else {
			section.querySelectorAll('.div-00-div-01-sec-02-div-00-div-00-div-00')[3].style.display = 'none';
		}
		
		if(data.tax !== '-1'){
			section.querySelectorAll('.lbl-00-div-00-div-00-div-01-sec-02-div-00-div-00-div-00')[4].innerHTML = data.tax;
			section.querySelector('.div-01-sec-02-div-00-div-00-div-00').visible_icons++;
		} else {
			section.querySelectorAll('.div-00-div-01-sec-02-div-00-div-00-div-00')[4].style.display = 'none';
		}
		
		if(data.assn_fees !== '-1'){
			section.querySelectorAll('.lbl-00-div-00-div-00-div-01-sec-02-div-00-div-00-div-00')[5].innerHTML = data.assn_fees;
			section.querySelector('.div-01-sec-02-div-00-div-00-div-00').visible_icons++;
		} else {
			section.querySelectorAll('.div-00-div-01-sec-02-div-00-div-00-div-00')[5].style.display = 'none';
		}
		
		if(data.house_size !== '-1'){
			section.querySelectorAll('.lbl-00-div-00-div-00-div-01-sec-02-div-00-div-00-div-00')[6].innerHTML = data.house_size;
			section.querySelector('.div-01-sec-02-div-00-div-00-div-00').visible_icons++;
		} else {
			section.querySelectorAll('.div-00-div-01-sec-02-div-00-div-00-div-00')[6].style.display = 'none';
		}
		
		if(data.lot_size !== '-1'){
			section.querySelectorAll('.lbl-00-div-00-div-00-div-01-sec-02-div-00-div-00-div-00')[7].innerHTML = data.lot_size;
			section.querySelector('.div-01-sec-02-div-00-div-00-div-00').visible_icons++;
		} else {
			section.querySelectorAll('.div-00-div-01-sec-02-div-00-div-00-div-00')[7].style.display = 'none';
		}
		
		if(data.parking_spaces !== '-1'){
			section.querySelectorAll('.lbl-00-div-00-div-00-div-01-sec-02-div-00-div-00-div-00')[8].innerHTML = data.parking_spaces;
			section.querySelector('.div-01-sec-02-div-00-div-00-div-00').visible_icons++;
		} else {
			section.querySelectorAll('.div-00-div-01-sec-02-div-00-div-00-div-00')[8].style.display = 'none';
		}
		
		if(data.levels !== '-1'){
			section.querySelectorAll('.lbl-00-div-00-div-00-div-01-sec-02-div-00-div-00-div-00')[9].innerHTML = data.levels;
			section.querySelector('.div-01-sec-02-div-00-div-00-div-00').visible_icons++;
		} else {
			section.querySelectorAll('.div-00-div-01-sec-02-div-00-div-00-div-00')[9].style.display = 'none';
		}
		
		//instantiate empty cells for smaller screens to align properly
		var w = section.querySelector('.div-01-sec-02-div-00-div-00-div-00').clientWidth;
		//calculate number of needed items
		var num_per_row = Math.floor(w/140);
		var last_row_els = Modulo(section.querySelector('.div-01-sec-02-div-00-div-00-div-00').visible_icons, num_per_row);
		
		if(num_per_row === 1){
			num_per_row = last_row_els;
		}
				
		for(var i = section.querySelectorAll('.div-01-div-01-sec-02-div-00-div-00-div-00').length; i < (num_per_row - last_row_els); i++){
			var template = section.querySelector('.t-div-01-div-01-sec-02-div-00-div-00-div-00').cloneNode();
			template.className = 'div-01-div-01-sec-02-div-00-div-00-div-00';
			section.querySelector('.div-01-sec-02-div-00-div-00-div-00').appendChild(template);
		}
		//delete if there are too many
		var j = section.querySelectorAll('.div-01-div-01-sec-02-div-00-div-00-div-00').length;
		while(j > (num_per_row - last_row_els)){
			section.querySelector('.div-01-sec-02-div-00-div-00-div-00').removeChild(section.querySelectorAll('.div-01-div-01-sec-02-div-00-div-00-div-00')[j - 1]);
			j--;
		}
		
		window.onresize = function(){
			//instantiate empty cells for smaller screens to align properly
			var w = section.querySelector('.div-01-sec-02-div-00-div-00-div-00').clientWidth;
			//calculate number of needed items
			var num_per_row = Math.floor(w/140);
			var last_row_els = Modulo(section.querySelector('.div-01-sec-02-div-00-div-00-div-00').visible_icons, num_per_row);

			if(num_per_row === 1){
				num_per_row = last_row_els;
			}

			for(var i = section.querySelectorAll('.div-01-div-01-sec-02-div-00-div-00-div-00').length; i < (num_per_row - last_row_els); i++){
				var template = section.querySelector('.t-div-01-div-01-sec-02-div-00-div-00-div-00').cloneNode();
				template.className = 'div-01-div-01-sec-02-div-00-div-00-div-00';
				section.querySelector('.div-01-sec-02-div-00-div-00-div-00').appendChild(template);
			}
			//delete if there are too many
			var j = section.querySelectorAll('.div-01-div-01-sec-02-div-00-div-00-div-00').length;
			while(j > (num_per_row - last_row_els)){
				section.querySelector('.div-01-sec-02-div-00-div-00-div-00').removeChild(section.querySelectorAll('.div-01-div-01-sec-02-div-00-div-00-div-00')[j - 1]);
				j--;
			}
		};
	}
	
	function Initialise_Sec_03(section, data){
		section.querySelector('.img-00-div-00-sec-03-div-00-div-00-div-00').src = data.image_src;
		
		if(data.image_src === DOCUMENT_ROOT + 'images/null.png'){
			section.style.display = 'none';
		}
	}
	
	function Initialise_Sec_04(section, data){
		
		section.active_tab = 0;
			
		var hide_section = true;
		
		for(var i = 0; i < data.tabs.length; i++){
			AddTab_Sec_04(section, data.tabs[i]);
			AddGallery_Sec_04(section, data.tabs[i]);
			if(data.tabs[i].images.length > 0){
				hide_section = false;
			}
		}
		
		if(hide_section === true){
			section.style.display = 'none';
		}
		
	}
	
	function AddTab_Sec_04(section, data){
		var template = section.querySelector('.t-div-00-div-00-sec-04-div-00-div-00-div-00').cloneNode(true);
		//stop current active
		if(section.querySelector('.div-01-div-00-sec-04-div-00-div-00-div-00')){
			section.querySelector('.div-01-div-00-sec-04-div-00-div-00-div-00').className = 'div-00-div-00-sec-04-div-00-div-00-div-00';
		}
		
		template.className = 'div-01-div-00-sec-04-div-00-div-00-div-00';
		
		template.querySelector('label').innerHTML = data.tab_name;
		
		section.querySelector('.div-00-sec-04-div-00-div-00-div-00').insertBefore(template, section.querySelector('.btn-00-div-00-sec-04-div-00-div-00-div-00'));
		
		
		InitialiseTab_Sec_04(section, template);
	}
	
	function AddGallery_Sec_04(section, data){
		
		var template = section.querySelector('.t-div-00-div-01-sec-04-div-00-div-00-div-00').cloneNode(true);
		
		template.className = 'div-00-div-01-sec-04-div-00-div-00-div-00';
		
		section.querySelector('.div-01-sec-04-div-00-div-00-div-00').appendChild(template);
		
		InitialiseGallery_Sec_04(section, template, data);
		
	}
	
	function InitialiseGallery_Sec_04(section, gallery, data){
		//reduce opacity of other tabs
		var galleries = section.querySelectorAll('.div-00-div-01-sec-04-div-00-div-00-div-00');
		
		//initialise vars
		gallery.t = 0;
		gallery.target_t = 0;
		gallery.active_image = 0;
		
		if(galleries.length === 1){
			gallery.target_t = 2;
		}
		
		gallery.images = [];
		gallery.descriptions = [];
		
		for(var k = 0; k < data.images.length; k++){
			AddImage_Sec_04(gallery, data.images[k].image_src, data.images[k].image_title, data.images[k].image_description);
		}
		
		
		//forward and back arrows
		gallery.querySelector('.svg-02-div-02-div-01-sec-04-div-00-div-00-div-00').addEventListener('click', function(){
			if(gallery.active_image !== 0){
				gallery.active_image--;
			}
		});
		gallery.querySelector('.svg-03-div-02-div-01-sec-04-div-00-div-00-div-00').addEventListener('click', function(){
			if(gallery.active_image !== gallery.images.length - 1){
				gallery.active_image++;
			}
		});
	}
	
	function AddImage_Sec_04(gallery, image_src, image_title, image_description){
		
		//initialise new gallery image
		var template_image = gallery.querySelector('.t-div-00-div-00-div-00-div-01-sec-04-div-00-div-00-div-00');
		var gallery_index = gallery.images.length;
		gallery.images.length++;
		gallery.images[gallery_index] = template_image.cloneNode(true);
		gallery.images[gallery_index].className = 'div-00-div-00-div-00-div-01-sec-04-div-00-div-00-div-00';
		gallery.querySelector('.div-00-div-00-div-01-sec-04-div-00-div-00-div-00').insertBefore(gallery.images[gallery_index], template_image);
		gallery.images[gallery_index].style.left = (-gallery.active_image + gallery_index) * 660 + 'px';
		gallery.images[gallery_index].querySelector('img').src = image_src;

		
		var template_description = gallery.querySelector('.t-div-00-div-02-div-01-sec-04-div-00-div-00-div-00');
		gallery.descriptions[gallery_index] = template_description.cloneNode(true);
		gallery.descriptions[gallery_index].className = 'div-00-div-02-div-01-sec-04-div-00-div-00-div-00';
		gallery.descriptions[gallery_index].querySelector('.h2-00-div-00-div-02-div-01-sec-04-div-00-div-00-div-00').innerHTML = image_title;
		gallery.descriptions[gallery_index].querySelector('.p-00-div-00-div-02-div-01-sec-04-div-00-div-00-div-00').innerHTML = image_description;
		gallery.querySelector('.div-02-div-01-sec-04-div-00-div-00-div-00').insertBefore(gallery.descriptions[gallery_index], template_description);
	}
	
	function InitialiseTab_Sec_04(section, tab){
		tab.className = 'div-00-div-00-sec-04-div-00-div-00-div-00';
		//set first tab to active
		section.querySelectorAll('.div-00-div-00-sec-04-div-00-div-00-div-00, .div-01-div-00-sec-04-div-00-div-00-div-00, .div-02-div-00-sec-04-div-00-div-00-div-00')[section.active_tab].className = 'div-01-div-00-sec-04-div-00-div-00-div-00';

		
		//set active
		tab.addEventListener('click', function(){
			section.querySelectorAll('.div-00-div-00-sec-04-div-00-div-00-div-00, .div-01-div-00-sec-04-div-00-div-00-div-00, .div-02-div-00-sec-04-div-00-div-00-div-00')[section.active_tab].className = 'div-00-div-00-sec-04-div-00-div-00-div-00';
			for(var i = 0; i < section.querySelectorAll('.div-00-div-00-sec-04-div-00-div-00-div-00, .div-01-div-00-sec-04-div-00-div-00-div-00, .div-02-div-00-sec-04-div-00-div-00-div-00').length; i++){
				//set active tab to the tab index
				if(section.querySelectorAll('.div-00-div-00-sec-04-div-00-div-00-div-00, .div-01-div-00-sec-04-div-00-div-00-div-00, .div-02-div-00-sec-04-div-00-div-00-div-00')[i] === tab){
					section.active_tab = i;
				}
			}
			tab.className = 'div-01-div-00-sec-04-div-00-div-00-div-00';
			//set target t of galleries, so active one fades in
			var gallery = section.querySelectorAll('.div-00-div-01-sec-04-div-00-div-00-div-00');
			for(var j = 0; j < gallery.length; j++){
				if(j === section.active_tab){
					gallery[j].target_t = 2;
					gallery[j].style.pointerEvents = '';
				} else {
					gallery[j].target_t = 0;
					gallery[j].style.pointerEvents = 'none';
				}
			}
		});
	}
	
	function Initialise_Sec_05(section, data){
		section.querySelector('.div-00-div-00-sec-05-div-00-div-00-div-00').innerHTML = data.embed_code;
	}
	
	function Initialise_Sec_06(section, data){
		
		section.active_tab = 0;
			
		var hide_section = true;
		
		for(var i = 0; i < data.tabs.length; i++){
			AddTab_Sec_06(section, data.tabs[i]);
			AddViewport_Sec_06(section, data.tabs[i]);
			if(data.tabs[i].embed_code !== ''){
				hide_section = false;
			}
		}
		
		if(hide_section === true){
			section.style.display = 'none';
		}
	}
	
	function AddTab_Sec_06(section, data){
		var template = section.querySelector('.t-div-00-div-00-sec-06-div-00-div-00-div-00').cloneNode(true);
		//stop current active
		if(section.querySelector('.div-01-div-00-sec-06-div-00-div-00-div-00')){
			section.querySelector('.div-01-div-00-sec-06-div-00-div-00-div-00').className = 'div-00-div-00-sec-06-div-00-div-00-div-00';
		}
		
		template.className = 'div-01-div-00-sec-06-div-00-div-00-div-00';
		
		template.querySelector('label').innerHTML = data.tab_name;
		
		section.querySelector('.div-00-sec-06-div-00-div-00-div-00').insertBefore(template, section.querySelector('.btn-00-div-00-sec-06-div-00-div-00-div-00'));
		
		
		InitialiseTab_Sec_06(section, template);
	}
	
	function AddViewport_Sec_06(section, data){
		
		var template = section.querySelector('.t-div-00-div-01-sec-06-div-00-div-00-div-00').cloneNode(true);
		
		template.className = 'div-00-div-01-sec-06-div-00-div-00-div-00';
		
		section.querySelector('.div-01-sec-06-div-00-div-00-div-00').appendChild(template);
		
		InitialiseViewport_Sec_06(section, template, data);
	}
	
	function InitialiseViewport_Sec_06(section, viewport, data){
		//reduce opacity of other tabs
		var viewports = section.querySelectorAll('.div-00-div-01-sec-06-div-00-div-00-div-00');
		
		//initialise vars
		viewport.t = 0;
		viewport.target_t = 0;
		viewport.active_image = 0;
		
		if(viewports.length === 1){
			viewport.target_t = 2;
		}
		
		viewport.querySelector('iframe').src = data.embed_code;
		
		viewport.querySelector('iframe').onload = function(){
			this.style.display = '';
		};
	}
	
	function InitialiseTab_Sec_06(section, tab){
		tab.className = 'div-00-div-00-sec-06-div-00-div-00-div-00';
		//set first tab to active
		section.querySelectorAll('.div-00-div-00-sec-06-div-00-div-00-div-00, .div-01-div-00-sec-06-div-00-div-00-div-00, .div-02-div-00-sec-06-div-00-div-00-div-00')[section.active_tab].className = 'div-01-div-00-sec-06-div-00-div-00-div-00';

		
		//set active
		tab.addEventListener('click', function(){
			section.querySelectorAll('.div-00-div-00-sec-06-div-00-div-00-div-00, .div-01-div-00-sec-06-div-00-div-00-div-00, .div-02-div-00-sec-06-div-00-div-00-div-00')[section.active_tab].className = 'div-00-div-00-sec-06-div-00-div-00-div-00';
			for(var i = 0; i < section.querySelectorAll('.div-00-div-00-sec-06-div-00-div-00-div-00, .div-01-div-00-sec-06-div-00-div-00-div-00, .div-02-div-00-sec-06-div-00-div-00-div-00').length; i++){
				//set active tab to the tab index
				if(section.querySelectorAll('.div-00-div-00-sec-06-div-00-div-00-div-00, .div-01-div-00-sec-06-div-00-div-00-div-00, .div-02-div-00-sec-06-div-00-div-00-div-00')[i] === tab){
					section.active_tab = i;
				}
			}
			tab.className = 'div-01-div-00-sec-06-div-00-div-00-div-00';
			//set target t of galleries, so active one fades in
			var gallery = section.querySelectorAll('.div-00-div-01-sec-06-div-00-div-00-div-00');
			for(var j = 0; j < gallery.length; j++){
				if(j === section.active_tab){
					gallery[j].target_t = 2;
					gallery[j].style.pointerEvents = '';
				} else {
					gallery[j].target_t = 0;
					gallery[j].style.pointerEvents = 'none';
				}
			}
		});
	}
	
	function Initialise_Sec_07(section, data){
		
		InitialiseGallery_Sec_07(section, data);
		
		if(data.floorplans.length === 0){
			section.style.display = 'none';
		}
	}
	
	function InitialiseGallery_Sec_07(section, data){
		
		//initialise vars
		section.active_floorplan = 0;
		
		section.floorplans = [];
		section.titles = [];
		
		section.height = 0;
		
		for(var k = 0; k < data.floorplans.length; k++){
			AddImage_Sec_07(section, data.floorplans[k].image_src, data.floorplans[k].image_title);
		}
				
		//forward and back arrows
		section.querySelector('.svg-02-div-01-div-00-sec-07-div-00-div-00-div-00').addEventListener('click', function(){
			if(section.active_floorplan !== 0){
				section.active_floorplan--;
			}
		});
		section.querySelector('.svg-03-div-01-div-00-sec-07-div-00-div-00-div-00').addEventListener('click', function(){
			if(section.active_floorplan !== section.floorplans.length - 1){
				section.active_floorplan++;
			}
		});
		
		window.onresize = function(){
			
			section.height = 0;
			
			for(var i = 0; i < section.floorplans.length; i++){
				if (section.floorplans[i].querySelector('img').natural_height && section.floorplans[i].querySelector('img').natural_width) {
					clearInterval(section.floorplans[i].getHeight);
					//image height at full width
					var img_height = section.floorplans[i].querySelector('img').natural_height/section.floorplans[i].querySelector('img').natural_width * section.floorplans[i].clientWidth;
					//if image height is acceptable
					if(img_height < window.innerHeight * 0.75){
						section.floorplans[i].style.height = img_height + 'px';
						section.floorplans[i].style.width = '';
					} else {
						//make height of image maximum and width variable
						img_height = window.innerHeight - 300;
						section.floorplans[i].style.width = section.floorplans[i].querySelector('img').natural_width/section.floorplans[i].querySelector('img').natural_height * (window.innerHeight - 300) + 'px';
					}
					section.floorplans[i].style.height = img_height + 'px';

					section.height = Math.max(img_height, section.height);
					section.querySelector('.div-00-div-00-sec-07-div-00-div-00-div-00').style.height = section.height + 'px';
				}
			}
			
			section.querySelector('.div-00-div-00-sec-07-div-00-div-00-div-00').style.height = section.height + 'px';
		};
	}
	
	function AddImage_Sec_07(section, image_src, image_title){
		
		//initialise new gallery image
		var template_image = section.querySelector('.t-div-00-div-00-div-00-sec-07-div-00-div-00-div-00');
		var gallery_index = section.floorplans.length;
		section.floorplans.length++;
		section.floorplans[gallery_index] = template_image.cloneNode(true);
		section.floorplans[gallery_index].className = 'div-00-div-00-div-00-sec-07-div-00-div-00-div-00';
		section.querySelector('.div-00-div-00-sec-07-div-00-div-00-div-00').insertBefore(section.floorplans[gallery_index], template_image);
		
		section.floorplans[gallery_index].style.left = (-section.active_floorplan + gallery_index) * 660 + 'px';
		
		section.floorplans[gallery_index].querySelector('img').src = image_src;
		
		var template_title = section.querySelector('.t-div-00-div-01-div-00-sec-07-div-00-div-00-div-00');
		section.titles[gallery_index] = template_title.cloneNode(true);
		section.titles[gallery_index].className = 'div-00-div-01-div-00-sec-07-div-00-div-00-div-00';
		section.titles[gallery_index].querySelector('.h2-00-div-00-div-01-div-00-sec-07-div-00-div-00-div-00').innerHTML = image_title;
		section.querySelector('.div-01-div-00-sec-07-div-00-div-00-div-00').insertBefore(section.titles[gallery_index], template_title);
		
		section.floorplans[gallery_index].getHeight = setInterval(function() {
			section.floorplans[gallery_index].querySelector('img').natural_width = section.floorplans[gallery_index].querySelector('img').naturalWidth;
			section.floorplans[gallery_index].querySelector('img').natural_height = section.floorplans[gallery_index].querySelector('img').naturalHeight;
			if (section.floorplans[gallery_index].querySelector('img').natural_height && section.floorplans[gallery_index].querySelector('img').natural_width) {
				clearInterval(section.floorplans[gallery_index].getHeight);
				//image height at full width
				var img_height = section.floorplans[gallery_index].querySelector('img').natural_height/section.floorplans[gallery_index].querySelector('img').natural_width * section.floorplans[gallery_index].clientWidth;
				//if image height is acceptable
				if(img_height < window.innerHeight * 0.75){
					section.floorplans[gallery_index].style.width = '';
				} else {
					//make height of image maximum and width variable
					img_height = window.innerHeight - 300;
					section.floorplans[gallery_index].style.width = section.floorplans[gallery_index].querySelector('img').natural_width/section.floorplans[gallery_index].querySelector('img').natural_height * (window.innerHeight - 300) + 'px';
				}
				section.floorplans[gallery_index].style.height = img_height + 'px';

				section.height = Math.max(img_height, section.height);
				section.querySelector('.div-00-div-00-sec-07-div-00-div-00-div-00').style.height = section.height + 'px';
			}
		}, 100);
	}
	
	function Initialise_Sec_08(section, data){
		
		section.active_tab = 0;
			
		var hide_section = true;
		
		for(var i = 0; i < data.tabs.length; i++){
			AddTab_Sec_08(section, data.tabs[i]);
			AddLocation_Sec_08(section, data.tabs[i]);
			if(data.tabs[i].address !== '' || data.tabs[i].lat !== '' || data.tabs[i].lng !== '' || data.tabs[i].walkscore_embed_code !== ''){
				hide_section = false;
			}
		}
	
		if(hide_section === true){
			section.style.display = 'none';
		}
	}
	
	function AddTab_Sec_08(section, data){
		var template = section.querySelector('.t-div-00-div-00-sec-08-div-00-div-00-div-00').cloneNode(true);
		//stop current active
		if(section.querySelector('.div-01-div-00-sec-08-div-00-div-00-div-00')){
			section.querySelector('.div-01-div-00-sec-08-div-00-div-00-div-00').className = 'div-00-div-00-sec-08-div-00-div-00-div-00';
		}
		
		template.className = 'div-01-div-00-sec-08-div-00-div-00-div-00';
		
		template.querySelector('label').innerHTML = data.tab_name;
		
		section.querySelector('.div-00-sec-08-div-00-div-00-div-00').insertBefore(template, section.querySelector('.btn-00-div-00-sec-08-div-00-div-00-div-00'));
		
		
		InitialiseTab_Sec_08(section, template);
	}
	
	function AddLocation_Sec_08(section, data){
		
		var template = section.querySelector('.t-div-00-div-01-sec-08-div-00-div-00-div-00').cloneNode(true);
		
		template.className = 'div-00-div-01-sec-08-div-00-div-00-div-00';
		
		section.querySelector('.div-01-sec-08-div-00-div-00-div-00').appendChild(template);
		
		InitialiseLocation_Sec_08(section, template, data);
	}
	
	function InitialiseTab_Sec_08(section, tab){
		tab.className = 'div-00-div-00-sec-08-div-00-div-00-div-00';
		//set first tab to active
		section.querySelectorAll('.div-00-div-00-sec-08-div-00-div-00-div-00, .div-01-div-00-sec-08-div-00-div-00-div-00, .div-02-div-00-sec-08-div-00-div-00-div-00')[section.active_tab].className = 'div-01-div-00-sec-08-div-00-div-00-div-00';

		
		//set active
		tab.addEventListener('click', function(){
			section.querySelectorAll('.div-00-div-00-sec-08-div-00-div-00-div-00, .div-01-div-00-sec-08-div-00-div-00-div-00, .div-02-div-00-sec-08-div-00-div-00-div-00')[section.active_tab].className = 'div-00-div-00-sec-08-div-00-div-00-div-00';
			for(var i = 0; i < section.querySelectorAll('.div-00-div-00-sec-08-div-00-div-00-div-00, .div-01-div-00-sec-08-div-00-div-00-div-00, .div-02-div-00-sec-08-div-00-div-00-div-00').length; i++){
				//set active tab to the tab index
				if(section.querySelectorAll('.div-00-div-00-sec-08-div-00-div-00-div-00, .div-01-div-00-sec-08-div-00-div-00-div-00, .div-02-div-00-sec-08-div-00-div-00-div-00')[i] === tab){
					section.active_tab = i;
				}
			}
			tab.className = 'div-01-div-00-sec-08-div-00-div-00-div-00';
			//set target t of galleries, so active one fades in
			var gallery = section.querySelectorAll('.div-00-div-01-sec-08-div-00-div-00-div-00');
			for(var j = 0; j < gallery.length; j++){
				if(j === section.active_tab){
					gallery[j].target_t = 2;
					gallery[j].style.pointerEvents = '';
				} else {
					gallery[j].target_t = 0;
					gallery[j].style.pointerEvents = 'none';
				}
			}
		});
	}
	
	function InitialiseLocation_Sec_08(section, location, data){
		//reduce opacity of other tabs
		var locations = section.querySelectorAll('.div-00-div-01-sec-08-div-00-div-00-div-00');
		
		//initialise vars
		location.t = 0;
		location.target_t = 0;
		location.active_image = 0;
		
		if(locations.length === 1){
			location.target_t = 2;
		}
		
		//set google map
		data.lat = parseFloat(data.lat);
		data.lng = parseFloat(data.lng);
		data.zoom = parseInt(data.zoom);
		
		var map_obj = new google.maps.Map(location.querySelector('.div-00-div-00-div-01-sec-08-div-00-div-00-div-00'), {
			zoom: data.zoom,
			center: {lat: data.lat, lng: data.lng}
		});
		var marker = new google.maps.Marker({
			position: {lat: data.lat, lng: data.lng},
			map: map_obj,
			title: data.pin_label
		});

		marker.setMap(map_obj);
		
		
		//if there is a walkscore element
		if(data.walkscore_embed_code !== ''){
			
			location.walkscore_embed_code = data.walkscore_embed_code;
			
			location.querySelector('.div-01-div-00-div-01-sec-08-div-00-div-00-div-00').style.display = '';
			window.setTimeout(function(){
				ResizeWalkscore(location);
			}, 1000);
			
			window.onresize = function(){
				ResizeWalkscore(location);
			};
		}
	}
	
	function ResizeWalkscore(location){
		
		var walkscore_upload = location.querySelector('.div-01-div-00-div-01-sec-08-div-00-div-00-div-00');
		
		var iframe_width = walkscore_upload.offsetWidth - 16;
		var iframe_height = walkscore_upload.offsetHeight - 16;
		
		if(walkscore_upload.contains(walkscore_upload.querySelector('iframe')) === true){
		   walkscore_upload.removeChild(walkscore_upload.querySelector('iframe'));
		}
		var iframe = document.createElement('iframe');
		iframe.setAttribute('scrolling', 'no');
		walkscore_upload.appendChild(iframe);
		
		var width_index = getIndicesOf("ws_width = ", location.walkscore_embed_code)[0];
		var height_index = getIndicesOf("ws_height = ", location.walkscore_embed_code)[0];
		var colon_indices = getIndicesOf(";", location.walkscore_embed_code);

		var wi_colon = -1, hi_colon = -1;
		

		for(var w = 0; w < colon_indices.length; w++){
			if(colon_indices[w] > width_index && wi_colon === -1){
				wi_colon = colon_indices[w];
			}
			if(colon_indices[w] > height_index && hi_colon === -1){
				hi_colon = colon_indices[w];
			}
		}

		var embed_code = '';
				
		if(width_index < height_index){
			embed_code = location.walkscore_embed_code.substring(0,width_index) + "ws_width = '" + iframe_width + "'" + location.walkscore_embed_code.substring(wi_colon, height_index) + "ws_height = '" + iframe_height + "'" + location.walkscore_embed_code.substring(hi_colon, location.walkscore_embed_code.length);
		} else {
			embed_code = location.walkscore_embed_code.substring(0,height_index) + "ws_height = '" + iframe_height + "'" + location.walkscore_embed_code.substring(hi_colon, width_index) + "ws_width = '" + iframe_width + "'" + location.walkscore_embed_code.substring(wi_colon, location.walkscore_embed_code.length);
		}
				
		walkscore_upload.querySelector('iframe').contentWindow.document.write(embed_code);
		walkscore_upload.querySelector('iframe').style.display = '';
	}
	
	function getIndicesOf(searchStr, str) {
		var searchStrLen = searchStr.length;
		if (searchStrLen == 0) {
			return [];
		}
		var startIndex = 0, index, indices = [];
		str = str.toLowerCase();
		searchStr = searchStr.toLowerCase();
		
		while ((index = str.indexOf(searchStr, startIndex)) > -1) {
			indices.push(index);
			startIndex = index + searchStrLen;
		}
				
		return indices;
	}
	
	
	function Initialise_Sec_09(section, data){
		
		var date = new Date();

		section.schedule_date = SetScheduled(new Date().getTime());
		
		SetCalendar(section);
		
		section.querySelector('.div-00-sec-09-div-00-div-00-div-00').type = 0;
		section.querySelector('.div-00-div-00-div-00-sec-09-div-00-div-00-div-00').style.display = '';
		section.querySelector('.div-00-div-00-sec-09-div-00-div-00-div-00').addEventListener('click', function(){
			section.querySelector('.div-00-sec-09-div-00-div-00-div-00').type = 0;
			section.querySelector('.div-00-div-00-div-00-sec-09-div-00-div-00-div-00').style.display = '';
			section.querySelector('.div-00-div-01-div-00-sec-09-div-00-div-00-div-00').style.display = 'none';
			
			section.querySelector('.div-01-sec-09-div-00-div-00-div-00').style.display = '';
			section.querySelector('.div-02-sec-09-div-00-div-00-div-00').style.display = '';
			section.querySelector('.div-03-sec-09-div-00-div-00-div-00').style.display = '';
			section.querySelector('.div-04-sec-09-div-00-div-00-div-00').style.display = '';
			section.querySelector('.div-05-sec-09-div-00-div-00-div-00').style.display = '';
		});
		section.querySelector('.div-01-div-00-sec-09-div-00-div-00-div-00').addEventListener('click', function(){
			section.querySelector('.div-00-sec-09-div-00-div-00-div-00').type = 1;
			section.querySelector('.div-00-div-00-div-00-sec-09-div-00-div-00-div-00').style.display = 'none';
			section.querySelector('.div-00-div-01-div-00-sec-09-div-00-div-00-div-00').style.display = '';
			
			section.querySelector('.div-01-sec-09-div-00-div-00-div-00').style.display = 'none';
			section.querySelector('.div-02-sec-09-div-00-div-00-div-00').style.display = 'none';
			section.querySelector('.div-03-sec-09-div-00-div-00-div-00').style.display = 'none';
			section.querySelector('.div-04-sec-09-div-00-div-00-div-00').style.display = 'none';
			section.querySelector('.div-05-sec-09-div-00-div-00-div-00').style.display = 'none';
		});
		
		section.querySelector('.btn-00-div-01-sec-09-div-00-div-00-div-00').addEventListener('click', function(){
			section.schedule_date.curr_month--;
			if(section.schedule_date.curr_month <= 0){
				section.schedule_date.curr_month += 12;
				section.schedule_date.curr_year--;
			}
			SetCalendar(section);
		});
		
		section.querySelector('.btn-01-div-01-sec-09-div-00-div-00-div-00').addEventListener('click', function(){
			section.schedule_date.curr_month++;
			if(section.schedule_date.curr_month >= 12){
				section.schedule_date.curr_month -= 12;
				section.schedule_date.curr_year++;
			}
			SetCalendar(section);
		});
		
		
		SetTimeSelector(section);
		
		
		//send button
		section.querySelector('.btn-00-div-06-sec-09-div-00-div-00-div-00').addEventListener('click', function(){
			
			var first_name = section.querySelectorAll('.ipt-00-div-06-sec-09-div-00-div-00-div-00')[0].value;
			var last_name = section.querySelectorAll('.ipt-00-div-06-sec-09-div-00-div-00-div-00')[1].value;
			var email = section.querySelectorAll('.ipt-00-div-06-sec-09-div-00-div-00-div-00')[2].value;
			var phone_number = section.querySelectorAll('.ipt-00-div-06-sec-09-div-00-div-00-div-00')[3].value;
			var ts = 0;
			if(section.querySelector('.div-00-sec-09-div-00-div-00-div-00').type === 0){
				ts = GetTimestamp(section.schedule_date);
			} else {
				ts = -1;
			}
			Mail(first_name, last_name, email, phone_number, data.section_id,ts);
		});
	}
	
	function SetScheduled(timestamp){
		//get date
		var date = new Date(timestamp);
				
		var scheduled = {month:0,day:0,year:0,hour:0,minutes:0};
		
		scheduled.curr_month = date.getMonth();
		scheduled.curr_day = date.getDate();
		scheduled.curr_year = date.getFullYear();
		scheduled.curr_hour = date.getHours();
		scheduled.curr_minutes = date.getMinutes();
		return scheduled;
	}
	
	function GetTimestamp(time){
		//make and set new date object
		var date = new Date(Date.UTC(time.curr_year, (time.curr_month), time.curr_day, time.curr_hour, time.curr_minutes, 0, 0));
		
		return (Math.floor((date.getTime())/1000));
	}
	
	function Mail(first_name, last_name, email, phone_number, section_id, ts){
		var xhr = new XMLHttpRequest();
		var url = DOCUMENT_ROOT + 'processes/schedule-viewing.php';
		
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 2){
				document.querySelector('#div-01-div-00').style.pointerEvents = '';
				document.querySelector('#div-01-div-00').style.opacity = '';
			}
		};
		
		xhr.open('POST', url, true);
		xhr.setRequestHeader('first-name', first_name);
		xhr.setRequestHeader('last-name', last_name);
		xhr.setRequestHeader('email', email);
		xhr.setRequestHeader('phone-number', phone_number);
		xhr.setRequestHeader('section-id', section_id);
		xhr.setRequestHeader('ts', ts);
		xhr.send();
	}
	
	function SetCalendar(section){
				
		var firstDay = new Date(section.schedule_date.curr_year, section.schedule_date.curr_month, 1);
		var week_first_index = Modulo(firstDay.getDay() + 6, 7);
		if(week_first_index >= 5){
			section.firstWeekday = 5;
			section.curr_first_day = Modulo(week_first_index + 2, 7);
		} else {
			section.firstWeekday = 0;
			section.curr_first_day = week_first_index;
		}
		
		var div_03_div_00_div_01_sec_09 = section.querySelectorAll('.div-03-div-00-div-01-sec-09-div-00-div-00-div-00');
		for(var i = 0; i < div_03_div_00_div_01_sec_09.length; i++){
			div_03_div_00_div_01_sec_09[i].className = 'div-01-div-00-div-01-sec-09-div-00-div-00-div-00';
		}
		var div_02_div_00_div_01_sec_09 = section.querySelectorAll('.div-02-div-00-div-01-sec-09-div-00-div-00-div-00');
		for(var j = 0; j < div_02_div_00_div_01_sec_09.length; j++){
			div_02_div_00_div_01_sec_09[j].className = 'div-01-div-00-div-01-sec-09-div-00-div-00-div-00';
		}
		
		var month_text = monthNames[Modulo(section.schedule_date.curr_month,12)];
		var year_text = section.schedule_date.curr_year;
		section.querySelector('.h3-00-div-01-sec-09-div-00-div-00-div-00').innerHTML = month_text + ' ' + year_text;
		
		//set color of days
		var div_00_div_00_div_01_sec_09 = section.querySelectorAll('.div-00-div-00-div-01-sec-09-div-00-div-00-div-00');
		if(section.firstWeekday === 0){
			for(var k = 0; k < div_00_div_00_div_01_sec_09.length; k++){
				div_00_div_00_div_01_sec_09[k].innerHTML = weekNames[k];
			}
		} else {
			for(var l = 0; l < div_00_div_00_div_01_sec_09.length; l++){
				div_00_div_00_div_01_sec_09[l].innerHTML = weekNames[(l + 5)%7];
			}
		}
		var div_01_div_00_div_01_sec_09 = section.querySelectorAll('.div-01-div-00-div-01-sec-09-div-00-div-00-div-00');
		for(var m = 0; m < div_01_div_00_div_01_sec_09.length; m++){
			if(m < section.curr_first_day){
				div_01_div_00_div_01_sec_09[m].className = 'div-02-div-00-div-01-sec-09-div-00-div-00-div-00';
			}
			if(m - section.curr_first_day >= (new Date(section.schedule_date.curr_year, section.schedule_date.curr_month+1, 0).getDate())){
				div_01_div_00_div_01_sec_09[m].className = 'div-02-div-00-div-01-sec-09-div-00-div-00-div-00';
			}
			
			div_01_div_00_div_01_sec_09[m].innerHTML = (new Date(section.schedule_date.curr_year, section.schedule_date.curr_month, m - section.curr_first_day + 1).getDate());
			ClickSelectorDate(section, div_01_div_00_div_01_sec_09[m], m - section.curr_first_day + 1);
		}
		
		section.querySelector('.btn-00-div-01-sec-09-div-00-div-00-div-00').childNodes[2].nodeValue = monthNames[Modulo(section.schedule_date.curr_month - 1,12)];
		
		section.querySelector('.btn-01-div-01-sec-09-div-00-div-00-div-00').childNodes[2].nodeValue = monthNames[Modulo(section.schedule_date.curr_month + 1,12)];
		
	}
	
	function ClickSelectorDate(section, element, day){
		element.addEventListener('click', function(){
			var last_dates = section.querySelectorAll('.div-03-div-00-div-01-sec-09-div-00-div-00-div-00');
			for(var i = 0; i < last_dates.length; i++){
				last_dates[i].className = 'div-01-div-00-div-01-sec-09-div-00-div-00-div-00';
			}
			element.className = 'div-03-div-00-div-01-sec-09-div-00-div-00-div-00';
			section.schedule_date.curr_day = day;
		});
	}
	
	function Modulo(n, m) {
		return ((n%m)+m)%m;
	}
	
	function SetTimeSelector(section){
		section.querySelector('.lbl-00-div-02-sec-09-div-00-div-00-div-00').addEventListener('click', function(){
			this.active = !this.active;
		});
		
		section.querySelector('.lbl-00-div-03-sec-09-div-00-div-00-div-00').addEventListener('click', function(){
			this.active = !this.active;
		});
		
		var div_00_div_00_div_04_sec_09 = section.querySelectorAll('.div-00-div-00-div-04-sec-09-div-00-div-00-div-00');
		for(var i = 0; i < div_00_div_00_div_04_sec_09.length; i++){
			HourClickDelegate(div_00_div_00_div_04_sec_09[i], section);
		}
		
		var div_00_div_00_div_05_sec_09 = section.querySelectorAll('.div-00-div-00-div-05-sec-09-div-00-div-00-div-00');
		for(var j = 0; j < div_00_div_00_div_05_sec_09.length; j++){
			MinuteClickDelegate(div_00_div_00_div_05_sec_09[j], section);
		}
	}
	
	function HourClickDelegate(hour, section){
		hour.addEventListener('click', function(){
			var div_01_div_00_div_04_sec_10 = section.querySelectorAll('.div-01-div-00-div-04-sec-09-div-00-div-00-div-00');
			for(var i = 0; i < div_01_div_00_div_04_sec_10.length; i++){
				div_01_div_00_div_04_sec_10[i].className = 'div-00-div-00-div-04-sec-09-div-00-div-00-div-00';
			}
			hour.className = 'div-01-div-00-div-04-sec-09-div-00-div-00-div-00';
			var hour_num = (hour.childNodes[0].nodeValue).replace(/\D/g, '') * 1;
			if(hour_num < 9){
				hour_num += 12;
			}
			section.schedule_date.curr_hour = hour_num;
			section.querySelector('.div-00-div-02-sec-09-div-00-div-00-div-00').innerHTML = Zerofill(hour_num,2).toString()[0];
			section.querySelector('.div-01-div-02-sec-09-div-00-div-00-div-00').innerHTML = Zerofill(hour_num,2).toString()[1];
			
			section.querySelector('.lbl-00-div-02-sec-09-div-00-div-00-div-00').active = false;
		});
	}
	
	function MinuteClickDelegate(minute, section){
		minute.addEventListener('click', function(){
			var div_01_div_00_div_05_sec_10 = section.querySelectorAll('.div-01-div-00-div-05-sec-09-div-00-div-00-div-00');
			for(var i = 0; i < div_01_div_00_div_05_sec_10.length; i++){
				div_01_div_00_div_05_sec_10[i].className = 'div-00-div-00-div-05-sec-09-div-00-div-00-div-00';
			}
			minute.className = 'div-01-div-00-div-05-sec-09-div-00-div-00-div-00';
			section.querySelector('.div-00-div-03-sec-09-div-00-div-00-div-00').innerHTML = Zerofill((minute.childNodes[0].nodeValue).replace(/\D/g, '') * 1,2).toString()[0];
			section.querySelector('.div-01-div-03-sec-09-div-00-div-00-div-00').innerHTML = Zerofill((minute.childNodes[0].nodeValue).replace(/\D/g, '') * 1,2).toString()[1];
			section.schedule_date.curr_minutes = (minute.childNodes[0].nodeValue).replace(/\D/g, '') * 1;
			section.querySelector('.lbl-00-div-03-sec-09-div-00-div-00-div-00').active = false;
		});
	}
	
	function Zerofill(number, length){
		return new Array(length - number.toString().length + 1).join('0') + number;
	}
	
	function Initialise_Sec_10(section, data){
		
		var dropdown = section.querySelector('.div-00-div-00-sec-10-div-00-div-00-div-00');

		//set months
		var curr_month = new Date().getMonth();
		var curr_year = new Date().getFullYear();
		var month = section.querySelectorAll('.div-00-div-00-div-00-sec-10-div-00-div-00-div-00');
		for(var i = 0; i < month.length; i++){
			var set_month = curr_month + i;
			var set_year = curr_year;
			if(set_month >= 12){
				set_month -= 12;
				set_year ++;
			}
			month[i].set_month = set_month;
			month[i].set_year = set_year;
			month[i].innerHTML = GetMonth(set_month) + ' ' + set_year;
			
			MonthClickDelegate(month[i], i, dropdown);
		}
		
		//dropdown box
		dropdown.state = 0;
		dropdown.active_month = 0;
		dropdown.addEventListener('click', function(){
			dropdown.state = 1 - dropdown.state;
			
			for(var j = month.length - 1; j >= 0; j--){
				if(j !== month.length - 1){
					dropdown.insertBefore(month[j], month[j + 1]);
				}
			}
			
			if(dropdown.state === 1){
				dropdown.style.height = '480px';
				dropdown.style.border = '1px solid rgb(210,210,210)';
				dropdown.style.bottom = '154px';
				dropdown.querySelector('svg').setAttribute('d', 'M 1 7 L 9 7 L 5 2 Z');
				if(window.innerWidth > 1200){
					if(dropdown.state === 1){
						dropdown.style.left = 'calc(50% + 74px)';
					}
				} else if(window.innerWidth > 800){
					if(dropdown.state === 1){
						dropdown.style.left = '52.5%';
					}
				} else {
					if(dropdown.state === 1){
						dropdown.style.left = '24px';
					}
				}
			} else {
				dropdown.style.height = '40px';
				dropdown.style.border = '';
				dropdown.style.bottom = '';
				dropdown.style.left = '';
				dropdown.querySelector('svg').setAttribute('d', 'M 1 3 L 9 3 L 5 8 Z');
				if(month[dropdown.active_month] !== dropdown.firstChild){
					dropdown.insertBefore(month[dropdown.active_month], dropdown.firstChild);
				}
			}
		});
		
		window.onresize = function(){
			if(window.innerWidth > 1200){
				if(dropdown.state === 1){
					dropdown.style.left = 'calc(50% + 74px)';
				}
			} else if(window.innerWidth > 800){
				if(dropdown.state === 1){
					dropdown.style.left = '52.5%';
				}
			} else {
				if(dropdown.state === 1){
					dropdown.style.left = '24px';
				}
			}
		}
		
		var price = 0;
		
		//property value set
		for(var l = 0; l < data_arr.length; l++){
			if(data_arr[l].type === 1){
				section.querySelector('.lbl-01-div-00-sec-10-div-00-div-00-div-00').innerHTML = data_arr[l].price;
				price = data_arr[l].price.replace(/[^0-9.]/g, '');
			}
		}
		
		//input boxes
		var inputs = section.querySelectorAll('input');
		for(var m = 0; m < inputs.length; m++){
			InputFormatDelegate(inputs[m], m);
		}
		
		//calculate button
		section.querySelector('button').addEventListener('click', function(){
			var down_payment = inputs[0].value.replace(/[^0-9.]/g, '');
			var mortgage_term = inputs[1].value.replace(/[^0-9.]/g, '');
			var interest_rate = inputs[2].value.replace(/[^0-9.]/g, '');
			var property_tax = inputs[3].value.replace(/[^0-9.]/g, '');
			var property_insurance = inputs[4].value.replace(/[^0-9.]/g, '');
			var pmi = inputs[5].value.replace(/[^0-9.]/g, '');
			var start_month = month[dropdown.active_month].set_month;
			var start_year = month[dropdown.active_month].set_year;
			window.open('https://www.mlcalc.com/#mortgage-' + price + '-' + down_payment + '-' + mortgage_term + '-' + interest_rate + '-' + property_tax + '-' + property_insurance + '-' + pmi + '-' + start_month + '-' + start_year + '-none');
		});
	}
	
	function GetMonth(index){
		var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		return months[index];
	}
	
	function MonthClickDelegate(month, index, container){
		month.addEventListener('click', function(){
			if(container.state === 1){
				container.active_month = index;
			}
		});
	}
	
	function InputFormatDelegate(input, index){
		input.addEventListener('focusout', function(){
			var val = input.value;
			if(parseFloat(val.replace(/[^0-9.]/g, '')) >= 0){
				//check type of input
				if(index === 0 || index === 2 || index === 5){
					input.value = parseFloat(val.replace(/[^0-9.]/g, '')) + '%';
				}
				if(index === 1){
					input.value = parseInt(val.replace(/[^0-9.]/g, '')) + ' Years';
				}
				if(index === 3 || index === 4){
					input.value = '$' + CommaFormat(parseInt(val.replace(/[^0-9.]/g, ''))) + '/Month';
				}
			}
		});
	}
	
	function CommaFormat(str){
		return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	function Initialise_Sec_11(section, data){
		
		InitialiseResource_Sec_11(section, data);
		
		if(data.resources.length === 0){
			section.style.display = 'none';
		}
	}
	
	function InitialiseResource_Sec_11(section, data){
		
		//initialise vars
		section.active_resource = 0;
		
		section.resources = [];
		section.descriptions = [];
		
		for(var k = 0; k < data.resources.length; k++){
			AddResource_Sec_11(section, data.resources[k].resource_src, data.resources[k].resource_title, data.resources[k].resource_description);
		}
		
		//forward and back arrows
		section.querySelector('.svg-02-div-01-div-00-sec-11-div-00-div-00-div-00').addEventListener('click', function(){
			if(section.active_resource !== 0){
				section.active_resource--;
			}
		});
		section.querySelector('.svg-03-div-01-div-00-sec-11-div-00-div-00-div-00').addEventListener('click', function(){
			if(section.active_resource !== section.resources.length - 1){
				section.active_resource++;
			}
		});
	}
	
	function AddResource_Sec_11(section, resource_src, resource_title, resource_description){
		
		//initialise new gallery image
		var template_resource = section.querySelector('.t-div-00-div-00-div-00-sec-11-div-00-div-00-div-00');
		var gallery_index = section.resources.length;
		section.resources.length++;
		section.resources[gallery_index] = template_resource.cloneNode(true);
		section.resources[gallery_index].className = 'div-00-div-00-div-00-sec-11-div-00-div-00-div-00';
		section.querySelector('.div-00-div-00-sec-11-div-00-div-00-div-00').insertBefore(section.resources[gallery_index], template_resource);
		section.resources[gallery_index].style.left = (-section.active_resource + gallery_index) * 510 + 'px';
		section.resources[gallery_index].querySelector('object').data = resource_src;
		section.resources[gallery_index].addEventListener('click', function(){
			window.open(resource_src);
		});
		
		var template_description = section.querySelector('.t-div-00-div-01-div-00-sec-11-div-00-div-00-div-00');
		section.descriptions[gallery_index] = template_description.cloneNode(true);
		section.descriptions[gallery_index].className = 'div-00-div-01-div-00-sec-11-div-00-div-00-div-00';
		section.descriptions[gallery_index].querySelector('.h2-00-div-00-div-01-div-00-sec-11-div-00-div-00-div-00').innerHTML = resource_title;
		section.descriptions[gallery_index].querySelector('.p-00-div-00-div-01-div-00-sec-11-div-00-div-00-div-00').innerHTML = resource_description;
		section.querySelector('.div-01-div-00-sec-11-div-00-div-00-div-00').insertBefore(section.descriptions[gallery_index], template_description);
	}
	
	function Initialise_Sec_12(section, data){

		if(data.agents.length > 1){
			section.querySelector('.t-div-00-div-00-sec-12-div-00-div-00-div-00').className = 'div-00-div-00-sec-12-div-00-div-00-div-00';
		}
		
		for(var i = 0; i < data.agents.length; i++){
			
			var agent = section.querySelectorAll('.div-00-div-00-sec-12-div-00-div-00-div-00')[i];
			agent.querySelector('.h3-00-div-00-div-00-sec-12-div-00-div-00-div-00').value = data.agents[i].site_section_agent_id;
			// agent.querySelector('.h3-00-div-00-div-00-sec-12-div-00-div-00-div-00').innerHTML = data.agents[i].name;
			// agent.querySelector('.h4-00-div-00-div-00-sec-12-div-00-div-00-div-00').innerHTML = data.agents[i].occupation;
			// agent.querySelector('.p-00-div-00-div-00-sec-12-div-00-div-00-div-00').innerHTML = data.agents[i].description;
			// agent.querySelector('.h5-00-div-00-div-00-sec-12-div-00-div-00-div-00').innerHTML = 'Mobile: ' + data.agents[i].mobile_number;
			// agent.querySelector('.h5-01-div-00-div-00-sec-12-div-00-div-00-div-00').innerHTML = 'Office: ' + data.agents[i].office_number;
			
			// agent.querySelectorAll('.a-00-div-00-div-00-div-00-sec-12-div-00-div-00-div-00')[0].href = data.agents[i].facebook_link;
			// agent.querySelectorAll('.a-00-div-00-div-00-div-00-sec-12-div-00-div-00-div-00')[1].href = data.agents[i].website_link;
			// agent.querySelectorAll('.a-00-div-00-div-00-div-00-sec-12-div-00-div-00-div-00')[2].href = 'mailto: ' + data.agents[i].email_link;
			
			// agent.querySelector('.img-00-div-01-div-00-div-00-sec-12-div-00-div-00-div-00').src = data.agents[i].image_src;
		}
	}
	
	function XHRSections(){
		var xhr = new XMLHttpRequest();
		var url = DOCUMENT_ROOT + 'processes/get-site-sections.php';
		
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				data_arr = JSON.parse(xhr.responseText);
				//build sections
				for(var i = 0; i < data_arr.length; i++){
					InstantiateSiteSection(data_arr[i]);
				}
				
				FirstSec(data_arr[0].type);
			}
		};
		
		
		xhr.open('POST', url, true);
		xhr.setRequestHeader('site-id', SITE_ID);
		xhr.setRequestHeader('add-view', 1);
		xhr.send();
	}
	
	function FirstSec(type){
		type = type * 1;
		
		Sections[0].obj.style.transition = '0s';
		
		window.setTimeout(function(){
			Sections[0].obj.style.transition = '';
		}, 0);
		
		if(type === 0){
			Sections[0].obj.style.height = 'calc(100vh - 160px)';
			Sections[0].obj.querySelector('.div-00-sec-00-div-00-div-00-div-00').classList.add('top-sec');
		} else if(type === 1){
			Sections[0].obj.style.marginTop = '80px';
			document.querySelector('#div-00-div-00-div-00').style.backgroundColor = 'white';
		} else if(type === 2){
			Sections[0].obj.style.marginTop = '80px';
			document.querySelector('#div-00-div-00-div-00').style.backgroundColor = 'rgb(46,0,86)';
		} else if(type === 3){
			document.querySelector('#div-00-sec-03-div-00-div-00-div-00').style.height = '600px';
		} else if(type === 4){
			Sections[0].obj.style.marginTop = '80px';
			document.querySelector('#div-00-div-00-div-00').style.backgroundColor = 'rgb(50,50,50s)';
		} else if(type === 5){
			Sections[0].obj.style.marginTop = '80px';
			document.querySelector('#div-00-div-00-div-00').style.backgroundColor = 'rgb(46, 0, 86)';
		} else if(type === 6){
			Sections[0].obj.style.marginTop = '80px';
			document.querySelector('#div-00-div-00-div-00').style.backgroundColor = 'rgb(225,225,225)';
		} else if(type === 7){
			Sections[0].obj.style.marginTop = '80px';
			document.querySelector('#div-00-div-00-div-00').style.backgroundColor = 'rgb(50,50,50)';
		} else if(type === 8){
			Sections[0].obj.style.marginTop = '80px';
			document.querySelector('#div-00-div-00-div-00').style.backgroundColor = 'rgb(50,50,50)';
		} else if(type === 9){
			Sections[0].obj.style.marginTop = '80px';
			document.querySelector('#div-00-div-00-div-00').style.backgroundColor = 'rgb(50,0,110)';
		} else if(type === 10){
			Sections[0].obj.style.marginTop = '80px';
			document.querySelector('#div-00-div-00-div-00').style.backgroundColor = 'white';
		} else if(type === 11){
			Sections[0].obj.style.marginTop = '80px';
			document.querySelector('#div-00-div-00-div-00').style.backgroundColor = 'rgb(245,245,245)';
		} else if(type === 12){
			Sections[0].obj.style.marginTop = '80px';
			document.querySelector('#div-00-div-00-div-00').style.backgroundColor = 'white';
		}
		   
		  
	}
	
	function InstantiateSiteSection(section){
				
		if(section.type === 0){
			InstantiateSiteSection_00(section);
		} else if(section.type === 1){
			InstantiateSiteSection_01(section);
		} else if(section.type === 2){
			InstantiateSiteSection_02(section);
		} else if(section.type === 3){
			InstantiateSiteSection_03(section);
		} else if(section.type === 4){
			InstantiateSiteSection_04(section);
		} else if(section.type === 5){
			InstantiateSiteSection_05(section);
		} else if(section.type === 6){
			InstantiateSiteSection_06(section);
		} else if(section.type === 7){
			InstantiateSiteSection_07(section);
		} else if(section.type === 8){
			InstantiateSiteSection_08(section);
		} else if(section.type === 9){
			InstantiateSiteSection_09(section);
		} else if(section.type === 10){
			InstantiateSiteSection_10(section);
		} else if(section.type === 11){
			InstantiateSiteSection_11(section);
		} else if(section.type === 12){
			InstantiateSiteSection_12(section);
		}
	}
	
	function InstantiateSiteSection_00(data){
		var template = document.querySelector('.t-sec-00-div-00-div-00-div-00').cloneNode(true);
		
		div_00_div_00_div_00.appendChild(template);
		
		template.className = 'sec-00-div-00-div-00-div-00';
		
		AddToSection(template, data);
		
		Initialise_Sec_00(template, data);
	}
	
	function InstantiateSiteSection_01(data){
		var template = document.querySelector('.t-sec-01-div-00-div-00-div-00').cloneNode(true);
		
		div_00_div_00_div_00.appendChild(template);
		
		template.className = 'sec-01-div-00-div-00-div-00';
		
		AddToSection(template, data);
		
		Initialise_Sec_01(template, data);
	}
	
	function InstantiateSiteSection_02(data){
		var template = document.querySelector('.t-sec-02-div-00-div-00-div-00').cloneNode(true);
		
		div_00_div_00_div_00.appendChild(template);
		
		template.className = 'sec-02-div-00-div-00-div-00';
		
		AddToSection(template, data);
		
		Initialise_Sec_02(template, data);
		
		document.querySelector('#div-05-div-00-hea-00').style.display = '';
	}
	
	function InstantiateSiteSection_03(data){
		var template = document.querySelector('.t-sec-03-div-00-div-00-div-00').cloneNode(true);
		
		div_00_div_00_div_00.appendChild(template);
		
		template.className = 'sec-03-div-00-div-00-div-00';
		
		AddToSection(template, data);
		
		Initialise_Sec_03(template, data);
	}
	
	function InstantiateSiteSection_04(data){
		var template = document.querySelector('.t-sec-04-div-00-div-00-div-00').cloneNode(true);
		
		div_00_div_00_div_00.appendChild(template);
		
		template.className = 'sec-04-div-00-div-00-div-00';
		
		AddToSection(template, data);
		
		Initialise_Sec_04(template, data);
				
		document.querySelector('#div-04-div-00-hea-00').style.display = '';
	}
	
	function InstantiateSiteSection_05(data){
		var template = document.querySelector('.t-sec-05-div-00-div-00-div-00').cloneNode(true);
		
		div_00_div_00_div_00.appendChild(template);
		
		template.className = 'sec-05-div-00-div-00-div-00';
		
		AddToSection(template, data);
		
		Initialise_Sec_05(template, data);
				
		document.querySelector('#div-03-div-00-hea-00').style.display = '';
	}
	
	function InstantiateSiteSection_06(data){
		var template = document.querySelector('.t-sec-06-div-00-div-00-div-00').cloneNode(true);
		
		div_00_div_00_div_00.appendChild(template);
		
		template.className = 'sec-06-div-00-div-00-div-00';
		
		AddToSection(template, data);
		
		Initialise_Sec_06(template, data);
		
		document.querySelector('#div-02-div-00-hea-00').style.display = '';
	}
	
	function InstantiateSiteSection_07(data){
		var template = document.querySelector('.t-sec-07-div-00-div-00-div-00').cloneNode(true);
		
		div_00_div_00_div_00.appendChild(template);
		
		template.className = 'sec-07-div-00-div-00-div-00';
		
		AddToSection(template, data);
		
		Initialise_Sec_07(template, data);
		
		document.querySelector('#div-01-div-00-hea-00').style.display = '';
	}
	
	function InstantiateSiteSection_08(data){
		var template = document.querySelector('.t-sec-08-div-00-div-00-div-00').cloneNode(true);
		
		div_00_div_00_div_00.appendChild(template);
		
		template.className = 'sec-08-div-00-div-00-div-00';
		
		AddToSection(template, data);
		
		Initialise_Sec_08(template, data);
	}
	
	function InstantiateSiteSection_09(data){
		var template = document.querySelector('.t-sec-09-div-00-div-00-div-00').cloneNode(true);
		
		div_00_div_00_div_00.appendChild(template);
		
		template.className = 'sec-09-div-00-div-00-div-00';
		
		AddToSection(template, data);
		
		Initialise_Sec_09(template, data);
		
		document.querySelector('#div-00-div-00-hea-00').style.display = '';
	}
	
	function InstantiateSiteSection_10(data){
		var template = document.querySelector('.t-sec-10-div-00-div-00-div-00').cloneNode(true);
		
		div_00_div_00_div_00.appendChild(template);
		
		template.className = 'sec-10-div-00-div-00-div-00';
		
		AddToSection(template, data);
		
		Initialise_Sec_10(template, data);
	}
	
	function InstantiateSiteSection_11(data){
		var template = document.querySelector('.t-sec-11-div-00-div-00-div-00').cloneNode(true);
		
		div_00_div_00_div_00.appendChild(template);
		
		template.className = 'sec-11-div-00-div-00-div-00';
		
		AddToSection(template, data);
		
		Initialise_Sec_11(template, data);
	}
	
	function InstantiateSiteSection_12(data){
		var template = document.querySelector('.t-sec-12-div-00-div-00-div-00').cloneNode(true);
		
		div_00_div_00_div_00.appendChild(template);
		
		template.className = 'sec-12-div-00-div-00-div-00';
		
		AddToSection(template, data);
		
		Initialise_Sec_12(template, data);
	}
	
	function AddToSection(obj, data){
		
		Sections.length++;
		
		Sections[Sections.length - 1] = {};
		
		Sections[Sections.length - 1].data = data;
		
		Sections[Sections.length - 1].obj = obj;
		
		var z_index_multiplier = 0;
		
		if(data.type === 1){
			z_index_multiplier = 2;
		} else if(data.type === 2){
			z_index_multiplier = 3;
		} else if(data.type === 12){
			z_index_multiplier = -1;
		}
		
		Sections[Sections.length - 1].obj.style.zIndex = 10000 + z_index_multiplier * (Sections.length) - (Sections.length);
	}
	
	function Initialisation(){
		
		//vars
		startTime = new Date().getTime();
		time = {start : startTime, now : startTime, deltaTime : 0};
		scroll_y = 0;
		
		if(SITE_ID > 0){
						
			div_00_div_00_div_00 = document.querySelector('#div-00-div-00-div-00');
			
			div_00_div_00_div_00.scroll = false;
			div_00_div_00_div_00.scroll_t = 0;
			div_00_div_00_div_00.scroll_last = 0;
			div_00_div_00_div_00.scroll_target = 0;
			div_00_div_00_div_00.scroll_duration = 2;

			document.querySelector('#div-00-div-00-hea-00').t_val = 0;


			//remove memorised scroll position
			if ('scrollRestoration' in history) {
				history.scrollRestoration = 'manual';
			}

			document.querySelector('#div-00-div-00-hea-00').addEventListener('click', function(){
				div_00_div_00_div_00.scroll = true;
				div_00_div_00_div_00.scroll_target = this.t_val - 100;
				div_00_div_00_div_00.scroll_t = 0;
			});

			document.querySelector('#div-01-div-00-hea-00').addEventListener('click', function(){
				div_00_div_00_div_00.scroll = true;
				div_00_div_00_div_00.scroll_target = this.t_val - 100;
				div_00_div_00_div_00.scroll_t = 0;
			});

			document.querySelector('#div-02-div-00-hea-00').addEventListener('click', function(){
				div_00_div_00_div_00.scroll = true;
				div_00_div_00_div_00.scroll_target = this.t_val - 100;
				div_00_div_00_div_00.scroll_t = 0;
			});

			document.querySelector('#div-03-div-00-hea-00').addEventListener('click', function(){
				div_00_div_00_div_00.scroll = true;
				div_00_div_00_div_00.scroll_target = this.t_val - 100;
				div_00_div_00_div_00.scroll_t = 0;
			});
			
			document.querySelector('#div-04-div-00-hea-00').addEventListener('click', function(){
				div_00_div_00_div_00.scroll = true;
				div_00_div_00_div_00.scroll_target = this.t_val - 100;
				div_00_div_00_div_00.scroll_t = 0;
			});
			
			document.querySelector('#div-05-div-00-hea-00').addEventListener('click', function(){
				div_00_div_00_div_00.scroll = true;
				div_00_div_00_div_00.scroll_target = this.t_val - 100;
				div_00_div_00_div_00.scroll_t = 0;
			});

			document.addEventListener('mousemove', function(e){
				mouse_pos.x = e.screenX;
				mouse_pos.y = e.screenY;
			});
			
			document.querySelector('#btn-00-div-00-div-01-div-00').addEventListener('click', function(){
				document.querySelector('#div-01-div-00').style.pointerEvents = 'none';
				document.querySelector('#div-01-div-00').style.opacity = '0';
			});
			
			document.querySelector('#div-01-div-00').addEventListener('click', function(e){
				if(e.target.id === 'div-01-div-00'){
					document.querySelector('#div-01-div-00').style.pointerEvents = 'none';
					document.querySelector('#div-01-div-00').style.opacity = '0';
				}
			});
			
			document.querySelector('.t-spn-00-div-00-div-00-div-00').t_val = null;
			//open house
			if(SITE_START_OPEN_HOUSE_TS * 1000 > time.now){
				document.querySelector('.t-spn-00-div-00-div-00-div-00 h4').innerHTML = DateFormat(SITE_START_OPEN_HOUSE_TS) + ToHour(SITE_END_OPEN_HOUSE_TS);
				document.querySelector('.t-spn-00-div-00-div-00-div-00').style.transition = '0s';
				document.querySelector('.t-spn-00-div-00-div-00-div-00').className = 'spn-00-div-00-div-00-div-00';
				document.querySelector('.spn-00-div-00-div-00-div-00').style.transition = '';
				document.querySelector('.spn-00-div-00-div-00-div-00').style.opacity = '1';
				
				document.querySelector('.spn-00-div-00-div-00-div-00 button').addEventListener('click', function(){
					if(document.querySelector('.spn-00-div-00-div-00-div-00').t_val !== null){
						div_00_div_00_div_00.scroll = true;
						div_00_div_00_div_00.scroll_target = document.querySelector('.spn-00-div-00-div-00-div-00').t_val - 100;
						div_00_div_00_div_00.scroll_t = 0;
					} else {
						window.open('mailto: jed@haganrealty.com');
					}
					
				});
			}
		
		
			XHRSections();
		}
	}
	
	function DateFormat(ts){
		var date = new Date(ts * 1000);
		var month = ["January","February","March","April","May","June","July","August","September","October","November","December"][date.getMonth()];
		var day = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][date.getDay()];
		var day_num = date.getDate();
		var nth = GetDateSig(day_num);
		var hours = Zerofill(date.getHours(),2);
		var minutes = Zerofill(date.getMinutes(),2);
		var sig = 'am';
		if(hours >= 12){
			sig = 'pm';
		}

		return day + ' ' + month + ' ' + day_num + "<sup>" + nth + "</sup>" + ' from ' + hours + ':' + minutes + sig;
	}
	
	function ToHour(ts){
		var date = new Date(ts * 1000);
		var hours = Zerofill(date.getHours(),2);
		var minutes = Zerofill(date.getMinutes(),2);
		var sig = 'am';
		if(hours >= 12){
			sig = 'pm';
		}

		return ' to ' + hours + ":" + minutes + sig;
	}
	
	function GetDateSig(d) {
		if (d > 3 && d < 21){
			return 'th'; 
		}
		switch (d % 10) {
			case 1:  return "st";
			case 2:  return "nd";
			case 3:  return "rd";
			default: return "th";
		}
	}

	

	Main();
}

Property_js();