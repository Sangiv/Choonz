document.querySelector('button[id="log-out"]').addEventListener("click",function(stop){
    stop.preventDefault();
    deleteCookie();
  })
// updated variable;
var update_user_name,update_password
var user_id = document.cookie
  

  //patch user new data in the data
document.querySelector('button[id="update-user"]').addEventListener("click",function(stop){
    stop.preventDefault();
    update_user_name = document.getElementById("user_name").value;
    update_password = document.getElementById("password").value;
    $('#userProfileModal').modal('hide');
    updateUser(user_id, update_user_name, update_password);

    console.log("User details updated")

  })

  //delete a user account
  document.querySelector('button[id="delete-user"]').addEventListener("click",function(stop){
    stop.preventDefault();
    let userId = document.cookie;
    console.log(userId);
    deleteUser(userId);

  })

//get user data in the form
document.getElementById("my-profile").addEventListener('click',function(stop)
{ 
   if(user_id>0){
    fetch('http://localhost:8082/users/read/' + user_id)
    .then(
      function (response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
        // Examine the text in the response
        response.json().
          then(function (data) {
            if(data.length==0){
              return;
            }
            generateTable(data,user_id)
          });
      }
    )
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });
    
  }else{
    $('#createAccountModal').modal('show');
  }
})

function generateTable(data,userId){
  // for (let index = 0; index < data.length; index++) {
  //   if(userId== data[index].user_id){
  //     console.log(data[index].user_name);
  //     console.log(data[index].password);

  //     document.getElementById("user_name").value  = data[index].user_name;
  //     document.getElementById("password").value  = data[index].password;

  //   }   
  // }
  for (let key in data) {
    console.log(key) //get key 
    console.log(data[key]) //get value
    console.log(data[key].user_id) // return undefined
    if(key == "user_name"){
      document.getElementById("user_name").value  = data[key];
    }   
    if(key == "password"){
      document.getElementById("password").value  = data[key];
    }  
  }

}


function updateUser(userId, update_user_name,update_password){
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
    let dataToUpdate ={
          "user_name": update_user_name,
          "password": update_password
  }
  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: JSON.stringify(dataToUpdate),
    redirect: 'follow'
  };
  
  fetch("http://localhost:8082/users/update/"+userId, requestOptions)

  .then(function (data) {

      console.log('Request succeeded with JSON response', data);
      document.getElementById("show-msg").innerHTML="User details Updated";
      $('#messageModal').modal('show');
              
  })
  .catch(function (error) {
      console.log('Request failed', error);
      document.getElementById("show-msg").innerHTML="Failed to Update user";
      $('#messageModal').modal('show');
  });

}
function deleteUser(userId){
    console.log(userId);
    fetch("http://localhost:8082/users/delete/" + userId, {
        method: 'delete',
        headers: {
            "Content-type": "application/json"
        },
    })

        .then(function (data) {
            console.log('Request succeeded with JSON response', data);
           //Authenticate before delete it and send appropiate message
           deleteCookie();


        })
        .catch(function (error) {
            console.log('Request failed', error);
            document.getElementById("show-msg").innerHTML="No User found!";
        });

}

// TODO: implement for better 
function deleteCookie( name, path, domain ) {
  if( get_cookie( name ) ) {
    document.cookie = name + "=" +
      ((path) ? ";path="+path:"")+
      ((domain)?";domain="+domain:"") +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
      console.log("log out successfully");
      window.location.href= "index.html";
  }
}


function get_cookie(name){
    return document.cookie.split(';').some(c => {
        return c.trim().startsWith(name + '=');
    });
}


// function deleteCookie(){
//     document.cookie = "; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//     window.location.href= "index.html";
// }

