import Block from "../models/block";
import Chain from "../models/chain";
import DatabaseService, { DatabaseType } from "../services/db";

export default class ChainRepository {
    private REPO_NAME = "/orbitdb/zdpuB2X7KnVjbjjwycKx46Gj9QwJ5P1L46vxgxBCVVxemaoFn/BlockChain"
    private dbManager = new DatabaseService<Block>(this.REPO_NAME, DatabaseType.log)

    static create = async (ipfs: any) : Promise<ChainRepository> => {
        let instance = new ChainRepository
        await instance.init(ipfs)
        return instance
    }

    
    private init = async (ipfs : any) => {
        await this.dbManager.connect(ipfs)
    }
    getChain = async () : Promise<Chain> => {
        const blocks = await this.dbManager.collect()
        return new Chain(blocks)
    }
    listen = async () : Promise<Chain> => {
        const blocks = await this.dbManager.listen()
        return new Chain(blocks)
    }
    add = async (block : Block) => {
        return await this.dbManager.add(block)
    }
}