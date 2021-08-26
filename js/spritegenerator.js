//Should manage creation and destruction of alien objects
class SpriteGenerator{

	constructor(canvas,defaultImgPath = "assets/Alien/alien_beige.png",defaultSize = [30,30]){
		this.canvas = canvas;
		this.context = this.canvas.getContext('2d');
		this.totalSprites = 0;
		this.killCount = 0;
		this.sprites = [];
		this.defaultImgPath = defaultImgPath;
		this.defaultSize = defaultSize;
		this.timer = 0;
		this.spawnInterval = 500*20;
		this.minSprites = 1;
		this.maxSprites = 3;
	}

	/** Trigger artificial events **/

		
	generateUpdateHUDEvent(){
			const event = new CustomEvent('hudupdate',
				{	
					bubbles:true,
					detail:{
						totalSprites:this.getTotalSprites(),
						killCount:this.getKillCount()
					}
				});
			this.canvas.dispatchEvent(event);
		}



	getFullSpawnRange(){
		return this.maxSprites - this.minSprites;
	}

	getRandomNumberOfObjects(){
		return Math.floor(Math.random()*this.getFullSpawnRange()) + this.minSprites;
	}

	getTotalSprites(){
		return this.totalSprites;
	}

	getKillCount(){
		return this.killCount;
	}

	getRandomSpawnPoint(){
		var maxX = this.canvas.width;
		var maxY = this.canvas.height;

		return [
			Math.random()*(maxX)*0.80 + 0.10*this.canvas.width,
			Math.random()*(maxY)*0.80 + 0.10*this.canvas.height
			];
	}


	getDefaultImgPath(){
		return this.defaultImgPath;
	}

	getDefaultSize(){
		return this.defaultSize;;
	}

	getRandomSprite(onLoadCallback = null){
		var spawnPoint = this.getRandomSpawnPoint();
		var defaultSize = this.getDefaultSize();

		/** generate a sprite here**/
		var sprite = new Sprite(
			this.getDefaultImgPath(),
			spawnPoint[0],spawnPoint[1],
			defaultSize[0],defaultSize[1]
			);

		
		if(typeof(callback) == "function"){
			sprite.img.onload = onLoadCallback;
			
		}

		this.totalSprites += 1;
		return sprite;


	}


	getRandomSprites(numberSprites, sprites = []){
	
		var spriteGenerator = this;

		var sprite = this.getRandomSprite(function(){
			if(numberSprites > 1){
				spriteGenerator.getRandomSprites(numberSprites-1,sprites);
			} 
		});

		if(sprite != null){
			sprites.push(sprite);
		}
	

		return sprites;
	} 
	

	spawnObjects(numberSprites){
		
		this.sprites = this.getRandomSprites(numberSprites);
	
	}


	repeatSpawn(timeDiff){
		this.timer += timeDiff;
		if(this.timer > this.spawnInterval){

			for(var i = 0; i < this.getRandomNumberOfObjects(); i++){
				this.sprites.push(this.getRandomSprite());

			}
			
			this.timer = 0;
		}
	}


	updatePhysics(timeDiff,callback = null){
		for(var i = 0; i < this.sprites.length; i++){
				
			this.sprites[i].updatePhysics(timeDiff);

			if(typeof(callback) == "function"){
				callback(this.sprites[i],this.canvas);
			}
		}



	}



	checkPlayerContact(player){
		
		for(var i = 0; i < this.sprites.length; i++){
			if(player.hasOverlapWith(this.sprites[i],0.5)){
				this.sprites[i].takeDamage();
			}
					
		}
	}

	draw(timeDiff){


		this.generateUpdateHUDEvent();

		this.repeatSpawn(timeDiff);

		for(var i = 0; i < this.sprites.length; i++){
			if(this.sprites[i].isDead){
				//Remove the img object stored in the sprit
				delete this.sprites[i].img;
				this.sprites[i].img = null;

				//Remove the 'dead' sprite from the sprites array
				this.sprites.splice(i,1);

				//Update the killCount
				this.killCount += 1;

				//Update totalSprites
				this.totalSprites -= 1;


			} 
				
			if(this.sprites[i] != null || this.sprites[i] != undefined){
				this.sprites[i].drawImage(this.context,timeDiff);
			}

				
		}

	}

	addSprite(newSprite){
		this.sprites.push(newSprite);
	}

}