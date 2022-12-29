const express = require("express");
const configuracion = require("./configuracion");
const app = express()
app.use(express.json())

const verify_token = configuracion.verify_token

app.get('/', (_, res) => {
  res.send('Notificador Whatsapp!')
})

/**
 * recibe mensaje enviado al WS
 */
app.post("/webhook", (req, res) => {
  const body = req.body;

  if (body.object) {
    //message
    if (body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]) {
      var message_data = body.entry[0].changes[0].value.messages[0];

      const phone_number_id = body.entry[0].changes[0].value.metadata.phone_number_id; //número de empresa
      const cliente_phone_number = message_data.from; // número del cliente
      const mensaje = message_data?.text?.body; // mensaje

      console.log("mensaje enviado a ", phone_number_id)
      console.log("mensaje enviado de ", cliente_phone_number)
      console.log("mensaje", mensaje)
    }
    res.status(200).send();
  } else {
    res.status(404).send();
  }
});

/**
 * verifica la conexión entre WS y APP
 */
app.get("/webhook", (req, res) => {
  // Parse params from the webhook verification request
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Check if a token and mode were sent
  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === "subscribe" && token === verify_token) {
      // Respond with 200 OK and challenge token from the request
      console.log("Conexión WS y APP verificada");
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.status(403).send();
    }
  }
});

module.exports = app
