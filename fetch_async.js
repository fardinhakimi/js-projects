const fetch = require('node-fetch')
const axios = require('axios')

/**
 * 
 */
const getUsers = async () => {

    const promise = await fetch("https://jsonplaceholder.typicode.com/users/2")
    return await promise.json()
}


const createUser = async () => {

    const user = {
        name: 'Fardin',
        username: 'fardin_hakimi',
        email: 'fardin_hakimi@fardin.come',
    }

   const data = await axios.post("https://jsonplaceholder.typicode.com/users", user)
   return data.data;
}


const getUserById = async (id) => {

    const promise = await axios.get(`https://jsonplaceholder.typicode.com/user/${id}`)

    return promise.data
}

createUser().then((user) => console.log(user))
            .catch((err) => console.log(err))

getUsers().then((data) => console.log(data))
          .catch((err) => console.log(err))

// GET USER BY ID


const userId = 11

console.log("******* GET USER BY ID *********")

getUserById(userId).then((user) => console.log(user))
                   .catch((err) => console.log(err))