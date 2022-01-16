import { MongoClient } from 'mongodb'

export class MongoDB {
    uri:string
    client: MongoClient;
    database: string
    constructor(uri:string,database:string){
        this.uri = uri
        this.client= new MongoClient(this.uri)
        this.database=database
    }
    async run(){
        await this.client.connect();
    }
    async close(){
        await this.client.close();
    }
    async find(collection:string){
        let cursor = this.client.db(this.database).collection(collection).find()
        let result: any[] = []
        await cursor.forEach(doc=>{
            result.push(doc)
        });
        return result
    }
    async insert(collection:string,document:object){
        let result = this.client.db(this.database).collection(collection).insertOne(document)

        return result
    }

}