// Models
const { Sale } = require('../models/sales.models');

// Utils
const { AppError } = require('../util/appError');
const { catchAsync } = require('../util/catchAsync');

exports.saleExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  //console.log(id, "vamos bien")
  
  const sale = await Sale.findOne({
    where: { id, status: 'active' }
  });
  
  if (!sale) {
    return next(new AppError(404, `The selected sale id ${id} was not found`));
  }
    
  req.sale = sale;
  next();
});