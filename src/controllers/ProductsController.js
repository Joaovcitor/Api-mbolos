const Products = require("../db/models/Products");

module.exports = class ProductController {
  static async store(req, res) {
    const { name, description, price } = req.body;

    try {
      const produtoCriado = {
        name: name,
        description: description,
        price: price
      };

      await Products.create(produtoCriado);
      res.status(200).json({ success: "Produto criado com sucesso!" });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errors:
          "Ocorreu um erro desconhecido ao criar seu produto, tente novamente!"
      });
    }
  }

  static async index(req, res) {
    try {
      const produtos = await Products.findAll();
      res.status(200).json({ produtos });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        errors: "Ocorreu um erro desconhecido ao procurar os produtos"
      });
    }
  }

  static async show(req, res) {
    const id = req.params.id;

    try {
      const produto = await Products.findOne({ where: { id: id } });
      res.status(200).json({ produto });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ errors: "Ocorreu um erro ao procurar esse produto!" });
    }
  }

  static async update(req, res) {
    const { name, description, price } = req.body;
    const id = req.params.id;

    try {
      const produtoAtualizado = {
        name: name,
        description: description,
        price: price
      };

      await Products.update(produtoAtualizado, { where: { id: id } });
      res.status(200).json({ success: "Produto atualizado com sucesso!" });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ errors: "Ocorreu um erro ao atualizar seu produto!" });
    }
  }
};
