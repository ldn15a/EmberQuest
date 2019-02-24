var Asset = function(name,texture,hitboxScaleWidth,hitboxScaleHeight,scaleX,scaleY,anchorX,anchorY){

	var asset = {};
	asset.name;
	asset.texture;
	asset.hbW;
	asset.hbH;
	asset.defaultScaleX;
	asset.scaleX;
	asset.defaultScaleY;
	asset.scaleY;
	asset.anchorX;
	asset.anchorY;

	asset.initialize = function(){
		asset.name = name;
		asset.texture = texture;
		asset.hbW = hitboxScaleWidth;
		asset.hbH = hitboxScaleHeight;
		asset.scaleX = scaleX;
		asset.defaultScaleX = scaleX;
		asset.scaleY = scaleY;
		asset.defaultScaleY = scaleY;
		asset.anchorX = anchorX;
		asset.anchorY = anchorY;
		PIXI.loader.add(asset.texture);
	}();

	return asset;
}