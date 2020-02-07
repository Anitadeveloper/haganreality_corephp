// JavaScript Document
/*jshint esversion: 6 */ 

function getSelectValues(select) {
	var result = [];
	var options = select && select.options;
	var opt;

	for (var i=0, iLen=options.length; i<iLen; i++) {
		opt = options[i];

		if (opt.selected) {
		result.push(opt.value || opt.text);
		}
	}
	return result;
}

function Editor_js () {
	"use strict";
	var startTime;
	var time;
	var scroll_y;
	var mouse_pos = {x:0,y:0};
	
	var last_save_ts = 0;
	
	var load = true;
	
	var html = document.body.parentNode;
	
	var asd_01_div_00;
	var div_00_asd_01_div_00;
	var div_01_asd_01_div_00;
	var spn_00_asd_01_div_00;
	var btn_00_spn_00_asd_01_div_00;
	
	var div_00_div_00_asd_01_div_00;
	
	var div_00_div_01_div_00_asd_01_div_00;
	var div_00_div_00_div_01_div_00_asd_01_div_00;
	
	var div_00_div_00_div_00;
	
	var spn_00_div_00;
	var div_00_div_00_spn_00_div_00;
	
	var div_00_div_02_div_00;
	var div_01_div_02_div_00;
	
	var div_01_div_00;
	
	var spn_01_div_00;
	
	var sections = [];
	
	function Main(){
		window.requestAnimationFrame(function(timestamp){
			if(load === true && document.body.id === "site-editor"){
				Initialisation();
				load = false;
			}
			
			if(startTime !== undefined && document.body.id === "site-editor"){
				time.deltaTime = time.start + timestamp - time.now;
				time.now = time.start + timestamp;
				scroll_y = window.pageYOffset || document.documentElement.scrollTop || window.scrollY;
								
				Sections();
				
				MoveLayers();
				
				Asd_01();
				
				File_Aside();
				
				//scroll to section if scroll values set
				ScrollToSection();
			}
			
			Main();
		});
	}
	
	function section(obj = '', layer = '', type = '', top = '', layer_position = ''){
		this.obj = obj;
		this.layer = layer;
		this.type = type;
		this.top = top;
		this.layer_position = layer_position;
	}
	
	function F1(x){
		return (-((x-1) * (x-1)) + 1);
	}
	
	function Sections(){
		for(var i = 0; i < sections.length; i++){
			if(sections[i].type === 3){
				Sec_03(sections[i]);
			}
			if(sections[i].type === 4){
				Sec_04(sections[i]);
			}
			if(sections[i].type === 6){
				Sec_06(sections[i]);
			}
			if(sections[i].type === 7){
				Sec_07(sections[i]);
			}
			if(sections[i].type === 8){
				Sec_08(sections[i]);
			}
			if(sections[i].type === 11){
				Sec_11(sections[i]);
			}
		}
	}
	
	function Sec_03(section){
		//parallax effect
		var top_val = Math.min(Math.max((section.obj.getBoundingClientRect().top + section.obj.clientHeight)/(window.innerHeight + section.obj.clientHeight)*2 - 1, -1), 1);
		section.obj.querySelector('.img-00-div-00-sec-03-div-00-div-00-div-00').style.top = 'calc(50% + ' + (-top_val * 100) + 'px)';
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
				gallery[i].images[j].style.left = (-gallery[i].active_image + j) * 660 + 'px';
				//scale images
				if(j === gallery[i].active_image){
					gallery[i].images[j].style.zIndex = 1001;
					gallery[i].images[j].style.transform = 'scale(1.05)';
					if(j !== gallery[i].images.length - 1){
						//set description
						gallery[i].descriptions[j].style.opacity = '1';
						gallery[i].descriptions[j].style.transitionDelay = '0.5s';
						gallery[i].descriptions[j].style.pointerEvents = '';
						
						//set image counter
						gallery[i].querySelector('.lbl-00-div-00-div-01-sec-04-div-00-div-00-div-00').innerHTML = 'Image ' + (gallery[i].active_image + 1) + ' of ' + (gallery[i].images.length - 1);
						gallery[i].querySelector('.lbl-00-div-00-div-01-sec-04-div-00-div-00-div-00').style.opacity = 1;
						
					} else {
						gallery[i].descriptions[j].style.opacity = '0.2';
						gallery[i].descriptions[j].style.transitionDelay = '0.5s';
						gallery[i].descriptions[j].style.pointerEvents = 'none';
						
						//set image counter
						gallery[i].querySelector('.lbl-00-div-00-div-01-sec-04-div-00-div-00-div-00').style.opacity = 0;
					}
				} else {
					gallery[i].images[j].style.zIndex = '';
					gallery[i].images[j].style.transform = '';
					
					gallery[i].descriptions[j].style.opacity = '0';
					gallery[i].descriptions[j].style.transition = '';
					gallery[i].descriptions[j].style.pointerEvents = 'none';
				}
			}
			
			//make back arrow visible if not at the start
			if(gallery[i].querySelector('.svg-02-div-02-div-00-div-01-sec-04-div-00-div-00-div-00') && gallery[i].active_image !== 0){
				gallery[i].querySelector('.svg-02-div-02-div-00-div-01-sec-04-div-00-div-00-div-00').setAttribute('class', 'svg-00-div-02-div-00-div-01-sec-04-div-00-div-00-div-00');
			}
			if(gallery[i].querySelector('.svg-02-div-00-div-00-div-01-sec-04-div-00-div-00-div-00') && gallery[i].active_image >= 1 && gallery[i].active_image !== gallery[i].images.length - 1){
				gallery[i].querySelector('.svg-02-div-00-div-00-div-01-sec-04-div-00-div-00-div-00').setAttribute('class', 'svg-00-div-00-div-00-div-01-sec-04-div-00-div-00-div-00');
			}
			
			//otherwise hide
			if(gallery[i].querySelector('.svg-00-div-02-div-00-div-01-sec-04-div-00-div-00-div-00') && gallery[i].active_image === 0){
				gallery[i].querySelector('.svg-00-div-02-div-00-div-01-sec-04-div-00-div-00-div-00').setAttribute('class', 'svg-02-div-02-div-00-div-01-sec-04-div-00-div-00-div-00');

			}
			if(gallery[i].querySelector('.svg-00-div-00-div-00-div-01-sec-04-div-00-div-00-div-00') && (gallery[i].active_image < 1 || gallery[i].active_image === gallery[i].images.length - 1)){
				gallery[i].querySelector('.svg-00-div-00-div-00-div-01-sec-04-div-00-div-00-div-00').setAttribute('class', 'svg-02-div-00-div-00-div-01-sec-04-div-00-div-00-div-00');			
			}
							
			//make forward arrow visible if not at the end
			if(gallery[i].querySelector('.svg-03-div-02-div-00-div-01-sec-04-div-00-div-00-div-00') && gallery[i].active_image !== gallery[i].images.length - 1){
				gallery[i].querySelector('.svg-03-div-02-div-00-div-01-sec-04-div-00-div-00-div-00').setAttribute('class', 'svg-01-div-02-div-00-div-01-sec-04-div-00-div-00-div-00');
			}
			if(gallery[i].querySelector('.svg-03-div-00-div-00-div-01-sec-04-div-00-div-00-div-00') && gallery[i].active_image <= gallery[i].images.length - 2){
				gallery[i].querySelector('.svg-03-div-00-div-00-div-01-sec-04-div-00-div-00-div-00').setAttribute('class', 'svg-01-div-00-div-00-div-01-sec-04-div-00-div-00-div-00');
			}

			//otherwise hide
			if(gallery[i].querySelector('.svg-01-div-02-div-00-div-01-sec-04-div-00-div-00-div-00') && gallery[i].active_image === gallery[i].images.length - 1){
				gallery[i].querySelector('.svg-01-div-02-div-00-div-01-sec-04-div-00-div-00-div-00').setAttribute('class', 'svg-03-div-02-div-00-div-01-sec-04-div-00-div-00-div-00');
			}
			if(gallery[i].querySelector('.svg-01-div-00-div-00-div-01-sec-04-div-00-div-00-div-00') && gallery[i].active_image >= gallery[i].images.length - 2){
				gallery[i].querySelector('.svg-01-div-00-div-00-div-01-sec-04-div-00-div-00-div-00').setAttribute('class', 'svg-03-div-00-div-00-div-01-sec-04-div-00-div-00-div-00');
			}
			
			if(gallery[i].active_image < gallery[i].images.length - 1){
				gallery[i].querySelector('.svg-04-div-00-div-00-div-01-sec-04-div-00-div-00-div-00').style.opacity = '';
				gallery[i].querySelector('.svg-04-div-00-div-00-div-01-sec-04-div-00-div-00-div-00').style.pointerEvents = '';
			} else {
				gallery[i].querySelector('.svg-04-div-00-div-00-div-01-sec-04-div-00-div-00-div-00').style.opacity = '0.5';
				gallery[i].querySelector('.svg-04-div-00-div-00-div-01-sec-04-div-00-div-00-div-00').style.pointerEvents = 'none';
			}
		}
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
	}
	
	function Sec_07(section){
		//fade galleries in and out
		var container = section.obj.querySelector('.div-00-sec-07-div-00-div-00-div-00');
			
		//move images in galleries
		for(var j = 0; j < container.floorplans.length; j++){
			container.floorplans[j].style.left = (-container.active_floorplan + j) * 660 + 'px';
			//scale images
			if(j === container.active_floorplan){
				container.floorplans[j].style.zIndex = 1001;
				container.floorplans[j].style.transform = 'scale(1.05)';
				if(j !== container.floorplans.length - 1){
					//set description
					container.descriptions[j].style.opacity = '1';
					container.descriptions[j].style.transitionDelay = '0.5s';
					container.descriptions[j].style.pointerEvents = '';

					//set image counter
					container.querySelector('.lbl-00-div-00-sec-07-div-00-div-00-div-00').innerHTML = 'Image ' + (container.active_floorplan + 1) + ' of ' + (container.floorplans.length - 1);
					container.querySelector('.lbl-00-div-00-sec-07-div-00-div-00-div-00').style.opacity = 1;

				} else {
					container.descriptions[j].style.opacity = '0.2';
					container.descriptions[j].style.transitionDelay = '0.5s';
					container.descriptions[j].style.pointerEvents = 'none';

					//set image counter
					container.querySelector('.lbl-00-div-00-sec-07-div-00-div-00-div-00').style.opacity = 0;
				}
			} else {
				container.floorplans[j].style.zIndex = '';
				container.floorplans[j].style.transform = '';
				container.descriptions[j].style.opacity = '0';
				container.descriptions[j].style.transition = '';
				container.descriptions[j].style.pointerEvents = 'none';
			}
		}

		//make back arrow visible if not at the start
		if(container.querySelector('.svg-02-div-02-div-00-sec-07-div-00-div-00-div-00') && container.active_floorplan !== 0){
			container.querySelector('.svg-02-div-02-div-00-sec-07-div-00-div-00-div-00').setAttribute('class', 'svg-00-div-02-div-00-sec-07-div-00-div-00-div-00');
		}
		if(container.querySelector('.svg-02-div-00-div-00-sec-07-div-00-div-00-div-00') && container.active_floorplan >= 1 && container.active_floorplan !== container.floorplans.length - 1){
				container.querySelector('.svg-02-div-00-div-00-sec-07-div-00-div-00-div-00').setAttribute('class', 'svg-00-div-00-div-00-sec-07-div-00-div-00-div-00');
			}
		//otherwise hide
		if(container.querySelector('.svg-00-div-02-div-00-sec-07-div-00-div-00-div-00') && container.active_floorplan === 0){
			container.querySelector('.svg-00-div-02-div-00-sec-07-div-00-div-00-div-00').setAttribute('class', 'svg-02-div-02-div-00-sec-07-div-00-div-00-div-00');
		}
		if(container.querySelector('.svg-00-div-00-div-00-sec-07-div-00-div-00-div-00') && (container.active_floorplan < 1 || container.active_floorplan === container.floorplans.length - 1)){
				container.querySelector('.svg-00-div-00-div-00-sec-07-div-00-div-00-div-00').setAttribute('class', 'svg-02-div-00-div-00-sec-07-div-00-div-00-div-00');			
			}
		//make forward arrow visible if not at the end
		if(container.querySelector('.svg-03-div-02-div-00-sec-07-div-00-div-00-div-00') && container.active_floorplan !== container.floorplans.length - 1){
			container.querySelector('.svg-03-div-02-div-00-sec-07-div-00-div-00-div-00').setAttribute('class', 'svg-01-div-02-div-00-sec-07-div-00-div-00-div-00');
		}
		if(container.querySelector('.svg-03-div-00-div-00-sec-07-div-00-div-00-div-00') && container.active_floorplan <= container.floorplans.length - 2){
			container.querySelector('.svg-03-div-00-div-00-sec-07-div-00-div-00-div-00').setAttribute('class', 'svg-01-div-00-div-00-sec-07-div-00-div-00-div-00');
		}
		//otherwise hide
		if(container.querySelector('.svg-01-div-02-div-00-sec-07-div-00-div-00-div-00') && container.active_floorplan === container.floorplans.length - 1){
			container.querySelector('.svg-01-div-02-div-00-sec-07-div-00-div-00-div-00').setAttribute('class', 'svg-03-div-02-div-00-sec-07-div-00-div-00-div-00');
		}
		if(container.querySelector('.svg-01-div-00-div-00-sec-07-div-00-div-00-div-00') && container.active_floorplan >= container.floorplans.length - 2){
			container.querySelector('.svg-01-div-00-div-00-sec-07-div-00-div-00-div-00').setAttribute('class', 'svg-03-div-00-div-00-sec-07-div-00-div-00-div-00');
		}

		if(container.active_floorplan < container.floorplans.length - 1){
			container.querySelector('.svg-04-div-00-div-00-sec-07-div-00-div-00-div-00').style.opacity = '';
			container.querySelector('.svg-04-div-00-div-00-sec-07-div-00-div-00-div-00').style.pointerEvents = '';
		} else {
			container.querySelector('.svg-04-div-00-div-00-sec-07-div-00-div-00-div-00').style.opacity = '0.5';
			container.querySelector('.svg-04-div-00-div-00-sec-07-div-00-div-00-div-00').style.pointerEvents = 'none';
		}	
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
	
	function Sec_11(section){
		//fade galleries in and out
		var resources = section.obj.querySelector('.div-00-sec-11-div-00-div-00-div-00');
			
		//move images in galleries
		for(var j = 0; j < resources.files.length; j++){
			resources.files[j].style.left = (-resources.active_file + j) * 510 + 'px';
			//scale images
			if(j === resources.active_file){
				resources.files[j].style.zIndex = 1001;
				resources.files[j].style.transform = 'scale(1.05)';
				if(j !== resources.files.length - 1){
					//set description
					resources.descriptions[j].style.opacity = '1';
					resources.descriptions[j].style.transitionDelay = '0.5s';
					resources.descriptions[j].style.pointerEvents = '';

					//set image counter
					resources.querySelector('.lbl-00-div-00-sec-11-div-00-div-00-div-00').innerHTML = 'File ' + (resources.active_file + 1) + ' of ' + (resources.files.length - 1);
					resources.querySelector('.lbl-00-div-00-sec-11-div-00-div-00-div-00').style.opacity = 1;

				} else {
					resources.descriptions[j].style.opacity = '0.2';
					resources.descriptions[j].style.transitionDelay = '0.5s';
					resources.descriptions[j].style.pointerEvents = 'none';

					//set image counter
					resources.querySelector('.lbl-00-div-00-sec-11-div-00-div-00-div-00').style.opacity = 0;
				}
			} else {
				resources.files[j].style.zIndex = '';
				resources.files[j].style.transform = '';

				resources.descriptions[j].style.opacity = '0';
				resources.descriptions[j].style.transition = '';
				resources.descriptions[j].style.pointerEvents = 'none';
			}
		}

		//make back arrow visible if not at the start
		if(resources.querySelector('.svg-02-div-02-div-00-sec-11-div-00-div-00-div-00') && resources.active_file !== 0){
			resources.querySelector('.svg-02-div-02-div-00-sec-11-div-00-div-00-div-00').setAttribute('class', 'svg-00-div-02-div-00-sec-11-div-00-div-00-div-00');
		}
		if(resources.querySelector('.svg-02-div-00-div-00-sec-11-div-00-div-00-div-00') && resources.active_file >= 1 && resources.active_file !== resources.files.length - 1){
			resources.querySelector('.svg-02-div-00-div-00-sec-11-div-00-div-00-div-00').setAttribute('class', 'svg-00-div-00-div-00-sec-11-div-00-div-00-div-00');
		}
		//otherwise hide
		if(resources.querySelector('.svg-00-div-02-div-00-sec-11-div-00-div-00-div-00') && resources.active_file === 0){
			resources.querySelector('.svg-00-div-02-div-00-sec-11-div-00-div-00-div-00').setAttribute('class', 'svg-02-div-02-div-00-sec-11-div-00-div-00-div-00');
		}
		if(resources.querySelector('.svg-00-div-00-div-00-sec-11-div-00-div-00-div-00') && (resources.active_file < 1 || resources.active_file === resources.files.length - 1)){
			resources.querySelector('.svg-00-div-00-div-00-sec-11-div-00-div-00-div-00').setAttribute('class', 'svg-02-div-00-div-00-sec-11-div-00-div-00-div-00');			
		}
		//make forward arrow visible if not at the end
		if(resources.querySelector('.svg-03-div-02-div-00-sec-11-div-00-div-00-div-00') && resources.active_file !== resources.files.length - 1){
			resources.querySelector('.svg-03-div-02-div-00-sec-11-div-00-div-00-div-00').setAttribute('class', 'svg-01-div-02-div-00-sec-11-div-00-div-00-div-00');
		}
		if(resources.querySelector('.svg-03-div-00-div-00-sec-11-div-00-div-00-div-00') && resources.active_file <= resources.files.length - 2){
			resources.querySelector('.svg-03-div-00-div-00-sec-11-div-00-div-00-div-00').setAttribute('class', 'svg-01-div-00-div-00-sec-11-div-00-div-00-div-00');
		}
		//otherwise hide
		if(resources.querySelector('.svg-01-div-02-div-00-sec-11-div-00-div-00-div-00') && resources.active_file === resources.files.length - 1){
			resources.querySelector('.svg-01-div-02-div-00-sec-11-div-00-div-00-div-00').setAttribute('class', 'svg-03-div-02-div-00-sec-11-div-00-div-00-div-00');
		}
		if(resources.querySelector('.svg-01-div-00-div-00-sec-11-div-00-div-00-div-00') && resources.active_file >= resources.files.length - 2){
			resources.querySelector('.svg-01-div-00-div-00-sec-11-div-00-div-00-div-00').setAttribute('class', 'svg-03-div-00-div-00-sec-11-div-00-div-00-div-00');
		}
		

		if(resources.active_file < resources.files.length - 1){
			resources.querySelector('.svg-04-div-00-div-00-sec-11-div-00-div-00-div-00').style.opacity = '';
			resources.querySelector('.svg-04-div-00-div-00-sec-11-div-00-div-00-div-00').style.pointerEvents = '';
		} else {
			resources.querySelector('.svg-04-div-00-div-00-sec-11-div-00-div-00-div-00').style.opacity = '0.5';
			resources.querySelector('.svg-04-div-00-div-00-sec-11-div-00-div-00-div-00').style.pointerEvents = 'none';
		}
	}
	
	function File_Aside(){
		//iterate through upload images and do svg animation
		var total_progress = 0;

		for(var i = 0; i < div_00_div_00_spn_00_div_00.upload_files.length; i++){
			if(div_00_div_00_spn_00_div_00.upload_files[i].upload_vars.progress && div_00_div_00_spn_00_div_00.upload_files[i].upload_vars.progress > 1){
				div_00_div_00_spn_00_div_00.upload_files[i].upload_vars.progress = Math.min(Math.max(div_00_div_00_spn_00_div_00.upload_files[i].upload_vars.progress + time.deltaTime/1000, 0), 2);
				//update svg
				var path_00 = LoadSymbolPath00(div_00_div_00_spn_00_div_00.upload_files[i].upload_vars.progress);
				div_00_div_00_spn_00_div_00.upload_files[i].container.querySelector('.pth-00-svg-00-div-00-div-00-div-00-div-00-spn-00-div-00').setAttribute('d', path_00);
				var path_01 = LoadSymbolPath01(div_00_div_00_spn_00_div_00.upload_files[i].upload_vars.progress);
				div_00_div_00_spn_00_div_00.upload_files[i].container.querySelector('.pth-01-svg-00-div-00-div-00-div-00-div-00-spn-00-div-00').setAttribute('d', path_01);
			}
			if(div_00_div_00_spn_00_div_00.upload_files[i].previous_upload === false && div_00_div_00_spn_00_div_00.upload_files[i].cancelled === false){
				//limit the upload progress to below 1
				total_progress += Math.min(div_00_div_00_spn_00_div_00.upload_files[i].upload_vars.progress,1);
			}
		}
		var progress = 0;
		
		if(div_00_div_00_spn_00_div_00.curr_uploads === 0){
			div_01_asd_01_div_00.upload_progress = Math.min(Math.max(div_01_asd_01_div_00.upload_progress + time.deltaTime/1000, 0), 2);
		} else {
			progress = total_progress/div_00_div_00_spn_00_div_00.curr_uploads;
		}
		
		if(div_01_asd_01_div_00.upload_progress < 1){
			div_01_asd_01_div_00.upload_progress = progress;
		} else {
			div_01_asd_01_div_00.upload_progress = Math.min(Math.max(div_01_asd_01_div_00.upload_progress + time.deltaTime/1000, 1), 2);
			div_00_div_00_spn_00_div_00.curr_uploads = 0;
			//mark all files as finished upload 
			for(var j = 0; j < div_00_div_00_spn_00_div_00.upload_files.length; j++){
				div_00_div_00_spn_00_div_00.upload_files[j].previous_upload = true;
			}
		}
		//progress bar for all uploading files
		var full_load_path_00 = LoadSymbolPath00(div_01_asd_01_div_00.upload_progress);
		var full_load_path_01 = LoadSymbolPath01(div_01_asd_01_div_00.upload_progress);
		div_01_asd_01_div_00.querySelector('#pth-00-svg-00-btn-03-div-00-div-01-asd-01-div-00').setAttribute('d', full_load_path_00);
		div_01_asd_01_div_00.querySelector('#pth-01-svg-00-btn-03-div-00-div-01-asd-01-div-00').setAttribute('d', full_load_path_01);
		
		//if delete folder flag is true, start to delete folders
		if(div_00_div_02_div_00.initiate_delete_folders === true){
			for(var k = 0; k < div_00_div_02_div_00.delete_folders.length; k++){
				FileActionXHR(div_00_div_02_div_00.delete_folders[k].folder_id, 0, '', div_00_div_02_div_00.delete_folders[k].parent_id);
			}
			div_00_div_02_div_00.delete_folders.length = 0;
			div_00_div_02_div_00.initiate_delete_folders = false;
		}
	}

	function File_Aside_Initialise(){
		
		spn_00_div_00 = document.querySelector('#spn-00-div-00');
		div_00_div_00_spn_00_div_00 = document.querySelector('#div-00-div-00-spn-00-div-00');
		var div_01_div_01_div_01_asd_01_div_00 = div_01_asd_01_div_00.querySelector('#div-01-div-01-div-01-asd-01-div-00');
		//set popup state
		spn_00_div_00.state = 0;
		//set the upload progress of aside loading symbol
		div_01_asd_01_div_00.upload_progress = 0;
		//set the aside active folder - zero is root
		div_01_asd_01_div_00.active_folder_id = SITE_DEFAULT_FOLDER_ID;
		//set the arrays of different file names, location, and id's
		div_01_asd_01_div_00.file_data = [];
		div_01_asd_01_div_00.files = [];
		
		div_01_asd_01_div_00.xhr = [];
		
		div_00_div_02_div_00 = document.querySelector('#div-00-div-02-div-00');
		div_00_div_02_div_00.sites_using = [];
		div_00_div_02_div_00.file_names = [];
		div_00_div_02_div_00.delete_file_count = 0;
		div_00_div_02_div_00.delete_folder_count = 0;
		div_00_div_02_div_00.initiate_delete_folders = false;
		div_00_div_02_div_00.delete_folders = [];
		
		div_01_div_02_div_00 = document.querySelector('#div-01-div-02-div-00');
		div_01_div_02_div_00.file_names = [];
		
		RefreshFileWindow();
		
		
		div_00_div_00_spn_00_div_00.upload_files = [];
		div_00_div_00_spn_00_div_00.upload_count = 0;
		div_00_div_00_spn_00_div_00.curr_uploads = 0;
		
		document.querySelector('#btn-00-div-00-div-01-asd-01-div-00 input').addEventListener('mousedown', function(){
			this.addToSection = null;
		});
		//iiterate input element files through and move to upload queue
		div_01_asd_01_div_00.querySelector('#btn-00-div-00-div-01-asd-01-div-00 input').addEventListener('change', function(){
			QueueFile(this);
		});
		
		//if the user clicks new folder
		div_01_asd_01_div_00.querySelector('#btn-01-div-00-div-01-asd-01-div-00').addEventListener('click', function(){
			UploadFileXHR(null, '', 'New Folder', null, true, null);
		});
		
		//if the user clicks the progress bar icon
		div_01_asd_01_div_00.querySelector('#btn-03-div-00-div-01-asd-01-div-00').addEventListener('click', function(){
			spn_00_div_00.state = 1;
			spn_00_div_00.style.opacity = '';
			spn_00_div_00.style.pointerEvents = '';
			html.style.overflow = 'hidden';
		});
		
		spn_00_div_00.querySelector('#svg-00-div-00-div-00-spn-00-div-00').addEventListener('click', function(){
			spn_00_div_00.state = 0;
			spn_00_div_00.style.opacity = 0;
			spn_00_div_00.style.pointerEvents = 'none';
			html.style.overflow = '';
		});
		spn_00_div_00.addEventListener('click', function(event){
			if(event.target.id === 'div-00-spn-00-div-00'){
				spn_00_div_00.state = 0;
				spn_00_div_00.style.opacity = 0;
				spn_00_div_00.style.pointerEvents = 'none';
				html.style.overflow = '';
			}
		});
		
		//back button
		div_01_div_01_div_01_asd_01_div_00.addEventListener('click', function(){
			var parent_id = null;
			for(var l = 0; l < div_01_asd_01_div_00.file_data.length; l++){
				//get the parent id of the active file
				if(div_01_asd_01_div_00.file_data[l].file_id === div_01_asd_01_div_00.active_folder_id){
					parent_id = div_01_asd_01_div_00.file_data[l].parent_id;
				}
			}
			div_01_asd_01_div_00.active_folder_id = parent_id;
			RefreshFileWindow();
		});
		
		
		//moving files on back button
		div_01_div_01_div_01_asd_01_div_00.addEventListener('mouseover', function(){
			if(spn_01_div_00.state === 3){
				div_01_div_01_div_01_asd_01_div_00.file_hover_timeout = setTimeout(function(){
					div_01_div_01_div_01_asd_01_div_00.querySelector('h3').style.color = 'rgb(110,100,255)';
					div_01_div_01_div_01_asd_01_div_00.querySelector('path').style.fill = 'rgb(110,100,255)';
					div_01_div_01_div_01_asd_01_div_00.file_hover_timeout = setTimeout(function(){
						div_01_div_01_div_01_asd_01_div_00.querySelector('h3').style.color = '';
						div_01_div_01_div_01_asd_01_div_00.querySelector('path').style.fill = '';
						div_01_div_01_div_01_asd_01_div_00.file_hover_timeout = setTimeout(function(){
							div_01_div_01_div_01_asd_01_div_00.querySelector('h3').style.color = 'rgb(110,100,255)';
							div_01_div_01_div_01_asd_01_div_00.querySelector('path').style.fill = 'rgb(110,100,255)';
							div_01_div_01_div_01_asd_01_div_00.file_hover_timeout = setTimeout(function(){
								var parent_id = null;
								for(var o = div_01_asd_01_div_00.file_data.length - 1; o >= 0; o--){
									//get the parent id of the active file
									if(div_01_asd_01_div_00.file_data[o].file_id === div_01_asd_01_div_00.active_folder_id){
										parent_id = div_01_asd_01_div_00.file_data[o].parent_id;
									}
								}
								div_01_asd_01_div_00.active_folder_id = parent_id;
								RefreshFileWindow();
							},100);
						},100);
					},100);
				},800);
			}
		});
		
		div_01_div_01_div_01_asd_01_div_00.addEventListener('mouseout', function(){
			if(spn_01_div_00.state === 3){
				clearTimeout(div_01_div_01_div_01_asd_01_div_00.file_hover_timeout);
				div_01_div_01_div_01_asd_01_div_00.querySelector('h3').style.color = '';
				div_01_div_01_div_01_asd_01_div_00.querySelector('path').style.fill = '';
			}
		});
		
		
		//delete button
		div_01_asd_01_div_00.querySelector('#btn-02-div-00-div-01-asd-01-div-00').addEventListener('click', function(){
			
			var file_array = [];
			
			for(var k = 0; k < div_01_asd_01_div_00.files.length; k++){
				if(div_01_asd_01_div_00.files[k].data.file_state === 1){
					file_array.push(div_01_asd_01_div_00.files[k]);
				}
			}
			
			div_00_div_02_div_00.delete_file_count = 0;
			div_00_div_02_div_00.sites_using.length = 0;
			
			div_01_div_02_div_00.file_names.length = 0;
			
			//iterate through selected files
			for(var m = 0; m < file_array.length; m++){
				//if not a folder
				if(file_array[m].data.file_type !== 'folder'){
					DeleteFile(file_array[m].data, div_01_asd_01_div_00.active_folder_id);
				} else { 
					DeleteFolder(file_array[m].data.file_id, div_01_asd_01_div_00.active_folder_id);
				}
			}
			
			if(div_00_div_02_div_00.delete_file_count > 0){
				//load file window animation
				div_01_asd_01_div_00.style.filter = 'brightness(0.9)';
				div_01_asd_01_div_00.querySelector('#div-01-div-01-asd-01-div-00').style.pointerEvents = 'none';
				div_01_asd_01_div_00.querySelector('#btn-01-div-00-div-01-asd-01-div-00').style.pointerEvents = 'none';
				div_01_asd_01_div_00.querySelector('#btn-02-div-00-div-01-asd-01-div-00').style.pointerEvents = 'none';
				div_01_asd_01_div_00.querySelector('#btn-03-div-00-div-01-asd-01-div-00').style.pointerEvents = 'none';
			} else {
				div_00_div_02_div_00.initiate_delete_folders = true;
			}
			
			
			if(div_01_div_02_div_00.file_names.length > 0){
				//failed deletion popup 
				var file_delete_string = ''; 
				for(var n = 0; n < div_01_div_02_div_00.file_names.length; n++){
					file_delete_string += "&#8226; " + div_01_div_02_div_00.file_names[n] + "<br>";
				}

				if(div_01_div_02_div_00.file_names.length > 1){
					//bring up popup window
					div_01_div_02_div_00.querySelector('#p-00-div-01-div-02-div-00').innerHTML = "The following files could not be deleted:<br><span>" + file_delete_string + "</span>Remove these files from all sections before deleting.";
					
					clearTimeout(div_01_div_02_div_00.timeout);
					div_01_div_02_div_00.style.display = '';
					div_01_div_02_div_00.style.transition = '0s';
					div_01_div_02_div_00.offsetHeight;
					div_01_div_02_div_00.style.transition = '0.5s';
					div_01_div_02_div_00.style.opacity = '';
					div_01_div_02_div_00.style.pointerEvents = '';
					div_01_div_02_div_00.style.transform = 'translate(0,0)';
					div_01_div_02_div_00.timeout = setTimeout(function(){
						div_01_div_02_div_00.style.opacity = '0';
						div_01_div_02_div_00.style.pointerEvents = 'none';
						div_01_div_02_div_00.style.transform = 'translate(0,-50px)';
						div_01_div_02_div_00.timeout = setTimeout(function(){
							div_01_div_02_div_00.style.display = 'none';
						},500);
					},9000);
				} else if(div_01_div_02_div_00.file_names.length === 1){
					//bring up popup window
					div_01_div_02_div_00.querySelector('#p-00-div-01-div-02-div-00').innerHTML = div_01_div_02_div_00.file_names[0] + " is in use on this website.<br><br>Remove from all sections before deleting.";
					
					clearTimeout(div_01_div_02_div_00.timeout);
					div_01_div_02_div_00.style.display = '';
					div_01_div_02_div_00.style.transition = '0s';
					div_01_div_02_div_00.offsetHeight;
					div_01_div_02_div_00.style.transition = '0.5s';
					div_01_div_02_div_00.style.opacity = '';
					div_01_div_02_div_00.style.pointerEvents = '';
					div_01_div_02_div_00.style.transform = 'translate(0,0)';
					div_01_div_02_div_00.timeout = setTimeout(function(){
						div_01_div_02_div_00.style.opacity = '0';
						div_01_div_02_div_00.style.pointerEvents = 'none';
						div_01_div_02_div_00.style.transform = 'translate(0,-50px)';
						div_01_div_02_div_00.timeout = setTimeout(function(){
							div_01_div_02_div_00.style.display = 'none';
						},500);
					},9000);
				}
			}

		});
		
		//during mouseover on aside while moving image, change colour
		div_01_asd_01_div_00.querySelector('#div-01-div-01-asd-01-div-00').addEventListener('mouseover', function(){
			if(spn_01_div_00.state === 3){
				div_01_asd_01_div_00.style.backgroundColor = 'rgba(248,247,255)';
			}
		});
		
		div_01_asd_01_div_00.querySelector('#div-01-div-01-asd-01-div-00').addEventListener('mouseout', function(){
			if(spn_01_div_00.state === 3){
				div_01_asd_01_div_00.style.backgroundColor = '';
			}
		});
	}
	
	function DeleteFile(file_data, parent_id){
		//check if file is being used
		var src = file_data.file_src;
		var deleting_file = true;
		for(var i = 0; i < sections.length; i++){
			if(sections[i].type === 0){
				if(sections[i].obj.querySelector('img').src === src && deleting_file === true){
					div_01_div_02_div_00.file_names.push(file_data.file_name);
					deleting_file = false;
				}
			} else if(sections[i].type === 3){
				if(sections[i].obj.querySelector('img').src === src && deleting_file === true){
					div_01_div_02_div_00.file_names.push(file_data.file_name);
					deleting_file = false;
				}
			} else if(sections[i].type === 4){
				var galleries_04 = sections[i].obj.querySelectorAll('.div-00-div-01-sec-04-div-00-div-00-div-00');

				for(var j = 0; j < galleries_04.length; j++){
					var images_04 = galleries_04[j].images;
					for(var k = 0; k < images_04.length; k++){
						if(images_04[k].querySelector('img').src === src && deleting_file === true){
							div_01_div_02_div_00.file_names.push(file_data.file_name);
							deleting_file = false;
						}
					}
				}
			} else if(sections[i].type === 7){
				var floorplans = sections[i].obj.querySelector('.div-00-sec-07-div-00-div-00-div-00').floorplans;
				for(var l = 0; l < floorplans.length; l++){
					if(floorplans[l].querySelector('img').src === src && deleting_file === true){
						div_01_div_02_div_00.file_names.push(file_data.file_name);
						deleting_file = false;
					}
				}
			} else if(sections[i].type === 12){
				var agent_00_src = sections[i].obj.querySelector('.img-00-div-00-div-00-div-00-sec-12-div-00-div-00-div-00').src;
				if(agent_00_src === src && deleting_file === true){
					div_01_div_02_div_00.file_names.push(file_data.file_name);
					deleting_file = false;
				}
				
				if(sections[i].obj.querySelectorAll('.div-00-div-00-sec-12-div-00-div-00-div-00')[1].visible === true){
					var agent_01_src = sections[i].obj.querySelectorAll('.img-00-div-00-div-00-div-00-sec-12-div-00-div-00-div-00')[1].src;
					if(agent_01_src === src && deleting_file === true){
						div_01_div_02_div_00.file_names.push(file_data.file_name);
						deleting_file = false;
					}
				}
			}
		}
		
		if(deleting_file === true){
			div_00_div_02_div_00.delete_file_count++;
			FileActionXHR(file_data.file_id, 0, '', parent_id);
		} else {
			window.setTimeout(function(){
				if(div_00_div_02_div_00.delete_file_count === 0){
					//load file window animation
					div_01_asd_01_div_00.style.filter = '';
					div_01_asd_01_div_00.querySelector('#div-01-div-01-asd-01-div-00').style.pointerEvents = '';
					div_01_asd_01_div_00.querySelector('#btn-01-div-00-div-01-asd-01-div-00').style.pointerEvents = '';
					div_01_asd_01_div_00.querySelector('#btn-02-div-00-div-01-asd-01-div-00').style.pointerEvents = '';
					div_01_asd_01_div_00.querySelector('#btn-03-div-00-div-01-asd-01-div-00').style.pointerEvents = '';
				}
			}, 1);
		}
	}
	
	function DeleteFolder(folder_id, parent_id){
		for(var i = 0; i < div_01_asd_01_div_00.file_data.length; i++){
			//if the parent id equals that of the folder, delete. If type is of folder, recursively call function
			if(div_01_asd_01_div_00.file_data[i].parent_id === folder_id){
				if(div_01_asd_01_div_00.file_data[i].file_type === 'folder'){
					DeleteFolder(div_01_asd_01_div_00.file_data[i].file_id, folder_id);
				} else {
					//delete the photo/file
					DeleteFile(div_01_asd_01_div_00.file_data[i], parent_id);
				}
			}
		}
		//delete folder
		var folder = {folder_id:folder_id, parent_id:parent_id};
		div_00_div_02_div_00.delete_folders.push(folder);
		div_00_div_02_div_00.delete_folder_count++;
	}
	
	function FileActionXHR(file_id, action, file_name = '', parent_id = ''){
		/*
		0 -> Delete file
		1 -> Rename file
		2 -> Move file
		*/
		//send file
		var xhr = new XMLHttpRequest();
		var url = DOCUMENT_ROOT + 'processes/file-action.php';
		
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				//if deleted file, remove from window
				if(action === 0){
					
					
					var index = null;
					
					for(var i = 0; i < div_01_asd_01_div_00.file_data.length; i++){
						if(div_01_asd_01_div_00.file_data[i].file_id === file_id){
							index = i;
						}
					}
					
					var sites_using = [];
					
					if(xhr.responseText !== ''){
						sites_using = JSON.parse(xhr.responseText);
					}
					
					for(var l = 0; l < sites_using.length; l++){
						var already_added = false;
						for(var k = 0; k < div_00_div_02_div_00.sites_using.length; k++){
							if(div_00_div_02_div_00.sites_using[k] === sites_using[l]){
								already_added = true;
							}
						}
						if(already_added === false){
							div_00_div_02_div_00.sites_using.push(sites_using[l]);
						}
					}
					
					if(div_01_asd_01_div_00.file_data[index].file_type === 'folder'){
						div_00_div_02_div_00.delete_folder_count--;
					} else {
						div_00_div_02_div_00.delete_file_count--;
					}
															
					if(div_00_div_02_div_00.delete_file_count === 0){
						
						div_00_div_02_div_00.initiate_delete_folders = true;

						var sites_using_string = ''; 
						for(var m = 0; m < div_00_div_02_div_00.sites_using.length; m++){
							sites_using_string += "&#8226; " + div_00_div_02_div_00.sites_using[m] + "<br>";
						}
																		
						if(div_00_div_02_div_00.sites_using.length > 1){
							if(div_00_div_02_div_00.completed_delete_file_count === 1){
								//bring up popup window
								div_00_div_02_div_00.querySelector('#p-00-div-00-div-02-div-00').innerHTML = div_01_asd_01_div_00.file_data[index].file_name + " is in use on the following websites:<br><span>" + sites_using_string + "</span>The file will remain visible on the above sites. To permanently remove the file, go to <a target='_blank' href='<?php echo $root ?>admin/sites/files'>the file manager</a>.";
							} else if(div_00_div_02_div_00.completed_delete_file_count === 2) {
								//bring up popup window
								div_00_div_02_div_00.querySelector('#p-00-div-00-div-02-div-00').innerHTML = div_01_asd_01_div_00.file_data[index].file_name + " and 1 other file are in use on the following websites:<br><span>" + sites_using_string + "</span>The files will remain visible on the above sites. To permanently remove a file, go to <a target='_blank' href='<?php echo $root ?>admin/sites/files'>the file manager</a>.";
							} else {
								//bring up popup window
								div_00_div_02_div_00.querySelector('#p-00-div-00div-02-div-00').innerHTML = div_01_asd_01_div_00.file_data[index].file_name + " and " + div_00_div_02_div_00.completed_delete_file_count - 1 + " other files are in use on the following websites:<br><span>" + sites_using_string + "</span>The files will remain visible on the above sites. To permanently remove a file, go to <a target='_blank' href='<?php echo $root ?>admin/sites/files'>the file manager</a>.";
							}
							clearTimeout(div_00_div_02_div_00.timeout);
							div_00_div_02_div_00.style.display = '';
							div_00_div_02_div_00.style.transition = '0s';
							div_00_div_02_div_00.offsetHeight;
							div_00_div_02_div_00.style.transition = '0.5s';
							div_00_div_02_div_00.style.opacity = '';
							div_00_div_02_div_00.style.pointerEvents = '';
							div_00_div_02_div_00.style.transform = 'translate(0,0)';
							div_00_div_02_div_00.timeout = setTimeout(function(){
								div_00_div_02_div_00.style.opacity = '0';
								div_00_div_02_div_00.style.pointerEvents = 'none';
								div_00_div_02_div_00.style.transform = 'translate(0,-50px)';
								div_00_div_02_div_00.timeout = setTimeout(function(){
									div_00_div_02_div_00.style.display = 'none';
								},500);
							},9000);
						} else if(div_00_div_02_div_00.sites_using.length === 1){
							if(div_00_div_02_div_00.completed_delete_file_count === 1){
								//bring up popup window
								div_00_div_02_div_00.querySelector('#p-00-div-00-div-02-div-00').innerHTML = div_01_asd_01_div_00.file_data[index].file_name + " is in use on the website:<br><span>" + sites_using_string + "</span>The file will remain visible on the above site. To permanently remove the file, go to <a target='_blank' href='<?php echo $root ?>admin/sites/files'>the file manager</a>.";
							} else if(div_00_div_02_div_00.completed_delete_file_count === 2) {
								//bring up popup window
								div_00_div_02_div_00.querySelector('#p-00-div-00-div-02-div-00').innerHTML = div_01_asd_01_div_00.file_data[index].file_name + " and 1 other file are in use on the website:<br><span>" + sites_using_string + "</span>The files will remain visible on the above site. To permanently remove a file, go to <a target='_blank' href='<?php echo $root ?>admin/sites/files'>the file manager</a>.";
							} else {
								//bring up popup window
								div_00_div_02_div_00.querySelector('#p-00-div-00-div-02-div-00').innerHTML = div_01_asd_01_div_00.file_data[index].file_name + " and " + div_00_div_02_div_00.completed_delete_file_count - 1 + " other files are in use on the following website:<br><span>" + sites_using_string + "</span>The files will remain visible on the above site. To permanently remove a file, go to <a target='_blank' href='<?php echo $root ?>admin/sites/files'>the file manager</a>.";
							}
							clearTimeout(div_00_div_02_div_00.timeout);
							div_00_div_02_div_00.style.display = '';
							div_00_div_02_div_00.style.transition = '0s';
							div_00_div_02_div_00.offsetHeight;
							div_00_div_02_div_00.style.transition = '0.5s';
							div_00_div_02_div_00.style.opacity = '';
							div_00_div_02_div_00.style.pointerEvents = '';
							div_00_div_02_div_00.style.transform = 'translate(0,0)';
							div_00_div_02_div_00.timeout = setTimeout(function(){
								div_00_div_02_div_00.style.opacity = '0';
								div_00_div_02_div_00.style.pointerEvents = 'none';
								div_00_div_02_div_00.style.transform = 'translate(0,-50px)';
								div_00_div_02_div_00.timeout = setTimeout(function(){
									div_00_div_02_div_00.style.display = 'none';
								},500);
							},9000);
						}
					}
					
					console.log('files:' + div_00_div_02_div_00.delete_file_count);
					console.log('folders:' + div_00_div_02_div_00.delete_folder_count);
					
					if(div_00_div_02_div_00.delete_folder_count === 0 && div_00_div_02_div_00.delete_file_count === 0){
						//load file window animation
						div_01_asd_01_div_00.style.filter = '';
						div_01_asd_01_div_00.querySelector('#div-01-div-01-asd-01-div-00').style.pointerEvents = '';
						div_01_asd_01_div_00.querySelector('#btn-01-div-00-div-01-asd-01-div-00').style.pointerEvents = '';
						div_01_asd_01_div_00.querySelector('#btn-02-div-00-div-01-asd-01-div-00').style.pointerEvents = '';
						div_01_asd_01_div_00.querySelector('#btn-03-div-00-div-01-asd-01-div-00').style.pointerEvents = '';
					}
					
					
					var obj_index = null;
					
					for(var j = 0; j < div_01_asd_01_div_00.files.length; j++){
						if(div_01_asd_01_div_00.files[j].data.file_id === file_id){
							obj_index = j;
						}
					}
					
					if(obj_index !== null){
						div_01_asd_01_div_00.querySelector('#div-01-div-01-asd-01-div-00').removeChild(div_01_asd_01_div_00.files[obj_index].container);
						//iterate through files and remove from array
						for(var j = 0; j < div_01_asd_01_div_00.files.length - 1; j++){
							if(j >= obj_index){
								//shift down by one
								div_01_asd_01_div_00.files[j] = div_01_asd_01_div_00.files[j + 1];
								div_01_asd_01_div_00.files[j].position--;
							}
						}
						div_01_asd_01_div_00.files.length--;
						
						//make the no-files label active
						if(div_01_asd_01_div_00.files.length === 0){
							div_01_asd_01_div_00.querySelector('#img-00-div-01-div-01-asd-01-div-00').style.display = '';
							div_01_asd_01_div_00.querySelector('#lbl-00-div-01-div-01-asd-01-div-00').style.display = '';
						}
					}
				}
			}
			
			if(xhr.readyState === 4){
				if(action === 2){
					RefreshFileWindow();
				}
			}
		};
		
		
		xhr.open('POST', url, true);
		xhr.setRequestHeader('action', action);
		xhr.setRequestHeader('file-id', file_id);
		if(action === 1){
			xhr.setRequestHeader('file-name', file_name);
		} else if(action === 2){
			xhr.setRequestHeader('parent-id', parent_id);
		}
		xhr.send();
	}
	
	function RefreshFileWindow(new_file_id = null){
		//get array of file names, file srcs, and file parent id's from database
		GetFilesXHR(new_file_id);
	}
	
	function fileObj(){
		this.container = '';
		this.data = '';
	}
	
	function GetFilesXHR(new_file_id){

		for(var y = 0; y < div_01_asd_01_div_00.xhr.length; y++){
			if(div_01_asd_01_div_00.xhr[y].readyState < 3 || div_01_asd_01_div_00.xhr[y].readyState !== 0){
				div_01_asd_01_div_00.xhr[y].cancelled = true;
			}
		}
		
		//load file window animation
		div_01_asd_01_div_00.style.filter = 'brightness(0.9)';
		div_01_asd_01_div_00.querySelector('#div-01-div-01-asd-01-div-00').style.pointerEvents = 'none';
		div_01_asd_01_div_00.querySelector('#btn-01-div-00-div-01-asd-01-div-00').style.pointerEvents = 'none';
		div_01_asd_01_div_00.querySelector('#btn-02-div-00-div-01-asd-01-div-00').style.pointerEvents = 'none';
		div_01_asd_01_div_00.querySelector('#btn-03-div-00-div-01-asd-01-div-00').style.pointerEvents = 'none';
		
		//send file
		div_01_asd_01_div_00.xhr.push(new XMLHttpRequest());
		div_01_asd_01_div_00.xhr[div_01_asd_01_div_00.xhr.length - 1].cancelled = false;
		var url = DOCUMENT_ROOT + 'processes/get-files.php?ts=' + time.now;
		
		div_01_asd_01_div_00.xhr[div_01_asd_01_div_00.xhr.length - 1].onreadystatechange = function(){
			if(div_01_asd_01_div_00.xhr[div_01_asd_01_div_00.xhr.length - 1].readyState === 4 && div_01_asd_01_div_00.xhr[div_01_asd_01_div_00.xhr.length - 1].cancelled === false){
				//reset loading animation
				div_01_asd_01_div_00.style.filter = '';
				div_01_asd_01_div_00.querySelector('#div-01-div-01-asd-01-div-00').style.pointerEvents = '';
				div_01_asd_01_div_00.querySelector('#btn-01-div-00-div-01-asd-01-div-00').style.pointerEvents = '';
				div_01_asd_01_div_00.querySelector('#btn-02-div-00-div-01-asd-01-div-00').style.pointerEvents = '';
				div_01_asd_01_div_00.querySelector('#btn-03-div-00-div-01-asd-01-div-00').style.pointerEvents = '';
				
				div_01_asd_01_div_00.file_data = JSON.parse(div_01_asd_01_div_00.xhr[div_01_asd_01_div_00.xhr.length - 1].responseText);
				//remove all files from window and hide back button
				div_01_asd_01_div_00.querySelector('#div-01-div-01-div-01-asd-01-div-00').style.display = 'none';
				
				//reset div_01_asd_01_div_00.files
				for(var k = 0; k < div_01_asd_01_div_00.files.length; k++){
					clearTimeout(div_01_asd_01_div_00.files[k].container.click_timeout);
					div_01_asd_01_div_00.querySelector('#div-01-div-01-asd-01-div-00').removeChild(div_01_asd_01_div_00.files[k].container);
				}
				div_01_asd_01_div_00.files.length = 0;
				
				//if not in root folder, make back button visible
				if(div_01_asd_01_div_00.active_folder_id !== 0){
					div_01_asd_01_div_00.querySelector('#div-01-div-01-div-01-asd-01-div-00').style.display = '';
					var parent_folder_name = '';
					var parent_id = null;
					for(var l = 0; l < div_01_asd_01_div_00.file_data.length; l++){
						//get the parent id of the active file
						if(parent_id === null){
							if(div_01_asd_01_div_00.file_data[l].file_id === div_01_asd_01_div_00.active_folder_id){
								parent_id = div_01_asd_01_div_00.file_data[l].parent_id;
								l = 0;
							}
						}
						
						if(parent_id !== null){
							if(div_01_asd_01_div_00.file_data[l].file_id === parent_id){
								parent_folder_name = div_01_asd_01_div_00.file_data[l].file_name;
							} else if(parent_id === 0){
								parent_folder_name = 'root folder';
							}
						}
					}
					div_01_asd_01_div_00.querySelector('#h3-00-div-01-div-01-div-01-asd-01-div-00').innerHTML = 'Back to "' + parent_folder_name + '"';
				}
				
				//if empty_folder false after iterating through files, make empty folder icon visible
				var empty_folder = true;
				
				//create files if not hidden
				for(var i = 0; i < div_01_asd_01_div_00.file_data.length; i++){
					//check if parent id equals active window id, and create files
					if(div_01_asd_01_div_00.file_data[i].parent_id === div_01_asd_01_div_00.active_folder_id){
						var moving_file = false;
						if(spn_01_div_00.state === 3){
							for(var n = 0; n < spn_01_div_00.files.length; n++){
								if(div_01_asd_01_div_00.file_data[i].file_id === spn_01_div_00.files[n].file_id){
									moving_file = true;
								}
							}
						}
						if(moving_file === false){
							empty_folder = false;
							//create file 
							SetFile(div_01_asd_01_div_00.file_data[i], new_file_id);
						}
					}
				}
				//no files button
				if(empty_folder === true){
					div_01_asd_01_div_00.querySelector('#img-00-div-01-div-01-asd-01-div-00').style.display = '';
					div_01_asd_01_div_00.querySelector('#lbl-00-div-01-div-01-asd-01-div-00').style.display = '';
				} else {
					div_01_asd_01_div_00.querySelector('#img-00-div-01-div-01-asd-01-div-00').style.display = 'none';
					div_01_asd_01_div_00.querySelector('#lbl-00-div-01-div-01-asd-01-div-00').style.display = 'none';
				}
			}
		};
		
		div_01_asd_01_div_00.xhr[div_01_asd_01_div_00.xhr.length - 1].open('POST', url, true);
		div_01_asd_01_div_00.xhr[div_01_asd_01_div_00.xhr.length - 1].send();
	}
	
	
	function setEndOfContenteditable(contentEditableElement){
		var range,selection;
		if(document.createRange){//Firefox, Chrome, Opera, Safari, IE 9+
			range = document.createRange();//Create a range (a range is a like the selection but invisible)
			range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
			range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
			selection = window.getSelection();//get the selection object (allows you to change selection)
			selection.removeAllRanges();//remove any selections already made
			selection.addRange(range);//make the range you have just created the visible selection
		}
		else if(document.selection){//IE 8 and lower 
			range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
			range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
			range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
			range.select();//Select the range (make it the visible selection
		}
	}
	
	function ChangeClickState(file, state){
		// click state 0 -> no action - waiting for first mouse down or selected
		// click state 1 -> experienced initial click - by mouseup, if still click state 1, it's a fast initial click & set file state to 1. Begin timeout for opening a folder - after 200ms, reset click state - but if second click occurs when click state is 1 still, then open folder.
		// click state 2 -> 400ms timeout has occured & click state set to 2, it's not a fast initial click ~ if second click occurs faster than 200ms later, rename file 
		file.data.click_state = state;
	}
	
	function ChangeFileState(file, state, index = -1){
		// file state 0 -> not selected
		// file state 1 -> selected
		// file state 2 -> renaming
		// file state 3 -> hide
		file.data.file_state = state;
		
		if(state === 0){
			file.container.querySelector('h3').style.color = '';
			file.container.querySelector('h3').style.pointerEvents = 'none';
			file.container.style.backgroundColor = '';
			file.container.querySelector('h3').blur();
		} else if(state === 1){
			file.container.querySelector('h3').blur();
			file.container.style.backgroundColor = 'rgb(110,100,255)';
			file.container.querySelector('h3').style.color = 'white';
			file.container.querySelector('h3').style.pointerEvents = 'none';
			div_01_asd_01_div_00.querySelector('#btn-02-div-00-div-01-asd-01-div-00').timeout = setTimeout(function(){
				div_01_asd_01_div_00.querySelector('#btn-02-div-00-div-01-asd-01-div-00').style.display = '';
			}, 200);
			if(index !== -1){
				spn_01_div_00.last_select = index;
			}
		} else if(state === 2){
			file.container.style.backgroundColor = 'rgb(255,255,200)';
			file.container.querySelector('h3').style.color = '';
			
			setTimeout(function() {
				var h3 = file.container.querySelector('h3');
				h3.focus();
				h3.style.pointerEvents = 'all';
				setEndOfContenteditable(h3);
			}, 0);
		} else if(state === 3){
			file.container.style.display = 'none';
		}
	}
	
	function SetFile(data, new_file_id){
				
		var index = div_01_asd_01_div_00.files.length;
		div_01_asd_01_div_00.files.length++;
		div_01_asd_01_div_00.files[index] = new fileObj();
		var file = div_01_asd_01_div_00.files[index];
		file.position = index;

		var template = div_01_asd_01_div_00.querySelector('.t-div-00-div-01-div-01-asd-01-div-00').cloneNode(true);
		template.className = 'div-00-div-01-div-01-asd-01-div-00';
		div_01_asd_01_div_00.files[index].container = template;
		div_01_asd_01_div_00.files[index].data = data;
		//set name
		template.querySelector('h3').innerHTML = data.file_name;
		//set icon to be file if src not present, or image with correct src
		const validImageTypes = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png'];
		if(validImageTypes.includes(data.file_type)){
			template.querySelector('img').src = data.file_preview_src + '?ts=' + time.now;
			template.querySelector('img').className = 'img-00-div-00-div-01-div-01-asd-01-div-00';
		} else if(data.file_type === 'folder'){
			template.querySelector('svg').setAttribute('class', 'svg-00-div-00-div-01-div-01-asd-01-div-00');
		} else {
			template.querySelector('.t-spn-00-div-00-div-01-div-01-asd-01-div-00').className = 'spn-00-div-00-div-01-div-01-asd-01-div-00';
			template.querySelector('.spn-00-div-00-div-01-div-01-asd-01-div-00').innerHTML = TruncatedExtension(data.file_type, 5);
		}
		div_01_asd_01_div_00.querySelector('#div-01-div-01-asd-01-div-00').appendChild(template);
		
		data.click_state = 0;
		data.file_state = 0;
		data.first_click_ts = 0;
		
		//set focus on new folder text, to rename
		if(new_file_id*1 === data.file_id){
			//set all click vars
			ChangeFileState(file, 2);
			template.first_click_duration = 10000000;
		}
		
		//click handler
		template.addEventListener('mousedown', function(){
			
			setTimeout(function(){
				clearTimeout(template.click_timeout);

				spn_01_div_00.click_pos.x = mouse_pos.x;
				spn_01_div_00.click_pos.y = mouse_pos.y;
				spn_01_div_00.state = 1;
				spn_01_div_00.last_clicked = file.position;
				if(spn_01_div_00.active_shift === false){
					spn_01_div_00.last_select = file.position;
				}

				//if it's the first click, just set time and drag variables - make sure not renaming
				if(data.click_state === 0 && data.file_state !== 2){
					ChangeClickState(file, 1);

					//set timeout
					template.click_timeout = setTimeout(function(){
						ChangeClickState(file, 2);
					}, 400);

				} else if(data.click_state === 1){
					if(data.file_type === 'folder'){
						//set active folder for window refresh, and hide the delete button
						div_01_asd_01_div_00.active_folder_id = data.file_id;
						clearTimeout(div_01_asd_01_div_00.querySelector('#btn-02-div-00-div-01-asd-01-div-00').timeout);
						div_01_asd_01_div_00.querySelector('#btn-02-div-00-div-01-asd-01-div-00').style.display = 'none';
						RefreshFileWindow();
					}
				} else if(data.click_state === 2){//then long initial click and occured fast enough to allow rename
					//select file for rename
					ChangeFileState(file, 2);
					ChangeClickState(file, 3);
					setTimeout(function(){
						ChangeClickState(file, 0);
					}, 1);
				}
			}, 0);
		});
		
		template.querySelector('h3').addEventListener('keydown', function(e){
			if(e.keyCode === 13){
				ChangeClickState(file, 0);
				ChangeFileState(file, 1, file.position);
				FileActionXHR(data.file_id, 1, this.innerText);
				data.file_name = this.innerText;
			}
		});
		
		template.addEventListener('mouseup', function(){
			
			clearTimeout(template.click_timeout);
			
			if(data.click_state === 1){//only held down briefly
				//select file
				if(spn_01_div_00.active_shift === false){
					if(spn_01_div_00.active_alt === true && data.file_state === 1){
						ChangeFileState(file, 0);
					} else {
						ChangeFileState(file, 1, file.position);
					}
				} else {
					if(spn_01_div_00.last_select !== -1){
						for(var i = 0; i < div_01_asd_01_div_00.files.length; i++){
							if(file.position < spn_01_div_00.last_select && file.position < i && i <= spn_01_div_00.last_select){
								ChangeFileState(div_01_asd_01_div_00.files[i], 1);
							}
							if(spn_01_div_00.last_select < file.position && spn_01_div_00.last_select <= i && i < file.position){
								ChangeFileState(div_01_asd_01_div_00.files[i], 1);
							}
						}
					}
					ChangeFileState(file, 1, file.position);
				}
			}
				
			template.click_timeout = setTimeout(function(){
				ChangeClickState(file, 0);
			}, 200);
		});
		
		
		//allow moving files to open folder
		if(data.file_type === 'folder'){
			template.addEventListener('mouseover', function(){
				if(spn_01_div_00.state === 3){
					template.file_hover_timeout = setTimeout(function(){
						template.style.backgroundColor = 'rgb(110,100,255)';
						template.querySelector('h3').style.color = 'white';
						if(spn_01_div_00.state === 3){
							template.file_hover_timeout = setTimeout(function(){
								template.style.backgroundColor = '';
								template.querySelector('h3').style.color = '';
								template.file_hover_timeout = setTimeout(function(){
									template.style.backgroundColor = 'rgb(110,100,255)';
									template.querySelector('h3').style.color = 'white';
									template.file_hover_timeout = setTimeout(function(){
										div_01_asd_01_div_00.active_folder_id = data.file_id;
										//make sure that file window is refreshed after releasing hold
										RefreshFileWindow();
									},100);
								},100);
							},100);
						}
					},800);
				}
			});
			
			//if user no longer drags files over folder, prevent opening it
			template.addEventListener('mouseout', function(){
				clearTimeout(template.file_hover_timeout);
			});
		}
	}
	
	function upload_files(file = '', container = '', progress_timeout = ''){
		this.finished_upload = false;
		this.file = file;
		this.upload_vars = '';
		this.container = container;
		this.progress_timeout = progress_timeout;
		this.xhr = undefined;
		this.cancelled = false;
		this.finished_upload = false;
		this.previous_upload = false;
	}
	
	function upload_vars(progress = 0, interval_time = 0, total_time = 0, last_bytes = 0, speed = 0){
		this.progress = progress;
		this.interval_time = interval_time;
		this.last_bytes = last_bytes;
		this.speed = speed;
		this.total_time = total_time;
		this.last_ts = time.now - time.start;
	}
	
	function QueueFile(input){
		var files = input.files;
		div_01_asd_01_div_00.upload_progress = 0;
		
		// FileReader
		if (FileReader && files && files.length > 0) {
			//iterate through files and add to queue, create new array without first file
			for(var i = 0; i < files.length; i++){
				SetFileUpload(files[i], files[i].name, files[i].type);
				div_00_div_00_spn_00_div_00.curr_uploads++;
			}
			
			div_01_asd_01_div_00.upload_progress = 0;
						
			//upload window icon
			div_00_div_00_spn_00_div_00.querySelector('img').style.display = 'none';
			div_00_div_00_spn_00_div_00.querySelector('label').style.display = 'none';
			div_01_asd_01_div_00.querySelector('#btn-03-div-00-div-01-asd-01-div-00').style.display = '';
		}
	}
	
	function SetFileUpload(file, name, type){
		
		var j = div_00_div_00_spn_00_div_00.upload_files.length;
		//add to upload array so file can be displayed in preview
		div_00_div_00_spn_00_div_00.upload_files.length ++;
		div_00_div_00_spn_00_div_00.upload_files[j] = new upload_files();
		div_00_div_00_spn_00_div_00.upload_files[j].upload_vars = new upload_vars();
		//append a new upload object to queue and send file to server
		var template = div_00_div_00_spn_00_div_00.querySelector('.t-div-00-div-00-div-00-div-00-spn-00-div-00').cloneNode(true);
		template.className = 'div-00-div-00-div-00-div-00-spn-00-div-00';
		const validImageTypes = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png'];
		if(validImageTypes.includes(type)){
			SetUploadImage(file, template.querySelector('.t-img-00-div-00-div-00-div-00-div-00-spn-00-div-00'));
		} else {
			template.querySelector('.t-spn-00-div-00-div-00-div-00-div-00-spn-00-div-00').className = 'spn-00-div-00-div-00-div-00-div-00-spn-00-div-00';
			template.querySelector('.spn-00-div-00-div-00-div-00-div-00-spn-00-div-00').innerHTML = TruncatedExtension(type, 5);
		}
		template.querySelector('.h4-00-div-00-div-00-div-00-div-00-spn-00-div-00').innerHTML = '' + TruncatedName(name, type);
		div_00_div_00_spn_00_div_00.querySelector('#div-00-div-00-div-00-spn-00-div-00').append(template);
		div_00_div_00_spn_00_div_00.upload_files[j].container = template;
		//open queue window
		spn_00_div_00.state = 1;
		spn_00_div_00.style.opacity = '';
		spn_00_div_00.style.pointerEvents = '';
		html.style.overflow = 'hidden';
		//scroll to bottom of upload window
		div_00_div_00_spn_00_div_00.querySelector('#div-00-div-00-div-00-spn-00-div-00').scrollTop = div_00_div_00_spn_00_div_00.querySelector('#div-00-div-00-div-00-spn-00-div-00').scrollHeight;
		//prepare XHR
		UploadFileXHR(file, name, j, false);
		//Delete button
		DeleteUpload(j);
	}
	
	function SetUploadImage(file, img){
		var fr = new FileReader();
		//when completed read request, file is represented using url
		fr.readAsDataURL(file);
		//when finished, create upload object and begin xhr process
		fr.onload = function () {
			img.src = fr.result;
			img.className = 'img-00-div-00-div-00-div-00-div-00-spn-00-div-00';
		};
	}
	
	function DeleteUpload(i){
		div_00_div_00_spn_00_div_00.upload_files[i].container.querySelector('.btn-00-div-00-div-00-div-00-div-00-spn-00-div-00').addEventListener('click', function(){
			//cancel xhr and remove from upload array
			if(div_00_div_00_spn_00_div_00.upload_files[i].xhr_opened === true){
				div_00_div_00_spn_00_div_00.upload_files[i].xhr.abort();
				UploadNewFile();
			} else {
				div_00_div_00_spn_00_div_00.upload_files[i].xhr_opened = true;
			}
			
			//remove from container
			div_00_div_00_spn_00_div_00.querySelector('#div-00-div-00-div-00-spn-00-div-00').removeChild(div_00_div_00_spn_00_div_00.upload_files[i].container);
			//set upload vars to not process
			div_00_div_00_spn_00_div_00.upload_files[i].cancelled = true;
			div_00_div_00_spn_00_div_00.curr_uploads--;
			div_00_div_00_spn_00_div_00.upload_files[i].upload_vars.progress = 2;
			clearTimeout(div_00_div_00_spn_00_div_00.upload_files[i].progress_timeout);
			//!!! cannot remove file from upload_files array - index is used in other functions. Array is cleared upon refresh anyway
			var no_complete_uploads = true;
			for(var j = 0; j < div_00_div_00_spn_00_div_00.upload_files.length; j++){
				if(div_00_div_00_spn_00_div_00.upload_files[j].finished_upload === true || div_00_div_00_spn_00_div_00.upload_files[j].upload_vars.progress < 2){
					no_complete_uploads = false;
				}
			}
			//display 'no uploads' if last one and hide upload icon
			if(no_complete_uploads === true){
				div_00_div_00_spn_00_div_00.querySelector('img').style.display = '';
				div_00_div_00_spn_00_div_00.querySelector('label').style.display = '';
				div_01_asd_01_div_00.querySelector('#btn-03-div-00-div-01-asd-01-div-00').style.display = 'none';
			}
		});
	}
	
	function TruncatedName(filename, filetype){
		if(filetype){
			filename = filename.split('.')[0];
			var split_string = filetype.split('/')[1].split('.');
			var extension = split_string[split_string.length - 1];
			return filename + '.' + extension;
		} else {
			return filename.split('.')[0];
		}
	}
	
	function TruncatedExtension(filetype, length){
		if(filetype){
			var split_string = filetype.split('/')[1].split('.');
			return '.' + split_string[split_string.length - 1].substring(0,length);
		} else {
			return '';
		}
	}
	
	function UploadFileXHR(file, name, i, folder){
				
		var url = DOCUMENT_ROOT + 'processes/upload-file.php';

		if(folder === false){
			div_00_div_00_spn_00_div_00.upload_files[i].form_data = new FormData();
			div_00_div_00_spn_00_div_00.upload_files[i].form_data.append('file', file);
			
			div_00_div_00_spn_00_div_00.upload_files[i].xhr = new XMLHttpRequest();
			
			div_00_div_00_spn_00_div_00.upload_files[i].name = name;
			div_00_div_00_spn_00_div_00.upload_files[i].parent_id = div_01_asd_01_div_00.active_folder_id;
			
			div_00_div_00_spn_00_div_00.upload_files[i].xhr.upload.onprogress = function(e){
				if(div_00_div_00_spn_00_div_00.upload_files[i].cancelled === false){
					UploadProgress(e, i);
				} 
			};

			div_00_div_00_spn_00_div_00.upload_files[i].xhr.onreadystatechange = function(){
				
				if(div_00_div_00_spn_00_div_00.upload_files[i].xhr.readyState === 4 && div_00_div_00_spn_00_div_00.upload_files[i].cancelled === false){
					
					div_00_div_00_spn_00_div_00.upload_files[i].data = JSON.parse(div_00_div_00_spn_00_div_00.upload_files[i].xhr.responseText)[0];
					if(document.querySelector('#btn-00-div-00-div-01-asd-01-div-00 input').addToSection !== null){
						SetSectionImage(document.querySelector('#btn-00-div-00-div-01-asd-01-div-00 input').addToSection, div_00_div_00_spn_00_div_00.upload_files[i].data);
					}
					if(div_00_div_00_spn_00_div_00.upload_files[i].upload_vars.progress >= 1){
						UploadComplete(div_00_div_00_spn_00_div_00.upload_files[i], i);
					}
					
					UploadNewFile();
				}
			};
			
			div_00_div_00_spn_00_div_00.upload_files[i].xhr_opened = false;
			
			if(div_00_div_00_spn_00_div_00.upload_count < 4){
				div_00_div_00_spn_00_div_00.upload_count++;
				div_00_div_00_spn_00_div_00.upload_files[i].xhr_opened = true;
				div_00_div_00_spn_00_div_00.upload_files[i].xhr.open('POST', url, true);
				
				//send name and current active folder
				div_00_div_00_spn_00_div_00.upload_files[i].xhr.setRequestHeader('file-name', name);
				div_00_div_00_spn_00_div_00.upload_files[i].xhr.setRequestHeader('parent-id', div_01_asd_01_div_00.active_folder_id);
				div_00_div_00_spn_00_div_00.upload_files[i].xhr.setRequestHeader('folder', false);
				
				div_00_div_00_spn_00_div_00.upload_files[i].xhr.send(div_00_div_00_spn_00_div_00.upload_files[i].form_data);
			}
			
		} else {
			var form_data = new FormData();
			form_data.append('file', file);
			
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function(){
				if(xhr.readyState === 4){
					RefreshFileWindow(xhr.getResponseHeader('file-id'));
				}
			};
			
			xhr.open('POST', url, true);
			xhr.setRequestHeader('file-name', name);
			xhr.setRequestHeader('parent-id', div_01_asd_01_div_00.active_folder_id);
			xhr.setRequestHeader('folder', true);
			xhr.send();
		}
	}
	
	function UploadNewFile(){
		//upload next file
		div_00_div_00_spn_00_div_00.upload_count--;
		for(var j = 0; j < div_00_div_00_spn_00_div_00.upload_files.length; j++){
			if(div_00_div_00_spn_00_div_00.upload_count < 4){
				if(div_00_div_00_spn_00_div_00.upload_files[j].xhr_opened === false){

					div_00_div_00_spn_00_div_00.upload_files[j].xhr.open('POST', DOCUMENT_ROOT + 'processes/upload-file.php', true);

					//send name and current active folder
					div_00_div_00_spn_00_div_00.upload_files[j].xhr.setRequestHeader('file-name', div_00_div_00_spn_00_div_00.upload_files[j].name);
					div_00_div_00_spn_00_div_00.upload_files[j].xhr.setRequestHeader('parent-id', div_00_div_00_spn_00_div_00.upload_files[j].parent_id);
					div_00_div_00_spn_00_div_00.upload_files[j].xhr.setRequestHeader('folder', false);

					div_00_div_00_spn_00_div_00.upload_files[j].xhr.send(div_00_div_00_spn_00_div_00.upload_files[j].form_data);

					div_00_div_00_spn_00_div_00.upload_count++;
					div_00_div_00_spn_00_div_00.upload_files[j].xhr_opened = true;
				}
			}
		}
	}
	
	function UploadProgress(e, i){
		if(e.lengthComputable){
			var uploaded = e.loaded;
			var total = e.total;
			var progress = Math.min(Math.max(uploaded/total, 0), 2);
			div_00_div_00_spn_00_div_00.upload_files[i].upload_vars.interval_time += time.now - time.start - div_00_div_00_spn_00_div_00.upload_files[i].upload_vars.last_ts;
			div_00_div_00_spn_00_div_00.upload_files[i].upload_vars.total_time += time.now - time.start - div_00_div_00_spn_00_div_00.upload_files[i].upload_vars.last_ts;
			div_00_div_00_spn_00_div_00.upload_files[i].upload_vars.last_ts = time.now - time.start;
			
			if(progress >= 1){
				//remove delete button
				div_00_div_00_spn_00_div_00.upload_files[i].container.removeChild(div_00_div_00_spn_00_div_00.upload_files[i].container.querySelector('.btn-00-div-00-div-00-div-00-div-00-spn-00-div-00'));
				div_00_div_00_spn_00_div_00.upload_files[i].container.querySelector('.svg-00-div-00-div-00-div-00-div-00-spn-00-div-00').style.right = '20px';
			}
			
			//update progress var
			div_00_div_00_spn_00_div_00.upload_files[i].upload_vars.progress = progress;
			//update svg
			var path_00 = LoadSymbolPath00(progress);
			div_00_div_00_spn_00_div_00.upload_files[i].container.querySelector('.pth-00-svg-00-div-00-div-00-div-00-div-00-spn-00-div-00').setAttribute('d', path_00);
			var path_01 = LoadSymbolPath01(progress);
			div_00_div_00_spn_00_div_00.upload_files[i].container.querySelector('.pth-01-svg-00-div-00-div-00-div-00-div-00-spn-00-div-00').setAttribute('d', path_01);
				
			if(div_00_div_00_spn_00_div_00.upload_files[i].upload_vars.interval_time >= 1000){
				div_00_div_00_spn_00_div_00.upload_files[i].upload_vars.interval_time -= 1000;
				div_00_div_00_spn_00_div_00.upload_files[i].upload_vars.speed = uploaded - div_00_div_00_spn_00_div_00.upload_files[i].upload_vars.last_bytes; 
				div_00_div_00_spn_00_div_00.upload_files[i].upload_vars.last_bytes = uploaded;
				
				//Calculating ETR
				var remainingBytes = total - uploaded;
				var timeRemaining = remainingBytes / uploaded * div_00_div_00_spn_00_div_00.upload_files[i].upload_vars.total_time;
				div_00_div_00_spn_00_div_00.upload_files[i].container.querySelector('.lbl-00-div-00-div-00-div-00-div-00-div-00-spn-00-div-00').innerHTML = ByteFormat(div_00_div_00_spn_00_div_00.upload_files[i].upload_vars.speed);

				div_00_div_00_spn_00_div_00.upload_files[i].container.querySelector('.lbl-01-div-00-div-00-div-00-div-00-div-00-spn-00-div-00').innerHTML = TimeFormat(Math.round(timeRemaining/1000));
			}
			
			//completed or experiencing difficulties uploading timeout
			clearTimeout(div_00_div_00_spn_00_div_00.upload_files[i].progress_timeout);
			
			div_00_div_00_spn_00_div_00.upload_files[i].progress_timeout = setTimeout(function(){
				//echo processing image if close, or experiencing diffulties uploaded. Retrying...
				if(progress >= 1){
					div_00_div_00_spn_00_div_00.upload_files[i].container.querySelector('.lbl-00-div-00-div-00-div-00-div-00-div-00-spn-00-div-00').innerHTML = 'Processing Upload';
					div_00_div_00_spn_00_div_00.upload_files[i].container.querySelector('.lbl-01-div-00-div-00-div-00-div-00-div-00-spn-00-div-00').innerHTML = '';
				} else {
					//the difficulty uploading timeout
					div_00_div_00_spn_00_div_00.upload_files[i].progress_timeout = setTimeout(function(){
						div_00_div_00_spn_00_div_00.upload_files[i].container.querySelector('.lbl-00-div-00-div-00-div-00-div-00-div-00-spn-00-div-00').innerHTML = 'Experiencing difficulties uploading. Retrying upload';
						div_00_div_00_spn_00_div_00.upload_files[i].container.querySelector('.lbl-01-div-00-div-00-div-00-div-00-div-00-spn-00-div-00').innerHTML = '';
						//the ellipsis timeout
						div_00_div_00_spn_00_div_00.upload_files[i].progress_timeout = setTimeout(function(){
							//echo processing image if close, or experiencing diffulties uploaded. Retrying...
							div_00_div_00_spn_00_div_00.upload_files[i].container.querySelector('.lbl-00-div-00-div-00-div-00-div-00-div-00-spn-00-div-00').innerHTML = 'Experiencing difficulties uploading. Retrying upload.';
							div_00_div_00_spn_00_div_00.upload_files[i].progress_timeout = setTimeout(function(){
								//echo processing image if close, or experiencing diffulties uploaded. Retrying...
								div_00_div_00_spn_00_div_00.upload_files[i].container.querySelector('.lbl-00-div-00-div-00-div-00-div-00-div-00-spn-00-div-00').innerHTML = 'Experiencing difficulties uploading. Retrying upload..';
								div_00_div_00_spn_00_div_00.upload_files[i].progress_timeout = setTimeout(function(){
									//echo processing image if close, or experiencing diffulties uploaded. Retrying...
									div_00_div_00_spn_00_div_00.upload_files[i].container.querySelector('.lbl-00-div-00-div-00-div-00-div-00-div-00-spn-00-div-00').innerHTML = 'Experiencing difficulties uploading. Retrying upload...';
									div_00_div_00_spn_00_div_00.upload_files[i].progress_timeout = setTimeout(function(){
										//echo processing image if close, or experiencing diffulties uploaded. Retrying...
										div_00_div_00_spn_00_div_00.upload_files[i].container.querySelector('.lbl-00-div-00-div-00-div-00-div-00-div-00-spn-00-div-00').innerHTML = 'Connection to server failed. Cancelled Upload.';
										div_00_div_00_spn_00_div_00.upload_files[i].xhr.abort();
										div_00_div_00_spn_00_div_00.upload_files[i].container.querySelector('svg').style.display = 'none';
										div_00_div_00_spn_00_div_00.upload_files[i].upload_vars.progress = 2;
									},40000);
								},5000);
							},5000);
						},5000);
					}, 5000);
				}
			},100);
		}
	}
	
	function UploadComplete(file, i){
		clearTimeout(div_00_div_00_spn_00_div_00.upload_files[i].progress_timeout);
				
		div_00_div_00_spn_00_div_00.upload_files[i].upload_vars.progress = Math.min(Math.max(div_00_div_00_spn_00_div_00.upload_files[i].upload_vars.progress + time.deltaTime/1000, 0), 2);
		//update svg
		var path_00 = LoadSymbolPath00(div_00_div_00_spn_00_div_00.upload_files[i].upload_vars.progress);
		div_00_div_00_spn_00_div_00.upload_files[i].container.querySelector('.pth-00-svg-00-div-00-div-00-div-00-div-00-spn-00-div-00').setAttribute('d', path_00);
		var path_01 = LoadSymbolPath01(div_00_div_00_spn_00_div_00.upload_files[i].upload_vars.progress);
		div_00_div_00_spn_00_div_00.upload_files[i].container.querySelector('.pth-01-svg-00-div-00-div-00-div-00-div-00-spn-00-div-00').setAttribute('d', path_01);
		
		div_00_div_00_spn_00_div_00.upload_files[i].container.querySelector('.lbl-00-div-00-div-00-div-00-div-00-div-00-spn-00-div-00').innerHTML = 'File Upload Complete';

		div_00_div_00_spn_00_div_00.upload_files[i].container.querySelector('.lbl-01-div-00-div-00-div-00-div-00-div-00-spn-00-div-00').innerHTML = '';
		
		//prevent no upload becoming visible
		div_00_div_00_spn_00_div_00.upload_files[i].finished_upload = true;
				
		//add file to the file window if the correct folder is open
		if(file.parent_id === div_01_asd_01_div_00.active_folder_id){
			div_01_asd_01_div_00.file_data.push(file.data);
			SetFile(div_01_asd_01_div_00.file_data[div_01_asd_01_div_00.file_data.length - 1], -1);
			div_01_asd_01_div_00.querySelector('#img-00-div-01-div-01-asd-01-div-00').style.display = 'none';
			div_01_asd_01_div_00.querySelector('#lbl-00-div-01-div-01-asd-01-div-00').style.display = 'none';
		}
	}
	
	function LoadSymbolPath00(t){
		var path = '';
		if(t <= 1){
			path = 'M 5 0.8 A 4.2 4.2 0 0 1 5 9.2 A 4.2 4.2 0 0 1 5 0.8';
		} else if(t < 1.4){
			var k = (t - 1)/0.4;
			path = 'M ' + (5 - 4.5 * k) + ' ' + (0.8 + 4.2 * k) + ' A ' + (4.2 - 4.2 * k) + ' ' + (4.2 - 4.2 * k) + ' 0 0 1 ' + (5 - 4.5 * k) + ' ' + (9.2 - 4.2 * k) + ' A ' + (4.2 - 4.2 * k) + ' ' + (4.2 - 4.2 * k) + ' 0 0 1 ' + (5 - 4.5 * k) + ' ' + (0.8 + 4.2 * k);
		} else {
			path = '';
		}
		return path;
	}
	
	function LoadSymbolPath01(t){
		var path = '';
		if(t < 0.5){
			path = 'M 5 0.8 A 4.2 4.2 0 0 1 ' + (5 + Math.sin(t * 2 * Math.PI) * 4.2) + ' ' + (5 - Math.cos(t * 2 * Math.PI) * 4.2);
		} else if(t <= 1){
			path = 'M 5 0.8 A 4.2 4.2 0 0 1 5 9.2 A 4.2 4.2 0 0 1 ' + (5 + Math.sin(t * 2 * Math.PI) * 4.2) + ' ' + (5 - Math.cos(t * 2 * Math.PI) * 4.2);
		} else if(t < 1.4){
			var k = (t - 1)/0.4;
			path = 'M ' + (5 - 4.5 * k) + ' ' + (0.8 + 4.2 * k) + ' A ' + (4.2 - 4.2 * k) + ' ' + (4.2 - 4.2 * k) + ' 0 0 1 ' + (5 - 4.5 * k) + ' ' + (9.2 - 4.2 * k) + ' A ' + (4.2 - 4.2 * k) + ' ' + (4.2 - 4.2 * k) + ' 0 0 1 ' + (5 - 4.5 * k) + ' ' + (0.8 + 4.2 * k);
		} else if(t < 1.6){
			var l = (t - 1.4)/0.2;
			path = 'M 0.5 5 L ' + (0.5 + l * 2) + ' ' + (5 + l * 2);
		} else {
			var m = Math.min((t - 1.6)/0.4, 1);
			path = 'M 0.5 5 L 2.5 7 L ' + (2.5 + F1(m) * 5.5) + ' ' + (7 - F1(m) * 5);
		}
		
		return path;
	}
	
	function TimeFormat(n){
		if(n < 1){
			return '1 second';
		} else if(n < 60){
			return n + ' seconds';
		} else if(n/60 <= 1){
			return '1 minute';
		} else if(n/60 < 60){
			return Math.ceil(n/60) + ' minutes';
		} else {
			var hours = Math.floor(n/3600);
			return hours + 'h ' + (n/3600 - hours) * 60 + 'm';
		}
	}
	
	function ByteFormat(n){
		if(n < 1000000){
			return Math.round(n/1000 * 100)/100 + 'Kbps';
		} else if(n < 1000000000){
			return Math.round(n/1000000 * 100)/100 + 'Mbps';
		} else {
			return Math.round(n/1000000000 * 100)/100 + 'Gbps';
		}
	}

	function Asd_01(){
		
		//reveal layers panel
		if(btn_00_spn_00_asd_01_div_00[0].active === true){
			div_00_asd_01_div_00.t = Math.min(div_00_asd_01_div_00.t + time.deltaTime/500, 1);
		} else {
			div_00_asd_01_div_00.t = Math.max(div_00_asd_01_div_00.t - time.deltaTime/500, 0);
		}
		
		if(div_00_asd_01_div_00.t < 0.5){
			div_00_asd_01_div_00.style.display = 'none';
		} else {
			div_00_asd_01_div_00.style.display = '';
		}
			
		div_00_asd_01_div_00.style.transform = 'translate(' + ((F1(Math.min(Math.max(div_00_asd_01_div_00.t * 2 - 1, 0),1)) - 1) * 260) + 'px, -50%)';
				
		//reveal media panel
		if(btn_00_spn_00_asd_01_div_00[1].active === true){
			div_01_asd_01_div_00.t = Math.min(div_01_asd_01_div_00.t + time.deltaTime/500, 1);
		} else {
			div_01_asd_01_div_00.t = Math.max(div_01_asd_01_div_00.t - time.deltaTime/500, 0);
		}
		
		if(div_01_asd_01_div_00.t < 0.5){
			div_01_asd_01_div_00.style.display = 'none';
		} else {
			div_01_asd_01_div_00.style.display = '';
		}
				
		div_01_asd_01_div_00.style.transform = 'translate(' + ((F1(Math.min(Math.max(div_01_asd_01_div_00.t * 2 - 1, 0),1)) - 1) * 260) + 'px, -50%)';
		
		
		
		//hide buttons if any panels are open
		if(div_00_asd_01_div_00.t > 0.5 || div_01_asd_01_div_00.t > 0.5){
			spn_00_asd_01_div_00.style.display = 'none';
		} else {
			spn_00_asd_01_div_00.style.display = 'flex';
		}
		
		spn_00_asd_01_div_00.style.opacity = 1 - F1(Math.min((div_00_asd_01_div_00.t + div_01_asd_01_div_00.t)*2,1));
		
		
		
		
		
		//move as scroll
		var scroll_new = Math.max(25 - scroll_y/2, 0);
		
		if(asd_01_div_00.scroll_target !== scroll_new){
			
			asd_01_div_00.scroll_target = scroll_new;
			asd_01_div_00.scroll_t = 0;
		}
		
		asd_01_div_00.scroll_t = Math.min(asd_01_div_00.scroll_t + time.deltaTime/5000, 1);
		
		asd_01_div_00.scroll_curr = asd_01_div_00.scroll_curr + (asd_01_div_00.scroll_target - asd_01_div_00.scroll_curr) * F1(asd_01_div_00.scroll_t);
		
		asd_01_div_00.style.top = 'calc(50% + ' + asd_01_div_00.scroll_curr + 'px)';
		
		
		
		//scroll container to set value if t is less than 1
		if(div_00_div_00_asd_01_div_00.t < 1){
			div_00_div_00_asd_01_div_00.t = Math.min(Math.max(div_00_div_00_asd_01_div_00.t + time.deltaTime/500, 0), 1); 
			var scroll = div_00_div_00_asd_01_div_00.t * (div_00_div_00_asd_01_div_00.scroll_target - div_00_div_00_asd_01_div_00.scroll_start) + div_00_div_00_asd_01_div_00.scroll_start;
			div_00_div_00_asd_01_div_00.scrollTop = scroll;
		}
	}
	
	function MoveLayers(){
		
		for(var i = 0; i < sections.length; i++){
			//if layer is being moved
			if(sections[i].layer_position === div_00_div_00_asd_01_div_00.moving_layer){

				//scroll down when at bottom of layers panel but not when fully scrolled down
				if(mouse_pos.y - sections[i].layer.click_pos.y + sections[i].layer.top_value < div_00_div_00_asd_01_div_00.scroll_position + 15){
					var upper_scroll_pos = div_00_div_00_asd_01_div_00.scroll_position;
					div_00_div_00_asd_01_div_00.scroll_position = Math.max(div_00_div_00_asd_01_div_00.scroll_position - 3, 0);
					sections[i].layer.click_pos.y = sections[i].layer.click_pos.y + upper_scroll_pos - div_00_div_00_asd_01_div_00.scroll_position;
				}
				//scroll up when at top of layers panel, make sure not to continue if at very top of container
				if(mouse_pos.y - sections[i].layer.click_pos.y + sections[i].layer.top_value > div_00_div_00_asd_01_div_00.scrollTop + div_00_div_00_asd_01_div_00.getBoundingClientRect().height - 45){
					var lower_scroll_pos = div_00_div_00_asd_01_div_00.scroll_position;
					div_00_div_00_asd_01_div_00.scroll_position = Math.min(div_00_div_00_asd_01_div_00.scroll_position + 3, sections.length * 50 - div_00_div_00_asd_01_div_00.getBoundingClientRect().height);
					sections[i].layer.click_pos.y = sections[i].layer.click_pos.y - (div_00_div_00_asd_01_div_00.scroll_position - lower_scroll_pos);
				}
				
				//move layer based on mouse position - click_pos is the new location of layer on the screen. set styling.
				var layer_transform_y = mouse_pos.y - sections[i].layer.click_pos.y;
				sections[i].layer.style.top = Math.min(Math.max(layer_transform_y + sections[i].layer.top_value, 0), sections.length * 50 - 50) + 'px';
				sections[i].layer.style.transform = 'scale(1.02)';
				sections[i].layer.style.boxShadow = '1px 1px 15px -5px rgba(0,0,0,0.2)';
				
				
				var k, j;
				//run through in order from low to high
				for(j = 0; j < sections.length; j++){
					for(k = 0; k < sections.length; k++){
						//if div position is equal to j.... then running through in order
						if(sections[k].layer_position === j){
							//if layer is higher than other layers but has a lower sort value, switch
							if(layer_transform_y + sections[i].layer.top_value + 20 > sections[k].layer.top_value && sections[i].layer_position < sections[k].layer_position){
								//move layer up a position
								sections[k].layer_position--;
								sections[i].layer_position ++;
								div_00_div_00_asd_01_div_00.moving_layer++;
								
								div_00_div_00_div_00.insertBefore(sections[i].obj, sections[k].obj.nextElementSibling);
								sections[k].top = sections[i].top;
								sections[k].obj.style.top = sections[k].top + 'px';
								sections[i].top = sections[i].top + sections[k].obj.offsetHeight - 20;
								
								sections[i].layer.click_pos.y += 50;
								layer_transform_y = mouse_pos.y - sections[i].layer.click_pos.y;
								sections[i].layer.top_value += 50;
								sections[k].layer.top_value -= 50;
								div_00_div_00_asd_01_div_00.insertBefore(sections[i].layer, sections[k].layer.nextElementSibling);
							}
						}
					}
				}
				//run through in order from low to high
				for(j = 0; j < sections.length; j++){
					for(k = 0; k < sections.length; k++){
						//if div position is equal to j.... then running through in order high to low
						if(sections[k].layer_position === sections.length - j - 1){
							//if layer is higher than other layers but has a lower value sort value, switch
							if(layer_transform_y + sections[i].layer.top_value - 20 < sections[k].layer.top_value && sections[i].layer_position > sections[k].layer_position){
								//move layer down a position
								sections[k].layer_position++;
								sections[i].layer_position --;
								div_00_div_00_asd_01_div_00.moving_layer --;
								
								div_00_div_00_div_00.insertBefore(sections[i].obj, sections[k].obj);
								sections[i].top = sections[k].top;
								sections[k].top = sections[k].top + sections[i].obj.offsetHeight - 20;
								sections[k].obj.style.top = sections[k].top + 'px';
								
								sections[i].layer.click_pos.y -= 50;
								layer_transform_y = mouse_pos.y - sections[i].layer.click_pos.y;
								sections[i].layer.top_value -= 50;
								sections[k].layer.top_value += 50;
								div_00_div_00_asd_01_div_00.insertBefore(sections[i].layer, sections[k].layer);
							}
						}
					}
				}
				
				//scroll down to moving layer
				for(var m = 0; m < sections.length; m++){
					
				}
			}
		}
		
		
				
		if(div_00_div_00_asd_01_div_00.moving_layer !== -1){
			
			for(var n = 0; n < sections.length; n++){
				sections[n].obj.style.transform = 'scale(0.75)';
				sections[n].obj.style.borderRadius = '20px';
				sections[n].obj.style.boxShadow = '2px 2px 80px -40px rgba(0,0,0,0.5)';
				document.body.style.backgroundColor = 'rgb(52,50,54)';
				sections[n].obj.style.top = sections[n].top + 'px';
				sections[n].obj.style.position = 'absolute';
				sections[n].layer.style.position = 'absolute';
				sections[n].obj.style.transition = '0.5s';
				
				//layer top
				if(div_00_div_00_asd_01_div_00.moving_layer !== sections[n].layer_position){
					sections[n].layer.style.top = sections[n].layer.top_value + 'px';
				}
				
				//active layer movement
				if(div_00_div_00_asd_01_div_00.moving_layer === sections[n].layer_position){
					//scale larger
					sections[n].obj.style.transform = 'scale(0.8)';
					//moving actual layers
					//get the proportional change in layer on the right, and move active main section by same amount
					//get the amount diverging from the active section
					var layer_transform_ratio = (mouse_pos.y - sections[n].layer.click_pos.y) / 50;
					//get the previous layer
					var layer_transform_last = Math.min(Math.max(Math.floor(Math.abs(layer_transform_ratio)) * Math.sign(layer_transform_ratio) + sections[n].layer_position,0), sections.length - 1);
					var layer_transform_last_index = 0;
					for(var q = 0; q < sections.length; q++){
						if(layer_transform_last === sections[q].layer_position){
							layer_transform_last_index = q;
						}
					}
					
					//get the next section in the index
					var layer_transform_target = Math.min(Math.max(Math.ceil(Math.abs(layer_transform_ratio)) * Math.sign(layer_transform_ratio) + sections[n].layer_position,0), sections.length - 1);
					var layer_transform_target_index = 0;
					for(var p = 0; p < sections.length; p++){
						if(layer_transform_target === sections[p].layer_position){
							layer_transform_target_index = p;
						}
					}
					//do some funky maths to get the center of the sections as the target
					var active_height = sections[n].obj.offsetHeight/2;
					var last_position = (sections[layer_transform_last_index].top + sections[layer_transform_last_index].obj.offsetHeight/2 - active_height);
					var target_position = (sections[layer_transform_target_index].top + sections[layer_transform_target_index].obj.offsetHeight/2 - active_height);
					var new_position = (target_position - last_position) * Modulo(Math.abs(layer_transform_ratio),1) + last_position - 20;
					sections[n].obj.style.top = new_position + 'px';
					sections[n].obj.style.transition = '0.5s';
					sections[n].obj.style.zIndex = 1000001;
					
					//if the moving layer has moved again
					var limit = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight) - window.innerHeight;
					var new_scroll_target = Math.max(Math.min(sections[n].top + document.querySelector('#a-hea-00').getBoundingClientRect().height + 20 + sections[n].obj.offsetHeight/2 - window.innerHeight/2, limit),0);
					
					if(div_00_div_00_div_00.scroll_target !== new_scroll_target){
						div_00_div_00_div_00.scroll = true;
						div_00_div_00_div_00.scroll_t = 0;
						div_00_div_00_div_00.scroll_last = scroll_y;
						div_00_div_00_div_00.scroll_target = Math.max(Math.min(sections[n].top + document.querySelector('#a-hea-00').getBoundingClientRect().height + 20 + sections[n].obj.offsetHeight/2 - window.innerHeight/2, limit),0);
						//set the target duration of animation to the distance between the two elements relative to screen height - 1s = 1 screen scroll
						div_00_div_00_div_00.scroll_duration = 1 + Math.abs(div_00_div_00_div_00.scroll_target - div_00_div_00_div_00.scroll_last)/window.innerHeight*0.2;
					}

				}
			}
			
			//set scroll position of layers panel
			
			div_00_div_00_asd_01_div_00.scrollTop = div_00_div_00_asd_01_div_00.scroll_position;
			
		} else {
			for(var o = 0; o < sections.length; o++){
				sections[o].obj.style.transform = '';
				sections[o].obj.style.borderRadius = '';
				sections[o].obj.style.boxShadow = '';
				document.body.style.backgroundColor = '';
				sections[o].obj.style.top = '';
				sections[o].obj.style.position = '';
				sections[o].obj.style.zIndex = 10000 + sections[o].zIndex_multiplier * (sections[o].layer_position + 1) - (sections[o].layer_position + 1);
				//layer positions
				sections[o].layer.style.position = '';
				sections[o].layer.style.top = '';
			}
			document.body.overflow = '';
			div_00_div_00_div_00.style.height = '';
		}
		
	}
		
	function Modulo(x, n){
		return ((x%n)+n)%n;
	}
	
	function ScrollToSection(){
		//scroll to t value
		if(div_00_div_00_div_00.scroll === true){
			//prevent scrolling temporarily
			html.style.overflow = 'hidden';
			div_00_div_00_div_00.scroll_t = Math.min(div_00_div_00_div_00.scroll_t + time.deltaTime/1000/div_00_div_00_div_00.scroll_duration, 1);
			window.scroll(0, (div_00_div_00_div_00.scroll_target - div_00_div_00_div_00.scroll_last) * F1(div_00_div_00_div_00.scroll_t) + div_00_div_00_div_00.scroll_last);
		}
		
		//if not moving layer, and scroll t = 1
		if(div_00_div_00_div_00.scroll_t === 1 && div_00_div_00_asd_01_div_00.moving_layer === -1 && div_00_div_00_div_00.scroll === true){
			div_00_div_00_div_00.scroll = false;
			html.style.overflow = '';
		}
	}
	
	function LayerActions(section){
		section.layer.hide_layer = false;
		
		section.layer.querySelector('.svg-00-div-00-div-00-div-00-asd-01-div-00').addEventListener('mousedown', function(){
			div_00_div_00_asd_01_div_00.moving_layer = section.layer_position;
			var layer_x = mouse_pos.x;
			var layer_y = mouse_pos.y;
			section.layer.click_pos = {x:layer_x,y:layer_y};
			section.layer.style.zIndex = 1000001;
			
			//prevent scrolling immediately before moving elements, and reset scroll vars
			div_00_div_00_div_00.scroll = true;
			div_00_div_00_div_00.scroll_t = 0;
			div_00_div_00_div_00.scroll_last = scroll_y;
			var limit = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight) - window.innerHeight;
			div_00_div_00_div_00.scroll_target = Math.max(Math.min(section.top + document.querySelector('#a-hea-00').getBoundingClientRect().height + 20 + section.obj.offsetHeight/2 - window.innerHeight/2, limit),0);
			//set the target duration of animation to the distance between the two elements relative to screen height - 1s = 1 screen scroll
			div_00_div_00_div_00.scroll_duration = 1 + Math.abs(div_00_div_00_div_00.scroll_target - div_00_div_00_div_00.scroll_last)/window.innerHeight*0.2;
			
			//resize container 
			for(var z = 0; z < sections.length; z++){
				if(sections[z].layer_position === sections.length - 1){
					div_00_div_00_div_00.style.height = sections[z].top + sections[z].obj.offsetHeight + 'px';
				}
			}
			
			//allow aside scrolling
			div_00_div_00_asd_01_div_00.scroll_position = div_00_div_00_asd_01_div_00.scrollTop;
			div_00_div_00_asd_01_div_00.scroll_t = 1;
			div_00_div_00_asd_01_div_00.style.overflow = 'hidden';

		});
		section.layer.querySelector('.svg-01-div-00-div-00-div-00-asd-01-div-00').addEventListener('click', function(){
			HideLayer(section);
		});
		section.layer.querySelector('.svg-02-div-00-div-00-div-00-asd-01-div-00').addEventListener('click', function(){
			DeleteLayer(section);
		});
	}
	
	function HideLayer(section){
		var section_index;
		for(var j = 0; j < section.length; j++){
			if(section.layer_position === sections[j].layer_position){
			   section_index = j;
			}
		}
		section.layer.hide_layer = !section.layer.hide_layer;
		/*if(layer.hide_layer === true){
			layer.style.backgroundColor = 'rgb(255,255,200)';
			layer.querySelector('.svg-01-div-00-div-00-div-00-asd-01-div-00 path').setAttribute('d','M19.604 2.562l-3.346 3.137c-1.27-.428-2.686-.699-4.243-.699-7.569 0-12.015 6.551-12.015 6.551s1.928 2.951 5.146 5.138l-2.911 2.909 1.414 1.414 17.37-17.035-1.415-1.415zm-6.016 5.779c-3.288-1.453-6.681 1.908-5.265 5.206l-1.726 1.707c-1.814-1.16-3.225-2.65-4.06-3.66 1.493-1.648 4.817-4.594 9.478-4.594.927 0 1.796.119 2.61.315l-1.037 1.026zm-2.883 7.431l5.09-4.993c1.017 3.111-2.003 6.067-5.09 4.993zm13.295-4.221s-4.252 7.449-11.985 7.449c-1.379 0-2.662-.291-3.851-.737l1.614-1.583c.715.193 1.458.32 2.237.32 4.791 0 8.104-3.527 9.504-5.364-.729-.822-1.956-1.99-3.587-2.952l1.489-1.46c2.982 1.9 4.579 4.327 4.579 4.327z');
			sections[section_index].obj.style.display = 'none';
		} else {
			layer.style.backgroundColor = '';
			layer.querySelector('.svg-01-div-00-div-00-div-00-asd-01-div-00 path').setAttribute('d','M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 3c-2.209 0-4 1.792-4 4 0 2.209 1.791 4 4 4s4-1.791 4-4c0-2.208-1.791-4-4-4z');
			sections[section_index].obj.style.display = '';
		}*/
	}
	
	function DeleteLayer(section){
		//recalculate top positions
		//iterate through sections, and order by layer position
		//k is the current layer's position
		//l is the current layer index
		var new_sections = [];
		for(var k = 0; k < sections.length; k++){
			for(var l = 0; l < sections.length; l++){
				//if the section to be deleted
				if(sections[l].layer_position === k && k === section.layer_position){
					div_00_div_00_div_00.removeChild(sections[l].obj);
					div_00_div_00_asd_01_div_00.removeChild(sections[l].layer);
					//else insert into the new section array
				} else if(sections[l].layer_position === k){
					//set section
					var insert_index = new_sections.length;
					new_sections[insert_index] = sections[l];
					//set layer and top positions
					new_sections[insert_index].layer_position = insert_index;
					if(insert_index === 0){
						new_sections[insert_index].top = -20;
					} else {
						new_sections[insert_index].top = new_sections[insert_index - 1].top + new_sections[insert_index - 1].obj.offsetHeight;
					}
					new_sections[insert_index].layer.top_value = insert_index * 50;
				}
			}
		}
		//set array
		sections = new_sections;
		//set new div height
		if(sections.length > 0){
			div_00_div_00_div_00.style.height = sections[sections.length - 1].top + sections[sections.length - 1].obj.offsetHeight + 'px';
		} else {
			div_00_div_00_div_00.style.height = '';
			div_00_div_00_asd_01_div_00.querySelector('#lbl-00-div-00-div-00-asd-01-div-00').style.display = '';
			div_00_div_00_div_00.querySelector('#div-00-div-00-div-00-div-00').style.display = '';
		}
	}
	
	function SetLayer(section){
		/* set a new layer */
		LayerActions(section);
		section.layer.top_value = section.layer_position * 50;
	}
	
	function DropdownSelect(k){
		/*selecting something in dropdown */
		div_00_div_00_div_01_div_00_asd_01_div_00[k].addEventListener('click', function(){
			if(div_00_div_01_div_00_asd_01_div_00.dropdown === false){
				div_00_div_01_div_00_asd_01_div_00.dropdown = true;
			} else {
				div_00_div_01_div_00_asd_01_div_00.dropdown = false;
				div_00_div_01_div_00_asd_01_div_00.insertBefore(div_00_div_00_div_01_div_00_asd_01_div_00[k], div_00_div_01_div_00_asd_01_div_00.childNodes[0]);
			}
			Dropdown();
		});
	}
	
	function Dropdown(){
		/*dropdown in layers panel */
		if(div_00_div_01_div_00_asd_01_div_00.dropdown === false){
			div_00_div_01_div_00_asd_01_div_00.style.height = '40px';
			div_00_div_01_div_00_asd_01_div_00.style.border = '';
			div_00_div_01_div_00_asd_01_div_00.style.backgroundColor = '';
			div_00_div_01_div_00_asd_01_div_00.style.bottom = '';
			div_00_div_01_div_00_asd_01_div_00.style.left = '';
			div_00_div_01_div_00_asd_01_div_00.style.flexFlow = '';
		} else {
			//change by ani  --div_00_div_01_div_00_asd_01_div_00.style.height = 'auto';
			div_00_div_01_div_00_asd_01_div_00.style.height = '250px';
			div_00_div_01_div_00_asd_01_div_00.style.border = '1px solid rgb(200,200,200)';
			div_00_div_01_div_00_asd_01_div_00.style.backgroundColor = 'rgb(240,240,240)';
			div_00_div_01_div_00_asd_01_div_00.style.flexFlow = 'column-reverse nowrap';
			div_00_div_01_div_00_asd_01_div_00.style.bottom = '4px';
			div_00_div_01_div_00_asd_01_div_00.style.left = '-1px';
		}
	}
	
	function InitialiseSection(i, is_update){
		if(sections[i].type === 0){
			Sec_00_Initialise(sections[i], i);
		} else if(sections[i].type === 1){
			Sec_01_Initialise(sections[i]);
		} else if(sections[i].type === 2){
			Sec_02_Initialise(sections[i]);
		} else if(sections[i].type === 3){
			Sec_03_Initialise(sections[i], i);
		} else if(sections[i].type === 4){
			Sec_04_Initialise(sections[i], i, is_update);
		} else if(sections[i].type === 5){
			Sec_05_Initialise(sections[i]);
		} else if(sections[i].type === 6){
			Sec_06_Initialise(sections[i], i, is_update);
		} else if(sections[i].type === 7){
			Sec_07_Initialise(sections[i], i);
		} else if(sections[i].type === 8){
			Sec_08_Initialise(sections[i], is_update);
		} else if(sections[i].type === 9){
			Sec_09_Initialise(sections[i], is_update);
		} else if(sections[i].type === 11){
			Sec_11_Initialise(sections[i], i);
		} else if(sections[i].type === 12){
			Sec_12_Initialise(sections[i], i);
		}
	}
	
	function Sec_00_Initialise(section, index){
		section.obj.addEventListener('mouseover', function(){
			var label = this.querySelector('.lbl-01-div-00-div-00-div-00-sec-00-div-00-div-00-div-00');
			if(spn_01_div_00.state === 3){
				//make number in this section visible and change section colour
				label.style.display = '';
				label.innerHTML = '1';
				section.obj.style.backgroundColor = 'rgb(225,225,225)';
				//set spn insert var
				spn_01_div_00.addToSection = index;
			}
		});
		
		section.obj.addEventListener('mouseout', function(){
			this.querySelector('.lbl-01-div-00-div-00-div-00-sec-00-div-00-div-00-div-00').style.display = 'none';
			this.querySelector('.lbl-01-div-00-div-00-div-00-sec-00-div-00-div-00-div-00').innerHTML = '';
			this.style.backgroundColor = '';
			spn_01_div_00.addToSection = null;
		});
		
		//if reset button is clicked
		section.obj.querySelector('.btn-00-div-00-sec-00-div-00-div-00-div-00').addEventListener('mouseover', function(){
			section.obj.querySelector('.img-00-div-00-sec-00-div-00-div-00-div-00').style.filter = 'brightness(0.85)';
		});
		section.obj.querySelector('.btn-00-div-00-sec-00-div-00-div-00-div-00').addEventListener('mouseout', function(){
			section.obj.querySelector('.img-00-div-00-sec-00-div-00-div-00-div-00').style.filter = '';
		});
		
		section.obj.querySelector('.btn-00-div-00-sec-00-div-00-div-00-div-00').addEventListener('click', function(){
			section.obj.querySelector('.div-00-div-00-sec-00-div-00-div-00-div-00').style.display = '';
			section.obj.querySelector('.img-00-div-00-sec-00-div-00-div-00-div-00').src = DOCUMENT_ROOT + 'images/null.png';
			section.obj.querySelector('.img-00-div-00-sec-00-div-00-div-00-div-00').style.filter = '';
			this.style.display = 'none';
		});
		
		//if input file is clicked
		section.obj.querySelector('.div-02-div-00-div-00-sec-00-div-00-div-00-div-00').addEventListener('click', function(){
			document.querySelector('#btn-00-div-00-div-01-asd-01-div-00 input').addToSection = index;
			document.querySelector('#btn-00-div-00-div-01-asd-01-div-00 input').click();
		});
	}
	
	function Sec_01_Initialise(section){
		//set zindex offset so layer appears above previous
		section.zIndex_multiplier = 2;
	}
	
	function Sec_02_Initialise(section){
		//set zindex minumum so layer appears above previous
		section.zIndex_multiplier = 3;
		
		section.obj.div_00_div_01_sec_02_div_00_div_00_div_00 = section.obj.querySelectorAll('.div-00-div-01-sec-02-div-00-div-00-div-00');
		for(var i = 0; i < section.obj.div_00_div_01_sec_02_div_00_div_00_div_00.length; i++){
			//if clicked hide icon, make invisible
			section.obj.div_00_div_01_sec_02_div_00_div_00_div_00[i].state = 1;
			Hide_Sec_02_Items(section.obj.div_00_div_01_sec_02_div_00_div_00_div_00[i]);
		}
		
		//instantiate empty cells for smaller screens to align properly
		var w = section.obj.querySelector('.div-01-sec-02-div-00-div-00-div-00').clientWidth;
		//calculate number of needed items
		var num_per_row = Math.floor(w/140);
		var last_row_els = Modulo(section.obj.div_00_div_01_sec_02_div_00_div_00_div_00.length, num_per_row);
		
		if(num_per_row === 1){
			num_per_row = last_row_els;
		}
				
		for(var k = section.obj.querySelectorAll('.div-01-div-01-sec-02-div-00-div-00-div-00').length; k < (num_per_row - last_row_els); k++){
			var template = section.obj.querySelector('.t-div-01-div-01-sec-02-div-00-div-00-div-00').cloneNode();
			template.className = 'div-01-div-01-sec-02-div-00-div-00-div-00';
			section.obj.querySelector('.div-01-sec-02-div-00-div-00-div-00').appendChild(template);
		}
		//delete if there are too many
		var j = section.obj.querySelectorAll('.div-01-div-01-sec-02-div-00-div-00-div-00').length;
		while(j > (num_per_row - last_row_els)){
			section.obj.querySelector('.div-01-sec-02-div-00-div-00-div-00').removeChild(section.obj.querySelectorAll('.div-01-div-01-sec-02-div-00-div-00-div-00')[j - 1]);
			j--;
		}
		
		window.onresize = function(){
			//instantiate empty cells for smaller screens to align properly
			var w = section.obj.querySelector('.div-01-sec-02-div-00-div-00-div-00').clientWidth;
			//calculate number of needed items
			var num_per_row = Math.floor(w/170);
			var last_row_els = Modulo(section.obj.div_00_div_01_sec_02_div_00_div_00_div_00.length, num_per_row);

			if(num_per_row === 1){
				num_per_row = last_row_els;
			}
			
			for(var i = section.obj.querySelectorAll('.div-01-div-01-sec-02-div-00-div-00-div-00').length; i < (num_per_row - last_row_els); i++){
				var template = section.obj.querySelector('.t-div-01-div-01-sec-02-div-00-div-00-div-00').cloneNode();
				template.className = 'div-01-div-01-sec-02-div-00-div-00-div-00';
				section.obj.querySelector('.div-01-sec-02-div-00-div-00-div-00').appendChild(template);
			}
			//delete if there are too many
			var j = section.obj.querySelectorAll('.div-01-div-01-sec-02-div-00-div-00-div-00').length;
			while(j > (num_per_row - last_row_els)){
				section.obj.querySelector('.div-01-sec-02-div-00-div-00-div-00').removeChild(section.obj.querySelectorAll('.div-01-div-01-sec-02-div-00-div-00-div-00')[j - 1]);
				j--;
			}
		};
	}
	
	function Hide_Sec_02_Items(item){
		item.querySelector('svg').addEventListener('click', function(){
			item.state = 1 - item.state;
			if(item.state === 0){
				this.querySelector('path').setAttribute("d", "M19.604 2.562l-3.346 3.137c-1.27-.428-2.686-.699-4.243-.699-7.569 0-12.015 6.551-12.015 6.551s1.928 2.951 5.146 5.138l-2.911 2.909 1.414 1.414 17.37-17.035-1.415-1.415zm-6.016 5.779c-3.288-1.453-6.681 1.908-5.265 5.206l-1.726 1.707c-1.814-1.16-3.225-2.65-4.06-3.66 1.493-1.648 4.817-4.594 9.478-4.594.927 0 1.796.119 2.61.315l-1.037 1.026zm-2.883 7.431l5.09-4.993c1.017 3.111-2.003 6.067-5.09 4.993zm13.295-4.221s-4.252 7.449-11.985 7.449c-1.379 0-2.662-.291-3.851-.737l1.614-1.583c.715.193 1.458.32 2.237.32 4.791 0 8.104-3.527 9.504-5.364-.729-.822-1.956-1.99-3.587-2.952l1.489-1.46c2.982 1.9 4.579 4.327 4.579 4.327z");
				item.style.backgroundColor = 'rgba(255,255,200,0.7)';
				item.querySelector('img').style.filter = 'brightness(0.3)';
				item.querySelector('label').style.backgroundColor = 'rgba(0,0,0,0.5)';
				item.querySelector('label').style.pointerEvents = 'none';
				item.querySelector('.lbl-01-div-00-div-01-sec-02-div-00-div-00-div-00').style.color = 'rgba(0,0,0,0.7)';
				item.querySelector('path').style.fill = 'rgba(0,0,0,0.7)';
			} else {
				this.querySelector('path').setAttribute("d", 'M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 3c-2.209 0-4 1.792-4 4 0 2.209 1.791 4 4 4s4-1.791 4-4c0-2.208-1.791-4-4-4z');
				item.style.backgroundColor = '';
				item.querySelector('img').style.filter = '';
				item.querySelector('label').style.backgroundColor = '';
				item.querySelector('label').style.pointerEvents = '';
				item.querySelector('.lbl-01-div-00-div-01-sec-02-div-00-div-00-div-00').style.color = '';
				item.querySelector('path').style.fill = '';
			}
		});
		
		item.querySelector('svg').addEventListener('mouseover', function(){
			this.querySelector('path').setAttribute("d", "M19.604 2.562l-3.346 3.137c-1.27-.428-2.686-.699-4.243-.699-7.569 0-12.015 6.551-12.015 6.551s1.928 2.951 5.146 5.138l-2.911 2.909 1.414 1.414 17.37-17.035-1.415-1.415zm-6.016 5.779c-3.288-1.453-6.681 1.908-5.265 5.206l-1.726 1.707c-1.814-1.16-3.225-2.65-4.06-3.66 1.493-1.648 4.817-4.594 9.478-4.594.927 0 1.796.119 2.61.315l-1.037 1.026zm-2.883 7.431l5.09-4.993c1.017 3.111-2.003 6.067-5.09 4.993zm13.295-4.221s-4.252 7.449-11.985 7.449c-1.379 0-2.662-.291-3.851-.737l1.614-1.583c.715.193 1.458.32 2.237.32 4.791 0 8.104-3.527 9.504-5.364-.729-.822-1.956-1.99-3.587-2.952l1.489-1.46c2.982 1.9 4.579 4.327 4.579 4.327z");
		});
												   
		item.querySelector('svg').addEventListener('mouseout', function(){
			if(item.state === 1){
				this.querySelector('path').setAttribute("d", 'M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 3c-2.209 0-4 1.792-4 4 0 2.209 1.791 4 4 4s4-1.791 4-4c0-2.208-1.791-4-4-4z');
			}
		});
	}
	
	function Sec_03_Initialise(section, index){
		section.obj.addEventListener('mouseover', function(){
			var label = this.querySelector('.lbl-01-div-00-div-00-div-00-sec-03-div-00-div-00-div-00');
			if(spn_01_div_00.state === 3){
				//make number in this section visible and change section colour
				label.style.display = '';
				label.innerHTML = '1';
				section.obj.style.backgroundColor = 'rgb(225,225,225)';
				//set spn insert var
				spn_01_div_00.addToSection = index;
			}
		});
		
		section.obj.addEventListener('mouseout', function(){
			this.querySelector('.lbl-01-div-00-div-00-div-00-sec-03-div-00-div-00-div-00').style.display = 'none';
			this.querySelector('.lbl-01-div-00-div-00-div-00-sec-03-div-00-div-00-div-00').innerHTML = '';
			this.style.backgroundColor = '';
			spn_01_div_00.addToSection = null;
		});
		
		//if reset button is clicked
		section.obj.querySelector('.btn-00-div-00-sec-03-div-00-div-00-div-00').addEventListener('mouseover', function(){
			section.obj.querySelector('.img-00-div-00-sec-03-div-00-div-00-div-00').style.filter = 'brightness(0.85)';
		});
		section.obj.querySelector('.btn-00-div-00-sec-03-div-00-div-00-div-00').addEventListener('mouseout', function(){
			section.obj.querySelector('.img-00-div-00-sec-03-div-00-div-00-div-00').style.filter = '';
		});
		
		section.obj.querySelector('.btn-00-div-00-sec-03-div-00-div-00-div-00').addEventListener('click', function(){
			section.obj.querySelector('.div-00-div-00-sec-03-div-00-div-00-div-00').style.display = '';
			section.obj.querySelector('.img-00-div-00-sec-03-div-00-div-00-div-00').src = DOCUMENT_ROOT + 'images/null.png';
			section.obj.querySelector('.img-00-div-00-sec-03-div-00-div-00-div-00').style.filter = '';
			this.style.display = 'none';
		});
		
		//if input file is clicked
		section.obj.querySelector('.div-02-div-00-div-00-sec-03-div-00-div-00-div-00').addEventListener('click', function(){
			document.querySelector('#btn-00-div-00-div-01-asd-01-div-00 input').addToSection = index;
			document.querySelector('#btn-00-div-00-div-01-asd-01-div-00 input').click();
		});
	}
	
	function Sec_04_Initialise(section, index, is_update){
		
		section.obj.active_tab = 0;

		//edit tabs button
		section.obj.querySelector('button').state = 0;
		
		section.obj.querySelector('.btn-00-sec-04-div-00-div-00-div-00').addEventListener('click', function(){
			this.state = 1 - this.state;
			EditTabs_Sec_04(section, this);
		});
		
		//add button
		section.obj.querySelector('.btn-00-div-00-sec-04-div-00-div-00-div-00').addEventListener('click', function(){
			AddTab_Sec_04(section);
			AddGallery_Sec_04(section, index);
		});
				
		if(is_update === false){
			AddTab_Sec_04(section);
			AddGallery_Sec_04(section, index);
		}
	}
	
	function EditTabs_Sec_04(section, button){
		var tabs = section.obj.querySelectorAll('.div-00-div-00-sec-04-div-00-div-00-div-00, .div-01-div-00-sec-04-div-00-div-00-div-00, .div-02-div-00-sec-04-div-00-div-00-div-00');
		//loop through and make editable
		for(var i = 0; i < tabs.length; i++){
			if(button.state === 0){
				tabs[i].className = 'div-00-div-00-sec-04-div-00-div-00-div-00';
				tabs[i].style.width = '';
				tabs[i].querySelector('.svg-02-div-00-div-00-sec-04-div-00-div-00-div-00').style.display = 'none';
				tabs[i].querySelector('.svg-03-div-00-div-00-sec-04-div-00-div-00-div-00').style.display = 'none';
				tabs[i].querySelector('.svg-04-div-00-div-00-sec-04-div-00-div-00-div-00').style.display = 'none';
				tabs[i].querySelector('.lbl-00-div-00-div-00-sec-04-div-00-div-00-div-00').style.marginRight = '';
				tabs[i].querySelector('.lbl-00-div-00-div-00-sec-04-div-00-div-00-div-00').style.pointerEvents = 'none';
				tabs[i].querySelector('.lbl-00-div-00-div-00-sec-04-div-00-div-00-div-00').style.background = 'none';
				if(i === section.obj.active_tab){
					tabs[i].className = 'div-01-div-00-sec-04-div-00-div-00-div-00';
				}
			} else {
				tabs[i].className = 'div-02-div-00-sec-04-div-00-div-00-div-00';
				tabs[i].style.width = '282.5px';
				tabs[i].querySelector('.svg-02-div-00-div-00-sec-04-div-00-div-00-div-00').style.display = '';
				if(tabs.length > 1){
					tabs[i].querySelector('.svg-03-div-00-div-00-sec-04-div-00-div-00-div-00').style.display = '';
					tabs[i].querySelector('.svg-02-div-00-div-00-sec-04-div-00-div-00-div-00').style.marginRight = '';
				} else {
					tabs[i].querySelector('.svg-02-div-00-div-00-sec-04-div-00-div-00-div-00').style.marginRight = '20px';
				}
				tabs[i].querySelector('.lbl-00-div-00-div-00-sec-04-div-00-div-00-div-00').style.marginRight = '7.5px';
			}
		}
		
		//hide add tab button
		if(button.state === 0){
			button.innerHTML = 'Edit Tabs';
			section.obj.querySelector('.btn-00-div-00-sec-04-div-00-div-00-div-00').style.display = '';
		} else {
			button.innerHTML = 'Done';
			section.obj.querySelector('.btn-00-div-00-sec-04-div-00-div-00-div-00').style.display = 'none';
		}
	}
	
	function AddTab_Sec_04(section){
		var template = section.obj.querySelector('.t-div-00-div-00-sec-04-div-00-div-00-div-00').cloneNode(true);
		//stop current active
		if(section.obj.querySelector('.div-01-div-00-sec-04-div-00-div-00-div-00')){
			section.obj.querySelector('.div-01-div-00-sec-04-div-00-div-00-div-00').className = 'div-00-div-00-sec-04-div-00-div-00-div-00';
		}
		
		template.className = 'div-01-div-00-sec-04-div-00-div-00-div-00';
		//set focus to name tab
		setTimeout(function(){template.querySelector('label').focus();},1);
		
		section.obj.querySelector('.div-00-sec-04-div-00-div-00-div-00').insertBefore(template, section.obj.querySelector('.btn-00-div-00-sec-04-div-00-div-00-div-00'));
		
		
		InitialiseTab_Sec_04(section, template);
	}
	
	function AddGallery_Sec_04(section, index){
		
		var template = section.obj.querySelector('.t-div-00-div-01-sec-04-div-00-div-00-div-00').cloneNode(true);
		
		template.className = 'div-00-div-01-sec-04-div-00-div-00-div-00';
		
		InitialiseGallery_Sec_04(section, template, index);
		
		section.obj.querySelector('.div-01-sec-04-div-00-div-00-div-00').appendChild(template);
		
	}
	
	function InitialiseGallery_Sec_04(section, gallery, index){
		//reduce opacity of other tabs
		var galleries = section.obj.querySelectorAll('.div-00-div-01-sec-04-div-00-div-00-div-00');
		
		for(var i = 0; i < galleries.length; i++){
			galleries[i].target_t = 0;
		}
		//initialise vars
		gallery.t = 0;
		gallery.target_t = 2;
		
		//uploads and buttons, counter label
		gallery.images = [];
		gallery.descriptions = [];
		gallery.active_image = 0;
		
		AddImage_Sec_04(gallery,index);
		
		
		//add event listeners to the greyed out icons, as eventlistener will still work on it
		
		//forward and back arrows
		gallery.querySelector('.svg-02-div-02-div-00-div-01-sec-04-div-00-div-00-div-00').addEventListener('click', function(){
			if(gallery.active_image !== 0){
				gallery.active_image--;
			}
		});
		gallery.querySelector('.svg-03-div-02-div-00-div-01-sec-04-div-00-div-00-div-00').addEventListener('click', function(){
			if(gallery.active_image !== gallery.images.length - 1){
				gallery.active_image++;
			}
		});
		
		//move image buttons
		gallery.querySelector('.svg-02-div-00-div-00-div-01-sec-04-div-00-div-00-div-00').addEventListener('click', function(){
			if(gallery.active_image > 0 && gallery.active_image < gallery.images.length - 1){
				var move_image_left = gallery.images[gallery.active_image];
				gallery.images[gallery.active_image] = gallery.images[gallery.active_image - 1];
				gallery.images[gallery.active_image - 1] = move_image_left;
				gallery.images[gallery.active_image].position ++;
				gallery.images[gallery.active_image - 1].position --;
				var move_description_left = gallery.descriptions[gallery.active_image];
				gallery.descriptions[gallery.active_image] = gallery.descriptions[gallery.active_image - 1];
				gallery.descriptions[gallery.active_image - 1] = move_description_left;
				gallery.active_image--;
			}
		});
		
		gallery.querySelector('.svg-03-div-00-div-00-div-01-sec-04-div-00-div-00-div-00').addEventListener('click', function(){
			if(gallery.active_image < gallery.images.length - 2){
				var move_image_right = gallery.images[gallery.active_image];
				gallery.images[gallery.active_image] = gallery.images[gallery.active_image + 1];
				gallery.images[gallery.active_image + 1] = move_image_right;
				gallery.images[gallery.active_image].position --;
				gallery.images[gallery.active_image + 1].position ++;
				var move_description_right = gallery.descriptions[gallery.active_image];
				gallery.descriptions[gallery.active_image] = gallery.descriptions[gallery.active_image + 1];
				gallery.descriptions[gallery.active_image + 1] = move_description_right;
				gallery.active_image++;
			}
		});
		
		gallery.querySelector('.svg-04-div-00-div-00-div-01-sec-04-div-00-div-00-div-00').addEventListener('click', function(){
			//delete gallery entry and shift all above down
			if(gallery.active_image < gallery.images.length - 1){
				gallery.querySelector('.div-01-div-00-div-01-sec-04-div-00-div-00-div-00').removeChild(gallery.images[gallery.active_image]);
				gallery.querySelector('.div-02-div-00-div-01-sec-04-div-00-div-00-div-00').removeChild(gallery.descriptions[gallery.active_image]);
				gallery.images[gallery.active_image] = '';
				gallery.descriptions[gallery.active_image] = '';
				for(var j = 0; j < gallery.images.length; j++){
					if(j > gallery.active_image){
						gallery.images[j - 1] = gallery.images[j];
						gallery.descriptions[j - 1] = gallery.descriptions[j];
						gallery.images[j - 1].position --;
					}
				}
				gallery.images.length = Math.max(gallery.images.length - 1, 1);
				gallery.descriptions.length = Math.max(gallery.descriptions.length - 1, 1);
			}
		});
	}
	
	function InsertImage_Sec_04(gallery, image_src, title = null){
		//set the image being added
		var gallery_index = gallery.images.length - 1;

		gallery.images[gallery_index].querySelector('img').src = image_src;
			
		gallery.images[gallery_index].querySelector('.div-00-div-00-div-01-div-00-div-01-sec-04-div-00-div-00-div-00').style.display = 'none';
		gallery.images[gallery_index].image_state = 1;
		
		if(title !== null && gallery.descriptions[gallery_index].querySelector('h2').innerHTML === ''){
			gallery.descriptions[gallery_index].querySelector('h2').innerHTML = title;
		}
	}
	
	function AddImage_Sec_04(gallery, index){
		
		//initialise new gallery image
		var template_image = gallery.querySelector('.t-div-00-div-01-div-00-div-01-sec-04-div-00-div-00-div-00');
		var gallery_index = gallery.images.length;
		gallery.images.length++;
		var image;
		image = template_image.cloneNode(true);
		image.image_state = 0;
		image.position = gallery_index;
		image.className = 'div-00-div-01-div-00-div-01-sec-04-div-00-div-00-div-00';
		gallery.querySelector('.div-01-div-00-div-01-sec-04-div-00-div-00-div-00').insertBefore(image, template_image);
		image.style.left = (-gallery.active_image + gallery_index) * 660 + 'px';
		//if reset button is clicked
		image.querySelector('.btn-00-div-00-div-01-div-00-div-01-sec-04-div-00-div-00-div-00').addEventListener('mouseover', function(){
			image.querySelector('.img-00-div-00-div-01-div-00-div-01-sec-04-div-00-div-00-div-00').style.filter = 'brightness(0.85)';
		});
		image.querySelector('.btn-00-div-00-div-01-div-00-div-01-sec-04-div-00-div-00-div-00').addEventListener('mouseout', function(){
			image.querySelector('.img-00-div-00-div-01-div-00-div-01-sec-04-div-00-div-00-div-00').style.filter = '';
		});
		
		image.querySelector('.btn-00-div-00-div-01-div-00-div-01-sec-04-div-00-div-00-div-00').addEventListener('click', function(){
			image.querySelector('.div-00-div-00-div-01-div-00-div-01-sec-04-div-00-div-00-div-00').style.display = '';
			image.querySelector('.img-00-div-00-div-01-div-00-div-01-sec-04-div-00-div-00-div-00').src = DOCUMENT_ROOT + 'images/null.png';
			image.querySelector('.img-00-div-00-div-01-div-00-div-01-sec-04-div-00-div-00-div-00').style.filter = '';
			this.style.display = 'none';
			image.image_state = 2;
		});
		
		//if input file is clicked
		image.querySelector('.div-02-div-00-div-00-div-01-div-00-div-01-sec-04-div-00-div-00-div-00').addEventListener('click', function(){
			document.querySelector('#btn-00-div-00-div-01-asd-01-div-00 input').addToSection = [index, image.position];
			document.querySelector('#btn-00-div-00-div-01-asd-01-div-00 input').click();
		});
		
		
		var template_description = gallery.querySelector('.t-div-00-div-02-div-00-div-01-sec-04-div-00-div-00-div-00');
		var description;
		description = template_description.cloneNode(true);
		description.className = 'div-00-div-02-div-00-div-01-sec-04-div-00-div-00-div-00';
		gallery.querySelector('.div-02-div-00-div-01-sec-04-div-00-div-00-div-00').insertBefore(description, template_description);
		description.style.opacity = '0.2';
		description.style.pointerEvents = 'none';
		//add description
		description.state = 0;
		Description_Sec_04(description);
		
		image.addEventListener('mouseover', function(){
			var label = this.querySelector('.lbl-01-div-00-div-00-div-00-div-01-div-00-div-01-sec-04-div-00-div-00-div-00');
			if(spn_01_div_00.state === 3){
				//make number in this section visible and change section colour
				label.style.display = '';
				label.innerHTML = spn_01_div_00.files.length;
				image.style.backgroundColor = 'rgb(225,225,225)';
				//set spn insert var
				spn_01_div_00.addToSection = [index, image.position];
			}
		});
		
		image.addEventListener('mouseout', function(){
			this.querySelector('.lbl-01-div-00-div-00-div-00-div-01-div-00-div-01-sec-04-div-00-div-00-div-00').style.display = 'none';
			this.querySelector('.lbl-01-div-00-div-00-div-00-div-01-div-00-div-01-sec-04-div-00-div-00-div-00').innerHTML = '';
			this.style.backgroundColor = '';
			spn_01_div_00.addToSection = null;
		});
		
		gallery.images[gallery_index] = image;
		gallery.descriptions[gallery_index] = description;
	}
	
	function InitialiseTab_Sec_04(section, tab){
		//set new tab to be active
		var tabs = section.obj.querySelectorAll('.div-00-div-00-sec-04-div-00-div-00-div-00, .div-01-div-00-sec-04-div-00-div-00-div-00, .div-02-div-00-sec-04-div-00-div-00-div-00');
		var active_tab = tabs.length - 1;
		//reset current active tab
		section.obj.querySelectorAll('.div-00-div-00-sec-04-div-00-div-00-div-00, .div-01-div-00-sec-04-div-00-div-00-div-00, .div-02-div-00-sec-04-div-00-div-00-div-00')[section.obj.active_tab].className = 'div-00-div-00-sec-04-div-00-div-00-div-00';
		//set new tab to active
		section.obj.active_tab = active_tab;
		tab.className = 'div-01-div-00-sec-04-div-00-div-00-div-00';
		
		//set active
		tab.addEventListener('click', function(){
			//if not renaming, change active
			if(section.obj.querySelector('button').state === 0){
				section.obj.querySelectorAll('.div-00-div-00-sec-04-div-00-div-00-div-00, .div-01-div-00-sec-04-div-00-div-00-div-00, .div-02-div-00-sec-04-div-00-div-00-div-00')[section.obj.active_tab].className = 'div-00-div-00-sec-04-div-00-div-00-div-00';
				for(var i = 0; i < section.obj.querySelectorAll('.div-00-div-00-sec-04-div-00-div-00-div-00, .div-01-div-00-sec-04-div-00-div-00-div-00, .div-02-div-00-sec-04-div-00-div-00-div-00').length; i++){
					//set active tab to the tab index
					if(section.obj.querySelectorAll('.div-00-div-00-sec-04-div-00-div-00-div-00, .div-01-div-00-sec-04-div-00-div-00-div-00, .div-02-div-00-sec-04-div-00-div-00-div-00')[i] === tab){
						section.obj.active_tab = i;
					}
				}
				tab.className = 'div-01-div-00-sec-04-div-00-div-00-div-00';
				//set target t of galleries, so active one fades in
				var gallery = section.obj.querySelectorAll('.div-00-div-01-sec-04-div-00-div-00-div-00');
				for(var j = 0; j < gallery.length; j++){
					if(j === section.obj.active_tab){
						gallery[j].target_t = 2;
						gallery[j].style.pointerEvents = '';
					} else {
						gallery[j].target_t = 0;
						gallery[j].style.pointerEvents = 'none';
					}
				}
			}
		});
		
		var edit_btn = tab.querySelector('.svg-02-div-00-div-00-sec-04-div-00-div-00-div-00');
		var delete_btn = tab.querySelector('.svg-03-div-00-div-00-sec-04-div-00-div-00-div-00');
		var confirm_btn = tab.querySelector('.svg-04-div-00-div-00-sec-04-div-00-div-00-div-00');
		var label = tab.querySelector('.lbl-00-div-00-div-00-sec-04-div-00-div-00-div-00');
		
		//edit button
		edit_btn.addEventListener('click', function(){
			//allow editing of input
			label.style.pointerEvents = '';
			label.style.background = '';
			//make edit and delete button hidden
			edit_btn.style.display = 'none';
			delete_btn.style.display = 'none';
			confirm_btn.style.display = '';
		});
		
		//if finished editing
		confirm_btn.addEventListener('click', function(){
			label.style.pointerEvents = 'none';
			label.style.background = 'none';
			//reveal edit and delete buttons
			edit_btn.style.display = '';
			//prevent deleting last tab
			if(section.obj.querySelectorAll('.div-02-div-00-sec-04-div-00-div-00-div-00').length > 1){
				delete_btn.style.display = '';
				edit_btn.style.marginRight = '';
			} else {
				edit_btn.style.marginRight = '20px';
			}
			confirm_btn.style.display = 'none';
		});
		
		//delete button
		delete_btn.addEventListener('click', function(){
			DeleteTab_Sec_04(section, tabs[tabs.length - 1], section.obj.querySelectorAll('.div-00-div-01-sec-04-div-00-div-00-div-00')[tabs.length - 1]);
		});
	}
	
	function DeleteTab_Sec_04(section, tab, gallery){
		//get all remaining tabs and make sure not active tab
		var tabs = section.obj.querySelectorAll('.div-02-div-00-sec-04-div-00-div-00-div-00');
		//get index of deleted tab
		var delete_index = 0;
		for(var i = 0; i < tabs.length; i++){
			if(tabs[i] === tab){
				delete_index = i;
			}
		}
		
		//if deleted tab is before active tab, reduce by one
		if(section.obj.active_tab >= delete_index){
			section.obj.active_tab = Math.max(section.obj.active_tab - 1, 0);
			section.obj.querySelectorAll('.div-00-div-01-sec-04-div-00-div-00-div-00')[section.obj.active_tab].target_t = 2;
		}
		
		//remove DOM element
		if(tabs.length > 1){
			section.obj.querySelector('.div-00-sec-04-div-00-div-00-div-00').removeChild(tab);
			section.obj.querySelector('.div-01-sec-04-div-00-div-00-div-00').removeChild(gallery);
		}
		
		//hide delete icon if last tab
		tabs = section.obj.querySelectorAll('.div-02-div-00-sec-04-div-00-div-00-div-00');
		if(tabs.length === 1){
			tabs[0].querySelector('.svg-03-div-00-div-00-sec-04-div-00-div-00-div-00').style.display = 'none';
			tabs[0].querySelector('.svg-02-div-00-div-00-sec-04-div-00-div-00-div-00').style.marginRight = '20px';
		}
	}
	
	function Description_Sec_04(description){
		description.querySelector('.btn-00-div-00-div-02-div-00-div-01-sec-04-div-00-div-00-div-00').addEventListener('click', function(){
			description.state = 1;
			description.querySelector('.btn-00-div-00-div-02-div-00-div-01-sec-04-div-00-div-00-div-00').style.display = 'none';
			description.querySelector('.btn-01-div-00-div-02-div-00-div-01-sec-04-div-00-div-00-div-00').style.display = '';
			description.querySelector('.p-00-div-00-div-02-div-00-div-01-sec-04-div-00-div-00-div-00').style.display = '';
		});
		description.querySelector('.btn-01-div-00-div-02-div-00-div-01-sec-04-div-00-div-00-div-00').addEventListener('click', function(){
			description.state = 0;
			description.querySelector('.btn-00-div-00-div-02-div-00-div-01-sec-04-div-00-div-00-div-00').style.display = '';
			description.querySelector('.btn-01-div-00-div-02-div-00-div-01-sec-04-div-00-div-00-div-00').style.display = 'none';
			description.querySelector('.p-00-div-00-div-02-div-00-div-01-sec-04-div-00-div-00-div-00').style.display = 'none';
		});
	}
	
	function Sec_05_Initialise(section){
		//upload buttons
		var video_upload = section.obj.querySelector('.div-00-sec-05-div-00-div-00-div-00');
		var video_upload_popup = document.querySelector('#div-02-div-01-div-00');
		
		section.obj.video_embed = '';
		video_upload.state = 0;
		
		video_upload.querySelector('.div-01-div-00-sec-05-div-00-div-00-div-00').addEventListener('click', function(){
			video_upload.state = 1;
			div_01_div_00.style.pointerEvents = '';
			div_01_div_00.style.opacity = '1';
			video_upload_popup.style.display = '';
			video_upload_popup.querySelector('textarea').value = section.obj.video_embed;
		});
		
		video_upload_popup.querySelector('svg').addEventListener('click', function(){
			video_upload.state = 0;
			div_01_div_00.style.pointerEvents = 'none';
			div_01_div_00.style.opacity = '0';
			video_upload_popup.style.display = 'none';
		});
		
		video_upload_popup.querySelector('button').addEventListener('click', function(){
			div_01_div_00.style.pointerEvents = 'none';
			div_01_div_00.style.opacity = '0';
			video_upload_popup.style.display = 'none';
			if(video_upload.state === 1){
				section.obj.video_embed = video_upload_popup.querySelector('textarea').value;
				section.obj.querySelector('.div-00-div-00-sec-05-div-00-div-00-div-00').innerHTML = section.obj.video_embed;
				section.obj.querySelector('.div-01-div-00-sec-05-div-00-div-00-div-00').style.display = 'none';
				section.obj.querySelector('.btn-00-div-00-sec-05-div-00-div-00-div-00').style.display = '';
			}
			video_upload.state = 0;
		});
		
		div_01_div_00.addEventListener('click', function(event){
			if(event.target.id === 'div-01-div-00'){
				video_upload.state = 0;
				div_01_div_00.style.pointerEvents = 'none';
				div_01_div_00.style.opacity = '0';
				video_upload_popup.style.display = 'none';
			}
		});
		
		//reset video
		section.obj.querySelector('.btn-00-div-00-sec-05-div-00-div-00-div-00').addEventListener('click', function(){
			section.obj.querySelector('.div-00-div-00-sec-05-div-00-div-00-div-00').innerHTML = '';
			section.obj.querySelector('.div-01-div-00-sec-05-div-00-div-00-div-00').style.display = '';
			section.obj.querySelector('.btn-00-div-00-sec-05-div-00-div-00-div-00').style.display = 'none';
		});
	}
	
	function Sec_06_Initialise(section, index, is_update){
		
		section.obj.active_tab = 0;

		//edit tabs button
		section.obj.querySelector('button').state = 0;
		
		section.obj.querySelector('.btn-00-sec-06-div-00-div-00-div-00').addEventListener('click', function(){
			this.state = 1 - this.state;
			EditTabs_Sec_06(section, this);
		});
		
		//add button
		section.obj.querySelector('.btn-00-div-00-sec-06-div-00-div-00-div-00').addEventListener('click', function(){
			AddViewport_Sec_06(section);
			AddTab_Sec_06(section);
		});
		
				
		if(is_update === false){
			AddViewport_Sec_06(section);
			AddTab_Sec_06(section);
		}
	}
	
	function AddViewport_Sec_06(section){
		
		var template = section.obj.querySelector('.t-div-00-div-01-sec-06-div-00-div-00-div-00').cloneNode(true);
		
		template.className = 'div-00-div-01-sec-06-div-00-div-00-div-00';
		
		section.obj.querySelector('.div-01-sec-06-div-00-div-00-div-00').appendChild(template);
		
		InitialiseViewport_Sec_06(section, template);
	}

	function InitialiseViewport_Sec_06(section, viewport){
		//reduce opacity of other tabs
		var viewports = section.obj.querySelectorAll('.div-00-div-01-sec-06-div-00-div-00-div-00');
		for(var i = 0; i < viewports.length - 1; i++){
			viewports[i].target_t = 0;
		}
		//initialise vars
		viewport.t = 0;
		viewport.target_t = 2;
		viewport.style.opacity = 0;
		viewport.style.pointerEvents = '';
		viewport.matterport_embed = '';
		
		var upload_btn = viewport.querySelector('.div-00-div-00-div-01-sec-06-div-00-div-00-div-00');
		var matterport_popup = document.querySelector('#div-03-div-01-div-00'); 
		
		viewport.state = 0;
		
		upload_btn.addEventListener('click', function(){
			viewport.state = 1;
			div_01_div_00.style.pointerEvents = '';
			div_01_div_00.style.opacity = '1';
			matterport_popup.style.display = '';
			matterport_popup.querySelector('input').value = viewport.matterport_embed;
		});
		
		matterport_popup.querySelector('svg').addEventListener('click', function(){
			viewport.state = 0;
			div_01_div_00.style.pointerEvents = 'none';
			div_01_div_00.style.opacity = '0';
			matterport_popup.style.display = 'none';
		});
		
		div_01_div_00.addEventListener('click', function(event){
			if(event.target.id === 'div-01-div-00'){
				viewport.state = 0;
				div_01_div_00.style.pointerEvents = 'none';
				div_01_div_00.style.opacity = '0';
				matterport_popup.style.display = 'none';
			}
		});
		
		//close button
		matterport_popup.querySelector('button').addEventListener('click', function(){
			if(viewport.state === 1){
				//hide link box
				div_01_div_00.style.opacity = 0;
				div_01_div_00.style.pointerEvents = 'none';
				matterport_popup.style.display = 'none';
				viewport.matterport_embed = matterport_popup.querySelector('input').value;
				if(viewport.matterport_embed !== ''){
					viewport.querySelector('iframe').src = viewport.matterport_embed;
					viewport.querySelector('.div-00-div-00-div-01-sec-06-div-00-div-00-div-00').style.display = 'none';
					viewport.querySelector('.btn-00-div-00-div-01-sec-06-div-00-div-00-div-00').style.display = '';
				}
				viewport.state = 0;
			}
		});
		
		//delete button
		viewport.querySelector('.btn-00-div-00-div-01-sec-06-div-00-div-00-div-00').addEventListener ('click', function(){
			viewport.querySelector('iframe').src = '';
			viewport.querySelector('.div-00-div-00-div-01-sec-06-div-00-div-00-div-00').style.display = '';
			viewport.querySelector('.btn-00-div-00-div-01-sec-06-div-00-div-00-div-00').style.display = 'none';
		});
	}
	
	function EditTabs_Sec_06(section, button){
		var tabs = section.obj.querySelectorAll('.div-00-div-00-sec-06-div-00-div-00-div-00, .div-01-div-00-sec-06-div-00-div-00-div-00, .div-02-div-00-sec-06-div-00-div-00-div-00');
		//loop through and make editable
		for(var i = 0; i < tabs.length; i++){
			if(button.state === 0){
				tabs[i].className = 'div-00-div-00-sec-06-div-00-div-00-div-00';
				tabs[i].style.width = '';
				tabs[i].querySelector('.svg-02-div-00-div-00-sec-06-div-00-div-00-div-00').style.display = 'none';
				tabs[i].querySelector('.svg-03-div-00-div-00-sec-06-div-00-div-00-div-00').style.display = 'none';
				tabs[i].querySelector('.svg-04-div-00-div-00-sec-06-div-00-div-00-div-00').style.display = 'none';
				tabs[i].querySelector('.lbl-00-div-00-div-00-sec-06-div-00-div-00-div-00').style.marginRight = '';
				tabs[i].querySelector('.lbl-00-div-00-div-00-sec-06-div-00-div-00-div-00').style.pointerEvents = 'none';
				tabs[i].querySelector('.lbl-00-div-00-div-00-sec-06-div-00-div-00-div-00').style.background = 'none';
				if(i === section.obj.active_tab){
					tabs[i].className = 'div-01-div-00-sec-06-div-00-div-00-div-00';
				}
			} else {
				tabs[i].className = 'div-02-div-00-sec-06-div-00-div-00-div-00';
				tabs[i].style.width = '282.5px';
				tabs[i].querySelector('.svg-02-div-00-div-00-sec-06-div-00-div-00-div-00').style.display = '';
				if(tabs.length > 1){
					tabs[i].querySelector('.svg-03-div-00-div-00-sec-06-div-00-div-00-div-00').style.display = '';
					tabs[i].querySelector('.svg-02-div-00-div-00-sec-06-div-00-div-00-div-00').style.marginRight = '';
				} else {
					tabs[i].querySelector('.svg-02-div-00-div-00-sec-06-div-00-div-00-div-00').style.marginRight = '20px';
				}
				tabs[i].querySelector('.lbl-00-div-00-div-00-sec-06-div-00-div-00-div-00').style.marginRight = '7.5px';
			}
		}
		
		//hide add tab button
		if(button.state === 0){
			button.innerHTML = 'Edit Tabs';
			section.obj.querySelector('.btn-00-div-00-sec-06-div-00-div-00-div-00').style.display = '';
		} else {
			button.innerHTML = 'Done';
			section.obj.querySelector('.btn-00-div-00-sec-06-div-00-div-00-div-00').style.display = 'none';
		}
	}
	
	function AddTab_Sec_06(section){
		var template = section.obj.querySelector('.t-div-00-div-00-sec-06-div-00-div-00-div-00').cloneNode(true);
		//stop current active
		if(section.obj.querySelector('.div-01-div-00-sec-06-div-00-div-00-div-00')){
			section.obj.querySelector('.div-01-div-00-sec-06-div-00-div-00-div-00').className = 'div-00-div-00-sec-06-div-00-div-00-div-00';
		}
		
		template.className = 'div-01-div-00-sec-06-div-00-div-00-div-00';
		//set focus to name tab
		setTimeout(function(){template.querySelector('label').focus();},1);
		
		section.obj.querySelector('.div-00-sec-06-div-00-div-00-div-00').insertBefore(template, section.obj.querySelector('.btn-00-div-00-sec-06-div-00-div-00-div-00'));
		
		
		InitialiseTab_Sec_06(section, template);
	}
	
	function InitialiseTab_Sec_06(section, tab){
		//set new tab to be active
		var tabs = section.obj.querySelectorAll('.div-00-div-00-sec-06-div-00-div-00-div-00, .div-01-div-00-sec-06-div-00-div-00-div-00, .div-02-div-00-sec-06-div-00-div-00-div-00');
		var active_tab = tabs.length - 1;
		//reset current active tab
		section.obj.querySelectorAll('.div-00-div-00-sec-06-div-00-div-00-div-00, .div-01-div-00-sec-06-div-00-div-00-div-00, .div-02-div-00-sec-06-div-00-div-00-div-00')[section.obj.active_tab].className = 'div-00-div-00-sec-06-div-00-div-00-div-00';
		//set new tab to active
		section.obj.active_tab = active_tab;
		tab.className = 'div-01-div-00-sec-06-div-00-div-00-div-00';
		//set active gallery initially
		var gallery = section.obj.querySelectorAll('.div-00-div-01-sec-06-div-00-div-00-div-00');
		for(var j = 0; j < gallery.length; j++){
			if(j === section.obj.active_tab){
				gallery[j].target_t = 2;
				gallery[j].style.pointerEvents = '';
			} else {
				gallery[j].target_t = 0;
				gallery[j].style.pointerEvents = 'none';
			}
		}
		
		//set active
		tab.addEventListener('click', function(){
			//if not renaming, change active
			if(section.obj.querySelector('button').state === 0){
				section.obj.querySelectorAll('.div-00-div-00-sec-06-div-00-div-00-div-00, .div-01-div-00-sec-06-div-00-div-00-div-00, .div-02-div-00-sec-06-div-00-div-00-div-00')[section.obj.active_tab].className = 'div-00-div-00-sec-06-div-00-div-00-div-00';
				for(var i = 0; i < section.obj.querySelectorAll('.div-00-div-00-sec-06-div-00-div-00-div-00, .div-01-div-00-sec-06-div-00-div-00-div-00, .div-02-div-00-sec-06-div-00-div-00-div-00').length; i++){
					//set active tab to the tab index
					if(section.obj.querySelectorAll('.div-00-div-00-sec-06-div-00-div-00-div-00, .div-01-div-00-sec-06-div-00-div-00-div-00, .div-02-div-00-sec-06-div-00-div-00-div-00')[i] === tab){
						section.obj.active_tab = i;
					}
				}
				tab.className = 'div-01-div-00-sec-06-div-00-div-00-div-00';
				//set target t of galleries, so active one fades in
				var gallery = section.obj.querySelectorAll('.div-00-div-01-sec-06-div-00-div-00-div-00');
				for(var j = 0; j < gallery.length; j++){
					if(j === section.obj.active_tab){
						gallery[j].target_t = 2;
						gallery[j].style.pointerEvents = '';
					} else {
						gallery[j].target_t = 0;
						gallery[j].style.pointerEvents = 'none';
					}
				}
			}
		});
		
		var edit_btn = tab.querySelector('.svg-02-div-00-div-00-sec-06-div-00-div-00-div-00');
		var delete_btn = tab.querySelector('.svg-03-div-00-div-00-sec-06-div-00-div-00-div-00');
		var confirm_btn = tab.querySelector('.svg-04-div-00-div-00-sec-06-div-00-div-00-div-00');
		var label = tab.querySelector('.lbl-00-div-00-div-00-sec-06-div-00-div-00-div-00');
		
		//edit button
		edit_btn.addEventListener('click', function(){
			//allow editing of input
			label.style.pointerEvents = '';
			label.style.background = '';
			//make edit and delete button hidden
			edit_btn.style.display = 'none';
			delete_btn.style.display = 'none';
			confirm_btn.style.display = '';
		});
		
		//if finished editing
		confirm_btn.addEventListener('click', function(){
			label.style.pointerEvents = 'none';
			label.style.background = 'none';
			//reveal edit and delete buttons
			edit_btn.style.display = '';
			//prevent deleting last tab
			if(section.obj.querySelectorAll('.div-02-div-00-sec-06-div-00-div-00-div-00').length > 1){
				delete_btn.style.display = '';
				edit_btn.style.marginRight = '';
			} else {
				edit_btn.style.marginRight = '20px';
			}
			confirm_btn.style.display = 'none';
		});
		
		//delete button
		delete_btn.addEventListener('click', function(){
			DeleteTab_Sec_06(section, tabs[tabs.length - 1], gallery[gallery.length - 1]);
		});
	}
	
	function DeleteTab_Sec_06(section, tab, viewport){
		
		//get all remaining tabs and make sure not active tab
		var tabs = section.obj.querySelectorAll('.div-00-div-00-sec-06-div-00-div-00-div-00, .div-01-div-00-sec-06-div-00-div-00-div-00, .div-02-div-00-sec-06-div-00-div-00-div-00');
		//get index of deleted tab
		var delete_index = 0;
		for(var i = 0; i < tabs.length; i++){
			if(tabs[i] === tab){
				delete_index = i;
			}
		}
		
		//if deleted tab is before active tab, reduce by one
		if(section.obj.active_tab >= delete_index){
			section.obj.active_tab = Math.max(section.obj.active_tab - 1, 0);
			section.obj.querySelectorAll('.div-00-div-01-sec-06-div-00-div-00-div-00')[section.obj.active_tab].target_t = 2;
		}
		
		//remove DOM element
		if(tabs.length > 1){
			section.obj.querySelector('.div-00-sec-06-div-00-div-00-div-00').removeChild(tab);
			section.obj.querySelector('.div-01-sec-06-div-00-div-00-div-00').removeChild(viewport);
		}
		
		//hide delete icon if last tab
		tabs = section.obj.querySelectorAll('.div-02-div-00-sec-06-div-00-div-00-div-00');
		if(tabs.length === 1){
			tabs[0].querySelector('.svg-03-div-00-div-00-sec-06-div-00-div-00-div-00').style.display = 'none';
			tabs[0].querySelector('.svg-02-div-00-div-00-sec-06-div-00-div-00-div-00').style.marginRight = '20px';
		}
	}
	
	function Sec_07_Initialise(section, index){
		
		var container = section.obj.querySelector('.div-00-sec-07-div-00-div-00-div-00');
		
		//uploads and buttons, counter label
		container.floorplans = [];
		container.descriptions = [];
		container.active_floorplan = 0;
		
		section.obj.height = 0;
		
		AddFloorplan_Sec_07(container, index);
		
		//forward and back arrows
		container.querySelector('.svg-02-div-02-div-00-sec-07-div-00-div-00-div-00').addEventListener('click', function(){
			if(container.active_floorplan !== 0){
				container.active_floorplan--;
			}
		});
		container.querySelector('.svg-03-div-02-div-00-sec-07-div-00-div-00-div-00').addEventListener('click', function(){
			if(container.active_floorplan !== container.floorplans.length - 1){
				container.active_floorplan++;
			}
		});
		
		//move floorplan buttons
		container.querySelector('.svg-02-div-00-div-00-sec-07-div-00-div-00-div-00').addEventListener('click', function(){
			if(container.active_floorplan > 0 && container.active_floorplan < container.floorplans.length - 1){
				var move_floorplan_left = container.floorplans[container.active_floorplan];
				container.floorplans[container.active_floorplan] = container.floorplans[container.active_floorplan - 1];
				container.floorplans[container.active_floorplan - 1] = move_floorplan_left;
				container.floorplans[container.active_floorplan].position ++;
				container.floorplans[container.active_floorplan - 1].position --;
				var move_description_left = container.descriptions[container.active_floorplan];
				container.descriptions[container.active_floorplan] = container.descriptions[container.active_floorplan - 1];
				container.descriptions[container.active_floorplan - 1] = move_description_left;
				container.active_floorplan--;
			}
		});
		
		container.querySelector('.svg-03-div-00-div-00-sec-07-div-00-div-00-div-00').addEventListener('click', function(){
			if(container.active_floorplan < container.floorplans.length - 2){
				var move_floorplan_right = container.floorplans[container.active_floorplan];
				container.floorplans[container.active_floorplan] = container.floorplans[container.active_floorplan + 1];
				container.floorplans[container.active_floorplan + 1] = move_floorplan_right;
				container.floorplans[container.active_floorplan].position --;
				container.floorplans[container.active_floorplan + 1].position ++;
				var move_description_right = container.descriptions[container.active_floorplan];
				container.descriptions[container.active_floorplan] = container.descriptions[container.active_floorplan + 1];
				container.descriptions[container.active_floorplan + 1] = move_description_right;
				container.active_floorplan++;
			}
		});
		
		container.querySelector('.svg-04-div-00-div-00-sec-07-div-00-div-00-div-00').addEventListener('click', function(){
			//delete container entry and shift all above down
			if(container.active_floorplan < container.floorplans.length - 1){
				container.querySelector('.div-01-div-00-sec-07-div-00-div-00-div-00').removeChild(container.floorplans[container.active_floorplan]);
				container.querySelector('.div-02-div-00-sec-07-div-00-div-00-div-00').removeChild(container.descriptions[container.active_floorplan]);
				container.floorplans[container.active_floorplan] = '';
				container.descriptions[container.active_floorplan] = '';
				for(var j = 0; j < container.floorplans.length; j++){
					if(j > container.active_floorplan){
						container.floorplans[j - 1] = container.floorplans[j];
						container.descriptions[j - 1] = container.descriptions[j];
						container.floorplans[j - 1].position --;
					}
				}
				container.floorplans.length = Math.max(container.floorplans.length - 1, 1);
				container.descriptions.length = Math.max(container.descriptions.length - 1, 1);
			}
		});
	}
	
	function InsertFloorplan_Sec_07(section, container, image_src, title = null){
		//set the image being added
		var floorplan_index = container.floorplans.length - 1;
		container.floorplans[floorplan_index].querySelector('img').src = image_src;
		container.floorplans[floorplan_index].querySelector('.div-00-div-00-div-01-div-00-sec-07-div-00-div-00-div-00').style.display = 'none';
		
		container.floorplans[floorplan_index].getHeight = setInterval(function(){
			var w = container.floorplans[floorplan_index].querySelector('img').naturalWidth,
				h = container.floorplans[floorplan_index].querySelector('img').naturalHeight;
			if(w && h){
				clearInterval(container.floorplans[floorplan_index].getHeight);
				var img_height = h/w * container.floorplans[floorplan_index].clientWidth;
				container.floorplans[floorplan_index].querySelector('img').style.height = img_height + 'px';
				container.floorplans[floorplan_index].style.height = img_height + 'px';
				
				section.obj.height = Math.max(section.obj.height, img_height);
				section.obj.querySelector('.div-01-div-00-sec-07-div-00-div-00-div-00').style.height = section.obj.height + 'px';
			}
		},100);
		
		if(title !== null && container.descriptions[floorplan_index].querySelector('h2').innerHTML === ''){
			container.descriptions[floorplan_index].querySelector('h2').innerHTML = title;
		}
	}
	
	function AddFloorplan_Sec_07(container, index){
		//initialise new floorplan image
		var template_floorplan = container.querySelector('.t-div-00-div-01-div-00-sec-07-div-00-div-00-div-00');
		var floorplan_index = container.floorplans.length;
		var floorplan;
		floorplan = template_floorplan.cloneNode(true);
		floorplan.position = floorplan_index;
		floorplan.className = 'div-00-div-01-div-00-sec-07-div-00-div-00-div-00';
		container.querySelector('.div-01-div-00-sec-07-div-00-div-00-div-00').insertBefore(floorplan, template_floorplan);
		floorplan.style.left = (-container.active_floorplan + floorplan_index) * 660 + 'px';
		
		//if reset button is clicked
		floorplan.querySelector('.btn-00-div-00-div-01-div-00-sec-07-div-00-div-00-div-00').addEventListener('mouseover', function(){
			floorplan.querySelector('.img-00-div-00-div-01-div-00-sec-07-div-00-div-00-div-00').style.filter = 'brightness(0.85)';
		});
		floorplan.querySelector('.btn-00-div-00-div-01-div-00-sec-07-div-00-div-00-div-00').addEventListener('mouseout', function(){
			floorplan.querySelector('.img-00-div-00-div-01-div-00-sec-07-div-00-div-00-div-00').style.filter = '';
		});
		
		floorplan.querySelector('.btn-00-div-00-div-01-div-00-sec-07-div-00-div-00-div-00').addEventListener('click', function(){
			floorplan.querySelector('.div-00-div-00-div-01-div-00-sec-07-div-00-div-00-div-00').style.display = '';
			floorplan.querySelector('.img-00-div-00-div-01-div-00-sec-07-div-00-div-00-div-00').src = DOCUMENT_ROOT + 'images/null.png';
			floorplan.querySelector('.img-00-div-00-div-01-div-00-sec-07-div-00-div-00-div-00').style.filter = '';
			this.style.display = 'none';
			floorplan.image_state = 2;
		});
		
		//if input file is clicked
		floorplan.querySelector('.div-02-div-00-div-00-div-01-div-00-sec-07-div-00-div-00-div-00').addEventListener('click', function(){
			document.querySelector('#btn-00-div-00-div-01-asd-01-div-00 input').addToSection = [index, floorplan.position];
			document.querySelector('#btn-00-div-00-div-01-asd-01-div-00 input').click();
		});
		
		
		
		var template_description = container.querySelector('.t-div-00-div-02-div-00-sec-07-div-00-div-00-div-00');
		var description;
		description = template_description.cloneNode(true);
		description.className = 'div-00-div-02-div-00-sec-07-div-00-div-00-div-00';
		container.querySelector('.div-02-div-00-sec-07-div-00-div-00-div-00').insertBefore(description, template_description);
		description.style.opacity = '0.2';
		description.style.pointerEvents = 'none';
				
		floorplan.addEventListener('mouseover', function(){
			var label = this.querySelector('.lbl-01-div-00-div-00-div-00-div-01-div-00-sec-07-div-00-div-00-div-00');
			if(spn_01_div_00.state === 3){
				//make number in this section visible and change section colour
				label.style.display = '';
				label.innerHTML = spn_01_div_00.files.length;
				floorplan.style.backgroundColor = 'rgb(225,225,225)';
				//set spn insert var
				spn_01_div_00.addToSection = [index, floorplan.position];
			}
		});
		
		floorplan.addEventListener('mouseout', function(){
			this.querySelector('.lbl-01-div-00-div-00-div-00-div-01-div-00-sec-07-div-00-div-00-div-00').style.display = 'none';
			this.querySelector('.lbl-01-div-00-div-00-div-00-div-01-div-00-sec-07-div-00-div-00-div-00').innerHTML = '';
			this.style.backgroundColor = '';
			spn_01_div_00.addToSection = null;
		});
		
		container.floorplans.length++;
		container.floorplans[floorplan_index] = floorplan;
		container.descriptions[floorplan_index] = description;
	}
	
	function Sec_08_Initialise(section, is_update = false){
		
		section.obj.active_tab = 0;

		//edit tabs button
		section.obj.querySelector('button').state = 0;
		
		section.obj.querySelector('.btn-00-sec-08-div-00-div-00-div-00').addEventListener('click', function(){
			this.state = 1 - this.state;
			EditTabs_Sec_08(section, this);
		});
		
		//add button
		section.obj.querySelector('.btn-00-div-00-sec-08-div-00-div-00-div-00').addEventListener('click', function(){
			AddTab_Sec_08(section);
			AddLocation_Sec_08(section);
		});
		
		section.obj.div_00_div_02_div_01_sec_08_div_00_div_00_div_00 = section.obj.querySelectorAll('.div-00-div-02-div-01-sec-08-div-00-div-00-div-00');
				
		if(is_update === false){
			AddTab_Sec_08(section);
			AddLocation_Sec_08(section);
		}
	}
	
	function EditTabs_Sec_08(section, button){
		var tabs = section.obj.querySelectorAll('.div-00-div-00-sec-08-div-00-div-00-div-00, .div-01-div-00-sec-08-div-00-div-00-div-00, .div-02-div-00-sec-08-div-00-div-00-div-00');
		//loop through and make editable
		for(var i = 0; i < tabs.length; i++){
			if(button.state === 0){
				tabs[i].className = 'div-00-div-00-sec-08-div-00-div-00-div-00';
				tabs[i].style.width = '';
				tabs[i].querySelector('.svg-02-div-00-div-00-sec-08-div-00-div-00-div-00').style.display = 'none';
				tabs[i].querySelector('.svg-03-div-00-div-00-sec-08-div-00-div-00-div-00').style.display = 'none';
				tabs[i].querySelector('.svg-04-div-00-div-00-sec-08-div-00-div-00-div-00').style.display = 'none';
				tabs[i].querySelector('.lbl-00-div-00-div-00-sec-08-div-00-div-00-div-00').style.marginRight = '';
				tabs[i].querySelector('.lbl-00-div-00-div-00-sec-08-div-00-div-00-div-00').style.pointerEvents = 'none';
				tabs[i].querySelector('.lbl-00-div-00-div-00-sec-08-div-00-div-00-div-00').style.background = 'none';
				if(i === section.obj.active_tab){
					tabs[i].className = 'div-01-div-00-sec-08-div-00-div-00-div-00';
				}
			} else {
				tabs[i].className = 'div-02-div-00-sec-08-div-00-div-00-div-00';
				tabs[i].style.width = '282.5px';
				tabs[i].querySelector('.svg-02-div-00-div-00-sec-08-div-00-div-00-div-00').style.display = '';
				if(tabs.length > 1){
					tabs[i].querySelector('.svg-03-div-00-div-00-sec-08-div-00-div-00-div-00').style.display = '';
					tabs[i].querySelector('.svg-02-div-00-div-00-sec-08-div-00-div-00-div-00').style.marginRight = '';
				} else {
					tabs[i].querySelector('.svg-02-div-00-div-00-sec-08-div-00-div-00-div-00').style.marginRight = '20px';
				}
				tabs[i].querySelector('.lbl-00-div-00-div-00-sec-08-div-00-div-00-div-00').style.marginRight = '7.5px';
			}
		}
		
		//hide add tab button
		if(button.state === 0){
			button.innerHTML = 'Edit Tabs';
			section.obj.querySelector('.btn-00-div-00-sec-08-div-00-div-00-div-00').style.display = '';
		} else {
			button.innerHTML = 'Done';
			section.obj.querySelector('.btn-00-div-00-sec-08-div-00-div-00-div-00').style.display = 'none';
		}
	}
	
	function AddTab_Sec_08(section){
		var template = section.obj.querySelector('.t-div-00-div-00-sec-08-div-00-div-00-div-00').cloneNode(true);
		//stop current active
		if(section.obj.querySelector('.div-01-div-00-sec-08-div-00-div-00-div-00')){
			section.obj.querySelector('.div-01-div-00-sec-08-div-00-div-00-div-00').className = 'div-00-div-00-sec-08-div-00-div-00-div-00';
		}
		
		template.className = 'div-01-div-00-sec-08-div-00-div-00-div-00';
		//set focus to name tab
		setTimeout(function(){template.querySelector('label').focus();},1);
		
		section.obj.querySelector('.div-00-sec-08-div-00-div-00-div-00').insertBefore(template, section.obj.querySelector('.btn-00-div-00-sec-08-div-00-div-00-div-00'));
		
		
		InitialiseTab_Sec_08(section, template);
	}
	
	function InitialiseTab_Sec_08(section, tab){
		//set new tab to be active
		var tabs = section.obj.querySelectorAll('.div-00-div-00-sec-08-div-00-div-00-div-00, .div-01-div-00-sec-08-div-00-div-00-div-00, .div-02-div-00-sec-08-div-00-div-00-div-00');
		var active_tab = tabs.length - 1;
		//reset current active tab
		section.obj.querySelectorAll('.div-00-div-00-sec-08-div-00-div-00-div-00, .div-01-div-00-sec-08-div-00-div-00-div-00, .div-02-div-00-sec-08-div-00-div-00-div-00')[section.obj.active_tab].className = 'div-00-div-00-sec-08-div-00-div-00-div-00';
		//set new tab to active
		section.obj.active_tab = active_tab;
		tab.className = 'div-01-div-00-sec-08-div-00-div-00-div-00';
		
		//set active
		tab.addEventListener('click', function(){
			//if not renaming, change active
			if(section.obj.querySelector('button').state === 0){
				section.obj.querySelectorAll('.div-00-div-00-sec-08-div-00-div-00-div-00, .div-01-div-00-sec-08-div-00-div-00-div-00, .div-02-div-00-sec-08-div-00-div-00-div-00')[section.obj.active_tab].className = 'div-00-div-00-sec-08-div-00-div-00-div-00';
				for(var i = 0; i < section.obj.querySelectorAll('.div-00-div-00-sec-08-div-00-div-00-div-00, .div-01-div-00-sec-08-div-00-div-00-div-00, .div-02-div-00-sec-08-div-00-div-00-div-00').length; i++){
					//set active tab to the tab index
					if(section.obj.querySelectorAll('.div-00-div-00-sec-08-div-00-div-00-div-00, .div-01-div-00-sec-08-div-00-div-00-div-00, .div-02-div-00-sec-08-div-00-div-00-div-00')[i] === tab){
						section.obj.active_tab = i;
					}
				}
				tab.className = 'div-01-div-00-sec-08-div-00-div-00-div-00';
				//set target t of galleries, so active one fades in
				var gallery = section.obj.querySelectorAll('.div-00-div-01-sec-08-div-00-div-00-div-00');
				for(var j = 0; j < gallery.length; j++){
					if(j === section.obj.active_tab){
						gallery[j].target_t = 2;
						gallery[j].style.pointerEvents = '';
					} else {
						gallery[j].target_t = 0;
						gallery[j].style.pointerEvents = 'none';
					}
				}
			}
		});
		
		var edit_btn = tab.querySelector('.svg-02-div-00-div-00-sec-08-div-00-div-00-div-00');
		var delete_btn = tab.querySelector('.svg-03-div-00-div-00-sec-08-div-00-div-00-div-00');
		var confirm_btn = tab.querySelector('.svg-04-div-00-div-00-sec-08-div-00-div-00-div-00');
		var label = tab.querySelector('.lbl-00-div-00-div-00-sec-08-div-00-div-00-div-00');
		
		//edit button
		edit_btn.addEventListener('click', function(){
			//allow editing of input
			label.style.pointerEvents = '';
			label.style.background = '';
			//make edit and delete button hidden
			edit_btn.style.display = 'none';
			delete_btn.style.display = 'none';
			confirm_btn.style.display = '';
		});
		
		//if finished editing
		confirm_btn.addEventListener('click', function(){
			label.style.pointerEvents = 'none';
			label.style.background = 'none';
			//reveal edit and delete buttons
			edit_btn.style.display = '';
			//prevent deleting last tab
			if(section.obj.querySelectorAll('.div-02-div-00-sec-08-div-00-div-00-div-00').length > 1){
				delete_btn.style.display = '';
				edit_btn.style.marginRight = '';
			} else {
				edit_btn.style.marginRight = '20px';
			}
			confirm_btn.style.display = 'none';
		});
		
		//delete button
		delete_btn.addEventListener('click', function(){
			DeleteTab_Sec_08(section, tabs[tabs.length - 1], section.obj.querySelectorAll('.div-00-div-01-sec-08-div-00-div-00-div-00')[tabs.length - 1]);
		});
	}
	
	function AddLocation_Sec_08(section){
		var template = section.obj.querySelector('.t-div-00-div-01-sec-08-div-00-div-00-div-00').cloneNode(true);
		
		template.className = 'div-00-div-01-sec-08-div-00-div-00-div-00';
		
		section.obj.querySelector('.div-01-sec-08-div-00-div-00-div-00').appendChild(template);
		
		InitialiseLocation_Sec_08(section, template);
	}
	
	function InitialiseLocation_Sec_08(section, location){
		//reduce opacity of other tabs
		var locations = section.obj.querySelectorAll('.div-00-div-01-sec-08-div-00-div-00-div-00');
		for(var i = 0; i < locations.length; i++){
			locations[i].target_t = 0;
		}
		
		var tabs = section.obj.querySelectorAll('.div-00-div-00-sec-08-div-00-div-00-div-00, .div-01-div-00-sec-08-div-00-div-00-div-00, .div-02-div-00-sec-08-div-00-div-00-div-00');
		
		var walkscore_upload = location.querySelector('.div-01-div-00-div-01-sec-08-div-00-div-00-div-00');
				
		//initialise vars
		location.t = 0;
		location.target_t = 2;
		
		location.address = '';
		location.lat = '';
		location.lng = '';
		location.zoom = 3;
		location.pin_label = SITE_NAME;
		location.walkscore_embed_code = '';
		walkscore_upload.state = 0;
		location.state = 0;
		
		
		var map_upload = location.querySelector('.div-00-div-00-div-01-sec-08-div-00-div-00-div-00');
		var map_upload_popup = document.querySelector('#div-04-div-01-div-00');
		
		var zoom_input = map_upload.querySelectorAll('.ipt-00-div-00-div-01-div-00-div-00-div-01-sec-08-div-00-div-00-div-00')[0];
		var pin_label_input = map_upload.querySelectorAll('.ipt-00-div-00-div-01-div-00-div-00-div-01-sec-08-div-00-div-00-div-00')[1];
		
		zoom_input.value = location.zoom;
		pin_label_input.value = location.pin_label;
		
		
		map_upload.querySelector('.div-00-div-00-div-00-div-00-div-01-sec-08-div-00-div-00-div-00').addEventListener('click', function(){
			location.state = 1;
			div_01_div_00.style.pointerEvents = '';
			div_01_div_00.style.opacity = '1';
			map_upload_popup.style.display = '';
			map_upload_popup.querySelector('#ipt-00-div-04-div-01-div-00').value = location.address;
		});
		
		map_upload_popup.querySelector('svg').addEventListener('click', function(){
			location.state = 0;
			div_01_div_00.style.pointerEvents = 'none';
			div_01_div_00.style.opacity = '0';
			map_upload_popup.style.display = 'none';
		});
		
		map_upload_popup.querySelector('button').addEventListener('click', function(){
			if(location.state === 1){			
				location.state = 0;
				div_01_div_00.style.pointerEvents = 'none';
				div_01_div_00.style.opacity = '0';
				map_upload_popup.style.display = 'none';
				location.address = map_upload_popup.querySelector('#ipt-00-div-04-div-01-div-00').value;

				GeoCodeLocation(location);
				
				location.querySelector('.btn-00-div-00-div-00-div-00-div-01-sec-08-div-00-div-00-div-00').style.display = '';
				location.querySelector('.div-00-div-00-div-00-div-00-div-01-sec-08-div-00-div-00-div-00').style.display = 'none';
			}
		});
		
		//if reset button is clicked
		location.querySelector('.btn-00-div-00-div-00-div-00-div-01-sec-08-div-00-div-00-div-00').addEventListener('mouseover', function(){
			location.querySelector('.div-01-div-00-div-00-div-00-div-01-sec-08-div-00-div-00-div-00').style.filter = 'brightness(0.85)';
		});
		location.querySelector('.btn-00-div-00-div-00-div-00-div-01-sec-08-div-00-div-00-div-00').addEventListener('mouseout', function(){
			location.querySelector('.div-01-div-00-div-00-div-00-div-01-sec-08-div-00-div-00-div-00').style.filter = '';
		});
		
		location.querySelector('.btn-00-div-00-div-00-div-00-div-01-sec-08-div-00-div-00-div-00').addEventListener('click', function(){
			location.querySelector('.div-00-div-00-div-00-div-00-div-01-sec-08-div-00-div-00-div-00').style.display = '';
			location.querySelector('.div-01-div-00-div-00-div-00-div-01-sec-08-div-00-div-00-div-00').innerHTML = '';
			location.querySelector('.div-01-div-00-div-00-div-00-div-01-sec-08-div-00-div-00-div-00').style.filter = '';
			this.style.display = 'none';
		});
		
		zoom_input.addEventListener('focusout', function(){
			zoom_input.value = zoom_input.value.replace(/[^0-9.]/g, '');
			if(location.zoom !== zoom_input.value){
				location.zoom = zoom_input.value;
				if(location.address !== ''){
					GeoCodeLocation(location);
					location.querySelector('.btn-00-div-00-div-00-div-00-div-01-sec-08-div-00-div-00-div-00').style.display = '';
					location.querySelector('.div-00-div-00-div-00-div-00-div-01-sec-08-div-00-div-00-div-00').style.display = 'none';
				}
			}
		});
		
		pin_label_input.addEventListener('focusout', function(){
			pin_label_input.value = pin_label_input.value.replace(/[^0-9.]/g, '');
			if(location.pin_label !== pin_label_input.value){
				location.pin_label = pin_label_input.value;
				if(location.address !== ''){
					GeoCodeLocation(location);
					location.querySelector('.btn-00-div-00-div-00-div-00-div-01-sec-08-div-00-div-00-div-00').style.display = '';
					location.querySelector('.div-00-div-00-div-00-div-00-div-01-sec-08-div-00-div-00-div-00').style.display = 'none';
				}
			}
		});
		
		var walkscore_upload_popup = document.querySelector('#div-05-div-01-div-00');
		
		walkscore_upload.querySelector('div').addEventListener('click', function(){
			walkscore_upload.state = 1;
			div_01_div_00.style.pointerEvents = '';
			div_01_div_00.style.opacity = '1';
			walkscore_upload_popup.style.display = '';
			walkscore_upload_popup.querySelector('#txt-00-div-05-div-01-div-00').value = location.walkscore_embed_code;
		});
		
		walkscore_upload_popup.querySelector('svg').addEventListener('click', function(){
			walkscore_upload.state = 0;
			div_01_div_00.style.pointerEvents = 'none';
			div_01_div_00.style.opacity = '0';
			walkscore_upload_popup.style.display = 'none';
		});
		
		walkscore_upload_popup.querySelector('button').addEventListener('click', function(){
			if(walkscore_upload.state === 1){
				walkscore_upload.state = 0;
				div_01_div_00.style.pointerEvents = 'none';
				div_01_div_00.style.opacity = '0';
				walkscore_upload_popup.style.display = 'none';
				
				location.walkscore_embed_code = walkscore_upload_popup.querySelector('#txt-00-div-05-div-01-div-00').value;

				ResizeWalkscore(location);
				
				let scripts = walkscore_upload.querySelector('iframe').querySelectorAll("script");
				[].forEach.call(scripts, function(script){
					var script_element = walkscore_upload.querySelector('iframe').createElement("script");
					script_element.type = "text/javascript";
					if(script.src !== null && script.src !== ''){
						script_element.src = script.src;
					}
					script_element.innerHTML = script.innerHTML;
					script.parentNode.appendChild(script_element);
					script.parentNode.removeChild(script);
				});

				
				location.querySelector('.btn-00-div-01-div-00-div-01-sec-08-div-00-div-00-div-00').style.display = '';
				location.querySelector('.btn-01-div-01-div-00-div-01-sec-08-div-00-div-00-div-00').style.display = 'none';
				location.querySelector('.div-00-div-01-div-00-div-01-sec-08-div-00-div-00-div-00').style.display = 'none';
			}
		});
		
		window.onresize = function(){
			ResizeWalkscore(location);
		};
		
		
		//if reset button is clicked
		walkscore_upload.querySelector('.btn-00-div-01-div-00-div-01-sec-08-div-00-div-00-div-00').addEventListener('mouseover', function(){
			walkscore_upload.style.filter = 'brightness(0.85)';
		});
		walkscore_upload.querySelector('.btn-00-div-01-div-00-div-01-sec-08-div-00-div-00-div-00').addEventListener('mouseout', function(){
			walkscore_upload.style.filter = '';
		});
		
		walkscore_upload.querySelector('.btn-00-div-01-div-00-div-01-sec-08-div-00-div-00-div-00').addEventListener('click', function(){
			this.style.display = 'none';
			walkscore_upload.removeChild(walkscore_upload.querySelector('iframe'));
			location.querySelector('.div-00-div-01-div-00-div-01-sec-08-div-00-div-00-div-00').style.display = '';
			location.querySelector('.btn-01-div-01-div-00-div-01-sec-08-div-00-div-00-div-00').style.display = '';
		});
		
		//walkscore 'add walkscore'
		location.querySelector('.btn-00-div-00-div-01-sec-08-div-00-div-00-div-00').addEventListener('click', function(){
			walkscore_upload.style.display = '';
			this.style.display = 'none';
			location.querySelector('.btn-00-div-01-div-00-div-01-sec-08-div-00-div-00-div-00').style.display = 'none';
			location.querySelector('.div-00-div-01-div-00-div-01-sec-08-div-00-div-00-div-00').style.display = '';
		});
		
		//walkscore remove
		location.querySelector('.btn-01-div-01-div-00-div-01-sec-08-div-00-div-00-div-00').addEventListener('click', function(){
			walkscore_upload.style.display = 'none';
			location.querySelector('.btn-00-div-00-div-01-sec-08-div-00-div-00-div-00').style.display = '';
		});
		
		
		
		div_01_div_00.addEventListener('click', function(event){
			if(event.target.id === 'div-01-div-00'){
				location.state = 0;
				walkscore_upload.state = 0;
				div_01_div_00.style.pointerEvents = 'none';
				div_01_div_00.style.opacity = '0';
				map_upload_popup.style.display = 'none';
				walkscore_upload_popup.style.display = 'none';
			}
		});
	}
	
	function ResizeWalkscore(location){
		
		var walkscore_upload = location.querySelector('.div-01-div-00-div-01-sec-08-div-00-div-00-div-00');
		
		var iframe_width = walkscore_upload.offsetWidth - 8;
		var iframe_height = walkscore_upload.offsetHeight - 68;
		
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
	
	function GeoCodeLocation(location){
		//set google map
		location.lat = parseFloat(location.lat);
		location.lng = parseFloat(location.lng);
		location.zoom = parseInt(location.zoom);
		
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode( { 'address': location.address}, function(results, status) {
			if (status === google.maps.GeocoderStatus.OK){
				location.lat = results[0].geometry.location.lat();
				location.lng = results[0].geometry.location.lng();
				
				var map = new google.maps.Map(location.querySelector('.div-01-div-00-div-00-div-00-div-01-sec-08-div-00-div-00-div-00'), {
					zoom: location.zoom,
					center: {lat: location.lat, lng: location.lng}
				});
				var marker = new google.maps.Marker({
					position: {lat: location.lat, lng: location.lng},
					map: map,
					title: location.pin_label
				});

				marker.setMap(map);
			}
		});
	}
	
	function DeleteTab_Sec_08(section, tab, location){
		//get all remaining tabs and make sure not active tab
		var tabs = section.obj.querySelectorAll('.div-02-div-00-sec-08-div-00-div-00-div-00');
		//get index of deleted tab
		var delete_index = 0;
		for(var i = 0; i < tabs.length; i++){
			if(tabs[i] === tab){
				delete_index = i;
			}
		}
		
		//if deleted tab is before active tab, reduce by one
		if(section.obj.active_tab >= delete_index){
			section.obj.active_tab = Math.max(section.obj.active_tab - 1, 0);
			section.obj.querySelectorAll('.div-00-div-01-sec-08-div-00-div-00-div-00')[section.obj.active_tab].target_t = 2;
		}
		
		//remove DOM element
		if(tabs.length > 1){
			section.obj.querySelector('.div-00-sec-08-div-00-div-00-div-00').removeChild(tab);
			section.obj.querySelector('.div-01-sec-08-div-00-div-00-div-00').removeChild(location);
		}
		
		//hide delete icon if last tab
		tabs = section.obj.querySelectorAll('.div-02-div-00-sec-08-div-00-div-00-div-00');
		if(tabs.length === 1){
			tabs[0].querySelector('.svg-03-div-00-div-00-sec-08-div-00-div-00-div-00').style.display = 'none';
			tabs[0].querySelector('.svg-02-div-00-div-00-sec-08-div-00-div-00-div-00').style.marginRight = '20px';
		}
	}
	
	function Sec_09_Initialise(section, is_update = false){
		
		AddEmail_Sec_09(section.obj);
		
		section.obj.querySelector('.div-00-div-00-sec-09-div-00-div-00-div-00').removeChild(section.obj.querySelector('.div-00-div-00-sec-09-div-00-div-00-div-00').querySelector('svg'));
		
		section.obj.querySelector('.btn-00-div-00-sec-09-div-00-div-00-div-00').addEventListener('click', function(){
			AddEmail_Sec_09(section.obj);
		});
	}
	
	function AddEmail_Sec_09(section){
		//add new email box
		var template = section.querySelector('.t-div-00-div-00-sec-09-div-00-div-00-div-00').cloneNode(true);
		template.className = 'div-00-div-00-sec-09-div-00-div-00-div-00';
		var btn = section.querySelector('.btn-00-div-00-sec-09-div-00-div-00-div-00');
		section.querySelector('.div-00-sec-09-div-00-div-00-div-00').insertBefore(template, btn);
		
		template.querySelector('svg').addEventListener('click', function(){
			section.querySelector('.div-00-sec-09-div-00-div-00-div-00').removeChild(template);
		});
	}
	
	function Sec_11_Initialise(section, index){
		
		var resources = section.obj.querySelector('.div-00-sec-11-div-00-div-00-div-00');
		
		//uploads and buttons, counter label
		resources.files = [];
		resources.descriptions = [];
		resources.active_file = 0;
		
		AddFile_Sec_11(resources, index);
		
		//forward and back arrows
		resources.querySelector('.svg-02-div-02-div-00-sec-11-div-00-div-00-div-00').addEventListener('click', function(){
			if(resources.active_file !== 0){
				resources.active_file--;
			}
		});
		resources.querySelector('.svg-03-div-02-div-00-sec-11-div-00-div-00-div-00').addEventListener('click', function(){
			if(resources.active_file !== resources.files.length - 1){
				resources.active_file++;
			}
		});
		
		//move floorplan buttons
		resources.querySelector('.svg-02-div-00-div-00-sec-11-div-00-div-00-div-00').addEventListener('click', function(){
			if(resources.active_file > 0 && resources.active_file < resources.files.length - 1){
				var move_file_left = resources.files[resources.active_file];
				resources.files[resources.active_file] = resources.files[resources.active_file - 1];
				resources.files[resources.active_file - 1] = move_file_left;
				resources.files[resources.active_file].position ++;
				resources.files[resources.active_file - 1].position --;
				var move_description_left = resources.descriptions[resources.active_file];
				resources.descriptions[resources.active_file] = resources.descriptions[resources.active_file - 1];
				resources.descriptions[resources.active_file - 1] = move_description_left;
				resources.active_file--;
			}
		});
		
		resources.querySelector('.svg-03-div-00-div-00-sec-11-div-00-div-00-div-00').addEventListener('click', function(){
			if(resources.active_file < resources.files.length - 2){
				var move_file_right = resources.files[resources.active_file];
				resources.files[resources.active_file] = resources.files[resources.active_file + 1];
				resources.files[resources.active_file + 1] = move_file_right;
				resources.files[resources.active_file].position --;
				resources.files[resources.active_file + 1].position ++;
				var move_description_right = resources.descriptions[resources.active_file];
				resources.descriptions[resources.active_file] = resources.descriptions[resources.active_file + 1];
				resources.descriptions[resources.active_file + 1] = move_description_right;
				resources.active_file++;
			}
		});
		
		resources.querySelector('.svg-04-div-00-div-00-sec-11-div-00-div-00-div-00').addEventListener('click', function(){
			//delete container entry and shift all above down
			if(resources.active_file < resources.files.length - 1){
				resources.querySelector('.div-01-div-00-sec-11-div-00-div-00-div-00').removeChild(resources.files[resources.active_file]);
				resources.querySelector('.div-02-div-00-sec-11-div-00-div-00-div-00').removeChild(resources.descriptions[resources.active_file]);
				resources.files[resources.active_file] = '';
				resources.descriptions[resources.active_file] = '';
				for(var j = 0; j < resources.files.length; j++){
					if(j > resources.active_file){
						resources.files[j - 1] = resources.files[j];
						resources.descriptions[j - 1] = resources.descriptions[j];
						resources.files[j - 1].position --;
					}
				}
				resources.files.length = Math.max(resources.files.length - 1, 1);
				resources.files.length = Math.max(resources.descriptions.length - 1, 1);
			}
		});
	}
	
	function InsertFile_Sec_11(resources, resource_src){
		//set the data being added
		var file_index = resources.files.length - 1;
		resources.files[file_index].querySelector('object').data = resource_src;
		resources.files[file_index].querySelector('.div-00-div-00-div-01-div-00-sec-11-div-00-div-00-div-00').style.display = 'none';
	}
	
	function AddFile_Sec_11(resources, index){
		
		//initialise new resource
		var template_file = resources.querySelector('.t-div-00-div-01-div-00-sec-11-div-00-div-00-div-00');
		var file_index = resources.files.length;
		var file = template_file.cloneNode(true);
		file.position = file_index;
		file.className = 'div-00-div-01-div-00-sec-11-div-00-div-00-div-00';
		resources.querySelector('.div-01-div-00-sec-11-div-00-div-00-div-00').insertBefore(file, template_file);
		file.style.left = (-resources.active_file + file_index) * 510 + 'px';
		
		//if reset button is clicked
		file.querySelector('.btn-00-div-00-div-01-div-00-sec-11-div-00-div-00-div-00').addEventListener('mouseover', function(){
			file.querySelector('.div-00-div-01-div-00-sec-11-div-00-div-00-div-00 object').style.filter = 'brightness(0.85)';
		});
		file.querySelector('.btn-00-div-00-div-01-div-00-sec-11-div-00-div-00-div-00').addEventListener('mouseout', function(){
			file.querySelector('.div-00-div-01-div-00-sec-11-div-00-div-00-div-00 object').style.filter = '';
		});
		
		file.querySelector('.btn-00-div-00-div-01-div-00-sec-11-div-00-div-00-div-00').addEventListener('click', function(){
			file.querySelector('.div-00-div-00-div-01-div-00-sec-11-div-00-div-00-div-00').style.display = '';
			file.querySelector('.div-00-div-01-div-00-sec-11-div-00-div-00-div-00 object').data = '';
			file.querySelector('.div-00-div-01-div-00-sec-11-div-00-div-00-div-00 object').style.filter = '';
			this.style.display = 'none';
			file.image_state = 2;
		});
		
		
		var template_description = resources.querySelector('.t-div-00-div-02-div-00-sec-11-div-00-div-00-div-00');
		var description = template_description.cloneNode(true);
		description.className = 'div-00-div-02-div-00-sec-11-div-00-div-00-div-00';
		resources.querySelector('.div-02-div-00-sec-11-div-00-div-00-div-00').insertBefore(description, template_description);
		description.style.opacity = '0.2';
		description.style.pointerEvents = 'none';
		//add description
		description.state = 0;
		Description_Sec_11(description);
				
		file.addEventListener('mouseover', function(){
			var label = this.querySelector('.lbl-01-div-00-div-00-div-00-div-01-div-00-sec-11-div-00-div-00-div-00');
			if(spn_01_div_00.state === 3){
				//make number in this section visible and change section colour
				label.style.display = '';
				label.innerHTML = spn_01_div_00.files.length;
				file.style.backgroundColor = 'rgb(225,225,225)';
				//set spn insert var
				spn_01_div_00.addToSection = [index, file.position];
			}
		});
		
		file.addEventListener('mouseout', function(){
			this.querySelector('.lbl-01-div-00-div-00-div-00-div-01-div-00-sec-11-div-00-div-00-div-00').style.display = 'none';
			this.querySelector('.lbl-01-div-00-div-00-div-00-div-01-div-00-sec-11-div-00-div-00-div-00').innerHTML = '';
			this.style.backgroundColor = '';
			spn_01_div_00.addToSection = null;
		});
		
		
		//if input file is clicked
		file.querySelector('.div-02-div-00-div-00-div-01-div-00-sec-11-div-00-div-00-div-00').addEventListener('click', function(){
			document.querySelector('#btn-00-div-00-div-01-asd-01-div-00 input').addToSection = [index, file.position];
			document.querySelector('#btn-00-div-00-div-01-asd-01-div-00 input').click();
		});
		
		resources.files.length++;
		resources.files[file_index] = file;
		resources.descriptions[file_index] = description;
	}
	
	function Description_Sec_11(description){
		description.querySelector('.btn-00-div-00-div-02-div-00-sec-11-div-00-div-00-div-00').addEventListener('click', function(){
			description.state = 1;
			description.querySelector('.btn-00-div-00-div-02-div-00-sec-11-div-00-div-00-div-00').style.display = 'none';
			description.querySelector('.btn-01-div-00-div-02-div-00-sec-11-div-00-div-00-div-00').style.display = '';
			description.querySelector('.p-00-div-00-div-02-div-00-sec-11-div-00-div-00-div-00').style.display = '';
		});
		description.querySelector('.btn-01-div-00-div-02-div-00-sec-11-div-00-div-00-div-00').addEventListener('click', function(){
			description.state = 0;
			description.querySelector('.btn-00-div-00-div-02-div-00-sec-11-div-00-div-00-div-00').style.display = '';
			description.querySelector('.btn-01-div-00-div-02-div-00-sec-11-div-00-div-00-div-00').style.display = 'none';
			description.querySelector('.p-00-div-00-div-02-div-00-sec-11-div-00-div-00-div-00').style.display = 'none';
		});
	}
	
	// function Sec_12_Initialise(section, index){
		
	// 	var div_00_div_00_sec_12_div_00_div_00_div_00 = section.obj.querySelectorAll('.div-00-div-00-sec-12-div-00-div-00-div-00');
	// 	console.log(div_00_div_00_sec_12_div_00_div_00_div_00);	
	// 	console.log(section);
	// 	console.log(index);		
	// 	// div_00_div_00_sec_12_div_00_div_00_div_00[0].select_agents = '';
		
	// 	// section.zIndex_multiplier = -1;
		
	// 	// section.obj.querySelector('.div-01-div-00-sec-12-div-00-div-00-div-00').state = 0;
		
	// 	// section.obj.querySelector('.div-01-div-00-sec-12-div-00-div-00-div-00 button').addEventListener('click', function(){
	// 	// 	section.obj.querySelector('.div-01-div-00-sec-12-div-00-div-00-div-00').style.display = 'none';
	// 	// 	div_00_div_00_sec_12_div_00_div_00_div_00[1].style.display = '';
	// 	// 	div_00_div_00_sec_12_div_00_div_00_div_00[1].visible = true;
	// 	// });
		
	// 	// section.obj.querySelector('.btn-02-div-00-div-00-sec-12-div-00-div-00-div-00').addEventListener('click', function(){
	// 	// 	section.obj.querySelector('.div-01-div-00-sec-12-div-00-div-00-div-00').style.display = '';
	// 	// 	div_00_div_00_sec_12_div_00_div_00_div_00[1].style.display = 'none';
	// 	// 	div_00_div_00_sec_12_div_00_div_00_div_00[1].visible = false;
	// 	// });
		
	// 	// section.obj.querySelector('.div-01-div-00-div-00-sec-12-div-00-div-00-div-00').addEventListener('mouseover', function(){
	// 	// 	var label = this.querySelector('.lbl-01-div-00-div-01-div-00-div-00-sec-12-div-00-div-00-div-00');
	// 	// 	if(spn_01_div_00.state === 3){
	// 	// 		//make number in this section visible and change section colour
	// 	// 		label.style.display = '';
	// 	// 		label.innerHTML = '1';
	// 	// 		//set spn insert var
	// 	// 		spn_01_div_00.addToSection = [index,0];
	// 	// 	}
	// 	// });
		
	// 	// section.obj.querySelector('.div-01-div-00-div-00-sec-12-div-00-div-00-div-00').addEventListener('mouseout', function(){
	// 	// 	this.querySelector('.lbl-01-div-00-div-01-div-00-div-00-sec-12-div-00-div-00-div-00').style.display = 'none';
	// 	// 	this.querySelector('.lbl-01-div-00-div-01-div-00-div-00-sec-12-div-00-div-00-div-00').innerHTML = '';
	// 	// 	spn_01_div_00.addToSection = null;
	// 	// });
		
	// 	//if reset button is clicked
	// 	// section.obj.querySelector('.btn-01-div-00-div-00-sec-12-div-00-div-00-div-00').addEventListener('mouseover', function(){
	// 	// 	section.obj.querySelector('.img-00-div-00-div-00-div-00-sec-12-div-00-div-00-div-00').style.filter = 'brightness(0.85)';
	// 	// });
	// 	// section.obj.querySelector('.btn-01-div-00-div-00-sec-12-div-00-div-00-div-00').addEventListener('mouseout', function(){
	// 	// 	section.obj.querySelector('.img-00-div-00-div-00-div-00-sec-12-div-00-div-00-div-00').style.filter = '';
	// 	// });
		
	// 	// section.obj.querySelector('.btn-01-div-00-div-00-sec-12-div-00-div-00-div-00').addEventListener('click', function(){
	// 	// 	section.obj.querySelector('.div-01-div-00-sec-12-div-00-div-00-div-00').state = 1;
	// 	// 	section.obj.querySelector('.div-01-div-00-div-00-sec-12-div-00-div-00-div-00').style.display = '';
	// 	// 	section.obj.querySelector('.img-00-div-00-div-00-div-00-sec-12-div-00-div-00-div-00').src = DOCUMENT_ROOT + 'images/null.png';
	// 	// 	section.obj.querySelector('.img-00-div-00-div-00-div-00-sec-12-div-00-div-00-div-00').style.filter = '';
	// 	// 	this.style.display = 'none';
	// 	// });
		
		
		
	// 	// section.obj.querySelectorAll('.div-01-div-00-div-00-sec-12-div-00-div-00-div-00')[1].addEventListener('mouseover', function(){
	// 	// 	var label = this.querySelector('.lbl-01-div-00-div-01-div-00-div-00-sec-12-div-00-div-00-div-00');
	// 	// 	if(spn_01_div_00.state === 3){
	// 	// 		//make number in this section visible and change section colour
	// 	// 		label.style.display = '';
	// 	// 		label.innerHTML = '1';
	// 	// 		//set spn insert var
	// 	// 		spn_01_div_00.addToSection = [index,1];
	// 	// 	}
	// 	// });
		
	// 	// section.obj.querySelectorAll('.div-01-div-00-div-00-sec-12-div-00-div-00-div-00')[1].addEventListener('mouseout', function(){
	// 	// 	this.querySelector('.lbl-01-div-00-div-01-div-00-div-00-sec-12-div-00-div-00-div-00').style.display = 'none';
	// 	// 	this.querySelector('.lbl-01-div-00-div-01-div-00-div-00-sec-12-div-00-div-00-div-00').innerHTML = '';
	// 	// 	spn_01_div_00.addToSection = null;
	// 	// });
		
	// 	// //if reset button is clicked
	// 	// section.obj.querySelectorAll('.btn-01-div-00-div-00-sec-12-div-00-div-00-div-00')[1].addEventListener('mouseover', function(){
	// 	// 	section.obj.querySelectorAll('.img-00-div-00-div-00-div-00-sec-12-div-00-div-00-div-00')[1].style.filter = 'brightness(0.85)';
	// 	// });
	// 	// section.obj.querySelectorAll('.btn-01-div-00-div-00-sec-12-div-00-div-00-div-00')[1].addEventListener('mouseout', function(){
	// 	// 	section.obj.querySelectorAll('.img-00-div-00-div-00-div-00-sec-12-div-00-div-00-div-00')[1].style.filter = '';
	// 	// });
		
	// 	// section.obj.querySelectorAll('.btn-01-div-00-div-00-sec-12-div-00-div-00-div-00')[1].addEventListener('click', function(){
	// 	// 	section.obj.querySelectorAll('.div-01-div-00-div-00-sec-12-div-00-div-00-div-00')[1].style.display = '';
	// 	// 	section.obj.querySelectorAll('.img-00-div-00-div-00-div-00-sec-12-div-00-div-00-div-00')[1].src = DOCUMENT_ROOT + 'images/null.png';
	// 	// 	section.obj.querySelectorAll('.img-00-div-00-div-00-div-00-sec-12-div-00-div-00-div-00')[1].style.filter = '';
	// 	// 	this.style.display = 'none';
	// 	// });
		
	// 	// //clicking 'select image'
	// 	// section.obj.querySelector('.div-02-div-01-div-00-div-00-sec-12-div-00-div-00-div-00').addEventListener('click', function(){
	// 	// 	document.querySelector('#btn-00-div-00-div-01-asd-01-div-00 input').addToSection = [index, 0];
	// 	// 	document.querySelector('#btn-00-div-00-div-01-asd-01-div-00 input').click();
	// 	// });
		
	// 	// section.obj.querySelectorAll('.div-02-div-01-div-00-div-00-sec-12-div-00-div-00-div-00')[1].addEventListener('click', function(){
	// 	// 	document.querySelector('#btn-00-div-00-div-01-asd-01-div-00 input').addToSection = [index, 1];
	// 	// 	document.querySelector('#btn-00-div-00-div-01-asd-01-div-00 input').click();
	// 	// });
		
		
	// 	// //upload buttons
	// 	// var media_btn = section.obj.querySelectorAll('.btn-00-div-00-div-00-sec-12-div-00-div-00-div-00');
	// 	// var media_link_popup = document.querySelector('#div-06-div-01-div-00');
		
	// 	// media_btn[0].addEventListener('click', function(){
	// 	// 	div_00_div_00_sec_12_div_00_div_00_div_00[0].state = 1;
	// 	// 	div_00_div_00_sec_12_div_00_div_00_div_00[1].state = 0;
	// 	// 	media_link_popup.querySelectorAll('input')[0].value = div_00_div_00_sec_12_div_00_div_00_div_00[0].fb_link;
	// 	// 	media_link_popup.querySelectorAll('input')[1].value = div_00_div_00_sec_12_div_00_div_00_div_00[0].email;
	// 	// 	media_link_popup.querySelectorAll('input')[2].value = div_00_div_00_sec_12_div_00_div_00_div_00[0].website_link;
	// 	// 	div_01_div_00.style.pointerEvents = '';
	// 	// 	div_01_div_00.style.opacity = '1';
	// 	// 	media_link_popup.style.display = '';
	// 	// });
		
	// 	// media_btn[1].addEventListener('click', function(){
	// 	// 	div_00_div_00_sec_12_div_00_div_00_div_00[1].state = 1;
	// 	// 	div_00_div_00_sec_12_div_00_div_00_div_00[0].state = 0;
	// 	// 	media_link_popup.querySelectorAll('input')[0].value = div_00_div_00_sec_12_div_00_div_00_div_00[1].fb_link;
	// 	// 	media_link_popup.querySelectorAll('input')[1].value = div_00_div_00_sec_12_div_00_div_00_div_00[1].email;
	// 	// 	media_link_popup.querySelectorAll('input')[2].value = div_00_div_00_sec_12_div_00_div_00_div_00[1].website_link;
	// 	// 	div_01_div_00.style.pointerEvents = '';
	// 	// 	div_01_div_00.style.opacity = '1';
	// 	// 	media_link_popup.style.display = '';
	// 	// });
		
	// 	// media_link_popup.querySelector('svg').addEventListener('click', function(){
	// 	// 	div_01_div_00.style.pointerEvents = 'none';
	// 	// 	div_01_div_00.style.opacity = '0';
	// 	// 	media_link_popup.style.display = 'none';
	// 	// });
		
	// 	// media_link_popup.querySelector('button').addEventListener('click', function(){
	// 	// 	if(div_00_div_00_sec_12_div_00_div_00_div_00[0].state === 1){
	// 	// 		div_00_div_00_sec_12_div_00_div_00_div_00[0].fb_link = media_link_popup.querySelectorAll('input')[0].value;
	// 	// 		div_00_div_00_sec_12_div_00_div_00_div_00[0].email = media_link_popup.querySelectorAll('input')[1].value;
	// 	// 		div_00_div_00_sec_12_div_00_div_00_div_00[0].website_link = media_link_popup.querySelectorAll('input')[2].value;
	// 	// 	}
	// 	// 	if(div_00_div_00_sec_12_div_00_div_00_div_00[1].state === 1){
	// 	// 		div_00_div_00_sec_12_div_00_div_00_div_00[1].fb_link = media_link_popup.querySelectorAll('input')[0].value;
	// 	// 		div_00_div_00_sec_12_div_00_div_00_div_00[1].email = media_link_popup.querySelectorAll('input')[1].value;
	// 	// 		div_00_div_00_sec_12_div_00_div_00_div_00[1].website_link = media_link_popup.querySelectorAll('input')[2].value;
	// 	// 	}
	// 	// 	div_01_div_00.style.pointerEvents = 'none';
	// 	// 	div_01_div_00.style.opacity = '0';
	// 	// 	media_link_popup.style.display = 'none';
	// 	// });
		
	// 	// div_01_div_00.addEventListener('click', function(){
	// 	// 	if(event.target.id === 'div-01-div-00'){
	// 	// 		div_01_div_00.style.pointerEvents = 'none';
	// 	// 		div_01_div_00.style.opacity = '0';
	// 	// 		media_link_popup.style.display = 'none';
	// 	// 	}
	// 	// });
	// }

	//orignial code
	function Sec_12_Initialise(section, index){
		
		var div_00_div_00_sec_12_div_00_div_00_div_00 = section.obj.querySelectorAll('.div-00-div-00-sec-12-div-00-div-00-div-00');
		
		div_00_div_00_sec_12_div_00_div_00_div_00[0].select_agents = '';	
		// div_00_div_00_sec_12_div_00_div_00_div_00[0].fb_link = '';
		// div_00_div_00_sec_12_div_00_div_00_div_00[0].email = '';
		// div_00_div_00_sec_12_div_00_div_00_div_00[0].website_link = '';
		// div_00_div_00_sec_12_div_00_div_00_div_00[0].state = 0;
		// div_00_div_00_sec_12_div_00_div_00_div_00[1].fb_link = '';
		// div_00_div_00_sec_12_div_00_div_00_div_00[1].email = '';
		// div_00_div_00_sec_12_div_00_div_00_div_00[1].website_link = '';
		// div_00_div_00_sec_12_div_00_div_00_div_00[1].state = 0;
		
		//div_00_div_00_sec_12_div_00_div_00_div_00[1].visible = false;
		
		section.zIndex_multiplier = -1;
		
		// section.obj.querySelector('.div-01-div-00-sec-12-div-00-div-00-div-00').state = 0;
		
		// section.obj.querySelector('.div-01-div-00-sec-12-div-00-div-00-div-00 button').addEventListener('click', function(){
		// 	section.obj.querySelector('.div-01-div-00-sec-12-div-00-div-00-div-00').style.display = 'none';
		// 	div_00_div_00_sec_12_div_00_div_00_div_00[1].style.display = '';
		// 	div_00_div_00_sec_12_div_00_div_00_div_00[1].visible = true;
		// });
		
		// section.obj.querySelector('.btn-02-div-00-div-00-sec-12-div-00-div-00-div-00').addEventListener('click', function(){
		// 	section.obj.querySelector('.div-01-div-00-sec-12-div-00-div-00-div-00').style.display = '';
		// 	div_00_div_00_sec_12_div_00_div_00_div_00[1].style.display = 'none';
		// 	div_00_div_00_sec_12_div_00_div_00_div_00[1].visible = false;
		// });
		
		// section.obj.querySelector('.div-01-div-00-div-00-sec-12-div-00-div-00-div-00').addEventListener('mouseover', function(){
		// 	var label = this.querySelector('.lbl-01-div-00-div-01-div-00-div-00-sec-12-div-00-div-00-div-00');
		// 	if(spn_01_div_00.state === 3){
		// 		//make number in this section visible and change section colour
		// 		label.style.display = '';
		// 		label.innerHTML = '1';
		// 		//set spn insert var
		// 		spn_01_div_00.addToSection = [index,0];
		// 	}
		// });
		
		// section.obj.querySelector('.div-01-div-00-div-00-sec-12-div-00-div-00-div-00').addEventListener('mouseout', function(){
		// 	this.querySelector('.lbl-01-div-00-div-01-div-00-div-00-sec-12-div-00-div-00-div-00').style.display = 'none';
		// 	this.querySelector('.lbl-01-div-00-div-01-div-00-div-00-sec-12-div-00-div-00-div-00').innerHTML = '';
		// 	spn_01_div_00.addToSection = null;
		// });
		
		//if reset button is clicked
		// section.obj.querySelector('.btn-01-div-00-div-00-sec-12-div-00-div-00-div-00').addEventListener('mouseover', function(){
		// 	section.obj.querySelector('.img-00-div-00-div-00-div-00-sec-12-div-00-div-00-div-00').style.filter = 'brightness(0.85)';
		// });
		// section.obj.querySelector('.btn-01-div-00-div-00-sec-12-div-00-div-00-div-00').addEventListener('mouseout', function(){
		// 	section.obj.querySelector('.img-00-div-00-div-00-div-00-sec-12-div-00-div-00-div-00').style.filter = '';
		// });
		
		// section.obj.querySelector('.btn-01-div-00-div-00-sec-12-div-00-div-00-div-00').addEventListener('click', function(){
		// 	section.obj.querySelector('.div-01-div-00-sec-12-div-00-div-00-div-00').state = 1;
		// 	section.obj.querySelector('.div-01-div-00-div-00-sec-12-div-00-div-00-div-00').style.display = '';
		// 	section.obj.querySelector('.img-00-div-00-div-00-div-00-sec-12-div-00-div-00-div-00').src = DOCUMENT_ROOT + 'images/null.png';
		// 	section.obj.querySelector('.img-00-div-00-div-00-div-00-sec-12-div-00-div-00-div-00').style.filter = '';
		// 	this.style.display = 'none';
		// });
		
		
		
		// section.obj.querySelectorAll('.div-01-div-00-div-00-sec-12-div-00-div-00-div-00')[1].addEventListener('mouseover', function(){
		// 	var label = this.querySelector('.lbl-01-div-00-div-01-div-00-div-00-sec-12-div-00-div-00-div-00');
		// 	if(spn_01_div_00.state === 3){
		// 		//make number in this section visible and change section colour
		// 		label.style.display = '';
		// 		label.innerHTML = '1';
		// 		//set spn insert var
		// 		spn_01_div_00.addToSection = [index,1];
		// 	}
		// });
		
		// section.obj.querySelectorAll('.div-01-div-00-div-00-sec-12-div-00-div-00-div-00')[1].addEventListener('mouseout', function(){
		// 	this.querySelector('.lbl-01-div-00-div-01-div-00-div-00-sec-12-div-00-div-00-div-00').style.display = 'none';
		// 	this.querySelector('.lbl-01-div-00-div-01-div-00-div-00-sec-12-div-00-div-00-div-00').innerHTML = '';
		// 	spn_01_div_00.addToSection = null;
		// });
		
		// //if reset button is clicked
		// section.obj.querySelectorAll('.btn-01-div-00-div-00-sec-12-div-00-div-00-div-00')[1].addEventListener('mouseover', function(){
		// 	section.obj.querySelectorAll('.img-00-div-00-div-00-div-00-sec-12-div-00-div-00-div-00')[1].style.filter = 'brightness(0.85)';
		// });
		// section.obj.querySelectorAll('.btn-01-div-00-div-00-sec-12-div-00-div-00-div-00')[1].addEventListener('mouseout', function(){
		// 	section.obj.querySelectorAll('.img-00-div-00-div-00-div-00-sec-12-div-00-div-00-div-00')[1].style.filter = '';
		// });
		
		// section.obj.querySelectorAll('.btn-01-div-00-div-00-sec-12-div-00-div-00-div-00')[1].addEventListener('click', function(){
		// 	section.obj.querySelectorAll('.div-01-div-00-div-00-sec-12-div-00-div-00-div-00')[1].style.display = '';
		// 	section.obj.querySelectorAll('.img-00-div-00-div-00-div-00-sec-12-div-00-div-00-div-00')[1].src = DOCUMENT_ROOT + 'images/null.png';
		// 	section.obj.querySelectorAll('.img-00-div-00-div-00-div-00-sec-12-div-00-div-00-div-00')[1].style.filter = '';
		// 	this.style.display = 'none';
		// });
		
		//clicking 'select image'
		// section.obj.querySelector('.div-02-div-01-div-00-div-00-sec-12-div-00-div-00-div-00').addEventListener('click', function(){
		// 	document.querySelector('#btn-00-div-00-div-01-asd-01-div-00 input').addToSection = [index, 0];
		// 	document.querySelector('#btn-00-div-00-div-01-asd-01-div-00 input').click();
		// });
		
		// section.obj.querySelectorAll('.div-02-div-01-div-00-div-00-sec-12-div-00-div-00-div-00')[1].addEventListener('click', function(){
		// 	document.querySelector('#btn-00-div-00-div-01-asd-01-div-00 input').addToSection = [index, 1];
		// 	document.querySelector('#btn-00-div-00-div-01-asd-01-div-00 input').click();
		// });
		
		
		//upload buttons
		// var media_btn = section.obj.querySelectorAll('.btn-00-div-00-div-00-sec-12-div-00-div-00-div-00');
		// var media_link_popup = document.querySelector('#div-06-div-01-div-00');
		
		// media_btn[0].addEventListener('click', function(){
		// 	div_00_div_00_sec_12_div_00_div_00_div_00[0].state = 1;
		// 	div_00_div_00_sec_12_div_00_div_00_div_00[1].state = 0;
		// 	media_link_popup.querySelectorAll('input')[0].value = div_00_div_00_sec_12_div_00_div_00_div_00[0].fb_link;
		// 	media_link_popup.querySelectorAll('input')[1].value = div_00_div_00_sec_12_div_00_div_00_div_00[0].email;
		// 	media_link_popup.querySelectorAll('input')[2].value = div_00_div_00_sec_12_div_00_div_00_div_00[0].website_link;
		// 	div_01_div_00.style.pointerEvents = '';
		// 	div_01_div_00.style.opacity = '1';
		// 	media_link_popup.style.display = '';
		// });
		
		// media_btn[1].addEventListener('click', function(){
		// 	div_00_div_00_sec_12_div_00_div_00_div_00[1].state = 1;
		// 	div_00_div_00_sec_12_div_00_div_00_div_00[0].state = 0;
		// 	media_link_popup.querySelectorAll('input')[0].value = div_00_div_00_sec_12_div_00_div_00_div_00[1].fb_link;
		// 	media_link_popup.querySelectorAll('input')[1].value = div_00_div_00_sec_12_div_00_div_00_div_00[1].email;
		// 	media_link_popup.querySelectorAll('input')[2].value = div_00_div_00_sec_12_div_00_div_00_div_00[1].website_link;
		// 	div_01_div_00.style.pointerEvents = '';
		// 	div_01_div_00.style.opacity = '1';
		// 	media_link_popup.style.display = '';
		// });
		
		// media_link_popup.querySelector('svg').addEventListener('click', function(){
		// 	div_01_div_00.style.pointerEvents = 'none';
		// 	div_01_div_00.style.opacity = '0';
		// 	media_link_popup.style.display = 'none';
		// });
		
		// media_link_popup.querySelector('button').addEventListener('click', function(){
		// 	if(div_00_div_00_sec_12_div_00_div_00_div_00[0].state === 1){
		// 		div_00_div_00_sec_12_div_00_div_00_div_00[0].fb_link = media_link_popup.querySelectorAll('input')[0].value;
		// 		div_00_div_00_sec_12_div_00_div_00_div_00[0].email = media_link_popup.querySelectorAll('input')[1].value;
		// 		div_00_div_00_sec_12_div_00_div_00_div_00[0].website_link = media_link_popup.querySelectorAll('input')[2].value;
		// 	}
		// 	if(div_00_div_00_sec_12_div_00_div_00_div_00[1].state === 1){
		// 		div_00_div_00_sec_12_div_00_div_00_div_00[1].fb_link = media_link_popup.querySelectorAll('input')[0].value;
		// 		div_00_div_00_sec_12_div_00_div_00_div_00[1].email = media_link_popup.querySelectorAll('input')[1].value;
		// 		div_00_div_00_sec_12_div_00_div_00_div_00[1].website_link = media_link_popup.querySelectorAll('input')[2].value;
		// 	}
		// 	div_01_div_00.style.pointerEvents = 'none';
		// 	div_01_div_00.style.opacity = '0';
		// 	media_link_popup.style.display = 'none';
		// });
		
		// div_01_div_00.addEventListener('click', function(){
		// 	if(event.target.id === 'div-01-div-00'){
		// 		div_01_div_00.style.pointerEvents = 'none';
		// 		div_01_div_00.style.opacity = '0';
		// 		media_link_popup.style.display = 'none';
		// 	}
		// });
	}
	
	function Zerofill(number, length){
		return new Array(length - number.toString().length + 1).join('0') + number;
	}
	
	function Layers_Aside_Initialise(){
		/* dropdown list of layer types */
		div_00_div_01_div_00_asd_01_div_00 = document.querySelector('#div-00-div-01-div-00-asd-01-div-00');

		div_00_div_00_div_01_div_00_asd_01_div_00 = div_00_div_01_div_00_asd_01_div_00.querySelectorAll('.div-00-div-00-div-01-div-00-asd-01-div-00');
	
		for(var k = 0; k < div_00_div_00_div_01_div_00_asd_01_div_00.length; k++){
			div_00_div_00_div_01_div_00_asd_01_div_00[k].type = k;
			DropdownSelect(k);
		}
		
		div_00_div_01_div_00_asd_01_div_00.active_option = 0;
		div_00_div_01_div_00_asd_01_div_00.dropdown = false;
		
		
		div_00_div_00_asd_01_div_00.t = 0;
		div_00_div_00_asd_01_div_00.scroll_target = 0;
		div_00_div_00_asd_01_div_00.scroll_start = 0;
		
		//initialise scrolling container 
		div_00_div_00_div_00.scroll = false;
		div_00_div_00_div_00.scroll_target = 0;
		div_00_div_00_div_00.scroll_last = 0;
		div_00_div_00_div_00.scroll_t = 0;
		div_00_div_00_div_00.scroll_duration = 0;
		
		//actively moving layer
		div_00_div_00_asd_01_div_00.moving_layer = -1;
		
		
		//new section button
		document.querySelector('#btn-00-div-01-div-00-asd-01-div-00').addEventListener('click', function(){
			if(div_00_div_01_div_00_asd_01_div_00.dropdown === false){
				//set active option
				div_00_div_01_div_00_asd_01_div_00.active_option = div_00_div_01_div_00_asd_01_div_00.querySelector('.div-00-div-00-div-01-div-00-asd-01-div-00').type;

				InstantiateNewSiteSection(div_00_div_01_div_00_asd_01_div_00.active_option);
			}
		});
	}
	
	function InstantiateNewSiteSection(type, is_update = false){
		
		//sort out layers panel
		div_00_div_00_asd_01_div_00.t = 0;
		div_00_div_00_asd_01_div_00.scroll_start = div_00_div_00_asd_01_div_00.scrollTop;
		div_00_div_00_asd_01_div_00.scroll_target = 50 * sections.length;
		
		//hide no-sections messages
		div_00_div_00_asd_01_div_00.querySelector('#lbl-00-div-00-div-00-asd-01-div-00').style.display = 'none';
		div_00_div_00_div_00.querySelector('#div-00-div-00-div-00-div-00').style.display = 'none';

		//make layer
		var layer_template = document.querySelector('.t-div-00-div-00-div-00-asd-01-div-00').cloneNode(true);
		var parent = document.querySelector('#div-00-div-00-asd-01-div-00');
		layer_template.className = 'div-00-div-00-div-00-asd-01-div-00';
		layer_template.querySelector('.h3-00-div-00-div-00-div-00-asd-01-div-00').innerHTML = div_00_div_00_div_01_div_00_asd_01_div_00[type].innerText;
		//append layer to end of container
		parent.appendChild(layer_template);

		//make section
		var section_template = div_00_div_00_div_00.querySelector('.t-sec-' + Zerofill(type, 2) + '-div-00-div-00-div-00').cloneNode(true);
		section_template.className = 'sec-' + Zerofill(type, 2) + '-div-00-div-00-div-00';
		div_00_div_00_div_00.insertBefore(section_template, div_00_div_00_div_00.querySelector('.t-sec-00-div-00-div-00-div-00'));

		//get the lowest element, and get the new elements position
		var new_element_top = -20;
		for(var l = 0; l < sections.length; l++){
			if(sections[l].layer_position === sections.length - 1){
				new_element_top = sections[l].top + sections[l].obj.offsetHeight - 20;
			}
		}


		var new_section = new section(section_template, layer_template, type, new_element_top, sections.length);
		sections.push(new_section);

		//setup layer
		SetLayer(sections[sections.length - 1]);

		//set zIndex multiplier to 0 for default
		sections[sections.length - 1].zIndex_multiplier = 0;

		//scroll to new section
		div_00_div_00_div_00.scroll = true;
		div_00_div_00_div_00.scroll_t = 0;
		div_00_div_00_div_00.scroll_last = scroll_y;
		var limit = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight) - window.innerHeight;
		div_00_div_00_div_00.scroll_target = Math.max(Math.min(sections[sections.length - 1].top + document.querySelector('#a-hea-00').getBoundingClientRect().height + 20 + sections[sections.length - 1].obj.offsetHeight/2 - window.innerHeight/2, limit),0);
		//set the target duration of animation to the distance between the two elements relative to screen height - 1s = 1 screen scroll
		div_00_div_00_div_00.scroll_duration = 1 + Math.abs(div_00_div_00_div_00.scroll_target - div_00_div_00_div_00.scroll_last)/window.innerHeight*0.2;

		/* !!! scroll to new layer on aside */

		InitialiseSection(sections.length-1, is_update);
		
		if(is_update === true){
			return sections[sections.length-1];
		}
	}

	function DragFile(){
		
		if(spn_01_div_00.state === 2){
			spn_01_div_00.files = [];
			
			var valid_drag = false;
			
			for(var k = 0; k < div_01_asd_01_div_00.files.length; k++){
				if(div_01_asd_01_div_00.files[k].data.file_state === 1){
					spn_01_div_00.files.push(div_01_asd_01_div_00.files[k].data);
					if(k === spn_01_div_00.last_clicked){
						valid_drag = true;
					}
				}
			}
			
			if(valid_drag !== true){
				spn_01_div_00.files.length = 0;
			}
		
			if(spn_01_div_00.files.length > 0){
				var dist = Math.sqrt(Math.pow(spn_01_div_00.click_pos.x - mouse_pos.x,2) * Math.pow(spn_01_div_00.click_pos.y - mouse_pos.y,2));
				//check if drag is 5% of screen width or height
				if(dist/window.innerHeight > 0.05 || dist/window.innerWidth > 0.05){
					spn_01_div_00.style.display = '';
					document.body.style.cursor = 'grab';
					spn_01_div_00.style.left = mouse_pos.x + 'px';
					spn_01_div_00.style.top = mouse_pos.y + 'px';

					//set initial window, so unless changing windows, file doesnt get unselected
					spn_01_div_00.initial_window = div_01_asd_01_div_00.active_folder_id;
					
					//if moving just one file
					if(spn_01_div_00.files.length === 1){
						//set object
						spn_01_div_00.style.left = mouse_pos.x + 'px';
						spn_01_div_00.style.top = mouse_pos.y + 'px';
						spn_01_div_00.style.display = '';
						spn_01_div_00.style.height = '';

						//set name
						spn_01_div_00.querySelector('h3').style.display = '';
						spn_01_div_00.querySelector('h3').innerHTML = spn_01_div_00.files[0].file_name;
						//set icon to be file if src not present, or image with correct src
						spn_01_div_00.querySelector('#lbl-00-spn-01-div-00').style.display = 'none';
						if(spn_01_div_00.querySelector('#div-03-spn-01-div-00')){
							spn_01_div_00.querySelector('#div-03-spn-01-div-00').id = 'div-00-spn-01-div-00';
						}
						if(spn_01_div_00.querySelector('#svg-03-spn-01-div-00')){
							spn_01_div_00.querySelector('#svg-03-spn-01-div-00').id = 'svg-00-spn-01-div-00';
						}
						spn_01_div_00.querySelector('#div-00-spn-01-div-00').style.display = 'none';
						spn_01_div_00.querySelector('#div-01-spn-01-div-00').style.display = 'none';
						spn_01_div_00.querySelector('#div-02-spn-01-div-00').style.display = 'none';
						spn_01_div_00.querySelector('#svg-00-spn-01-div-00').style.display = 'none';
						spn_01_div_00.querySelector('#svg-01-spn-01-div-00').style.display = 'none';
						spn_01_div_00.querySelector('#svg-02-spn-01-div-00').style.display = 'none';

						const validImageTypes = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png'];
						if(validImageTypes.includes(spn_01_div_00.files[0].file_type)){
							spn_01_div_00.querySelector('#div-00-spn-01-div-00').style.display = '';
							spn_01_div_00.querySelector('div').innerHTML = "<img class='img-00-div-00-spn-01-div-00' src='" + spn_01_div_00.files[0].file_preview_src + "'>";
						} else if(spn_01_div_00.files[0].file_type === 'folder'){
							spn_01_div_00.querySelector('#svg-00-spn-01-div-00').style.display = '';
						} else {
							spn_01_div_00.querySelector('#div-00-spn-01-div-00').style.display = '';
							spn_01_div_00.querySelector('#div-00-spn-01-div-00').innerHTML = TruncatedExtension(spn_01_div_00.files[0].file_type, 8);
						}
					} else if(spn_01_div_00.files.length > 1){
						//set name
						spn_01_div_00.querySelector('h3').style.display = 'none';
						//set icons to be file if src not present, or image with correct src
						spn_01_div_00.querySelector('#lbl-00-spn-01-div-00').style.display = '';
						spn_01_div_00.querySelector('#lbl-00-spn-01-div-00').innerHTML = spn_01_div_00.files.length;
						if(spn_01_div_00.querySelector('#div-00-spn-01-div-00')){
							spn_01_div_00.querySelector('#div-00-spn-01-div-00').id = 'div-03-spn-01-div-00';
						}
						if(spn_01_div_00.querySelector('#svg-00-spn-01-div-00')){
							spn_01_div_00.querySelector('#svg-00-spn-01-div-00').id = 'svg-03-spn-01-div-00';
						}
						spn_01_div_00.querySelector('#div-03-spn-01-div-00').style.display = 'none';
						spn_01_div_00.querySelector('#div-01-spn-01-div-00').style.display = 'none';
						spn_01_div_00.querySelector('#div-02-spn-01-div-00').style.display = 'none';
						spn_01_div_00.querySelector('#svg-01-spn-01-div-00').style.display = 'none';
						spn_01_div_00.querySelector('#svg-02-spn-01-div-00').style.display = 'none';
						spn_01_div_00.querySelector('#svg-03-spn-01-div-00').style.display = 'none';

						for(var i = 1; i <= 3; i++){
							if(spn_01_div_00.files.length - i >= 0){
								var svg = spn_01_div_00.querySelector('#svg-0' + i + '-spn-01-div-00');
								var div = spn_01_div_00.querySelector('#div-0' + i + '-spn-01-div-00');
								const validImageTypes = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png'];
								if(validImageTypes.includes(spn_01_div_00.files[spn_01_div_00.files.length - i].file_type)){
									div.style.display = '';
									div.innerHTML = "<img class='img-00-div-00-spn-01-div-00' src='" + spn_01_div_00.files[spn_01_div_00.files.length - i].file_preview_src + "'>";
									if(i === 1){
										spn_01_div_00.style.height = div.clientHeight + 'px';
									}
								} else if(spn_01_div_00.files[spn_01_div_00.files.length - i].file_type === 'folder'){
									svg.style.display = '';
									spn_01_div_00.style.height = svg.clientHeight + 'px';
								} else {
									div.style.display = '';
									spn_01_div_00.style.height = div.clientHeight + 'px';
									div.innerHTML = TruncatedExtension(spn_01_div_00.files[spn_01_div_00.files.length - i].file_type, 8);
								}
							}
						}
					}

					spn_01_div_00.state = 3;
				}
			}
		} else if(spn_01_div_00.state === 3){
			document.body.style.cursor = 'grab';
			spn_01_div_00.style.left = mouse_pos.x + 'px';
			spn_01_div_00.style.top = mouse_pos.y + 'px';
		}
	}
	
	function ExpandFolderFiles(curr_file_id, all_files, output){
		for(var i = 0; i < all_files.length; i++){
			if(all_files[i].parent_id === curr_file_id){
				if(all_files[i].file_type === 'folder'){
					ExpandFolderFiles(all_files[i].file_id, all_files, output);
				} else {
					//add to output if not a folder
					output.length++;
					output[output.length - 1] = all_files[i];
				}
			}
		}
	}
	
	function SetSectionImage(addToSection, files, root = ''){
				
		if(addToSection !== null){
			var index = null, image_index = null;
			if(Array.isArray(addToSection) === true){
				index = addToSection[0];
				image_index = addToSection[1];
			} else {
				index = addToSection;
			}
			
			//iterate through, expanding for folders
			for(var z = 0; z < files.length; z++){
				if(files[z].file_type === 'folder'){
					//remove from output array
					var folder_id = files[z].file_id;
					for(var y = z; y < files.length - 1; y++){
						files[y] = '';
						files[y] = files[y + 1];
					}
					files.length--;
					ExpandFolderFiles(folder_id, div_01_asd_01_div_00.file_data, files);
				}
			}
			
			if(sections[index].type === 0){
				//add to section
				sections[index].obj.querySelector('.img-00-div-00-sec-00-div-00-div-00-div-00').src = files[files.length - 1].file_src;
				sections[index].obj.querySelector('.div-00-div-00-sec-00-div-00-div-00-div-00').style.display = 'none';
				//reset section
				sections[index].obj.querySelector('.lbl-01-div-00-div-00-div-00-sec-00-div-00-div-00-div-00').style.display = 'none';
				sections[index].obj.querySelector('.lbl-01-div-00-div-00-div-00-sec-00-div-00-div-00-div-00').innerHTML = '';
				sections[index].obj.querySelector('.btn-00-div-00-sec-00-div-00-div-00-div-00').style.display = '';
				sections[index].obj.style.backgroundColor = '';
				addToSection = null;
			}
			
			if(sections[index].type === 3){
				//add to section
				sections[index].obj.querySelector('.img-00-div-00-sec-03-div-00-div-00-div-00').src = files[files.length - 1].file_src;
				sections[index].obj.querySelector('.div-00-div-00-sec-03-div-00-div-00-div-00').style.display = 'none';
				//reset section
				sections[index].obj.querySelector('.lbl-01-div-00-div-00-div-00-sec-03-div-00-div-00-div-00').style.display = 'none';
				sections[index].obj.querySelector('.lbl-01-div-00-div-00-div-00-sec-03-div-00-div-00-div-00').innerHTML = '';
				sections[index].obj.querySelector('.btn-00-div-00-sec-03-div-00-div-00-div-00').style.display = '';
				sections[index].obj.style.backgroundColor = '';
				addToSection = null;
			}
			
			if(sections[index].type === 4){
				
				var gallery = sections[index].obj.querySelectorAll('.div-00-div-01-sec-04-div-00-div-00-div-00')[sections[index].obj.active_tab];
				
				for(var i = 0; i < files.length; i++){
					
					//add to section
					//this will only work if reordering tabs is not built
					if(image_index === gallery.images.length - 1 || i > 0){//if the index of the image to add is the last one in the gallery
						//reset section
						gallery.images[gallery.images.length - 1].querySelector('.lbl-01-div-00-div-00-div-00-div-01-div-00-div-01-sec-04-div-00-div-00-div-00').style.display = 'none';
						gallery.images[gallery.images.length - 1].querySelector('.lbl-01-div-00-div-00-div-00-div-01-div-00-div-01-sec-04-div-00-div-00-div-00').innerHTML = '';
						gallery.images[gallery.images.length - 1].querySelector('.btn-00-div-00-div-01-div-00-div-01-sec-04-div-00-div-00-div-00').style.display = '';
						gallery.images[gallery.images.length - 1].style.backgroundColor = '';
						InsertImage_Sec_04(gallery, files[i].file_src, files[i].file_name);
						AddImage_Sec_04(gallery, index);

						//set active image
						gallery.active_image = gallery.images.length - 1;
					} else {
						//set the image
						gallery.images[image_index].querySelector('.img-00-div-00-div-01-div-00-div-01-sec-04-div-00-div-00-div-00').src = files[i].file_src;
						if(gallery.descriptions[image_index].querySelector('h2').innerHTML === ''){
							gallery.descriptions[image_index].querySelector('h2').innerHTML = files[i].file_name;
						}
						gallery.images[image_index].image_state = 1;
						gallery.images[image_index].querySelector('.div-00-div-00-div-01-div-00-div-01-sec-04-div-00-div-00-div-00').style.display = 'none';
						//reset section
						gallery.images[image_index].querySelector('.lbl-01-div-00-div-00-div-00-div-01-div-00-div-01-sec-04-div-00-div-00-div-00').style.display = 'none';
						gallery.images[image_index].querySelector('.lbl-01-div-00-div-00-div-00-div-01-div-00-div-01-sec-04-div-00-div-00-div-00').innerHTML = '';
						gallery.images[image_index].querySelector('.btn-00-div-00-div-01-div-00-div-01-sec-04-div-00-div-00-div-00').style.display = '';
						gallery.images[image_index].style.backgroundColor = '';
					}
				}
				addToSection = null;
			}
			
			if(sections[index].type === 7){
				var container = sections[index].obj.querySelector('.div-00-sec-07-div-00-div-00-div-00');
				
				for(var j = 0; j < files.length; j++){
					//add to section
					//this will only work if reordering tabs is not built
					if(image_index === container.floorplans.length - 1 || j > 0){//if the index of the image to add is the last one in the gallery or if not the first image
						//reset section
						container.floorplans[container.floorplans.length - 1].querySelector('.lbl-01-div-00-div-00-div-00-div-01-div-00-sec-07-div-00-div-00-div-00').style.display = 'none';
						container.floorplans[container.floorplans.length - 1].querySelector('.lbl-01-div-00-div-00-div-00-div-01-div-00-sec-07-div-00-div-00-div-00').innerHTML = '';
						container.floorplans[container.floorplans.length - 1].querySelector('.btn-00-div-00-div-01-div-00-sec-07-div-00-div-00-div-00').style.display = '';
						container.floorplans[container.floorplans.length - 1].style.backgroundColor = '';
						InsertFloorplan_Sec_07(sections[index], container, files[j].file_src, files[j].file_name);
						AddFloorplan_Sec_07(container, index);
						//set active image
						container.active_floorplan = container.floorplans.length - 1;
					} else {
						//set the image
						container.floorplans[image_index].querySelector('.img-00-div-00-div-01-div-00-sec-07-div-00-div-00-div-00').src = files[j].file_src;
						if(container.descriptions[image_index].querySelector('h2').innerHTML === ''){
							container.descriptions[image_index].querySelector('h2').innerHTML = files[j].file_name;
						}
						container.floorplans[image_index].image_state = 1;
						container.floorplans[image_index].querySelector('.div-00-div-00-div-01-div-00-sec-07-div-00-div-00-div-00').style.display = 'none';
						//reset section
						container.floorplans[image_index].querySelector('.lbl-01-div-00-div-00-div-00-div-01-div-00-sec-07-div-00-div-00-div-00').style.display = 'none';
						container.floorplans[image_index].querySelector('.lbl-01-div-00-div-00-div-00-div-01-div-00-sec-07-div-00-div-00-div-00').innerHTML = '';
						container.floorplans[image_index].querySelector('.btn-00-div-00-div-01-div-00-sec-07-div-00-div-00-div-00').style.display = '';
						container.floorplans[image_index].style.backgroundColor = '';
					}
				}
				addToSection = null;
			}
			
			if(sections[index].type === 11){
				var resources = sections[index].obj.querySelector('.div-00-sec-11-div-00-div-00-div-00');
				
				for(var k = 0; k < files.length; k++){
					//add to section
					//this will only work if reordering tabs is not built
					if(image_index === resources.files.length - 1 || k > 0){//if the index of the image to add is the last one in the gallery or if not the first image
						//reset section
						resources.files[resources.files.length - 1].querySelector('.lbl-01-div-00-div-00-div-00-div-01-div-00-sec-11-div-00-div-00-div-00').style.display = 'none';
						resources.files[resources.files.length - 1].querySelector('.lbl-01-div-00-div-00-div-00-div-01-div-00-sec-11-div-00-div-00-div-00').innerHTML = '';
						resources.files[resources.files.length - 1].querySelector('.btn-00-div-00-div-01-div-00-sec-11-div-00-div-00-div-00').style.display = '';
						resources.files[resources.files.length - 1].style.backgroundColor = '';
						InsertFile_Sec_11(resources, files[k].file_src);
						AddFile_Sec_11(resources, index);
						//set active image
						resources.active_file = resources.files.length - 1;
					} else {
						//set the image
						resources.files[image_index].querySelector('.div-00-div-01-div-00-sec-11-div-00-div-00-div-00 object').data = files[k].file_src;
						resources.files[image_index].image_state = 1;
						resources.files[image_index].querySelector('.div-00-div-00-div-01-div-00-sec-11-div-00-div-00-div-00').style.display = 'none';
						//reset section
						resources.files[image_index].querySelector('.lbl-01-div-00-div-00-div-00-div-01-div-00-sec-11-div-00-div-00-div-00').style.display = 'none';
						resources.files[image_index].querySelector('.lbl-01-div-00-div-00-div-00-div-01-div-00-sec-11-div-00-div-00-div-00').innerHTML = '';
						resources.files[image_index].querySelector('.btn-00-div-00-div-01-div-00-sec-11-div-00-div-00-div-00').style.display = '';
						resources.files[image_index].style.backgroundColor = '';
					}
				}
				addToSection = null;
			}
			
			// if(sections[index].type === 12){
			// 	//add to section
			// 	sections[index].obj.querySelectorAll('.img-00-div-00-div-00-div-00-sec-12-div-00-div-00-div-00')[image_index].src = files[0].file_src;
			// 	//reset section
			// 	sections[index].obj.querySelectorAll('.div-01-div-00-div-00-sec-12-div-00-div-00-div-00')[image_index].style.display = 'none';
			// 	sections[index].obj.querySelectorAll('.btn-01-div-00-div-00-sec-12-div-00-div-00-div-00')[image_index].style.display = '';
			// 	addToSection = null;
			// }
		}
	}
	
	function UploadSite(){
		var upload_data = [];
		//iterate through sections and upload all necessary info
		var upload_sections = [];
		upload_sections.length = sections.length;
		for(var g = 0; g < sections.length; g++){
			for(var h = 0; h < sections.length; h++){
				if(sections[h].layer_position === g){
					upload_sections[g] = sections[h];
					h = sections.length;
				}
			}
		}
		for(var i = 0; i < upload_sections.length; i++){
			upload_data.length++;
			upload_data[i] = {};
			upload_data[i].type = upload_sections[i].type;
			
			if(upload_sections[i].type === 0){
				upload_data[i].image_src = upload_sections[i].obj.querySelector('img').src;
			} else if(sections[i].type === 1){
				upload_data[i].address = upload_sections[i].obj.querySelector('.h1-00-div-00-sec-01-div-00-div-00-div-00').innerHTML;
				upload_data[i].city = upload_sections[i].obj.querySelector('.h2-00-div-00-sec-01-div-00-div-00-div-00').innerHTML;
				upload_data[i].price = upload_sections[i].obj.querySelector('.h2-01-div-00-sec-01-div-00-div-00-div-00').innerHTML;
				upload_data[i].description = upload_sections[i].obj.querySelector('.h3-00-div-00-sec-01-div-00-div-00-div-00').innerHTML;
			} else if(sections[i].type === 2){
				upload_data[i].icon_vals = [];
				upload_data[i].icon_vals.length = upload_sections[i].obj.div_00_div_01_sec_02_div_00_div_00_div_00.length;
				for(var j = 0; j < upload_data[i].icon_vals.length; j++){
					if(upload_sections[i].obj.div_00_div_01_sec_02_div_00_div_00_div_00[j].state === 1){
						//icon is visible
						upload_data[i].icon_vals[j] = upload_sections[i].obj.div_00_div_01_sec_02_div_00_div_00_div_00[j].querySelector('.lbl-00-div-00-div-00-div-01-sec-02-div-00-div-00-div-00').innerHTML;
					} else {
						upload_data[i].icon_vals[j] = -1;
					}
				}
			} else if(upload_sections[i].type === 3){
				upload_data[i].image_src = upload_sections[i].obj.querySelector('img').src;
			} else if(upload_sections[i].type === 4){
				//add tabs
				upload_data[i].tabs = [];
				var tabs_04 = upload_sections[i].obj.querySelectorAll('.div-00-div-00-sec-04-div-00-div-00-div-00, .div-01-div-00-sec-04-div-00-div-00-div-00, .div-02-div-00-sec-04-div-00-div-00-div-00');
				upload_data[i].tabs.length = tabs_04.length;
				for(var k = 0; k < upload_data[i].tabs.length; k++){
					upload_data[i].tabs[k] = {};
					upload_data[i].tabs[k].tab_name = tabs_04[k].querySelector('label').innerHTML;
					//add images on each tab
					upload_data[i].tabs[k].images = [];
					var gallery = upload_sections[i].obj.querySelectorAll('.div-00-div-01-sec-04-div-00-div-00-div-00')[k];
					var images_04 = gallery.images;
					var descriptions_04 = gallery.descriptions;
					upload_data[i].tabs[k].images.length = images_04.length - 1;
					for(var l = 0; l < images_04.length - 1; l++){
						for(var y = 0; y < images_04.length - 1; y++){
							if(images_04[y].position === l){
								upload_data[i].tabs[k].images[l] = {};
								upload_data[i].tabs[k].images[l].image_src = images_04[y].querySelector('img').src;
								upload_data[i].tabs[k].images[l].title = descriptions_04[y].querySelector('h2').innerHTML;
								if(descriptions_04[y].state === 1){
									upload_data[i].tabs[k].images[l].description = descriptions_04[y].querySelector('p').innerHTML;
								} else {
									upload_data[i].tabs[k].images[l].description = '';
								}
							}
						}
					}
				}
			} else if(upload_sections[i].type === 5){
				upload_data[i].video_embed = upload_sections[i].obj.video_embed;
			} else if(upload_sections[i].type === 6){
				//add tabs
				upload_data[i].tabs = [];
				var tabs_06 = upload_sections[i].obj.querySelectorAll('.div-00-div-00-sec-06-div-00-div-00-div-00, .div-01-div-00-sec-06-div-00-div-00-div-00, .div-02-div-00-sec-06-div-00-div-00-div-00');
				upload_data[i].tabs.length = tabs_06.length;
				for(var m = 0; m < upload_data[i].tabs.length; m++){
					upload_data[i].tabs[m] = {};
					upload_data[i].tabs[m].tab_name = tabs_06[m].querySelector('label').innerHTML;
					//add matterports on each tab
					upload_data[i].tabs[m].embed_code = upload_sections[i].obj.querySelectorAll('.div-00-div-01-sec-06-div-00-div-00-div-00')[m].matterport_embed;
				}
			} else if(upload_sections[i].type === 7){
				var floorplans = upload_sections[i].obj.querySelector('.div-00-sec-07-div-00-div-00-div-00').floorplans;
				var descriptions_07 = upload_sections[i].obj.querySelector('.div-00-sec-07-div-00-div-00-div-00').descriptions;
				upload_data[i].images = [];
				upload_data[i].images.length = floorplans.length - 1;
				for(var n = 0; n < floorplans.length - 1; n++){
					for(var z = 0; z < floorplans.length - 1; z++){
						if(floorplans[z].position === n){
							upload_data[i].images[n] = {};
							upload_data[i].images[n].image_src = floorplans[z].querySelector('img').src;
							upload_data[i].images[n].title = descriptions_07[z].querySelector('h2').innerHTML;
						}
					}
				}
			} else if(upload_sections[i].type === 8){
				//add tabs
				upload_data[i].tabs = [];
				var tabs_08 = upload_sections[i].obj.querySelectorAll('.div-00-div-00-sec-08-div-00-div-00-div-00, .div-01-div-00-sec-08-div-00-div-00-div-00, .div-02-div-00-sec-08-div-00-div-00-div-00');
				upload_data[i].tabs.length = tabs_08.length;
				for(var o = 0; o < upload_data[i].tabs.length; o++){
					upload_data[i].tabs[o] = {};
					upload_data[i].tabs[o].tab_name = tabs_08[o].querySelector('label').innerHTML;
					//add map and walkscore on each tab
					upload_data[i].tabs[o].address = upload_sections[i].obj.querySelectorAll('.div-00-div-01-sec-08-div-00-div-00-div-00')[o].address;
					upload_data[i].tabs[o].lat = upload_sections[i].obj.querySelectorAll('.div-00-div-01-sec-08-div-00-div-00-div-00')[o].lat;
					upload_data[i].tabs[o].lng = upload_sections[i].obj.querySelectorAll('.div-00-div-01-sec-08-div-00-div-00-div-00')[o].lng;
					upload_data[i].tabs[o].zoom = upload_sections[i].obj.querySelectorAll('.div-00-div-01-sec-08-div-00-div-00-div-00')[o].zoom;
					upload_data[i].tabs[o].pin_label = upload_sections[i].obj.querySelectorAll('.div-00-div-01-sec-08-div-00-div-00-div-00')[o].pin_label;
					upload_data[i].tabs[o].walkscore_embed_code = upload_sections[i].obj.querySelectorAll('.div-00-div-01-sec-08-div-00-div-00-div-00')[o].walkscore_embed_code;
				}
			} else if(upload_sections[i].type === 9){
				upload_data[i].emails = [];
				var emails_09 = upload_sections[i].obj.querySelectorAll('.div-00-div-00-sec-09-div-00-div-00-div-00');
				upload_data[i].emails.length = emails_09.length;
				for(var p = 0; p < emails_09.length; p++){
					upload_data[i].emails[p] = emails_09[p].querySelector('.ipt-00-div-00-div-00-sec-09-div-00-div-00-div-00').value;
				}
			} else if(upload_sections[i].type === 11){
				var files = upload_sections[i].obj.querySelector('.div-00-sec-11-div-00-div-00-div-00').files;
				var descriptions_11 = upload_sections[i].obj.querySelector('.div-00-sec-11-div-00-div-00-div-00').descriptions;
				upload_data[i].resources = [];
				upload_data[i].resources.length = files.length - 1;
				for(var q = 0; q < files.length - 1; q++){
					for(var r = 0; r < files.length - 1; r++){
						if(files[r].position === q){
							upload_data[i].resources[q] = {};
							if(files[q].querySelector('object').data === DOCUMENT_ROOT + 'admin/sites/site-editor/' + SITE_PARAMETER){
								upload_data[i].resources[q].src = '';
							} else {
								upload_data[i].resources[q].src = files[q].querySelector('object').data;
							}
							upload_data[i].resources[q].title = descriptions_11[q].querySelector('h2').innerHTML;
							
							if(descriptions_11[q].state === 1){
								upload_data[i].resources[q].description = descriptions_11[q].querySelector('p').innerHTML;
							} else {
								upload_data[i].resources[q].description = '';
							}
						}
					}
				}
			} else if(upload_sections[i].type === 12){
				upload_data[i].agent = [];
				upload_data[i].agent.length = 1;
				upload_data[i].agent[0] = {};
				var el = document.getElementsByTagName('select')[0];
				upload_data[i].agent[0].selected_agents = getSelectValues(el);
				//upload_data[i].agent = [];
				//upload_data[i].agent.length = 1;
				//upload_data[i].agent[0] = {};
				// upload_data[i].agent[0].name = upload_sections[i].obj.querySelector('.h3-00-div-00-div-00-sec-12-div-00-div-00-div-00').innerHTML;
				// upload_data[i].agent[0].occupation = upload_sections[i].obj.querySelector('.h4-00-div-00-div-00-sec-12-div-00-div-00-div-00').innerHTML;
				// upload_data[i].agent[0].description = upload_sections[i].obj.querySelector('.p-00-div-00-div-00-sec-12-div-00-div-00-div-00').innerHTML;
				// upload_data[i].agent[0].mobile_number = upload_sections[i].obj.querySelector('.ipt-00-div-00-div-00-sec-12-div-00-div-00-div-00').value;
				// upload_data[i].agent[0].office_number = upload_sections[i].obj.querySelector('.ipt-01-div-00-div-00-sec-12-div-00-div-00-div-00').value;
				// upload_data[i].agent[0].facebook_link = upload_sections[i].obj.querySelectorAll('.div-00-div-00-sec-12-div-00-div-00-div-00')[0].fb_link;
				// upload_data[i].agent[0].email_link = upload_sections[i].obj.querySelectorAll('.div-00-div-00-sec-12-div-00-div-00-div-00')[0].email;
				// upload_data[i].agent[0].website_link = upload_sections[i].obj.querySelectorAll('.div-00-div-00-sec-12-div-00-div-00-div-00')[0].website_link;
				// upload_data[i].agent[0].image_src = upload_sections[i].obj.querySelector('.img-00-div-00-div-00-div-00-sec-12-div-00-div-00-div-00').src;
			//	if(upload_sections[i].obj.querySelectorAll('.div-00-div-00-sec-12-div-00-div-00-div-00')[1].visible === true){
					// 	upload_data[i].agent.length = 2;
				// 	upload_data[i].agent[1] = {};
				// 	upload_data[i].agent[1].name = upload_sections[i].obj.querySelectorAll('.h3-00-div-00-div-00-sec-12-div-00-div-00-div-00')[1].innerHTML;
				// 	upload_data[i].agent[1].occupation = upload_sections[i].obj.querySelectorAll('.h4-00-div-00-div-00-sec-12-div-00-div-00-div-00')[1].innerHTML;
				// 	upload_data[i].agent[1].description = upload_sections[i].obj.querySelectorAll('.p-00-div-00-div-00-sec-12-div-00-div-00-div-00')[1].innerHTML;
				// 	upload_data[i].agent[1].mobile_number = upload_sections[i].obj.querySelectorAll('.ipt-00-div-00-div-00-sec-12-div-00-div-00-div-00')[1].value;
				// 	upload_data[i].agent[1].office_number = upload_sections[i].obj.querySelectorAll('.ipt-01-div-00-div-00-sec-12-div-00-div-00-div-00')[1].value;
				// 	upload_data[i].agent[1].facebook_link = upload_sections[i].obj.querySelectorAll('.div-00-div-00-sec-12-div-00-div-00-div-00')[1].fb_link;
				// 	upload_data[i].agent[1].email_link = upload_sections[i].obj.querySelectorAll('.div-00-div-00-sec-12-div-00-div-00-div-00')[1].email;
				// 	upload_data[i].agent[1].website_link = upload_sections[i].obj.querySelectorAll('.div-00-div-00-sec-12-div-00-div-00-div-00')[1].website_link;
				// 	upload_data[i].agent[1].image_src = upload_sections[i].obj.querySelectorAll('.img-00-div-00-div-00-div-00-sec-12-div-00-div-00-div-00')[1].src;
			//	}
			}
		}
						
		//send file
		var xhr = new XMLHttpRequest();
		var url = DOCUMENT_ROOT + 'processes/upload-site-sections.php';
		
		//uploading site animation
		var h3_00_div_01_div_01_div_00 = document.querySelector('#h3-00-div-01-div-01-div-00');
		var iteration = -1;
		
		h3_00_div_01_div_01_div_00.style.textAlign = '';
		h3_00_div_01_div_01_div_00.innerHTML = 'Uploading Site';
		var btn_00_div_01_div_01_div_00 = document.querySelector('#btn-00-div-01-div-01-div-00');
		btn_00_div_01_div_01_div_00.style.color = '';
		btn_00_div_01_div_01_div_00.style.backgroundColor = '';
		btn_00_div_01_div_01_div_00.style.pointerEvents = 'none';
		
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 2){
				
				//make view site button functional
				btn_00_div_01_div_01_div_00.style.color = 'rgb(240,240,240)';
				btn_00_div_01_div_01_div_00.style.backgroundColor = 'rgb(90,0,255)';
				btn_00_div_01_div_01_div_00.style.pointerEvents = '';
				
				btn_00_div_01_div_01_div_00.addEventListener('click', function(){
					window.open(DOCUMENT_ROOT + 'property/' + SITE_PARAMETER);
				});
				
				clearTimeout(h3_00_div_01_div_01_div_00.animation);
				h3_00_div_01_div_01_div_00.innerHTML = 'Finished Uploading Site';
				h3_00_div_01_div_01_div_00.style.textAlign = 'center';
				
				last_save_ts = time.now;
			}
		};
		
		document.querySelector('#div-00-div-01-div-01-div-00').style.width = 0;
		document.querySelector('#div-00-div-01-div-01-div-00').style.transform = 'translate(0, 0)';
		document.querySelector('#div-00-div-01-div-01-div-00').style.transition = '0s';
		
		xhr.upload.onprogress = function(e){
			UploadProgressSite(e);
		};
		
		h3_00_div_01_div_01_div_00.innerHTML = 'Uploading Site...';
		
		xhr.open('POST', url, true);
		xhr.setRequestHeader('site-id', SITE_ID);
		xhr.send(JSON.stringify(upload_data));
		
		//close button
		document.querySelector('#btn-01-div-01-div-01-div-00').addEventListener('click', function(){
			div_01_div_00.style.pointerEvents = 'none';
			div_01_div_00.style.opacity = '0';
		});
	}
	
	function UploadProgressSite(e){
		if(e.lengthComputable){
			var uploaded = e.loaded;
			var total = e.total;
			var progress = uploaded/total;
			document.querySelector('#div-00-div-01-div-01-div-00').style.width = progress * 100 + '%';
			document.querySelector('#div-00-div-01-div-01-div-00').style.transition = '';
			
			if(progress === 1){
				window.setTimeout(function(){document.querySelector('#div-00-div-01-div-01-div-00').style.transform = 'translate(0, -5px)';}, 500);
			}
		}
	}
	
	function XHRSections(){
		var xhr = new XMLHttpRequest();
		var url = DOCUMENT_ROOT + 'processes/get-site-sections.php';
		
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				var arr = JSON.parse(xhr.responseText);
				//build sections
				for(var i = 0; i < arr.length; i++){
					InstantiateSiteSection(arr[i]);
				}
			}
		};
		
		
		xhr.open('POST', url, true);
		xhr.setRequestHeader('site-id', SITE_ID);
		xhr.send();
	}
	
	function InsertInto_Sec_00(section, data){
		
		var new_files = [];
		new_files[0] = {};
		new_files[0].file_src = data.image_src;

		SetSectionImage(section.layer_position, new_files);
		
		if(data.image_src === DOCUMENT_ROOT + 'images/null.png'){
			section.obj.querySelector('.div-00-div-00-sec-00-div-00-div-00-div-00').style.display = '';
			section.obj.querySelector('.btn-00-div-00-sec-00-div-00-div-00-div-00').style.display = 'none';
		}
	}
	
	function InsertInto_Sec_01(section, data){
		section.obj.querySelector('.h1-00-div-00-sec-01-div-00-div-00-div-00').innerHTML = data.address;
		section.obj.querySelector('.h2-00-div-00-sec-01-div-00-div-00-div-00').innerHTML = data.city;
		section.obj.querySelector('.h2-01-div-00-sec-01-div-00-div-00-div-00').innerHTML = data.price;
		section.obj.querySelector('.h3-00-div-00-sec-01-div-00-div-00-div-00').innerHTML = data.description;
	}
	
	function InsertInto_Sec_02(section, data){
		
				
		if(data.bedrooms !== '-1'){
			section.obj.querySelectorAll('.lbl-00-div-00-div-00-div-01-sec-02-div-00-div-00-div-00')[0].innerHTML = data.bedrooms;
		} else {
			simulateClick(section.obj.div_00_div_01_sec_02_div_00_div_00_div_00[0].querySelector('svg'));
		}
		
		if(data.fireplaces !== '-1'){
			section.obj.querySelectorAll('.lbl-00-div-00-div-00-div-01-sec-02-div-00-div-00-div-00')[1].innerHTML = data.fireplaces;
		} else {
			simulateClick(section.obj.div_00_div_01_sec_02_div_00_div_00_div_00[1].querySelector('svg'));
		}
		
		if(data.bathrooms !== '-1'){
			section.obj.querySelectorAll('.lbl-00-div-00-div-00-div-01-sec-02-div-00-div-00-div-00')[2].innerHTML = data.bathrooms;
		} else {
			simulateClick(section.obj.div_00_div_01_sec_02_div_00_div_00_div_00[2].querySelector('svg'));
		}
		
		if(data.year_built !== '-1'){
			section.obj.querySelectorAll('.lbl-00-div-00-div-00-div-01-sec-02-div-00-div-00-div-00')[3].innerHTML = data.year_built;
		} else {
			simulateClick(section.obj.div_00_div_01_sec_02_div_00_div_00_div_00[3].querySelector('svg'));
		}
		
		if(data.tax !== '-1'){
			section.obj.querySelectorAll('.lbl-00-div-00-div-00-div-01-sec-02-div-00-div-00-div-00')[4].innerHTML = data.tax;
		} else {
			simulateClick(section.obj.div_00_div_01_sec_02_div_00_div_00_div_00[4].querySelector('svg'));
		}
		
		if(data.assn_fees !== '-1'){
			section.obj.querySelectorAll('.lbl-00-div-00-div-00-div-01-sec-02-div-00-div-00-div-00')[5].innerHTML = data.assn_fees;
		} else {
			simulateClick(section.obj.div_00_div_01_sec_02_div_00_div_00_div_00[5].querySelector('svg'));
		}
		
		if(data.house_size !== '-1'){
			section.obj.querySelectorAll('.lbl-00-div-00-div-00-div-01-sec-02-div-00-div-00-div-00')[6].innerHTML = data.house_size;
		} else {
			simulateClick(section.obj.div_00_div_01_sec_02_div_00_div_00_div_00[6].querySelector('svg'));
		}
		
		if(data.lot_size !== '-1'){
			section.obj.querySelectorAll('.lbl-00-div-00-div-00-div-01-sec-02-div-00-div-00-div-00')[7].innerHTML = data.lot_size;
		} else {
			simulateClick(section.obj.div_00_div_01_sec_02_div_00_div_00_div_00[7].querySelector('svg'));
		}
		
		if(data.parking_spaces !== '-1'){
			section.obj.querySelectorAll('.lbl-00-div-00-div-00-div-01-sec-02-div-00-div-00-div-00')[8].innerHTML = data.parking_spaces;
		} else {
			simulateClick(section.obj.div_00_div_01_sec_02_div_00_div_00_div_00[8].querySelector('svg'));
		}
		
		if(data.levels !== '-1'){
			section.obj.querySelectorAll('.lbl-00-div-00-div-00-div-01-sec-02-div-00-div-00-div-00')[9].innerHTML = data.levels;
		} else {
			simulateClick(section.obj.div_00_div_01_sec_02_div_00_div_00_div_00[9].querySelector('svg'));
		}
	}
	
	function simulateClick(elem) {
		// Create our event (with options)
		var evt = new MouseEvent('click', {
			bubbles: true,
			cancelable: true,
			view: window
		});
		// If cancelled, don't dispatch our event
		var canceled = !elem.dispatchEvent(evt);
	};
	
	function InsertInto_Sec_03(section, data){
		
		var new_files = [];
		new_files[0] = {};
		new_files[0].file_src = data.image_src;
		
		SetSectionImage(section.layer_position, new_files);
		
		if(data.image_src === DOCUMENT_ROOT + 'images/null.png'){
			section.obj.querySelector('.div-00-div-00-sec-03-div-00-div-00-div-00').style.display = '';
			section.obj.querySelector('.btn-00-div-00-sec-03-div-00-div-00-div-00').style.display = 'none';
		}
	}
	
	function InsertInto_Sec_04(section, data){
		
		section.active_tab = 0;
			
		for(var i = 0; i < data.tabs.length; i++){
			AddTab_Sec_04(section);
			AddGallery_Sec_04(section, section.layer_position);
			section.obj.querySelectorAll('.lbl-00-div-00-div-00-sec-04-div-00-div-00-div-00')[section.obj.querySelectorAll('.lbl-00-div-00-div-00-sec-04-div-00-div-00-div-00').length - 1].innerHTML = data.tabs[i].tab_name;
			section.obj.active_tab = i;
			
			for(var k = 0; k < data.tabs[i].images.length; k++){
				
				var tab = section.obj.querySelectorAll('.div-00-div-01-sec-04-div-00-div-00-div-00')[i];
				
				//add image
				InsertImage_Sec_04(tab, data.tabs[i].images[k].image_src);
				AddImage_Sec_04(tab, section.layer_position);
				
				//reset section
				tab.images[k].querySelector('.lbl-01-div-00-div-00-div-00-div-01-div-00-div-01-sec-04-div-00-div-00-div-00').style.display = 'none';
				tab.images[k].querySelector('.lbl-01-div-00-div-00-div-00-div-01-div-00-div-01-sec-04-div-00-div-00-div-00').innerHTML = '';
				tab.images[k].querySelector('.btn-00-div-00-div-01-div-00-div-01-sec-04-div-00-div-00-div-00').style.display = '';
				tab.images[k].style.backgroundColor = '';
				
				if(data.tabs[i].images[k].image_src === DOCUMENT_ROOT + 'images/null.png'){
					tab.images[k].querySelector('.div-00-div-00-div-01-div-00-div-01-sec-04-div-00-div-00-div-00').style.display = '';
					tab.images[k].querySelector('.btn-00-div-00-div-01-div-00-div-01-sec-04-div-00-div-00-div-00').style.display = 'none';
				}
				
				//description and title
				if(data.tabs[i].images[k].image_title !== ''){
					tab.querySelectorAll('h2')[k].innerHTML = data.tabs[i].images[k].image_title;
				}
				if(data.tabs[i].images[k].image_description !== ''){
					simulateClick(tab.querySelectorAll('.btn-00-div-00-div-02-div-00-div-01-sec-04-div-00-div-00-div-00')[k]);
					tab.querySelectorAll('p')[k].innerHTML = data.tabs[i].images[k].image_description;
				}
			}
		}
	}
		
	function InsertInto_Sec_05(section, data){
		
		if(data.embed_code !== ''){
			section.obj.video_embed = data.embed_code;
			simulateClick(section.obj.querySelector('.div-01-div-00-sec-05-div-00-div-00-div-00'));
			simulateClick(document.querySelector('#btn-00-div-02-div-01-div-00'));
		}
	}
	
	function InsertInto_Sec_06(section, data){
		
		section.active_tab = 0;
			
		for(var i = 0; i < data.tabs.length; i++){
			AddTab_Sec_06(section);
			AddViewport_Sec_06(section, section.layer_position);
			section.obj.querySelectorAll('.lbl-00-div-00-div-00-sec-06-div-00-div-00-div-00')[section.obj.querySelectorAll('.lbl-00-div-00-div-00-sec-06-div-00-div-00-div-00').length - 1].innerHTML = data.tabs[i].tab_name;
			section.obj.active_tab = i;
			
			var tab = section.obj.querySelectorAll('.div-00-div-01-sec-06-div-00-div-00-div-00')[i];
			
			if(data.tabs[i].embed_code !== ''){
				tab.matterport_embed = data.tabs[i].embed_code;
				simulateClick(tab.querySelector('.div-00-div-00-div-01-sec-06-div-00-div-00-div-00'));
				simulateClick(document.querySelector('#btn-00-div-03-div-01-div-00'));
			}
		}
	}
	
	function InsertInto_Sec_07(section, data){
		
		var container = section.obj.querySelector('.div-00-sec-07-div-00-div-00-div-00');
		
		for(var i = 0; i < data.floorplans.length; i++){
			
			//add image
			InsertFloorplan_Sec_07(section, container, data.floorplans[i].image_src);
			AddFloorplan_Sec_07(container, section.layer_position, true);
			//reset section
			container.floorplans[i].querySelector('.lbl-01-div-00-div-00-div-00-div-01-div-00-sec-07-div-00-div-00-div-00').style.display = 'none';
			container.floorplans[i].querySelector('.lbl-01-div-00-div-00-div-00-div-01-div-00-sec-07-div-00-div-00-div-00').innerHTML = '';
			container.floorplans[i].querySelector('.btn-00-div-00-div-01-div-00-sec-07-div-00-div-00-div-00').style.display = '';
			container.floorplans[i].style.backgroundColor = '';

			if(data.floorplans[i].image_src === DOCUMENT_ROOT + 'images/null.png'){
				container.floorplans[i].querySelector('.div-00-div-00-div-01-div-00-sec-07-div-00-div-00-div-00').style.display = '';
				container.floorplans[i].querySelector('.btn-00-div-00-div-01-div-00-sec-07-div-00-div-00-div-00').style.display = 'none';
			}

			//description and title
			container.querySelectorAll('h2')[i].innerHTML = data.floorplans[i].image_title;
		}
	}
	
	function InsertInto_Sec_08(section, data){
		
		section.active_tab = 0;
			
		for(var i = 0; i < data.tabs.length; i++){
			AddTab_Sec_08(section, data.tabs[i]);
			AddLocation_Sec_08(section, data.tabs[i]);
			section.obj.querySelectorAll('.lbl-00-div-00-div-00-sec-08-div-00-div-00-div-00')[section.obj.querySelectorAll('.lbl-00-div-00-div-00-sec-08-div-00-div-00-div-00').length - 1].innerHTML = data.tabs[i].tab_name;
			section.obj.active_tab = i;
			
			var location = section.obj.querySelectorAll('.div-00-div-01-sec-08-div-00-div-00-div-00')[i];
			
			location.address = data.tabs[i].address;
			location.lat = data.tabs[i].lat;
			location.lng = data.tabs[i].lng;
			location.zoom = data.tabs[i].zoom;
			location.pin_label = data.tabs[i].pin_label;
			
			location.querySelectorAll('.ipt-00-div-00-div-01-div-00-div-00-div-01-sec-08-div-00-div-00-div-00')[0].value = location.zoom;
			location.querySelectorAll('.ipt-00-div-00-div-01-div-00-div-00-div-01-sec-08-div-00-div-00-div-00')[1].value = location.pin_label;
			
			if(data.tabs[i].lat !== '' && data.tabs[i].lng !== '' && data.tabs[i].lat !== 0 && data.tabs[i].lng !== 0){
				simulateClick(location.querySelector('.div-00-div-00-div-00-div-00-div-01-sec-08-div-00-div-00-div-00'));
				simulateClick(document.querySelector('#btn-00-div-04-div-01-div-00'));
			}
			
			if(data.tabs[i].walkscore_embed_code !== ''){
				simulateClick(location.querySelector('.btn-00-div-00-div-01-sec-08-div-00-div-00-div-00'));
				location.walkscore_embed_code = data.tabs[i].walkscore_embed_code;
				simulateClick(location.querySelector('.div-00-div-01-div-00-div-01-sec-08-div-00-div-00-div-00'));
				simulateClick(document.querySelector('#btn-00-div-05-div-01-div-00'));
			}
			
			window.setTimeout(function(){
				ResizeWalkscore(location);
			},1000);
		}
	}
	
	function InsertInto_Sec_09(section, data){
		
		section.obj.querySelectorAll('.div-00-div-00-sec-09-div-00-div-00-div-00 input')[0].value = data.emails[0];
		
		for(var i = 1; i < data.emails.length; i++){

			AddEmail_Sec_09(section.obj);
			section.obj.querySelectorAll('.div-00-div-00-sec-09-div-00-div-00-div-00 input')[i].value = data.emails[i];
		}
	}
	
	function InsertInto_Sec_10(section, data){
		
	}

	function InsertInto_Sec_11(section, data){
		
		var container = section.obj.querySelector('.div-00-sec-11-div-00-div-00-div-00');
		
		for(var i = 0; i < data.resources.length; i++){
			//add image
			InsertFile_Sec_11(container, data.resources[i].resource_src);
			AddFile_Sec_11(container, section.layer_position);

			//reset section
			container.files[i].querySelector('.lbl-01-div-00-div-00-div-00-div-01-div-00-sec-11-div-00-div-00-div-00').style.display = 'none';
			container.files[i].querySelector('.lbl-01-div-00-div-00-div-00-div-01-div-00-sec-11-div-00-div-00-div-00').innerHTML = '';
			container.files[i].querySelector('.btn-00-div-00-div-01-div-00-sec-11-div-00-div-00-div-00').style.display = '';
			container.files[i].style.backgroundColor = '';
			
			if(data.resources[i].resource_src === ''){
				container.files[i].querySelector('.div-00-div-00-div-01-div-00-sec-11-div-00-div-00-div-00').style.display = '';
				container.files[i].querySelector('.btn-00-div-00-div-01-div-00-sec-11-div-00-div-00-div-00').style.display = 'none';
			}
			
			//description and title
			container.querySelectorAll('h2')[i].innerHTML = data.resources[i].resource_title;
			if(data.resources[i].resource_description !== ''){
				simulateClick(container.querySelectorAll('.btn-00-div-00-div-02-div-00-sec-11-div-00-div-00-div-00')[i]);
				container.querySelectorAll('p')[i].innerHTML = data.resources[i].resource_description;
			}
		}
	}
	
	function InsertInto_Sec_12(section, data){
		
		if(data.agents.length > 1){
			simulateClick(section.obj.querySelector('.div-01-div-00-sec-12-div-00-div-00-div-00 button'));
		}
		
		for(var i = 0; i < data.agents.length; i++){
			var agent = section.obj.querySelectorAll('.div-00-div-00-sec-12-div-00-div-00-div-00')[i];
		
			
			agent.querySelector('.h3-00-div-00-div-00-sec-12-div-00-div-00-div-00').value = data.agents[i].site_section_agent_id;
		
			// agent.querySelector('.h3-00-div-00-div-00-sec-12-div-00-div-00-div-00').innerHTML = data.agents[i].name;
			// agent.querySelector('.h4-00-div-00-div-00-sec-12-div-00-div-00-div-00').innerHTML = data.agents[i].occupation;
			// agent.querySelector('.p-00-div-00-div-00-sec-12-div-00-div-00-div-00').innerHTML = data.agents[i].description;
			// agent.querySelector('.ipt-00-div-00-div-00-sec-12-div-00-div-00-div-00').value = data.agents[i].mobile_number;
			// agent.querySelector('.ipt-01-div-00-div-00-sec-12-div-00-div-00-div-00').value = data.agents[i].office_number;
			
			// agent.fb_link = data.agents[i].facebook_link;
			// agent.email = data.agents[i].email_link;
			// agent.website_link = data.agents[i].website_link;
			
			//reset section
			// if(data.agents[i].image_src !== DOCUMENT_ROOT + 'images/null.png'){
			// 	section.obj.querySelectorAll('.div-01-div-00-div-00-sec-12-div-00-div-00-div-00')[i].style.display = 'none';
			// 	section.obj.querySelectorAll('.btn-01-div-00-div-00-sec-12-div-00-div-00-div-00')[i].style.display = '';
			// 	agent.querySelector('.img-00-div-00-div-00-div-00-sec-12-div-00-div-00-div-00').src = data.agents[i].image_src;
			// }
		}
	}
	
	function InstantiateSiteSection(data){
		
		var section = InstantiateNewSiteSection(data.type, true);
		
		if(section.type === 0){
			InsertInto_Sec_00(section, data);
		} else if(section.type === 1){
			InsertInto_Sec_01(section, data);
		} else if(section.type === 2){
			InsertInto_Sec_02(section, data);
		} else if(section.type === 3){
			InsertInto_Sec_03(section, data);
		} else if(section.type === 4){
			InsertInto_Sec_04(section, data);
		} else if(section.type === 5){
			InsertInto_Sec_05(section, data);
		} else if(section.type === 6){
			InsertInto_Sec_06(section, data);
		} else if(section.type === 7){
			InsertInto_Sec_07(section, data);
		} else if(section.type === 8){
			InsertInto_Sec_08(section, data);
		} else if(section.type === 9){
			InsertInto_Sec_09(section, data);
		} else if(section.type === 10){
			InsertInto_Sec_10(section, data);
		} else if(section.type === 11){
			InsertInto_Sec_11(section, data);
		} else if(section.type === 12){
			InsertInto_Sec_12(section, data);
		}
	}
	
	
	function Initialisation(){
		
		//vars
		startTime = new Date().getTime();
		time = {start : startTime, now : startTime, deltaTime : 0};
		scroll_y = 0;
		
		asd_01_div_00 = document.getElementById('asd-01-div-00');
		div_00_asd_01_div_00 = document.getElementById('div-00-asd-01-div-00');
		div_00_div_00_asd_01_div_00 = document.getElementById('div-00-div-00-asd-01-div-00');
		div_01_asd_01_div_00 = document.getElementById('div-01-asd-01-div-00');
		spn_00_asd_01_div_00 = document.getElementById('spn-00-asd-01-div-00');
		btn_00_spn_00_asd_01_div_00 = document.querySelectorAll('.btn-00-spn-00-asd-01-div-00');
		
		div_00_asd_01_div_00.t = 0;
		div_01_asd_01_div_00.t = 0;
		btn_00_spn_00_asd_01_div_00[0].active = false;
		btn_00_spn_00_asd_01_div_00[1].active = false;
		
		div_01_div_00 = document.querySelector('#div-01-div-00');
				
		document.querySelector('#btn-00-div-00-div-01-asd-01-div-00 input').addToSection = null;
		
		spn_01_div_00 = document.querySelector('#spn-01-div-00');
		spn_01_div_00.files = [];
		spn_01_div_00.state = 0;
		spn_01_div_00.click_pos = {x:0, y:0};
		spn_01_div_00.addToSection = null;
		spn_01_div_00.active_shift = false;
		spn_01_div_00.active_alt = false;
		spn_01_div_00.last_select = -1;
		spn_01_div_00.last_clicked = -1;
		spn_01_div_00.initial_window = -1;
		
		div_00_div_00_div_00 = document.querySelector('#div-00-div-00-div-00');
		
		
		
		/* button to open layer panel */
		btn_00_spn_00_asd_01_div_00[0].addEventListener('click', function(){
			btn_00_spn_00_asd_01_div_00[0].active = true;
		});
		
		/* button to close layer panel */
		div_00_asd_01_div_00.querySelector('#svg-00-div-00-asd-01-div-00').addEventListener('click', function(){
			btn_00_spn_00_asd_01_div_00[0].active = false;
		});
		
		/* button to open file panel */
		btn_00_spn_00_asd_01_div_00[1].addEventListener('click', function(){
			btn_00_spn_00_asd_01_div_00[1].active = true;
		});
		
		/* button to close file panel */
		div_01_asd_01_div_00.querySelector('#svg-00-div-00-div-01-asd-01-div-00').addEventListener('click', function(){
			btn_00_spn_00_asd_01_div_00[1].active = false;
		});

		/* variables that scroll up the aside bar when reaching header */
		asd_01_div_00.scroll_target = 25;
		asd_01_div_00.scroll_curr = 25;
		asd_01_div_00.scroll_t = 1;
		
			
		document.addEventListener('mousemove', function(e){
			mouse_pos.x = e.clientX;
			mouse_pos.y = e.clientY;
			
			if(spn_01_div_00.click_pos.x !== mouse_pos.x && spn_01_div_00.click_pos.y !== mouse_pos.y && spn_01_div_00.state === 1){
				spn_01_div_00.state = 2;
			}
			
			DragFile();
		});

		
		
	
		Layers_Aside_Initialise();
		
		File_Aside_Initialise();
		
		
		document.addEventListener('keydown', function(event){
			if(event.altKey === true || event.ctrlKey === true){
				spn_01_div_00.active_alt = true;
			}
			
			if(event.shiftKey === true){
				spn_01_div_00.active_shift = true;
			}
		});
		
		document.addEventListener('keyup', function(){
			if(event.altKey === false && event.ctrlKey === false){
				spn_01_div_00.active_alt = false;
			}
			
			if(event.shiftKey === false){
				spn_01_div_00.active_shift = false;
			}
		});
				
		document.addEventListener('mouseup', function(e){
			
			//close dropdown if open
			if(e.target !== div_00_div_01_div_00_asd_01_div_00 && e.target.parentNode !== div_00_div_01_div_00_asd_01_div_00){
				div_00_div_01_div_00_asd_01_div_00.dropdown = false;
				Dropdown();
			}
			
			//after reordering layers, the recently moved layer is reset
			for(var i = 0; i < sections.length; i++){
				if(sections[i].layer_position === div_00_div_00_asd_01_div_00.moving_layer){
					//reset moving layer
					sections[i].layer.style.transform = '';
					sections[i].layer.style.boxShadow = '';
					sections[i].layer.style.zIndex = '';
					//allow scrolling immediately after mouseup from moving a layer
					div_00_div_00_div_00.scroll = false;
					html.style.overflow = '';
					div_00_div_00_asd_01_div_00.moving_layer = -1;
					
					//allow aside scrolling
					div_00_div_00_asd_01_div_00.style.overflow = '';
				}
			}
			
			//renaming files off click
			for(var n = 0; n < div_01_asd_01_div_00.files.length; n++){
				if(e.target !== div_01_asd_01_div_00.files[n].container && e.target.parentElement !== div_01_asd_01_div_00.files[n].container){
					if(div_01_asd_01_div_00.files[n].data.file_state === 2){
						ChangeClickState(div_01_asd_01_div_00.files[n], 0);
						ChangeFileState(div_01_asd_01_div_00.files[n], 1, n);
						FileActionXHR(div_01_asd_01_div_00.files[n].data.file_id, 1, div_01_asd_01_div_00.files[n].container.querySelector('h3').innerText);
						div_01_asd_01_div_00.files[n].data.file_name = div_01_asd_01_div_00.files[n].container.querySelector('h3').innerText;
					}
				}
			}
			
			//deselect all files if not adding to a section and not holding shift or alt
			if(spn_01_div_00.active_alt === false && spn_01_div_00.active_shift === false && e.target !== div_01_asd_01_div_00.querySelector('#btn-02-div-00-div-01-asd-01-div-00')){
				for(var l = 0; l < div_01_asd_01_div_00.files.length; l++){
					if(spn_01_div_00.state !== 3){
						if(e.target !== div_01_asd_01_div_00.files[l].container && e.target.parentNode !== div_01_asd_01_div_00.files[l].container){
							ChangeFileState(div_01_asd_01_div_00.files[l], 0);
						}
					}
					//reset click state if click not on itself
					if(e.target !== div_01_asd_01_div_00.files[l].container && e.target.parentNode !== div_01_asd_01_div_00.files[l].container){
						clearTimeout(div_01_asd_01_div_00.files[l].container.click_timeout);
						ChangeClickState(div_01_asd_01_div_00.files[l], 0);
					}
				}
			}
			
			if(spn_01_div_00.state === 3){
				//if releasing hold on dragging file
				if(spn_01_div_00.addToSection === null && spn_01_div_00.initial_window !== div_01_asd_01_div_00.active_folder_id){
					for(var m = 0; m < spn_01_div_00.files.length; m++){
						FileActionXHR(spn_01_div_00.files[m].file_id, 2, null, div_01_asd_01_div_00.active_folder_id);
					}
					//make sure file aside has no selected 
					div_01_asd_01_div_00.style.border = '';
					div_01_asd_01_div_00.style.backgroundColor = '';
				} else if(spn_01_div_00.addToSection !== null) { //add to section
					SetSectionImage(spn_01_div_00.addToSection, spn_01_div_00.files);
				}
			}
			
			spn_01_div_00.initial_window = -1;
			spn_01_div_00.addToSection = null;
			
			//reset span vars as soon as mouseup on anything
			spn_01_div_00.state = 0;
			div_01_asd_01_div_00.style.backgroundColor = '';
			document.body.style.cursor = '';
			spn_01_div_00.style.display = 'none';
			
			//hiding delete button
		
			var hide_delete_button = true;
			for(var o = 0; o < div_01_asd_01_div_00.files.length; o++){
				if(div_01_asd_01_div_00.files[o].data.file_state !== 0){
					hide_delete_button = false;
				}
			}

			if(hide_delete_button === true){
				div_01_asd_01_div_00.querySelector('#btn-02-div-00-div-01-asd-01-div-00').style.display = 'none';
			}
		});
					
		//cancel button
		document.querySelector('#btn-03-asd-00-div-00').addEventListener('click', function(){
			div_01_div_00.style.pointerEvents = '';
			div_01_div_00.style.opacity = '1';
			document.querySelector('#div-00-div-01-div-00').style.display = '';
			document.querySelector('#div-01-div-01-div-00').style.display = 'none';
		});
		
		document.querySelector('#btn-00-div-00-div-01-div-00').addEventListener('click', function(){
			window.location = DOCUMENT_ROOT + 'admin/sites/manage-sites';
		});
		
		document.querySelector('#btn-01-div-00-div-01-div-00').addEventListener('click', function(){
			div_01_div_00.style.pointerEvents = 'none';
			div_01_div_00.style.opacity = '0';
		});
		
		//upload button
		document.querySelector('#btn-04-asd-00-div-00').addEventListener('click', function(){
			div_01_div_00.style.pointerEvents = '';
			div_01_div_00.style.opacity = '1';
			document.querySelector('#div-00-div-01-div-00').style.display = 'none';
			document.querySelector('#div-01-div-01-div-00').style.display = '';
			UploadSite();
		});
		
		//remove memorised scroll position
		if ('scrollRestoration' in history) {
			history.scrollRestoration = 'manual';
		}
		
		
		//if editing an existing site
		if(SITE_STATE === 1){
			XHRSections();
		}
		
		window.onbeforeunload = function (e) {
			if (last_save_ts + 6000 < time.now) {
				var confirmationMessage = 'The site has not been saved. If you leave before saving, your changes will be lost.';

				(e || window.event).returnValue = confirmationMessage; //Gecko + IE
				return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
			} else {
				return null;
			}
		};
	}


	Main();
}

Editor_js();