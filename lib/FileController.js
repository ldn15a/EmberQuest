var FileController = function () {
    var fr = {};
	fr.private = {};
	fr.legacy = {};
	fr.legacy.private = {};

    fr.legacy.private.filesMap;
	fr.legacy.private.requestsMap;

	fr.readFile = function (fileName) {
		var fileToString = PIXI.Loader.shared.resources[fileName].data;
		var fileLineArray = [];
		var line = "";
		var char = '';

		for (var i = 0; i < fileToString.length; i++) {
			char = fileToString [i];
			line += char;
			if (char == "\n" || char == "\r\n") {
				fileLineArray.push (line);
				line = "";
			}
        }
        
        fileLineArray.push (line + "\n");

		return fileLineArray;
	}

	fr.readFileLine = function (fileName, lineNumber) {
		var fileToString = PIXI.Loader.shared.resources[fileName].data;
		var fileLineArray = [];
		var line = "";
		var char = '';

		for (var i = 0; i < fileToString.length; i++) {
			char = fileToString [i];
			line += char;
			if (char == "\n" || char == "\r\n") {
				fileLineArray.push (line);
				line = "";
			}
        }
        
        fileLineArray.push (line) + "\n";

		if (lineNumber > fileLineArray.length) {
			console.error ("Line number " + lineNumber + " does not exist in file " + fileName);
			return undefined;
		}
		else if (lineNumber <= 0) {
			console.error ("Line numbers of files start at 1. You can use line numbers in Sublime to get the correct line number you want.");
			return undefined;
		}
		else {
			return fileLineArray [lineNumber - 1];
		}
	}

    fr.legacy.requestFile = function (filePath, funct) {
		console.error ("You used a legacy FileController function. Please use PIXI loader instead of requesting files.");
		//  Create request
        var request = new XMLHttpRequest();

        //  Update our maps
        fr.legacy.private.requestsMap.set (filePath, request);
        fr.legacy.private.filesMap.set (filePath, null);

        var allText = "error";
        request.open("GET", filePath, true);

        request.onreadystatechange = function() {
            fr.legacy.private.requestsMap.set (filePath, request.readyState);

            if(request.statusText == "Not Found") {
                console.error ("You tried loading file named " + filePath + " which does not exist in file structure.");
                fr.legacy.private.requestsMap.delete (filePath);
                request = null;
            }
            else {
                if (request.readyState == 4) {
                    allText = request.responseText.split ("\n");
                    fr.legacy.private.filesMap.set (filePath, allText);
                    if (funct != undefined && funct != null) {
                        funct ();
                    }
                }
            }
        }

		request.send();
    }

    fr.legacy.isFileReady = function (filePath) {
		console.error ("You used a legacy FileController function. All files should finish loading before PIXI starts rendering or starts game loop, so all files are ready whenever you need them.");
		
        if (fr.legacy.private.filesMap.has (filePath)) {
            if (fr.legacy.private.requestsMap.get (filePath) == 4) {
                return true;
            }
        }
        else {
            if (fr.legacy.private.requestsMap.has (filePath)) {
                console.error ("Error code: 1\nAn unknown error occurred with the file controller. Tell Lucas of this incident.");
            }
            else {
                console.error ("You requested file: " + filePath + " but that file does not exist in the file strcuture of the program.");
            }
        }

        //  Still return something for all errors and problems
		return false;
    }

    fr.legacy.hasRequestedFile = function (filePath) {
		console.error ("You used a legacy FileController function. Please use PIXI loader instead of requesting files.");
		return (fr.legacy.private.filesMap.has (filePath) || fr.legacy.private.requestsMap.has (filePath));
    }

    fr.legacy.read = function (filePath) {
		console.error ("You used a legacy FileController function. Use function \"fileController.readFile\" instead.");
        if (fr.legacy.private.filesMap.has (filePath)) {
            return fr.legacy.private.filesMap.get (filePath);
        }
        
        console.error ("File name: " + filePath + " was not found for reading. Did you remember to request it first?");
		return null;
    }

    fr.legacy.readLine = function (filePath, lineNumber) {
		console.error ("You used a legacy FileController function. Use function \"fileController.readFileLine\" instead.");
        if (fr.legacy.private.filesMap.has (filePath)) {
            return fr.legacy.private.filesMap.get (filePath) [lineNumber];
        }
        
        console.error ("File name: " + filePath + " was not found for reading. Did you remember to request it first?");
		return null;
    }

    fr.private.initialize = function () {
        fr.legacy.private.filesMap = new Map ();
		fr.legacy.private.requestsMap = new Map ();
    }();

    return fr;
}