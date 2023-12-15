const {verify} = require('jsonwebtoken');
const {User: UserModel} = require('../Models');
const categoryModel = require('../Models').Category;
const CostModel = require('../Models').Cost;

class CostController {
  static async createCost(req, res) {
    try {
      const {name, amount, category_id} = req.body;

      const newCost = await CostModel.create({
        name,
        amount,
        categoryId: category_id,
        userId: req.user.id,
      });

      res.status(201).json(newCost);

    } catch (e) {
      console.log({e});

      res.status(500).json({error: 'Error creating cost'});
    }
  }

  static async indexCost(req, res) {
    try {
      const costs = await CostModel.findAll({
            where: {
              userId: req.user.id,
            },
            include: [UserModel, categoryModel],
          },
      );
      res.json(costs);
    } catch (e) {
      console.log({e});

      res.status(500).json({error: 'Error getting categories'});
    }
  }

  static async updateCost(req, res) {
    try {
      const id = req.params.id;
      const costToUpdate = await CostModel.findByPk(id);

      if (!costToUpdate) {
        res.status(400).json({error: 'Cost not found'});
      }

      if (costToUpdate.userId !== req.user.id) {
        res.status(401).json({error: 'Cant update if you not are the owner'});
      }

      const {name, amount} = req.body;

      await costToUpdate.update({
        name: name,
        amount: amount,
      });

      const dataUpdated = await costToUpdate.reload();

      res.status(200).json(dataUpdated);

    } catch (e) {
      console.log({e});

      res.status(500).json({error: 'Error updating cost'});
    }
  }

  static async deleteCost(req, res) {
    try {
      const id = req.params.id;
      const costToDelete = await CostModel.findByPk(id);

      if (!costToDelete) {
        res.status(404).json({error: 'Cost not found'});
      }

      if (costToDelete.userId !== req.user.id) {
        res.status(401).json({error: 'Unauthorized'});
      }

      await costToDelete.destroy();

      return res.status(204).send();

    } catch (e) {
      console.log({e});
      res.status(500).json({error: 'Error deleting Cost'});

    }
  }
}

module.exports = CostController;
