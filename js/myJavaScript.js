
let firstNum, operator, secondNum;


function add(){
    console.log("add");
}
function subtract(){
    console.log("subtract");
}
function multiply(){
    console.log("multiply");
}
function divide(){
    console.log("divide");
}

function operate(operator){
    switch(operator){
        case '+':
            add();
            break;
        case '-':
            subtract();
            break;
        case '*':
            multiply();
            break;
        case '/':
            divide();
            break;  
    }    
}
