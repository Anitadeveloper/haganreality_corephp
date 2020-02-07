// JavaScript Document

function EmailVerification_js () {
	"use strict";
	var startTime;
	var time;
	var scrollY;
	
	var load = true;
	
	var ipt_00_div_00_sec_00 = document.querySelectorAll('.ipt-00-div-00-sec-00');
	var lbl_00_sec_00 = document.querySelector('#lbl-00-sec-00');
	var btn_00_sec_00 = document.querySelector('#btn-00-sec-00');
	var btn_01_sec_00 = document.querySelector('#btn-01-sec-00');
	
	function Main(){
		window.requestAnimationFrame(function(timestamp){
			if(load === true && document.body.id === "email-verification"){
				Initialisation();
				load = false;
			}
			
			if(startTime !== undefined && document.body.id === "email-verification"){
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
			VerifyXHR();
		});
		btn_01_sec_00.submit = false;
		btn_01_sec_00.addEventListener('click', function(){
			ResendCodeXHR();
		});
	}
	
	function VerifyXHR(){
		//make object, and submit
		
		if(btn_00_sec_00.submit === false){
			
			var code = ipt_00_div_00_sec_00[0].value + ipt_00_div_00_sec_00[1].value + ipt_00_div_00_sec_00[2].value + ipt_00_div_00_sec_00[3].value + ipt_00_div_00_sec_00[4].value + ipt_00_div_00_sec_00[5].value;
			btn_00_sec_00.submit = true;
			
			var xhr = new XMLHttpRequest();
			var url = DOCUMENT_ROOT + 'processes/user-activate.php';

			xhr.open('POST', url, true);
			xhr.setRequestHeader("Content-Type", "application/json");	
			xhr.setRequestHeader("Code", code);
			xhr.send();

			xhr.onreadystatechange = function(){
				if(xhr.readyState === 4){
					//get validation info
					var result = xhr.responseText;
	
					if(result !== 'valid'){
						lbl_00_sec_00.innerHTML = result;
					} else {
						window.location.href = DOCUMENT_ROOT + 'admin/awaiting-confirmation';
					}
					
					btn_00_sec_00.submit = false;
				}
			};
		}
	}
	
	function ResendCodeXHR(){
		//make object, and submit
		
		if(btn_01_sec_00.submit === false){

			var xhr = new XMLHttpRequest();
			var url = DOCUMENT_ROOT + 'processes/user-resend-code.php';

			xhr.open('POST', url, true);
			xhr.setRequestHeader("Content-Type", "application/json");	
			xhr.send();

			xhr.onreadystatechange = function(){
				if(xhr.readyState === 4){
					//create popup
					document.querySelector('#spn-00').style.transition = '0s';
					document.querySelector('#spn-00').style.display = '';
					document.querySelector('#spn-00').offsetHeight;
					document.querySelector('#spn-00').style.transition = '';
					document.querySelector('#spn-00').style.transform = 'translate(0, 0)';
					document.querySelector('#spn-00').style.opacity = '1';
					window.setTimeout(function(){
						document.querySelector('#spn-00').style.transform = '';
						document.querySelector('#spn-00').style.opacity = '';
						window.setTimeout(function(){
							document.querySelector('#spn-00').style.display = 'none';
						}, 1000);
					}, 2000);
	
					btn_01_sec_00.submit = false;
				}
			};
		}
	}


	Main();
}

EmailVerification_js();