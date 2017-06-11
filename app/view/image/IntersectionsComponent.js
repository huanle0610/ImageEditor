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


    initComponent: function () {
        var me = this;
        me.callParent(arguments);

        if(me.controller) {
            var controller = me.getController();
            me.on({
                mousedown: {
                    element: 'el',
                    scope: controller,
                    fn: 'onRawMouseDown'
                },
                mouseup: {
                    element: 'el',
                    scope: controller,
                    fn: 'onRawMouseUp'
                },
                mousemove: {
                    element: 'el',
                    scope: controller,
                    fn: 'onRawMouseMove'
                },
                spriteclick: {
                    scope: controller,
                    fn: 'onSpriteClick'
                },
                spritemousedown: {
                    scope: controller,
                    fn: 'onMouseDown'
                },
                spritemousemove: {
                    scope: controller,
                    fn: 'onMouseMove'
                },
                spritemouseup: {
                    scope: controller,
                    fn: 'onMouseUp'
                },
                spritemouseout: {
                    scope: controller,
                    fn: 'onMouseOut'
                }
            });
        }
    }

});