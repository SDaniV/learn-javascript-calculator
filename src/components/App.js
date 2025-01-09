import './App.css';

import React, { useState } from 'react';

const App = (props) => {
  const [answer, setAnswer] = useState("");
  const [output, setOutput] = useState("");
  const ot = output.trim();

  const isOperator = (symbol) => {
    return /[*/+-]/.test(symbol);
  };

  const calculate = () => {
    // if last char is an operator, do nothing
    if (isOperator(ot.charAt(ot.length - 1))) return;
    // clean the output so that two operators in a row uses the last operator
    // 5 * - + 5 = 10
    const parts = ot.split(" ");
    const newParts = [];

    // go through parts backwards
    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newoutput = newParts.join(" ");
    isOperator(newoutput.charAt(0)) ? setAnswer(eval(answer + newoutput)) : setAnswer(eval(newoutput));
    setOutput("");
  };

  const handleClick = (symbol) => {
    switch(symbol) {
      case "clear":
        setAnswer("");
        setOutput("0");
        break;
      case "percent":
        if (answer === "") return;
        setAnswer((parseFloat(answer) / 100).toString());
        break;
      case "=":
        calculate();
        break;
      case "0":
        if (output.charAt(0) !== "0") {
          setOutput(output + symbol);
        }
        break;
      case ".":
        const lastNumber = output.split(/[-+*/]/g).pop();
        if (!lastNumber) return;
        if (lastNumber?.includes(".")) return;
        setOutput(output + symbol);
        break;
      default:
        if (isOperator(symbol)) {
          setOutput(ot + " " + symbol + " ");
        } else {
          output.charAt(0) === "0" ? setOutput(output.slice(1) + symbol) : setOutput(output + symbol);
        }
        break;
    }
  };

  return (
    <div id="app">
      <div>
        <div className="calculator">
          <div id="display" style={{ textAlign: "right"}}>
            <div className="formulaScreen" id="answer">{answer}</div>
            <div className="outputScreen" id="output">{output}</div>
          </div>
          <div>
            <button className="jumbo" id="clear" value="AC" onClick={() => handleClick("clear")} style={{background: "rgb(172, 57, 57)"}}>AC</button>
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
            <button id="decimal" value="." onClick={() => handleClick('.')}>.</button>
            <button id="equals" value="=" onClick={() => handleClick("=")} style={{background: "rgb(0, 68, 102)", position: "absolute", height: "130px", bottom: "5px"}}>=</button>
          </div>
        </div>
        <div className="author">
          Designed and coded By 
          <br/>
          <a href="https://www.freecodecamp.org/no-stack-dub-sack" rel="noreferrer">Peter Weinberg</a>
        </div>
      </div>
    </div>
  )
}

export default App;
