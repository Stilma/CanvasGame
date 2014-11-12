var CNV = (function (cnv) {
	var controls = {
 		left: 37,
  		right: 39
 	};
 	var settings = {
 		rows: 3
 	};

	cnv.startGame = function () {

  		this.Game = {
   		ball: new cnv.Arc({x:450, y:225, r: 30}),
   		player: new cnv.Rect({x:0, y:430, width:80, height:20}),
   		blocks: makeBlocks(),
   		scores: 0,
   
   			render: function () {
   				var self = this;
   				cnv.ctx.font = "40px Georgia";
   				cnv.ctx.fillStyle = '#eee'
   				var message = {
		 			text:self.scores.toString(),
		 			width: cnv.ctx.measureText(this.text).width,
		 		}
   				cnv.ctx.fillText(message.text, (cnv.width/2 - message.width/2), (cnv.height/2))

			    fly(this.ball);
			    this.ball.draw();
			    this.player.draw();
			    for (var i = 0; i < this.blocks.length; i++) {
			    	if (hitBlock(this.ball, this.blocks[i])){
			    		this.blocks.splice(i, 1);
			    	}
			    	this.blocks[i].draw();
			    	
			    };
			    // console.log('this.player.x', this.player.x);
			    // this.player.move(this.player.x+1, this.player.y);
   			}
  		};
	this.Game.player.speed = 50;
	this.Game.ball.angle = 35;
	this.Game.ball.speed = 5;
	animate();
	return this.Game;
	 };


	 function makeBlocks () {
	 	 var blockWidth =cnv.width/10;
	 	 var blocks = cnv.width/blockWidth;
	 	 var rectBlocks = [];
	 	 var blockHeight = 30;

	 	 for (var i = 0; i < settings.rows; i++) {
		 	 var y = i* (blockHeight+1);

		 	 for (var j = 0; j < blocks; j++) {
		 	 	var x = blockWidth * j;
		 	 	rectBlocks.push(new cnv.Rect(x, y, blockWidth-1, (blockHeight+1)));
		 	 };
	 	 	
	 	 };
	 	 return rectBlocks;
	 }

	window.addEventListener('keydown', control, false);


	function control (e) {
 		var player = cnv.Game.player;
	 	// console.log(e.keyCode);
	 	if(e.keyCode == controls.left){
	  		if (player.x > 0){
   				player.move(player.x-player.speed, player.y);
   			}
	  	} else if(e.keyCode == controls.right){
	  		if (player.x+player.width < cnv.width){
	   			player.move(player.x+player.speed, player.y);
			}
	   	} 
 	};


	function animate () {
  		cnv.clear();
  		cnv.Game.render();
 	};

 	function fly (ball) {
 		bounceWall(ball);
 		var velocity = {
 			x: Math.cos(ball.angle*(Math.PI/180)) * ball.speed,
 			y: Math.sin(ball.angle*(Math.PI/180)) * ball.speed
 		};

 		ball.move(ball.x + velocity.x, ball.y + velocity.y)
 	};

 	function bounceWall (ball) {

 		var player = cnv.Game.player
 		if ((ball.x - ball.r) < 0 || (ball.x+ball.r) > cnv.width) {
 			ball.angle = 180-ball.angle;
 		}else if ((ball.y-ball.r) <0 ) {
 			ball.angle = 360 - ball.angle;
 		} else if ((ball.y+ball.r)> cnv.height) {
 			gameOver();
 		}else if ((ball.y+ball.r) >= player.y && (ball.x + ball.r) > player.x && ball.x < player.x + player.width) {
 			ball.angle = 360 - ball.angle;
 		};
 	}

 	function gameOver () {
 		cnv.stop();
 		cnv.ctx.font = "40px Georgia";
 		var message = {
 			text:'Game Over!',
 			width: cnv.ctx.measureText(this.text).width,
 		}

 		cnv.ctx.fillText(message.text, (cnv.width/2 - message.width/2), (cnv.height/2));
 	}

 	function hitBlock (ball, block) {
 		var blockLeftY = {
 			y: block.y + block.height
 		};
 		var blockRight = {
 			x: block.x+block.width,
 			y: block.y+block.height
 		};
 		var ballSide ={
 			y: ball.y-ball.r,
 			x: ball.x+ball.r
 		};

 		if (ballSide.y <= blockLeftY &&	(ballSide.x >= block.x && ballSide.x <= blockRight.x)) {
 			console.log('hit');
 			return true;
 		};
 		return false;
 	}

 	var interval;

 	cnv.start = function () {
 		this.startGame(); // Make
 		interval = setInterval(animate, 30);
 	}

 	cnv.stop = function () {
 		clearInterval(interval);
 	}

 	return cnv;
})(CNV);

