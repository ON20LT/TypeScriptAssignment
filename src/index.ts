//Memberliste Eingabefeld und Button Logik

const members: string[] = [];

function addMember() {
  const membersList = members
    .map((members) => `<li>${members}</li>`)
    .join('\n');
  (document.querySelector('ul') as HTMLElement).innerHTML = membersList;
}

addMember();

const btnAddMember = document.getElementById('addMember') as HTMLButtonElement;
const membersInput = document.getElementById('inputField') as HTMLInputElement;

//Auswahlmenü Member

const selectPayingMember = document.getElementById(
  'selectMemPay',
) as HTMLSelectElement;
const selectSplitGroup = document.getElementById(
  'selectMem',
) as HTMLSelectElement;

btnAddMember.addEventListener('click', () => {
  const MemberOptionPay = document.createElement('option');
  MemberOptionPay.value = membersInput.value.toString();
  MemberOptionPay.text = membersInput.value;
  selectPayingMember.add(MemberOptionPay);

  const MemberOptionSplit = document.createElement('option');
  MemberOptionSplit.value = membersInput.value.toString();
  MemberOptionSplit.text = membersInput.value;
  selectSplitGroup.add(MemberOptionSplit);
  members.push(membersInput.value);
  addMember();
  addNew(membersInput.value);
});

// Erstellen Input Member für Ergebnis

const AccountDivs = document.getElementById('showKonto') as HTMLElement;

//Hilfestellung durch Herrn Slezak 45 bis 53
function addNew(name: string) {
  const MemberAccount = document.createElement('div') as HTMLDivElement;
  MemberAccount.innerHTML = `<div class='name'></div><div class='account'></div>`;
  MemberAccount.classList.add('billDisplay');
  MemberAccount.id = name;
  MemberAccount.querySelector<HTMLDivElement>('.name')!.innerText = name;
  AccountDivs.appendChild(MemberAccount);
  membersInput.value = '';
}

// Anzahl ausgewählter Member

const showSplitSelectedMembers = document.getElementById(
  'showSelectMember',
) as HTMLDivElement;

let splitSelectedMembers: string[] = [];

function listBoxResult() {
  showSplitSelectedMembers.innerText = '';

  const x = document.getElementById('selectMem') as HTMLSelectElement;
  for (let i = 0; i < x.options.length; i++) {
    if (x.options[i].selected === true) {
      showSplitSelectedMembers.innerText += x.options[i].value + ' ';
    }
  }

  const selected = document.getElementById('selectMem') as HTMLSelectElement;
  splitSelectedMembers = [...selected.selectedOptions].map(
    (option) => option.value,
  );
}

//Eingabe Zahlung Logik und Button

const safeSelectedMembers = document.getElementById(
  'safeSelect',
) as HTMLButtonElement;
safeSelectedMembers.addEventListener('click', listBoxResult);

const btnCalc = document.getElementById('btnCalc') as HTMLButtonElement;
btnCalc.addEventListener('click', calculateAccount);

function calculateAccount() {
  const billAmountElement = document.getElementById(
    'billAmount',
  ) as HTMLInputElement;

  const billAmount = parseFloat(billAmountElement.value);
  let payingMember =
    selectPayingMember.options[selectPayingMember.selectedIndex].text;

  for (const pers of splitSelectedMembers) {
    const memberAccountElement = document.getElementById(
      pers,
    ) as HTMLDivElement;
    const account = memberAccountElement.querySelector(
      '.account',
    ) as HTMLDivElement;

    const oldAccount = parseFloat(account.innerText || '0');

    if (pers == payingMember) {
      console.log('a');
      if (pers == payingMember) {
        const resultCalc = (
          oldAccount +
          (billAmount - billAmount / splitSelectedMembers.length)
        ).toString();
        const newAccount = parseFloat(resultCalc).toFixed(2);
        account.innerText = newAccount;
      } else {
        const result = (
          oldAccount -
          billAmount / splitSelectedMembers.length
        ).toString();
        const resultRounded = parseFloat(result).toFixed(2);
        account.innerText = resultRounded;
      }
    } else {
      console.log('b');
      if (account.id != payingMember) {
        const result = (
          oldAccount -
          billAmount / splitSelectedMembers.length
        ).toString();
        const resultRounded = parseFloat(result).toFixed(2);
        account.innerText = resultRounded;
      } else if (account.id == payingMember) {
        const result = (oldAccount + billAmount).toString();
        const resultRounded = parseFloat(result).toFixed(2);
        account.innerText = resultRounded;
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
  showOnScroll();
};
function showOnScroll() {
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
