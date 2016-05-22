var game = new Phaser.Game(1000, 1000, Phaser.AUTO, 'MemorialJumboDrum'/*, { preload: preload, create: create, update: update }*/);

game.state.add('selection', selectionState);
game.state.add('jumbodrum', jumbodrumState);

game.state.start('jumbodrum'); // SHOULD BE 'SELECTION'

/*
window.onload = function() {
  var host = location.origin.replace(/^http/, 'ws')
  var ws = new WebSocket(host, 'echo-protocol');
  ws.onmessage = function (event) {
    var li = document.createElement('li');
    li.innerHTML = JSON.parse(event.data);
    document.querySelector('#pings').appendChild(li);
};
}
*/