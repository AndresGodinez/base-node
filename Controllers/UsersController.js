const UserModel = require('../Models').User;

class UsersController {
  static async createUser(req, res) {
    try {
      const {firstName, lastName, email} = req.body;
      const user = await UserModel.create({
        firstName,
        lastName,
        email,
      });

      res.status(201).json(user);

    } catch (e) {
      console.log({e});

      res.status(500).json({error: 'Error creating user'});
    }
  }

  static async listUsers(req, res) {
    try {
      const users = await UserModel.findAll();

      res.status(200).json(users);

    } catch (e) {
      console.log({e});

      res.status(500).json({error: 'Error getting user'});
    }
  }

  // static async index(req, res) {
  //   try {
  //     const categories = await Category.findAll();
  //     res.json(categories);
  //
  //   } catch (e) {
  //     console.log({e});
  //
  //     res.status(500).json({error: 'Error getting categories'});
  //   }
  // }
}

module.exports = UsersController;
