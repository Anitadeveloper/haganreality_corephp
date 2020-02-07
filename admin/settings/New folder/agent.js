// JavaScript Document

function Agent_js () {
	"use strict";
	var startTime;
	var time;
	var scrollY;
	
	var load = true;
	
	var ipt_00_div_00_div_00_sec_00 = document.querySelector('#ipt-00-div-00-div-00-sec-00');
	var ipt_00_div_00_div_01_sec_00 = document.querySelector('#ipt-00-div-00-div-01-sec-00');
	var ipt_00_div_00_div_02_sec_00 = document.querySelector('#ipt-00-div-00-div-02-sec-00');
	var ipt_00_div_00_div_03_sec_00 = document.querySelector('#ipt-00-div-00-div-03-sec-00');
	var ipt_00_div_00_div_04_sec_00 = document.querySelector('#ipt-00-div-00-div-04-sec-00');
	var ipt_00_div_00_div_05_sec_00 = document.querySelector('#ipt-00-div-00-div-05-sec-00');
	var ipt_00_div_00_div_06_sec_00 = document.querySelector('#ipt-00-div-00-div-06-sec-00');
	var ipt_00_div_00_div_07_sec_00 = document.querySelector('#ipt-00-div-00-div-07-sec-00');
	var ipt_00_div_00_div_08_sec_00 = document.querySelector('#ipt-00-div-00-div-08-sec-00');
	var lbl_00_div_00_sec_00 = document.querySelector('#lbl-00-div-00-sec-00');
	var lbl_00_div_01_sec_00 = document.querySelector('#lbl-00-div-01-sec-00');
	var lbl_00_div_02_sec_00 = document.querySelector('#lbl-00-div-02-sec-00');
	var lbl_00_div_03_sec_00 = document.querySelector('#lbl-00-div-03-sec-00');
	var lbl_00_div_04_sec_00 = document.querySelector('#lbl-00-div-04-sec-00');
	var lbl_00_div_05_sec_00 = document.querySelector('#lbl-00-div-05-sec-00');
	var lbl_00_div_06_sec_00 = document.querySelector('#lbl-00-div-06-sec-00');
	var lbl_00_div_07_sec_00 = document.querySelector('#lbl-00-div-07-sec-00');
	var lbl_00_div_08_sec_00 = document.querySelector('#lbl-00-div-08-sec-00');
	var btn_00_sec_00 = document.querySelector('#btn-00-sec-00');
	
	function Main(){
		window.requestAnimationFrame(function(timestamp){
			if(load === true && document.body.id === "agent"){
				Initialisation();
				load = false;
			}
			
			if(startTime !== undefined && document.body.id === "agent"){
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
			RegisterXHR();
		});
		
		ipt_00_div_00_div_00_sec_00.addEventListener('focusout', function(){
			if(ipt_00_div_00_div_00_sec_00.value === ''){
				lbl_00_div_00_sec_00.innerHTML = 'Agent Name cannot be empty';
			} else {
				lbl_00_div_00_sec_00.innerHTML = '';
			}
		});
		
		ipt_00_div_00_div_01_sec_00.addEventListener('focusout', function(){
			if(ipt_00_div_00_div_01_sec_00.value === ''){
				lbl_00_div_01_sec_00.innerHTML = 'Occupation cannot be empty';
			} else {
				lbl_00_div_01_sec_00.innerHTML = '';
			}
		});
		
		ipt_00_div_00_div_02_sec_00.addEventListener('focusout', function(){
			if(ipt_00_div_00_div_02_sec_00.value === ''){
				lbl_00_div_02_sec_00.innerHTML = 'Email cannot be empty';
			} else {
				lbl_00_div_02_sec_00.innerHTML = '';
			}
		});
		
		ipt_00_div_00_div_03_sec_00.addEventListener('focusout', function(){
			if(ipt_00_div_00_div_03_sec_00.value === ''){
				lbl_00_div_03_sec_00.innerHTML = 'phonenumber cannot be empty';
			} else {
				lbl_00_div_03_sec_00.innerHTML = '';
			}
		});
		
		// ipt_00_div_00_div_04_sec_00.addEventListener('focusout', function(){
		// 	PasswordComplexity();
		// });
		
		// ipt_00_div_00_div_05_sec_00.addEventListener('focusout', function(){
		// 	PasswordMatch();
		// });

		ipt_00_div_00_div_05_sec_00.addEventListener('keydown', function(e){
			if(e.keyCode === 13){
				//upload
				RegisterXHR();
			}
		});
	}
	
	function PasswordComplexity(){
		if(ipt_00_div_00_div_04_sec_00.value.length < 6){
			lbl_00_div_04_sec_00.innerHTML = 'Password must be 6 characters or more';
		} else {
			lbl_00_div_04_sec_00.innerHTML = '';
			return true;
		}
	}
	
	function PasswordMatch(){
		if(ipt_00_div_00_div_04_sec_00.value !== ipt_00_div_00_div_05_sec_00.value){
			lbl_00_div_05_sec_00.innerHTML = 'Passwords do not match';
		} else {
			lbl_00_div_05_sec_00.innerHTML = '';
			return true;
		}
	}
	
	function BlankInputs(){
		var valid = true;
		
		if(ipt_00_div_00_div_00_sec_00.value === ''){
			lbl_00_div_00_sec_00.innerHTML = 'Agent Name cannot be empty';
			valid = false;
		} else {
			lbl_00_div_00_sec_00.innerHTML = '';
		}
		
		if(ipt_00_div_00_div_01_sec_00.value === ''){
			lbl_00_div_01_sec_00.innerHTML = 'Occupation cannot be empty';
			valid = false;
		} else {
			lbl_00_div_01_sec_00.innerHTML = '';
		}
		
		if(ipt_00_div_00_div_02_sec_00.value === ''){
			lbl_00_div_02_sec_00.innerHTML = 'Email cannot be empty';
			valid = false;
		} else {
			lbl_00_div_02_sec_00.innerHTML = '';
		}
		
		if(ipt_00_div_00_div_03_sec_00.value === ''){
			lbl_00_div_03_sec_00.innerHTML = 'Phone Number cannot be empty';
			valid = false;
		} else {
			lbl_00_div_03_sec_00.innerHTML = '';
		}
		
		if(ipt_00_div_00_div_04_sec_00.value === ''){
			lbl_00_div_04_sec_00.innerHTML = 'Office Phone Number cannot be empty';
			valid = false;
		} else {
			lbl_00_div_04_sec_00.innerHTML = '';
		}
		
		if(ipt_00_div_00_div_05_sec_00.value === ''){
			lbl_00_div_05_sec_00.innerHTML = 'Facebook Link cannot be empty';
			valid = false;
		} else {
			lbl_00_div_05_sec_00.innerHTML = '';
		}

		if(ipt_00_div_00_div_06_sec_00.value === ''){
			lbl_00_div_06_sec_00.innerHTML = 'Website cannot be empty';
			valid = false;
		} else {
			lbl_00_div_06_sec_00.innerHTML = '';
		}
		if(ipt_00_div_00_div_07_sec_00.value === ''){
			lbl_00_div_07_sec_00.innerHTML = 'Description cannot be empty';
			valid = false;
		} else {
			lbl_00_div_07_sec_00.innerHTML = '';
		}
		if(ipt_00_div_00_div_08_sec_00.value === ''){
			lbl_00_div_08_sec_00.innerHTML = 'Upload Picture cannot be empty';
			valid = false;
		} else {
			lbl_00_div_08_sec_00.innerHTML = '';
		}
		
		return valid;
	}

	function AgentObj(){
		this.full_name = '';
		this.occupation = '';
		this.email = '';
		this.phoneno = '';
		this.office_phone_no = '';
		this.facebook_link = '';
		this.website = '';
		this.pic = '';
		this.description = '';
	}
	
	function RegisterXHR(){
		
	//	var password_complexity = PasswordComplexity();
	//	var password_match = PasswordMatch();
		var blank_values = BlankInputs();
		
		if(blank_values === true){
		//if(password_match === true && password_complexity === true && blank_values === true){
			//make object, and submit
			var obj_agent = new AgentObj();
			obj_agent.full_name = ipt_00_div_00_div_00_sec_00.value;
			obj_agent.occupation = ipt_00_div_00_div_01_sec_00.value;
			obj_agent.email = ipt_00_div_00_div_02_sec_00.value;
			obj_agent.phoneno = ipt_00_div_00_div_03_sec_00.value;
			obj_agent.office_phone_no = ipt_00_div_00_div_04_sec_00.value;
			obj_agent.facebook_link = ipt_00_div_00_div_05_sec_00.value;
			obj_agent.website = ipt_00_div_00_div_06_sec_00.value;
			obj_agent.description = ipt_00_div_00_div_07_sec_00.value;
			obj_agent.pic = ipt_00_div_00_div_08_sec_00.value;

			if(btn_00_sec_00.submit === false){
				
				btn_00_sec_00.submit = true;
				var xhr = new XMLHttpRequest();
				var url = DOCUMENT_ROOT + 'processes/agent-register.php';
				
				var data = JSON.stringify(obj_agent);
				
				xhr.open('POST', url, true);
				xhr.setRequestHeader("Content-Type", "application/json");
				xhr.send(data);

				xhr.onreadystatechange = function(){

					if(xhr.readyState === 4 && this.status == 200){
						var response = xhr.responseText;
						console.log(response);
						//get validation info
						//var response = xhr.responseText;
						//console.log(response);
						// if(response.toString() === 'complete'){
						// 	window.location.href = DOCUMENT_ROOT + 'admin/email-verification';
						// } else {
							
						// 	response = JSON.parse(response);
							
						// 	lbl_00_div_00_sec_00.innerHTML = '';
						// 	lbl_00_div_01_sec_00.innerHTML = '';
						// 	lbl_00_div_02_sec_00.innerHTML = '';
						// 	lbl_00_div_03_sec_00.innerHTML = '';
							
						// 	for(var i = 0; i < response.length; i++){
	
						// 		if(response[i] === 'Email address already in use'){
						// 			lbl_00_div_02_sec_00.innerHTML = response[i];
						// 		}
								
						// 		if(response[i] === 'Username already in use'){
						// 			lbl_00_div_03_sec_00.innerHTML = response[i];
						// 		}
						// 	}
						// }

					//	btn_00_sec_00.submit = false;
					}
				};
			}
		}
	}
	
	Main();
}

Agent_js();