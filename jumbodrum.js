/* Selection options */
var languageButton = [];
var styleButton = [];
var speedButton = [];
var lookButton = [];
var buttons = {'language':languageButton, 'style':styleButton, 'speed':speedButton, 'look':lookButton};
// This is an array/dictionary of all arrays above

var execButton = []; // play, pause, next, prev

var keys = {};
keys['H'] = {'side':'right', 'x_pos':370, 'y_pos':200, 'radius':100, 'type':'weak'};
keys['G'] = {'side':'left',  'x_pos':170, 'y_pos':200, 'radius':100, 'type':'weak'};
keys['J'] = {'side':'right', 'x_pos':370, 'y_pos':200, 'radius':200, 'type':'strong'};
keys['F'] = {'side':'left',  'x_pos':170, 'y_pos':200, 'radius':200, 'type':'strong'};
keys['U'] = {'side':'right', 'x_pos':370, 'y_pos':80, 'radius':150, 'type':'side'};
keys['R'] = {'side':'left',  'x_pos':170, 'y_pos':80, 'radius':150, 'type':'side'};

var keyHitSides = ['right', 'left'];
var keyHit = {'right':undefined, 'left':undefined, 'rightOn':false, 'leftOn':false,
    'rightRadius':0, 'leftRadius':0, 'rightDelay':0, 'leftDelay':0, 'rightX':0, 'leftX':0, 'rightY':0, 'leftY':0};

var pauseText = ""; // transfer 'textInput' data to here when it's 'paused', temporarily (until played)
var textInput = "";

var repertoire = {};
var repertoireInfo = {'type':"", 'pos':-1};
repertoire['SahmChae']= {'1':"j--g--h--f--h--g--j--g--h--f--h--g--j--g--h--f--h--g--j--g--h--f--h--g--j--g--h--f--h--g--j--g--h--f--h--g--j--g--h--f--h--g--j--f--j--f--j--f--", '2':"h-g-h-g-----h-g-h-g-----j--g--u--g--u--g--h-g-h-g-----h-g-h-g-----j--g--u--g--u--g--", '3':"j--r--h--g--u--g--j--g--u--g--u--g--j--r--h--g--u--g--j--g--u--g--u--g--", "4":"j--r--h--g--u--g--j--r--h--g--u--g--j--r--h--g--u--g--j--r--u--r--u--r--", "5":"u-r-u-r-----h-g-h-g-----j--g--u--g--u--g--h-g-h-g-----u-r-u-r-----j--g--u--g--u--g--", "6":"u-r-u-r-----h-g-h-g-----h-g-h-g-----u-r-u-r-----u-r-u-r-----u-r-u-r-----u--r--h--g--u--r--", "7":"j--g--h--g--h--g--h--g--h--g--h--g--j--g--h--g--h--g--h--g--h--g--h--g--j--g--h--g--h--g--h--g--h--g--h--g--j--g--h--g--h--g--h--g--h--g--h--g--", "8":"j--g--h--g--h--g--j--g--h--g--h--g--j--g--h--g--h--g--j--g--h--g--h--g--j--g--h--g--h--g--j--g--h--g--h--g--j--g--h--g--h--g--j--g--h--g--h--g--", "9":"j--g--h--f--h--g--j--g--h--f--h--g--j--g--h--f--h--g--j--g--h--f--h--g--j--g--h--f--h--g--j--g--h--f--h--g--j--g--h--f--h--g--j--f--j--f--j--f--"};
repertoire['Hwuimori'] = [];

var textDisplay = [];
var autoplayOn = false;

// for speed
var selection = {};
var speed = 100; // halfway is 100% - normal speed

var sound = {};

