export default {
    compName: 'u-view',
    style: {
        'text-align': 'center'
    },
    children:[   
        {
            compName: 'u-view',
            children: 'jjjj',
            style: {
                color: 'red',
                'font-size': '50rpx'
            }
        },
        {
            compName: 'u-view',
            children: 'hhhhh'
        },
        {
            compName: 'u-img',
            attr: {
                src: 'http://img1.rpfieldcdn.com/scrmmini/new/fudai/center-nav-bg.png',
                mode: 'aspectFill',
                'lazy-load': true
            },
            style: {
                width: '750rpx',
                height: '300rpx',
                // border: '20rpx solid green',
                'box-sizing': 'border-box'
            },
            link: {
                url: '/page',
                type: 'reLaunch', // navigateTo, redirectTo, reLaunch, switchTab, navigateBack
            }
        }
    ]
}