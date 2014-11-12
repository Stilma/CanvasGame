var CNV = (function(){
	var cnv = {
		init: function () {
			console.log(this.say);
			this.canvas = document.getElementById('canvas');
			this.ctx = canvas.getContext("2d");

			this.width = canvas.width;
   			this.height = canvas.height;
			this.canvas.onclick = this.canvasClick;
			this.canvas.onmousemove = this.canvasOnmousemove;


		},

		clear: function () {
			cnv.ctx.clearRect(0, 0, this.width, this.height);
			// console.log('clear')
		},

		startGame: null,
		canvasClick: null,
		canvasOnmousemove: null,
		say: 'Hello'
	};

	var privat;
	return cnv;

})();
// document.addEventListener('keydown', function(e){
// 	console.log('keydown');
// 	console.log(e.keyCode);
// }, false);