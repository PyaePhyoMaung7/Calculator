import BasesButton from "../Button/BasesButton";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import { evaluate } from "mathjs";

const InputArea = ({ className, getExpression, getResult }) => {
    const [value, setValue]     = useState("");
    const [result, setResult]   = useState("");
    const buttonArray           = ["CE", "C", "Del", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "", "0", ".", "="];
    const numbers               = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    const operators             = ['*', '/', '+', '-']

    const record = (btn) => {
        if (btn) {
            setValue((prevValue) => {
                let curValue = 0
                let resValue = 0
                const lastChar = prevValue.slice(-1)
                if (operators.includes(lastChar)) {
                    getResult(result)
                    setResult("")
                }
                if (numbers.includes(btn)) {
                    curValue = (prevValue === "" || prevValue === "0")? btn : prevValue + btn
                    const lastChar = prevValue.slice(-1)
                    if (operators.includes(lastChar)) {
                        setResult(btn)
                    } else if (lastChar === "=") {
                        curValue = ""
                        setResult(btn)
                    }else {
                        setResult((prevResult) => (prevResult === "" || prevResult === "0") ? btn : prevResult + btn)
                    }
                } else if (btn === ".") {
                    const match = prevValue.match(/[+\-*/](.*)/);
                    if (match) {
                        const afterOperator = match[1].trim();
                        if(afterOperator.includes('.')){
                            curValue = prevValue
                        } else {
                            curValue = prevValue + btn
                            setResult((prevResult) => prevResult + btn)  
                        }
                    } else {
                        curValue = prevValue + btn
                        setResult((prevResult) => prevResult + btn)    
                    }
                } else if (operators.includes(btn)) {
                    if (prevValue === "" ) {
                        curValue = "0" + btn
                    } else {
                        const lastChar = prevValue.slice(-1)
                        if (operators.includes(lastChar)) {
                            curValue = prevValue.slice(0, -1) + btn
                        } else if (lastChar === "=") {
                            curValue = result + btn
                        } else {
                            curValue = prevValue + btn
                        }
                    }
                    getExpression(value)
                } else if (btn === "CE") {
                    const lastChar = prevValue.slice(-1)
                    if (lastChar !== "=") {
                        curValue = prevValue.slice(0, prevValue.search(/[+\-*/](?!.*[+\-*/])/) + 1);
                    } else {
                        curValue = ""
                    }
                    setResult("")
                } else if (btn === "C") {
                    curValue = ""
                    setResult("")
                } else if (btn === "Del") {
                    const lastChar = prevValue.slice(-1)
                    if (!operators.includes(lastChar)) {
                        if (lastChar !== "=") {
                            curValue = /[\d.]$/.test(prevValue) ? prevValue.slice(0, -1) : prevValue
                            setResult((prevResult) => /[\d.]$/.test(prevResult) ? prevResult.slice(0, -1) : prevResult)
                        } else {
                            curValue = ""
                        }
                    } 
                    else {
                        curValue = prevValue
                    }
                } else if (btn === "=") {
                    const lastChar  = prevValue.slice(-1)
                    curValue        = prevValue
                    if (lastChar !== "=") {
                        if (operators.includes(lastChar)) {
                            curValue = prevValue + lastNumber(prevValue)
                        } 
                        resValue = calculate(curValue)
                        setResult(resValue)
                        curValue = curValue + "="
                    } 
                }
                return curValue
            })
        }
    }

    useEffect(() => {
        getExpression(value);
    }, [value, getExpression]);

    useEffect(() => {
        getResult(result);
    }, [result, getResult]);

    const calculate  = (expression) => evaluate(expression).toString()

    const lastNumber = (expression) => {
        const regex = /(\d+(\.\d+)?)(?=[\+\-\*\/])/g;
        const matches = [...expression.matchAll(regex)];
        return matches.map(match => match[0]);
    };

    return (
        <Container className={className}>
        <Row className="h-100 g-1 pb-2" xs={4}>
            {buttonArray.map((btn, index) => (
            <Col key={index}>
                <BasesButton record={() => record(btn)}>{btn}</BasesButton>
            </Col>
            ))}
        </Row>
        </Container>
    )
};

export default InputArea;
