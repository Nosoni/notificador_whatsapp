const { buildInteractiveList } = require("./template/list");
const { buildInteractiveButtons } = require("./template/buttons");

//TODO type constantes
const buildMessage = ({ type = "text", client_phone_number, data }) => {
  let message = {
    messaging_product: "whatsapp",
    to: client_phone_number,
  };

  switch (type) {
    case "interactive_list":
      message.type = "interactive";
      message.interactive = buildInteractiveList(data);
      break;

    case "interactive_buttons":
      message.type = "interactive";
      message.interactive = buildInteractiveButtons(data);
      break;

    default:
      message.text = { body: data };
      break;
  }

  return message;
};

module.exports = { buildMessage };
