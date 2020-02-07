// JavaScript Document
/*jshint esversion: 6 */ 

function ManageUsers_js () {
	"use strict";
	var startTime;
	var time;
	var scrollY;
	
	var div_00;
	var html = document.body.parentNode;
	
	var loading = true;
	
	//data retrieval stage variables
	var current_users_retrieved = 0;
	var last_users_retrieved = 0;

	//placeholder stage variables
	var user_visibility_increment = 9;
	var current_users_visible = 0;
	var last_users_visible = 0;
	
	//limit variables
	var loaded_all = false;
	
	var div_01_div_00_div_00;
	var t_div_00_div_01_div_00_div_00;

	var div_03_div_00_div_00;

	
	var users;
	var users_search;
	
	var ipt_00_asd_00_div_00_div_00;
	var btn_00_asd_00_div_00_div_00;
	
	var div_01_div_00;
	var div_00_div_01_div_00;
	var div_01_div_01_div_00;
	var div_02_div_01_div_00;
	
	var PrivilegeArray = ['Administrator','Level 1','Level 2','Level 3'];
			
	function Main(){
		window.requestAnimationFrame(function(timestamp){
			if(loading === true && document.body.id === "manage-users"){
				Initialisation();
				loading = false;
			}
			
			if(loading === false && document.body.id === "manage-users"){
				time.deltaTime = time.start + timestamp - time.now;
				time.now = time.start + timestamp;
				scrollY = window.pageYOffset || document.documentElement.scrollTop || window.scrollY;
				
			}
			
			//if reaching bottom of page, load extra placeholders
			LoadPlaceholders();
			//load in content for new placeholders
			LoadContent();
			//user object animation
			Users();
			
			Main();
		});
	}

	
	function F1(x){
		return (-((x-1) * (x-1)) + 1);
	}
	
	function F2(x){
		return (Math.sin((x - 0.5) * Math.PI))/2 + 0.5;
	}
	
	function Users(){
		var user;
		for(var i = 0; i < last_users_retrieved; i++){
			user = users[i].obj;
			user.scroll_dist = Math.max(user.querySelector('.div-00-div-00-div-00-div-01-div-00-div-00').clientHeight/user.querySelector('.div-00-div-00-div-01-div-00-div-00').clientHeight - 1,0);
			user.scroll_amount = - Math.max(user.querySelector('.div-00-div-00-div-00-div-01-div-00-div-00').clientHeight - (user.querySelector('.div-00-div-00-div-01-div-00-div-00').clientHeight - 40), 0);
			
			if(user.t < user.target_t){
				user.t = Math.min(user.t + time.deltaTime/500/user.scroll_dist, user.target_t);
			}
			if(user.t > user.target_t){
				user.t = Math.max(user.t - time.deltaTime/500/user.scroll_dist, user.target_t);
			}
			user.querySelector('.div-00-div-00-div-00-div-01-div-00-div-00').style.transform = 'translate(0, ' + (F2(user.t) * user.scroll_amount) + 'px)';
			user.querySelector('.lbl-00-div-00-div-00-div-01-div-00-div-00').style.transform = 'translate(' + (1 - F1(1 - Math.min(user.t * 10, 1))) * 100 + '%)';
			user.querySelector('.lbl-00-div-00-div-00-div-01-div-00-div-00').style.opacity = 1 - F1(Math.min(user.t * 10, 1));
		}
		
		for(var j = 0; j < users_search.length; j++){
			user = users_search[j].obj;
			user.scroll_dist = Math.max(user.querySelector('.div-00-div-00-div-00-div-01-div-00-div-00').clientHeight/user.querySelector('.div-00-div-00-div-01-div-00-div-00').clientHeight - 1,0);
			user.scroll_amount = - Math.max(user.querySelector('.div-00-div-00-div-00-div-01-div-00-div-00').clientHeight - (user.querySelector('.div-00-div-00-div-01-div-00-div-00').clientHeight - 40), 0);
			
			if(user.t < user.target_t){
				user.t = Math.min(user.t + time.deltaTime/500/user.scroll_dist, user.target_t);
			}
			if(user.t > user.target_t){
				user.t = Math.max(user.t - time.deltaTime/500/user.scroll_dist, user.target_t);
			}
			user.querySelector('.div-00-div-00-div-00-div-01-div-00-div-00').style.transform = 'translate(0, ' + (F2(user.t) * user.scroll_amount) + 'px)';
			user.querySelector('.lbl-00-div-00-div-00-div-01-div-00-div-00').style.transform = 'translate(' + (1 - F1(1 - Math.min(user.t * 10, 1))) * 100 + '%)';
			user.querySelector('.lbl-00-div-00-div-00-div-01-div-00-div-00').style.opacity = 1 - F1(Math.min(user.t * 10, 1));
		}
	}
	
	function LoadPlaceholders(){
		
		if(div_00.getBoundingClientRect().bottom < window.innerHeight + 300 && loaded_all === false && btn_00_asd_00_div_00_div_00.state === 0){
			current_users_visible = Math.min(current_users_visible + user_visibility_increment, USER_COUNT);
		}
				
		for(last_users_visible; last_users_visible < current_users_visible; last_users_visible++){
			//duplicate template
			var template = t_div_00_div_01_div_00_div_00.cloneNode(true);
			//rename
			template.className = 'p-div-00-div-01-div-00-div-00';
			//append to users array
			users.length ++;
			users[last_users_visible] = new user();
			users[last_users_visible].obj = template;
			//append to container
			div_01_div_00_div_00.appendChild(template);
		}
	}
	
	function LoadContent(){
		//if there are placeholders with no content
		if(current_users_retrieved < current_users_visible){
			GetUsersXHR();
		}
	}
	
	function user(user_id = '', first_name = '', last_name = '', email = '', username = '', privileges = '', profile_src = '', profile_center_x = '', profile_center_y = '', profile_scale = '', cover_src = '', cover_center_x = '', cover_center_y = '', cover_scale = ''){
		this.user_id = user_id;
		this.first_name = first_name;
		this.last_name = last_name;
		this.email = email;
		this.username = username;
		this.privileges = privileges;
		this.profile_src = profile_src;
		this.image_positioning_profile = new image_positioning(profile_center_x, profile_center_y, profile_scale);
		this.cover_src = cover_src;
		this.image_positioning_cover = new image_positioning(cover_center_x, cover_center_y, cover_scale);
	}
	
	function image_positioning(center_x = '', center_y = '', scale = ''){
		this.center_x = center_x;
		this.center_y = center_y;
		this.scale = scale;
	}

	
	function getObj(min, max, search = ''){
		//the min and max article wanted in order
		this.minimum = min;
		this.maximum = max;
		//0 if scheduled users, 1 if active, 2 if removed
		this.state = 1;
		//no text means not a search
		this.search = search;
	}
	
	function GetUsersXHR(){
		//make object, and submit
		var get_obj = new getObj(current_users_retrieved, current_users_visible);
					
		var xhr = new XMLHttpRequest();
		var url = DOCUMENT_ROOT + 'processes/get-users.php';

		//set users_retrieved to equal the visible users. Note that these will both get decreased if there are no more users to view, existing placeholders will be deleted, and any new retrievals will be prevented
		current_users_retrieved = current_users_visible;
		
		var data = JSON.stringify(get_obj);
		xhr.open('POST', url, true);
		xhr.setRequestHeader("Content-Type", "application/json");		
		xhr.send(data);

		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				var retrieved_users = JSON.parse(xhr.responseText);
				//build data				
				for(var i = 0; i < retrieved_users.length; i++){
					//add to users array
					users[i + last_users_retrieved].user_id = retrieved_users[i].user_id;
					users[i + last_users_retrieved].first_name = retrieved_users[i].first_name;
					users[i + last_users_retrieved].last_name = retrieved_users[i].last_name;
					users[i + last_users_retrieved].email = retrieved_users[i].email;
					users[i + last_users_retrieved].privileges = retrieved_users[i].privileges;
					users[i + last_users_retrieved].profile_src = retrieved_users[i].profile_src;
					users[i + last_users_retrieved].image_positioning_profile.center_x = retrieved_users[i].image_positioning_profile.center_x;
					users[i + last_users_retrieved].image_positioning_profile.center_y = retrieved_users[i].image_positioning_profile.center_y;
					users[i + last_users_retrieved].image_positioning_profile.scale = retrieved_users[i].image_positioning_profile.scale;
					users[i + last_users_retrieved].cover_src = retrieved_users[i].cover_src;
					users[i + last_users_retrieved].image_positioning_cover.center_x = retrieved_users[i].image_positioning_cover.center_x;
					users[i + last_users_retrieved].image_positioning_cover.center_y = retrieved_users[i].image_positioning_cover.center_y;
					users[i + last_users_retrieved].image_positioning_cover.scale = retrieved_users[i].image_positioning_cover.scale;
					//set user object
					SetUser(users[i + last_users_retrieved]);
				}
				
				last_users_retrieved += retrieved_users.length;
				
				//if reached the end of items
				if(last_users_retrieved < current_users_retrieved){
					loaded_all = true;
					//delete all placeholder
					for(i = last_users_retrieved; i < current_users_retrieved; i++){
						div_01_div_00_div_00.removeChild(users[i].obj);
					}
					
					current_users_retrieved = last_users_retrieved;
					current_users_visible = last_users_retrieved;
					users.length = last_users_retrieved;
				}
				
				//if there are no users meeting the criteria, reveal no users image
				if(retrieved_users.length === 0 && current_users_retrieved === 0){
					document.querySelector('#div-00-div-00-div-00').style.display = '';
					document.querySelector('#div-01-div-00-div-00').style.display = 'none';
				}
			}
		};
	}
	
	function SetUser(user){
		user.obj.className = 'div-00-div-01-div-00-div-00';
		user.obj.querySelector('.lbl-00-div-00-div-00-div-01-div-00-div-00').innerHTML = PrivilegeArray[user.privileges];
		user.obj.querySelector('.h3-00-div-01-div-00-div-01-div-00-div-00').innerHTML = user.first_name + ' ' + user.last_name;
		user.obj.querySelector('.h4-00-div-01-div-00-div-01-div-00-div-00').innerHTML = user.email;
				
		user.obj.querySelector('.div-00-div-00-div-01-div-00-div-00').addEventListener('click', function(){
			window.open(DOCUMENT_ROOT + 'property/' + user.parameter);
		});
		
		//set images
		user.obj.querySelector('.img-00-spn-00-div-00-div-00-div-00-div-01-div-00-div-00').src = user.profile_src;
		user.obj.querySelector('.img-00-spn-00-div-00-div-00-div-00-div-01-div-00-div-00').onload = function(){
			if(user.obj.querySelector('.img-00-spn-00-div-00-div-00-div-00-div-01-div-00-div-00').naturalHeight/user.obj.querySelector('.img-00-spn-00-div-00-div-00-div-00-div-01-div-00-div-00').naturalWidth < 1){
				user.obj.querySelector('.img-00-spn-00-div-00-div-00-div-00-div-01-div-00-div-00').style.height = user.image_positioning_profile.scale * 100 + '%';
			} else {
				user.obj.querySelector('.img-00-spn-00-div-00-div-00-div-00-div-01-div-00-div-00').style.width = user.image_positioning_profile.scale * 100 + '%';
			}
			user.obj.querySelector('.img-00-spn-00-div-00-div-00-div-00-div-01-div-00-div-00').style.left = 'calc(50% - ' + Math.min(Math.max(user.image_positioning_profile.center_x * user.obj.querySelector('.img-00-spn-00-div-00-div-00-div-00-div-01-div-00-div-00').clientWidth,user.obj.querySelector('.spn-00-div-00-div-00-div-00-div-01-div-00-div-00').clientWidth/2),user.obj.querySelector('.img-00-spn-00-div-00-div-00-div-00-div-01-div-00-div-00').clientWidth - user.obj.querySelector('.spn-00-div-00-div-00-div-00-div-01-div-00-div-00').clientWidth/2) + 'px';
			user.obj.querySelector('.img-00-spn-00-div-00-div-00-div-00-div-01-div-00-div-00').style.top = 'calc(50% - ' + Math.min(Math.max(user.image_positioning_profile.center_y * user.obj.querySelector('.img-00-spn-00-div-00-div-00-div-00-div-01-div-00-div-00').clientHeight,user.obj.querySelector('.spn-00-div-00-div-00-div-00-div-01-div-00-div-00').clientHeight/2),user.obj.querySelector('.img-00-spn-00-div-00-div-00-div-00-div-01-div-00-div-00').clientHeight - user.obj.querySelector('.spn-00-div-00-div-00-div-00-div-01-div-00-div-00').clientHeight/2) + 'px';
			user.obj.querySelector('.img-00-spn-00-div-00-div-00-div-00-div-01-div-00-div-00').onload = '';
		}
		
		//set images
		user.obj.querySelector('.img-00-spn-00-div-00-div-00-div-01-div-00-div-00').src = user.cover_src;
		user.obj.querySelector('.img-00-spn-00-div-00-div-00-div-01-div-00-div-00').onload = function(){
			if(user.obj.querySelector('.img-00-spn-00-div-00-div-00-div-01-div-00-div-00').naturalHeight/user.obj.querySelector('.img-00-spn-00-div-00-div-00-div-01-div-00-div-00').naturalWidth < user.obj.querySelector('.spn-00-div-00-div-00-div-01-div-00-div-00').clientHeight/user.obj.querySelector('.spn-00-div-00-div-00-div-01-div-00-div-00').clientWidth){
				user.obj.querySelector('.img-00-spn-00-div-00-div-00-div-01-div-00-div-00').style.height = user.image_positioning_cover.scale * 100 + '%';
			} else {
				user.obj.querySelector('.img-00-spn-00-div-00-div-00-div-01-div-00-div-00').style.width = user.image_positioning_cover.scale * 100 + '%';
			}
			user.obj.querySelector('.img-00-spn-00-div-00-div-00-div-01-div-00-div-00').style.left = 'calc(50% - ' + Math.min(Math.max(user.image_positioning_cover.center_x * user.obj.querySelector('.img-00-spn-00-div-00-div-00-div-01-div-00-div-00').clientWidth,user.obj.querySelector('.spn-00-div-00-div-00-div-01-div-00-div-00').clientWidth/2),user.obj.querySelector('.img-00-spn-00-div-00-div-00-div-01-div-00-div-00').clientWidth - user.obj.querySelector('.spn-00-div-00-div-00-div-01-div-00-div-00').clientWidth/2) + 'px)';
			user.obj.querySelector('.img-00-spn-00-div-00-div-00-div-01-div-00-div-00').style.top = 'calc(50% - ' + Math.min(Math.max(user.image_positioning_cover.center_y * user.obj.querySelector('.img-00-spn-00-div-00-div-00-div-01-div-00-div-00').clientHeight,user.obj.querySelector('.spn-00-div-00-div-00-div-01-div-00-div-00').clientHeight/2),user.obj.querySelector('.img-00-spn-00-div-00-div-00-div-01-div-00-div-00').clientHeight - user.obj.querySelector('.spn-00-div-00-div-00-div-01-div-00-div-00').clientHeight/2) + 'px)';
			user.obj.querySelector('.img-00-spn-00-div-00-div-00-div-01-div-00-div-00').onload = '';
		}
		
		//initialise buttons
		//SetUserActions(user);
	}
	
	function NumberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	
	function SetUserActions(user){
		//edit button
		user.obj.querySelectorAll('.btn-00-div-01-div-00-div-01-div-00-div-00')[0].addEventListener('click', function(){
			div_01_div_00.style.display = '';
			div_00_div_01_div_00.style.display = '';
			html.style.overflow = 'hidden';
			div_00_div_01_div_00.focus_user = user;
			div_00_div_01_div_00.querySelector('label').innerHTML = 'Edit ' + user.name + '?';
		});
		
		//schedule button
		user.obj.querySelectorAll('.btn-00-div-01-div-00-div-01-div-00-div-00')[1].addEventListener('click', function(){
			div_01_div_00.style.display = '';
			html.style.overflow = 'hidden';
			div_01_div_01_div_00.style.display = '';
			div_01_div_01_div_00.set_schedule = SetScheduled(new Date().getTime());
			
			div_01_div_01_div_00.querySelectorAll('.div-00-div-00-div-00-div-01-div-01-div-00')[0].innerHTML = Zerofill(div_01_div_01_div_00.set_schedule.month,2);
			div_01_div_01_div_00.querySelectorAll('.div-00-div-00-div-00-div-01-div-01-div-00')[1].innerHTML = Zerofill(div_01_div_01_div_00.set_schedule.day,2);
			div_01_div_01_div_00.querySelectorAll('.div-00-div-00-div-00-div-01-div-01-div-00')[2].innerHTML = Zerofill(div_01_div_01_div_00.set_schedule.year,4);
			div_01_div_01_div_00.querySelectorAll('.div-00-div-00-div-01-div-01-div-01-div-00')[0].innerHTML = Zerofill(div_01_div_01_div_00.set_schedule.hour,2);
			div_01_div_01_div_00.querySelectorAll('.div-00-div-00-div-01-div-01-div-01-div-00')[1].innerHTML = Zerofill(div_01_div_01_div_00.set_schedule.minutes,2);
			div_01_div_01_div_00.focus_user = user;
		});
		
		//delete button
		user.obj.querySelectorAll('.btn-00-div-01-div-00-div-01-div-00-div-00')[2].addEventListener('click', function(){
			div_01_div_00.style.display = '';
			html.style.overflow = 'hidden';
			div_02_div_01_div_00.style.display = '';
			div_02_div_01_div_00.focus_user = user;
			div_02_div_01_div_00.querySelector('label').innerHTML = 'Are you sure you want to remove ' + user.name + '?';
		});
		
		
	}
	
	function SetScheduled(timestamp){
		//get date
		var date = new Date(timestamp - 3600000 * 8);
				
		var scheduled = {month:0,day:0,year:0,hour:0,minutes:0};
		
		scheduled.month = date.getMonth() + 1;
		scheduled.day = date.getDate();
		scheduled.year = date.getFullYear();
		scheduled.hour = date.getUTCHours();
		scheduled.minutes = date.getUTCMinutes();
		return scheduled;
	}
	
	function Zerofill(number, length){
		return new Array(length - number.toString().length + 1).join('0') + number;
	}
	
	function SearchInitialisation(){
		ipt_00_asd_00_div_00_div_00 = document.querySelector('#ipt-00-asd-00-div-00-div-00');
		btn_00_asd_00_div_00_div_00 = document.querySelector('#btn-00-asd-00-div-00-div-00');
				
		btn_00_asd_00_div_00_div_00.state = 0;
		
		btn_00_asd_00_div_00_div_00.addEventListener('click', function(){
			BeginSearch(btn_00_asd_00_div_00_div_00);
		});
		
		//if input changes, then reset search button
		ipt_00_asd_00_div_00_div_00.addEventListener('input', function(){
			btn_00_asd_00_div_00_div_00.querySelector('path').setAttribute('d','M 3.5 0.5 A 3 3 0 1 1 3.5 6.5 A 3 3 0 1 1 3.5 0.5 M 9 9 L 5.62 5.62');
			btn_00_asd_00_div_00_div_00.state = 2;
		});
		
		//if enter button triggered
		ipt_00_asd_00_div_00_div_00.addEventListener('keyup', function(event){
			if(event.keyCode === 13){
				event.preventDefault();
				BeginSearch(btn_00_asd_00_div_00_div_00, true);
			}
		});
	}
	
	function BeginSearch(button, override = false){
		if(button.state === 0 || button.state === 2 || override === true){
			GetSearchXHR(ipt_00_asd_00_div_00_div_00.value);
			button.state = 1;
			button.querySelector('path').setAttribute('d','M 1 1 L 9 9 M 1 9 L 9 1');
		} else {
			//make main container visible again
			document.querySelector('#div-01-div-00-div-00').style.display = '';
			document.querySelector('#div-02-div-00-div-00').style.display = 'none';
			document.querySelector('#div-03-div-00-div-00').style.display = 'none';
			button.state = 0;
			button.querySelector('path').setAttribute('d','M 3.5 0.5 A 3 3 0 1 1 3.5 6.5 A 3 3 0 1 1 3.5 0.5 M 9 9 L 5.62 5.62');
		}
	}
	
	function GetSearchXHR(search_text){
		//hide users
		document.querySelector('#div-01-div-00-div-00').style.display = 'none';
		document.querySelector('#div-03-div-00-div-00').style.display = '';
		
		//make object, and submit
		var get_obj = new getObj(0, 999999999, search_text);
					
		var xhr = new XMLHttpRequest();
		var url = DOCUMENT_ROOT + 'processes/get-users.php';
		
		var data = JSON.stringify(get_obj);
		xhr.open('POST', url, true);
		xhr.setRequestHeader("Content-Type", "application/json");		
		xhr.send(data);

		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				var retrieved_users = JSON.parse(xhr.responseText);
				//reset div-03
				div_03_div_00_div_00.innerHTML = '';
				users_search.length = 0;
				//build data
				for(var i = 0; i < retrieved_users.length; i++){
					//make user object
					var template = t_div_00_div_01_div_00_div_00.cloneNode(true);
					//rename
					template.className = 'p-div-00-div-01-div-00-div-00';
					//append to container
					div_03_div_00_div_00.appendChild(template);
					//add to users array
					users_search.length ++;
					users_search[i] = new user(retrieved_users[i].id, retrieved_users[i].name, retrieved_users[i].url, retrieved_users[i].views, template);
					//set user object
					SetUser(users_search[i]);
				}
				
				//if there are no users meeting the criteria, reveal no users image
				if(retrieved_users.length === 0){
					document.querySelector('#div-02-div-00-div-00').style.display = '';
					document.querySelector('#div-03-div-00-div-00').style.display = 'none';
				} else {
					document.querySelector('#div-02-div-00-div-00').style.display = 'none';
				}
			}
		};
	}
	
	function InitialiseDialogs(){
		/*div_01_div_00 = document.querySelector('#div-01-div-00');
		div_00_div_01_div_00 = document.querySelector('#div-00-div-01-div-00');
		div_00_div_01_div_00.focus_user = null;
		div_01_div_01_div_00 = document.querySelector('#div-01-div-01-div-00');
		div_01_div_01_div_00.focus_user = null;
		div_02_div_01_div_00 = document.querySelector('#div-02-div-01-div-00');
		div_02_div_01_div_00.focus_user = null;
		
		//edit user dialog
		div_00_div_01_div_00.querySelector('#btn-00-div-00-div-01-div-00').addEventListener('click', function(){
			//open details
			window.open(DOCUMENT_ROOT + 'admin/users/set-user-details/' + div_00_div_01_div_00.focus_user.parameter);
		});
		div_00_div_01_div_00.querySelector('#btn-01-div-00-div-01-div-00').addEventListener('click', function(){
			//open editor
			window.open(DOCUMENT_ROOT + 'admin/users/user-editor/' + div_00_div_01_div_00.focus_user.parameter);
		});
		//cancel user editor opening
		div_00_div_01_div_00.querySelector('#btn-02-div-00-div-01-div-00').addEventListener('click', function(){
			div_00_div_01_div_00.focus_user = null;
			div_01_div_00.style.display = 'none';
			div_00_div_01_div_00.style.display = 'none';
			html.style.overflow = '';
		});
		
		//schedule user dialog
		div_01_div_01_div_00.querySelector('#btn-00-div-01-div-01-div-00').addEventListener('click', function(){
			var schedule_ts = GetTimestamp(div_01_div_01_div_00.set_schedule);
			Scheduleuser(div_01_div_01_div_00.focus_user, schedule_ts);
		});
		//cancel user metrics
		div_01_div_01_div_00.querySelector('#btn-01-div-01-div-01-div-00').addEventListener('click', function(){
			div_01_div_01_div_00.focus_user = null;
			div_01_div_00.style.display = 'none';
			div_01_div_01_div_00.style.display = 'none';
			html.style.overflow = '';
		});
		
		//buttons on schedule user dialog
		div_01_div_01_div_00.querySelectorAll('.btn-00-div-00-div-00-div-01-div-01-div-00')[0].addEventListener('click', function(){
			//increase month
			div_01_div_01_div_00.set_schedule.month = Modulo(div_01_div_01_div_00.set_schedule.month,12)+1;
			div_01_div_01_div_00.querySelectorAll('.div-00-div-00-div-00-div-01-div-01-div-00')[0].innerHTML = Zerofill(div_01_div_01_div_00.set_schedule.month,2);
		});
		div_01_div_01_div_00.querySelectorAll('.btn-01-div-00-div-00-div-01-div-01-div-00')[0].addEventListener('click', function(){
			//decrease month
			div_01_div_01_div_00.set_schedule.month = Modulo(div_01_div_01_div_00.set_schedule.month - 2,12) + 1;
			div_01_div_01_div_00.querySelectorAll('.div-00-div-00-div-00-div-01-div-01-div-00')[0].innerHTML = Zerofill(div_01_div_01_div_00.set_schedule.month,2);
		});
		div_01_div_01_div_00.querySelectorAll('.btn-00-div-00-div-00-div-01-div-01-div-00')[1].addEventListener('click', function(){
			//increase day
			div_01_div_01_div_00.set_schedule.day = Modulo(div_01_div_01_div_00.set_schedule.day,31)+1;
			div_01_div_01_div_00.querySelectorAll('.div-00-div-00-div-00-div-01-div-01-div-00')[1].innerHTML = Zerofill(div_01_div_01_div_00.set_schedule.day,2);
		});
		div_01_div_01_div_00.querySelectorAll('.btn-01-div-00-div-00-div-01-div-01-div-00')[1].addEventListener('click', function(){
			//decrease day
			div_01_div_01_div_00.set_schedule.day = Modulo(div_01_div_01_div_00.set_schedule.day - 2,31) + 1;
			div_01_div_01_div_00.querySelectorAll('.div-00-div-00-div-00-div-01-div-01-div-00')[1].innerHTML = Zerofill(div_01_div_01_div_00.set_schedule.day,2);
		});
		div_01_div_01_div_00.querySelectorAll('.btn-00-div-00-div-00-div-01-div-01-div-00')[2].addEventListener('click', function(){
			//increase year
			div_01_div_01_div_00.set_schedule.year = div_01_div_01_div_00.set_schedule.year + 1;
			div_01_div_01_div_00.querySelectorAll('.div-00-div-00-div-00-div-01-div-01-div-00')[2].innerHTML = Zerofill(div_01_div_01_div_00.set_schedule.year,4);
		});
		div_01_div_01_div_00.querySelectorAll('.btn-01-div-00-div-00-div-01-div-01-div-00')[2].addEventListener('click', function(){
			//decrease year
			div_01_div_01_div_00.set_schedule.year = div_01_div_01_div_00.set_schedule.year - 1;
			div_01_div_01_div_00.querySelectorAll('.div-00-div-00-div-00-div-01-div-01-div-00')[2].innerHTML = Zerofill(div_01_div_01_div_00.set_schedule.year,4);
		});
		
		div_01_div_01_div_00.querySelectorAll('.btn-00-div-00-div-01-div-01-div-01-div-00')[0].addEventListener('click', function(){
			//increase hours
			div_01_div_01_div_00.set_schedule.hour = Modulo(div_01_div_01_div_00.set_schedule.hour + 1,24);
			div_01_div_01_div_00.querySelectorAll('.div-00-div-00-div-01-div-01-div-01-div-00')[0].innerHTML = Zerofill(div_01_div_01_div_00.set_schedule.hour,2);
		});
		div_01_div_01_div_00.querySelectorAll('.btn-01-div-00-div-01-div-01-div-01-div-00')[0].addEventListener('click', function(){
			//decrease hours
			div_01_div_01_div_00.set_schedule.hour = Modulo(div_01_div_01_div_00.set_schedule.hour - 1,24);
			div_01_div_01_div_00.querySelectorAll('.div-00-div-00-div-01-div-01-div-01-div-00')[0].innerHTML = Zerofill(div_01_div_01_div_00.set_schedule.hour,2);
		});
		div_01_div_01_div_00.querySelectorAll('.btn-00-div-00-div-01-div-01-div-01-div-00')[1].addEventListener('click', function(){
			//increase minutes
			div_01_div_01_div_00.set_schedule.minutes = Modulo(div_01_div_01_div_00.set_schedule.minutes + 1,60);
			div_01_div_01_div_00.querySelectorAll('.div-00-div-00-div-01-div-01-div-01-div-00')[1].innerHTML = Zerofill(div_01_div_01_div_00.set_schedule.minutes,2);
		});
		div_01_div_01_div_00.querySelectorAll('.btn-01-div-00-div-01-div-01-div-01-div-00')[1].addEventListener('click', function(){
			//decrease minutes
			div_01_div_01_div_00.set_schedule.minutes = Modulo(div_01_div_01_div_00.set_schedule.minutes - 1,60);
			div_01_div_01_div_00.querySelectorAll('.div-00-div-00-div-01-div-01-div-01-div-00')[1].innerHTML = Zerofill(div_01_div_01_div_00.set_schedule.minutes,2);
		});
		
		
		//remove user dialog
		div_02_div_01_div_00.querySelector('#btn-00-div-02-div-01-div-00').addEventListener('click', function(){
			Removeuser(div_02_div_01_div_00.focus_user);
		});
		//cancel user removal
		div_02_div_01_div_00.querySelector('#btn-01-div-02-div-01-div-00').addEventListener('click', function(){
			div_02_div_01_div_00.focus_user = null;
			div_01_div_00.style.display = 'none';
			div_02_div_01_div_00.style.display = 'none';
			html.style.overflow = '';
		});
		
		//close dialogs if clicked outside box
		div_01_div_00.addEventListener('click', function(e){
			if(e.target.id === 'div-01-div-00'){
				div_00_div_01_div_00.focus_user = null;
				div_00_div_01_div_00.style.display = 'none';
				div_01_div_01_div_00.focus_user = null;
				div_01_div_01_div_00.style.display = 'none';
				div_02_div_01_div_00.focus_user = null;
				div_02_div_01_div_00.style.display = 'none';
				html.style.overflow = '';
				div_01_div_00.style.display = 'none';
			}
		});
		
		*/
	}
	
	function Modulo(x, n){
		return ((x%n)+n)%n;
	}
	
	function GetTimestamp(time){
		//make and set new date object
		var date = new Date(Date.UTC(time.year, (time.month - 1), time.day, time.hour, time.minutes, 0, 0));
		
		return (Math.floor((date.getTime())/1000) + 3600 * 8);
	}
	
	function ScheduleUser(user, schedule_ts){
		//hide delete window
		div_01_div_00.style.display = 'none';
		div_02_div_01_div_00.style.display = 'none';
		html.style.overflow = '';
					
		//do xhr to remove user

		//make object, and submit
		var xhr = new XMLHttpRequest();
		var url = DOCUMENT_ROOT + 'processes/user-action.php';

		xhr.open('POST', url, true);
		xhr.setRequestHeader("Content-Type", "application/json");	
		xhr.setRequestHeader("User-Id", user.id);		
		xhr.setRequestHeader("User-Schedule-Timestamp", schedule_ts);		
		xhr.setRequestHeader("User-Action", 2);		
		xhr.send();

		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				//force refresh of aside
				UPDATE_USER_COUNTERS = true;
				//if not in search
				if(btn_00_asd_00_div_00_div_00.state === 0){
					//remove child
					user.obj.parentElement.removeChild(user.obj);
					//decrease all counters
					current_users_retrieved--;
					last_users_retrieved--;
					current_users_visible--;
					last_users_visible--;
					//shift down users on main users array
					var shift = false;
					for(var i = 0; i < users.length; i++){
						if(shift === false){
							if(users[i].id === user.id){
								shift = true;
							}
						} else {
							if(i > 0){
								users[i - 1] = users[i];
							}
						}
					}
				} else {
					//remove child
					user.obj.parentElement.removeChild(user.obj);

					//decrease all counters
					current_users_retrieved--;
					last_users_retrieved--;
					current_users_visible--;
					last_users_visible--;
					//shift down users on main user list
					var shift_j = false;
					for(var j = 0; j < users.length; j++){
						if(shift_j === false){
							if(users[j].id === user.id){
								//remove from non search object
								div_01_div_00_div_00.removeChild(users[j].obj);
								shift_j = true;
							}
						} else {
							if(j > 0){
								users[j - 1] = users[j];
							}
						}
					}
					//shift down users on search user list
					var shift_k = false;
					for(var k = 0; k < users_search.length; k++){
						if(shift_k === false){
							if(users_search[k].id === user.id){
								shift_k = true;
							}
						} else {
							if(k > 0){
								users_search[k - 1] = users_search[k];
							}
						}
					}
					
					users_search.length --;
					
					//check if empty search
					//if there are no users meeting the criteria, reveal no users image
					if(users_search.length === 0){
						document.querySelector('#div-02-div-00-div-00').style.display = '';
						document.querySelector('#div-03-div-00-div-00').style.display = 'none';
					}
				}
			}
		};
	}
	
	function RemoveUser(user){
		//hide delete window
		div_01_div_00.style.display = 'none';
		div_02_div_01_div_00.style.display = 'none';
		html.style.overflow = '';
		
		//do xhr to remove user

		//make object, and submit
		var xhr = new XMLHttpRequest();
		var url = DOCUMENT_ROOT + 'processes/user-action.php';

		xhr.open('POST', url, true);
		xhr.setRequestHeader("Content-Type", "application/json");	
		xhr.setRequestHeader("User-Id", user.id);		
		xhr.setRequestHeader("User-Action", 0);		
		xhr.send();

		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				//force refresh of aside
				UPDATE_USER_COUNTERS = true;
				//if not in search
				if(btn_00_asd_00_div_00_div_00.state === 0){
					//remove child
					user.obj.parentElement.removeChild(user.obj);
					//decrease all counters
					current_users_retrieved--;
					last_users_retrieved--;
					current_users_visible--;
					last_users_visible--;
					//shift down users on main users array
					var shift = false;
					for(var i = 0; i < users.length; i++){
						if(shift === false){
							if(users[i].id === user.id){
								shift = true;
							}
						} else {
							if(i > 0){
								users[i - 1] = users[i];
							}
						}
					}
				} else {
					//remove child
					user.obj.parentElement.removeChild(user.obj);

					//decrease all counters
					current_users_retrieved--;
					last_users_retrieved--;
					current_users_visible--;
					last_users_visible--;
					//shift down users on main user list
					var shift_j = false;
					for(var j = 0; j < users.length; j++){
						if(shift_j === false){
							if(users[j].id === user.id){
								//remove from non search object
								div_01_div_00_div_00.removeChild(users[j].obj);
								shift_j = true;
							}
						} else {
							if(j > 0){
								users[j - 1] = users[j];
							}
						}
					}
					//shift down users on search user list
					var shift_k = false;
					for(var k = 0; k < users_search.length; k++){
						if(shift_k === false){
							if(users_search[k].id === user.id){
								shift_k = true;
							}
						} else {
							if(k > 0){
								users_search[k - 1] = users_search[k];
							}
						}
					}
					
					users_search.length --;
					
					//check if empty search
					//if there are no users meeting the criteria, reveal no users image
					if(users_search.length === 0){
						document.querySelector('#div-02-div-00-div-00').style.display = '';
						document.querySelector('#div-03-div-00-div-00').style.display = 'none';
					}
				}
			}
		};
	}
	
	
	function Initialisation(){
		
		//vars
		startTime = new Date().getTime();
		time = {start : startTime, now : startTime, deltaTime : 0};
		scrollY = 0;
		
		div_00 = document.querySelector('#div-00');
		
		
		div_01_div_00_div_00 = document.querySelector('#div-01-div-00-div-00');
		t_div_00_div_01_div_00_div_00 = document.querySelector('.t-div-00-div-01-div-00-div-00');
		
		div_03_div_00_div_00 = document.querySelector('#div-03-div-00-div-00');


		InitialiseDialogs();
		
		users = [];
		users_search = [];
		
		SearchInitialisation();
		
		//if there are no users
		if(USER_COUNT === 0){
			document.querySelector('#div-00-div-00-div-00').style.display = '';
			document.querySelector('#div-01-div-00-div-00').style.display = 'none';
		}
		
	}

	Main();
}

ManageUsers_js();