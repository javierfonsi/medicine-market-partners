const express = require('express');

const {
postChat,
getAllChat,
getChatById,
updateChatById,
deleteChatById
} = require('../controllers/chats.controller');

//const {
//userExist,
//protectAccountOwner
//} = require('../middlewares/user.middleware');

const { validateSession } = require('../middlewares/auth.middleware');
//const { createSaleValidators, validateResult } = require('../middlewares/validators.middleware');
//const { upload } = require('../util/multer');
const { chatExist } = require('../middlewares/chat.middleware');

const router = express.Router();

//chat schema
/**
 * @swagger
 * components:
 *  securitySchemes:
 *   bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 *  schemas:
 *     chat:
 *        type: object
 *        properties:
 *          userIdDestination:
 *              type: string
 *              description: This field must be the destination userId.
 *              max-length: 15 chars
 *          userId:
 *              type: string
 *              description: This field must be the origin userId.
 *              max-length: 15 chars
 *        required:
 *          - userIdDestination
 *          - token
 *        example:
 *          userIdDestination: "57 3016313322"
 *     chatCreated:
 *        type: object
 *        properties:
 *          id:
 *              type: integer
 *              description: According request is created.
 *          userIdDestination:
 *              type: string
 *              description: This field must be the destination userId.
 *              max-length: 15 chars
 *          userId:
 *              type: string
 *              description: Is extrated to token.
 *              max-length: 15 chars
 *          status:
 *              type: string
 *              description: According to chat current state .
 *              max-length: 10 char
 *        required:
 *          - userIdDestination
 *        example:
 *          id: "1"
 *          userIdDestination: "57 3016313322"
 *          userId: "3"
 *          status: "active"
 *          createdAt: "2022-11-17T15:58:19.437Z"
 *          updatedAt: "2022-11-17T15:58:19.437Z"
 */

//Post a new chat
/**
 * @swagger
 * /api/v1/chat:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: create a new chat
 *    tags: [chat]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/chat'
 *    responses:
 *      201:
 *        description: new chat was created!
 *      400:
 *        description: some properties and/or their values are incorrect
 *      401:
 *        description: The token wasn't delivered Or invalid session
 */
router.use(validateSession);

//router.post('/', createSaleValidators, validateResult, upload.single('img_Url'), postSale);
router.post('/', postChat);

// get all chat
/**
 * @swagger
 * /api/v1/chat:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: returns all chat which status are active
 *    tags: [chat]
 *    responses:
 *      200:
 *        description: Return all chat
 *        content:
 *          application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/chatCreated'
 *      401:
 *        description: The token wasn't delivered Or invalid session.
 *      404:
 *        description: There are not chats until.
 */

router.get('/', getAllChat);

// get chat by Id
/**
 * @swagger
 * /api/v1/chat/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: returns a selected id sale which status is active
 *    tags: [chat]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: according to chat id
 *    responses:
 *      200:
 *        description: Return chat according to delivered id
 *        content:
 *            schema:
 *              application/json:
 *              type: object
 *              $ref: '#/components/schemas/chatCreated'
 * 
 *      401:
 *        description: The token wasn't delivered Or invalid session.
 *      404:
 *        description: The delivered id was not found.
 */

router.use('/:id', chatExist);
//router.route('/:id').get(getChatById).patch(updateChatById).delete(deleteChatById);
router.get('/:id', getChatById);

// patch chat by Id
/**
 * @swagger
 * /api/v1/chat/{id}:
 *  patch:
 *    security:
 *      - bearerAuth: []
 *    summary: Allows update some chat properties
 *    tags: [chat]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Type the chat id to update
 *    requestParams: 
 *      description: Update chat with selected properties
 *      required: true

 *    responses:
 *      204:
 *        description: The selected id was modified
 *      400:
 *        description: Some properties and/or their values are incorrect.
 *      401:
 *        description: The token wasn't delivered Or invalid session.
 *      404:
 *        description: The delivered id chat was not found.
 */

router.patch('/:id', updateChatById);

// delete chat by Id
/**
 * @swagger
 * /api/v1/chat/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: delete a chat using soft-delete
 *    tags: [chat]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Type the chat id to delete
 *    responses:
 *      204:
 *        description: The selected chat id was deleted.
 *      401:
 *        description: The token wasn't delivered Or invalid session.
 */
router.delete('/:id', deleteChatById);


module.exports = {  chatRouter: router };