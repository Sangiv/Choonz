fetch('http://localhost:8082/albums/read')
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
        let data = Object.keys(dataData[0]);
        // console.log(data);
        

        // createTableHead(table,data);
        // createTableBody(table,dataData);
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
    cards.appendChild(cloneCard);
  }

  function cardData(dataData){

    for (let dataRecord of dataData){
        singleIterationCheck = 0;
        for (value in dataRecord){

            if (typeof dataRecord[value] === 'object'){
              if (singleIterationCheck != 0){

              } else {
                let id = dataRecord.id;
                let image = dataRecord.cover;
                let title = dataRecord.name;
                let description = dataRecord.artist.name;
                let buttonText = "View";
                let buttonLink = "albumview.html?id="+id;
                createCard(id, image, title, description, buttonText, buttonLink);
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
            
        } else if (keys == 'tracks') {

        } else {
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

        let row = table.insertRow();
        for (value in dataRecord){
            // console.log(value);
            if (value == 'id'){

            } 
            else if(value == 'tracks'){

            }
            else if(value == 'genre'){
                let cell = row.insertCell();
                // let text = document.createTextNode(dataRecord[value]);
                if (typeof dataRecord[value] === 'object'){
                  for (object in dataRecord[value]){
                      if (object == 'name'){
                          let albumText = document.createTextNode(dataRecord.genre.name);
                          cell.appendChild(albumText);
                      }
                  }
                } 

            }

            else {
                console.log(dataRecord[value]);
          let cell = row.insertCell();
          let text = document.createTextNode(dataRecord[value]);
          if (typeof dataRecord[value] === 'object'){
            for (object in dataRecord[value]){
                if (object == 'name'){
                    let albumText = document.createTextNode(dataRecord.artist.name);
                    cell.appendChild(albumText);
                }
            }
          } else{
            cell.appendChild(text);
          }
        }
        }
        let viewCell = row.insertCell();
        let viewButton = document.createElement("a");
        viewButton.className="btn btn-primary";
        viewButton.href="albumview.html?id="+dataRecord.id;
        viewButton.innerHTML="View";
        viewCell.appendChild(viewButton);

              }
}



// function myFunction() {
//   // Declare variables
//   let input, filter, table, tr, td, i, txtValue, id;
  
//   input = document.getElementById("myInput");
//   filter = input.value.toUpperCase();
//   card = document.getElementById("card1");
//   body = table.getElementsByTagName("body");
//   text 

//   // Loop through all table rows, and hide those who don't match the search query
//   for (i = 0; i < tr.length; i++) {
//     td = tr[i].getElementsByTagName("td")[0];
//     td1 = tr[i].getElementsByTagName("td")[1];
//     td2 = tr[i].getElementsByTagName("td")[2];
//     if (td || td1 || td2) {
//       txtValue = td.textContent || td.innerText;
//       txtvalue1 = td1.textContent || td1.innerText;
//       txtvalue2 = td2.textContent || td2.innerText;
//       if (txtValue.toUpperCase().indexOf(filter) > -1 || txtvalue1.toUpperCase().indexOf(filter) > -1 || txtvalue2.toUpperCase().indexOf(filter) > -1) {
//         tr[i].style.display = "";
//       } else {
//         tr[i].style.display = "none";
//       }
//     }
    
//   }
// }