var container=document.getElementsByClassName('container')[0],
close=document.getElementsByClassName('close')[0],
toggle=document.getElementsByClassName('toggle')[0],
buttons=container.getElementsByTagName('button'),
main=document.getElementById('main'),
sidebar=document.getElementById('sidebar'),
searchbar=document.getElementById('searchbar'),
prefIn=document.getElementById('tagInput'),
tagHolder=document.getElementById('tags'),
list_counter=-1,
    retainTagOptions=0,
    groupTagHolder=null;
refreshTags();
document.getElementById('name').value="";
    document.getElementById('bitsid').value="";
    document.getElementById('password').value="";

function loadToasterOptions(){

    toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": true,
  "progressBar": true,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "100",
  "timeOut": "10000",
  "extendedTimeOut": "0",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
} 
};
loadToasterOptions();
var curuserid=0;
var curusername= null;

//getXMLHTTPrequest
function getRequest(){
    var request= new XMLHttpRequest();
    return request;
}

//function for signup dialog box to open
toggle.onclick=function(){
    container.classList.add('active');
    toggle.innerHTML="";
    
}

//function for signup dialog box to close
close.onclick=function(){
    container.classList.remove('active');
    //toggle.innerHTML="&#9998;";
    toggle.innerHTML="person_add";
}

//set sidebar height to window height
sidebar.style.height=window.innerHeight;

//set the posts wrapper height to window height
document.body.onload=function(){
    /*window.scrollTo(0,0);*/
    window.scrollTop=0;
    sidebar.style.height=window.innerHeight;
    document.getElementById('wrapper').style.height=window.innerHeight; 
}

//update sidebar and posts wrapper heights on window resize
window.onresize=updateSize;
function updateSize()
{
    sidebar.style.height=window.innerHeight;
    document.getElementById('wrapper').style.height=window.innerHeight;
}

var idclicked=null;
//for (var i = 0; i < buttons.length; i++) {
//    idclicked=buttons[i].getAttribute('id');
//    //console.log(buttons[i].getElementById('regbutt').toString);
//    
//    buttons[i].onclick=bringmain;
//    
//};
buttons[1].onclick=register;
buttons[0].onclick=login;

function register(){
    var request= getRequest();
    var username=document.getElementById('name').value;
    var bitsid=document.getElementById('bitsid').value;
    var password=document.getElementById('password').value;
    if(validatereg(username,bitsid,password)!="fail"){
  
        var params="backend/register.php?username=" + username +"&password=" + password + "&bitsid=" + bitsid ;
        request.open("POST",params,true);
        request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        request.setRequestHeader("Content-length",params.length);
        request.setRequestHeader("Connection","close");
        request.send();
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {                
                if(request.responseText!="fail"){
                    toastr.success('You have been registered as ' + username + '.', 'Registration Successful');
                    container.classList.remove('active');
                    //toggle.innerHTML="&#9998;";
                    toggle.innerHTML="person_add";               
                    document.getElementById('Username').value=username;
                }
                if(request.responseText=="fail"){
    //                        swal({
    //                          title: "Username Exists",
    //                          text: "I'm sorry but the username you entered is already taken. Please try another username.",
    //                          type: "error",
    //                          confirmButtonText: "Okay!"
    //                        });
                        toastr.error('This username is already taken.', 'Username Taken');
                    }
                }
            }
    };    

}
function validatereg(username,bitsid,password){
       var nameRegex = /^[a-zA-Z\-\d]+$/;
    var bitsidRegex = /[fh](20)\d{5}/g;
    var validfirstUsername = username.match(nameRegex);
    var validbitsid = bitsid.match(bitsidRegex);
    if(validfirstUsername == null){
//        swal({
//              title: "Oops!",
//              text: "I'm sorry but the username you entered is invalid. Please make sure it contains only alphabets and numbers.",
//              type: "error",
//              confirmButtonText: "Okay!"
//        });
        toastr.error('Please use alphabets and numbers.', 'Username Invalid');
        return "fail";
    }
    if(validbitsid == null || bitsid.length!=8 ){
//        swal({
//              title: "Oops!",
//              text: "I'm sorry but the username you entered is invalid. Please make sure it contains only alphabets and numbers.",
//              type: "error",
//              confirmButtonText: "Okay!"
//        });
        toastr.error('Please enter the ID in the format mentioned.', 'Bits ID Invalid');
        return "fail";
    }
    if(password.length < 8 || password.length > 40){
//        swal({
//             title: "Oops!",
//             text: "I'm sorry but the password you entered is too short. .",
//             type: "error",
//             confirmButtonText: "Okay!"
//        });
        toastr.error('Enter a password between 8 and 40 characters.', 'Password Invalid');
        return "fail";
    }
    
   
    return "shit";
}

