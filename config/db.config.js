module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "RaviKrPandey@181",
  DB: "sarmusic",
  dialect: "mysql",
  logging: false,
  camelCase: true, 
  additional: {
      timestamps: false
  },

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}

console.log("Welcome")

