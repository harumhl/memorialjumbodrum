/* Selection options */
var languageButton = [];
var styleButton = [];
var speedButton = [];
var lookButton = [];
var buttons = {'language':languageButton, 'style':styleButton, 'speed':speedButton, 'look':lookButton};   
               // This is an array/dictionary of all arrays above

var execButton = []; // play, pause, next, prev

var keys = {};
keys['H'] = {'side':'right', 'x_pos':370, 'y_pos':200, 'radius':100};
keys['G'] = {'side':'left',  'x_pos':170, 'y_pos':200, 'radius':100};
keys['J'] = {'side':'right', 'x_pos':370, 'y_pos':200, 'radius':200};
keys['F'] = {'side':'left',  'x_pos':170, 'y_pos':200, 'radius':200};
keys['U'] = {'side':'right', 'x_pos':370, 'y_pos':80, 'radius':150};
keys['R'] = {'side':'left',  'x_pos':170, 'y_pos':80, 'radius':150};

var keyHitSides = ['right', 'left'];
var keyHit = {'right':undefined, 'left':undefined, 'rightOn':false, 'leftOn':false, 
              'rightRadius':0, 'leftRadius':0, 'rightDelay':0, 'leftDelay':0, 'rightX':0, 'leftX':0, 'rightY':0, 'leftY':0};

var pauseText = ""; // transfer 'textInput' data to here when it's 'paused', temporarily (until played)
var textInput = "";
var timeStamp;

var repertoire = {}; 
var repertoireInfo = {'type':"", 'pos':-1};
repertoire['SahmChae']= {'1':"j-g-h-f-h-g-j-g-h-f-h-g-j-g-h-f-h-g-j-g-h-f-h-g-j-g-h-f-h-g-j-g-h-f-h-g-j-g-h-f-h-g-j-f-j-f-j-f-", '2':"hghg--hghg--j-g-u-g-u-g-hghg--hghg--j-g-u-g-u-g-", '3':"j-r-h-g-u-g-j-g-u-g-u-g-j-r-h-g-u-g-j-g-u-g-u-g-"};
repertoire['Hwuimori'] = [];

var textDisplay = [];

/* main part of the animation */
var jumbodrumState = 
{
	preload: function() {
		game.load.spritesheet('ButtonStyleSahmChaeKoreanSPRITE','buttons/ButtonStyleSahmChaeKoreanSPRITE.png',200,100);
        game.load.image('jumbodrum', 'jumbodrum.png',2448,2448);
        game.load.image('ButtonNext', 'buttons/ButtonNext.png');
        game.load.image('ButtonPrev', 'buttons/ButtonPrev.png');
        game.load.image('ButtonPlay', 'buttons/ButtonPlay.png');
        game.load.image('ButtonPause', 'buttons/ButtonPause.png');
        game.load.image('ButtonRewindPart', 'buttons/ButtonRewindPart.png');
    },
    
    create: function()
	{
		game.stage.backgroundColor = "#e5e1db"; // gray background color
               
        /* Adding all buttons */
        //styleButton['SahmChae'] = game.add.button(300, 400, 'ButtonStyleSahmChaeKoreanSPRITE', function(){buttonSelected('style','ShamChae');}, this, 0, 1, 2);
        execButton['next'] = game.add.button(430, 550, 'ButtonNext', function(){execButtonPressed('next');}, this, 0, 1, 2);
        execButton['prev'] = game.add.button(230, 550, 'ButtonPrev', function(){execButtonPressed('prev');}, this, 0, 1, 2);
        execButton['play'] = game.add.button(330, 550, 'ButtonPlay', function(){execButtonPressed('play');}, this, 0, 1, 2);
        execButton['pause'] = game.add.button(330, 550, 'ButtonPause', function(){execButtonPressed('pause');}, this, 0, 1, 2);
        execButton['rewindPart'] = game.add.button(330, 620, 'ButtonRewindPart', function(){execButtonPressed('rewindPart');}, this, 0, 1, 2); // start over the part
        
        execButton['next'].scale.setTo(0.3);
        execButton['prev'].scale.setTo(0.3);
        execButton['play'].scale.setTo(0.3);
        execButton['pause'].scale.setTo(0.3);
        execButton['rewindPart'].scale.setTo(0.3);
        
        execButton['pause'].kill();
        
        /* Adding all images */
        var jumbodrumImage = game.add.image(140,70,'jumbodrum');
        jumbodrumImage.crossOrigin = '';
        jumbodrumImage.scale.setTo(0.2,0.2);
        
        /* Adding all texts */
        textDisplay['type'] = game.add.text(350,20, "SahmChae", { font: "25px Arial", fill: "#000000", align: "center" });
        textDisplay['part'] = game.add.text(350,50, "part 1", { font: "15px Arial", fill: "#ff0044", align: "center" });


        /* Keyboard inputs */
        // weak
        game.input.keyboard.addKey(Phaser.Keyboard.H).onDown.add(function(){keyClicked('H');}, this);
        game.input.keyboard.addKey(Phaser.Keyboard.G).onDown.add(function(){keyClicked('G');}, this);
        // strong
        game.input.keyboard.addKey(Phaser.Keyboard.J).onDown.add(function(){keyClicked('J');}, this);
        game.input.keyboard.addKey(Phaser.Keyboard.F).onDown.add(function(){keyClicked('F');}, this);
        // side
        game.input.keyboard.addKey(Phaser.Keyboard.U).onDown.add(function(){keyClicked('U');}, this);
        game.input.keyboard.addKey(Phaser.Keyboard.R).onDown.add(function(){keyClicked('R');}, this);
        
        timeStamp = game.time.now;
        
        repertoireInfo['type'] = 'SahmChae';
        repertoireInfo['pos'] = 0;
    },
	
	update: function()
	{
        /* keyboard clicked - gradually reduce */        
        for (var i=0; i < keyHitSides.length; i++) { // 'right' first, then 'left'
            
            if (keyHit[ keyHitSides[i]+'On' ] == true) {
                
                if (keyHit[ keyHitSides[i]+'Delay' ] < 20) { 
                    // show the 'impact' for a little while, before start reducing the size
                    keyHit[ keyHitSides[i]+'Delay' ]++;
                }
                else {
                    keyHit[ keyHitSides[i]+'Radius' ] -= 20; // reduce the circle size

                    if (keyHit[ keyHitSides[i] ] == undefined) 
                        keyHit[ keyHitSides[i] ] = game.add.graphics(100,100);
                        
                    keyHit[ keyHitSides[i] ].clear(); // If there is already a 'hit', then clear it out
                    keyHit[ keyHitSides[i] ].lineStyle(0);
                    keyHit[ keyHitSides[i] ].beginFill(0xFFFF00, 0.5);
                    keyHit[ keyHitSides[i] ].drawCircle(keyHit[ keyHitSides[i]+'X' ], keyHit[ keyHitSides[i]+'Y' ], 
                                                        keyHit[ keyHitSides[i]+'Radius' ]);
                    keyHit[ keyHitSides[i] ].endFill();

                    if (keyHit[ keyHitSides[i]+'Radius' ] <= 0) 
                        keyHit[ keyHitSides[i]+'On' ] = false;
                    
                    window.graphics = keyHit[ keyHitSides[i] ];
                }
            }
        }
        
        /* tokenize 'textInput' and display the 'hit's */ 
        if (textInput != "") {
        
            if (timeStamp + 200 < game.time.now) { // every hit will be evenly spread out every 0.2 sec
                timeStamp = game.time.now;
            
                keyClicked( textInput.charAt(0).toUpperCase() );

                textInput = textInput.substring(1); // get rid of char at 0
            }
        }
	}	
}

