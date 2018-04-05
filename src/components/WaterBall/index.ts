import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import WithRender from './water.html?style=./water.scss';

const requestAnimationFrame = typeof window !== 'undefined' ? (function(w) {
  return w.requestAnimationFrame
    || w.webkitRequestAnimationFrame
    || function(callback) {
      w.setTimeout(callback, 1000 / 60);
    };
  }(window)) : undefined;

function waterball(canvas, p) {
  var percent = p;
  var ctx = canvas.getContext('2d');
  var width = canvas.width;
  var height = canvas.height;
  // canvas.height = height * window.devicePixelRatio;
  // canvas.width = width * window.devicePixelRatio;
  // ctx.scale(window.devicePixelRatio, window.devicePixelRatio);


  var nowRange = 0;   //用于做一个临时的range

  //圆属性
  var centerX = width / 2; //圆心
  var R = centerX; //圆半径
  var gradient = ctx.createLinearGradient(0, height, 0, 0);
  gradient.addColorStop(0, '#008E32');
  gradient.addColorStop(1, '#05C180');

  //Sin 曲线属性
  var sX = 0;
  var sY = height / 2;
  var waveWidth = 0.035;   //波浪宽度,数越小越宽
  var waveHeight = 6; //波浪高度,数越大越高
  var speed = 0.04; //波浪速度，数越大速度越快
  var xOffset = 0; //波浪x偏移量

  ctx.lineWidth = 1;

  //画圈函数
  var isDrawCircled = false;
  var drawCircle = function() {
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.arc(centerX, centerX, R - 1, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.fill();
    ctx.clip();
  }

  //画sin 曲线函数
  var drawSin = function(xOffset) {
    ctx.save();
    var points = [];  //用于存放绘制Sin曲线的点

    ctx.beginPath();
    //在整个轴长上取点
    for (var x = sX; x < sX + width; x += 20 / width) {
      //此处坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)”
      var y = -Math.sin((sX + x) * waveWidth + xOffset);

      var dY = height * (1 - nowRange / 100);

      points.push([x, dY + y * waveHeight]);
      ctx.lineTo(x, dY + y * waveHeight);
    }

    //封闭路径
    ctx.lineTo(width, height);
    ctx.lineTo(sX, height);
    ctx.lineTo(points[0][0], points[0][1]);
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.restore();

    points = null;
  };

  var render = function() {
    ctx.clearRect(0, 0, width, height);

    var rangeValue = percent;

    if (isDrawCircled === false) {
      drawCircle();
    }

    if (nowRange <= rangeValue) {
      var tmp = 1;
      nowRange += tmp;
    }

    if (nowRange > rangeValue) {
      var tmp = 1;
      nowRange -= tmp;
    }

    drawSin(xOffset);
    xOffset += speed;
    requestAnimationFrame(render)
  }
  render();
  return function(p) {
    percent = p;
  }
}

@WithRender
@Component
export default class WaterBall extends Vue {
  @Prop({default: 200}) width: number;
  @Prop({default: 200}) height: number;
  @Prop({default: 0}) percent: number;
  water = null;

  mounted () {
    const rect = this.$el.getBoundingClientRect();
    const w = Math.min(rect.width, rect.height);
    this.$refs.canvas.width = w - 20;
    this.$refs.canvas.height = w - 20;
    this.$refs.waterball.style.width = `${w - 20}px`;
    this.$refs.waterball.style.height = `${w - 20}px`;
    this.water = waterball(this.$refs.canvas, this.percent);
  }

  @Watch('percent')
  onPercentChange(nPercent) {
    if (this.water) {
      this.water(nPercent);
    }
  }

}
