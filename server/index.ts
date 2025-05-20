import express, { Request, Response } from 'express';
import router from './src/routes';

const app = express();
app.use(express.json());
app.use('/', router)

const PORT = 3000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
