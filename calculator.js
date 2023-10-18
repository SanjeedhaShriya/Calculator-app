let buffer = "0";
let runningTotal = 0; //for math operations so that we can make our compiler remember the data internally 
let previousOperator;
const screen = document.querySelector('.screen');

function buttonOnClick(value){
 if(isNaN(parseInt(value))){
    handleSymbol(value);
 } else {
    handleNumber(value);
 }
 rerender();
}


//we need to diff functions, one for numbers and one for the symbols.

//function to handle number

function handleNumber(value) {
    if (buffer === "0") {
      buffer = value;
    } else {
      buffer += value;
    }
  }


  function handleMath(value){
    if(buffer === '0'){
      return; //do nothing
    }

    const intBuffer = parseInt(buffer);
    if(runningTotal === 0){
      runningTotal = intBuffer;
    } else {
      flushOperation(intBuffer);
    }
    previousOperator = value;
    buffer = '0'; 
    //console.log(runningTotal);
  }


function flushOperation (intBuffer){
  if(previousOperator === '+'){
    runningTotal += intBuffer;
  } else if(previousOperator === '-'){
    runningTotal -= intBuffer;
  } else if(previousOperator === 'x'){
    runningTotal = runningTotal * intBuffer;
  }else if(previousOperator === '÷'){
    runningTotal /= intBuffer;
  }
}  


function handleSymbol(value) {
   switch (value) {
    case 'C':
      buffer = '0';
      runningTotal = 0;
      break;
    case '=':
      if(previousOperator === null){
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = runningTotal;
      runningTotal = 0;
      //console.log('equals');
      break;
       
    case '←':
      if(buffer.length===1){
        buffer = '0';
      }else {
        buffer = buffer.substring(0, buffer.length -1);
      }
      //console.log('back arrow');
      break;
    case '+':
    case '-':
    case 'x':
    case '÷':  
      handleMath(value)
      break;
   }
}

function rerender() {
    screen.innerText = buffer;
}


//initialises everything 
//this function (init) initialises all the buttons on the calculator 
function init() {
    //console.log("hi"); : code written to check if initialisation is working, 
    document
    .querySelector('.calc-buttons')
    .addEventListener("click",function(event){
        buttonOnClick(event.target.innerText);
    });
}
 

init();

