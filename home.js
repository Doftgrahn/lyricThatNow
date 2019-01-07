// const url;
// const apiKey;
const artist = $('#artist');
const song = $('#song');
const addSong = $('#add-title');

$(document).ready(() => {
  const state = {
    playlist: []
  };

  //$("#listOfSongs").hide();

  $("#add-title").click(()=>{
    console.log("button add song was clicked");
    let artist = $('#artist').val();
    let title = $('#song').val();
    let button = $('<button>Get the information</button>');
    button.click( () => getLyrics(artist, title) );
    $(".lineInTheList").append("<li>" + artist + " - " + title + "</li>");// + '<button id="getLyrics">Get the lyrics</button>');
    $(".lineInTheList").append(button);
    state.playlist.push(artist, title);
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
