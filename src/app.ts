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

const cors = require('cors')
const app = express();
app.use(cors());

const client = new MongoClient(PubConfig.mongoUrl);

async function run() {
    // Connect to DB
    await client.connect();
    const db = client.db();

    // Set up model and controller
    const model = new Model(db);
    const controller = new Controller(model);

    // Set up routes
    const router = Router();
    controller.setupRoutes(router);

    // Set up app and error handling
    app.use('/api', router);
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Unhandled error');
    });

    // we have async/await and promises at home
    // async/await and promises at home: callbacks
    const port = process.env.port || PubConfig.port;
    app.listen(port, () => {
        console.log(`PredictChain Server is running on port ${port}`);
    });
}

run().catch((err) => {
    client.close();
    console.log(`Fatal error: ${err}`);
    console.log('Exiting server');
});
