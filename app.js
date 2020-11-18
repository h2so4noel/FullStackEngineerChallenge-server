
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import logger from 'morgan';
import cors from 'cors';
import config from './config/config.js';
import routes from './routes/index.js';
import bodyParser from 'body-parser';

const app = express();
const __dirname = path.resolve();

mongoose.connect(config.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/reviews', routes);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  // set error for development build only
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is on fire with port ${PORT}.`);
});

export default app;