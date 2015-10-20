ENGINE.Game = {

    create: function () {

        this.states = {
            groundY: 600,
            uppingThrusters: {
                'up': false,
                'left': false,
                'right': false
            },
            thrusters: {
                'up': {
                    'currentPower': 0,
                    'maxPower': 65
                }
            },
            ship: {
                x: 0,
                y: 0,
                gravity: 0.01
            }
        };
    },

    step: function (dt) {
        if (this.states.uppingThrusters.up) {
            if (this.states.thrusters.up.currentPower < this.states.thrusters.up.maxPower) {
                this.states.thrusters.up.currentPower += 1 + (this.states.thrusters.up.currentPower / 10);
            }
        } else {
            if (this.states.thrusters.up.currentPower > 0) {
                this.states.thrusters.up.currentPower -= 1;
            }
        }

        this.states.ship.y -= this.states.thrusters.up.currentPower;

        if (this.states.ship.gravity < 60) {
            this.states.ship.gravity += 0.05 + (this.states.ship.gravity / 15);
        }

        this.states.ship.y += this.states.ship.gravity;

        // Hit the ground?
        if (this.states.ship.y >= this.states.groundY) {
            this.states.ship.y = this.states.groundY;
        }
    },

    upThruster: function (engine) {
        this.states.uppingThrusters[engine] = true;
        console.log('UP!');
    },

    zeroThruster: function (engine) {
        this.states.uppingThrusters[engine] = false;
    },

    keydown: function (event) {
        this.upThruster(event.key);
    },

    keyup: function (event) {
        this.zeroThruster(event.key);
    },

    render: function () {
        var app = this.app;
        var layer = this.app.layer;

        layer.clear('#222');
        layer.save();
        layer.translate(app.center.x, app.center.y);
        layer.align(0.5, 0.5);
        //layer.scale(3, 3);
        layer.drawImage(app.images.ship, this.states.ship.x, this.states.ship.y);
        layer.restore();
    }

};
