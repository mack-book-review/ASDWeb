class InputHelper{


	static ConfigureCanvasKeyboardControls(currentGame){

			
			document.addEventListener('keydown',event =>{
				console.log("Key was pressed");
				
				event.preventDefault();
				//Down key
				if(event.keyCode == 40) {
						currentGame.player.keyDown();	
      			}

      			//Up key
      			if(event.keyCode == 38) {
						currentGame.player.keyUp();
      			}

      			//Left key
      			if(event.keyCode == 37) {
						currentGame.player.keyLeft();     				       	
      			}

      			//Right key
      			if(event.keyCode == 39) {
         				currentGame.player.keyRight();
      			}

      			//Hit spacebar
      			if(event.keyCode == 32) {

      		
         			currentGame.playerShootHandler();
      			}

			});

			

			
		}

	
}