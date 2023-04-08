import React, { useState } from 'react';

function ArrowStepper() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleClick = (index) => {
    setActiveStep(index);
  };

  const steps = [
    {count: 1, number: 'Individual', content: <div><h1>Step 1</h1><p>This is the content for Step 1</p></div> },
    {count: 2, number: 'Account Details', content: <div><h1>Step 2</h1><p>This is the content for Step 2</p></div> },
    {count: 3, number: 'E-banking / Customer Risk Analysis', content: <div><h1>Step 3</h1><p>This is the content for Step 3</p></div> },
    {count: 4, number: 'Account Referees', content: <div><h1>Step 4</h1><p>This is the content for Step 4</p></div> },
    {count: 5, number: 'Anti Money Laundering', content: <div><h1>Step 5</h1><p>This is the content for Step 4</p></div> },
  ];

  return (
    <div className="bg-gray-100 p-2">
      <ul className="stepper rounded mb-4">
        {steps.map((step, index) => (
          <li
            key={step.number}
            className={`stepper__item cursor-pointer flex h-10 items-center justify-center ${index === activeStep ? 'current text-white' : index < activeStep ? 'complete' : ''}`}
            onClick={() => handleClick(index)}
          >
            <div className='flex space-x-5 items-center justify-center'>
              <div className="border-2 rounded-full w-7 h-7 flex justify-center items-center p-1 bg-black text-white">{step.count}</div> 
              <div>{step.number}</div>
           </div>
          </li>
        ))}
      </ul>
      {steps[activeStep].content}
      <div className="flex justify-between mt-4">
        <button
          className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l ${
            activeStep === 0 ? 'cursor-not-allowed opacity-50' : ''
          }`}
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          Back
        </button>
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r ${
            activeStep === steps.length - 1 ? 'cursor-not-allowed opacity-50' : ''
          }`}
          onClick={handleNext}
          disabled={activeStep === steps.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ArrowStepper;