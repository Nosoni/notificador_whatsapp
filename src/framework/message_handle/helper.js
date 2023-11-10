const { message_type, handlers } = require("../../constants");

const getMessageContent = (message_data) => {
  let message_content = {};

  switch (message_data.type) {
    case message_type.text:
      message_content.content = message_data.text.body;
      message_content.handler = "greeting"; //IA
      break;

    case message_type.interactive:
      const reply_type = message_data.interactive.type;

      message_content.content = message_data.interactive;
      message_content.handler = JSON.parse(
        message_content.content[reply_type].id
      ).handler;
      break;

    case message_type.audio:
    case message_type.image:
    case message_type.sticker:
    case message_type.document:
      message_content.content = {};
      message_content.handler = handlers.unsupported;
      break;
  }

  return message_content;
};

module.exports = { getMessageContent };
