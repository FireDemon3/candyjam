
function Boss_2(game, spawn){
	
	this.game = game;
	Phaser.Sprite.call(this, this.game, spawn.x, spawn.y, 'boss_2');

	this.anchor.setTo(0.5, 0.5);
	this.health = 60; // 600;
	this.maxHealth = 600;
	this.speed = 50;
	this.healthBarOffset = 60;
	
	this.lastHit = new Date();
	this.maxDelay = 2000; // milliseconds

	this.animations.add('left', [0,1,2,3], 7, true);
	this.animations.add('right', [4,5,6,7], 7, true);

	this.animations.play('right');
	this.healthBar = this.game.add.sprite(this.x, this.y + this.healthBarOffset, 'turret_health_bar');
	this.healthBar.anchor.setTo(0.5, 0.5);

	this.STATES = {
		  TRACKING: 0
		, DAMAGED: 1
	};

	this.name = "boss_2";

	this._state = this.STATES.TRACKING;

	this.damageTimer = 0;
	this.attackTimer = Date.now();

	CollisionManager.addObjectToGroup(this, 'baddies');
	this.game.add.existing(this);
}

Boss_2.prototype = Object.create( Phaser.Sprite.prototype );
Boss_2.prototype.constructor = Boss_2;

Boss_2.prototype.update = function(){

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

Boss_2.prototype.withinShootingRange = function(target){
	var dist = Math.abs(Math.sqrt((target.x - this.x)*(target.x - this.x)+(target.y - this.y)*(target.x - this.y)));

	if(dist < 1000){
		return true;
	}

	return false;
}

Boss_2.prototype.withinFollowingRange = function(target){
	var dist = Math.abs(Math.sqrt((target.x - this.x)*(target.x - this.x)+(target.y - this.y)*(target.x - this.y)));

	if(dist < 1000){
		return true;
	}

	return false;
}

Boss_2.prototype.moveTowards = function(target){

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

Boss_2.prototype.attack = function(target){

	if(Date.now() < this.attackTimer){
		return;
	}

	this.game.boss_2_shoot.play();

	var x = target.x - this.x;
	var y = target.y - this.y;
	var mag = Math.sqrt((x * x) + (y * y));
	var nx = x / mag;
	var ny = y / mag;
	var b = new BulletBoss(this.game, {x:this.x, y: this.y}, 'enemy', {x: nx, y: ny}, this);
	this.attackTimer = Date.now() +  1 * 200;
}

Boss_2.prototype._damage = function(amount, attacker){

	this.target = attacker;

	this.damage(amount);
	this._state = this.STATES.DAMAGED;
	this.damageTimer = 0;
	this.lastHit = new Date();

	if(this.health <= 0
		&& attacker.name == "player"){

		this.die(true);
	}
}

Boss_2.prototype.updateHealthBar = function(){

	var hitDelay = new Date() - this.lastHit; // ms
	if (hitDelay > this.maxDelay) {
		this.health = (this.health * 1.1);
		
		// Don't allow greater than max-health.
		if (this.health > this.maxHealth) {
			this.health = this.maxHealth;
		}
	}

	this.healthBar.x = this.x;
	this.healthBar.y = this.y + this.healthBarOffset;

	var p = (this.health / this.maxHealth);
	p = parseFloat(p.toFixed(1));
	this.healthBar.frame = 10 - (p * 10);
}

Boss_2.prototype.die = function(points){

	if(this.game){
		this.game.baddie_boss_2_die_sfx.play();
	}

	var points = points || false;
	
    // Crank up the emitter particles when Boss_2 dies!!!!!!!
	var e = game.add.emitter(this.x, this.y, 200);
	e.makeParticles('boss_die', [0,1,2,3,4]);
	// 	e.gravity = 0;
	e.minRotation = 0;
	e.maxRotation = 45;
	e.start(true, 4000, null, 400);

	CollisionManager.removeObjectFromGroup(this, "baddies");
	if(this.healthBar){
		this.healthBar.destroy();
	}

	if(points){
		InventoryManager.points += MainGame.points.kill_boss_2;
	}
	
	// Kill off all the other baddies too, it forces end of the game!
	for( var i = 0; i < CollisionManager.groups.baddies.length; i++){
		var baddie = CollisionManager.groups.baddies[i];
		if(baddie.name != "boss_2") {
			baddie.die();
		}
	}	

	this.destroy();		
}
