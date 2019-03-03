function TestNPC () {
    var testNPC = {};
    //var character... ect. I'll do this later.
    //tOA = textObjectArray;
    testNPC.tOA = [];
    testNPC.currentIndex;
    testNPC.active;
    //PRETEND LIKE THIS IS THE EXTERNAL TEXT FILE PARSER. USE THE CODE LINES ON THE LEFT TO HELP FIND INDEX.
    var text = [
    "Greetings, friend. I see that you aren't from around these parts. My name is Eresea.",
    "You picked a fine day to stumble out here. A bit wet and sad.",
    "You're looking for trouble, aren't you?",
    "No, I'm on a quest to find the Ember.",
    "No sir, do I look like I am?",
    "No, I'm just a traveller. Are there usually bandits out here?",
    ".....",
    "I think I just found some.",
    "You're looking for the Ember??? What, are you mad? You really ARE looking for trouble.",
    "I'm sorry. I've had enough of you. Go along to your doom, then.",
    "Is it really that dangerous?",
    "Goodbye then.",
    "If you continue, you will be the third flame this month to go out.",
    "I won't help you kill yourself. Leave.",
    "I don't need to see it in you, I know it's in you.",  
    "Everyone out here is looking for trouble. No other reason to come here. I've seen it many times.",
    "For all that's good and holy... turn back.",
    "Why's that?",
    "You didn't really answer my question about the bandits.",
    "I can't do that.",
    "Nobody makes it back but the reaper.",
    "His pockets are lined with souls claimed from this place...",
    "I've seen it too much. Leave. Please.",
    "There are a few who make it, yes. Those whose lives aren't claimed, they claim others. Spurred on by the reaper.",
    "Is this not enough to deter you? Won't you leave??",
    ".....",
    "...I see.",
    "Ensure you are right before the religious candle, and begone.",
    "If you are going to ignore me, hear this one thing:",
    "The reaper has already claimed two this month. Continue and you will be the third.",
    "Good luck.",
    "Oh, I can skirmish, my friend.",
    "Shouldn't have messed with me."
    ];

    // a textObject that we remember. We can have several options in this, and remove them as they are asked.
    testNPC.query1;

    testNPC.lastMessage;


    testNPC.update = function () {
        
        //is the NPC being talked to?
        if(testNPC.active){
            
            //can we write new text?
            if(tb.idle){

                //special occurrances.
                if(testNPC.lastMessage == text[41]){
                    //omae wa mou shindeiru
                    //player.health-=9999999999999999999999999999999999999999999999999999999999999999999999999999;
                    testNPC.tOA.push(TextObject(text[42]));
                    //leaves the conversation due to lack of content.
                }

                //Have we selected any options? If so, how do we respond?
                if(tb.selectedOption == text[3]){

                    //the player answered with "No, I'm on a quest to find the Ember.", so this is what happens.
                    testNPC.tOA.push(TextObject(text[8]));

                    var needsOptions = TextObject(text[9]);
                    needsOptions.addOption(text[10]);
                    needsOptions.addOption(text[11]);

                    testNPC.tOA.push(needsOptions);
                }else if(tb.selectedOption == text[10]){

                    //leave the conversation due to running out of text.
                    testNPC.tOA.push(TextObject(text[12]));
                    testNPC.tOA.push(TextObject(text[13]));
                }else if(tb.selectedOption == text[11]){

                    //leave the conversation.
                    testNPC.active = false;
                }else if(tb.selectedOption == text[4]){

                    //similar to how the conversation started. It boots you back to the first question, but you cannot answer the same way.
                    testNPC.tOA.push(TextObject(text[14]));

                    var needsOptions = TextObject(text[15]);
                    needsOptions.addOption(text[3]);
                    needsOptions.addOption(text[5]);
                    needsOptions.addOption(text[6]);
                    needsOptions.addOption(text[7]);
                    testNPC.tOA.push(needsOptions);
                }else if(tb.selectedOption == text[5]){

                    //these options, or queries, get permanently answered when asked.
                    testNPC.tOA.push(TextObject(text[15]));
                    testNPC.tOA.push(testNPC.query1);
                }else if(tb.selectedOption == text[17]){

                    //these options, or queries, get permanently answered when asked.
                    testNPC.tOA.push(TextObject(text[20]));
                    testNPC.tOA.push(TextObject(text[21]));
                    //I'm changing this query's message so the options display with a message in a new context.
                    testNPC.query1.string = text[22];
                    testNPC.tOA.push(testNPC.query1);
                }else if(tb.selectedOption == text[18]){

                    //these options, or queries, get permanently answered when asked.
                    testNPC.tOA.push(TextObject(text[23]));
                    //I'm changing this query's message so the options display with a message in a new context.
                    testNPC.query1.string = text[24];
                    testNPC.tOA.push(testNPC.query1);
                }else if(tb.selectedOption == text[19]){

                    //leave the conversation due to running out of text.
                    testNPC.tOA.push(TextObject(text[25]));
                    testNPC.tOA.push(TextObject(text[26]));
                    testNPC.tOA.push(TextObject(text[27]));
                }else if(tb.selectedOption == text[6]){

                    //leave the conversation due to running out of text.
                    testNPC.tOA.push(TextObject(text[25]));
                    testNPC.tOA.push(TextObject(text[26]));
                    testNPC.tOA.push(TextObject(text[27]));
                }else if(tb.selectedOption == text[7]){

                    //leave the conversation due to running out of text.
                    testNPC.tOA.push(TextObject(text[25]));
                    testNPC.tOA.push(TextObject(text[26]));
                    testNPC.tOA.push(TextObject(text[27]));
                }else{

                    //nothing special is happening, so we assume that there was no option selected.
                    //though, what if there is and we messed up?
                    if(tb.selectedOption != ""){
                        console.warn("WARNING: tb.selectedOption is not an empty string, yet we are ignoring it. Check the else/if stack.");
                    }

                    //nothing special is happening, so continue with the text.
                    if(testNPC.tOA.length == 0){
                        //leave the conversation, as nothing more can be said.
                        testNPC.active = false;
                    }else{
                        testNPC.lastMessage = testNPC.tOA.pop();
                        tb.addText(lastMessage);
                    }
                }
            }
        }
    }

    testNPC.render = function () {
        //no, YOU'RE a render!
    }

    testNPC.initialize = function () {
        testNPC.active = false;
        testNPC.currentIndex = 0;

        //add textObjects to our array. Each of these is primed with a string argument supplied by our Text array.
        testNPC.tOA.push(TextObject(text[0]));
        testNPC.tOA.push(TextObject(text[1]));

        //this last textObject needs options. So we supply them separately.
        var needsOptions = TextObject(text[2]);

        //you can add as many options as you'd like. The strings are supplied by our Text array.
        needsOptions.addOption(text[3]);
        needsOptions.addOption(text[4]);
        needsOptions.addOption(text[5]);
        needsOptions.addOption(text[6]);
        needsOptions.addOption(text[7]);

        //don't forget to push it! Any textObject with a question needs to be the last point in the array, otherwise the conversation won't make sense.
        testNPC.tOA.push(needsOptions);


        testNPC.query1 = TextObject(text[16]);
        testNPC.query1.addOption(text[17]);
        testNPC.query1.addOption(text[18]);
        testNPC.query1.addOption(text[19]);
        testNPC.query1.addOption(text[11]);

    }();

    return testNPC;
}