
//Events
document.querySelector('#newGame').addEventListener('click', () => {
    location.reload();
});

//Functions
function moveSlider(slider) {

    let totalWidth = document.querySelector('.levels-width');
    let sliderWidth = document.querySelector('.level-area').clientWidth;
    if (slider === 'lvl1') {
        totalWidth.style.marginLeft = `-${sliderWidth}px`;
    } else if (slider === 'lvl2') {
        totalWidth.style.marginLeft = `-${sliderWidth * 2}px`;
    } else if (slider === 'lvl3') {
        totalWidth.style.marginLeft = `-${sliderWidth * 3}px`;
    } else if (slider === 'endGame') {
        totalWidth.style.marginLeft = `0px`;
    }
}
