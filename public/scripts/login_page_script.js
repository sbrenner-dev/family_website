function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    let json = JSON.stringify({
        "username": username,
        "password": password
    });

    fetch("http://192.168.1.19:3000/login/" + json, {
        method: "HEAD"
    }).then(response => {
        console.log(response);
        if (response.ok) {
            window.location.href = "http://192.168.1.19:3000/home";
            document.cookie = "username=" + username + ";path=/"
        } else if (response.status === 401) {
            // wrong password
            alert("Incorrect password for " + username);
            clearAll(["username", "password"]);
        } else { 
            // no user
            alert("No user " + username + " found");
            clearAll(["username", "password"]);
        }
    })
}

function redirectCreate() {
    window.location.href = "http://192.168.1.19:3000/create";
}

function clearAll(args) {
    args.forEach(e => {
        document.getElementById(e).value = "";
    });
}