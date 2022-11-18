const express = require('express');

const {
postSale,
getAllSale,
getSaleById,
updateSaleById,
deleteSaleById
} = require('../controllers/sales.controller');

//const {
//userExist,
//protectAccountOwner
//} = require('../middlewares/user.middleware');

const { validateSession } = require('../middlewares/auth.middleware');
const { createSaleValidators, validateResult } = require('../middlewares/validators.middleware');
const { upload } = require('../util/multer');
const { saleExist } = require('../middlewares/sale.middleware');

const router = express.Router();

//*          userId:
//*              type: integer
//*              description: According to token delivered by user.

//Sale schema
/**
 * @swagger
 * components:
 *  securitySchemes:
 *   bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 *  schemas:
 *     sale:
 *        type: object
 *        properties:
 *          product:
 *              type: string
 *              description: This field must be name product.
 *              max-length: 50 chars
 *          description:
 *              type: string
 *              description: Fill with user's lastname.
 *              max-length: 50 chars
 *          price:
 *              type: integer
 *              description: According to price product.
 *          img_Url:
 *              type: string
 *              format: base64
 *              description: Menu photo
 *              max-length: 200 chars
 *        required:
 *          - product
 *          - description
 *          - price
 *          - img_Url
 *        example:
 *          name: Jabón Intimo
 *          Description: Jabón con ph balanceado para mujer
 *          price: 17.000
 *          img_Url: Intibon.jpg
 */

//Post a new sale
/**
 * @swagger
 * /api/v1/sale:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: create a new sale
 *    tags: [sale]
 *    requestBody:
 *      required: true
 *      content:
 *          multipart/form-data:
 *              schema:
 *                type: sale
 *                $ref: '#/components/schemas/sale'
 *    responses:
 *      201:
 *        description: new sale was created!
 *      400:
 *        description: some properties and/or their values are incorrect
 *      401:
 *        description: The token wasn't delivered Or invalid session
 */
router.use(validateSession);

router.post('/', createSaleValidators, validateResult, upload.single('img_Url'), postSale);
//router.post('/', upload.single('img_Url'), postSale);

// get all sale
/**
 * @swagger
 * /api/v1/sale:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: returns all sales which status are active
 *    tags: [sale]
 *    responses:
 *      200:
 *        description: Return all sales
 *        content:
 *          application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/sale'
 *      401:
 *        description: The token wasn't delivered Or invalid session.
 *      404:
 *        description: There are not sales until.
 */

router.get('/', getAllSale);

// get sale by Id
/**
 * @swagger
 * /api/v1/sale/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: returns a selected id sale which status is active
 *    tags: [sale]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: according to sale id
 *    responses:
 *      200:
 *        description: Return all sale from delivered id
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/sale'
 *      401:
 *        description: The token wasn't delivered Or invalid session.
 *      404:
 *        description: The delivered id was not found.
 */
router.get('/:id', saleExist, getSaleById);

// patch sale by Id
/**
 * @swagger
 * /api/v1/sale/{id}:
 *  patch:
 *    security:
 *      - bearerAuth: []
 *    summary: Allows update some sale properties
 *    tags: [sale]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: according to id sale
 *    requestBody: 
 *      description: Update sale with selected properties
 *      required: true
 *      content:
 *          multipart/form-data:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/sale'
 *    responses:
 *      204:
 *        description: The selected id was modified
 *      400:
 *        description: Some properties and/or their values are incorrect.
 *      401:
 *        description: The token wasn't delivered Or invalid session.
 *      404:
 *        description: The delivered id sale was not found.
 */

router.patch('/:id', upload.single('img_Url'), updateSaleById);

// delete sale by Id
/**
 * @swagger
 * /api/v1/sale/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: delete a menu using soft-delete
 *    tags: [sale]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Type the sale id to delete
 *    responses:
 *      204:
 *        description: The selected menu id was deleted.
 *      401:
 *        description: The token wasn't delivered Or invalid session.
 */
router.delete('/:id', deleteSaleById);


module.exports = {  saleRouter: router };