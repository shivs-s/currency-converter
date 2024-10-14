const amountInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('from');
const toCurrencySelect = document.getElementById('to');
const resultDisplay = document.getElementById('result');
const convertButton = document.getElementById('convert');

const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';
let exchangeRates = {};

async function fetchExchangeRates() {
    const response = await fetch(API_URL);
    const data = await response.json();
    exchangeRates = data.rates;
    populateCurrencySelectors();
}

function populateCurrencySelectors() {
    const currencies = Object.keys(exchangeRates);
    currencies.forEach(currency => {
        const option1 = document.createElement('option');
        option1.value = currency;
        option1.textContent = currency;
        fromCurrencySelect.appendChild(option1);
        
        const option2 = document.createElement('option');
        option2.value = currency;
        option2.textContent = currency;
        toCurrencySelect.appendChild(option2);
    });

    // Load last selected currencies from localStorage
    const lastFromCurrency = localStorage.getItem('fromCurrency');
    const lastToCurrency = localStorage.getItem('toCurrency');

    if (lastFromCurrency) fromCurrencySelect.value = lastFromCurrency;
    if (lastToCurrency) toCurrencySelect.value = lastToCurrency;
}

convertButton.addEventListener('click', () => {
    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    const conversionRate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
    const convertedAmount = amount * conversionRate;

    resultDisplay.textContent = convertedAmount.toFixed(2);
    localStorage.setItem('fromCurrency', fromCurrency);
    localStorage.setItem('toCurrency', toCurrency);
});
fetchExchangeRates();
