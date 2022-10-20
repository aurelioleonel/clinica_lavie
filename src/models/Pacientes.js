﻿const db = require("../database/conexao"); //<-- Pasta do arquivo de conexão com a base de dados 
const { DataTypes } = require("sequelize");
 
 
const Pacientes = db.define( 
     "Pacientes", //Modelo da tabela
     { //Colunas da tabela
           id_paciente: {
               type: DataTypes.INTEGER,
               primaryKey: true,
               autoIncrement: true,
           },
           nome: {
               type: DataTypes.STRING,
           },
           email: {
               type: DataTypes.STRING,
               
           },
           idade: {
               type: DataTypes.DATE,
           },
           createdAt: {
               type: DataTypes.DATE,
           },
           updatedAt: {
               type: DataTypes.DATE,
           },
     },
     { 
       tableName: "pacientes",
       
     }
);
 
 
module.exports = Pacientes;
//Verificar se a tabela possui chave estrangeira 
//informe o campo e modelo da tabela de referencia 
//Exemplo
//references: { 
//    model: model da tabela de referencia,
//    key: "Campo chave da tabela",
//},