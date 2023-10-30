const app = require('./app');
const ViteExpress = require("vite-express");
const express = require('express');


const morgan = require('morgan');
app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log("<____JuiceBoxSTART____>");
  console.log(req.body);
  console.log("<_____JuiceBoxEND_____>");

  next();
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);