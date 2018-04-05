/* eslint-disable */
var circularLayoutHelper = require('./circularLayoutHelper');

module.exports = function (ecModel) {
  ecModel.eachSeriesByType('graphx', function (seriesModel) {
    if (seriesModel.get('layout') === 'circular') {
        circularLayoutHelper(seriesModel);
    }
  });
};
