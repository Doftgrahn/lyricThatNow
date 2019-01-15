const artist = $('#artist');
const song = $('#song');
const addSong = $('#add-title');
let crossDiv = '<button class="crossDelete">x</button>';

const state = {
  playlist: []
};

$(document).ready(() => {

  const addSong = $('#add-title');

  let playlist = localStorage.getItem('playlist');
  if (playlist !== null) {
    state.playlist = JSON.parse(playlist);
    state.playlist.forEach(song => {
      appendSong(song);
      //$('#output-list').append('<li class="line">' + song.artist + ' - ' + song.title + '<button class="getLyrics">Get the lyrics</button>' + '</li>');
    })
  }
  // $("#listOfSongs").hide();
  $("#artist").keyup(checkInput);
  $("#title").keyup(checkInput);

  function checkInput (){

    if ($('#artist').val() && $('#title').val()){
         addSong.removeAttr('disabled');
         console.log("button is enabled");
    } else {
          //false if value in input is null or empty or undefined
      addSong.attr('disabled', true);
      console.log("button is disabled");
    }

  }


  addSong.click(() => {
    // console.log("button add song was clicked");
    let artist = $('#artist').val();
    let title = $('#title').val();
    appendSong({
      artist,
      title
    }); // es6 version
    // let button = $('<button>Get the lyrics</button>');
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

})//document ready


function getLyrics(artist, title) {
  $.ajax(`https://api.lyrics.ovh/v1/${artist}/${title}?New%20item=`)
    .done((res) => {
      // let crossDiv = '<button class="crossDelete">x</button>';
      let reply = res.lyrics;
      $(".lyric-container").hide().html('<pre>' + reply + '</pre>').append(crossDiv).slideDown(800);
      $(".errorMessage").slideUp(800, message => {
        $(this).remove();
      });
      const cross = $('.crossDelete');
      cross.on('click', remove => {
        $(".lyric-container").slideUp(800, takeAway => {
          $(this).remove();
        });
        $('.errorMessage').slideUp(800, message => {
          $(this).remove();
        })

      });
    })
    .fail((res) => {
      $(".errorMessage").html('<p>Oops, no lyrics found... Try again!</p>').fadeIn('fast');
    })
};



function appendSong(song) {

  //let button = $('<button>Get the lyrics</button>');
  let deleteButton = $('<button class="delete btn btn-one" class="deleteButton"><i class="fas fa-trash-alt"></i></button>');
  let getButton = $('<button class="getLyrics btn btn-one" class="getButton"><i class="fas fa-align-justify"></i></button>');
  let editButton = $('<button class="edit btn btn-one" class="editButton"><i class="fas fa-edit"></i></button>');
  let li = $('<li class="line"><span class="content">' + song.artist + ' - ' + song.title + '</span></li>');

  deleteButton.on('click', event => {
    let newPlaylist = state.playlist.filter(s => s.artist !== song.artist || song.title !== s.title);
    localStorage.setItem('playlist', JSON.stringify(newPlaylist));
    state.playlist = newPlaylist;
    $(".errorMessage").slideUp(800, message => {
      $(this).remove();
    });
    li.slideUp('fast', deleteIt => {
      $(this).remove();
    });
  });

  li.append(getButton);
  li.append(deleteButton);
  li.append(editButton);
  $('#output-list').hide().append(li).slideDown(800);

  getButton.click(() => {
    console.log(song.artist, song.title);
    getLyrics(song.artist, song.title);
  });

  editButton.click(()=> {
    console.log("edit button was clicked");
    editSong(li, song);
  })
}

function editSong (li, song){
  let content = li.find('.content');
  content.html('');
  //manipulate dom in order to create inputs for changing
  content.append(`<input class="editArtist" value="${song.artist}" type="text">`);
  content.append(`<input class="editTitle" value="${song.title}" type="text">`);
  //changing the button from edit to save, by hiding and adding new one
  let saveButton = $('<button class="save btn btn-one"><i class="fas fa-save"></i></button>');
  let editB = li.find(".edit");
    //hide
  editB.hide();
  editB.after(saveButton);
  saveButton.click(()=> {

    let newArtist = content.find(".editArtist").val();
    let newTitle = content.find(".editTitle").val();
    let playlistItem = state.playlist.find( x => x.artist === song.artist && x.title === song.title);

    playlistItem.artist = newArtist;
    playlistItem.title = newTitle;
    localStorage.setItem('playlist', JSON.stringify(state.playlist));

    li.remove();

    //call the function that stores new values from user input
    appendSong({artist: newArtist, title: newTitle});
  })
}
