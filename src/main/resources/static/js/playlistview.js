const params = new URLSearchParams(window.location.search);

for (let param of params) {
  let id = param[1];
  getPlaylistView(id);
}

let search_play_id= window.location.search.split('=');
const playlist_id = search_play_id[1];
console.log(playlist_id)

document.getElementById("editPlaylistBtn").addEventListener('submit', function (stop) {
  console.log("edit the play list")

})

document.getElementById("confirmedDeleteBtn").addEventListener('click', function (stop) {
  //get playlist id
  //then do a fetch delete
  deleteFullPlaylist(playlist_id);
})
function deleteFullPlaylist(playlist_id){

  console.log(playlist_id);
  fetch("http://localhost:8082/playlists/delete/" + playlist_id, {
      method: 'delete',
      headers: {
        "Content-type": "application/json"
      },
    })

    .then(function (data) {
      console.log('Request succeeded with JSON response', data);
      window.href.location= "playlist.html"
      //Authenticate before delete it and send appropiate message
      
    })
    .catch(function (error) {
      console.log('Request failed', error);
      // document.getElementById("show-msg").innerHTML = "No User found!";
    });


}

function getPlaylistView(id) {
  fetch('http://localhost:8082/playlists/read/' + id)
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

          let table = document.querySelector("table");

          createTableHead(table, dataData);
          createTableBody(table, dataData);

        });
      }
    )
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });
}


function createCard(id, image, title, description,) {
  //updates cloneCard with new information
  let cards = document.querySelector("#showcards");
  let cloneCard = document.querySelector("#globalPlaylist").cloneNode(true);
  cloneCard.id = ("card" + id);
  cloneCard.querySelector("img").src = (image);
  cloneCard.querySelector("#title").innerHTML = (title);
  cloneCard.querySelector("#text").innerHTML = (description);
  cloneCard.querySelector("#backBtn").onclick = function () {
    goBack();
  };
  cloneCard.querySelector("#backBtn").innerHTML = "Back";
  cards.appendChild(cloneCard);
}

function cardData(dataData) {
  singleIterationCheck = 0;
  for (value in dataData) {
    if (typeof dataData[value] === 'object') {
      if (singleIterationCheck != 0) {

      } else {
        let id = dataData.id;
        let image = dataData.artwork;
        let title = dataData.name;
        let description = dataData.description;
        createCard(id, image, title, description);
        singleIterationCheck++;
      }
    }
  }
}

function createTableHead(table, dataData) {
  let thead = table.createTHead();
  let row = thead.insertRow();

  for (let value in dataData) {
    if (value == 'tracks') {

      let cell = row.insertCell();
      let text = document.createTextNode("ID")
      cell.appendChild(text);

      let cell2 = row.insertCell();
      let text2 = document.createTextNode("Track Name");
      cell2.appendChild(text2);

      let cell3 = row.insertCell();
      let text3 = document.createTextNode("Artist Name");
      cell3.appendChild(text3);

      let cell4 = row.insertCell();
      let text4 = document.createTextNode("Album Name");
      cell4.appendChild(text4);
    }
  }
}

function createTableBody(table, dataData) {
  for (let key in dataData) {

    if (key == "tracks") {
      let arr = dataData[key];
      console.log(arr);
      for (let i = 0; i < arr.length; i++) {
        let obj = arr[i];
        let row = table.insertRow();

        for (let prop in obj) {
          if (prop == "duration") {

          } else if (prop == "lyrics") {

          } else if (prop == "album") {

            let cell = row.insertCell();
            let text = document.createTextNode(obj.album.artist.name);
            cell.appendChild(text);

            let cell2 = row.insertCell();
            let text2 = document.createTextNode(obj.album.name);
            cell2.appendChild(text2);

          } else {
            // console.log(obj[prop]);
            let cell = row.insertCell();
            let text = document.createTextNode(obj[prop]);
            cell.appendChild(text);

          }
        }
      }
    }
  }
}

function goBack() {
  window.history.back();
}
