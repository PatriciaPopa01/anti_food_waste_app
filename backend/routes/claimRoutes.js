const express = require('express');
const router = express.Router();
const claimController = require('../controllers/claimController');
const authMiddleware = require("../middleware/authMiddleware")

// GET /claims 
router.get('/',authMiddleware, claimController.getClaims);

// PATCH /claims/:id (Acceptare/Respingere)
router.patch('/:id',authMiddleware, claimController.updateClaimStatus);

module.exports = router;