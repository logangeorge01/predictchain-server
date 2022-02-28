/**
 * Controller.ts - PredictChain business logic.
 * 
 * Implements the server API.
 *
 * @author Cody Rivera
 * @module
 */

import { Model } from "./Model";

export class Controller {
    private model: Model;

    constructor(model: Model) {
        this.model = model;
    }

    getEvents(req: Request, res: Response) {

    }

    getPendingEvents(req: Request, res: Response) {
        
    }

    getIsAdmin(req: Request, res: Response) {

    }

    postPendingEvents(req: Request, res: Response) {
        
    }

    postApproveEvent(req: Request, res: Response) {

    }
}