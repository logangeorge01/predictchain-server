/**
 * app.ts - PredictChain server entry point.
 *
 * @author Bryan Whitehurst, Cody Rivera
 * @module
 */

import express, { Router } from 'express';
import { MongoClient } from 'mongodb';
import { Controller } from './Controller';
import { Model } from './Model';
import { PubConfig } from './pubconfig';

const app = express();
const client = new MongoClient(PubConfig.mongoUrl);

async function run() {
    try {
        // Connect to DB
        await client.connect();
        const db = client.db();

        // Set up model and controller
        const model = new Model(db);
        const controller = new Controller(model);

        // Set up routes
        const router = Router();
        controller.setupRoutes(router);

        // Run app
        app.use('/api', router);
        // we have async/await and promises at home
        // async/await and promises at home: callbacks
        app.listen(PubConfig.port, () => {
            console.log(
                `PredictChain Server is running on port ${PubConfig.port}`
            );
        });
    } finally {
        await client.close();
    }
}

run().catch((err) => {
    console.log(`Fatal error: ${err}`);
    console.log('Exiting server');
});
