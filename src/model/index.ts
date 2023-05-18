import {initBook} from "./utils";
import {BookConfig} from "./book";

const content: BookConfig = {
    title: '我爱你 · 1000',
    subTitle: 'WJ ❤ WH',
    endWords: 'WJ ❤ WH\n我们的故事未完待续……',
    preface: '序言',
    settings: {
        bgColor: 'rgb(240,240,233)',
        bgMusic: '丘光流云'
    },
    sections: [
        {
            title: '坚定的靠近',
            subTitle: '冷知识：\n相爱1000天与5月20日重叠的人\n会永远在一起！',
            songSection: true,
            needSubContent: true,
            settings: {
                bgColor: 'rgb(255,245,255)',
                bgMusic: null,
            },
            pages: ['当爱在靠近','情非得已','小酒窝','漂洋过海来看你'],
        },
        {
            title: '甜蜜的热恋',
            subTitle: '我的小猪甜甜的\n就像那天的蛋糕\n甜进了心里',
            songSection: true,
            needSubContent: true,
            settings: {
                bgColor: 'rgb(245,230,230)',
                bgMusic: null,
            },
            pages: ['甜甜的','有何不可','新鲜','骚灵情歌'],
        },
        {
            title: '平淡的深爱',
            subTitle: '小猪猪，\n今晚的月亮好圆啊！\n今晚的晚风好轻啊！',
            songSection: true,
            needSubContent: true,
            settings: {
                bgColor: 'rgb(242,245,228)',
                bgMusic: null,
            },
            pages: ['亲密爱人','爱就一个字','因为爱情','平凡的一天'],
        },
        {
            title: '一生的相伴',
            subTitle: '春复夏，\n秋经冬，\n白天黑夜与君同。',
            songSection: true,
            needSubContent: true,
            settings: {
                bgColor: 'rgb(230,245,230)',
                bgMusic: null,
            },
            pages: ['相爱很难','女神','至少还有你','未婚妻'],
        },
        {
            title: '花絮',
            subTitle: '写下这段文字的时间是2022年10月7日。在写完序之后，我才想起来，一般来说，一本书的序都是最后才写的，怎么我就提前写了（呆滞.jpg）。这就导致写完序之后又发生了一些跟这个礼物相关的事情。所以，我就加了一个幕后花絮的栏目，把这些有趣的事情记录下来。',
            songSection: false,
            needSubContent: false,
            pages: ['猪猪为啥不唱歌','礼物科研','她来听我的演唱会','网易云之我是卧底','万一我唱不动了','程序员的专辑','双人成行','绝中绝','录歌难','完结撒花'],
        },
    ]
}

export const pages = initBook(content);
console.log(pages);