var game = new Phaser.Game(1000, 1000, Phaser.AUTO, 'MemorialJumboDrum'/*, { preload: preload, create: create, update: update }*/);

game.state.add('selection', selectionState);
game.state.add('jumbodrum', jumbodrumState);

game.state.start('jumbodrum'); // SHOULD BE 'SELECTION'

