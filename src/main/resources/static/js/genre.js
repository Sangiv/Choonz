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
    cloneCard.querySelector("h5").innerHTML = (title);
    cloneCard.querySelector("p").innerHTML = (description);
    cloneCard.querySelector("a").innerHTML = (buttonText);
    cloneCard.querySelector("a").href = (buttonLink)
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
                let buttonLink = "http://i.imgur.com/czM0qWd.png";
                createCard(id, image, title, description, buttonText, buttonLink);

            }

        }
    }
  }