function onpasspress(e){
    if(e.keyCode === 13){
            login();
        }

        return false;
}
function onpasspress2(e){
    if(e.keyCode === 13){
            register();
        }

        return false;
}
function login(){
    bringmain();
    var request= getRequest();  
    var username=document.getElementById('Username').value;    
    var password=document.getElementById('Password').value;
    var params="backend/login.php?username=" + username + "&password=" + password;   
    request.open("GET",params,true);
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    request.setRequestHeader("Content-length",params.length);
    request.setRequestHeader("Connection","close");
    request.send();   
    request.onreadystatechange = function() {
        
            if (request.readyState == 4 && request.status == 200) {              
                if(request.responseText!="fail"){

                    curuserid=request.responseText;
                    curusername=username;
                    //setusercookie(request.responseText);
                    
                    bringmain();   
                    toastr.success('You have been logged in as ' + username + '.', 'Authentication Successful');    
                    
                }
                else{
                    toastr.error('Please check your username and password.', 'Authentication Failed');
                }
            } 
        };
}
function loadtags(){
    var request= getRequest();
    
    var params="backend/loadtags.php?userid=" + curuserid;
    request.open("GET",params,true);
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    request.setRequestHeader("Content-length",params.length);
    request.setRequestHeader("Connection","close");
    request.send();   
    request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {                
                if(request.responseText!="fail"){
                    document.getElementById("tags").innerHTML=request.responseText;
                    //console.log(request.responseText);
                    refreshTags();
                    //appendChild(request.responseText);
                                        
                }
            }
        };
}

function loadposts(){
    var request= getRequest();
    
    var params="backend/loadposts.php?userid=" + curuserid;
    request.open("GET",params,true);
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    request.setRequestHeader("Content-length",params.length);
    request.setRequestHeader("Connection","close");
    request.send();   
    request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {                
                if(request.responseText!="fail"){
                    document.getElementById("post_wrapper").innerHTML=request.responseText;
                    onPostLoad();
            
                    //appendChild(request.responseText);                   
                }
            }
        };
    
}
function loadallposts(){
    
    var request= getRequest();
        var params="backend/addtag.php?userid="+curuserid+"&tag=all-posts" ;
        var valueoftag=this.value;
        this.value="";
        //alert(valueoftag);
        request.open("POST",params,true);
        request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        request.setRequestHeader("Content-length",params.length);
        request.setRequestHeader("Connection","close");
        request.send();
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {                
                if(request.responseText!="fail"){                    
                    //console.log(request.responseText+" HELLO");
                    loadtags();
                    loadposts();
                    toastr.success('Remove the \'all-posts\' tag when done.', 'Showing All Posts');
                }
                else{
                        toastr.error('The tag \'all-posts\' already exists.', 'Tag Exists');
                    }
            }
        };
    
}
var $popped=null;
var images=document.getElementsByClassName('image-link');
/*for(i=0;i<images.length;i++)
    {
        images[i].onclick=function(){
            zoomed=document.createElement('div');
            zoomed.backgroundImage='url('+this.src+')';
            zoomed.classList.add('popUp');
            zoomed.style.left=this.clientLeft;
            zoomed.style.top=this.clientTop;
            zoomed.style.height=this.clientHeight;
            zoomed.style.width=this.clientW;
        }
    }*/
function ongrouptagclick()
    {
    addTag('Hello');
    $('#tagInput').focus();
    }
