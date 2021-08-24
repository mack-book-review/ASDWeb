 
 class Animation{

     static GetEvilSunTextureImgPaths(){
         var basePath = "assets/Sun/sun";
         var imgPaths = [];
         for(var i = 1; i < 3; i++){
             var fullPath = basePath + i + ".png";
             imgPaths.push(fullPath);
         }
         return imgPaths;
     }
     static GetWingmanTextureImgPaths(){
         var basePath = "assets/Wingman/wingMan";
         var imgPaths = [];
         for(var i = 1; i < 6; i++){
             var fullPath = basePath + i + ".png";
             imgPaths.push(fullPath);
         }
         return imgPaths;
     }

     
     static GetExplosionTextureImgPaths(){

         var basePath = "assets/RegularExplosion/regularExplosion";
         var imgPaths = [];

         for(var i = 0; i < 9; i++){
             var imgPath  = basePath + "0" + i + ".png";
             imgPaths.push(imgPath);
         }

         return imgPaths;
     }

      static GetTextures(imgPaths){
         var imgArray = [];

         imgPaths.forEach((imgPath,index) =>{
             var img = new Image();
             img.src = imgPath;
             imgArray.push(img);
         });

         
            return imgArray;

     }

    static GetEvilSunTextures(){
        var imgPaths = Animation.GetEvilSunTextureImgPaths();
        return Animation.GetTextures(imgPaths);

    }


       static GetWingmanTextures(){
         var imgPaths = Animation.GetWingmanTextureImgPaths();
         return Animation.GetTextures(imgPaths);

     }

     static GetExplosionTextures(){
         var imgPaths = Animation.GetExplosionTextureImgPaths();

         return Animation.GetTextures(imgPaths);
     }

     static GetEvilSunTurningAnimation(){

         var anim = new Animation(Animation.GetEvilSunTextures());
         anim.autoLoop = true;
         anim.frameInterval = 30;
         return anim;
     }


     static GetWingmanFlyingAnimation(){

         return new Animation(Animation.GetWingmanTextures());
     }
     

     constructor(textures, autoloop = false){
         this.textures = textures;
         this.currentFrame = 0;
         this.frameInterval = 10;
         this.timeCounter = 0;
         this.autoLoop = autoloop;
     }

     setAutoloopOn(){
         this.autoloop = true;
     }

     resetCurrentFrame(){
         this.currentFrame = 0;
     }

     incrementFrameNumber(){
         if(this.currentFrame < this.textures.length){
             this.currentFrame += 1;
         } else {
             this.currentFrame = 0;
         }
     }

     getCurrentTexture(){
         return this.textures[this.currentFrame];
     }

     getCurrentFrame(){
         return this.currentFrame;
     }


    addTextures(textures)
    {
        this.textures = textures;
    }

     getTextureCount(){
         return this.textures.length;
     }


     resetTimeCounter(){
         this.timeCounter = 0;
     }

     incrementTimeCounter(timeDiff){
         this.timeCounter += timeDiff;
     }

 
 }
