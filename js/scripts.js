let home = document.getElementById("home");
let stats = document.getElementById("stats");
let movies = document.getElementById("movies");
let episodes = document.getElementById("episodes");

let searchBar = document.getElementById("searchBar");
let usernameField = document.getElementById("username");
let joined = document.getElementById("joined");

let apiKey = "46ebcab57a63082b8025c12ad813efeadb8facb525aef41d6f50a925721822f8";
let requestURL, fullUserData, userStats, userAvatar = "";

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

                if (arg === "fullUserData") {

                    fullUserData = this.responseText;
                    fullUserData = JSON.parse(fullUserData);
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

    home.classList.add("fadeOut");
    toggleVisibility("home","hidden");
    stats.classList.add("fadeIn");
    toggleVisibility("stats","visible");

    let user = searchBar.value;
    usernameField.innerHTML = user;

    let joined = document.getElementById("joined");
    joined.innerHTML = "Loading " + user + "'s stats";

    requestURL = "https://cors-anywhere.herokuapp.com/" + "https://api.trakt.tv/users/" + user + "?extended=full";
    newRequest(requestURL, "fullUserData");

}

function loadUserStats() {

    let user = searchBar.value;
    let avatar = document.getElementById("avatar");
    let avatarPlaceholder = document.getElementById("avatarPlaceholder");

    avatarPlaceholder.classList.add("fadeOut");
    avatar.classList.add("fadeIn");

    toggleVisibility("avatar", "visible");
    toggleVisibility("avatarPlaceholder", "hidden");
    userAvatar = fullUserData.images.avatar.full;
    avatar.style.backgroundImage = "url(" + userAvatar + ")";

    joined.classList.add("fadeIn");
    let joinedEdited = new Date(fullUserData.joined_at).toString().substr(4).substring(0,11);
    joined.innerHTML = "Trakt user since " + joinedEdited.substring(6, 0) + "," + joinedEdited.substr(6);

    requestURL = "https://cors-anywhere.herokuapp.com/" + "https://api.trakt.tv/users/" + user + "/stats";
    newRequest(requestURL, "userStats");

    return userAvatar;

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
    let moviesCalculated = document.getElementById("moviesCalculated");
    let episodesCalculated = document.getElementById("episodesCalculated");

    moviesWatched.innerHTML = userStats.movies.watched + " movies";
    moviesPlayed.innerHTML = userStats.movies.plays + " movies";
    moviesCalculated.innerHTML = Math.round(userStats.movies.minutes / 60) + " hours";

    episodesWatched.innerHTML = userStats.episodes.watched + " episodes";
    episodesPlayed.innerHTML = userStats.episodes.plays + " episodes";
    episodesCalculated.innerHTML = Math.round(userStats.episodes.minutes / 60) + " hours";

}

function openUserAvatar() {

    window.open(userAvatar);

}

function openUserOnTrakt() {

    let user = searchBar.value;
    window.open("https://www.trakt.tv/users/" + user);

}

function poweredByTrakt() {

    window.open("https://trakt.tv");

}
