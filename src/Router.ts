/**
 * Router.ts - PredictChain path router.
 *
 * Defines the server API.
 *
 * @author Cody Rivera
 * @module
 */

import { Router } from 'express'
import { urlencoded, json } from 'body-parser'
import { Controller } from './Controller'

export function setupRouter(controller: Controller, router: Router) {
    // Allow easy parsing of bodies
    router.use(urlencoded({ extended: false }))
    router.use(json())

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
    router.get('/events', (req, res) => {})

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
    router.get('/pending-events', (req, res) => {})

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
    router.get('/is-admin', (req, res) => {})

    /**
     * POST: /pending-events
     * Adds a new pending event to the server
     *
     * Body:
     * { wallet_id: string, event: Event }
     *
     * Authentication:
     * - X-API-Key: the user's Solana wallet id.
     *
     * Return:
     * { event: Event }
     */
    router.post('/pending-events', (req, res) => {})

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
    router.post('/approve-event/:id', (req, res) => {})
}
