const {verify} = require('jsonwebtoken');
const {User: UserModel} = require('../Models');
const Category = require('../Models').Category;

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

      const newCategory = await Category.create({
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
      const categories = await Category.findAll({
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
    // const authUser = UserModel.getAuthUser(req.headers.authorization);
    // console.log({authUser});
    // process.exit();

    console.log({user: req.user});
    process.exit();

    try {
      const categories = await Category.findAll({
            include: [UserModel],
          },
      );
      res.json(categories);
    } catch (e) {
      console.log({e});

      res.status(500).json({error: 'Error getting categories'});
    }
  }
}

module.exports = CategoriesController;
