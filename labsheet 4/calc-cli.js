const num1 = Number(process.argv[2]);
const num2 = Number(process.argv[3]);
const operator = process.argv[4];

let result;

switch (operator) {
  case "+":
    result = num1 + num2;
    break;

  case "-":
    result = num1 - num2;
    break;

  case "*":
    result = num1 * num2;
    break;

  case "/":
    if (num2 === 0) {
      console.log("Cannot divide by zero.");
      process.exit();
    }
    result = num1 / num2;
    break;

  default:
    console.log("Invalid operator. Use +, -, * or /");
    process.exit();
}

console.log("Result:", result);
