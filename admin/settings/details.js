// JavaScript Document

function Register_js () {
	"use strict";
	var startTime;
	var time;
	var scrollY;
	var load = true;
	
	var div_00_div_00 = document.getElementById('div-00-div-00');

	var btn_00_div_01_div_00 = document.getElementById('btn-00-div-01-div-00');
	
	var ipt_00_div_01_div_00 = document.getElementById('ipt-00-div-01-div-00');
	var ipt_01_div_01_div_00 = document.getElementById('ipt-01-div-01-div-00');
	var ipt_02_div_01_div_00 = document.getElementById('ipt-02-div-01-div-00');
	var ipt_03_div_01_div_00 = document.getElementById('ipt-03-div-01-div-00');

	function Main(){
		window.requestAnimationFrame(function(timestamp){
			if(load === true && document.body.id === "register"){
				Initialisation();
				load = false;
			}
			
			if(startTime !== undefined && document.body.id === "register"){
				time.deltaTime = time.start + timestamp - time.now;
				time.now = time.start + timestamp;
				scrollY = window.pageYOffset || document.documentElement.scrollTop || window.scrollY;
			}
			
			Main();
		});
	}
	
	function Initialisation(){
		
		//vars
		startTime = new Date().getTime();
		time = {start : startTime, now : startTime, deltaTime : 0};
		scrollY = 0;
				
		btn_00_div_01_div_00.addEventListener('click', function(){
			if(btn_00_div_01_div_00.clicked === false){
				RegisterXHR();
			}
		});
		
		btn_00_div_01_div_00.clicked = false;
		
		ipt_00_div_01_div_00.addEventListener('focusout', function(){
			if(ipt_00_div_01_div_00.value === ''){
				document.querySelector('#lbl-01-div-01-div-00').style.display = '';
				document.querySelector('#lbl-01-div-01-div-00').innerHTML = 'Username cannot be empty';
				document.querySelector('#lbl-00-div-01-div-00').style.opacity = '0';
				document.querySelector('#lbl-00-div-01-div-00').style.transform = 'translateY(10px)';
			} else {
				document.querySelector('#lbl-01-div-01-div-00').style.display = 'none';
			}
		});
		
		ipt_01_div_01_div_00.addEventListener('focusout', function(){
			if(ipt_01_div_01_div_00.value === ''){
				document.querySelector('#lbl-03-div-01-div-00').style.display = '';
				document.querySelector('#lbl-03-div-01-div-00').innerHTML = 'Email cannot be empty';
				document.querySelector('#lbl-02-div-01-div-00').style.opacity = '0';
				document.querySelector('#lbl-02-div-01-div-00').style.transform = 'translateY(10px)';
			} else {
				document.querySelector('#lbl-03-div-01-div-00').style.display = 'none';
			}
		});
		
		ipt_02_div_01_div_00.addEventListener('focusout', function(){
			if(ipt_01_div_01_div_00.value === ''){
				document.querySelector('#lbl-05-div-01-div-00').style.display = '';
				document.querySelector('#lbl-05-div-01-div-00').innerHTML = 'Password cannot be empty';
				document.querySelector('#lbl-04-div-01-div-00').style.opacity = '0';
				document.querySelector('#lbl-04-div-01-div-00').style.transform = 'translateY(10px)';
			} else {
				document.querySelector('#lbl-05-div-01-div-00').style.display = 'none';
			}
			
			if(ipt_03_div_01_div_00.value !== '' && ipt_03_div_01_div_00.value !== ipt_02_div_01_div_00.value){
				document.querySelector('#lbl-07-div-01-div-00').style.display = '';
				document.querySelector('#lbl-07-div-01-div-00').innerHTML = "Passwords don't match";
			}
		});
		
		ipt_03_div_01_div_00.addEventListener('focusout', function(){
			if(ipt_03_div_01_div_00.value !== ipt_02_div_01_div_00.value){
				document.querySelector('#lbl-07-div-01-div-00').style.display = '';
				document.querySelector('#lbl-07-div-01-div-00').innerHTML = "Passwords must match";
				document.querySelector('#lbl-06-div-01-div-00').style.opacity = '0';
				document.querySelector('#lbl-06-div-01-div-00').style.transform = 'translateY(10px)';
			} else {
				document.querySelector('#lbl-07-div-01-div-00').style.display = 'none';
			}
		});
		
		ipt_00_div_01_div_00.addEventListener('keydown', function(){
			if(ipt_00_div_01_div_00.value !== ''){
				document.querySelector('#lbl-00-div-01-div-00').style.opacity = '1';
				document.querySelector('#lbl-00-div-01-div-00').style.transform = 'translateY(0)';
				document.querySelector('#lbl-01-div-01-div-00').style.display = 'none';
			}
		});
		
		ipt_01_div_01_div_00.addEventListener('keydown', function(){
			if(ipt_01_div_01_div_00.value !== ''){
				document.querySelector('#lbl-02-div-01-div-00').style.opacity = '1';
				document.querySelector('#lbl-02-div-01-div-00').style.transform = 'translateY(0)';
				document.querySelector('#lbl-03-div-01-div-00').style.display = 'none';
			}
		});
		
		ipt_02_div_01_div_00.addEventListener('keydown', function(){
			if(ipt_02_div_01_div_00.value === ''){
				document.querySelector('#lbl-04-div-01-div-00').style.opacity = '1';
				document.querySelector('#lbl-04-div-01-div-00').style.transform = 'translateY(0)';
				document.querySelector('#lbl-05-div-01-div-00').style.display = 'none';
			}
		});
		
		ipt_03_div_01_div_00.addEventListener('keydown', function(e){
			if(e.keyCode === '13'){
				if(btn_00_div_01_div_00.clicked === false){
					RegisterXHR();
				}
			}
			if(ipt_03_div_01_div_00.value === ''){
				document.querySelector('#lbl-06-div-01-div-00').style.opacity = '1';
				document.querySelector('#lbl-06-div-01-div-00').style.transform = 'translateY(0)';
				document.querySelector('#lbl-07-div-01-div-00').style.display = 'none';
			}
		});
		
		document.querySelector('#div-00-div-00-div-01-div-00 input').addEventListener('mouseup', function(){
			document.querySelector('#lbl-08-div-01-div-00').style.display = 'none';
		});
		
		document.querySelector('#div-00-div-01-div-01-div-00 input').addEventListener('mouseup', function(){
			document.querySelector('#lbl-09-div-01-div-00').style.display = 'none';
		});
	}

	
	function RegisterObj(){
		this.username = '';
		this.email = '';
		this.password = '';
	}
	
	function RegisterXHR(){
		if(ipt_00_div_01_div_00.value !== '' && ipt_01_div_01_div_00.value !== '' && ipt_02_div_01_div_00.value !== '' && ipt_03_div_01_div_00 !== '' && document.querySelectorAll('#div-00-div-00-div-01-div-00 input:checked').length > 0 && document.querySelectorAll('#div-00-div-01-div-01-div-00 input:checked').length > 0){
			
			btn_00_div_01_div_00.clicked = true;
			
			btn_00_div_01_div_00.querySelector('svg').style.display = '';
			btn_00_div_01_div_00.querySelector('label').style.display = 'none';
			
			//make object, and submit
			var obj_register = new RegisterObj();
			obj_register.username = ipt_00_div_01_div_00.value;
			obj_register.email = ipt_01_div_01_div_00.value;
			obj_register.password = ipt_02_div_01_div_00.value;

			var xhr = new XMLHttpRequest();
			var url = DOCUMENT_ROOT + 'processes/register.php';

			var data = JSON.stringify(obj_register);
			xhr.open('POST', url, true);
			xhr.setRequestHeader("Content-Type", "application/json");		
			xhr.send(data);

			xhr.onreadystatechange = function(){
				if(xhr.readyState === 4){
					//get login errors
					btn_00_div_01_div_00.clicked = false;
					
					btn_00_div_01_div_00.querySelector('svg').style.display = 'none';
					btn_00_div_01_div_00.querySelector('label').style.display = '';

					var response = xhr.responseText;
					if(response === 'activate-account'){
						window.location.href = DOCUMENT_ROOT + 'user/activate-account';
					} else {
						response = JSON.parse(response);
						for(var i = 0; i < response.length; i++){
							if(response[i] === 'Username already in use'){
								document.getElementById('lbl-01-div-01-div-00').styzle.display = '';
								document.getElementById('lbl-01-div-01-div-00').innerHTML = response[i];
							} else if(response[i] === 'Email address already in use'){
								document.getElementById('lbl-03-div-01-div-00').styzle.display = '';
								document.getElementById('lbl-03-div-01-div-00').innerHTML = response[i];
							}
						}
					}
				}
			};
		}
		
		if(document.querySelectorAll('#div-00-div-00-div-01-div-00 input:checked').length === 0){
			document.querySelector('#lbl-08-div-01-div-00').style.display = '';
			document.querySelector('#lbl-08-div-01-div-00').innerHTML = "You must accept our terms of service";
		}
		
		if(document.querySelectorAll('#div-00-div-01-div-01-div-00 input:checked').length === 0){
			document.querySelector('#lbl-09-div-01-div-00').style.display = '';
			document.querySelector('#lbl-09-div-01-div-00').innerHTML = "You must accept our privacy policy";
		}
	}


	Main();
}

Register_js();