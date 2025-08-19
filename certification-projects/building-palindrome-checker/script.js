const userInput = document.getElementById('text-input');
const checkBtn   = document.getElementById('check-btn');
const resultEl   = document.getElementById('result');

// Normalize: keep only A-Z / a-z / 0-9 and lowercase it.
const normalize = (str) => str.replace(/[^0-9a-z]/gi, '').toLowerCase();

const isPalindrome = (str) => {
    const s = normalize(str);
    let i = 0, j = s.length - 1;
    while (i < j) {
      if (s[i++] !== s[j--]) return false;
    }
    return true;
};

function showResult(raw) {
    const msg = `${raw} ${isPalindrome(raw) ? 'is' : 'is not'} a palindrome.`;
    resultEl.textContent = msg;
}

function handleCheck() {
    const raw = userInput.value.trim();
    if (!raw) {
      alert('Please input a value');
      return;
    }
    showResult(raw);
    userInput.value = '';
    userInput.focus();
}

checkBtn.addEventListener('click', handleCheck);
userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleCheck();
});