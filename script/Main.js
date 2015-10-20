var app = new PLAYGROUND.Application({

    smoothing: false,

    create: function () {
        this.loadImage('ship');
    },

    ready: function () {
        this.setState(ENGINE.Game);
    }

});
