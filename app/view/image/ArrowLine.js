Ext.define('ImageEditorApp.view.image.ArrowLine', {
    // Typically, you'd want to extend the Composite sprite instead of using it directly.
    extend: 'Ext.draw.sprite.Composite',
    alias: 'sprite.arrowline',

    inheritableStatics: {
        def: {
            // And define your own attributes on the composite that abstract away
            // the actual implementation.
            processors: {
                fromX: 'number',
                fromY: 'number',
                toX: 'number',
                toY: 'number',
                arrowLength: 'number',
                arrowAngle: 'number'
            },
            // Changes to composite attributes will then trigger the recalculation of
            // attributes of composite's children sprites.
            // Here we define which composite's attributes should trigger such recalculation.
            // In this case we use a single updater function called 'recalculate', but it's
            // possible to specify and use different updaters for different attributes.
            triggers: {
                fromX: 'recalculate',
                fromY: 'recalculate',
                toX: 'recalculate',
                toY: 'recalculate'
            },
            // Default values of composite's attributes.
            defaults: {
                fromX: 0,
                fromY: 0,
                toX: 1,
                toY: 1,
                lineWidth: 1,
                strokeStyle: 'black',
                arrowLength: 20,
                arrowAngle: Math.PI / 8
            },
            updaters: {
                // This updater function is called every time the attributes
                // of the composite change, including animations.
                // Inside this updater we calculate and set the values of the attributes
                // of the children of the composite based on the values of the composite's
                // attributes.
                recalculate: function (attr) {
                    // Please see this ticket https://sencha.jira.com/browse/EXTJS-15521
                    // for a graphical representation of what's going on in this function.
                    var me = this;

                    var fromX = attr.fromX,
                        fromY = attr.fromY,
                        toX = attr.toX,
                        toY = attr.toY,
                        dx = toX - fromX,
                        dy = toY - fromY,
                        PI = Math.PI;

                    if (dx === 0 || dy === 0) {
                        return;
                    }

                    var alpha = Math.atan2(dy, dx),
                        sin = Math.sin,
                        cos = Math.cos,
                        beta = PI - attr.arrowAngle,
                        x = attr.arrowLength * cos(beta),
                        y = attr.arrowLength * sin(beta),
                        mat = Ext.draw.Matrix.fly([cos(alpha), sin(alpha), -sin(alpha), cos(alpha), toX, toY]);

                    me.createSprites();


                    me.line.setAttributes({
                        fromX: fromX,
                        fromY: fromY,
                        lineWidth: attr.lineWidth,
                        strokeStyle: attr.strokeStyle,
                        toX: toX,
                        toY: toY
                    });

                    me.arrowLeft.setAttributes({
                        fromX: toX,
                        fromY: toY,
                        lineWidth: attr.lineWidth,
                        strokeStyle: attr.strokeStyle,
                        toX: mat.x(x, y),
                        toY: mat.y(x, y)
                    });

                    me.arrowRight.setAttributes({
                        fromX: toX,
                        fromY: toY,
                        lineWidth: attr.lineWidth,
                        strokeStyle: attr.strokeStyle,
                        toX: mat.x(x, -y),
                        toY: mat.y(x, -y)
                    });

                    me.bboxUpdater(attr);
                },
                changeRectColor: function (attr) {
                    var me = this;

                    me.line.setAttributes({
                        fillStyle: attr.rectColor
                    });

                    if(me.getSurface()) {
                        me.getSurface().renderFrame();
                        console.log('renderFrame');
                    }
                }
            }
        }
    },

    // Additional configuration options that are meant to be used once during setup time.
    // These need not be attributes, because we don't need them to animate
    // or trigger changes in other attributes.
    config: {
        radiusSize: 3
    },

    // The 'recalculate' updater will be called at construction time.
    // But the children sprites have not been created and added to the composite yet.
    // We can't add children to the composite before the parent constructor call,
    // because the composite hasn't been initialized yet.
    // And adding them after construction is too late, because the 'recalculate'
    // updater needs them.
    // So we define the 'createSprites' function that is called inside the 'recalculate'
    // updater before the sprites are used.
    createSprites: function () {
        var me = this;

        // Only create sprites if they haven't been created yet.
        if (!me.line) {
            me.line = me.add({
                type: 'markline'
            });
            me.arrowLeft = me.add({
                type: 'markline'
            });
            me.arrowRight = me.add({
                type: 'markline'
            });
        }
    },

   /* hitTest: function (point, options) {
        var me = this;
        // Meant to be overridden in subclasses for more precise hit testing.
        // This version doesn't take any options and simply hit tests sprite's
        // bounding box, if the sprite is visible.
        if (this.isVisible()) {
            var isBBoxHit;

            Ext.each([me.line, me.arrowLeft, me.arrowRight], function (sprite) {
                console.log(160, point, sprite, sprite.hitTest(point, options));
                if(sprite.hitTest(point, options)) {
                    isBBoxHit = true;
                    return false;
                }
            });

            console.log('hitTest arrowLine');
            if (isBBoxHit) {
                return {
                    sprite: this
                };
            }
        }
        return null;
    }*/

});