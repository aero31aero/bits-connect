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
        ip = validfirstUsername = ip.match(ipRegex);
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
        var username = prompt("Username");
        var password = prompt("Password");
        var response;
        var user = {
            "username": username,
            "password": password
        }

        var request = this.getRequest();
        request.open("POST", "http://" + this.creds.ip + "/users/search/authenticate");
        request = this.prepareRequest(request);
        request.send(JSON.stringify(user));
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
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

    },
    store: function (user, field, data, callback) {
        var request = this.getRequest();
        var response;
        var reqdata = {
            "field": field,
            "data": data
        }
        request.open("PUT", "http://" + this.creds.ip + "/users/" + user.userid + "/appdata");
        request = this.prepareRequest(request);
        request.send(JSON.stringify(reqdata));
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
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
    },
    fetch: function (user, callback) {
        var request = this.getRequest();
        var response;
        request.open("GET", "http://" + this.creds.ip + "/users/" + user.userid + "/appdata");
        request = this.prepareRequest(request);
        request.send(null);
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
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

    }
}
