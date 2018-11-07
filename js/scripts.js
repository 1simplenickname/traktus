let home = document.getElementById("home");
let stats = document.getElementById("stats");

let searchBar = document.getElementById("searchBar");
let usernameField = document.getElementById("username");
let joined = document.getElementById("joined");

let requestURL, userData, userStats = "";

let apiKey = "46ebcab57a63082b8025c12ad813efeadb8facb525aef41d6f50a925721822f8";

function toggleVisibility(target, state) {

    document.getElementById(target).style.visibility = state;

}

function newRequest(url, arg) {

    let request = new XMLHttpRequest();
    if("withCredentials" in request) {
        request.open('GET', url, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('trakt-api-version', '2');
        request.setRequestHeader('trakt-api-key', apiKey);
        request.onreadystatechange = function () {
            if (this.readyState === 4) {

                console.log('Status:', this.status);
                console.log('Headers:', this.getAllResponseHeaders());

                if (arg === "userData") {

                    userData = this.responseText;
                    userData = JSON.parse(userData);

                    loadUserStats();

                } else if (arg === "userStats") {

                    userStats = this.responseText;
                    userStats = JSON.parse(userStats);

                }

            }

        };

        request.send();

    }

}

function loadUserData() {

    let user = searchBar.value;
    usernameField.innerHTML = user;

    toggleVisibility("home","hidden");
    toggleVisibility("stats","visible");

    requestURL = "https://cors-anywhere.herokuapp.com/" + "https://api.trakt.tv/users/" + user + "?extended=full";
    newRequest(requestURL, "userData");

}

function loadUserStats() {

    let user = searchBar.value;

    let joinedEdited = new Date(userData.joined_at).toString().substr(4).substring(0,11);
    joined.innerHTML = "Trakt user since " + joinedEdited.substring(6, 0) + "," + joinedEdited.substr(6);

    requestURL = "https://cors-anywhere.herokuapp.com/" + "https://api.trakt.tv/users/" + user + "/stats";
    newRequest(requestURL, "userStats");

    console.log(userStats);

    // userStats.movies.watched;
    // userStats.movies.played;

    // userStats.episodes.watched;
    // userStats.episodes.played;

}