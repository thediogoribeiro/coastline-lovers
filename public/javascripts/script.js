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

function linkWithTour(tour){
  window.open("/views/booking#"+gLang+"#"+tour,'_self');
}

// Hamburger color change
window.onscroll = function () {
  const nav = document.getElementById('icon__effect');
  const about = document.getElementById('about');
  if(about.getBoundingClientRect().top>=90){
    nav.style.color = '#FFFFFF';
    nav.style.borderColor = '#FFFFFF'; 
  }else{
    nav.style.color = '#0E3356';
    nav.style.borderColor = '#0E3356';
  }
}