function popUps(){
    console.log("Here I am");
    $('.image-link>img').click(function(){
    $popped=$(this);
    $zoomed=$(this).clone();
    $zoomed.addClass('popUp');
    $zoomed.removeClass('image-link');
    $(this).css({opacity:0});
    $zoomed.css({
        top:$(this).offset().top,
        left:$(this).offset().left,
        height:$(this).height(),
        width:$(this).width()
    });
        $('body').append($zoomed);
        h=window.innerHeight-200;
        w=(h/($(this).height()/$(this).width()));
        if(w>window.innerWidth-400)
            {
                w=window.innerWidth-400;
                h=(w/($(this).width()/$(this).height()));
            }
        $zoomed.css({height:h+'px',width:w+'px'});
        $zoomed.addClass('final');
        $('#main').addClass('inactive');
        $('#closePop').show(100);
        $('#overlay').css({display:'block'});
    });
    console.log("This is me");
};
$('#closePop').click(function(){
    console.log("There's nowhere else on earth I'd rather be.");
    $('.popUp').remove();
    $('#main').removeClass('inactive');
    $popped.css({opacity:1});
    $('#overlay').css({display:'none'});
    $('#closePop').hide();
});

function bringmain(){
    //check validation before executing here
    //alert("moreshit");
    //if(main.getAttribute('id')='regbutt'){
    //    alert('shit happened');
    //}
    main.classList.remove('hidden-element');
    main.classList.add('shown-element');
    main.classList.add('active');
    document.getElementById('usernamebar').innerHTML="Logged in as: "+ curusername;
    window.setTimeout(function(){document.getElementById('open_composer').style.display='block';
    document.getElementById('button_drawer').style.display='block';},1000);
}


//code to add new tags
  var counter=1;
  prefIn.onkeypress=function(e){
    if( e.keyCode==13 )
    {
        addTag(this.value);
        this.value="";
    }
  }
  function addTag(tagValue)
{
    if(tagValue!="" && tagValue!=" "){
            
        
            var request= getRequest();
            var params="backend/addtag.php?userid="+curuserid+"&tag=" + tagValue ;
            var valueoftag=tagValue;
            //alert(valueoftag);
            request.open("POST",params,true);
            request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            request.setRequestHeader("Content-length",params.length);
            request.setRequestHeader("Connection","close");
            request.send();
            request.onreadystatechange = function() {
                if (request.readyState == 4 && request.status == 200) {                
                    if(request.responseText!="fail"){                    
                        console.log(request.responseText+" HELLO");
                        loadtags();
                        loadposts(); 
                        toastr.success('Added new tag \'' + valueoftag +'\'.', 'Tag Added');
                    }
                    else{
                        toastr.error('The tag \'' + valueoftag +'\' already exists.', 'Tag Exists');
                    }
                }
            };
    //        var newTag=document.createElement('li');
    //        newTag.setAttribute('index',++counter);
    //        tagHolder.appendChild(newTag);
    //        newTag.innerHTML='<span>&#10005;</span>'+this.value;
    //        refreshTags();
    //        this.value="";  
        }
        else{
            toastr.error('Please chack the tag content', 'Invalid Tag');
        }
}
function addThisTag(x)
{
    addTag(x.innerHTML.trim());
    $('#tagInput').focus();
}
$('#tagOptions').keydown(function(e){
      if(e.keyCode==38)
          {
              console.log('UpItIs');
              $('#tagOptions>li').removeClass('active');
              $('#tagOptions>li').eq(list_counter<=0?0:--list_counter).addClass('active');
              $('#tagOptions').scrollTop(20*list_counter);
              $('#tagInput').val($('#tagOptions>li').eq(list_counter).html().trim());
          }
      if(e.keyCode==40)
          {
              console.log('downItIs');
              $('#tagOptions>li').removeClass('active');
              $('#tagOptions>li').eq(list_counter>=$('#tagOptions>li').length-1?list_counter:++list_counter).addClass('active');
              $('#tagOptions').scrollTop(20*list_counter);
              $('#tagInput').val($('#tagOptions>li').eq(list_counter).html().trim());
          }
  });
  $('#tagInput').focus(function(){
      $(this).parent().find('#tagOptions').show();
  });
