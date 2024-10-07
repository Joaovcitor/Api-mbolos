const Users = require("../db/models/Users");
const bcrypt = require("bcryptjs");

async function Store(req, res) {
  const { username, email, telephone, password } = req.body;

  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    console.log(hashedPassword);

    const user = await Users.findOne({ where: { email: email } });

    if (user) {
      return res.status(400).json({ errors: "Usuário já criado no sistema." });
    }

    const userCreate = {
      username: username,
      email: email,
      telephone: telephone,
      password: hashedPassword
    };

    const usuarioCriado = await Users.create(userCreate);

    req.session.userId = usuarioCriado.id;

    res.status(200).json({ success: "Usuário criado com sucesso" });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errors:
        "Ocorreu um erro desconhecido ao criar seu usuário, tente novamente."
    });
  }
}

module.exports = { Store };
