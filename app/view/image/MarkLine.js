Ext.define('ImageEditorApp.view.image.MarkLine', {
    extend: 'Ext.draw.sprite.Line',
    alias: 'sprite.markline',

    inheritableStatics: {
        def: {
            processors: {
                fromX: 'number',
                fromY: 'number',
                toX: 'number',
                toY: 'number'
            },

            defaults: {
                fromX: 0,
                fromY: 0,
                toX: 1,
                toY: 1,
                strokeStyle: 'black'
            },

            aliases: {
                x1: 'fromX',
                y1: 'fromY',
                x2: 'toX',
                y2: 'toY'
            },
            triggers: {
                fromX: 'bbox',
                fromY: 'bbox',
                toX: 'bbox',
                toY: 'bbox'
            }
        }
    }
});