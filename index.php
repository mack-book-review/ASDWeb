<!DOCTYPE html>
<html>
<head>


<meta http-equiv = "Content-type" content = "text/html; charset = utf-8"> <title>Sample HTML5 File</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<link href="https://fonts.googleapis.com/css2?family=Bangers&family=Press+Start+2P&family=Sigmar+One&display=swap" rel="stylesheet">

<style>

/*

font-family: 'Bangers', cursive;
font-family: 'Press Start 2P', cursive;
font-family: 'Sigmar One', cursive;

*/

	#game-container{
		width:  90%;
		height:  40em;
		margin:  0 auto;
		background-color: dodgerblue;
		border:  black 2px solid;
		font-family: 'Press Start 2P', cursive;

	}

</style>



<script src="js/audioloader.js"></script>
<script src="js/imageloader.js"></script>
<script src="js/gamesettings.js"></script>
<script src="js/global_constants.js"></script>

<script src="js/uigenerator.js"></script>
<script src="js/animation.js"></script>
<script src="js/position.js"></script>
<script src="js/velocity.js"></script>
<script src="js/physicsbody.js"></script>
<script src="js/sprite.js"></script>
<script src="js/player.js"></script>
<script src="js/alien.js"></script>
<script src="js/wingman.js"></script>
<script src="js/evilsun.js"></script>
<script src="js/evilcloud.js"></script>
<script src="js/hud.js"></script>
<script src="js/spritegenerator.js"></script>
<script src="js/aliengenerator.js"></script>
<script src="js/wingmangenerator.js"></script>
<script src="js/evilsungenerator.js"></script>
<script src="js/evilcloudgenerator.js"></script>
<script src="js/inputhelper.js"></script>
<script src="js/levelconfiguration.js"></script>
<script src="js/levelloader.js"></script>
<script src="js/scene.js"></script>
<script src="js/game.js"></script>
<script type = "text/javascript" charset = "utf-8">

            // This function will be called once the page loads completely

            function pageLoaded(){

				var gameContainer = document.getElementById("game-container");


				//Declare the global game settings as a constant
				var scene = new Scene();
				var game = new Game(scene, gameContainer);


				game.startGame();
			}



        </script>
    </head>
    <body onload = "pageLoaded();">

    	<div id="game-container">

    	</div>


    </body>


</html>