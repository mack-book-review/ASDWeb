class AlienGenerator extends SpriteGenerator{

	getRandomColor(){
		const COLORS = ["beige","pink","blue","green","yellow"];
		var randIndex = Math.floor(Math.random()*COLORS.length);
		return COLORS[randIndex];
	}
	
	getRandomSprite(callback = null){
		var spawnPoint = this.getRandomSpawnPoint();
		var color =  this.getRandomColor();

		var sprite = new Alien(color,
		spawnPoint[0],
		spawnPoint[1],
		this.canvas);

		if(typeof(callback) == "function"){
			sprite.img.onload = callback;
		}

		this.totalSprites += 1;
		return sprite;

	}

	
}