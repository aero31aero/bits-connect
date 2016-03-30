var dashboard = document.getElementById("dashboard");
var auth_page = document.getElementById("auth_page");
var loader = null;



function getRequest() {
    var request = new XMLHttpRequest();
    return request;
}

function loadToasterOptions() {
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
var curuser = null;

function login(x) {
    loader = x.getElementsByClassName('loader')[0];
    loader.style.display = 'block';

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var user = {
        "username": username,
        "password": password
    }

    var request = getRequest();
    request.open("POST", "/users/search/authenticate");
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.setRequestHeader("Connection", "close");
    request.setRequestHeader("Authorization", "Basic " + btoa("56d3e239ecec66ce7d6b4470:56f2f4d882c1145a4588bdbe"));
    request.send(JSON.stringify(user));
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var reply = JSON.parse(request.responseText);
            if (reply.error) {
                toastr.error("Well, Fuck", "Error");
                window.setTimeout(function ()
                    //shift the masses
                    {
                        loader.style.display = 'none';
                    }, 1000);
            } else {
                curuser = reply[0];
                window.setTimeout(function ()
                    //shift the masses
                    {
                        auth_page.classList.add('dying');
                        dashboard.style.display = 'block';
                        loader.style.display = 'none';
                    }, 1000);
                afterlogin();
            }
        }
    }

}

function switchtoapp() {
    var genapp = document.getElementsByName("general");
    genapp[0].style.display = 'none';
    genapp[0].classList.add('hidden');
    var addapp = document.getElementsByName("addapp");
    addapp[0].style.display = 'block';
    addapp[0].classList.remove('hidden');
}

function switchtodash() {
    var addapp = document.getElementsByName("addapp");
    addapp[0].style.display = 'none';
    addapp[0].classList.add('hidden');
    var genapp = document.getElementsByName("general");
    genapp[0].style.display = 'block';
    genapp[0].classList.remove('hidden');

}


function register(x) {
    loader = x.getElementsByClassName('loader')[0];
    loader.style.display = 'block';
    var username = document.getElementById('username1').value;
    var password = document.getElementById('password1').value;
    var password1 = document.getElementById('password2').value;
    var bitsid = document.getElementById('bitsid1').value;
    if (validatereg(username, bitsid, password, password1) != "fail") {
        var user = {
            "username": username,
            "password": password,
            "bitsid": bitsid
        }

        var request = getRequest();
        request.open("POST", "/users");
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.setRequestHeader("Connection", "close");
        request.setRequestHeader("Authorization", "Basic " + btoa("56d3e239ecec66ce7d6b4470:56f2f4d882c1145a4588bdbe"));
        request.send(JSON.stringify(user));
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                var reply = JSON.parse(request.responseText);
                if (reply.error) {
                    toastr.error("Well, Fuck", "Error");
                    window.setTimeout(function ()
                        //shift the masses
                        {
                            loader.style.display = 'none';
                        }, 1000);
                } else {
                    curuser = reply;
                    afterlogin();
                    window.setTimeout(function ()
                        //shift the masses
                        {
                            auth_page.classList.add('dying');
                            dashboard.style.display = 'block';
                            loader.style.display = 'none';
                        }, 1000);
                }
            }
        }
    }
}

function afterlogin() {
    document.getElementById('emailp').innerHTML = curuser.bitsid + '@hyderabad.bits-pilani.ac.in';
    document.getElementById('userp').innerHTML = curuser.username;
    document.getElementById('userid').innerHTML = curuser._id;
    if (curuser.isverified) {
        document.getElementById('emailp').classList.add("success");
        document.getElementById('emailp').innerHTML += ' (Verified)';
        document.getElementById('emailconfig').classList.add("hidden");
    } else {
        document.getElementById('emailp').innerHTML += ' (Not Verified)'
        document.getElementById('emailp').classList.add("failure");
    }
    loadconnectedapps();

}

function createapp() {
    var request = getRequest();
    var usertoken = curuser._id;
    var appname = document.getElementById('appname').value;
    var appdesc = document.getElementById('appdescr').value;
    var user = {
        "description": appdesc,
        "userid": usertoken,
        "appname": appname
    }
    request.open("POST", "/apps");
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.setRequestHeader("Connection", "close");
    request.setRequestHeader("Authorization", "Basic " + btoa("56d3e239ecec66ce7d6b4470:56f2f4d882c1145a4588bdbe"));
    request.send(JSON.stringify(user));
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var reply = JSON.parse(request.responseText);
            if (reply.success) {
                swal("Success!", "App Created! Your Token is : " + reply.secrettoken, "success");
            }

        }
    }
}

function loadconnectedapps() {
    var request = getRequest();
    request.open("GET", "/users/" + curuser._id);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.setRequestHeader("Connection", "close");
    request.setRequestHeader("Authorization", "Basic " + btoa("56d3e239ecec66ce7d6b4470:56f2f4d882c1145a4588bdbe"));
    request.send({});
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var reply = JSON.parse(request.responseText);
            var testdata = '';
            for (i = 0; i < reply.apps.length; i++) {
                // console.log(reply.apps[i].appid);
                window.setTimeout(queryappname(reply.apps[i].appid), 10000);
            }
        }
    }
}

