const express = require("express");
const configuration = require("./configuration");
const { sendMessage } = require("./framework/response_send");
const { buildMessage } = require("./framework/response_builder");
const app = express();
app.use(express.json());

const { verify_token } = configuration;

app.get("/", (_, res) => {
  res.send("It's alive!");
});

/**
 * recibe mensaje enviado al WS
 */
app.post("/webhook", async (req, res) => {
  const entryValue = req.body?.entry?.[0]?.changes?.[0]?.value;
  if (!entryValue) res.status(404).send();

  const message_data = entryValue?.messages?.[0];
  const statuses = entryValue?.statuses;
  if (message_data && !statuses) {
    const { phone_number_id } = entryValue?.metadata;
    const {
      profile: { name: client_name },
    } = entryValue?.contacts?.[0];
    const { from: client_phone_number } = message_data;
    const text_message = message_data?.text?.body;
    let build_response;
    let data = {};

    switch (text_message) {
      case "list":
        data = {
          header: `Hola ${client_name}`,
          body: "Soy Ramiro, tu asistente virtual.\nNos alegra que nos escribas.\n¿Qué deseas hacer?",
          footer: "Elige una de las opciones",
          options: [
            {
              id: 1,
              title: "Lista 1",
              descripcion: "Esta es la opción lista 1",
            },
            {
              id: 2,
              title: "Lista 2",
              descripcion: "Esta es la opción lista 2",
            },
            {
              id: 3,
              title: "Lista 3",
              descripcion: "Esta es la opción lista 3",
            },
          ],
        };

        build_response = buildMessage({
          type: "interactive_list",
          client_phone_number,
          data,
        });
        break;
      case "buttons":
        data = {
          header: `Hola ${client_name}`,
          body: "Soy Ramiro, tu asistente virtual.\nNos alegra que nos escribas.\n¿Qué deseas hacer?",
          footer: "Elige una de las opciones",
          options: [
            {
              id: 1,
              title: "Opción 1",
            },
            {
              id: 2,
              title: "Opción 2",
            },
            {
              id: 3,
              title: "Opción 3",
            },
          ],
        };

        build_response = buildMessage({
          type: "interactive_buttons",
          client_phone_number,
          data,
        });
        break;
      case "text":
        build_response = buildMessage({
          client_phone_number,
          data: "welcome",
        });
        break;
      default:
        build_response = buildMessage({
          client_phone_number,
          data: `_Comandos_\n*text*: envía respuesta tipo texto\n*buttons*: envía respuesta de tipo botones\n*list*: envía respuesta de tipo lista`,
        });
        break;
    }

    sendMessage({ phone_number_id, message: build_response });
  }
  res.status(200).send();
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

module.exports = app;
