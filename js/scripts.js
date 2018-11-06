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

    // $.ajax({
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'trakt-api-version': '2',
    //         'trakt-api-key': apiKey
    //     },
    //     url: requestURL,
    //     function(data) {
    //         console.log(data);
    //     }
    // });

    if(XMLHttpRequest)
    {
        let request = new XMLHttpRequest();
        if("withCredentials" in request) {
            request.open('GET', requestURL, true);
            request.setRequestHeader('Content-Type', 'application/json');
            request.setRequestHeader('trakt-api-version', '2');
            request.setRequestHeader('trakt-api-key', apiKey);
            request.onreadystatechange = function () {
                if (this.readyState === 4) {
                    console.log('Status:', this.status);
                    console.log('Headers:', this.getAllResponseHeaders());
                    console.log('Body:', this.responseText);
                }
            };
            request.send();
        }

    }

    // let request = new XMLHttpRequest();
    //
    // request.open('GET', requestURL);
    //
    // request.setRequestHeader('Content-Type', 'application/json');
    // request.setRequestHeader('trakt-api-version', '2');
    // request.setRequestHeader('trakt-api-key', apiKey);
    //
    // request.onreadystatechange = function () {
    //     if (this.readyState === 4) {
    //         console.log('Status:', this.status);
    //         console.log('Headers:', this.getAllResponseHeaders());
    //         console.log('Body:', this.responseText);
    //     }
    // };
    //
    // request.send();


}