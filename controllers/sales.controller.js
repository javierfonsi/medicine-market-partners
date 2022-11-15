const { ref, getDownloadURL, uploadBytes } = require('firebase/storage');
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/AppError');
const { Sale } = require('../models/sales.models');
const { filterObject } = require('../util/filterObject');
const { storage } = require('../util/firebase');

exports.postSale = catchAsync(async (req, res, next) => {
    const { product, description, price, img_Url } = req.body;
    const { id } = req.currentUser;
 
    // Upload img to Cloud Storage (Firebase)
   const imgRef = ref(storage, `products/${Date.now()}-${req.file.originalname}`);
   const result = await uploadBytes(imgRef, req.file.buffer);
 
   
    const sale = await Sale.create({
       product,
       description,
       price,
       userId: id,
       img_Url: result.metadata.fullPath
    });
    res.status(201).json({
       status: 'Success',
       data: { sale }
    });
 });

exports.getAllSale = catchAsync(async (req, res, next) => {
   const sale = await Sale.findAll({ where: { status: 'active' } });

   if(sale.length ===0 ){
      return next(new AppError(404, 'There are not sale until'))
   }

     // Promise[]
  const salesPromises = sale.map(
   async ({
     id,
     product,
     description,
     price,
     userId,
     img_Url,
     createdAt,
     updatedAt,
   }) => {
     const imgRef = ref(storage, img_Url);

     const imgDownloadUrl = await getDownloadURL(imgRef);

     return {
       id,
       product,
       description,
       price,
       userId,
       img_Url: imgDownloadUrl,
       createdAt,
       updatedAt,
     };
   }
 );

 const resolvedSales = await Promise.all(salesPromises);

// const moviesMapeado = resolvedMenus.map((menu) => {
//   menu.actorsinmovies = null;
//   return movie;
// });

   res.status(200).json({
      status: 'Success',
      data: {
         menu: resolvedSales
      }
   });
});

exports.getSaleById = catchAsync(async (req, res, next) => {
   const { sale } = req;
   console.log("Javier ", req.currentUser.id)

   const imgRef = ref(storage, sale.img_Url);
   
   currentSale.img_Url = await getDownloadURL(imgRef);

   res.status(200).json({
      status: 'Success',
      data: {
         currentSale
      }
   });
});

exports.updateSaleById = catchAsync(async (req, res, next) => {
   //const { id } = req.params;

   const { id } = req.currentUser;
   //const {name, description, price} = req.body
   const sale = await Sale.findOne({ where: { id, status: 'active' } });
   if (!sale) {
      return next(new AppError(404, 'The delivered id was not found.'));
   }
   const { product, description, price, img_Url } = req.body;
   //const { product, description, price } = req.body;
   console.log(product, description, price)
   //console.log("Javier", req.body)

   const data = filterObject(req.body, 'product', 'description', 'price');
   //await menu.update({...menu, ...req.body})
   //await menu.update({ ...menu, ...data });
   await sale.update({ ...data });

   // Upload img to Cloud Storage (Firebase)
  const imgRef = ref(storage, `products/${Date.now()}-${req.file.originalname}`);
  const result = await uploadBytes(imgRef, req.file.buffer);

  
   await sale.update({
      product,
      description,
      price,
      img_Url: result.metadata.fullPath
   });

   res.status(200).json({
      status: 'Success',
      data: { sale }
   });
});

exports.deleteSaleById = catchAsync(async (req, res, next) => {
   const { id } = req.params;
   const sale = await Sale.findOne({ where: { id, status: 'active' } });
   if (!sale) {
      return next(new AppError(404, 'The delivered Id was not found.'));
   }
   await menu.update({ status: 'deleted' });
   res.status(201).json({
      status: 'Success',
      message: `The Id ${sale.id} was delete correctly`
   });
});

