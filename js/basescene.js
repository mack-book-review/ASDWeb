class BaseScene{

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


		addSprite(sprite){
			this.sprites.push(sprite);
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

		/** Various 'hooks' for game loop **/

		updatePhysics(timeDiff){
			
			

		}

		updateAnimations(timeDiff){

			//Draw the background image
			this.drawBackgroundImg();


		}
		/** Helper Function for Drawing Background Image **/
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
			console.log("Generating game win event...");
			const event = new CustomEvent('gamewon',{bubbles:true});
			this.canvasElement.dispatchEvent(event);
		}

		generateGameLossEvent(){
			console.log("Generating game loss event...");
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