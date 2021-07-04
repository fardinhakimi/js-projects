const userFactory = require("./UserFactory")

const employee = userFactory("fardin", 0, "Employee", "Stampen")
const shopper  = userFactory("fardin 2", 0, "Shopper", "Unknown")
const trainBandit  = userFactory("fardin 3", 0, "TrainBandit", "Unknown")

console.log({
    employee,
    shopper,
    trainBandit
})