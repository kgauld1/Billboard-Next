var ranking = document.getElementById("ranking");

function loadSongs(json){
  ranking.innerHTML = "";
  let ranks = json.ranks;
	for (let i=0; i<10; i++){
    let key = json.token
    let url = "https://api.spotify.com/v1/search?q=" + ranks[i].name.replace(/\s+/g, '%20').toLowerCase() + "&type=track&market=US&limit=1";
    
    var song = document.createElement("div");
    song.setAttribute("class", "song");

    var songTitle = "Song title";
    var artistName = "Artist name";

    //OPTIMIZE THIS LATER
    var rank = document.createElement("div");
    rank.setAttribute("class", "rank");
    rank.innerHTML = i + 1;

    var songInfo = document.createElement("div");
    songInfo.setAttribute("class", "song-info");
    songInfo.innerHTML = `<b>${ranks[i].name}</b>${ranks[i].artist}`

    let data = await getLink(url,key).catch(console.log);

    var btn = document.createElement("a");
    btn.setAttribute("class", 'spotify-link');
    btn.setAttribute("href", data);
    btn.setAttribute("target", "_blank");

    var spotifyImg = document.createElement("img");
    spotifyImg.setAttribute("class", "spotify-button")
    spotifyImg.setAttribute("src","/static/images/spotify.png");
    spotifyImg.setAttribute("alt","Spotify");
    btn.appendChild(spotifyImg);

    song.appendChild(rank)
    song.appendChild(songInfo)
    song.appendChild(btn)

    ranking.appendChild(song);
	}
}

function loadWeek(type){
  fetch('/songs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: type
  }).then(resp => resp.json()).then(async json => {
    loadSongs(json);
  });
}

loadWeek('next');

async function getLink(requestUrl, apikey){
  let resp = await fetch(requestUrl, {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + apikey,
      "Content-Type": "application/json"
    }
  });
  let json2 = await resp.json();
  let link = json2['tracks']['items'][0]['external_urls']['spotify'];
  if(link == undefined) return null
  return link;  
}