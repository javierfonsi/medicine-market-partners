// Models
const { User } = require('../models/users.models');
// Utils
const { AppError } = require('../util/AppError');
const { catchAsync } = require('../util/catchAsync');

exports.userExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    attributes: { exclude: ['password'] },
    where: { id, status: 'active' }
  });

  if (!user) {
    return next(new AppError(404, `The id ${id} selected was not found`));
  }

  req.user = user;
  next();
});

exports.protectAccountOwner = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { currentUser } = req;

  if (currentUser.id !== +id) {
    return next(new AppError(403, `You can't update or delete other users accounts`));
  }

  next();
});