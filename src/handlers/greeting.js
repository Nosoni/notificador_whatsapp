const { buildMessage } = require("../framework/response_builder");

const greeting = (context) => {
  const {
    customerInfo: { client_phone_number },
  } = context;

  context.customerInfo.convertation_started =
    !context.customerInfo.convertation_started;

  return buildMessage({
    client_phone_number,
    data: `Bienvenido`,
  });
};

module.exports = { greeting };
