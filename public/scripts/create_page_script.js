function create() {
    // relies on windows.location.hfef -> create_account.html
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var name = document.getElementById("name").value.split(" ");
    var firstname = name[0];
    var lastname = name[1];

    var dates = document.getElementById("birthday").value.split("-");
    // making the date is off by one month for some reason
    dates[1] = dates[1] - 1 === 0 ? 12 : dates[1] - 1;
    dates[0] = dates[1] === 12 ? dates[0] - 1 : dates[0];
    var birthday = new Date(dates[0], dates[1], dates[2]);

    var email = document.getElementById("email").value;
    var email_notifs = document.getElementById("receive_notifs").value;

    console.log(email);
    console.log(email_notifs);

    let json = JSON.stringify({
        "username": username,
        "password": password,
        "firstname": firstname,
        "lastname": lastname,
        "birthday": birthday,
        "email": email,
        "email_notifs": email_notifs
    });

    fetch("http://192.168.1.19:3000/create/new_user/" + json, {
        method: "POST",
        body: json,
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        console.log(response);
        if (response.ok) {
            window.location.href = "http://192.168.1.19:3000/home";
            document.cookie = "username=" + username + ";path=/";
        } else {
            alert("User with this username already exists!");
            clearAll(["username", "password", "name", "birthday", "email", "receive_notifs"]);
        }
    });
}

function clearAll(args) {
    args.forEach(e => {
        document.getElementById(e).value = "";
    });
}