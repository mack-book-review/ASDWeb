class InputHelper{

	static ConfigureTPSceneKeyboardControls(tpscene){

			
			document.addEventListener('keydown',event =>{
				console.log("Key was pressed");
				
				event.preventDefault();
				//Down key
				if(event.keyCode == 40) {
						tpscene.player.keyDown();	
      			}

      			//Up key
      			if(event.keyCode == 38) {
						tpscene.player.keyUp();
      			}

      			//Left key
      // 			if(event.keyCode == 37) {
						// scene.player.keyLeft();     				       	
      // 			}

      // 			//Right key
      // 			if(event.keyCode == 39) {
      //    				scene.player.keyRight();
      // 			}

      			//Hit spacebar
      			if(event.keyCode == 32) {

      		
         			tpscene.playerCollisionHandler();
      			}

			});

			

			
		}

	static CurrentScene = null;

	static MouseClickHandler = function(event){
				event.preventDefault();
				console.log(event);
				var x = event.offsetX;
				var y = event.offsetY;
				var scalingFactor = 3.8;
				InputHelper.CurrentScene.player.processClick(x,y,scalingFactor);
				
			};


	static KeystrokeHandler = function(event){
				console.log("Key was pressed");
				
				event.preventDefault();
				//Down key
				if(event.keyCode == 40) {
						InputHelper.CurrentScene.player.keyDown();	
      			}

      			//Up key
      			if(event.keyCode == 38) {
						InputHelper.CurrentScene.player.keyUp();
      			}

      			//Left key
      			if(event.keyCode == 37) {
						InputHelper.CurrentScene.player.keyLeft();     				       	
      			}

      			//Right key
      			if(event.keyCode == 39) {
         				InputHelper.CurrentScene.player.keyRight();
      			}

      			

			};

	static ConfigureLaserControl(scene){

		document.addEventListener('keydown',function(event){

			event.preventDefault();
			
			if(event.keyCode == 32) {

         		InputHelper.CurrentScene.playerShootHandler();
      		}

	});

	

	}

	static RemoveMouseControlListeners(scene){
		scene.canvasElement.removeEventListener("click",InputHelper.MouseClickHandler);
	}

	static RemoveKeystrokeListeners(scene){
		document.removeEventListener('keydown',InputHelper.KeystrokeHandler);
	}


	static ConfigureCanvasMouseControls(scene){

			scene.canvasElement.addEventListener("click", InputHelper.MouseClickHandler);
	}

	static ConfigureCanvasKeyboardControls(scene){

			
			document.addEventListener('keydown',InputHelper.KeystrokeHandler);

			

			
		}

	
}