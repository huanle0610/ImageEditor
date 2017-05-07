Ext.define('ImageEditorApp.view.image.ImageEditorController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.image-editor',

    onColorPick: function (picker, color) {
        var btn = picker.up('button');
        btn.btnIconEl.setStyle({color: '#' + color});
        btn.color = '#' + color;
        picker.up("menu").hide();
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