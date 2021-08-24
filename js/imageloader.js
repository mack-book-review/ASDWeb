class ImageLoader{

	constructor(){
		this.imgPaths = [];
		this.loadedImages = [];
		this.numberOfImages = 0;
	}

	addImagePath(imgPath){
		this.imgPaths.push(imgPath);
	}

	preloadImages(){
		this.preloadImageFromImgPaths(0);
	}

	preloadImageFromImgPaths(index,callback = null){
		if(index >= this.imgPaths.length){
			return;
		}

		console.log("Preloading img #" + index + "...");

		var path = this.imgPaths[index];
		var img = document.createElement("img");
		img.src = path;
		this.loadedImages.push(img);

		var imgLoader = this;
		img.onload = this.preloadImageFromImgPaths(index+1);

		if(typeof(callback) == "function"){
			callback();
		}
	}


	cloneImage(imgPath){
		var index = null;
		for(var i = 0; i < this.imgPaths.length; i++){
			if(imgPath == this.imgPaths[i]){
				index = i;
			}
		}
		
		if(index != null){
			console.log("Cloning image...");
			var clonedImg = Object.assign({},this.loadedImages[index]);
			console.log("Cloned img: " + clonedImg);
			return clonedImg;
		} else {
			return null;
		}
	}

	

	//Keeps track of the percentage of images that have been loaded
	getLoadingCompletionPercentage(){
		return this.getNumberOfImagesLoaded()/this.getTotalNumberOfImages();
	}

	//Returns the total number of images that need to be loaded
	getTotalNumberOfImages(){
		return this.imgPaths.length;
	}

	//Returns the number of images that have been loaded
	getNumberOfImagesLoaded(){
		return this.loadedImages.length;
	}

	

	
}

const IMAGE_LOADER = new ImageLoader();
IMAGE_LOADER.addImagePath('assets/Aliens/alien_beige.png');
IMAGE_LOADER.addImagePath('assets/Aliens/alien_blue.png');
IMAGE_LOADER.addImagePath('assets/Aliens/alien_green.png');
IMAGE_LOADER.addImagePath('assets/Aliens/alien_pink.png');
IMAGE_LOADER.addImagePath('assets/Aliens/alien_yellow.png');

IMAGE_LOADER.addImagePath('assets/Banners/bannerHanging.png');
IMAGE_LOADER.addImagePath('assets/Banners/bannerModern.png');
IMAGE_LOADER.addImagePath('assets/Banners/bannerScroll.png');

IMAGE_LOADER.addImagePath('assets/BasicCrosshairs/White/crosshair061.png');
IMAGE_LOADER.addImagePath('assets/BasicCrosshairs/White/crosshair062.png');
IMAGE_LOADER.addImagePath('assets/BasicCrosshairs/White/crosshair063.png');
IMAGE_LOADER.addImagePath('assets/BasicCrosshairs/White/crosshair064.png');

IMAGE_LOADER.addImagePath('assets/RegularExplosion/regularExplosion00.png');
IMAGE_LOADER.addImagePath('assets/RegularExplosion/regularExplosion01.png');
IMAGE_LOADER.addImagePath('assets/RegularExplosion/regularExplosion02.png');
IMAGE_LOADER.addImagePath('assets/RegularExplosion/regularExplosion03.png');
IMAGE_LOADER.addImagePath('assets/RegularExplosion/regularExplosion04.png');
IMAGE_LOADER.addImagePath('assets/RegularExplosion/regularExplosion05.png');
IMAGE_LOADER.addImagePath('assets/RegularExplosion/regularExplosion06.png');
IMAGE_LOADER.addImagePath('assets/RegularExplosion/regularExplosion07.png');
IMAGE_LOADER.addImagePath('assets/RegularExplosion/regularExplosion08.png');

IMAGE_LOADER.addImagePath('assets/Wingman/wingMan1.png');
IMAGE_LOADER.addImagePath('assets/Wingman/wingMan2.png');
IMAGE_LOADER.addImagePath('assets/Wingman/wingMan3.png');
IMAGE_LOADER.addImagePath('assets/Wingman/wingMan4.png');
IMAGE_LOADER.addImagePath('assets/Wingman/wingMan5.png');

IMAGE_LOADER.addImagePath('assets/Medals/flat_medal1.png');


IMAGE_LOADER.preloadImages();