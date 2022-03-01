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

import { ObjectId } from "mongodb";

export class Event {
    id: string;
    walletId: string;
    eventName: string;
    eventDesc: string;
    isApproved: boolean;

    constructor();
    constructor(walletId: string, eventName: string, eventDesc: string); 

    constructor(...args: any[]) {
        if (args.length == 3) {
            this.id = new ObjectId().toString();
            this.walletId = args[0];
            this.eventName = args[1];
            this.eventDesc = args[2];
            this.isApproved = false;
        }
    }

    static fromPost(body: any): Event {
        return new Event(body.wallet_id, body.event_name, body.event_desc);
    }

    toResponse() {
        return {
            id: this.id,
            wallet_id: this.walletId,
            event_name: this.eventName,
            event_desc: this.eventDesc,
            is_approved: this.isApproved,
        };
    }

    static fromMongoDoc(obj: any): Event {
        const event = new Event();
        event.id = obj._id.toString();
        event.walletId = obj.wallet_id;
        event.eventName = obj.event_name;
        event.eventDesc = obj.event_desc;
        event.isApproved = obj.is_approved;
        return event;
    }

    toMongoDoc() {
        return {
            _id: new ObjectId(this.id),
            wallet_id: this.walletId,
            event_name: this.eventName,
            event_desc: this.eventDesc,
            is_approved: this.isApproved,
        };
    }
}
