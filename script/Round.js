ENGINE.Round = function() {

    this.create = function() {

        this.debugConsoleElement = document.querySelector('.debug-console');

        this.states = {
            groundY: (560 / 2) - 57,
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
                gravity: 13,
                downVelocity: 0,
                inTheAir: true
            }
        };
    };

    this.step = function(dt) {

        if (this.states.ship.inTheAir === false) {
            console.log('On the ground');
            return;
        }

        if (this.states.uppingThrusters.up) {
            if (this.states.thrusters.up.currentPower < this.states.thrusters.up.maxPower) {
                this.states.thrusters.up.currentPower += 0.1 + (this.states.thrusters.up.currentPower / 35);
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
                this.states.thrusters.left.currentPower -= 0.05;
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
                this.states.thrusters.right.currentPower -= 0.05;
            } else {
                this.states.thrusters.right.currentPower = 0;
            }
        }

        if (this.states.ship.downVelocity < 150) {
            this.states.ship.downVelocity = this.states.ship.gravity - this.states.thrusters.up.currentPower;
        }

        this.states.ship.x += this.states.thrusters.right.currentPower;
        this.states.ship.x -= this.states.thrusters.left.currentPower;
        this.states.ship.y += this.states.ship.downVelocity;

        // Hit the ground?
        if (this.states.ship.y >= this.states.groundY) {

            this.states.ship.inTheAir = false;

            // Did we crash?
            if (this.states.ship.downVelocity > 10) {
                return this.doOnCrash();
            } else {
                return this.doOnSuccessfulLanding();
            }

            this.states.ship.y = this.states.groundY;
        }

        this.logToDebug();
    };

    this.upThruster = function(engine) {
        this.states.uppingThrusters[engine] = true;
    },

    this.zeroThruster = function(engine) {
        this.states.uppingThrusters[engine] = false;
    };

    this.keydown = function(event) {
        this.upThruster(event.key);
    };

    this.keyup = function(event) {
        this.zeroThruster(event.key);
    };

    this.drawThrusters = function(layer) {
        for (var i in this.states.thrusters) {
            var name = i;
            var thruster = this.states.thrusters[i];
            var size = thruster.currentPower * 2;
            var x = 0;
            var y = 0;
            var sizeX = size;
            var sizeY = size;

            if (this.states.uppingThrusters[name] === false) {
                continue;
            }

            switch (name) {
                case 'up':
                    sizeX = size * 2;
                    sizeY = size * 2;
                    x = this.states.ship.x;
                    y = this.states.ship.y + 50;
                    sizeX = size / 2.4;
                    break;
                case 'left':
                    x = this.states.ship.x + 40;
                    y = this.states.ship.y;
                    sizeX = size * 3.4;
                    break;
                case 'right':
                    x = this.states.ship.x - 40;
                    y = this.states.ship.y;
                    sizeX = size * 3.4;
                    break;
            }
            layer.drawImage(this.app.images.particle, 0, 0, 49, 49, x, y, sizeX, sizeY);
        }
    };

    this.render = function() {
        var app = this.app;
        var layer = this.app.layer;

        layer.clear('#222');
        layer.save();
        layer.translate(app.center.x, app.center.y);
        layer.align(0.5, 0.5);
        //layer.scale(3, 3);

        layer.drawImage(app.images.ship, this.states.ship.x, this.states.ship.y);
        this.drawThrusters(layer);

        layer.restore();
    };

    this.logToDebug = function() {
        var markup = '<p>Ship gravity: ' + this.states.ship.gravity + '</p>' +
            '<p>this.states.thrusters.up.currentPower: ' + this.states.thrusters.up.currentPower + '</p>' +
            '<p>this.states.thrusters.right.currentPower: ' + this.states.thrusters.right.currentPower + '</p>' +
            '<p>this.states.thrusters.left.currentPower: ' + this.states.thrusters.left.currentPower + '</p>';
        this.debugConsoleElement.innerHTML = markup;
    };

    this.doOnCrash = function() {
        this.app.setState(ENGINE.GameOver);
    };

    this.doOnSuccessfulLanding = function() {
        // ...
    };

};
