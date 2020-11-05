var play_del_btn = document.getElementById("deletePlay");
var add_track_btn = document.getElementById("addToMyPlayBtn");
var edit_play_btn = document.getElementById("editPlaylistBtn");
var isMyCookie = document.cookie;

var user_id = get_cookie_value("user_id")
//if user logged in then change hidden button
if (isMyCookie != "") {
  //   $(document).ready(function() {
  //     $(play_del_btn).show();
  //     $(add_track_btn).show();
  //     $(edit_play_btn).show();

  // });
}
else {
  $(document).ready(function () {
    $(play_del_btn).hide();
    $(add_track_btn).hide();
    $(edit_play_btn).hide();

  });

}
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


  // var arr = $('#myTable tr').find('td:first').map(function () {
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
  var arr = $('#myTable tr').find('td:first').map(function () {
    return $(this).text()
  }).get()

  let collected_set = new Set();
  if (!arr.length <= 1) {
    for (var i = 1; i < arr.length; i++) {
      let temp = parseInt(arr[i]);
      collected_set.add(temp);
    }
  }

  update_playlist_info(playlist_id, updated_name, updated_description, updated_artwork, collected_set);

})

//delete the playlist upon clicking yes button
document.getElementById("confirmedDeleteBtn").addEventListener('click', function (stop) {
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


function createCard(id, image, title, description, dataData) {
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
  if(dataData.users.user_id != user_id){
    cloneCard.querySelector("#deletePlay").remove();
    cloneCard.querySelector("#editPlaylistBtn").remove();
    cloneCard.querySelector("#addToMyPlayBtn").remove();
  }
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
        createCard(id, image, title, description, dataData);
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

      
      let cell4 = document.createElement("th");
      let text4 = document.createTextNode("TRACKS")
      cell4.appendChild(text4);
      row.appendChild(cell4);

      let cell1 = document.createElement("th");
      let text1 = document.createTextNode("ARTIST")
      cell1.appendChild(text1);
      row.appendChild(cell1);

      let cell2 = document.createElement("th");
      let text2 = document.createTextNode("ALBUM")
      cell2.appendChild(text2);
      row.appendChild(cell2);
      if(dataData.users.user_id == user_id){
      let cell3 = document.createElement("th");
      let text3 = document.createTextNode("REMOVE")
      cell3.appendChild(text3);
      row.appendChild(cell3);
      }
    }
  }
}


function createTableBody(table, dataData) {
  for (let key in dataData) {
    if (key == "tracks") {
      let arr = dataData[key];
      for (let i = 0; i < arr.length; i++) {
        let obj = arr[i];
        let playlist_t_row = table.insertRow();


        for (let prop in obj) {

          if (prop == "duration") {
            // if(dataData.users.user_id != user_id){
              
            // }
            let delete_track = playlist_t_row.insertCell();
            let delete_track_btn = document.createElement("BUTTON");
            delete_track_btn.innerHTML = "Remove"
            delete_track_btn.className = "btn btn-danger"
            delete_track_btn.id = obj.id

            delete_track_btn.addEventListener('click', function(){
              // get_latest_tracks(obj.id);
              update_play_single_track_removal(playlist_id,obj.id);
            });
            delete_track.append(delete_track_btn);

          } else if (prop == "lyrics") {

          } else if (prop == "album") {

            let artist_cell = playlist_t_row.insertCell();
            let artist_name = document.createTextNode(obj.album.artist.name);
            artist_cell.appendChild(artist_name);

            let album_cell = playlist_t_row.insertCell();
            let album_name = document.createTextNode(obj.album.name);
            album_cell.appendChild(album_name);

          } else {
            let cell = playlist_t_row.insertCell();
            let text = document.createTextNode(obj[prop]);
            cell.appendChild(text);

          }
        }//end of inner loop

        //adds three drop down option end of the table
        // let delete_track = playlist_t_row.insertCell();
        // let val = document.querySelector("#showEditOption").cloneNode(true)
        // delete_track.append(val);


        //hide the first column[ID] of the table
        $('#myTable tr').find('td:first').map(function () {
          $(this).hide()
        })
      } //end of second loop
    } //end of first if 
  } // main for loop

  //workspace [mjoni]
  // $('#myTable tr').find('td:first').map(function () {
  //   console.log("table row")
  //   let val = document.querySelector("#showEditOption").cloneNode(true)
  //   $('#myTable tr').append(val)
  // })


}

function delete_single_track(track_id) {
  

}
function get_latest_tracks(track_id){

  let current_track_arr = $('#myTable tr').find('td:first').map(function () {
    return $(this).text()
  }).get()

  let collected_set = new Set();
  if (!current_track_arr.length <= 1) {
    for (var i = 1; i < current_track_arr.length; i++) {
      let temp = parseInt(current_track_arr[i]);
      collected_set.add(temp);
    }
  }
  current_track_arr = Array.from(collected_set);
  // current_track_arr = [1,3,2,7,5,6]
  for (id in current_track_arr) {
    if(track_id === current_track_arr[id] ){
      console.log("found it")
      current_track_arr.splice(id,1);
      break;
    }
  }
  // console.log(track_id)
  // let new_arr=[];
  // $.each(current_track_arr, function(i, track_id){
  //     if($.inArray(track_id, new_arr) === -1)  return new_arr.push(track_id);
  //     if($.inArray(track_id, current_track_arr) === -1) current_track_arr.pop(track_id);
  //     console.log(new_arr)

  // });
  // console.log(new_arr)

  return current_track_arr;
}

function update_play_single_track_removal(playlist_id, track_id) {
  

  let v = document.querySelector("#showcards")
  let updated_name = v.querySelector("#title").innerHTML
  let updated_description =v.querySelector("#text").innerHTML
  let updated_artwork = v.querySelector("#play-img").src
  

  let json_sufffix = "]}'"
  let new_arr = get_latest_tracks(track_id); // remove selected track and get the rest


  var json_prefix = '{"name": \"' + updated_name + '\","description":\"' + updated_description + '\","artwork" :\"' +
    updated_artwork + '\", "users": {"user_id" :' + get_cookie_value("user_id") + '}, "tracks":[';

  if(new_arr.length===0){
    json_prefix = json_prefix.concat(json_sufffix);
  }else{
    for (let i = 0; i < new_arr.length; i++) {
      if (new_arr.length == 1 || new_arr.length - 1 == i) {
        json_prefix = json_prefix.concat("{\"id\" : " + new_arr[i].toString() + "}" + json_sufffix);
      } else {
        json_prefix = json_prefix.concat("{\"id\" : " + new_arr[i].toString() + "},")
      }
    }
  }
  console.log(json_prefix);


  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: JSON.parse(JSON.stringify(json_prefix)),
    redirect: 'follow'
  };

  fetch("http://localhost:8082/playlists/update/" + playlist_id, requestOptions)

    .then(function (data) {

      console.log('Request succeeded with JSON response', data);
      window.location.href = "playlistview.html?id=" + playlist_id;
      // document.getElementById("show-msg").innerHTML = "User details Updated";
      // $('#messageModal').modal('show');

    })
    .catch(function (error) {
      console.log('Request failed', error);
    });
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
      json_prefix = json_prefix.concat("{\"id\" : " + array[i].toString() + "}" + json_sufffix);
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
      window.location.href = "playlistview.html?id=" + playlist_id;
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

