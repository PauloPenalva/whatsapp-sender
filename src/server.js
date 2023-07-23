const express = require("express");
const cors = require("cors");
const qrcode = require("qrcode-terminal");
const { parsePhoneNumber, isValidPhoneNumber } = require("libphonenumber-js");
const { Client, LocalAuth } = require("whatsapp-web.js");

const PORT = process.env.PORT || 3333;

const client = new Client({
  authStrategy: new LocalAuth(),
  // proxyAuthentication: { username: 'username', password: 'password' },
  puppeteer: {
    // args: ['--proxy-server=proxy-server-that-requires-authentication.example.com'],
    headless: true,
  },
});

client.initialize();

client.on("loading_screen", (percent, message) => {
  console.log("LOADING SCREEN", percent, message);
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("CLIENT IS READY!");
});

client.on("disconnected", (reason) => {
  console.log("CLIENT WAS LOGGED OUT", reason);
  process.exit();
});

client.on("auth_failure", (session) => {
  console.log("AUTHENTICATION FAILURE", session);
});

client.on("authenticated", () => {
  console.log("AUTHENTICATED");
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * @route GET /groups
 * @returns {object} - List of groups
 * @description Get all groups
 */
app.get("/groups", (req, res) => {

    client.getContacts().then((contacts) => {
        res.status(200).json(contacts.filter((contact) => contact.id.server.includes("g.us")));
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({
            status: false,
            message: "Error getting groups",
        });
    });
});

/**
 * @route POST /send-message
 * @param {string} to - Number to send the message
 * @param {string} message - Message to be sent
 * @param {boolean} isGroup - If the number is a group
 * @returns {object} - Status of the request
 * @description Send a message to a number
 */
app.post("/send-message", (req, res) => {
  const { to: number, message, isGroup } = req.body;

  console.log("SENDING MESSAGE", number);

  let phoneNumber = "";

  if (!isGroup) {
    if (!isValidPhoneNumber(number, "BR")) {
      throw new Error("Invalid phone number");
    }

    if (number.substring(1, 0) === "0") {
      phoneNumber = `55${number.substring(1)}`;
    } else {
      phoneNumber = number;
    }

    phoneNumber = parsePhoneNumber(phoneNumber, "BR")
      ?.format("E.164")
      .replace("+", "");
    phoneNumber = phoneNumber.includes("@c.us")
      ? phoneNumber
      : `${phoneNumber}@c.us`;
  } else {
    phoneNumber = `${number}@g.us`;
  }

  client
    .sendMessage(phoneNumber, message)
    .then((response) => {
      res.status(200).json({
        status: true,
        message: "Message sent successfully",
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        status: false,
        message: "Message not sent",
      });
    });
});

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
