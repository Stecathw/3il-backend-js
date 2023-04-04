import { Router } from 'express';
const contactsServices = require('../services/contactsServices')

export const contacts = Router();

// Define an API route to get all contacts
contacts.get('/', async (req, res) => {
  try {
    const contacts = await contactsServices.getAllContacts();
    console.log(contacts)
    res.render('index', { contacts })
    // res.status(200).json(contacts);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error getting contacts');
  }
});

contacts.get('/all', async (req, res) => {
  try {
    const contacts = await contactsServices.getAllContacts();
    console.log(contacts)
    // res.render('index', { contacts })
    res.status(200).json(contacts);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error getting contacts');
  }
});

// Define a route for getting a contact by ID
contacts.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Controls

    // Find the contact with the provided ID
    const contact = await contactsServices.getContactById(parseInt(id));

    // If contact is not found, return a 404 error response
    if (!contact) {
      return res.status(404).send('Contact not found');
    }

    // Return the contact as a JSON response
    res.json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting contact');
  }
});

// Define an API route for creating new contacts
contacts.post('/', async (req, res) => {
  try {
    const { firstname, lastname, genreId } = req.body;

    // Create the new user in the database
    const newContact = await contactsServices.createContact({
      firstname,
      lastname,
      genreId,
    });

    // Return the newly created contact
    res.status(201).json(newContact);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating new contact');
  }
});

contacts.put('/:id', async (req, res) => {
  try {
    const { firstname, lastname, genreId } = req.body;
    const contactId = parseInt(req.params.id);

    // Update the contact in the database
    const updatedContact = await contactsServices.updateContact(contactId, {
      firstname,
      lastname,
      genreId,
    });

    // Return the updated contact
    res.status(200).json(updatedContact);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating contact');
  }
});

contacts.delete('/:id', async (req, res) => {
  try {
    const contactId = parseInt(req.params.id);

    // Delete the contact from the database
    await contactsServices.deleteContact(contactId);

    // Return a success message
    res.status(200).send(`Contact with ID ${contactId} deleted successfully`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting contact');
  }
});
