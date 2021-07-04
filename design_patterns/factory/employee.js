
const User = require("./user")

class Employee extends User {

    constructor(name, money, employer){

        super(name)

        this.money = money
        this.employer = employer
    }
}

module.exports = Employee