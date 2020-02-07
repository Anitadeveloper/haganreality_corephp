// JavaScript Document

function EmailsAndNotifications_js () {
	"use strict";
	var startTime;
	var time;
	var scroll_y;
	var mouse_pos;
	var load = true;
	
	
	function Main(){
		window.requestAnimationFrame(function(timestamp){
			if(load === true && document.body.id === "emails-and-notifications-settings"){
				Initialisation();
				load = false;
			}
			
			if(startTime !== undefined && document.body.id === "emails-and-notifications-settings"){
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
		
		GetDataXHR();
		
		document.querySelector('#btn-00-div-00-div-00').addEventListener('click', function(){
			var insert = document.querySelector('.t-div-00-div-01-div-00-div-00').cloneNode(true);
			insert.className = 'div-00-div-01-div-00-div-00';
			document.querySelector('#div-01-div-00-div-00').appendChild(insert);
			
			window.setTimeout(function(){
				insert.querySelector('h6').contentEditable = true;
				insert.querySelector('h6').focus();
				insert.querySelector('h6').className = 'h6-00-div-00-div-01-div-00-div-00';
			},1);
			
			insert.querySelector('h6').addEventListener('keypress', function(e){
				if(e.keyCode === 13){
					if(insert.querySelector('h6').innerText === ''){
						document.querySelector('#div-01-div-00-div-00').removeChild(insert);
					} else {
						insert.querySelector('h6').blur();
						insert.querySelector('h6').contentEditable = false;
						insert.querySelector('h6').className = '';
					}
				}
			});
		});
		
		document.addEventListener('click', function(e){
			if(e.target.className !== 'h6-00-div-00-div-01-div-00-div-00'){
				var els = document.querySelectorAll('.div-00-div-01-div-00-div-00');
				for(var i = 0; i < els.length; i++){
					if(els[i].querySelector('.h6-00-div-00-div-01-div-00-div-00') && els[i].querySelector('h6').innerText === ''){
						document.querySelector('#div-01-div-00-div-00').removeChild(els[i]);
					} else {
						els[i].querySelector('h6').blur();
						els[i].querySelector('h6').contentEditable = false;
						els[i].querySelector('h6').className = '';
					}
				}
			}
		});
	}
	
	function Modulo(x, n){
		return ((x%n)+n)%n;
	}
	
	function GetDataXHR(){
		
		var url = DOCUMENT_ROOT + 'processes/get-settings-emails.php';

		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){

				var response = JSON.parse(xhr.responseText);
				
				for(var i = 0; i < response.length; i++){
					var insert = document.querySelector('.t-div-00-div-01-div-00-div-00').cloneNode(true);
					if(Modulo(i,2) === 1){
						insert.classList.add('dark');
					}
					//create email element
					insert.querySelector('h6').innerHTML = response[i].email;
					if(response[i].scheduled_viewings_notifications === 1){
						insert.querySelectorAll('input')[0].checked = true;
					}
					if(response[i].site_metrics_notifications === 1){
						insert.querySelectorAll('input')[1].checked = true;
					}
					if(response[i].user_requests_notifications === 1){
						insert.querySelectorAll('input')[2].checked = true;
					}
					if(response[i].site_updates_notifications === 1){
						insert.querySelectorAll('input')[3].checked = true;
					}
					
					insert.className = 'div-00-div-01-div-00-div-00';
					document.querySelector('#div-01-div-00-div-00').appendChild(insert);
				}
			}
		};

		xhr.open('POST', url, true);

		xhr.send();
		
	}
	
	
	
	function NewSettingsEmailXHR(email){
		
		var url = DOCUMENT_ROOT + 'processes/update-settings-email.php';

		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				
			}
		};
		
		xhr.open('POST', url, true);
		
		xhr.setRequestHeader('action', 'insert');

		xhr.send();
	}
	
	
	function NewSettingsEmailXHR(email){
		
		var url = DOCUMENT_ROOT + 'processes/update-settings-email.php';

		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				
			}
		};
		
		xhr.open('POST', url, true);
		
		xhr.setRequestHeader('action', 'insert');
		xhr.setRequestHeader('email', email);

		xhr.send();
	}
	
	
	
	Main();
}

EmailsAndNotifications_js();