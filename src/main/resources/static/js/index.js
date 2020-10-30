fetch('http://localhost:8082/tracks/read')
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

        cardData(dataData);

      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

  function createCard(id, image, title, description, buttonText, buttonLink){
    //updates cloneCard with new information
    let cards = document.querySelector("#card-deck");
    let cloneCard = document.querySelector("#card2").cloneNode(true);
    cloneCard.id = ("card" + id);
    cloneCard.querySelector("img").src = (image);
    cloneCard.querySelector("#title").innerHTML = (title);
    cloneCard.querySelector("#text").innerHTML = (description);
    cloneCard.querySelector("#button").innerHTML = (buttonText);
    cloneCard.querySelector("#button").href = (buttonLink);
    cards.appendChild(cloneCard);
  }

  function cardData(dataData){
    mostRecent = dataData.length-4;
    cardCount = 0;
    for (let dataRecord of dataData){
        singleIterationCheck = 0;
        if (cardCount < 4){
            for (value in dataRecord){

                if (typeof dataRecord[value] === 'object'){
                    if (dataRecord[value].id > mostRecent){
                        if (singleIterationCheck != 0){
    
                        } else {
                          let id = dataRecord.id;
                          let image = dataRecord.album.cover;
                          let title = dataRecord.name;
                          let description = dataRecord.album.artist.name;
                          let buttonText = "View";
                          let buttonLink = "trackview.html?id="+id;
                          createCard(id, image, title, description, buttonText, buttonLink);
                          singleIterationCheck++;
                          cardCount++;
                        }
                    } 
                }
    
            }
        }

    }
  }

