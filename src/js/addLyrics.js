const artist = $('#artist');
const song = $('#song');
<<<<<<< HEAD
const addSong = $('#add-title');
=======
>>>>>>> a845936dd8fc26ff6c71b6136447d196e9925681
let crossDiv = '<button class="crossDelete">x</button>';


$(document).ready(() => {
<<<<<<< HEAD
=======
  const addSong = $('#add-title');

>>>>>>> a845936dd8fc26ff6c71b6136447d196e9925681

  const state = {
    playlist: []
  };

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
         $("#add-title").removeAttr('disabled');
         console.log("button is enabled");
    } else {
          //false if value in input is null or empty or undefined
      $("#add-title").attr('disabled', true);
      console.log("button is disabled");
    }

  }

<<<<<<< HEAD
  $("#add-title").click(() => {
=======
  addSong.click(() => {
>>>>>>> a845936dd8fc26ff6c71b6136447d196e9925681
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

  function appendSong(song) {

    //let button = $('<button>Get the lyrics</button>');
    let deleteButton = $('<button class="delete btn btn-one" id="deleteButton"><i class="fas fa-trash-alt"></i></button>')
<<<<<<< HEAD
    let getButton = $('<button class="getLyrics btn btn-one" id="getButton">Get lyrics</button>');
=======
    let getButton = $('<button class="getLyrics btn btn-one" id="getButton"><i class="fas fa-align-justify"></i></button>');
>>>>>>> a845936dd8fc26ff6c71b6136447d196e9925681
    let editButton = $('<button class="edit btn btn-one" id="editButton"><i class="fas fa-edit"></i></button>')
    let li = $('<li class="line"><span class="content">' + song.artist + ' - ' + song.title + '</span></li>');
    li.append(getButton);
    li.append(deleteButton);
    $('#output-list').hide().append(li).slideDown(800);
    li.append(editButton);
    $('#output-list').hide().append(li).fadeIn('fast');

    getButton.click(() => {
      console.log(song.artist, song.title);
      getLyrics(song.artist, song.title);
<<<<<<< HEAD
    })
=======
    });
>>>>>>> a845936dd8fc26ff6c71b6136447d196e9925681

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
  };


<<<<<<< HEAD
  /*function editSong (artist, title){
    let songInTheList = $(`.content-${song.artist, song.title}`);
    //store info into variables
    let artistElem = songInTheList.find('span.artist');
    let titleElem = songInTheList.find('span.title');
    //store current values into variables
    let orgArtist = artistElem.text();
    let orgTitle = titleElem.text();
    //manipulate dom in order to create inputs for changing
    artistElem.html(`<input value="${orgArtist}" type="text">`);
    titleElem.html(`<input value="${orgTitle}" type="text">`);
    //changing the button from edit to save, by hiding and adding new one
    let saveButton = $('<button class="save btn btn-one"><i class="fas fa-save"></i></button>')
    let editB = songInTheList.find(".edit");
    //hide
    editB.hide();
    button.after(saveButton);
    saveButton.click(()=> {
      //call the function that stores new values from user input
      appendSong(artistElem.find("input").val(), titleElem.find("input").val());
    })
  }*/
=======
/*  function editSong (artist, title){

}*/
>>>>>>> a845936dd8fc26ff6c71b6136447d196e9925681


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

        });
      })
      .fail((res) => {
        $(".errorMessage").html('<p>Oops, no lyrics found... Try again!</p>').fadeIn('fast');
      })
  };
});
