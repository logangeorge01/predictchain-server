/**
 * Controller.ts - PredictChain business logic.
 *
 * Implements the server API.
 *
 * @author Cody Rivera, Bryan Whitehurst
 * @module
 */

import { Request, Response, Router } from 'express';
import { urlencoded, json } from 'body-parser';
import { Model } from './Model';
import { Event } from './data/Event';
import { AuthError } from './Auth';
import { PrivConfig } from './privconfig';

export class Controller {
    private model: Model;

    constructor(model: Model) {
        this.model = model;
    }

    /**
     * GET: /api/events
     * Returns a list of approved events on the server in JSON form.
     *
     * Params:
     * - limit (optional): specifies the number of results to return
     * - offset (optional): specifies the offset after which to start returning results
     *
     * Return:
     * { items: Array<Event>, limit?: num, offset?: num, total: num }
     */
    async getEvents(req: Request, res: Response) {
        const limit = req.query['limit']
            ? parseInt(req.query['limit'] as string)
            : undefined;
        const offset = req.query['offset']
            ? parseInt(req.query['offset'] as string)
            : undefined;

        const tuple = await this.model.getEvents(limit, offset);
        const items = tuple[0].map((e) => e.toResponse());
        const total = tuple[1];

        res.json({
            items: items,
            limit: limit,
            offset: offset,
            total: total,
        });
    }

    /**
     * GET: /api/pending-events
     * Returns a list of pending events on the server in JSON form.
     *
     * Params:
     * - limit (optional): specifies the number of results to return
     * - offset (optional): specifies the offset after which to start returning results
     *
     * Authentication:
     * - x-api-key: the user's Solana wallet id.
     *
     * Return:
     * { items: Array<Event>, limit?: num, offset?: num, total: num }
     *
     * Errors:
     * - HTTP 403 - Forbidden: if the user is not authenticated
     */
    async getPendingEvents(req: Request, res: Response) {
        const walletId = req.header('x-api-key');
        try {
            const limit = req.query['limit']
                ? parseInt(req.query['limit'] as string)
                : undefined;
            const offset = req.query['offset']
                ? parseInt(req.query['offset'] as string)
                : undefined;

            const tuple = await this.model.getPendingEvents(
                walletId,
                limit,
                offset
            );
            const items = tuple[0].map((e) => e.toResponse());
            const total = tuple[1];

            res.json({
                items: items,
                limit: limit,
                offset: offset,
                total: total,
            });
        } catch (e) {
            if (e instanceof AuthError) {
                // wallet_id unapproved
                res.status(403).send('Not an admin');
            } else {
                throw e;
            }
        }
    }

    /**
     * GET: /api/is-admin
     * Checks if the given user is an administrator
     *
     * Authentication:
     * - x-api-key: the user's Solana wallet id.
     *
     * Return:
     * { result: bool }
     */
    async getIsAdmin(req: Request, res: Response) {
        const walletId = req.header('x-api-key');
        const isAdmin = PrivConfig.admins.includes(walletId);
        res.json({ result: isAdmin });
    }

    /**
     * POST: /api/pending-events
     * Adds a new pending event to the server
     *
     * Body:
     * { event: Event }
     *
     * Authentication:
     * - x-api-key: the user's Solana wallet id.
     *
     * Return:
     * { event: Event }
     */
    async postPendingEvents(req: Request, res: Response) {
        const event = Event.fromPost(req.body["event"]);
        await this.model.addPendingEvent(event);
        res.json({ event: event });
    }

    /**
     * POST: /api/approve-event/:id
     * Adds a new pending event to the server
     *
     * Params:
     * - :id: The event id to approve.
     *
     * Body: ignored
     *
     * Authentication:
     * - x-api-key: the user's Solana wallet id.
     * Extract from header
     *
     * Return:
     * { event: Event }
     *
     * Errors:
     * - HTTP 403 - Forbidden: if the user is not authenticated
     */
    async postApproveEvent(req: Request, res: Response) {
        const wallet_id = req.header('x-api-key');

        try {
            const e1 = this.model.approveEvent(wallet_id, req.body.id);
            res.json({ event: e1 });
        } catch (e) {
            if (e instanceof AuthError) {
                // wallet_id unapproved
                res.status(403).send('Not an admin');
            } else {
                throw e;
            }
        }
    }

    /**
     * DELETE: /api/events/:id
     * Deletes an event from the server.
     *
     * Params:
     * - :id: The event id to delete.
     *
     * Authentication:
     * - x-api-key: the user's Solana wallet id.
     *
     * Return:
     * { event: Event }
     *
     * Errors:
     * - HTTP 403 - Forbidden: if the user is not authenticated
     */
    async deleteEvent(req: Request, res: Response) {
        const wallet_id = req.header('x-api-key');
        try {
            const e1 = this.model.deleteEvent(wallet_id, req.params.id);
            res.json({ event: e1 });
        } catch (e) {
            if (e instanceof AuthError) {
                // wallet_id unapproved
                res.status(403).send('Not an admin');
            } else {
                throw e;
            }
        }
    }

    setupRoutes(router: Router) {
        // Allow easy parsing of bodies
        router.use(urlencoded({ extended: false }));
        router.use(json());

        router.get('/events', async (req, res, next) => {
            try {
                await this.getEvents(req, res);
            } catch (e) {
                next(e);
            }
        });

        router.get('/pending-events', async (req, res, next) => {
            try {
                await this.getPendingEvents(req, res);
            } catch (e) {
                next(e);
            }
        });

        router.get('/is-admin', async (req, res, next) => {
            try {
                await this.getIsAdmin(req, res);
            } catch (e) {
                next(e);
            }
        });

        router.post('/pending-events', async (req, res, next) => {
            try {
                await this.postPendingEvents(req, res);
            } catch (e) {
                next(e);
            }
        });

        router.post('/approve-event/:id', async (req, res, next) => {
            try {
                await this.postApproveEvent(req, res);
            } catch (e) {
                next(e);
            }
        });

        router.delete('/events/:id', async (req, res, next) => {
            try {
                await this.deleteEvent(req, res);
            } catch (e) {
                next(e);
            }
        });
    }
}
