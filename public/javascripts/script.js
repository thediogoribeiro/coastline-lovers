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
  var nav = document.getElementById('icon__effect');
  var viewport = document.getElementById('about');
  var x;
  //console.log(viewport.getBoundingClientRect().top)
  if (nav.className == "fas fa-bars fa-2x"){
    x = 88
  } else if (nav.className == "fas fa-bars fa-3x") {
    x = 100
  }

  if(viewport.getBoundingClientRect().top > x){
    //console.log('branco');
    nav.style.color = '#FFFFFF';
    nav.style.borderColor = '#FFFFFF'; 
  } else {
    //console.log('azul');
    nav.style.color = '#0E3356';
    nav.style.borderColor = '#0E3356';
  };
}

function mapChange(xpto) {
  var imagem = document.getElementById(xpto);
  var janela = document.documentElement.clientWidth;
  console.log(janela, imagem)
  if ( janela >= 768 && janela < 1280){
    imagem.src = "../assets/mapa_tablet_tablet-pt.jpg";
  } else if ( janela >= 1280){
    imagem.src = "../assets/mapa_website_website-pt.jpg";
  } else {
    imagem.src = "../assets/mapa_phone_phone-pt.jpg";
  }
}




