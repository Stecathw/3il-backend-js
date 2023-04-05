import express, { Application, Request, Response } from 'express';
import { contacts } from './routes/contactsRoutes';

const app: Application = express();

app.use(express.json());
app.set('view engine', 'ejs');  

app.use('/api/contacts', contacts);

app.get('/', async (req: Request, res: Response) => {
  res.status(200).send('Welcome on my contacts API, all routes are founbd under <base_url>/api/contacts/');
});

export {app};