function buttonSelected(type, selection) {
    
    var typeElements = Object.keys(buttons[type]);
    
    for (var i=0; i < typeElements.length; i++) {
        if (buttons[type][typeElements[i]] = true) {
            buttons[type][i] = false;
            // MAKE THE BUTTON LOOK OFF TOO
        }
    }
    
    buttons[type][selection] = true; // i.e. buttons[language][English], buttons[speed][fast]    
}

function keyClicked(key) {

    // i.e. keyHit[ keys[key]['side'] ] == keyHit[left] or keyHit[right]
    
    if (key == '-') return; // delay purposely
    
    // If there is already a 'hit', then clear it out
    if (keyHit[ keys[key]['side'] ] != undefined) 
        keyHit[ keys[key]['side'] ].clear();
    
    keyHit[ keys[key]['side'] ] = game.add.graphics(100,100);
    keyHit[ keys[key]['side'] ].lineStyle(0);
    keyHit[ keys[key]['side'] ].beginFill(0x00FF00, 0.5);
    keyHit[ keys[key]['side'] ].drawCircle(keys[key]['x_pos'], keys[key]['y_pos'], keys[key]['radius']);
    keyHit[ keys[key]['side'] ].endFill();
    
    keyHit[ keys[key]['side']+'X' ] = keys[key]['x_pos'];
    keyHit[ keys[key]['side']+'Y' ] = keys[key]['y_pos'];
    keyHit[ keys[key]['side']+'Radius' ] = keys[key]['radius'];
    keyHit[ keys[key]['side']+'On'] = true;
    keyHit[ keys[key]['side']+'Delay'] = 0;

    window.graphics = keyHit[ keys[key]['side'] ];
}

function execButtonPressed(type) {
    if (type == 'next') {
        if (repertoireInfo['pos'] < Object.keys(repertoire[repertoireInfo['type']]).length)
            repertoireInfo['pos']++;

        textInput = repertoire[ repertoireInfo['type'] ][ Object.keys(repertoire[repertoireInfo['type']])[repertoireInfo['pos']] ];

        if (execButton['play'] != undefined) 
            execButton['play'].kill();
        execButton['pause'].reset(330,550);        
    }
    else if (type == 'prev') {
        if (0 < repertoireInfo['pos'])
            repertoireInfo['pos']--;

        textInput = repertoire[ repertoireInfo['type'] ][ Object.keys(repertoire[repertoireInfo['type']])[repertoireInfo['pos']] ];
        
        if (execButton['play'] != undefined) 
            execButton['play'].kill();
        execButton['pause'].reset(330,550);        
    }
    else if (type == 'pause') {
        pauseText = textInput;
        textInput = "";
        
        execButton['pause'].kill();
        execButton['play'].reset(330,550);        
    }
    else if (type == 'play') {
        textInput = pauseText;
        pauseText = "";
        
        // TEMP TEMP TEMP TEMP TEMP
        if (textInput == "")
            textInput = repertoire[ repertoireInfo['type'] ][ Object.keys(repertoire[repertoireInfo['type']])[repertoireInfo['pos']] ];
        
        execButton['play'].kill();
        execButton['pause'].reset(330,550);        
    }
    else if (type == 'rewindPart') {
        textInput = repertoire[ repertoireInfo['type'] ][ Object.keys(repertoire[repertoireInfo['type']])[repertoireInfo['pos']] ];

        if (execButton['play'] != undefined) 
            execButton['play'].kill();
        execButton['pause'].reset(330,550);        
    }
}

function createRectangle(x, y, w, h) {
    var sprite = game.add.graphics(x, y);
    sprite.beginFill(Phaser.Color.getRandomColor(100, 255), 1);
    sprite.drawRect(0, 0, w, h);
    return sprite;
}		