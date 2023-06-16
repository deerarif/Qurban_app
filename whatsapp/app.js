const express = require("express");
const body_parser = require("body-parser");
const qrgen = require("yaqrcode");
const app = express();
const cors = require("cors");
const qrcode = require("qrcode-terminal");
const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");

//setup whatsapp
const client = new Client({
  authStrategy: new LocalAuth({
    clientId: "client-one",
  }),
  puppeteer: {
    executablePath: "/usr/bin/google-chrome",
    args: ["--disable-gpu", "--no-sandbox"],
  },
});
let status = "";
client.on("qr", (qr) => {
  status = qr;
  qrcode.generate(qr, { small: true });
});

client.on("ready", async () => {
  status = "ready";
  const usernum = client.info.wid._serialized;
  await client.sendMessage(usernum, "Whats'App Ready");
});
client.on("authenticated", () => {
  status = "ready";
});
client.on("message", (msg) => {
  if (msg.body === "yes") {
    msg.reply("yo sup dawg");
  }
});
client.initialize();

///setup route
app.listen(8000);
app.use(
  cors({
    origin: "*",
  })
);
app.use(body_parser.json());
app.use(express.json());
app.use("/check", (req, res) => {
  console.log(status);
  if (status === "ready") {
    res.json({ status: "client is ready" });
  } else {
    res.json({ status: false, qrcode: status });
  }
});
app.use("/", async (req, res) => {
  if (!req.body.number || !req.body.token) {
    res.status(400).send("BAD REQUEST\n");
  }
  var base64Image = qrgen(req.body.token);
  const media = new MessageMedia("image/png", base64Image);
  await client.sendMessage(req.body.number + "@c.us", media, {
    caption: "Token Daging Qurban",
  });
  res.status(200).send("ok\n");
});
