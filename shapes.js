var CNV = (function (cnv) {
	// cnv.canvasClick = function (e) {
	// 	console.log('x = ' + e.offsetX, 'y = ' + e.offsetY);
	// 	var rect = new cnv.Rect(e.offsetX, e.offsetY);
	// 	rect.draw();
	// };

/*	cnv.canvasOnmousemove = function (e) {
		console.log('x = ' + e.offsetX, 'y = ' + e.offsetY);
		var arc = new cnv.Arc(e.offsetX, e.offsetY);
		arc.draw();
	};*/


	/*Private*/
	function Shape (x, y, ctx, color) {

		var options = {};
		if (typeof arguments[0] ==='object') {
			options = arguments[0];
			x = null;
		}

		console.log(options + ' options');
		console.log(x + ' x')

		this.x = options.x || x || 0;
		this.y = options.y || y || 0;
		this.ctx = options.ctx || ctx|| cnv.ctx;
		this.color = options.color || color || 'black'; 

	}

	Shape.prototype.draw = function (cb){
		// console.log('draw Shape');
		this.ctx.beginPath();
		cb();
		this.ctx.strokeStyle = this.color;
		this.ctx.stroke();
		this.ctx.closePath();
	};

	Shape.prototype.move = function (newX, newY) {
		this.x = newX;
		this.y = newY;
	}

	cnv.Rect = function (x, y, width, height, ctx, color) {
		Shape.call(this, x, y, ctx, color);
			var options = {};
			if (typeof arguments[0] ==='object') {
				options = arguments[0];
				x = null;
			};
			console.log(options + ' options');
			console.log(x + ' x')

			this.width = options.width || width || 30;
			this.height = options.height || height || 30;
	};

	cnv.Rect.prototype = Object.create(Shape.prototype);

	cnv.Rect.prototype.draw = function (){
		Shape.prototype.draw.call(this, rect.bind(this));			

		function rect () {
			/*this != Rect*/
			return this.ctx.rect(this.x, this.y, this.width, this.height);
		}
	};

	cnv.Arc = function (x, y, r, angleCircle1,angleCircle2, ctx, color) {
		Shape.call(this,x, y, r, angleCircle1, angleCircle2, ctx, color);
			var options = {};
			if (typeof arguments[0] ==='object') {
				options = arguments[0];
				x = null;
			};

			this.r = options.r || r || 10;
			this.angleCircle1 = options.angleCircle1 || angleCircle1 || 0;
			this.angleCircle2 = options.angleCircle2 || angleCircle2 ||  2*Math.PI;
			
	};

	cnv.Arc.prototype = Object.create(Shape.prototype);

	cnv.Arc.prototype.draw = function (){
		Shape.prototype.draw.call(this, arc.bind(this));			

		function arc () {
			/*this != Rect*/
			return this.ctx.arc(this.x, this.y, this.r,this.angleCircle1, this.angleCircle2, this.ctx, this.color);
		}
	};




	return cnv;
})(CNV);



