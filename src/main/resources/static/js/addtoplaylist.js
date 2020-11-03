let user_id = get_cookie_value("user_id");
getUserPlaylists(user_id)


function get_cookie_value(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}





function getUserPlaylists(user_id){
fetch('http://localhost:8082/users/read/' + user_id)
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
        let data = Object.keys(dataData);
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

function createTableHead(table, data){
    let tableHead = table.createTHead();
    let row = tableHead.insertRow();
  
    for(let keys of data){
        console.log(keys);
      if(keys == "playList"){
        // let arr = dataData[keys];
        // for(obj in arr){
        //     console.log(obj[0].name);
        // }
        // console.log(arr)
        let id = document.createElement("th");
        let idText = document.createTextNode("Playlist");
        id.appendChild(idText);
        row.appendChild(id);

        let id1 = document.createElement("th");
        let idText1 = document.createTextNode("Add");
        id1.appendChild(idText1);
        row.appendChild(id1);
           
  
      }}
  
  
  }


  function createTableBody(table, dataData){
    for(let key in dataData){
        
      if(key == "playList"){
        let arr = dataData[key];
        for(let i = 0; i < arr.length; i++){
          let obj = arr[i];
          
          let row = table.insertRow();
  
          for(let prop in obj){
            if (prop == 'description' || prop == 'artwork' || prop == 'users' || prop == 'tracks' || prop == 'id'){

            } 
           
            else {
            // console.log(prop);
            // console.log(obj[prop]);
            let cell = row.insertCell();
            let text = document.createTextNode(obj[prop]);
            cell.appendChild(text);
            
            let cell2 = row.insertCell();
            let a2 = document.createElement('a');
            a2.innerHTML = "Add";
            a2.className = "btn btn-primary";
            a2.onclick = myfunc;
            cell2.appendChild(a2);

            }

            
          }
        }
        }
    }
}

function myfunc(){
    const params = new URLSearchParams(window.location.search);

    for(let param of params){
        var id = param[1];
    }

    

    
}