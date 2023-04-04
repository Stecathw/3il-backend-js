# Backend JS

# Technos: 

- TypeScript
- expressJS
- Prisma 

# Architecture: 

- ./routes : endpoints (ressources) 
- ./services : logique métier (services) 
- ./repository : DAO (Data Access Pattern)

# Run locally

Ajouter au .env l'URI de votre base postgre

`
git clone
npm install
npm run dev
`

# ENDPOINTS :

### Tableau EJS :
- localhost:<port>/api/contacts/

### Informations au format JSON :
- GET : localhost:<port>/api/contacts/all
- GET : localhost:<port>/api/contacts/:id
- POST : localhost:<port>/api/contacts
- PUT : localhost:<port>/api/contacts/:id
- DELETE : localhost:<port>/api/contacts/:id

