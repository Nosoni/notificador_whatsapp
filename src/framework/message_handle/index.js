const { getCustomerInfo, updateCustomerInfo } = require("../../data");
const { greeting } = require("../../handlers/greeting");
const { getHander, getMessageContent } = require("./helper");

const messageHandle = async (message_data) => {
  const { from: client_phone_number, client_name } = message_data;
  let customer_info = await getCustomerInfo(client_phone_number);
  const message_content = getMessageContent(message_data);

  if (!customer_info) {
    /*crear customer info*/
    customer_info = {
      client_phone_number,
      client_name,
      convertation_started: false,
    };
  }

  let context = { message_content, customer_info: { ...customer_info } };

  const handler = getHander(context);
  switch (handler) {
    case "greeting":
      build_response = greeting(context);
      break;
  }

  await updateCustomerInfo(context.customer_info);

  return build_response;
};

module.exports = { messageHandle };
