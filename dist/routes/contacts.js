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
const contactService_1 = require("../services/contactService");
exports.contacts = (0, express_1.Router)();
// Define an API route to get all contacts
exports.contacts.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contacts = yield contactService_1.contactService.getAllContacts();
        res.status(200).json(contacts);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Error getting contacts');
    }
}));
// Define a route for getting a contact by ID
exports.contacts.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Find the contact with the provided ID
        const contact = yield contactService_1.contactService.getContactById(parseInt(id));
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
exports.contacts.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname, lastname, genreId } = req.body;
        // Create the new user in the database
        const newContact = yield contactService_1.contactService.createContact({
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
exports.contacts.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname, lastname, genreId } = req.body;
        const contactId = parseInt(req.params.id);
        // Update the contact in the database
        const updatedContact = yield contactService_1.contactService.updateContact(contactId, {
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
exports.contacts.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contactId = parseInt(req.params.id);
        // Delete the contact from the database
        yield contactService_1.contactService.deleteContact(contactId);
        // Return a success message
        res.status(200).send(`Contact with ID ${contactId} deleted successfully`);
    }
    catch (error) {
        console.error(error);
        res.status();
    }
}));
