require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const routes = require('./routes/index');
const handleErrors = require('./middlewares/handleerr');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001, MONGOBASE = 'mongodb://localhost:27017/moviesdb' } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(helmet());

app.use(cors());

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(handleErrors);

mongoose.connect(MONGOBASE);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
