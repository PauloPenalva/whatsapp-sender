# WhatsApp Message Sender - Node.js Project

![WhatsApp Message Sender](https://your-image-url.com)

> Send WhatsApp messages programmatically using this Node.js project!

## Table of Contents

- [WhatsApp Message Sender - Node.js Project](#whatsapp-message-sender---nodejs-project)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Installation](#installation)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
    - [Get All Groups](#get-all-groups)
    - [Send Message](#send-message)
      - [Request Body](#request-body)
      - [Response](#response)
  - [Contributing](#contributing)
  - [License](#license)

## Introduction

This project allows you to send WhatsApp messages programmatically using the WhatsApp Web API and the `whatsapp-web.js` library. It provides a simple Node.js server with API endpoints to send messages to individual contacts or groups on WhatsApp.

## Installation

1. Clone this repository to your local machine:

```bash
git clone https://github.com/your-username/whatsapp-message-sender.git
```

2. Install the required dependencies:

```bash
cd whatsapp-message-sender
npm install
```

## Usage

1. Before running the project, you need to set up the environment variables. Create a `.env` file in the project root directory and add the following:

```
PORT=3333
```

2. To start the server, run the following command:

```bash
npm start
```

3. Open your web browser and navigate to `http://localhost:3333`. You should see a QR code displayed. Scan this QR code using the WhatsApp app on your phone to log in and authenticate the WhatsApp Web session.

## API Endpoints

### Get All Groups

- **URL:** `/groups`
- **Method:** `GET`
- **Description:** Retrieve a list of all WhatsApp groups you are a member of.

### Send Message

- **URL:** `/send-message`
- **Method:** `POST`
- **Description:** Send a WhatsApp message to an individual contact or a group.

#### Request Body

```json
{
  "to": "recipient_number",
  "message": "your_message_here",
  "isGroup": true
}
```

- `to`: The recipient's phone number in international format (e.g., +551234567890) or the group ID with the `@g.us` suffix for groups.
- `message`: The message content you want to send.
- `isGroup`: Set to `true` if the recipient is a group, `false` if it's an individual contact.

#### Response

```json
{
  "status": true,
  "message": "Message sent successfully"
}
```

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request. For major changes, please open an issue first to discuss your ideas.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize this README to your liking. Good luck with your project! If you have any further questions or need additional assistance, feel free to ask.