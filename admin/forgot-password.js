// JavaScript Document

function ForgotPassword_js () {
	"use strict";
	var startTime;
	var time;
	var scrollY;
	
	var load = true;
	
	var ipt_00_div_00_sec_00 = document.querySelector('#ipt-00-div-00-sec-00');
	var btn_00_sec_00 = document.querySelector('#btn-00-sec-00');
	var spn_00 = document.querySelector('#spn-00');
	
	function Main(){
		window.requestAnimationFrame(function(timestamp){
			if(load === true && document.body.id === "forgot-password"){
				Initialisation();
				load = false;
			}
			
			if(startTime !== undefined && document.body.id === "forgot-password"){
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
		
		btn_00_sec_00.submit = false;
		btn_00_sec_00.addEventListener('click', function(){
			ResetXHR();
		});
		
		spn_00.timeout = '';
	}

	
	function ResetXHR(){
		//make object, and submit
		
		if(btn_00_sec_00.submit === false){
			
			btn_00_sec_00.submit = true;
			
			var xhr = new XMLHttpRequest();
			var url = DOCUMENT_ROOT + 'processes/user-forgot-password.php';

			xhr.open('POST', url, true);
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.setRequestHeader("Email", ipt_00_div_00_sec_00.value);
			
			xhr.onreadystatechange = function(){
				if(xhr.readyState === 4){
					//get validation info
					var result = xhr.responseText;
					
					if(result !== 'valid'){
						clearTimeout(spn_00.timeout);
						spn_00.clientHeight;
						spn_00.style.transition = '0s';
						spn_00.style.display = '';
						spn_00.clientHeight;
						spn_00.style.transition = '';
						spn_00.style.transform = 'translate(0, 0)';
						spn_00.style.opacity = '1';
						spn_00.timeout = window.setTimeout(function(){
							spn_00.style.transform = '';
							spn_00.style.opacity = '';
							spn_00.timeout = window.setTimeout(function(){
								spn_00.style.display = 'none';
							}, 1000);
						}, 5000);
					} else {
						window.location = DOCUMENT_ROOT + 'admin/reset-password';
					}
					
					btn_00_sec_00.submit = false;
				}
			};
			
			xhr.send();
			
		}
	}


	Main();
}

ForgotPassword_js();