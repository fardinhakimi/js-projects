
const Employee = require("./employee")
const Shopper = require("./shopper")
const User = require("./user")



const USER_TYPES = {

    "SHOPPER": {
        class: "Employee"
    },
    "EMPLOYEE": {
        class: "Shopper"
    }
}

const userFactory = (name, money=0, type="User", employer) => {

        switch(type){
            case USER_TYPES.SHOPPER.class:
                return new Shopper(name, money, employer)
            case USER_TYPES.EMPLOYEE.class:
                return new Employee(name, money, employer)
            default:
                return new User(name)
        }
}

module.exports = userFactory