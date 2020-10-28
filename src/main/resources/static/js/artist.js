fetch('http://localhost:8082/artists/read')
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
        console.log(Object.keys(dataData[0].albums[0]));

        let table = document.querySelector("table");
        let data = Object.keys(dataData[0]);
        console.log(data);

        createTableHead(table,data);
        createTableBody(table,dataData);
        cardData(dataData);


      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

  function createCard(id, image, title, description, buttonText, buttonLink){
    //updates cloneCard with new information
    let cards = document.querySelector("div.showcards");
    let cloneCard = document.querySelector("div.card").cloneNode(true);
    cloneCard.id = ("card" + id);
    cloneCard.querySelector("img").src=(image);
    cloneCard.querySelector("#title").innerHTML = (title);
    cloneCard.querySelector("#text").innerHTML = (description);
    cloneCard.querySelector("#button").innerHTML = (buttonText);
    cloneCard.querySelector("#button").href = (buttonLink);
    cloneCard.querySelector("#button2").innerHTML = ("test");
    cards.appendChild(cloneCard);
  }

  function cardData(dataData){

    for (let dataRecord of dataData){

        for (value in dataRecord){

            if (typeof dataRecord[value] === 'object'){
                let id = dataRecord.id;
                let image = "http://i.imgur.com/czM0qWd.png";
                let title = dataRecord.name;
                let description = dataRecord.description;
                let buttonText = dataRecord.name;
                let buttonLink = "genreview.html?id="+id;
                createCard(id, image, title, description, buttonText, buttonLink);

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