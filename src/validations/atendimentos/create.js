const { validate, Joi } = require("express-validation");

module.exports = validate({
  body: Joi.object({
    id_paciente: Joi.string().required(),
    observacao: Joi.string().required(),
    data_atendimento: Joi.date().iso().required(),
  }),
});
