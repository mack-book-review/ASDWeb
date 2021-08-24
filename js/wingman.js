class Wingman extends Sprite{


	constructor(x = undefined,
			y = undefined, canvas = undefined){
		

			super("/assets/Wingman/wingMan1.png",
				x,y,30,30,canvas);
			this.velocityX = 2;
			this.velocityY = 0;
			this.timer = 0;
			this.img.style.zIndex = -10;

			this.destinationX = 0;
			this.destinationY = 0
			this.scaleValue = 1;
			this.scaleDelta = .1;
			this.rotationAmount = 10;

			var wingmanTextures = Animation.GetWingmanTextures();
			var flyingAnimation = new Animation(
				wingmanTextures,true);
			this.runAnimation(flyingAnimation);
			
		}

		resetDestinationPoint(){
			this.destinationY = (Math.random()*200)+40;
			this.destinationX = (Math.random()*200) + 20;
		}

	
		//need to make sure has intial xVelocity
		moveInTriangle1(timeDiff){

			this.timer += timeDiff;
			if(this.timer > 300){

				if(this.velocityX > 0 && this.velocityY == 0){
					this.velocityY = 2;
					this.velocityX = -2;
				} else if(this.velocityX < 0 && this.velocityY > 0){
					this.velocityY = -2;
					this.velocityX = -2;
				} else if(this.velocityY < 0 && this.velocityX <0){
					this.velocityY = 0;
					this.velocityX = 2;
				}
				this.timer = 0;
			}

			this.x += this.velocityX;
			this.y += this.velocityY;

		}
		moveTowardsDestinationPoint(timeDiff){

			this.timer += timeDiff;
			if(this.timer > 100){

				//this.velocityX < 0.1 || this.velocityY < 0.1
				//Math.abs(this.x - this.destinatioX) < 10 && Math.abs(this.y - this.destinationY) < 10
				if(Math.abs(this.x - this.destinatioX) < 10 && Math.abs(this.y - this.destinationY) < 10){
					console.log("Resetting destination point");
					this.resetDestinationPoint();
				} else {
					console.log("Moving towards destination point");
					var xDiff = this.destinationX - this.x;
					var yDiff = this.destinationY - this.y;

					this.velocityX = xDiff*.05;
					this.velocityY = yDiff*.05;
				}

				this.timer = 0;
			}

			this.x += this.velocityX;
			this.y += this.velocityY;
			


		}

		//must have an intitial x or y velocity
		moveInSquarePattern(timeDiff){

			this.timer += timeDiff;
			if(this.timer > 150){
				
				if(this.velocityX > 0){
					this.velocityY = 5;
					this.velocityX = 0;

				} else if(this.velocityY > 0){
					this.velocityY = 0;
					this.velocityX = -5;

				} else if(this.velocityX < 0){
					this.velocityX = 0;
					this.velocityY = -5;

				} else if(this.velocityY < 0){
					this.velocityY = 0;
					this.velocityX = 5;

				}

				this.timer = 0;

			}
			
			this.x += this.velocityX;
			this.y += this.velocityY;

		}

		updatePhysics(timeDiff){
			this.moveInSquarePattern(timeDiff);

		}

}