import Transaction from "../models/transaction";
import TransactionBag from "../models/transaction_bag";
import DatabaseService, { DatabaseType } from "../services/db";

export default class PendingTransactionRepository {
    private REPO_NAME = "/orbitdb/zdpuArSoWRfHpbqSSQCEVkonNnGGjfwhZ9f1yjboxLTpJfcdv/Miner Blocks"
    private dbManager = new DatabaseService<Transaction>(this.REPO_NAME, DatabaseType.feed)

    static create = async (ipfs : any) : Promise<PendingTransactionRepository> => {
        let instance = new PendingTransactionRepository
        await instance.init(ipfs)
        return instance
    }

    private init = async (ipfs : any) => {
        await this.dbManager.connect(ipfs)
    }
    getPendingTransactions = async () : Promise<TransactionBag> => {
        const transactions = await this.dbManager.collect()
        return new TransactionBag(transactions)
    }
    listen = async () : Promise<TransactionBag> => {
        const transactions =  await this.dbManager.listen()
        return new TransactionBag(transactions)
    }
    add = async (transaction : Transaction) => {
        return await this.dbManager.add(transaction)
    }
    remove = async (transaction : Transaction) => {
        //TODO: identify transaction by its id
        return await this.dbManager.remove("transaction")
    }
}