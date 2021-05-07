import { scrollButton, toTopScroll, showOnScroll } from './scrollbutton.js';
import {
  members,
  btnAddMember,
  membersInput,
  addMemberToList,
  addNewAccountElement,
} from './memberentry.js';
import {
  calculateAccount,
  selectPayingMember,
  selectSplitGroup,
  safeSplitSelectedMembers,
} from './calculation.js';

//Memberliste Eingabefeld und Button Logik

addMemberToList();

//Auswahlmenü Member als Zahlendes Mitglied und Gruppe zum Aufteilen des Betrages

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
  addMemberToList();
  addNewAccountElement(membersInput.value);
});

//Rechnung mit User Input

const safeSelectedMembers = document.getElementById(
  'safeSelect',
) as HTMLButtonElement;
safeSelectedMembers.addEventListener('click', safeSplitSelectedMembers);

const btnCalc = document.getElementById('btnCalc') as HTMLButtonElement;
btnCalc.addEventListener('click', calculateAccount);

//Scroll Button

scrollButton.addEventListener('click', toTopScroll);
window.onscroll = function () {
  showOnScroll();
};
