import path from 'node:path';
import url from 'node:url';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
// middleware
import notFound from './middleware/notFound.mjs';
import errorHandler from './middleware/errorHandler.mjs';
// routes
import routes from './routes/index.mjs';
// mongoose connect
import connectDB from './utils/connect.mjs';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// middleware
app.use(express.json());
// session and auth strategy
app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 360000,
      httpOnly: true,
    },
  })
);
app.use(passport.session());

app.use(routes);

// not found and custom error handler
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('database connected...');
    app.listen(PORT, () => {
      console.log(`server running http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
