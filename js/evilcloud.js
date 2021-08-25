class EvilCloud extends Sprite{

	constructor( 
			x = undefined,
			y = undefined){
			
			var imgPath = "assets/Cloud/cloud.png";
		
			super(imgPath,x,y,30,30);
			this.velocityX = 0;
			this.velocityY = 0;
			this.timer = 0;
			this.heightChange = 1;
			this.widthChange = 1;

			
		}	

		scaleMovement(timeDiff){

			this.timer += timeDiff;
			
			if(this.timer > 400){
				
				if(this.width > 80 || this.height > 80){
					this.heightChange = -1;
					this.widthChange = -1;
				} 

				if(this.width < 20 || this.height < 20){
					this.heightChange = 1;
					this.widthChange = 1;
				};
				

				this.timer = 0;
			}

			this.width += this.widthChange;
			this.height += this.heightChange;

			

		}

		updatePhysics(timeDiff){
		
				this.scaleMovement(timeDiff);

			


		}
}