class UIGenerator{
	//Static Constants for Game Fonts

	static Fonts = class {

		static PressStart2P = "Press Start 2P";
		static SigmarOne = "Sigmar One";
		static Bangers = "Bangers";


	};

	static GetMenuPanel(scene){
		var menuPanel = document.createElement('div');
		menuPanel.style.position =  "absolute";
		menuPanel.style.top = "5%";
		menuPanel.style.left =  GAME_SETTINGS.screenWidth*1.2 + "px";
		menuPanel.style.width =  "300px";
		menuPanel.style.height = "500px";

		return menuPanel;
	}

	static GetPauseButton(scene){
		var pauseButton = document.createElement("a");

		UIGenerator.ConfigureMenuButton(pauseButton);


		var pauseText = document.createTextNode("Pause Game");
		var resumeText = document.createTextNode("Restart Game");
		pauseButton.appendChild(pauseText);
		
		pauseButton.addEventListener("click", 
				function(){
				if(!scene.isPaused){
					scene.pauseGame();
					scene.isPaused = true;
					pauseButton.removeChild(pauseText);
					pauseButton.appendChild(resumeText);
				} else {
					scene.startGame();
					scene.isPaused = false;
					pauseButton.removeChild(resumeText);
					pauseButton.appendChild(pauseText);
				}

			});

		return pauseButton;
	}

	static GetMusicSettingsButton(scene){

			var musicSettingsButton = document.createElement("a");
			UIGenerator.ConfigureMenuButton(musicSettingsButton);
			
			var buttonText = document.createTextNode("Music Settings");
			musicSettingsButton.appendChild(buttonText);
			
			musicSettingsButton.addEventListener("click", 
				function(){
				
					var popup = UIGenerator.CreateMusicSettingsPopup(
						"Music Settings",
						GAME_SETTINGS.getScreenHeight()/3,
						GAME_SETTINGS.getScreenWidth()/4,
						"assets/Smilies/confused.gif",
						function(event){
							console.log("Processing event...");
							if(event.target.checked){
								if(scene.bgMusicAudio.muted){
									scene.bgMusicAudio.muted = false;
								} else {
									scene.bgMusicAudio.muted = true;
								}
								
							} else {
								if(scene.bgMusicAudio.muted){
									scene.bgMusicAudio.muted = false;
								} else {
									scene.bgMusicAudio.muted = true;
								}
							
							}
						},
						function(){
							scene.isPaused = false;

						});
					scene.addToContainer(popup);
					scene.isPaused = true;
			});
		return musicSettingsButton;
	}

	static GetInputControlsButton(game){

			var button = document.createElement("a");
			UIGenerator.ConfigureMenuButton(button);
			
			var buttonText = document.createTextNode("Input Controls");
			button.appendChild(buttonText);
			
			button.addEventListener("click", 
				function(){
				
					var popup = UIGenerator.CreateControlSettingsPopupPopup(
						"Control Settings",
						GAME_SETTINGS.getScreenHeight()/3,
						GAME_SETTINGS.getScreenWidth()/4,
						"assets/Smilies/confused.png",
						function(event){
	
							var controlType = event.target.value;

							if(controlType == "KeyStroke"){
								InputHelper.RemoveMouseControlListeners(game.scene);
								InputHelper.ConfigureCanvasKeyboardControls(game.scene);
							} 

							if(controlType == "MouseClick"){
								InputHelper.RemoveKeystrokeListeners(game.scene);
								InputHelper.ConfigureCanvasMouseControls(game.scene);

							}
						},
						function(){
							game.scene.isPaused = false;

						});
					game.addToContainer(popup);
					game.scene.isPaused = true;
			});

			return button;

	}

	static GetCrosshairSettingsButton(scene){

			var crosshairSettingsButton = document.createElement("a");
			UIGenerator.ConfigureMenuButton(crosshairSettingsButton);
			
			var buttonText = document.createTextNode("Crosshair");
			crosshairSettingsButton.appendChild(buttonText);
			
			crosshairSettingsButton.addEventListener("click", 
				function(){
				
					var popup = UIGenerator.CreateCrosshairSettingsPopup(
						"Crosshair Settings",
						GAME_SETTINGS.getScreenHeight()/3,
						GAME_SETTINGS.getScreenWidth()/4,
						"assets/Smilies/confused.png",
						function(event){
							console.log("Processing event...");
							console.log(event);
							console.log(event.target.value);
							var newAcceleration = event.target.value/10
							scene.player.adjustAcceleration(newAcceleration);
						},
						function(){
							scene.isPaused = false;

						});
					scene.addToContainer(popup);
					scene.isPaused = true;
			});

			return crosshairSettingsButton;

	}

