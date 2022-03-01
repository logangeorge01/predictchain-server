/**
 * Controller.ts - PredictChain business logic.
 *
 * Implements the server API.
 *
 * @author Cody Rivera
 * @module
 */

import { Request, Response, Router } from 'express';
import { urlencoded, json } from 'body-parser';
import { Model } from './Model';

export class Controller {
    private model: Model;

    constructor(model: Model) {
        this.model = model;
    }

    /**
     * GET: /events
     * Returns a list of approved events on the server in JSON form.
     *
     * Params:
     * - limit (optional): specifies the number of results to return
     * - offset (optional): specifies the offset after which to start returning results
     *
     * Return:
     * { items: Array<Event>, limit: num, offset: num, total: num }
     */
    async getEvents(req: Request, res: Response) {
        console.log(`req: ${req}, res: ${res}`);
        res.send('{}');
    }

    /**
     * GET: /pending-events
     * Returns a list of pending events on the server in JSON form.
     *
     * Params:
     * - limit (optional): specifies the number of results to return
     * - offset (optional): specifies the offset after which to start returning results
     *
     * Authentication:
     * - X-API-Key: the user's Solana wallet id.
     *
     * Return:
     * { items: Array<Event>, limit: num, offset: num, total: num }
     *
     * Errors:
     * - HTTP 403 - Forbidden: if the user is not authenticated
     */
    async getPendingEvents(req: Request, res: Response) {
        console.log(`req: ${req}, res: ${res}`);
        res.send('{}');
    }

    /**
     * GET: /is-admin
     * Checks if the given user is an administrator
     *
     * Authentication:
     * - X-API-Key: the user's Solana wallet id.
     *
     * Return:
     * { result: bool }
     */
    async getIsAdmin(req: Request, res: Response) {
        console.log(`req: ${req}, res: ${res}`);
        res.send('{}');
    }

    /**
     * POST: /pending-events
     * Adds a new pending event to the server
     *
     * Body:
     * { event: Event }
     *
     * Authentication:
     * - X-API-Key: the user's Solana wallet id.
     *
     * Return:
     * { event: Event }
     */
    async postPendingEvents(req: Request, res: Response) {
        console.log(`req: ${req}, res: ${res}`);
        res.send('{}');
    }

    /**
     * POST: /approve-event/:id
     * Adds a new pending event to the server
     *
     * Params:
     * - :id: The event id to approve.
     *
     * Body: ignored
     *
     * Authentication:
     * - X-API-Key: the user's Solana wallet id.
     *
     * Return:
     * { event: Event }
     *
     * Errors:
     * - HTTP 403 - Forbidden: if the user is not authenticated
     */
    async postApproveEvent(req: Request, res: Response) {
        console.log(`req: ${req}, res: ${res}`);
        res.send('{}');
    }

    /**
     * DELETE: /events/:id
     * Deletes an event from the server.
     *
     * Params:
     * - :id: The event id to delete.
     *
     * Authentication:
     * - X-API-Key: the user's Solana wallet id.
     *
     * Return:
     * { event: Event }
     *
     * Errors:
     * - HTTP 403 - Forbidden: if the user is not authenticated
     */
    async deleteEvent(req: Request, res: Response) {
        console.log(`req: ${req}, res: ${res}`);
        res.send('{}');
    }

    setupRoutes(router: Router) {
        // Allow easy parsing of bodies
        router.use(urlencoded({ extended: false }));
        router.use(json());

        router.get('/events', async (req, res) => {
            await this.getEvents(req, res);
        });

        router.get('/pending-events', async (req, res) => {
            await this.getPendingEvents(req, res);
        });

        router.get('/is-admin', async (req, res) => {
            await this.getIsAdmin(req, res);
        });

        router.post('/pending-events', async (req, res) => {
            await this.getPendingEvents(req, res);
        });

        router.post('/approve-event/:id', async (req, res) => {
            await this.postApproveEvent(req, res);
        });

        router.delete('/events/:id', async (req, res) => {
            await this.deleteEvent(req, res);
        });
    }
}
