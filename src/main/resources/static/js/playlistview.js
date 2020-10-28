const params = new URLSearchParams(window.location.search);

for (let param of params){
    let id = param[1];
    getPlaylistView(id);
}

function getPlaylistView(id){
    fetch('http://localhost:8082/playlists/read/' + id)
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
          cardData(dataData);
          
          let table = document.querySelector("table");

          createTableHead(table,dataData);
          createTableBody(table,dataData);

        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}


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
    singleIterationCheck = 0;
        for (value in dataData){
            if (typeof dataData[value] === 'object'){
              if (singleIterationCheck != 0){

              } else {
                let id = dataData.id;
                let image = dataData.artwork;
                let title = dataData.name;
                let description = dataData.description;
                let buttonText = "View";
                let buttonLink = "artistalbums.html?id="+dataData.id;
                let button2Text = "Edit";
                let button2Link = "artisttracks.html?id="+dataData.id;
                createCard(id, image, title, description, buttonText, buttonLink, button2Text, button2Link);
                singleIterationCheck++;           
              }
              
          }

        }
    
  }

  function createTableHead(table,dataData){
    let thead = table.createTHead();
    let row = thead.insertRow();

    for (let value in dataData){
      if (value == 'tracks'){

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

function createTableBody(table, dataData){
  for(let key in dataData){

    if(key == "tracks"){
      let arr = dataData[key];
      console.log(arr);
      for(let i = 0; i < arr.length; i++){
        let obj = arr[i];
        let row = table.insertRow();

        for(let prop in obj){
          console.log(prop);
          if (prop == "duration"){

          } else if (prop == "lyrics"){

          } else {
          // console.log(obj[prop]);
          let cell = row.insertCell();
          let text = document.createTextNode(obj[prop]);
          cell.appendChild(text);

          }
        }

        let trackid = (dataData.tracks[0].id);

        let artistCell = row.insertCell();
        let artist = document.createTextNode("Artist");
        artistCell.appendChild(artist);


        let albumCell = row.insertCell();
        // let album = getAlbum(trackid);
        album = document.createTextNode(getAlbum(trackid));
        albumCell.appendChild(album);

        console.log(getAlbum(trackid));
      }
      }
  }
}

function getArtist(id){
  fetch('http://localhost:8082/track/read/'+id)
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

        let table = document.querySelector("table");

        cardData(dataData);
        createTableHead(table,dataData);
        createTableBody(table,dataData);

      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);

  });
}


var getAlbumText;
function getAlbum(id){
  fetch('http://localhost:8082/tracks/read/'+id)
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
      console.log('Fetch Individual Track Success');

      response.json().then(function(dataData) 
      {
        getAlbumText = dataData.album.name;
        console.log(getAlbumText);
        if (getAlbumText != undefined){
          return getAlbumText;
        } return ("idk man");
      });
    }
  );

}


