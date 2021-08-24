
		configureMouseClickHandlers(){

			var player = this.player;
			var sprites = this.sprites;
			var canvas = this.canvasElement;

			this.mousedownHandler = function(xCor,yCor){
				if(player.isClicked(xCor,yCor)){
					console.log("Player was clicked..");
					for(var i = 0; i < sprites.length; i++){
						var sprite = sprites[i];
						if(sprite.isClicked(xCor,yCor)){
						console.log("Sprite was clicked..");
							
           						
								sprite.takeDamage();
							

						}
					}
				}
			};

			this.mouseupHandler = function(xCor,yCor){
				if(player.isClicked(xCor,yCor)){
					for(var i = 0; i < sprites.length; i++){
						
					}
					
				}		
			};
		}



configureOnscreenArrowControls(){
			console.log("Adding controls...");
			var currentGame = this;

			this.controlLeft = document.createElement("div");
			this.controlUp = document.createElement("div");
			this.controlDown = document.createElement("div");
			this.controlRight = document.createElement("div");

			this.configureControlElement(
				this.controlLeft,
				"assets/BasicControls/left.png",
				500,400,function(){
					console.log("Move left");
				});

			this.configureControlElement(
				this.controlRight,
				"assets/BasicControls/right.png",
				550,400,function(){
					console.log("Move right");

				});

			this.configureControlElement(
				this.controlUp,
				"assets/BasicControls/up.png",
				525,375,function(){
					console.log("Move up");

				});

			this.configureControlElement(
				this.controlDown,
				"assets/BasicControls/down.png",
				525,425,function(){
					console.log("Move down");

				});

			console.log("Adding control elements...");
			console.log(this.controlDown);
			console.log(this.controlUp);
			console.log(this.controlLeft);
			console.log(this.controlRight);

			this.addToContainer(this.controlDown);
			this.addToContainer(this.controlUp);
			this.addToContainer(this.controlRight);
			this.addToContainer(this.controlLeft);


		}

		configureControlElement(controlElement, 
			imgPath,
			leftPos,
			topPos,
			clickHandler){

			controlElement.style.backgroundColor = "blue";
			controlElement.style.width = "50px";
			controlElement.style.height = "50px";
			controlElement.style.backgroundImage = imgPath;
			controlElement.style.position = "absolute";
			controlElement.style.top = topPos + "px";
			controlElement.style.left = leftPos + "px";
			controlElement.style.zIndex = 10;
			controlElement.addEventListener("click",clickHandler);
		}

configureCanvasMouseControl(){
			var player = this.player;
			var mousedownHandler = this.mousedownHandler;
			var mouseupHandler = this.mouseupHandler;

			this.canvasElement.addEventListener('mousedown',event =>{
				
				console.log("Mouse down");
				console.log(event);
				var newX = event.offsetX;
				var newY = event.offsetY;
				player.mousedownHandler(newX,newY);
				mousedownHandler(newX,newY);
			});

			this.canvasElement.addEventListener('mouseup',event =>{
			
				console.log("Mouse up");
				var newX = event.clientX;
				var newY = event.clientY;
				player.mouseupHandler();
				mouseupHandler(newX,newY);

			});
		}