//Inicialization

//Eventos
//Reiniciar
document.querySelector('#restart').addEventListener('click', () => { location.reload() });

//Vento para acionar o imput[type="file"]
document.querySelector('#btn-imgUpload').addEventListener('click', () => { document.querySelector('#imgUpload').click(); });

// Carrega a imagem na div drag-itens
document.querySelector('#imgUpload').addEventListener('change', function () {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        let img = document.createElement('img');
        img.setAttribute('src', reader.result);

        let newDragItem = document.createElement('div');
        newDragItem.setAttribute('class', 'drag-item');
        newDragItem.setAttribute('draggable', true);
        newDragItem.appendChild(img);

        document.querySelector('.drag-itens').appendChild(newDragItem);

        listenerDragItens(); //Necessário para que o evento que 'dragstart' e 'dragend' sejam aplicados ao novo elemento.

    });
    reader.readAsDataURL(this.files[0]);
});

//Apagar tudo
document.querySelector('#cleanAll').addEventListener('click', cleanAll);

//Salvar Lista
document.querySelector('#saveList').addEventListener('click', saveListAsImg);

//Functions
function saveListAsImg() {
    html2canvas(document.querySelector('#tlc')).then(canvas => {
        let anchor = document.createElement('a');
        anchor.href = canvas.toDataURL('image/png');
        anchor.download = 'image.png';
        anchor.click();
    });
}

function cleanAll() {
    document.querySelectorAll('.tierList-drop-Area').forEach(item => { item.innerHTML = '' });
    document.querySelector('.drag-itens').innerHTML = '';
}