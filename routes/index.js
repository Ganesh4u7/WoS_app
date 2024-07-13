const router = require("express").Router();

const authenticate = require("../utils/authenticate");

// const user_login = require('../controllers/login');
// const user_signup = require('../controllers/signup');

const add_user_to_moe = require('../controllers/add_user_to_moe');
const delete_user_in_moe = require('../controllers/delete_user_in_moe');
const get_moe_users = require('../controllers/get_moe_users');

const add_user_to_vp = require('../controllers/add_user_to_vp');
const delete_user_in_vp = require('../controllers/delete_user_in_vp');
const get_vp_users = require('../controllers/get_vp_users');

router.post('/add_user_to_moe',add_user_to_moe);
router.post('/delete_user_in_moe',delete_user_in_moe);
router.post('/get_moe_users',get_moe_users);

router.post('/add_user_to_vp',add_user_to_vp);
router.post('/delete_user_in_vp',delete_user_in_vp);
router.post('/get_vp_users',get_vp_users);

// router.post('/login',user_login);
// router.post('/signup',user_signup);




module.exports = router;