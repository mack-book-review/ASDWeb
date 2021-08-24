class Plane extends Sprite{


		constructor(x = undefined,y = undefined, canvas = undefined){
			super("assets/Planes/planeBlue1.png",
				x,y,40,40,canvas);
			this.velocityX = 0;
			this.velocityY = 0;
			this.timeCounter = 0;
			this.acceleration = 0.3;

			var flyingTextures = Animation.GetTappyPlaneTextures("Green");
			var flyingAnimation = new Animation(
				flyingTextures,true);
			this.runAnimation(flyingAnimation);
		}	


		adjustAcceleration(acceleration){
			this.acceleration = acceleration;
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

		
			if(this.y < 0){
				this.velocityY = 0;
			}

			if(this.y > this.canvas.height - this.height){
				this.velocityY = -0;
			}
			
			this.y += this.velocityY;
		
		}
		

}