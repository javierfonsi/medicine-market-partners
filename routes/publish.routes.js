const express = require('express');
const { createPublish, maxpublish } = require('../controllers/publish.controller');

const {
postUser,
loginUser,
getAllUser,
} = require('../controllers/users.controller');


const { validateSession } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(validateSession);
router.post('/', createPublish)
router.get('/maxpublish', maxpublish);


module.exports = { publishRouter: router };