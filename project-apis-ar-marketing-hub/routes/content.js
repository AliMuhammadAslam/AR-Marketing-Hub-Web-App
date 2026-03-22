const express = require('express')
const router = express.Router()
const aboutController = require('../controllers/About');
const homeController = require('../controllers/Home');
const userController = require('../controllers/User');

router.get('/about', aboutController.getAbout);
router.post('/addAbout', aboutController.postAddAbout);

router.get('/home', homeController.getHome);
router.post('/addHome', homeController.postAddHome);

router.post("/product_details/:user_id/:product_id/comment", userController.postNewProdComment);
router.post("/update_profile/:user_id", userController.postUpdateUserInfo);

module.exports = router;
