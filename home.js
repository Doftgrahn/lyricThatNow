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
      //console.log('Hittade sången:', song);
      appendSong(song);
      //$('#output-list').append('<li class="line">' + song.artist + ' - ' + song.title + '<button class="getLyrics">Get the lyrics</button>' + '</li>');
    })
  }
  // $("#listOfSongs").hide();

  $("#add-title").click(()=>{
    console.log("button add song was clicked");
    let artist = $('#artist').val();
    let title = $('#title').val();
    appendSong({artist, title}); // es6 version
    let button = $('<button>Get the lyrics</button>');
    //$("#output-list").append(button);
    state.playlist.push({ artist: artist, title: title }); //old version
    localStorage.setItem('playlist', JSON.stringify(state.playlist));
  });

  function appendSong (song) {
    //let button = $('<button>Get the lyrics</button>');
    let li = $('<li class="line">' + song.artist + ' - ' + song.title + '<button class="getLyrics">Get the lyrics</button>' + '</li>');
    let button = li.find('button');
    $('#output-list').append(li);

    button.click(() => {
      console.log(song.artist, song.title);
      getLyrics (song.artist, song.title);
    })
  }

  function getLyrics (artist, title) {
    console.log("button get lyrics was clicked");

    $.ajax(`https://api.lyrics.ovh/v1/${artist}/${title}?New%20item=`)
    .done((res) => {
      let reply = res.lyrics;
      console.log(res);
      $(".lyric-container").html('<pre>' + reply + '</pre>');
    });

  };
});
