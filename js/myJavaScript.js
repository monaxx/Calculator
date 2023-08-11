
let firstNum, secondNum;
let currentNum = "";
let prevOperator = "", currOperator = "";
const validOps = ['+', '-', '/', '*', '%'];

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
             
    }    
}

let buttons = document.querySelectorAll(".calcButtonContainer > button");

buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
        let calcResultView = document.querySelector(".calcResultView");
        let calcNewInputView = document.querySelector(".calcNewInputView");
        if(!isNaN(button.textContent)){
            currentNum += button.textContent;
            currentNum  = +currentNum;
            calcNewInputView.textContent = currentNum;
        }else if(validOps.includes(button.textContent) && currentNum  !== ""){//Enter if valid math operator
            if(firstNum == undefined){
                currOperator = button.textContent;
                console.log("first");
                firstNum = currentNum ;
                currentNum = "";
                prevOperator = currOperator;
            }else if(currentNum !== ""){
                currOperator = button.textContent;
                console.log("second");
                secondNum = currentNum;
                firstNum = operate(prevOperator);
                currentNum = "";
                prevOperator = currOperator;
            }
            calcResultView.textContent = firstNum + " " + currOperator;
            calcNewInputView.textContent = "";
            
        }
    });
});