import './App.css';

import React, { useEffect, useState } from 'react';

const App = (props) => {
  const operations = ['+', '-', '*', '/'];

  const [formula, setFormula] = useState([]);
  const [output, setOutput] = useState("0");
  const [reset, setReset] = useState(false);

  const updateLastElement = (newElement) => {
    if (formula.length === 0) {
      setFormula([newElement]);
      return;
    }
    const newFormula = [...formula];
    newFormula[newFormula.length - 1] += newElement;
    setFormula(newFormula);
  }

  const handleDotClick = (e) => {
    if (output.includes(".")) { return; }
    const newFormula = [...formula];
    newFormula[newFormula.length - 1] += e;
    setFormula(newFormula);
    setOutput(output + e);
  }

  const handleClick = (e) => {
    // Creates a new formula array
    // Changes the output to the value of the button clicked if it was 0
    // Otherwise, appends the value of the button clicked to the output
    let newOutput = output;
    if (output === "0" && e !== "." ) {
      newOutput = e;
    } else {
      newOutput += e;
    }

    if (operations.includes(formula.at(-1)) && operations.includes(e)) { 
      updateLastElement(e);
      return;
    }

    if (output === "0" || operations.includes(output)) {
      setOutput("");
    }

    if (operations.includes(e) || operations.includes(formula.at(-1))) {
      setOutput(e);
      setFormula([...formula, e]);
    } else {
      setOutput(newOutput);
      updateLastElement(e);
    }
  }

  const calculateMultiplyNDivide = (f) => {
    let newFormula = [...f];
    for (let i = 0; i < newFormula.length; i++) {
      if (newFormula[i] === "*") {
        newFormula[i - 1] = newFormula[i - 1] * newFormula[i + 1];
        newFormula.splice(i, 2);
        i--;
      } else if (newFormula[i] === "/") {
        newFormula[i - 1] = newFormula[i - 1] / newFormula[i + 1];
        newFormula.splice(i, 2);
        i--;
      }
    }
    return newFormula;
  }

  const calculateAdditionNSubtraction = (f) => {
    let result = f[0];
    for (let i = 0; i <= f.length; i++) {
      switch (f[i]) {
        case "+":
          result = result + f[i + 1];
          break;
        case "-":
          result = result - f[i + 1];
          break;
        default:
          break;
      }
    }
    return result;
  }

  const handleEqualsOperator = () => {
    // If the formula is empty, return
    if (formula.length === 0) { return; }
    
    let formulaConvertedFromStrToNum = formula.map((el) => {
      if (operations.includes(el)) {
        return el;
      }
      return parseFloat(el);
    });

    let updatedFormula = calculateMultiplyNDivide(formulaConvertedFromStrToNum);

    // If the formula is only one number, return
    if (updatedFormula.length === 1) {
      setOutput(updatedFormula[0]);
      return;
    }

    let result = calculateAdditionNSubtraction(updatedFormula)

    setOutput(result);
    setFormula([result]);
  }

  useEffect(() => {
    if (reset) {
      // Perform any operations that should happen after reset
      console.log("Reset complete");
      console.log("AC clicked: ", formula);
      setReset(false);
    }
  }, [formula, output, reset]);

  const handleAC = () => {
    setFormula([]);
    setOutput("0");
    setReset(true);
  }

  return (
    <div id="app">
      <div>
        <div className="calculator">
          <div className="formulaScreen">{formula}</div>
          <div className="outputScreen" id="display">{output}</div>
          <div>
            <button className="jumbo" id="clear" value="AC" onClick={() => handleAC()} style={{background: "rgb(172, 57, 57)"}}>AC</button>
            <button id="divide" value="/" onClick={() => handleClick('/')} style={{background: "rgb(102, 102, 102)"}}>/</button>
            <button id="multiply" value="x" onClick={() => handleClick('*')} style={{background: "rgb(102, 102, 102)"}}>x</button>
            <button id="seven" value="7" onClick={() => handleClick("7")}>7</button>
            <button id="eight" value="8" onClick={() => handleClick("8")}>8</button>
            <button id="nine" value="9" onClick={() => handleClick("9")}>9</button>
            <button id="subtract" value="-" onClick={() => handleClick('-')} style={{background: "rgb(102, 102, 102)"}}>-</button>
            <button id="four" value="4" onClick={() => handleClick("4")}>4</button>
            <button id="five" value="5" onClick={() => handleClick("5")}>5</button>
            <button id="six" value="6" onClick={() => handleClick("6")}>6</button>
            <button id="add" value="+" onClick={() => handleClick('+')} style={{background: "rgb(102, 102, 102)"}}>+</button>
            <button id="one" value="1" onClick={() => handleClick("1")}>1</button>
            <button id="two" value="2" onClick={() => handleClick("2")}>2</button>
            <button id="three" value="3" onClick={() => handleClick("3")}>3</button>
            <button className="jumbo" id="zero" value="0" onClick={() => handleClick("0")}>0</button>
            <button id="decimal" value="." onClick={() => handleDotClick('.')}>.</button>
            <button id="equals" value="=" onClick={() => handleEqualsOperator()} style={{background: "rgb(0, 68, 102)", position: "absolute", height: "130px", bottom: "5px"}}>=</button>
          </div>
        </div>
        <div className="author">
          Designed and coded By 
          <br/>
          <a href="https://www.freecodecamp.org/no-stack-dub-sack" target="_blank" rel="noreferrer">Peter Weinberg</a>
        </div>
      </div>
    </div>
  )
}

export default App;
