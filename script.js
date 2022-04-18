//reads in the elements from the DOM
const screen = document.getElementById('screen');
const numButtons = document.getElementsByClassName("num-button")
const funcButtons = document.getElementsByClassName("func-button")

//creates operator variable to track the last operator button pushed
let operator = NaN;
let workingNum = "";
let lastNum;

let add = (num1,num2) => num1+num2;
let sub = (num1,num2) => num1-num2;
let mul = (num1,num2) => num1*num2;
let div = (num1,num2) => num1/num2;

//function is falled when a number button is pushed -
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
    addNumToScreen(btn.textContent)
  })
})

//function to track the latest operator button pushed by setting the operater variable
//should be read into specific operator buttons in the code directly beneath it
function addOperateListenToBtn(btn, op){
  btn.addEventListener('click', function(){
    lastNum = parseInt(workingNum);
    workingNum = "";
    screen.textContent = "";
    operator = op;
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
      btn.addEventListener('click', function(){
        lastNum = operate(lastNum, parseInt(workingNum), operator);
        screen.textContent = lastNum;
        operator = NaN;
      })
      break;
    case "AC":
      btn.addEventListener('click', function(){
        operator = NaN;
        workingNum = "";
        lastNum = undefined;
        screen.textContent = "";
      })
      break;
  }
  
})