const express = require('express');

const {
postUser,
loginUser,
getAllUser,
} = require('../controllers/users.controller');

//const {
//userExist,
//protectAccountOwner
//} = require('../middlewares/user.middleware');

const { validateSession } = require('../middlewares/auth.middleware');
const { createUserValidators, validateResult } = require('../middlewares/validators.middleware');

const router = express.Router();

//adminUsers schema
/**
 * @swagger
 * components:
 *  securitySchemes:
 *   bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 *  schemas:
 *     user:
 *        type: object
 *        properties:
 *          name:
 *              type: string
 *              description: This field must be name user.
 *              max-length: 50 chars
 *          lastName:
 *              type: string
 *              description: Fill with user's lastname.
 *              max-length: 50 chars
 *          email:
 *              type: string
 *              description: According to email from user.
 *              max-length: 50 chars
 *          password:
 *              type: string
 *              description: Fill with user's password.
 *              max-length: 15 chars
 *          phone:
 *              type: string
 *              description: Fill with user's phone.
 *              max-length: 15 chars
 *          profile:
 *              type: string
 *              description: Fill with user's profile.
 *              max-length: 15 chars
 *        required:
 *          - name
 *          - lastName
 *          - email
 *          - password
 *          - phone
 *          - profile
 *        example:
 *          name: Albert
 *          lastName: Einstein
 *          email: albert.w@gmail.com
 *          password: "1234@"
 *          phone: 51 3125900370
 *          profile: Laboratorios
 *     loggedUser:
 *        type: object
 *        properties:
 *          email:
 *              type: string
 *              description: According to email from employed.
 *              max-length: 50 chars
 *          password:
 *              type: string
 *              description: Fill with employee's password.
 *              max-length: 15 chars
 *        required:
 *          - email
 *          - password
 *        example:
 *          email: albert.w@gmail.com
 *          password: "1234@"
 */

//Post a new AdminUser
/**
 * @swagger
 * /api/v1/users:
 *  post:
 *    summary: create a new adminUser
 *    tags: [user]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/user'
 *    responses:
 *      201:
 *        description: new user was created!
 *      400:
 *        description: some properties and/or their values are incorrect
 */
router.post('/', createUserValidators, validateResult, postUser);

//Login adminUser
/**
 * @swagger
 * /api/v1/users/login:
 *  post:
 *    summary: allow auth an adminUser
 *    tags: [user]
 *    requestBody: 
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/loggedUser'
 *    responses:
 *      200:
 *        description: return a valid token  
 *      201:
 *        description: new adminUser was created!
 *      400:
 *        description: some properties and/or their values are incorrect
 */
router.post('/login', loginUser);


// get all users
/**
 * @swagger
 * /api/v1/users:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: returns all adminUser which status are active
 *    tags: [user]
 *    responses:
 *      200:
 *        description: All adminUser
 *        content:
 *          application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/user'
 *      401:
 *        description: Invalid session.
 */

router.use(validateSession);
router.get('/', getAllUser);

module.exports = { userRouter: router };
