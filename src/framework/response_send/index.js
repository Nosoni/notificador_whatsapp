const axios = require("axios");
const configuration = require("../../configuration");

const sendMessage = ({ phone_number_id, message }) => {
  try {
    var config = {
      method: "post",
      url: `https://graph.facebook.com/v14.0/${phone_number_id}/messages`,
      headers: {
        Authorization: `Bearer ${configuration.token}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify(message),
    };

    axios(config).catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendMessage };
