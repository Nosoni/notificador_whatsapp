const { buildMessage } = require("../framework/response_builder");

const greeting = (context) => {
  const {
    customer_info: { client_name },
  } = context;

  const data_buttons = {
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

  const data_list = {
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
    type: "interactive_list",
    data: data_list,
  });
};

module.exports = { greeting };
