const express = require('express');
const { createPublish, maxpublish } = require('../controllers/publish.controller');

const {
postUser,
loginUser,
getAllUser,
} = require('../controllers/users.controller');


const { validateSession } = require('../middlewares/auth.middleware');
const { createPublishValidators, validateResult } = require('../middlewares/validators.middleware');

//publish schema
/**
 * @swagger
 * components:
 *  securitySchemes:
 *   bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 *  schemas:
 *     publish:
 *        type: object
 *        properties:
 *          product:
 *              type: string
 *              description: This field must be product name
 *              max-length: 50 chars
 *          description:
 *              type: string
 *              description: Description product
 *              max-length: 255 chars
 *          userId:
 *              type: Integer
 *              description: identify the product with a user
 *        required:
 *          - product
 *          - description
 *          - userId
 *        example:
 *          product: Advil
 *          description: medicamento de uso general
 *          userId: 1
 */

const router = express.Router();

router.use(validateSession);

//Create publish
/**
 * @swagger
 * /api/v1/publish:
 *  post:
 *    security:
 *      - bearerAuth: [] 
 *    summary: allows create a publish 
 *    tags: [publish]
 *    requestBody: 
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/publish'
 *    responses:
 *      201:
 *        description: return the info publish created
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  items:
 *                    $ref: '#/components/schemas/publish'
 *      400:
 *        description: Some properties and/or their values are incorrect.
 *      401:
 *        description: The token wasnot delivere.
 */
router.post('/', createPublishValidators, validateResult, createPublish)
router.get('/maxpublish', maxpublish);


module.exports = { publishRouter: router };