// const prisma = require( '../db/prisma');
import {Contact, CreateContactInput} from '../types/contact';
import { prismaRepository } from '../repository/prismaRepository';

export const getAllContacts = async (): Promise<Contact[]> => {
  return await prismaRepository.getAllContacts();
};

export const getContactById = async (id: number): Promise<Contact | null> => {
  return await prismaRepository.getContactById(id);
};

export const createContact = async (contactInput: CreateContactInput): Promise<Contact> => {
  return await prismaRepository.createContact({
    ...contactInput
  });
};

export const updateContact = async (id: number, contactInput: CreateContactInput): Promise<Contact | null> => {
  return await prismaRepository.updateContact(
    id,
    {...contactInput}
)};

export const deleteContact = async (id: number): Promise<boolean> => {
  await prismaRepository.deleteContact(id);
  return true;
};
