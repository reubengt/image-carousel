//This carousel works by laying out all the images in a flexbox container and placing the flexbox itself inside another div. The outer div essentially acts as a frame for the current image, and i've used overflow: hidden to make sure that only one image is visible at a time. The sliding is achieved by translating the entire flexbox.
const carouselFlex = 
document.querySelector('.carousel-flex');
const images=document.querySelectorAll('.carousel-flex img');
//buttons
const prevBtn=document.querySelector('#prevBtn');
const nextBtn=document.querySelector('#nextBtn');
const stateBtn=document.querySelector('#stateBtn');
//counter for current image
let count=1;
//toggle for play/pause state
var toggle='off';
//interval for autoplay
var interval=0;
const size=images[0].clientWidth;
//setting start position for the flexbox
carouselFlex.style.transform = 'translateX(' + (-size * count) + 'px)';
//function for going forward
function next(event){
    if(toggle=='on'){
        return;
    }
    if(count>=images.length - 1) {
        return;
    }
    carouselFlex.style.transition='transform 0.5s ease-in-out';
    count++;
    carouselFlex.style.transform = 'translateX(' + (-size * count) + 'px)';
}
//function for autoplay functionality
function playright(){
     if(count>=images.length - 1){
     return;
     }
    carouselFlex.style.transition='transform 0.5s ease-in-out';
    count++;
    carouselFlex.style.transform = 'translateX(' + (-size * count) + 'px)';
}
//function for going back
function prev(event){
    if(toggle=='on'){
        return;
    }
     if(count<= 0) {
         return;
     }
    carouselFlex.style.transition='transform 0.5s ease-in-out';
    count--;
    carouselFlex.style.transform = 'translateX(' + (-size * count) + 'px)';
}
//function to change play state upon click
function play()
{
   if (toggle == 'off') {
    interval = setInterval(playright, 2000);
  } 
    else if (toggle == 'on') {
    clearInterval(interval);
    return;
  }
}
//function to toggle playstate variable between 'play' and 'pause'
function tog(){
    if (toggle=='off'){
            toggle = 'on';
            prevBtn.style.visibility = "hidden";
            nextBtn.style.visibility = "hidden";
            stateBtn.style.backgroundColor = "green";
    }
    else if (toggle=='on'){
           toggle = 'off';
           prevBtn.style.visibility = "visible";
            nextBtn.style.visibility = "visible";
            stateBtn.style.backgroundColor = "rgba(220, 220, 233, 0.8)";
    }
}
//function to carry out keyboard navigation
function keynav(event){
    if (event.keyCode==39)
        next();
    else if(event.keyCode==37)
        prev();
}
// to reset position when ends are reached
carouselFlex.addEventListener('transitionend', ()=>{
    if(images[count].id === 'lastClone'){
        carouselFlex.style.transition = 'none';
        count=images.length - 2;
        carouselFlex.style.transform = 'translateX(' + (-size * count) + 'px)';
    }
    if(images[count].id === 'firstClone'){
        carouselFlex.style.transition = 'none';
        count=images.length - count;
        carouselFlex.style.transform = 'translateX(' + (-size * count) + 'px)';
    }});
//adding click event listeners
nextBtn.addEventListener('click', next);
prevBtn.addEventListener('click', prev);
//adding event listeners for play pause button 
stateBtn.addEventListener('click', play);
stateBtn.addEventListener('click', tog);
//adding keydown event listeners
window.addEventListener('keydown', keynav);
