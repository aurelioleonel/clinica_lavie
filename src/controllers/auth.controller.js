const { Psicologos } = require("../models/index");
const jwt = require("jsonwebtoken");
const secret = require("../configs/secret");
const bcrypt = require("bcryptjs");

const AuthController = {
  async login(req, res) {
    try {
      const { email, senha } = req.body;

      const psicologo = await Psicologos.findOne({
        where: {
          email,
        },
      });

      if (!psicologo) {
        return res.status(400).json("Email não cadastrado!");
      }

      if (!bcrypt.compareSync(senha, psicologo.senha)) {
        return res.status(401).json("Senha invalida!");
      }

      const token = jwt.sign(
        {
          id: psicologo.id_psicologo,
          email: psicologo.email,
          nome: psicologo.nome,
          userType: "user",
        },
        secret.key,

      );


      return res.json(token);
    } catch (error) {
      return res.status(500).json("Registro não encontrado, entre em contato com administrador da rede " + error)
    }
  },
};

module.exports = AuthController;
