// module.exports = {
//   HOST: "localhost",
//   USER: "root",
//   PASSWORD: "RaviKrPandey@181",
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

// console.log("Welcome")

module.exports = {
  HOST: "65.2.131.42",
  USER: "ravi",
  PASSWORD: "root",
  DB: "ravi",
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
};