$('#tagOptions').mouseover(function(){
    retainTagOptions=0;
    console.log(retainTagOptions);
});
$('#tagOptions').mouseout(function(){
    retainTagOptions=1;
});
$('#tagInput').blur(function(){
    if(retainTagOptions)
      $(this).parent().find('#tagOptions').hide();
  });
  //code to implement search
  searchbar.onkeypress=function(e){
    
        var request= getRequest();
      console.log(this.value);
      var params="backend/loadposts.php?userid=" + curuserid;
      if(this.value.length>1){
            params="backend/searchposts.php?query=" + this.value ;
      }
        //var valueoftag=this.value;
        //this.value="";
        //alert(valueoftag);
        request.open("POST",params,true);
        request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        request.setRequestHeader("Content-length",params.length);
        request.setRequestHeader("Connection","close");
        request.send();
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {                
                if(request.responseText!="fail"){                    
                    //console.log(request.responseText+" HELLO");
                    document.getElementById("post_wrapper").innerHTML=request.responseText;
                    onPostLoad();
                    popUps();                  
                }
            }
        };
      
  }
  
  var bookmarks=document.getElementsByClassName('bookmarks');
  for(i=0;i<bookmarks.length;i++)
      {
              bookmarks[i].onclick=function(){
              console.log("Clicked here: " + i);
              this.classList.toggle('active');
              if(this.classList.contains('active'))
                  this.getElementsByTagName('i')[0].innerHTML='bookmark';
              else
                  this.getElementsByTagName('i')[0].innerHTML='bookmark_border';
          }
      }
function refreshTags(){
  tags=tagHolder.getElementsByTagName('span');
    for(i=0;i<tags.length;i++)
    {
        
//code to remove tags       
        tags[i].onclick=function(){
            
            console.log("This is removed: " + this.parentElement.getAttribute('tagid'));
            var request= getRequest();
            var params="backend/removetag.php?userid=" + curuserid +"&tagid=" + this.parentElement.getAttribute('tagid');
            request.open("GET",params,true);
            request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            request.setRequestHeader("Content-length",params.length);
            request.setRequestHeader("Connection","close");
            request.send();   
            request.onreadystatechange = function() {
                    if (request.readyState == 4 && request.status == 200) {                
                        if(request.responseText!="fail"){
                            console.log(request.responseText);
                            //appendChild(request.responseText);
                            loadposts();
                            toastr.success('Tag has been removed.', 'Tag Removed');
                        }
                    }
                };
            this.parentNode.parentNode.removeChild(this.parentNode);
        } 
    }
}

document.getElementById('close_composer').onclick=function(){
  document.getElementById('composer').classList.remove('active');
  var button=document.getElementById('compose_button');
  document.getElementById('publish_comp').style.display='none';
  document.getElementById('open_composer').style.display='block';

}

document.getElementById('open_composer').onmouseup=function(){
    //  document.getElementById('composer').classList.add('active');
    //  this.style.display='none';
    //  document.getElementById('publish_comp').style.display='block';
    swal({
          title: "How can we improve?",
          type: "input",
            inputType: "text",
          showCancelButton: true,
          closeOnConfirm: true,
          animation: "slide-from-bottom",
          "confirmButtonColor": "#0097a7",
          inputPlaceholder: "Write your suggestions here..."
    },
    function(inputValue){
      if (inputValue === false) return false;

      if (inputValue === "") {
            swal.showInputError("You need to write something!");
            return false
      }
      var request=getRequest();
      var params="backend/feedback.php?userid=" + curuserid +"&feedback=" + inputValue;
        request.open("GET",params,true);
        request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        request.setRequestHeader("Content-length",params.length);
        request.setRequestHeader("Connection","close");
        request.send();   
        request.onreadystatechange = function() {
                if (request.readyState == 4 && request.status == 200) {     

                        toastr.success('Thanks for your feedback!', 'Feedback Submitted');


                }
            };
    });
}
document.getElementById('publish_comp').onmouseup=function(){
  //execute publishing script here 
}

function logout(){
    console.log("sdf");
    var request= getRequest();
    location.reload();
    var params="backend/logout.php?userid="+curuserid;
    request.open("GET",params,true);
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    request.setRequestHeader("Content-length",params.length);
    request.setRequestHeader("Connection","close");
    request.send();   
    request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {                
                if(request.responseText="Done"){
                   //alert("Logged out");
                    location.reload();
                }
            }
    }
}
function onsettingsclick(){
    swal({
        title: "Common Tags",
        text: '<div id="tagOptions" tabindex="1">'+groupTagHolder+'</div>',
        html: true,
        animation: "slide-from-bottom",
        "confirmButtonColor": "#0097a7"
});
    loadtaggroups();
    $('#tagOptions').focus();
}