	static GetInstructionsButton(scene){

			var instructionsButton = document.createElement("a");
			UIGenerator.ConfigureMenuButton(instructionsButton);
			
			var buttonText = document.createTextNode("Instructions");
			instructionsButton.appendChild(buttonText);
			
			instructionsButton.addEventListener("click", 
				function(){
				
					var popup = UIGenerator.CreateInstructionsPopup(
						"In order to move the targeting crosshair, click on the screen with your mouse or use the up, down, left, and right arrows on your keypad.  When the crosshair is over an enemy, tap the spacebar to fire a missile at the enemy.",
						GAME_SETTINGS.getScreenHeight()/3,
						GAME_SETTINGS.getScreenWidth()/3.5,
						"assets/Smilies/confused.png",
						function(){
							scene.isPaused = false;

						});
					scene.addToContainer(popup);
					scene.isPaused = true;
			});

			return instructionsButton;
	}

	static GetReturnHomeButton(linkPath){
		var returnHomeButton = document.createElement("a");
			UIGenerator.ConfigureMenuButton(returnHomeButton);
			var buttonText = document.createTextNode("Return Home");
			returnHomeButton.appendChild(buttonText);
			
			returnHomeButton.addEventListener("click", 
				function(){
					location.assign(linkPath);			
				});
		return returnHomeButton;
	}

	static CreateInstructionsPopup(messageTxt, top, left, imgSrc, removeCallback = null){
			var message = document.createElement("p");

			var img = UIGenerator.CreateImgElement("assets/Smilies/annoyed.png");

			message.appendChild(img);

			var removeButton = UIGenerator.CreateRemoveButton("Got It!");

			removeButton.addEventListener("click", function(){

				
				message.remove();

				if(typeof(removeCallback) == "function"){
					removeCallback();
				}
			});

			UIGenerator.ConfigureMessageBox(message,messageTxt,top,left,500,250);

		
			
			var breakElement = document.createElement("br");
	
			message.appendChild(breakElement);
			message.appendChild(removeButton);

			return message;
	}

	static CreateNextLevelMessage(messageTxt, 
		top, left, imgSrc, removeCallback = null){
			var message = document.createElement("p");

			var img = UIGenerator.CreateImgElement(imgSrc);

			message.appendChild(img);

			var removeButton = UIGenerator.CreateRemoveButton("Next Level");

			removeButton.addEventListener("click", function(){

				
				message.remove();
		

				if(typeof(removeCallback) == "function"){
					removeCallback();
				}
			});

			UIGenerator.ConfigureMessageBox(message,messageTxt,top,left,
				GAME_SETTINGS.DefaultScreenWidth*0.5,GAME_SETTINGS.DefaultScreenHeight*0.6);
			
			var breakElement = document.createElement("br");
	
			message.appendChild(breakElement);
			message.appendChild(breakElement);

			message.appendChild(removeButton);

			return message;
	}


	static CreateGameFinishedMessage(messageTxt, top, left, imgSrc, removeCallback = null){
			var message = document.createElement("p");

			var img = UIGenerator.CreateImgElement(imgSrc);

			message.appendChild(img);

			var removeButton = UIGenerator.CreateRemoveButton("Play Again");

			removeButton.addEventListener("click", function(){

				
				message.remove();
				window.location.reload();

				if(typeof(removeCallback) == "function"){
					removeCallback();
				}
			});

			UIGenerator.ConfigureMessageBox(message,messageTxt,top,left,
				GAME_SETTINGS.DefaultScreenWidth*0.5,
				GAME_SETTINGS.DefaultScreenHeight*0.5);
			
			var breakElement = document.createElement("br");
	
			message.appendChild(breakElement);
			message.appendChild(breakElement);

			message.appendChild(removeButton);

			return message;
	}

