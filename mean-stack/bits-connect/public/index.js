var dashboard = document.getElementById("dashboard");
var auth_page = document.getElementById("auth_page");
var loader = null;

function login(x) {
    loader = x.getElementsByClassName('loader')[0];
    loader.style.display = 'block';
    if ( /*verification code here*/ true) {
        window.setTimeout(function ()
            //shift the masses
            {
                auth_page.classList.add('dying');
                dashboard.style.display = 'block';
                loader.style.display = 'none';
            }, 1000);
    }
}