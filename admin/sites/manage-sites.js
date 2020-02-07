// JavaScript Document
/*jshint esversion: 6 */ 

function ManageSites_js () {
	"use strict";
	var startTime;
	var time;
	var scrollY;
	
	var div_00;
	var html = document.body.parentNode;
	
	var loading = true;
	
	//data retrieval stage variables
	var current_sites_retrieved = 0;
	var last_sites_retrieved = 0;

	//placeholder stage variables
	var site_visibility_increment = 9;
	var current_sites_visible = 0;
	var last_sites_visible = 0;
	
	//limit variables
	var loaded_all = false;
	
	var div_01_div_00_div_00;
	var t_div_00_div_01_div_00_div_00;

	var div_03_div_00_div_00;

	
	var sites;
	var sites_search;
	
	var ipt_00_asd_00_div_00_div_00;
	var btn_00_asd_00_div_00_div_00;
	
	var div_01_div_00;
	var div_00_div_01_div_00;
	var div_01_div_01_div_00;
	var div_02_div_01_div_00;
			
	function Main(){
		window.requestAnimationFrame(function(timestamp){
			if(loading === true && document.body.id === "manage-sites"){
				Initialisation();
				loading = false;
			}
			
			if(startTime !== undefined && document.body.id === "manage-sites"){
				time.deltaTime = time.start + timestamp - time.now;
				time.now = time.start + timestamp;
				scrollY = window.pageYOffset || document.documentElement.scrollTop || window.scrollY;
				
			}
			
			//if reaching bottom of page, load extra placeholders
			LoadPlaceholders();
			//load in content for new placeholders
			LoadContent();
			//site object animation
			Sites();
			
			Main();
		});
	}

	
	function F1(x){
		return (-((x-1) * (x-1)) + 1);
	}
	
	function F2(x){
		return (Math.sin((x - 0.5) * Math.PI))/2 + 0.5;
	}
	
	function Sites(){
		var site;
		for(var i = 0; i < last_sites_retrieved; i++){
			site = sites[i].obj;
			site.scroll_dist = Math.max(site.querySelector('.div-00-div-00-div-00-div-01-div-00-div-00').clientHeight/(site.querySelector('.div-00-div-00-div-01-div-00-div-00').clientHeight - 40) - 1,0);
			site.scroll_amount = - Math.max(site.querySelector('.div-00-div-00-div-00-div-01-div-00-div-00').clientHeight - (site.querySelector('.div-00-div-00-div-01-div-00-div-00').clientHeight - 40), 0);
			
			if(site.t < site.target_t){
				site.t = Math.min(site.t + time.deltaTime/500/site.scroll_dist, site.target_t);
			}
			if(site.t > site.target_t){
				site.t = Math.max(site.t - time.deltaTime/500/site.scroll_dist, site.target_t);
			}
			site.querySelector('.div-00-div-00-div-00-div-01-div-00-div-00').style.transform = 'translate(0, ' + (F2(site.t) * site.scroll_amount) + 'px)';
			site.querySelector('.lbl-00-div-00-div-00-div-01-div-00-div-00').style.transform = 'translate(' + (1 - F1(1 - Math.min(site.t * 10, 1))) * 100 + '%)';
			site.querySelector('.lbl-00-div-00-div-00-div-01-div-00-div-00').style.opacity = 1 - F1(Math.min(site.t * 10, 1));
		}
		
		for(var j = 0; j < sites_search.length; j++){
			site = sites_search[j].obj;
			site.scroll_dist = Math.max(site.querySelector('.div-00-div-00-div-00-div-01-div-00-div-00').clientHeight/(site.querySelector('.div-00-div-00-div-01-div-00-div-00').clientHeight - 40) - 1,0);
			site.scroll_amount = - Math.max(site.querySelector('.div-00-div-00-div-00-div-01-div-00-div-00').clientHeight - (site.querySelector('.div-00-div-00-div-01-div-00-div-00').clientHeight - 40), 0);
			
			if(site.t < site.target_t){
				site.t = Math.min(site.t + time.deltaTime/500/site.scroll_dist, site.target_t);
			}
			if(site.t > site.target_t){
				site.t = Math.max(site.t - time.deltaTime/500/site.scroll_dist, site.target_t);
			}
			site.querySelector('.div-00-div-00-div-00-div-01-div-00-div-00').style.transform = 'translate(0, ' + (F2(site.t) * site.scroll_amount) + 'px)';
			site.querySelector('.lbl-00-div-00-div-00-div-01-div-00-div-00').style.transform = 'translate(' + (1 - F1(1 - Math.min(site.t * 10, 1))) * 100 + '%)';
			site.querySelector('.lbl-00-div-00-div-00-div-01-div-00-div-00').style.opacity = 1 - F1(Math.min(site.t * 10, 1));
		}
	}
	
	function LoadPlaceholders(){
		if(div_00.getBoundingClientRect().bottom < window.innerHeight + 300 && loaded_all === false && btn_00_asd_00_div_00_div_00.state === 0){
			current_sites_visible = Math.min(current_sites_visible + site_visibility_increment, SITE_COUNT);
		}
		
		for(last_sites_visible; last_sites_visible < current_sites_visible; last_sites_visible++){
			//duplicate template
			var template = t_div_00_div_01_div_00_div_00.cloneNode(true);
			//rename
			template.className = 'p-div-00-div-01-div-00-div-00';
			//append to sites array
			sites.length ++;
			sites[last_sites_visible] = new site();
			sites[last_sites_visible].obj = template;
			//append to container
			div_01_div_00_div_00.appendChild(template);
		}
	}
	
	function LoadContent(){
		//if there are placeholders with no content
		if(current_sites_retrieved < current_sites_visible){
			GetSitesXHR();
		}
	}
	
	function site(id = '', name = '', url = '', views = '', obj = null){
		this.id = id;
		this.name = name;
		this.url = url;
		this.views = views;
		this.obj = obj;
	}

	
	function getObj(min, max, search = ''){
		//the min and max article wanted in order
		this.minimum = min;
		this.maximum = max;
		//0 if scheduled sites, 1 if active, 2 if removed
		this.state = 1;
		//no text means not a search
		this.search = search;
	}
	
	function GetSitesXHR(){
		//make object, and submit
		var get_obj = new getObj(current_sites_retrieved, current_sites_visible);
					
		var xhr = new XMLHttpRequest();
		var url = DOCUMENT_ROOT + 'processes/get-sites.php';

		//set sites_retrieved to equal the visible sites. Note that these will both get decreased if there are no more sites to view, existing placeholders will be deleted, and any new retrievals will be prevented
		current_sites_retrieved = current_sites_visible;
		
		var data = JSON.stringify(get_obj);
		xhr.open('POST', url, true);
		xhr.setRequestHeader("Content-Type", "application/json");		
		xhr.send(data);

		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				var retrieved_sites = JSON.parse(xhr.responseText);
				//build data				
				for(var i = 0; i < retrieved_sites.length; i++){
					//add to sites array
					sites[i + last_sites_retrieved].id = retrieved_sites[i].id;
					sites[i + last_sites_retrieved].name = retrieved_sites[i].name;
					sites[i + last_sites_retrieved].url = retrieved_sites[i].url;
					sites[i + last_sites_retrieved].views = retrieved_sites[i].views;
					sites[i + last_sites_retrieved].parameter = retrieved_sites[i].parameter;
					//set site object
					SetSite(sites[i + last_sites_retrieved]);
					GetSiteSectionsXHR(sites[i + last_sites_retrieved]);
				}
				
				last_sites_retrieved += retrieved_sites.length;
				
				//if reached the end of items
				if(last_sites_retrieved < current_sites_retrieved){
					loaded_all = true;
					//delete all placeholder
					for(i = last_sites_retrieved; i < current_sites_retrieved; i++){
						div_01_div_00_div_00.removeChild(sites[i].obj);
					}
					
					current_sites_retrieved = last_sites_retrieved;
					current_sites_visible = last_sites_retrieved;
					sites.length = last_sites_retrieved;
				}
				
				//if there are no sites meeting the criteria, reveal no sites image
				if(retrieved_sites.length === 0 && current_sites_retrieved === 0){
					document.querySelector('#div-00-div-00-div-00').style.display = '';
					document.querySelector('#div-01-div-00-div-00').style.display = 'none';
				}
			}
		};
	}
	
	function GetSiteSectionsXHR(site){
		//make object, and submit
		var get_obj = new getObj(current_sites_retrieved, current_sites_visible);
					
		var xhr = new XMLHttpRequest();
		var url = DOCUMENT_ROOT + 'processes/get-site-sections.php';

		//set sites_retrieved to equal the visible sites. Note that these will both get decreased if there are no more sites to view, existing placeholders will be deleted, and any new retrievals will be prevented
		current_sites_retrieved = current_sites_visible;
		
		xhr.open('POST', url, true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.setRequestHeader("Site-Id", site.id);
		xhr.setRequestHeader("Preview-Request", 1);

		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				var sections = JSON.parse(xhr.responseText);
				
				var container = site.obj.querySelector('.div-00-div-00-div-00-div-01-div-00-div-00');
				
				var temp;
				
				for(var i = 0; i < sections.length; i++){
					var type = sections[i].type;
					if(type === 0){
						temp = site.obj.querySelector('.t-div-00-div-00-div-00-div-00-div-01-div-00-div-00').cloneNode(true);
						temp.className = 'div-00-div-00-div-00-div-00-div-01-div-00-div-00';
						container.appendChild(temp);
						temp.querySelector('img').src = sections[i].image_src;
					} else if(type === 1){
						temp = site.obj.querySelector('.t-div-01-div-00-div-00-div-00-div-01-div-00-div-00').cloneNode(true);
						temp.className = 'div-01-div-00-div-00-div-00-div-01-div-00-div-00';
						container.appendChild(temp);
						temp.querySelectorAll('h4')[0].innerHTML = sections[i].address;
						temp.querySelectorAll('h4')[1].innerHTML = sections[i].city;
						temp.querySelectorAll('h4')[2].innerHTML = sections[i].price;
						temp.querySelector('p').innerHTML = sections[i].description;
					} else if(type === 2){
						temp = site.obj.querySelector('.t-div-02-div-00-div-00-div-00-div-01-div-00-div-00').cloneNode(true);
						temp.className = 'div-02-div-00-div-00-div-00-div-01-div-00-div-00';
						container.appendChild(temp);
					} else if(type === 3){
						temp = site.obj.querySelector('.t-div-03-div-00-div-00-div-00-div-01-div-00-div-00').cloneNode(true);
						temp.className = 'div-03-div-00-div-00-div-00-div-01-div-00-div-00';
						container.appendChild(temp);
						temp.querySelector('img').src = sections[i].image_src;
					} else if(type === 4){
						temp = site.obj.querySelector('.t-div-04-div-00-div-00-div-00-div-01-div-00-div-00').cloneNode(true);
						temp.className = 'div-04-div-00-div-00-div-00-div-01-div-00-div-00';
						container.appendChild(temp);
						var img_count = 0;
						for(var j = 0; j < sections[i].tabs.length; j++){
							for(var k = 0; k < sections[i].tabs[j].images.length; k++){
								if(img_count < 2){
									temp.querySelectorAll('img')[img_count + 1].src = sections[i].tabs[j].images[k].image_src; 
									img_count++;
								}
							}
						}
					} else if(type === 5){
						temp = site.obj.querySelector('.t-div-05-div-00-div-00-div-00-div-01-div-00-div-00').cloneNode(true);
						temp.className = 'div-05-div-00-div-00-div-00-div-01-div-00-div-00';
						container.appendChild(temp);
					} else if(type === 6){
						temp = site.obj.querySelector('.t-div-06-div-00-div-00-div-00-div-01-div-00-div-00').cloneNode(true);
						temp.className = 'div-06-div-00-div-00-div-00-div-01-div-00-div-00';
						container.appendChild(temp);
					} else if(type === 7){
						temp = site.obj.querySelector('.t-div-07-div-00-div-00-div-00-div-01-div-00-div-00').cloneNode(true);
						temp.className = 'div-07-div-00-div-00-div-00-div-01-div-00-div-00';
						container.appendChild(temp);
						var img_count_2 = 0;
						for(var m = 0; m < sections[i].floorplans.length; m++){
							if(img_count_2 < 2){
								temp.querySelectorAll('img')[img_count_2 + 1].src = sections[i].floorplans[m].image_src; 
								img_count_2++;
							}
						}
					} else if(type === 8){
						temp = site.obj.querySelector('.t-div-08-div-00-div-00-div-00-div-01-div-00-div-00').cloneNode(true);
						temp.className = 'div-08-div-00-div-00-div-00-div-01-div-00-div-00';
						container.appendChild(temp);
					} else if(type === 9){
						temp = site.obj.querySelector('.t-div-09-div-00-div-00-div-00-div-01-div-00-div-00').cloneNode(true);
						temp.className = 'div-09-div-00-div-00-div-00-div-01-div-00-div-00';
						container.appendChild(temp);
					} else if(type === 10){
						temp = site.obj.querySelector('.t-div-10-div-00-div-00-div-00-div-01-div-00-div-00').cloneNode(true);
						temp.className = 'div-10-div-00-div-00-div-00-div-01-div-00-div-00';
						container.appendChild(temp);
					} else if(type === 11){
						temp = site.obj.querySelector('.t-div-11-div-00-div-00-div-00-div-01-div-00-div-00').cloneNode(true);
						temp.className = 'div-11-div-00-div-00-div-00-div-01-div-00-div-00';
						container.appendChild(temp);
					} else if(type === 12){
						temp = site.obj.querySelector('.t-div-12-div-00-div-00-div-00-div-01-div-00-div-00').cloneNode(true);
						temp.className = 'div-12-div-00-div-00-div-00-div-01-div-00-div-00';
						container.appendChild(temp);
						for(var n = 0; n < sections[i].agents.length; n++){
							temp.querySelectorAll('img')[n+1].src = sections[i].agents[n].image_src; 
						}
					}
				}
				
				temp = site.obj.querySelector('.t-f-00-div-00-div-00-div-00-div-01-div-00-div-00').cloneNode(true);
				temp.className = 'f-00-div-00-div-00-div-00-div-01-div-00-div-00';
				container.appendChild(temp);
			}
		};
		
		xhr.send();
	}
	
	function SetSite(site){
		site.obj.className = 'div-00-div-01-div-00-div-00';
		site.obj.querySelector('.lbl-00-div-00-div-00-div-01-div-00-div-00').childNodes[0].nodeValue = NumberWithCommas(site.views);
		site.obj.querySelector('.h3-00-div-01-div-00-div-01-div-00-div-00').innerHTML = site.name;
		site.obj.querySelector('.h4-00-div-01-div-00-div-01-div-00-div-00').innerHTML = site.url;
		
		//scrolling image of site
		SitePreviewHover(site.obj);
		
		site.obj.querySelector('.div-00-div-00-div-01-div-00-div-00').addEventListener('click', function(){
			window.open(DOCUMENT_ROOT + 'property/' + site.parameter);
		});
		
		//initialise buttons
		SetSiteActions(site);
	}
	
	function NumberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	
	function SetSiteActions(site){
		//edit button
		site.obj.querySelectorAll('.btn-00-div-01-div-00-div-01-div-00-div-00')[0].addEventListener('click', function(){
			div_01_div_00.style.display = '';
			div_00_div_01_div_00.style.display = '';
			html.style.overflow = 'hidden';
			div_00_div_01_div_00.focus_site = site;
			div_00_div_01_div_00.querySelector('label').innerHTML = 'Edit ' + site.name + '?';
		});
		
		//schedule button
		site.obj.querySelectorAll('.btn-00-div-01-div-00-div-01-div-00-div-00')[1].addEventListener('click', function(){
			div_01_div_00.style.display = '';
			html.style.overflow = 'hidden';
			div_01_div_01_div_00.style.display = '';
			div_01_div_01_div_00.set_schedule = SetScheduled(new Date().getTime());
			
			div_01_div_01_div_00.querySelectorAll('.div-00-div-00-div-00-div-01-div-01-div-00')[0].innerHTML = Zerofill(div_01_div_01_div_00.set_schedule.month,2);
			div_01_div_01_div_00.querySelectorAll('.div-00-div-00-div-00-div-01-div-01-div-00')[1].innerHTML = Zerofill(div_01_div_01_div_00.set_schedule.day,2);
			div_01_div_01_div_00.querySelectorAll('.div-00-div-00-div-00-div-01-div-01-div-00')[2].innerHTML = Zerofill(div_01_div_01_div_00.set_schedule.year,4);
			div_01_div_01_div_00.querySelectorAll('.div-00-div-00-div-01-div-01-div-01-div-00')[0].innerHTML = Zerofill(div_01_div_01_div_00.set_schedule.hour,2);
			div_01_div_01_div_00.querySelectorAll('.div-00-div-00-div-01-div-01-div-01-div-00')[1].innerHTML = Zerofill(div_01_div_01_div_00.set_schedule.minutes,2);
			div_01_div_01_div_00.focus_site = site;
		});
		
		//delete button
		site.obj.querySelectorAll('.btn-00-div-01-div-00-div-01-div-00-div-00')[2].addEventListener('click', function(){
			div_01_div_00.style.display = '';
			html.style.overflow = 'hidden';
			div_02_div_01_div_00.style.display = '';
			div_02_div_01_div_00.focus_site = site;
			div_02_div_01_div_00.querySelector('label').innerHTML = 'Are you sure you want to remove ' + site.name + '?';
		});
		
		
	}
	
	function SetScheduled(timestamp){
		//get date
		var date = new Date(timestamp - 3600000 * 8);
				
		var scheduled = {month:0,day:0,year:0,hour:0,minutes:0};
		
		scheduled.month = date.getMonth() + 1;
		scheduled.day = date.getDate();
		scheduled.year = date.getFullYear();
		scheduled.hour = date.getUTCHours();
		scheduled.minutes = date.getUTCMinutes();
		return scheduled;
	}
	
	function Zerofill(number, length){
		return new Array(length - number.toString().length + 1).join('0') + number;
	}
	
	function SitePreviewHover(site){
		site.t = 0;
		site.target_t = 0;
		site.scroll_dist = 0;
		site.scroll_rate = 0;
		site.querySelector('.div-00-div-00-div-01-div-00-div-00').addEventListener('mouseover', function(){
			site.target_t = 1;
		});
		site.querySelector('.div-00-div-00-div-01-div-00-div-00').addEventListener('mouseout', function(){
			site.target_t = 0;
		});
	}
	
	function SearchInitialisation(){
		ipt_00_asd_00_div_00_div_00 = document.querySelector('#ipt-00-asd-00-div-00-div-00');
		btn_00_asd_00_div_00_div_00 = document.querySelector('#btn-00-asd-00-div-00-div-00');
				
		btn_00_asd_00_div_00_div_00.state = 0;
		
		btn_00_asd_00_div_00_div_00.addEventListener('click', function(){
			BeginSearch(btn_00_asd_00_div_00_div_00);
		});
		
		//if input changes, then reset search button
		ipt_00_asd_00_div_00_div_00.addEventListener('input', function(){
			btn_00_asd_00_div_00_div_00.querySelector('path').setAttribute('d','M 3.5 0.5 A 3 3 0 1 1 3.5 6.5 A 3 3 0 1 1 3.5 0.5 M 9 9 L 5.62 5.62');
			btn_00_asd_00_div_00_div_00.state = 2;
		});
		
		//if enter button triggered
		ipt_00_asd_00_div_00_div_00.addEventListener('keyup', function(event){
			if(event.keyCode === 13){
				event.preventDefault();
				BeginSearch(btn_00_asd_00_div_00_div_00, true);
			}
		});
	}
	
	function BeginSearch(button, override = false){
		if(button.state === 0 || button.state === 2 || override === true){
			GetSearchXHR(ipt_00_asd_00_div_00_div_00.value);
			button.state = 1;
			button.querySelector('path').setAttribute('d','M 1 1 L 9 9 M 1 9 L 9 1');
		} else {
			//make main container visible again
			document.querySelector('#div-01-div-00-div-00').style.display = '';
			document.querySelector('#div-02-div-00-div-00').style.display = 'none';
			document.querySelector('#div-03-div-00-div-00').style.display = 'none';
			button.state = 0;
			button.querySelector('path').setAttribute('d','M 3.5 0.5 A 3 3 0 1 1 3.5 6.5 A 3 3 0 1 1 3.5 0.5 M 9 9 L 5.62 5.62');
		}
	}
	
	function GetSearchXHR(search_text){
		//hide sites
		document.querySelector('#div-01-div-00-div-00').style.display = 'none';
		document.querySelector('#div-03-div-00-div-00').style.display = '';
		
		//make object, and submit
		var get_obj = new getObj(0, 999999999, search_text);
					
		var xhr = new XMLHttpRequest();
		var url = DOCUMENT_ROOT + 'processes/get-sites.php';
		
		var data = JSON.stringify(get_obj);
		xhr.open('POST', url, true);
		xhr.setRequestHeader("Content-Type", "application/json");		
		xhr.send(data);

		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				var retrieved_sites = JSON.parse(xhr.responseText);
				//reset div-03
				div_03_div_00_div_00.innerHTML = '';
				sites_search.length = 0;
				//build data
				for(var i = 0; i < retrieved_sites.length; i++){
					//make site object
					var template = t_div_00_div_01_div_00_div_00.cloneNode(true);
					//rename
					template.className = 'p-div-00-div-01-div-00-div-00';
					//append to container
					div_03_div_00_div_00.appendChild(template);
					//add to sites array
					sites_search.length ++;
					sites_search[i] = new site(retrieved_sites[i].id, retrieved_sites[i].name, retrieved_sites[i].url, retrieved_sites[i].views, template);
					//set site object
					SetSite(sites_search[i]);
					GetSiteSectionsXHR(sites_search[i]);
				}
				
				//if there are no sites meeting the criteria, reveal no sites image
				if(retrieved_sites.length === 0){
					document.querySelector('#div-02-div-00-div-00').style.display = '';
					document.querySelector('#div-03-div-00-div-00').style.display = 'none';
				} else {
					document.querySelector('#div-02-div-00-div-00').style.display = 'none';
				}
			}
		};
	}
	
	function InitialiseDialogs(){
		div_01_div_00 = document.querySelector('#div-01-div-00');
		div_00_div_01_div_00 = document.querySelector('#div-00-div-01-div-00');
		div_00_div_01_div_00.focus_site = null;
		div_01_div_01_div_00 = document.querySelector('#div-01-div-01-div-00');
		div_01_div_01_div_00.focus_site = null;
		div_02_div_01_div_00 = document.querySelector('#div-02-div-01-div-00');
		div_02_div_01_div_00.focus_site = null;
		
		//edit site dialog
		div_00_div_01_div_00.querySelector('#btn-00-div-00-div-01-div-00').addEventListener('click', function(){
			//open details
			window.open(DOCUMENT_ROOT + 'admin/sites/set-site-details/' + div_00_div_01_div_00.focus_site.parameter);
		});
		div_00_div_01_div_00.querySelector('#btn-01-div-00-div-01-div-00').addEventListener('click', function(){
			//open editor
			window.open(DOCUMENT_ROOT + 'admin/sites/site-editor/' + div_00_div_01_div_00.focus_site.parameter);
		});
		//cancel site editor opening
		div_00_div_01_div_00.querySelector('#btn-02-div-00-div-01-div-00').addEventListener('click', function(){
			div_00_div_01_div_00.focus_site = null;
			div_01_div_00.style.display = 'none';
			div_00_div_01_div_00.style.display = 'none';
			html.style.overflow = '';
		});
		
		//schedule site dialog
		div_01_div_01_div_00.querySelector('#btn-00-div-01-div-01-div-00').addEventListener('click', function(){
			var schedule_ts = GetTimestamp(div_01_div_01_div_00.set_schedule);
			ScheduleSite(div_01_div_01_div_00.focus_site, schedule_ts);
		});
		//cancel site metrics
		div_01_div_01_div_00.querySelector('#btn-01-div-01-div-01-div-00').addEventListener('click', function(){
			div_01_div_01_div_00.focus_site = null;
			div_01_div_00.style.display = 'none';
			div_01_div_01_div_00.style.display = 'none';
			html.style.overflow = '';
		});
		
		//buttons on schedule site dialog
		div_01_div_01_div_00.querySelectorAll('.btn-00-div-00-div-00-div-01-div-01-div-00')[0].addEventListener('click', function(){
			//increase month
			div_01_div_01_div_00.set_schedule.month = Modulo(div_01_div_01_div_00.set_schedule.month,12)+1;
			div_01_div_01_div_00.querySelectorAll('.div-00-div-00-div-00-div-01-div-01-div-00')[0].innerHTML = Zerofill(div_01_div_01_div_00.set_schedule.month,2);
		});
		div_01_div_01_div_00.querySelectorAll('.btn-01-div-00-div-00-div-01-div-01-div-00')[0].addEventListener('click', function(){
			//decrease month
			div_01_div_01_div_00.set_schedule.month = Modulo(div_01_div_01_div_00.set_schedule.month - 2,12) + 1;
			div_01_div_01_div_00.querySelectorAll('.div-00-div-00-div-00-div-01-div-01-div-00')[0].innerHTML = Zerofill(div_01_div_01_div_00.set_schedule.month,2);
		});
		div_01_div_01_div_00.querySelectorAll('.btn-00-div-00-div-00-div-01-div-01-div-00')[1].addEventListener('click', function(){
			//increase day
			div_01_div_01_div_00.set_schedule.day = Modulo(div_01_div_01_div_00.set_schedule.day,31)+1;
			div_01_div_01_div_00.querySelectorAll('.div-00-div-00-div-00-div-01-div-01-div-00')[1].innerHTML = Zerofill(div_01_div_01_div_00.set_schedule.day,2);
		});
		div_01_div_01_div_00.querySelectorAll('.btn-01-div-00-div-00-div-01-div-01-div-00')[1].addEventListener('click', function(){
			//decrease day
			div_01_div_01_div_00.set_schedule.day = Modulo(div_01_div_01_div_00.set_schedule.day - 2,31) + 1;
			div_01_div_01_div_00.querySelectorAll('.div-00-div-00-div-00-div-01-div-01-div-00')[1].innerHTML = Zerofill(div_01_div_01_div_00.set_schedule.day,2);
		});
		div_01_div_01_div_00.querySelectorAll('.btn-00-div-00-div-00-div-01-div-01-div-00')[2].addEventListener('click', function(){
			//increase year
			div_01_div_01_div_00.set_schedule.year = div_01_div_01_div_00.set_schedule.year + 1;
			div_01_div_01_div_00.querySelectorAll('.div-00-div-00-div-00-div-01-div-01-div-00')[2].innerHTML = Zerofill(div_01_div_01_div_00.set_schedule.year,4);
		});
		div_01_div_01_div_00.querySelectorAll('.btn-01-div-00-div-00-div-01-div-01-div-00')[2].addEventListener('click', function(){
			//decrease year
			div_01_div_01_div_00.set_schedule.year = div_01_div_01_div_00.set_schedule.year - 1;
			div_01_div_01_div_00.querySelectorAll('.div-00-div-00-div-00-div-01-div-01-div-00')[2].innerHTML = Zerofill(div_01_div_01_div_00.set_schedule.year,4);
		});
		
		div_01_div_01_div_00.querySelectorAll('.btn-00-div-00-div-01-div-01-div-01-div-00')[0].addEventListener('click', function(){
			//increase hours
			div_01_div_01_div_00.set_schedule.hour = Modulo(div_01_div_01_div_00.set_schedule.hour + 1,24);
			div_01_div_01_div_00.querySelectorAll('.div-00-div-00-div-01-div-01-div-01-div-00')[0].innerHTML = Zerofill(div_01_div_01_div_00.set_schedule.hour,2);
		});
		div_01_div_01_div_00.querySelectorAll('.btn-01-div-00-div-01-div-01-div-01-div-00')[0].addEventListener('click', function(){
			//decrease hours
			div_01_div_01_div_00.set_schedule.hour = Modulo(div_01_div_01_div_00.set_schedule.hour - 1,24);
			div_01_div_01_div_00.querySelectorAll('.div-00-div-00-div-01-div-01-div-01-div-00')[0].innerHTML = Zerofill(div_01_div_01_div_00.set_schedule.hour,2);
		});
		div_01_div_01_div_00.querySelectorAll('.btn-00-div-00-div-01-div-01-div-01-div-00')[1].addEventListener('click', function(){
			//increase minutes
			div_01_div_01_div_00.set_schedule.minutes = Modulo(div_01_div_01_div_00.set_schedule.minutes + 1,60);
			div_01_div_01_div_00.querySelectorAll('.div-00-div-00-div-01-div-01-div-01-div-00')[1].innerHTML = Zerofill(div_01_div_01_div_00.set_schedule.minutes,2);
		});
		div_01_div_01_div_00.querySelectorAll('.btn-01-div-00-div-01-div-01-div-01-div-00')[1].addEventListener('click', function(){
			//decrease minutes
			div_01_div_01_div_00.set_schedule.minutes = Modulo(div_01_div_01_div_00.set_schedule.minutes - 1,60);
			div_01_div_01_div_00.querySelectorAll('.div-00-div-00-div-01-div-01-div-01-div-00')[1].innerHTML = Zerofill(div_01_div_01_div_00.set_schedule.minutes,2);
		});
		
		
		//remove site dialog
		div_02_div_01_div_00.querySelector('#btn-00-div-02-div-01-div-00').addEventListener('click', function(){
			RemoveSite(div_02_div_01_div_00.focus_site);
		});
		//cancel site removal
		div_02_div_01_div_00.querySelector('#btn-01-div-02-div-01-div-00').addEventListener('click', function(){
			div_02_div_01_div_00.focus_site = null;
			div_01_div_00.style.display = 'none';
			div_02_div_01_div_00.style.display = 'none';
			html.style.overflow = '';
		});
		
		//close dialogs if clicked outside box
		div_01_div_00.addEventListener('click', function(e){
			if(e.target.id === 'div-01-div-00'){
				div_00_div_01_div_00.focus_site = null;
				div_00_div_01_div_00.style.display = 'none';
				div_01_div_01_div_00.focus_site = null;
				div_01_div_01_div_00.style.display = 'none';
				div_02_div_01_div_00.focus_site = null;
				div_02_div_01_div_00.style.display = 'none';
				html.style.overflow = '';
				div_01_div_00.style.display = 'none';
			}
		});
	}
	
	function Modulo(x, n){
		return ((x%n)+n)%n;
	}
	
	function GetTimestamp(time){
		//make and set new date object
		var date = new Date(Date.UTC(time.year, (time.month - 1), time.day, time.hour, time.minutes, 0, 0));
		
		return (Math.floor((date.getTime())/1000) + 3600 * 8);
	}
	
	function ScheduleSite(site, schedule_ts){
		//hide delete window
		div_01_div_00.style.display = 'none';
		div_02_div_01_div_00.style.display = 'none';
		html.style.overflow = '';
					
		//do xhr to remove site

		//make object, and submit
		var xhr = new XMLHttpRequest();
		var url = DOCUMENT_ROOT + 'processes/site-action.php';

		xhr.open('POST', url, true);
		xhr.setRequestHeader("Content-Type", "application/json");	
		xhr.setRequestHeader("Site-Id", site.id);		
		xhr.setRequestHeader("Site-Schedule-Timestamp", schedule_ts);		
		xhr.setRequestHeader("Site-Action", 2);		
		xhr.send();

		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				//force refresh of aside
				UPDATE_SITE_COUNTERS = true;
				//if not in search
				if(btn_00_asd_00_div_00_div_00.state === 0){
					//remove child
					site.obj.parentElement.removeChild(site.obj);
					//decrease all counters
					current_sites_retrieved--;
					last_sites_retrieved--;
					current_sites_visible--;
					last_sites_visible--;
					//shift down sites on main sites array
					var shift = false;
					for(var i = 0; i < sites.length; i++){
						if(shift === false){
							if(sites[i].id === site.id){
								shift = true;
							}
						} else {
							if(i > 0){
								sites[i - 1] = sites[i];
							}
						}
					}
				} else {
					//remove child
					site.obj.parentElement.removeChild(site.obj);

					//decrease all counters
					current_sites_retrieved--;
					last_sites_retrieved--;
					current_sites_visible--;
					last_sites_visible--;
					//shift down sites on main site list
					var shift_j = false;
					for(var j = 0; j < sites.length; j++){
						if(shift_j === false){
							if(sites[j].id === site.id){
								//remove from non search object
								div_01_div_00_div_00.removeChild(sites[j].obj);
								shift_j = true;
							}
						} else {
							if(j > 0){
								sites[j - 1] = sites[j];
							}
						}
					}
					//shift down sites on search site list
					var shift_k = false;
					for(var k = 0; k < sites_search.length; k++){
						if(shift_k === false){
							if(sites_search[k].id === site.id){
								shift_k = true;
							}
						} else {
							if(k > 0){
								sites_search[k - 1] = sites_search[k];
							}
						}
					}
					
					sites_search.length --;
					
					//check if empty search
					//if there are no sites meeting the criteria, reveal no sites image
					if(sites_search.length === 0){
						document.querySelector('#div-02-div-00-div-00').style.display = '';
						document.querySelector('#div-03-div-00-div-00').style.display = 'none';
					}
				}
			}
		};
	}
	
	function RemoveSite(site){
		//hide delete window
		div_01_div_00.style.display = 'none';
		div_02_div_01_div_00.style.display = 'none';
		html.style.overflow = '';
		
		//do xhr to remove site

		//make object, and submit
		var xhr = new XMLHttpRequest();
		var url = DOCUMENT_ROOT + 'processes/site-action.php';

		xhr.open('POST', url, true);
		xhr.setRequestHeader("Content-Type", "application/json");	
		xhr.setRequestHeader("Site-Id", site.id);		
		xhr.setRequestHeader("Site-Action", 0);		
		xhr.send();

		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				//force refresh of aside
				UPDATE_SITE_COUNTERS = true;
				//if not in search
				if(btn_00_asd_00_div_00_div_00.state === 0){
					//remove child
					site.obj.parentElement.removeChild(site.obj);
					//decrease all counters
					current_sites_retrieved--;
					last_sites_retrieved--;
					current_sites_visible--;
					last_sites_visible--;
					//shift down sites on main sites array
					var shift = false;
					for(var i = 0; i < sites.length; i++){
						if(shift === false){
							if(sites[i].id === site.id){
								shift = true;
							}
						} else {
							if(i > 0){
								sites[i - 1] = sites[i];
							}
						}
					}
				} else {
					//remove child
					site.obj.parentElement.removeChild(site.obj);

					//decrease all counters
					current_sites_retrieved--;
					last_sites_retrieved--;
					current_sites_visible--;
					last_sites_visible--;
					//shift down sites on main site list
					var shift_j = false;
					for(var j = 0; j < sites.length; j++){
						if(shift_j === false){
							if(sites[j].id === site.id){
								//remove from non search object
								div_01_div_00_div_00.removeChild(sites[j].obj);
								shift_j = true;
							}
						} else {
							if(j > 0){
								sites[j - 1] = sites[j];
							}
						}
					}
					//shift down sites on search site list
					var shift_k = false;
					for(var k = 0; k < sites_search.length; k++){
						if(shift_k === false){
							if(sites_search[k].id === site.id){
								shift_k = true;
							}
						} else {
							if(k > 0){
								sites_search[k - 1] = sites_search[k];
							}
						}
					}
					
					sites_search.length --;
					
					//check if empty search
					//if there are no sites meeting the criteria, reveal no sites image
					if(sites_search.length === 0){
						document.querySelector('#div-02-div-00-div-00').style.display = '';
						document.querySelector('#div-03-div-00-div-00').style.display = 'none';
					}
				}
			}
		};
	}
	
	
	function Initialisation(){
		
		//vars
		startTime = new Date().getTime();
		time = {start : startTime, now : startTime, deltaTime : 0};
		scrollY = 0;
		
		div_00 = document.querySelector('#div-00');
		
		
		div_01_div_00_div_00 = document.querySelector('#div-01-div-00-div-00');
		t_div_00_div_01_div_00_div_00 = document.querySelector('.t-div-00-div-01-div-00-div-00');
		
		div_03_div_00_div_00 = document.querySelector('#div-03-div-00-div-00');


		InitialiseDialogs();
		
		sites = [];
		sites_search = [];
		
		SearchInitialisation();
		
		//if there are no sites
		if(SITE_COUNT === 0){
			document.querySelector('#div-00-div-00-div-00').style.display = '';
			document.querySelector('#div-01-div-00-div-00').style.display = 'none';
		}
		
	}

	Main();
}

ManageSites_js();