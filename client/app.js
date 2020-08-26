(function() {

    const baseUrl = "http://localhost:3100";

    function init() {
        getWelcomeText()
        addEventListeners()

    }

    function getData() {

    }

    function addEventListeners() {
        __id("username").addEventListener("keyup", (event) => {
            getWelcomeText(__id("username").value, __id("companyname").value)
        })

        __id("companyname").addEventListener("keyup", (event) => {
            getWelcomeText(__id("username").value, __id("companyname").value)
        })

        __id("getWecomeTextBtn").addEventListener("click", (event) => {
            console.log(`username is ${__id("usernamePost").value} and companyname is ${__id("companynamePost").value}`)
            getWelcomeTextPost(__id("usernamePost").value, __id("companynamePost").value)
        })
    }


    function getWelcomeTextPost(username, companyname) {
        executeAjax(`${baseUrl}/welcome`, "POST", { username, companyname }).then((response) => {
            __id("welcomeTextPost").innerHTML = response;
        }).catch((err) => {
            console.error(err.message)
        })

    }

    function getWelcomeText(username = "Bhunesh", companyname = "XYZ") {
        executeAjax(`${baseUrl}/welcome?username=${username}&companyname=${companyname}`, "GET").then((response) => {
            __id("welcomeText").innerHTML = response;
        }).catch((err) => {
            console.error(err.message)
        })
    }

    function postData() {

    }

    function __id(idStr) {
        return document.getElementById(idStr)
    }


    function executeAjax(url, methodType, data) {
        if (!data) {
            data = {}
        }
        return new Promise((resolve, reject) => {
            try {
                // Refrence https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/XMLHttpRequest
                var xmlHttp = new XMLHttpRequest()
                xmlHttp.onreadystatechange = function() {
                    // Refer https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
                    if (this.readyState == 4 && this.status == 200) {
                        try { resolve(JSON.parse(this.responseText)); } catch (e) {
                            resolve(this.responseText)
                        }
                    }
                }

                xmlHttp.open(methodType, url, true);
                xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xmlHttp.send(JSON.stringify(data));
            } catch (e) {
                reject(e);
            }
        });
    }


    document.addEventListener("DOMContentLoaded", (event) => {
        init()
    })
})()