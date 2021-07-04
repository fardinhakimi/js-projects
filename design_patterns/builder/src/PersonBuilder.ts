
import { Person } from "./Person"

export class PersonBuilder {

    public name:string
    public isEmployee:boolean
    public isManager:boolean
    public hours:number
    public money:number
    public shoppingList:[]

    /**
     * 
     * @param name 
     */
    constructor(name:string)
    {
        this.name = name
    }

    makeEmployee()
    {
        this.isEmployee = true
        return this
    }

    /**
     * 
     * @param hours 
     */
    makeManager(hours:number = 40 )
    {
        this.isManager = true
        this.hours = hours
        return this
    }

    /**
     * 
     * @param hours 
     */
    setHours(hours:number = 40)
    {
        this.hours = hours
        return this
    }

    /**
     * 
     * @param shoppingList 
     */
    setShoppingList(shoppingList:[] = [])
    {
        this.shoppingList = shoppingList
        return this
    }

    /**
     * 
     * @param money 
     */
    withMoney(money:number=0)
    {
        this.money = money
        return this
    }

    build()
    {
        return new Person(this)
    }
}