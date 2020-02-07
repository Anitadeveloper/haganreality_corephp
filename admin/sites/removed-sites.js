// JavaScript Document
/*jshint esversion: 6 */ 

function RemovedSites_js () {
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
			if(loading === true && document.body.id === "removed-sites"){
				Initialisation();
				loading = false;
			}
			
			if(startTime !== undefined && document.body.id === "removed-sites"){
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
			site.scroll_dist = Math.max(site.querySelector('.div-00-div-00-div-00-div-01-div-00-div-00').clientHeight/site.querySelector('.div-00-div-00-div-01-div-00-div-00').clientHeight - 1,0);
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
			site.scroll_dist = Math.max(site.querySelector('.div-00-div-00-div-00-div-01-div-00-div-00').clientHeight/site.querySelector('.div-00-div-00-div-01-div-00-div-00').clientHeight - 1,0);
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
	
	function site(id = '', name = '', url = '', delete_ts = '', obj = null){
		this.id = id;
		this.name = name;
		this.url = url;
		this.parameter = '';
		this.delete_ts = delete_ts;
		this.obj = obj;
	}

	
	function getObj(min, max, search = ''){
		//the min and max article wanted in order
		this.minimum = min;
		this.maximum = max;
		//0 if scheduled sites, 1 if active, 2 is deleted
		this.state = 2;
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
					sites[i + last_sites_retrieved].parameter = retrieved_sites[i].parameter;
					sites[i + last_sites_retrieved].delete_ts = retrieved_sites[i].delete_ts;
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
	
	function SetSite(site){
		site.obj.className = 'div-00-div-01-div-00-div-00';
		site.obj.querySelector('.lbl-00-div-00-div-00-div-01-div-00-div-00').childNodes[0].nodeValue = DateFormat(new Date(site.delete_ts * 1000));
		site.obj.querySelector('.h3-00-div-01-div-00-div-01-div-00-div-00').innerHTML = site.name;
		site.obj.querySelector('.h4-00-div-01-div-00-div-01-div-00-div-00').innerHTML = site.url;
		
		SitePreviewHover(site.obj);
		
		site.obj.querySelector('.div-00-div-00-div-01-div-00-div-00').addEventListener('click', function(){
			window.open(DOCUMENT_ROOT + 'property/' + site.parameter);
		});
		
		//initialise buttons
		SetSiteActions(site);
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
	
	function SetSiteActions(site){
		//restore button
		site.obj.querySelector('.btn-00-div-01-div-00-div-01-div-00-div-00').addEventListener('click', function(){
			div_01_div_00.style.display = '';
			div_00_div_01_div_00.style.display = '';
			html.style.overflow = 'hidden';
			div_00_div_01_div_00.focus_site = site;
			div_00_div_01_div_00.querySelector('label').innerHTML = 'Restore ' + site.name + '?';
		});
		
		//permanently remove button
		site.obj.querySelector('.btn-01-div-01-div-00-div-01-div-00-div-00').addEventListener('click', function(){
			div_01_div_00.style.display = '';
			div_01_div_01_div_00.style.display = '';
			html.style.overflow = 'hidden';
			div_01_div_01_div_00.focus_site = site;
			div_01_div_01_div_00.querySelector('label').innerHTML = 'Permanently Delete ' + site.name + '?';
		});
	}
	
	function DateFormat(date){
		var time_since = time.start - date;
		if(time_since < 120000){
			return 'Just Now';
		} else if(time_since < 3600000){
			return (Math.ceil(time_since/60000)) + ' minutes ago';
		} else if(time_since < 86400000){
			return (Math.ceil(time_since/3600000)) + ' hours ago';
		} else {
			var set_date = Zerofill(date.getDate() + 1,2) + '/' + Zerofill(date.getMonth() + 1,2) + '/' + Zerofill(date.getFullYear(),4);
			return set_date;
		}
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
					sites_search[i] = new site(retrieved_sites[i].id, retrieved_sites[i].name, retrieved_sites[i].url, retrieved_sites[i].delete_ts, template);
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
		
		//restore site dialog
		div_00_div_01_div_00.querySelector('#btn-00-div-00-div-01-div-00').addEventListener('click', function(){
			SiteAction(1, div_00_div_01_div_00.focus_site);
		});
		//cancel site restore
		div_00_div_01_div_00.querySelector('#btn-01-div-00-div-01-div-00').addEventListener('click', function(){
			div_00_div_01_div_00.focus_site = null;
			div_01_div_00.style.display = 'none';
			div_00_div_01_div_00.style.display = 'none';
			html.style.overflow = '';
		});
		
		//permanently remove site dialog
		div_01_div_01_div_00.querySelector('#btn-00-div-01-div-01-div-00').addEventListener('click', function(){
			SiteAction(3, div_01_div_01_div_00.focus_site);
		});
		//cancel site permanent removal
		div_01_div_01_div_00.querySelector('#btn-01-div-01-div-01-div-00').addEventListener('click', function(){
			div_01_div_01_div_00.focus_site = null;
			div_01_div_00.style.display = 'none';
			div_01_div_01_div_00.style.display = 'none';
			html.style.overflow = '';
		});
		
		//close dialogs if clicked outside box
		div_01_div_00.addEventListener('click', function(e){
			if(e.target.id === 'div-01-div-00'){
				div_00_div_01_div_00.focus_site = null;
				div_00_div_01_div_00.style.display = 'none';
				div_01_div_01_div_00.focus_site = null;
				div_01_div_01_div_00.style.display = 'none';
				html.style.overflow = '';
				div_01_div_00.style.display = 'none';
			}
		});
	}
	
	function SiteAction(action, site){
		div_01_div_00.style.display = 'none';
		div_01_div_01_div_00.style.display = 'none';
		html.style.overflow = '';
		
		//do xhr to remove site
		//make object, and submit
		var xhr = new XMLHttpRequest();
		var url = DOCUMENT_ROOT + 'processes/site-action.php';

		xhr.open('POST', url, true);
		xhr.setRequestHeader("Content-Type", "application/json");	
		xhr.setRequestHeader("Site-Id", site.id);		
		xhr.setRequestHeader("Site-Action", action);		
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
		
		sites = [];
		sites_search = [];
	
		InitialiseDialogs();
		
		SearchInitialisation();
		
		//if there are no sites
		if(SITE_COUNT === 0){
			document.querySelector('#div-00-div-00-div-00').style.display = '';
			document.querySelector('#div-01-div-00-div-00').style.display = 'none';
		}
		
	}

	Main();
}

RemovedSites_js();