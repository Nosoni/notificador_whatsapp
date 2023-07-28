const { getCustomerInfo, updateCustomerInfo } = require("../../data");
const { greeting } = require("../../handlers/greeting");
const { getHander } = require("./message_helper");

const message_handle = async (message_data) => {
  const { from: client_phone_number, client_name } = message_data;
  const interactive_message = message_data?.interactive;
  const text_message = message_data?.text?.body;
  let customerInfo = await getCustomerInfo(client_phone_number);

  if (!customerInfo) {
    /*crear customer info*/
    customerInfo = {
      client_phone_number,
      client_name,
      convertation_started: false,
    };
  }

  let context = {
    interactive_message,
    text_message,
    customerInfo: { ...customerInfo },
  };

  const handler = getHander(context);
  switch (handler) {
    case "greeting":
      build_response = greeting(context);
      break;

    default:
      build_response = greeting(context);
      break;
  }

  await updateCustomerInfo(context.customerInfo);

  return build_response;
};

module.exports = { message_handle };
