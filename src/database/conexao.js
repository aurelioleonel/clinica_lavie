const Sequelize = require("sequelize");
const SecretsDb = require("../configs/secret");

// Constantes para conexão com a base de dados  
const DB_NAME = SecretsDb.DB_NAME;
const DB_USER = SecretsDb.DB_USER;
const DB_PASS = SecretsDb.DB_PASS;

// Objetos com configurações para conexão
const DB_CONFIG = {
   dialect: "mysql",
   host: "localhost",
   port: 3306,
};


// Objeto para guardar a conexão do banco dados
let db = {};
try {
   db = new Sequelize(DB_NAME, DB_USER, DB_PASS, DB_CONFIG);
} catch (error) {
   console.error("Error ao tentar uma conexão com banco dados");
}
// Metodo de teste do sequelize para teste 
// de conexão com a base de dados 
async function hasConection() {
   try {
      await db.authenticate();
      console.log("Banco de dados conectado com sucesso!");
   } catch (error) {
      console.error("Erro ao tentar se conectar ao banco de dados");
   }
}


Object.assign(db, {
   hasConection,
});


module.exports = db;

