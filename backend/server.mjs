import path from 'node:path';
import url from 'node:url';
import express from 'express';
// middleware
import notFound from './middleware/notFound.mjs';
import errorHandler from './middleware/errorHandler.mjs';
// routes
import routes from './routes/index.mjs';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// middleware
app.use(express.json());

app.use(routes);
// not found and custom error handler
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`server running http://localhost:${PORT}`);
    });
  } catch (error) {}
};

start();
