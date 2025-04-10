const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/save-login', (req, res) => {
  const { username, password } = req.body;
  const entry = `Username: ${username}, Password: ${password}\n`;

  fs.appendFile('loginNotebook.txt', entry, (err) => {
    if (err) {
      return res.status(500).send('Failed to write to file');
    }
    res.send('Saved!');
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
