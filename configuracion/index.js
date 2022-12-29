"use strict";
require('dotenv').config()

module.exports = {
  phone_number_id: process.env.PHONE_NUMBER_ID,
  token: process.env.WHATSAPP_TOKEN,
  verify_token: process.env.VERIFY_TOKEN,
}