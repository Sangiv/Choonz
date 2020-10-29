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

    let cell2 = row.insertCell();
    let text2 = document.createTextNode("Track Name");
    cell2.appendChild(text2);

    let cell5 = row.insertCell();
    let text5 = document.createTextNode("Album Name");
    cell5.appendChild(text5);

    let cell3 = row.insertCell();
    let text3 = document.createTextNode("Duration");
    cell3.appendChild(text3);

    let cell4 = row.insertCell();
    let text4 = document.createTextNode("Lyrics");
    cell4.appendChild(text4);

    let cell6 = row.insertCell();
    let text6 = document.createTextNode("View Album");
    cell6.appendChild(text6);

    let cell1 = row.insertCell();
    let text1 = document.createTextNode("Add");
    cell1.appendChild(text1);

}

// function createTableBody(table,dataData,aid){
//     for (let dataRecord in dataData){
//         if(dataRecord == 'albums'){
//             let arr = dataData.albums;
            
            
//             for(let i = 0; i < arr.length; i++){
//                 let obj = arr[i];
//                 console.log(obj);
//                 console.log("hello")
                
        
//                 for(let prop in obj){
//                     if(prop == 'tracks'){
//                         let arr1 = obj.tracks;
                        
//                         for(let i = 0; i < arr1.length; i++){
//                           let obj1 = arr1[i];
//                           let row = table.insertRow();

//                           for(let prop1 in obj1){
//                             if(prop1 == 'id'){
                              

//                             }else{
//                               let cell = row.insertCell();
//                               let text = document.createTextNode(obj1[prop1]);
//                               cell.appendChild(text);

//                             }
//                           }



//                         }

                        
                        

                   
                  
                  
//                 }}
                
//               }
              
//         }
        

        

//     }
    
// }

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
