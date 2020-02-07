// JavaScript Document
/*jshint esversion: 6 */ 

function SetNewSite_js () {
	"use strict";
	var startTime;
	var time;
	var scrollY;
	
	var div_00;
	var html = document.body.parentElement;
	
	var loading = true;
	
	var ipt_00_div_00_div_00_div_00;
	var ipt_01_div_00_div_00_div_00;
	var btn_00_div_00_div_00_div_00;
	var btn_01_div_00_div_00_div_00;
	var btn_02_div_00_div_00_div_00;
	var btn_03_div_00_div_00_div_00;
	
	var div_01_div_00_div_00;
	var spn_00_div_01_div_00_div_00;
	var div_00_div_01_div_00_div_00;
	
	var ipt_00_div_02_div_00_div_00;
	
	var btn_00_div_02_div_00_div_00;
	var btn_01_div_02_div_00_div_00;
	var btn_02_div_02_div_00_div_00;
	var btn_03_div_02_div_00_div_00;
	var btn_04_div_02_div_00_div_00;
	
	var div_03_div_00_div_00;
	var spn_00_div_03_div_00_div_00;
	var div_00_div_03_div_00_div_00;
	
	var div_01_div_00;
	
	var name = '';
	var site_url = '';
	var parameter = '';
	var schedule_ts = '';
	var start_open_house_ts = '';
	var end_open_house_ts = '';
	
	
	function Main(){
		window.requestAnimationFrame(function(timestamp){
			if(loading === true && document.body.id === "set-new-site"){
				Initialisation();
				loading = false;
			}
			
			if(loading === false && document.body.id === "set-new-site"){
				time.deltaTime = time.start + timestamp - time.now;
				time.now = time.start + timestamp;
				scrollY = window.pageYOffset || document.documentElement.scrollTop || window.scrollY;
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
	
	function CheckForErrors(){
		var error = false;
		div_01_div_00.errors.length = 0;
		if(name === ''){
			error = true;
			div_01_div_00.errors.push('Site name cannot be empty');
			ipt_00_div_00_div_00_div_00.style.backgroundColor = 'rgb(255,170,170)';
		}
		if(site_url === ''){
			error = true;
			div_01_div_00.errors.push('Site URL cannot be empty');
			ipt_01_div_00_div_00_div_00.style.backgroundColor = 'rgb(255,170,170)';
		}
		if(parameter === ''){
			error = true;
			div_01_div_00.errors.push('Site parameter cannot be empty');
			ipt_00_div_02_div_00_div_00.style.backgroundColor = 'rgb(255,170,170)';
		}
		
		var errors_string = ''; 
		for(var i = 0; i < div_01_div_00.errors.length; i++){
			errors_string += "&#8226; " + div_01_div_00.errors[i] + "<br>";
		}

		//bring up popup window
		div_01_div_00.querySelector('#p-00-div-01-div-00').innerHTML = "Please correct the following errors:<br><span>" + errors_string + "</span>Correct these errors before proceeding.";
		
		clearTimeout(div_01_div_00.timeout);
		if(error === true){
			div_01_div_00.style.display = '';
			div_01_div_00.style.transition = '0s';
			div_01_div_00.offsetHeight;
			div_01_div_00.style.transition = '0.5s';
			div_01_div_00.style.opacity = '';
			div_01_div_00.style.pointerEvents = '';
			div_01_div_00.style.transform = 'translate(-50%,0)';
			div_01_div_00.timeout = setTimeout(function(){
				div_01_div_00.style.opacity = '0';
				div_01_div_00.style.pointerEvents = 'none';
				div_01_div_00.style.transform = 'translate(-50%,-50px)';
				div_01_div_00.timeout = setTimeout(function(){
					div_01_div_00.style.display = 'none';
				},500);
			},9000);
		}
		return error;
	}

	function UploadNewSiteXHR(){
 		var errors = CheckForErrors();
		if(errors === false){
			//make object, and submit

			var xhr = new XMLHttpRequest();
			var url = DOCUMENT_ROOT + 'processes/set-new-site.php';


			xhr.open('POST', url, true);
			xhr.setRequestHeader("Content-Type", "application/json");	

			xhr.setRequestHeader('name', name);
			xhr.setRequestHeader('url', site_url);
			xhr.setRequestHeader('parameter', parameter);
			if(div_01_div_00_div_00.state === 0){
				schedule_ts === time.now/1000;
			}
			xhr.setRequestHeader('schedule-ts', schedule_ts);
			xhr.setRequestHeader('start-open-house-ts', start_open_house_ts);
			xhr.setRequestHeader('end-open-house-ts', end_open_house_ts);

			xhr.send();

			xhr.onreadystatechange = function(){
				if(xhr.readyState === 2){
					location.href = DOCUMENT_ROOT + 'admin/sites/site-editor?parameter=' + parameter;
				}
			};
		}
	}
	
	function UpdateSiteXHR(){
		var errors = CheckForErrors();
		if(errors === false){
			//make object, and submit

			var xhr = new XMLHttpRequest();
			var url = DOCUMENT_ROOT + 'processes/update-site.php';


			xhr.open('POST', url, true);
			xhr.setRequestHeader("Content-Type", "application/json");	

			xhr.setRequestHeader('id', SITE_ID);
			xhr.setRequestHeader('name', name);
			xhr.setRequestHeader('url', site_url);
			xhr.setRequestHeader('parameter', parameter);
			if(div_01_div_00_div_00.state === 0){
				schedule_ts === time.now/1000;
			}
			xhr.setRequestHeader('schedule-ts', schedule_ts);
			xhr.setRequestHeader('start-open-house-ts', start_open_house_ts);
			xhr.setRequestHeader('end-open-house-ts', end_open_house_ts);

			xhr.send();

			xhr.onreadystatechange = function(){
				if(xhr.readyState === 2){
					window.close();
				}
			};
		}
	}
	
	function UploadHtaccessXHR(){
		//make object, and submit
		btn_02_div_02_div_00_div_00.uploading = true;
		document.querySelector('#lbl-01-div-02-div-00-div-00').style.display = 'none';
		document.querySelector('#svg-00-div-02-div-00-div-00').style.display = '';
		
		var xhr = new XMLHttpRequest();
		var url = DOCUMENT_ROOT + 'processes/upload-htaccess.php';


		xhr.open('POST', url, true);
		xhr.setRequestHeader("Content-Type", "application/json");	

		xhr.setRequestHeader('parameter', parameter);
		xhr.setRequestHeader('url', site_url);
		
		xhr.send();

		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				btn_02_div_02_div_00_div_00.uploading = false;
				document.querySelector('#svg-00-div-02-div-00-div-00').style.display = 'none';
				
				if(xhr.responseText === 'Invalid URL' || xhr.responseText === 'Empty URL' || xhr.responseText === 'Empty Parameter'){
					document.querySelector('#lbl-01-div-02-div-00-div-00').style.display = '';
					document.querySelector('#lbl-01-div-02-div-00-div-00').style.color = 'rgb(255,50,50)';
					if(xhr.responseText === 'Invalid URL'){
						document.querySelector('#lbl-01-div-02-div-00-div-00').innerHTML = "Upload Failed. The domain provided above does not match.";
					} else if(xhr.responseText === 'Empty URL'){
						document.querySelector('#lbl-01-div-02-div-00-div-00').innerHTML = "Upload Failed. URL cannot be empty.";
					} else {
						document.querySelector('#lbl-01-div-02-div-00-div-00').innerHTML = "Upload Failed. Parameter cannot be empty.";
					}
				} else if(xhr.responseText === 'Complete'){
					document.querySelector('#lbl-01-div-02-div-00-div-00').style.display = '';
					document.querySelector('#lbl-01-div-02-div-00-div-00').innerHTML = "Upload Complete";
					document.querySelector('#lbl-01-div-02-div-00-div-00').style.color = 'rgb(90,0,255)';
				}
			}
		};
	}
	
	function Zerofill(number, length){
		return new Array(length - number.toString().length + 1).join('0') + number;
	}
	
	function InitialiseNameURL(){
		
		ipt_00_div_00_div_00_div_00.last_value = '';
		ipt_01_div_00_div_00_div_00.last_value = '';
		
		ipt_00_div_00_div_00_div_00.addEventListener('input', function(){
			btn_00_div_00_div_00_div_00.style.display = '';
			btn_01_div_00_div_00_div_00.style.display = '';
			this.style.backgroundColor = '';
		});
		
		btn_00_div_00_div_00_div_00.addEventListener('click', function(){
			ipt_00_div_00_div_00_div_00.value = ipt_00_div_00_div_00_div_00.last_value;
			this.style.display = 'none';
			btn_01_div_00_div_00_div_00.style.display = 'none';
		});
		
		btn_01_div_00_div_00_div_00.addEventListener('click', function(){
			ipt_00_div_00_div_00_div_00.last_value = ipt_00_div_00_div_00_div_00.value;
			this.style.display = 'none';
			btn_00_div_00_div_00_div_00.style.display = 'none';
			//update url parameter if currently not set or they are matched
			if(parameter === ''){
				parameter = MakeValidParameter(ipt_00_div_00_div_00_div_00.value);
				ipt_00_div_02_div_00_div_00.value = parameter;
			}
			//update name
			name = ipt_00_div_00_div_00_div_00.value;
		});
		
		ipt_01_div_00_div_00_div_00.addEventListener('input', function(){
			btn_02_div_00_div_00_div_00.style.display = '';
			btn_03_div_00_div_00_div_00.style.display = '';
			this.style.backgroundColor = '';
		});
		
		btn_02_div_00_div_00_div_00.addEventListener('click', function(){
			ipt_01_div_00_div_00_div_00.value = ipt_01_div_00_div_00_div_00.last_value;
			this.style.display = 'none';
			btn_03_div_00_div_00_div_00.style.display = 'none';
		});
		
		btn_03_div_00_div_00_div_00.addEventListener('click', function(){
			ipt_01_div_00_div_00_div_00.last_value = RemoveHTTP(ipt_01_div_00_div_00_div_00.value);
			ipt_01_div_00_div_00_div_00.value = RemoveHTTP(ipt_01_div_00_div_00_div_00.value);
			this.style.display = 'none';
			btn_02_div_00_div_00_div_00.style.display = 'none';
			site_url = ipt_01_div_00_div_00_div_00.value;
			document.querySelector('#div-00-div-02-div-00-div-00').innerHTML = "RewriteEngine on <br> RewriteCond %{HTTP_HOST} ^" + site_url + " <br> RewriteRule ^(.*) http://www.haganrealtyproperties.com/property/" + parameter + " [P] <br> RewriteCond %{HTTP_HOST} ^" + RemoveWWW(site_url) + " <br> RewriteRule ^(.*) http://www.haganrealtyproperties.com/property/" + parameter + " [P]";
		});
	}
	
	function RemoveHTTP(input){
		if(input.includes('http://') === true){
			input = input.replace('http://', '');
		}
		if(input.includes('Http://') === true){
			input = input.replace('Http://', '');
		}
		if(input.includes('https://') === true){
			input = input.replace('http://', '');
		}
		if(input.includes('Https://') === true){
			input = input.replace('Https://', '');
		}
		
		return input;
	}
	
	function RemoveWWW(input){
		if(input.includes('www.') === true){
			input = input.replace('www.', '');
		}
		if(input.includes('Www.') === true){
			input = input.replace('Www.', '');
		}
		
		return input;
	}
	
	function InitialiseRedirect(){
		
		ipt_00_div_02_div_00_div_00.last_value = '';
		
		ipt_00_div_02_div_00_div_00.addEventListener('input', function(){
			btn_00_div_02_div_00_div_00.style.display = '';
			btn_01_div_02_div_00_div_00.style.display = '';
			this.style.backgroundColor = '';
		});
		
		btn_00_div_02_div_00_div_00.addEventListener('click', function(){
			ipt_00_div_02_div_00_div_00.value = ipt_00_div_02_div_00_div_00.last_value;
			this.style.display = 'none';
			btn_01_div_02_div_00_div_00.style.display = 'none';
		});
		
		btn_01_div_02_div_00_div_00.addEventListener('click', function(){
			ipt_00_div_02_div_00_div_00.last_value = ipt_00_div_02_div_00_div_00.value;
			this.style.display = 'none';
			btn_00_div_02_div_00_div_00.style.display = 'none';
			parameter = MakeValidParameter(ipt_00_div_02_div_00_div_00.value);
			ipt_00_div_02_div_00_div_00.value = parameter;
			document.querySelector('#div-00-div-02-div-00-div-00').innerHTML = "RewriteEngine on <br> RewriteCond %{HTTP_HOST} ^" + site_url + " <br> RewriteRule ^(.*) http://www.haganrealtyproperties.com/property/" + parameter + " [P] <br> RewriteCond %{HTTP_HOST} ^" + RemoveWWW(site_url) + " <br> RewriteRule ^(.*) http://www.haganrealtyproperties.com/property/" + parameter + " [P]";
		});
		
		// Start file download
		btn_02_div_02_div_00_div_00.uploading = false;
		
		btn_02_div_02_div_00_div_00.addEventListener("click", function(){
			if(btn_02_div_02_div_00_div_00.uploading === false){
				UploadHtaccessXHR();
			}
		});
		
		btn_03_div_02_div_00_div_00.addEventListener("click", function(){
			// Generate download of hello.txt file with some content
			var element = document.createElement('a');
			element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(document.querySelector('#div-00-div-02-div-00-div-00').innerText));
			element.setAttribute('download', 'htaccess');

			element.style.display = 'none';
			document.body.appendChild(element);

			element.click();

			document.body.removeChild(element);
		});
		
		btn_04_div_02_div_00_div_00.addEventListener('click', function(){
			//copy button
			var range = '';
			if (document.selection) { // IE
				range = document.body.createTextRange();
				range.moveToElementText(document.querySelector('#div-00-div-02-div-00-div-00'));
				range.select();
			} else if (window.getSelection) {
				range = document.createRange();
				range.selectNode(document.querySelector('#div-00-div-02-div-00-div-00'));
				window.getSelection().removeAllRanges();
				window.getSelection().addRange(range);
			}
			document.execCommand("copy");
			//change colour of button
			clearTimeout(btn_04_div_02_div_00_div_00.timeout);
			btn_04_div_02_div_00_div_00.style.transition = '0s';
			btn_04_div_02_div_00_div_00.style.backgroundColor = 'rgb(100,255,100)';
			btn_04_div_02_div_00_div_00.timeout = setTimeout(function(){
				btn_04_div_02_div_00_div_00.style.transition = '1s';
				btn_04_div_02_div_00_div_00.style.backgroundColor = '';
			},50);
		});
	}
	
	function MakeValidParameter(str){
		str = str.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();
		return str;
	}
	
	function InitialiseSchedule(){
				
		//change schedule state
		spn_00_div_01_div_00_div_00.addEventListener('click', function(){
			div_01_div_00_div_00.state = 1 - div_01_div_00_div_00.state;
			
			//set which one is active based on state
			if(div_01_div_00_div_00.state === 0){
				spn_00_div_01_div_00_div_00.querySelector('span').style.opacity = 1;
				spn_00_div_01_div_00_div_00.style.border = '';
				
				div_00_div_01_div_00_div_00.style.pointerEvents = 'none';
				div_00_div_01_div_00_div_00.style.filter = 'grayscale(1) contrast(0.25) brightness(1.8)';
				
				schedule_ts = Math.floor(time.now/1000);
			} else {
				spn_00_div_01_div_00_div_00.querySelector('span').style.opacity = 0;
				spn_00_div_01_div_00_div_00.style.border = '3px solid rgb(80,80,80)';
				
				div_00_div_01_div_00_div_00.style.pointerEvents = '';
				div_00_div_01_div_00_div_00.style.filter = '';
			}
		});
		
		
		//initial value
		div_01_div_00_div_00.querySelectorAll('.div-00-div-00-div-00-div-00-div-01-div-00-div-00')[0].innerHTML = Zerofill(div_01_div_00_div_00.schedule_date.month,2);
		div_01_div_00_div_00.querySelectorAll('.div-00-div-00-div-00-div-00-div-01-div-00-div-00')[1].innerHTML = Zerofill(div_01_div_00_div_00.schedule_date.day,2);
		div_01_div_00_div_00.querySelectorAll('.div-00-div-00-div-00-div-00-div-01-div-00-div-00')[2].innerHTML = Zerofill(div_01_div_00_div_00.schedule_date.year,4);
		
		div_01_div_00_div_00.querySelectorAll('.div-00-div-00-div-01-div-00-div-01-div-00-div-00')[0].innerHTML = Zerofill(div_01_div_00_div_00.schedule_date.hour,2);
		div_01_div_00_div_00.querySelectorAll('.div-00-div-00-div-01-div-00-div-01-div-00-div-00')[1].innerHTML = Zerofill(div_01_div_00_div_00.schedule_date.minutes,2);
		
		//buttons
		div_01_div_00_div_00.querySelectorAll('.btn-00-div-00-div-00-div-00-div-01-div-00-div-00')[0].addEventListener('click', function(){
			//increase month
			div_01_div_00_div_00.schedule_date.month = Modulo(div_01_div_00_div_00.schedule_date.month,12)+1;
			div_01_div_00_div_00.querySelectorAll('.div-00-div-00-div-00-div-00-div-01-div-00-div-00')[0].innerHTML = Zerofill(div_01_div_00_div_00.schedule_date.month,2);
			schedule_ts = GetTimestamp(div_01_div_00_div_00.schedule_date);
			
		});
		div_01_div_00_div_00.querySelectorAll('.btn-01-div-00-div-00-div-00-div-01-div-00-div-00')[0].addEventListener('click', function(){
			//decrease month
			div_01_div_00_div_00.schedule_date.month = Modulo(div_01_div_00_div_00.schedule_date.month - 2,12) + 1;
			div_01_div_00_div_00.querySelectorAll('.div-00-div-00-div-00-div-00-div-01-div-00-div-00')[0].innerHTML = Zerofill(div_01_div_00_div_00.schedule_date.month,2);
			schedule_ts = GetTimestamp(div_01_div_00_div_00.schedule_date);
		});
		div_01_div_00_div_00.querySelectorAll('.btn-00-div-00-div-00-div-00-div-01-div-00-div-00')[1].addEventListener('click', function(){
			//increase day
			div_01_div_00_div_00.schedule_date.day = Modulo(div_01_div_00_div_00.schedule_date.day,31)+1;
			div_01_div_00_div_00.querySelectorAll('.div-00-div-00-div-00-div-00-div-01-div-00-div-00')[1].innerHTML = Zerofill(div_01_div_00_div_00.schedule_date.day,2);
			schedule_ts = GetTimestamp(div_01_div_00_div_00.schedule_date);
		});
		div_01_div_00_div_00.querySelectorAll('.btn-01-div-00-div-00-div-00-div-01-div-00-div-00')[1].addEventListener('click', function(){
			//decrease day
			div_01_div_00_div_00.schedule_date.day = Modulo(div_01_div_00_div_00.schedule_date.day - 2,31) + 1;
			div_01_div_00_div_00.querySelectorAll('.div-00-div-00-div-00-div-00-div-01-div-00-div-00')[1].innerHTML = Zerofill(div_01_div_00_div_00.schedule_date.day,2);
		});
		div_01_div_00_div_00.querySelectorAll('.btn-00-div-00-div-00-div-00-div-01-div-00-div-00')[2].addEventListener('click', function(){
			//increase year
			div_01_div_00_div_00.schedule_date.year = div_01_div_00_div_00.schedule_date.year + 1;
			div_01_div_00_div_00.querySelectorAll('.div-00-div-00-div-00-div-00-div-01-div-00-div-00')[2].innerHTML = Zerofill(div_01_div_00_div_00.schedule_date.year,4);
			schedule_ts = GetTimestamp(div_01_div_00_div_00.schedule_date);
		});
		div_01_div_00_div_00.querySelectorAll('.btn-01-div-00-div-00-div-00-div-01-div-00-div-00')[2].addEventListener('click', function(){
			//decrease year
			div_01_div_00_div_00.schedule_date.year = div_01_div_00_div_00.schedule_date.year - 1;
			div_01_div_00_div_00.querySelectorAll('.div-00-div-00-div-00-div-00-div-01-div-00-div-00')[2].innerHTML = Zerofill(div_01_div_00_div_00.schedule_date.year,4);
			schedule_ts = GetTimestamp(div_01_div_00_div_00.schedule_date);
		});
		
		div_01_div_00_div_00.querySelectorAll('.btn-00-div-00-div-01-div-00-div-01-div-00-div-00')[0].addEventListener('click', function(){
			//increase hours
			div_01_div_00_div_00.schedule_date.hour = Modulo(div_01_div_00_div_00.schedule_date.hour + 1,24);
			div_01_div_00_div_00.querySelectorAll('.div-00-div-00-div-01-div-00-div-01-div-00-div-00')[0].innerHTML = Zerofill(div_01_div_00_div_00.schedule_date.hour,2);
			schedule_ts = GetTimestamp(div_01_div_00_div_00.schedule_date);
		});
		div_01_div_00_div_00.querySelectorAll('.btn-01-div-00-div-01-div-00-div-01-div-00-div-00')[0].addEventListener('click', function(){
			//decrease hours
			div_01_div_00_div_00.schedule_date.hour = Modulo(div_01_div_00_div_00.schedule_date.hour - 1,24);
			div_01_div_00_div_00.querySelectorAll('.div-00-div-00-div-01-div-00-div-01-div-00-div-00')[0].innerHTML = Zerofill(div_01_div_00_div_00.schedule_date.hour,2);
			schedule_ts = GetTimestamp(div_01_div_00_div_00.schedule_date);
		});
		div_01_div_00_div_00.querySelectorAll('.btn-00-div-00-div-01-div-00-div-01-div-00-div-00')[1].addEventListener('click', function(){
			//increase minutes
			div_01_div_00_div_00.schedule_date.minutes = Modulo(div_01_div_00_div_00.schedule_date.minutes + 1,60);
			div_01_div_00_div_00.querySelectorAll('.div-00-div-00-div-01-div-00-div-01-div-00-div-00')[1].innerHTML = Zerofill(div_01_div_00_div_00.schedule_date.minutes,2);
			schedule_ts = GetTimestamp(div_01_div_00_div_00.schedule_date);
		});
		div_01_div_00_div_00.querySelectorAll('.btn-01-div-00-div-01-div-00-div-01-div-00-div-00')[1].addEventListener('click', function(){
			//decrease minutes
			div_01_div_00_div_00.schedule_date.minutes = Modulo(div_01_div_00_div_00.schedule_date.minutes - 1,60);
			div_01_div_00_div_00.querySelectorAll('.div-00-div-00-div-01-div-00-div-01-div-00-div-00')[1].innerHTML = Zerofill(div_01_div_00_div_00.schedule_date.minutes,2);
			schedule_ts = GetTimestamp(div_01_div_00_div_00.schedule_date);
		});
	}
	
	function InitialiseOpenHouse(){
		
		//change schedule state
		spn_00_div_03_div_00_div_00.addEventListener('click', function(){
			div_03_div_00_div_00.state = 1 - div_03_div_00_div_00.state;
			
			//set which one is active based on state
			if(div_03_div_00_div_00.state === 1){
				spn_00_div_03_div_00_div_00.querySelector('span').style.opacity = 1;
				spn_00_div_03_div_00_div_00.style.border = '';
				
				div_00_div_03_div_00_div_00.style.pointerEvents = '';
				div_00_div_03_div_00_div_00.style.filter = '';
				
				start_open_house_ts = Math.floor(time.now/1000);
				end_open_house_ts = Math.floor(time.now/1000);
			} else {
				spn_00_div_03_div_00_div_00.querySelector('span').style.opacity = 0;
				spn_00_div_03_div_00_div_00.style.border = '3px solid rgb(80,80,80)';
				
				div_00_div_03_div_00_div_00.style.pointerEvents = 'none';
				div_00_div_03_div_00_div_00.style.filter = 'grayscale(1) contrast(0.25) brightness(1.8)';
			}
		});
		
		
		//initial value
		div_03_div_00_div_00.querySelectorAll('.div-00-div-00-div-00-div-00-div-03-div-00-div-00')[0].innerHTML = Zerofill(div_03_div_00_div_00.start_open_house_date.month,2);
		div_03_div_00_div_00.querySelectorAll('.div-00-div-00-div-00-div-00-div-03-div-00-div-00')[1].innerHTML = Zerofill(div_03_div_00_div_00.start_open_house_date.day,2);
		div_03_div_00_div_00.querySelectorAll('.div-00-div-00-div-00-div-00-div-03-div-00-div-00')[2].innerHTML = Zerofill(div_03_div_00_div_00.start_open_house_date.year,4);
		
		div_03_div_00_div_00.querySelectorAll('.div-00-div-00-div-01-div-00-div-03-div-00-div-00')[0].innerHTML = Zerofill(div_03_div_00_div_00.start_open_house_date.hour,2);
		div_03_div_00_div_00.querySelectorAll('.div-00-div-00-div-01-div-00-div-03-div-00-div-00')[1].innerHTML = Zerofill(div_03_div_00_div_00.start_open_house_date.minutes,2);
		
		div_03_div_00_div_00.querySelectorAll('.div-00-div-00-div-02-div-00-div-03-div-00-div-00')[0].innerHTML = Zerofill(div_03_div_00_div_00.end_open_house_date.hour,2);
		div_03_div_00_div_00.querySelectorAll('.div-00-div-00-div-02-div-00-div-03-div-00-div-00')[1].innerHTML = Zerofill(div_03_div_00_div_00.end_open_house_date.minutes,2);
		
		//buttons
		div_03_div_00_div_00.querySelectorAll('.btn-00-div-00-div-00-div-00-div-03-div-00-div-00')[0].addEventListener('click', function(){
			//increase month
			div_03_div_00_div_00.start_open_house_date.month = Modulo(div_03_div_00_div_00.start_open_house_date.month,12)+1;
			div_03_div_00_div_00.querySelectorAll('.div-00-div-00-div-00-div-00-div-03-div-00-div-00')[0].innerHTML = Zerofill(div_03_div_00_div_00.start_open_house_date.month,2);
			start_open_house_ts = GetTimestamp(div_03_div_00_div_00.start_open_house_date);
			
		});
		div_03_div_00_div_00.querySelectorAll('.btn-01-div-00-div-00-div-00-div-03-div-00-div-00')[0].addEventListener('click', function(){
			//decrease month
			div_03_div_00_div_00.start_open_house_date.month = Modulo(div_03_div_00_div_00.start_open_house_date.month - 2,12) + 1;
			div_03_div_00_div_00.querySelectorAll('.div-00-div-00-div-00-div-00-div-03-div-00-div-00')[0].innerHTML = Zerofill(div_03_div_00_div_00.start_open_house_date.month,2);
			start_open_house_ts = GetTimestamp(div_03_div_00_div_00.start_open_house_date);
		});
		div_03_div_00_div_00.querySelectorAll('.btn-00-div-00-div-00-div-00-div-03-div-00-div-00')[1].addEventListener('click', function(){
			//increase day
			div_03_div_00_div_00.start_open_house_date.day = Modulo(div_03_div_00_div_00.start_open_house_date.day,31)+1;
			div_03_div_00_div_00.querySelectorAll('.div-00-div-00-div-00-div-00-div-03-div-00-div-00')[1].innerHTML = Zerofill(div_03_div_00_div_00.start_open_house_date.day,2);
			start_open_house_ts = GetTimestamp(div_03_div_00_div_00.start_open_house_date);
		});
		div_03_div_00_div_00.querySelectorAll('.btn-01-div-00-div-00-div-00-div-03-div-00-div-00')[1].addEventListener('click', function(){
			//decrease day
			div_03_div_00_div_00.start_open_house_date.day = Modulo(div_03_div_00_div_00.start_open_house_date.day - 2,31) + 1;
			div_03_div_00_div_00.querySelectorAll('.div-00-div-00-div-00-div-00-div-03-div-00-div-00')[1].innerHTML = Zerofill(div_03_div_00_div_00.start_open_house_date.day,2);
		});
		div_03_div_00_div_00.querySelectorAll('.btn-00-div-00-div-00-div-00-div-03-div-00-div-00')[2].addEventListener('click', function(){
			//increase year
			div_03_div_00_div_00.start_open_house_date.year = div_03_div_00_div_00.start_open_house_date.year + 1;
			div_03_div_00_div_00.querySelectorAll('.div-00-div-00-div-00-div-00-div-03-div-00-div-00')[2].innerHTML = Zerofill(div_03_div_00_div_00.start_open_house_date.year,4);
			start_open_house_ts = GetTimestamp(div_03_div_00_div_00.start_open_house_date);
		});
		div_03_div_00_div_00.querySelectorAll('.btn-01-div-00-div-00-div-00-div-03-div-00-div-00')[2].addEventListener('click', function(){
			//decrease year
			div_03_div_00_div_00.start_open_house_date.year = div_03_div_00_div_00.start_open_house_date.year - 1;
			div_03_div_00_div_00.querySelectorAll('.div-00-div-00-div-00-div-00-div-03-div-00-div-00')[2].innerHTML = Zerofill(div_03_div_00_div_00.start_open_house_date.year,4);
			start_open_house_ts = GetTimestamp(div_03_div_00_div_00.start_open_house_date);
		});
		
		div_03_div_00_div_00.querySelectorAll('.btn-00-div-00-div-01-div-00-div-03-div-00-div-00')[0].addEventListener('click', function(){
			//increase hours
			div_03_div_00_div_00.start_open_house_date.hour = Modulo(div_03_div_00_div_00.start_open_house_date.hour + 1,24);
			div_03_div_00_div_00.querySelectorAll('.div-00-div-00-div-01-div-00-div-03-div-00-div-00')[0].innerHTML = Zerofill(div_03_div_00_div_00.start_open_house_date.hour,2);
			start_open_house_ts = GetTimestamp(div_03_div_00_div_00.start_open_house_date);
		});
		div_03_div_00_div_00.querySelectorAll('.btn-01-div-00-div-01-div-00-div-03-div-00-div-00')[0].addEventListener('click', function(){
			//decrease hours
			div_03_div_00_div_00.start_open_house_date.hour = Modulo(div_03_div_00_div_00.start_open_house_date.hour - 1,24);
			div_03_div_00_div_00.querySelectorAll('.div-00-div-00-div-01-div-00-div-03-div-00-div-00')[0].innerHTML = Zerofill(div_03_div_00_div_00.start_open_house_date.hour,2);
			start_open_house_ts = GetTimestamp(div_03_div_00_div_00.start_open_house_date);
		});
		div_03_div_00_div_00.querySelectorAll('.btn-00-div-00-div-01-div-00-div-03-div-00-div-00')[1].addEventListener('click', function(){
			//increase minutes
			div_03_div_00_div_00.start_open_house_date.minutes = Modulo(div_03_div_00_div_00.start_open_house_date.minutes + 1,60);
			div_03_div_00_div_00.querySelectorAll('.div-00-div-00-div-01-div-00-div-03-div-00-div-00')[1].innerHTML = Zerofill(div_03_div_00_div_00.start_open_house_date.minutes,2);
			start_open_house_ts = GetTimestamp(div_03_div_00_div_00.start_open_house_date);
		});
		div_03_div_00_div_00.querySelectorAll('.btn-01-div-00-div-01-div-00-div-03-div-00-div-00')[1].addEventListener('click', function(){
			//decrease minutes
			div_03_div_00_div_00.start_open_house_date.minutes = Modulo(div_03_div_00_div_00.start_open_house_date.minutes - 1,60);
			div_03_div_00_div_00.querySelectorAll('.div-00-div-00-div-01-div-00-div-03-div-00-div-00')[1].innerHTML = Zerofill(div_03_div_00_div_00.start_open_house_date.minutes,2);
			start_open_house_ts = GetTimestamp(div_03_div_00_div_00.start_open_house_date);
		});
		
		
		div_03_div_00_div_00.querySelectorAll('.btn-00-div-00-div-02-div-00-div-03-div-00-div-00')[0].addEventListener('click', function(){
			//increase hours
			div_03_div_00_div_00.end_open_house_date.hour = Modulo(div_03_div_00_div_00.end_open_house_date.hour + 1,24);
			div_03_div_00_div_00.querySelectorAll('.div-00-div-00-div-02-div-00-div-03-div-00-div-00')[0].innerHTML = Zerofill(div_03_div_00_div_00.end_open_house_date.hour,2);
			end_open_house_ts = GetTimestamp(div_03_div_00_div_00.end_open_house_date);
		});
		div_03_div_00_div_00.querySelectorAll('.btn-01-div-00-div-02-div-00-div-03-div-00-div-00')[0].addEventListener('click', function(){
			//decrease hours
			div_03_div_00_div_00.end_open_house_date.hour = Modulo(div_03_div_00_div_00.end_open_house_date.hour - 1,24);
			div_03_div_00_div_00.querySelectorAll('.div-00-div-00-div-02-div-00-div-03-div-00-div-00')[0].innerHTML = Zerofill(div_03_div_00_div_00.end_open_house_date.hour,2);
			end_open_house_ts = GetTimestamp(div_03_div_00_div_00.end_open_house_date);
		});
		div_03_div_00_div_00.querySelectorAll('.btn-00-div-00-div-02-div-00-div-03-div-00-div-00')[1].addEventListener('click', function(){
			//increase minutes
			div_03_div_00_div_00.end_open_house_date.minutes = Modulo(div_03_div_00_div_00.end_open_house_date.minutes + 1,60);
			div_03_div_00_div_00.querySelectorAll('.div-00-div-00-div-02-div-00-div-03-div-00-div-00')[1].innerHTML = Zerofill(div_03_div_00_div_00.end_open_house_date.minutes,2);
			end_open_house_ts = GetTimestamp(div_03_div_00_div_00.end_open_house_date);
		});
		div_03_div_00_div_00.querySelectorAll('.btn-01-div-00-div-02-div-00-div-03-div-00-div-00')[1].addEventListener('click', function(){
			//decrease minutes
			div_03_div_00_div_00.end_open_house_date.minutes = Modulo(div_03_div_00_div_00.end_open_house_date.minutes - 1,60);
			div_03_div_00_div_00.querySelectorAll('.div-00-div-00-div-01-div-00-div-03-div-00-div-00')[1].innerHTML = Zerofill(div_03_div_00_div_00.end_open_house_date.minutes,2);
			end_open_house_ts = GetTimestamp(div_03_div_00_div_00.end_open_house_date);
		});
	}
	
	function Modulo(x, n){
		return ((x%n)+n)%n;
	}
	
	function SetScheduled(timestamp){
		//get date
		var date = new Date(timestamp * 1000);
		
		var scheduled = {month:0,day:0,year:0,hour:0,minutes:0};
		
		scheduled.month = date.getMonth() + 1;
		scheduled.day = date.getDate();
		scheduled.year = date.getFullYear();
		scheduled.hour = date.getHours();
		scheduled.minutes = date.getMinutes();
		return scheduled;
	}
	
	function GetTimestamp(scheduled){
		//get date
		var date = new Date(scheduled.year, scheduled.month - 1, scheduled.day, scheduled.hour, scheduled.minutes);
		
		return date/1000;
	}
	
	function OpenSiteEditor(){
		document.querySelector('#btn-00-div-00-div-00').uploading = false;
		if(SITE_STATE === 0){
			document.querySelector('#btn-00-div-00-div-00').addEventListener('click', function(){
				if(this.uploading === false){
					UploadNewSiteXHR();
				}
			});
		} else if(SITE_STATE === 1){
			document.querySelector('#btn-00-div-00-div-00').addEventListener('click', function(){
				if(this.uploading === false){
					UpdateSiteXHR();
				}
			});
		}
	}
	
	
	function Initialisation(){
				
		//vars
		startTime = new Date().getTime();
		time = {start : startTime, now : startTime, deltaTime : 0};
		scrollY = 0;
		
		div_00 = document.querySelector('#div-00');
		
		ipt_00_div_02_div_00_div_00 = document.querySelector('#ipt-00-div-02-div-00-div-00');
		
		ipt_00_div_00_div_00_div_00 = document.querySelector('#ipt-00-div-00-div-00-div-00');
		ipt_01_div_00_div_00_div_00 = document.querySelector('#ipt-01-div-00-div-00-div-00');
		btn_00_div_00_div_00_div_00 = document.querySelector('#btn-00-div-00-div-00-div-00');
		btn_01_div_00_div_00_div_00 = document.querySelector('#btn-01-div-00-div-00-div-00');
		btn_02_div_00_div_00_div_00 = document.querySelector('#btn-02-div-00-div-00-div-00');
		btn_03_div_00_div_00_div_00 = document.querySelector('#btn-03-div-00-div-00-div-00');
		btn_00_div_02_div_00_div_00 = document.querySelector('#btn-00-div-02-div-00-div-00');
		btn_01_div_02_div_00_div_00 = document.querySelector('#btn-01-div-02-div-00-div-00');
		btn_02_div_02_div_00_div_00 = document.querySelector('#btn-02-div-02-div-00-div-00');
		btn_03_div_02_div_00_div_00 = document.querySelector('#btn-03-div-02-div-00-div-00');
		btn_04_div_02_div_00_div_00 = document.querySelector('#btn-04-div-02-div-00-div-00');
		
		div_01_div_00_div_00 = document.querySelector('#div-01-div-00-div-00');	
		spn_00_div_01_div_00_div_00 = document.querySelector('#spn-00-div-01-div-00-div-00');
		div_00_div_01_div_00_div_00 = document.querySelector('#div-00-div-01-div-00-div-00');
		div_01_div_00_div_00.schedule_date = SetScheduled(time.now/1000);
		div_01_div_00_div_00.state = 0;
		
		div_03_div_00_div_00 = document.querySelector('#div-03-div-00-div-00');	
		spn_00_div_03_div_00_div_00 = document.querySelector('#spn-00-div-03-div-00-div-00');
		div_00_div_03_div_00_div_00 = document.querySelector('#div-00-div-03-div-00-div-00');
		div_03_div_00_div_00.start_open_house_date = SetScheduled(time.now/1000);
		div_03_div_00_div_00.end_open_house_date = SetScheduled(time.now/1000);
		div_03_div_00_div_00.state = 0;
		
		div_01_div_00 = document.querySelector('#div-01-div-00');
		div_01_div_00.errors = [];
		
		//if updating details, set the site inputs
		if(SITE_STATE === 1){
			ipt_00_div_00_div_00_div_00.value = SITE_NAME;
			name = SITE_NAME;
			ipt_01_div_00_div_00_div_00.value = SITE_URL;
			site_url = SITE_URL;
			ipt_00_div_02_div_00_div_00.value = SITE_PARAMETER;
			parameter = SITE_PARAMETER;
			document.querySelector('#div-00-div-02-div-00-div-00').innerHTML = "RewriteEngine on <br> RewriteCond %{HTTP_HOST} ^" + site_url + " <br> RewriteRule ^(.*) http://haganrealtyproperties.com/property/" + parameter + " [P]";
			
			div_01_div_00_div_00.schedule_date = SetScheduled(Math.max(time.now/1000, SITE_SCHEDULE_TS));
			schedule_ts = Math.max(time.now/1000, SITE_SCHEDULE_TS);
			if(SITE_SCHEDULE_TS > time.now/1000){
				div_01_div_00_div_00.state = 1;
				spn_00_div_01_div_00_div_00.querySelector('span').style.opacity = 0;
				spn_00_div_01_div_00_div_00.style.border = '3px solid rgb(80,80,80)';
				
				div_00_div_01_div_00_div_00.style.pointerEvents = '';
				div_00_div_01_div_00_div_00.style.filter = '';
			}
			
			div_03_div_00_div_00.start_open_house_date = SetScheduled(Math.max(time.now/1000, SITE_START_OPEN_HOUSE_TS));
			div_03_div_00_div_00.end_open_house_date = SetScheduled(Math.max(time.now/1000, SITE_END_OPEN_HOUSE_TS));
			
			start_open_house_ts = Math.max(time.now/1000, SITE_START_OPEN_HOUSE_TS);
			end_open_house_ts = Math.max(time.now/1000, SITE_END_OPEN_HOUSE_TS);
			
			if(start_open_house_ts > time.now/1000){
				div_03_div_00_div_00.state = 1;
				spn_00_div_03_div_00_div_00.querySelector('span').style.opacity = 0;
				spn_00_div_03_div_00_div_00.style.border = '3px solid rgb(80,80,80)';
				
				div_00_div_03_div_00_div_00.style.pointerEvents = '';
				div_00_div_03_div_00_div_00.style.filter = '';
			}
			
			document.querySelector('#a-00-div-00-div-00').addEventListener('click', function(){
				window.close();
			});
		}
		
		InitialiseNameURL();
		InitialiseRedirect();
		InitialiseSchedule();
		console.log('hmm');
		console.log(div_03_div_00_div_00.end_open_house_date.hour);
		InitialiseOpenHouse();
			
		OpenSiteEditor();
	}

	Main();
}

SetNewSite_js();