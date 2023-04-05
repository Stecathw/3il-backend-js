import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export const prismaRepository = {

  async seed() {
    // Create genres
    const male = await prisma.genre.create({
      data: {
        id: 1,
        libelle: 'Male',
      },
    });
    const female = await prisma.genre.create({
      data: {
        id: 2,
        libelle: 'Female',
      },
    });
    const others = await prisma.genre.create({
      data: {
        id: 3,
        libelle: 'Others',
      },
    });  
    // Create users
    await prisma.user.createMany({
      data: [
        {
          id: 1,
          firstname: 'John',
          lastname: 'Repool',
          genreId: male.id,
        },
        {
          id: 2,
          firstname: 'Jane',
          lastname: 'Doe',
          genreId: female.id,
        },
      ],
    });
  },
  
  
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

  async clearDatabase(): Promise<void> {
    await prisma.user.deleteMany();
    await prisma.genre.deleteMany();
    await prisma.$disconnect();
  },

};
