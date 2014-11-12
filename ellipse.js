var CNV = (function (cnv) {
	cnv.canvasClick = function (e) {
		console.log('x = ' + e.offsetX, 'y = ' + e.offsetY);
		var arc = new cnv.Arc(e.offsetX, e.offsetY);
		arc.draw();
	};



	/*Private*/
	function Shape (x, y, ctx, color) {

		var options = {};
		if (typeof arguments[0] ==='object') {
			options = arguments[0];
			x = null;
		}

		this.x = options.x || x || 0;
		this.y = options.y || y || 0;
		this.ctx = options.ctx || ctx|| cnv.ctx;
		this.color = options.color || color || 'black'; 

	}

	Shape.prototype.draw = function (cb){
		console.log('draw Shape');
		this.ctx.beginPath();
		cb();
		this.ctx.strokeStyle = this.color;
		this.ctx.stroke();
		this.ctx.closePath();
	};

	cnv.Arc = function (x, y, radius, angle, angleCircle1,angleCircle2, ctx, color) {
		Shape.call(this,x, y, radius, angle, angleCircle1, angleCircle2, ctx, color);
			var options = {};
			if (typeof arguments[0] ==='object') {
				options = arguments[0];
				x = null;
			};

			this.radius = options.radius || radius || 20;
			this.angle = options.angle || angle || 20;
			this.angleCircle1 = options.angleCircle1 || angleCircle1 || 10;
			this.angleCircle2 = options.angleCircle2 || angleCircle2 || 10;
			
	};

	cnv.Arc.prototype = Object.create(Shape.prototype);

	cnv.Arc.prototype.draw = function (){
		Shape.prototype.draw.call(this, arc.bind(this));			

		function arc () {
			/*this != Rect*/
			return this.ctx.arc(this.x, this.y, this.radius, this.angle,this.angleCircle1, this.angleCircle2, this.ctx, this.color);
		}
	};

	return cnv;
})(CNV);



