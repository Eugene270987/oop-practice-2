'use strict'
class Person {
    constructor(name) {
        this.name = name;
    }
    showInfo() {
        const personInfo = createElement(`div`, `.house-card-wrapper`, ``,{className: 'name-block'});
        personInfo.innerHTML = `Name: ${this.name}`;
    }
}
