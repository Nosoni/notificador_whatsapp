const fs = require("node:fs/promises");
const path = require("node:path");
const dataPath = path.join(__dirname, "customers.json");

const getCustomerInfo = async (message_data) => {
  try {
    const { from: client_phone_number, client_name } = message_data;

    const { customers } = await fs
      .readFile(dataPath, "utf8")
      .then((dataFile) => JSON.parse(dataFile));

    let current_customer = customers.find(
      (customer) => customer.client_phone_number === client_phone_number
    );

    if (!current_customer) {
      /*crear customer info*/
      current_customer = {
        client_phone_number,
        client_name,
        convertation_started: false,
      };
    }

    return current_customer;
  } catch (error) {
    console.log(error);
    return {};
  }
};

const updateCustomerInfo = async (customerUpdated) => {
  try {
    const { customers } = await fs
      .readFile(dataPath, "utf8")
      .then((dataFile) => JSON.parse(dataFile));

    const index = customers.findIndex(
      (customer) =>
        customer.client_phone_number === customerUpdated.client_phone_number
    );

    customers[index] = customerUpdated;
    const data_updated = JSON.stringify({ customers });

    await fs.writeFile(dataPath, data_updated, "utf8");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getCustomerInfo, updateCustomerInfo };
