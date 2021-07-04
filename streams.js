const { Readable } = require("stream");

class StreamFromArr extends Readable {

    constructor(arr){

        super({"encoding": "utf-8"})
        this.arr = arr
        this.index = 0
    }

    _read(){

        if (this.index <= this.arr.length){
            const chunck = this.arr[this.index]
            this.index += 1
            this.push(chunck)
        } else {
            this.push(null)
        }
    }
}

const arrStream = new StreamFromArr(["fardin", "zohra", "hayah"])

arrStream.on("data", (data) => console.log(data))
arrStream.on("end", () => console.log("Stream ended"))