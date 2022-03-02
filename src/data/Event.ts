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
            wallet_id: this.walletId,
            name: this.name,
            category: this.category,
            description: this.description,
            resolution_date: this.resolutionDate,
            image_link: this.imageLink,
            is_approved: this.isApproved,
        };
    }

    static fromMongoDoc(obj: any): Event {
        const event = new Event();
        Object.assign(event, {
            id: obj._id.toString(),
            walletId: obj.wallet_id,
            name: obj.name,
            category: obj.category,
            description: obj.description,
            resolutionDate: obj.resolution_date,
            imageLink: obj.image_link,
            isApproved: obj.is_approved,
        });
        return event;
    }

    toMongoDoc() {
        return {
            _id: new ObjectId(this.id),
            wallet_id: this.walletId,
            name: this.name,
            category: this.category,
            description: this.description,
            resolution_date: this.resolutionDate,
            image_link: this.imageLink,
            is_approved: this.isApproved,
        };
    }
}