/* main part of the animation */
var jumbodrumState =
{
preload: function() {
    
    game.load.image('jumbodrum', 'jumbodrum.png', 2448, 2448);
    game.load.image('ButtonNext', 'buttons/ButtonNext.png');
    game.load.image('ButtonPrev', 'buttons/ButtonPrev.png');
    game.load.image('ButtonPlay', 'buttons/ButtonPlay.png');
    game.load.image('ButtonPause', 'buttons/ButtonPause.png');
    game.load.image('ButtonRewindPart', 'buttons/ButtonRewindPart.png');
    game.load.image('ButtonAutoPlay', 'buttons/ButtonAutoPlay.png');
    
    game.load.image('selection_bar', 'buttons/selection_bar.png');
    game.load.image('selection_button', 'buttons/selection_button.png');
    game.load.image('selection_pressed', 'buttons/selection_pressed.png');
    
    game.load.spritesheet('ButtonSpeedSlowestKorean', 'buttons/ButtonSpeedSlowestKorean.png', 200, 100);
    
    game.load.audio('SoundStrong', 'SoundStrong.mp3');
    game.load.audio('SoundWeak', 'SoundWeak.mp3');
    game.load.audio('SoundSide', 'SoundSide.mp3');    },
    
create: function()
    {
        game.stage.backgroundColor = "#e5e1db"; // gray background color
        
        /* Adding all buttons */
        //styleButton['SahmChae'] = game.add.button(300, 400, 'ButtonStyleSahmChaeKoreanSPRITE', function(){buttonSelected('style','ShamChae');}, this, 0, 1, 2);
        execButton['next'] = game.add.button(480, 550, 'ButtonNext', function(){execButtonPressed('next');}, this, 0, 1, 2);
        execButton['prev'] = game.add.button(180, 550, 'ButtonPrev', function(){execButtonPressed('prev');}, this, 0, 1, 2);
        execButton['play'] = game.add.button(280, 550, 'ButtonPlay', function(){execButtonPressed('play');}, this, 0, 1, 2);
        execButton['pause'] = game.add.button(280, 550, 'ButtonPause', function(){execButtonPressed('pause');}, this, 0, 1, 2);
        execButton['rewindPart'] = game.add.button(380, 550, 'ButtonRewindPart', function(){execButtonPressed('rewindPart');}, this, 0, 1, 2); // start over the part
        execButton['autoplay'] = game.add.button(580, 550, 'ButtonAutoPlay', function(){execButtonPressed('autoplay');}, this, 0, 1, 2); // autoplay from beginning to end
        
        execButton['next'].scale.setTo(0.3);
        execButton['prev'].scale.setTo(0.3);
        execButton['play'].scale.setTo(0.3);
        execButton['pause'].scale.setTo(0.3);
        execButton['rewindPart'].scale.setTo(0.3);
        execButton['autoplay'].scale.setTo(0.3);
        
        execButton['pause'].kill();
        
        //speedButton['slowest'] = game.add.button(0, 0, 'ButtonSpeedSlowestKorean', function(){buttonSelected('speed','slowest');}, this, 0, 1, 2);
        
        selection['bar'] = game.add.image(15,40,'selection_bar');
        selection['button'] = game.add.button(selection['bar'].width/2+15, 35,'selection_button', speedChange, this, 0);
        //selection['button'].scale.setTo(2);
        //selection['pressed'] = game.add.button(200,200,'selection_button', function);
        selection['button'].inputEnabled = true;
        selection['button'].input.enableDrag();
        selection['button'].input.boundsRect = new Phaser.Rectangle(selection['bar'].x, selection['button'].y, selection['bar'].width, selection['button'].height);
        selection['button'].input.allowVerticalDrag = false;
        
        /* Adding all images */
        var jumbodrumImage = game.add.image(140,70,'jumbodrum');
        jumbodrumImage.crossOrigin = '';
        jumbodrumImage.scale.setTo(0.2,0.2);
        
        /* Adding all texts */
        textDisplay['type'] = game.add.text(310,20, "SahmChae", { font: "25px Arial", fill: "#000000", align: "center" });
        textDisplay['part'] = game.add.text(350,50, "part 1", { font: "15px Arial", fill: "#ff0044", align: "center" });
        textDisplay['speed'] = game.add.text(80,70, "speed 100%", { font: "15px Arial", fill: "#0000ff", align: "center" });
        textDisplay['autoplayOn'] = game.add.text(580, 520, "autoplay: off", { font: "15px Arial", fill: "#0000ff", align: "center" });
        
        /* Adding all sounds */
        sound['strong'] = game.add.audio('SoundStrong');
        sound['weak'] = game.add.audio('SoundWeak');
        sound['side'] = game.add.audio('SoundSide');
        
        /* Keyboard inputs */
        // controls
        game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(function(){execButtonPressed('prev');}, this);
        game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(function(){execButtonPressed('next');}, this);
        game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(function(){execButtonPressed('autoplay');}, this);
        game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(function(){execButtonPressed('rewindPart');}, this);
        game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(function(){if(execButton['play'].visible == true) execButtonPressed('play'); else execButtonPressed('pause');}, this);
        // weak
        game.input.keyboard.addKey(Phaser.Keyboard.H).onDown.add(function(){keyClicked('H');}, this);
        game.input.keyboard.addKey(Phaser.Keyboard.G).onDown.add(function(){keyClicked('G');}, this);
        // strong
        game.input.keyboard.addKey(Phaser.Keyboard.J).onDown.add(function(){keyClicked('J');}, this);
        game.input.keyboard.addKey(Phaser.Keyboard.F).onDown.add(function(){keyClicked('F');}, this);
        // side
        game.input.keyboard.addKey(Phaser.Keyboard.U).onDown.add(function(){keyClicked('U');}, this);
        game.input.keyboard.addKey(Phaser.Keyboard.R).onDown.add(function(){keyClicked('R');}, this);
        
        repertoireInfo['type'] = 'SahmChae';
        repertoireInfo['pos'] = 0;
        
        /* tokenize 'textInput' and display the 'hit's */
        window.setTimeout(play, 10000/speed); // play() calls another setTimeout, so it's like setInterval but with changing time
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
    }
}
function play() {
    if (textInput != "") {
        
        keyClicked( textInput.charAt(0).toUpperCase() );
        
        textInput = textInput.substring(1); // get rid of char at 0
    }
    else { // textInput == "", thus it ran the whole thing
        if (autoplayOn == true) {
            if (pauseText == "")
                execButtonPressed('next');
            else
                execButtonPressed('play'); // resume
        }
        else { // autoplay off
            if (execButton['pause'] != undefined)
                execButton['pause'].kill();
            execButton['play'].reset(280,550);
        }
    }
    
    window.setTimeout(play, 10000/speed);
}

