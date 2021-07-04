const db = []

const asyncSaveToDb = (user) => {

    db.push(user)

    return new Promise((resolve, reject) => {

        if(user.name == "doe"){
            reject("You are not allowed!")
        } else {
            resolve(user)
        }
    })
}

async function saveUser(){

    try {

        const users = await Promise.all([
            asyncSaveToDb({"name": "fardin"}), 
            asyncSaveToDb({"name": "hayah"})
        ])

        console.log("User was saved: ");
        console.log(users)
        
    } catch (error) {
        console.log(error)
    }
}


saveUser();


const printDb = () => {

    console.log(" **************** ")
    console.log(db)
}

printDb()