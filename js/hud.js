
class HUD{

	constructor(container,gameSettings){
		//Create references for HUD and textNode contained in HUD element
		this.hud = null;
		this.textNode = null;
		

		//Set game container
		this.container = container;

		//Initialize HUD data
		this.playerHealth = 10;
		this.totalEnemies = 0;
		this.killCount = 0;
		this.health = 0;
		this.numberBullets = 0;

		//Create HUD UI elements
		this.createHUD();
		
	}

	
	//Methods to update HUD data
	updateKillCount(killCount){
		this.killCount = killCount;
		
	}

	updatePlayerHealth(playerHealth){
		this.playerHealth = playerHealth;
	}

	

	updateEnemyCount(enemyCount){
		this.totalEnemies = enemyCount;
	}

	updateHealth(health){
		this.health = health
	};
	
	updateNumberOfBullets(numberBullets){
		this.numberBullets = numberBullets;
	};

	//Primary method for updating the HUD
	updateHUD(){
		this.removeTextNode();
		this.createTextNode();
		this.addTextNode();
	}

	//Helper methods that help in updating HUD
	addTextNode(){
		this.hud.appendChild(this.textNode);
	}

	removeTextNode(){
		this.hud.removeChild(this.textNode);

	}

	getHUDText(){
		var text = "Total Enemies: " + this.totalEnemies;
		text += "  /  Kill Count: " + this.killCount;
		text += " / Number Bullets: " + this.numberBullets;
		return text;
	}

	createTextNode(){
		var text = this.getHUDText();
		this.textNode = document.createTextNode(text);
	}

	//Adds HUD to the game container
	addHUD(){
		this.container.appendChild(this.hud);
	}

	configureHUD(hud){
		
		hud.style.position = 'absolute';
		hud.style.display = 'block';
		hud.style.textAlign = 'center';

		hud.style.width =  GAME_SETTINGS.screenWidth*0.5 + 'px';
		hud.style.height = GAME_SETTINGS.screenHeight*0.05 +'px';
		hud.style.padding = "5px";
		hud.style.paddingTop = '20px';
		hud.style.fontFamily = UIGenerator.Fonts.Bangers;
		hud.style.color = "white";
		hud.style.fontSize = "1.2em";
	}

	//Method for initialzing HUD
	createHUD(backgroundImgPath = null){
			this.hud = document.createElement("p");

			if(backgroundImgPath != null){
				this.hud.style.backgroundImage = 'url(' + backgroundImgPath + ')';
				this.hud.style.backgroundRepeat = 'no-repeat';
			} else {
				this.hud.style.backgroundColor = "tomato";
				this.hud.style.border = "solid 4px white";
			}


			this.configureHUD(this.hud);

			this.hud.style.left = '10%';
			this.hud.style.top = GAME_SETTINGS.screenHeight + "px";

			this.createTextNode();
			this.addTextNode();
		}
}