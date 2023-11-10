const { buildInteractiveList } = require("./template/list");
const { buildInteractiveButtons } = require("./template/buttons");
const { message_type, message_response_type } = require("../../constants");

const buildMessage = ({ type = message_response_type.text, data }) => {
  let message = {};

  switch (type) {
    case message_response_type.interactive_list:
      message.type = message_type.interactive;
      message.interactive = buildInteractiveList(data);
      break;

    case message_response_type.interactive_buttons:
      message.type = message_type.interactive;
      message.interactive = buildInteractiveButtons(data);
      break;

    default:
      message.text = { body: data };
      break;
  }

  return message;
};

module.exports = { buildMessage };
