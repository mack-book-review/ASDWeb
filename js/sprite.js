class Sprite{

		constructor(imgSrc,
			x = undefined,
			y = undefined,
			width = undefined,
			height = undefined, canvas = undefined){

			//Configure reference to image
			this.img =  new Image();//IMAGE_LOADER.cloneImage(imgSrc);
			this.img.src = imgSrc;

			//Configure current animation
			this.currentAnimation = null;
			
			//Configure Physics Body
			this.body = null;

			//Configure position and size
			this.x = x ?? 0;
			this.y = y ?? 0;
			this.width = width ?? this.img.naturalWidth;
			this.height = height ?? this.img.naturalHeight;
			
			//Configure health and living status
			this.health = 2;
			this.isDead = false;

			//Store reference to canvas and derivative properties, such as screenWidth and screenHeight
			this.canvas = canvas;
			this.screenWidth = 640;//this.canvas.width;
			this.screenHeight = 480;//this.canvas.height;

			;

		}

	

		
		hasOverlapWith(otherSprite,adjustmentFactor = 1){
			return !(
				this.x > (otherSprite.x+otherSprite.width*adjustmentFactor) || 
					(this.x + this.width*adjustmentFactor < otherSprite.x) ||
					(this.y > (otherSprite.y + otherSprite.height*adjustmentFactor)) ||
					((this.y+this.height*adjustmentFactor) < otherSprite.y)
					);
		}

		// //Refactor later to get bounds from canvas element
		// IsInHorizontalBounds(screenWidth){
		// 	console.log("x is: " + this.x);
		// 	return this.x >= 0  && this.x <= screenWidth;
		// }

		// IsInVerticalBounds(screenHeight){
		// 	console.log("y is: " + this.y);
		// 	return this.y >= 0 && this.y <= screenHeight;

		// }

		// isClicked(xCor,yCor){
		// 	var containsX = xCor > this.x && xCor < (this.x + this.width);
		// 	var containsY = yCor > this.y && yCor < (this.y + this.height);
			
		// 	return containsX && containsY;
		// }



		get boundingRectangle(){
			return [this.x,this.y,this.width,this.height];
		}

		getX(){
			return this.x;
		}

		getY(){
			return this.y;
		}

		getWidth(){
			return this.width;
		}

		getHeight(){
			return this.height;
		}

		setX(xPos){
			this.x = xPos;
		}

		setY(yPos){
			this.y = yPos;
		}

		setWidth(newWidth){
			this.width = newWidth;
		}

		setHeight(newHeight){
			this.height = newHeight;
		}

		

		takeDamage(){

			if(this.isDead){
				return;
			}

			console.log("Take damage");
			this.img.style.opacity -= 0.2;
			if(this.health > 0){
				this.health -= 1;
			} else {

				var textures = Animation.GetExplosionTextures();
				var explosionAnimation = new Animation(textures);
				var currentSprite = this;
				this.runAnimation(explosionAnimation,function(){
					console.log("Finished running animation");
				});
			}
		}


		
		checkPosition(callback = null){

				if(this.x < 0){

					this.velocityX = 5;
				}


				if(this.x > this.canvas.width-this.width){

					this.velocityX = -5;
				}


				if(this.y < 0){


					this.velocityY = 5;
				}

				if(this.y > this.canvas.height - this.height){

					this.velocityY = -5;
				}

				if(typeof(callback) == "function"){
					callback();
				}



		}
		
		updatePhysics(timeDiff){
				
			
		}

		
		runAnimation(animation, callback = null){

			this.currentAnimation = animation;

			if(callback != null && typeof(callback) == "function"){
				callback();
			}
		
		}

		/** MOVEMENT PATTERNS **/

		moveRandomly(timeDiff){
			this.timer += timeDiff;
			if(this.timer > 150){
				this.randomizeVelocity();


				this.x += this.velocityX;
				this.y += this.velocityY;
				this.timer = 0;
			}
		}

		drawImage(context,timeDiff){
			


			if(this.currentAnimation == null){

				context.drawImage(
				this.img,
				0,0,
				this.img.naturalWidth,this.img.naturalHeight, 
				this.x,this.y,
				this.width,this.height);

			} else {
				//run current animation
				var currentAnimation = this.currentAnimation;
				
				currentAnimation.incrementTimeCounter(timeDiff);


				if(currentAnimation.getCurrentFrame() < currentAnimation.getTextureCount()){
					if(currentAnimation.timeCounter > currentAnimation.frameInterval){
						var currentTexture = currentAnimation.getCurrentTexture();
						context.drawImage(
							currentTexture,
							0,0,
							currentTexture.naturalWidth,currentTexture.naturalHeight, 
							this.x,this.y,
							this.width,this.height);

						currentAnimation.resetTimeCounter();
						currentAnimation.incrementFrameNumber();
					}
				} else {
					currentAnimation.resetCurrentFrame();
					if(!currentAnimation.autoLoop){
						console.log("Removing animation");
						delete this.currentAnimation;
						this.currentAnimation = null;
						this.isDead = true;
					}
				}
				
			}
			
		}
	}


