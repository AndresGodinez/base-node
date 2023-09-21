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

  static async updateUser(req, res) {
    const {id} = req.params;
    const {firstName, lastName, email} = req.body;
    try {
      let user = await UserModel.findByPk(id);
      if (firstName) {
        user.firstName = firstName;
      }
      if (lastName) {
        user.lastName = lastName;
      }
      if (email) {
        user.email = email;
      }
      await user.save();
      user = await user.reload();

      res.status(200).json(user);

    } catch (e) {
      console.log({e});

      res.status(500).json({error: 'Error updating user'});
    }
  }

  static async deleteUser(req, res) {
    const {id} = req.params;
    try {
      let user = await UserModel.findByPk(id);
      await user.destroy();
      res.status(204).send();

    } catch (e) {

      res.status(500).json({error: 'Error deleting user'});

    }
  }
}

module.exports = UsersController;
