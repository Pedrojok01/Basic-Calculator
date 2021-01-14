$(document).ready(function(){

  // Define calculator object
  const calculator = {
    displayValue: '0',
    firstNumber: null,
    waitForSecondNumber: false,
    operator: null,
  };

  function inputDigit(digit){
    const {displayValue, waitForSecondNumber} = calculator;
      if (waitForSecondNumber === true) {
      calculator.displayValue = digit;
      calculator.waitForSecondNumber = false;
    }
    else {
      calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
  }

  function inputDecimal(dot){
    if (calculator.waitForSecondNumber === true) {
    	calculator.displayValue = '0.'
      calculator.waitForSecondNumber = false;
      return;
    }
    if (!calculator.displayValue.includes(dot)){
      calculator.displayValue += dot;
    }
  }

  function handleOperator(nextOperator){
    const {firstNumber, displayValue, calcButton} = calculator
    const inputValue = parseFloat(displayValue);

    if (calcButton && calculator.waitForSecondNumber){
      calculator.calcButton = nextOperator;
      return;
    }

    if (firstNumber === null && !isNaN(inputValue)){
      calculator.firstNumber = inputValue;
    }
    else if (calcButton){
      const result = calculate(firstNumber, inputValue, calcButton);
      calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
      calculator.firstNumber = result;
    }
    calculator.waitForSecondNumber = true;
    calculator.calcButton = nextOperator;
  }

  function calculate(firstNumber, secondNumber, calcButton){
    if (calcButton === '+'){
      return firstNumber + secondNumber;
    }
    else if (calcButton === '-'){
      return firstNumber - secondNumber;
    }
    else if (calcButton === '*'){
      return firstNumber * secondNumber;
    }
    else if (calcButton === '/'){
      return firstNumber / secondNumber;
    }
    return secondNumber;
  }

  function resetCalculator(){
    calculator.displayValue = '0';
    calculator.firstNumber = null;
    calculator.waitForSecondNumber = false;
    calculator.calcButton = null;
  }

  function updateDisplay(){
    const display = document.querySelector('.calcDisplay');
    display.value = calculator.displayValue;
  }

  updateDisplay();

  const keys = document.querySelector('.calcKeys');
  keys.addEventListener('click', event => {
    // Access the clicked element
    const target = event.target;
    const value = target.value;

    // Check if the clicked element is a button.
    // If not, exit from the function
    if (!target.matches('button')){
      return;
    }

    switch (value){
      case '+':
      case '-':
      case '*':
      case '/':
      case '=':
        handleOperator(value);
        break;
      case '.':
        inputDecimal(value);
        break;
      case 'clear':
        resetCalculator();
        break;
      default:
        if (Number.isInteger(parseFloat(value))){
          inputDigit(value);
        }
    }

  updateDisplay();
  
  });

});
