const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const claimController = require('../controllers/claimController');
const authMiddleware =  require("../middleware/authMiddleware")

router.post('/',authMiddleware,  inventoryController.createProduct);
router.get('/',authMiddleware, inventoryController.getAllProducts);
router.get('/:id',authMiddleware, inventoryController.getProductById);
router.patch('/:id',authMiddleware,inventoryController.updateProduct);
router.delete('/:id',authMiddleware,inventoryController.deleteProduct);

router.post('/:id/claims',authMiddleware,claimController.createClaim);      
router.get('/:id/claims',authMiddleware,claimController.getClaimsForProduct); 

module.exports = router;