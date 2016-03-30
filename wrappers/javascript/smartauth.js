//SMART AUTH by 
var SmartAuth = {
    creds: {
        ip: null,
        userid: null,
        appid: null
    },
    getRequest: function () {
        var request = new XMLHttpRequest();
        return request;
    },
    showlogin: function (callback) {
        var windowObjectReference;
        var strWindowFeatures = "menubar=no,toolbar=no,personalbar=no,width=500,height=300,location=yes,resizable=no,scrollbars=no,status=yes";

        function dialog() {
            windowObjectReference = window.open("auth.html", "SMARTAUTH", strWindowFeatures);
        }

        function login() {
            document.getElementById('loader').style.display = 'block';
            var user = {};
            user.username = document.getElementById('username').value;
            user.password = document.getElementById('password').value;
            window.close();
            return user;
        }
    },
    prepareRequest: function (request) {
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.setRequestHeader("Connection", "close");
        if (this.creds.ip != null) {
            request.setRequestHeader("Authorization", "Basic " + btoa(this.creds.userid + ":" + this.creds.appid));
        }
        return request;
    },
    initialize: function (ip, creda, credb, callback) {
        var me = this;
        var ipRegex = /^[0-9]+(?:\.[0-9]+){3}:[0-9]+$/;
        ip = ip.match(ipRegex);
        var response;
        var isserveronline = false;
        if (ip == null) {
            response = {
                "error": {
                    "message": "Invalid IP:PORT address. Example - 127.0.0.1:3000",
                    "code": 1
                }
            }
            callback(response);

        }
        var request = this.getRequest();
        request.open("GET", "http://" + ip + "/apps/check");
        request = this.prepareRequest(request);
        request.setRequestHeader("Authorization", "Basic " + btoa(creda + ":" + credb));
        request.send();
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                isserveronline = true;
                var reply = JSON.parse(request.responseText);
                if (reply.error) {
                    response = {
                        "error": {
                            "message": "Credentials Incorrect.",
                            "code": 1
                        }
                    }
                    callback(response);
                } else {
                    me.creds.ip = ip;
                    me.creds.userid = creda;
                    me.creds.appid = credb;
                    response = {
                        "success": {
                            "message": "Credentials Correct.",
                            "code": 0
                        }
                    }
                    callback(response);
                }
            }
        }
        setTimeout(function () {
            if (!isserveronline) {
                request.abort()
                response = {
                    "error": {
                        "message": "Could not connect to server. Call init() with correct IP:PORT",
                        "code": 2
                    }
                }
                callback(response);
            }
        }, 4000);
    },
    login: function (callback) {
        var windowObjectReference;
        var strWindowFeatures = "menubar=no,toolbar=no,personalbar=no,width=500,height=300,location=yes,resizable=no,scrollbars=no,status=yes";
        windowObjectReference = window.open("auth.html", "SMARTAUTH", strWindowFeatures);
        var me = this;
        function login() {
            document.getElementById('loader').style.display = 'block';
            var user = {};
            user.username = document.getElementById('username').value;
            user.password = document.getElementById('password').value;
            window.close();
            var username = user.username;
            var password = user.password;
            var response;
            console.log("Code Was Here")
            var user = {
                "username": username,
                "password": password
            }
            var isserveronline = false;
            var serverip = me.creds.ip;
            var request = me.getRequest();
            request.open("POST", "http://" + me.creds.ip + "/users/search/authenticate");
            request = me.prepareRequest(request);
            request.send(JSON.stringify(user));
            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    isserveronline = true;
                    var reply = JSON.parse(request.responseText);
                    if (reply.error) {
                        response = {
                            "error": {
                                "message": "User Auth Fail.",
                                "code": 1
                            }
                        }
                        callback(response);
                    } else {
                        response = JSON.parse(request.responseText)[0];
                        response.userid = response._id;
                        callback(response);
                    }
                }
            }
            setTimeout(function () {
                if (!isserveronline) {
                    request.abort()
                    response = {
                        "error": {
                            "message": "Could not connect to server. Call init() with correct IP:PORT",
                            "code": 2
                        }
                    }
                    callback(response);
                }
            }, 4000);
        }
    },
    store: function (user, field, data, callback) {
        var request = this.getRequest();
        var response;
        var reqdata = {
            "field": field,
            "data": data
        }
        var isserveronline = false;
        request.open("PUT", "http://" + this.creds.ip + "/users/" + user.userid + "/appdata");
        request = this.prepareRequest(request);
        request.send(JSON.stringify(reqdata));
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                isserveronline = true;
                var reply = JSON.parse(request.responseText);
                if (reply.error) {
                    response = {
                        "error": {
                            "message": "Data Storage Failed.",
                            "code": 1
                        }
                    }
                    callback(response);
                } else {
                    response = {
                        "success": {
                            "message": "Data Store Successful.",
                            "code": 0
                        }
                    }
                    callback(response);
                }
            }
        }
        setTimeout(function () {
            if (!isserveronline) {
                request.abort()
                response = {
                    "error": {
                        "message": "Could not connect to server. Call init() with correct IP:PORT",
                        "code": 2
                    }
                }
                callback(response);
            }
        }, 4000);
    },
    fetch: function (user, callback) {
        var request = this.getRequest();
        var response;
        var isserveronline = false;
        request.open("GET", "http://" + this.creds.ip + "/users/" + user.userid + "/appdata");
        request = this.prepareRequest(request);
        request.send(null);
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                isserveronline = true;
                var reply = JSON.parse(request.responseText);
                if (reply.error) {
                    response = {
                        "error": {
                            "message": "Data Fetch Failed.",
                            "code": 1
                        }
                    }
                    callback(response);
                } else {
                    response = reply;
                    callback(response);
                }
            }
        }
        setTimeout(function () {
            if (!isserveronline) {
                request.abort()
                response = {
                    "error": {
                        "message": "Could not connect to server. Call init() with correct IP:PORT",
                        "code": 2
                    }
                }
                callback(response);
            }
        }, 4000);
    },
}
