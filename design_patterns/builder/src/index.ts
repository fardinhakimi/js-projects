import { PersonBuilder } from "./PersonBuilder"

const fardin = new PersonBuilder("fardin")
                .makeEmployee()
                .withMoney(0)
                .setHours(40)
                .build()

console.log(fardin)