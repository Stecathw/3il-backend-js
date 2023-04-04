import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export const prismaRepository = {
  async getAllContacts(): Promise<User[]> {
    return await prisma.user.findMany({
      include: { Genre: true },
    });
  },

  async getContactById(id: number): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id },
      include: { Genre: true },
    });
  },

  async createContact(data: {
    firstname: string;
    lastname: string;
    genreId: number;
  }): Promise<User> {
    return await prisma.user.create({
      data: {
        firstname: data.firstname,
        lastname: data.lastname,
        genreId: data.genreId,
      },
      include: { Genre: true },
    });
  },

  async updateContact(
    id: number,
    data: { firstname: string; lastname: string; genreId: number }
  ): Promise<User | null> {
    return await prisma.user.update({
      where: { id },
      data: {
        firstname: data.firstname,
        lastname: data.lastname,
        genreId: data.genreId,
      },
      include: { Genre: true },
    });
  },

  async deleteContact(id: number): Promise<User | null> {
    return await prisma.user.delete({
      where: { id },
    });
  },
};
