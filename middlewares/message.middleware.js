// Models
const { Message } = require('../models/message.models');

// Utils
const { AppError } = require('../util/AppError');
const { catchAsync } = require('../util/catchAsync');

exports.messageExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  
  const message = await Message.findOne({
    where: { id, status: 'active' }
  });
  
  if (!message) {
    return next(new AppError(404, `The selected message id ${id} was not found`));
  }
    
  req.message = message;
  next();
});