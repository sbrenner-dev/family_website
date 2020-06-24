function update() {
    let email = document.getElementById("email").value;
    let receive_notifs = document.getElementById("receive_notifs").checked;

    let json = JSON.stringify({
        "username": getCookie("username"),
        "email": email,
        "email_notifs": receive_notifs
    });

    fetch("http://192.168.1.19:3000/update/email/" + json, {
        method: "PATCH",
        body: json
    }).then(response => {
        console.log(response);
        if (response.ok) {
            window.location.href = "http://192.168.1.19:3000/home";
        }
    })
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