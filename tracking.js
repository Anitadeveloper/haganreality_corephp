// JavaScript Document
/* jshint esversion: 6 */

function Property_js () {
	"use strict";
	var startTime;
	var time;

	var load = true;

	function Main(){
		window.requestAnimationFrame(function(timestamp){
			if(load === true && document.body.id === "property"){
				Initialisation();
				load = false;
			}
			
			if(startTime !== undefined && document.body.id === "property"){
				time.deltaTime = time.start + timestamp - time.now;
				time.now = time.start + timestamp;

			}
			
			Main();
		});
	}
	
	function Initialisation(){
		startTime = new Date().getTime();
		time = {start : startTime, now : startTime, deltaTime : 0};
		
		//send first data
		
		VisitorUpdateXHR();
	}
	
	
	//sends xhr every time last one is returned
	//update timestamp
	//send number of 'interactions', a global variable set by property.js. 
	//interactions contains:
		//scroll events including start and end position, timestamps for both
		//clicks on tabs
		//clicks on forward/backward gallery, resources, and floorplan arrows
		//clicks on matterports
		//clicks on resources
		//clicks on office or phone number, email, website, and facebook link
		//schedule section starting and submit times
	function VisitorUpdateXHR(){
		
		var url = DOCUMENT_ROOT + 'processes/visitor-update-data.php';

		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				VisitorUpdateXHR();
			}
		};

		xhr.open('POST', url, true);
		xhr.setRequestHeader('site-id', SITE_ID);
		xhr.setRequestHeader('visitor-id', VISITOR_ID);
		xhr.send();
	
	}
	
	

	Main();
}

Property_js();