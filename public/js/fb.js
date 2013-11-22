
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1413709252196075', // App ID
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });
    
    
	FB.Event.subscribe('auth.authResponseChange', function(response) 
	{
 	 if (response.status === 'connected') 
  	{
  		document.getElementById("message").innerHTML +=  "<br>Connected to Facebook";
  		//SUCCESS
  		
  	}	 
	else if (response.status === 'not_authorized') 
    {
    	document.getElementById("message").innerHTML +=  "<br>Failed to Connect";

		//FAILED
    } else 
    {
    	document.getElementById("message").innerHTML +=  "<br>Logged Out";

    	//UNKNOWN ERROR
    }
	});	
	
    };
    
    function loginWithFacebook()
	 {
	
		FB.login(function(response) {
		   if (response.authResponse) 
		   {
		    	//getUserInfo();
            showSharingDetails();
  			} else 
  			{
  	    	 console.log('User cancelled login or did not fully authorize.');
   			}
		 },{scope: 'email,user_photos,user_videos'});
	
	
	}

	function Logout()
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


function postToFeed() {
    
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
  }

  function loginWithTwitter()
  {
    $.get( "/loginWithTwitter", function( data ) {
         alert( "done" );
       });
  }
