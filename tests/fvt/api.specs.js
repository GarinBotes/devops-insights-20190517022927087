
(function () {

    'use strict';

    var apiv1 = require('../../routes/apiv1');
    var assert = require('chai').assert;
    var REQUEST = require('request');

    var request = REQUEST.defaults( {
        strictSSL: false
    });

    var appUrl = process.env.APP_URL;

    describe('Get Weather', function() {

    	it('with valid zip code', function(done) {
        if(!appUrl) {
            assert.fail("Environment variable APP_URL is not defined");
            return done();
        }
        request({
      		method: 'GET',
              url: appUrl + '/api/v1/getWeather?zip=3210'
          }, function(err, resp, body) {
          	if(err) {
          		assert.fail('Failed to get the response');
          	} else {
              assert.equal(resp.statusCode, 200);
              var pbody = JSON.parse(body);
              assert((pbody.city === 'Hamilton') || (pbody.city === 'Auckland'), "City name does not match");
              done();
            }
        });
    	});

      it('without zip code', function(done) {
        if(!appUrl) {
            assert.fail("Environment variable APP_URL is not defined");
            return done();
        }
        request({
      		method: 'GET',
              url: appUrl + '/api/v1/getWeather'
          }, /* @callback */ function(err, resp, body) {
          	if(err) {
          		assert.fail('Failed to get the response');
          	} else {
              assert.equal(resp.statusCode, 400);
              done();
            }
        });
    	});

      it('with another valid zip code', function(done) {
        if(!appUrl) {
            assert.fail("Environment variable APP_URL is not defined");
            return done();
        }
        request({
      		method: 'GET',
              url: appUrl + '/api/v1/getWeather?zip=1021'
          }, function(err, resp, body) {
          	if(err) {
          		assert.fail('Failed to get the response');
          	} else {
              assert.equal(resp.statusCode, 200);
              var pbody = JSON.parse(body);
              assert(pbody.city === 'Auckland', "City name does not match");
              done();
            }
        });
    	});
    });
})();
