const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const { User } = require('../models/users.models');
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/AppError');
//const { filterObject } = require('../util/filterObject');
const { Op } = require("sequelize");

dotenv.config({ path: './config.env' });

exports.postUser = catchAsync(async (req, res, next) => {
  const { name, lastName, email, password, phone, profile } = req.body;

  const salt = await bcrypt.genSaltSync(12);
  const hashpassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    lastName,
    email,
    password: hashpassword,
    phone,
    profile
  });

  user.password = undefined;
  res.status(201).json({
    status: 'Success',
    data: { user }
  });
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  let user = await User.findOne({
    where: { email, status: 'active' }
  });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(
      new AppError('400', 'Credential are incorrect, please verify it.')
      );
    }
    
    //Add JWT
    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE_IN
    });
    
  user = await User.findOne({ where:{ email, status:'active'}, attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'email'] }

    //attributes: { include: ['name', 'lastName', 'status'] }
  })
  
 
  res.status(200).json({
    status: 'Success',
    data: { token, userData: user }
  });
});

exports.getAllUser = catchAsync(async (req, res, next) => {
  const allUser = await User.findAll({ 
    attributes: { exclude: ['password']},
    where: { status: 'active', [Op.not]: [{id: [req.currentUser.id]}] }, 
  });

  res.status(200).json({
    status: 'Success',
    data: { allUser }
  });
});

