var MapLoader = function () {
    var mapLoader = {};
    mapLoader.private = {};

    mapLoader.private.mapsPath;
    mapLoader.private.currentMapLoading;
    mapLoader.private.currentMapLoadingPath;
    mapLoader.private.areaObjects;

    mapLoader.loadMap = function (mapFileName, areaObjRef, loadMapCallBack) {
        mapLoader.private.currentMapLoading = mapFileName;
        mapLoader.private.currentMapLoadingPath = mapLoader.private.mapsPath + mapFileName + ".csv";

        var generateMapObjects = function () {
            var lines = fileReader.read (mapLoader.private.currentMapLoading);
            console.log (lines);
            loadMapCallBack ();
        }

        if (!fileReader.hasRequestedFile (mapLoader.private.currentMapLoadingPath)) {
            fileReader.requestFile (mapLoader.private.currentMapLoadingPath, generateMapObjects);
            mapLoader.private.areaObjects.set (mapFileName, areaObjRef);
        }
    }


    mapLoader.private.getMapsPath = function () {
        return mapLoader.private.mapsPath;
    }

    mapLoader.private.setMapsPath = function (newPath) {
        mapLoader.private.mapsPath = newPath;
    }

    mapLoader.private.initialize = function () {
        mapLoader.private.mapsPath = "./Maps/";
        mapLoader.private.currentMapLoading = "";
        mapLoader.private.currentMapLoadingPath = "";
        mapLoader.private.areaObjects = new Map();
    }();

    return mapLoader;
}