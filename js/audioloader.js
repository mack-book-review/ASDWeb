class AudioLoader{

	constructor(){
		this.audioPaths = [];
		this.loadedAudio = [];
	}

	addAudioPath(audioPath){
		this.audioPaths.push(audioPath);
	}

	preloadAudio(){
		this.preloadAudioFromAudioPaths(0);
	}

	preloadAudioFromAudioPaths(index,callback = null){
		if(index >= this.audioPaths.length){
			return;
		}

		console.log("Preloading audio #" + index + "...");

		var path = this.audioPaths[index];
		var audio = document.createElement('audio');
		audio.src = path;
		this.loadedAudio.push(audio);

		var audioLoader = this;
		audio.onload = this.preloadAudioFromAudioPaths(index+1);

		if(typeof(callback) == "function"){
			callback();
		}
	}


	cloneAudio(audioPath){
		var index = null;
		for(var i = 0; i < this.audioPaths.length; i++){
			if(audioPath == this.audioPaths[i]){
				index = i;
			}
		}
		
		
		if(index != null){
			return Object.assign({},this.loadedAudio[index]);
		} else {
			return null;
		}
	}

	//Keeps track of the percentage of images that have been loaded
	getLoadingCompletionPercentage(){
		return this.getNumberOfAudioFilesLoaded()/this.getTotalNumberOfAudioFiles();
	}

	//Returns the total number of images that need to be loaded
	getTotalNumberOfAudioFiles(){
		return this.audioPaths.length;
	}

	//Returns the number of images that have been loaded
	getNumberOfAudioFilesLoaded(){
		return this.loadedAudio.length;
	}

	

	
}

const AUDIO_LOADER = new AudioLoader();
AUDIO_LOADER.addAudioPath('polka_train.ogg');
AUDIO_LOADER.addAudioPath('laser1.ogg');


AUDIO_LOADER.preloadAudio();