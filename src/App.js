import Card from "react-bootstrap/Card";
import InputArea from "./components/InputArea/InputArea";
import OutputArea from "./components/OutputArea/OutputArea";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

function App() {
  let [exp, setExp] = useState("")
  let [res, setRes] = useState("")

  const getExpression  = (data) => {
    setExp((prevExp) => data)
  }
  
  const getResult  = (data) => {
    setRes((prevRes) => data)
  }

  return (
    <div className="App">
      <div className="vw-100 vh-100 d-flex justify-content-center align-items-center">
      <Card className="w-25 h-75 border-dark border-3 shadow rounded rounded-4" >
          <OutputArea className="h-25 m-2" expression={exp} result={res}></OutputArea>
          <InputArea className="h-75" getExpression={getExpression} getResult={getResult}></InputArea>
      </Card>
      </div>
    </div>
  );
}

export default App;
