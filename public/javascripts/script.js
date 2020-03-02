// MENU hamburger
function showBurger(clas) {
  var x = document.getElementById(clas);
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

function hamburgerChange(){
  var x = document.getElementById('icon__effect');
  if (document.documentElement.clientWidth >= 768){
    x.className = "fas fa-bars fa-3x"
  } else if (document.documentElement.clientWidth < 768){
    x.className = "fas fa-bars fa-2x"
  };
}

// BOOKING pre selected
function openBooking(txt) {
  console.log(txt)
  document.getElementsById(txt).checked = true;

}

// Hamburger color change
window.onscroll = function () {
  //console.log(this.scrollY);
  const nav = document.getElementById('icon__effect');
  if(this.scrollY <= 800){
    //console.log('branco');
    nav.style.color = '#FFFFFF';
    nav.style.borderColor = '#FFFFFF'; 
  }else{
    //console.log('azul');
    nav.style.color = '#0E3356';
    nav.style.borderColor = '#0E3356';
  }
}

