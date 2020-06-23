function clearCookies() {
    document.cookie.split(";").forEach(function (c) {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
}

function logout() {
    clearCookies();
    window.location.href = "http://192.168.1.19:3000/";
}

function loadAssets() {
    fetch("http://192.168.1.19:3000/post/get_messages", {
        method: "GET"
    }).then(response => {
        console.log(response);
        return response.text();
    }).then(text => {
        let entries = text.substring(1, text.length - 1).split("},");
        entries.forEach(entry => {
            let messages = document.getElementById("messages");
            if (entry === "") {
                messages.innerHTML = "<div style=\"font-size:15px;padding-left:10px;\">No new messages!</div>";
            } else {
                if (entry[entry.length - 1] !== "}") {
                    entry += "}";
                }
                let e = new Encoder();
                let json = JSON.parse(entry);
                let date = new Date(json.post_time);
                let html = "<div style=\"font-size:25px;padding-left:10px;\">" + e.decode(json.title) + "</div>";
                html += "<div style=\"font-size:10px;padding-left:10px;\">By " 
                    + json.post_username + " on " + date.toLocaleDateString() + " at "
                    + date.toLocaleTimeString() + "</div>";
                html += "<div style=\"font-size:15px;padding-left:10px;\">" + e.decode(json.contents) + "</div>";
                html += "<br>";
                messages.innerHTML += html;
            }
        });
    });
}

function postMessage() {
    var title = document.getElementById("title").value;
    var contents = document.getElementById("contents").value;
    var post_username = getCookie("username");

    if (contents === "" || title === "") {
        alert("Please fill out all fields!");
        return;
    }

    let e = new Encoder();

    contents = e.encode(contents);
    title = e.encode(title);

    let json = JSON.stringify({
        "post_username": post_username,
        "title": title,
        "contents": contents,
        "post_time": new Date().toUTCString()
    });

    fetch("http://192.168.1.19:3000/post/new_board_message/" + json, {
        method: "POST",
        body: json,
        headers: {
            "Content-Type": "application/json;charset=UTF-16"
        },

    }).then(response => {
        console.log(response);
        if (response.ok) {
            clearAll(["title", "contents"]);
            window.location.href = "http://192.168.1.19:3000/home";
        } else {
            alert("Refrain from using / and % in messages until further notice")
            clearAll(["title", "contents"]);
        }
    });
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function clearAll(args) {
    args.forEach(e => {
        document.getElementById(e).value = "";
    });
}

