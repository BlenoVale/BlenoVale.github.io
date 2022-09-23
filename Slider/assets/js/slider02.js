const controls = document.querySelectorAll('.controls');
const itens = document.querySelectorAll('.slider02-item');
const maxItem = itens.length;
let currentItem = 0;
let isLeft = false;

controls.forEach((control) => {
    control.addEventListener('click', (e) => {
        window.scrollTo(0, document.body.scrollHeight);
        
        isLeft = e.target.classList.contains('btn-left');
        console.log(isLeft);
        console.log(currentItem);

        if (isLeft) {
            currentItem += 1;
        } else {
            currentItem -= 1;
        }

        if (currentItem >= maxItem) {
            currentItem = 0;
        }

        if (currentItem < 0) {
            currentItem = maxItem - 1;
        }

        itens[currentItem].scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: 'center'
        });
    });
});
