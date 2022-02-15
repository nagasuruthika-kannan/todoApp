module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,


  HOST: "localhost",
  USER: "root",
  PASSWORD: "admin123",
  DB: "todoApp",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};