var game = new Phaser.Game(1000, 1000+129, Phaser.AUTO, 'MemorialJumboDrum'/*, { preload: preload, create: create, update: update }*/);

game.state.add('selection', selectionState);
game.state.add('jumbodrum', jumbodrumState);
