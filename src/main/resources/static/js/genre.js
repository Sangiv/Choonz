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
    cloneCard.querySelector('#imageLink').href = (buttonLink);
    cloneCard.querySelector("#titlelink").innerHTML = (title);
    cloneCard.querySelector("#titlelink").href = (buttonLink);
    cloneCard.querySelector("#text").innerHTML = (description);
    cloneCard.querySelector("#button").innerHTML = (buttonText);
    cloneCard.querySelector("#button").href = (buttonLink);
    cards.appendChild(cloneCard);
  }

  function cardData(dataData){

    for (let dataRecord of dataData){

        for (value in dataRecord){

            if (typeof dataRecord[value] === 'object'){
                let id = dataRecord.id;
                let image = "img/" + dataRecord.name + ".png";
                let title = dataRecord.name;
                let description = dataRecord.description;
                let buttonText = "View";
                let buttonLink = "genreview.html?id="+id;
                createCard(id, image, title, description, buttonText, buttonLink);

            }

        }
    }
  }

