const validator = require('email-validator');

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400)
      .json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validator.validate(email)) {
    return res.status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(400)
      .json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  const authRegex = /^\w{16}/g;
  if (!authorization) {
    return res.status(401)
      .json({ message: 'Token não encontrado' });
  }
  if (!authRegex.test(authorization)) {
    return res.status(401)
      .json({ message: 'Token inválido' });
  }
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  const nameRegex = /^\w{3,}/g;
  if (!name) {
    return res.status(400)
      .json({ message: 'O campo "name" é obrigatório' });
  }
  if (!nameRegex.test(name)) {
    return res.status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400)
      .json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validateTalkField = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400)
      .json({ message: 'O campo "talk" é obrigatório' });
  }
  next();
};

const validateWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const dateRegex = /^([0-3]\d)\/([0-1]\d)\/(\d{4})/g;
  if (!watchedAt) {
    return res.status(400)
      .json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!dateRegex.test(watchedAt)) {
    return res.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const validateRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (!rate && rate !== 0) {
    return res.status(400)
      .json({ message: 'O campo "rate" é obrigatório' });
  }
  if (rate < 1 || rate > 5) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
}
next();
};

module.exports = {
  validateLogin,
  validateToken,
  validateName,
  validateAge,
  validateTalkField,
  validateWatchedAt,
  validateRate,
};
