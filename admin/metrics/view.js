// JavaScript Document

function View_js () {
	"use strict";
	var startTime;
	var time;
	var scroll_y;
	var mouse_pos;
	var load = true;
	
	var metric_call_time;
		
	var asd_00_div_00 = document.querySelector('#asd-00-div-00');
	var div_01_div_00_div_00 = document.querySelector('#div-01-div-00-div-00');
	var div_00_div_01_div_00_div_00 = document.querySelector('#div-00-div-01-div-00-div-00');
	var div_01_div_01_div_00_div_00 = document.querySelector('#div-01-div-01-div-00-div-00');
	var spn_00_div_02_div_01_div_00_div_00 = document.querySelector('#spn-00-div-02-div-01-div-00-div-00');
	var div_04_div_01_div_00_div_00 = document.querySelector('#div-04-div-01-div-00-div-00');
	var div_06_div_01_div_00_div_00 = document.querySelector('#div-06-div-01-div-00-div-00');
	var div_05_div_01_div_00_div_00 = document.querySelector('#div-05-div-01-div-00-div-00');
	spn_00_div_02_div_01_div_00_div_00.last_hovered = -1;
	spn_00_div_02_div_01_div_00_div_00.timeout = '';
	div_01_div_00_div_00.set = true;
	var div_03_div_00_div_00 = document.querySelector('#div-03-div-00-div-00');
	div_03_div_00_div_00.markers = [];
	div_03_div_00_div_00.worker = [];
	
	var site_id = 3;

	var site_metrics = [];

	var statePieColor = ['#6F57FF', '#8975ff', '#9d8cff', '#9499ff', '#8ca7ff', '#a1c0ff', 'rgb(240,240,240)'];
	
	var devicePieColor = ['#bd4dfa', '#b574f2', '#ce91ff'];
		
	function Main(){
		window.requestAnimationFrame(function(timestamp){
			if(load === true && document.body.id === "view-metrics"){
				Initialisation();
				load = false;
			}
			
			if(startTime !== undefined && document.body.id === "view-metrics"){
				time.deltaTime = time.start + timestamp - time.now;
				time.now = time.start + timestamp;

			}
			
			Main();
		});
	}
	
	function AsideScrolling(){
		
		window.onscroll = function(){
			
			scroll_y = window.pageYOffset || document.documentElement.scrollTop || window.scrollY;
						
			asd_00_div_00.style.top = 150 - Math.max(window.innerHeight - document.querySelector('#a-foo-00').getBoundingClientRect().top, 0) + 'px';
		}
	}
	
	function Initialisation(){
		
		//vars
		startTime = new Date().getTime();
		time = {start : startTime, now : startTime, deltaTime : 0};
		scroll_y = 0;
		mouse_pos = {x: 0, y: 0};
		
		AsideXHR();
		
		AsideSearch();
		
		AsideScrolling();
		
		MapSectionInitialisation();

		MapFilterInitialisation();

		document.addEventListener('mousemove', function(e){
			spn_00_div_02_div_01_div_00_div_00.style.top = e.clientY - document.querySelector('#div-02-div-01-div-00-div-00').getBoundingClientRect().top + 'px';
			spn_00_div_02_div_01_div_00_div_00.style.left = e.clientX - document.querySelector('#div-02-div-01-div-00-div-00').getBoundingClientRect().left + 'px';
		});
	}
	
	function LoadMetrics(){

		SetViewGraph();

		SetStatePie();

		SetGeneral();

		SetDevicePie();

		SetReferrer();

		SetBounceGraph();

		SetRecurringGraph();

	}
	
	
	
	function MapFilterInitialisation(){
		
		var div_02_div_00 = document.querySelector('#div-02-div-00');
				
		document.querySelector('#btn-00-div-02-div-00-div-00').addEventListener('click', function(){
			//reveal filter box and prevent doc scrolling
			div_02_div_00.style.display = '';
			div_02_div_00.querySelector('#div-00-div-02-div-00').style.display = '';
			document.body.overflow = 'hidden';
		});
		
		div_02_div_00.querySelector('#div-00-div-02-div-00 svg').addEventListener('click', function(){
			//reveal filter box and prevent doc scrolling
			div_02_div_00.style.display = 'none';
			div_02_div_00.querySelector('#div-00-div-02-div-00').style.display = 'none';
			document.body.overflow = '';
		});
		
		
		//calendar initialisation
		
		
		//dropdown initialisations
		
		
	}
	
	
	
	function SetReferrer(){
		
		var data = SortReferrerListData(site_metrics[site_id].visitors);
		
		SetReferrerList(data);

		
	}
	
	function SetStatePie(){
		
		var data = SortStatePieData(site_metrics[site_id].visitors);
		
		SetStatePieList(data);
		
		SetStatePieChart(data);
		
	}
	
	function SetStatePieList(data){
		
		var remove = document.querySelectorAll('#div-00-div-02-div-01-div-00-div-00 div');
		
		for(let i = 0; i < remove.length; i++){
			remove[i].parentNode.removeChild(remove[i]);
		}
		
		var data_total = 0;
		
		for(let i = 0; i < data.length; i++){
			data_total += data[i].count;
		}
		
		//display top 3 list
		var len = Math.min(data.length, 3);
		for(let i = 0; i < len; i++){
			var el = document.createElement('div');
			el.appendChild(document.createElement('span'));
			el.appendChild(document.createElement('label'));
			el.appendChild(document.createElement('label'));
			el.querySelector('span').style.backgroundColor = '#6F57FF';
			el.querySelectorAll('label')[0].innerHTML = data[i].region;
			el.querySelectorAll('label')[1].innerHTML = addZeroes((Math.round(data[i].count/data_total * 10000)/100)) + '%';
			el.querySelector('span').style.backgroundColor = statePieColor[i];
			document.querySelector('#div-00-div-02-div-01-div-00-div-00').appendChild(el);
		}
		
	}
	
	function SetStatePieChart(data){
		
		var remove = document.querySelectorAll('#div-02-div-01-div-00-div-00 svg path');
		
		for(let i = 0; i < remove.length; i++){
			remove[i].parentNode.removeChild(remove[i]);
		}
		
		var data_total = 0;
		
		for(let i = 0; i < data.length; i++){
			data_total += data[i].count;
		}
		
		var last_ratio = 0;
		var el_paint = [];
		//set first 5, rest is set to other
		var len = Math.min(data.length, 6);
		for(let i = 0; i < len; i++){
			var ratio = data[i].count/data_total + last_ratio;
			var angle = ratio * Math.PI * 2;
			var px = Math.sin(angle) * 35 + 50;
			var py = 50 - Math.cos(angle) * 35;
			var last_angle = (last_ratio - 0.01) * Math.PI * 2;
			var last_px = Math.sin(last_angle) * 35 + 50;
			var last_py = 50 - Math.cos(last_angle) * 35;
			var d = '';
			if(ratio > 0.5 && i === 0){
				d = 'M ' + last_px + ' ' + last_py + ' A 35 35 0 0 1 50 85 A 35 35 0 0 1 ' + px + ' ' + py;
			} else {
				d = 'M ' + last_px + ' ' + last_py + ' A 35 35 0 0 1 ' + px + ' ' + py;
			}
			var el = document.createElementNS("http://www.w3.org/2000/svg", "path");
			el.style.stroke = statePieColor[i];
			el.setAttribute('d', d);
			el.region = data[i].region;
			last_ratio = ratio;
			el_paint[el_paint.length] = el;
		}
		
		//if there are lots of other regions
		if(len < data.length){
			var ratio = 1;
			var angle = ratio * Math.PI * 2;
			var px = Math.sin(angle) * 35 + 50;
			var py = 50 - Math.cos(angle) * 35;
			var last_angle = (last_ratio - 0.01) * Math.PI * 2;
			var last_px = Math.sin(last_angle) * 35 + 50;
			var last_py = 50 - Math.cos(last_angle) * 35;
			if(1 - last_ratio > 0.5){
				d = 'M ' + last_px + ' ' + last_py + ' A 35 35 0 0 1 50 85 A 35 35 0 0 1 ' + px + ' ' + py;
			} else {
				d = 'M ' + last_px + ' ' + last_py + ' A 35 35 0 0 1 ' + px + ' ' + py;
			}
			var el = document.createElementNS("http://www.w3.org/2000/svg", "path");
			el.style.stroke = statePieColor[statePieColor.length - 1];
			el.setAttribute('d', d);
			el.region = 'Other';
			el_paint[el_paint.length] = el;
		}
		
		for(let i = el_paint.length - 1; i >= 0; i--){
			document.querySelector('#div-02-div-01-div-00-div-00 svg').appendChild(el_paint[i]);
			StatePieHoverListener(el_paint[i], i);
		}
	}
	
	function StatePieHoverListener(el, i){
		el.addEventListener('mouseover', function(){
			var svg = document.querySelector('#div-02-div-01-div-00-div-00 svg');
			clearTimeout(spn_00_div_02_div_01_div_00_div_00.timeout);
			spn_00_div_02_div_01_div_00_div_00.style.display = '';
			spn_00_div_02_div_01_div_00_div_00.clientHeight;
			spn_00_div_02_div_01_div_00_div_00.style.opacity = 0.9;
			spn_00_div_02_div_01_div_00_div_00.innerText = el.region;
			spn_00_div_02_div_01_div_00_div_00.last_hovered = i;
			el.style.filter = 'brightness(0.85)';
		});
		
		el.addEventListener('mouseout', function(){
			if(spn_00_div_02_div_01_div_00_div_00.last_hovered === i){
				spn_00_div_02_div_01_div_00_div_00.style.opacity = 0;
				spn_00_div_02_div_01_div_00_div_00.timeout = setTimeout(function(){
					spn_00_div_02_div_01_div_00_div_00.style.display = 'none';
				},500);
				el.style.filter = '';
			}
		});
	}
	
	
	
	
	function SetGeneral(){
		
		var data = SortGeneralData(site_metrics[site_id].log);
		
		SetGeneralData(data);
				
	}
	
	function SetGeneralData(data){
		
		var h5 = div_04_div_01_div_00_div_00.querySelectorAll('h5');
		
		h5[0].innerHTML = data.active_users;
		h5[1].innerHTML = Math.round(data.page_views_hourly * 100)/100;
		h5[2].innerHTML = MinuteFormat(data.average_visit);
		
	}
	
	
	
	
	function SetDevicePie(){
		
		var data = SortDevicePieData(site_metrics[site_id].visitors);
		
		SetDevicePieList(data);
		
		SetDevicePieChart(data);
		
	}
	
	function SetDevicePieList(data){
		
		var remove = document.querySelectorAll('#div-00-div-03-div-01-div-00-div-00 div');
		
		for(let i = 0; i < remove.length; i++){
			remove[i].parentNode.removeChild(remove[i]);
		}
		
		var data_total = 0;
		
		for(let i = 0; i < data.length; i++){
			data_total += data[i].count;
		}
		
		//display top 3 list
		var len = Math.min(data.length, 3);
		for(let i = 0; i < len; i++){
			var el = document.createElement('div');
			el.appendChild(document.createElement('span'));
			el.appendChild(document.createElement('label'));
			el.appendChild(document.createElement('label'));
			el.querySelector('span').style.backgroundColor = '#6F57FF';
			el.querySelectorAll('label')[0].innerHTML = data[i].device_type;
			el.querySelectorAll('label')[1].innerHTML = addZeroes((Math.round(data[i].count/data_total * 10000)/100)) + '%';
			el.querySelector('span').style.backgroundColor = devicePieColor[i];
			document.querySelector('#div-00-div-03-div-01-div-00-div-00').appendChild(el);
		}
		
	}
	
	function SetDevicePieChart(data){
		
		var remove = document.querySelectorAll('#div-03-div-01-div-00-div-00 svg path');
		
		for(let i = 0; i < remove.length; i++){
			remove[i].parentNode.removeChild(remove[i]);
		}
		
		var data_total = 0;
		
		for(let i = 0; i < data.length; i++){
			data_total += data[i].count;
		}
		
		var last_ratio = 0;
		var el_paint = [];
		//set first 5, rest is set to other
		var len = Math.min(data.length, 6);
		for(let i = 0; i < len; i++){
			var ratio = data[i].count/data_total + last_ratio;
			var angle = ratio * Math.PI * 2;
			var px = Math.sin(angle) * 35 + 50;
			var py = 50 - Math.cos(angle) * 35;
			var last_angle = last_ratio * Math.PI * 2;
			var last_px = Math.sin(last_angle) * 35 + 50;
			var last_py = 50 - Math.cos(last_angle) * 35;
			var d = '';
			if(ratio > 0.5 && i === 0){
				d = 'M ' + last_px + ' ' + last_py + ' A 35 35 0 0 1 50 85 A 35 35 0 0 1 ' + px + ' ' + py;
			} else {
				d = 'M ' + last_px + ' ' + last_py + ' A 35 35 0 0 1 ' + px + ' ' + py;
			}
			var el = document.createElementNS("http://www.w3.org/2000/svg", "path");
			el.style.stroke = devicePieColor[i];
			el.setAttribute('d', d);
			el.device_type = data[i].device_type;
			last_ratio = ratio;
			el_paint[el_paint.length] = el;
		}
		
		//if there are lots of other device types
		if(len < data.length){
			var ratio = 1;
			var angle = ratio * Math.PI * 2;
			var px = Math.sin(angle) * 35 + 50;
			var py = 50 - Math.cos(angle) * 35;
			var last_angle = last_ratio * Math.PI * 2;
			var last_px = Math.sin(last_angle) * 35 + 50;
			var last_py = 50 - Math.cos(last_angle) * 35;
			if(1 - last_ratio > 0.5){
				d = 'M ' + last_px + ' ' + last_py + ' A 35 35 0 0 1 50 85 A 35 35 0 0 1 ' + px + ' ' + py;
			} else {
				d = 'M ' + last_px + ' ' + last_py + ' A 35 35 0 0 1 ' + px + ' ' + py;
			}
			var el = document.createElementNS("http://www.w3.org/2000/svg", "path");
			el.style.stroke = devicePieColor[devicePieColor.length - 1];
			el.setAttribute('d', d);
			el.device_type = 'Other';
			el_paint[el_paint.length] = el;
		}
		
		for(let i = el_paint.length - 1; i >= 0; i--){
			document.querySelector('#div-03-div-01-div-00-div-00 svg').appendChild(el_paint[i]);
			DevicePieHoverListener(el_paint[i], i);
		}
	}
	
	function DevicePieHoverListener(el, i){
		el.addEventListener('mouseover', function(){
			var svg = document.querySelector('#div-03-div-01-div-00-div-00 svg');
			clearTimeout(spn_00_div_02_div_01_div_00_div_00.timeout);
			spn_00_div_02_div_01_div_00_div_00.style.display = '';
			spn_00_div_02_div_01_div_00_div_00.clientHeight;
			spn_00_div_02_div_01_div_00_div_00.style.opacity = 0.9;
			spn_00_div_02_div_01_div_00_div_00.innerText = el.device_type;
			spn_00_div_02_div_01_div_00_div_00.last_hovered = i;
			el.style.filter = 'brightness(0.85)';
		});
		
		el.addEventListener('mouseout', function(){
			if(spn_00_div_02_div_01_div_00_div_00.last_hovered === i){
				spn_00_div_02_div_01_div_00_div_00.style.opacity = 0;
				spn_00_div_02_div_01_div_00_div_00.timeout = setTimeout(function(){
					spn_00_div_02_div_01_div_00_div_00.style.display = 'none';
				},500);
				el.style.filter = '';
			}
		});
	}
	
	

	
	function SetReferrerList(data){
		
		var remove = document.querySelectorAll('#div-07-div-01-div-00-div-00 span');
		
		for(let i = 0; i < remove.length; i++){
			remove[i].parentNode.removeChild(remove[i]);
		}
		
		var data_total = 0;
		
		for(let i = 0; i < data.length; i++){
			data_total += data[i].count;
		}
		//display top 3 list
		var len = Math.min(data.length, 7);
		for(let i = 0; i < len; i++){
			var el = document.createElement('span');
			el.appendChild(document.createElement('label'));
			el.appendChild(document.createElement('label'));
			el.querySelectorAll('label')[0].innerHTML = data[i].domain;
			el.querySelectorAll('label')[1].innerHTML = data[i].count;
			if(Modulo(i,2) === 1){
				el.className = 'dark';
			}
			document.querySelector('#div-07-div-01-div-00-div-00').appendChild(el);
		}
		
	}
	

	function addZeroes(num) {
		// Convert input string to a number and store as a variable.
		var value = num;      
		// Split the input string into two arrays containing integers/decimals
		var res = num.toString().split(".");     
		// If there is no decimal point or only one decimal place found.
		if(res.length == 1 || res[1].length < 3) { 
			// Set the number to two decimal places
			value = value.toFixed(2);
		}
		// Return updated or original number.
		return value;
	}
	
	
	function SortStatePieData(data){
		
		var output = [];
		
		for(var i = 0; i < data.length; i++){
			var added = false;
			for(var j = 0; j < output.length; j++){
				if(output[j].region === data[i].region){
					added = true;
					output[j].count++;
					j = output.length;
				}
			}
			if(added === false){
				output[output.length] = {region: data[i].region, count: 1};
			}
		}
		
		//bubble sort results
		for (let i = 0; i < output.length - 1; i++) {
			var any_swaps = false;
			for (let j = 0; j < output.length - 1; j++) {
				if (output[j].count < output[j + 1].count) {
					let temp = {region: output[j + 1].region, count: output[j + 1].count};
					output[j + 1] = output[j];
					output[j] = temp;
					any_swaps = true;
				}
			}
			//if no swaps occur, it's in order and we stop the algorithm
			if (any_swaps == false) {
				i = output.length;
			}
		}
		
		return output;
		
	}
	
	function SortDevicePieData(data){
		
		var output = [];
		
		for(var i = 0; i < data.length; i++){
			var added = false;
			for(var j = 0; j < output.length; j++){
				if(output[j].device_type === data[i].device_type){
					added = true;
					output[j].count++;
					j = output.length;
				}
			}
			if(added === false && data[i].device_type !== ''){
				output[output.length] = {device_type: data[i].device_type, count: 1};
			}
		}
		
		//bubble sort results
		for (let i = 0; i < output.length - 1; i++) {
			var any_swaps = false;
			for (let j = 0; j < output.length - 1; j++) {
				if (output[j].count < output[j + 1].count) {
					let temp = {device_type: output[j + 1].device_type, count: output[j + 1].count};
					output[j + 1] = output[j];
					output[j] = temp;
					any_swaps = true;
				}
			}
			//if no swaps occur, it's in order and we stop the algorithm
			if (any_swaps == false) {
				i = output.length;
			}
		}
		
		return output;
		
	}
	
	function SortReferrerListData(data){
		
		var output = [];
		
		for(var i = 0; i < data.length; i++){
			var added = false;
			for(var j = 0; j < output.length; j++){
				if(output[j].domain === data[i].referrer.domain){
					added = true;

					output[j].count++;
					
					var added_path = false;
					for(var k = 0; k < output[j].path.length; k++){
						if(output[j].path[k] === data[i].referrer.path){
							added_path = true;
							k = output[j].path.length;
						}
					}
					if(added_path === false){
						output[j].path.push(data[i].referrer.path);
					}
				}
			}
			if(added === false && data[i].referrer.domain !== ''){
				output[output.length] = {domain: data[i].referrer.domain, path: [data[i].referrer.path], count: 1};
			}
		}
		
		//bubble sort results
		for (let i = 0; i < output.length - 1; i++) {
			var any_swaps = false;
			for (let j = 0; j < output.length - 1; j++) {
				if (output[j].count < output[j + 1].count) {
					let temp = {domain: output[j + 1].domain, path: [], count: output[j + 1].count};
					for(let k = 0; k < output[j + 1].path.length; k++){
						temp.path[k] = output[j + 1].path[k];
					}
					output[j + 1] = output[j];
					output[j] = temp;
					any_swaps = true;
				}
			}
			//if no swaps occur, it's in order and we stop the algorithm
			if (any_swaps == false) {
				i = output.length;
			}
		}
		
		return output;
		
	}
	
	function SortGeneralData(data){
				
		var total_visit_time = 0;
		
		var active_users = 0;
		
		var total_users = 0;
		
		var earliest_ts = Infinity;
		
		for(let i = 0; i < data.length; i++){
			//if the last recorded ts is within 3 seconds of the last metric call time, this is a currently active user
			if(data[i].last_ts > metric_call_time - 5){
				active_users++;
			}
			
			total_visit_time += data[i].last_ts - data[i].visit_ts;
			
			total_users++;
			
			earliest_ts = Math.min(earliest_ts, data[i].visit_ts);
		}
				
		return {active_users: active_users, page_views_hourly: (total_users/((time.now/1000 - earliest_ts)/3600)), average_visit: total_visit_time/total_users/60};
		
	}
	
	function SortViewGraphData(log){
		
		var dt = new Date();
		var curr_ts = dt.getTime()/1000;
		
		var data = [];
		
		if(div_00_div_01_div_00_div_00.mode === 0){
			var offset_hour = dt.getSeconds() + (60 * dt.getMinutes());
			data = [0,0,0,0,0,0,0,0,0,0,0,0];
			for(var i = 0; i < log.length; i++){
				//each two hour period
				var iterations = 0;
				while(log[i].visit_ts < curr_ts - offset_hour - 7200 * iterations && iterations <= 12){
					iterations++;
				}
				if(iterations <= 11){
					data[11 - iterations]++;
				}
			}
		} else if(div_00_div_01_div_00_div_00.mode === 1){
			var offset_day = dt.getSeconds() + (60 * dt.getMinutes()) + (60 * 60 * dt.getHours());
			data = [0,0,0,0,0,0,0,0,0,0];
			for(i = 0; i < log.length; i++){
				//each two hour period
				var iterations = 0;
				while(log[i].visit_ts < curr_ts - offset_day - 86400 * iterations && iterations <= 10){
					iterations++;
				}
				if(iterations <= 9){
					data[9 - iterations]++;
				}
			}
		} else if(div_00_div_01_div_00_div_00.mode === 2){
			var offset_day = dt.getSeconds() + (60 * dt.getMinutes()) + (60 * 60 * dt.getHours());
			data = [0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0];
			for(i = 0; i < log.length; i++){
				//each two hour period
				var iterations = 0;
				while(log[i].visit_ts < curr_ts - offset_day - 86400 * iterations && iterations <= 30){
					iterations++;
				}
				if(iterations <= 29){
					data[29 - iterations]++;
				}
			}
		}
		
		return data;
	}
	
	function SortBounceGraphData(log){
		
		var dt = new Date();
		var curr_ts = dt.getTime()/1000;
		
		var data = [];
		var total = [];
		
		if(div_01_div_01_div_00_div_00.mode === 0){
			var offset_hour = dt.getSeconds() + (60 * dt.getMinutes());
			data = [0,0,0,0,0,0,0,0,0,0,0,0];
			total = [0,0,0,0,0,0,0,0,0,0,0,0];
			for(var i = 0; i < log.length; i++){
				//each two hour period
				var iterations = 0;
				while(log[i].visit_ts < curr_ts - offset_hour - 7200 * iterations && iterations <= 12){
					iterations++;
				}
				if(iterations <= 11){
					if(log[i].last_ts - log[i].visit_ts < 5){
						data[11 - iterations]++;
					}
					total[11 - iterations]++;
				}
			}
		} else if(div_01_div_01_div_00_div_00.mode === 1){
			var offset_day = dt.getSeconds() + (60 * dt.getMinutes()) + (60 * 60 * dt.getHours());
			data = [0,0,0,0,0,0,0,0,0,0];
			total = [0,0,0,0,0,0,0,0,0,0];
			for(i = 0; i < log.length; i++){
				//each two hour period
				var iterations = 0;
				while(log[i].visit_ts < curr_ts - offset_day - 86400 * iterations && iterations <= 10){
					iterations++;
				}
				if(iterations <= 9){
					if(log[i].last_ts - log[i].visit_ts < 5){
						data[9 - iterations]++;
					}
					total[9 - iterations]++;
				}
			}
		} else if(div_01_div_01_div_00_div_00.mode === 2){
			var offset_day = dt.getSeconds() + (60 * dt.getMinutes()) + (60 * 60 * dt.getHours());
			data = [0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0];
			total = [0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0 ,0,0,0,0,0,0,0,0,0,0];
			for(i = 0; i < log.length; i++){
				//each two hour period
				var iterations = 0;
				while(log[i].visit_ts < curr_ts - offset_day - 86400 * iterations && iterations <= 30){
					iterations++;
				}
				if(iterations <= 29){
					if(log[i].last_ts - log[i].visit_ts < 5){
						data[29 - iterations]++;
					}
					total[29 - iterations]++;
				}
			}
		}
				
		//turn into percentage
		for(var i = 0; i < data.length; i++){
			if(total[i] > 0){
				data[i] = data[i]/total[i] * 100;
			} else {
				data[i] = 0;
			}
		}
				
		return data;
	}
	
	function SortRecurringGraphData(log){
		
		var dt = new Date();
		var curr_ts = dt.getTime()/1000;
		
		//array containing visitor id, lifetime view time, recurring visits
		var data = [];
		
		if(div_06_div_01_div_00_div_00.mode === 0){
			var offset_hour = dt.getSeconds() + (60 * dt.getMinutes());
			for(var i = 0; i < log.length; i++){
				//if within 24 hours
				if(log[i].visit_ts > curr_ts - offset_hour - 3600 * 22){
					var added = false;
					for(let j = 0; j < data.length; j++){
						if(data[j].visitor_id === log[i].visitor_id){
							added = true;
							data[j].recurring_visits++;
							data[j].lifetime_view_time += (log[i].last_ts - log[i].visit_ts)/60;
						}
					}
					if(added === false){
						data.push({visitor_id: log[i].visitor_id, recurring_visits: 1, lifetime_view_time: (log[i].last_ts - log[i].visit_ts)/60});
					}
				}
			}
		} else if(div_06_div_01_div_00_div_00.mode === 1){
			var offset_day = dt.getSeconds() + (60 * dt.getMinutes()) + (60 * 60 * dt.getHours());
			for(i = 0; i < log.length; i++){
				//each two hour period
				if(log[i].visit_ts > curr_ts - offset_day - 86400 * 9){
					var added = false;
					for(let j = 0; j < data.length; j++){
						if(data[j].visitor_id === log[i].visitor_id){
							added = true;
							data[j].recurring_visits++;
							data[j].lifetime_view_time += (log[i].last_ts - log[i].visit_ts)/60;
						}
					}
					if(added === false){
						data.push({visitor_id: log[i].visitor_id, recurring_visits: 1, lifetime_view_time: (log[i].last_ts - log[i].visit_ts)/60});
					}
				}
			}
		} else if(div_06_div_01_div_00_div_00.mode === 2){
			var offset_day = dt.getSeconds() + (60 * dt.getMinutes()) + (60 * 60 * dt.getHours());
			for(i = 0; i < log.length; i++){
				//each two hour period
				if(log[i].visit_ts > curr_ts - offset_day - 86400 * 28){
					var added = false;
					for(let j = 0; j < data.length; j++){
						if(data[j].visitor_id === log[i].visitor_id){
							added = true;
							data[j].recurring_visits++;
							data[j].lifetime_view_time += (log[i].last_ts - log[i].visit_ts)/60;
						}
					}
					if(added === false){
						data.push({visitor_id: log[i].visitor_id, recurring_visits: 1, lifetime_view_time: (log[i].last_ts - log[i].visit_ts)/60});
					}
				}
			}
		}
		return data;
	}
	
	
	
	
	function SetViewGraph(){
		//graph 1
		div_00_div_01_div_00_div_00.mode = 0;
		//create data array
		var data = SortViewGraphData(site_metrics[site_id].log);
		//pass to function to get high, lows, and steps
		var graph_build = GetGraphSteps(data, 10);
		SetViewGraphAxis(graph_build);
		SetViewGraphData(graph_build, data);

		var btn_00_div_00_div_00_div_01_div_00_div_00 = div_00_div_01_div_00_div_00.querySelectorAll('#div-00-div-00-div-01-div-00-div-00 button');
		// event listeners for all buttons
		for(var i = 0; i < btn_00_div_00_div_00_div_01_div_00_div_00.length; i++){
			ViewGraphModeClickListener(btn_00_div_00_div_00_div_01_div_00_div_00, i);
		}
	}
	
	function ViewGraphModeClickListener(els, mode){
		els[mode].addEventListener('click', function(site_id){
			els[div_00_div_01_div_00_div_00.mode].className = '';
			div_00_div_01_div_00_div_00.mode = mode;
			els[mode].className = 'active';
			var data = SortViewGraphData(site_metrics[site_id].log);
			var graph_build = GetGraphSteps(data, 10);
			SetViewGraphAxis(graph_build);
			SetViewGraphData(graph_build, data);
		});
	}
	
	function SetViewGraphAxis(graph_build){
		
		var remove = document.querySelectorAll('#div-00-div-01-div-00-div-00 svg .graph-lines');
		
		for(let i = 0; i < remove.length; i++){
			remove[i].parentNode.removeChild(remove[i]);
		}
		
		var intervals = (graph_build.max - graph_build.min)/graph_build.step;
		var y_dist = 400/intervals;
		var d_string = 'M 75 50 L 875 50 ';
		for(var i = 1; i <= intervals; i++){
			d_string += 'M 75 ' + (i * y_dist + 50) + ' L 875 ' + (i * y_dist + 50) + ' ';
		}
		var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
		path.setAttribute('d', d_string);
		path.setAttribute('class', 'graph-lines');
		div_00_div_01_div_00_div_00.querySelector('svg').appendChild(path);
		//set labels
		var y_labels = div_00_div_01_div_00_div_00.querySelectorAll('.y');
		for(i = 0; i < y_labels.length; i++){
			y_labels[i].parentNode.removeChild(y_labels[i]);
		}
		for(i = 0; i <= intervals; i++){
			var text_value = Math.round((graph_build.step * i + graph_build.min) * 1000)/1000;
			
			if(text_value === Math.round(text_value)){
				var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
				text.setAttribute('class', 'y');
				text.setAttribute('x', 70);
				text.setAttribute('y', (y_dist * (intervals - i) + 50));
				text.innerHTML = text_value;
				div_00_div_01_div_00_div_00.querySelector('svg').appendChild(text);
			}
		}
		
		
		var x_labels = div_00_div_01_div_00_div_00.querySelectorAll('.x');
		for(i = 0; i < x_labels.length; i++){
			x_labels[i].parentNode.removeChild(x_labels[i]);
		}
		
		var dt = new Date();
		var curr_ts = dt.getTime()/1000;
		var offset_hour = dt.getSeconds() + (60 * dt.getMinutes());
		var offset_day = dt.getSeconds() + (60 * dt.getMinutes()) + (60 * 60 * dt.getHours());
		
		if(div_00_div_01_div_00_div_00.mode === 0){
			
			for(i = 0; i <= 11; i++){
				var dt = new Date((curr_ts - offset_hour - 7200 * (11 - i)) * 1000); 
				var hour = dt.getHours();
				
				var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
				text.setAttribute('class', 'x');
				text.setAttribute('x', 115 + (720/11) * i);
				text.setAttribute('y', 460);
				text.innerHTML = hour + ':00';
				div_00_div_01_div_00_div_00.querySelector('svg').appendChild(text);
			}
		} else if(div_00_div_01_div_00_div_00.mode === 1){
			
			for(i = 0; i <= 9; i++){
				var dt = new Date((curr_ts - offset_day - 86400 * (9 - i)) * 1000);
				var day = dt.getDate();
				var month = dt.getMonth() + 1;
				var year = dt.getYear().toString().substr(1,3);
				
				var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
				text.setAttribute('class', 'x');
				text.setAttribute('x', 115 + (720/9) * i);
				text.setAttribute('y', 460);
				text.innerHTML = month + '/' + day + '/' + year;
				div_00_div_01_div_00_div_00.querySelector('svg').appendChild(text);
			}
		} else if(div_00_div_01_div_00_div_00.mode === 2){
			
			for(i = 1; i <= 29; i+=3){
				var dt = new Date((curr_ts - offset_day - 86400 * (29 - i)) * 1000);
				var day = dt.getDate();
				var month = dt.getMonth() + 1;
				var year = dt.getYear().toString().substr(1,3);
				
				var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
				text.setAttribute('class', 'x');
				text.setAttribute('x', 105 + (740/29) * i);
				text.setAttribute('y', 460);
				text.innerHTML = month + '/' + day + '/' + year;
				div_00_div_01_div_00_div_00.querySelector('svg').appendChild(text);
			}
		}
	}
	
	function SetViewGraphData(graph_build, data){
		
		//remove old data
		var rect = div_00_div_01_div_00_div_00.querySelectorAll('svg rect');
		for(var i = 0; i < rect.length; i++){
			div_00_div_01_div_00_div_00.querySelector('svg').removeChild(rect[i]);
		}
		//set new data
		for(var i = 0; i < data.length; i++){
			var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
			var height = (data[i] - graph_build.min) / (graph_build.max - graph_build.min);
			rect.setAttribute('height', height * 400);
			if(div_00_div_01_div_00_div_00.mode === 0 || div_00_div_01_div_00_div_00.mode === 1){
				rect.setAttribute('width', 40);
				rect.setAttribute('x', (720/(data.length - 1)) * i + 95);
			} else if(div_00_div_01_div_00_div_00.mode === 2){
				rect.setAttribute('width', 20);
				rect.setAttribute('x', (740/(data.length - 1)) * i + 95);
			}
			rect.setAttribute('y', 450 - height * 400);
			rect.setAttribute('rx', 2);
			rect.setAttribute('ry', 2);
			div_00_div_01_div_00_div_00.querySelector('svg').appendChild(rect);
		}
	}
	
	
	
	
	function SetBounceGraph(){
		//graph 1
		div_01_div_01_div_00_div_00.mode = 0;
		//create data array
		var data = SortBounceGraphData(site_metrics[site_id].log);
		//pass to function to get high, lows, and steps
		var graph_build = GetGraphSteps(data, 100);
		SetBounceGraphAxis(graph_build);
		SetBounceGraphData(graph_build, data);

		var btn_00_div_00_div_01_div_01_div_00_div_00 = div_01_div_01_div_00_div_00.querySelectorAll('#div-00-div-01-div-01-div-00-div-00 button');
		// event listeners for all buttons
		for(var i = 0; i < btn_00_div_00_div_01_div_01_div_00_div_00.length; i++){
			BounceGraphModeClickListener(btn_00_div_00_div_01_div_01_div_00_div_00, i);
		}
	}
	
	function BounceGraphModeClickListener(els, mode){
		els[mode].addEventListener('click', function(site_id){
			els[div_01_div_01_div_00_div_00.mode].className = '';
			div_01_div_01_div_00_div_00.mode = mode;
			els[mode].className = 'active';
			var data = SortBounceGraphData(site_metrics[site_id].log);
			var graph_build = GetGraphSteps(data, 100);
			SetBounceGraphAxis(graph_build);
			SetBounceGraphData(graph_build, data);
		});
	}
	
	function SetBounceGraphAxis(graph_build){
		
		var remove = document.querySelectorAll('#div-01-div-01-div-00-div-00 svg .graph-lines');
		
		for(let i = 0; i < remove.length; i++){
			remove[i].parentNode.removeChild(remove[i]);
		}
		
		var intervals = (graph_build.max - graph_build.min)/graph_build.step;
		var y_dist = 400/intervals;
		var d_string = 'M 75 50 L 875 50 ';
		for(var i = 1; i <= intervals; i++){
			d_string += 'M 75 ' + (i * y_dist + 50) + ' L 875 ' + (i * y_dist + 50) + ' ';
		}
		var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
		path.setAttribute('d', d_string);
		path.setAttribute('class', 'graph-lines');
		div_01_div_01_div_00_div_00.querySelector('svg').appendChild(path);
		//set labels
		var y_labels = div_01_div_01_div_00_div_00.querySelectorAll('.y');
		for(i = 0; i < y_labels.length; i++){
			y_labels[i].parentNode.removeChild(y_labels[i]);
		}
		for(i = 0; i <= intervals; i++){
			var text_value = Math.round((graph_build.step * i + graph_build.min) * 1000)/1000;
			
			if(text_value === Math.round(text_value)){
				var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
				text.setAttribute('class', 'y');
				text.setAttribute('x', 70);
				text.setAttribute('y', (y_dist * (intervals - i) + 50));
				text.innerHTML = text_value + '%';
				div_01_div_01_div_00_div_00.querySelector('svg').appendChild(text);
			}
		}
		
		
		var x_labels = div_01_div_01_div_00_div_00.querySelectorAll('.x');
		for(i = 0; i < x_labels.length; i++){
			x_labels[i].parentNode.removeChild(x_labels[i]);
		}
		
		var dt = new Date();
		var curr_ts = dt.getTime()/1000;
		var offset_hour = dt.getSeconds() + (60 * dt.getMinutes());
		var offset_day = dt.getSeconds() + (60 * dt.getMinutes()) + (60 * 60 * dt.getHours());
		
		if(div_01_div_01_div_00_div_00.mode === 0){
			
			for(i = 0; i <= 11; i++){
				var dt = new Date((curr_ts - offset_hour - 7200 * (11 - i)) * 1000); 
				var hour = dt.getHours();
				
				var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
				text.setAttribute('class', 'x');
				text.setAttribute('x', 115 + (720/11) * i);
				text.setAttribute('y', 460);
				text.innerHTML = hour + ':00';
				div_01_div_01_div_00_div_00.querySelector('svg').appendChild(text);
			}
		} else if(div_01_div_01_div_00_div_00.mode === 1){
			
			for(i = 0; i <= 9; i++){
				var dt = new Date((curr_ts - offset_day - 86400 * (9 - i)) * 1000);
				var day = dt.getDate();
				var month = dt.getMonth() + 1;
				var year = dt.getYear().toString().substr(1,3);
				
				var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
				text.setAttribute('class', 'x');
				text.setAttribute('x', 115 + (720/9) * i);
				text.setAttribute('y', 460);
				text.innerHTML = month + '/' + day + '/' + year;
				div_01_div_01_div_00_div_00.querySelector('svg').appendChild(text);
			}
		} else if(div_01_div_01_div_00_div_00.mode === 2){
			
			for(i = 1; i <= 29; i+=3){
				var dt = new Date((curr_ts - offset_day - 86400 * (29 - i)) * 1000);
				var day = dt.getDate();
				var month = dt.getMonth() + 1;
				var year = dt.getYear().toString().substr(1,3);
				
				var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
				text.setAttribute('class', 'x');
				text.setAttribute('x', 105 + (740/29) * i);
				text.setAttribute('y', 460);
				text.innerHTML = month + '/' + day + '/' + year;
				div_01_div_01_div_00_div_00.querySelector('svg').appendChild(text);
			}
		}
	}
	
	function SetBounceGraphData(graph_build, data){
		//remove old data
		var rect = div_01_div_01_div_00_div_00.querySelectorAll('svg rect');
		for(var i = 0; i < rect.length; i++){
			div_01_div_01_div_00_div_00.querySelector('svg').removeChild(rect[i]);
		}
		//set new data
		for(var i = 0; i < data.length; i++){
			var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
			var height = (data[i] - graph_build.min) / (graph_build.max - graph_build.min);
			rect.setAttribute('height', height * 400);
			if(div_01_div_01_div_00_div_00.mode === 0 || div_01_div_01_div_00_div_00.mode === 1){
				rect.setAttribute('width', 40);
				rect.setAttribute('x', (720/(data.length - 1)) * i + 95);
			} else if(div_01_div_01_div_00_div_00.mode === 2){
				rect.setAttribute('width', 20);
				rect.setAttribute('x', (740/(data.length - 1)) * i + 95);
			}
			rect.setAttribute('y', 450 - height * 400);
			rect.setAttribute('rx', 2);
			rect.setAttribute('ry', 2);
			div_01_div_01_div_00_div_00.querySelector('svg').appendChild(rect);
		}
	}
	
	
	
	
	function SetRecurringGraph(){
		//graph 1
		div_06_div_01_div_00_div_00.mode = 0;
		//create data array
		var data = SortRecurringGraphData(site_metrics[site_id].log);
		//sort data into brackets
		
		var data_y = [];
		
		for(let i = 0; i < data.length; i++){
			data_y.push(data[i].lifetime_view_time);
		}
		var graph_build_y = GetGraphSteps(data_y, 0.5);
		
		var display_data = [];
		
		var iterations = Math.round((graph_build_y.max - graph_build_y.min)/graph_build_y.step);

		for(var i = 0; i < iterations; i++){
			display_data[i] = 0;
		}
		
		for(var i = 0; i < data.length; i++){
			for(var j = 0; j < iterations; j++){
				if(data[i].lifetime_view_time >= j * graph_build_y.step + graph_build_y.min && data[i].lifetime_view_time < (j + 1) * graph_build_y.step + graph_build_y.min){
					display_data[j] += data[i].recurring_visits;
				}
			}
		}
		
		var graph_build_x = GetGraphSteps(display_data, 10);

		SetRecurringGraphAxis(graph_build_x, graph_build_y);

		SetRecurringGraphData(graph_build_x, graph_build_y, display_data);
		
		var btn_00_div_00_div_06_div_01_div_00_div_00 = div_06_div_01_div_00_div_00.querySelectorAll('#div-00-div-06-div-01-div-00-div-00 button');
		// event listeners for all buttons
		for(var i = 0; i < btn_00_div_00_div_06_div_01_div_00_div_00.length; i++){
			RecurringGraphModeClickListener(btn_00_div_00_div_06_div_01_div_00_div_00, i);
		}
	}
	
	function RecurringGraphModeClickListener(els, mode){
		els[mode].addEventListener('click', function(site_id){
			els[div_06_div_01_div_00_div_00.mode].className = '';
			div_06_div_01_div_00_div_00.mode = mode;
			els[mode].className = 'active';
			
			//create data array
			var data = SortRecurringGraphData(site_metrics[site_id].log);
			//sort data into brackets

			var data_y = [];

			for(let i = 0; i < data.length; i++){
				data_y.push(data[i].lifetime_view_time);
			}
			var graph_build_y = GetGraphSteps(data_y, 0.5);
			
			var display_data = [];

			var iterations = Math.round((graph_build_y.max - graph_build_y.min)/graph_build_y.step);

			for(var i = 0; i < iterations; i++){
				display_data[i] = 0;
			}

			for(var i = 0; i < data.length; i++){
				for(var j = 0; j < iterations; j++){
					if(data[i].lifetime_view_time >= j * graph_build_y.step + graph_build_y.min && data[i].lifetime_view_time < (j + 1) * graph_build_y.step + graph_build_y.min){
						display_data[j] += data[i].recurring_visits;
					}
				}
			}

			var graph_build_x = GetGraphSteps(display_data, 10);

			SetRecurringGraphAxis(graph_build_x, graph_build_y);

			SetRecurringGraphData(graph_build_x, graph_build_y, display_data);
			
		});
	}
	
	function SetRecurringGraphAxis(graph_build_x, graph_build_y){
		
		var remove = document.querySelectorAll('#div-06-div-01-div-00-div-00 svg .graph-lines');
		
		for(let i = 0; i < remove.length; i++){
			remove[i].parentNode.removeChild(remove[i]);
		}
		
		var intervals_x = (graph_build_x.max - graph_build_x.min)/graph_build_x.step;
		var x_dist = 800/intervals_x;
		var d_string = 'M 75 450 L 75 50 ';
		for(var i = 1; i <= intervals_x; i++){
			d_string += 'M ' + (i * x_dist + 75) + ' 50 L ' + (i * x_dist + 75) + ' 450 ';
		}
		var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
		path.setAttribute('d', d_string);
		path.setAttribute('class', 'graph-lines');
		div_06_div_01_div_00_div_00.querySelector('svg').appendChild(path);
		
		//set labels
		var y_labels = div_06_div_01_div_00_div_00.querySelectorAll('.y');
		for(i = 0; i < y_labels.length; i++){
			y_labels[i].parentNode.removeChild(y_labels[i]);
		}
		var intervals_y = Math.round((graph_build_y.max - graph_build_y.min)/graph_build_y.step);
		var y_dist = 400/intervals_y;
		for(i = 0; i <= intervals_y; i++){
			var text_value = graph_build_y.step * i + graph_build_y.min;
			
			var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
			text.setAttribute('class', 'y');
			text.setAttribute('x', 70);
			text.setAttribute('y', (y_dist * (intervals_y - i) + 50));
			text.innerHTML = DisplayDecimal(text_value, graph_build_y.step);
			div_06_div_01_div_00_div_00.querySelector('svg').appendChild(text);
		}
		
		
		var x_labels = div_06_div_01_div_00_div_00.querySelectorAll('.x');
		for(i = 0; i < x_labels.length; i++){
			x_labels[i].parentNode.removeChild(x_labels[i]);
		}
		for(i = 0; i <= intervals_x; i++){
			var text_value = graph_build_x.step * i + graph_build_x.min;
			
			if(text_value === Math.round(text_value)){
				var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
				text.setAttribute('class', 'x');
				text.setAttribute('x', 75 + x_dist * i);
				text.setAttribute('y', 460);
				text.innerHTML = text_value;
				div_06_div_01_div_00_div_00.querySelector('svg').appendChild(text);
			}
		}
		
	}
	
	function DisplayDecimal(num, step){
		
		var decimals = step.countDecimals();
		
		if(decimals > 0){
			
			if(num === 0){
				let output = '0.';
				for(let i = 0; i < decimals; i++){
					output += '0';
				}
				return output;
			} else {
				if(step.toString().includes('2') && step.toString().includes('5')){ //if a step of .25 or 0.025 etc. do another decimal point
					decimals++;
				}

				var rounded_num = num * Math.pow(10, decimals);
				rounded_num = Math.round(rounded_num);
				//convert to string and position decimal point
				var output_num = rounded_num.toString();

				//check how many decimal places back to 0.-----
				var to_zero = 0;
				while(Math.floor(rounded_num) > 0){
					rounded_num = rounded_num/10;
					to_zero++;
				}
				
				if(to_zero > decimals){ //then a component of it must be greater than 1
					var output = Math.floor(num) + '.' + output_num.substring(Math.floor(num).toString().length,  output_num.length);
					return output;
				} else {
					var output = '0.';
					for(var i = to_zero; i < decimals; i++){
						output += '0';
					}
					return output + output_num;
				}
			}
		} else if(num === 0) {
			return 0;
		} else {
			return num;
		}
	}
	
	Number.prototype.countDecimals = function () {
		var decimals = 0;
		var num = this;
		if(num !== 0 && num < 1){
			while(Math.floor(num) === 0){
				decimals++;
				num = num * 10;
			}
		}
		return decimals;
	}
	
	function SetRecurringGraphData(graph_build_x, graph_build_y, data){
		//remove old data
		var rect = div_06_div_01_div_00_div_00.querySelectorAll('svg rect');
		for(var i = 0; i < rect.length; i++){
			div_06_div_01_div_00_div_00.querySelector('svg').removeChild(rect[i]);
		}
				
		//set new data
		for(var i = 0; i < data.length; i++){
			var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
			var width = (data[i] - graph_build_x.min) / (graph_build_x.max - graph_build_x.min);
			rect.setAttribute('width', width * 800);
			rect.setAttribute('height', 400/data.length - 4);
			rect.setAttribute('y', 400/data.length * (data.length - i - 1) + 52);
			rect.setAttribute('x', 75);
			rect.setAttribute('rx', 2);
			rect.setAttribute('ry', 2);
			div_06_div_01_div_00_div_00.querySelector('svg').appendChild(rect);
		}
	}
	
	
	
	
	function getObj(min, max, search = ''){
		//the min and max article wanted in order
		this.minimum = min;
		this.maximum = max;
		//3 for all sites
		this.state = 3;
		//no text means not a search
		this.search = search;
	}
	
	function AsideXHR(search = ''){
		
		
		var get_obj = new getObj(0, 0, search);
		
		var data = JSON.stringify(get_obj);
		
		var url = DOCUMENT_ROOT + 'processes/get-sites.php';

		var xhr = new XMLHttpRequest();
		
		var div_01_div_00_asd_00_div_00 = asd_00_div_00.querySelector('#div-01-div-00-asd-00-div-00');
		var div_02_div_00_asd_00_div_00 = asd_00_div_00.querySelector('#div-02-div-00-asd-00-div-00');
		
		if(!div_01_div_00_asd_00_div_00.sites){
			div_01_div_00_asd_00_div_00.sites = [];
			div_02_div_00_asd_00_div_00.sites = [];
			div_01_div_00_asd_00_div_00.active = -1;
			div_02_div_00_asd_00_div_00.active = -1;
		}

		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				
				var response = JSON.parse(xhr.responseText);

				var parent = div_01_div_00_asd_00_div_00;
				
				
				if(search !== ''){
					
					parent = div_02_div_00_asd_00_div_00;
					
					div_01_div_00_asd_00_div_00.style.display = 'none';
					div_02_div_00_asd_00_div_00.style.display = '';
					
					var remove = div_02_div_00_asd_00_div_00.querySelectorAll('button');
					for(var i = 0; i < remove.length; i++){
						div_02_div_00_asd_00_div_00.removeChild(remove[i]);
					}
					
					div_02_div_00_asd_00_div_00.sites = [];
					
				} else {
										
					div_02_div_00_asd_00_div_00.style.display = 'none';
					div_01_div_00_asd_00_div_00.style.display = '';
					
				}
													
				for(var i = 0; i < response.length; i++){

					var el = document.createElement('button');

					el.innerHTML = response[i].name;

					parent.sites[i] = el;
					parent.sites[i].id = response[i].id;
					parent.appendChild(el);

					SiteClickListener(el, i, parent);
				}
			}
		};

		xhr.open('POST', url, true);

		xhr.send(data);
	}
	
	function SiteClickListener(el, i, asd){
		el.addEventListener('click', function(){

			if(asd.active !== i){
				if(asd.active === -1){
					document.querySelector('#div-01-div-00').style.display = 'none';
					document.querySelector('#div-00-div-00').style.display = '';
				} else {
					asd.sites[asd.active].classList.remove('active');
					ClearMetricNetwork();
				}
				asd.active = i;
				el.classList.add('active');
				site_id = asd.sites[i].id;
				//if not yet got visitors for that site
				if(!site_metrics[site_id]) {
					GetMetricsXHR(site_id);
				} else {
					LoadMetrics();
				}
				div_01_div_00_div_00.set = false;
			}
			
			simulateClick(div_00_div_01_div_00_div_00.querySelector('#div-00-div-00-div-01-div-00-div-00 button'));
			simulateClick(div_01_div_01_div_00_div_00.querySelector('#div-00-div-01-div-01-div-00-div-00 button'));
			simulateClick(div_06_div_01_div_00_div_00.querySelector('#div-00-div-06-div-01-div-00-div-00 button'));
			simulateClick(div_05_div_01_div_00_div_00.querySelector('#div-00-div-05-div-01-div-00-div-00 button'));
		});
	}
	
	function AsideSearch(){
		
		var ipt_00_div_00_div_00_asd_00_div_00 = asd_00_div_00.querySelector('#ipt-00-div-00-div-00-asd-00-div-00');
		
		ipt_00_div_00_div_00_asd_00_div_00.addEventListener('keydown', function(e){
			if(e.keyCode === 13){
				asd_00_div_00.querySelector('#svg-00-div-00-div-00-asd-00-div-00').style.display = 'none';
				asd_00_div_00.querySelector('#svg-01-div-00-div-00-asd-00-div-00').style.display = '';
				ipt_00_div_00_div_00_asd_00_div_00.blur();
				AsideXHR(ipt_00_div_00_div_00_asd_00_div_00.value);
			}
		});
		
		asd_00_div_00.querySelector('#svg-00-div-00-div-00-asd-00-div-00').addEventListener('click', function(){
			this.style.display = 'none';
			asd_00_div_00.querySelector('#svg-01-div-00-div-00-asd-00-div-00').style.display = '';
			AsideXHR(ipt_00_div_00_div_00_asd_00_div_00.value);
		});
		
		asd_00_div_00.querySelector('#svg-01-div-00-div-00-asd-00-div-00').addEventListener('click', function(){
			this.style.display = 'none';
			asd_00_div_00.querySelector('#svg-00-div-00-div-00-asd-00-div-00').style.display = '';
			ipt_00_div_00_div_00_asd_00_div_00.value = '';
			AsideXHR(ipt_00_div_00_div_00_asd_00_div_00.value);
		});
		
	}
	
	
	function simulateClick(elem) {
		// Create our event (with options)
		var evt = new MouseEvent('click', {
			bubbles: true,
			cancelable: true,
			view: window
		});
		// If cancelled, don't dispatch our event
		var cancelled = !elem.dispatchEvent(evt);
	}
	
	function Modulo(x, n){
		return ((x%n)+n)%n;
	}
	
	function GetGraphSteps(data, max_default){
		var min = 0, max = 0;
		for(var i = 0; i < data.length; i++){
			if(data[i] < min){
				min = data[i];
			}
			if(data[i] > max){
				max = data[i];
			}
		}
		
		var step = 0.1;
		
		if(max !== 0){
			var diff = max - min;

			step = GetClosestStep(diff/7.5);

			min = Math.floor(min/step) * step;
			max = Math.ceil(max/step) * step;
			
			return {min: min, max: max, step: step};
			
		} else {
			
			return {min: 0, max: max_default, step:max_default/10};
			
		}
	}
	
	function GetClosestStep(step){
		
		var step_below = 10000000, step_above = 1/40000;
		
		//0 means step is multiple of 10, 1 means step is multiple of 5, 2 means step is multiple of 2.5
		var pattern_index = 0;
		while(step_below > step){
			if(pattern_index === 0 || pattern_index === 1){
				step_below = step_below/2;
			} else if(pattern_index === 2){
				step_below = step_below/2.5;
			}
			pattern_index = Modulo(pattern_index + 1,3);
		}
		
		pattern_index = 2;
		
		while(step_above < step){
			if(pattern_index === 0){
				step_above = step_above * 2.5;
			} else if(pattern_index === 1 || pattern_index === 2){
				step_above = step_above * 2;
			}
			pattern_index = Modulo(pattern_index - 1,3);
		}
		
		if(step - step_below > step_above - step){
			return step_above;
		} else {
			return step_below;
		}
		
	}
	
	
	function GetMetricsXHR(site_id){
		
		var url = DOCUMENT_ROOT + 'processes/get-metrics.php';

		var xhr = new XMLHttpRequest();

		xhr.open('POST', url, true);

		xhr.onreadystatechange = function(){
			if(xhr.readyState === 2){
				metric_call_time = time.now/1000;
			}
			if(xhr.readyState === 4){
				var data = JSON.parse(xhr.responseText);

				site_metrics[site_id] = {};
				site_metrics[site_id].visitors = data.visitors;
				site_metrics[site_id].log = data.log;

				LoadMetrics();

				var url2 = DOCUMENT_ROOT + 'processes/get-metric-network.php';

				var xhr2 = new XMLHttpRequest();

				xhr2.open('POST', url2, true);

				xhr2.onreadystatechange = function() {
					if (xhr2.readyState === 4) {
						var data2 = xhr2.responseText;
						console.log(data2 + '?ts=' + time.now);

						var file = new XMLHttpRequest();
						file.open("GET", data2 + '?ts=' + time.now, true);
						file.onreadystatechange = function () {
							if (file.readyState === 4) {
								var metric_network = JSON.parse(file.responseText);
								MapSection(metric_network, site_id);
							}
						};
						file.send();
					}
				}

				xhr2.setRequestHeader('site-id', site_id);

				xhr2.send();
			}
		};

		xhr.setRequestHeader('site-id', site_id);

		xhr.send();
		
	}
	
	function ClearMetricNetwork(){
		for (let k = 0; k < site_metrics.length; k++){
			if(site_metrics[k]) {
				if (site_metrics[k].visitors[0].marker) {
					for (var i = 0; i < site_metrics[k].visitors.length; i++) {
						for (var j = 0; j < site_metrics[k].visitors[i].marker.length; j++) {
							if (site_metrics[k].visitors[i].marker[j] !== null) {
								site_metrics[k].visitors[i].marker[j].setMap(null);
							}
						}
					}
				}
			}
			
		}
	}
	
	function MapSection(metric_network, site_id_curr){

		if(div_03_div_00_div_00.worker[site_id_curr] !== 'ran'){
			if(div_03_div_00_div_00.worker[site_id_curr] == undefined){
				if(window.Worker){
					div_03_div_00_div_00.worker[site_id_curr] = new Worker(DOCUMENT_ROOT + 'processes/metric-network-marker-processing.js?ts='+time.now);

					var lat = div_03_div_00_div_00.map.getCenter().lat();
					var post = JSON.parse(JSON.stringify({visitors: site_metrics[site_id_curr].visitors, map_center: lat, metric_network: metric_network}));
					div_03_div_00_div_00.worker[site_id_curr].postMessage(post);

					div_03_div_00_div_00.worker[site_id_curr].onmessage = function(e){
						console.log(e.data);
						ClearMetricNetwork();
						site_metrics[site_id_curr].visitors = e.data;
						div_03_div_00_div_00.worker[site_id_curr].terminate();
						div_03_div_00_div_00.worker[site_id_curr] = 'ran';
						var map_zoom = div_03_div_00_div_00.map.getZoom();
						for(var zoom_level = 0; zoom_level <= 16; zoom_level++){
							for(var i = 0; i < site_metrics[site_id_curr].visitors.length; i++){
								if(site_metrics[site_id_curr].visitors[i].count[zoom_level] !== null){
									SetCustomMarker(site_metrics[site_id_curr].visitors[i], zoom_level);
									if(zoom_level === map_zoom){
										site_metrics[site_id_curr].visitors[i].marker[zoom_level].setMap(div_03_div_00_div_00.map);
									}
								}
							}
						}
					};
				}
			}
		} else {
			for(var zoom_level = 0; zoom_level <= 16; zoom_level++){
				for(var i = 0; i < site_metrics[site_id].visitors.length; i++){
					if(site_metrics[site_id].visitors[i].count[zoom_level] !== null){
						var map_zoom = div_03_div_00_div_00.map.getZoom();
						if(zoom_level === map_zoom){
							site_metrics[site_id].visitors[i].marker[zoom_level].setMap(div_03_div_00_div_00.map);
						}
					}
				}
			}
		}
	}

	function MapSectionInitialisation(){
		
		var lat = 38.9072;
		var lng = -77.0369;
		var zoom = 2;
		
		div_03_div_00_div_00.map = new google.maps.Map(div_03_div_00_div_00, {
			zoom: zoom,
			maxZoom: 16,
			center: {lat: lat, lng: lng},
			gestureHandling: 'greedy',
			scrollwheel: false,
			styles: [
				{
					"featureType": "all",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "on"
						},
						{
							"saturation": "0"
						},
						{
							"lightness": "0"
						},
						{
							"hue": "#ffa700"
						},
						{
							"weight": "1"
						}
					]
				},
				{
					"featureType": "administrative",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "on"
						},
						{
							"hue": "#ff0000"
						}
					]
				},
				{
					"featureType": "administrative",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#e4d0ff"
						},
						{
							"saturation": "0"
						},
						{
							"lightness": "0"
						},
						{
							"gamma": "1.00"
						},
						{
							"visibility": "on"
						}
					]
				},
				{
					"featureType": "administrative",
					"elementType": "geometry.fill",
					"stylers": [
						{
							"visibility": "on"
						},
						{
							"color": "#e4d0ff"
						}
					]
				},
				{
					"featureType": "administrative",
					"elementType": "geometry.stroke",
					"stylers": [
						{
							"visibility": "on"
						},
						{
							"color": "#e4d0ff"
						}
					]
				},
				{
					"featureType": "administrative",
					"elementType": "labels",
					"stylers": [
						{
							"color": "#ff0000"
						},
						{
							"visibility": "simplified"
						}
					]
				},
				{
					"featureType": "administrative",
					"elementType": "labels.text",
					"stylers": [
						{
							"visibility": "simplified"
						}
					]
				},
				{
					"featureType": "administrative",
					"elementType": "labels.text.fill",
					"stylers": [
						{
							"color": "#444444"
						}
					]
				},
				{
					"featureType": "administrative",
					"elementType": "labels.icon",
					"stylers": [
						{
							"color": "#e4d0ff"
						},
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "landscape",
					"elementType": "all",
					"stylers": [
						{
							"color": "#f2f2f2"
						}
					]
				},
				{
					"featureType": "landscape",
					"elementType": "geometry",
					"stylers": [
						{
							"visibility": "on"
						},
						{
							"hue": "#e400ff"
						},
						{
							"weight": "1.31"
						}
					]
				},
				{
					"featureType": "landscape",
					"elementType": "geometry.stroke",
					"stylers": [
						{
							"visibility": "on"
						},
						{
							"color": "#e4d0ff"
						}
					]
				},
				{
					"featureType": "landscape",
					"elementType": "labels.text",
					"stylers": [
						{
							"visibility": "off"
						},
						{
							"color": "#e4d0ff"
						}
					]
				},
				{
					"featureType": "landscape.man_made",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "poi",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "road",
					"elementType": "all",
					"stylers": [
						{
							"saturation": -100
						},
						{
							"lightness": 45
						},
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "road",
					"elementType": "labels",
					"stylers": [
						{
							"visibility": "simplified"
						}
					]
				},
				{
					"featureType": "road.highway",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "simplified"
						}
					]
				},
				{
					"featureType": "road.arterial",
					"elementType": "labels.icon",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "road.local",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "simplified"
						},
						{
							"hue": "#ff0000"
						}
					]
				},
				{
					"featureType": "road.local",
					"elementType": "geometry.fill",
					"stylers": [
						{
							"visibility": "on"
						},
						{
							"hue": "#ff0000"
						}
					]
				},
				{
					"featureType": "road.local",
					"elementType": "labels",
					"stylers": [
						{
							"visibility": "on"
						}
					]
				},
				{
					"featureType": "transit",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "water",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "simplified"
						},
						{
							"color": "#ffffff"
						}
					]
				}
			]
		});
		
		div_03_div_00_div_00.map.addListener('zoom_changed', function(){
			var zoom = div_03_div_00_div_00.map.getZoom();
			for(var i = 0; i < site_metrics[site_id].visitors.length; i++){
				for(var j = 0; j < site_metrics[site_id].visitors[i].marker.length; j++){
					if(site_metrics[site_id].visitors[i].marker[j] !== null){
						if(j === zoom){
							site_metrics[site_id].visitors[i].marker[j].setMap(div_03_div_00_div_00.map);
						} else {
							site_metrics[site_id].visitors[i].marker[j].setMap(null);
						}
					}
				}
			}
		});
	}
	
	function SetCustomMarker(marker, zoom_level) {

		//to use it
		marker.marker[zoom_level] = new HTMLMarker(marker.lat, marker.lng, marker.count[zoom_level]);
	}
		
	//constructor
	function HTMLMarker(lat,lng, marker_text){
		this.lat = lat;
		this.lng = lng;
		this.pos = new google.maps.LatLng(lat,lng);
		this.marker_text = CountFormat(marker_text);
	}
	
	function CountFormat(num){
		
		num = num * 1;
		
		if(num > 999 && num <= 999999){
			return Math.round(num/100)/10 + 'k';
		} else if(num > 999999){
			return Math.round(num/100000)/10 + 'm';
		} else return num;
	}
	
	function MinuteFormat(num){
		return Math.floor(num) + 'm ' + Math.floor(Modulo(num, 1) * 60) + 's';
	}
	
	
	HTMLMarker.prototype = new google.maps.OverlayView();
		
	//init your html element here
	HTMLMarker.prototype.onAdd = function(){
		this.div = document.createElement('div');
		this.div.className = "marker-number";
		this.div.innerHTML = this.marker_text;
		var panes = this.getPanes();
		panes.overlayImage.appendChild(this.div);
	}

	HTMLMarker.prototype.onRemove = function(){
		this.div.parentNode.removeChild(this.div);
	}

	HTMLMarker.prototype.draw = function(){
		var overlayProjection = this.getProjection();
		var position = overlayProjection.fromLatLngToDivPixel(this.pos);
		var panes = this.getPanes();
		this.div.style.left = position.x - 17.5 + 'px';
		this.div.style.top = position.y - 17.5 + 'px';
	}

	

	Main();
}

View_js();