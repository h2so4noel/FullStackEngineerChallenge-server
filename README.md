# Full Stack Challenge - Server

Server side for MEVN application

## Techs Used

- Backend: [NodeJS](https://nodejs.org/en/), [Express](http://expressjs.com/), [Mongoose](https://mongoosejs.com/)
- Database: [MongoDB](https://www.mongodb.com/) 

## Project setup

Make sure you have [MongoDB](https://www.mongodb.com/) installed and running on your machine.
This server connects the database at
```
mongodb://localhost:27017/performance-review-app
```
Feel free to change it in the config.js file


### Install Dependencies
```
npm install
```

### Seed Sample Data
```
npm run seed
```
Seed sample amounts can be edited at seed.js file

### Compiles and serve the server
Server will be on http://localhost:8080
```
npm run serve
```

### Todos and Improvements

- Add password and login implementation in user model (with password hashing).
- Reduce Mongoose's populate function to improve speed while dealing with big chunk of data.
