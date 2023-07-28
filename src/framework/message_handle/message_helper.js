const getHander = (context) => {
  let handler = "greeting";

  if (!context.customerInfo.convertation_started) {
    handler = "greeting";
  }

  return handler;
};

module.exports = { getHander };
