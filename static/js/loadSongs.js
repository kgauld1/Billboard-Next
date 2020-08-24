var ranking = document.getElementById("ranking");

fetch('/songs', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	}
}).then(resp => resp.json()).then(json => {
	let ranks = json.ranks;
	for (let i=0; i<10; i++){
    let key = json.token
    let url = "https://api.spotify.com/v1/search?q=" + ranks[i].name.replace(/\s+/g, '%20').toLowerCase() + "&type=track&market=US&limit=1"

    
    getLink(url,key).then(function(data){
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

      // var f = document.createElement("form");
      // f.setAttribute("method", "get");
      // f.setAttribute("target", "_blank");
      // f.setAttribute("action", data);

      // var btn = document.createElement("BUTTON");
      // btn.setAttribute("class", "spotify-button");
      // btn.setAttribute("type", "submit");
      // f.appendChild(btn);

      var btn = document.createElement("a");
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

    }).catch(function(error){
      console.log(error);
    })
		
	}
});

function getLink(requestUrl, apikey){
  let promise = new Promise(function(resolve, reject){
    fetch(requestUrl, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + apikey,
        "Content-Type": "application/json"
      }
    }).then(resp => resp.json()).then(json2 => {
      let link = json2['tracks']['items'][0]['external_urls']['spotify']
      //console.log(link);
      if(link == undefined) reject(new Error("undefined link"));
      else resolve(link);
    });
  })
  return promise;
}