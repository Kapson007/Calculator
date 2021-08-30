const display = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {
    // Replace current display valye if first value is entered
    // if current value is zero, replace it, if not, add number
    if(awaitingNextValue){
        display.textContent = number;
        awaitingNextValue = false;
    }else{
        const displayValue = display.textContent;
        display.textContent = displayValue === '0' ? number : displayValue + number;
    }
    
    
}

// Calculate first and second values depending on operator

const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber,
};

// operator function

function useOperator(operator) {
    // prevent multiple operators
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }

    const currentValue = Number(display.textContent);
    // assign firstValue if no value
    if(!firstValue){
        firstValue = currentValue;
    }else{
        const calculation = calculate[operatorValue](firstValue, currentValue);
        display.textContent = calculation;
        firstValue = calculation;
    }
    // Ready for the next value, store operator
    awaitingNextValue = true;

    operatorValue = operator;
    
}


// Add Event Listeners for numbers, operators and decimal buttons

inputBtns.forEach(button => {
    if(button.classList.contains('number')){
        button.addEventListener('click', () => sendNumberValue(button.value))
    }else if(button.classList.contains('operator')){
        button.addEventListener('click', () => useOperator(button.value));
    }else if(button.classList.contains('decimal')){
        button.addEventListener('click', () => addDecimal());
    }
});

// add dcimal
function addDecimal() {
    // if operator press, don't add decimal
    if(awaitingNextValue){
        return;
    }
    // if no decimal, add one
    if(!(display.textContent.includes('.'))){
        display.textContent = `${display.textContent}.`;
    }else{
        return;
    }
}


// Reset all values and display

function resetAll() {
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    display.textContent = '0';

}

// Event listener
clearBtn.addEventListener('click', resetAll);