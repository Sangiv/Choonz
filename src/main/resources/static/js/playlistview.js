const params = new URLSearchParams(window.location.search);
for (let param of params) {
  let id = param[1];
  getPlaylistView(id);
}

let search_play_id = window.location.search.split('=');
const playlist_id = search_play_id[1];
console.log("play_id:" + playlist_id);

// populate Modal input value
$('#editPlayModal').on('shown.bs.modal', function (e) {
  let tempDiv = document.querySelector("#showcards").cloneNode(true);

  document.getElementById("name").value = tempDiv.querySelector("#title").innerHTML
  document.getElementById("description").value = tempDiv.querySelector("#text").innerHTML


  // var arr = $('#track_table tr').find('td:first').map(function () {
  //   return $(this).text()
  // }).get()

  // let set = new Set();
  // if (!arr.length <= 1) {
  //   for (var i =1; i<arr.length; i++) {
  //     let temp = {
  //       "id": parseInt(arr[i])
  //     };
  //     set.add(temp);
  //   }

  // }


});

document.getElementById("updatePlayBtn").addEventListener('click', function (stop) {
  //get the element value
  //then call a function to do a put fetch
  let updated_name = document.getElementById("name").value;
  let updated_description = document.getElementById("description").value
  let updated_artwork = document.getElementById("artwork").value
  let search_play_id = window.location.search.split('=');
  const playlist_id = search_play_id[1];

  console.log(playlist_id);
  //get all track id in json string and insert into the function
  var arr = $('#track_table tr').find('td:first').map(function () {
    return $(this).text()
  }).get()

  let collected_set = new Set();
  if (!arr.length <= 1) {
    for (var i = 1; i < arr.length; i++) {
      // let temp = {
      //   "id": parseInt(arr[i])
      // };
      let temp = parseInt(arr[i]);
      collected_set.add(temp);
    }
  }
  
  // let json_sufffix = "]}'"
  // let array = Array.from(collected_set);
  // var json_prefix = "'\"name\" :  First half, \"tracks\" : ["; 
  // for (let i = 0; i < array.length; i++) {
  //   //  console.log(json_prefix.concat("\"id\" : "+array[i].toString()+" , "));
  //   if (array.length == 1 || array.length - 1 == i) {
  //     json_prefix = json_prefix.concat("{\"id\" : " + array[i].toString() + "}");
  //   } else {
  //     json_prefix = json_prefix.concat("{\"id\" : " + array[i].toString() + "},")
  //   }
  // }
  update_playlist_info(playlist_id, updated_name, updated_description, updated_artwork, collected_set);

})

//delete the playlist upon clicking yes button
document.getElementById("confirmedDeleteBtn").addEventListener('click', function (stop) {
  //get playlist id
  //then do a fetch delete
  console.log("delete the play list")
  deleteFullPlaylist(playlist_id);
})

function deleteFullPlaylist(playlist_id) {

  console.log(playlist_id);
  fetch("http://localhost:8082/playlists/delete/" + playlist_id, {
    method: 'delete',
    headers: {
      "Content-type": "application/json"
    },
  })

    .then(function (data) {
      console.log('Request succeeded with JSON response', data);
      window.location.href = "playlist.html"
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

      let cell = row.insertCell()
      let text = document.createTextNode("ID")
      cell.className = ("hide_id");

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
      for (let i = 0; i < arr.length; i++) {
        let obj = arr[i];
        let row = table.insertRow();

        for (let prop in obj) {

          // if (prop === "id") {
          //   track_arr_id.push(obj.id);


          // }
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


function update_playlist_info(id, updated_play_name, updated_description, updated_artwork, collected_set) {

  let json_sufffix = "]}'"
  let array = Array.from(collected_set);
  // var json_prefix = '{"name": \"' + updated_play_name + '\","description":\"' + updated_description + '\","artwork" :\"' +
  //   updated_artwork + '\", "users": {"user_id" :' + get_cookie_value("user_id") + '}, "tracks":[{"id":3}, {"id" : 4}]}';

  var json_prefix = '{"name": \"' + updated_play_name + '\","description":\"' + updated_description + '\","artwork" :\"' +
  updated_artwork + '\", "users": {"user_id" :' + get_cookie_value("user_id") + '}, "tracks":[';
 
  // var json_prefix = "'\"name\" :  First half, \"tracks\" : ["; 
 
  for (let i = 0; i < array.length; i++) {
    if (array.length == 1 || array.length - 1 == i) {
      json_prefix = json_prefix.concat("{\"id\" : " + array[i].toString() + "}"+json_sufffix);
    } else {
      json_prefix = json_prefix.concat("{\"id\" : " + array[i].toString() + "},")
    }
  }
  console.log(json_prefix);
  

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  

  console.log(json_prefix);
  // let dataToUpdate = {
  //   "name": updated_play_name,
  //   "artwork": updated_artwork,
  //   "description": updated_description,
  //   "tracks": [{

  //   }],
  //   "users": {

  //     "user_id": get_cookie_value("user_id")
  //   }
  // }
  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: JSON.parse(JSON.stringify(json_prefix)),
    redirect: 'follow'
  };

  fetch("http://localhost:8082/playlists/update/" + id, requestOptions)

    .then(function (data) {

      console.log('Request succeeded with JSON response', data);
      window.location.href = "playlistview.html?id="+playlist_id;
      // document.getElementById("show-msg").innerHTML = "User details Updated";
      // $('#messageModal').modal('show');

    })
    .catch(function (error) {
      console.log('Request failed', error);
      // document.getElementById("show-msg").innerHTML = "Failed to Update user";
      // $('#messageModal').modal('show');
    });
}

function goBack() {
  window.history.back();
}
//get current user's id
function get_cookie_value(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

