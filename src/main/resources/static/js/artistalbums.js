const params = new URLSearchParams(window.location.search);

for(let param of params){
    let id = param[1];
    getSingleRecord(id);
}

function getSingleRecord(id){
fetch('http://localhost:8082/artists/read/'+ id)
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
        let data = Object.keys(dataData.albums[0]);
        console.log(data);

        createTableHead(table,data);
        createTableBody(table,dataData);


      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

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
    for (let dataRecord in dataData){
        if(dataRecord == 'albums'){
            let arr = dataData.albums;
            
            for(let i = 0; i < arr.length; i++){
                let obj = arr[i];
                console.log(obj);
                let row = table.insertRow();
        
                for(let prop in obj){
                    if(prop == 'id' || prop == 'tracks'){

                    }else{
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