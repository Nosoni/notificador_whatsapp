const app = require("./app");
const port = process.env.PORT || 1335

app.listen(port, () => {
  console.log(`notificador whatsapp is listening ${port}`)
});
