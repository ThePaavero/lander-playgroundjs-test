var app = new PLAYGROUND.Application({

    smoothing: false,

    create: function () {
        this.loadImage('ship');
        this.loadImage('particle');
    },

    ready: function () {
        this.setState(ENGINE.Game);
    },

    container: document.querySelector('.game')

});
