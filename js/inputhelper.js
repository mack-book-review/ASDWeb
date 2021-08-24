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


	static ConfigureCanvasKeyboardControls(scene){

			
			document.addEventListener('keydown',event =>{
				console.log("Key was pressed");
				
				event.preventDefault();
				//Down key
				if(event.keyCode == 40) {
						scene.player.keyDown();	
      			}

      			//Up key
      			if(event.keyCode == 38) {
						scene.player.keyUp();
      			}

      			//Left key
      			if(event.keyCode == 37) {
						scene.player.keyLeft();     				       	
      			}

      			//Right key
      			if(event.keyCode == 39) {
         				scene.player.keyRight();
      			}

      			//Hit spacebar
      			if(event.keyCode == 32) {

      		
         			scene.playerShootHandler();
      			}

			});

			

			
		}

	
}