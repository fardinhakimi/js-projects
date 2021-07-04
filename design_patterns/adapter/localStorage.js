

const {unlinkSync, existsSync, writeFile, readFileSync} = require("fs")
const path = require("path")

class localStorage {

    FILE_NAME = "localstorage_file.json"
    FILE_PATH = "./"

    constructor(){

        this.items = {}
        
        if(existsSync(path.join(this.FILE_PATH, this.FILE_NAME))){
            const text = readFileSync(path.join(this.FILE_PATH, this.FILE_NAME))
            this.items = JSON.parse(text)
        }
    }

    setItem(key, val){

        this.items[key] = val

        writeFile(this.FILE_NAME, JSON.stringify(this.items), (error) => {
            if(error) {
                console.log("failed to write to file")
            }
        })
    }

    getItem(key) {
        return this.items[key]
    }

    clear() {
        this.items = {}
        unlinkSync(path.join(this.FILE_PATH, this.FILE_NAME))
    }
}

module.exports = new localStorage()