const { buildMessage } = require("../framework/response_builder");

const greeting = (context) => {
  const {
    customer_info: { client_phone_number, client_name },
  } = context;

  if (!context.customer_info.convertation_started)
    context.customer_info.convertation_started =
      !context.customer_info.convertation_started;

  const dataButtons = {
    header: `Hola ${client_name}`,
    body: "Soy Ramiro, tu asistente virtual.\nNos alegra que nos escribas.\n¿Qué deseas hacer?",
    footer: "Elige una de las opciones",
    options: [
      {
        id: { handler: "schedule", option: "" },
        title: "Opción 1",
      },
    ],
  };

  const dataList = {
    header: `Hola ${client_name}`,
    body: "Soy Ramiro, tu asistente virtual.\nNos alegra que nos escribas.\n¿Qué deseas hacer?",
    footer: "Elige una de las opciones",
    options: [
      {
        id: { handler: "schedule", option: "" },
        title: "Lista 1",
        descripcion: "Esta es la opción lista 1",
      },
    ],
  };

  return buildMessage({
    type: "interactive_buttons",
    client_phone_number,
    data: dataButtons,
  });
};

module.exports = { greeting };
