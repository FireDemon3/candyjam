
MainGame.MainMenuState = function(game){
	
};

// Used to load high scores
function loadJSON(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success) {
					success(JSON.parse(xhr.responseText));
				}
            } else {
                if (error) {
                    error(xhr);
				}
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

MainGame.MainMenuState.prototype = {
	
	create: function(){

		this.add.sprite(0, 0, 'mainmenu_bg');
		var start_btn = new Phaser.Button(this.game, 1024/2, 650, 'start_btn', function(){
			MainGame._startDate = new Date();
			this.game.state.start('Game');
		}, this, 1, 0, 0);
		start_btn.anchor.setTo(0.5, 0.5);
		this.game.add.existing(start_btn);

		var player = localStorage.getItem('player');
		if (player) {
			// show: Welcome back, Bob! [not you?]
			var welcomeBackText = this.game.add.text(380, 520, "Welcome back " + player, { font: "bold 25px monospace", fill: '#ffffff'});

			var name_btn = new Phaser.Button(this.game, 1024/2, 580, 'name_btn', function(){
				player = prompt("Welcome, \nPlease enter your name", player || '');
				if (player) {
					welcomeBackText.setText("Welcome back, " + player);
					localStorage.setItem('player', player);
				}
			}, this, 1, 0, 0);
			name_btn.anchor.setTo(0.5, 0.5);
			this.game.add.existing(name_btn);
		} else {
			// prompt: Enter your name:
			player = prompt("Welcome, \nPlease enter your name", player || '');
			localStorage.setItem('player', player);
		}

		if(MainGame.addictingMode){
			loadJSON('/stats/index.php?mode=addicting',
				function(data) { 
					this.game.add.text(100, 500,"Leaderboard", { font: "bold 25px monospace", fill: '#ffffff'});
					for(var i = 0; i < 7; i++){
						var scoreData = data[i];
						if (scoreData) {
							var spacePaddedScore = (scoreData.score + '    ').substring(0, Math.max(scoreData.score.toString().length, 4));
							var playerText = spacePaddedScore + ' ' + scoreData.player;
							this.game.add.text(100, 540 + (i * 30), playerText, { font: "18px monospace", fill: '#ffffff'});
						}
					}
				},
				function(xhr) { 
					// failed to get scores...
					console.error(xhr); 
				}
   			);			
		}

		this.game.menumusic = this.game.add.audio('game_music', .4, true);
		this.game.menumusic.play('',0,0.4,true);

	},

	update: function(){
	
	}
};