const message_type = {
  text: "text",
  interactive: "interactive",
  audio: "audio",
  image: "image",
  sticker: "sticker",
  document: "document",
};

const message_response_type = {
  text: "text",
  interactive_list: "interactive_list",
  interactive_buttons: "interactive_buttons",
};

const handlers = {
  greeting: "greeting",
  unsupported: "unsupported",
};

module.exports = {
  message_type,
  message_response_type,
  handlers,
};
