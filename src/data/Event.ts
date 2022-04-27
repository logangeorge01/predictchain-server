/**
 * Event.ts - PredictChain event class.
 *
 * An Event contains the following
 * - id: A unique ID
 * - walletId: The wallet ID of the submitter
 * - eventName: The name of the event
 * - eventDesc: A description of the event
 *
 * @author Cody Rivera
 * @module
 */

import { ObjectId } from 'mongodb';

export class Event {
    id: string;
    eventPubkey: string;//add this to other things
    walletId: string;
    name: string;
    category: string;
    description: string;
    resolutionDate: string;
    imageLink?: string;
    isApproved: boolean;

    toResponse() {
        return {
            id: this.id,
            walletId: this.walletId,
            name: this.name,
            category: this.category,
            description: this.description,
            resolutionDate: this.resolutionDate,
            imageLink: this.imageLink,
            isApproved: this.isApproved,
        };
    }

    static fromMongoDoc(obj: any): Event {
        const event = new Event();
        Object.assign(event, {
            id: obj._id.toString(),
            walletId: obj.walletId,
            name: obj.name,
            category: obj.category,
            description: obj.description,
            resolutionDate: obj.resolutionDate,
            imageLink: obj.imageLink,
            isApproved: obj.isApproved,
        });
        return event;
    }

    toMongoDoc() {
        return {
            _id: new ObjectId(this.id),
            walletId: this.walletId,
            name: this.name,
            category: this.category,
            description: this.description,
            resolutionDate: this.resolutionDate,
            imageLink: this.imageLink,
            isApproved: this.isApproved,
        };
    }
}
