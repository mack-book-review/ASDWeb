class LevelLoader{


	static GetLevelConfiguration(levelNumber){
		switch(levelNumber){
			case 1:
				return new LevelConfiguration(1,60,3,5,"alien");
			case 2:
				return new LevelConfiguration(2,60,3,5,"wingman");
			case 3:
				return new LevelConfiguration(3,60,3,5,"evilsun");
			case 4:
				return new LevelConfiguration(4,60,3,5,"evilcloud");
			case 5:
				return new LevelConfiguration(5,60,3,5,"all");
			case 6:
				return new LevelConfiguration(6,30,4,7,"all");
			case 7:
				return new LevelConfiguration(7,30,5,8,"all");
			case 8:
				return new LevelConfiguration(8,20,5,8,"all");
			case 9:
				return new LevelConfiguration(9,20,6,9,"all");
			case 10:
				return new LevelConfiguration(10,20,7,10,"all");
		}
	}

	


}