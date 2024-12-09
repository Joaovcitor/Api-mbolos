const validator = require("validator");

function checkData(req, res, next) {
  const { username, email, telephone } = req.body;

  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .json({ errors: "E-mail é inválido, verifique o e-mail digitado" });
  }

  if (validator.isEmpty(username)) {
    return res.status(400).json({ errors: "Nome não pode ficar em branco" });
  }

  if (validator.isEmpty(telephone)) {
    return res.status(400).json({ errors: "Nome não pode ficar em branco" });
  }

  next();
}

module.exports = checkData;
