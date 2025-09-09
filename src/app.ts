import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/index';

const app = express();
app.use(bodyParser.json());
app.use('/api', router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Hotel app running on http://localhost:${PORT}/api`);
});