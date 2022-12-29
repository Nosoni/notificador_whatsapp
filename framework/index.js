const axios = require("axios")
const configuracion = require("../configuracion");

const send_message = ({ phone_number_id, client_phone_number }) => {
  const message = {
    messaging_product: "whatsapp",
    to: client_phone_number,
    text: { body: "Hemos recibido tu mensaje" }
  }

  try {
    var config = {
      method: 'post',
      url: `https://graph.facebook.com/v14.0/${phone_number_id}/messages`,
      headers: {
        'Authorization': `Bearer ${configuracion.token}`,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(message)
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) { }
}

module.exports = { send_message }