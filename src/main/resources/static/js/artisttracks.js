const params = new URLSearchParams(window.location.search);

for(let param of params){
    let id = param[1];
    getSingleRecord(id);
}

function getSingleRecord(id){
fetch('http://localhost:8082/tracks/read/')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      console.log('Fetch Success')
      response.json().then(function(dataData) {
        console.log(dataData)
        let aid = id;
        let table = document.querySelector("table");
        
        

        createTableHead(table);
        createTableBody(table,dataData, aid);
        cardData(dataData, aid);


      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

function createCard(id, image, title, buttonText){
  //updates cloneCard with new information
  let cards = document.querySelector("div.showcards");
  let cloneCard = document.querySelector("div.card").cloneNode(true);
  cloneCard.id = ("card" + id);
  cloneCard.querySelector("img").src=(image);
  cloneCard.querySelector("#title").innerHTML = (title);
  // cloneCard.querySelector("#text").innerHTML = (description);
  cloneCard.querySelector("#button").innerHTML = (buttonText);
  cloneCard.querySelector("#button").onclick = function (){goBack();};
  // cloneCard.querySelector("#button2").innerHTML = (button2Text);
  // cloneCard.querySelector("#button2").href = (button2Link);
  // cloneCard.querySelector("#button3").innerHTML = (button3Text);
  // cloneCard.querySelector("#button3").onclick = function (){goBack();};
  cards.appendChild(cloneCard);
}

function cardData(dataData, aid){
  singleIterationCheck = 0;
      for (let dataRecord of dataData){
      if (dataRecord.album.artist.id == aid){
        let newid = dataRecord.album.id;
        for (value in dataRecord){
          if (singleIterationCheck != 0){

          } else {
            console.log(dataRecord.album.artist.name);
            let id = newid;
            let image = dataRecord.album.cover;
            let title = dataRecord.album.artist.name;
            let buttonText = "Back";
            createCard(id, image, title, buttonText);
            singleIterationCheck++;
          }
        }
      }
    }
  }


  function createTableHead(table){
    let thead = table.createTHead();
    let row = thead.insertRow();

    let title = document.createElement("th");
    let titleText = document.createTextNode("TITLE");
    title.appendChild(titleText);
    row.appendChild(title);

    let album = document.createElement("th");
    let albumText = document.createTextNode("ALBUM");
    album.appendChild(albumText);
    row.appendChild(album);

    let duration = document.createElement("th");
    let durationText = document.createTextNode("DURATION");
    duration.appendChild(durationText);
    row.appendChild(duration);

    let lyrics = document.createElement("th");
    let lyricsText = document.createTextNode("LYRICS");
    lyrics.appendChild(lyricsText);
    row.appendChild(lyrics);

    let viewalbum = document.createElement("th");
    let viewalbumText = document.createTextNode("VIEW ALBUM");
    viewalbum.appendChild(viewalbumText);
    row.appendChild(viewalbum);

    let add = document.createElement("th");
    let addText = document.createTextNode("ADD");
    add.appendChild(addText);
    row.appendChild(add);

}

function createTableBody(table,dataData, aid){
  for (let dataRecord of dataData){
    if(dataRecord.album.artist.id == aid){
      let newid = dataRecord.album.id;   
      let row = table.insertRow();
      for (value in dataRecord){
          if (value == 'id'){

          } else if (value == 'playlist'){

          } else if(value == 'lyrics'){
            let cell1 = row.insertCell();
            let text1 = document.createElement("a");
            text1.className = "btn btn-primary";
            text1.innerHTML= "View";
            text1.onclick = myfunc;
            cell1.appendChild(text1);
            function myfunc(){
              let ans = dataRecord[value];
              alert(ans);
            }
          }else if (value == 'duration'){
            let mins = Math.floor((dataRecord.duration)/60);
            let secs = (dataRecord.duration % 60);
            let duration = (mins + " m " + secs + " s");
            let cell3 = row.insertCell();
            let durationtext = document.createTextNode(duration);
            cell3.appendChild(durationtext);
        }
          else {
        let cell = row.insertCell();
        let text = document.createTextNode(dataRecord[value]);
        if (typeof dataRecord[value] === 'object'){
          for (object in dataRecord[value]){
              if (object == 'name'){
                  let albumText = document.createTextNode(dataRecord.album.name);
                cell.appendChild(albumText);
              }
          }
        } else{
          cell.appendChild(text);
          
        }
        
      }
      
      }
      let cell3 = row.insertCell();
      let text3 = document.createElement("a");
      text3.className = "btn btn-primary";
      text3.innerHTML = "View";
      text3.href = "albumview.html?id=" + newid;
      cell3.appendChild(text3);

      let editCell = row.insertCell();
      let editButton = document.createElement("a");
      editButton.className="btn btn-primary";
      // editButton.href="userRecord.html?id="+dataRecord.id;
      editButton.innerHTML="Add";
      editCell.appendChild(editButton);

            }
}}

function goBack() {
  window.history.back();
}
