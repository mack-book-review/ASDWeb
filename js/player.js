class Player extends Sprite{
		
		constructor(x = undefined,y = undefined){
			super("assets/BasicCrosshairs/White/crosshair061.png",
				x,y,40,40);
			this.velocityX = 0;
			this.velocityY = 0;
			this.timeCounter = 0;
			this.acceleration = 0.3;
			this.health = 10;
			this.numberBullets = 60;
		}	


		adjustAcceleration(acceleration){
			this.acceleration = acceleration;
		}

		processClick(x,y,scalingFactor = 1){

			console.log("x: " + x);
			console.log("y: " + y);
			console.log("PosX: " + this.x);
			console.log("PosY: " + this.y);

			if(x < scalingFactor*(this.x + this.width)/2){
				this.clickHandler("left");
			}else{
				this.clickHandler("right");
			} 

			if(y < scalingFactor*(this.y+this.height)/2){
				this.clickHandler("up");
			}else{
				this.clickHandler("down");
			}
		}

		clickHandler(direction){
			switch(direction){
				case "left": 
					this.moveLeft();
					break;
				case "right": 
					this.moveRight();
					break;
				case "up": 
					this.moveUp();
					break; 
				case "down": 
					this.moveDown();
					break;
			}
		}

	

		keyLeft(){
			this.moveLeft();
		}

		keyRight(){
			this.moveRight();
		}

		keyUp(){
			this.moveUp();
		}

		keyDown(){
			this.moveDown();
		}

		moveLeft(){
			if(this.x < 0){
				return;
			}

			this.velocityX += -this.acceleration;
		}

		moveRight(){
			if(this.x > GAME_SETTINGS.screenWidth - this.width){
				return;
			}

			this.velocityX += this.acceleration;
		}

		moveUp(){
			if(this.y < 0){
				return;
			}

			this.velocityY += -this.acceleration;
		}

		moveDown(){
			if(this.y > GAME_SETTINGS.screenHeight  - this.height){
				return;
			}

			this.velocityY += this.acceleration;
		}

		reduceNumberOfBullets(){
			this.numberBullets -= 1;
		}

		

	
		

		updatePhysics(timeDiff){

			if(this.x < 0){
				this.velocityX = 1;
			}

			if(this.x > GAME_SETTINGS.screenWidth*0.41 - this.width){
				this.velocityX = -1;
			}

			if(this.y < 0){
				this.velocityY = 1;
			}

			if(this.y > GAME_SETTINGS.screenHeight*0.36 - this.height){
				this.velocityY = -1;
			}
			
			this.y += this.velocityY;
			this.x += this.velocityX;
		

		}
		
}