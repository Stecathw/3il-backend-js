import express, { Application, Request, Response } from 'express';
import { contacts } from './routes/contactsRoutes';

const app: Application = express();

app.use(express.json());
app.set('view engine', 'ejs');

const port: number = 3000;

app.use('/api/contacts', contacts);

app.get('/', async (req: Request, res: Response) => {
  res.status(200).send('Welcome on my contacts API, all routes are founbd under <base_url>/api/contacts/');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
