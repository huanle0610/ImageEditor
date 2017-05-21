Ext.define('ImageEditorApp.view.image.IntersectionsComponent', {
    extend: 'Ext.draw.Component',
    xtype: 'intersections-component',
    engine: 'Ext.draw.engine.Svg',

    // Loading PathUtil is required to be able to hit test
    // and test for path intersections in sprites.
    requires: [
        'Ext.draw.PathUtil',
        'Ext.util.Color'
    ],

    controller: 'sprite-events',

    isDragging: false,
    startX: 0,
    startY: 0,
    translationX: 0,
    translationY: 0,
    target: null,

    plugins: ['spriteevents'],

    listeners: {
        mousedown: {
            element: 'el',
            fn: 'onRawMouseDown'
        },
        mouseup: {
            element: 'el',
            fn: 'onRawMouseUp'
        },
        mousemove: {
            element: 'el',
            fn: 'onRawMouseMove'
        },
        spriteclick: 'onSpriteClick',
        spritemousedown: 'onMouseDown',
        spritemousemove: 'onMouseMove',
        spritemouseup: 'onMouseUp',
        spritemouseout: 'onMouseOut'
    },


    initComponent: function () {
        var me = this,
            surface = me.getSurface();
        me.callParent(arguments);
        me.dots = Ext.create('Ext.draw.sprite.Instancing', {
            template: {
                type: 'circle',
                radius: 5,
                fillStyle: 'black'
            }
        });
        surface.add(me.dots);
    }

});