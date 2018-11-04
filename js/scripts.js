let home = document.getElementById("home");
let stats = document.getElementById("stats");

let searchBar = document.getElementById("searchBar");
let usernameField = document.getElementById("username");

function toggleVisibility(target, state) {

    document.getElementById(target).style.visibility = state;

}

function showStats() {

    let user = searchBar.value;
    usernameField.innerHTML = user;

    toggleVisibility("home","hidden");
    toggleVisibility("stats","visible");

    let apiKey = "46ebcab57a63082b8025c12ad813efeadb8facb525aef41d6f50a925721822f8";
    let requestURL = "https://api.trakt.tv/users/" + user + "?extended=full";

    $.ajax({
        headers: {
            'Content-Type': 'application/json',
            'trakt-api-version': '2',
            'trakt-api-key': apiKey
        },
        url: requestURL,
        function(data) {
            console.log(data);
        }
    });

}