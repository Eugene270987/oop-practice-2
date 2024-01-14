'use strict'
const house = new House(``, ``);
function createHouse() {
    const address = document.getElementById(`address`).value;
    const apartmentsNumber = document.getElementById(`apartmentsNumber`).value;
    if (validateForm(`houseForm`, `house`)) {
        house.address = address;
        house.apartmentsNumber = apartmentsNumber;
        document.querySelector(`.house-form-wrapper`).classList.add(`visually-hidden`);
        createApartments();
    }
}
function createForm() {
    const myForm = createElement(`form`, `.apartments-form-wrapper`, ``, {id: 'apartmentForm', className: 'd-flex flex-column'});
    for (let i = 0; i < house.apartmentsNumber; i++) {
        createElement(`h3`, myForm, `Apartment Number ${i + 1}`, {className: 'text-center'});
        createApartmentInputs(myForm, i);
    }
    createElement(`button`, myForm, `Next Step`, {type: 'button', id: 'apartment-confirm', className: 'btn btn-primary mt-3'});
    return myForm;
}

function createApartments() {
    const form = createForm();
    document.getElementById(`apartment-confirm`).addEventListener('click', handleCreateApartments);
}

function createApartmentInputs(form, index) {
    createElement(`label`, form, `Add rooms in apartment: `, {className: 'mb-3'});
    createElement(`input`, form, ``, {type: `number`, name: `apartment`, 'data-rooms': `${index}`});
    createElement(`label`, form, `Add number of people: `, {className: 'mb-3'});
    createElement(`input`, form, ``, {type: `number`, name: 'apartment', 'data-people': `${index}`});
}

function handleCreateApartments() {
    if (validateForm(`apartmentForm`, `apartment`)) {
        for (let i = 0; i < house.apartmentsNumber; i++) {
            house.addApartment(new Apartment(i + 1, 0, []));
        }
        const roomsInputs = [...document.querySelectorAll('input[data-rooms]')];
        const peopleInputs = [...document.querySelectorAll('input[data-people]')];

        roomsInputs.forEach((input, index) => {
            const numberOfRooms = parseInt(input.value);
            const residents = parseInt(peopleInputs[index].value);
            console.log(residents)

            house.apartments[index].numberOfRooms = numberOfRooms;
            house.apartments[index].residents = Array(residents).fill(null);
        })
        document.querySelector(`.apartments-form-wrapper`).classList.add(`visually-hidden`);
        createPeople()
    }
}

//--------------------------------------
function createPeople(){
    const form = createElement(`form`,`.people-form-wrapper`,``,{id:'peopleForm', className: 'd-flex flex-column'});
    house.apartments.forEach((apartment,apartmentIndex)=>{
        apartment.residents.forEach((_,personIndex)=>{
            createElement(`h2`,form,`Guest in Apartment № ${apartmentIndex+1}`);
            createElement(`label`,form,`Enter Guest Name: `);
            createElement(`input`,form,``,{type:`text`,name:`name`,'data-guest':`${personIndex}`,'data-apartment':`${apartmentIndex}`});
            if (apartmentIndex === house.apartments.length - 1 && personIndex === apartment.residents.length - 1){
                createElement(`button`,form,`SHOW INFO`,{id:'people-confirm', type:'button', className: 'btn btn-primary mt-3'});
            }
        })
    });

    addPeopleData();
}
//--------------------------------------
function addPeopleData(){
    document.getElementById(`people-confirm`).addEventListener('click',()=>{
        if (validateForm(`peopleForm`,`name`)){
            const nameInputs=[...document.querySelectorAll(`#peopleForm input[type="text"]`)];
            nameInputs.forEach(input => {
                const personName = input.value;
                const apartmentIndex = parseInt(input.dataset.apartment);
                const personIndex = parseInt(input.dataset.guest);
                house.apartments[apartmentIndex].residents[personIndex] = new Person(personName);
            })
            document.querySelector(`.people-form-wrapper`).classList.add(`visually-hidden`);
            house.showInfo();
        }
    });
}
//-----------------
function validateForm(form, name) {
    const anyForm = document.getElementById(form);
    const inputs = anyForm.querySelectorAll(`[name="${name}"]`);
    let isValid = false

    inputs.forEach(input => {
        if (input.value.trim() !== '') {
            input.classList.remove(`error`);
            input.placeholder = '';
            isValid = true;
        } else {
            input.classList.add(`error`);
            input.placeholder = 'Please enter your data';
            isValid = false;
        }
    });

    return isValid;
}