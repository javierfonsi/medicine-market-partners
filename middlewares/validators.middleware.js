const { body, validationResult } = require('express-validator');

// Util
const { AppError } = require('../util/AppError');
const { catchAsync } = require('../util/catchAsync');

// User validators

exports.createUserValidators = [
  body('name')
    .isString()
    .withMessage('The property must be name and contain a string')
    .notEmpty()
    .withMessage('Must provide a valid name'),
  body('lastName')
    .isString()
    .withMessage('lastName must be a string')
    .notEmpty()
    .withMessage('Must provide a valid lastName'),
  body('email')
    .isEmail()
    .withMessage('email must be a string')
    .notEmpty()
    .withMessage('Must provide a valid email account'),
  body('phone')
    .isString()
    .withMessage('phone must be a string')
    .notEmpty()
    .withMessage('Must provide a valid phone'),
  body('password')
    .isString()
    .withMessage('password must be a string')
    .notEmpty()
    .withMessage('Password must be alphanumeric values')
];
// END: user validators

// Publish validators
exports.createPublishValidators = [
  body('product')
    .isString()
    .withMessage('product must be a string')
    .notEmpty()
    .withMessage('Must provide a valid product'),
  body('description')
    .isString()
    .withMessage('description must be a string')
    .notEmpty()
    .withMessage('Must provide a valid description')
];

// END: Products validators

// createSaleValidators
exports.createSaleValidators = [
  body('product')
    .isString()
    .withMessage('product must be a string')
    .notEmpty()
    .withMessage('Must provide a valid product'),
  body('description')
    .isString()
    .withMessage('description must be a string')
    .notEmpty()
    .withMessage('Must provide a valid description'),
  body('price')
    .isNumeric()
    .withMessage('price must be a number')
    .custom((value) => value > 0)
    .withMessage('price must be greater than 0'),
];
// END: createSaleValidators

// MessageValidators
exports.createMessageValidators = [
  body('text')
    .isString()
    .withMessage('text must be a string')
    .notEmpty()
    .withMessage('Must provide a valid text'),
  //body('userId')
  //  .isNumeric()
  //  .withMessage('chatId must be a number')
  //  .custom((value) => value > 0)
  //  .withMessage('chatId must be greater than 0'),
  body('chatId')
    .isNumeric()
    .withMessage('chatId must be a number')
    .custom((value) => value > 0)
    .withMessage('chatId must be greater than 0')
];
// END: MessageValidators

exports.validateResult = catchAsync(async (req, res, next) => {
  // Validate req.body
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // [msg, msg, msg, msg] -> msg. msg. msg...
    const errorMsg = errors
      .array()
      .map(({ msg }) => msg)
      .join('. ');

    return next(new AppError(400, errorMsg));
  }

  next();
});
