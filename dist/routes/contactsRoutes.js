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
// Define an API route to get all contacts
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
exports.contacts.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contacts = yield contactsServices.getAllContacts();
        console.log(contacts);
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
        // If contact is not found, return a 404 error response
        if (!contact) {
            return res.status(404).send('Contact not found');
        }
        // Return the contact as a JSON response
        res.json(contact);
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
        // Create the new user in the database
        const newContact = yield contactsServices.createContact({
            firstname,
            lastname,
            genreId,
        });
        // Return the newly created contact
        res.status(201).json(newContact);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error creating new contact');
    }
}));
exports.contacts.put('/:id', contactsMiddlewares_1.validateIdParam, contactsMiddlewares_1.validateBody, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname, lastname, genreId } = req.body;
        const contactId = parseInt(req.params.id);
        // Update the contact in the database
        const updatedContact = yield contactsServices.updateContact(contactId, {
            firstname,
            lastname,
            genreId,
        });
        // Return the updated contact
        res.status(200).json(updatedContact);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error updating contact');
    }
}));
exports.contacts.delete('/:id', contactsMiddlewares_1.validateIdParam, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contactId = parseInt(req.params.id);
        // Delete the contact from the database
        yield contactsServices.deleteContact(contactId);
        // Return a success message
        res.status(200).send(`Contact with ID ${contactId} deleted successfully`);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error deleting contact');
    }
}));
