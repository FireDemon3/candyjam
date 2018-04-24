
MainGame.MainMenuState = function(game){
	
};


const fruit = ['Apple', 'Banana', 'Pear', 'Cherry', 'Pineapple', 'Orange', 'Peach'];
const things = ['Hair', 'Head', 'Hands', 'Feet', 'Arms', 'Legs', 'Face', 'Heart'];

/**
 * Return a string built out of elements randomly selected 
 * from passed in Arrays. Used to make up junk data.
 */
function randomish() {
	const result = [];
	Array.prototype.map.call(arguments, function(arr){
		result.push(arr[Math.floor(Math.random() * arr.length)]);
	});
	return result.join(' ');
}



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

		// Offset is used when playing the second round Addicting game.
		var startDateOffset = (MainGame.startingDuration || 0) * 1000;
		// console.log({startDateOffset});

		this.add.sprite(0, 0, 'mainmenu_bg');
		var pos = {
			x: 512,
			y: 650
		};
		if (MainGame.addictingMode === 2) {
			// Button is moved for addictingMode '2' only!
			pos = {
				x: 750,
				y: 600
			};
		}
		var start_btn = new Phaser.Button(this.game, pos.x, pos.y, 'start_btn', function(){
			MainGame._startDate = new Date(Date.now() - startDateOffset);
			this.game.state.start('Game');
		}, this, 1, 0, 0);
		start_btn.anchor.setTo(0.5, 0.5);
		this.game.add.existing(start_btn);

		var welcomeBackText = this.game.add.text(380, 520, "", { font: "bold 25px monospace", fill: '#ffffff'});

		var player = localStorage.getItem('player');
		if (player) {
			// show: Welcome back Bob! [not you?]
			welcomeBackText.setText("Welcome back " + player);

		} else {
			// prompt: Enter your name:
			player = prompt("Welcome, \nPlease enter your name", '') || randomish(fruit, things);
			player = player.substring(0, 20);
			welcomeBackText.setText("Welcome " + player);
			localStorage.setItem('player', player);			
		}

		var name_btn = new Phaser.Button(this.game, 1024/2, 580, 'name_btn', function(){
			var result = prompt("Welcome, \nPlease enter your name", player || '').trim();
			if (result) {
				player = result; // name change!
			} else {
				player = player || randomish(fruit, things); // user failed to choose. My turn to give you a name!
			}
			player = player.substring(0, 20);
			welcomeBackText.setText("Welcome " + player);
			localStorage.setItem('player', player);
		}, this, 1, 0, 0);
		name_btn.anchor.setTo(0.5, 0.5);
		this.game.add.existing(name_btn);


		if(MainGame.addictingMode){
			loadJSON('/stats/index.php?mode=addicting',
				function(data) { 
					this.leaderboard_title = this.game.add.text(100, 500,"Leaderboard", { font: "bold 25px monospace", fill: '#ffffff'});
					for(var i = 0; i < 7; i++){
						var scoreData = data[i];
						if (scoreData) {
							var spacePaddedScore = (scoreData.score + '    ').substring(0, Math.max(scoreData.score.toString().length, 4));
							var playerText = spacePaddedScore + ' ' + scoreData.player;
							this.game.add.text(100, 540 + (i * 30), playerText, { font: "bold 20px monospace", fill: '#ffffff'});
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