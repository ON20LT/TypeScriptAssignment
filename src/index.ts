//Memberliste Eingabefeld und Button Logik

const members: string[] = [];

function addMember() {
  const template = members.map((members) => `<li>${members}</li>`).join('\n');
  (document.querySelector('ul') as HTMLElement).innerHTML = template;
}

addMember();

const btnAdd = document.getElementById('addMember') as HTMLButtonElement;
const input = document.getElementById('inputField') as HTMLInputElement;

btnAdd.addEventListener('click', () => {
  members.push(input.value);
  addMember();
});

//Auswahlmenü Member

const selectSplit = document.getElementById('selectMem') as HTMLSelectElement;
const selectPay = document.getElementById('selectMemPay') as HTMLSelectElement;

btnAdd.addEventListener('click', () => {
  const option = document.createElement('option');
  option.value = input.value.toString();
  option.text = input.value;
  selectPay.add(option);
});

btnAdd.addEventListener('click', () => {
  const option = document.createElement('option');
  option.value = input.value.toString();
  option.text = input.value;
  selectSplit.add(option);
});

// Erstellen Input Member für Ergebnis

const inpContainer = document.getElementById('showKonto') as HTMLElement;
btnAdd.addEventListener('click', addNew);
const newInp = document.createElement('input');

function addNew() {
  const newInp = document.createElement('input') as HTMLInputElement;
  newInp.classList.add('billDisplay');
  newInp.id = (document.getElementById('inputField') as HTMLInputElement).value;
  inpContainer.appendChild(newInp);
  input.value = '';
}

// Anzahl ausgewählter Member

const spanResult = document.getElementById(
  'showSelectMember',
) as HTMLInputElement;

let choices: string[] = [];

function listBoxResult() {
  spanResult.value = '';

  const x = document.getElementById('selectMem') as HTMLSelectElement;
  for (let i = 0; i < x.options.length; i++) {
    if (x.options[i].selected === true) {
      spanResult.value += x.options[i].value + ' ';
    }
  }

  const select = document.getElementById('selectMem') as HTMLSelectElement;
  choices = [...select.selectedOptions].map((option) => option.value);
}

//Eingabe Zahlung Logik und Button

const auswahlMem = document.getElementById('safeSelect') as HTMLButtonElement;
auswahlMem.addEventListener('click', listBoxResult);

const btnCalc = document.getElementById('btnCalc') as HTMLButtonElement;
btnCalc.addEventListener('click', calc);

function calc() {
  const billAmountElement = document.getElementById(
    'billAmount',
  ) as HTMLInputElement;

  const billAmount = parseFloat(billAmountElement.value);
  let memPay = selectPay.options[selectPay.selectedIndex].text;

  for (const choice of choices) {
    const choiceInput = document.getElementById(choice) as HTMLInputElement;

    const oldresult = parseFloat(choiceInput.value || '0');

    if (memPay == choice) {
      if (memPay == choice) {
        const result = (
          oldresult +
          (billAmount - billAmount / choices.length)
        ).toString();
        choiceInput.value = result;
      } else {
        const result = (oldresult - billAmount / choices.length).toString();
        choiceInput.value = result;
      }
    } else {
      const payer = document.getElementById(memPay) as HTMLInputElement;
      if (choiceInput.id != memPay) {
        const result = (oldresult - billAmount / choices.length).toString();
        choiceInput.value = result;
      }
      if (payer.id == memPay) {
        const result = (oldresult + billAmount).toString();
        payer.value = result;
      }
    }
  }
}

//Scroll Button

const scrollButton = document.getElementById(
  'scrollToTop',
) as HTMLButtonElement;
scrollButton.addEventListener('click', toTopScroll);
window.onscroll = function () {
  toTopFunction();
};

function toTopFunction() {
  if (document.documentElement.scrollTop > 20) {
    scrollButton.style.display = 'block';
  } else {
    scrollButton.style.display = 'none';
  }
}
function toTopScroll() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}
