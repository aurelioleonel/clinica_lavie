const { Pacientes, Atendimentos, Psicologos } = require("../models/index");//<-- esta na pasta models

const atendimentosController = {

  //lista todos o(a)s atendimentos
  //Caso a tabela tenha muitos registros 
  //Coloque um limitador  no findAll({limit: 1000})
  async listaDeAtendimentos(req, res) {
    try {
      const listarAtendimentos = await Atendimentos.findAll();
      return res.json(listarAtendimentos);
    } catch (error) {
      return res.status(500).json("Registro não encontrado, entre em contato com administrador da rede " + error)
    }

  },

  //Listando pacientes pelo id
  async listarAtendimentoId(req, res) {
    try {
      const { id } = req.params;
      const atendimento = await Atendimentos.findByPk(id);
      if (!atendimento) {
        return res.status(404).json("Id não encontrado! ")
      }

      return res.status(200).json(atendimento);
    } catch (error) {
      return res.status(500).json("Registro não encontrado, entre em contato com administrador da rede " + error)
    }
  },



  //Cadastra um novo item na tabela atendimentos
  async createAtendimentos(req, res) {

    try {

      const { id: id_psicologo } = req.auth;
      const { id_paciente } = req.body;

      const haPaciente = await Pacientes.count({ where: { id_paciente, } });
      if (!haPaciente)
        return res.status(400).json("Não existe o paciente com o id informado");

      const newAtendimento = await Atendimentos.create({
        ...req.body,
        id_psicologo,

      });
      return res.status(201).json(newAtendimento); //devolvendo o registro cadastrado

    } catch (error) {
      return res.status(500).json("Registro não encontrado, entre em contato com administrador da rede " + error)
    }

  },


  //Exclui o item da tabela atendimentos
  //de acordo com parametro(req.params) fornecido
  async deleteAtendimentos(req, res) {
    const { id } = req.params;
    try {
      await Atendimentos.destroy({
        where: {
          id_atendimento: id
        },
      });
      res.json(" Item deletado com sucesso!!")
    } catch (error) {
      return res.json("Registro não encontrado! " + error)
    }
  },


  //Atuliza o item da tabela atendimentos
  //de acordo com parametro(req.params) e os campos(req.body) fornecido 
  async updateAtendimentos(req, res) {
    const { id } = req.params;
    //Deixe apenas campos nescessários 
    const { data_atendimento, observacao, id_psicologo, id_paciente } = req.body;
    try {
      const atendimentosAtualizado = await Atendimentos.update({
        data_atendimento, observacao, id_psicologo, id_paciente, updatedAt: new Date()
      },
        {
          where: {
            id_atendimento: id
          },
        }
      );
      res.json("Item atualizado com sucesso!!")
    } catch (error) {
      return res.json("Registro não encontrado! " + error)
    }
  },


};
module.exports = atendimentosController;