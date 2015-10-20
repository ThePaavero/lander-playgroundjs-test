ENGINE.Game = {

    create: function () {

        this.debugConsoleElement = document.querySelector('.debug-console');

        this.states = {
            groundY: 560,
            uppingThrusters: {
                'up': false,
                'left': false,
                'right': false
            },
            thrusters: {
                'up': {
                    'currentPower': 0,
                    'maxPower': 16
                },
                'left': {
                    'currentPower': 0,
                    'maxPower': 5
                },
                'right': {
                    'currentPower': 0,
                    'maxPower': 5
                }
            },
            ship: {
                x: 0,
                y: - 800,
                gravity: 13
            }
        };
    },

    step: function (dt) {
        if (this.states.uppingThrusters.up) {
            if (this.states.thrusters.up.currentPower < this.states.thrusters.up.maxPower) {
                this.states.thrusters.up.currentPower += 0.1 + (this.states.thrusters.up.currentPower / 60);
            }
        } else {
            if (this.states.thrusters.up.currentPower > 0) {
                this.states.thrusters.up.currentPower -= 0.3;
            }
        }

        this.states.ship.y -= this.states.thrusters.up.currentPower;

        if (this.states.uppingThrusters.left) {
            if (this.states.thrusters.left.currentPower < this.states.thrusters.left.maxPower) {
                this.states.thrusters.left.currentPower += 0.1 + (this.states.thrusters.left.currentPower / 60);
            }
        } else {
            if (this.states.thrusters.left.currentPower > 0) {
                this.states.thrusters.left.currentPower -= 0.3;
            } else {
                this.states.thrusters.left.currentPower = 0;
            }
        }

        if (this.states.uppingThrusters.right) {
            if (this.states.thrusters.right.currentPower < this.states.thrusters.right.maxPower) {
                this.states.thrusters.right.currentPower += 0.1 + (this.states.thrusters.right.currentPower / 60);
            }
        } else {
            if (this.states.thrusters.right.currentPower > 0) {
                this.states.thrusters.right.currentPower -= 0.3;
            } else {
                this.states.thrusters.right.currentPower = 0;
            }
        }

        this.states.ship.x += this.states.thrusters.right.currentPower;
        this.states.ship.x -= this.states.thrusters.left.currentPower;
        this.states.ship.y += this.states.ship.gravity;

        // Hit the ground?
        if (this.states.ship.y >= this.states.groundY) {
            this.states.ship.y = this.states.groundY;
        }

        this.logToDebug();
    },

    upThruster: function (engine) {
        this.states.uppingThrusters[engine] = true;
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
    },

    logToDebug: function () {
        var markup = '<p>Ship gravity: ' + this.states.ship.gravity + '</p>' +
            '<p>this.states.thrusters.up.currentPower: ' + this.states.thrusters.up.currentPower + '</p>' +
            '<p>this.states.thrusters.right.currentPower: ' + this.states.thrusters.right.currentPower + '</p>' +
            '<p>this.states.thrusters.left.currentPower: ' + this.states.thrusters.left.currentPower + '</p>';
        this.debugConsoleElement.innerHTML = markup;
    }

};
