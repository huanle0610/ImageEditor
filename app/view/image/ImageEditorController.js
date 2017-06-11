Ext.define('ImageEditorApp.view.image.ImageEditorController', {
    extend: 'ImageEditorApp.controller.AbstractViewController',
    alias: 'controller.image-editor',

    onLoadImgClick: function () {
        var me = this;
        Ext.Msg.prompt('请输入图片网址', '', function(res, val){
            if(res == 'ok' && val.length) {
                console.log(val);
                me.publish('userupdate', val);
            }
        }, null, false, '/ImageEditor/resources/image/bird.png');
    },

    onPreviewClick: function (btn) {
        var me = this;
        var cmp = me.getView().down('intersections-component');
        window.open(cmp.getImage().data)
    },


    onPreviewCodeClick: function (btn) {
        var me = this;
        var cmp = me.getView().down('intersections-component');
        var config;
        cmp.getItems().each(function (o, k) {
            console.log(o, k, 2323);
            config = me.getSurfaceItems(o);
        });

        me.showPreviewWindow(config);
    },

    getSurfaceItems: function (surface) {
        console.log('surface', surface);
        var config = [];
        surface.getItems().forEach(function (sprite, k) {
            console.log(sprite.type);
            var type = sprite.type;
            if('instancing' == type) {
                return;
            }

            if('text' == type) {
                config.push({
                    type: type,
                    text: sprite.attr.text,
                    x: sprite.attr.x,
                    y: sprite.attr.y,
                    width: sprite.attr.width,
                    height: sprite.attr.height,
                    fontSize: sprite.attr.fontSize,
                    fillStyle: sprite.attr.fillStyle,
                    translationX: sprite.attr.translationX,
                    translationY: sprite.attr.translationY
                });
            }


            if('arrowline' == type || 'markline' == type) {
                var spriteConfig = sprite.getInitialConfig();
                spriteConfig = Ext.apply(spriteConfig, {
                    fromX: sprite.attr.fromX,
                    fromY: sprite.attr.fromY,
                    toX: sprite.attr.toX,
                    toY: sprite.attr.toY,
                    translationX: sprite.attr.translationX,
                    translationY: sprite.attr.translationY,
                    strokeStyle : sprite.attr.strokeStyle,
                    lineWidth: sprite.attr.lineWidth
                });
                config.push(spriteConfig);
            }

            if('image' == type) {
                config.push({
                    type: type,
                    src: sprite.src,
                    x: sprite.attr.x,
                    y: sprite.attr.y,
                    width: sprite.attr.width,
                    height: sprite.attr.height,
                    translationX: sprite.attr.translationX,
                    translationY: sprite.attr.translationY
                });
            }

            if('rect' == type) {
                config.push({
                    type: type,
                    x: sprite.attr.x,
                    y: sprite.attr.y,
                    width: sprite.attr.width,
                    height: sprite.attr.height,
                    translationX: sprite.attr.translationX,
                    translationY: sprite.attr.translationY,
                    fillStyle: sprite.attr.fillStyle,
                    strokeStyle : sprite.attr.strokeStyle,
                    lineWidth: sprite.attr.lineWidth
                });
            }

            if('circle' == type) {
                config.push({
                    type: type,
                    cx: sprite.attr.cx,
                    cy: sprite.attr.cy,
                    r: sprite.attr.r,
                    translationX: sprite.attr.translationX,
                    translationY: sprite.attr.translationY,
                    strokeStyle : sprite.attr.strokeStyle,
                    lineWidth: sprite.attr.lineWidth
                });
            }

            if('ellipse' == type) {
                config.push({
                    type: type,
                    cx: sprite.attr.cx,
                    cy: sprite.attr.cy,
                    rx: sprite.attr.rx,
                    ry: sprite.attr.ry,
                    translationX: sprite.attr.translationX,
                    translationY: sprite.attr.translationY,
                    strokeStyle : sprite.attr.strokeStyle,
                    lineWidth: sprite.attr.lineWidth
                });
            }
        });

        console.log(config, Ext.encode(config));
        // Ext.Msg.prompt('Code', '', null, null, true, 'sprites: ' + Ext.encode(config));
        return config;
    },

    showPreviewWindow: function(spriteConfig) {
        var widget = {
            xtype: 'intersections-component',
            controller: null,
            viewModel: null,
            width : '100%',
            height: 500,
            sprites: spriteConfig
        };
        Ext.create('Ext.window.Window', {
            title: 'Hello',
            height: 520,
            width: 650,
            layout: 'fit',
            items: widget
        }).show();
    },

    onColorBtnRender: function (btn) {
        var me = this;
        btn.btnIconEl.setStyle({color: btn.color});
        me.setColor(btn.color);
    },

    onColorPick: function (picker, color) {
        var me = this;
        var btn = picker.up('button');
        btn.btnIconEl.setStyle({color: '#' + color});
        btn.color = '#' + color;
        picker.up("menu").hide();
        me.setColor(btn.color);
    },

    setColor: function (color) {
        var me = this;
        me.getViewModel().set('color', color);
    },

    onShapeChange: function(container, button, pressed) {
        var me = this;
        console.log("User toggled the '" + button.type + "' button: " + (pressed ? 'on' : 'off'));
        var type = button.type;
        if(pressed) {

            if(type == 'drag') {
                me.getViewModel().set('currentShape', false);
            } else {
                me.getViewModel().set('currentShape', type);
            }
            console.log('Print', me.getViewModel().get('currentShape'));
        }
    }
});