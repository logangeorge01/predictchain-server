/**
 * Model.ts - PredictChain database interaction class.
 *
 * Interfaces with MongoDB.
 *
 * @author Cody Rivera
 * @module
 */

import { Db } from 'mongodb';

export class Model {
    private db: Db;

    constructor(db: Db) {
        this.db = db;
    }
}
