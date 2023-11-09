const getHander = (context) => {
  let handler = "greeting";

  if (!context.customer_info.convertation_started) return "greeting";

  switch (context.message_content.type) {
    case "interactive":
      handler = JSON.parse(context.message_content.content.button_reply.id).handler;
      break;
  }

  return handler;
};

const getMessageContent = (message_data) => {
  const interactive_message = message_data?.interactive;
  const audio_message = message_data?.audio;
  const text_message = message_data?.text?.body;

  let message_content = {};

  if (interactive_message) {
    message_content.content = interactive_message;
    message_content.type = "interactive";
  }
  if (audio_message) {
    message_content.content = audio_message;
    message_content.type = "audio";
  }
  if (text_message) {
    message_content.content = text_message;
    message_content.type = "text";
  }

  return message_content;
};

module.exports = { getHander, getMessageContent };
