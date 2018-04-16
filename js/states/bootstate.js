
var MainGame = {
	addictingMode: 0
};


var playerUq = localStorage.getItem('uq');
if (!playerUq) {
    playerUq = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('uq', playerUq);
}

// Red is the regular version!
// Blue is the Addicting one!
// Green is the Second level Addicting!

if (window.location.href.indexOf('blue') > -1) {
	MainGame.addictingMode = 1;
} else {
	if (window.location.href.indexOf('green') > -1) {

		// Are we allowed to play level2?
		var hash = localStorage.getItem('level_1_hash');
		var decodedHash = window.atob(hash);
		var hashArray = decodedHash.split('::');

		// TODO: turn this OFF!!
		var isLucasTesting = true;
		
		if (isLucasTesting || (hashArray.length === 3 && playerUq === hashArray[0] && hashArray[1] > new Date().getTime())) {
			MainGame.addictingMode = 2;
			MainGame.startingPoints = hashArray[2] || 0;
		} else {
			// failed validation, remove it and fallback to Level 1.
			MainGame.addictingMode = 1;
		}
		// Only accept a hash one time!
		localStorage.removeItem('level_1_hash');
	}
}

MainGame.BootState = function(game){
	
};

MainGame.BootState.prototype = {

	preload: function(){
		//load any assets needed for the LoaderState
		for( var i = 0; i < MainGame.resources.BootState.spritesheets.length; i++ ){
			var obj = MainGame.resources.BootState.spritesheets[i];
			this.game.load.spritesheet(obj.name, obj.path, obj.width, obj.height);
		}

	},

	create: function(){

		this.game.keys 			= {};
		this.game.keys.UP 		= game.input.keyboard.addKey(Phaser.Keyboard.W);
		this.game.keys.DOWN 	= game.input.keyboard.addKey(Phaser.Keyboard.S);
		this.game.keys.LEFT 	= game.input.keyboard.addKey(Phaser.Keyboard.A);
		this.game.keys.RIGHT 	= game.input.keyboard.addKey(Phaser.Keyboard.D);
		this.game.keys.REMOVE     = game.input.keyboard.addKey(Phaser.Keyboard.R);

		this.game.keys.DEBUG     = game.input.keyboard.addKey(Phaser.Keyboard.P);

		this.game.state.start('Loader');
	}
};