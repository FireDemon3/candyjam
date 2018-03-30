
function Boss(game, spawn){
	
	this.game = game;
	Phaser.Sprite.call(this, this.game, spawn.x, spawn.y, 'boss');

	this.anchor.setTo(0.5, 0.5);
	this.health = 500;
	this.maxHealth = 500;
	this.speed = 40;

	this.animations.add('left', [0,1,2,3], 5, true);
	this.animations.add('right', [4,5,6,7], 5, true);

	this.animations.play('right');

	this.healthBar = this.game.add.sprite(this.x, this.y + 40, 'turret_health_bar');
	this.healthBar.anchor.setTo(0.5, 0.5);

	this.STATES = {
		  TRACKING: 0
		, DAMAGED: 1
	};

	this.name = "boss";

	this._state = this.STATES.TRACKING;

	this.damageTimer = 0;
	this.attackTimer = Date.now();

	CollisionManager.addObjectToGroup(this, 'baddies');
	this.game.add.existing(this);
}

Boss.prototype = Object.create( Phaser.Sprite.prototype );
Boss.prototype.constructor = Boss;

Boss.prototype.update = function(){

	this.updateHealthBar();

	if(this._state == this.STATES.TRACKING){
		if(this.target){
			if(this.withinShootingRange(this.target)){
				this.attack(this.target);
			}
			
			if(this.withinFollowingRange(this.target) || this.target.name == "tooth"){ 
				this.moveTowards(this.target);
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
		this.body.veloctiy = {x:0, y:0};
		this.damageTimer--;
		if(this.damageTimer <= 0){
			this._state = this.STATES.TRACKING;
		}
	}

}

Boss.prototype.withinShootingRange = function(target){
	var dist = Math.abs(Math.sqrt((target.x - this.x)*(target.x - this.x)+(target.y - this.y)*(target.x - this.y)));

	if(dist < 1000){
		return true;
	}

	return false;
}

Boss.prototype.withinFollowingRange = function(target){
	var dist = Math.abs(Math.sqrt((target.x - this.x)*(target.x - this.x)+(target.y - this.y)*(target.x - this.y)));

	if(dist < 1000){
		return true;
	}

	return false;
}

Boss.prototype.moveTowards = function(target){

	var x = target.x - this.x;
	var y = target.y - this.y;

	var mag = Math.sqrt((x * x) + (y * y));

	var nx = x / mag;
	var ny = y / mag;

	this.body.velocity.x = nx * this.speed;
	this.body.velocity.y = ny * this.speed;

	if(this.body.velocity.x >= 0){
		this.animations.play('right');
	}
	else if(this.body.velocity.x < 0){
		this.animations.play('left')
	}
}

Boss.prototype.attack = function(target){

	if(Date.now() < this.attackTimer){
		return;
	}

	this.game.player_shoot_sfx.play();

	var x = target.x - this.x;
	var y = target.y - this.y;
	var mag = Math.sqrt((x * x) + (y * y));
	var nx = x / mag;
	var ny = y / mag;
	var b = new Bullet(this.game, {x:this.x, y: this.y}, 'enemy', {x: nx, y: ny}, this);
	this.attackTimer = Date.now() +  1 * 300;
}

Boss.prototype._damage = function(amount, attacker){

	this.target = attacker;

	this.damage(amount);
	this._state = this.STATES.DAMAGED;
	this.damageTimer = 0;

	if(this.health <= 0
		&& attacker.name == "player"){

		this.die(true);
	}
}

Boss.prototype.updateHealthBar = function(){

	this.healthBar.x = this.x;
	this.healthBar.y = this.y + 40;

	var p = (this.health / this.maxHealth);
	p = parseFloat(p.toFixed(1));
	this.healthBar.frame = 10 - (p * 10);
}

Boss.prototype.die = function(points){

	if(this.game){
		this.game.baddie_die_sfx.play();
	}

	var points = points || false;
	
    // TODO: Crank up the emitter particles when boss dies!!!!!!!
	var e = game.add.emitter(this.x, this.y, 200);
	e.makeParticles('boss_die', [0,1]);
	//e.gravity = 0;
	e.minRotation = 0;
	e.maxRotation = 5;
	e.start(true, 400, null, 16);

	CollisionManager.removeObjectFromGroup(this, "baddies");
	if(this.healthBar){
		this.healthBar.destroy();
	}

	if(points){
		InventoryManager.points += MainGame.points.kill_boss;
	}
	this.destroy();
}