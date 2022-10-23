let currentLevel = 'lvl1';

//Events
document.querySelectorAll('.drag-item').forEach(dragItem => {
    dragItem.addEventListener('dragstart', dragStart);
    dragItem.addEventListener('dragend', dragEnd);
});

document.querySelectorAll('.drop-item').forEach(dropItem => {
    dropItem.addEventListener('dragover', dragOver);
    dropItem.addEventListener('dragleave', dragLeave);
    dropItem.addEventListener('drop', drop);
});

document.querySelectorAll('.drag-itens').forEach(dragElement => {
    dragElement.addEventListener('dragover', dragOverNeutral);
    dragElement.addEventListener('drop', dropNeutral);
});


//Functions Drag-Item
function dragStart(e) {
    e.currentTarget.classList.add('dragging');
}

function dragEnd(e) {
    e.currentTarget.classList.remove('dragging');
}

//Functions Drop-item
function dragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('hover');
}

function dragLeave(e) {
    e.currentTarget.classList.remove('hover');
}

function drop(e) {
    e.currentTarget.classList.remove('hover');

    let dragItem = document.querySelector('.drag-item.dragging');
    let dragItemColor = dragItem.getAttribute('data-original-color');

    let dragItemName = dragItem.getAttribute('data-name');
    let dropItemName = e.currentTarget.getAttribute('data-name');

    if (dragItemName === dropItemName) {
        dragItem.classList.remove('fa-4x');
        dragItem.classList.add('fa-3x');
        dragItem.style.color = '#ffffff';

        e.currentTarget.classList.add('hit');
        e.currentTarget.innerHTML = '';
        e.currentTarget.appendChild(dragItem);
        e.currentTarget.style.backgroundColor = dragItemColor;
    }

    checkEndLevel();

    /*
    if(e.currentTarget.querySelector('.drag-item') === null){
        e.currentTarget.innerHTML = '';
        e.currentTarget.appendChild(dragItem);
        e.currentTarget.style.backgroundColor = dragItemColor;
        dragItem.style.color = '#ffffff';
    }*/
}

//Functions Neutral Área
function dragOverNeutral(e) {
    e.preventDefault();
}


function dropNeutral(e) {
    let dragItem = document.querySelector('.drag-item.dragging');
    let dragName = dragItem.getAttribute('data-name');
    let dragItemColor = dragItem.getAttribute('data-original-color');
    dragItem.classList.remove('fa-3x');
    dragItem.classList.add('fa-4x');
    dragItem.style.color = dragItemColor;
    e.currentTarget.appendChild(dragItem);

    clearDropItem(dragName, currentLevel);
}

function clearDropItem(dragName, level) {
    let dropItem = document.querySelector(`#${level} .drop-content [data-name="${dragName}"]`);
    let dropItemName = dropItem.getAttribute('data-name');
    dropItem.innerHTML = dropItemName;
    dropItem.style.backgroundColor = '#fff';
    dropItem.classList.remove('hit');
}

function checkEndLevel() {
    let countHit = 0;

    let dropItens = document.querySelectorAll(`#${currentLevel} .drop-content .drop-item`);
    for (let i = 0; i < dropItens.length; i++) {
        if (dropItens[i].classList.contains('hit')) {
            countHit++;
        }
    }
    if (countHit === dropItens.length) {
        moveSlider(currentLevel);

        switch (currentLevel) {
            case 'lvl1':
                currentLevel = 'lvl2';
                break;
            case 'lvl2':
                currentLevel = 'lvl3';
                break;
            case 'lvl3':
                currentLevel = 'endGame';
                break;
        }
    }
}