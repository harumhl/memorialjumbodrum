/* Selection options */
var languageButton = [];
var styleButton = [];
var speedButton = [];
var lookButton = [];
var buttons = {'language':languageButton, 'style':styleButton, 'speed':speedButton, 'look':lookButton};   
               // This is an array/dictionary of all arrays above

var Hclicked = {'side':'right', 'x_pos':370, 'radius':100};
var Gclicked = {'side':'left',  'x_pos':170, 'radius':100};
var Jclicked = {'side':'right', 'x_pos':370, 'radius':200};
var Fclicked = {'side':'left',  'x_pos':170, 'radius':200};
var keys = {'H':Hclicked, 'G':Gclicked, 'J':Jclicked, 'F':Fclicked};

var keyHitSides = ['right', 'left'];
var keyHit = {'right':undefined, 'left':undefined, 'rightOn':false, 'leftOn':false, 
              'rightRadius':0, 'leftRadius':0, 'rightDelay':0, 'leftDelay':0, 'rightX':0, 'leftX':0};

var textInput = "";
var timeStamp;

/* main part of the animation */
var jumbodrumState = 
{
	preload: function() {
		game.load.spritesheet('ButtonStyleSahmChaeKoreanSPRITE','buttons/ButtonStyleSahmChaeKoreanSPRITE.png',200,100);
        game.load.image('jumbodrum', 'https://raw.githubusercontent.com/harumhl/memorialjumbodrum/master/jumbodrum.png',2448,2448);
    },
    
    create: function()
	{
		game.stage.backgroundColor = "#e5e1db"; // gray background color
               
        /* Adding all buttons */
        //styleButton['SahmChae'] = game.add.button(300, 400, 'ButtonStyleSahmChaeKoreanSPRITE', function(){buttonSelected('style','ShamChae');}, this, 0, 1, 2);
        
        /* Adding all images */
        /* var jumbodrumImage = game.add.image(2448,2448,'jumbodrum');
        jumbodrumImage.crossOrigin = '';
        jumbodrumImage.scale.setTo(0.2,0.2); */
        var image = new Image(); 
        image.crossOrigin = 'Anonymous'; 
        image.src = 'https://raw.githubusercontent.com/harumhl/memorialjumbodrum/master/jumbodrum.png';

        /* Keyboard inputs */
        // 약weak
        game.input.keyboard.addKey(Phaser.Keyboard.H).onDown.add(function(){keyClicked('H');}, this);
        game.input.keyboard.addKey(Phaser.Keyboard.G).onDown.add(function(){keyClicked('G');}, this);
        // 강strong
        game.input.keyboard.addKey(Phaser.Keyboard.J).onDown.add(function(){keyClicked('J');}, this);
        game.input.keyboard.addKey(Phaser.Keyboard.F).onDown.add(function(){keyClicked('F');}, this);
        
        textInput = "j-g-h-f-h-g-";
        timeStamp = game.time.now;
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
                    keyHit[ keyHitSides[i] ].drawCircle(keyHit[ keyHitSides[i]+'X' ], 200, 
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
    
    if (key == '-') return;
    
    // If there is already a 'hit', then clear it out
    if (keyHit[ keys[key]['side'] ] != undefined) 
        keyHit[ keys[key]['side'] ].clear();
    
    keyHit[ keys[key]['side'] ] = game.add.graphics(100,100);
    keyHit[ keys[key]['side'] ].lineStyle(0);
    keyHit[ keys[key]['side'] ].beginFill(0x00FF00, 0.5);
    keyHit[ keys[key]['side'] ].drawCircle(keys[key]['x_pos'], 200, keys[key]['radius']);
    keyHit[ keys[key]['side'] ].endFill();
    
    keyHit[ keys[key]['side']+'X' ] = keys[key]['x_pos'];
    keyHit[ keys[key]['side']+'Radius' ] = keys[key]['radius'];
    keyHit[ keys[key]['side']+'On'] = true;
    keyHit[ keys[key]['side']+'Delay'] = 0;

    window.graphics = keyHit[ keys[key]['side'] ];
}
