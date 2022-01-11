import Transaction from "../models/transaction";
import DatabaseService, { DatabaseType } from "../services/db";

export default class ChainRepository {
    private REPO_NAME = "/orbitdb/zdpuArSoWRfHpbqSSQCEVkonNnGGjfwhZ9f1yjboxLTpJfcdv/Miner Blocks"
    private dbManager = new DatabaseService<Transaction>(this.REPO_NAME, DatabaseType.feed)

    init = async () => {
        await this.dbManager.connect()
    }
    getPendingTransactions = async () : Promise<Transaction[]> => {
        return await this.dbManager.collect()
    }
    listen = async () : Promise<Transaction[]> => {
        return await this.dbManager.listen()
    }
    add = async (transaction : Transaction) => {
        return await this.dbManager.add(transaction)
    }
    remove = async (transaction : Transaction) => {
        return await this.dbManager.remove("transaction")
    }
}