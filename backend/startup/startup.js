const morgan = require('morgan');

function startLogger(app) {
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else {
    app.use(morgan('combined'));
  }

  return app;
}

module.exports = {
  startLogger,
};
