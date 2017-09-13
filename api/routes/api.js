const express = require('express');
const co_express_router = require('co-express-router');

const router = express.Router();
co_express_router(router);

router.get('/', function * (req, res, next) {
  res.json({success: 'api get request'});
});

module.exports = router;
