    //Часть кода, чтобы страница не перезагружалась после каждого нажатия
    let unreload = document.querySelector('.calc')
    unreload.addEventListener('submit', function(e){
        e.preventDefault()
    })
    //------

    let num1 = '';
    let num2 = '';
    let operations = '';
    let finish = false;

    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
    const operationAction = ['+', '-', '*', '/'];

    const out = document.querySelector('.inp_num p')

    //Функция очищает поле
    function clear(){
        num1 = '';
        num2 = '';
        operations = '';
        finish = false;
        out.textContent = 0;
    }
    function deleteSlice(){
        if(num2 === ''){
            num1 = num1.slice(0,-1)
            finish = false;
            out.textContent = num1;
        }else if(num1 !== '' && operations !== ''){
            num2 = num2.slice(0,-1)
            finish = false;
            out.textContent = num2;
        }
        
    }

    document.querySelector('.btn_del').onclick = deleteSlice
    document.querySelector('.btn_clear').onclick = clear;
    // вместо onclick можно было использовать addEventListener, 
    // но я пока не особо в этом всём разбераюсь

    //Тут проверка того, нажал я на кнопку или на пустое пространство
    document.querySelector('.calc_btn_num').onclick = (event) => {
        if(!event.target.classList.contains('btn')) return;

        if(event.target.classList.contains('btn_clear')) return;

        

        out.textContent = '';
        const key = event.target.textContent;

        //Проверка нажата ли именно цифра (.includes проверят элемент в массиве)
        if(numbers.includes(key)){
            if(num2 === '' && operations === ''){
                num1 += key
                out.textContent = num1;
            }else if(num1 !== '' && num2 !== '' && finish == true){
                num2 = key;
                finish = false;
                out.textContent = num2;
            }else{
                num2 += key
                out.textContent = num2;
            }
            return
        }

        //Проверка нажат ли оператор
        if(operationAction.includes(key)){
            operations = key;
            out.textContent = operations;
            return;
        }
        //При делении на ноль выдаст 'ошибку'
        if(num2 == '0' && operations == '/'){
            out.textContent = 'Ошибка'
            num1 = '';
            num2 = '';
            operations = '';
            return;
        }

        //
        if(key === '='){
            if(num2 === '') num2 = num1
            switch(operations){
                case '+':
                    num1 = (+num1) + (+num2);
                    break;
                case '-':
                    num1 = num1 - num2;
                    break;
                case '/':
                    num1 = num1 / num2;
                    break;
                case '*':
                    num1 = num1 * num2;
                    break;
            }
            finish = true;
            out.textContent = (num1.toFixed(2));
        }
        if(key === '%'){
            if(num1 === '' || num2 === ''){
                num1 = '';
                num2 = '';
                operations = '';
            }
            switch (operations){
                case '-':
                    num1 = (num1-(num1 / 100)*num2);
                    break;
                case '+':
                    num1 = ((num1 * num2) / 100) + (+num1);
                    break;
                case '*':
                    num1 = ((num1 * num2) / 100);
                    break;
                case '/':
                    num1 = ((num1 * num2) / 100) * num1;
                    break;
            }
            
            finish = true;
            console.log(num1, num2, operations)
            out.textContent = (num1)
    }
}
