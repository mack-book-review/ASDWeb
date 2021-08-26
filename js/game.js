
	class Game{

		constructor(scene, container_id){

			//Store reference to scene
			this.scene = scene;
			
			//Store a reference to the container
			this.container = document.getElementById(container_id);

			this.configureContainerEventListeners();

			//Create the canva
			this.generateCanvasElement();
			
			//Configure background music
			this.setupBGMusic();

			//Create UI elements
			this.createMenuPanel();
			this.configureMenuPanel();
			this.createTitleBanner();

			//Create the HUD
			this.createHUD();

		}

		
		configureContainerEventListeners(){
			var currentGame = this;
			this.container.addEventListener("gamewon", function(){
				
				currentGame.scene.isWon = true;

				var msg = UIGenerator.CreateNextLevelMessage("Congratulations! You won!",
					200,200,
					"./assets/Medals/flat_medal1.png",
					function(){
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


			this.container.addEventListener("gamelost", 
				function(){
					currentGame.scene.isLost = true;

					var msg = UIGenerator.CreateGameFinishedMessage("I'm Sorry! You Lost!",200,200,"./assets/Smilies/annoyed.png");
					currentGame.addToContainer(msg);

			});


			this.container.addEventListener("hudupdate", function(event){
				
				var sprites = event.detail.totalSprites;
				var kills = event.detail.killCount;
				currentGame.updateHUD(sprites,kills);

			});

			this.container.addEventListener("playerupdate", function(event){
				
				var health = event.detail.health;
				var numberBullets = event.detail.numberBullets;
				currentGame.updateHUDPlayerInfo(health,numberBullets);

			});

		}

	

		generateCanvasElement(){
			
			this.addToContainer(this.scene.getCanvasElement(),0);
	
		}

		configureCanvasElement(canvasElement){
			UIGenerator.ConfigureCanvas(canvasElement);

		}


		createMenuPanel(){
			this.menuPanel = UIGenerator.GetMenuPanel(this);
			this.addToContainer(this.menuPanel);
		}

		addToMenuPanel(element){
			this.menuPanel.appendChild(element);
		}

		createTitleBanner(){
			this.titleBannerText = "Current Level: " + this.scene.levelConfiguration.levelNumber;
			this.titleElement = UIGenerator.CreateTitleBanner(this.titleBannerText,"./assets/Banners/bannerScroll.png");
			this.addToContainer(this.titleElement);
		}

		updateTitleBanner(){
				this.container.removeChild(this.titleElement);
				this.titleBannerText = "Current Level: " + sessionStorage.getItem("currentLevel");
				this.titleElement = UIGenerator.CreateTitleBanner(this.titleBannerText,"./assets/Banners/bannerScroll.png");
				this.addToContainer(this.titleElement);
		}

		configureMenuPanel(){
			var returnHomeButton = UIGenerator.GetReturnHomeButton('https://imposterdev.org/elementor-623/');
			var instructionsButton = UIGenerator.GetInstructionsButton(this);
			var crosshairSettingsButton = UIGenerator.GetCrosshairSettingsButton(this);
			var button = UIGenerator.GetMusicSettingsButton(this);
			var pauseButton = UIGenerator.GetPauseButton(this);
			var inputControlButton = UIGenerator.GetInputControlsButton(this);
			
			this.addToMenuPanel(pauseButton);
			this.addToMenuPanel(button);
			this.addToMenuPanel(crosshairSettingsButton);
			this.addToMenuPanel(instructionsButton);
			this.addToMenuPanel(inputControlButton);
			this.addToMenuPanel(returnHomeButton);

		}
		

		/** Helper methods for creating and configuring background music **/
		setupBGMusic(){
			this.bgMusicAudio = new Audio(); 
			this.bgMusicAudio.src = "assets/Sounds/polka_train.ogg";
			this.addToContainer(this.bgMusicAudio);
			
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


		updateHUD(totalSprites,totalKills){
			this.hud.updateEnemyCount(totalSprites);
			this.hud.updateKillCount(totalKills);
			this.hud.updateHUD();
		}

		updateHUDPlayerInfo(health,numberBullets){
			this.hud.updateHealth(health);
			this.hud.updateNumberOfBullets(numberBullets);
			this.hud.updateHUD();
		};

		
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


		
		addToContainer(element){
			this.container.appendChild(element);
		}


		

	};
