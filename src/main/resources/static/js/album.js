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

        createTableHead(table,data);
        createTableBody(table,dataData);


      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

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
                      console.log(object);
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
                console.log(object);
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