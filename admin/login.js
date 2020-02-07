// JavaScript Document

function Login_js () {
	"use strict";
	var startTime;
	var time;
	var scrollY;
	
	var load = true;
	
	var ipt_00_div_00_sec_00 = document.querySelector('#ipt-00-div-00-sec-00');
	var ipt_00_div_01_sec_00 = document.querySelector('#ipt-00-div-01-sec-00');
	var btn_00_sec_00 = document.querySelector('#btn-00-sec-00');
	var spn_00 = document.querySelector('#spn-00');
	
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
		
		btn_00_sec_00.submit = false;
		btn_00_sec_00.addEventListener('click', function(){
			LoginXHR();
		});
		
		ipt_00_div_01_sec_00.addEventListener('keydown', function(e){
			if(e.keyCode === 13){
				LoginXHR();
			}
		});
		
		//logging out box
		if(LOGGING_OUT === true){
			document.querySelector('#spn-01').style.transition = '0s';
			document.querySelector('#spn-01').style.display = '';
			document.querySelector('#spn-01').offsetHeight;
			document.querySelector('#spn-01').style.transition = '';
			document.querySelector('#spn-01').style.transform = 'translate(0, 0)';
			document.querySelector('#spn-01').style.opacity = '1';
			window.setTimeout(function(){
				document.querySelector('#spn-01').style.transform = '';
				document.querySelector('#spn-01').style.opacity = '';
				window.setTimeout(function(){
					document.querySelector('#spn-01').style.display = 'none';
				}, 1000);
			}, 2000);
		}
		
		
		
		spn_00.timeout = '';
	}

	function LoginObj(){
		this.username = '';
		this.password = '';
	}
	
	function LoginXHR(){
		//make object, and submit
		var obj_login = new LoginObj();
		obj_login.username = ipt_00_div_00_sec_00.value;
		obj_login.password = ipt_00_div_01_sec_00.value;
		
		if(btn_00_sec_00.submit === false){
			
			btn_00_sec_00.submit = true;
			
			var xhr = new XMLHttpRequest();
			var url = DOCUMENT_ROOT + 'processes/user-login.php';

			var data = JSON.stringify(obj_login);
			xhr.open('POST', url, true);
			xhr.setRequestHeader("Content-Type", "application/json");		
			xhr.setRequestHeader("Redirect-Url", REDIRECT_URL);
			xhr.send(data);

			xhr.onreadystatechange = function(){
				if(xhr.readyState === 4){
					//get validation info
					var response = xhr.getResponseHeader('Response');
	
					if(response !== 'valid'){
						if(response === 'unactivated'){
							window.location.href = DOCUMENT_ROOT + 'admin/email-verification';
						} else if(response === 'unconfirmed') {
							window.location.href = DOCUMENT_ROOT + 'admin/awaiting-confirmation';
						} else {
							clearTimeout(spn_00.timeout);
							spn_00.style.transition = '0s';
							spn_00.style.display = '';
							spn_00.offsetHeight;
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
						}
					} else {
						spn_00.target_t = 0;
						if(REDIRECT_URL === null){
							window.location.href = DOCUMENT_ROOT + 'admin/sites/manage-sites';
						} else {
							window.location.href = DOCUMENT_ROOT + REDIRECT_URL;
						}
					}
					
					btn_00_sec_00.submit = false;
				}
			};
		}
	}
	
	Main();
}

Login_js();