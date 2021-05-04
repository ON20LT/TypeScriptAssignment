//Memberliste Eingabefeld und Button Logik

const members: string[] = [];

function addMember() {
  const template = members.map((members) => `<li>${members}</li>`).join('\n');
  (document.querySelector('ul') as HTMLElement).innerHTML = template;
}

addMember();

const btnAdd = document.getElementById('addMember') as HTMLButtonElement;
const input = document.getElementById('inputField') as HTMLInputElement;

//Auswahlmenü Member

const selectSplit = document.getElementById('selectMem') as HTMLSelectElement;
const selectPay = document.getElementById('selectMemPay') as HTMLSelectElement;

btnAdd.addEventListener('click', () => {
  const optionPay = document.createElement('option');
  optionPay.value = input.value.toString();
  optionPay.text = input.value;
  selectPay.add(optionPay);

  const optionSplit = document.createElement('option');
  optionSplit.value = input.value.toString();
  optionSplit.text = input.value;
  selectSplit.add(optionSplit);
  members.push(input.value);
  addMember();
  addNew(input.value);
});

// Erstellen Input Member für Ergebnis

const inpContainer = document.getElementById('showKonto') as HTMLElement;

function addNew(name: string) {
  const newInp = document.createElement('div') as HTMLDivElement;
  newInp.innerHTML = `<div class='name'></div><div class='account'></div>`;
  newInp.classList.add('billDisplay');
  newInp.id = name;
  newInp.querySelector<HTMLDivElement>('.name')!.innerText = name;
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
    const choiceElement = document.getElementById(choice) as HTMLDivElement;
    const kontostand = choiceElement.querySelector(
      '.account',
    ) as HTMLDivElement;

    const oldresult = parseFloat(kontostand.innerText || '0');

    if (memPay == choice) {
      console.log('a');
      if (memPay == choice) {
        const result = (
          oldresult +
          (billAmount - billAmount / choices.length)
        ).toString();
        kontostand.innerText = result;
      } else {
        const result = (oldresult - billAmount / choices.length).toString();
        kontostand.innerText = result;
      }
    } else {
      console.log('b');
      const payer = document.getElementById(memPay) as HTMLInputElement;
      if (kontostand.id != memPay) {
        const result = (oldresult - billAmount / choices.length).toString();
        kontostand.innerText = result;
      } else if (kontostand.id == memPay) {
        const result = (oldresult + billAmount).toString();
        kontostand.innerText = result;
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
