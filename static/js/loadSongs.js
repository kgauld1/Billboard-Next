var ranking = document.getElementById("ranking");

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
  songInfo.innerHTML = `<b>${songTitle}</b>${artistName}`

  song.appendChild(rank)
  song.appendChild(songInfo)

  ranking.appendChild(song);
}