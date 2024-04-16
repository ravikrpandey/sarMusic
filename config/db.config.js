// module.exports = {
//   HOST: "localhost",
//   USER: "root",
//   PASSWORD: "sql@shashi",
//   DB: "sarmusic",
//   dialect: "mysql",
//   logging: false,
//   camelCase: true, 
//   additional: {
//       timestamps: false
//   },

//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// }

console.log("Welcome")

module.exports = {
  HOST: "sql10.freesqldatabase.com",
  USER: "sql10698908",
  PASSWORD: "ze1QSKnUew",
  DB: "sql10698908",
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
    idle: 10000
  }
}
