/*
	
	currentTextObject is a TextObject that holds:
		string (the TextObject's text, a string)
		hasOptions (a bool for whether or not the text has any options to display or choose)
		optionsArray (an array of text meant to represent the TextObject's options. Only referenced if hasOptions returns true.)
	
	You may notice that this TextBox simply displays text and holds a chosen option.
	That is intentional.
	All manipulation of this text and use of the options returned is handled locally within whatever added the text to this textbox.
	Objects like that will simply check if the textbox is done displaying by checking if tb.idle == true, then can add text OR parse the tb.lastSelectedOption to see what happens next.
	
	When tb.idle is true, the textbox should be in the process of clearing, or BE cleared and invisible.
	When tb.idle is false, the textbox should be in the process of opening and becoming visible, or BE visible with text.


	DEVELOPER NOTES:
		No testing of this has been done.
		No animations have been done, not even the fading of the box itself.

*/

function TextBox (text, options) {
    // "tb" = textBox
    var tb = {};
    tb.private = {};

    tb.private.currentDisplayText;
    tb.private.currentTextObject;
    tb.private.selectionIndex;
    tb.private.updateConsole;
    tb.private.updateText;

    tb.selectedOption;
    tb.isShowing;

    tb.update = function () {
    	//you can't do anything without the textObject.
    	if(tb.isShowing && tb.private.currentTextObject != undefined){
            //console.log("JJJJJ");
    		
    		//let's add some text if we can! (this isn't in the if statement, but check if the textbox is fading away.)
    		if(tb.private.currentDisplayText == "" || tb.private.updateText){

	    		//let's not bother with adding characters juuuuuuuust yet. But I've put this here because
    			//when we start adding characters one at a time, this is where we'd do it.
	    		tb.private.currentDisplayText = tb.private.currentTextObject.string;

	    		//we have to display the options somehow, and right now this is a lazy solution that will work for now.
	    		//this doesn't look good, hopefully this will be changed later.
	    		if(tb.private.currentTextObject.hasOptions){

	    			//a little more of a buffer below the currentDisplayText.
	    			tb.private.currentDisplayText += "\n\n";
	    			
	    			//loop through all options and display them in the same textbox as currentDisplayText
	    			for(var i = 0; i < tb.private.currentTextObject.options.length; i++){
	    				tb.private.currentDisplayText += "\n\n";
                        if(tb.private.selectionIndex == i){
                            tb.private.currentDisplayText += "> ";
                        }
	    				tb.private.currentDisplayText += tb.private.currentTextObject.options[i];
	    			}
	    		}
                tb.private.updateConsole = true;
                tb.private.updateText = false;
    		}
    	
    		//text advancement now, later options.
	    	if(keyboard.getKeyStatus(" ") == "pressed"){
	    		

	    		//just go ahead and advance, let's not worry about text quickly typing out yet.
	    		if(tb.private.currentTextObject.hasOptions){
	    			//the NPC or whatever gave the textbox text will want to know the option we selected.
	    			tb.selectedOption = tb.private.currentTextObject.options[tb.private.selectionIndex];
	    		}else{
	    			//I do this just in case.
	    			tb.selectedOption = "";
	    		}
	    		//this will signal that the text is over.
	    		tb.private.currentDisplayText = "";
                tb.private.updateConsole = true;
	    	}else{


	    		//handle options input
	    		if(tb.private.currentTextObject.hasOptions){

	    			//check for w
	    			if(keyboard.getKeyStatus("w") == "pressed"){
	    				tb.private.selectionIndex--;
	    				//loop around backwards if you go too far.
	    				if(tb.private.selectionIndex < 0){
	    					tb.private.selectionIndex = tb.private.currentTextObject.options.length-1;
	    				}
                        tb.private.updateText = true;
	    			}
	    			//check for s
	    			if(keyboard.getKeyStatus("s") == "pressed"){
	    				tb.private.selectionIndex++;
	    				//loop around forwards if you go too far.
	    				if(tb.private.selectionIndex > tb.private.currentTextObject.options.length-1){
	    					tb.private.selectionIndex = 0;
	    				}
                        tb.private.updateText = true;
	    			}
	    		}
	    	}
    	}

    	//if there's nothing going on, the textbox has done it's job. (unless it is animating)
    	if(tb.private.currentDisplayText == ""){
    		tb.isShowing = false;
    	}

        if(tb.private.updateConsole){
            tb.private.updateConsole = false;
            tb.consoleStuff();
        }

    	//if the currentDisplayText is "" for 2 frames, then begin a "closing textbox" animation and make alpha 0.
    }

    tb.render = function () {
    	// nice meme

    	//based on tb.private.selectionIndex, show an arrow over one of the options.
    }

    //PURELY FOR DEBUG
    tb.consoleStuff = function(){
        console.clear();
        console.log(tb.private.currentDisplayText);
    }

    tb.private.initialize = function () {
        if (typeof text !== "undefined"){
            tb.private.totalText = text;
        }

        if (typeof options !== "undefined"){
            tb.private.options = options;
        }
        
        tb.private.currentDisplayText = "";
        tb.private.selectionIndex = 0;
        tb.private.updateConsole = false;
        tb.private.updateText = false;

        tb.selectedOption = "";
        tb.isShowing = false;
        //makeTextbox();
    }();

    tb.addText = function(textObject){
    	//if alpha is 0, begin "creating textbox" animation.
    	tb.private.currentTextObject = textObject;
    	tb.isShowing = true;
        tb.private.updateConsole = true;
        tb.selectedOption = "";
        tb.private.selectionIndex = 0;
    }

    function makeTextbox () {
        //  Template for creating a text box

        boxBackgroundGraphic = new PIXI.Graphics();

        boxBackgroundGraphic.lineStyle(4, 0xEE7777, 1);
        boxBackgroundGraphic.beginFill(0xFFCCCC);

        var width = WIDTH - (WIDTH / 15);
        var height = HEIGHT - (HEIGHT / 1.2);

        boxBackgroundGraphic.drawRoundedRect(0, 0, width, height, 10);

        boxBackgroundGraphic.x = (WIDTH - width) / 2;
        boxBackgroundGraphic.y = HEIGHT - (height + ((WIDTH - width) / 2));

        boxBackgroundGraphic.endFill();
        //addChildToStage(boxBackgroundGraphic);

        //  Template for creating text inside box

        let style = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 18,
            fill: "#FF5555",
            stroke: '#330000',
            strokeThickness: 2,
            dropShadow: true,
            dropShadowColor: "#000000",
            dropShadowBlur: 2,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 3,
        });
        
        mainTextGraphic = new PIXI.Text("You see this now, and that means it is working, but please remove this text before proper testing starts. This needs to be blank for the textObject stuff to work.", style);
        
        var textBoxSidePadding = (WIDTH - width) / 2;
        var textBoxY = HEIGHT - (height + ((WIDTH - width) / 2));
        
        mainTextGraphic.position.set(textBoxSidePadding + 16, textBoxY + 16);
        //addChildToStage(mainTextGraphic);


        //ensure that the alpha of boxBackgroundGraphic and mainTextGraphic are both 0.
    }

    return tb;
}