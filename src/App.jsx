import './App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';

function App() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const [isWeight, setIsWeight] = useState(true);
  const [isHeight, setIsHeight] = useState(true);

  const [bmi, setBmi] = useState(0);
  const [status, setStatus] = useState("");

  const validate = (e) => {
    const { name, value } = e.target;

    if (!!value.match(`^[0-9]*\\.?[0-9]*$`)) {
      if (name === "weight") {
        setWeight(value);
        setIsWeight(true);
      } else if (name === "height") {
        setHeight(value);
        setIsHeight(true);
      }
    } else {
      if (name === "weight") {
        setWeight(value);
        setIsWeight(false);
      } else if (name === "height") {
        setHeight(value);
        setIsHeight(false);
      }
    }
  };

  const handleReset = () => {
    setWeight("");
    setHeight("");
    setIsWeight(true);
    setIsHeight(true);
    setBmi(0);
    setStatus("");
  };

  const calculate = () => {
    if (!weight || !height || weight <= 0 || height <= 0) {
      setStatus("Invalid input");
      return;
    }

    const bmiValue = (weight / (height * height)).toFixed(2);
    setBmi(bmiValue);

    if (bmiValue < 18.5) {
      setStatus("Underweight");
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setStatus("Normal weight");
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      setStatus("Overweight");
    } else {
      setStatus("Obesity");
    }
  };

  return (
    <>
      <div
        className="bg-dark d-flex justify-content-center align-items-center"
        style={{ height: '100vh', width: '100%' }}
      >
        <div className="bg-light p-5 rounded-2" style={{ width: '500px' }}>
          <h1>BMI Calculator App</h1>
          <p>Calculate your BMI easily</p>

          <div
            className="bg-success p-3 mt-4 d-flex justify-content-center align-items-center rounded flex-column"
            style={{ height: '150px' }}
          >
            <h1>{bmi}</h1>
            <p>{status}</p>
          </div>

          {/* Input Fields */}
          <div className="my-3">
            <p>Weight (kg)</p>
            <TextField id="outlined-basic" className="w-100" value={weight} name="weight" label="Enter Your Weight" variant="outlined" onChange={(e) => validate(e)} />
            {!isWeight && <p className="text-danger">*Invalid Input</p>}
          </div>
              
          <div className="my-3">
            <p>Height (m)</p>
            <TextField id="outlined-basic" className="w-100" value={height} name="height" label="Enter Your Height" variant="outlined"  onChange={(e) => validate(e)} />
            {!isHeight && <p className="text-danger">*Invalid Input</p>}
          </div> 
              
              
      {/* Buttons */}
          <div className="my-3 d-flex justify-content-between">
            <Button variant="contained" style={{ width: '190px' }} color="success" className="p-3"  onClick={calculate}>
            Calculate
            </Button>
              
            <Button variant="outlined" style={{ width: '190px' }}  color="success" className="p-3" onClick={handleReset}>
            Reset 
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
