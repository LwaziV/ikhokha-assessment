import * as mongodb from "mongodb";
import { MongoClient } from 'mongodb';
export default class DbClient {
    public static db: mongodb.Db;
    public static client: mongodb.MongoClient;
    
    public static async connect() {
        this.client = new MongoClient("localhost",{ monitorCommands: true});
        this.db = await this.client.db('ikhokha');
        return this.db;
    }
}
