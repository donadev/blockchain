import Transaction from "../models/transaction";
import TransactionBag from "../models/transaction_bag";
import DatabaseService, { DatabaseType } from "../services/db";

export default class PendingTransactionRepository {
    private REPO_NAME = "/orbitdb/zdpuArSoWRfHpbqSSQCEVkonNnGGjfwhZ9f1yjboxLTpJfcdv/Miner Blocks"
    private dbManager = new DatabaseService<Transaction>(this.REPO_NAME, DatabaseType.feed)

    init = async () => {
        await this.dbManager.connect()
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
        return await this.dbManager.remove("transaction")
    }
}