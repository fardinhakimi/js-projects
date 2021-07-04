import { BaseCar, PremiumBaseCar , CAR_CLASSES} from './car_classes'


const baseCar:BaseCar = new BaseCar(2000)

const premiumCar:PremiumBaseCar = new PremiumBaseCar(baseCar)
premiumCar.setPremium(2000)
premiumCar.setClass(CAR_CLASSES.S1)

console.log(premiumCar.getPrice())
console.log(premiumCar.getClass())