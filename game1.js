var CNV = (function (cnv) {
	var controls = {
		left: 37,
		right: 39
	};
	var settings = {
		rows: 3,
		message : '',
		
	};
	cnv.startGame = function () {

		this.Game = {
			ball: new cnv.Arc({x:450, y:225, r: 30}),
			player: new cnv.Rect({x:400, y:430, width:80, height:20}),
			blocks: makeBlocks(),
			scores: 0,
			render: function () {
				// body...
				// var self = this;
				cnv.ctx.font = "40px Georgia";
				cnv.ctx.fillStyle = '#eee';
				settings.message = this.scores.toString();
				var textWidth = cnv.ctx.measureText(settings.message).width;
				
				console.log(textWidth, 'message.width');
				cnv.ctx.fillText(settings.message, (cnv.width/2 - textWidth/2), cnv.height/2);
				
				fly(this.ball);
				this.ball.draw();
				this.player.draw();
				for (var i = 0; i < this.blocks.length; i++) {
					if(hitBlock(this.ball, this.blocks[i])){
						this.blocks.splice(i, 1);
					}
					this.blocks[i].draw();
				};
				// console.log('this.player.x', this.player.x);
				// this.player.move(this.player.x+1, this.player.y);

			}
		};
		this.Game.player.speed = 20;
		this.Game.ball.speed = 5;
		this.Game.ball.angle = 35;

		animate();
		return this.Game;
	};

	function makeBlocks () {
		var blockWidth = cnv.width/10;
		var blocks = cnv.width/blockWidth;
		var rectBlocks = [];
		var blockHeight = 30;
		for (var i = 0; i < settings.rows; i++) {
			var y = i*(blockHeight+1);

			for (var j = 0; j < blocks; j++) {
				var x = blockWidth * j;
				rectBlocks.push(new cnv.Rect(x, y, blockWidth-1, blockHeight));
			};
		};
		return rectBlocks;
	};

	window.addEventListener('keydown', control, false);

	function control (e) {
		var player = cnv.Game.player;
		console.log(e.keyCode);
		if(e.keyCode == controls.left){
			if(player.x > 0){
				player.move(player.x-player.speed, player.y);
			}
		} else if(e.keyCode == controls.right){
			if(player.x+player.width < cnv.width){
				player.move(player.x+player.speed, player.y);
			}
		}
	};

	function animate () {
		cnv.clear();
		cnv.Game.render();
	};

	function fly (ball) {
		// var ball = cnv.Game.ball;
		// console.log(ball.angle);
		bounceWall(ball);
		var velocity = {
			x: Math.cos(ball.angle*(Math.PI/180)) * ball.speed, 
			y: Math.sin(ball.angle*(Math.PI/180)) * ball.speed
		};
		ball.move(ball.x+velocity.x, ball.y+velocity.y);
	};

	function bounceWall (ball) {
		// body...
		var player = cnv.Game.player;
		if((ball.x-ball.r) <= 0 || (ball.x+ball.r) >= cnv.width){
			ball.angle = 180 - ball.angle;
		} else if((ball.y-ball.r) <= 0 ){
			console.log(ball.angle);
			ball.angle = 360 - ball.angle;
		} else if ((ball.y+ball.r) > cnv.height){
			gameOver();
		} else if((ball.y+ball.r) >= player.y && 
			(ball.x+ball.r >= player.x && ball.x-ball.r <= player.x+player.width)){
			ball.angle = 360 - ball.angle;
		}
	}

	function gameOver () {
		// cnv.ctx.font = "40px Georgia";
		settings.message = 'Game over!';
		// cnv.clear();
		// cnv.Game.render();
		// var textWidth = cnv.ctx.measureText(settings.message).width;
		// var textHeight = cnv.ctx.measureText(settings.message).height;
		// cnv.ctx.clearRect(0, 0, cnv.ctx.width, cnv.ctx.height);
		// cnv.ctx.fillText(settings.message, (cnv.width/2 - textWidth/2), cnv.height/2);
		// cnv.stop();
	}

	function hitBlock (ball, block) {
		var blockLeft = {
			y: block.y + block.height
		};
		var blockRight = {
			x: block.x + block.width,
			y: block.y + block.height
		}
		var ballSide = {
			y: ball.y-ball.r,
			x: ball.x+ball.r
		};
		if(ballSide.y <= blockLeft.y && 
			(ballSide.x >= block.x 
				&& ballSide.x <= blockRight.x)){
			console.log('Hit!!!!!');
			return true;
		}
		return false;
	}

	var interval;

	cnv.start = function () {
		this.startGame();
		interval = setInterval(animate, 30);
	}
	cnv.stop = function () {
		clearInterval(interval);
	}
	return cnv;
})(CNV);



