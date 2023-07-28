const buildHeader = (header) => {
  return header
    ? {
        type: "text",
        text: header,
      }
    : null;
};

const buildFooter = (footer) => {
  return footer ? { text: footer } : null;
};

const buildOptions = (options) => {
  return options
    ? options.map((item) => {
        return {
          id: JSON.stringify(item.id),
          title: item.title,
          description: item.description,
        };
      })
    : [];
};

/**
 *
 * @param {*} header
 * @param {*} body
 * @param {*} footer
 * @param {*} options
 * @param {*} buttonText
 * @returns
 */
const buildInteractiveList = (datos) => {
  const header = buildHeader(datos?.header);
  const body = datos?.body ?? "-";
  const footer = buildFooter(datos?.footer);
  const options = buildOptions(datos.options);
  const buttonText = datos?.buttonText ?? "Selecciona la opción";
  const template_list = {
    type: "list",
    header: header,
    body: { text: body },
    footer: footer,
    action: {
      button: buttonText,
      buttons: null,
      sections: [
        {
          title: "",
          rows: options,
        },
      ],
    },
  };

  return template_list;
};

module.exports = { buildInteractiveList };
