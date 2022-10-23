//Initialization
let node = '';

//Drag & Drop 
listenerDragItens();

document.querySelectorAll('.tierList-drop-Area').forEach(dropItem => {
    dropItem.addEventListener('dragover', dragOver);
    dropItem.addEventListener('dragleave', dragLeave);
    dropItem.addEventListener('drop', drop);
});

document.querySelector('.drag-itens').addEventListener('dragover', dragOverNetral);
document.querySelector('.drag-itens').addEventListener('drop', dropNetral);

//Functions
function listenerDragItens() {
    let dragItemList = document.querySelectorAll('.drag-item');

    dragItemList.forEach(dragItem => {
        dragItem.addEventListener('dragstart', dragStart);
        dragItem.addEventListener('dragend', dragEnd);

        dragItem.addEventListener('drop', dropOverItens);
    });
}

function dragStart(e) {
    e.currentTarget.classList.add('dragging');
}

function dragEnd(e) {
    e.currentTarget.classList.remove('dragging');
}

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
    e.currentTarget.appendChild(dragItem);

    if (node !== '') {
        e.currentTarget.insertBefore(dragItem, node);
        node = '';
    }
}

//Neutral Area
function dragOverNetral(e) {
    e.preventDefault();
}

function dropNetral(e) {
    let dragItem = document.querySelector('.drag-item.dragging');
    e.currentTarget.appendChild(dragItem);

    if (node !== '') {
        e.currentTarget.insertBefore(dragItem, node);
        node = '';
    }
}


//Drop over Itens
function dropOverItens(e) {
    node = e.currentTarget;
}