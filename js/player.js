class Player extends Sprite{
		
		constructor(x = undefined,y = undefined, canvas = undefined){
			super("assets/BasicCrosshairs/White/crosshair061.png",
				x,y,40,40,canvas);
			this.velocityX = 0;
			this.velocityY = 0;
			this.timeCounter = 0;
			this.acceleration = 0.3;
		}	


		adjustAcceleration(acceleration){
			this.acceleration = acceleration;
		}

		keyLeft(){
			if(this.x < 0){
				return;
			}

			this.velocityX += -this.acceleration;
		}

		keyRight(){
			if(this.x > this.screenWidth - this.width){
				return;
			}

			this.velocityX += this.acceleration;
		}

		keyUp(){
			if(this.y < 0){
				return;
			}

			this.velocityY += -this.acceleration;
		}

		keyDown(){
			if(this.y > this.screenHeight - this.height){
				return;
			}

			this.velocityY += this.acceleration;
		}

	
		

		updatePhysics(timeDiff){

			if(this.x < 0){
				this.velocityX = 1;
			}

			if(this.x > this.canvas.width - this.width){
				this.velocityX = -1;
			}

			if(this.y < 0){
				this.velocityY = 1;
			}

			if(this.y > this.canvas.height - this.height){
				this.velocityY = -1;
			}
			
			this.y += this.velocityY;
			this.x += this.velocityX;
		

		}
		
}