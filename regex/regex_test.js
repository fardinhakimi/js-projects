
const regex = /([\d]{1,2})(av|of)([\d]{1,2})/

let str = '20 av 30'

tr = str.replace(/\s/g, '')

console.log(str)
console.log(regex.test(str.trim()))


