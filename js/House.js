'use strict'
class House {
    constructor(address, apartmentsNumber) {
        this.address = address;
        this.apartmentsNumber = apartmentsNumber;
        this.apartments = [];
    }

    addApartment(apartment) {
        this.apartments.push(apartment);
    }
    showInfo() {
        const houseInfo =document.querySelector(`.house-card-wrapper`);
        houseInfo.classList.remove(`visually-hidden`);

        houseInfo.innerHTML =
        `<h2>House Information:</h2>
        <ul>
          <li>Address: ${this.address}</li>
          <li>ApartmentsNumber: ${this.apartmentsNumber}</li>
          <li>Apartments:</li>
        </ul>`
        this.apartments.forEach(apartment => apartment.showInfo());
    }
}

