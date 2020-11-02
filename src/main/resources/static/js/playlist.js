// if the user is guest then
//   restrict edit 
//   only permit view
// else if the user is valied with right id then
//   give all the access in the playlist view and edit
var user_id = get_cookie_value("user_id");
document.getElementById("createNewPlayBtn").addEventListener('click', function(stop){
  var play_name = document.getElementById("name").value;
  var play_description = document.getElementById("description").value;
  var play_art = "img/test-playlist.png";

  console.log(play_name, play_description, play_art, user_id)
  createNewPlaylist(user_id, play_name, play_art, play_description);
})



fetch('http://localhost:8082/playlists/read')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      console.log('Fetch Success')
      response.json().then(function(dataData) {
        console.log(dataData);

        // createTableHead(table,data);
        // createTableBody(table,dataData);
        cardData(dataData);


      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

  function createCard(id, image, title, description, buttonText, buttonLink, button2Text, button2Link){
    //updates cloneCard with new information
    let cards = document.querySelector("div.showcards");
    let cloneCard = document.querySelector("div.card").cloneNode(true);
    cloneCard.id = ("card" + id);
    cloneCard.querySelector("img").src=(image);
    cloneCard.querySelector("#title").innerHTML = (title);
    cloneCard.querySelector("#text").innerHTML = (description);
    cloneCard.querySelector("#button").innerHTML = (buttonText);
    cloneCard.querySelector("#button").href = (buttonLink);
    cloneCard.querySelector("#button2").innerHTML = (button2Text);
    cloneCard.querySelector("#button2").href = (button2Link);
    cards.appendChild(cloneCard);
  }

  function cardData(dataData){

    for (let dataRecord of dataData){
      singleIterationCheck = 0;
        console.log(dataRecord);
        for (value in dataRecord){
            if (typeof dataRecord[value] === 'object'){
              if (singleIterationCheck != 0){

              } else {
                let id = dataRecord.id;
                let image = dataRecord.artwork;
                let title = dataRecord.name;
                let description = dataRecord.description;
                let buttonText = "View";
                let buttonLink = "playlistview.html?id="+dataRecord.id;
                let button2Text = "Edit";
                let button2Link = "playlistedit.html?id="+dataRecord.id;
                createCard(id, image, title, description, buttonText, buttonLink, button2Text, button2Link);
                singleIterationCheck++;
            }
          }

        }
    }
  }

function createTableHead(table,data){
let thead = table.createTHead();
let row = thead.insertRow();

for (let keys of data){
    // console.log(keys);
    if (keys == 'id'){
        
    }  else {
        let th = document.createElement("th");
        let text = document.createTextNode(keys);
        th.appendChild(text);
        row.appendChild(th);
    }


}
let editHead = document.createElement("th");
let editButtonTitle = document.createTextNode("View Tracks");
editHead.appendChild(editButtonTitle);
row.appendChild(editHead);

}

function createTableBody(table,dataData){
for (let dataRecord of dataData){
    console.log(dataRecord.name);

    let row = table.insertRow();
    for (value in dataRecord){
        
        // console.log(value);
        if (value == 'id'){

        } 
        else if(value == 'tracks'){

        }
        else if(value == 'name'){
            let cell = row.insertCell();
            let text = document.createTextNode(dataRecord.name)
            cell.appendChild(text);
            // let text = document.createTextNode(dataRecord[value]);
             

        }

        
    }
    let viewCell = row.insertCell();
    let viewButton = document.createElement("a");
    viewButton.className="btn btn-primary";
    viewButton.href="artistalbums.html?id="+dataRecord.id;
    viewButton.innerHTML="View";
    viewCell.appendChild(viewButton);

    let viewCell2 = row.insertCell();
    let viewButton2 = document.createElement("a");
    viewButton2.className="btn btn-primary";
    viewButton2.href="artisttracks.html?id="+dataRecord.id;
    viewButton2.innerHTML="View";
    viewCell2.appendChild(viewButton2);

    

            }
}

function createNewPlaylist(user_id, playlist_name, play_art, playlist_discription){
  let dataToPost = {
    "name": playlist_name,
    "artwork": play_art,
    "discription": playlist_discription,
    "users": {
      "users_id" : user_id
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
  })
  .catch(function (error) {
    console.log('Request failed', error);
  });

}

//get current user's id
function get_cookie_value(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}