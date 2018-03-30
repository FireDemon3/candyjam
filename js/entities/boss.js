
function boss(game, spawn){
	
	this.game = game;
	Phaser.Sprite.call(this, this.game, spawn.x, spawn.y, 'boss');

	this.anchor.setTo(0.5, 0.5);
	this.health = 200;
	this.maxHealth = 200;
	this.speed = 30;

	this.healthBar = this.game.add.sprite(this.x, this.y + 20, 'turret_health_bar');
	this.healthBar.anchor.setTo(0.5, 0.5);

	this.animations.add('right', [0, 1, 2, 3], 7, true);
	this.animations.add('left', [4, 5, 6, 7], 7, true);

	this.animations.play('left');

	this.STATES = {
		  TRACKING: 0
		, DAMAGED: 1
	};

	this.name = "boss";

	this._state = this.STATES.TRACKING;

	this.damageTimer = 0;

	CollisionManager.addObjectToGroup(this, 'baddies');
	this.game.add.existing(this);
}

boss.prototype = Object.create( Phaser.Sprite.prototype );
boss.prototype.constructor = boss;

boss.prototype.update = function(){

	this.updateHealthBar();

	if(this._state == this.STATES.TRACKING){

		if(this.target){
			if(this.withinDetonationRange(this.target)){
				//blowup
			}
	
			else{
				this.target = CollisionManager.groups.teeth[0];
			}
		}
		else{
			this.target = CollisionManager.groups.teeth[0];
		}
	}
	else if(this._state == this.STATES.DAMAGED){

		this.body.velocity.x = 0;
		this.body.velocity.y = 0;

		this.damageTimer--;
		if(this.damageTimer <= 0){
			this._state = this.STATES.TRACKING;
		}
	}
}

boss.prototype.withinFollowingRange = function(target){

	var dist = Math.abs(Math.sqrt((target.x - this.x)*(target.x - this.x)+(target.y - this.y)*(target.x - this.y)));

	if(dist < 600){
		return true;
	}

	return false;
}

boss.prototype.withinDetonationRange = function(){
	return false;
}

boss.prototype.moveTowards = function(target){

	var x = target.x - this.x;
	var y = target.y - this.y;

	var mag = Math.sqrt((x * x) + (y * y));

	var nx = x / mag;
	var ny = y / mag;

	this.body.velocity.x = nx * this.speed;
	this.body.velocity.y = ny * this.speed;

	if(this.body.velocity.x >= 0){
		this.animations.play('left');
	}
	else{
		this.animations.play('right');
	}
}

boss.prototype._damage = function(amount, attacker){

	this.target = attacker;

	this.damage(amount);
	this._state = this.STATES.DAMAGED;
	this.damageTimer = 0;

	if(this.health <= 0
		&& attacker.name == "player"){

		this.die(true);
	}
}

boss.prototype.updateHealthBar = function(){

	this.healthBar.x = this.x;
	this.healthBar.y = this.y + 24;

	var p = (this.health / this.maxHealth);
	p = parseFloat(p.toFixed(1));
	this.healthBar.frame = 10 - (p * 10);
}

boss.prototype.die = function(points){

	if(this.game){
		this.game.baddie_die_sfx.play();
	}

	var points = points || false;

	var e = game.add.emitter(this.x, this.y, 12);
	e.makeParticles('corn_die', [0,1,2]);
	//e.gravity = 0;
	e.minRotation = 0;
	e.maxRotation = 0;
	e.start(true, 600, null, 12);

	CollisionManager.removeObjectFromGroup(this, "baddies");
	if(this.healthBar){
		this.healthBar.destroy();
	}

	if(points){
		InventoryManager.points += MainGame.points.kill_boss;
	}

	this.destroy();
}