const express = require('express')
const router = express.Router()
const productController = require('../controllers/Product');

router.get('/products', productController.getProducts);
router.post("/find_product/:filter", productController.findProducts);
router.get("/product_details/:product_id", productController.getProductDetails);
router.post("/add_product", productController.postAddNewProduct);
router.post("/update_product/:product_id", productController.postUpdateProduct);
router.get("/delete_product/:product_id", productController.getDeleteProduct);

module.exports = router;
