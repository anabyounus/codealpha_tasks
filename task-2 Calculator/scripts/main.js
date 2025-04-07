const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
    "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
    "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Côte d'Ivoire", "Cabo Verde",
    "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)",
    "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)", "Democratic Republic of the Congo", "Denmark", "Djibouti",
    "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini (fmr. Swaziland)",
    "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea",
    "Guinea-Bissau", "Guyana", "Haiti", "Holy See", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
    "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho",
    "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
    "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (formerly Burma)",
    "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan",
    "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda",
    "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia",
    "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka",
    "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia",
    "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu",
    "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];
  
  const countryDropdown = document.getElementById('country');
  countries.forEach(country => {
    const option = document.createElement('option');
    option.value = country;
    option.textContent = country;
    countryDropdown.appendChild(option);
  });
  
  const welcomeForm = document.getElementById('welcome-form');
  const nextBtn = document.getElementById('next-btn');
  const screens = document.querySelectorAll('.screen');
  
  welcomeForm.addEventListener('input', () => {
    nextBtn.disabled = !welcomeForm.checkValidity();
  });
  
  welcomeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    switchScreen('selection-screen');
  });
  
  function switchScreen(target) {
    screens.forEach(screen => screen.classList.remove('active'));
    document.getElementById(target).classList.add('active');
  }
//   =======================================================================



// ========================================================================

  document.getElementById('simple-calc-btn').addEventListener('click', () => {
    switchScreen('simple-calculator');
  });
  
  document.getElementById('scientific-calc-btn').addEventListener('click', () => {
    switchScreen('scientific-calculator');
  });
  
  document.getElementById('currency-converter-btn').addEventListener('click', () => {
    switchScreen('currency-converter');
  });
  
  document.querySelectorAll('#back-btn').forEach(button => {
    button.addEventListener('click', () => {
      switchScreen('selection-screen');
    });
  });
  
  const simpleDisplay = document.getElementById('simple-display');
  const simpleButtons = document.querySelectorAll('#simple-calculator .buttons button');
  
  simpleButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (button.textContent === '=') {
        simpleDisplay.value = eval(simpleDisplay.value);
      } else if (button.textContent === 'C') {
        simpleDisplay.value = '';
      } else {
        simpleDisplay.value += button.textContent;
      }
    });
  });
  
  const scientificDisplay = document.getElementById('scientific-display');
const scientificButtons = document.querySelectorAll('#scientific-calculator .buttons button');

scientificButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.textContent === 'AC') {
      scientificDisplay.value = ''; // Clear the display
    } else if (button.textContent === '=') {
      try {
        scientificDisplay.value = eval(scientificDisplay.value); // Evaluate the expression
      } catch (error) {
        scientificDisplay.value = 'Error';
      }
    } else if (button.textContent === '√') {
      scientificDisplay.value = Math.sqrt(eval(scientificDisplay.value)); // Square root
    } else if (button.textContent === 'x²') {
      scientificDisplay.value += '**2'; // Square
    } else if (button.textContent === 'x!') {
      scientificDisplay.value = factorial(eval(scientificDisplay.value)); // Factorial
    } else if (button.textContent === 'π') {
      scientificDisplay.value += Math.PI; // Pi constant
    } else if (button.textContent === 'e') {
      scientificDisplay.value += Math.E; // Euler's number
    } else {
      scientificDisplay.value += button.textContent; // Append the button value
    }
  });
});

function factorial(n) {
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}
  
  const amountInput = document.getElementById('amount');
  const fromCurrency = document.getElementById('from-currency');
  const toCurrency = document.getElementById('to-currency');
  const convertBtn = document.getElementById('convert-btn');
  const resultDiv = document.getElementById('result');
  
  fetch('https://api.exchangerate-api.com/v4/latest/USD')
    .then(response => response.json())
    .then(data => {
      const currencies = Object.keys(data.rates);
      currencies.forEach(currency => {
        fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
        toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
      });
    });
  
  convertBtn.addEventListener('click', () => {
    const amount = amountInput.value;
    const from = fromCurrency.value;
    const to = toCurrency.value;
  
    fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
      .then(response => response.json())
      .then(data => {
        const rate = data.rates[to];
        resultDiv.textContent = `${amount} ${from} = ${(amount * rate).toFixed(2)} ${to}`;
      });
  });
  
  gsap.from('#welcome-screen h1', { opacity: 0, y: -50, duration: 1 });
  gsap.from('#welcome-form', { opacity: 0, y: 50, duration: 1, delay: 0.5 });
  
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, { scale: 1.1, duration: 0.3 });
    });
    button.addEventListener('mouseleave', () => {
      gsap.to(button, { scale: 1, duration: 0.3 });
    });
  });
  
  document.addEventListener('keydown', (e) => {
    const key = e.key;
    const display = document.activeElement === simpleDisplay ? simpleDisplay : scientificDisplay;
  
    if (/[0-9+\-*/=.]/.test(key)) {
      display.value += key;
    } else if (key === 'Enter') {
      display.value = eval(display.value);
    } else if (key === 'Backspace') {
      display.value = display.value.slice(0, -1);
    } else if (key === 'c' || key === 'C') {
      display.value = '';
    }
  });