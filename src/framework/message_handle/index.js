const { getCustomerInfo, updateCustomerInfo } = require("../../data");
const { handlerExecute } = require("../../handlers");
const { getMessageContent } = require("./helper");

const messageHandle = async (message_data) => {
  const message_content = getMessageContent(message_data);
  const customer_info = await getCustomerInfo(message_data);

  let context = { message_content, customer_info: { ...customer_info } };

  return await handlerExecute(context);
};

module.exports = { messageHandle };
