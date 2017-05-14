Ext.define('ImageEditorApp.view.image.SpriteEventsController', {
    extend: 'ImageEditorApp.controller.AbstractViewController',
    alias: 'controller.sprite-events',

    subscribe: {
        'userupdate': 'updateUserAvatar'
    },

    updateUserAvatar: function (src) {
        var me = this,
            surface = me.getView().getSurface();

        console.log(src, 3434);

        surface.add({
            type: 'image',
            src: src,
            x: 100,
            y: 100,
            width: 300,
            height: 250,
            fillStyle: 'yellow'
        });
        surface.renderFrame();
    },

    onSpriteClick: function (item, event) {
        return;

        var sprite = item && item.sprite,
            color = Ext.util.Color.create(
                Math.random() * 255,
                Math.random() * 255,
                Math.random() * 255
            );

        if (sprite) {
            if (sprite.type === 'image') {
                return;
                sprite.setAttributes({
                    rotationRads: sprite.attr.rotationRads + Math.PI / 4
                });
            } else {
                sprite.setAttributes({
                    fillStyle: color,
                    strokeStyle: color
                });
            }
            sprite.getSurface().renderFrame();
        }
    },

    fontSizeCheck: function (checkItem, checked) {
        var me = this;
        if(checked) {
            me.currentSprite.setAttributes({
               fontSize: checkItem.fontSize
            });
        }
    },

    onRawMouseDown: function (e) {
        var me = this,
            surface = me.getView().getSurface();

        var currentShape = me.getViewModel().get('currentShape');
        if(!currentShape) {
            return;
        }

        if(!me.sprite) {
            var position = surface.getEventXY(e);

            var color = me.getViewModel().get('color');

            if(Ext.Array.contains(['marktext'], currentShape)) {
                Ext.Msg.prompt('请输入文字', '', function(res, val){
                    if(res == 'ok' && val.length) {
                        surface.add({
                            type: 'text',
                            text: val,
                           x: position[0],
                            y: position[1],
                            fontSize: 30,
                            fillStyle: color
                        });
                        surface.renderFrame();
                    }
                });
            }

            if(Ext.Array.contains(['ellipse'], currentShape)) {
                me.sprite = surface.add({
                    type: currentShape,
                    cx: position[0],
                    cy: position[1],
                    rx: 10,
                    ry: 15,
                    strokeStyle : color,
                    lineWidth: 3
                });
            }

            if(Ext.Array.contains(['circle'], currentShape)) {
                me.sprite = surface.add({
                    type: currentShape,
                    cx: position[0],
                    cy: position[1],
                    r: 10,
                    strokeStyle : color,
                    lineWidth: 3
                });
            }

            if(Ext.Array.contains(['rect'], currentShape)) {
                me.sprite = surface.add({
                    type: currentShape,
                    x: position[0],
                    y: position[1],
                    width: 10,
                    height: 10,
                    fillStyle: 'rgba(255,0,0, 0)',
                    strokeStyle : color,
                    lineWidth: 3
                });
            }

            if(Ext.Array.contains(['markline', 'arrowline'], currentShape)) {
                me.sprite = surface.add({
                    type: currentShape,
                    fromX: position[0],
                    fromY: position[1],
                    toX: position[0],
                    toY: position[1],
                    strokeStyle : color,
                    lineWidth: 3
                });
            }

            if(me.sprite) {
                surface.renderFrame();
            }
        }
    },

    onRawMouseUp: function (e) {
        var me = this,
            surface = me.getView().getSurface();

        me.onRawMouseMove(e);
        if(me.sprite) {
            me.sprite = null;
        }
    },


    onRawMouseMove: function (e) {
        var me = this,
            surface = me.getView().getSurface();
        if(me.sprite) {
            var currentShape = me.getViewModel().get('currentShape');
            if(!currentShape) {
                return;
            }

            var position = surface.getEventXY(e);


            console.log(currentShape, 'move');
            if(Ext.Array.contains(['ellipse'], currentShape)) {
                var width = position[0] - me.sprite.cx;
                var height = position[1] - me.sprite.cy;
                me.sprite.setAttributes({
                    rx: width,
                    ry: height
                });
            }

            if(Ext.Array.contains(['circle'], currentShape)) {
                var width = position[0] - me.sprite.cx;
                var height = position[1] - me.sprite.cy;
                var r = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
                me.sprite.setAttributes({
                    r: r
                });
            }

            if(Ext.Array.contains(['rect'], currentShape)) {
                var width = position[0] - me.sprite.x;
                var height = position[1] - me.sprite.y;
                me.sprite.setAttributes({
                    width: width,
                    height: height
                });
            }

            if(Ext.Array.contains(['markline', 'arrowline'], currentShape)) {
                me.sprite.setAttributes({
                    toX: position[0],
                    toY: position[1]
                });
            }
            

            surface.renderFrame();
        }
    },

    onMouseDown: function (target, e) {
        e.stopEvent();
        var position = e.getXY();

        //middle click
        if(e.button == 1) {
            return false;
        }

        var me = this,
            surface = target.sprite.getSurface(),
            sprites = surface.getItems(),
            xy = e.getXY(),
            x = xy[0],
            y = xy[1],
            target;

        //right click

        if(e.button == 2) {
            me.currentSprite = target.sprite;
            // me.menu = me.menu || me.getView().add();
            me.menu = me.menu || Ext.create('Ext.menu.Menu', {
                    width: 160,
                    floating: true,
                    itemId: 'spriteMenu',
                    margin: '0 0 10 0',
                    items: [{
                        text: target.sprite.type
                    },{
                        text: 'CHANGE Text',
                        handler: function () {
                            Ext.Msg.prompt('Text', 'Please Input Text', function (ans, v) {
                                if(ans == 'ok') {
                                    if(v.length) {
                                        target.sprite.setAttributes({'text': v});
                                    } else {
                                        console.log('delete ?')
                                    }
                                }
                            }, true, target.sprite.text);
                        }
                    },{
                        text:'Font Size',
                        menu: [
                            {
                                text: '小',
                                fontSize: 14,
                                checked: true,
                                xtype: 'menucheckitem',
                                checkHandler: 'fontSizeCheck',
                                scope: me,
                                group: 'font-size'
                            },
                            {
                                text: '中',
                                fontSize: 16,
                                xtype: 'menucheckitem',
                                checkHandler: 'fontSizeCheck',
                                scope: me,
                                group: 'font-size'
                            },
                            {
                                text: '大',
                                fontSize: 18,
                                xtype: 'menucheckitem',
                                checkHandler: 'fontSizeCheck',
                                scope: me,
                                group: 'font-size'
                            },
                            {
                                text: '特大',
                                fontSize: 30,
                                xtype: 'menucheckitem',
                                checkHandler: 'fontSizeCheck',
                                scope: me,
                                group: 'font-size'
                            }
                        ]
                    }, {
                        text: 'Color',
                        menu: [
                            {
                                xtype: 'colorpicker',
                                handler: function (picker, color) {
                                    target.sprite.setAttributes({'textColor': '#' + color});
                                    picker.up('#spriteMenu').hide();
                                }
                            }
                        ]
                    },{
                        text: 'Background',
                        menu: [
                            {
                                xtype: 'colorpicker',
                                handler: function (picker, color) {
                                    target.sprite.setAttributes({'rectColor': '#' + color});
                                    picker.up('#spriteMenu').hide();
                                }
                            }
                        ]
                    },
                        {
                            text: 'delete',
                            handler: function () {
                                var surface = me.currentSprite.getSurface();
                                me.currentSprite.destroy();
                                surface.renderFrame();
                            }
                    }]
                });
            me.menu.showAt(position);
            return false;
        }

        target = target.sprite;

        if (target) {
            // target.setAttributes({
            //     strokeStyle: 'red'
            // });
            me.isDragging = true;
            me.startX = x;
            me.startY = y;
            me.translationX = target.attr.translationX;
            me.translationY = target.attr.translationY;
            me.target = target;
        }
    },

    onMouseMove: function (target, e) {
        var me = this,
            surface = target.sprite.getSurface(),
            sprites = surface.getItems(),
            xy = e.getXY(),
            intersections = [],
            x = xy[0],
            y = xy[1],
            deltaX, deltaY,
            sprite, target,
            points,
            i, ln;

        var currentShape = me.getViewModel().get('currentShape');
        if(currentShape) {
            return;
        }

        // console.log(me.isDragging, target.sprite, me.target, 1110);

        if (me.isDragging) {
            deltaX = x - me.startX;
            deltaY = y - me.startY;
            // console.log(deltaX, deltaY);

            me.target.setAttributes({
                translationX: me.translationX + deltaX,
                translationY: me.translationY + deltaY
            });
            me.target.getSurface().renderFrame();
        } else {
            target = target.sprite;
            if (target) {
                // target.setAttributes({
                //     strokeStyle: 'red'
                // });
            }
            surface.renderFrame();
        }
    },

    onMouseOut: function (target, e) {
        var me = this,
            surface = target.sprite.getSurface();


        if(me.isDragging) {

        } else {
            target = target.sprite;
            // if (target) {
            //     target.setAttributes({
            //         strokeStyle: 'black'
            //     });
            // surface.renderFrame();
            // }
        }
    },

    onMouseUp: function (target, e) {
        var me = this,
            surface = target.sprite.getSurface();


        me.isDragging = false;
        me.getView().dots.clearAll();
        surface.renderFrame();
    },

    showIntersections: function (intersections) {
        var me = this,
            i, ln, point;
        me.getView().dots.clearAll();
        for (i = 0, ln = intersections.length; i < ln; i++) {
            point = intersections[i];
            me.getView().dots.createInstance({
                cx: point[0],
                cy: point[1]
            });
        }
    }
});