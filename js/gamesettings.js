class GameSettings{

	static DefaultScreenWidth = 740;
	static DefaultScreenHeight = 420;
	static DefaultFrameRate = 20;

	static WidthAdjustmentFactor = 0.41;
	static HeightAdjustmentFactor = 0.36;

	static LoadDefaultGameSettings(){
		return new GameSettings();
	}


	constructor(sWidth = GameSettings.DefaultScreenWidth,
		sHeight = GameSettings.DefaultScreenHeight,
		sFrameRate = GameSettings.DefaultFrameRate){

		this.screenWidth = sWidth;
		this.screenHeight = sHeight;
		this.frameRate = sFrameRate;
		this.backgroundImgPath = "assets/Backgrounds/starry_sky.jpg";
	}



	getBackgroundImgPath(){
		return this.backgroundImgPath;
	}

	getPlayerStartPosition(){
		return [this.screenWidth/5, 
		this.screenHeight/8];
	}

	getDefaultFrameRate(){
		return GameSettings.DefaultFrameRate;
	}

	getScreenWidth(){
		return this.screenWidth;
	}

	getScreenHeight(){
		return this.screenHeight;
	}

	getDefaultScreenWidth(){
		return GameSettings.DefaultScreenWidth;
	}

	getDefaultScreenHeight(){
		return GameSettings.DefaultScreenHeight;
	}
}

