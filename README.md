# Project Storefront
Udacity project for advanced track to test knowledge about apis and endpoints




## environment keys

you need to fill your .env file with your data  for those varialbles :

BCRYPT_PASSWORD=your-secret-password
SALT_ROUNDS=10
TOKEN_SECRET=your-secret-token
DB_DATABASE_TEST=store_test
DB_USER=postgres
DB_PASS=2612002
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=store_dev
NODE_ENV=development
PORT=3000




##  database ; 
you need create database store_dev and  store_testthen run  the database migrations: db-migrate up


## running 

you can run the app in dev mode 
  with( start:dev) :
    "start:dev": "nodemon --watch ./**/*.ts --exec ts-node ./src/server.ts"
    it will listen on port 3000











