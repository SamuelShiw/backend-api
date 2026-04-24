const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

// SOLO ADMIN puede cambiar roles
router.put(
  '/api/users/:id/role',
  authMiddleware,
  roleMiddleware(["admin"]),
  userController.updateUserRole
);

module.exports = router;