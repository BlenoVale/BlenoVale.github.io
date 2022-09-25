let BLvalidator = {
    handleSubmit: (event) => {
        event.preventDefault();
        let send = true;

        BLvalidator.clearErrors();

        let inputs = document.querySelectorAll('input');
        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i];

            let check = BLvalidator.checkInput(input);
            if (check !== true) {
                send = false;
                BLvalidator.showError(input, check);
            }
        }

        if (send) {
            form.submit();
        }
    },
    checkInput: (input) => {
        let rules = input.getAttribute('data-rules');
        if (rules !== null) {
            rules = rules.split('|');
            for (let k in rules) {
                let rDetails = rules[k].split('=');
                switch (rDetails[0]) {
                    case 'required':
                        if (input.value == '')
                            return 'Campo não pode ser vazio.';
                        break;
                    case 'min':
                        if(input.value.length < rDetails[1]){
                            return `Campo tem que ter pelo menos ${rDetails[1]} caracteres.`;
                        }
                        break;
                    case 'email':
                        if (input.value !== ''){
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if(!regex.test(input.value.toLowerCase())){
                                return 'E-mail digitado não é valido.';
                            }
                        }
                        break;
                    case 'mathPswd':
                        firstPswrd = document.querySelector('.firstPswrd');
                        if (input.value !== firstPswrd.value) {
                            return 'As senhas informadas não são iguais.';
                        }
                        break;
                }
            }
        }

        return true;
    },
    showError: (input, error) => {
        input.style.borderColor = '#FF0000';
        input.style.borderWidth = '2px';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling); // elementSibling é para aparecer depois do elemento
    },
    clearErrors: () => {
        let inputs = form.querySelectorAll('input');
        for (let i in inputs){
            inputs[i].style = '';
        }

        let errorElements = document.querySelectorAll('.error');
        errorElements.forEach(error =>{
            error.remove();
        });
    }
};


let form = document.querySelector('.bl-validator');
form.addEventListener('submit', BLvalidator.handleSubmit);