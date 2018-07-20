/**
 * @author yuwei
 * @version 1.0
 */
/*--词云构造函数--*/
function CarWCloud(dom, imgSrc) {
    this.dom = dom;
    this.imgSrc = imgSrc;
    this.axis = [];
    this._init();
    this.keyName = 'name';
    this.valueName = 'value';
}

function Rectangle(tlp, lrp) {
    this.tlp = tlp;
    this.lrp = lrp;
}

CarWCloud.prototype = {
    /*--初始化--*/
    _init: function() {
        //判断画布是否已经存在，如果存在先清空
        if (this.dom.childNodes[0]) {
            this.dom.removeChild(this.dom.childNodes[0]);
        }
        //创建画布
        var canvas = document.createElement("canvas");
        var text = document.createTextNode("sorry!您的浏览器版本太低...");
        canvas.appendChild(text);
        canvas.width = this.dom.offsetWidth;
        canvas.height = this.dom.offsetHeight;
        this.dom.appendChild(canvas);
        this.canvas = canvas;
        if (canvas.getContext) {
            var ctx = this.ctx = canvas.getContext('2d');
        };
    },
    /*--数据排序--*/
    _sort: function() {
        return this.data.sort(function(v1, v2) {
            if (parseInt(v1[this.valueName]) > parseInt(v2[this.valueName])) {
                return -1 } else if (parseInt(v1[this.valueName]) < parseInt(v2[this.valueName])) {
                return 1 } else return 0;
        });
    },
    /*--画图--*/
    draw: function(data) {
        if (data == null || data.length == 0)
            throw new Error('data can not be empty');
        if (data[0].word) {
            this.keyName = 'word';
            this.valueName = 'heat';
        }
        this.data = data;
        var carimg = new Image();
        var _this = this;
        carimg.src = _this.imgSrc;
        carimg.onload = function() {
            var canvas = _this.canvas;
            var imgScale = carimg.width / canvas.width;
            var newHeigth = carimg.height / imgScale;
            var y = (canvas.height - newHeigth) / 2;
            /*--图片居中显示--*/
            _this.ctx.drawImage(this, 0, y, canvas.width, newHeigth);
            _this._drawText();
        }
    },
    /*--添加词--*/
    _drawText: function() {
        //将原坐标移到中心点
        this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
        var data = this._sort();
        var avg;
        if (data.length > 2) {
            avg = this._sum() / (data.length - 2);
        } else {
            avg = data[0][this.valueName];
        }
        var maxSize = 30;
        var minSize = 8;

        var i = 0,
            _this = this;
        var intervalId,
            colors = ['#4e4b4e', '#ff6f40'];
        intervalId = setInterval(function() {
            if (i < data.length) {
                _this.ctx.save();
                _this.ctx.fillStyle = i%2==0 ? colors[0] : colors[1];
                var size = (data[i][_this.valueName] / avg) * 10;
                size = size > maxSize ? maxSize :
                    (size < minSize ? minSize : size);
                var fontsize = size + "pt 微软雅黑";
                _this.ctx.font = fontsize;
                var text = data[i][_this.keyName];
                var tWidth = _this.ctx.measureText(text).width;
                var tHeight = size;
                var x, y, scale = 1;
                /*--循环碰撞测验--*/
                for (var j = 0;; j++) {
                    x = _this._normalInt(-_this.canvas.width / 2, _this.canvas.width / 2, 10 / (i + 1)) - tWidth / 2;
                    y = _this._normalInt(-_this.canvas.height / 2, _this.canvas.height / 2, 10 / (i + 1)) + tHeight / 2;
                    var tlp = {},
                        lrp = {};
                    tlp.x = x + _this.canvas.width / 2;
                    tlp.y = y - tHeight + _this.canvas.height / 2;
                    lrp.x = tlp.x + tWidth + 3;
                    lrp.y = tlp.y + tHeight + 3;
                    var rect = new Rectangle(tlp, lrp);

                    var isCollision = _this._collision(
                        _this.ctx.getImageData(
                            tlp.x,
                            tlp.y,
                            tWidth + 3,
                            tHeight + 3), rect);
                    if (!isCollision) {
                        _this.axis.push(rect);
                        _this.ctx.fillText(text, x, y);
                        _this.ctx.restore();
                        i++;
                        break;
                    }
                    //防止死循环导致内存溢出
                    if (j > 200) {
                        i++;
                        break;
                    }
                }
            } else {
                clearInterval(intervalId);
            }
        }, 50);
    },
    /*--获取随机正态分布坐标,n值越大越接近中心点--*/
    _normalInt: function(min, max, n) {
        n = n == 0 ? 1 : n;
        var arr = [];
        for (var i = 0; i < n; i++) {
            arr[i] = Math.random();
        };
        return Math.floor(arr.reduce(function(i, j) {
                    return i + j }) / n * (max - min)) + min;
    },
    /*--碰撞检测--*/
    _collision: function(wordImageData, rect) {

        for (var wy = 0; wy < this.axis.length; wy++) {
            if (this.isRectOverlap(rect, this.axis[wy])) {
                return true;
            }
        }
        var wdata = wordImageData.data;
        for (var wy = 0; wy < wdata.length; wy += 4) {
            if (wdata[wy] != 213 || wdata[wy + 1] != 241 || wdata[wy + 2] != 255 || wdata[wy + 3] != 255)
                return true;
        };
        return false;
    },
    _sum: function() {
        var tmp = 0;
        for (var i = 1; i < this.data.length - 1; i++) {
            tmp += parseInt(this.data[i][this.valueName]);
        }
        return tmp;
    },
    getDataURL: function() {
        return this.canvas.toDataURL();
    },
    /*--判断两个矩形是否重叠--*/
    isRectOverlap: function(r1, r2) {
        var m = (r1.tlp.x > r2.lrp.x) | (r1.lrp.x < r2.tlp.x);
        var n = (r1.lrp.y < r2.tlp.y) | (r1.tlp.y > r2.lrp.y);
        return !(m | n);
    }
}
