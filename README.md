<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Facts-BA Store

## Development Setup

1. Clone the repository
2. Run

```
yarn install
```

3. Make sure you have Nest CLI Installed

```
npm i -g @nestjs/cli
```

4. Set up database

```
docker-compose up -d
```

5. Clone the `.env.template` file and rename the copied file to `env`

6. Fill the empy environment variables defined at `.env`

7. Execute the app in dev environment:

```
yarn start:dev
```

8. Populate database with seed

```
http://localhost:3000/api/seed
```

## Stack

- MongoDB
- Nest

# Production Build

1. Create file `.env.prod`
2. Fill empty prod environment variables.
3. Create the new image

```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```
