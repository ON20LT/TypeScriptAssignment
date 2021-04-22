export {}

//Memberliste Eingabefeld und Button Logik

let members: string[] = [];

function addMember () {
    let template = members.map( members => `<li>${members}</li>`).join('\n');
    (document.querySelector('ul')as HTMLElement).innerHTML = template;
}

addMember();

let btnAdd = document.getElementById('addMember');
let input = document.getElementById('inputField') as HTMLInputElement;

btnAdd?.addEventListener('click', () => {
    members.push(input.value);
    addMember()
})

//Auswahlmenü Member

let select = document.querySelector('select');

btnAdd?.addEventListener('click', (e:Event) =>{
    let option = document.createElement('option');
    option.value = input.value.toString();
    option.text = input.value;
    select.add(option);
   
})

// Erstellen Input Member für Ergebnis

const inpContainer = document.getElementById('showKonto')?.innerHTML;
btnAdd?.addEventListener('click', AddNew);
const newInp =document.createElement("input");

function AddNew () {
    const newInp =document.createElement("input");
    newInp.classList.add('billDisplay');
    newInp.id = (document.getElementById('inputField') as HTMLInputElement).value;
    inpContainer.appendChild(newInp);
    input.value = '';
}

// Anzahl ausgewählter Member

let spanResult = document.getElementById('showSelectMember')?.innerHTML;
function listBoxResult () {
    spanResult.value= "";
    let x = document.getElementById('selectMem');
    for ( let i=0; i<x.options.length; i++){
        if (x.options[i].selected === true){
            spanResult.value += x.options[i].value + " ";
            document.getElementById('showSelectMember').innerHTML=spanResult.value;
        }
        if (document.getElementById('showSelectMember').value == ""){
            document.getElementById('showSelectMember').innerHTML= 'Bitte mindestens ein Teammitglied auswählen';
        }
    
    }
}


//Eingabe Zahlung Logik und Button

let auswahlMem = document.getElementById('safeSelect');
auswahlMem?.addEventListener('click', payingMem);
let choice :string [] = [];

function payingMem () {
    let select = document.getElementById('selectMem');
    choice = [].map.call(select.selectedOptions, (option) => option.value);
}

function calc () {
    let billAmount = (document.getElementById('billAmount')as HTMLInputElement).value;
    (document.querySelector('.billDisplay')as HTMLInputElement).value = (parseFloat(billAmount) / choice.length).toString();
    
}


//Scroll Button

let scrollButton = document.getElementById ('scrollToTop') as HTMLElement;

window.onscroll = function () {toTopFunction()};

function toTopFunction () {
    if (document.documentElement.scrollTop > 20) {
        scrollButton.style.display = 'block';
    }
    else {
        scrollButton.style.display = 'none';
    }
}
function toTopScroll () {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })
}