// JavaScript Document

function Header_js () {
	"use strict";
	var startTime;
	var time;
	var scrollY;
	
	var load = true;
	
	var lbl_00_a_00_div_00_asd_00_div_00 = document.querySelectorAll('.lbl-00-a-00-div-00-asd-00-div-00');
	
	function Main(){
		window.requestAnimationFrame(function(timestamp){
			if(load === true){
				Initialisation();
				load = false;
			}
			
			if(startTime !== undefined && (document.body.id === "manage-sites" || document.body.id === "schedule-sites" || document.body.id === "new-site" || document.body.id === "removed-sites" || document.body.id === 'files')){
				time.deltaTime = time.start + timestamp - time.now;
				time.now = time.start + timestamp;
				scrollY = window.pageYOffset || document.documentElement.scrollTop || window.scrollY;
				
				UpdateSiteCounters();
			}
			
			Main();
		});
	}

	function UpdateSiteCounters(){
		if(UPDATE_SITE_COUNTERS === true){
			AsideXHR();
			UPDATE_SITE_COUNTERS = false;
		}
	}

	function Initialisation(){
		
		//vars
		startTime = new Date().getTime();
		time = {start : startTime, now : startTime, deltaTime : 0};
		scrollY = 0;
		
		if(document.body.id === "manage-sites" || document.body.id === "schedule-sites" || document.body.id === "new-site" || document.body.id === "removed-sites" || document.body.id === 'files'){
			AsideXHR();
		}
		
		var div_01_div_00_a_hea_00 = document.querySelector('#div-01-div-00-a-hea-00');
		
		var h_div_00 = document.querySelector('#h-div-00');
		
		h_div_00.timeout = '';
		
		div_01_div_00_a_hea_00.state = 0;
		
		div_01_div_00_a_hea_00.addEventListener('click', function(){
			this.state = 1 - this.state;
			if(this.state === 0){
				h_div_00.style.opacity = '0';
				h_div_00.style.transform = 'scale(0.9)';
				h_div_00.timeout = setTimeout(function(){
					h_div_00.style.display = 'none';
				}, 500);
			} else {
				clearTimeout(h_div_00.timeout);
				h_div_00.style.transition = '1s';
				h_div_00.style.display = '';
				h_div_00.offsetHeight;
				h_div_00.style.transition = '';
				h_div_00.style.opacity = '1';
				h_div_00.style.transform = 'scale(1)';
			}
		});
		
		var btn_00_div_01_h_div_00 = document.querySelectorAll('.btn-01-div-01-h-div-00')[0];
		var btn_01_div_01_h_div_00 = document.querySelectorAll('.btn-00-div-01-h-div-00')[0];
		var btn_02_div_01_h_div_00 = document.querySelectorAll('.btn-00-div-01-h-div-00')[1];
		
		btn_00_div_01_h_div_00.addEventListener('click', function(){
			btn_00_div_01_h_div_00.className = 'btn-01-div-01-h-div-00';
			btn_01_div_01_h_div_00.className = 'btn-00-div-01-h-div-00';
			btn_02_div_01_h_div_00.className = 'btn-00-div-01-h-div-00';
			document.querySelector('#div-02-h-div-00').style.display = '';
			document.querySelector('#div-03-h-div-00').style.display = 'none';
			document.querySelector('#div-04-h-div-00').style.display = 'none';
		});
		
		btn_01_div_01_h_div_00.addEventListener('click', function(){
			btn_00_div_01_h_div_00.className = 'btn-00-div-01-h-div-00';
			btn_01_div_01_h_div_00.className = 'btn-01-div-01-h-div-00';
			btn_02_div_01_h_div_00.className = 'btn-00-div-01-h-div-00';
			document.querySelector('#div-02-h-div-00').style.display = 'none';
			document.querySelector('#div-03-h-div-00').style.display = '';
			document.querySelector('#div-04-h-div-00').style.display = 'none';
		});
		
		btn_02_div_01_h_div_00.addEventListener('click', function(){
			btn_00_div_01_h_div_00.className = 'btn-00-div-01-h-div-00';
			btn_01_div_01_h_div_00.className = 'btn-00-div-01-h-div-00';
			btn_02_div_01_h_div_00.className = 'btn-01-div-01-h-div-00';
			document.querySelector('#div-02-h-div-00').style.display = 'none';
			document.querySelector('#div-03-h-div-00').style.display = 'none';
			document.querySelector('#div-04-h-div-00').style.display = '';
		});	
		
		GetDataXHR();
	}
	
	function GetDataXHR(){
		
		var url = DOCUMENT_ROOT + 'processes/get-settings-details.php';

		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){

				var response = JSON.parse(xhr.responseText);
				
				var d = new Date();
				
				if(d.getHours() < 12){
					document.querySelector('#div-00-h-div-00 h2').innerHTML = 'Good Morning, ' + response[0].first_name + ' ' + response[0].last_name;
				} else if(d.getHours() < 18){
					document.querySelector('#div-00-h-div-00 h2').innerHTML = 'Good Afternoon, ' + response[0].first_name + ' ' + response[0].last_name;
				} else {
					document.querySelector('#div-00-h-div-00 h2').innerHTML = 'Good Evening, ' + response[0].first_name + ' ' + response[0].last_name;
				}
				
				document.querySelector('#img-00-spn-00-div-01-div-00-a-hea-00').src = response[1].src;
				document.querySelector('#img-00-spn-00-div-01-div-00-a-hea-00').onload = function(){
					if(document.querySelector('#img-00-spn-00-div-01-div-00-a-hea-00').naturalHeight/document.querySelector('#img-00-spn-00-div-01-div-00-a-hea-00').naturalWidth < 1){
						document.querySelector('#img-00-spn-00-div-01-div-00-a-hea-00').style.height = response[1].scale * 100 + '%';
					} else {
						document.querySelector('#img-00-spn-00-div-01-div-00-a-hea-00').style.width = response[1].scale * 100 + '%';
					}
					document.querySelector('#img-00-spn-00-div-01-div-00-a-hea-00').style.left = 'calc(50% - ' + Math.min(Math.max(response[1].center_x * document.querySelector('#img-00-spn-00-div-01-div-00-a-hea-00').clientWidth,document.querySelector('#div-01-div-00-a-hea-00 span').clientWidth/2),document.querySelector('#img-00-spn-00-div-01-div-00-a-hea-00').clientWidth - document.querySelector('#div-01-div-00-a-hea-00 span').clientWidth/2) + 'px)';
					document.querySelector('#img-00-spn-00-div-01-div-00-a-hea-00').style.top = 'calc(50% - ' + Math.min(Math.max(response[1].center_y * document.querySelector('#img-00-spn-00-div-01-div-00-a-hea-00').clientHeight,document.querySelector('#div-01-div-00-a-hea-00 span').clientHeight/2),document.querySelector('#img-00-spn-00-div-01-div-00-a-hea-00').clientHeight - document.querySelector('#div-01-div-00-a-hea-00 span').clientHeight/2) + 'px';
					document.querySelector('#img-00-spn-00-div-01-div-00-a-hea-00').onload = '';
				}

				document.querySelector('#spn-00-div-00-h-div-00 img').src = response[1].src;
				document.querySelector('#spn-00-div-00-h-div-00 img').onload = function(){
					document.querySelector('#h-div-00').style.display = '';
					if(document.querySelector('#spn-00-div-00-h-div-00 img').naturalHeight/document.querySelector('#spn-00-div-00-h-div-00 img').naturalWidth < 1){
						document.querySelector('#spn-00-div-00-h-div-00 img').style.height = response[1].scale * 100 + '%';
					} else {
						document.querySelector('#spn-00-div-00-h-div-00 img').style.width = response[1].scale * 100 + '%';
					}
					document.querySelector('#spn-00-div-00-h-div-00 img').style.left = 'calc(50% - ' + Math.min(Math.max(response[1].center_x * document.querySelector('#spn-00-div-00-h-div-00 img').clientWidth,document.querySelector('#spn-00-div-00-h-div-00').clientWidth/2),document.querySelector('#spn-00-div-00-h-div-00 img').clientWidth - document.querySelector('#spn-00-div-00-h-div-00').clientWidth/2) + 'px)';
					document.querySelector('#spn-00-div-00-h-div-00 img').style.top = 'calc(50% - ' + Math.min(Math.max(response[1].center_y * document.querySelector('#spn-00-div-00-h-div-00 img').clientHeight,document.querySelector('#spn-00-div-00-h-div-00').clientHeight/2),document.querySelector('#spn-00-div-00-h-div-00 img').clientHeight - document.querySelector('#spn-00-div-00-h-div-00').clientHeight/2) + 'px)';
					document.querySelector('#spn-00-div-00-h-div-00 img').onload = '';
					document.querySelector('#h-div-00').style.display = 'none';
				}

			}
		};

		xhr.open('POST', url, true);

		xhr.send();
		
	}
	
	function AsideXHR(){

		var xhr = new XMLHttpRequest();
		var url = DOCUMENT_ROOT + 'processes/admin-aside-counter.php';

		xhr.open('POST', url, true);
		xhr.setRequestHeader("Content-Type", "application/json");		
		xhr.send();

		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				//get validation info
				var manage_sites_count = xhr.getResponseHeader('Manage-Sites-Count');
				var removed_sites_count = xhr.getResponseHeader('Removed-Sites-Count');
				var schedule_sites_count = xhr.getResponseHeader('Schedule-Sites-Count');
								
				lbl_00_a_00_div_00_asd_00_div_00[0].innerHTML = manage_sites_count;
				lbl_00_a_00_div_00_asd_00_div_00[1].innerHTML = removed_sites_count;
				lbl_00_a_00_div_00_asd_00_div_00[2].innerHTML = schedule_sites_count;
				
				lbl_00_a_00_div_00_asd_00_div_00[0].style.display = '';
				lbl_00_a_00_div_00_asd_00_div_00[1].style.display = '';
				lbl_00_a_00_div_00_asd_00_div_00[2].style.display = '';
			}
		};
	}


	Main();
}

Header_js();