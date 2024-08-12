import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [amount, setAmount] = useState(1);
  const [currency, setCurrency] = useState('USD');
  const [conversionRates, setConversionRates] = useState({});
  const [result, setResult] = useState({});

  const currencies = ['USD', 'EUR', 'TRY', 'GBP', 'JPY', 'CAD', 'CHF', 'CNY', 'INR'];

  useEffect(() => {
    const fetchConversionRates = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        const filteredRates = {};
        currencies.forEach((currency) => {
          if (data.rates[currency]) {
            filteredRates[currency] = data.rates[currency];
          }
        });
        setConversionRates(filteredRates);
      } catch (error) {
        console.error('Error fetching conversion rates:', error);
      }
    };

    fetchConversionRates();
  }, []);

  useEffect(() => {
    const newResult = {};
    for (let key in conversionRates) {
      newResult[key] = (amount / conversionRates[currency]) * conversionRates[key];
    }
    setResult(newResult);
  }, [amount, currency, conversionRates]);

  const flagUrl = (currencyCode) => `/${currencyCode}.png`;

  return (
    <div className="container">
      
      <h2 >Ulaş'ın Para Birimi Dönüştürücüsü</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Miktar girin"
        className="input-box"
        
        
      />
      <div>
        <label>Para Birimi Seç:</label>
        <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="select-box">
          {currencies.map((key) => (
            <option key={key} value={key}>
              {key} - {key}
            </option>
          ))}
        </select>
      </div>
      <div className="result-box">
        {Object.keys(result).map((key) => (
          <p key={key}>
            <img src={flagUrl(key)} alt={`${key} flag`} className="flag-icon" />
            {key}: {result[key].toFixed(2)}
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
