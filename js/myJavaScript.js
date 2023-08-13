
let firstNum = "", secondNum = "";
let currentNum = "";
let prevOperator = "", currOperator = "";
let hasDecimal = false;
const validOps = ['+', '-', '/', '*', '%'];

let calcResultView = document.querySelector(".calcResultView");
let calcNewInputView = document.querySelector(".calcNewInputView");
let buttons = document.querySelectorAll(".calcButtonContainer > button");

function add(){
    return firstNum + secondNum;
}
function subtract(){
    return firstNum - secondNum;
}
function multiply(){
    return firstNum * secondNum;
}
function divide(){
    if(firstNum === 0 && secondNum === 0){
        alert("Division by zero is undefined");
        return "";
    }
    return firstNum / secondNum;
}
function modulo(){
    return firstNum % secondNum;
}

function operate(operator){
    switch(operator){
        case '+':
            return add();
        case '-':
            return subtract();
        case '*':
            return multiply();
        case '/':
            return divide();    
        case '%':
            return modulo();
        default:
            return "No operator";
    }    
}

function appendNumber(text){
    currentNum += text;
    calcNewInputView.textContent = currentNum;
}

function chainOperation(operator){
    currOperator = operator;
    if(firstNum === ""){
        firstNum = +currentNum ;
    }else{
        secondNum = +currentNum;
        let result = operate(prevOperator)
        firstNum = result;
        secondNum = "";
    }
    currentNum = "";
    hasDecimal = false;
    prevOperator = currOperator;
    currOperator = "";

    calcResultView.textContent = firstNum + " " + prevOperator;
    calcNewInputView.textContent = "";   
}

function changeOperation(operator){
    prevOperator = operator;
    calcResultView.textContent = firstNum + " " + prevOperator;
 
}

function appendDecimalPoint(){
    hasDecimal = true;
    currentNum += ".";
    calcNewInputView.textContent = currentNum;
}

function changeNumberSign(){
    currentNum = -(+calcNewInputView.textContent);
    calcNewInputView.textContent = currentNum;
}

function clearAll(){
    firstNum = "";
    secondNum = "";
    currentNum = "";
    prevOperator = "";
    currOperator = "";
    hasDecimal = false;
    calcNewInputView.textContent = "";
    calcResultView.textContent = "";
}

function evaluateExpression(){
    if(firstNum !== ""){
        secondNum = +calcNewInputView.textContent;
        
        let result = operate(prevOperator);
        
        if(result === "No operator"){
            firstNum = secondNum;
        }else{
            firstNum = result;
        }
        secondNum = "";
        calcResultView.textContent = firstNum;
        calcNewInputView.textContent = "";
        currentNum = "";
        prevOperator = "";
    }
}

function backspaceInput(){
    deletedPortion = currentNum.slice(currentNum.length - 1)

    if(deletedPortion === "."){
        hasDecimal = false;
    }

    currentNum = currentNum.slice(0, currentNum.length - 1);
    calcNewInputView.textContent = currentNum;
}

buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
        if(!isNaN(button.textContent)){
            appendNumber(button.textContent);
        }else if(validOps.includes(button.textContent) && currentNum  !== ""){//Enter if valid math operator is entered
            chainOperation(button.textContent);
        }else if(validOps.includes(button.textContent) && firstNum !== ""){//change operator
            changeOperation(button.textContent);
        }else if(button.textContent === "." && !hasDecimal){//add decimal point
            appendDecimalPoint();
        }else if(button.textContent === "+/-"){//change number sign
            changeNumberSign();
        }else if(button.textContent === "AC"){//clear all
            clearAll();
        }else if(button.textContent === "=" && calcNewInputView.textContent !== ""){
            evaluateExpression();
        }else if(button.textContent === "C"){
            backspaceInput();
        }
    });
});

document.addEventListener('keydown', (e) => {
    if(e.key >= 0 && e.key <= 9){
        appendNumber(e.key);
    }else if((e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/" || e.key === "%") && currentNum  !== ""){
        chainOperation(e.key);
    }else if(e.key === "."){
        appendDecimalPoint();
    }else if(e.key === "Backspace"){
        backspaceInput();
    }else if(e.key === "=" || e.key === "Enter"){
        evaluateExpression();
    }
});