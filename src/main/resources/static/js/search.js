function search(){
    searchLink = "/track.html?search=" + document.getElementById('searchField').value;
    window.location.href = searchLink;
    return false;
  }