	static CreateTitleBanner(text,backgroundImgSrc = "./assets/Banners/bannerScroll.png"){
			var title = document.createElement("p");

			//title.style.backgroundImage = 'url('+ backgroundImgSrc + ')';
			//title.style.backgroundRepeat = 'no-repeat';

			title.style.backgroundColor = 'tomato';
			title.style.position = 'absolute';
			title.style.display = 'block';
			title.style.textAlign = 'center';
			title.style.width = '250px';
			title.style.height = '20px';
			title.style.padding = "3px";
			title.style.paddingTop = '8px';
			title.style.paddingBottom = '8px';

			title.style.border = "solid 2px white";
			title.style.fontFamily = UIGenerator.Fonts.Bangers;
			title.style.color = "white";
			title.style.fontSize = "1.2em";
			title.style.transform = "scale(1.2)";

			title.style.top = 5 +'px';
			title.style.left = 300 +'px';
			title.appendChild(document.createTextNode(text));
			return title;
	}

	static ConfigureCanvas(canvas){
		console.log("UIGenerator:  Configuring canvas element");

		canvas.style.width = GAME_SETTINGS.screenWidth + "px";
		canvas.style.height = GAME_SETTINGS.screenHeight + "px";
		canvas.style.border = "white 1px solid";
		canvas.style.backgroundColor = "white";
		canvas.style.position = "absolute";
		canvas.style.top = "10%";
		canvas.style.left = "10%";
	}

	static ConfigureMenuButton(button){

			button.style.position = "relative";
			button.style.display = "block";
			button.style.clear = "both";
			button.style.width = "100%";
			button.style.height = "10%";
			button.style.textAlign = "center";
			button.style.backgroundImage = "url(assets/Banners/bannerModern.png)";
			button.style.backgroundRepeat = 'no-repeat';
			button.style.cursor = "pointer";

			button.style.padding = "10px";
			button.style.fontSize = "1.4em";
			button.style.color = "white";
			button.style.fontFamily = UIGenerator.Fonts.SigmarOne;
	}


	static CreateMusicSettingsPopup(titleText, top, left, imgSrc, checkBoxCallback = null, removeCallback = null){
			var message = document.createElement("p");

			var img = UIGenerator.CreateImgElement("assets/Smilies/annoyed.png");

			message.appendChild(img);

			var form = document.createElement("form");
			form.classList.add("form-check-input");
			form.style.clear = "left";

			var input = document.createElement("input");
			input.classList.add("form-check-input");
			input.setAttribute("type", "checkbox");
			input.setAttribute("value", "on");
			input.setAttribute("id", "flexCheckDefault");

			input.addEventListener("input",function(event){
				console.log(event);
				checkBoxCallback(event);
			});

			var label = document.createElement("label");
			label.classList.add("form-check-label");
			label.setAttribute("for", "flexCheckDefault");

			label.appendChild(document.createTextNode("Toggle Background Music"));
			
			form.appendChild(input);
			form.appendChild(label);

			var removeButton = UIGenerator.CreateRemoveButton("Done");

			removeButton.addEventListener("click", function(){

				
				message.remove();

				if(typeof(removeCallback) == "function"){
					removeCallback();
				}
			});


			UIGenerator.ConfigureMessageBox(message,titleText,top,left,500);
			message.appendChild(form);

			var breakElement = document.createElement("br");
	
			message.appendChild(breakElement);
			message.appendChild(removeButton);

			return message;
	}


	static CreateCrosshairSettingsPopup(titleText, top, left, imgSrc, slideChangeCallback = null, removeCallback = null){
			var message = document.createElement("p");
			UIGenerator.ConfigureMessageBox(message,titleText,top,left,500);

			var img = UIGenerator.CreateImgElement("assets/Smilies/annoyed.png");
			message.appendChild(img);

			var form = document.createElement("form");
			form.classList.add("form-check-input");
			form.style.clear = "left";

			var input = document.createElement("input");
			input.classList.add("slider");
			input.setAttribute("type", "range");
			input.setAttribute("min", 1);
			input.setAttribute("value", 10);
			input.setAttribute("max", 20);

			input.addEventListener("change",function(event){
				console.log(event);
				slideChangeCallback(event);
			});

			var label = document.createElement("label");
			label.classList.add("form-check-label");
			label.setAttribute("for", "flexCheckDefault");
			
			label.appendChild(document.createTextNode("Adjust Crosshair Speed"));
			
			form.appendChild(input);
			form.appendChild(label);

			var removeButton = UIGenerator.CreateRemoveButton("Done");

			removeButton.addEventListener("click", function(){

				
				message.remove();

				if(typeof(removeCallback) == "function"){
					removeCallback();
				}
			});

			message.appendChild(form);

			var breakElement = document.createElement("br");
	
			message.appendChild(breakElement);
			message.appendChild(removeButton);

			return message;
	}


