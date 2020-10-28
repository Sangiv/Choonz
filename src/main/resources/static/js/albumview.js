
const params = new URLSearchParams(window.location.search);

for(let param of params){
    let id = param[1];
    getSingleRecord(id);
}
function getSingleRecord(id){
fetch('http://localhost:8082/albums/read/' + id)
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
        // let data = Object.keys(dataData);
        // console.log(data);

        createTableHead(table,dataData);
        createTableBody(table,dataData);


      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

function createTableBody(table, dataData){
    for(let key in dataData){
        console.log(key);
      if(key == "tracks"){
    
        let arr = dataData[key];
        for(let i = 0; i < arr.length; i++){
          let obj = arr[i];
        //   console.log(obj);
          let row = table.insertRow();
  
          for(let prop in obj){
            // console.log(prop);
            // console.log(obj[prop]);
            let cell = row.insertCell();
            let text = document.createTextNode(obj[prop]);
            cell.appendChild(text);
            
          }
        }
        }
    }
}

      function createTableHead(table, dataData){
        let tableHead = table.createTHead();
        let row = tableHead.insertRow();
      
        for(let keys in dataData){
          if(keys == "tracks"){
            // let arr = dataData[keys];
            // for(obj in arr){
            //     console.log(obj[0].name);
            // }
            // console.log(arr)
            let cell = row.insertCell();
            let text = document.createTextNode("Id")
            cell.appendChild(text);

            let cell2 = row.insertCell();
            let text2 = document.createTextNode("Track Name");
            cell2.appendChild(text2);

            let cell3 = row.insertCell();
            let text3 = document.createTextNode("Duration");
            cell3.appendChild(text3);

            let cell4 = row.insertCell();
            let text4 = document.createTextNode("Lyrics");
            cell4.appendChild(text4);


            // Leaving it like this until I find a good way to fix it
            
            // let arr = data[keys];
            // let obj = arr[1];
            // console.log(obj);
            // let cell = row.insertCell();
            // let text = document.createTextNode(data[keys]);
            // console.log(data[keys]);
            
              

      
          }}
      
      
      }