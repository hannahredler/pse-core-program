const modularCalculator = (
  op: string,
  num1: number,
  num2: number,
  mod: number
) => {
  let opResult;

  switch (op) {
    case "+":
      opResult = num1 + num2;
      break;
    case "-":
      opResult = num1 - num2;
      break;
    case "*":
      opResult = num1 * num2;
      break;
    default:
      throw "Invalid opcode";
  }

  if (opResult > 0) return opResult % mod;
  else return (opResult % mod) + mod;
};

console.log("test case 1", modularCalculator("+", 10, 15, 12) === 1);
console.log("test case 1", modularCalculator("-", 10, 15, 12) === 7);
console.log("test case 1", modularCalculator("*", 10, 15, 12) === 6);
