// JavaScript Document

function Login_js () {
	"use strict";
	var startTime;
	var time;
	var scrollY;
	
	var load = true;
	
	var ipt_00_div_00_div_00_sec_00 = document.querySelectorAll('.ipt-00-div-00-div-00-sec-00');
	var lbl_00_div_00_div_00_sec_00 = document.querySelectorAll('.lbl-00-div-00-div-00-sec-00');
	var btn_00_div_00_sec_00 = document.querySelector('#btn-00-div-00-sec-00');

	
	function Main(){
		window.requestAnimationFrame(function(timestamp){
			if(load === true && document.body.id === "login"){
				Initialisation();
				load = false;
			}
			
			if(startTime !== undefined && document.body.id === "login"){
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



	function Initialisation(){
		
		//vars
		startTime = new Date().getTime();
		time = {start : startTime, now : startTime, deltaTime : 0};
		scrollY = 0;
		
		btn_00_div_00_sec_00.submit = false;
		btn_00_div_00_sec_00.addEventListener('click', function(){
			LoginXHR();
		});
	}

	function LoginObj(){
		this.username = '';
		this.password = '';
	}
	
	function LoginXHR(){
		//make object, and submit
		var obj_login = new LoginObj();
		obj_login.username = ipt_00_div_00_div_00_sec_00[0].value;
		obj_login.password = ipt_00_div_00_div_00_sec_00[1].value;
		
		if(btn_00_div_00_sec_00.submit === false){
			
			btn_00_div_00_sec_00.submit = true;
			
			var xhr = new XMLHttpRequest();
			var url = DOCUMENT_ROOT + 'processes/user_login.php';

			var data = JSON.stringify(obj_login);
			xhr.open('POST', url, true);
			xhr.setRequestHeader("Content-Type", "application/json");		
			xhr.send(data);

			xhr.onreadystatechange = function(){
				if(xhr.readyState === 4){
					//get validation info
					var username_result = xhr.getResponseHeader('Username');
					var password_result = xhr.getResponseHeader('Password');
					
					
	
					if(username_result !== 'valid'){
						lbl_00_div_00_div_00_sec_00[0].innerHTML = username_result;
					} else {
						lbl_00_div_00_div_00_sec_00[0].innerHTML = '';
					}
					if(password_result !== 'valid'){
						lbl_00_div_00_div_00_sec_00[1].innerHTML = password_result;
					} else {
						lbl_00_div_00_div_00_sec_00[1].innerHTML = '';
					}
					
					btn_00_div_00_sec_00.submit = false;
				}
			};
		}
	}


	Main();
}

Login_js();