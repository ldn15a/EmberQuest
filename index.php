<!doctype html>
<html>
<head>
	<meta charset="utf-8">
    <title>testing pixi</title>
    <link rel="stylesheet" type="text/css" href="myStyling.css">
</head>
	<script src="lib/pixi.min.js"></script>
<body>
	<script type="text/javascript">
	    let type = "WebGL"
	    if(!PIXI.utils.isWebGLSupported()){
	      type = "canvas"
	    }

	    PIXI.utils.sayHello(type)
  	</script>

    <?php require "scripts.html";?>
    
</body>
</html>
