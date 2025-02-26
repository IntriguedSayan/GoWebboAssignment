## Project setup

```bash

# clone the repository
$ git clone https://github.com/IntriguedSayan/GoWebboAssignment.git

# Adding environment variables
$ create a .env file & copy the environment variables from .env.example file & fill all the required environment variables(all of them must be filled before starting the application)

# Installing Dependencies
$ npm install

```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Endpoints

```
# for signup process of a practice
$ [POST] localhost:3000/api/v1/auth/signup

# for login process of a practice to get a access token
$ [POST] localhost:3000/api/v1/auth/login

# for all the authenticated routes add the access token received after login in the header as Bearer token then do the requests

# to get all the paitents of a specific practice
$ [GET] [Authenticated] localhost:3000/api/v1/patients

# to add a new patient to a particular practice
$ [POST] [Authenticated] localhost:3000/api/v1/patients

# to delete a patient from a particular practice
$ [DELETE] [Authenticated] localhost:3000/api/v1/patients/:patientId

# to get all the registed practices
$ [GET] localhost:3000/api/v1/practices
```

## Sharding approach

Below is the sharding approach I have follwed according to the question

**multi-schema sharding** for tenant isolation. In a single database, each practice gets its own schema. Here's the process of sharding:

- **Public Schema for Shared Data:**
  The practice is created in the public schema (common data) after a practice registers.

- **Dedicated Tenant Schema:**
  A new schema (named using the practice's ID) is created dynamically to isolate that practice's data from the rest.

- **Tenant-specific Tables:**
  Within the new schema, a `patient` table is created, ensuring that patients data for each practice is stored separately.

This approach isolates tenant data securely while still using a single PostgreSQL instance.
