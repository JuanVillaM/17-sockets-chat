class Users {
    constructor() {
        this.people = [];
    }

    addPerson(id, name, group) {
        let person = { id, name, group };

        this.people.push(person);

        return this.people;
    }

    getPerson(id) {
        let person = this.people.filter(person => person.id === id)[0];

        return person;
    }

    getPeople() {
        return this.people;
    }

    getPersonPerGroup(group) {
        let personsOnGroup = this.people.filter(person => person.group === group);
        return personsOnGroup;
    }

    deletePerson(id) {
        let personDeleted = this.getPerson(id);

        this.people = this.people.filter(person => person.id != id);

        return personDeleted;
    }
}

module.exports = {
    Users
};