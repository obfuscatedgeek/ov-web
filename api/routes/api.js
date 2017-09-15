const express = require('express');
const co_express_router = require('co-express-router');
const cities = require('all-the-cities');
const request = require('superagent');
const config = require('../../conf/env-config');

const router = express.Router();
co_express_router(router);

router.get('/', function * (req, res, next) {
  res.json({success: 'api get request'});
});

router.get('/demographics', function * (req, res, next) {
  const city_name = req.query.city_name;

  const city = cities.filter(city => {
    return city.name.match(city_name);
  });

  const user = req.session.passport.user;

 // save the stats in API
  const api_res = yield request.post(`${config.API}/api`).send({city: city_name, username: user.username});

  if (city.length === 0) return res.json(null);
  const demographic = yield request.get(`https://www.broadbandmap.gov/broadbandmap/demographic/2014/coordinates`)
    .query({
      latitude: city[0].lat,
      longitude: city[0].lon,
      format: 'json'
    });

  res.json(demographic.body.Results);
});

module.exports = router;
