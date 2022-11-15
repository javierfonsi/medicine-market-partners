const { Publish } = require('../models/publish.models')
const { catchAsync } = require('../util/catchAsync')
const { AppError } = require('../util/AppError')


exports.createPublish = catchAsync(async (req, res, next) => {
    const { title, product, description } = req.body;
    const { id } = req.currentUser;
  
    const newProduct = await Publish.create({
      title,
      product,
      description,
      userId: id
    });
  
    res.status(201).json({
      status: 'success',
      data: { newProduct }
    });
  });

//exports.maxpublish = catchAsync( async (req, res, next) =>  {
//    const publish = await Publish.findAll({ where: { status: 'active'} })

//})