
interface IRelatedContent {
    setTags(tags: string[]): ThisType<IRelatedContent>
    setCategories(categories: string[]): ThisType<IRelatedContent>
    getPromiseList(): Promise<any>[]
    save(): Promise<any>
}

const sql = async(query: string): Promise<string> => {
    return new Promise((resolve, reject)=> {
        if(query === 'reject promise') reject('promise rejected')
        resolve(query)
    })
}

export class RelatedContent implements IRelatedContent {

    private sql: any
    private promiseList: Promise<any>[]

    public constructor (sql: Function) {
        this.sql = sql
        this.promiseList = []
    }

    setTags(tags: string[]) {
        if(tags.length > 0) {
            this.promiseList.push(this.sql('saving tags')),
            this.promiseList.push(this.sql('saving tag mappings'))
        }
        return this
    }

    setCategories(categories: string[]) {
        if(categories.length > 0) {
            this.promiseList.push(this.sql('saving categories')),
            this.promiseList.push(this.sql('saving category mappings'))
        }
        return this
    }

    getPromiseList():Promise<any>[] {
        return this.promiseList
    }

    async save(): Promise<any> {
        try {
            await Promise.all(this.getPromiseList())
            return Promise.resolve('related content were saved / updated ')
        } catch (error) {
            return Promise.resolve('something went wrong')
        }
    }
}


async function run() {

    try {
    
        const relatedContent = new RelatedContent(sql)
        const result = await relatedContent.setCategories(['category1'])
                                           .setTags(['tags'])
                                           .save()

        console.log(result)
        
    } catch (error) {
        console.log(error)
        console.log('something went wrong')
    }
}

run()
