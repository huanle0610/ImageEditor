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
        }, null, false, 'http://wx3.sinaimg.cn/large/62dabf66gy1ffl3niz3kdj20hk0b8dub.jpg');
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