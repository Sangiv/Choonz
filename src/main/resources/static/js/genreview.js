const params = new URLSearchParams(window.location.search);

for (let param of params){
    let id = param[1];
    getGenreView(id);
}


function getGenreView(id){
    fetch('http://localhost:8082/genres/read/'+id)
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


  function createCard(id, image, title, description, buttonText, buttonLink){
    //updates cloneCard with new information
    let cards = document.querySelector("div.showcards");
    let cloneCard = document.querySelector("div.card").cloneNode(true);
    cloneCard.id = ("card" + id);
    cloneCard.querySelector("img").src=(image);
    cloneCard.querySelector("#title").innerHTML = (title);
    cloneCard.querySelector("#text").innerHTML = (description);
    cloneCard.querySelector("#button").innerHTML = (buttonText);
    cloneCard.querySelector("#button").onclick = function (){goBack();};
    cards.appendChild(cloneCard);
  }

  function cardData(dataData){

        for (value in dataData){

            if (typeof dataData[value] === 'object'){
                let id = dataData.id;
                let image = "img/" + dataData.name + ".png";
                let title = dataData.name;
                let description = dataData.description;
                let buttonText = "Back";
                let buttonLink = "genre.html";
                createCard(id, image, title, description, buttonText, buttonLink);

            }
    }
  }


  function createTableBody(table,dataData){
    for (let dataRecord in dataData){
        if(dataRecord == 'albums'){
            let arr = dataData.albums;
            
            for(let i = 0; i < arr.length; i++){
                let obj = arr[i];
                console.log(obj);
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

      function createTableHead(table, dataData){
        let tableHead = table.createTHead();
        let row = tableHead.insertRow();
      
        for(let keys in dataData){
          if(keys == "albums"){
            // let arr = dataData[keys];
            // for(obj in arr){
            //     console.log(obj[0].name);
            // }
            // console.log(arr)
            

            let cell2 = row.insertCell();
            let text2 = document.createTextNode("Album Name");
            cell2.appendChild(text2);

            

            let cell4 = row.insertCell();
            let text4 = document.createTextNode("Artist");
            cell4.appendChild(text4);

            let cell5 = row.insertCell();
            let text5 = document.createTextNode("View Album");
            cell5.appendChild(text5);

            


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