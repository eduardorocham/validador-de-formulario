let form = document.querySelector('.b7validator');

let B7Validator = {
    handleSubmit: (event)=> {
        event.preventDefault(); /*Não lembro (Impede o comportamento padrão do evento)*/
        let send = true; //Enviar

        let inputs = form.querySelectorAll('input'); //Retorna uma array

        B7Validator.clearErrors();

        for(let i=0; i < inputs.length; i++) {
            let input = inputs[i] //Variável guarda todos os inputs
            let check = B7Validator.checkInput(input); /*Checagem de todos os inputs*/
            if (check !== true) {
                send = false;
                B7Validator.showError(input, check);
            }
        }

        if(send) {
            form.submit(); //Não lembro
        }
    },
    checkInput: (input)=> {
        let rules = input.getAttribute('data-rules'); /*O próprio atributo em forma de string?*/

        if(rules !== null) {
            rules = rules.split('|'); //Transforma em um array
            for(let k in rules) {
                let rDetails = rules[k].split('=');
                switch(rDetails[0]) {
                    case 'required':
                        if(input.value == '') {
                            return 'Campo não pode ser vazio.'
                        }
                    break;
                    case 'min':
                        if(input.value.length < rDetails[1]) {
                            return 'Campo tem que ter pelo menos '+rDetails[1]+' caracteres';
                        }
                    break;
                    /*
                    case 'email':
                        if(input.value != '') {
                            
                        }
                    break;
                    */
                }
            }
        }

        return true;
    },
    showError: (input, error)=> {
        input.style.borderColor = 'red';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);
        /*
        parentElement = volta para o label
        insertBefore = insere o elemento, posto no parametro, acima
        ElementSibling = indica que deve ser posto no próximo elemento após o input
        */
    },
    clearErrors: () => {
        let inputs = form.querySelectorAll('input');
        for(let i = 0; i<inputs.length; i++) {
            inputs[i].style = '';
        }

        let errorElements = document.querySelectorAll('.error');
        for(let i=0; i < errorElements.length; i++) {
            errorElements[i].remove();
        }
    }
}

form.addEventListener('submit', B7Validator.handleSubmit); //Não lembro