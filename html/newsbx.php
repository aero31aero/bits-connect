<html>
<head>
    <link rel="icon" 
      type="image/png" 
      href="favicon.png">
  <title>Bits Connect</title>
    
</head>
<link rel="stylesheet" type="text/css" href="index.css"/>
<link href="libraries/random/css/bootstrap-tour-standalone.min.css" rel="stylesheet"/>


<body>


<!--    <link rel="stylesheet" href="magnific-popup/magnific-popup.css">
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="magnific-popup/jquery.magnific-popup.js"></script>-->
<div class="container">
  <div class="card"></div>
  <div class="card">
    <h1 class="title">Bits Connect</h1>
    
      <div class="input-container">
        <input type="text" id="Username" onkeypress="onpasspress(event)"/>
        <label for="Username">Username</label>
        <div class="bar"></div>
      </div>
      <div class="input-container">
        <input type="password" id="Password" onkeypress="onpasspress(event)"/>
        <label for="Password">Password</label>
        <div class="bar"></div>
      </div>
      <div class="button-container">
        <button><span>Login</span></button>
      </div>
      <div class="footer" onclick="openfaq()"><a href="#">WHAT IS THIS?</a>
          </div>

    
  </div>
  <div class="card alt">
    <div class="toggle material-icons">person_add</div>
    <h1 class="title">Register
      <div class="close"></div>
    </h1>
    
      <div class="input-container">
        <input type="text" onkeypress="onpasspress2(event)" id="name" />
        <label for="Name">Username</label>
        <div class="bar"></div>
      </div>
      <div class="input-container">
        <input type="text" onkeypress="onpasspress2(event)" id="bitsid"/>
        <label for="BITS Id">BITS Id (f20*****)</label>
        <div class="bar"></div>
      </div>
      <div class="input-container">
        <input type="password" onkeypress="onpasspress2(event)" id="password" pattern=".{8,20}" />
        <label for="Password">Password</label>
        <div class="bar"></div>
      </div>
      <div class="button-container">
        <button id='regbutt'><span>Register</span></button>
      </div>

    
  </div>
</div>
<div id="main" class="hidden-element"> 
  <div id='wrapper'>
      
  <!-- popup -->
  
  <div id='search_wrapper'>
      <div class="right" id='usernamebar'></div>
      <div class="appnamebar" id='groupList'><div class="togglegroups"><span>The BPHC Wall</span><span  class="material-icons" id='groups_dropDown_arrow'>keyboard_arrow_down</span></div>
        <div class='list' id="grouplist">  
        </div>
      </div>
      <div class="toggle tooltip right material-icons" onclick="openfaq();" title="Help and FAQ">help_outline</div>      
      <input id='searchbar' placeholder="Search All Posts"/>
      
      
    </div>
  <div id="popfil" class= "cover">
  <div id='scrollable'> 
  <div id="popfil" class= "cover">
  <div id='post_wrapper'>
          
  </div>
  </div>
  </div>
  </div>
    <div class="button material-icons tooltip" id="goToTop" title="Go To Top" onclick="document.getElementById('scrollable').scrollTop=0">publish</div>
    <div id='button_drawer'>
        <div class="button tooltip b-about-us material-icons" title="About Us" onclick="onbragclick()" >contacts</div> 
        <div class="button tooltip b-feedback inactive material-icons" id='open_composer' title="Give Feedback">feedback</div> 
        <div class="button tooltip b-settings material-icons" title="Common Tags" onclick="onsettingsclick()">label_outline</div> 
        <div class="button tooltip b-all-posts material-icons rotated" onclick="loadallposts()" title="Show All Posts">last_page</div> 
        <div class="button tooltip b-logout material-icons" onclick="logout()" title="Logout">power_settings_new</div>
    </div>
  <div id='compose'>
    <div class="composer" id='composer'>
      <div class='header'>New Post<span id='close_composer'>&#10005;</span></div>
      <div class="direct"><span>Direct:</span><input/></div>
      <textarea></textarea>
      <div class="extras"></div>
    </div>
    
    <div class="button inactive material-icons" id='publish_comp'>send</div>
  </div>  
  </div>
  <div id='sidebar'>
  <h3>Active Tags</h3>
    <div id="tags" class="tour-tags">
    </div>
    <div class='input_wrapper'>
            <input list='tagOptions' id='tagInput' placeholder="Add New Tag..."/>
    </div>
  </div>
</div>
<div id='overlay'></div>
<div id='closePop'><i class='material-icons'>close</i></div>
    
    <script type="text/javascript" src="libraries/jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="libraries/toastr.min.css">
    <script type="text/javascript" src="libraries/toastr.min.js"></script>
     <link rel="stylesheet" type="text/css" href="libraries/tooltipster.css">
    <script type="text/javascript" src="libraries/tooltipster.min.js"></script>
    <script src="libraries/sweetalert.min.js"></script>
    <link rel="stylesheet" type="text/css" href="libraries/sweetalert.css">   
    <script src="/libraries/random/js/bootstrap-tour-standalone.js"></script>
    <script type="text/javascript" src="index.js"></script>
    <script>
        $(document).ready(function() {
            $('.tooltip').tooltipster({
            animation: 'grow',
            delay: 10,
            theme: 'tooltipster-default',
            touchDevices: false,
            trigger: 'hover'
            });
        });
    </script>
    <script><?php session_start(); 
        if($_SESSION['userid']){
        echo 'curusername="' . $_SESSION['username'] . '";';
        echo 'curuserid="' . $_SESSION['userid'] . '";';
        }?>
        if(curusername!= undefined || curusername!= null){
//                    loadtags();
//                    bringmain(); 
//                    updateSize();
//                    loadposts();
//                    loadgroups();
//                    loadtaggroups();
                    
                    //toastr.success('Welcome back ' + username + '.', 'Authentication Successful');  
            // code to log out
            
        }
        
    </script>

</body>

</html>
