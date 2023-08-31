const Category = require('../Models').Category;


class CategoriesController {
  static async createCategory(req, res) {
    try {
      const {firstName, lastName, email} = req.body;
      console.log({firstName, lastName, email});
      res.json({message: 'categories'});

    } catch (e) {
      res.status(500).json({error: 'Error creating user'});
    }
  }

  static async index(req, res) {
    try {
      const categories = await Category.findAll();
      res.json(categories);

    } catch (e) {
      console.log({e});

      res.status(500).json({error: 'Error getting categories'});
    }
  }
}

module.exports = CategoriesController;
