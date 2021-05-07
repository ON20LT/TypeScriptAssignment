// Member in Array und UL speichern

export const members: string[] = [];

export function addMemberToList() {
  const membersList = members
    .map((members) => `<li>${members}</li>`)
    .join('\n');
  (document.querySelector('ul') as HTMLElement).innerHTML = membersList;
}

// Button Membernamen Logik

export const btnAddMember = document.getElementById(
  'addMember',
) as HTMLButtonElement;
export const membersInput = document.getElementById(
  'inputField',
) as HTMLInputElement;

// Erstellen Account der Member für Ergebnis

const AccountDivs = document.getElementById('showKonto') as HTMLElement;

//Hilfestellung durch Herrn Slezak 45 bis 53
export function addNewAccountElement(name: string) {
  const memberAccount = document.createElement('div') as HTMLDivElement;
  memberAccount.innerHTML = `<div class='name'></div><div class='account'></div>`;
  memberAccount.classList.add('billDisplay');
  memberAccount.id = name;
  memberAccount.querySelector<HTMLDivElement>('.name')!.innerText = name;
  AccountDivs.appendChild(memberAccount);
  membersInput.value = '';
}
