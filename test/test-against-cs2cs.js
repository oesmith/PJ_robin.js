var vows = require('vows'),
    assert = require('assert'),
    async = require('async'),
    fs = require('fs'),
    Robinson = require('../pj_robin');

function readData(filename, callback) {
  fs.readFile(filename, 'utf8', function(err, data) {
    if(err)
      callback(err);
    else {
      callback(null, data.trim().split('\n').map(function(line) {
        return line.split(' ').map(parseFloat);
      }));
    }
  });
}

vows.describe('Output matches cs2cs').addBatch({
  'projecting data': {
    topic: function() {
      async.parallel([
        function(cb) {
          readData('test/places-unprojected.txt', function(err, data) {
            if(err)
              cb(err);
            else {
              cb(null, data.map(function(ll) {
                var pt = Robinson.project(ll[1], ll[0]);
                return [pt.x, pt.y];
              }));
            }
          });
        },
        function(cb) {
          readData('test/places-projected.txt', cb);
        }], this.callback);
    },
    'matches sample output': function(err, topic) {
      assert.isNull(err);
      assert.equal(topic[0].length, topic[1].length);
      for(var i=0; i<topic[0].length; i++) {
        assert.ok(Math.abs(topic[0][i][0] - topic[1][i][0]) < 0.00001);
        assert.ok(Math.abs(topic[0][i][1] - topic[1][i][1]) < 0.00001);
      }
    }
  }
}).export(module);