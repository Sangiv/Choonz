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

        if (keys == 'id'){
            
        } else if (keys == 'playlist') {

        } else {
            let th = document.createElement("th");
            let text = document.createTextNode(keys);
            th.appendChild(text);
            row.appendChild(th);
        }


    }
    let editHead = document.createElement("th");
    let editButtonTitle = document.createTextNode("Add");
    editHead.appendChild(editButtonTitle);
    row.appendChild(editHead);

}

function createTableBody(table,dataData){
    for (let dataRecord of dataData){

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
        let editCell = row.insertCell();
        let editButton = document.createElement("a");
        editButton.className="btn btn-primary";
        // editButton.href="userRecord.html?id="+dataRecord.id;
        editButton.innerHTML="Add";
        editCell.appendChild(editButton);

              }
}

function addTrackToPlaylist(){
  
  
}