function onforgotpassword(){
    swal({
        title: "Password Recovery",
        text: 'This part is under development. You\'re on your own! :P Better go create a new account for now.',
        html: true,
        animation: "slide-from-bottom",
        "confirmButtonColor": "#0097a7"
});
    document.getElementById('test').innerHTML = '';
}

function onbragclick(){
    swal({
        title: "The Maths Guys And The Lion",
        text: '<div class="about-us" id="about-us"><img class="mainimg" src="nischay.jpg" onclick="onnischayclick();"></img><img class="mainimg" src="abhilash.jpg" onclick="onabhilashclick();"></img><img class="mainimg" src="soni.jpg" onclick="onsoniclick();"></img><img class="mainimg" src="rohitt.jpg" onclick="onrohittclick();"></img></div>',
        html: true,
        animation: "slide-from-bottom",
        "confirmButtonColor": "#0097a7"
});
}

function onrohittclick()
    {
        swal({
          title: "The One Who Linked It All",
          text: '<div class="about-us" id="about-us"><img src="rohitt.jpg" onclick="onrohitclick();"></img><div class="content">	<p class="name">Rohitt Vashishtha</p>	<p class="desc">Loves Linux. Terminal Addict, GUI-phobic. Says GUI is too cumbersome.</p>	<p class="begin quote-start material-icons">format_quote</p><p class="quote">Only with root can true pain be achieved.</p><p class="quote-start material-icons">format_quote</p></div></div>',
          showCancelButton: true,
          confirmButtonColor: "#0097a7",
          confirmButtonText: "Okay!",
          cancelButtonText: "Go back",
          closeOnConfirm: false,
          closeOnCancel: false,
          animation: "slide-from-bottom",
          html: true
},
function(isConfirm){
  if (isConfirm) {
      swal.close();
  } else {
          onbragclick();
  }
});
    }
function onnischayclick()
    {
        swal({
          title: "The Golden Data Retriever",
          text: '<div class="about-us" id="about-us"><img src="nischay.jpg"></img><div class="content">	<p class="name">Nischay Pro</p>	<p class="desc">Pros: Code churner, library burner, fast learner. Cons: Addiction to shit and MS-DOS. Same thing, basically. Allergic to CSS.</p><p class="begin quote-start material-icons">format_quote</p><p class="quote">This is SHITCODE!!</p><p class="quote-start material-icons">format_quote</p></div>',
          showCancelButton: true,
          confirmButtonColor: "#0097a7",
          confirmButtonText: "Okay!",
          cancelButtonText: "Go back",
          closeOnConfirm: false,
          closeOnCancel: false,
          animation: "slide-from-bottom",
          html: true
},
function(isConfirm){
  if (isConfirm) {
      swal.close();
  } else {
          onbragclick();
  }
});
    }
function onabhilashclick()
    {
        swal({
          title: "The God Of Designs",
          text: '<div class="about-us" id="about-us"><img src="abhilash.jpg"></img><div class="content">	<p class="name">Abhilash Verma</p>	<p class="desc">Design God! Loves to create stuff from scratch and does it beautifully. </p><p class="begin quote-start material-icons">format_quote</p><p class="quote">This part is shit. I didn\'t code this.</p><p class="quote-start material-icons">format_quote</p></div>',
          showCancelButton: true,
          confirmButtonColor: "#0097a7",
          confirmButtonText: "Okay!",
          cancelButtonText: "Go back",
          closeOnConfirm: false,
          closeOnCancel: false,
          animation: "slide-from-bottom",
          html: true
},
function(isConfirm){
  if (isConfirm) {
      swal.close();
  } else {
          onbragclick();
  }
});
    }
