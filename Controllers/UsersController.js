const {hashPassword} = require('../Utils/UtilsCrypto');
const {verify} = require('jsonwebtoken');
const UserModel = require('../Models').User;

class UsersController {
  static async createUser(req, res) {
    try {
      const {firstName, lastName, email, password} = req.body;
      const hashedPassword = await hashPassword(password);

      const user = await UserModel.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
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
    const {firstName, lastName, email, password} = req.body;
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
      if (password) {
        user.password = await hashPassword(password);
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

  static async whoAmI(req, res) {
    try {
      const token = req.headers.authorization.replace('Bearer ', '');
      const decodedToken = verify(token, process.env.SECRET_KEY);
      const user = decodedToken.user;

      let userDb = await UserModel.findByPk(user.id);
      if (!userDb) {
        new Error('User not found');
      }

      res.status(200).json(userDb);

    } catch (e) {

      res.status(500).json({error: 'Error getting user'});

    }
  }
}

module.exports = UsersController;
