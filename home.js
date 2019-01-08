// const url;
// const apiKey;
const artist = $('#artist');
const song = $('#song');
const addSong = $('#add-title');

$(document).ready(() => {
  const state = {
    playlist: []
  };

  let playlist = localStorage.getItem('playlist');
  // console.log('playlist är: ', typeof playlist, playlist);
  if( playlist !== null ) {
    state.playlist = JSON.parse(playlist);
    state.playlist.forEach(song => {
      console.log('Hittade sången:', song);
      $('#output-list').append('<li class="line">' + song.artist + ' - ' + song.title + '</li>');
    })
  }
  // $("#listOfSongs").hide();

  $("#add-title").click(()=>{
    console.log("button add song was clicked");
    let artist = $('#artist').val();
    let title = $('#title').val();
    let button = $('<button>Get the lyrics</button>');
    button.click( () => getLyrics(artist, title) );
    $("#output-list").append(`<li class="line">` + artist + ` - ` + title + `<button class="getLyrics">Get the lyrics</button>` + `</li>`);// + '<button id="getLyrics">Get the lyrics</button>');
    //$("#output-list").append(button);
    state.playlist.push({ artist: artist, title: title });
    localStorage.setItem('playlist', JSON.stringify(state.playlist));
  })


  $("#getLyrics").click(getLyrics);
  function getLyrics (artist, title) {
    console.log("button get lyrics was clicked");
    $.ajax(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .done((res) => {
      let reply = JSON.parse(res);
    })
    //let elem = $(`<li>${artist}-${title}<button id="getLyrics"></button></li>`);
    //$(".listOfSongs").append(elem);
    //$(".listOfSongs").show();
  };
});
