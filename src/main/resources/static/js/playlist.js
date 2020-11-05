var user_id = get_cookie_value("user_id");

var userBtn = document.getElementById("userLoggedInSection");
var guestBtn = document.getElementById("guestLoggedInSection");
var isMyCookie = document.cookie;

//if user logged in then change hidden button
if(isMyCookie != ""){
    // window.onload = function() {
    //   userBtn.style.display = 'block';
    //   guestBtn.style.display = 'block';
    // };
    $(this).ready(function() {
      $(guestBtn).show();
      $(userBtn).show();

  });
}
else{
    $(this).ready(function() {
      $(guestBtn).show();
      $(userBtn).hide();

  });
   
}


document.getElementById("createNewPlayBtn").addEventListener('click', function (stop) {
  var play_name = document.getElementById("name").value;
  var play_description = document.getElementById("description").value;
  var play_art = document.getElementById("artwork").value;

  createNewPlaylist(user_id, play_name, play_art, play_description);
})

// document.getElementById("confirmedDeleteBtn").addEventListener('click', function(stop){
//   //get playlist id
//   //then do a fetch delete
//   console.log("delete me")


// })

fetch('http://localhost:8082/playlists/read')
  .then(
    function (response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      console.log('Fetch Success')
      response.json().then(function (dataData) {
        console.log(dataData);
        cardData(dataData);


      });
    }
  )
  .catch(function (err) {
    console.log('Fetch Error :-S', err);
  });

function cardData(dataData) {
  //TODO: get only other's playlist when user logged in
  for (let dataRecord of dataData) {
    singleIterationCheck = 0;
    for (value in dataRecord) {
      if (typeof dataRecord[value] === 'object') {
        if (singleIterationCheck != 0) {

        } else {
          let id = dataRecord.id;
          let image = dataRecord.artwork;
          let title = dataRecord.name;
          let description = dataRecord.description;
          let view_btn = "View";
          let view_btn_link = "playlistview.html?id=" + dataRecord.id;
          // let button2Text = "Edit My Playlist";
          // let button2Link = "playlistedit.html?id=" + dataRecord.id;
          // let deletBtn = dataRecord.id;
          // createCard(id, image, title, description, buttonText, buttonLink, button2Text, button2Link, deletBtn);
          createCard(id, image, title, description, view_btn, view_btn_link);
          singleIterationCheck++;
        }
      }

    }
  }
}

function createCard(id, image, title, description, view_btn, view_btn_link) {
  //updates cloneCard with new information
  let cards = document.getElementById("showcards");
  let cloneCard = document.querySelector("#globalPlaylist").cloneNode(true);

  cloneCard.id = ("globalCard" + id);
  
  cloneCard.querySelector("img").src = (image);
  cloneCard.querySelector("#imglink").href = (view_btn_link);
  cloneCard.querySelector("#title").innerHTML = (title);
  cloneCard.querySelector("#titlelink").href = (view_btn_link);
  cloneCard.querySelector("#text").innerHTML = (description);
  cloneCard.querySelector("#button").innerHTML = (view_btn);
  cloneCard.querySelector("#button").href = (view_btn_link);
  // cloneCard.querySelector("#button2").innerHTML = (button2Text);
  // cloneCard.querySelector("#button2").href = (button2Link);
  // cloneCard.querySelector("#deletePlay").innerHTML = (deletePlayBtn);
  cards.appendChild(cloneCard);
}

function createNewPlaylist(user_id, playlist_name, play_art, playlist_description) {
  let dataToPost = {
    "name": playlist_name,
    "artwork": play_art,
    "description": playlist_description,
    "tracks": null,
    "users": {
      "user_id": user_id
    }
  }
  fetch("http://localhost:8082/playlists/create", {
      method: 'post',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(dataToPost)
    })
    .then(function (data) {
      console.log('Request succeeded with JSON response', data);
      window.location.href = "playlist.html"
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });

}

fetch('http://localhost:8082/users/read/' + user_id)
  .then(
    function (response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      console.log('Fetch Success')
      response.json().then(function (dataData) {
        getUserPlaylist(dataData);
      });
    }
  )
  .catch(function (err) {
    console.log('Fetch Error :-S', err);
  });

function getUserPlaylist(myData) {
  for (var key in myData) {
    if (key === "playList") {
      let data_size = Object.keys(myData).length
      if (data_size > 1) {
        for (let element of myData[key]) {
          console.log(element) //gives whole object
          console.log(element.name, element.description, element.artwork) //gives value of the key
          //call a function to insert and populate a pre existing card in the my playlist div
          let play_id = element.id;
          let play_name = element.name;
          let play_description = element.description;
          let play_art = element.artwork;
          populateUserPlayWithData(play_id, play_name, play_art, play_description);
        }
      }
    }
  }

}
function populateUserPlayWithData(play_id, play_name, play_art, play_description){
  let card_holder = document.querySelector("#showMycards");
  let card_body = document.querySelector("#myPlaylist").cloneNode(true);

  card_body.querySelector("img").src = (play_art);
  card_body.querySelector("#imglink").href = ("playlistview.html?id="+play_id);
  card_body.querySelector("#title").innerHTML = (play_name);
  card_body.querySelector("#titlelink").href = ("playlistview.html?id="+play_id);
  card_body.querySelector("p").innerHTML = (play_description);
  card_body.querySelector("#viewMyPlayBtn").href = ("playlistview.html?id="+play_id);
  
  // card_body.querySelector("#addToMyPlayBtn").href = ("track.html/");
  card_body.querySelector("#addToMyPlayBtn").href = ("track.html");
  card_body.querySelector("#deleteMyPlayBtn").addEventListener('click', function(){
    deleteFullPlaylist(play_id);
  })



  card_holder.append(card_body)
}
function deleteFullPlaylist(playlist_id) {
  $('#deletePlayModal').on('shown.bs.modal', function (e) {

    // var $button = $(e.target); // The clicked button
    // $(this).closest('.modal').one('hidden.bs.modal', function() {
    //   // Fire if the button element 
    //   console.log('The button that closed the modal is: ', $button);
    // });
    document.getElementById("confirmedDeleteBtn").addEventListener('click', function(stop){
      fetch("http://localhost:8082/playlists/delete/" + playlist_id, {
        method: 'delete',
        headers: {
          "Content-type": "application/json"
        },
      })
        .then(function (data) {
          console.log('Request succeeded with JSON response', data);
          window.location.href = "playlist.html"
        })
        .catch(function (error) {
          console.log('Request failed', error);

        });
    })
  
  });
}



//get current user's id
function get_cookie_value(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}