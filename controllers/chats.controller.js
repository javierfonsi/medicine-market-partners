const { Chat } = require('../models/chat.models');
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/AppError');
//const { filterObject } = require('../util/filterObject');
const { Op } = require("sequelize");
const { filterObject } = require('../util/filterObject');
const { User } = require('../models/users.models');

exports.postChat = catchAsync(async (req, res, next) => {
  const { userIdDestination } = req.body;

  const userDestination = await User.findOne({
    where: { phone: userIdDestination, status: 'active' }
  })

  if(!userDestination){
    return next(new AppError(404, `The selected user id ${userIdDestination} was not found`));
  }

  //console.log("Aquivamos")
  //const { id: userIdOrigin } = req.currentUser //Explicacion de Sr Guillermo
  const { id } = req.currentUser //Explicacion de Sr Guillermo

  const chatFree = await Chat.findOne({
    where: { userIdOrigin:{ 
      [Op.or]: [id, userDestination.id],      
    },  
    userIdDestination:{ 
      [Op.or]: [id, userDestination.id],      
    }, status: 'active'}
  })

  let answerCode = 200

  if(!chatFree){
    var chat = await Chat.create({
      userIdDestination: userDestination.id,
      userIdOrigin: +id
    });
    answerCode = 201
  }

  res.status(answerCode).json({
    status: 'Success',
    data: { chat : chatFree || chat }
  });
});

exports.getAllChat = catchAsync(async (req, res, next) => {
  const allChat = await Chat.findAll({ 
    where: { status: 'active', }, 
  });

  res.status(200).json({
    status: 'Success',
    data: { allChat }
  });
});

exports.getChatById = catchAsync( async(req, res, next) => {
    const { id } = req.chat
    const chat = await Chat.findOne({
        where: { id, status: 'active'}
    })
    res.status(200).json({
        status: 'Success',
        data: { chat }
    })

})
exports.updateChatById = catchAsync( async(req, res, next) => {
    const { chat } = req
    const data = filterObject(
        req.body,
        'userIdDestination'
    )

    await chat.update({...data})
    res.status(204).json({
        status:'Success',
    })
})
exports.deleteChatById = catchAsync( async(req, res, next) => {
    const { chat } = req
    await chat.update({status: 'deleted'})
    res.status(204).json({
        status: 'Success'
    })
})

