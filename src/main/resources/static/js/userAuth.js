let userAuth =document.cookie;
console.log(userAuth)
if(userAuth != null || userAuth != undefined){
    console.log("Session started")
}else{
    console.log("Session timed out")
    window.location.href= "index.html"
}
