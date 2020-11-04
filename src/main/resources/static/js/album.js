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

        cardData(dataData);

      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

  function createCard(id, image, title, description, buttonText, buttonLink, artistLink){
    //updates cloneCard with new information
    let cards = document.querySelector("div.showcards");
    let cloneCard = document.querySelector("div.card").cloneNode(true);
    cloneCard.id = ("card" + id);
    cloneCard.querySelector("img").src=(image);
    cloneCard.querySelector("#imagelink").href=(buttonLink);
    cloneCard.querySelector("#titlelink").innerHTML = (title);
    cloneCard.querySelector("#titlelink").href = (buttonLink);
    cloneCard.querySelector("#textlink").innerHTML = (description);
    cloneCard.querySelector("#textlink").href = (artistLink);
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
                let artistLink = "artistalbums.html?id=" + dataRecord.artist.id;
                createCard(id, image, title, description, buttonText, buttonLink, artistLink);
                singleIterationCheck++;
              }
            }

        }
    }
  }

