var app = new PLAYGROUND.Application({

    width: 960,
    height: 560,
    scale: 1,
    smoothing: false,

    create: function () {
        this.loadImage('ship');
        this.loadImage('particle');
    },

    ready: function () {
        this.setState(new ENGINE.Round());
    },

    container: document.querySelector('.game')

});
