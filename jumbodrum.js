/* Selection options */
var languageButton = [];
var styleButton = [];
var speedButton = [];
var lookButton = [];
var buttons = {'language':languageButton, 'style':styleButton, 'speed':speedButton, 'look':lookButton};      
               // This is an array/dictionary of all arrays above

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

    },
	
	update: function()
	{
	
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