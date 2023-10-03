const {hashPassword, compare} = require('../Utils/UtilsCrypto');
const UserModel = require('../Models').User;
const jwt = require('jsonwebtoken');

class AuthController {
  static async login(req, res) {
    try {
      const {email, password} = req.body;
      const user = await UserModel.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        res.status(401).json({message: 'not valid credentials '});
      }

      const passwordHashedOnDb = user.password;

      if (await compare(password, passwordHashedOnDb)) {
        console.log({message: 'login'});
        const token = await jwt.sign({user}, 'Picosos', {
          expiresIn: 3000,
        });
        return res.status(200).json({token});
      }

      return res.status(401).json({message: 'not valid credentials '});

    } catch (e) {
      console.log({e});

      res.status(500).json({error: 'Error creating user'});
    }
  }

  static async logout(req, res) {
    try {
      const users = await UserModel.findAll();

      res.status(200).json(users);

    } catch (e) {
      console.log({e});

      res.status(500).json({error: 'Error getting user'});
    }
  }

  static async reload(req, res) {
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

}

module.exports = AuthController;
