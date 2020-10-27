fetch('http://localhost:8082/genres/read')
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

        let data = Object.keys(dataData[0]);
        let table = document.querySelector("table");
        let card = document.querySelector("div.card");

        createTableHead(table,data);
        createTableBody(table,dataData);

        // createCard(data);
        testCard(data);

      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);

  });

//   function createCard(dataData){
//     for (let dataRecord of dataData){
//         console.log(dataRecord);
//         for (value in dataRecord){
//             if (value == 'id'){
//                 log.info("namefound");
//             }
//         }
//     }
    
//     let genreCount = dataData.length;
//   }

  function testCard(data){

    // //selects existing card
    // let card = document.querySelector("div.card");
    // let cards = document.querySelector("div.cards");
    // //sets image
    // card.querySelector("img").src = ("https://i.imgur.com/KIX5Kpf.jpg")
   
    // //selects elements of it
    // let cardTitle = card.querySelector("h5").innerHTML = ("test");
    // let cardText = card.querySelector("p").innerHTML = ("test");
    // let cardButton = card.querySelector("a").innerHTML = ("test");

    //updates cloneCard with new information
    let cloneCard = document.querySelector("div.card").cloneNode(true);
    cloneCard.id = ("card2");
    cloneCard.querySelector("img").src=("http://i.imgur.com/czM0qWd.png");
    cloneCard.querySelector("h5").innerHTML = ("test2");
    cloneCard.querySelector("p").innerHTML = ("test2");
    cloneCard.querySelector("a").innerHTML = ("test2");

    console.log(cloneCard);
    cards.appendChild(cloneCard);

  }


  function createTableHead(table,data){
    let thead = table.createTHead();
    let row = thead.insertRow();

    for (let keys of data){

        if (keys == 'id'){
            
        } else if (keys == 'albums') {

        } else {
            let th = document.createElement("th");
            let text = document.createTextNode(keys);
            th.appendChild(text);
            row.appendChild(th);
        }


    }
    let editHead = document.createElement("th");
    let editButtonTitle = document.createTextNode("Edit");
    editHead.appendChild(editButtonTitle);
    row.appendChild(editHead);

}

function createTableBody(table,dataData){
    for (let dataRecord of dataData){

        let row = table.insertRow();
        for (value in dataRecord){
            if (value == 'id'){

            } else if (value == 'albums'){

            } else {
          let cell = row.insertCell();
          let text = document.createTextNode(dataRecord[value]);
          if (typeof dataRecord[value] === 'object'){
            for (object in dataRecord[value]){
                if (object == 'name'){
                    let albumText = document.createTextNode(dataRecord.genre.name);
                  cell.appendChild(albumText);
                }
            }
          } else{
            cell.appendChild(text);
          }
        }
        }
        let editCell = row.insertCell();
        let editButton = document.createElement("a");
        editButton.className="btn btn-primary";
        // editButton.href="userRecord.html?id="+dataRecord.id;
        editButton.innerHTML="Edit";
        editCell.appendChild(editButton);

              }
}

let cardDiv = document.getElementById('card');
console.log(cardDiv);

if (cardDiv.text() == ''){
    cardDiv.hide();
}

