/**
 * Model.ts - PredictChain database interaction class.
 *
 * Interfaces with MongoDB.
 *
 * @author Cody Rivera, Bryan Whitehurst
 * @module
 */

import { Db, ObjectId } from 'mongodb';
import { AuthError } from './Auth';
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
    ): Promise<[Array<Event>, number]> {
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
        const list = (await cursor.toArray()).map((doc) =>
            Event.fromMongoDoc(doc)
        );
        return [list, await pNumElements];
    }

    async getPendingEvents(
        userId: string,
        limit?: number,
        offset?: number
    ): Promise<[Array<Event>, number]> {
        if (!PrivConfig.admins.includes(userId)) {
            throw new AuthError('unauthorized');
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
        const list = (await cursor.toArray()).map((doc) =>
            Event.fromMongoDoc(doc)
        );
        return [list, await pNumElements];
    }

    async addPendingEvent(event: Event): Promise<Event> {
        event.isApproved = false;
        const collection = this.db.collection('events');
        await collection.insertOne(event.toMongoDoc());
        return event;
    }

    async approveEvent(userId: string, id: string): Promise<Event> {
        if (!PrivConfig.admins.includes(userId)) {
            throw new AuthError('unauthorized');
        }
        const collection = this.db.collection('events');
        await collection.updateOne(
            {
                _id: new ObjectId(id),
            },
            {
                $set: {
                    is_approved: true,
                },
            }
        );
        return Event.fromMongoDoc(
            await collection.findOne({ _id: new ObjectId(id) })
        );
    }

    async deleteEvent(userId: string, id: string): Promise<Event> {
        if (!PrivConfig.admins.includes(userId)) {
            throw new AuthError('unauthorized');
        }
        const collection = this.db.collection('events');
        const event = Event.fromMongoDoc(
            await collection.findOne({ _id: new ObjectId(id) })
        );
        await collection.deleteOne({ _id: new ObjectId(id) });
        return event;
    }

    // test database entries
    async resetDb() {
        const collection = this.db.collection('events');
        const exists = (await this.db.collections())
            .map((c) => c.collectionName)
            .includes('events');
        if (exists) {
            await collection.drop();
        }

        const testEntries = new Array<Event>();
        let event: Event;

        event = new Event();
        Object.assign(event, {
            id: new ObjectId(),
            walletId: 'FDwi8C9fWuaNn7dvNkWWAxq8k5HWTkjBVYUGR5dE831W',
            name: 'Name0',
            category: 'Category0',
            description: 'Description0',
            resolutionDate: '99999999999999999',
            imageLink: 'https://www.example.com/',
            isApproved: true,
        });
        testEntries.push(event);

        event = new Event();
        Object.assign(event, {
            id: new ObjectId(),
            walletId: 'FDwi8C9fWuaNn7dvNkWWAxq8k5HWTkjBVYUGR5dE831W',
            name: 'Name1',
            category: 'Category1',
            description: 'Description1',
            resolutionDate: '99999999999999999',
            imageLink: 'https://www.example.com/',
            isApproved: true,
        });
        testEntries.push(event);

        event = new Event();
        Object.assign(event, {
            id: new ObjectId(),
            walletId: 'FDwi8C9fWuaNn7dvNkWWAxq8k5HWTkjBVYUGR5dE831W',
            name: 'Name2',
            category: 'Category2',
            description: 'Description2',
            resolutionDate: '99999999999999999',
            imageLink: 'https://www.example.com/',
            isApproved: false,
        });
        testEntries.push(event);

        await collection.insertMany(testEntries.map((e) => e.toMongoDoc()));
    }
}
