import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {


  const [randomNumber, setRandomNumber] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [orderPositions, setOrderPosition] = useState([]);

  const generateRandomNumber = () => {
    setIsGenerating(true);
    const min = orderPositions.length <= 0 ? 3 : 2;
    const max = 11;

    let interval = setInterval(() => {
      const number = Math.floor(Math.random() * (max - min + 1)) + min;
      setRandomNumber(number);
    }, 100); // Change number every 100ms

    setTimeout(() => {
      clearInterval(interval);

      if (orderPositions.length === 1) {
        setIsGenerating(false);
        setRandomNumber(2);
        setOrderPosition([...orderPositions, 2]);
      }
      else {
        // Generate a number that hasn't appeared yet
        let availableNumbers = [];
        for (let i = min; i <= max; i++) {
          if (!orderPositions.includes(i)) {
            availableNumbers.push(i);
          }
        }

        if (availableNumbers.length === 0) {
          setRandomNumber("All numbers have been generated");
          setIsGenerating(false);
          return;
        }

        const finalNumber = availableNumbers[Math.floor(Math.random() * availableNumbers.length)];
        setRandomNumber(finalNumber);
        setOrderPosition([...orderPositions, finalNumber]);
        setIsGenerating(false);
      }


    }, 2000); // Stop after 3 seconds
  };

  return (
    <>
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <h1>Random Number Generator</h1>
        <button
          onClick={generateRandomNumber}
          style={{ padding: '10px 20px', fontSize: '16px' }}
          disabled={isGenerating}
        >
          Generate Number
        </button>
        {randomNumber !== null && (
          <h2 style={{ marginTop: '20px' }}>Generated Number: {randomNumber}</h2>
        )}
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <h3>Selected numbers</h3>
        <ol style={{ display: 'inline-block', textAlign: 'left', paddingLeft: '0' }}>
          {orderPositions.map(num => (
            <li key={num} style={{ paddingLeft: '20px', listStylePosition: 'initial' }}>
              {num}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

export default App
