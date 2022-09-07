const express= require('express');
const router = express.Router();

const {RegisterUsers,LoginUser} = require('../controllers/users');


router.post('/register',RegisterUsers);
router.post('/login',LoginUser);

module.exports = router;