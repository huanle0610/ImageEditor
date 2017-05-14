Ext.define('ImageEditorApp.ux.mixin.Mediator', {
    extend: 'Ext.Mixin',
    requires: ['ImageEditorApp.ux.Mediator'],
    mixins: ['Ext.mixin.Observable'],
    mixinConfig: {
        id: 'mediator',
        before: {
            init: 'doInit'
        }
    },
    /*
     * Something to remember here is that the scope for each of these
     * functions will be the component we've been mixed in to, and not
     * some "Mediator" object.
     */
    doInit: function () {
        /* So here, `this` is the component, not the mediator */
        var me = this;
        console.log('Initial Config', me.subscribe, me);
        if (Ext.isObject(me.subscribe)) {
            Ext.Object.each(me.subscribe, me.addSubscription, me);
        }
    },
    publish: function () {
        // return ImageEditorApp.ux.Mediator.fireEvent.apply(ImageEditorApp.ux.mixin.Mediator, arguments);
        return ImageEditorApp.ux.Mediator.fireEvent.apply(ImageEditorApp.ux.Mediator, arguments);
    },
    addSubscription: function (name, fn) {
        var me = this;
        if (Ext.isString(fn)) {
            if (Ext.isFunction(me[fn])) {
                fn = me[fn]
            } else {
                //<debug>
                console.warn('Creating Unknown Subscription', fn);
                //</debug>
                fn = me.warnFn;
            }
        }
        if (!Ext.isString(name)) {
            name = name.toString();
        }
        me.addManagedListener(ImageEditorApp.ux.Mediator, name, fn, me);
    },
    warnFn: function () {
        //<debug>
        console.warn('Unknown Subscription', arguments, this);
        //</debug>
    }
});
