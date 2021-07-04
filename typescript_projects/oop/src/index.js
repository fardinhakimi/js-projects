"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(first, last, email) {
        this.firstName = first;
        this.lastName = last;
        this.email = email;
    }
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    emailMatches(email) {
        return this.email === email;
    }
}
exports.User = User;
const person = new User('fardin', 'hakimi', 'hakimi@hakimi.com');
console.log(person.fullName);
console.log(`EMAIL MATCHES ? ${person.emailMatches('fardin@hakimi.com')}`);
