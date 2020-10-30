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

        } else if(keys == "album"){
            let th = document.createElement("th");
            let text = document.createTextNode(keys);
            th.appendChild(text);
            row.appendChild(th);

            let th1 = document.createElement("th");
            let text1 = document.createTextNode("Artist");
            th1.appendChild(text1);
            row.appendChild(th1);


        }else {
            

            let th = document.createElement("th");
            let text = document.createTextNode(keys);
            th.appendChild(text);
            row.appendChild(th);
        }
            


    }
    let album = document.createElement("th");
    let albumview = document.createTextNode("View Album");
    album.appendChild(albumview);
    row.appendChild(album);

    let artist = document.createElement("th");
    let artistview = document.createTextNode("View Artist");
    artist.appendChild(artistview);
    row.appendChild(artist);

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
                else if(object == 'id'){
                  var albumid = dataRecord.album.id;
                  console.log(albumid);
                }
                else if(object == 'artist'){
                  var artistid = dataRecord.album.artist.id;
                  let cell2 = row.insertCell();
                  // let box = document.createElement("a");
                  let artisttext = document.createTextNode(dataRecord.album.artist.name);
                  // box.href = "artistalbums.html?id=" + artistid;
                  // box.appendChild(artisttext);
                  cell2.appendChild(artisttext);
                  
                }
            }
          } else{
            cell.appendChild(text);
          }
        }
        }
        let albumcell = row.insertCell();
        let albumbutton = document.createElement("a");
        albumbutton.href = "albumview.html?id=" + albumid;
        albumbutton.className = "btn btn-info";
        albumbutton.innerHTML = "View";
        albumcell.appendChild(albumbutton);

        let artistcell = row.insertCell();
        let artistbutton = document.createElement("a");
        artistbutton.href = "artistalbums.html?id=" + artistid;
        artistbutton.className = "btn btn-info";
        artistbutton.innerHTML = "View";
        artistcell.appendChild(artistbutton);

        let editCell = row.insertCell();
        let editButton = document.createElement("a");
        editButton.className="btn btn-success";
        // editButton.href="userRecord.html?id="+dataRecord.id;
        editButton.innerHTML="Add";
        editCell.appendChild(editButton);

              }
}

function myFunction() {
  // Declare variables
  let input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}



