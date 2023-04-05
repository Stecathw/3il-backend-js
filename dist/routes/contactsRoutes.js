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
Object.defineProperty(exports, "__esModule", { value: true });
exports.contacts = void 0;
const express_1 = require("express");
const contactsMiddlewares_1 = require("../middlewares/contactsMiddlewares");
const contactsServices = require("../services/contactsServices");
exports.contacts = (0, express_1.Router)();
// Define an API route to get all contacts and returns a table view.
exports.contacts.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contacts = yield contactsServices.getAllContacts();
        res.render('index', { contacts });
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Error getting contacts');
    }
}));
// Define a route for getting all contacts
exports.contacts.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contacts = yield contactsServices.getAllContacts();
        res.status(200).json(contacts);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Error getting contacts');
    }
}));
// Define a route for getting a contact by ID
exports.contacts.get('/:id', contactsMiddlewares_1.validateIdParam, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const contact = yield contactsServices.getContactById(parseInt(id));
        if (!contact) {
            return res.status(404).send('Contact not found');
        }
        res.status(200).json(contact);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error getting contact');
    }
}));
// Define an API route for creating new contacts
exports.contacts.post('/', contactsMiddlewares_1.validateBody, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname, lastname, genreId } = req.body;
        const newContact = yield contactsServices.createContact({
            firstname,
            lastname,
            genreId,
        });
        res.status(201).json(newContact);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error creating new contact');
    }
}));
// Define an API route to update a contact by ID
exports.contacts.put('/:id', contactsMiddlewares_1.validateIdParam, contactsMiddlewares_1.validateBody, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname, lastname, genreId } = req.body;
        const contactId = parseInt(req.params.id);
        const updatedContact = yield contactsServices.updateContact(contactId, {
            firstname,
            lastname,
            genreId,
        });
        res.status(200).json(updatedContact);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error updating contact');
    }
}));
// Define an API route to delete a contact by ID
exports.contacts.delete('/:id', contactsMiddlewares_1.validateIdParam, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contactId = parseInt(req.params.id);
        yield contactsServices.deleteContact(contactId);
        res.status(200).send(`Contact with ID ${contactId} deleted successfully`);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error deleting contact');
    }
}));
