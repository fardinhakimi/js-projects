
export interface BaseCarInterface {
    
    getPrice():number;

}

export enum CAR_CLASSES {
    S1 = "THE S1 CLASS",
    S2 = "THE S2 CLASS"
}

export class BaseCar implements BaseCarInterface {

    private price:number

    constructor(price) {
        this.price = price;
    }

    public getPrice():number {
        return this.price;
    }
}

export class PremiumBaseCar implements BaseCarInterface {

    private baseCar:BaseCarInterface
    private premium:number
    private class:string

    constructor(baseCar:BaseCarInterface){
        this.baseCar = baseCar
    }

    public setPremium(premium:number):void {
        this.premium = premium
    }

    public getPremium():number {
        return this.premium
    }

    public setClass(crClass:string):void {
        this.class = crClass
    }

    public getClass():string {
        return this.class
    }

    public getPrice():number {
        return this.getPremium() + this.baseCar.getPrice()
    }
}


