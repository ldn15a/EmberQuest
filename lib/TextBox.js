/*
    text is a string that is all the text you want to show. You can make this text less or nothing and add to it later

    options is an array of string that will be used as options that the player can pick from. The one that the player picks will be returned as that options string
*/

function TextBox (text, options) {
    // "tb" = textBox
    var tb = {};
    tb.private = {};

    tb.private.totalText = "";
    tb.private.currentDisplayText = "";
    tb.private.options = [];

    tb.update = function () {

    }

    tb.render = function () {

    }

    tb.private.initialize = function () {
        if (typeof text !== "undefined"){
            tb.private.totalText = text;
        }

        if (typeof options !== "undefined"){
            tb.private.options = options;
        }
    }();

    function askTroyQuestionsAboutThis () {
        //  Template for creating a text box

        let roundBox = new PIXI.Graphics();

        roundBox.lineStyle(4, 0xEE7777, 1);
        roundBox.beginFill(0xFFCCCC);

        var width = WIDTH - (WIDTH / 15);
        var height = HEIGHT - (HEIGHT / 1.2);

        roundBox.drawRoundedRect(0, 0, width, height, 10);

        roundBox.x = (WIDTH - width) / 2;
        roundBox.y = HEIGHT - (height + ((WIDTH - width) / 2));

        roundBox.endFill();
        app.stage.addChild(roundBox);

        //  Template for creating text inside box

        let style = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 18,
            fill: "white",
            stroke: '#ff3300',
            strokeThickness: 2,
            dropShadow: true,
            dropShadowColor: "#000000",
            dropShadowBlur: 2,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 3,
        });
        
        let message = new PIXI.Text("Wowsers, look at all this text!", style);
        
        var textBoxSidePadding = (WIDTH - width) / 2;
        var textBoxY = HEIGHT - (height + ((WIDTH - width) / 2));
        
        message.position.set(textBoxSidePadding + 16, textBoxY + 16);
        app.stage.addChild(message);
    }

    askTroyQuestionsAboutThis ();

    return tb;
}