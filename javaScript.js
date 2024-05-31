/*
  Algorithm for Calculator and Timer:
  1. Define basic arithmetic functions: add, subtract, multiply, divide.
  2. Define additional functions: percent, exponentiate.
  3. Evaluate an expression string safely using JavaScript's Function constructor.
  4. Handle user inputs and update display.
  5. Implement timer functionality to count up and count down based on user input.
  6. Add a reset timer functionality.
*/

// Function Definitions

// Add two numbers
function add(a, b) { 
    return a + b; 
}

// Subtract one number from another
function subtract(a, b) { 
    return a - b; 
}

// Multiply two numbers
function multiply(a, b) { 
    return a * b; 
}

// Divide one number by another, handling division by zero
function divide(a, b) {
    if (b === 0) { 
        return "Error"; 
    }
    return a / b;
}

// Convert a number to its percentage
function percent(a) { 
    return a / 100; 
}

// Raise a number to the power of another
function exponentiate(a, b) { 
    return a ** b; 
}

// Evaluate Expression
function evaluateExpression(expression) {
    try {
        // Replace "^" with "**" for exponentiation in JavaScript
        expression = expression.replace(/\^/g, "**");
        // Evaluate the expression using the Function constructor
        return new Function('return ' + expression)();
    } catch (error) {
        return "Error";
    }
}

// Variables to store the current input
let currentInput = "";

// DOM Elements
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const enterTimerButton = document.getElementById("enter-timer");
const startTimerButton = document.getElementById("start-timer");
const stopTimerButton = document.getElementById("stop-timer");
const resetTimerButton = document.getElementById("reset-timer"); // New reset timer button
const timerInput = document.getElementById("timer-input");

// Update Display Function
function updateDisplay(value) {
    display.textContent = value;
}

// Handle Input
function handleInput(value) {
    currentInput += value;
    updateDisplay(currentInput);
}

// Handle Equals Input
function handleEqualsInput() {
    const result = evaluateExpression(currentInput);
    updateDisplay(result);
    currentInput = result.toString();
}

// Handle Clear Input
function handleClearInput() {
    currentInput = "";
    updateDisplay(0);
}

// Handle Delete Input
function handleDeleteInput() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || 0);
}

// Handle Button Clicks
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const number = button.getAttribute("data-number");
        const operator = button.getAttribute("data-operator");
        const decimal = button.getAttribute("data-decimal");

        if (number !== null) {
            handleInput(number);
        } else if (operator !== null) {
            handleInput(operator);
        } else if (decimal !== null) {
            handleInput(decimal);
        } else if (button.id === "equals") {
            handleEqualsInput();
        } else if (button.id === "ac") {
            handleClearInput();
        } else if (button.id === "del") {
            handleDeleteInput();
        } else if (button.id === "plus-minus") {
            if (currentInput) {
                currentInput = (parseFloat(currentInput) * -1).toString();
                updateDisplay(currentInput);
            }
        } else if (button.id === "percent") {
            if (currentInput) {
                currentInput = (parseFloat(currentInput) / 100).toString();
                updateDisplay(currentInput);
            }
        }
    });
});

// Timer Functions
let timerInterval;
let isTimerRunning = false;

// Start a timer that counts up from 0.00
function startTimerCountUp() {
    clearInterval(timerInterval);
    let startTime = Date.now();
    isTimerRunning = true;

    timerInterval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const seconds = Math.floor(elapsedTime / 1000);
        const milliseconds = Math.floor((elapsedTime % 1000) / 10);
        updateDisplay(`${seconds}.${milliseconds < 10 ? '0' : ''}${milliseconds}`);
    }, 10);
}

// Start a timer that counts down from a given duration
function startTimerCountDown(duration) {
    clearInterval(timerInterval);
    let endTime = Date.now() + duration;
    isTimerRunning = true;

    timerInterval = setInterval(() => {
        const timeLeft = endTime - Date.now();
        const seconds = Math.floor(timeLeft / 1000);
        const milliseconds = Math.floor((timeLeft % 1000) / 10);
        updateDisplay(`${seconds}.${milliseconds < 10 ? '0' : ''}${milliseconds}`);

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            updateDisplay("0.00");
            isTimerRunning = false;
        }
    }, 10);
}

// Handle the start of the timer
function handleStartTimer() {
    if (!isTimerRunning) {
        startTimerCountUp(); // Start a timer that counts up from 0.00
    }
}

// Handle the stop of the timer
function handleStopTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
}

// Handle the reset of the timer
function handleResetTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    updateDisplay("0.00");
}

// Event listener for entering a custom timer
enterTimerButton.addEventListener("click", () => {
    const inputTime = parseFloat(timerInput.value);
    if (!isNaN(inputTime) && inputTime > 0) {
        startTimerCountDown(inputTime * 1000); // Convert seconds to milliseconds
    }
});

