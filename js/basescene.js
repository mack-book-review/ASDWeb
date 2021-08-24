class BaseScene{

	constructor(){
		//Initialize Game :oop ID
			this.gameLoopID = 0;

			//Initialize Timer Variables
			this.timer = 0;

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
			
			
	}



		/** Helper functions for creating, configuring, and getting the canvas **/
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


		addSprite(sprite){
			this.sprites.push(sprite);
		}

		getTimeLimit(){
			return 60;
		}

		getTimeRemaining(){

			var clockTime = Math.floor(this.timer / 1000);
			return this.getTimeLimit() - clockTime;
		}


		//Run the game loop
		runGame(){

			
			//Initialize timer-related variables
			var lastTime = Date.now();
			var currentTime = lastTime;
			var timeDiff = lastTime - currentTime;

			/** Store references to the current game,
			 * current context, canvas, etc. **/			
			var scene = this;
			var context = this.context;
			var canvas = this.canvasElement;
	

			this.gameLoopID = setInterval(function(){
				if(scene.isPaused || scene.isLost || scene.isWon){
					return;
				}

				//Calculate time difference
				timeDiff = lastTime - currentTime;
				currentTime = lastTime;
				scene.timer += timeDiff;


				//Clear the canvas before drawing other game objects
				context.clearRect(0,0,canvas.width,canvas.height);
				
				//Update physics, animation, HUD, etc.
				scene.updatePhysics(timeDiff);
				scene.updateAnimations(timeDiff);

				//Draw the time remaing on the canvas
				//currentGame.clockTime = Math.floor(currentGame.timer / 1000);
				//currentGame.timeRemaining = currentGame.levelConfiguration.timeLimit - currentGame.clockTime;
				scene.drawText("Time Remaining: " + scene.getTimeRemaining(),10,20);
				

				//Check if game win or loss conditions have been satisfied
				scene.checkForGameWinOrLoss();

				//Reset the last time
				lastTime = Date.now();

			}, GAME_SETTINGS.frameRate);

		}

		/** Various 'hooks' for game loop **/

		updatePhysics(timeDiff){
			
			

		}

		updateAnimations(timeDiff){

			//Draw the background image
			this.drawBackgroundImage();


		}


		/** Helper Function for Drawing Background Image **/

		drawBackgroundImage(path = GAME_SETTINGS.getBackgroundImgPath()){
			var backgroundImg = new Image();
			backgroundImg.src = path;

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

			

		drawText(someText,x,y){
			this.context.strokeStyle = "white";
			this.context.font = '30 pt Times New Roman';
			this.context.strokeText(someText,x,y);

		}

		hasWonGame(){
			return this.isWon;
			
		}

		hasLostGame(){
			return this.isLost;
			
		}


		checkForGameWinOrLoss(){

		

			if(this.hasLostGame()){
				
				this.generateGameLossEvent();
				
			}

			if(this.hasWonGame()){
				
				this.generateGameWinEvent();

			}
		}

		/** Trigger Custom Events for Game Win or Game Loss **/
		generateGameWinEvent(){
			const event = new CustomEvent('gamewon',{bubbles:true});
			this.canvasElement.dispatchEvent(event);
		}

		generateGameLossEvent(){
			const event = new CustomEvent('gamelost',{bubbles:true});
			this.canvasElement.dispatchEvent(event);
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
}