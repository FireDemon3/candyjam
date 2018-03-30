
var width = 1024;
var height = 768;

var game = new Phaser.Game(width, height, Phaser.CANVAS, 'phaser-div');

game.state.add('Boot', MainGame.BootState);
game.state.add('Loader', MainGame.LoaderState);
game.state.add('MainMenu', MainGame.MainMenuState);
game.state.add('Game', MainGame.GameState);
game.state.add('GameOver', MainGame.GameOverState);

CollisionManager = new CollisionManager(game);
InputManager = new InputManager(game);
InventoryManager = new InventoryManager(game);
GUIManager = new GUIManager(game);
WaveManager = new WaveManager(game);

document.addEventListener("mousewheel", function(e){ InputManager.handleMouseWheel(e); }, false);


function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
			c = c.substring(1, c.length);
		}
        if (c.indexOf(nameEQ) == 0) {
			return c.substring(nameEQ.length, c.length);
		}
    }
    return null;
}

var rand = getCookie('uq');
if (!rand) {
    rand = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setCookie('uq', rand, 365);
}
// starting! Record game starts...



game.state.start('Boot');

window.game = game;