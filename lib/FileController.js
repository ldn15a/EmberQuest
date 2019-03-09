var FileController = function () {
    var fr = {};
    fr.private = {};

    fr.private.filesMap;
    fr.private.requestsMap;

    fr.requestFile = function (filePath) {
        //  Create request
        var request = new XMLHttpRequest();

        //  Update our maps
        fr.private.requestsMap.set (filePath, request);
        fr.private.filesMap.set (filePath, null);

        var allText = "error";
        request.open("GET", filePath, true);

        request.onreadystatechange = function() {
            fr.private.requestsMap.set (filePath, request.readyState);

            if(request.statusText == "Not Found") {
                console.error ("You tried loading file named " + filePath + " which does not exist in file structure.");
                fr.private.requestsMap.delete (filePath);
                request = null;
            }
            else {
                if (request.readyState == 4) {
                    allText = request.responseText.split ("\n");
                    fr.private.filesMap.set (filePath, allText);
                }
            }
        }

        request.send();
    }

    fr.isFileReady = function (filePath) {
        if (fr.private.filesMap.has (filePath)) {
            if (fr.private.requestsMap.get (filePath) == 4) {
                return true;
            }
        }
        else {
            if (fr.private.requestsMap.has (filePath)) {
                console.error ("Error code: 1\nAn unknown error occurred with the file controller. Tell Lucas of this incident.");
            }
            else {
                console.warn ("You requested file: " + filePath + " but that file does not exist in the file strcuture of the program.");
            }
        }

        //  Still return something for all errors and problems
        return false;
    }

    fr.read = function (filePath) {
        if (fr.private.filesMap.has (filePath)) {
            return fr.private.filesMap.get (filePath);
        }
        
        console.warn ("File name: " + filePath + " was not found for reading. Did you remember to request it first?");
        return null;
    }

    fr.readLine = function (filePath, lineNumber) {
        // TO DO: correctly implimented
        if (fr.private.filesMap.has (filePath)) {
            return fr.private.filesMap.get (filePath);
        }
        
        console.warn ("File name: " + filePath + " was not found for reading. Did you remember to request it first?");
        return null;
    }

    fr.private.initialize = function () {
        fr.private.filesMap = new Map ();
        fr.private.requestsMap = new Map ();
    }();

    return fr;
}