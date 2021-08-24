class WingmanGenerator extends SpriteGenerator{


	getRandomSprite(callback = null){
		var spawnPoint = this.getRandomSpawnPoint();

		var sprite = new Wingman(
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