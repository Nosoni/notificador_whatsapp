const axios = require("axios");
const { token } = require("../../config");

const sendMessage = ({ phone_number_id, message }) => {
  try {
    var config = {
      method: "post",
      url: `https://graph.facebook.com/v14.0/${phone_number_id}/messages`,
      headers: {
        Authorization: `Bearer ${token}`,
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
