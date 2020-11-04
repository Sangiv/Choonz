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
        cardData(dataData);
        carouselData();



      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

function search(){
  searchLink = "/track.html?search=" + document.getElementById('searchField').value;
  console.log("test");
  window.location.replace(searchLink);
}

  function createCard(id, image, title, description, buttonText, buttonLink, artistLink){
    //updates cloneCard with new information
    let cards = document.querySelector("#card-deck");
    let cloneCard = document.querySelector("#card2").cloneNode(true);
    cloneCard.id = ("card" + id);
    cloneCard.querySelector("img").src = (image);
    cloneCard.querySelector("#imagelink").href = (buttonLink);
    cloneCard.querySelector("#titlelink").innerHTML = (title);
    cloneCard.querySelector('#titlelink').href = (buttonLink);
    cloneCard.querySelector("#textlink").innerHTML = (description);
    cloneCard.querySelector('#textlink').href = (artistLink);
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
                    if (dataRecord.id > mostRecent){
                        if (singleIterationCheck != 0){
    
                        } else {
                          let id = dataRecord.id;
                          let image = dataRecord.album.cover;
                          let title = dataRecord.name;
                          let description = dataRecord.album.artist.name;
                          let buttonText = "View";
                          let buttonLink = "albumview.html?id="+dataRecord.album.id;
                          let artistLink = "artistalbums.html?id="+ dataRecord.album.artist.id;
                          createCard(id, image, title, description, buttonText, buttonLink, artistLink);
                          singleIterationCheck++;
                          cardCount++;
                        }
                    } 
                }
    
            }
        }

    }
  }

  function carouselData(){
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
        populateCarouselVariables(dataData);

      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
  }

  function populateCarouselVariables(dataData){
      mostRecent = dataData.length-6;
      carouselCount = 0;
      firstCarousel = 0;

      for (let dataRecord of dataData){
          singleIterationCheck = 0;
          if (carouselCount < 6){
              for (value in dataRecord){
                  if (typeof dataRecord[value] === 'object'){
                      if (dataRecord.id > mostRecent){
                          if (singleIterationCheck != 0){

                          } else {
                              let className;
                              if (firstCarousel == 0){
                                className = "carousel-item active";
                                firstCarousel++;
                              } else {
                                className = "carousel-item";
                              }
                              let id = dataRecord.id;
                              let image = dataRecord.cover;
                              let title = dataRecord.name;
                              let description = dataRecord.artist.name;
                              let albumLink = "albumview.html?id="+id;
                              let artistLink = "artistalbums.html?id="+dataRecord.artist.id;
                              createCarousel(id, image, title, description, albumLink, artistLink, className);
                              singleIterationCheck++;
                              carouselCount++;
                          }
                      }
                  }
              }
          }
      }
  }

  function createCarousel(id, image, title, description, albumLink, artistLink, className){
    let carousel = document.querySelector("#carousel-inner");
    let carouselItem = document.querySelector('#carousel-template').cloneNode(true);
    carouselItem.className = (className);
    carouselItem.id = ("carousel" + id);
    carouselItem.querySelector("img").src = (image);
    carouselItem.querySelector('#imagelink').href = (albumLink);
    carouselItem.querySelector('#albumlink').innerHTML = (title);
    carouselItem.querySelector('#albumlink').href = (albumLink);
    carouselItem.querySelector('#artistlink').innerHTML = (description);
    carouselItem.querySelector('#artistlink').href = (artistLink);
    carousel.appendChild(carouselItem);
  }