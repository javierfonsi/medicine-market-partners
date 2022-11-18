const { Chat } = require('../models/chat.models');
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/AppError');
//const { filterObject } = require('../util/filterObject');
const { Op } = require("sequelize");
const { filterObject } = require('../util/filterObject');

exports.postChat = catchAsync(async (req, res, next) => {
  const { userIdDestination } = req.body;
  const { phone: userIdOrigin } = req.currentUser //Explicacion de Sr Guillermo

  const chatFree = await Chat.findOne({
    where: { userIdOrigin:{ 
      [Op.or]: [userIdOrigin, userIdDestination],      
    },  
    userIdDestination:{ 
      [Op.or]: [userIdOrigin, userIdDestination],      
    }, status: 'active'}
  })


  let answerCode = 200

  if(!chatFree){
    var chat = await Chat.create({
      userIdDestination,
      userIdOrigin
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

