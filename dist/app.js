"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
var cors = require('cors');
const contactsRoutes_1 = require("./routes/contactsRoutes");
const app = (0, express_1.default)();
exports.app = app;
const corsOptions = {
    origin: 'http://localhost:4200',
    methods: 'GET, POST, PUT, DELETE',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express_1.default.json());
app.set('view engine', 'ejs');
app.use('/api/contacts', contactsRoutes_1.contacts);
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send('Welcome on my contacts API, all routes are founbd under <base_url>/api/contacts/');
}));
