let home = document.getElementById("home");
let stats = document.getElementById("stats");
let movies = document.getElementById("movies");
let episodes = document.getElementById("episodes");
let about = document.getElementById("about");

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

                    showUserStats();

                }

            }

        };

        request.send();

    }

}

function loadUserData() {

    let user = searchBar.value;
    usernameField.innerHTML = user + "'s stats";

    home.classList.add("fadeOut");
    toggleVisibility("home","hidden");
    stats.classList.add("fadeIn");
    toggleVisibility("stats","visible");

    requestURL = "https://cors-anywhere.herokuapp.com/" + "https://api.trakt.tv/users/" + user + "?extended=full";
    newRequest(requestURL, "userData");

}

function loadUserStats() {

    let user = searchBar.value;

    joined.classList.add("fadeIn");
    let joinedEdited = new Date(userData.joined_at).toString().substr(4).substring(0,11);
    joined.innerHTML = "Trakt user since " + joinedEdited.substring(6, 0) + "," + joinedEdited.substr(6);

    requestURL = "https://cors-anywhere.herokuapp.com/" + "https://api.trakt.tv/users/" + user + "/stats";
    newRequest(requestURL, "userStats");

    console.log(userStats);

}

function showUserStats() {

    toggleVisibility("movies", "visible");
    toggleVisibility("episodes", "visible");
    movies.classList.add("fadeIn");
    episodes.classList.add("fadeIn");

    let moviesWatched = document.getElementById("moviesWatched");
    let episodesWatched = document.getElementById("episodesWatched");
    let moviesPlayed = document.getElementById("moviesPlayed");
    let episodesPlayed = document.getElementById("episodesPlayed");
    let moviesMinutes = document.getElementById("moviesMinutes");
    let episodesMinutes = document.getElementById("episodesMinutes");
    let moviesCalculated = document.getElementById("moviesCalculated");
    let episodesCalculated = document.getElementById("episodesCalculated");

    moviesWatched.innerHTML = userStats.movies.watched;
    moviesPlayed.innerHTML = userStats.movies.plays;
    moviesMinutes.innerHTML = userStats.movies.minutes;
    moviesCalculated.innerHTML = Math.round((userStats.movies.minutes / 60) * 100) / 100;

    episodesWatched.innerHTML = userStats.episodes.watched;
    episodesPlayed.innerHTML = userStats.episodes.plays;
    episodesMinutes.innerHTML = userStats.episodes.minutes;
    episodesCalculated.innerHTML = Math.round((userStats.episodes.minutes / 60) * 100) / 100;

}