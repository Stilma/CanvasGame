var CNV = (function (cnv) {
	cnv.canvasClick = function (e) {
		console.log("x = "+e.offsetX, "y = "+e.offsetY);
		var rect = new cnv.Rect(e.offsetX, e.offsetY);
		rect.draw();
	};
	/*private*/
		function Shape (x, y, ctx, color) {
			/*new Shape(1,2,3,4)*/
				/*new Shape()*/
				/*new Shape({y:3})*/
			var opts = {};
			if(typeof arguments[0] === 'object'){
				opts = arguments[0];
				x = null;
			}
			this.x = opts.x || x || 0;
			this.y = opts.y || y || 0;
			this.ctx = opts.ctx || ctx || cnv.ctx;
			this.color = opts.color || color || 'black';
		}

		Shape.prototype.draw = function (cb) {
			console.log('draw Shape');
			this.ctx.beginPath();
			cb();
			this.ctx.strokeStyle=this.color;
			// this.ctx.lineWidth="3";
			// this.ctx.fillStyle="wheat";
			// this.ctx.fill();
			this.ctx.stroke();
			this.ctx.closePath();
		};

	

	cnv.Rect = function(x, y, width, height, ctx, color) {
		Shape.call(this, x, y, ctx, color);
		var opts = {};
		if(typeof arguments[0] === 'object'){
			opts = arguments[0];
			x = null;
		}
		this.width = opts.width || width || 10;
		this.height = opts.height || height || 30;
	};

	cnv.Rect.prototype = Object.create(Shape.prototype);

	cnv.Rect.prototype.draw = function () {
		Shape.prototype.draw.call(this, rect.bind(this));

		function rect () {
			/*this != Rect*/
			return this.ctx.rect(this.x, this.y, 
				this.width, this.height);
		}
	};



	return cnv;
})(CNV);