	static CreateControlSettingsPopupPopup(titleText, 
		top, left, imgSrc, 
		radioSelectionCallback = null, removeCallback = null){
			var message = document.createElement("p");
			UIGenerator.ConfigureMessageBox(message,titleText,top,left,500,250);

			var img = UIGenerator.CreateImgElement("assets/Smilies/annoyed.png");
			message.appendChild(img);

			var form = document.createElement("form");
			form.classList.add("form-check-input");
			form.style.clear = "left";

			var input1 = document.createElement("input");
			input1.setAttribute("type", "radio");
			input1.setAttribute("value", "MouseClick");
			input1.setAttribute("id", "MouseClick");
			input1.setAttribute("name", "ControlType");

			input1.addEventListener("change",function(event){
				console.log(event);
				radioSelectionCallback(event);
			});

			var label1 = document.createElement("label");
			label1.classList.add("form-check-label");
			label1.setAttribute("for", "MouseClick");
			
			label1.appendChild(document.createTextNode("Mouse Control"));
			

			var input2 = document.createElement("input");
			input2.setAttribute("type", "radio");
			input2.setAttribute("value", "KeyStroke");
			input2.setAttribute("id", "KeyStroke");
			input2.setAttribute("name", "ControlType");

			input2.addEventListener("change",function(event){
				console.log(event);
				radioSelectionCallback(event);
			});

			var label2 = document.createElement("label");
			label2.classList.add("form-check-label");
			label2.setAttribute("for", "KeyStroke");
			
			label2.appendChild(document.createTextNode("Keypad Control"));
			

			form.appendChild(input1);
			form.appendChild(label1);
			form.appendChild(document.createElement("br"));
			form.appendChild(input2);
			form.appendChild(label2);

			var removeButton = UIGenerator.CreateRemoveButton("Done");

			removeButton.addEventListener("click", function(){

				
				message.remove();

				if(typeof(removeCallback) == "function"){
					removeCallback();
				}
			});

			message.appendChild(form);

			var breakElement = document.createElement("br");
	
			message.appendChild(breakElement);
			message.appendChild(removeButton);

			return message;
	}


	static CreateRemoveButton(buttonTxt){

			var removeButton = document.createElement("a");
			removeButton.style.cursor = "pointer";
			removeButton.style.backgroundColor = "white";
			removeButton.style.border = "solid 2px purple";
			removeButton.style.padding = "5px";
			removeButton.style.marginTop = "10px";
			removeButton.style.color = "dodgerblue";
			removeButton.style.borderRadius = "10%";
			removeButton.appendChild(document.createTextNode(buttonTxt));
			
			removeButton.addEventListener("mouseenter", function(){
				removeButton.style.textShadow = "2px 2px red";
			});

			removeButton.addEventListener("mouseleave", function(){
				removeButton.style.textShadow = "none";
			});


		

			return removeButton;
	}

	static CreateImgElement(imgSrc){
		var img = document.createElement("img");
		img.src = imgSrc;
		img.style.float = "left";
		img.style.height = "30%";
		img.style.width = "auto";
		img.style.marginRight = "20px";
		return img;
	}


	static ConfigureMessageBox(message,messageTxt,top,left,
		width = GAME_SETTINGS.getScreenWidth()*0.90, 
		height = GAME_SETTINGS.getScreenHeight()*0.40){

			message.style.position = 'absolute';
			message.style.display = 'block';
			

			message.style.width = width + "px";
			message.style.height = height + "px";
			message.style.padding = "10px";
			message.style.paddingTop = '20px';
			message.style.fontFamily = UIGenerator.Fonts.Bangers;
			message.style.color = "white";
			message.style.borderRadius = "10%";
			message.style.fontSize = "2em";

			message.style.backgroundColor = "dodgerblue";
			message.style.border = "solid 2px #FC9E80";
			message.style.top = top +'px';
			message.style.left = left +'px';

			var txtNode = document.createTextNode(messageTxt);
			message.appendChild(txtNode);
	}



}