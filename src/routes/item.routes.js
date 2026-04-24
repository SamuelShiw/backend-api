const express = require('express');
const router = express.Router();

const itemController = require('../controllers/item.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

router.get('/api/items', authMiddleware, itemController.getItems);
router.get('/api/items/:id', authMiddleware, itemController.getItemById);

router.post('/api/items', authMiddleware, roleMiddleware(["admin"]), itemController.createItem);
router.put('/api/items/:id', authMiddleware, roleMiddleware(["admin"]), itemController.updateItem);
router.delete('/api/items/:id', authMiddleware, roleMiddleware(["admin"]), itemController.deleteItem);

module.exports = router;