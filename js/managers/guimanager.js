
function GUIManager(game){
	
	this.game = game;
}

GUIManager.prototype.setup = function(){

	this.toolbar = new Toolbar(this.game);
	this.hud = new HUD(this.game);
	this.menuScreen = new MenuScreen(this.game);
	this.menuScreen.visible = false;
}

GUIManager.prototype.update = function(){

	this.toolbar.update();
	this.hud.update();
	if(this.menuScreen.visible == true){
		this.menuScreen.update();	
	}
	
}

GUIManager.prototype.handleWaveEnd = function(){

	this.menuScreen.visible = true;
}

GUIManager.prototype.destroy = function(){
	if (this.toolbar && typeof this.toolbar.destroy == 'function') {
		this.toolbar.destroy();
	}
	if (this.hud && typeof this.toolbar.hud == 'function') {
		this.hud.destroy();
	}
	
	this.toolbar = { update: function(){} }
	this.hud = { update: function(){} }
}
