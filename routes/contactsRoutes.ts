import { Router, Request, Response } from 'express';
import { validateIdParam, validateBody } from '../middlewares/contactsMiddlewares';
import contactsServices = require('../services/contactsServices')

export const contacts = Router();

// Define an API route to get all contacts and returns a table view.
contacts.get('/', async (req : Request, res : Response) => {
  try {
    const contacts = await contactsServices.getAllContacts();
    res.render('index', { contacts })
  } catch (error) {
    console.log(error);
    res.status(500).send('Error getting contacts');
  }
});

// Define a route for getting all contacts
contacts.get('/all', async (req : Request, res : Response) => {
  try {
    const contacts = await contactsServices.getAllContacts();
    res.status(200).json(contacts);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error getting contacts');
  }
});

// Define a route for getting a contact by ID
contacts.get('/:id', validateIdParam, async (req : Request, res : Response) => {
  try {
    const { id } = req.params;
    const contact = await contactsServices.getContactById(parseInt(id));
    if (!contact) {
      return res.status(404).send('Contact not found');
    }
    res.status(200).json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting contact');
  }
});

// Define an API route for creating new contacts
contacts.post('/', validateBody, async (req : Request, res : Response) => {
  try {
    const { firstname, lastname, genreId } = req.body;
    const newContact = await contactsServices.createContact({
      firstname,
      lastname,
      genreId,
    });
    res.status(201).json(newContact);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating new contact');
  }
});

// Define an API route to update a contact by ID
contacts.put('/:id', validateIdParam, validateBody, async (req : Request, res : Response) => {
  try {
    const { firstname, lastname, genreId } = req.body;
    const contactId = parseInt(req.params.id);
    
    const updatedContact = await contactsServices.updateContact(contactId, {
      firstname,
      lastname,
      genreId,
    });
    res.status(200).json(updatedContact);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating contact');
  }
});

// Define an API route to delete a contact by ID
contacts.delete('/:id', validateIdParam, async (req : Request, res : Response) => {
  try {
    const contactId = parseInt(req.params.id);
    await contactsServices.deleteContact(contactId);
    res.status(200).send(`Contact with ID ${contactId} deleted successfully`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting contact');
  }
});
