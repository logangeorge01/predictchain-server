/**
 * Model.ts - PredictChain database interaction class.
 *
 * Interfaces with MongoDB.
 *
 * @author Cody Rivera
 * @module
 */

import { Db } from 'mongodb';
import { Event } from './data/Event';
import { PrivConfig } from './privconfig';

export class Model {
    private db: Db;

    constructor(db: Db) {
        this.db = db;
    }

    async getEvents(
        limit?: number,
        offset?: number
    ): Promise<[Event[], number]> {
        const collection = this.db.collection('events');
        const pNumElements = collection.countDocuments({
            is_approved: true,
        });
        const cursor = collection.find(
            {
                is_approved: true,
            },
            {
                ...(limit && { limit: limit }),
                ...(offset && { skip: offset }),
            }
        );
        const list = (await cursor.toArray()).map((doc) => Event.fromMongoDoc(doc));
        return [list, await pNumElements];
    }

    async getPendingEvents(
        id: string,
        limit?: number,
        offset?: number
    ): Promise<[Array<Event>, number]> {
        if (!PrivConfig.admins.includes(id)) {
            throw new Error("unauthorized");
        }
        const collection = this.db.collection('events');
        const pNumElements = collection.countDocuments({
            is_approved: false,
        });
        const cursor = collection.find(
            {
                is_approved: false,
            },
            {
                ...(limit && {}),
                ...(offset && { skip: offset }),
            }
        );
        const list = (await cursor.toArray()).map((doc) => Event.fromMongoDoc(doc));
        return [list, await pNumElements];
    }

    async addPendingEvent(event: Event): Promise<Event> {
        event.isApproved = false;
        const collection = this.db.collection('events');
        await collection.insertOne(event.toMongoDoc());
        return event;
    }

    async approveEvent(id: string): Promise<Event> {
        return new Event();
    }

    async deleteEvent(id: string): Promise<Event> {
        return new Event();
    }
}
