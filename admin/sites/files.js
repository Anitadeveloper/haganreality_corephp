// JavaScript Document
/*jshint esversion: 6 */ 

function Files_js () {
	"use strict";
	var startTime;
	var time;
	var scrollY;
	
	var div_00;
	var html = document.body.parentNode;
	
	var loading = true;
		
	var div_01_div_00_div_00;
	var t_div_00_div_01_div_00_div_00;

	var div_03_div_00_div_00;

	
	var files;
	var retrieved_files;
	var files_search;
	
	var ipt_00_asd_00_div_00_div_00;
	var btn_00_asd_00_div_00_div_00;
	
	var div_01_div_00;
	var spn_00_div_01_div_00;
	var div_00_div_01_div_00;
	var div_01_div_01_div_00;
	var div_02_div_01_div_00;
	var div_03_div_01_div_00;
	var div_04_div_01_div_00;
	
	var div_00_div_01_div_01_div_00;
	
	var div_01_div_01_div_00_div_00;
	
	var active_window_id = 0;
	
	var div_02_div_00;
			
	function Main(){
		window.requestAnimationFrame(function(timestamp){
			if(loading === true && document.body.id === "files"){
				Initialisation();
				loading = false;
			}
			
			if(startTime !== undefined && document.body.id === "files"){
				time.deltaTime = time.start + timestamp - time.now;
				time.now = time.start + timestamp;
				scrollY = window.pageYOffset || document.documentElement.scrollTop || window.scrollY;
				
				ReplaceFileProgress();
			}
			
			Main();
		});
	}

	
	function F1(x){
		return (-((x-1) * (x-1)) + 1);
	}
	
	function F2(x){
		return (Math.sin((x - 0.5) * Math.PI))/2 + 0.5;
	}
	
	function file(id = '', name = '', url = '', views = '', obj = null){
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
		//no text means not a search
		this.search = search;
	}
	
	function ReplaceFileProgress(){
		if(div_00_div_01_div_01_div_00.replace_file.upload_vars.progress && div_00_div_01_div_01_div_00.replace_file.upload_vars.progress > 1){
			div_00_div_01_div_01_div_00.replace_file.upload_vars.progress = Math.min(Math.max(div_00_div_01_div_01_div_00.replace_file.upload_vars.progress + time.deltaTime/1000, 0), 2);
			//update svg
			var path_00 = LoadSymbolPath00(div_00_div_01_div_01_div_00.replace_file.upload_vars.progress);
			document.querySelector('#pth-00-svg-00-div-00-div-01-div-01-div-00').setAttribute('d', path_00);
			var path_01 = LoadSymbolPath01(div_00_div_01_div_01_div_00.replace_file.upload_vars.progress);
			document.querySelector('#pth-01-svg-00-div-00-div-01-div-01-div-00').setAttribute('d', path_01);
		}
	}
	
	function GetFilesXHR(){
		
		btn_00_asd_00_div_00_div_00.state = 0;
		btn_00_asd_00_div_00_div_00.querySelector('path').setAttribute('d','M 3.5 0.5 A 3 3 0 1 1 3.5 6.5 A 3 3 0 1 1 3.5 0.5 M 9 9 L 5.62 5.62');
		
		window.scroll(0,0);
		
		//remove all files
		for(var i = 0; i < files.length; i++){
			if(isElement(files[i].obj)){
				if(div_01_div_00_div_00.contains(files[i].obj)){
					div_01_div_00_div_00.removeChild(files[i].obj);
				}
			}
		}
		
		files.length = 0;
		
		//reveal loading animation
		div_00.style.backgroundColor = 'rgb(235,235,235)';
		document.querySelector('#svg-00-div-00-div-00').style.display = '';
		
		
		var xhr = new XMLHttpRequest();
		var url = DOCUMENT_ROOT + 'processes/get-files.php';

		xhr.open('POST', url, true);
		xhr.setRequestHeader("Content-Type", "application/json");		

		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				
				//hide loading animation
				div_00.style.backgroundColor = '';
				document.querySelector('#svg-00-div-00-div-00').style.display = 'none';
				
				retrieved_files = JSON.parse(xhr.responseText);
				
				var parent_id = 0;
				//build data				
				for(var i = 0; i < retrieved_files.length; i++){
					//add to files array
					files[i] = {data: '', obj: ''};
					files[i].data = {};
					files[i].data = retrieved_files[i];
					
					if(files[i].data.parent_id === active_window_id){
						SetFile(files[i], true);
					} else {
						SetFile(files[i]);
					}
					
					if(files[i].data.file_id === active_window_id){
						parent_id = files[i].data.parent_id;
					}
				}
				
				//file back button
				if(active_window_id === 0){
					div_01_div_01_div_00_div_00.style.display = 'none';
				} else {
					div_01_div_01_div_00_div_00.style.display = '';
					div_01_div_01_div_00_div_00.parent_id = parent_id;
					if(parent_id === 0){
						div_01_div_01_div_00_div_00.style.display = '';
						div_01_div_01_div_00_div_00.querySelector('h3').innerHTML = 'Back to Root Folder';
						div_01_div_01_div_00_div_00.parent_id = parent_id;
					} else {
						for(var j = 0; j < files.length; j++){
							if(files[j].data.file_id === parent_id){
								div_01_div_01_div_00_div_00.style.display = '';
								div_01_div_01_div_00_div_00.querySelector('h3').innerHTML = 'Back to "' + files[j].data.file_name + '"';
							}
						}
					}
				}
			}
		};
		
		xhr.setRequestHeader('File-Page', 1);
		
		xhr.send();
	}
	
	function SetFile(file, append = false){
		
		var template = document.querySelector('.t-div-00-div-01-div-00-div-00').cloneNode(true);
		file.obj = template;
		file.obj.className = 'div-00-div-01-div-00-div-00';
		if(append){
			div_01_div_00_div_00.appendChild(file.obj);
		}
		
		file.obj.querySelector('.h3-00-div-01-div-00-div-01-div-00-div-00').innerHTML = file.data.file_name;
		
		if(file.data.state === 1){
			template.querySelector('.t-div-00-div-00-div-00-div-00-div-01-div-00-div-00').className = 'div-00-div-00-div-00-div-00-div-01-div-00-div-00';
			template.querySelectorAll('.btn-00-div-01-div-00-div-01-div-00-div-00')[0].style.display = 'none';
			template.querySelectorAll('.btn-00-div-01-div-00-div-01-div-00-div-00')[1].style.display = 'none';
			template.querySelectorAll('.btn-00-div-01-div-00-div-01-div-00-div-00')[2].style.display = 'none';
			template.querySelectorAll('.btn-00-div-01-div-00-div-01-div-00-div-00')[3].style.display = 'none';
			template.querySelector('.btn-01-div-01-div-00-div-01-div-00-div-00').style.display = '';
			template.querySelector('.btn-02-div-01-div-00-div-01-div-00-div-00').style.display = '';
		}
		
		const validImageTypes = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png'];
		if(validImageTypes.includes(file.data.file_type)){
			template.querySelector('.t-img-00-div-00-div-00-div-00-div-01-div-00-div-00').src = file.data.file_preview_src + '?ts=' + time.now;
			template.querySelector('.t-img-00-div-00-div-00-div-00-div-01-div-00-div-00').className = 'img-00-div-00-div-00-div-00-div-01-div-00-div-00';
		} else if(file.data.file_type === 'folder'){
			template.querySelector('.t-svg-00-div-00-div-00-div-00-div-01-div-00-div-00').setAttribute('class', 'svg-00-div-00-div-00-div-00-div-01-div-00-div-00');
			template.querySelectorAll('.btn-00-div-01-div-00-div-01-div-00-div-00')[2].style.display = 'none';
			template.querySelectorAll('.btn-00-div-01-div-00-div-01-div-00-div-00')[1].style.display = 'none';
			var contains_deleted_used = false;
			for(var i = 0; i < files.length; i++){
				if(files[i].data.parent_id === file.data.file_id && files[i].data.state === 1){
					contains_deleted_used = true;
				}
			}
			if(contains_deleted_used === true){
				template.querySelector('.t-div-00-div-00-div-00-div-00-div-01-div-00-div-00').className = 'div-00-div-00-div-00-div-00-div-01-div-00-div-00';
				template.querySelector('.div-00-div-00-div-00-div-00-div-01-div-00-div-00 h3').innerHTML = 'A file inside this folder has been deleted but is still in use';	
				//move to top of the container 
				for(var j = 0; j < files.length; j++){
					if(files[j].data.state === 0){
						//append before it
						div_01_div_00_div_00.insertBefore(file.obj, files[j].obj);
						j = files.length;
					}
				}
			}
		} else {
			template.querySelector('.t-spn-00-div-00-div-00-div-00-div-01-div-00-div-00').innerHTML = TruncatedExtension(file.data.file_type, 5);
			template.querySelector('.t-spn-00-div-00-div-00-div-00-div-01-div-00-div-00').className = 'spn-00-div-00-div-00-div-00-div-01-div-00-div-00';
		}
				
		file.obj.querySelector('.div-00-div-00-div-01-div-00-div-00').addEventListener('click', function(){
			if(file.data.file_type === 'folder'){
				active_window_id = file.data.file_id;
				GetFilesXHR();
			} else {
				window.open(file.data.file_preview_src);
			} 
		});
		
		//initialise buttons
		SetFileActions(file);
	}
	
	function TruncatedExtension(filetype, length){
		if(filetype){
			var split_string = filetype.split('/')[1].split('.');
			return '.' + split_string[split_string.length - 1].substring(0,length);
		} else {
			return '';
		}
	}
	
	function NumberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	
	function SetFileActions(file){
		//edit name button
		file.obj.querySelectorAll('.btn-00-div-01-div-00-div-01-div-00-div-00')[0].addEventListener('click', function(){
			div_01_div_00.style.display = '';
			html.style.overflow = 'hidden';
			div_00_div_01_div_00.style.display = '';
			div_00_div_01_div_00.focus_file = file;
			div_00_div_01_div_00.querySelector('label').innerHTML = 'Renaming ' + file.data.file_name + ' to:';
			div_00_div_01_div_00.querySelector('input').value = file.data.file_name;
			div_00_div_01_div_00.querySelector('input').focus();
		});
		
		//download file button
		file.obj.querySelectorAll('.btn-00-div-01-div-00-div-01-div-00-div-00')[1].addEventListener('click', function(){
			DownloadFile(file.data.file_src);
		});
		
		//replace file button
		file.obj.querySelectorAll('.btn-00-div-01-div-00-div-01-div-00-div-00')[2].addEventListener('click', function(){
			div_01_div_00.style.display = '';
			html.style.overflow = 'hidden';
			div_01_div_01_div_00.style.display = '';
			div_01_div_01_div_00.focus_file = file;
			div_01_div_01_div_00.querySelector('label').innerHTML = 'Upload a file to replace ' + file.data.file_name + ':';
		});
		
		//delete file button
		file.obj.querySelectorAll('.btn-00-div-01-div-00-div-01-div-00-div-00')[3].addEventListener('click', function(){
			div_01_div_00.style.display = '';
			html.style.overflow = 'hidden';
			div_02_div_01_div_00.style.display = '';
			div_02_div_01_div_00.focus_file = file;
			div_02_div_01_div_00.querySelector('label').innerHTML = 'Are you sure you want to remove ' + file.data.file_name + '?';
		});
		
		//restore file button
		file.obj.querySelector('.btn-01-div-01-div-00-div-01-div-00-div-00').addEventListener('click', function(){
			//restore
			div_01_div_00.style.display = '';
			html.style.overflow = 'hidden';
			div_03_div_01_div_00.style.display = '';
			div_03_div_01_div_00.focus_file = file;
			div_03_div_01_div_00.querySelector('label').innerHTML = 'Restore ' + file.data.file_name + '?';
		});
		
		//permanently delete
		file.obj.querySelector('.btn-02-div-01-div-00-div-01-div-00-div-00').addEventListener('click', function(){
			div_01_div_00.style.display = '';
			html.style.overflow = 'hidden';
			div_04_div_01_div_00.style.display = '';
			div_04_div_01_div_00.focus_file = file;
			div_04_div_01_div_00.querySelector('label').innerHTML = 'Permanently delete ' + file.data.file_name + '?';
		});
	}
	
	function Zerofill(number, length){
		return new Array(length - number.toString().length + 1).join('0') + number;
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
		
		div_01_div_01_div_00_div_00.style.display = 'none';
		
		if(button.state === 0 || button.state === 2 || override === true){
			GetSearch(ipt_00_asd_00_div_00_div_00.value);
			button.state = 1;
			button.querySelector('path').setAttribute('d','M 1 1 L 9 9 M 1 9 L 9 1');
		} else {
			//recreate all items based on whether they are in active file window
			GetFilesXHR();
			button.state = 0;
			button.querySelector('path').setAttribute('d','M 3.5 0.5 A 3 3 0 1 1 3.5 6.5 A 3 3 0 1 1 3.5 0.5 M 9 9 L 5.62 5.62');
		}
	}
	
	function GetSearch(search){
		//remove all existing files and make all matching description
		for(var i = 0; i < files.length; i++){
			if(files[i].data.parent_id === active_window_id && isElement(files[i].obj)){
				if(div_01_div_00_div_00.contains(files[i].obj)){
					div_01_div_00_div_00.removeChild(files[i].obj);
				}
			}
		}
		
		for(var j = 0; j < files.length; j++){
			if(files[j].data.file_name.toLowerCase().indexOf(search.toLowerCase()) >= 0){
				div_01_div_00_div_00.appendChild(files[j].obj);
			}
		}
	}
	
	function isElement(obj) {
		try {
			//Using W3 DOM2 (works for FF, Opera and Chrome)
			return obj instanceof HTMLElement;
		}
		catch(e){
			//Browsers not supporting W3 DOM2 don't have HTMLElement and
			//an exception is thrown and we end up here. Testing some
			//properties that all elements have (works on IE7)
			return (typeof obj==="object") &&
			(obj.nodeType===1) && (typeof obj.style === "object") &&
			(typeof obj.ownerDocument ==="object");
		}
	}
		
	function InitialiseDialogs(){
		div_01_div_00 = document.querySelector('#div-01-div-00');
		spn_00_div_01_div_00 = document.querySelector('#spn-00-div-01-div-00');
		div_00_div_01_div_00 = document.querySelector('#div-00-div-01-div-00');
		div_00_div_01_div_00.focus_file = null;
		div_01_div_01_div_00 = document.querySelector('#div-01-div-01-div-00');
		div_01_div_01_div_00.focus_file = null;
		div_02_div_01_div_00 = document.querySelector('#div-02-div-01-div-00');
		div_02_div_01_div_00.focus_file = null;
		div_03_div_01_div_00 = document.querySelector('#div-03-div-01-div-00');
		div_03_div_01_div_00.focus_file = null;
		div_04_div_01_div_00 = document.querySelector('#div-04-div-01-div-00');
		div_04_div_01_div_00.focus_file = null;
		
		
		//rename file
		div_00_div_01_div_00.querySelector('#btn-00-div-00-div-01-div-00').addEventListener('click', function(){
			FileActionXHR(div_00_div_01_div_00.focus_file, 1, div_00_div_01_div_00.querySelector('input').value);
		});
		//pressing enter
		div_00_div_01_div_00.querySelector('input').addEventListener('keydown', function(e){
			if(e.keyCode === 13){
				FileActionXHR(div_00_div_01_div_00.focus_file, 1, div_00_div_01_div_00.querySelector('input').value);
			}
		});
		//cancel
		div_00_div_01_div_00.querySelector('#btn-01-div-00-div-01-div-00').addEventListener('click', function(){
			div_00_div_01_div_00.focus_file = null;
			div_01_div_00.style.display = 'none';
			div_00_div_01_div_00.style.display = 'none';
			html.style.overflow = '';
		});
		
		ReplaceFileInitialise();
		
		//cancel button
		div_01_div_01_div_00.querySelector('#btn-03-div-01-div-01-div-00').addEventListener('click', function(){
			div_01_div_01_div_00.focus_file = null;
			div_01_div_00.style.display = 'none';
			div_01_div_01_div_00.style.display = 'none';
			html.style.overflow = '';
			DeleteUpload();
		});
		
		//delete image
		div_02_div_01_div_00.querySelector('#btn-00-div-02-div-01-div-00').addEventListener('click', function(){
			FileActionXHR(div_02_div_01_div_00.focus_file, 0);
		});
		//cancel
		div_02_div_01_div_00.querySelector('#btn-01-div-02-div-01-div-00').addEventListener('click', function(){
			div_02_div_01_div_00.focus_file = null;
			div_01_div_00.style.display = 'none';
			div_02_div_01_div_00.style.display = 'none';
			html.style.overflow = '';
		});
		
		//restore image
		div_03_div_01_div_00.querySelector('#btn-00-div-03-div-01-div-00').addEventListener('click', function(){
			FileActionXHR(div_03_div_01_div_00.focus_file, 3);
		});
		//cancel
		div_03_div_01_div_00.querySelector('#btn-01-div-03-div-01-div-00').addEventListener('click', function(){
			div_03_div_01_div_00.focus_file = null;
			div_01_div_00.style.display = 'none';
			div_03_div_01_div_00.style.display = 'none';
			html.style.overflow = '';
		});
		
		//permanently delete image
		div_04_div_01_div_00.querySelector('#btn-00-div-04-div-01-div-00').addEventListener('click', function(){
			FileActionXHR(div_04_div_01_div_00.focus_file, 4);
		});
		//cancel
		div_04_div_01_div_00.querySelector('#btn-01-div-04-div-01-div-00').addEventListener('click', function(){
			div_04_div_01_div_00.focus_file = null;
			div_01_div_00.style.display = 'none';
			div_04_div_01_div_00.style.display = 'none';
			html.style.overflow = '';
		});
		
		
		div_01_div_00.addEventListener('click', function(e){
			if(e.target.id === 'div-01-div-00'){
				div_00_div_01_div_00.focus_file = null;
				div_00_div_01_div_00.style.display = 'none';
				div_01_div_01_div_00.focus_file = null;
				div_01_div_01_div_00.style.display = 'none';
				div_02_div_01_div_00.style.display = 'none';
				div_02_div_01_div_00.focus_file = null;
				div_03_div_01_div_00.style.display = 'none';
				div_03_div_01_div_00.focus_file = null;
				div_04_div_01_div_00.style.display = 'none';
				div_04_div_01_div_00.focus_file = null;
				div_01_div_00.style.display = 'none';
				html.style.overflow = '';
				DeleteUpload();
				
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

	function ReplaceFileInitialise(){
		div_00_div_01_div_01_div_00.replace_file = new upload_files();
		div_00_div_01_div_01_div_00.replace_file.upload_vars = new upload_vars();
		
		document.querySelector('#btn-00-div-01-div-01-div-00 input').addEventListener('change', function(){
			QueueFile(this);
		});
		
		//if this is btn 2, file has uploaded and there will be a replace id in the upload file class
		div_01_div_01_div_00.querySelector('#btn-01-div-01-div-01-div-00').addEventListener('click', function(){
			if(this.id === 'btn-02-div-01-div-01-div-00' && div_00_div_01_div_01_div_00.replace_file.data.file_id > 0){
				ReplaceFile(div_01_div_01_div_00.focus_file, div_00_div_01_div_01_div_00.replace_file);
			}
		});
	}
	
	function ReplaceFile(old_file, new_file){
		
		spn_00_div_01_div_00.style.display = '';
		
		if(old_file.data.file_id > 0 && new_file.data.file_id > 0){
			//start xhr request, sending new and old file id
			var xhr = new XMLHttpRequest();
			
			var url = DOCUMENT_ROOT + 'processes/replace-file.php';
			
			xhr.open('POST', url, true);

			//send name and current active folder
			xhr.setRequestHeader('old-file-id', old_file.data.file_id);
			xhr.setRequestHeader('new-file-id', new_file.data.file_id);

			xhr.onreadystatechange = function(){
				if(xhr.readyState === 4){
					var template = old_file.obj.querySelector('img').cloneNode();
					old_file.obj.querySelector('.div-00-div-00-div-00-div-01-div-00-div-00').removeChild(old_file.obj.querySelector('img'));
					template.src = new_file.data.file_preview_src;
					old_file.obj.querySelector('.div-00-div-00-div-00-div-01-div-00-div-00').appendChild(template);
					div_01_div_00.style.display = 'none';
					spn_00_div_01_div_00.style.display = 'none';
					div_04_div_01_div_00.focus_site = null;
					div_04_div_01_div_00.style.display = 'none';
					html.style.overflow = '';
					DeleteUpload();
				}
			};
			
			xhr.send();
		}
	}
	
	function DownloadFile(src){
			
		window.open(src);
	}
	
	function FileActionXHR(file, action, new_name = ''){
		/*
		0 -> Delete file
		1 -> Rename file
		2 -> Move file
		*/
		//send file
		
		spn_00_div_01_div_00.style.display = '';
		
		var xhr = new XMLHttpRequest();
		var url = DOCUMENT_ROOT + 'processes/file-action.php';
		
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				//if deleted file, remove from window
				if(action === 0){
					
					if(xhr.responseText !== ''){
						var sites_using = JSON.parse(xhr.responseText);

						var index = -1;

						for(var i = 0; i < files.length; i++){
							if(files[i].data.file_id === file.data.file_id){
								index = i;
							}
						}

						for(var l = 0; l < sites_using.length; l++){
							var already_added = false;
							for(var k = 0; k < div_02_div_00.sites_using.length; k++){
								if(div_02_div_00.sites_using[k] === sites_using[l]){
									already_added = true;
								}
							}
							if(already_added === false){
								div_02_div_00.sites_using.push(sites_using[l]);
							}
						}

						var sites_using_string = ''; 
						for(var m = 0; m < div_02_div_00.sites_using.length; m++){
							sites_using_string += "&#8226; " + div_02_div_00.sites_using[m] + "<br>";
						}

						if(div_02_div_00.sites_using.length > 1){
							//bring up popup window
							div_02_div_00.querySelector('#p-00-div-02-div-00').innerHTML = files[index].data.file_name + " is in use on the following websites:<br><span>" + sites_using_string + "</span>The file will remain visible on the above sites.";

						} else if(div_02_div_00.sites_using.length === 1){
							//bring up popup window
							div_02_div_00.querySelector('#p-00-div-02-div-00').innerHTML = files[index].data.file_name + " is in use on the website:<br><span>" + sites_using_string + "</span>The file will remain visible on the above site.";
						}

						if(div_02_div_00.sites_using.length > 0){
							clearTimeout(div_02_div_00.timeout);
							div_02_div_00.style.opacity = '';
							div_02_div_00.style.pointerEvents = '';
							div_02_div_00.style.transform = 'translate(0,0)';
							div_02_div_00.timeout = setTimeout(function(){
								div_02_div_00.style.opacity = '0';
								div_02_div_00.style.pointerEvents = 'none';
								div_02_div_00.style.transform = 'translate(0,-50px)';
							},9000);
						}


						if(sites_using.length === 0 && file.data.parent_id === active_window_id){
							div_01_div_00_div_00.removeChild(file.obj);
							//iterate through files and remove from array
							for(var j = 0; j < files.length - 1; j++){
								if(j >= index){
									//shift down by one
									files[j] = files[j + 1];
									files[j].position--;
								}
							}
							files.length--;

							//make the no-files label active
							if(files.length === 0){
								document.querySelector('#div-00-div-00-div-00').style.display = '';
							}
						} else if(file.data.parent_id === active_window_id) {
							//add deleted label
							file.obj.querySelector('.t-div-00-div-00-div-00-div-00-div-01-div-00-div-00').className = 'div-00-div-00-div-00-div-00-div-01-div-00-div-00';
							file.obj.querySelectorAll('.btn-00-div-01-div-00-div-01-div-00-div-00')[0].style.display = 'none';
							file.obj.querySelectorAll('.btn-00-div-01-div-00-div-01-div-00-div-00')[1].style.display = 'none';
							file.obj.querySelectorAll('.btn-00-div-01-div-00-div-01-div-00-div-00')[2].style.display = 'none';
							file.obj.querySelectorAll('.btn-00-div-01-div-00-div-01-div-00-div-00')[3].style.display = 'none';
							file.obj.querySelector('.btn-01-div-01-div-00-div-01-div-00-div-00').style.display = '';
							file.obj.querySelector('.btn-02-div-01-div-00-div-01-div-00-div-00').style.display = '';
						}
					} else {
						div_01_div_00_div_00.removeChild(file.obj);
						html.style.overflow = '';
					}
					
					//load file window animation
					div_01_div_00_div_00.style.pointerEvents = '';
					div_01_div_00.style.display = 'none';
					spn_00_div_01_div_00.style.display = 'none';
					div_02_div_01_div_00.focus_site = null;
					div_02_div_01_div_00.style.display = 'none';
					html.style.overflow = '';

				} else if(action === 1){
					file.data.file_name = new_name;
					file.obj.querySelector('.h3-00-div-01-div-00-div-01-div-00-div-00').innerHTML = new_name;
					div_01_div_00.style.display = 'none';
					spn_00_div_01_div_00.style.display = 'none';
					div_00_div_01_div_00.focus_site = null;
					div_00_div_01_div_00.style.display = 'none';
					html.style.overflow = '';
				} else if(action === 3){
					//remove deleted label
					file.obj.querySelector('.div-00-div-00-div-00-div-00-div-01-div-00-div-00').className = 't-div-00-div-00-div-00-div-00-div-01-div-00-div-00';
					file.obj.querySelectorAll('.btn-00-div-01-div-00-div-01-div-00-div-00')[0].style.display = '';
					file.obj.querySelectorAll('.btn-00-div-01-div-00-div-01-div-00-div-00')[1].style.display = '';
					file.obj.querySelectorAll('.btn-00-div-01-div-00-div-01-div-00-div-00')[2].style.display = '';
					file.obj.querySelectorAll('.btn-00-div-01-div-00-div-01-div-00-div-00')[3].style.display = '';
					file.obj.querySelector('.btn-01-div-01-div-00-div-01-div-00-div-00').style.display = 'none';
					file.obj.querySelector('.btn-02-div-01-div-00-div-01-div-00-div-00').style.display = 'none';
					div_01_div_00.style.display = 'none';
					spn_00_div_01_div_00.style.display = 'none';
					div_03_div_01_div_00.focus_site = null;
					div_03_div_01_div_00.style.display = 'none';
					html.style.overflow = '';
				} else if(action === 4){
					div_01_div_00_div_00.removeChild(file.obj);
					div_01_div_00.style.display = 'none';
					spn_00_div_01_div_00.style.display = 'none';
					div_04_div_01_div_00.focus_site = null;
					div_04_div_01_div_00.style.display = 'none';
					html.style.overflow = '';
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
		xhr.setRequestHeader('file-id', file.data.file_id);
		if(action === 1){
			xhr.setRequestHeader('file-name', new_name);
		}
		xhr.send();
	}
	
	function QueueFile(input){
		var file = input.files[0];
		
		// FileReader
		if (FileReader && file) {
			//iterate through files and add to queue, create new array without first file
			SetFileUpload(file, file.name, file.type);
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
		this.returned_file_id = null;
	}
	
	function upload_vars(progress = 0, interval_time = 0, total_time = 0, last_bytes = 0, speed = 0){
		this.progress = progress;
		this.interval_time = interval_time;
		this.last_bytes = last_bytes;
		this.speed = speed;
		this.total_time = total_time;
		this.last_ts = time.now - time.start;
	}
	
	function SetFileUpload(file, name, type){
		
		div_00_div_01_div_01_div_00.replace_file = new upload_files();
		div_00_div_01_div_01_div_00.replace_file.upload_vars = new upload_vars();
		
		const validImageTypes = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png'];
		if(validImageTypes.includes(type)){
			SetUploadImage(file, document.querySelector('#t-img-00-div-00-div-01-div-01-div-00'));
		} else {
			document.querySelector('#t-spn-00-div-00-div-01-div-01-div-00').id = 'spn-00-div-00-div-01-div-01-div-00';
			document.querySelector('#spn-00-div-00-div-01-div-01-div-00').innerHTML = TruncatedExtension(type, 5);
		}
		document.querySelector('#h3-00-div-00-div-01-div-01-div-00').innerHTML = '' + TruncatedName(name, type);
		//upload elements visible
		document.querySelector('#btn-00-div-01-div-01-div-00').style.display = 'none';
		document.querySelector('#div-00-div-01-div-01-div-00').style.display = '';
		//prepare XHR
		UploadFileXHR(file, name);
		//Delete upload if someone clicks delete button
		document.querySelector('#btn-00-div-00-div-01-div-01-div-00').addEventListener('click', function(){
			DeleteUpload();
		});
	}
	
	function DeleteUpload(){
		//if upload not already cancelled, or completed
		if(div_00_div_01_div_01_div_00.replace_file.cancelled === false && div_00_div_01_div_01_div_00.replace_file.upload_vars.progress < 1){
			div_00_div_01_div_01_div_00.replace_file.cancelled = true;
			div_00_div_01_div_01_div_00.replace_file.upload_vars.progress = 0;
			div_00_div_01_div_01_div_00.replace_file.xhr.abort();
			clearTimeout(div_00_div_01_div_01_div_00.replace_file.progress_timeout);
		}
		
		//Reset Popup
		div_00_div_01_div_01_div_00.querySelector('img').id = 't-img-00-div-00-div-01-div-01-div-00';
		div_00_div_01_div_01_div_00.querySelector('span').id = 't-spn-00-div-00-div-01-div-01-div-00';
		div_00_div_01_div_01_div_00.querySelector('#h3-00-div-00-div-01-div-01-div-00').innerHTML = '';
		div_00_div_01_div_01_div_00.querySelector('#lbl-00-div-00-div-00-div-01-div-01-div-00').innerHTML = '';
		div_00_div_01_div_01_div_00.querySelector('#lbl-01-div-00-div-00-div-01-div-01-div-00').innerHTML = '';
		div_00_div_01_div_01_div_00.querySelector('#pth-00-svg-00-div-00-div-01-div-01-div-00').setAttribute('d', 'M 9.2 5 A 4.2 4.2 0 1 0 0.8 5 A 4.2 4.2 0 1 0 9.2 5');
		div_00_div_01_div_01_div_00.querySelector('#pth-01-svg-00-div-00-div-01-div-01-div-00').setAttribute('d', '');
		div_00_div_01_div_01_div_00.querySelector('#btn-00-div-00-div-01-div-01-div-00').style.display = '';
		document.querySelector('#svg-00-div-00-div-01-div-01-div-00').style.right = '';
		
		div_01_div_01_div_00.querySelector('#div-00-div-01-div-01-div-00').style.display = 'none';
		div_01_div_01_div_00.querySelector('#btn-00-div-01-div-01-div-00').style.display = '';
		if(isElement(div_01_div_01_div_00.querySelector('#btn-02-div-01-div-01-div-00'))){
			div_01_div_01_div_00.querySelector('#btn-02-div-01-div-01-div-00').id = 'btn-01-div-01-div-01-div-00';
		}
	}
	
	function SetUploadImage(file, img){
		var fr = new FileReader();
		//when completed read request, file is represented using url
		fr.readAsDataURL(file);
		//when finished, create upload object and begin xhr process
		fr.onload = function () {
			img.src = fr.result;
			img.id = 'img-00-div-00-div-01-div-01-div-00';
		};
	}
	
	function UploadFileXHR(file, name){
				
		var url = DOCUMENT_ROOT + 'processes/upload-file.php';
			
		div_00_div_01_div_01_div_00.replace_file.form_data = new FormData();
		div_00_div_01_div_01_div_00.replace_file.form_data.append('file', file);

		div_00_div_01_div_01_div_00.replace_file.xhr = new XMLHttpRequest();

		div_00_div_01_div_01_div_00.replace_file.name = name;
		div_00_div_01_div_01_div_00.replace_file.parent_id = active_window_id;

		div_00_div_01_div_01_div_00.replace_file.xhr.upload.onprogress = function(e){
			if(div_00_div_01_div_01_div_00.replace_file.cancelled === false){
				UploadProgress(e);
			} 
		};

		div_00_div_01_div_01_div_00.replace_file.xhr.onreadystatechange = function(){
			if(div_00_div_01_div_01_div_00.replace_file.xhr.readyState === 4 && div_00_div_01_div_01_div_00.replace_file.cancelled === false){
				div_00_div_01_div_01_div_00.replace_file.data = JSON.parse(div_00_div_01_div_01_div_00.replace_file.xhr.responseText)[0];

				if(div_00_div_01_div_01_div_00.replace_file.upload_vars.progress >= 1){
					UploadComplete();
				}
			}
		};

		div_00_div_01_div_01_div_00.replace_file.xhr_opened = false;

		div_00_div_01_div_01_div_00.replace_file.xhr_opened = true;
		div_00_div_01_div_01_div_00.replace_file.xhr.open('POST', url, true);

		//send name and current active folder
		div_00_div_01_div_01_div_00.replace_file.xhr.setRequestHeader('file-name', name);
		div_00_div_01_div_01_div_00.replace_file.xhr.setRequestHeader('parent-id', active_window_id);
		div_00_div_01_div_01_div_00.replace_file.xhr.setRequestHeader('folder', false);

		div_00_div_01_div_01_div_00.replace_file.xhr.send(div_00_div_01_div_01_div_00.replace_file.form_data);
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
	
	function UploadProgress(e){
		if(e.lengthComputable){
			var uploaded = e.loaded;
			var total = e.total;
			var progress = Math.min(Math.max(uploaded/total, 0), 2);
			div_00_div_01_div_01_div_00.replace_file.upload_vars.interval_time += time.now - time.start - div_00_div_01_div_01_div_00.replace_file.upload_vars.last_ts;
			div_00_div_01_div_01_div_00.replace_file.upload_vars.total_time += time.now - time.start - div_00_div_01_div_01_div_00.replace_file.upload_vars.last_ts;
			div_00_div_01_div_01_div_00.replace_file.upload_vars.last_ts = time.now - time.start;
			
			if(progress >= 1){
				//remove delete button
				document.querySelector('#btn-00-div-00-div-01-div-01-div-00').style.display = 'none';
				document.querySelector('#svg-00-div-00-div-01-div-01-div-00').style.right = '20px';
			}
			
			//update progress var
			div_00_div_01_div_01_div_00.replace_file.upload_vars.progress = progress;
			//update svg
			var path_00 = LoadSymbolPath00(progress);
			document.querySelector('#pth-00-svg-00-div-00-div-01-div-01-div-00').setAttribute('d', path_00);
			var path_01 = LoadSymbolPath01(progress);
			document.querySelector('#pth-01-svg-00-div-00-div-01-div-01-div-00').setAttribute('d', path_01);
				
			if(div_00_div_01_div_01_div_00.replace_file.upload_vars.interval_time >= 1000){
				div_00_div_01_div_01_div_00.replace_file.upload_vars.interval_time -= 1000;
				div_00_div_01_div_01_div_00.replace_file.upload_vars.speed = uploaded - div_00_div_01_div_01_div_00.replace_file.upload_vars.last_bytes; 
				div_00_div_01_div_01_div_00.replace_file.upload_vars.last_bytes = uploaded;
				
				//Calculating ETR
				var remainingBytes = total - uploaded;
				var timeRemaining = remainingBytes / uploaded * div_00_div_01_div_01_div_00.replace_file.upload_vars.total_time;
				
				document.querySelector('#lbl-00-div-00-div-00-div-01-div-01-div-00').innerHTML = ByteFormat(div_00_div_01_div_01_div_00.replace_file.upload_vars.speed);

				document.querySelector('#lbl-01-div-00-div-00-div-01-div-01-div-00').innerHTML = TimeFormat(Math.round(timeRemaining/1000));
			}
			
			//completed or experiencing difficulties uploading timeout
			clearTimeout(div_00_div_01_div_01_div_00.replace_file.progress_timeout);
			
			div_00_div_01_div_01_div_00.replace_file.progress_timeout = setTimeout(function(){
				//echo processing image if close, or experiencing diffulties uploaded. Retrying...
				if(progress >= 1){
					document.querySelector('#lbl-00-div-00-div-00-div-01-div-01-div-00').innerHTML = 'Processing Upload';
					document.querySelector('#lbl-01-div-00-div-00-div-01-div-01-div-00').innerHTML = '';
				} else {
					//the difficulty uploading timeout
					div_00_div_01_div_01_div_00.replace_file.progress_timeout = setTimeout(function(){
						document.querySelector('#lbl-00-div-00-div-00-div-01-div-01-div-00').innerHTML = 'Experiencing difficulties uploading. Retrying upload';
						document.querySelector('#lbl-01-div-00-div-00-div-01-div-01-div-00').innerHTML = '';
						//the ellipsis timeout
						div_00_div_01_div_01_div_00.replace_file.progress_timeout = setTimeout(function(){
							//echo processing image if close, or experiencing diffulties uploaded. Retrying...
							document.querySelector('#lbl-00-div-00-div-00-div-01-div-01-div-00').innerHTML = 'Experiencing difficulties uploading. Retrying upload.';
							div_00_div_01_div_01_div_00.replace_file.progress_timeout = setTimeout(function(){
								//echo processing image if close, or experiencing diffulties uploaded. Retrying...
								document.querySelector('#lbl-00-div-00-div-00-div-01-div-01-div-00').innerHTML = 'Experiencing difficulties uploading. Retrying upload..';
								div_00_div_01_div_01_div_00.replace_file.progress_timeout = setTimeout(function(){
									//echo processing image if close, or experiencing diffulties uploaded. Retrying...
									document.querySelector('#lbl-00-div-00-div-00-div-01-div-01-div-00').innerHTML = 'Experiencing difficulties uploading. Retrying upload...';
									div_00_div_01_div_01_div_00.replace_file.progress_timeout = setTimeout(function(){
										//echo processing image if close, or experiencing diffulties uploaded. Retrying...
										document.querySelector('#lbl-00-div-00-div-00-div-01-div-01-div-00').innerHTML = 'Connection to server failed. Cancelled Upload.';
										div_00_div_01_div_01_div_00.replace_file.xhr.abort();
										div_00_div_01_div_01_div_00.replace_file.container.querySelector('svg').style.display = 'none';
										div_00_div_01_div_01_div_00.replace_file.upload_vars.progress = 2;
									},40000);
								},5000);
							},5000);
						},5000);
					}, 5000);
				}
			},100);
		}
	}
	
	function UploadComplete(){
		clearTimeout(div_00_div_01_div_01_div_00.replace_file.progress_timeout);
				
		div_00_div_01_div_01_div_00.replace_file.upload_vars.progress = Math.min(Math.max(div_00_div_01_div_01_div_00.replace_file.upload_vars.progress + time.deltaTime/1000, 0), 2);
		//update svg
		var path_00 = LoadSymbolPath00(div_00_div_01_div_01_div_00.replace_file.upload_vars.progress);
		document.querySelector('#pth-00-svg-00-div-00-div-01-div-01-div-00').setAttribute('d', path_00);
		var path_01 = LoadSymbolPath01(div_00_div_01_div_01_div_00.replace_file.upload_vars.progress);
		document.querySelector('#pth-01-svg-00-div-00-div-01-div-01-div-00').setAttribute('d', path_01);
		
		document.querySelector('#lbl-00-div-00-div-00-div-01-div-01-div-00').innerHTML = 'File Upload Complete';

		document.querySelector('#lbl-01-div-00-div-00-div-01-div-01-div-00').innerHTML = '';
		
		//prevent no upload becoming visible
		div_00_div_01_div_01_div_00.replace_file.finished_upload = true;
		
		//reveal replace button
		document.querySelector('#btn-01-div-01-div-01-div-00').id = 'btn-02-div-01-div-01-div-00';
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
	
	
	function Initialisation(){
		
		//vars
		startTime = new Date().getTime();
		time = {start : startTime, now : startTime, deltaTime : 0};
		scrollY = 0;
		
		div_00 = document.querySelector('#div-00');
		
		
		div_01_div_00_div_00 = document.querySelector('#div-01-div-00-div-00');
		t_div_00_div_01_div_00_div_00 = document.querySelector('.t-div-00-div-01-div-00-div-00');
		
		div_03_div_00_div_00 = document.querySelector('#div-03-div-00-div-00');

		div_01_div_01_div_00_div_00 = document.querySelector('#div-01-div-01-div-00-div-00');

		div_00_div_01_div_01_div_00 = document.querySelector('#div-00-div-01-div-01-div-00');
		
		div_01_div_01_div_00_div_00.addEventListener('click', function(){
			active_window_id = this.parent_id;
			GetFilesXHR();
		});
		
		div_02_div_00 = document.querySelector('#div-02-div-00');
		div_02_div_00.sites_using = [];
		
		//remove memorised scroll position
		if ('scrollRestoration' in history) {
			history.scrollRestoration = 'manual';
		}

		InitialiseDialogs();
		
		files = [];
		files_search = [];
		
		SearchInitialisation();
		
		GetFilesXHR();
		
	}

	Main();
}

Files_js();