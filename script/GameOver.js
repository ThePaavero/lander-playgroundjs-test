ENGINE.GameOver = {

    create: function () {

        console.log('GAME OVER');
    },

    step: function (dt) {
        // ...
    },

    render: function () {
        var app = this.app;
        var layer = this.app.layer;

        layer.clear('#222');
        layer.save();
        layer.translate(app.center.x, app.center.y);
        layer.align(0.5, 0.5);
        //layer.scale(3, 3);

        layer
            .fillStyle('#fff')
            .textAlign('center')
            .font('italic 40pt Calibri')
            .fillText('You crashed lol', 0, 0);

        layer.restore();
    },

};
