
export class Person {

    private name:string;
    private isEmployee:boolean;
    private isManager:boolean;
    private hours:number;
    private money:number;
    private shoppingList:[];
    
    constructor(builder)
    {
        this.name = builder.getName
        this.isEmployee = builder.isEmployee || false
        this.isManager  = builder.isManager || false
        this.hours = builder.hours || 0
        this.money = builder.money || 0
        this.shoppingList = builder.shoppingList || []
    }
}