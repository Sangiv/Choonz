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

    let cell2 = row.insertCell();
    let text2 = document.createTextNode("Track Name");
    cell2.appendChild(text2);

    let cell3 = row.insertCell();
    let text3 = document.createTextNode("Duration");
    cell3.appendChild(text3);

    let cell4 = row.insertCell();
    let text4 = document.createTextNode("Lyrics");
    cell4.appendChild(text4);

}

function createTableBody(table,dataData){
    for (let dataRecord in dataData){
        if(dataRecord == 'albums'){
            let arr = dataData.albums;
            
            
            for(let i = 0; i < arr.length; i++){
                let obj = arr[i];
                console.log(obj);
                console.log("hello")
                
        
                for(let prop in obj){
                    if(prop == 'tracks'){
                        let arr1 = obj.tracks;
                        
                        for(let i = 0; i < arr1.length; i++){
                          let obj1 = arr1[i];
                          let row = table.insertRow();

                          for(let prop1 in obj1){
                            if(prop1 == 'id'){
                              

                            }else{
                              let cell = row.insertCell();
                              let text = document.createTextNode(obj1[prop1]);
                              cell.appendChild(text);

                            }
                          }



                        }

                        
                        

                   
                  
                  
                }}
                
              }
              
        }
        

        

    }
    
}