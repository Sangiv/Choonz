//create new user
document.querySelector("form.create-user").addEventListener("submit", function(stop){
    stop.preventDefault();
    let formElement  = document.querySelector("form.create-user").elements;
    
    let first_name = formElement["first_name"].value;
    let surname = formElement["surname"].value;
    let user_name = formElement["user_name"].value;
    let email = formElement["email"].value
    let password = formElement["password"].value;
    newUser(first_name, surname,user_name,email,password);
    let msg = document.getElementById("success-create");
    msg.innerHTML="New user created Successfully!"
  })

  //log in user
  document.querySelector("form.log-in").addEventListener("submit", function(stop){
    stop.preventDefault();
    let formElement  = document.querySelector("form.log-in").elements;
    
    let userId = formElement["userId"].value;
    let password = formElement["password"].value;
    userLogIn(userId,password);
  })


//   update user
// document.querySelector('button[id="#updateTask"]').addEventListener("click",function(stop){
//     stop.preventDefault();
//     console.log("Update vlaue")

// })
 
function newUser(first_name,surname,user_name,email,password){

    let dataToPost ={
        
            "first_name": first_name,
            "surname": surname,
            "user_name": user_name,
            "email": email,
            "password": password
    }
    fetch( "http://localhost:3000/api/users", 
    {
    method: 'post',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(dataToPost)
    })
    .then(function (data) {
        console.log('Request succeeded with JSON response', data);
    })
    .catch(function (error) {
        console.log('Request failed', error);
    });
}
function userLogIn(userId, password){
    fetch('http://localhost:3000/api/users/'+userId)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
        // Examine the text in the response
        response.json().then(function(data1) {
          if(data1.length==0){
            document.getElementById("login-msg").innerHTML= "No user found"
            return
          }
          var name;
          for (let element of data1) {
              for (key in element) {
                if(key == 'first_name'){
                  name= element[key];
                  console.log(name);
                }
                if(key=='password'){
                      if(password==element[key]){
                        console.log("Successful log in");
                        document.cookie = userId;  
                        console.log(name)
                          var successBtn= document.getElementById("my-profile");
                          successBtn.className = "btn btn-success";
                          successBtn.innerHTML=name;
                        //window.location.href = 'todo.html';
                        document.getElementById("login-msg").innerHTML= "Login Successfully!"
                        return;
                      }else{                        
                          console.log("Error log in")
                          document.getElementById("login-msg").innerHTML= "Login FAILED!"
                          return;
                      }
                  }
              }
          }
        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
  }

