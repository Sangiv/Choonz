let user_id = get_cookie_value("user_id");
var isMyCookie = document.cookie;

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

const params = new URLSearchParams(window.location.search);

for (let param of params) {
  let urlinput = param[1];
  console.log(urlinput);
  if (urlinput != null){
    var millisecondsToWait = 500;
    setTimeout(function() {
    document.getElementById('searchField').value = urlinput;
    myFunction();
    }, millisecondsToWait);
  }
}

  function createTableHead(table,data){
    let thead = table.createTHead();
    let row = thead.insertRow();

    for (let keys of data){

        if (keys == 'id'){
        
        } else if(keys == "name"){
          let th = document.createElement("th");
          let text = document.createTextNode("TITLE");
          th.appendChild(text);
          row.appendChild(th);
            
        } else if (keys == 'playlist') {

        } else if(keys == "album"){
            let th = document.createElement("th");
            let text = document.createTextNode("ALBUM");
            th.appendChild(text);
            row.appendChild(th);

            let th1 = document.createElement("th");
            let text1 = document.createTextNode("ARTIST");
            th1.appendChild(text1);
            row.appendChild(th1);


        } else if(keys == "duration"){
          let th = document.createElement("th");
          let text = document.createTextNode("DURATION");
          th.appendChild(text);
          row.appendChild(th);
        
        } else if(keys == "lyrics"){
          let th = document.createElement("th");
          let text = document.createTextNode("LYRICS");
          th.appendChild(text);
          row.appendChild(th);
      }
            


    }
    let album = document.createElement("th");
    let albumview = document.createTextNode("VIEW ALBUM");
    album.appendChild(albumview);
    row.appendChild(album);

    let artist = document.createElement("th");
    let artistview = document.createTextNode("VIEW ARTIST");
    artist.appendChild(artistview);
    row.appendChild(artist);

    if (isMyCookie != ""){
      let editHead = document.createElement("th");
      let editButtonTitle = document.createTextNode("ADD");
      editHead.appendChild(editButtonTitle);
      row.appendChild(editHead);
    }


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
              
              
              
              // text1.onclick = function(){lyricsfunc(lyricsALL[i]);}
              text1.onclick = function(){lyricsfunc(dataRecord[value], text1);}
              cell1.appendChild(text1);

              
            } else if (value == 'duration'){
                let mins = Math.floor((dataRecord.duration)/60);
                let secs = (dataRecord.duration % 60);
                let duration = (mins + " m " + secs + " s");
                let cell3 = row.insertCell();
                let durationtext = document.createTextNode(duration);
                cell3.appendChild(durationtext);
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

        if (isMyCookie != ""){
          let editCell = row.insertCell();
          let editButton = document.createElement("a");
          editButton.className="btn btn-success";
          // editButton.href="userRecord.html?id="+dataRecord.id;
          editButton.innerHTML="Add";
          editButton.id = dataRecord.id;
          editButton.href = "addtoplaylist.html?id=" + dataRecord.id;
          // editButton.setAttribute('data-toggle', 'modal');
          // editButton.setAttribute('data-target', '#exampleModal');
          editCell.appendChild(editButton);
        }
    }     
}

function myFunction() {
  // Declare variables
  let input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchField");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  console.log(filter);

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    td1 = tr[i].getElementsByTagName("td")[1];
    td2 = tr[i].getElementsByTagName("td")[2];
    if (td || td1 || td2) {
      txtValue = td.textContent || td.innerText;
      txtvalue1 = td1.textContent || td1.innerText;
      txtvalue2 = td2.textContent || td2.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1 || txtvalue1.toUpperCase().indexOf(filter) > -1 || txtvalue2.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function add(user_id){
  fetch('http://localhost:8082/users/read/' + user_id)
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      console.log('Fetch Success')
      response.json().then(function(userdata) {
        for (let dataRecord in userdata){
          if(dataRecord == 'playList'){
              let arr = userdata.playList;
              
              for(let i = 0; i < arr.length; i++){
                console.log(userdata.playList[i]);
                  let pname = userdata.playList[i].name;
                  let pid = userdata.playList[i].id;
                  let user = document.getElementById("user");
                  let but = document.createElement("a");
                  but.className = "btn btn-success";
                  but.innerHTML = pid + ". " + pname;   
                  user.appendChild(but);
                  user.append(' ');
                  
              }}}
        
        


      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
  
}

function get_cookie_value(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function setid(){
  fetch('http://localhost:8082/tracks/read')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      console.log('Fetch Success')
      response.json().then(function(userdata) {
        let id = document.getElementById(2);
        console.log(id);
        console.log(id.attributes.id);

        
        


      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
  
}

function lyricsfunc(chicken, text1){
  text1.setAttribute('data-toggle', 'modal');
  text1.setAttribute('data-target', '#lyricModal');
  document.querySelector("#lyricText").innerHTML = chicken;

}