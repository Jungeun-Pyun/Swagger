var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var goodsRouter = require('./routes/goods');
const userImgeRouter = require('./routes/user_img')
const goodsImgeRouter = require('./routes/goods_img')
const delivInfoRouter = require('./routes/deliv_info')
const brandRouter = require('./routes/brand')
const reviewRouter = require('./routes/review')
const categoryRouter = require('./routes/category')
const cartRouter = require('./routes/cart')
const ordersRouter = require('./routes/orders')
const paymentRouter = require('./routes/payment')

var app = express();

// swagger setup
const swaggerUi = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')

const swaggerDefinition = {
  info: {
    title: 'Node 3rd Server API',
    version: '1.0.0',
    description: 'API description',
},
  host: 'localhost:4000',
  basePath: '/',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./server/schemas/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
const cors = require('cors')
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter); //end point는 테이블과 일치시키는 것이 좋음
app.use('/goods', goodsRouter);
app.use('/user_img', userImgeRouter)
app.use('/goods_img', goodsImgeRouter)
app.use('/deliv_info', delivInfoRouter)
app.use('/brand', brandRouter)
app.use('/review', reviewRouter)
app.use('/category', categoryRouter)
app.use('/cart', cartRouter)
app.use('/orders', ordersRouter)
app.use('/payment',paymentRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
