const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "123456789";
const symbols = "!@#$%^&*()?";

const maxStrength = Math.log2(72) * 20;


const passwordDisplay = document.querySelector('.password-display');
const strengthDisplay = document.querySelector('.strength');

const upperCaseBox = document.getElementById('uppercase');
const lowerCaseBox = document.getElementById('lowercase');
const numbersBox = document.getElementById('numbers');
const symbolsBox = document.getElementById('symbols');

const slider = document.getElementById('slider');
const output = document.querySelector('.length');

const generateButton = document.querySelector('.generate-button');
const copyButton = document.querySelector('.copy');

generateButton.addEventListener('click', () => {
  if(upperCaseBox.checked || lowerCaseBox.checked || numbersBox.checked || symbolsBox.checked) {
    generate();
  }
});

copyButton.addEventListener('click', () => {
  const text = document.querySelector('.password-display').innerHTML;
  copyContent(text);
});


  const copyContent = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

slider.oninput = function () {
  output.innerHTML = this.value;
};

function generate() {
  const passLength = parseInt(output.innerHTML);

  let characters = "";
  if (upperCaseBox.checked) {
    characters = characters.concat(upperCaseLetters);
  }
  if (lowerCaseBox.checked) {
    characters = characters.concat(lowerCaseLetters);
  }
  if (numbersBox.checked) {
    characters = characters.concat(numbers);
  }
  if (symbolsBox.checked) {
    characters = characters.concat(symbols);
  }

  const poolLength = characters.length;
  let password = "";

  for (let i = 0; i < passLength; i++) {
    const index = Math.floor(Math.random() * characters.length + 1);
    if (password.includes(characters.charAt(index))) {
      i--;
    }
    else {
      password += characters.charAt(index);
    }
  }

  passwordDisplay.innerHTML = password;

  let strength = (Math.log2(characters.length) * passLength) / maxStrength;
  if(strength < 0.25) {
    strengthDisplay.innerHTML = "too weak"
  }
  else if(strength < 0.5) {
    strengthDisplay.innerHTML = "weak"
  }
  else if(strength < 0.75) {
    strengthDisplay.innerHTML = "medium"
  }
  else if(strength <= 1) {
    strengthDisplay.innerHTML = "strong"
  }
}

