class LevelConfiguration{

	constructor(levelNum,
		timeLimit,
		minSpawningRate,
		maxSpawningRate,enemyType){

		this.levelNumber = levelNum;
		this.timeLimit = timeLimit;
		this.minSpawningRate = minSpawningRate;
		this.maxSpawningRate = maxSpawningRate;
		this.enemyType = enemyType;
	}



	getTotalEnemyRange(){
		return this.maxSpawningRate - this.minSpawningRate;
	}

	getRandomNumberOfEnemies(){
		console.log("Total Enemy Range: " + this.getTotalEnemyRange());
		return Math.floor(Math.random()*this.getTotalEnemyRange()) + this.minSpawningRate;
	}


}