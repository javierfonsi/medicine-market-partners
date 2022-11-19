const { Message } = require('../models/message.models');
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/AppError');
const { Op } = require("sequelize");
const { filterObject } = require('../util/filterObject');
const { Chat } = require('../models/chat.models');

exports.postMessage = catchAsync(async (req, res, next) => {
  //const { text, userId, chatId, } = req.body;
  const { text, chatId } = req.body;
  //let { phone: userIdOrigin, id } = req.currentUser
  let { id: userIdOrigin } = req.currentUser
  //console.log(typeOf(chatId))

  let chats = await Chat.findOne({
    where: { 
    //id: chatId, status: 'active',  userIdDestination: id,  userIdOrigin: {[Op.or]: [{id},{}]}     
    id: chatId, status: 'active', 
      [Op.or] : [ 
        {
          userIdDestination: userIdOrigin
        }, 
        {
          userIdOrigin: userIdOrigin
        }
      ] 
    }
  })

  if(!chats){
    return next(new AppError(403, `You can't load message from another user` ))
  }

  //console.log("Javier", chats)

  const message = await Message.create({
    text, 
    userId: +userIdOrigin, 
    chatId
  });

  res.status(201).json({
    status: 'Success',
    data: { message }
  });
});

exports.getAllMessage = catchAsync(async (req, res, next) => {
  const allMessage = await Message.findAll({ 
    where: { status: 'active'} 
  });

  res.status(200).json({
    status: 'Success',
    data: { allMessage }
  });
});

exports.getMessageById = catchAsync( async(req, res, next) => {
    const { id } = req.message
    const message = await Message.findOne({
        where: { id, status: 'active'}
    })
    res.status(200).json({
        status: 'Success',
        data: { message }
    })
})

exports.getAllMessagesByChatId = catchAsync( async(req, res, next) => {
  const { id: chatId } = req.params
  const message = await Message.findAll({
      where: { chatId, status: 'active'}
  })
  res.status(200).json({
      status: 'Success',
      data: { message }
  })
})

exports.updateMessageById = catchAsync( async(req, res, next) => {
    const { message } = req
    const data = filterObject(
        req.body,
        'userId',
        'chatId'
    )

    await message.update({...data})
    res.status(204).json({
        status:'Success',
    })
})

        
exports.deleteMessageById = catchAsync( async(req, res, next) => {
    const { message } = req
    await message.update({status: 'deleted'})
    res.status(204).json({
        status: 'Success'
    })
})

