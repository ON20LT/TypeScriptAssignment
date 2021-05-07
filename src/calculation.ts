export const selectPayingMember = document.getElementById(
  'selectMemPay',
) as HTMLSelectElement;
export const selectSplitGroup = document.getElementById(
  'selectMem',
) as HTMLSelectElement;

export let splitSelectedMembers: string[] = [];

const showSplitSelectedMembers = document.getElementById(
  'showSelectMember',
) as HTMLDivElement;

// Anzahl ausgewählter Member zum Aufteilen des Rechnungsbertrags

export function safeSplitSelectedMembers() {
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

// Funktion Rechnung mit Ergebnis in MemberAccountElement

export function calculateAccount() {
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
      if (pers == payingMember) {
        const resultCalc = (
          oldAccount +
          (billAmount - billAmount / splitSelectedMembers.length)
        ).toString();
        const newAccount = parseFloat(resultCalc).toFixed(2);
        account.innerText = newAccount;
      } else {
        const resultCalc = (
          oldAccount -
          billAmount / splitSelectedMembers.length
        ).toString();
        const newAccount = parseFloat(resultCalc).toFixed(2);
        account.innerText = newAccount;
      }
    } else {
      if (account.id != payingMember) {
        console.log('1');
        const resultCalc = (
          oldAccount -
          billAmount / splitSelectedMembers.length
        ).toString();
        const newAccount = parseFloat(resultCalc).toFixed(2);
        account.innerText = newAccount;
      } else if (account.id == payingMember) {
        const resultCalc = (oldAccount + billAmount).toString();
        const newAccount = parseFloat(resultCalc).toFixed(2);
        account.innerText = newAccount;
      }
    }
  }
}
