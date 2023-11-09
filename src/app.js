const express = require("express");
const configuration = require("./configuration");
const { sendMessage } = require("./framework/response_send");
const { messageHandle } = require("./framework/message_handle");
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
  const entry_value = req.body?.entry?.[0]?.changes?.[0]?.value;
  if (!entry_value) res.status(404).send();

  const message_data = entry_value?.messages?.[0];
  const statuses = entry_value?.statuses;
  if (message_data && !statuses) {
    const { phone_number_id } = entry_value?.metadata;
    message_data.client_name = entry_value?.contacts?.[0]?.profile?.name ?? "";

    const build_response = await messageHandle(message_data);
    sendMessage({ phone_number_id, message: build_response });
  }
  res.status(200).send();
});

/**
 * verifica la conexión entre WS y APP
 */
app.get("/webhook", (req, res) => {
  try {
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
    } else {
      res.status(403).send();
    }
  } catch (error) {
    res.status(500).send("something went wrong");
  }
});

module.exports = app;
