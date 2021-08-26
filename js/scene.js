
	class Scene extends BaseScene{

		constructor(){
			
			super();


			//Instantiate player
			this.createPlayer();
			this.configureShootAudio("assets/Sounds/laser2.ogg");

			//Configure level configuration

			var lastChar = window.location.href.substring(window.location.href.length-1);
			var currentLevel = parseInt(lastChar);


			if(isNaN(currentLevel) || currentLevel == null || currentLevel == undefined){
				currentLevel = 1;
			}
			
			console.log(currentLevel);
			this.levelConfiguration = LevelLoader.GetLevelConfiguration(parseInt(currentLevel));

			//Create sprite generators
			this.spriteGenerators = this.generateSpriteGenerators();

			//Spawn enemies
			var randNumEnemies = this.levelConfiguration.getRandomNumberOfEnemies();
			this.spriteGenerators.forEach((generator) =>{
				generator.spawnObjects(randNumEnemies);
			});

			//Configure the event handler that is called when the player shoots
			this.numberBullets = 60;
			this.configurePlayerShootHandler();
	
			
			//Create a way for player to interact with game
			//InputHelper.ConfigureCanvasKeyboardControls(this);
			InputHelper.CurrentScene = this;
			InputHelper.ConfigureLaserControl(this);
			InputHelper.ConfigureCanvasMouseControls(this);

		}

		

		generateSpriteGenerators(){
			var spriteGenerators = null;

			switch (this.levelConfiguration.enemyType) {
				case "alien":
					spriteGenerators = [new AlienGenerator(this.canvasElement)];
					break;
				case "wingman":
					spriteGenerators = [new WingmanGenerator(this.canvasElement)];
					break;
				case "evilsun":
					spriteGenerators = [new EvilSunGenerator(this.canvasElement)];
					break;
				case "evilcloud":
					spriteGenerators = [new EvilCloudGenerator(this.canvasElement)];
					break;

				case "all":
					spriteGenerators = [
					new EvilCloudGenerator(this.canvasElement),
					new EvilSunGenerator(this.canvasElement),
					new AlienGenerator(this.canvasElement),
					new WingmanGenerator(this.canvasElement)
					];
					break;
				default:
					spriteGenerators = [new AlienGenerator(this.canvasElement)];
					break;
			
			}

			return  spriteGenerators;
		}

		configureShootAudio(path){
			this.shootAudio = new Audio(); //AUDIO_LOADER.cloneAudio("assets/Sounds/laser2.ogg");
			this.shootAudio.src = path;

		}

		generatePlayerUpdateEvent(){
			const event = new CustomEvent('playerupdate',
				{	
					bubbles:true,
					detail:{
						health:this.player.health,
						numberBullets:this.player.numberBullets
					}
				});
			this.canvasElement.dispatchEvent(event);
		}

		

		configurePlayerShootHandler(){
			//Get references to enemy generators for playerShoot handler
			var scene = this;
			this.playerShootHandler = function(){
				scene.player.reduceNumberOfBullets();
				scene.shootAudio.play();
				scene.spriteGenerators.forEach(function(spriteGenerator){

					spriteGenerator.checkPlayerContact(scene.player);
				});
				
			};
		}

		


		createPlayer(){
			var startPos = GAME_SETTINGS.getPlayerStartPosition();
			this.player = new Player(
				startPos[0],
				startPos[1],
				this.canvasElement);
		}
	

		
		/** HUD-related Helper Functions **/


		getTotalEnemies(){
			var totalEnemies = 0;

			this.spriteGenerators.forEach(function(spriteGenerator){
				totalEnemies += spriteGenerator.getTotalSprites();
				
			});

			return totalEnemies;
		}

		/** Various 'hooks' for game loop **/

		updatePhysics(timeDiff){
			super.updatePhysics(timeDiff);

			this.player.updatePhysics(timeDiff);
			
			this.spriteGenerators.forEach(function(spriteGenerator){
				
				spriteGenerator.updatePhysics(timeDiff);

			});
			

		}

		

		updateAnimations(timeDiff){
			super.updateAnimations(timeDiff);

			this.generatePlayerUpdateEvent();

			this.spriteGenerators.forEach(function(spriteGenerator){

				//Draw enemy sprites
				spriteGenerator.draw(timeDiff);

			});


			//Draw player last so that it's on top of aliens
			this.player.drawImage(this.context);

		}

		
		hasWonGame(){
			return this.getTotalEnemies() == 0;
		}

		hasLostGame(){
			return this.timeRemaining == 0 || this.player.numberBullets == 0;
		}



	};
