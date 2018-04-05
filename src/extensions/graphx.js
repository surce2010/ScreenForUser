/* eslint-disable */
var echarts = require('echarts');
var zrUtil = require('zrender/lib/core/util');

require('./graphx/GraphSeries');
require('./graphx/GraphView');

require('./graphx/graphAction');

echarts.registerProcessor(require('./graphx/categoryFilter'));

echarts.registerVisual(zrUtil.curry(
    require('echarts/lib/visual/symbol'), 'graphx', 'circle', null
));
echarts.registerVisual(require('./graphx/categoryVisual'));
echarts.registerVisual(require('./graphx/edgeVisual'));

echarts.registerLayout(require('./graphx/circularLayout'));

// Graph view coordinate system
echarts.registerCoordinateSystem('graphxView', {
    create: require('./graphx/createView')
});
