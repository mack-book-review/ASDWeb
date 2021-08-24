
	class Game{

		constructor(scene, container){

			//Store reference to scene
			this.scene = scene;
			
			//Store a reference to the container
			this.container = container;
			this.configureContainerEventListeners();

			//Create the canva
			this.generateCanvasElement();
			
			//Configure background music
			this.setupBGMusic();

			//Create UI elements
			this.createPauseButton();
			this.createInstructionsButton();
			this.createMusicSettingsButton();
			this.createCrosshairSettingsButton();
			this.createTitleBanner();
			this.createHomeReturnButton();

			//Create the HUD
			this.createHUD();


		}

		
		configureContainerEventListeners(){
			var currentGame = this;
			this.container.addEventListener("gamewon", function(){
				console.log("Event listener: game win");
				currentGame.scene.isWon = true;
				var msg = UIGenerator.CreateNextLevelMessage("Congratulations! You won!",
					150,150,
					"/assets/Medals/flat_medal1.png",function(){
						var nextLevel = currentGame.scene.levelConfiguration.levelNumber + 1;
						
						if(window.location.href.substr(window.location.href.length-2,window.location.href.length-1) == "#"){
							window.location =window.location.href.substr(0,window.location.href-2) + nextLevel; 
						} else {
							window.location = window.location.href + "#" + nextLevel;

						}
						window.location.reload();


					});
				currentGame.addToContainer(msg);
			});


			this.container.addEventListener("gamelost", function(){
				currentGame.scene.isLost = true;

				console.log("Event listener: game lost");
				var msg = UIGenerator.CreateGameFinishedMessage("I'm Sorry! You Lost!",150,150,"/assets/Smilies/cry.gif");
				currentGame.addToContainer(msg);

			});


			this.container.addEventListener("hudupdate", function(){

				currentGame.updateHUD();

			});

		}

	

		generateCanvasElement(){
			
			this.addToContainer(this.scene.getCanvasElement(),0);
	
		}

		configureCanvasElement(canvasElement){
			UIGenerator.ConfigureCanvas(canvasElement);

		}


		createTitleBanner(){
			this.titleBannerText = "Current Level: " + this.scene.levelConfiguration.levelNumber;
			this.titleElement = UIGenerator.CreateTitleBanner(this.titleBannerText);
			this.addToContainer(this.titleElement);
		}

		updateTitleBanner(){
				this.container.removeChild(this.titleElement);
				this.titleBannerText = "Current Level: " + sessionStorage.getItem("currentLevel");
				this.titleElement = UIGenerator.CreateTitleBanner(this.titleBannerText);
				this.addToContainer(this.titleElement);
		}

		createHomeReturnButton(){
			var currentGame = this;

			this.returnHomeButton = document.createElement("a");
			UIGenerator.ConfigureMenuButton(this.returnHomeButton,"50%");
			var buttonText = document.createTextNode("Return Home");
			this.returnHomeButton.appendChild(buttonText);
			
			var returnHomeButton = this.returnHomeButton;
			this.returnHomeButton.addEventListener("click", 
				function(){
					location.assign('https://suzhoupanda.github.io');			});

			this.addToContainer(this.returnHomeButton);

		}

		createInstructionsButton(){
			var currentGame = this;

			this.instructionsButton = document.createElement("a");
			UIGenerator.ConfigureMenuButton(this.instructionsButton,"20%");
			var buttonText = document.createTextNode("Instructions");
			this.instructionsButton.appendChild(buttonText);
			
			var instructionsButton = this.instructionsButton;
			this.instructionsButton.addEventListener("click", 
				function(){
				
					var popup = UIGenerator.CreateInstructionsPopup(
						"In order to move the targeting crosshair, use the up, down, left, and right arrows on your keypad.  When the crosshair is over an enemy, tap the spacebar to fire a missile at the enemy.",
						GAME_SETTINGS.getScreenHeight()/3,
						GAME_SETTINGS.getScreenWidth()/4,
						"assets/Smilies/confused.png",
						function(){
							currentGame.isPaused = false;

						});
					currentGame.addToContainer(popup);
					currentGame.isPaused = true;
			});

			this.addToContainer(this.instructionsButton);

		}

		createCrosshairSettingsButton(){

			var currentGame = this;

			this.crosshairSettingsButton = document.createElement("a");
			UIGenerator.ConfigureMenuButton(this.crosshairSettingsButton,"40%");
			
			var buttonText = document.createTextNode("Crosshair");
			this.crosshairSettingsButton.appendChild(buttonText);
			
			var crosshairSettingsButton = this.crosshairSettingsButton;
			var player = this.player;
			this.crosshairSettingsButton.addEventListener("click", 
				function(){
				
					var popup = UIGenerator.CreateCrosshairSettingsPopup(
						"Crosshair Settings",
						GAME_SETTINGS.getScreenHeight()/3,
						GAME_SETTINGS.getScreenWidth()/4,
						"assets/Smilies/confused.png",
						function(event){
							console.log("Processing event...");
							console.log(event);
							console.log(event.target.value);
							var newAcceleration = event.target.value/10
							player.adjustAcceleration(newAcceleration);
						},
						function(){
							currentGame.isPaused = false;

						});
					currentGame.addToContainer(popup);
					currentGame.isPaused = true;
			});

			this.addToContainer(this.crosshairSettingsButton);


		}

		createMusicSettingsButton(){
			var currentGame = this;

			this.musicSettingsButton = document.createElement("a");
			UIGenerator.ConfigureMenuButton(this.musicSettingsButton,"30%");
			var buttonText = document.createTextNode("Music Settings");
			this.musicSettingsButton.appendChild(buttonText);
			
			var musicSettingsButton = this.musicSettingsButton;
			var bgMusicAudio = this.bgMusicAudio;
			this.musicSettingsButton.addEventListener("click", 
				function(){
				
					var popup = UIGenerator.CreateMusicSettingsPopup(
						"Music Settings",
						GAME_SETTINGS.getScreenHeight()/3,
						GAME_SETTINGS.getScreenWidth()/4,
						"assets/Smilies/confused.gif",
						function(event){
							console.log("Processing event...");
							if(event.target.checked){
								if(bgMusicAudio.muted){
									bgMusicAudio.muted = false;
								} else {
									bgMusicAudio.muted = true;
								}
								
							} else {
								if(bgMusicAudio.muted){
									bgMusicAudio.muted = false;
								} else {
									bgMusicAudio.muted = true;
								}
							
							}
						},
						function(){
							currentGame.isPaused = false;

						});
					currentGame.addToContainer(popup);
					currentGame.isPaused = true;
			});

			this.addToContainer(this.musicSettingsButton);

		}

		createPauseButton(){
			var currentGame = this;

			this.pauseButton = document.createElement("a");
			this.configureMenuButton(this.pauseButton,"10%");


			var pauseText = document.createTextNode("Pause Game");
			var resumeText = document.createTextNode("Restart Game");
			this.pauseButton.appendChild(pauseText);
			var pauseButton = this.pauseButton;
			this.pauseButton.addEventListener("click", 
				function(){
				if(!this.isPaused){
					currentGame.pauseGame();
					this.isPaused = true;
					pauseButton.removeChild(pauseText);
					pauseButton.appendChild(resumeText);
				} else {
					currentGame.startGame();
					this.isPaused = false;
					pauseButton.removeChild(resumeText);
					pauseButton.appendChild(pauseText);
				}

			});

			this.addToContainer(this.pauseButton);

		}

		configureMenuButton(button,topDistance){
			UIGenerator.ConfigureMenuButton(button,topDistance);
		
		}

	

		/** Helper methods for creating and configuring background music **/
		setupBGMusic(){
			var bgMusicAudio = document.createElement("audio");
			this.bgMusicAudio = new Audio(); 
			this.bgMusicAudio.src = "assets/Sounds/polka_train.ogg";
			this.addToContainer(this.bgMusicAudio);
			this.loadBackgroundMusic();
		}

		loadBackgroundMusic(){

			var bgMusicAudio = this.bgMusicAudio;
			this.container.addEventListener("mousemove", function () {
    			bgMusicAudio.play();

    		});
		}



		/** HUD-related Helper Functions **/
		createHUD(){
		
			this.hud = new HUD(this.container,GAME_SETTINGS);
			this.hud.addHUD();

		}


		getTotalEnemies(){
			var totalEnemies = 0;

			this.scene.spriteGenerators.forEach(function(spriteGenerator){
				totalEnemies += spriteGenerator.getTotalSprites();
				
			});

			return totalEnemies;
		}

		updateHUDSpriteCount(){

			this.hud.updateEnemyCount(this.getTotalEnemies());
		}

		updateHUDKillCount(){
			var totalKills = 0;

			this.scene.spriteGenerators.forEach(function(spriteGenerator){
				totalKills += spriteGenerator.getKillCount();
			});

			this.hud.updateKillCount(totalKills);
		}


		updateHUD(){
			this.updateHUDSpriteCount();
			this.updateHUDKillCount();

			this.hud.updateHUD();
		}

		
	
		//Run the game loop
		runGame(){
			this.scene.runGame();
		}

		//Start Game
		startGame(){
			this.runGame();

		}

		//Restart Game
		restartGame(){
			this.runGame();

		}

		//Pause Game
		pauseGame(){
			this.scene.pauseGame();

		}

		//End Game
		endGame(){
			this.scene.endGame()

		}


		
		addToContainer(element,zIndex = 0){
			this.container.appendChild(element);
		}


		

	};
