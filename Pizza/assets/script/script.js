let cart = [];
let modalQt = 1;
let modalKey = 0;

const slct = (el) => document.querySelector(el);
const slctAll = (el) => document.querySelectorAll(el);
/*
const slct = (el) => {
    return document.querySelector(el);
}*/

//Listagem das Pizzas
pizzaJson.map((item, index) => {
    let pizzaItem = slct('.models .pizza-item').cloneNode(true);
    // preencher as informações em pizzaitem
    pizzaItem.setAttribute('data-key', index); // armazena nesse atributo o id da pizza
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault(); // previni que seja feita a ação padrão da tag 'a' que é atualizar a página.

        let keyPizza = e.target.closest('.pizza-item').getAttribute('data-key');
        modalKey = keyPizza;
        fillPizzaContent(keyPizza);
        slct('.pizzaInfo--qt').innerHTML = modalQt;

        slct('.pizzaWindowArea').style.opacity = 0;
        slct('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            slct('.pizzaWindowArea').style.opacity = 1;
        }, 200); // vai esperar 200 milissegundos para aplicar opacity = 1 
    });

    //adicionar o pizzaitem no html
    slct('.pizza-area').append(pizzaItem);
});

//Preencher a Pizza selecionada
function fillPizzaContent(key) {
    modalQt = 1;
    slct('.pizzaBig img').src = pizzaJson[key].img;
    slct('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
    slct('.pizzaInfo .pizzaInfo--desc').innerHTML = pizzaJson[key].description;
    slct('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;

    slct('.pizzaInfo--size.selected').classList.remove('selected');
    slctAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
        if (sizeIndex == 2) {
            size.classList.add('selected');
        }
        size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
    });
}

//Eventos do Modal
function closeModal() {
    slct('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
        slct('.pizzaWindowArea').style.display = 'none';
    }, 500);
}

slctAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
});

slct('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if (modalQt > 1) {
        modalQt--;
        slct('.pizzaInfo--qt').innerHTML = modalQt;
    }
});

slct('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQt++;
    slct('.pizzaInfo--qt').innerHTML = modalQt;
});

slctAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', () => {
        slct('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});

slct('.pizzaInfo--addButton').addEventListener('click', () => {
    let size = parseInt(slct('.pizzaInfo--size.selected').getAttribute('data-key'));
    let identifier = `${pizzaJson[modalKey].id}@${size}`;
    let keyToVerify = cart.findIndex((item) => item.identifier == identifier);
    /*ou
    let keyToVerify = cart.findIndex((item)=>{
        return item.identifier == identifier;
    });*/

    if (keyToVerify > -1) { // atribui '-1' quando não achar o item
        cart[keyToVerify].qt += modalQt;
    } else {
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            size: size,
            qt: modalQt
        });
    }

    updateCart();
    closeModal();
});

slct('.menu-openner').addEventListener('click', ()=>{
    if (cart.length > 0) {
        slct('aside').style.left = '0';
    }
});

slct('.menu-closer').addEventListener('click', ()=>{
        slct('aside').style.left = '100vw';
});

function updateCart() {
    //para o visualização no Mobile
    slct('.menu-openner span').innerHTML = cart.length;


    if (cart.length > 0) {
        slct('aside').classList.add('show');
        slct('.cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for (let i in cart) {
            let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);
            subtotal += pizzaItem.price * cart[i].qt;

            let cartItem = slct('.models .cart--item').cloneNode(true);

            let pizzaSizeName;
            switch (cart[i].size) {
                case 0:
                    pizzaSizeName = 'P';
                    break;
                case 1:
                    pizzaSizeName = 'M'
                    break;
                case 2:
                    pizzaSizeName = 'G'
                    break;
            }

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = `${pizzaItem.name} (${pizzaSizeName})`;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if (cart[i].qt > 1){
                    cart[i].qt--;
                } else {
                    cart.splice(i, 1); // remove o item do carrinho
                }
                updateCart();
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[i].qt++;
                updateCart();
            });


            slct('.cart').append(cartItem);
        }

        desconto = subtotal * 0.1;
        total = subtotal - desconto;

        slct('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        slct('.desconto span:last-child').innerHTML = `-${desconto.toFixed(2)}%`;
        slct('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`

    } else {
        slct('aside').classList.remove('show');
        slct('aside').style.left = '100vw';
    }
}