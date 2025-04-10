// server.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/save-login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Missing fields");
  }

  const entry = `Username: ${username}\nPassword: ${password}\n\n`;
  fs.appendFile("loginNotebook.txt", entry, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error saving login");
    }
    res.status(200).send("Saved");
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
