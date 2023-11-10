const { handlers } = require("../constants");
const { updateCustomerInfo } = require("../data");
const { greeting } = require("./greeting");
const { unsupported } = require("./unsupported");

const handlerExecute = async (context) => {
  let response = {};
  switch (context.message_content.handler) {
    case handlers.greeting:
      response = greeting(context);
      break;

    default:
      response = unsupported(context);
      break;
  }

  if (!context.customer_info.convertation_started)
    context.customer_info.convertation_started =
      !context.customer_info.convertation_started;

  await updateCustomerInfo(context.customer_info);

  return {
    messaging_product: "whatsapp",
    to: context.customer_info.client_phone_number,
    ...response,
  };
};

module.exports = { handlerExecute };
