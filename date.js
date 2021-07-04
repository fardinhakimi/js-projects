
const now = new Date()

console.log(now.getFullYear())
console.log(now.getMonth())

const fromTimeStamp = new Date(now.getTime())

console.log("From timestamp: ", fromTimeStamp.getFullYear())
