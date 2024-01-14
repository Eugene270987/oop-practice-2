'use strict'
class Apartment {
    constructor(apartmentNumber, numberOfRooms) {
        this.apartmentNumber = apartmentNumber;
        this.numberOfRooms = numberOfRooms;
        this.residents = [];
    }
    showInfo() {
        const apartmentInfo = createElement(`div`, '.house-card-wrapper', ``);
        apartmentInfo.innerHTML =
            `<ul>
                <li>Apartment number# ${this.apartmentNumber}</li>
                <li>Number of rooms: ${this.numberOfRooms}</li>
                <li>Residents: </li>
            </ul>`
        this.residents.forEach(person => person.showInfo());
    }
}