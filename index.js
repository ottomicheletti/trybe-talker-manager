const express = require('express');
const bodyParser = require('body-parser');
const generator = require('generate-password');
const { readFile } = require('./helpers/readWriteFile');
const { validateLogin } = require('./middleware/validations');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// Requisito 01
app.get('/talker', async (_req, res) => {
  const data = await readFile();
  if (data.lenght === 0) {
    res.status(200).json([]);
  } else {
    res.status(200).json(data);
  }
});

// Requisito 02
app.get('/talker/:id', async (req, res) => {
  const data = await readFile();
  const { id } = req.params;

  const targetTalker = data.find((talker) => Number(talker.id) === Number(id));

  if (!targetTalker) {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } else {
    res.status(200).json(targetTalker);
  }
});

// Requisito 03
app.post('/login', validateLogin, (_req, res) => {
  const token = generator.generate({ length: 16, numbers: true });
  res.status(200).json({ token });
});
