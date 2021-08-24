class UIGenerator{
	//Static Constants for Game Fonts

	static Fonts = class {

		static PressStart2P = "Press Start 2P";
		static SigmarOne = "Sigmar One";
		static Bangers = "Bangers";


	};

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

			UIGenerator.ConfigureMessageBox(message,messageTxt,top,left,500,200);
			
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

			UIGenerator.ConfigureMessageBox(message,messageTxt,top,left,500,200);
			
			var breakElement = document.createElement("br");
	
			message.appendChild(breakElement);
			message.appendChild(breakElement);

			message.appendChild(removeButton);

			return message;
	}

	static CreateTitleBanner(text,backgroundImgSrc = "/assets/Banners/bannerScroll.png"){
			var title = document.createElement("p");

			title.style.backgroundImage = 'url('+ backgroundImgSrc + ')';
			title.style.backgroundRepeat = 'no-repeat';

			title.style.position = 'absolute';
			title.style.display = 'block';
			title.style.textAlign = 'center';
			title.style.width = '250px';
			title.style.height = '50px';
			title.style.padding = "10px";
			title.style.paddingTop = '20px';
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

		canvas.style.width = GAME_SETTINGS.getScreenWidth() + "px";
		canvas.style.height = GAME_SETTINGS.getScreenHeight() + "px";
		canvas.style.border = "white 1px solid";
		canvas.style.backgroundColor = "white";
		canvas.style.position = "absolute";
		canvas.style.top = "10%";
		canvas.style.left = "10%";
		canvas.style.zIndex = 0;
	}

	static ConfigureMenuButton(button,topDistance){

			button.style.position = "absolute";
			button.style.top = topDistance;
			button.style.right = "10%";
			button.style.width = 250 + "px";
			button.style.height = 30 + "px";
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
		height = GAME_SETTINGS.getScreenHeight()*0.60){

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