var app = new PLAYGROUND.Application({

    width: 960,
    height: 560,
    scale: 1,
    smoothing: false,

    planets: [
        {
            name: 'moon',
            gravity: 10
        },
        {
            name: 'venus',
            gravity: 3
        }
    ],

    create: function () {
        this.loadImage('ship');
        this.loadImage('particle');
    },

    ready: function () {
        this.setState(new ENGINE.Round(this.planets[0]));
    },

    nextPlanet: function () {
        this.setState(new ENGINE.Round(this.planets[1])); // lol todo
    },

    container: document.querySelector('.game')

});
