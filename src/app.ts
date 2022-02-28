/**
 * app.ts - PredictChain server entry point.
 *
 * @author Bryan Whitehurst, Cody Rivera
 * @module
 */

import express, { Application, Request, Response } from 'express'
import { MongoClient } from 'mongodb'
import bodyParser from 'body-parser'
import { setupRouter } from './Router'

const url = 'mongodb://localhost:27017/' //address to local mongoDB

const app: Application = express()
const router = express.Router()
const port: number = 3000

//code to tell app to use bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/**
 * /event endpoint
 * expecting 3 body params
 *  wallet_id: string
 *  event_name: string
 *  event_desc: string
 */
app.post('/event', (req: Request, res: Response) => {
    const walletId = req.body.wallet_id
    const eventName = req.body.event_name
    const eventDesc = req.body.event_desc

    // //creates document in local mongoDB in 'events' collection
    // MongoClient.connect(url, function (err, db) {
    //     if (err) throw err
    //     var dbo = db.db('predict_chain')
    //     var myobj = {
    //         wallet_id: walletId,
    //         event_name: eventName,
    //         event_desc: eventDesc,
    //     }
    //     dbo.collection('event').insertOne(myobj, function (err, res) {
    //         if (err) throw err
    //         console.log('1 document inserted')
    //         db.close()
    //     })
    // })

    res.send({
        wallet_id: walletId,
        event_name: eventName,
        event_desc: eventDesc,
    })
})

app.listen(port, () => {
    console.log(`The PredictChain Server is running on port ${port}.`)
    console.log("THIS APPLICATION IS INSECURE AS OF RIGHT NOW")
})
