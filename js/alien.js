class Alien extends Sprite{

		constructor(alienColor, 
			x = undefined,
			y = undefined){
			
			var imgPath = "assets/Aliens/alien_";
			imgPath += alienColor;
			imgPath += ".png"


			super(imgPath,x,y,30,30);
			this.velocityX = 0;
			this.velocityY = 0;
			this.timer = 0;
			
		}	



		randomizeVelocity(){

			this.velocityX = Math.random()*10;
			this.velocityY = Math.random()*10;

			var flip1 = Math.floor(Math.random()*2);
			var flip2 = Math.floor(Math.random()*2);

			this.velocityX = flip1 == 0 ? this.velocityX : -this.velocityX;
			this.velocityY = flip2 == 0 ? this.velocityY : -this.velocityY;
			
		}

		moveRandomly(timeDiff){
			this.timer += timeDiff;
			if(this.timer > 150){
				this.randomizeVelocity();
				this.checkPosition();
				this.x += this.velocityX;
				this.y += this.velocityY;

				this.timer = 0;
			}
		}

		updatePhysics(timeDiff){
			this.moveRandomly(timeDiff);
		}
}