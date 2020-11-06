const params = new URLSearchParams(window.location.search);

for(let param of params){
    let id = param[1];
    getSingleRecord(id);
}

function getSingleRecord(id){
fetch('http://localhost:8082/artists/read/'+ id)
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
        let data = Object.keys(dataData.albums[0]);
        console.log(data);
        console.log(dataData);

        createTableHead(table,data);
        createTableBody(table,dataData);
        cardData(dataData);


      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

function createCard(id, image, title, buttonText, buttonLink){
  //updates cloneCard with new information
  let cards = document.querySelector("div.showcards");
  let cloneCard = document.querySelector("div.card").cloneNode(true);
  cloneCard.id = ("card" + id);
  cloneCard.querySelector("img").src=(image);
  cloneCard.querySelector("#title").innerHTML = (title);
  cloneCard.querySelector("#button").innerHTML = (buttonText);
  cloneCard.querySelector("#button").onclick = function (){goBack();};
  cards.appendChild(cloneCard);
}

function cardData(dataData){
  singleIterationCheck = 0;
      for (value in dataData){
          if (typeof dataData[value] === 'object'){
            if (singleIterationCheck != 0){

            } else {
              let id = dataData.id;
              let image = dataData.albums[0].cover;
              let title = dataData.name;
              let buttonText = "Back";
              let buttonLink = "artist.html";
              createCard(id, image, title, buttonText, buttonLink);
              singleIterationCheck++;           
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
            
        } else if (keys == 'tracks') {

        } else if (keys == 'cover'){
        
        } else if(keys == "name"){
          let th = document.createElement("th");
          let text = document.createTextNode("NAME");
          th.appendChild(text);
          row.appendChild(th);
        
        } else if(keys == "artist"){
          let th = document.createElement("th");
          let text = document.createTextNode("ARTIST");
          th.appendChild(text);
          row.appendChild(th);

        }  else {
            let th = document.createElement("th");
            let text = document.createTextNode(keys);
            th.appendChild(text);
            row.appendChild(th);
        }


    }
    let editHead = document.createElement("th");
    let editButtonTitle = document.createTextNode("VIEW ALBUM");
    editHead.appendChild(editButtonTitle);
    row.appendChild(editHead);

}

function createTableBody(table,dataData){
    for (let dataRecord in dataData){
        if(dataRecord == 'albums'){
            let arr = dataData.albums;
            
            for(let i = 0; i < arr.length; i++){
                let obj = arr[i];
                let row = table.insertRow();
        
                for(let prop in obj){
                    if(prop == 'id' || prop == 'tracks' || prop == 'cover'){

                    } else if (prop == "artist"){
                      
                      let cell = row.insertCell();
                      let text = document.createTextNode(obj.artist.name);
                      cell.appendChild(text);

                    } else{
                  // console.log(prop);
                  // console.log(obj[prop]);
                  let cell = row.insertCell();
                  let text = document.createTextNode(obj[prop]);
                  cell.appendChild(text);
                  
                }}
                let viewCell = row.insertCell();
                let viewButton = document.createElement("a");
                viewButton.className="btn btn-primary";
                viewButton.href="albumview.html?id="+dataData.albums[i].id;
                viewButton.innerHTML="View";
                viewCell.appendChild(viewButton);
              }
        }      
    }
}

function goBack() {
  window.history.back();
}