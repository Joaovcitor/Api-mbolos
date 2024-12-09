const Users = require("../db/models/Users");
const bcrypt = require("bcryptjs");

module.exports = class UsersController {
  static async Store(req, res) {
    const { username, email, telephone, password } = req.body;

    try {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const user = await Users.findOne({ where: { email: email } });

      if (user) {
        return res
          .status(400)
          .json({ errors: "Usuário já criado no sistema." });
      }

      const userCreate = {
        username: username,
        email: email,
        telephone: telephone,
        password: hashedPassword
      };

      await Users.create(userCreate);

      res.status(200).json({ success: "Usuário criado com sucesso" });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errors:
          "Ocorreu um erro desconhecido ao criar seu usuário, tente novamente."
      });
    }
  }
};
