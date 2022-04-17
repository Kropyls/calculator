function addNumToScreen(num) {
  screen.textContent = screen.textContent + num;
}

const screen = document.getElementById('screen');

const numButtons = document.getElementsByClassName("num-button")

Array.from(numButtons).forEach(btn => {
  btn.addEventListener('click', function(){
    addNumToScreen(btn.textContent)
  })
})