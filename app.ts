import express, { Application, Request, Response } from 'express';
var cors = require('cors');
import { contacts } from './routes/contactsRoutes';


const app: Application = express();

const corsOptions = {
  origin: 'http://localhost:4200',
  methods: 'GET, POST, PUT, DELETE',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());
app.set('view engine', 'ejs');  

app.use('/api/contacts', contacts);

app.get('/', async (req: Request, res: Response) => {
  res.status(200).send('Welcome on my contacts API, all routes are founbd under <base_url>/api/contacts/');
});

export {app};