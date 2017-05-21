/**
 * This example shows how to detect path sprite intersections.
 * Click and drag a path or shape and move it over another path
 * or shape to see the points where paths intersect.
 */
Ext.define('ImageEditorApp.view.image.Intersections', {
    extend: 'Ext.panel.Panel',
    xtype: 'intersections',

    requires: [
        'Ext.draw.Component',
        'Ext.draw.plugin.SpriteEvents',
        'ImageEditorApp.view.image.IntersectionsComponent',
        'ImageEditorApp.view.image.MarkText',
        'ImageEditorApp.view.image.ArrowLine',
        'ImageEditorApp.view.image.MarkLine'
    ],

    layout: 'fit',
    width: 650,
    style: {
        borderWidth: '4px',
        borderColor: '#ccc',
        borderStyle: 'dashed'
    },

    items: [
        {
            xtype: 'intersections-component',
            width: '100%',
            height: 500,

            sprites: [
                // {
                //     type: 'image',
                //     surface: 'iamge',
                //     x: 100,
                //     y: 100,
                //     translationX: 92,
                //     translationY: 112,
                //     width: 300,
                //     height: 250,
                //     src: '/ImageEditor/resources/image/bird.png',
                //     fillStyle: 'yellow'
                // },
                // {
                //     type: 'image',
                //     surface: 'iamge',
                //     x: 250,
                //     y: 10,
                //     width: 140,
                //     height: 104,
                //     src: 'http://www2.gol.com/users/kcleary/oz_gifs/toto.gif',
                //     fillStyle: 'yellow'
                // },
                // {
                //     type: 'circle',
                //     cx: 300,
                //     cy: 300,
                //     r: 50,
                //     fillStyle: '#1F6D91'
                // },
                // {
                //     type: 'rect',
                //     x: 50,
                //     y: 50,
                //     width: 100,
                //     height: 100,
                //     lineWidth: 4,
                //     strokeStyle: 'green',
                //     fillStyle: 'rgba(255,0,0,0.2)'
                // },
                // {
                //     type: 'circle',
                //     cx: 100,
                //     cy: 100,
                //     r: 50,
                //     fillStyle: '#1F6D91'
                // },
                // {
                //     type: 'text',
                //     x: 50,
                //     y: 50,
                //     text: 'Scarecrow',
                //     fontSize: 30,
                //     fillStyle: '#1F6D91'
                // },
                // {
                //     type: 'line',
                //     fromX: 50,
                //     fromY: 50,
                //     toX: 200,
                //     toY: 200,
                //     fontSize: 30,
                //     lineWidth: 9,
                //     fillStyle: '#1F6D91'
                // },
                // {
                //     type: 'arrow',
                //     translationX: 100,
                //     translationY: 100,
                //     size: 40,
                //     fillStyle: '#30BDA7'
                // }
                // {
                //     type: 'circle',
                //     cx: 100,
                //     cy: 100,
                //     r: 50,
                //     fillStyle: 'purple'
                // },
                // {
                //     type: 'rect',
                //     x: 400,
                //     y: 20,
                //     width: 200,
                //     height: 200,
                //     fillStyle: 'rgba(255,0,0,0.2)',
                //     strokeStyle: 'black',
                //     lineWidth: 2
                // },
                // {
                //     type: 'marktext',
                //     x: 20,
                //     y: 200,
                //     width: 180,
                //     height: 180
                // },
              /*  {
                    type: 'arrowline',
                    fromX: 20,
                    fromY: 20,
                    toX: 120,
                    toY: 120,
                    strokeStyle: '#1F6D91',
                    lineWidth: 3
                },
                {
                    type: 'arrow',
                    translationX: 100,
                    translationY: 100,
                    size: 40,
                    fillStyle: '#30BDA7'
                }*/
            ]
        }
    ]

});