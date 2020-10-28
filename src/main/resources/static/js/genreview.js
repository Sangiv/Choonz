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
    cloneCard.querySelector("h5").innerHTML = (title);
    cloneCard.querySelector("p").innerHTML = (description);
    cloneCard.querySelector("a").innerHTML = (buttonText);
    cloneCard.querySelector("a").href = (buttonLink)
    cards.appendChild(cloneCard);
  }

  function cardData(dataData){

        for (value in dataData){

            if (typeof dataData[value] === 'object'){
                let id = dataData.id;
                let image = "http://i.imgur.com/czM0qWd.png";
                let title = dataData.name;
                let description = dataData.description;
                let buttonText = "Back";
                let buttonLink = "genre.html";
                createCard(id, image, title, description, buttonText, buttonLink);

            }
    }
  }


  function createTableBody(table, dataData){
    for(let key in dataData){
        console.log(key);
      if(key == "albums"){
        let arr = dataData[key];
        console.log(arr);
        for(let i = 0; i < arr.length; i++){
          let obj = arr[i];
        //   console.log(obj);
          let row = table.insertRow();
  
          for(let prop in obj){
            if(prop == 'tracks' || prop == 'id'){

            }else{
            // console.log(prop);
            // console.log(obj[prop]);
            let cell = row.insertCell();
            let text = document.createTextNode(obj[prop]);
            cell.appendChild(text);
            
          }}
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
            let text4 = document.createTextNode("cover");
            cell4.appendChild(text4);


            // Leaving it like this until I find a good way to fix it
            
            // let arr = data[keys];
            // let obj = arr[1];
            // console.log(obj);
            // let cell = row.insertCell();
            // let text = document.createTextNode(data[keys]);
            // console.log(data[keys]);
            
              

      
          }}
      
      
      }
