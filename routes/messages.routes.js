const express = require('express');

const {
postMessage,
getAllMessage,
getMessageById,
getAllMessagesByChatId,
updateMessageById,
deleteMessageById
} = require('../controllers/messages.controller');

//const {
//userExist,
//protectAccountOwner
//} = require('../middlewares/user.middleware');

const { validateSession } = require('../middlewares/auth.middleware');
const { createMessageValidators, validateResult } = require('../middlewares/validators.middleware');
const { messageExist } = require('../middlewares/message.middleware');
const { chatExist } = require('../middlewares/chat.middleware');

const router = express.Router();

//message schema
/**
 * @swagger
 * components:
 *  securitySchemes:
 *   bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 *  schemas:
 *     message:
 *        type: object
 *        properties:
 *          text:
 *              type: string
 *              description: This field must be the message content.
 *              max-length: 255 chars
 *          userId:
 *              type: integer
 *              description: Fill with user origin.
 *          chatId:
 *              type: integer
 *              description: According to identify chat.
 *        required:
 *          - text
 *          - chatId
 *        example:
 *          text: "Mensaje #1 de prueba"
 *          chatId: "1"
 *     messageCreated:
 *        type: object
 *        properties:
 *          id:
 *              type: integer
 *              description: According request is created.
 *          text:
 *              type: string
 *              description: According to content message.
 *              max-length: 255 char
 *          userId:
 *              type: integer
 *              description: Is extrated to token.
 *          chatId:
 *              type: integer
 *              description: This field must be the id chat.
 *          status:
 *              type: string
 *              description: According to chat current state .
 *              max-length: 10 char
 *        required:
 *          - text
 *          - chatId
 *        example:
 *          id: "1"
 *          text: "Esta es una prueba de verificación"
 *          userId: "3"
 *          chatId: "3"
 *          status: "active"
 *          createdAt: "2022-11-17T15:58:19.437Z"
 *          updatedAt: "2022-11-17T15:58:19.437Z"
 */

//Post a new message
/**
 * @swagger
 * /api/v1/message:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: create a new message
 *    tags: [message]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/message'
 *    responses:
 *      201:
 *        description: new message was created!
 *      400:
 *        description: some properties and/or their values are incorrect
 *      401:
 *        description: The token wasn't delivered Or invalid session
 *      403:
 *        description: There is not posible load message from another user
 */
router.use(validateSession);

router.post('/', createMessageValidators, validateResult, postMessage);
//router.post('/', postMessage);

// get all message
/**
 * @swagger
 * /api/v1/message:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: returns all message which status are active
 *    tags: [message]
 *    responses:
 *      200:
 *        description: Return all messages
 *        content:
 *          application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/messageCreated'
 *      401:
 *        description: The token wasn't delivered Or invalid session.
 *      404:
 *        description: There are not messages until.
 */

router.get('/', getAllMessage);

// get all message by chatId
/**
 * @swagger
 * /api/v1/message/chat/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: returns a selected id message which status is active
 *    tags: [message]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: according to chatId
 *    responses:
 *      200:
 *        description: Return all message from delivered chatId
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              $ref: '#/components/schemas/messageCreated'
 *      401:
 *        description: The token wasn't delivered Or invalid session.
 *      404:
 *        description: The delivered chatId was not found.
 */

 router.get('/chat/:id', chatExist, getAllMessagesByChatId);

// get message by Id
/**
 * @swagger
 * /api/v1/message/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: returns a selected id message which status is active
 *    tags: [message]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: according to message id
 *    responses:
 *      200:
 *        description: Return all message from delivered id
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/messageCreated'
 *      401:
 *        description: The token wasn't delivered Or invalid session.
 *      404:
 *        description: The delivered id was not found.
 */
router.use('/:id', messageExist)
router.get('/:id', getMessageById);



// patch message by Id
/**
 * @swagger
 * /api/v1/message/{id}:
 *  patch:
 *    security:
 *      - bearerAuth: []
 *    summary: Allows update some message properties
 *    tags: [message]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: according to id message
 *    requestBody: 
 *      description: Update message with selected properties
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/messageCreated'
 *    responses:
 *      204:
 *        description: The selected id was modified
 *      400:
 *        description: Some properties and/or their values are incorrect.
 *      401:
 *        description: The token wasn't delivered Or invalid session.
 *      404:
 *        description: The delivered id message was not found.
 */

router.patch('/:id', updateMessageById);

// delete message by Id
/**
 * @swagger
 * /api/v1/message/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: delete a message using soft-delete
 *    tags: [message]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Type the message id to delete
 *    responses:
 *      204:
 *        description: The selected message id was deleted.
 *      401:
 *        description: The token wasn't delivered Or invalid session.
 */
router.delete('/:id', deleteMessageById);


module.exports = {  messageRouter: router };