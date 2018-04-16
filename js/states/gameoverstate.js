
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
		if (MainGame.addictingMode === 1) {
			fd.append("mode", "addicting");
		}		
		if (MainGame.addictingMode === 2) {
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

			var rand = localStorage.getItem('uq');
			if (rand && MainGame.addictingMode === 1) {

				// Create a hash from the playerUq and the 
				// current time to prevent sharing of tokens!!
				// In the Bootstate we will need to verify that the
				// token matches the current playerUq and it's not expired.
				var hashLifetime = 1 * (60 * 60 * 1000); // One Hour
				var hashExpires = new Date().getTime() + hashLifetime;
				var hash = window.btoa(rand + '::' + hashExpires);
				localStorage.setItem('level_1_hash', hash);

				// One-line let me play green.
				// localStorage.setItem('level_1_hash', window.btoa(localStorage.getItem('uq') + '::' + (new Date().getTime() + (60 * 60 * 1000))));

				var Level2_btn = new Phaser.Button(this.game, 400, 200, 'Level2', function() {
					// User has chosen to continue playing the next level!
					window.location.href = '/green.php';
				}, this, 1, 0, 0);
				Level2_btn.anchor.setTo(0.5, 0.5);
				Level2_btn.fixedToCamera = true;
				this.game.add.existing(Level2_btn);		
			}	


		} else {
			var s = this.add.sprite(1024/2, 768/2, 'youlose');
			s.anchor.setTo(0.5, 0.5);
			s.fixedToCamera = true;
		}
		
		// push.
		this.submit_score(InventoryManager.points, this.win);

		
		var replay_btn = new Phaser.Button(this.game, 300, 650, 'replay', function() {

			// Can't do this 'cause the states aren't re-initialized on each create.
			// this.game.camera.follow(null);
			// this.game.state.start('MainMenu');

			window.location.href = window.location.href;
		}, this, 1, 0, 0);
		replay_btn.anchor.setTo(0.5, 0.5);
		replay_btn.fixedToCamera = true;
		this.game.add.existing(replay_btn);		

		var switch_btn = new Phaser.Button(this.game, 650, 650, 'switch', function() {
			// point to the OTHER version of the game!

			// Blue == addicting, red == regular version!
			if (MainGame.addictingMode) {
				window.location.href = "/red.php";
			} else {                                                         
				window.location.href = "/blue.php";
			}
		}, this, 1, 0, 0);
		switch_btn.anchor.setTo(0.5, 0.5);
		switch_btn.fixedToCamera = true;
		this.game.add.existing(switch_btn);		
	},

	update: function(){

	}
};