function onsoniclick()
    {
        swal({
          title: "The Supreme Tester And Planner",
          text: '<div class="about-us" id="about-us"><img src="soni.jpg"></img><div class="content">	<p class="name">Subham Soni</p>	<p class="desc">Generates bug reports faster than you can follow. The best tester any team could get.</p><p class="begin quote-start material-icons">format_quote</p><p class="quote">I got 99 problems, but a bug ain\'t one.</p><p class="quote-start material-icons">format_quote</p></div>',
          showCancelButton: true,
          confirmButtonColor: "#0097a7",
          confirmButtonText: "Okay!",
          cancelButtonText: "Go back",
          closeOnConfirm: false,
          closeOnCancel: false,
          animation: "slide-from-bottom",
          html: true
},
function(isConfirm){
  if (isConfirm) {
      swal.close();
  } else {
          onbragclick();
  }
});
    }
function openfaq(){
    swal({
       title: "FAQ",
        text: '<div class="faqholder"><p class="question">What is this?</p><p class="anwser">The BPHC Wall is a way for everyone to get customised feeds from FB Groups like "Free Expressions Group" via the intranet. You can view every post on the group, or (if you want to) only posts on topics you like.</p><p class="question">Does it consume my data?</p><p class="anwser">No. Its all over the Intranet so does not consume any data. The only data needed is for us to download everything once to our database.</p><p class="question">Does it access posts from Shoutboxx?</p><p class="anwser">No. Right now, it only covers "Free Expression Group". For running the tool on a given group, we need admin access to that group. The only way we can add Shoutboxx or any other group is if one of the admins adds us. (We promise to be nice)</p><p class="question">How do I use this ?</p><p class="anwser">You need to register and login first. Once you have done so, you can decide to view a feed of selected topics (by using tags) or see all posts ("See all posts" button at the bottom).</p><p class="question">What are tags?</p><p class="anwser">Tags are basically the topics on which you want to see posts on. So if you want to see all posts of club inductions and Pearl, you add the tags"inductions" and "Pearl". That way, you get to see a feed of all the posts you want to see. You can also select any of the commonly used tags ("Common tags" button at the bottom).</p><p class="question">What else can this do?</p><p class="anwser">All your preferred tags are stored so you can login again to see new posts (this updates every 10 minutes). For viewing a post on FB, just follow the link here. Right now thats mostly it, but more functionality can be added on demand. Do let us know how it is! (Use the "Feedback" button at the bottom)</p></div>',
        html: true,
        animation: "slide-from-bottom",
        confirmButtonColor: "#0097a7"
        
    });
}
    //document.getElementById('test').innerHTML = '<div class="about-us" id="about-us"><img src="rohitt.jpg"></img><div class="content">	<p class="name">Rohitt Vashishtha</p>	<p class="desc">Hates Windows, Loves Linux.<br>	Terminal Addiction, GUI-phobic. Says GUI is too cumbersome<br>	Loves rapping, infact made his own rap song. Coming soon on Vevo.<br>	Loves to code in C++, Java.</p>	<p class="quote">Only with root can true pain (and thus enlightenment) be achieved.</p></div></div><div class="about-us" id="about-us"><img src="nischay.jpg"></img><div class="content">	<p class="name">Nischay Pro</p>	<p class="desc">Pros: Code churner, library burner, fast learner.<br>	Cons: Addiction to shit. And MS-DOS. Same thig, basically.<br>	Little known fact: Keeps rats as pets.<br>	Loves to code in C#. Allergic to CSS.</p>	<p class="quote">This is SHITCODE!!</p></div></div><div class="about-us" id="about-us"><img src="abhilash.jpg"></img><div class="content">	<p class="name">Abhilash Verma</p>	<p class="desc">Design God!<br>	Can fuck you in CSS+JS professionally. Variable transitions and positions.<br>	The only guy who can code while others in room play CS.<br>	Loves to create stuff from scratch and does it beautifully. </p>	<p class="quote">Only with root can true pain (and thus enlightenment) be achieved.</p></div></div>';
    
// session management
// session management
t=0;
window.setInterval(function(){
    console.log(t++); 
    var lastpostime = document.getElementById('post_wrapper').firstElementChild.getAttribute('created_time');
    var request= getRequest();    
    var params="backend/checknewposts.php?userid="+curuserid+"&lastposttime="+lastpostime;
    request.open("GET",params,true);
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    request.setRequestHeader("Content-length",params.length);
    request.setRequestHeader("Connection","close");
    request.send();   
    request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {                
                if(request.responseText="success"){
                   //alert("Logged out");
                    console.log("There are new posts.");
                }
            }
    }    
},5000)