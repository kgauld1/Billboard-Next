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

    //console.log(json.token);

    let url = "https://api.spotify.com/v1/search?q=" + ranks[i].name.replace(/\s+/g, '%20').toLowerCase() + "&type=track&market=US&limit=1"
    console.log(url);
    fetch(url, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + json.token,
        "Content-Type": "application/json"
      }
    }).then(resp => resp.json()).then(json2 => {
      console.log(json2);
      console.log(json2['tracks']['items'][0]['external_urls']['spotify']);
    });

		song.appendChild(rank)
		song.appendChild(songInfo)

		ranking.appendChild(song);
	}
});

function searchTrack(name, token){
  
}