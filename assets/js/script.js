let header = document.querySelector('header')
document.addEventListener('scroll',()=>{
    if(window.scrollY > 30)
    {
        header.classList.add('active-header') ;
    }
    else{
        header.classList.remove('active-header')
    }

})

const nav = document.querySelector(".nav");
const li = document.querySelectorAll("li");
const hamburger= document.querySelector(".hamburger");
const closeIcon= document.querySelector(".closeIcon");
const menuIcon = document.querySelector(".menuIcon");

function toggleMenu() {
  if (nav.classList.contains("showMenu")) {
    nav.classList.remove("showMenu");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
  } else {
    nav.classList.add("showMenu");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
  }
}

hamburger.addEventListener("click", toggleMenu);