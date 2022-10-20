const { Sequelize } = require("sequelize");
const { Atendimentos, Pacientes } = require("../models/index");




//lista todos o(a)s pacientes
//Caso a tabela tenha muitos registros 
//Coloque um limitador  no findAll({limit: 1000})
const pacientesController = {


  //lista todos o(a)s pacientes
  //Caso a tabela tenha muitos registros 
  //Coloque um limitador  no findAll({limit: 1000})
  async listaDePacientes(req, res) {
    try {
      const listarPacientes = await Pacientes.findAll();
      if (!listarPacientes) {
        return res.status(404).json("não existe pacientes cadastrado no sistema! ")
      }
      return res.status(200).json(listarPacientes);
    } catch (error) {
      return res.status(500).json("Registro não encontrado, entre em contato com administrador da rede " + error)
    }
  },

  //Listando pacientes pelo id
  async listarPacienteId(req, res) {
    try {
      const { id } = req.params;
      const paciente = await Pacientes.findByPk(id);
      if (!paciente) {
        return res.status(404).json("Id não encontrado! ")
      }



      return res.status(200).json(paciente);
    } catch (error) {
      return res.status(500).json("Registro não encontrado, entre em contato com administrador da rede " + error)
    }
  },


  //Cadastra um novo item na tabela pacientes
  async createPacientes(req, res) {
    try {
      //Deixe apenas campos nescessários 
      const { id_paciente, nome, email, idade, createdAt, updatedAt } = req.body;

      const haEmail = await Pacientes.count({ where: { email } });
      if (haEmail) {
        return res.status(409).json("Este email já esta cadastrado em outro paciente!!!")
      }

      const newPacientes = await Pacientes.create({
        id_paciente, nome, email, idade, createdAt, updatedAt
      });
      return res.status(201).json(newPacientes); //devolvendo o paciente cadastrado
    } catch (error) {
      return res.status(500).json("Não foi possivel criar um novo Registro, entre em contato com administrador da rede " + error)
    }
  },



  //Exclui o item da tabela pacientes
  //de acordo com parametro(req.params) fornecido
  async deletePacientes(req, res) {
    try {
      const { id } = req.params;

      //verificando se existe paciente com o id informado
      const paciente = await Pacientes.findByPk(id);
      if (!paciente) {
        return res.status(404).json("Id não encontrado! ")
      }

      //Verificando se há relacionamento com Antendimentos do cliente
      const haAtendimentos = await Atendimentos.count({
        where: {
          id_paciente: id,
        }
      });

      if (haAtendimentos) { // se houver atendimento relacionado não exclui
        return res
          .status(401)
          .json(
            "Existe atendimentos relacionado a esse paciente, não é possivel excluir!"
          );
      }


      await Pacientes.destroy({
        where: {
          id_paciente: id,
        },
      });
      //res.json("Produto Deletado com sucesso!!")
      return res.status(204).json("Registro exluido com sucesso!!");

    } catch (error) {
      return res.status(500).json("Registro não encontrado, entre em contato com administrador da rede " + error)
    }

  },


  //Atuliza o item da tabela pacientes
  //de acordo com parametro(req.params) e os campos(req.body) fornecido 
  async updatePacientes(req, res) {
    const { id } = req.params;

    //verificando se existe paciente com o id informado
    let pacientes = await Pacientes.findByPk(id);
    if (!pacientes) {
      return res.status(404).json("Id não encontrado! ")
    }

    //atualizando o registro
    try {
      const pacientesAtualizado = await Pacientes.update(req.body, {
        where: {
          id_paciente: id,

        },

      },

      );

      // retornando as atualizações
      pacientes = await Pacientes.findByPk(id);
      return res.status(200).json(pacientes);

    } catch (error) {
      return res.status(500).json("Registro não encontrado, entre em contato com administrador da rede " + error)
    }
  },


};
module.exports = pacientesController;