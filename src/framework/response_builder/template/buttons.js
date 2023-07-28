const buildHeader = (header) => {
  return header ? {
    type: "text",
    text: header
  } : null
}

const buildFooter = (footer) => {
  return footer ? { text: footer } : null
}

const buildOptions = (options) => {
  return options ? options.map(item => {
    return {
      type: "reply",
      reply: {
        id: JSON.stringify(item.id),
        title: item.title
      }
    }
  }) : []
}

/**
 * 
 * @param {*} header
 * @param {*} body
 * @param {*} footer
 * @param {*} options
 * @returns 
 */
const buildInteractiveButtons = (data) => {
  const header = buildHeader(data?.header)
  const body = data?.body ?? "-"
  const footer = buildFooter(data?.footer)
  const options = buildOptions(data.options)
  const template_buttons = {
    type: "button",
    header: header,
    body: { text: body },
    footer: footer,
    action: {
      buttons: options
    },
  }

  return template_buttons
}

module.exports = { buildInteractiveButtons }