class EvilSun extends Sprite{

	constructor( 
			x = undefined,
			y = undefined, canvas = undefined){
			
			var imgPath = "assets/Sun/sun1.png";
		
			super(imgPath,x,y,30,30,canvas);
			this.velocityX = 0;
			this.velocityY = 0;
			this.timer = 0;
			this.img.style.zIndex = -10;


			var evilSunAnimation = Animation.GetEvilSunTurningAnimation();
			evilSunAnimation.autoLoop = true;
			console.log(evilSunAnimation);
			this.runAnimation(evilSunAnimation);
			
		}	

		randomizeVelocity(){

			this.velocityX = Math.random()*10;
			this.velocityY = Math.random()*10;

			var flip1 = Math.floor(Math.random()*2);
			var flip2 = Math.floor(Math.random()*2);

			this.velocityX = flip1 == 0 ? this.velocityX : -this.velocityX;
			this.velocityY = flip2 == 0 ? this.velocityY : -this.velocityY;
			
		}

		updatePhysics(timeDiff){
			this.timer += timeDiff;
			if(this.timer > 150){
			

				this.timer = 0;
			}
		

		}
}