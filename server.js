const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const base64EncodeNumber = async (req, res) => {
  const { input } = req.body;
  if (typeof input !== 'number') {
    return res.status(400).send({ error: 'Input must be a number' });
  }
  const output = Buffer.from(input.toString()).toString('base64');
  res.send({ output });
};

app.post('/functions/base64EncodeNumber', base64EncodeNumber);

const docs = {
  name: "base64EncodeNumber",
  description: "Encode a number to base64",
  input: {
    type: "number",
    description: "Input the number you'd like to encode to base64",
    example: 42
  },
  output: {
    type: "string",
    description: "Base64 encoded string",
    example: "NDI="
  }
};

app.get('/functions/base64EncodeNumber', (req, res) => {
  res.json(docs);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
