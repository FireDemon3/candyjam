
MainGame.MainMenuState = function(game){
	
};

MainGame.MainMenuState.prototype = {
	
	create: function(){

		this.add.sprite(0, 0, 'mainmenu_bg');
		var start_btn = new Phaser.Button(this.game, 1024/2, 600, 'start_btn', function(){
			MainGame._startDate = new Date();
			this.game.state.start('Game');
		}, this, 1, 0, 0);
		start_btn.anchor.setTo(0.5, 0.5);
		this.game.add.existing(start_btn);

		var name_btn = new Phaser.Button(this.game, 1024/2, 680, 'name_btn', function(){
			//MainGame._startDate = new Date();
			//this.game.state.start('Game');
			var player = localStorage.getItem('player');
			player = prompt("Welcome, \nPlease enter your name", player || '');
			localStorage.setItem('player', player);
		}, this, 1, 0, 0);
		name_btn.anchor.setTo(0.5, 0.5);
		this.game.add.existing(name_btn);

		if(MainGame.addictingMode){
			/*var instructions_btn = new Phaser.Button(this.game, 1024/2, 680, 'instructions_btn', function(){
				console.log("instructions");
			}, this, 1, 0, 0);
			instructions_btn.anchor.setTo(0.5, 0.5);
			this.game.add.existing(instructions_btn);*/

			this.game.add.text(100, 510,"\tHighscores", { font: "25px monospace", fill: '#ffffff'});

			for(var i = 0; i < 7; i++){
				///this['score' + i] = 
				this.game.add.text(100, 540 + (i * 30), i + "\tMongoose", { font: "18px monospace", fill: '#ffffff'});
			}
		}

		this.game.menumusic = this.game.add.audio('game_music', .4, true);
		this.game.menumusic.play('',0,0.4,true);

	},

	update: function(){
	
	}
};