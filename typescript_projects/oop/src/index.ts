export class User {

    private firstName: string
    private lastName: string
    private email: string

    public constructor(first: string, last: string, email: string){
        this.firstName = first
        this.lastName = last
        this.email = email
    }

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`
    }

    public emailMatches(email: string): boolean {
        return this.email === email
    }
}

class Admin extends User {
    private userRole = 'Admin'

    get role(): string {
        return this.userRole
    }
}


const person: User = new User('fardin', 'hakimi', 'hakimi@hakimi.com')

console.log(person.fullName)
console.log(`EMAIL MATCHES ? ${ person.emailMatches('fardin@hakimi.com') }`)