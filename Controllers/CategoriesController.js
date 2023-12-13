const {verify} = require('jsonwebtoken');
const {User: UserModel} = require('../Models');
const CategoryModel = require('../Models').Category;
const CostModel = require('../Models').Cost;

class CategoriesController {
  static async createCategory(req, res) {
    const token = req.headers.authorization.replace('Bearer ', '');
    const decodedToken = verify(token, process.env.SECRET_KEY);
    const user = decodedToken.user;

    let userDb = await UserModel.findByPk(user.id);

    if (!(userDb)) {
      new Error('user not found');
    }

    try {
      const {name} = req.body;
      const short_name = name.substring(0, 4);

      const newCategory = await CategoryModel.create({
        name,
        short_name,
        userId: userDb.id,
      });

      res.status(201).json(newCategory);

    } catch (e) {
      console.log({e});

      res.status(500).json({error: 'Error creating user'});
    }
  }

  static async index(req, res) {
    try {
      const categories = await CategoryModel.findAll({
            where: {
              userId: req.user.id,
            },
            include: [UserModel],
          },
      );
      res.json(categories);
    } catch (e) {
      console.log({e});

      res.status(500).json({error: 'Error getting categories'});
    }
  }

  static async updateCategory(req, res) {
    try {
      const id = req.params.id;
      const categoryToUpdate = await CategoryModel.findByPk(id);
      if (!categoryToUpdate) {
        res.status(400).json({error: 'Category not found'});
      }

      if (categoryToUpdate.userId !== req.user.id) {
        res.status(401).json({error: 'Cant update if you not are the owner'});
      }

      const name = req.body.name;

      await categoryToUpdate.update({
        name: name,
        short_name: name.substring(4),
      });

      const response = await categoryToUpdate.reload();

      res.status(200).json(response);

    } catch (e) {
      console.log({e});

      res.status(500).json({error: 'Error updating category'});
    }
  }

  static async deleteCategory(req, res) {
    try {
      const id = req.params.id;
      const categoryToDelete = await CategoryModel.findByPk(id);
      if (!categoryToDelete) {
        res.status(404).json({error: 'Category not found'});
      }

      if (categoryToDelete.userId !== req.user.id) {
        res.status(401).json({error: 'Unauthorized'});
      }

      const costs = await CostModel.findAll({
        where: {
          categoryId: categoryToDelete.id,
        },
      });
      if (!!costs.length) {
        res.status(403).
            json({error: 'Cannot delete category, it has associated costs'});

      }
      await categoryToDelete.destroy();

      res.status(204).send()

    } catch (e) {
      console.log({e});
      res.status(500).json({error: 'Error deleting category'});

    }
  }
}

module.exports = CategoriesController;
