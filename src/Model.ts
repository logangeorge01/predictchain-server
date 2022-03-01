/**
 * Model.ts - PredictChain database interaction class.
 *
 * Interfaces with MongoDB.
 *
 * @author Cody Rivera
 * @module
 */

import { Db } from 'mongodb';
import { MongoClient } from 'mongodb';
export class Model {
    public uri = "mongodb://localhost:27017/";
    public client : MongoClient;
    
    constructor() {
        this.client = new MongoClient(this.uri);
    }
    
    async openConnection(){
        await this.client.connect();
    }

    //add document
    async createListing(newListing){
        const result = await this.client.db("predict_chain").collection("events").insertOne(newListing);
        console.log(`New listing created with the following id: ${result.insertedId}`);
    }
    
}
