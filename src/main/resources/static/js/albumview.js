const params = new URLSearchParams(window.location.search);

for(let param of params){
    let id = param[1];
    getSingleRecord(id);
}

function getSingleRecord(id){
fetch('http://localhost:8082/albums/read/' + id)
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
      console.log('Fetch Success')
      response.json().then(function(dataData) {
        let table = document.querySelector("table");
        createTableHead(table,dataData);
        createTableBody(table,dataData);
        cardData(dataData);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

function createCard(id, image, title, buttonText, buttonLink, description, button2Text, button2Link){
  //updates cloneCard with new information
  let cards = document.querySelector("div.showcards");
  let cloneCard = document.querySelector("div.card").cloneNode(true);
  cloneCard.id = ("card" + id);
  cloneCard.querySelector("img").src=(image);
  cloneCard.querySelector("#title").innerHTML = (title);
  cloneCard.querySelector('#text').innerHTML = (description);
  cloneCard.querySelector("#button").innerHTML = (buttonText);
  cloneCard.querySelector("#button").href = (buttonLink);
  cloneCard.querySelector("#button2").innerHTML = (button2Text);
  cloneCard.querySelector("#button2").onclick = function (){goBack();};
  cards.appendChild(cloneCard);
}

function cardData(dataData){
  singleIterationCheck = 0;
      for (value in dataData){
          if (typeof dataData[value] === 'object'){
            if (singleIterationCheck != 0){

            } else {
              let id = dataData.id;
              let image = dataData.cover;
              let title = dataData.name;
              let description = dataData.artist.name;
              let buttonText = "View Artist";
              let buttonLink = "artistalbums.html?id=" + dataData.artist.id;
              let button2Text = "Back";
              let button2Link = "";
              createCard(id, image, title, buttonText, buttonLink, description, button2Text, button2Link);
              singleIterationCheck++;           
            }
        }
      }
}

function createTableBody(table, dataData){
    for(let key in dataData){
      if(key == "tracks"){
        let arr = dataData[key];
        for(let i = 0; i < arr.length; i++){
          let obj = arr[i];
          let row = table.insertRow();
          for(let prop in obj){
            if (prop == 'album'){

            } 
            else if(prop == 'lyrics'){
              let cell1 = row.insertCell();
              let text1 = document.createElement("a");
              text1.className = "btn btn-primary";
              text1.innerHTML= "View";
              text1.onclick = myfunc;
              cell1.appendChild(text1);
              function myfunc(){
              let ans = obj[prop];
              alert(ans);
            }} 
            else if(prop == 'id'){

            }
            else if (prop == 'duration'){
                let mins = Math.floor((obj.duration)/60);
                let secs = (obj.duration % 60);
                let duration = (mins + " m " + secs + " s");
                let cell3 = row.insertCell();
                let durationtext = document.createTextNode(duration);
                cell3.appendChild(durationtext);
            }
            else {
            let cell = row.insertCell();
            let text = document.createTextNode(obj[prop]);
            cell.appendChild(text);
            }
          }
        }
        }
    }
}

      function createTableHead(table, dataData){
        let tableHead = table.createTHead();
        let row = tableHead.insertRow();
      
        for(let keys in dataData){
          if(keys == "tracks"){
            // let arr = dataData[keys];
            // for(obj in arr){
            //     console.log(obj[0].name);
            // }
            // console.log(arr)
            

            let title = document.createElement("th");
            let titleText = document.createTextNode("TITLE");
            title.appendChild(titleText);
            row.appendChild(title);
        
            let duration = document.createElement("th");
            let durationText = document.createTextNode("DURATION");
            duration.appendChild(durationText);
            row.appendChild(duration);
        
            let lyrics = document.createElement("th");
            let lyricsText = document.createTextNode("LYRICS");
            lyrics.appendChild(lyricsText);
            row.appendChild(lyrics);


            // Leaving it like this until I find a good way to fix it
            
            // let arr = data[keys];
            // let obj = arr[1];
            // console.log(obj);
            // let cell = row.insertCell();
            // let text = document.createTextNode(data[keys]);
            // console.log(data[keys]);
            
          }}      
      }
function goBack() {
  window.history.back();
}
      