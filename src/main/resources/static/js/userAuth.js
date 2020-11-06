let userAuth =document.cookie;
// let userPass = document.cookie;
 console.log(userAuth)
var userBtn = document.getElementById("userLoggedInBtn");
var guestBtn = document.getElementById("guestLoggedInBtn");

//if user logged in then change hidden button
if(userAuth != ""){
    if(window.getComputedStyle(guestBtn).display === "none"){
        console.log("Inner Session started")
        guestBtn.style.display = "none";
        userBtn.style.display = "block";
    }
}
else{
    console.log("Session timed out")
    if(window.getComputedStyle(userBtn).display==="none"){
        guestBtn.style.display = "block";
        userBtn.style.display = "none";
    }
   
}