function queryappname(appid) {
    var request = getRequest();
    request.open("GET", "/apps/" + appid);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.setRequestHeader("Connection", "close");
    request.setRequestHeader("Authorization", "Basic " + btoa("56d3e239ecec66ce7d6b4470:56f2f4d882c1145a4588bdbe"));
    request.send({});
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var reply = JSON.parse(request.responseText);
            document.getElementById("userWork").innerHTML += '<span>' + reply.appname + '<i class="more material-icons">arrow_drop_down</i></span>';

        }
    }
}

function validatereg(username, bitsid, password, password2) {
    var nameRegex = /^[a-zA-Z\-\d]+$/;
    var bitsidRegex = /[fh](20)\d{5}/g;
    var validfirstUsername = username.match(nameRegex);
    var validbitsid = bitsid.match(bitsidRegex);
    if (validfirstUsername == null) {
        //        swal({
        //              title: "Oops!",
        //              text: "I'm sorry but the username you entered is invalid. Please make sure it contains only alphabets and numbers.",
        //              type: "error",
        //              confirmButtonText: "Okay!"
        //        });
        toastr.error('Please use alphabets and numbers.', 'Username Invalid');
        return "fail";
    }
    if (password != password2) {
        //        swal({
        //              title: "Oops!",
        //              text: "I'm sorry but the username you entered is invalid. Please make sure it contains only alphabets and numbers.",
        //              type: "error",
        //              confirmButtonText: "Okay!"
        //        });
        toastr.error('The passwords don\'t match', 'Your typing sucks!');
        return "fail";
    }
    if (validbitsid == null || bitsid.length != 8) {
        //        swal({
        //              title: "Oops!",
        //              text: "I'm sorry but the username you entered is invalid. Please make sure it contains only alphabets and numbers.",
        //              type: "error",
        //              confirmButtonText: "Okay!"
        //        });
        toastr.error('Please enter the ID in the format mentioned.', 'Bits ID Invalid');
        return "fail";
    }
    if (password.length < 8 || password.length > 40) {
        //        swal({
        //             title: "Oops!",
        //             text: "I'm sorry but the password you entered is too short. .",
        //             type: "error",
        //             confirmButtonText: "Okay!"
        //        });
        toastr.error('Enter a password between 8 and 40 characters.', 'Password Invalid');
        return "fail";
    }
    return "success";
}

var confirmuser = function () {
    swal({
            title: "Account Confirmation",
            type: "input",
            inputType: "text",
            showCancelButton: true,
            closeOnConfirm: true,
            animation: "slide-from-bottom",
            "confirmButtonColor": "#0097a7",
            inputPlaceholder: "Enter confirmation code here..."
        },
        function (inputValue) {
            if (inputValue === false) return false;

            if (inputValue === "") {
                swal.showInputError("Code cannot be blank.");
                return false
            }
            if (inputValue != curuser._id) {
                toastr.error("Something Went Wrong.", "Failure");
                return false
            }
            var request = getRequest();
            request.open("GET", "/users/" + inputValue + "/verify");
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            request.setRequestHeader("Connection", "close");
            request.setRequestHeader("Authorization", "Basic " + btoa("56d3e239ecec66ce7d6b4470:56f2f4d882c1145a4588bdbe"));
            request.send({});
            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    var reply = JSON.parse(request.responseText);
                    if (reply.success) {
                        document.getElementById('emailp').classList.add("success");
                        document.getElementById('emailp').classList.remove("failure");
                        toastr.success("Account Confirmed.", "Success");
                        //swal("Success!", "Account Confirmed!", "success")
                        document.getElementById('emailconfig').classList.add("hidden");
                    } else {
                        toastr.error("Something Went Wrong.", "Failure");
                        //swal("Failure!", "Something Went Wrong!", "error")
                    }
                    document.getElementById('emailp').innerHTML = curuser.bitsid + '@hyderabad.bits-pilani.ac.in (Verified)';
                    document.getElementById("userWork").innerHTML += '<span>' + 'Smart Auth' + '<i class="more material-icons">arrow_drop_down</i></span>';

                }
            }

        });
}

var changepassword = function () {
    swal({
            title: "Account Password Updatation",
            type: "input",
            inputType: "password",
            showCancelButton: true,
            closeOnConfirm: true,
            animation: "slide-from-bottom",
            "confirmButtonColor": "#0097a7",
            inputPlaceholder: "Enter your new password here."
        },
        function (inputValue) {
            if (inputValue === false) return false;

            if (inputValue === "") {
                swal.showInputError("Code cannot be blank.");
                return false
            }
            var request = getRequest();
            request.open("PUT", "/users/" + curuser._id);
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            request.setRequestHeader("Connection", "close");
            request.setRequestHeader("Authorization", "Basic " + btoa("56d3e239ecec66ce7d6b4470:56f2f4d882c1145a4588bdbe"));
            request.send('{"password":"' + inputValue + '"}');
            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    var reply = JSON.parse(request.responseText);
                    if (reply.success) {
                        toastr.success("Account Password Updated Successfully.", "Success");
                        //swal("Success!", "Account Confirmed!", "success"
                    } else {
                        toastr.error("Something Went Wrong.", "Failure");
                        //swal("Failure!", "Something Went Wrong!", "error")
                    }

                }
            }

        });
}
