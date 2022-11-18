// Models
const { Chat } = require('../models/chat.models');

// Utils
const { AppError } = require('../util/AppError');
const { catchAsync } = require('../util/catchAsync');

exports.chatExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const chat = await Chat.findOne({
    where: { id, status: 'active' }
  });

  if (!chat) {
    return next(new AppError(404, `The selected chat id ${id} was not found`));
  }

  req.chat = chat;
  next();
});
