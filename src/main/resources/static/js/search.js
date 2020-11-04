function search(){
    searchLink = "/track.html?search=" + document.getElementById('searchField').value;
    console.log("test");
    window.location.replace(searchLink);
  }