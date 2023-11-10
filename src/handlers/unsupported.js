const { buildMessage } = require("../framework/response_builder");

const unsupported = (context) => {
  return buildMessage({
    data: "Lo siento, no puedo procesar tu consulta",
  });
};

module.exports = { unsupported };
