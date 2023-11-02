const app = require('./app');
const ViteExpress = require("vite-express");


const morgan = require('morgan');

app.use(morgan('dev'));

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);

module.exports = app;