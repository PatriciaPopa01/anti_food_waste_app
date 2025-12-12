const express = require('express');
const router = express.Router();
const claimController = require('../controllers/claimController');

// GET /claims 
router.get('/',authMiddleware, claimController.getClaims);

// PATCH /claims/:id (Acceptare/Respingere)
router.patch('/:id',authMiddleware, claimController.updateClaimStatus);

module.exports = router;