// Event listeners for start, stop, and reset timer buttons
startTimerButton.addEventListener("click", handleStartTimer);
stopTimerButton.addEventListener("click", handleStopTimer);
resetTimerButton.addEventListener("click", handleResetTimer); // New event listener for reset button

// Initialize Display
updateDisplay("0.00");



/*
JavaScript Code Explanation:

1. Define Functions and Variables:
   - Define basic arithmetic functions: add, subtract, multiply, divide.
   - Define additional functions: percent, exponentiate.
   - Evaluate an expression string safely using JavaScript's Function constructor.
   - Initialize variables to store current input, timer interval, and timer running status.

2. Get DOM Elements:
   - Get references to DOM elements like display, buttons, enter timer button, start timer button, stop timer button, reset timer button, and timer input.

3. Update Display Function:
   - Function to update the display with the provided value.

4. Handle User Input Functions:
   - Functions to handle various types of input (numbers, operators, decimals).
   - Append the input to the current input and update the display.
   - Handle special buttons like equals, clear, delete, plus-minus, and percent.

5. Add Event Listeners for Button Clicks:
   - Event listeners for all buttons to handle different types of input based on the button's attributes and IDs.

6. Implement Timer Functions:
   - Functions to handle timer functionality, including counting up and counting down.
   - Start Timer Count Up: Start a timer that counts up from 0.00.
   - Start Timer Count Down: Start a timer that counts down from a given duration.
   - Handle Start Timer: Function to start the timer based on the current state.
   - Handle Stop Timer: Function to stop the timer and clear the interval.
   - Handle Reset Timer: Function to reset the timer and clear the display.

7. Add Event Listeners for Timer Controls:
   - Event listener for the enter timer button to start a countdown timer with a custom input time.
   - Event listeners for start, stop, and reset timer buttons to control the timer functionality.

8. Initialize Display:
   - Set the initial display value to "0.00".

This code combines calculator functionality with timer functionality, allowing users to perform arithmetic operations and use a timer with count-up and count-down features, along with a reset timer feature.
*/


/*
1. Define Functions and Variables:

// Define arithmetic functions
function add(a, b)
function subtract(a, b)
function multiply(a, b)
function divide(a, b)
function percent(a)
function exponentiate(a, b)
function evaluateExpression(expression)

// Initialize variables
let currentInput = ""
let timerInterval
let isTimerRunning = false

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

2. Get DOM Elements:

// Get DOM elements
const display = document.getElementById("display")
const buttons = document.querySelectorAll(".btn")
const enterTimerButton = document.getElementById("enter-timer")
const startTimerButton = document.getElementById("start-timer")
const stopTimerButton = document.getElementById("stop-timer")
const resetTimerButton = document.getElementById("reset-timer") // New reset timer button
const timerInput = document.getElementById("timer-input")

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

3. Create Update Display Function:

function updateDisplay(value) {
    display.textContent = value
}

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

4. Handle User Input Functions:

function handleInput(value)
function handleEqualsInput()
function handleClearInput()
function handleDeleteInput()

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

5. Add Event Listeners for Button Clicks:

buttons.forEach(button => {
    button.addEventListener("click", () => {
        // Handle different button clicks
        const number = button.getAttribute("data-number")
        const operator = button.getAttribute("data-operator")
        const decimal = button.getAttribute("data-decimal")

        if (number !== null) {
            handleInput(number)
        } else if (operator !== null) {
            handleInput(operator)
        } else if (decimal !== null) {
            handleInput(decimal)
        } else if (button.id === "equals") {
            handleEqualsInput()
        } else if (button.id === "ac") {
            handleClearInput()
        } else if (button.id === "del") {
            handleDeleteInput()
        } else if (button.id === "plus-minus") {
            // Handle plus/minus button
            if (currentInput) {
                currentInput = (parseFloat(currentInput) * -1).toString()
                updateDisplay(currentInput)
            }
        } else if (button.id === "percent") {
            // Handle percent button
            if (currentInput) {
                currentInput = (parseFloat(currentInput) / 100).toString()
                updateDisplay(currentInput)
            }
        }
    })
})

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

6. Implement Timer Functions:

function startTimerCountUp()
function startTimerCountDown(duration)
function handleStartTimer()
function handleStopTimer()
function handleResetTimer()

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

7. Add Event Listeners for Timer Controls:

enterTimerButton.addEventListener("click", () => {
    // Handle timer input and start countdown
    const inputTime = parseFloat(timerInput.value)
    if (!isNaN(inputTime) && inputTime > 0) {
        startTimerCountDown(inputTime * 1000) // Convert seconds to milliseconds
    }
})

startTimerButton.addEventListener("click", handleStartTimer)
stopTimerButton.addEventListener("click", handleStopTimer)
resetTimerButton.addEventListener("click", handleResetTimer) // New event listener for reset button

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

8. Initialize Display and Run the Code:

// Initialize display
updateDisplay("0.00")

// Run the code
- Handle user input for calculator
- Handle timer controls
- Update display accordingly
*/
