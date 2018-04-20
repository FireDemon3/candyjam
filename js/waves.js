
	//, kill_corn: 40 corn - 40
	//, kill_cane: 50 gumball - 50
	//, kill_bear: 30 mint - 30

MainGame.waves = [];

	if (MainGame.addictingMode === 1) {
		// *****************************************************
		// Addicting mode, Level 1
		// *****************************************************
		MainGame.waves.push( {
			corn: 10
			, boss: 0
			, boss_2: 0
			, cane: 0
			, bear: 0
			, moment: 3 	//400 points
		});

		MainGame.waves.push( {
			corn: 8
			, boss: 0
			, boss_2: 0
			, cane: 3
			, bear: 3
			, moment: 3 	//400 points
		});

		MainGame.waves.push( {
			corn: 6
			, boss: 0
			, boss_2: 0
			, cane: 10
			, bear: 5
			, moment: 3 	//400 points
		});

		MainGame.waves.push( {
			corn: 4
			, boss: 0
			, boss_2: 0
			, cane: 6
			, bear: 10
			, moment: 4 	//400 points
		});

		MainGame.waves.push( {
			corn: 20
			, boss: 0
			, boss_2: 0
			, cane: 2
			, bear: 3
			, moment: 5 	//400 points
		});

		MainGame.waves.push( {
			corn: 8
			, boss: 1
			, boss_2: 0
			, cane: 5
			, bear: 5
			, moment: 4 	//400 points
		});

		// //  MainGame.waves.push( {
		// // 	corn: 1
		// // 	, boss: 0
		// // 	, cane: 5
		// // 	, bear: 2
		// // 	, moment: 3 	//400 points
		// });
		
	} else 	if (MainGame.addictingMode === 2) {
		// *****************************************************
		// Addicting mode, Level 2
		// *****************************************************
		MainGame.waves.push( {
			corn: 10
			, boss: 1
			, boss_2: 0
			, cane: 5
			, bear: 3
			, moment: 4 	//400 points
		});

		 MainGame.waves.push( {
			corn: 10
			, boss: 0
			, cane: 5	
			, bear: 2
			, boss_2: 0
			, moment: 5 	//400 points
		});

		MainGame.waves.push( {
			corn: 0
			, boss: 1
			, cane: 10
			, bear: 8
			, boss_2: 0
			, moment: 5 	//400 points
		});

		MainGame.waves.push( {
			corn: 15
			, boss: 0
			, cane: 5
			, bear: 5
			, boss_2: 0
			, moment: 6 	//400 points
		});

		MainGame.waves.push( {
			corn: 0
			, boss: 0
			, cane: 10
			, bear: 10
			, boss_2: 0
			, moment: 6 	//400 points
		});

		MainGame.waves.push( {
			corn: 15
			, boss: 0
			, cane: 3
			, bear: 3
			, boss_2: 0
			, moment: 4 	//400 points
		});

		MainGame.waves.push( {
			corn: 0
			, boss: 1
			, cane: 0
			, bear: 24
			, boss_2: 0
			, moment: 7 	//400 points
		});

		MainGame.waves.push( {
			corn: 25
			, boss: 0
			, cane: 2
			, bear: 10
			, boss_2: 0
			, moment: 3 	//400 points
		});

		MainGame.waves.push( {
			corn: 25
			, boss: 2
			, cane: 10
			, bear: 5
			, boss_2: 0
			, moment: 5 	//400 points
		});

		MainGame.waves.push( {
			corn: 25
			, boss: 0
			, cane: 15
			, bear: 8
			, boss_2: 1
			, moment: 6 	//400 points
		});
	} else {
		// *****************************************************
		// Regular mode                                                         
		// *****************************************************
		MainGame.waves.push( {
			  corn: 5
			, boss: 0
			, boss_2: 0
			, cane: 1
			, bear: 0
			, moment: 2 	//400 points
		});

		MainGame.waves.push({
			  corn: 6
			, boss: 0
			, cane: 4
			, bear: 0
			, boss_2: 0
			, moment: 2 	//440 points
		});

		MainGame.waves.push({
				corn: 5
			, boss: 0
			, cane: 8
			, bear: 0
			, boss_2: 0
			, moment: 3 	//900 points
		});
		
		MainGame.waves.push({
				corn: 2
			, boss: 0
			, cane: 8
			, bear: 7
			, boss_2: 0
			, moment: 2 	//830 points
		});

		MainGame.waves.push({
				corn: 0
			, boss: 0
			, cane: 10
			, bear: 10
			, boss_2: 0
			, moment: 2 	//1200 points
		});

		MainGame.waves.push( {
				corn: 5
			, boss: 0
			, cane: 10
			, bear: 10
			, boss_2: 0
			, moment: 4 	//1200 points
		});
		
	}
	