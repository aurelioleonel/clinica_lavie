const { Atendimentos, Psicologos } = require("../models/index");  //<-- esta na pasta models
const bcrypt = require("bcryptjs");



//lista todos o(a)s psicologos
//Caso a tabela tenha muitos registros 
//Coloque um limitador  no findAll({limit: 1000})
const psicologosController = {


  //lista todos o(a)s psicologos
  //Caso a tabela tenha muitos registros 
  //Coloque um limitador  no findAll({limit: 1000})
  async listaDePsicologos(req, res) {
    try {
      const listarPsicologos = await Psicologos.findAll();
      if (!listarPsicologos) {
        return res.status(404).json("não existe psicologos cadastrado no sistema! ")
      }
      return res.status(200).json(listarPsicologos);
    } catch (error) {
      return res.status(500).json("Registro não encontrado, entre em contato com administrador da rede " + error)
    }

  },


  //Listando pacientes pelo id
  async listarPsicologoId(req, res) {
    try {
      const { id } = req.params;
      const psicologo = await Psicologos.findByPk(id);
      if (!psicologo) {
        return res.status(404).json("Id não encontrado! ")
      }

      return res.status(200).json(psicologo);
    } catch (error) {
      return res.status(500).json("Registro não encontrado, entre em contato com administrador da rede " + error)
    }
  },



  //Cadastra um novo item na tabela psicologos
  async createPsicologos(req, res) {
    try {
      const { senha } = req.body;
      const newSenha = bcrypt.hashSync(senha, 10);



      //Deixe apenas campos nescessários 
      const { nome, email, apresentacao } = req.body;

      const haEmail = await Psicologos.count({ where: { email } });
      if (haEmail) {
        return res.status(409).json("Este email já esta cadastrado em outro psicologo!!!")
      }


      const newPsicologos = await Psicologos.create({
        nome, email, senha: newSenha, apresentacao
      });
      return res.status(201).json(newPsicologos); //devolvendo o psicologo cadastrado
    } catch (error) {
      return res.status(500).json("Não foi possivel criar um novo Registro, entre em contato com administrador da rede " + error)
    }
  },


  //Exclui o item da tabela psicologos
  //de acordo com parametro(req.params) fornecido
  async deletePsicologos(req, res) {
    try {
      const { id } = req.params;

      //verificando se existe psicologo com o id informado
      // const psicologo = await Psicologos.findByPk(id);
      // if (!psicologo) {
      //   return res.status(404).json("Id não encontrado! ")
      // 
      if (! await Psicologos.findByPk(id)) {
        return res.status(404).json("Id não encontrado! ")
      }


      const haAtendimentos = await Atendimentos.count({
        where: {
          id_psicologo: id,
        },
      });

      if (haAtendimentos) {
        return res
          .status(401)
          .json(
            "Existe atendimentos associados a esse psicologo, não é possivel excluir!"
          );
      }


      await Psicologos.destroy({
        where: {
          id_psicologo: id,
        },
      });
      return res.status(204).json("Registro exluido com sucesso!!");
    } catch (error) {
      return res.status(500).json("Registro não encontrado, entre em contato com administrador da rede " + error)
    }
  },


  //Atuliza o item da tabela psicologos
  //de acordo com parametro(req.params) e os campos(req.body) fornecido 
  async updatePsicologos(req, res) {
    try {
      const { id } = req.params;
      const { senha } = req.body;
      const fieldsloadUpdate = {};

      Object.assign(fieldsloadUpdate, req.body);

      //verifica se a senha foi informada no body, alterada ou não se refaz a criptografia
      if (senha) {
        const newSenha = bcrypt.hashSync(senha, 10);
        Object.assign(fieldsloadUpdate, { senha: newSenha });
      }

      await Psicologos.update(fieldsloadUpdate, {
        where: {
          id_psicologo: id,
        },
      }
      );
      //devolvendo a atualização
      const psicologo = await Psicologos.findByPk(id);
      return res.status(200).json(psicologo);

    } catch (error) {
      return res.status(500).json("Registro não encontrado, entre em contato com administrador da rede " + error)
    }
  },


};
module.exports = psicologosController;