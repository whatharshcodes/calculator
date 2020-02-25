const calculatorScreen = document.querySelector(".calculator-screen");
const clearBtn = document.querySelector(".all-clear");
const equalSign = document.querySelector(".equal-sign");
const operators = document.querySelectorAll(".operator");
const numbers = document.querySelectorAll(".number");
let prevInput = "0";
let calculationOperator = "";
let currentInput = "0";
let isDot = false;

document.addEventListener("keyup", function(event) {
  var key = event.key || event.keyCode;
  if ((Number(key) >= 0 && Number(key) <= 9) || key === ".") {
    inputNumber(key);
    updateScreen(currentInput);
  }
  if (key === "c") clearSrc();
  if (key === "+" || key === "*" || key === "/" || key === "-" || key === "%")
    inputOperator(key);
  if (key === "=" || key === "Enter") equals();
  if (key === "Backspace") clearSingle();
  if (!(key === "Shift")) console.log(key);
});

clearBtn.addEventListener("click", () => clearSrc());
function clearSrc() {
  clearAll();
  updateScreen(currentInput);
}

equalSign.addEventListener("click", () => equals());

operators.forEach(operator => {
  operator.addEventListener("click", event => {
    inputOperator(event.target.value);
  });
});

numbers.forEach(number => {
  number.addEventListener("click", event => {
    inputNumber(event.target.value);
    updateScreen(currentInput);
  });
});

function clearAll() {
  prevInput = "0";
  calculationOperator = "";
  currentInput = "0";
  if (isDot) isDot = !isDot;
}
function equals() {
  calculate();
  updateScreen(currentInput);
}
function inputNumber(number) {
  if (number === ".") {
    if (!isDot) {
      currentInput += number;
      isDot = true;
    }
  } else if (currentInput === "0") {
    currentInput = number;
  } else {
    currentInput += number;
  }
}
function inputOperator(operator) {
  if (calculationOperator) {
    calculate();
    updateScreen(currentInput);
  }
  prevInput = currentInput;
  calculationOperator = operator;
  currentInput = "0";
  isDot = false;
}
function updateScreen(number) {
  calculatorScreen.value = number;
}
function calculate() {
  let result = 0;
  switch (calculationOperator) {
    case "+":
      result = parseFloat(prevInput) + parseFloat(currentInput);
      break;
    case "*":
      result = parseFloat(prevInput) * parseFloat(currentInput);
      break;
    case "-":
      result = parseFloat(prevInput) - parseFloat(currentInput);
      break;
    case "/":
      result = parseFloat(prevInput) / parseFloat(currentInput);
      break;
    case "%":
      result = parseFloat(prevInput) % parseFloat(currentInput);
      break;
    default:
      return;
  }
  currentInput = result.toString();
  calculationOperator = "";
}
function clearSingle() {}
