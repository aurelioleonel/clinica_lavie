const express = require("express")

const atendimentosControllers = require("../controllers/atendimentosControllers");
const pacientesControllers = require("../controllers/pacientesControllers");
const psicologosControllers = require("../controllers/psicologosControllers");
const dashboardsController = require("../controllers/dashboardsControllers");
const AuthController = require("../controllers/auth.controller");

//Arquivos responsaveis pelo sistema de validação e autenticação
const auth = require("../middlewares/auth");
const AtendimentoValidation = require("../validations/atendimentos");
const loginValidation = require("../validations/auth");
const PacienteValidation = require("../validations/pacientes");
const PsicologoValidation = require("../validations/psicologos");



const routes = express.Router();

//Rotas da tabela atendimentos
routes.get("/atendimentos", auth, atendimentosControllers.listaDeAtendimentos);
routes.get("/atendimentos/:id", AtendimentoValidation.getOne, auth, atendimentosControllers.listarAtendimentoId);
routes.post("/atendimentos", AtendimentoValidation.create, auth, atendimentosControllers.createAtendimentos);
routes.put("/atendimentos/:id", auth, atendimentosControllers.updateAtendimentos);
routes.delete("/atendimentos/:id", atendimentosControllers.deleteAtendimentos);


//Rotas da tabela pacientes
routes.get("/pacientes", pacientesControllers.listaDePacientes);
routes.get("/pacientes/:id", PacienteValidation.getOne, pacientesControllers.listarPacienteId);
routes.post("/pacientes", PacienteValidation.create, pacientesControllers.createPacientes);
routes.put("/pacientes/:id", PacienteValidation.update, pacientesControllers.updatePacientes);
routes.delete("/pacientes/:id", PacienteValidation.destroy, pacientesControllers.deletePacientes);

//PacienteValidation.getOne,
//PacienteController.getOne


//Rotas da tabela psicologos
routes.get("/psicologos", psicologosControllers.listaDePsicologos);
routes.get("/psicologos/:id", psicologosControllers.listarPsicologoId);
routes.post("/psicologos", psicologosControllers.createPsicologos);
routes.put("/psicologos/:id", psicologosControllers.updatePsicologos);
routes.delete("/psicologos/:id", psicologosControllers.deletePsicologos);

//Rotas para o dashboard
routes.get("/dashboard/numero-pacientes", dashboardsController.numeroPacientes)
routes.get("/dashboard/numero-psicologos", dashboardsController.numeroPsicologos)
routes.get("/dashboard/numero-atendimentos", dashboardsController.numeroAtendimentos)
routes.get("/dashboard/media-atendimentos-psicologos", dashboardsController.mediaAtendimentosPsicologos)

//Rota para validação e autenticação do login
routes.post("/login", loginValidation.login, AuthController.login);


module.exports = routes;
