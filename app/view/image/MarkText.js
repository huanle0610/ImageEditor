Ext.define('ImageEditorApp.view.image.MarkText', {
    // Typically, you'd want to extend the Composite sprite instead of using it directly.
    extend: 'Ext.draw.sprite.Composite',
    alias: 'sprite.marktext',

    inheritableStatics: {
        def: {
            // And define your own attributes on the composite that abstract away
            // the actual implementation.
            processors: {
                // The first four attributes (start and end point coordinates)
                // is all we really need for this sprite to work.
                x: 'number',
                y: 'number',
                width: 'number',
                height: 'number',
                fontSize: 'number',
                text: 'string',
                rectColor: 'string',
                textColor: 'string'
            },
            // Changes to composite attributes will then trigger the recalculation of
            // attributes of composite's children sprites.
            // Here we define which composite's attributes should trigger such recalculation.
            // In this case we use a single updater function called 'recalculate', but it's
            // possible to specify and use different updaters for different attributes.
            triggers: {
                x: 'recalculate',
                y: 'recalculate',
                width: 'recalculate',
                height: 'recalculate',
                fontSize: 'recalculate',
                text: 'recalculate',
                rectColor: 'changeRectColor',
                textColor: 'changeTextColor'
            },
            // Default values of composite's attributes.
            defaults: {
                x: 0,
                y: 0,
                width: 100,
                height: 100,
                fontSize: 30,
                text: '请输入文字',
                textColor: '#1F6D91',
                rectColor: 'rgba(255,0,0,0.2)'
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

                    var 
                        x = attr.x,
                        y = attr.y,
                        width = attr.width,
                        height = attr.height,
                        text = attr.text;

                    me.createSprites();

                    me.rect.setAttributes({
                        x: x,
                        y: y,
                        fillStyle: attr.rectColor,
                        width: width,
                        height: height
                    });

                    me.labText.setAttributes({
                        x: x,
                        y: -99999,
                        fontSize: attr.fontSize,
                        fillStyle: 'red',
                        text: attr.text
                    });
                    console.log(Ext.String.format('{0}px', attr.fontSize), 'fontsize');

                    var textSize = me.getTextSize();
                    me.alignText(attr, textSize);
                },
                changeTextColor: function (attr) {
                    var me = this;

                    me.text.setAttributes({
                        fillStyle: attr.textColor
                    });

                    if(me.getSurface()) {
                        me.getSurface().renderFrame();
                        console.log('renderFrame');
                    }
                },
                changeRectColor: function (attr) {
                    var me = this;

                    me.rect.setAttributes({
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

    alignText: function (attr, textSize) {
        var me = this;
        var textX = attr.x + (attr.width - textSize.width)/2;
        var textY = attr.y + (attr.height - textSize.height)/2 + textSize.height/2;

        console.log(attr.width, attr.height, textSize.width, textSize.height, attr.x, attr.y, textX, textY, Ext.String.format('{0}px', attr.fontSize));
        me.text.setAttributes({
            x: textX,
            y: textY,
            fontSize: attr.fontSize,
            fillStyle: attr.textColor,
            text: attr.text
        });
        if(me.getSurface()) {
            me.getSurface().renderFrame();
            console.log('renderFrame', Ext.String.format('{0}px', attr.fontSize));
        } else {
            console.log('no surface');
        }
    },

    getTextSize: function () {
        var me = this;
        var textSize = me.labText.getBBox();

        return {width: textSize.width, height: textSize.height};
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
        if (!me.rect) {
            me.rect = me.add({
                type: 'rect',
                strokeStyle: 'black',
                lineWidth: 2
            });
            me.labText = me.add({
                type: 'text',
                textBaseline: 'middle'
            });
            me.text = me.add({
                type: 'text',
                textBaseline: 'middle'
            });
        }
    }

});