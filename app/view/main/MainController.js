/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('ImageEditorApp.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    init: function () {
        var me = this;
        this.preventCanvasContextMenu();
    },

    preventCanvasContextMenu: function () {
        var me = this;
        Ext.getBody().on("contextmenu", function(e){
            if(me.isContextMenuOnMenu(e)) {
                e.stopEvent();
            }

            if(e.target.tagName == 'CANVAS') {
                e.stopEvent();
            }
        });
    },

    isContextMenuOnMenu: function (e) {
        if(e.target.id) {
            Ext.getCmp(e.target.id);
            var cmp = Ext.getCmp(e.target.id);
            if(cmp && cmp.xtype == 'menu') {
                return true;
            }
        }

        return false;
    },

    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    }
});
