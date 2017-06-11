
Ext.define('ImageEditorApp.view.image.ImageEditor', {
    extend: 'Ext.panel.Panel',
    xtype: 'imageeditorpanel',

    requires: [
        'ImageEditorApp.view.image.ImageEditorController'
    ],

    controller: 'image-editor',

    cls: 'image-editor',

    tbar: [
        {
            iconCls: 'x-fa fa-file-image-o',
            handler: 'onLoadImgClick',
            text: '加载图片'
        },
        {
            xtype: 'segmentedbutton',
            items: [
                {
                    iconCls: 'x-fa fa-search-plus'
                },
                {
                    iconCls: 'x-fa fa-search-minus'
                }
            ]
        },
        {
            xtype: 'segmentedbutton',
            items: [
                {
                    iconCls: 'x-fa fa-arrows',
                    type: 'drag',
                    tooltip: '拖动'
                },
                {
                    iconCls: 'x-fa fa-minus',
                    type: 'markline',
                    tooltip: '直线'
                },
                {
                    iconCls: 'x-fa fa-arrow-right',
                    type: 'arrowline',
                    tooltip: '箭头'
                },
                {
                    iconCls: 'x-fa fa-square-o',
                    type: 'rect',
                    tooltip: '方框'
                },
                {
                    iconCls: 'x-fa fa-circle-o',
                    type: 'circle',
                    tooltip: '圆'
                },
                {
                    iconCls: 'x-fa fa-circle',
                    type: 'ellipse',
                    tooltip: '椭圆'
                },

                {
                    iconCls: 'x-fa fa-text-width',
                    type: 'marktext',
                    tooltip: '文字'
                }
            ],
            listeners: {
                toggle: 'onShapeChange'
            }
        },
        {
            tooltip: '颜色',
            iconCls: 'x-fa fa-square',
            color: '#000',
            menu: [
                {
                    xtype: 'colorpicker',
                    handler: 'onColorPick'
                }
            ],
            listeners: {
                render: 'onColorBtnRender'
            }
        },
        '->',
        {
            iconCls: 'x-fa fa-gear',
            text: '设置'
        },
        {
            iconCls: 'x-fa fa-save',
            text: '保存'
        },
        {
            text: '导出',
            iconCls: 'x-fa fa-share',
            menu: [
                {
                    text: 'png'
                },
                {
                    text: 'jpg'
                },
                {
                    text: 'svg'
                },
                {
                    text: 'pdf'
                }
            ]
        },
        {
            iconCls: 'x-fa fa-eye',
            text: '预览代码',
            handler: 'onPreviewCodeClick'
        },
        {
            iconCls: 'x-fa fa-eye',
            text: '预览',
            handler: 'onPreviewClick'
        }
    ],
    bodyBorder: true,
    layout: {
        type: 'hbox',
        pack: 'center',
        align: 'center'
    },

    items: [
        {
            xtype: 'intersections',
            references: ''
        }
    ]
});
