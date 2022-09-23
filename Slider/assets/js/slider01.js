let totalSlides = document.querySelectorAll('.slider-item').length;
let heithSlider = document.querySelector('.slider').clientHeight;
let currentSlide = 0;

document.querySelector('.slider-width').style.width = `calc(100vw * ${totalSlides})`;

document.querySelector('.slider-controls').style.height = `${heithSlider}px`;
document.querySelector('.skin').style.height = `${heithSlider}px`;

document.querySelector('.prev').addEventListener('click', goPrev);
document.querySelector('.next').addEventListener('click', goNext);
window.addEventListener('resize', updateSkin);

function goPrev() {
    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }

    updateMargin();
    console.log("teste");
}

function goNext() {
    currentSlide++;
    if (currentSlide > (totalSlides - 1)) {
        currentSlide = 0;
    }
    updateMargin();
}

function updateMargin() {
    let sliderWidthItem = document.querySelector('.slider-item ').clientWidth;
    let newWidth = (currentSlide * sliderWidthItem);
    let bkgSkin = document.querySelector('.skin');

    document.querySelector('.slider-width').style.marginLeft = `-${newWidth}px`;
}

function updateSkin() {
    heithSlider = document.querySelector('.slider').clientHeight;
    document.querySelector('.skin').style.height = `${heithSlider}px`;
    console.log('teste')
}

setInterval(goNext, 5000);