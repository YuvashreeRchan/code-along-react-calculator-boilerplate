import { useState }from 'react'

    const Calculator = () => {
        const [input, setInput] = useState('');

        const buttons = [
            '1', '2', '3', '+', 
            '4', '5', '6', '-', 
            '7', '8', '9', '*', 
            '0', '.', '=', '/', 
            'AC','Del'
            ];
    
        const handleButtonClick = (value) => {
        if (value === '=') {
            try {
            setInput(evaluateExpression(input));
            } catch {
            setInput('Error');
            }
        } else if (value === 'AC') {
            setInput('');
        } else if (value === 'Del') {
            setInput(input.slice(0, -1));
        } else {
            setInput(input + value);
        }
        };

        const evaluateExpression = (expression) => {
            const operators = {
                '+': (a, b) => a + b,
                '-': (a, b) => a - b,
                '*': (a, b) => a * b,
                '/': (a, b) => a / b,
            };

        const tokens = expression.match(/(\d+|\+|\-|\*|\/|\.)/g);
        if (!tokens) return '';

        let stack = [];
        let currentNumber = '';

        tokens.forEach((token) => {
        if (!isNaN(token) || token === '.') {
            currentNumber += token;
        } else {
            if (currentNumber !== '') {
            stack.push(parseFloat(currentNumber));
            currentNumber = '';
            }
            while (
            stack.length >= 3 &&
            !isNaN(stack[stack.length - 1]) &&
            operators[stack[stack.length - 2]]
            ) {
            const b = stack.pop();
            const op = stack.pop();
            const a = stack.pop();
            stack.push(operators[op](a, b));
            }
            stack.push(token);
        }
        });

        if (currentNumber !== '') stack.push(parseFloat(currentNumber));

        while (stack.length >= 3) {
        const b = stack.pop();
        const op = stack.pop();
        const a = stack.pop();
        stack.push(operators[op](a, b));
        }

        return stack[0].toString();
    };

    
        return (
        <div className="calculator">
            <div className="display">{input}</div>
            <div className="buttons">
                {buttons.map((btn, idx) => (
                <button 
                    key={idx} 
                    onClick={() => handleButtonClick(btn)}
                    className={btn === 'AC' || btn === 'Del' ? 'wide-button' : 'button'} >
                    {btn}
                </button>
                ))}
            </div>
        </div>
        );
    };
    
    export default Calculator;