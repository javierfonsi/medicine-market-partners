const express =  require('express')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const cors = require('cors');
const path = require('path')

//controller
const { globalErrorHandler } = require('./controllers/error.controller')

//router
const { userRouter } = require('./routes/users.routes')
const { publishRouter } = require('./routes/publish.routes');
const { saleRouter } = require('./routes/sales.routes');

//util
const { AppError } = require('./util/AppError');

//swagger
const swaggerSpec = {
    definition:{
        openapi: '3.0.3',
        info: {
            title: "SocialNetworkTelemática API",
            description: "This is social network server, based on the OpenAPI 3.0 specification. The user create an account, then is logged and add the message, publisment and add sales in order to share with other user from farmaceutic laboratories, medical services and pharmacy",
            contact: {
                "name": "Javier Rodrigo Fonseca Leal",
                "url": "https://portafolio-javierfonseca.netlify.app/",
                "email": "javierrfl1985@gmail.com"
              },
            version: "1.0.0"
        },
        servers: [
            {
              "url":"http://localhost:4000",
              "description": "Development server"
            },
            {
              "url":"https://socialnetwork-telematica.herokuapp.com",
              "description": "Production server"
          }
        ]
    },
    apis: [`${path.join(__dirname, './routes/*.js')}`]
  }
  
//init server
const app = express()

//import json to receive requirements in json format
app.use(express.json())

//enable multipart form/data incoming data (to receive file)
express.urlencoded({ extended: true });

//Enable cors
app.use('*', cors());


//routes
app.use('/api/v1/users', userRouter)
//app.post('/api/v1/checkout', checkout)
app.use('/api/v1/publish', publishRouter)
app.use('/api/v1/sale', saleRouter)
app.use('/api/v1/doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))
app.use('*', (req, res, next) => {
    next(new AppError(404, "The `${req.originalUrl}` does not found in this server."))
})

// Error handler (err -> AppError)
app.use(globalErrorHandler)

module.exports = { app }