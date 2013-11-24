
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1413709252196075', // App ID
      status     : true, 
      cookie     : true, 
      xfbml      : true 
    });
    
    
	FB.Event.subscribe('auth.authResponseChange', function(response) 
	{
 	 if (response.status === 'connected') 
  	 {
  		//SUCCESS
    }	 
	 else if (response.status === 'not_authorized') 
    {
		//FAILED
    } 
    else 
    {
    	//UNKNOWN ERROR
    }
	});	
	
   };
    
   function loginWithFacebook()
	{
		FB.login(function(response) 
		{
			if (response.authResponse) 
		   {
		   	showSharingDetails();
  			} 
         else 
  			{
  	    	 console.log('User cancelled login or did not authorize.');
   		}
		},{scope: 'email,user_photos,user_videos,user_likes,user_friends,user_interests'});
	}

   function getUserLikes()
   {
    FB.api('/me/likes',function(response) {
     document.getElementById('txtArea').value=""; 
     showTextArea();	
     document.getElementById('txtArea').value+=(JSON.stringify(response.data));
    });
   }

   function getUserInterests()
   {
    FB.api('/me/interests',function(response) {
     document.getElementById('txtArea').value="";
     showTextArea();	
     document.getElementById('txtArea').value+=(JSON.stringify(response.data)); 
    });
   }
   
   function getFriends()
   {
    FB.api('/me/friends',function(response) {
    	document.getElementById('txtArea').value="";
      showTextArea();
      document.getElementById('txtArea').value+=(JSON.stringify(response.data)); 
    });
   }
    
	function logout()
	{
      hideSharingDetails();
		FB.logout(function(){document.location.reload();});
	}

  // Load the SDK asynchronously
  (function(d){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/en_US/all.js";
     ref.parentNode.insertBefore(js, ref);
   }(document));


	function postToFeed() 
   { 
   	var url = document.getElementById('postContent').value;
    	if(url.substring(0,4) != "http")
    	{
      	alert("Only Links can be posted.Start them with http/s");
      	document.getElementById('postContent').value='';
      	return;
    	} 
    	// calling the API ...
    
    	FB.ui(
    	{
     		method: 'feed',
     		link: url,
    	},
    	function(response) 
    	{
     		if (response && response.post_id) 
     		{
      		alert('Post was published.');
     		} 
     		else 
     		{
      		alert('Post was not published.');
     		}
    	});  
	}

  	function showSharingDetails()
  	{
   	document.getElementById('btnLogout').style.display="block";
   	document.getElementById('postDiv').style.display="block";
   	document.getElementById('status').style.display="none"; 
  	}

  	function hideSharingDetails()
  	{
    	document.getElementById('postDiv').style.display="none";
    	document.getElementById('btnLogout').style.display="none";
    	document.getElementById('status').style.display="block";
      document.getElementById('txtArea').style.display="none";
  	}

   function showTextArea()
   {
      document.getElementById('txtArea').style.display="block";
   }

