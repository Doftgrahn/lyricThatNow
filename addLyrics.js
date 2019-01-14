const artist = $('#artist');
const song = $('#song');
const addSong = $('#add-title');

$(document).ready(() => {

  const state = {
    playlist: []
  };


  let playlist = localStorage.getItem('playlist');
  // console.log('playlist är: ', typeof playlist, playlist);
  if (playlist !== null) {
    state.playlist = JSON.parse(playlist);
    state.playlist.forEach(song => {
      //console.log('Hittade sången:', song);
      appendSong(song);
      //$('#output-list').append('<li class="line">' + song.artist + ' - ' + song.title + '<button class="getLyrics">Get the lyrics</button>' + '</li>');
    })
  }
  // $("#listOfSongs").hide();
  $("#artist").keyup(checkInput);
  $("#title").keyup(checkInput);

  function checkInput (){

    if ($('#artist').val() && $('#title').val()){
         $("#add-title").removeAttr('disabled');
         console.log("button is enabled");
    } else {
          //false if value in input is null or empty or undefined
      $("#add-title").attr('disabled', true);
      console.log("button is disabled");
    }

  }

  $("#add-title").click(() => {
    console.log("button add song was clicked");
    let artist = $('#artist').val();
    let title = $('#title').val();
    appendSong({
      artist,
      title
    }); // es6 version
    let button = $('<button>Get the lyrics</button>');
    //$("#output-list").append(button);
    state.playlist.push({
      artist: artist,
      title: title
    }); //old version
    localStorage.setItem('playlist', JSON.stringify(state.playlist));
    $('#artist').val('');
    $('#title').val('');
    checkInput();

  });

  function appendSong(song) {

    //let button = $('<button>Get the lyrics</button>');
    let deleteButton = $('<button class="delete btn btn-one" id="deleteButton"><i class="fas fa-trash-alt"></i></button>')
    let getButton = $('<button class="getLyrics btn btn-one" id="getButton">Get lyrics</button>');
    let editButton = $('<button class="edit btn btn-one" id="editButton"><i class="fas fa-edit"></i></button>')
    let li = $('<li class="line"><span class="content">' + song.artist + ' - ' + song.title + '</span></li>');
    li.append(getButton);
    li.append(deleteButton);
    li.append(editButton);


    $('#output-list').hide().append(li).fadeIn('fast');

    getButton.click(() => {
      console.log(song.artist, song.title);
      getLyrics(song.artist, song.title);
    })

    deleteButton.on('click', event => {
      let newPlaylist = state.playlist.filter(s => s.artist !== song.artist || song.title !== s.title);
      console.log(`Funkar newplaylist?`, newPlaylist);
      localStorage.setItem('playlist', JSON.stringify(newPlaylist));
      state.playlist = newPlaylist;
      li.fadeOut('fast', deleteIt => {
        $(this).remove();
      });
    });
  };


/*  function editSong (artist, title){

}*/


  function getLyrics(artist, title) {
    console.log("button get lyrics was clicked");
    $.ajax(`https://api.lyrics.ovh/v1/${artist}/${title}?New%20item=`)
    .done((res) => {
      let reply = res.lyrics;
      $(".lyric-container").html('<pre>' + reply + '</pre>');
    })
    .fail((res) => {
      $(".lyric-container").html('<div class="errorMessage">' + "Ooops, no lyrics found" + '</div>');
    })
  }
});
