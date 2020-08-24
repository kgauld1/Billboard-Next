var ranking = document.getElementById("ranking");

fetch('/songs', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	}
}).then(resp => resp.json()).then(json => {
	let ranks = json.ranks;
	for (let i=0; i<10; i++){
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

		print(searchTrack(ranks[i].name, ranks[i].artist))

		song.appendChild(rank)
		song.appendChild(songInfo)

		ranking.appendChild(song);
	}
});

function searchTrack(name, artist){
  let queryString = name + " " + artist;
  queryString.replace(" ", "%20")
  fetch("https://api.spotify.com/v1/search?q=" + queryString + "&type=track&market=US&limit=1", {
      headers: {
          Accept: "application/json",
          Authorization: "Bearer " + json.token,
          "Content-Type": "application/json"
      }
    }).then(resp => resp.json()).then(json => {
      return json['tracks']['items'][0]['external_urls']['spotify'];
    });
}