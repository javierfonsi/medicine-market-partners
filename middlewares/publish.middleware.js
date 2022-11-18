// Models
const { Publish } = require('../models/publish.models');

// Utils
const { AppError } = require('../util/AppError');
const { catchAsync } = require('../util/catchAsync');

exports.pusblishExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const publish = await Publish.findOne({
    where: { id, status: 'active' }
  });

  if (!chat) {
    return next(new AppError(404, `The selected publish id ${id} was not found`));
  }

  req.publish = publish;
  next();
});
