
MainGame.resources = {};

var assetsFolder;
if (MainGame.addictingMode === 1) {
	// Addicting version
	assetsFolder = 'addicting-assets';
	console.log("Playing the ADDICTING version");
} else if (MainGame.addictingMode === 2) {
	// Addicting-2 version
	assetsFolder = 'addicting-2-assets';
	console.log("Playing the ADDICTING-2 version");
} else {
	// Normal version
	assetsFolder = 'assets';
	console.log("Playing the regular version");	
}

MainGame.resources.BootState = {
	spritesheets: [
		{name: 'spinner', path: assetsFolder + '/spritesheets/spinner.png', width: 15, height: 15 }
	]
};

MainGame.resources.LoaderState = {


	  images: [
		{name: 'tileset', path: assetsFolder + '/images/tileset.png'}			
			
	  	/*, {name: 'tileset2', path: assetsFolder + '/images/tileset2.png'}*/
	  	, {name: 'bullet', path: assetsFolder + '/images/bullet.png'}
		, {name: 'bullet_pink', path: assetsFolder + '/images/bullet_pink.png'}
		, {name: 'bullet_boss', path: assetsFolder + '/images/bullet_boss.png'}
		, {name: 'bullet_boss2', path: assetsFolder + '/images/bullet_boss2.png'}
	  	, {name: 'tooth', path: assetsFolder + '/images/tooth.png'}

	  	, {name: 'toolbar_slot_background', path: assetsFolder + '/images/toolbar_slot_background.png'}
	  	, {name: 'toolbar_arrow', path: assetsFolder + '/images/toolbar_arrow.png'}
	  	, {name: 'toolbar_slot_blank', path: assetsFolder + '/images/toolbar_slot_blank.png'}

	  	, {name: 'gun_icon', path: assetsFolder + '/images/gun.png'}
	  	, {name: 'gun_cursor', path: assetsFolder + '/images/gun_cursor.png'}

	  	, {name: 'hammer', path: assetsFolder + '/images/hammer.png'}
	  	, {name: 'hammer_x', path: assetsFolder + '/images/hammer_x.png'}
	  	, {name: 'hammer_icon', path: assetsFolder + '/images/hammer_icon.png'}

	  	, {name: 'turret_small_x', path: assetsFolder + '/images/turret_small_x.png'}
	  	, {name: 'turret_small_icon', path: assetsFolder + '/images/turret_small_icon.png'}
	  	
	  	, {name: 'turret_big_x', path: assetsFolder + '/images/turret_big_x.png'}
	  	, {name: 'turret_big_icon', path: assetsFolder + '/images/turret_big_icon.png'}

	  	, {name: 'wave_1', path: assetsFolder + '/images/wave_1.png'}

	  	, {name: 'overlay', path: assetsFolder + '/images/overlay.png'}

	  	, {name: 'mainmenu_bg', path: assetsFolder + '/images/mainmenu_bg.png'}
	  	, {name: 'youlose', path: assetsFolder + '/images/youlose.png'}
	  	, {name: 'youwin', path: assetsFolder + '/images/youwin.png'}
	  	, {name: 'switch', path: assetsFolder + '/images/switch.png'}
		 , {name: 'replay', path: assetsFolder + '/images/replay.png'}
		 , {name: 'Level2', path: assetsFolder + '/images/Level2.png'}
	]
	, spritesheets: [
		  {name: 'player', path: assetsFolder + '/spritesheets/player.png', width: 36, height: 36}
		, {name: 'player_health', path: assetsFolder + '/spritesheets/player_health.png', width: 48, height: 6}

		, {name: 'corn', path: assetsFolder + '/spritesheets/corn.png', width: 40, height: 40}
		, {name: 'corn_die', path: assetsFolder + '/spritesheets/corn_die.png', width: 4, height: 4}

		, {name: 'mint', path: assetsFolder + '/spritesheets/mint.png', width: 40, height: 40}
		, {name: 'mint_die', path: assetsFolder + '/spritesheets/mint_die.png', width: 4, height: 4}
		, {name: 'mint_explode', path: assetsFolder + '/spritesheets/mint_explode.png', width: 32, height: 32}

		, {name: 'gumball', path: assetsFolder + '/spritesheets/gumball.png', width: 44, height: 44}
		, {name: 'gumball_die', path: assetsFolder + '/spritesheets/gumball_die.png', width: 4, height: 4}

		, {name: 'boss', path: assetsFolder + '/spritesheets/boss.png', width: 44, height: 44}
		, {name: 'boss_die', path: assetsFolder + '/spritesheets/boss_die.png', width: 4, height: 4}

		, {name: 'boss_2', path: assetsFolder + '/spritesheets/boss_2.png', width: 176, height: 88}
		, {name: 'boss_2_die', path: assetsFolder + '/spritesheets/boss_die.png', width: 4, height: 4}

		, {name: 'turret_small', path: assetsFolder + '/spritesheets/turret_small.png', width: 32, height: 32}
		, {name: 'turret_big', path: assetsFolder + '/spritesheets/turret_big.png', width: 64, height: 64}
		, {name: 'turret_progress', path: assetsFolder + '/spritesheets/turret_progress.png', width: 9, height: 9}
		, {name: 'turret_health_bar', path: assetsFolder + '/spritesheets/turret_health_bar.png', width: 32, height: 4}

		, {name: 'buy_btn', path: assetsFolder + '/spritesheets/buy_btn.png', width: 75, height: 30}
		, {name: 'ready_btn', path: assetsFolder + '/spritesheets/ready_btn.png', width: 320, height: 60}

		, {name: 'start_btn', path: assetsFolder + '/spritesheets/start_btn.png', width: 288, height: 71}
		, {name: 'name_btn', path: assetsFolder + '/spritesheets/name_btn.png', width: 141, height: 35}
		, {name: 'instructions_btn', path: assetsFolder + '/spritesheets/instructions_btn.png', width: 288, height: 71}
	]
	, tilemaps: [
		  {name: 'test3', path: assetsFolder + '/tilemaps/test3.json'}
	]
	, audio: [
		  {name: 'turret_small_sfx', path: assetsFolder + '/audio/turret_small.wav'}
		, {name: 'turret_big_sfx', path: assetsFolder + '/audio/turret_big.wav'}
		, {name: 'player_shoot', path: assetsFolder + '/audio/player_shoot.wav'}
		, {name: 'baddie_shoot', path: assetsFolder + '/audio/baddie_shoot.wav'}
		, {name: 'boss_shoot', path: assetsFolder + '/audio/boss_shoot.wav'}
		, {name: 'boss_2_shoot', path: assetsFolder + '/audio/boss_shoot.wav'}
		, {name: 'baddie_die_sfx', path: assetsFolder + '/audio/baddie_die_sfx.wav'}
		, {name: 'baddie_boss_die_sfx', path: assetsFolder + '/audio/baddie_boss_die.wav'}
		, {name: 'baddie_boss_2_die_sfx', path: assetsFolder + '/audio/baddie_boss_die.wav'}
		, {name: 'player_hurt_sfx', path: assetsFolder + '/audio/player_hurt.wav'}
		, {name: 'victory_sfx', path: assetsFolder + '/audio/victory.wav'}
		, {name: 'lose_sfx', path: assetsFolder + '/audio/lose.wav'}
		/*, {name: 'menu_music', path: assetsFolder + '/audio/spiff_tune_to_the_moon.mp3'}*/
		, {name: 'game_music', path: assetsFolder + ( MainGame.addictingMode ? '/audio/run_music.mp3' : '/audio/spiff_tune_to_the_moon.mp3')}
	]
};

