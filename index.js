const express = require('express');
const bodyParser = require('body-parser');
const generator = require('generate-password');
const { readFile, writeFile } = require('./helpers/readWriteFile');
const {
  validateLogin,
  validateToken,
  validateName,
  validateAge,
  validateTalkField,
  validateWatchedAt,
  validateRate,
} = require('./middleware/validations');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// Não remova esse endpoint, é para o avaliador funcionar
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

// Requisito 03 e 04
app.post('/login', validateLogin, (_req, res) => {
  const token = generator.generate({ length: 16, numbers: true });
  res.status(200).json({ token });
});

// Requisito 05
app.post('/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalkField,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const data = await readFile();
  data.push({ id: data.length + 1, name, age, talk: { watchedAt, rate } });
  await writeFile(data);

  res.status(201).json({
    id: data.length,
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  });
});

// Requisito 06
app.put('/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalkField,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const data = await readFile();
  const talkerIndex = data.findIndex((talker) => Number(talker.id) === Number(id));
  data[talkerIndex] = { name, age, id: Number(id), talk: { watchedAt, rate } };
  await writeFile(data);

  res.status(200).json({
    name,
    age,
    id: Number(id),
    talk: {
      watchedAt,
      rate,
    },
  });
});

// Requisito 07
app.delete('/talker/:id',
  validateToken,
  async (req, res) => {
  const { id } = req.params;
  const data = await readFile();
  const talkerIndex = data.findIndex((talker) => Number(talker.id) === Number(id));
  data.splice(talkerIndex, 1);
  await writeFile(data);

  res.status(204).end();
});
