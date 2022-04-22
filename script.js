//reads in the elements from the DOM
const screen = document.getElementById('screen');
const numButtons = document.getElementsByClassName("num-button")
const funcButtons = document.getElementsByClassName("func-button")
let equalBtn;

//creates operator variable to track the last operator button pushed
let operator = undefined;
let workingNum = "";
let lastNum = NaN;

let add = (num1,num2) => num1+num2;
let sub = (num1,num2) => num1-num2;
let mul = (num1,num2) => num1*num2;
let div = (num1,num2) => num1/num2;

function shouldEqualBeEnabled(){
  if (!isNaN(lastNum) && operator != undefined && workingNum != "")
  {
    equalBtn.disabled = false;
    return
  }
  equalBtn.disabled = true;
}

//function is called when a number button is pushed -
//it writes the number to the screen and updates the working number variable
function addNumToScreen(num) {
  screen.textContent = screen.textContent + num;
  workingNum += num;
}

//performs the operation on the number
function operate(num1,num2,opr){
  switch(opr){
    case "+":
      return add(num1,num2);
    case "-":
      return sub(num1,num2);
    case "x":
      return mul(num1,num2);
    case "/":
      return div(num1,num2)
  }
}

//adds click listener to button
//should be independant of button order
Array.from(numButtons).forEach(btn => {
  btn.addEventListener('click', function(){
    //this if statement basically checks if workingNum is not a string because that implies it was the result of another operation, and should be immutable - if number is entered it will clear the old value - we know this because of my lines that set workingNum = lastNum when we operate -- lastNum will always be a number and not a string
    if(typeof workingNum != 'string'){
      workingNum = "";
      screen.textContent = "";
    }
    addNumToScreen(btn.textContent)
    shouldEqualBeEnabled();
  })
})

//function to track the latest operator button pushed - sets the global operater variable
//should be read into specific operator buttons in the code directly beneath it
function addOperateListenToBtn(btn, op){
  btn.addEventListener('click', function(){
    //if statement for clicking operator buttons in sequence, ie without pressing =, evaluate on each press
    if(operator != undefined){
      lastNum = operate(lastNum, parseInt(workingNum), operator);
      screen.textContent = lastNum;
      operator = op;
      workingNum = lastNum;
      //equals needs to be set to diabled here because the user will have just touched an operation key, so they shouldn't be able to hit equals until they specify enter a second value to do the operation with - this is the only case where shouldEqualBeEnabled won't work - because the workingNum variable is set to the result of the last operation (because that result should be displayed on screen) AND an operator key was set for this function to be called
      equalBtn.disabled = true;
      return
    }
    lastNum = parseInt(workingNum);
    workingNum = "";
    screen.textContent = "";
    operator = op;
    shouldEqualBeEnabled();
  })
}

//assigns actions for each of the non-number buttons on the calculator
//should work even if button positionsa are re-arranged
Array.from(funcButtons).forEach(btn => {
  switch(btn.textContent){
    case "+":
      addOperateListenToBtn(btn, "+")
      break;
    case "-":
      addOperateListenToBtn(btn, "-")
      break;
    case "x":
      addOperateListenToBtn(btn, "x")
      break;
    case "/":
      addOperateListenToBtn(btn, "/")
      break;
    //the "=" will be different because it calls the operator to operate on the inputs, as opposed to
    //writing the operator and value numbers to be operated on later
    case "=":
      equalBtn = btn;
      btn.addEventListener('click', function(){
        lastNum = operate(lastNum, parseInt(workingNum), operator);
        screen.textContent = lastNum;
        operator = undefined;
        workingNum = lastNum;
        shouldEqualBeEnabled();
      })
      shouldEqualBeEnabled();
      break;
    //AC is also different than a basic operation for obvious reasons
    case "AC":
      btn.addEventListener('click', function(){
        operator = undefined;
        workingNum = "";
        lastNum = NaN;
        screen.textContent = "";
        shouldEqualBeEnabled();
      })
      break;
  }
  
})