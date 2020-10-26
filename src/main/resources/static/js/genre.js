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
        let card = document.querySelector("card");

        createCard(card,data);
        createCardBody(card,dataData);

      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);



  });


