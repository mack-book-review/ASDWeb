class Sprite{

		constructor(imgSrc,
			x = undefined,
			y = undefined,
			width = undefined,
			height = undefined){

			//Configure reference to image
			this.img =  new Image();
			this.img.src = imgSrc;

			//Configure current animation
			this.currentAnimation = null;

			/**Configure position and size
			* Use GAME_SETTINGS singleton to get default start
			* position for the player
			* */
			var pos = GAME_SETTINGS.getPlayerStartPosition();
			this.x = x ?? pos[0];
			this.y = y ?? pos[1];
			this.width = width ?? this.img.naturalWidth;
			this.height = height ?? this.img.naturalHeight;
			
			//Configure health and dead/alive status
			this.health = 2;
			this.isDead = false;

			
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


		
		checkPosition(){

				if(this.x < 0){
					this.velocityX = 5;
				}


				if(this.x > GAME_SETTINGS.screenWidth*0.41 -this.width){
					this.velocityX = -5;
				}


				if(this.y < 0){
					this.velocityY = 5;
				}

				if(this.y > GAME_SETTINGS.screenHeight*0.36 - this.height){
					this.velocityY = -5;
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
							currentTexture.naturalWidth,
							currentTexture.naturalHeight, 
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


