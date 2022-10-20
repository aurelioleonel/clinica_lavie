const { Atendimentos, Pacientes, Psicologos } = require("../models/index");

const dashboardsController = {
    async numeroPacientes(req, res) {
        try {
            const pacientes = await Pacientes.count();
            return res.status(200).json(pacientes)
        } catch (err) {
            return res.status(500).json("Erro ao calcular o número de pacientes")
        }
    },
    async numeroPsicologos(req, res) {
        try {
            const psicologos = await Psicologos.count();
            return res.status(200).json(psicologos)
        } catch (err) {
            return res.status(500).json("Erro ao calcular o número de psicólogos")
        }
    },
    async numeroAtendimentos(req, res) {
        try {
            const atendimentos = await Atendimentos.count();
            return res.status(200).json(atendimentos)
        } catch (err) {
            return res.status(500).json("Erro ao calcular o número de atendimentos")
        }
    },
    async mediaAtendimentosPsicologos(req, res) {
        try {
            const atendimentos = await Atendimentos.count();
            const psicologos = await Psicologos.count();
            const media = (atendimentos / psicologos).toFixed(2);

            return res.status(200).json(media);
        } catch (err) {
            return res.status(500).json("Erro ao calcular a média dos atendimentos por psicólogos")
        }
    },
}

module.exports = dashboardsController;
