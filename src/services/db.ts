const IPFS = require('ipfs-core')
const OrbitDB = require('orbit-db')

export enum DatabaseType { log, feed }
export default class DatabaseService<Item> {

    private name : string
    private type : DatabaseType
    private db : any
    
    constructor(name : string, type : DatabaseType) {
        this.name = name
        this.type = type
    }

    private get = async(orbit : any) : Promise<any> => {
        switch(this.type) {
            case DatabaseType.feed: return orbit.feed(this.name)
            case DatabaseType.log: return orbit.log(this.name)
        }
    }

    static createIPFS = async () => {
        return await IPFS.create({repo: `ipfs`})
    }

    connect = async (ipfs : any) => {
        const orbitdb =  await OrbitDB.createInstance(ipfs)
        this.db = await this.get(orbitdb)
    }

    add = async (item : Item) : Promise<string> => {
        return await this.db.add(item)
    }
    remove = async (hash : String) : Promise<string> => {
        return await this.db.remove(hash)
    }
    collect = async() : Promise<Item[]> => {
        return this.db.iterator({ limit: -1 }).collect()
    }
    listen = async () : Promise<Item[]> => {
        return new Promise((resolve, _) => {
            this.db.events.on("replicated", address => {
                console.log("Replication from ", address)
                this.collect().then(resolve)
            })
        })
    }
}