function buttonSelected(type, selection) {
    console.log("button clicked " +type +"-" +selection);
    
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
    
    sound[ keys[key]['type'] ].play();
}

function execButtonPressed(type) {
    if (type == 'autoplay') {
        if (autoplayOn == true) {
            autoplayOn = false;
            textDisplay['autoplayOn'].setText('autoplay: off');
            return;
        }
        else if (autoplayOn == false)
            autoplayOn = true;
        if (execButton['play'] == undefined) // 'play' if it's not already playing
            execButtonPressed('play');
        textDisplay['autoplayOn'].setText('autoplay: on');
    }
    
    if (type == 'next') {
        if (repertoireInfo['pos'] < Object.keys(repertoire[repertoireInfo['type']]).length-1)
            repertoireInfo['pos']++; // go get next one unless this is the last one
        else if (autoplayOn == true) {
            execButtonPressed('pause');
            return;
        }
        
        textInput = repertoire[ repertoireInfo['type'] ][ Object.keys(repertoire[repertoireInfo['type']])[repertoireInfo['pos']] ];
        
        textDisplay['part'].setText("part "+(repertoireInfo['pos']+1));
        
        if (execButton['play'] != undefined)
            execButton['play'].kill();
        execButton['pause'].reset(280,550);
    }
    else if (type == 'prev') {
        if (0 < repertoireInfo['pos']) // go get previous one unless it's already the first one
            repertoireInfo['pos']--;
        
        textInput = repertoire[ repertoireInfo['type'] ][ Object.keys(repertoire[repertoireInfo['type']])[repertoireInfo['pos']] ];
        
        textDisplay['part'].setText("part "+(repertoireInfo['pos']+1));
        
        if (execButton['play'] != undefined)
            execButton['play'].kill();
        execButton['pause'].reset(280,550);
    }
    else if (type == 'pause') {
        autoplayOn = false;
        textDisplay['autoplayOn'].setText('autoplay: off');
        
        pauseText = textInput;
        textInput = "";
        
        execButton['pause'].kill();
        execButton['play'].reset(280,550);
    }
    else if (type == 'play') {
        if (repertoireInfo['pos'] == -1)
            repertoireInfo['pos'] = 0;
        
        textInput = pauseText;
        pauseText = "";
        
        // TEMP TEMP TEMP TEMP TEMP
        if (textInput == "")
            textInput = repertoire[ repertoireInfo['type'] ][ Object.keys(repertoire[repertoireInfo['type']])[repertoireInfo['pos']] ];
        
        execButton['play'].kill();
        execButton['pause'].reset(280,550);
    }
    else if (type == 'rewindPart') {
        textInput = repertoire[ repertoireInfo['type'] ][ Object.keys(repertoire[repertoireInfo['type']])[repertoireInfo['pos']] ];
        
        if (execButton['play'] != undefined)
            execButton['play'].kill();
        execButton['pause'].reset(280,550);
    }
}

function speedChange() {
    
    speed = ((selection['button'].x-selection['bar'].x) / selection['bar'].width) * 200;
    speed = speed.toFixed(2);
    textDisplay['speed'].setText("speed "+speed+"%");
}
