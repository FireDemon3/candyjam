
MainGame.GameOverState = function(game){
	
	this.win = false;
};

MainGame.GameOverState.prototype = {


	submit_score: function(score, isWin) {

		var uq = localStorage.getItem('uq');
		var player = localStorage.getItem('player');
		
		var fd = new FormData();
		fd.append("player", player || "No Name");
		fd.append("player_uq", uq || "nil");
		fd.append("score", score || "0");
		fd.append("win", isWin || false);
		fd.append("duration", Math.round((new Date() - MainGame._startDate)/1000)); // game duration in seconds

		// Don't include 'mode' parameter for regular game mode!
		if (MainGame.addictingMode) {
			fd.append("mode", "addicting");
		}		
		
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/stats/index.php', true);
		xhr.send(fd);
	},

	create: function(){
		if(this.win){
			var s = this.add.sprite(1024/2, 768/2, 'youwin');
			s.anchor.setTo(0.5, 0.5);
			s.fixedToCamera = true;
		} else {
			var s = this.add.sprite(1024/2, 768/2, 'youlose');
			s.anchor.setTo(0.5, 0.5);
			s.fixedToCamera = true;
		}
		
		// push.
		this.submit_score(InventoryManager.points, this.win);

		var replay_btn = new Phaser.Button(this.game, 300, 600, 'replay', function() {

			// Can't do this 'cause the states aren't re-initialized on each create.
			// this.game.camera.follow(null);
			// this.game.state.start('MainMenu');

			window.location.href = window.location.href;
		}, this, 1, 0, 0);
		replay_btn.anchor.setTo(0.5, 0.5);
		replay_btn.fixedToCamera = true;
		this.game.add.existing(replay_btn);		

		var switch_btn = new Phaser.Button(this.game, 600, 600, 'switch', function() {
			// TODO: update this to point to the OTHER version of the game!
			if (MainGame.addictingMode) {
				window.location.href = "http://127.0.0.1:8080/";
			} else {                                                         
				window.location.href = "http://192.168.2.157:8080/";
			}
		}, this, 1, 0, 0);
		switch_btn.anchor.setTo(0.5, 0.5);
		switch_btn.fixedToCamera = true;
		this.game.add.existing(switch_btn);		
	},

	update: function(){

	}
};