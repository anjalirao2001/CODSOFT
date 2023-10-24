// Select all elements with the class "num" (numeric buttons),
// the element with class "type" (the input display), and
// the element with class "result" (the result display).
const nums = document.querySelectorAll(".num");
const typed = document.querySelector(".type");
const result = document.querySelector(".result");
 
// Initialize a variable to store the current input expression.
let val = "0";

// Add click event listeners to numeric buttons.
nums.forEach((num) => {
  num.addEventListener("click", (e) => {
    typed.classList.remove("active");
    let char = e.target.innerText;
    if (val === "0" && !char.match(/[*+/.-]/gi)) {
      val = char;
    } else {
      val += char;
    }

    if (val.match(/[0-9]+[+-\/][+-\/]+/gi)) {
      const operator = val[val.length - 1];
      val = val.substring(0, val.length - 2) + operator;
    }

    // Display the input expression with "×" and "÷" instead of "*" and "/".
    typed.innerText = val.replace(/\*/g, "×").replace(/\//g, "÷");

    // Evaluate the expression if it's valid and update the result.
    if (!val.match(/[0-9]+[+-\/*]$/gi)) {
      try {
        result.innerText = eval(val);
      } catch (error) {
        invalidExpression();
      }
    }
  });
});

// Add click event listener for the "AC" (clear) button.
document.querySelector(".itemAC").addEventListener("click", () => {
  clearCalculator();
});

// Add click event listener for the "DEL" (delete) button.
document.querySelector(".item-del").addEventListener("click", () => {
  deleteLastCharacter();
});

// Add click event listener for the "=" (equals) button.
document.querySelector(".item-eq").addEventListener("click", () => {
  evaluateExpression();
});

// Function to clear the calculator.
function clearCalculator() {
  typed.classList.remove("active");
  typed.innerText = "0";
  result.innerText = "";
  val = "0";
}

// Function to delete the last character from the input.
function deleteLastCharacter() {
  typed.classList.remove("active");
  val = val.substring(0, val.length - 1);
  if (val) {
    typed.innerText = val;
    if (!val.match(/[0-9]+[+-\/*]$/gi)) {
      try {
        result.innerText = eval(val);
      } catch (error) {
        invalidExpression();
      }
    } else {
      result.innerText = "";
    }
  } else {
    clearCalculator();
  }
}

// Function to evaluate the expression and display the result.
function evaluateExpression() {
  try {
    val = eval(val).toString();
    typed.classList.add("active");
    typed.innerText = val;
    result.innerText = "";
  } catch (error) {
    invalidExpression();
  }
}

// Function to handle invalid expressions.
function invalidExpression() {
  typed.innerText = "0";
  result.innerText = "Invalid Expression";
  val = "0";
}