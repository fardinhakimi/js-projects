
function Person(name){
    this.name = name;
}

Person.prototype.getName = function (){
    return this.name;
}

function User(name, userName){
    Person.call(this, name)
    this.userName = userName;
}

// Inherit
User.prototype = Object.create(Person.prototype)

User.prototype.loggedIn = function(){
    console.log(this.name+ " has logged in")
}

User.prototype.loggedOut = function(){
    console.log(this.name+ " has logged out")
}

person = new Person("random guy")

fardin = new User("fardin","fardin_hakimi")

console.log(person.__proto__)
console.log(fardin.__proto__)


console.log(fardin.getName())
fardin.loggedIn()



const TITLES = {
	GP: {
		title : "gp"
	},

	ST: {
		title: "st"
	}
}

if("st" === TITLES.ST.title){
    console.log("ST")
}else{
    console.log("GP")
}