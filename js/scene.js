
	class Scene{

		constructor(){
			
			//Initialize Game :oop ID
			this.gameLoopID = 0;

			//Initialize Timer Variables
			this.timer = 0;
			this.timeRemaining = 60;
			this.clockTime = 0;

			//Initialize game states
			this.isPaused = false;
			this.isLost = false;
			this.isWon = false;

			//Initialize current background animation
			this.currrenbackgroundAnimation = null;

			//Initialize game sprites array
			this.sprites = [];

			//Instantiate the canvas before instantiating the player and other sprites
			//Sprites will require a reference to the canvas on which they are drawn
			this.createCanvasElement();
			this.context = this.canvasElement.getContext('2d');
			
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


		addSprite(sprite){
			this.sprites.push(sprite);
		}

	

		createCanvasElement(){
			this.canvasElement = document.createElement("canvas");
			this.configureCanvasElement(this.canvasElement);
	
		}

		getCanvasElement(){
			return this.canvasElement;
		}

		configureCanvasElement(canvasElement){
			UIGenerator.ConfigureCanvas(canvasElement);

		}

		configureMenuButton(button,topDistance){
			UIGenerator.ConfigureMenuButton(button,topDistance);
		
		}

		

		drawText(someText,x,y){
			this.context.strokeStyle = "white";
			this.context.font = '30 pt Times New Roman';
			this.context.strokeText(someText,x,y);

		}

		drawBackgroundImg(){
			var backgroundImg = new Image();
			backgroundImg.src = GAME_SETTINGS.getBackgroundImgPath();

			this.context.drawImage(
				backgroundImg,
				0,0,
				backgroundImg.naturalWidth,
				backgroundImg.naturalHeight,
				0,0,
				GAME_SETTINGS.screenWidth,
				GAME_SETTINGS.screenHeight
				);
		}

		/** HUD-related Helper Functions **/
		createHUD(){
		
			this.hud = new HUD(this.container,GAME_SETTINGS);
			this.hud.addHUD();

		}


		getTotalEnemies(){
			var totalEnemies = 0;

			this.spriteGenerators.forEach(function(spriteGenerator){
				totalEnemies += spriteGenerator.getTotalSprites();
				
			});

			return totalEnemies;
		}

		/** Various 'hooks' for game loop **/

		updatePhysics(timeDiff){
			
			this.player.updatePhysics(timeDiff);
			
			this.spriteGenerators.forEach(function(spriteGenerator){
				
				spriteGenerator.updatePhysics(timeDiff);

			});
			

		}

		

		updateAnimations(timeDiff){

			//Draw the background image
			this.drawBackgroundImg();

			this.spriteGenerators.forEach(function(spriteGenerator){

				//Draw enemy sprites
				spriteGenerator.draw(timeDiff);

			});


			//Draw player last so that it's on top of aliens
			this.player.drawImage(this.context);

		}

		/** Trigger artificial events **/
		generateGameWinEvent(){
			console.log("Generating game win event...");
			const event = new CustomEvent('gamewon',{bubbles:true});
			this.canvasElement.dispatchEvent(event);
		}

		generateGameLossEvent(){
			console.log("Generating game loss event...");
			const event = new CustomEvent('gamelost',{bubbles:true});
			this.canvasElement.dispatchEvent(event);
		}

		checkForGameWinOrLoss(){

			var currentGame = this;

			if(currentGame.timeRemaining == 0){
				
				currentGame.generateGameLossEvent();
				
			}

			if(currentGame.getTotalEnemies() == 0){
				
				currentGame.generateGameWinEvent();

			}
		}

	
		//Run the game loop
		runGame(){

			
			//Initialize timer-related variables
			var lastTime = Date.now();
			var currentTime = lastTime;
			var timeDiff = lastTime - currentTime;

			/** Store references to the current game,
			 * current context, canvas, etc. **/			
			var currentGame = this;
			var context = this.context;
			var canvas = this.canvasElement;
	

			this.gameLoopID = setInterval(function(){
				if(currentGame.isPaused || currentGame.isLost || currentGame.isWon){
					return;
				}

				//Calculate time difference
				timeDiff = lastTime - currentTime;
				currentTime = lastTime;
				currentGame.timer += timeDiff;


			
				//Clear the canvas before drawing other game objects
				context.clearRect(0,0,canvas.width,canvas.height);
				
				//Update physics, animation, HUD, etc.
				currentGame.updatePhysics(timeDiff);
				currentGame.updateAnimations(timeDiff);

				currentGame.clockTime = Math.floor(currentGame.timer / 1000);
				currentGame.timeRemaining = currentGame.levelConfiguration.timeLimit - currentGame.clockTime;
				currentGame.drawText("Time Remaining: " + currentGame.timeRemaining,10,20);
				


				//Check if game win or loss conditions have been satisfied
				currentGame.checkForGameWinOrLoss();

				//Reset the last time
				lastTime = Date.now();

			}, GAME_SETTINGS.frameRate);

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
			clearInterval(this.gameLoopID);

		}

		//End Game
		endGame(){
			clearInterval(this.gameLoopID);

		}

	};
