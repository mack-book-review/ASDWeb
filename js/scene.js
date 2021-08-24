
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
			this.configurePlayerShootHandler();
	
			
			//Create a way for player to interact with game
			InputHelper.ConfigureCanvasKeyboardControls(this);
			

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

		configurePlayerShootHandler(){
			//Get references to enemy generators for playerShoot handler
			var spriteGenerators = this.spriteGenerators;
			var player = this.player;

			var shootAudio = this.shootAudio;
			
			this.playerShootHandler = function(){

				shootAudio.play();
				spriteGenerators.forEach(function(spriteGenerator){

					spriteGenerator.checkPlayerContact(player);
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
			return this.timeRemaining == 0;
		}



	};
