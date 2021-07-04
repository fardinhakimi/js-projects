class GenericObject <T> {

    private obj:T;

    constructor(type1:T) {

        this.obj = type1;
    }

    public print():void {
        console.log(this.obj);
    }
}

class Type1 {

    constructor() {

    }
}

class Type2 {

    constructor() {

    }
}

const genObj:GenericObject<Type1> = new GenericObject(new Type1());

genObj.print()

